<script lang="ts">
	import Figure, { type Color, type FigureKind } from './Figure.svelte'
	import { createField, type FieldData } from './fieldUtils'
	import { crossfade, fade, scale } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'

	type Row = FieldData[]
	type Board = Row[]

	let board: Board = createStartPosition()

	function createEmptyBoard(): Board {
		return new Array(8).fill(new Array(8).fill(createField.empty()))
	}

	function createEmptyRow(): Row {
		return new Array(8).fill(createField.empty())
	}

	function createPawnRow(color: Color): Row {
		return Array(8).fill('pawn').map(createField[color])
	}

	function createBackRow(color: Color): Row {
		const figures: FigureKind[] = [
			'rook',
			'knight',
			'bishop',
			'king',
			'queen',
			'bishop',
			'knight',
			'rook',
		]
		return figures.map(createField[color])
	}

	function createStartPosition(): Board {
		return new Array(8).fill(null).map((_, i) => {
			if (i === 0) return createBackRow('black')
			if (i === 1) return createPawnRow('black')
			if (i === 6) return createPawnRow('white')
			if (i === 7) return createBackRow('white')
			return createEmptyRow()
		})
	}

	const [send, receive] = crossfade({
		duration: 1500,
		easing: quintOut,
	})

	let marked: { row: number; col: number } | null = null

	type Position = {
		row: number
		col: number
	}

	function press(row: number, col: number) {
		if (marked) {
			moveFromTo(marked, { row, col })
			marked = null
			return
		}

		if (board[row][col].occupied) {
			marked = {
				row,
				col,
			}
		}
	}

	function moveFromTo(from: Position, to: Position) {
		const figure = board[from.row][from.col]
		board[from.row][from.col] = createField.empty()
		board[to.row][to.col] = figure
		board = board
	}
</script>

<div class="board">
	{#each board as row, i}
		<div class="row">
			{#each row as fieldData, j}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="field"
					class:marked={marked && marked.row === i && marked.col === j}
					on:click={() => press(i, j)}
				>
					{#if fieldData.occupied}
						<Figure
							color={fieldData.color}
							kind={fieldData.figure}
							key={fieldData.id}
							{send}
							{receive}
						/>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	$color: #555;

	.board {
		display: grid;
		grid-template-rows: repeat(8, 1fr);
		width: 35rem;
		background-color: #aaa;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
	}

	.marked {
		border: 5px solid blue;
	}

	.field {
		padding: 0.5rem;
	}

	.row:nth-of-type(2n) .field:nth-of-type(2n + 1) {
		background-color: $color;
	}

	.row:nth-of-type(2n + 1) .field:nth-of-type(2n) {
		background-color: $color;
	}
</style>
