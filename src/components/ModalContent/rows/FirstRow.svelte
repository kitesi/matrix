<script>
	import RowDropDown from './RowDropDown.svelte';
</script>

<div id="first-row">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="dropdown-container">
		First Row:
		<RowDropDown id="first-row-value" />
	</label>
</div>
