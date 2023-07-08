<script context="module" lang="ts">
	export type Color = 'black' | 'white'
	export type FigureKind =
		| 'pawn'
		| 'rook'
		| 'knight'
		| 'bishop'
		| 'queen'
		| 'king'
</script>

<script lang="ts">
	import Pawn from '~icons/mdi/chess-pawn'
	import Rook from '~icons/mdi/chess-rook'
	import Knight from '~icons/mdi/chess-knight'
	import Bishop from '~icons/mdi/chess-bishop'
	import Queen from '~icons/mdi/chess-queen'
	import King from '~icons/mdi/chess-king'

	export let color: Color
	export let kind: FigureKind
	export let key: string
	export let send: any
	export let receive: any

	const iconMap: Record<FigureKind, ConstructorOfATypedSvelteComponent> = {
		pawn: Pawn,
		rook: Rook,
		knight: Knight,
		bishop: Bishop,
		queen: Queen,
		king: King,
	}
</script>

<div class="container" in:send={{ key }} out:receive={{ key }}>
	<svelte:component this={iconMap[kind]} {color} height="100%" width="100%" />
</div>

<style lang="scss">
</style>
