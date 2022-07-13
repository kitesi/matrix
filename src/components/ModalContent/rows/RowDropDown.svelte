<script>
    import DropDown from "../DropDown.svelte";
    import { currentMatrix } from "../../../stores.js";

    export let validate;
    export let id;
</script>

<DropDown {id}>
    {#each $currentMatrix.val as row, i}
        {#if !validate || validate(row)}
            <option value={i}>
                Row {i+1}
            </option>
        {/if}
    {/each}
</DropDown>