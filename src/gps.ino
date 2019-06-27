 
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

static const uint32_t GPSBaud = 9600;

// The TinyGPS++ object
TinyGPSPlus gps;

// The serial connection to the GPS device

void setup(){
  Serial.begin(9600);
  Serial1.begin(GPSBaud);
}

void loop(){
  // This sketch displays information every time a new sentence is correctly encoded.
  while (Serial1.available() > 0){
    Serial.write(Serial1.read());
    // gps.encode(Serial1.read());
    // if (gps.location.isUpdated()){
    //   Serial.print("Latitude= "); 
    //   Serial.print(gps.location.lat(), 6);
    //   Serial.print(" Longitude= "); 
    //   Serial.println(gps.location.lng(), 6);
    // }
  }
}