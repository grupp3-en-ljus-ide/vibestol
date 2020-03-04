import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios";
import mqtt from "mqtt";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lampOn: true,
    currentEffect: "Statiskt läge",
    effects: ["Statiskt läge", "Regnbåges läge"],
    color: {
      hue: 50,
      saturation: 100,
      luminosity: 50
    },
    rgb: {
      r: 255,
      g: 255,
      b: 255
    },
    hex: "#ffffff",
    mqtt: {
      connected: false,
      client: "hemsidan",
      url: "mqtt://maqiatto.com",
      options: {
        port: 8883,
        clientId: "mqttjs_" +
          Math.random()
            .toString(16)
            .substr(2, 8),
        username: "g3.vibestol@gmail.com",
        password: "G3Vibestol2020",
      }
    }
  },
  mutations: {
    updateHue(state, hue) {
      state.color.hue = hue;
    },
    updateLum(state, lum) {
      state.color.lum = lum;
    },
    HslToRgb(state) { //Function that converts hsl values to rgb values
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
        r = c;
        g = x;
        b = 0;
      } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
      }
      state.rgb.r = Math.round((r + m) * 255);
      state.rgb.g = Math.round((g + m) * 255);
      state.rgb.b = Math.round((b + m) * 255);

    },
    RgbToHex(state) { //Function that converts hex values to rgb values
      var r = state.rgb.r.toString(16);
      var g = state.rgb.g.toString(16);
      var b = state.rgb.b.toString(16);

      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;

      state.hex = "#" + r + g + b;
    },
    RgbToString(state) { 

      const keys = Object.keys(state.rgb) //Each key in rgb (r,g,b)
      var x = "";

      for (x in keys) {  //Goes through r,g and b and change it into a 3 number long string and adds zeros if needed
        if (state.rgb[keys[x]] == 0) { 
          state.rgb[keys[x]] = "000"
        } else if (0 < state.rgb[keys[x]] && state.rgb[keys[x]] <= 9) {
          state.rgb[keys[x]] = "00" + state.rgb[keys[x]]
        } else if (10 <= state.rgb[keys[x]] && state.rgb[keys[x]] <= 99) {
          state.rgb[keys[x]] = "0" + state.rgb[keys[x]]
        } else {
          state.rgb[keys[x]] = "" + state.rgb[keys[x]]
        }
      }
    },
    publishToMqtt(state, rgb) {
      if (!state.mqtt.connected) { //Connects to MaQiaTTo online broker
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

      let publishEffect = "0" //Sets the effect number based on user input
      if (state.currentEffect == state.effects[0]) { 
        publishEffect = "1"
      }
      else if (state.currentEffect == state.effects[1]) {
        publishEffect = "2"
      }

      state.mqtt.client.publish("g3.vibestol@gmail.com/vibe", rgb.r + rgb.g + rgb.b + publishEffect); //Adds r,b,g and effect number into 1 string
    }
  },
  actions: {
    atUpdateHue: ({
      commit,
      state
    }, hue) => {
      commit("updateHue", hue)
      commit("HslToRgb");
      commit("RgbToHex");
      commit("RgbToString");
      commit("publishToMqtt", {
        r: state.rgb.r,
        g: state.rgb.g,
        b: state.rgb.b
      });
    },
    atUpdateLum: ({
      commit,
      state
    }, lum) => {
      commit("updateLum", lum)
      commit("HslToRgb");
      commit("RgbToHex");
      commit("RgbToString");
      commit("publishToMqtt", {
        r: state.rgb.r,
        g: state.rgb.g,
        b: state.rgb.b
      });
    },
    turnOn: ({
      commit,
      state
    }) => {
      commit("publishToMqtt", {
        r: state.rgb.r,
        g: state.rgb.g,
        b: state.rgb.b
      });
    },
    turnOff: ({
      commit
    }) => {
      commit("publishToMqtt", {
        r: "000",
        g: "000",
        b: "000"
      })
    }
  },
  modules: {},
  getters: {
    color: state => state.color,
    rgb: state => state.rgb,
    hex: state => state.hex,
    closed: state => state.closed,
    lampOn: state => state.lampOn,
    effects: state => state.effects,
    currentEffect: state => state.currentEffect,
  }
})
