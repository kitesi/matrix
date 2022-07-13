<script>
    import { matrixs, currentMatrix } from '../stores.js';
    import { fly } from 'svelte/transition';
    import { alphabet } from '../strings.js';

    function addVariable() {
        let letter, index;

        // have to do this incase user deletes a matrix
        for (let i = 0; i < alphabet.length; i++) {
            if (!$matrixs.find((m) => m.letter === alphabet[i])) {
                letter = alphabet[i];
                index = i;
                break;
            }
        }

        $matrixs.splice(index, 0, {
            letter,
            equation: '',
            val: [
                [0, 0],
                [0, 0],
            ],
        });

        matrixs.set($matrixs);
    }

    function changeVariable() {
        const previousEl = document.querySelector('.current-variable');

        if (previousEl !== this) {
            previousEl.classList.remove('current-variable');
            this.classList.add('current-variable');

            //trying to find the relevant matrix in the array, might be better way
            //like making a new function inside of the for loop but that has its own problems
            const letter = this.children[0].textContent;
            currentMatrix.set($matrixs.find((m) => m.letter === letter));
        }
    }

    function closeList() {
        document.getElementById('matrix-list').classList.remove('show');
    }
</script>

<section id="matrix-list">
    <div class="transparent-dark-bg" on:click|self={closeList} />
    <aside>
        <button
            class="add-variable-btn"
            disabled={$matrixs.length === alphabet.length}
            on:click={addVariable}
        >
            <span>+</span>
        </button>
        <button class="close-btn red generic-btn" on:click={closeList}
            >Close</button
        >
        {#each $matrixs as matrix, i}
            <div
                class:current-variable={i === 0}
                transition:fly={{ x: 200, y: 0 }}
                on:click={changeVariable}
            >
                <h3>{matrix.letter}</h3>
                <h5>{matrix.val.length} x {matrix.val[0].length}</h5>
            </div>
        {/each}
    </aside>
</section>

<style>
    #matrix-list {
        grid-area: matrix-list;
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }

    section {
        height: 100%;
        overflow-y: auto;
    }

    aside {
        background-color: #262e36;
        box-sizing: border-box;
        padding: 10px;
        font-size: 30px;
        width: 200px;
        height: 100%;
        overflow-y: auto;
    }

    aside div {
        display: block;
        background-color: #525b64;
        text-align: center;
        cursor: pointer;
        padding: 10px 0;
        border-radius: 3px;
        margin-bottom: 10px;
        border: 4px solid transparent;
    }

    button {
        display: block;
        padding: 10px 0;
        border-radius: 5px;
        margin-bottom: 10px;
        border: none;
        width: 100%;
    }

    button:disabled {
        background-color: #747272;
        color: white;
    }

    span {
        transition: transform 0.2s ease-in;
    }

    button:disabled span {
        display: block;
        transform: rotate(45deg);
    }

    .current-variable {
        border-color: gainsboro;
    }

    .add-variable-btn {
        font-size: 30px;
    }

    .close-btn {
        display: none;
        font-size: 20px;
        padding: 15px 0;
    }

    @media screen and (max-width: 1000px) {
        #matrix-list,
        aside,
        .transparent-dark-bg {
            pointer-events: none;
        }

        #matrix-list {
            position: absolute;
        }

        aside {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
        }

        .transparent-dark-bg {
            transform: translateY(100%);
        }

        aside {
            transform: translateX(-100%);
            transition: transform 0.3s;
        }

        .close-btn {
            display: block;
        }

        :global(#matrix-list.show) {
            pointer-events: all;
        }

        :global(#matrix-list.show .transparent-dark-bg) {
            transform: translateY(0);
            pointer-events: all;
        }

        :global(#matrix-list.show aside) {
            transform: translateX(0);
            pointer-events: all;
        }
    }
</style>
