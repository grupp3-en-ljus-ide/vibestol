import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import mqtt from "mqtt";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    color: {
      hue: 50,
      saturation: 100,
      luminosity: 50
    },
    rgb: {
      r: 69,
      g: 69,
      b: 69
    },
    hex: "primary",
    mqtt: {
      connected: false,
      client: "hemsidan",
      url: "mqtt://maqiatto.com",
      options: {
        port: 8883,
        clientId:
          "mqttjs_" +
          Math.random()
            .toString(16)
            .substr(2, 8),
        username: "g3.vibestol@gmail.com",
        password: "G3Vibestol2020",
      }
    }
  },
  mutations: {
    sendRGB(state) {
      state.mqtt.client.publish("g3.vibestol@gmail.com/R", state.rgb.r);
      state.mqtt.client.publish("g3.vibestol@gmail.com/G", state.rgb.g);
      state.mqtt.client.publish("g3.vibestol@gmail.com/B", state.rgb.b);
      console.log("R:", state.rgb.r, "G:", state.rgb.g, "B:", state.rgb.b)
    },
    connectMqtt(state) {
      if (!state.mqtt.connected) {
        console.log("connecting");
        state.mqtt.client = mqtt.connect(state.mqtt.url, state.mqtt.options);
        console.log("connected?");
        state.mqtt.client
          .on("error", function (error) {
            console.log("Error...");
            state.mqtt.connected = false;
            console.log(state.mqtt.connected, error);
          })
          .on("close", function (error) {
            console.log("Closed... Disconnected", error);
            state.mqtt.connected = false;
          });
      }
      state.mqtt.connected = true;

      state.mqtt.client.publish("g3.vibestol@gmail.com/R", state.rgb.r.toString());
      state.mqtt.client.publish("g3.vibestol@gmail.com/G", state.rgb.g.toString());
      state.mqtt.client.publish("g3.vibestol@gmail.com/B", state.rgb.b.toString());
      console.log("R:", state.rgb.r, "G:", state.rgb.g, "B:", state.rgb.b)
    },
    publishRGB(state) {

      var h = state.color.hue
      var s = state.color.saturation
      var l = state.color.luminosity

      s /= 100;
      l /= 100;

      let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
      state.rgb.r = Math.round((r + m) * 255);
      state.rgb.g = Math.round((g + m) * 255);
      state.rgb.b = Math.round((b + m) * 255);

      r = state.rgb.r.toString(16);
      g = state.rgb.g.toString(16);
      b = state.rgb.b.toString(16);

      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;

      state.hex = "#" + r + g + b;

      if (!state.mqtt.connected) {
        console.log("connecting");
        state.mqtt.client = mqtt.connect(state.mqtt.url, state.mqtt.options);
        console.log("connected?");
        state.mqtt.client
          .on("error", function (error) {
            console.log("Error...");
            state.mqtt.connected = false;
            console.log(state.mqtt.connected, error);
          })
          .on("close", function (error) {
            console.log("Closed... Disconnected", error);
            state.mqtt.connected = false;
          });
      }
      state.mqtt.connected = true;

      state.mqtt.client.publish("g3.vibestol@gmail.com/R", state.rgb.r.toString());
      state.mqtt.client.publish("g3.vibestol@gmail.com/G", state.rgb.g.toString());
      state.mqtt.client.publish("g3.vibestol@gmail.com/B", state.rgb.b.toString());
      console.log("R:", state.rgb.r, "G:", state.rgb.g, "B:", state.rgb.b)

    }
  },
  actions: {
    checkIfOccupied: () => {
      return new Promise(resolve => {
        axios
          .get("https://03asg5lb76.execute-api.us-east-1.amazonaws.com/V1/stol?stol=VibeChair")
          .then(respone => {
            let green = false;
            if (respone.Status == "Grön") {
              green = true;
            } else {
              green = false;
            }
            console.log(green);
            resolve(respone);
          })
      })
    },
  },
  modules: {
  },
  getters: {
    color: state => state.color,
    rgb: state => state.rgb,
    hex: state => state.hex,
  }
})
