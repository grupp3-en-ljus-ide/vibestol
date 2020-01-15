# Vibe Chair
This project is about lighting up a specific chair at Expectrum, Västerås.

## Front End
The front end is a website done in Vue and Vuetify and consists of a color picker (to choose the color of the lighting) and a slider to choose the brightness.

## Back End
The back end is made using the web protocol MQTT. We use MaQiaTTo as the broker. The publisher from the website publishes information about the color and brightness to a topic, and the subscriber from the microcontroller recieves the information and adjusts the color and brightness of the RGB LED-strip accordingly.

## Microcontroller
Our microcontroller, NodeMCU/ESP8266, is paired with our RGB LED-strip and can adjust its color and brightness according to the information that it has recieved from the MQTT topic. It will be placed in a case on top of the chair once we have reached that point in the development.
