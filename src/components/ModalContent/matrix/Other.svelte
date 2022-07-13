<script>
    import MatrixDropDown from "./MatrixDropDown.svelte";
    import { currentMatrix } from "../../../stores.js";
</script>

<div id="other-matrix">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="dropdown-container">
        Other Matrix (Y): <MatrixDropDown 
                id="other-matrix-value" 
                validate={(matrix) => matrix.letter !== $currentMatrix.letter } 
            />
    </label>
</div>
