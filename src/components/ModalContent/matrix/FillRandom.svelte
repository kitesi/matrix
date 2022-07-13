<script>
    import { numberPattern as pattern} from "../../../strings.js";
</script>

<div id="fill-random">
    <label>Minimum: <input type="text" id="random-min" inputmode="numeric" {pattern} value="1" required></label>
    <label>Maximum: <input type="text" id="random-max" inputmode="numeric" {pattern} value="3" required></label>
</div>
