import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios";
import mqtt from "mqtt";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lampOn: true,
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
    hex: "#ffffff",
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
    updateHue(state, hue) {
      state.color.hue = hue;
    },
    updateLum(state, lum) {
      state.color.hue = lum;
    },
    HslToRgb(state) {
      var   h = state.color.hue
      var   s = state.color.saturation
      var   l = state.color.luminosity

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
    },
    RgbToHex(state) {
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
    publishToMqtt(state, rgb) {
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

      // state.mqtt.client.publish("g3.vibestol@gmail.com/R", r.toString());
      // state.mqtt.client.publish("g3.vibestol@gmail.com/G", g.toString());
      // state.mqtt.client.publish("g3.vibestol@gmail.com/B", b.toString());
      console.log("R:", rgb.r, "G:", rgb.g, "B:", rgb.b)
    }
  },
  actions: {
    atUpdateHue: ({ commit, state }, hue) => {
      commit("updateHue", hue)
      commit("HslToRgb");
      commit("RgbToHex");
      commit("publishToMqtt", {r: state.rgb.r, g: state.rgb.g, b: state.rgb.b});
    },
    atUpdateLum: ({ commit, state }, lum) => {
      commit("updateLum", lum)
      commit("HslToRgb");
      commit("RgbToHex");
      commit("publishToMqtt", {r: state.rgb.r, g: state.rgb.g, b: state.rgb.b});
    },
    turnOn: ({ commit, state }) => {
      commit("publishToMqtt", {r: state.rgb.r, g: state.rgb.g, b: state.rgb.b});
    },
    turnOff: ({ commit }) => {
      commit("publishToMqtt", {r: 0, g: 0, b: 0})
    }
  },
  modules: {},
  getters: {
    color: state => state.color,
    rgb: state => state.rgb,
    hex: state => state.hex,
    closed: state => state.closed,
    lampOn: state => state.lampOn,
  }
})
