// ---- types ----
import TimerStatus from 'src/types/TimerStatus';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ==== 型定義 ====
interface Props {
	timer: string;
	status: TimerStatus;
}

// ==== コンポーネント関数 ====
export default function Message({ timer, status }: Props) {
	let message: string | null = null;
	let color: string = '#689a8d';
	let top: string = '1px';
	if (status === 'InputMode') {
		message =
			timer === '00:00' ? 'そのまま数字を入力して下さい。' : 'Enterでカウントダウンが始まります。';
	} else if (status === 'ErrorMode') {
		message = '有効な値を入力して下さい。';
		color = 'rgb(248, 83, 83)';
	} else if (status === 'PlayMode') {
		message = 'STOP を押すとカウントダウンを一時停止できます。';
		top = '-8px';
	} else if (status === 'StopMode') {
		message = 'カウントダウンを一時停止中です。';
		top = '-8px';
	} else if (status === 'ResetMode') {
		message = 'もう一度 RESET を押すと０秒にリセットできます。';
		top = '-8px';
	}
	return (
		<div
			className={css`
				display: grid;
				place-content: center;
				width: 100%;
				height: 40px;
			`}
		>
			<p
				className={css`
					font-size: 12px;
					text-align: center;
					@media (max-width: 500px) {
						font-size: 9px;
					}
				`}
				style={{ position: 'relative', top: top, color: color }}
			>
				{message}
			</p>
		</div>
	);
}
