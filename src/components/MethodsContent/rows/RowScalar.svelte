<script>
	import formWrapper from '../formWrapper.js';
	import getInputValue from '../getInputValue.js';
	import { currentMatrix } from '../../../stores.js';

	function baseMultiplyDivide(multiply) {
		const row = $currentMatrix.val[parseInt(getInputValue('first-row-value'))];
		const scalar = getInputValue('scalar-value');

		for (let i = 0; i < row.length; i++) {
			if (multiply) {
				row[i] = parseFloat(row[i]) * parseFloat(scalar);
			} else {
				row[i] = parseFloat(row[i]) / parseFloat(scalar);
			}
		}

		currentMatrix.set($currentMatrix);
	}
</script>

<button on:click={formWrapper(() => baseMultiplyDivide(true), '', ['first-row', 'scalar'])}>
	R<sub>x</sub>
	→ R<sub>x</sub>
	· n
</button>

<button on:click={formWrapper(() => baseMultiplyDivide(false), '', ['first-row', 'scalar'])}>
	R<sub>x</sub>
	→ R<sub>x</sub>
	/ n
</button>
