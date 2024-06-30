// ---- Images ----
import resetImg from '@assets/reset.svg';
// ---- KumaUI ---
import { css } from '@kuma-ui/core';

// ==== 型定義 ====
interface Props {
	updateTimerState: (newTimerValue: string) => void;
}

// ==== コンポーネント関数 ====
export default function ClearTimerButton({ updateTimerState }: Props) {
	return (
		<div
			onClick={() => {
				updateTimerState('00:00');
			}}
			className={css`
				position: absolute;
				top: 24px;
				right: 30px;
				display: flex;
				cursor: pointer;
				padding: 1px 12px;
				border: solid 1px #333;
				border-radius: 5px;
				color: #454a48;
				font-size: 12px;
				font-weight: 600;
				letter-spacing: 0.1em;
				transition:
					opacity 300ms ease-out,
					color 300ms ease-out,
					border 300ms ease-out,
					transform 300ms ease-out;
				&:hover {
					opacity: 0.7;
					color: #636363;
					border: solid 1px #49504e;
					transform: scale(1.03);
				}
			`}
		>
			<img
				src={resetImg}
				alt="タイマーを０秒にリセット"
				className={css`
					width: 10px;
					margin-right: 8px;
					transform: rotate(45deg);
				`}
			/>
			00:00
		</div>
	);
}
