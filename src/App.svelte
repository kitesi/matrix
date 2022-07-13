<script>
    import MatrixList from './components/MatrixList.svelte';
    import CurrentMatrix from './components/CurrentMatrix.svelte';
    import InputModal from './components/InputModal.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        const buttons = document.getElementsByTagName('button');
        [...buttons].forEach((button) => {
            button.addEventListener('click', () => {
                button.classList.add('button-clicked');
            });

            button.addEventListener('animationend', () => {
                button.classList.remove('button-clicked');
            });
        });
    });
</script>

<main>
    <CurrentMatrix />
    <MatrixList />
</main>

<InputModal />

<style>
    main {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas: 'matrix-list matrix-container';
        height: 100%;
    }

    @media screen and (max-width: 1000px) {
        main {
            grid-template-columns: 1fr;
            grid-template-areas: 'matrix-container';
        }
    }
</style>
