import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    color: {
      hue: 50,
      saturation: 100,
      luminosity: 50
    },
    rgb: {
      r: 0,
      g: 0,
      b: 0
    }
  },
  mutations: {
    updateColor(state, h) {
      state.color.hue = h
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

    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    color: state => state.color,
    rgb: state => state.rgb,
  }
})
