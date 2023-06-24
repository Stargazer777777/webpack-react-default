import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

import './scss/base';

const asyncRegister = async () => {
	const { default: store } = await import('./stores/index');
	app.use(store);

	const { default: router } = await import('./router/index');
	app.use(router);

	app.mount('#app');
};
asyncRegister();
