<script>
	import formWrapper from '../formWrapper.js';
	import getInputValue from '../getInputValue.js';
	import { currentMatrix, matrixs } from '../../../stores.js';

	let columns, rows;

	$: {
		columns = $currentMatrix.val[0].length;
		rows = $currentMatrix.val.length;
	}

	function baseMultiplyDivide(multiply) {
		const scalar = parseFloat(getInputValue('scalar-value'));
		const appliedMatrixLetter = getInputValue('applied-matrix-value');
		const appliedIsCurrentMatrix = $currentMatrix.letter === appliedMatrixLetter;
		const appliedMatrix = appliedIsCurrentMatrix
			? $currentMatrix
			: $matrixs.find((m) => m.letter === appliedMatrixLetter);

		if (!appliedIsCurrentMatrix) {
			appliedMatrix.val = JSON.parse(JSON.stringify($currentMatrix.val));
		}

		const rows = appliedMatrix.val.length;
		const columns = appliedMatrix.val[0].length;

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				const matrixItem = parseFloat(appliedMatrix.val[i][j]);

				if (multiply) {
					appliedMatrix.val[i][j] = matrixItem * scalar;
				} else {
					appliedMatrix.val[i][j] = matrixItem / scalar;
				}
			}
		}

		if (appliedIsCurrentMatrix) {
			currentMatrix.set($currentMatrix);
		}
	}
</script>

<style>
	span {
		letter-spacing: 3px;
	}
</style>

<button on:click={formWrapper(() => baseMultiplyDivide(true), '', ['scalar', 'applied-matrix'])}> X · n </button>
<button on:click={formWrapper(() => baseMultiplyDivide(false), '', ['scalar', 'applied-matrix'])}> X / n </button>
<button
	disabled={columns !== rows}
	on:click={formWrapper(() => baseMultiplyDivide(false), '', [
		'scalar',
		'applied-matrix'
	])}><span>X</span><sup>n</sup></button>
<button
	on:click={formWrapper(() => baseMultiplyDivide(false), '', [
		'scalar',
		'applied-matrix'
	])}><span>X</span><sup>-1</sup></button>
