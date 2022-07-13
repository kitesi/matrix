<script>
    import DropDown from "../DropDown.svelte";
    import { matrixs } from "../../../stores.js";

    export let validate;
    export let id;
    export let defaultOptionLetter;
</script>

<DropDown {id}>
    {#each $matrixs as matrix}
        {#if !validate || validate(matrix)}
            <option value={matrix.letter} selected={defaultOptionLetter && matrix.letter === defaultOptionLetter}>
                Matrix {matrix.letter}
            </option>
        {/if}
    {/each}
</DropDown>