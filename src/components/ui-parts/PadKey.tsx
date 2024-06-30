// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ==== KumaUI ====
const padKeyStyle = css`
	user-select: none;
	width: calc(33% - 10px);
	padding: 12px 0;
	border-radius: 5px;
	background-color: #fff;
	box-shadow:
		1px 1px 13px #ddd,
		0px 0px 13px #eee;
	margin: 0 6px 7px 0;
	color: #aaa;
	font-size: 24px;
	font-family: var(--num-font);
	font-weight: 600;
	text-align: center;
	transition: all 200ms ease;
	&:hover {
		user-select: none;
		background-color: #f5f5f5;
	}
	&:active {
		user-select: none;
		box-shadow: none;
	}
	&:disabled {
		pointer-events: none;
		background-color: #f5f5f5;
		color: #e3e3e3;
	}
`;

// ==== 型定義 ====
interface Props {
	num: number | null;
	value: string | null;
	onClick: () => void;
	isInactive: {
		numKeys: boolean;
		funcKeys: boolean;
	};
}

// ==== コンポーネント関数 ====
export default function PadKey({ num, value, onClick, isInactive }: Props) {
	const isDisabled = value ? isInactive.funcKeys : isInactive.numKeys;

	return (
		<button onClick={onClick} disabled={isDisabled} className={padKeyStyle}>
			{num ?? value}
		</button>
	);
}
