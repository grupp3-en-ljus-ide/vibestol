#include "EspMQTTClient.h"
//Install libraries PubSubClient and EspMQTTClient

void onConnectionEstablished();

EspMQTTClient client(
  "ABB_Indgym_Guest",           // Wifi ssid
  "Welcome2abb",           // Wifi password
  "maqiatto.com",  // MQTT broker ip
  1883,             // MQTT broker port
  "jonathan.damsgaardfalck@abbindustrigymnasium.se",            // MQTT username
  "abcde",       // MQTT password
  "Vibestolclient",          // Client name
  onConnectionEstablished, // Connection established callback
  true,             // Enable web updaterhttps://github.com/abbjoafli/ExempelMQTTkod
  true              // Enable debug messages
);


void setup() {
Serial.begin(115200);
}


void onConnectionEstablished()
{
  client.subscribe("jonathan.damsgaardfalck@abbindustrigymnasium.se/vibestol", [] (const String &payload)
  {
    Serial.println(payload);
  });
  
  client.publish("jonathan.damsgaardfalck@abbindustrigymnasium.se/vibestol", "This is a message");

 

  client.executeDelayed(5 * 1000, []() {
    client.publish("jonathan.damsgaardfalck@abbindustrigymnasium.se/vibestol", "This is a message sent 5 seconds later");
  });
}

void loop() {
  // put your main code here, to run repeatedly:
client.loop();
}