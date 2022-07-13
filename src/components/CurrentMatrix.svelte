<script>
    import MatrixContainer from "./MatrixContainer.svelte";
    import MatrixMethods from "./MatrixMethods.svelte";

    import { currentMatrix, matrixs } from "../stores.js";

    let matrix = $currentMatrix.val;
    let rows = matrix.length;
    let columns = matrix[0].length;

    currentMatrix.subscribe(nextMatrix => {
        matrix = nextMatrix.val;
        columns = matrix[0].length;
        rows = matrix.length;
    });

    function handleDimensionsChange() {
        const newColumns = parseInt(columns);
        const newRows = parseInt(rows);

        const prevRows = matrix.length;
        const prevColumns = matrix[0].length;

        if(newRows > prevRows) {
          for(let i = prevRows; i < newRows; i++) {
            matrix[i] = new Array(newColumns).fill(0);
          }
        } else if (newRows < prevRows) {
          matrix.length = newRows;
        }

        if(newColumns > prevColumns) {
          let difference = newColumns - prevColumns;
        
          for(let i = 0; i < prevRows; i++) {
            matrix[i].splice(difference, 0, ...new Array(difference).fill(0));
          }
        } else if (newColumns < prevColumns) {
          let difference = prevColumns - newColumns;

          for(let i = 0; i < prevRows; i++) {
            const row = matrix[i];
            row.splice(row.length - difference, difference);
          }
        }

        currentMatrix.set($currentMatrix);
        matrixs.set($matrixs);
    }

    function showMatrixMethods() {
        document.getElementById("matrix-methods").classList.add("show");
    }

    function showMatrixList() {
        document.getElementById("matrix-list").classList.add("show");
    }
</script>

<style>
    main {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas: "description methods"
                             "matrix methods";
        color: white;
    }

    h2 {
        font-size: 2em;
    }

    p {
        font-size: 1.1em;
        margin-top: 10px;
        max-width: 600px;
    }

    section {
        padding: 20px 20px 0 20px;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
    }

    label {
        background-color: #2e343a;
        padding: 10px;
        border-radius: 5px;
    }

    input {
        text-align: center;
        width: 12px;
        padding: 2px 5px;
    }

    button {
        padding: 0 15px;
        font-size: 18px;
        border: none;
    }

    .neutral {
        display: none;
        background-color: #E5A227;
        border-radius: 5px;
        padding: 10px 15px;
    }

    @media screen and (max-width: 1550px) {
        main {
            grid-template-columns: 1fr;
        }

        .matrix-methods-btn {
            display: block;
        }
    } 

    @media screen and (max-width: 1000px) {
        .matrix-list-btn {
            display: block;
        }
    }
</style>

<main>
    <section>
        <h2>Matrix {$currentMatrix.letter}</h2>
        <p>Valid numbers for columns and rows are 1-9. Although on mobile phones, columns should be less than 5.
            <br>
            <br>
            For now it also only allows numbers as items/elements.
        </p>
        <form on:submit|preventDefault={handleDimensionsChange}>
            <label>
                Rows:
                <input type="text" inputmode="numeric" pattern="[1-9]" bind:value={rows} required>
            </label>
            <label>
                Columns:
                <input type="text" inputmode="numeric" pattern="[1-9]" bind:value={columns} required>
            </label>
            <button class="green generic-btn">Change</button>
            <button class="neutral matrix-list-btn" on:click={showMatrixList}>Open Matrix List</button>
            <button class="neutral matrix-methods-btn" on:click={showMatrixMethods}>Open Methods</button>
        </form>
    </section>
    <MatrixContainer {matrix}/>
    <MatrixMethods />
</main>