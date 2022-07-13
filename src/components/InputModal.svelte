<script>
	import FillRandom from './ModalContent/matrix/FillRandom.svelte';
	import FillBy from './ModalContent/matrix/FillBy.svelte';
	import Scalar from './ModalContent/Scalar.svelte';
	import OtherMatrix from './ModalContent/matrix/Other.svelte';
	import AppliedMatrix from './ModalContent/matrix/Applied.svelte';
	import FirstRow from './ModalContent/rows/FirstRow.svelte';
	import SecondRow from './ModalContent/rows/SecondRow.svelte';

	function close() {
		document.getElementById('input-modal').classList.remove('show');
	}
</script>

<style>
	section {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	form {
		position: absolute;
		left: -100%;
		top: 50%;
		background-color: rgb(88, 33, 33);
		color: white;
		border-radius: 5px;
		-webkit-box-shadow: -2px 9px 28px -9px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: -2px 9px 28px -9px rgba(0, 0, 0, 0.75);
		box-shadow: -2px 9px 28px -9px rgba(0, 0, 0, 0.75);
		transition: all 0.5s;
		transform: translate(0%, -50%);
	}

	button {
		font-size: 18px;
		padding: 10px 20px;
		border-radius: 5px;
		border: none;
	}

	:global(#input-modal.show) {
		pointer-events: all;
	}

	:global(#input-modal.show form) {
		transform: translate(-50%, -50%);
		left: 50%;
	}

	:global(#input-modal.show .transparent-dark-bg) {
		transform: translateY(0);
	}

	.btn-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 10px;
		padding: 0 10px 10px 10px;
	}

	.input-content {
		padding: 10px 10px 0 10px;
	}

	.input-content > :global(div) {
		display: none;
	}

	.input-content :global(.current-modal),
	.input-content :global(.current-addon) {
		display: block;
	}

	.input-content :global(input) {
		width: 60px;
		color: black;
		font-size: 18px;
		padding-left: 3px;
	}

	.input-content :global(input:invalid) {
		color: white;
	}

	.input-content :global(label) {
		display: flex;
		background-color: #8f564c;
		padding: 10px;
		align-items: center;
		justify-content: space-between;
		font-size: 18px;
		margin-bottom: 10px;
		border-radius: 5px;
	}

	.input-content :global(.dropdown-container) {
		display: block;
	}
</style>

<section id="input-modal">
	<div class="transparent-dark-bg" />
	<form id="modal-form" on:submit|preventDefault on:reset|preventDefault={close}>
		<div class="input-content">
			<FillBy />
			<FillRandom />
			<Scalar />
			<OtherMatrix />
			<AppliedMatrix />
			<FirstRow />
			<SecondRow />
		</div>
		<div class="btn-container">
			<button class="generic-btn green" type="submit">Submit</button>
			<button class="generic-btn red" type="reset">Close</button>
		</div>
	</form>
</section>
