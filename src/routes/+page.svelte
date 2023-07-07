<script lang="ts">
	type Figure = 'None' | 'Pawn' | 'Rook' | 'Knight' | 'Bishop' | 'Queen' | 'King';

	const fields: Figure[][] = new Array(8).fill(new Array(8).fill('None'));
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
