import App from './App.svelte';

const app = new App({
	target: document.body
});

document.body.addEventListener("keydown", function(e){
	if(e.key === "Escape") {
		const modal = document.querySelector(".show");
		if (modal) {
			modal.classList.remove("show");
		}
	}
});

export default app;