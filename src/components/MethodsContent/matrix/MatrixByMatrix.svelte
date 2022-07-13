<script>
	import formWrapper from '../formWrapper.js';
	import getInputValue from '../getInputValue.js';
	import { currentMatrix, matrixs } from '../../../stores.js';

	export let setError;

	const copy = (obj) => JSON.parse(JSON.stringify(obj));
	const getMatrix = (letter) => $matrixs.find((m) => m.letter === letter);

	function getInputMatrixs() {
		const otherMatrixLetter = getInputValue('other-matrix-value');
		const appliedMatrixLetter = getInputValue('applied-matrix-value');
		const appliedIsCurrentMatrix = $currentMatrix.letter === appliedMatrixLetter;

		const otherMatrix = getMatrix(otherMatrixLetter).val;
		const appliedMatrix = appliedIsCurrentMatrix ? $currentMatrix : getMatrix(appliedMatrixLetter);

		return { appliedMatrix, otherMatrix, appliedIsCurrentMatrix };
	}

	function baseAddSubtract(add) {
		const { appliedMatrix, otherMatrix, appliedIsCurrentMatrix } = getInputMatrixs();

		const rows = $currentMatrix.val.length;
		const columns = $currentMatrix.val[0].length;

		if (otherMatrix.length !== rows || otherMatrix[0].length !== columns) {
			return setError("These matrixs don't have the same dimensions");
		}

		if (!appliedIsCurrentMatrix) {
			appliedMatrix.val = copy($currentMatrix.val);
		}

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				const matrixItem = parseFloat(appliedMatrix.val[i][j]);
				const otherMatrixItem = parseFloat(otherMatrix[i][j]);

				if (add) {
					appliedMatrix.val[i][j] = matrixItem + otherMatrixItem;
				} else {
					appliedMatrix.val[i][j] = matrixItem - otherMatrixItem;
				}
			}
		}

		if (appliedIsCurrentMatrix) {
			currentMatrix.set($currentMatrix);
		} else {
			matrixs.set($matrixs);
		}
	}

	function multiplyMatrixs() {
		const { appliedMatrix, otherMatrix, appliedIsCurrentMatrix } = getInputMatrixs();

		if ($currentMatrix.val[0].length !== otherMatrix.length) {
			return setError("You can't multiply these two matrixs because of their dimensions");
		}

		const cacheCurrentMatrix = copy($currentMatrix.val);
		appliedMatrix.val = [];

		for (let i = 0; i < $currentMatrix.val.length; i++) {
			appliedMatrix.val[i] = [];
		}

		for (let i = 0; i < cacheCurrentMatrix.length; i++) {
			for (let j = 0; j < otherMatrix[0].length; j++) {
				let num = 0;

				for (let n = 0; n < otherMatrix.length; n++) {
					num += parseFloat(cacheCurrentMatrix[i][n]) * parseFloat(otherMatrix[n][j]);
				}

				appliedMatrix.val[i][j] = num;
			}
		}

		if (appliedIsCurrentMatrix) {
			currentMatrix.set($currentMatrix);
		} else {
			matrixs.set($matrixs);
		}
	}

	function switchMatrixs() {
		const otherMatrix = getMatrix(getInputValue('other-matrix-value'));
		const equationCache = $currentMatrix.equation;
		const matrixValCache = copy($currentMatrix.val);

		$currentMatrix.equation = otherMatrix.equation;
		$currentMatrix.val = copy(otherMatrix.val);

		otherMatrix.equation = equationCache;
		otherMatrix.val = matrixValCache;

		matrixs.set($matrixs);
	}
</script>

<button
	disabled={$matrixs.length === 1}
	on:click={formWrapper(() => baseAddSubtract(true), '', ['other-matrix', 'applied-matrix'])}>X + Y</button>

<button
	disabled={$matrixs.length === 1}
	on:click={formWrapper(() => baseAddSubtract(false), '', ['other-matrix', 'applied-matrix'])}>X - Y</button>

<button
	disabled={$matrixs.length === 1}
	on:click={formWrapper(multiplyMatrixs, '', ['other-matrix', 'applied-matrix'])}>X · Y</button>

<button disabled={$matrixs.length === 1} on:click={formWrapper(switchMatrixs, '', ['other-matrix'])}> X ⇆ Y</button>
