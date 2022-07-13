<script>
	import { fly } from 'svelte/transition';

	export let message;
	export let setError;

	const timeout = setTimeout(() => setError(''), 4000);

	function deleteByButton() {
		setError('');
		clearTimeout(timeout);
	}
</script>

<style>
	div {
		display: flex;
		position: absolute;
		top: 10px;
		left: 50%;
		/* justify-content: space-between; */
		background-color: #9b1b30;
		border-radius: 5px;
		transform: translateX(-50%);
	}

	p {
		font-size: 18px;
		padding: 20px;
	}

	button {
		background-color: #631622;
		color: white;
		border: none;
		font-size: 25px;
		width: 40px;
		border-radius: 0 5px 5px 0;
	}
</style>

<div transition:fly={{ y: -200, duration: 500 }}>
	<p>Error: {message}</p>
	<button on:click={deleteByButton}> &times; </button>
</div>
