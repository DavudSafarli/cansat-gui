#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>  
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// pins for xbee
// #define rxPin 2
// #define txPin 3
// GPS -> Serial1 -> 18/19

#define SEALEVELPRESSURE_HPA (1013.25)

#define TEAM_ID 2073

// SoftwareSerial xbee =  SoftwareSerial(rxPin, txPin);

Adafruit_BME280 bme;
TinyGPSPlus gps;

float latitudeBase = 40.467087;
float longtitudeBase = 49.489784;
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
float lat, lon;
bool bmeFlag = true;
bool gpsFlag = true;

void setup() {
  Serial.begin(9600);
  if (!bme.begin(0x76)) {
    Serial.println("SCould not find a valid BMe280 sensor, check wiring!E");
    while (1);
  }
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  // gps baud rate
  Serial1.begin(9600);
  // set the data rate for the SoftwareSerial port
  // xbee.begin(9600);
  transmit = false;
  previousTelemetry = millis();
  previousCamera = millis();
  packetCounter = 0;
//  reset();
}

void reset() {
  // Serial.println("RESET");
  relativeAltitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
  previousAltitude = 0;
  startTime = millis();
  transmit = true;
}

void loop() {
  // if(xbee.available()){
  if(Serial.available()){
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

  if(telemetryDelta > 999) {
    previousTelemetry = millis();
    bmeFlag = true;
    sendTelemetry();
  }
  else if(telemetryDelta > 600 && bmeFlag) {
    bmeFlag = false;
    // Serial.print("900: ");
    previousAltitude = bme.readAltitude(SEALEVELPRESSURE_HPA) - relativeAltitude;
    // Serial.println(previousAltitude);
    previousAltitudeTime = current;
 }else {
    setGpsLocation();
  }
}


void sendTelemetry() {
// calculate altitude
  float altitude = bme.readAltitude(SEALEVELPRESSURE_HPA) - relativeAltitude;
  // Serial.print("999: ");
  // Serial.println(altitude);
// calculate velocity = (altitude - previous altitude)/delta time
  float velocity = ((altitude - previousAltitude)/(current - previousAltitudeTime))*1000;
  String telemetry = createTelemetry(altitude, velocity, lat, lon, 1);
  // Serial.print("velocity");
  // Serial.println(velocity);
  // Serial.print("telemetry");
  // Serial.println(telemetry);

//  string to char array
  char charBuf[50];
  telemetry.toCharArray(charBuf, 50);
// transmit
  // xbee.write(charBuf);
  Serial.write(charBuf);
  packetCounter++;
}

void readCommand() {
  // char received = xbee.read();
  char received = Serial.read();
  String str = String(received);
  if(str == "x") {
    reset();
  }
} 

String createTelemetry(float altitude, float velocity, float gps1, float gps2, int pic) {
  unsigned long upTime = millis() - startTime;
  // <TEAM ID>,<upTime>,<counter>,<altitude>,<velocity>,<gps lat.>,<gps lon.>,<pic t/f>
  String s = "{" + String(TEAM_ID) + "," + String(upTime) + "," + String(packetCounter) + "," + 
  String(altitude) + "," + String(velocity) + "," + String(gps1) + ","  + String(gps2) + "," +
  String(pic) + "}";
  return s;
}

void setGpsLocation() {
  // if (Serial1.available() > 0){
  //   Serial.write(Serial1.read());
  //   gps.encode(Serial1.read());
  //   if (gps.location.isUpdated()){
  //     Serial.print("Latitude= "); 
  //     lat = gps.location.lat();
  //     Serial.print(gps.location.lat(), 6);
  //     Serial.print(" Longitude= "); 
  //     lat = gps.location.lng();
  //     Serial.println(gps.location.lng(), 6);
  //   }
  // }
  latitudeBase += random(-0.00005, 0.00005);
  longtitudeBase += random(-0.00005, 0.00005);
}