<script>
    import { numberPattern as pattern} from "../strings.js";
    export let matrix;
</script>

<style>
    section {
        box-sizing: border-box;
        position: relative;
        border-left: #64707c 5px solid;
        border-right: #64707c 5px solid;
        padding: 13px 10px;
        margin-top: 10px;
    }

    input {
        background-color: #262e36;
        color: white;
        text-align: center;
        width: 50px;
        font-size: 18px;
        padding: 10px 10px;
    }

    .left::before, .left::after, .right::before, .right::after {
        display: block;
        content: "";
        position: absolute;
        background-color: #64707c;
        height: 5px;
        width: 3%;
        max-width: 12px;
    }

    .left::before {
        top: 0px;
        left: 0px;
    }

    .left::after {
        bottom: 0px;
        left: 0px;
    }

    .right::before {
        top: 0px;
        right: 0px;
    }

    .right::after {
        bottom: 0px;
        right: 0px;
    }

    .matrix-container {
        grid-area: matrix;
    }

    .matrix {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(var(--columns), 1fr);
        grid-template-rows: repeat(var(--rows), 1fr);
    }
</style>

<div class="matrix-container center">
    <section>
        <div class="left"></div>
        <div class="right"></div>
        <div class="matrix" style="--columns: {matrix[0].length}; --rows: {matrix.length};">
            {#each matrix as row}
                {#each row as item, j}
                    <input class="matrix-item" type="text" bind:value={row[j]} inputmode="numeric" 
                        {pattern} placeholder="0" required>
                {/each}
            {/each}
        </div>
    </section>
</div>