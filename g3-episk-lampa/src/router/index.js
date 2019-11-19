import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'ColorPicker',
		component: () => import('../views/ColorPicker.vue')
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/About.vue')
	}
];

const router = new VueRouter({
	routes,
	mode: 'history'
});

export default router;
