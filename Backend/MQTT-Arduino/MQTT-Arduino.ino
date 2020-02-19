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
  "G3Vibestol2022ingenannanhardettanamn",   // Client name
  onConnectionEstablished,                  // Connection established callback
  true,                                     // Enable web updater
  true                                      // Enable debug messages
);

#define RED_Led 14 // Output D5 NodeMCU - Red LED
#define GREEN_Led 12 // Output D6 NodeMCU - Green LED
#define BLUE_Led 13 // Output D7 NodeMCU - Blue LED

typedef enum Effects{
  StaticEffect,
  RainbowEffect
};
Effects Effect;

String Sub = "g3.vibestol@gmail.com/R";

int rValue = 0;
int gValue = 0;
int bValue = 0;
int effectValue = 1;

void onConnectionEstablished() {
  client.subscribe(Sub, [] (const String & payload) {
    rValue = payload.substring(0, 3).toInt() * 4;
    gValue = payload.substring(3, 6).toInt() * 4;
    bValue = payload.substring(6, 9).toInt() * 4;
    effectValue = payload.substring(9).toInt();
  });

  if (effectValue == 1) {
      Effect = StaticEffect;
  }
  else if (effectValue == 2) {
    rValue = 1000;
    gValue = 0;
    bValue = 0;
    Effect = RainbowEffect;
  }
  else {
    Serial.println("Unknown effect");
  }
  effectValue = 0;
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
  Effect = StaticEffect;
  Serial.begin(115200);
}

void loop() {
  client.loop();
  onConnectionEstablished();
  switch (Effect) {
    case StaticEffect:
      setColor(rValue, gValue, bValue);
      break;
    case RainbowEffect:
      if (rValue >= 1000 and gValue < 1000 and bValue == 0) {
        Serial.println("g+");
        gValue += 10;
      }
      else if(rValue > 0 and gValue >= 1000 and bValue == 0) {
        Serial.println("r-");
        rValue -= 10;
      }
      else if (rValue == 0 and gValue >= 1000 and bValue < 1000) {
        Serial.println("b+");
        bValue += 10;
      }
      else if(rValue == 0 and gValue > 0 and bValue >= 1000) {
        Serial.println("g-");
        gValue -= 10;
      }
      else if (rValue < 1000 and gValue == 0 and bValue >= 1000) {
        Serial.println("r+");
        rValue += 10;
      }
      else if(rValue >= 1000 and gValue == 0 and bValue > 0) {
        Serial.println("b-");
        bValue -= 10;
      }
      else {
        Serial.println("Rainbow effect error");
      }
      setColor(rValue, gValue, bValue);
      break;
  }
}
