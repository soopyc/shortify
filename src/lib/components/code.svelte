<script>
	export let selectable = false;
</script>

<code
	class:select-all={selectable}
	class="font-mono py-0 px-2 rounded-md bg-gray-3 dark:bg-gray-7 text-light-red dark:text-dark-red"
>
	<slot />
</code>
