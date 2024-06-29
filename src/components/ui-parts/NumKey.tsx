interface Props {
	num: number | null;
	value: string | null;
	onClick: () => void;
	isInactive: {
		numKeys: boolean;
		funcKeys: boolean;
	};
}

export default function NumKey({ num, value, onClick, isInactive }: Props) {
	const isDisabled = value ? isInactive.funcKeys : isInactive.numKeys;

	return (
		<button onClick={onClick} disabled={isDisabled}>
			{num ?? value}
		</button>
	);
}
