import App from './App.svelte';

const app = new App({
	target: document.getElementById('viz'),
	props: {
		name: 'World'
	}
});

export default app;