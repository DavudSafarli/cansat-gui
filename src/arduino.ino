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
unsigned long current;
unsigned long previousTelemetry, previousCamera;
unsigned long telemetryDelta, cameraDelta;

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
  previousTelemetry = millis();
  previousCamera = millis();
}

void loop() {
  current = millis();
  telemetryDelta = current - previousTelemetry;
  cameraDelta = current - previousCamera;

  if(xbee.available()){
    readCommand();
  }
  
  if(telemetryDelta > 999) {
    previousTelemetry = millis();
    sendTelemetry();
  }
  
}

void sendTelemetry() {
  float temp = bme.readTemperature();
  float pressure = bme.readPressure() / 100.0F;
  float alti = bme.readAltitude(SEALEVELPRESSURE_HPA);
  String s = "S" + String(temp) + "," + String(pressure) + "|"  + String(alti) + "E";
  char charBuf[50];
  s.toCharArray(charBuf, 50);
//  Serial.println(charBuf);
  xbee.write(charBuf);
}

void readCommand() {
  char received = xbee.read();
  String str = String(received);
  if(str == 'x') {
    reset();
  }
}

void reset() {
  
}
}
