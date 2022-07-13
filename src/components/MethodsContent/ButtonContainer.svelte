<style>
    div {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    div :global(button) {
        background-color: #415985;
        color: white;
        border-radius: 5px;
    }

    div :global(button:disabled) {
        background-color: #444444;
    }
</style>

<div>
    <slot></slot>
</div>
