#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>  
#include <SoftwareSerial.h>

#define rxPin 2
#define txPin 3
#define SEALEVELPRESSURE_HPA (1013.25)

#define TEAM_ID 2073

SoftwareSerial xbee =  SoftwareSerial(rxPin, txPin);
Adafruit_BME280 bme;

// will be set in reset function ONCE
unsigned long startTime;
// millis
unsigned long current;
unsigned long previousTelemetry, previousCamera;
unsigned long telemetryDelta, cameraDelta;
// relative altitude, will be set in reset function
unsigned long relativeAltitude = 0;
// for xbee, to know when to transmit
bool transmit;
// counter for transmitted packets
int packetCounter;
// for calculating speed
float previousAltitude;
unsigned long previousAltitudeTime;

void setup() {
  Serial.begin(9600);
  if (!bme.begin(0x76)) {
    Serial.println("SCould not find a valid BMe280 sensor, check wiring!E");
    while (1);
  }
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  // set the data rate for the SoftwareSerial port
  xbee.begin(9600);
  transmit = false;
  previousTelemetry = millis();
  previousCamera = millis();
  packetCounter = 0;
  reset();
}

void reset() {
  relativeAltitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
  previousAltitude = 0;
  startTime = millis();
  transmit = true;
}

void loop() {
  if(xbee.available()){
    readCommand();
  }
  if(transmit) {
    doTheThing();
  }
}

void doTheThing() {
  current = millis();
  telemetryDelta = current - previousTelemetry;
  cameraDelta = current - previousCamera;
  
  if(telemetryDelta > 900) {
    previousAltitude = bme.readAltitude(SEALEVELPRESSURE_HPA) - relativeAltitude;
    previousAltitudeTime = current;
  }
  if(telemetryDelta > 999) {
    previousTelemetry = millis();
    sendTelemetry();
  }
}


void sendTelemetry() {
// calculate altitude
  float altitude = bme.readAltitude(SEALEVELPRESSURE_HPA) - relativeAltitude;
// calculate velocity = (altitude - previous altitude)/delta time
  float velocity = (altitude - previousAltitude)/(current - previousAltitudeTime)*1000;
  String telemetry = createTelemetry(altitude, velocity, 1, 2, 1);
  Serial.println(telemetry);

//  string to char array
  char charBuf[50];
  telemetry.toCharArray(charBuf, 50);
// transmit
  xbee.write(charBuf);
  packetCounter++;
}

void readCommand() {
  char received = xbee.read();
  String str = String(received);
  if(str == "x") {
    reset();
  }
}

String createTelemetry(float altitude, float velocity, float gps1, float gps2, int pic) {
  unsigned long upTime = millis() - startTime;
  // <TEAM ID>,<upTime>,<counter>,<altitude>,<velocity>,<gps lat.>,<gps lon.>,<pic t/f>
  String s = "S" + String(TEAM_ID) + "," + String(upTime) + "," + String(packetCounter) + "," + 
  String(altitude) + "," + String(velocity) + "," + 
  String(gps1) + "|"  + String(gps2) + 
  String(pic) + "E";
  return s;
}
