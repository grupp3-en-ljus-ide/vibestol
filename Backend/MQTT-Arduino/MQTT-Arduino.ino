#include "EspMQTTClient.h"
#include "PubSubClient.h"
//Install libraries PubSubClient and EspMQTTClient

void onConnectionEstablished();

EspMQTTClient client(
  "ABB_Indgym_Guest",                       // Wifi ssid
  "Welcome2abb",                            // Wifi password
  "maqiatto.com",                           // MQTT broker ip
  1883,                                     // MQTT broker port
  "samuel.staflin@abbindustrigymnasium.se", // MQTT username
  "leumas",                                 // MQTT password
  "microdator",                             // Client name
  onConnectionEstablished,                  // Connection established callback
  true,                                     // Enable web updater
  true                                      // Enable debug messages
);

#define RED_Led 14 // Output D5 NodeMCU - Red LED
#define GREEN_Led 12 // Output D6 NodeMCU - Green LED
#define BLUE_Led 13 // Output D7 NodeMCU - Blue LED

string subsriber = "jonathan.damsgaardfalck@abbindustrigymnasium.se/vibestol"

void setColor(r_value, g_value, b_value) {
  analogWrite(RED_Led, r_value);
  analogWrite(GREEN_Led, g_value);
  analogWrite(BLUE_Led, b_value);
}

void onConnectionEstablished() {
  client.subscribe(subsriber, [] (const String & payload) {
    Serial.println(payload);
    setColor(800, 800, 800); //Blinka för att se att den får signal
    delay(100);
    setColor(0, 0, 0);
  });

  client.publish(subsriber, "This is a message");

  client.executeDelayed(5 * 1000, []() {
    client.publish(subsriber, "This is a message sent 5 seconds later");
  });
}


void setup() {
  pinMode(RED_Led, OUTPUT);
  pinMode(GREEN_Led, OUTPUT);
  pinMode(BLUE_Led, OUTPUT);
  setColor(0, 0, 0);
  Serial.begin(115200);
}

void loop() {
  client.loop();
}
