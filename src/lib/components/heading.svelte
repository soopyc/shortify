<script lang="ts">
	export let level = 1;
</script>

<div class="mt-3" class:text-3xl={level == 1} class:text-2xl={level == 2} class:text-xl={level == 3} {...$$restProps}>
	<slot />
</div>
