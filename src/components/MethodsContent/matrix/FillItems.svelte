<script>
	import formWrapper from '../formWrapper.js';
	import getInputValue from '../getInputValue.js';
	import { currentMatrix, matrixs } from '../../../stores.js';
	import { alphabet } from '../../../strings.js';

	export let setError;

	let columns, rows;

	$: {
		columns = $currentMatrix.val[0].length;
		rows = $currentMatrix.val.length;
	}

	function fillMatrixItems({ staticValue, min, max, makeIdentity }) {
		const matrixItems = document.getElementsByClassName('matrix-item');

		//double for loop might be better but idk
		for (let i = 0; i < matrixItems.length; i++) {
			const column = i % columns;
			const row = Math.floor(i / columns);

			let value = staticValue;

			if (min) {
				value = Math.round(Math.random() * (max - min) + min);
			} else if (makeIdentity) {
				value = column === row ? 1 : 0;
			}

			$currentMatrix.val[row][column] = value;
		}
	}

	function fillBy() {
		fillMatrixItems({ staticValue: parseFloat(getInputValue('fill-by-value')) });
	}

	function fillRandom() {
		const min = parseFloat(getInputValue('random-min'));
		const max = parseFloat(getInputValue('random-max'));

		if (min > max) {
			return setError('Maximum has to be greater than minimum');
		}

		fillMatrixItems({ min, max });
	}

	function duplicateMatrix() {
		const otherMatrixLetter = getInputValue('other-matrix-value');
		const otherMatrix = $matrixs.find((m) => m.letter === otherMatrixLetter);
		$currentMatrix.val = JSON.parse(JSON.stringify(otherMatrix.val));
		currentMatrix.set($currentMatrix);
		matrixs.set($matrixs);
	}
</script>

<button on:click={formWrapper(fillBy, 'fill-by')}>Fill All By</button>
<button on:click={formWrapper(fillRandom, 'fill-random')}>Fill All Random</button>
<button on:click={formWrapper(duplicateMatrix, '', 'other-matrix')} disabled={$matrixs.length === 1}> X → Y </button>
<button on:click={() => fillMatrixItems({ makeIdentity: true })} disabled={columns !== rows}> X → I </button>
