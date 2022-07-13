<script>
	import MatrixDropDown from './MatrixDropDown.svelte';
	import { currentMatrix } from '../../../stores.js';
</script>

<div id="applied-matrix">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="dropdown-container">
		Applied Matrix:
		<br />
		<MatrixDropDown
			id="applied-matrix-value"
			defaultOptionLetter={$currentMatrix.letter} />
	</label>
</div>
