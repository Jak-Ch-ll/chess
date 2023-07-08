export type Color = 'black' | 'white'
export type FigureKind =
	| 'pawn'
	| 'rook'
	| 'knight'
	| 'bishop'
	| 'queen'
	| 'king'

export type FieldData =
	| {
			occupied: false
	  }
	| {
			occupied: true
			color: Color
			figure: FigureKind
			id: `${Color}-${FigureKind}-${number}`
	  }

export const createField = {
	empty: (): FieldData => ({ occupied: false }),
	white: (figure: FigureKind, num: number): FieldData => ({
		occupied: true,
		color: 'white',
		figure,
		id: `white-${figure}-${num}`,
	}),
	black: (figure: FigureKind, num: number): FieldData => ({
		occupied: true,
		color: 'black',
		figure,
		id: `black-${figure}-${num}`,
	}),
}
