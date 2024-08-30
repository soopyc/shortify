<script lang="ts">
	export let placeholder: string;
	export let id: string;
	export let extraClass = "";
</script>

<input
	{placeholder}
	{id}
	type="text"
	class="rounded-md border-2 border-black dark:border-white dark:bg-black px-2 py-1 {extraClass}"
	{...$$restProps}
/>
