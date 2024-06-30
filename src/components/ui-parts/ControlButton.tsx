// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ==== KumaUI CSS ===
const btnStyle = css`
	user-select: none;
	width: calc(50% - 10px);
	border-radius: 5px;
	box-shadow: 0 5px 5px #ddd;
	text-align: center;
	letter-spacing: 0.07em;
	font-weight: 500;
	transition: all 300ms ease;
	&:hover {
		user-select: none;
	}
	&:active {
		user-select: none;
		box-shadow: none;
		transform: translateY(2px);
	}
	&:disabled {
		pointer-events: none;
		box-shadow: none;
		transform: translateY(2px);
	}
`;

const startBtnStyle = css`
	z-index: 20;
	width: 100%;
	padding: 22px 0;
	background-color: #7eb8a9;
	margin-bottom: 20px;
	color: #fff;
	font-size: 30px;
	&:hover {
		background-color: #679a8c;
	}
	&:disabled {
		background-color: #669589;
		color: #b9b7b7;
	}
`;

const stopResetBtnStyle = css`
	z-index: 10;
	padding: 18px 0;
	border: solid 2px #7eb8a9;
	background-color: #fff;
	margin-bottom: 20px;
	color: #7eb8a9;
	font-size: 25px;
	&:hover {
		border: solid 2px #a3d2c5;
		color: #a3d2c5;
	}
	&:disabled {
		border: solid 2px #a9b6b3;
		color: #cdcdcd;
	}
`;

// ==== 型定義 =====
interface Props {
	value: string;
	isInactive: boolean;
	onClick: () => void;
}

// ==== コンポーネント関数 ====
export default function ControlButton({ value, isInactive, onClick }: Props) {
	return (
		<button
			className={`
				${btnStyle}
				${value === 'START' ? startBtnStyle : stopResetBtnStyle}
			`}
			onClick={onClick}
			disabled={isInactive}
		>
			{value}
		</button>
	);
}
