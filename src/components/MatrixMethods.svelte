<script>
    import ButtonContainer from './MethodsContent/ButtonContainer.svelte';
    import FillItems from './MethodsContent/matrix/FillItems.svelte';
    import MatrixScalar from './MethodsContent/matrix/MatrixScalar.svelte';
    import MatrixByMatrix from './MethodsContent/matrix/MatrixByMatrix.svelte';
    import RowByRow from './MethodsContent/rows/RowByRow.svelte';
    import RowScalar from './MethodsContent/rows/RowScalar.svelte';

    import ErrorMessage from './ErrorMessage.svelte';
    import { currentMatrix, matrixs } from '../stores.js';

    let error = '';

    function setError(message) {
        error = message;
    }

    function deleteMatrix() {
        const index = $matrixs.findIndex((m) => m === $currentMatrix);
        $matrixs.splice(index, 1);
        matrixs.set($matrixs);
        currentMatrix.set($matrixs[0]);

        // when a matrix is removed svelte re-evaluates the {#each} block and makes the place of the
        // deleted matrix as the next current
        const nextCurrentBySvelte = document.querySelector('.current-variable');
        const realNextCurrent = document.querySelector(
            '#matrix-list aside div'
        );

        nextCurrentBySvelte.classList.remove('current-variable');
        realNextCurrent.classList.add('current-variable');
    }

    function closeModal() {
        document.getElementById('matrix-methods').classList.remove('show');
    }
</script>

{#if error}
    <ErrorMessage message={error} {setError} />
{/if}
<div id="matrix-methods">
    <div class="transparent-dark-bg" on:click|self={closeModal} />
    <section>
        <ul>
            <li>X = current matrix</li>
            <li>Y = second matrix</li>
            <li>I = Identity matrix</li>
            <li>n = any integer or float</li>
            <li>R<sub>x</sub> = any row on the current matrix</li>
            <li>R<sub>y</sub> = another row on the current matrix</li>
        </ul>
        <ButtonContainer>
            <FillItems {setError} />
            <MatrixScalar />
            <MatrixByMatrix {setError} />
            <RowByRow {setError} />
            <RowScalar />
        </ButtonContainer>
        <div class="major-methods">
            <button
                class="red generic-btn close-modal-btn"
                on:click={closeModal}
            >
                Close Modal
            </button>
            <button
                class="red generic-btn"
                on:click={deleteMatrix}
                disabled={$matrixs.length === 1}
            >
                Delete Matrix
            </button>
        </div>
    </section>
</div>

<style>
    #matrix-methods {
        height: 100%;
        grid-area: methods;
    }

    section {
        box-sizing: border-box;
        background-color: #262e36;
        padding: 20px;
        height: 100%;
        overflow-y: auto;
    }

    section :global(button) {
        font-size: 18px;
        padding: 10px 15px;
    }

    li {
        list-style-type: none;
    }

    ul {
        background-color: #161a20;
        padding: 20px;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    .major-methods {
        display: flex;
        gap: 10px;
    }

    .close-modal-btn {
        display: none;
    }

    @media screen and (max-width: 1550px) {
        section {
            position: absolute;
            top: 0;
            right: 0;
            max-width: 500px;
            transform: translateX(100%);
            transition: transform 0.3s;
        }

        .transparent-dark-bg {
            transform: translateY(100%);
        }

        .close-modal-btn {
            display: block;
        }

        :global(#matrix-methods.show .transparent-dark-bg) {
            transform: translateY(0);
        }

        :global(#matrix-methods.show section) {
            transform: translateX(0);
        }
    }
</style>
