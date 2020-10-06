import App from './App.svelte';

const app = new App({
	target: document.getElementById('viz'),
	props: {
		url: '../assets/pollens.json'
	}
});

export default app;