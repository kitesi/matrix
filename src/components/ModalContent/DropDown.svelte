<script>
    export let id;
</script>

<!-- styling copied from this video by Kevin Powell:
    https://www.youtube.com/watch?v=bB14uo0Tu5A
-->
<style>
    div {
        position: relative;
        margin-top: 5px;
    }

    select {
        cursor: pointer;
        font-size: 1em;
        padding: 10px 50px 10px 15px;
        background-color: #7a3a31;
        color: white;
        width: 100%;
        border: 0;
        border-radius: 5px;
        appearance: none;
    }

    span {
        display: block;
        background-color: #6b2424;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 0 5px 5px 0;
        width: 40px;
        height: 100%;
        pointer-events: none;
    }

    span::after {
        --size: 6px;
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        left: 50%;
        top: 50%;
        border-left: var(--size) solid transparent;
        border-right: var(--size) solid transparent;
        border-top: var(--size) solid white;
        transform: translate(-50%, -50%);
    }
</style>

<div>
    <select {id}>
        <slot></slot>
    </select>
    <span></span>
</div>