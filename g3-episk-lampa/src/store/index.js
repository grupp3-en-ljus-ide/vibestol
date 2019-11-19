import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		light: 'off',
		lights: [ 'Rainbow', 'Ripple', 'Color' ],
		off: [ 'off' ]
	},
	mutations: {
		lightFuntion(light) {
			this.light = light;
		},
		testActive(i) {
			if (i == this.light) {
				return true;
			} else {
				return false;
			}
		}
	},
	actions: {},
	modules: {},
	getters: {
		light: (state) => state.light,
		lights: (state) => state.lights,
		off: (state) => state.off
	}
});
