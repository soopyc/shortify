<script lang="ts">
	import { page } from "$app/stores";

	export let active = false;
	export let id: String;
</script>

<a href="#{id}" class:active>
	<slot />
</a>

<style lang="less">
	.active {
		
	}
</style>
