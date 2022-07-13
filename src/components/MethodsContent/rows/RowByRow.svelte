<script>
	import formWrapper from '../formWrapper.js';
	import getInputValue from '../getInputValue.js';
	import { currentMatrix } from '../../../stores.js';

	export let setError;

	let rows = $currentMatrix.val.length;

	currentMatrix.subscribe((matrix) => (rows = matrix.val.length));

	function base(type) {
		const firstRow = $currentMatrix.val[parseInt(getInputValue('first-row-value'))];
		const secondRow = $currentMatrix.val[parseInt(getInputValue('second-row-value'))];

		if (firstRow === secondRow) {
			return setError('Rows can not be the same.');
		}

		for (let i = 0; i < firstRow.length; i++) {
			if (type === 'add') {
				firstRow[i] = parseFloat(firstRow[i]) + parseFloat(secondRow[i]);
			} else if (type === 'subtract') {
				firstRow[i] = parseFloat(firstRow[i]) - parseFloat(secondRow[i]);
			} else {
				const cachedRowItem = firstRow[i];
				firstRow[i] = secondRow[i];

				if (type === 'switch') {
					secondRow[i] = cachedRowItem;
				}
			}
		}

		currentMatrix.set($currentMatrix);
	}
</script>

<button disabled={rows === 1} on:click={formWrapper(() => base('add'), '', ['first-row', 'second-row'])}>
	R<sub>x</sub>
	→ R<sub>x</sub>
	+ R<sub>y</sub>
</button>

<button disabled={rows === 1} on:click={formWrapper(() => base('subtract'), '', ['first-row', 'second-row'])}>
	R<sub>x</sub>
	→ R<sub>x</sub>
	- R<sub>y</sub>
</button>

<button disabled={rows === 1} on:click={formWrapper(() => base('switch'), '', ['first-row', 'second-row'])}>
	R<sub>x</sub>
	⇆ R<sub>y</sub>
</button>

<button disabled={rows === 1} on:click={formWrapper(() => base('duplicate'), '', ['first-row', 'second-row'])}>
	R<sub>x</sub>
	→ R<sub>y</sub>
</button>
