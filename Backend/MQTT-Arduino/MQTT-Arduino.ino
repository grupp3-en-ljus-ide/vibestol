#include "EspMQTTClient.h"
#include "PubSubClient.h"
//Install libraries PubSubClient and EspMQTTClient

void onConnectionEstablished();

EspMQTTClient client(
  "ABB_Indgym_Guest",                       // Wifi ssid
  "Welcome2abb",                            // Wifi password
  "maqiatto.com",                           // MQTT broker ip
  1883,                                     // MQTT broker port
  "g3.vibestol@gmail.com",                  // MQTT username
  "G3Vibestol2020",                         // MQTT password
  "G3Vibestol2022ingenannanhardettanamn",                             // Client name
  onConnectionEstablished,                  // Connection established callback
  true,                                     // Enable web updater
  true                                      // Enable debug messages
);

#define RED_Led 14 // Output D5 NodeMCU - Red LED
#define GREEN_Led 12 // Output D6 NodeMCU - Green LED
#define BLUE_Led 13 // Output D7 NodeMCU - Blue LED

String rSub = "g3.vibestol@gmail.com/R";
String gSub = "g3.vibestol@gmail.com/G";
String bSub = "g3.vibestol@gmail.com/B";

int rValue = 0;
int gValue = 0;
int bValue = 0;

void onConnectionEstablished() {
  client.subscribe(rSub, [] (const String & payload) {
    rValue = payload.toInt() * 4;
  });

  client.subscribe(gSub, [] (const String & payload) {
    gValue = payload.toInt() * 4;
  });

  client.subscribe(bSub, [] (const String & payload) {
    bValue = payload.toInt() * 4;
  });

  setColor(rValue, gValue, bValue);

}


void setColor(int r_value, int g_value, int b_value) {
    analogWrite(RED_Led, r_value);
    analogWrite(GREEN_Led, g_value);
    analogWrite(BLUE_Led, b_value);
}


void setup() {
  pinMode(RED_Led, OUTPUT);
  pinMode(GREEN_Led, OUTPUT);
  pinMode(BLUE_Led, OUTPUT);
  setColor(0, 0, 0);
 // Serial.begin(115200);
}

void loop() {
  client.loop();
  onConnectionEstablished();
}
