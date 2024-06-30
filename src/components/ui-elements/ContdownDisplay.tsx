import { useState, useRef, useEffect } from 'react';
// ---- types ----
import TimerStatus from 'src/types/TimerStatus';
// ---- utiles ----
import { createTimerValueFromInput } from '@utils/createTimerValueUtils';
import { createTimerValueFromCountdown } from '@utils/createTimerValueUtils';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ==== KumaUI CSS ====
const timerStyle = css`
	width: 90%;
	border-radius: 10px;
	color: #595959;
	font-family: var(--num-font);
	font-size: clamp(50px, 18vw, 100px);
	text-align: center;
	font-weight: 600;
	letter-spacing: 0.03em;
	line-height: 1.3em;
`;

const timerPStyle = css`
	height: 1.3em;
	transition: all 300ms ease;
	&:hover {
		cursor: pointer;
		color: #6b7c80;
	}
`;

const timerFocusStyle = css`
	outline-color: #89c6b7;
	outline-offset: 0;
	border-radius: 10px;
	transition: all 200ms ease;
`;

// ==== 型定義 ====
interface Props {
	timer: string;
	updateTimerState: (newTimerValue: string) => void;
	status: TimerStatus;
	switchStatusState: (newMode: TimerStatus) => void;
}

// ==== コンポーネント関数 ====
export default function CountdownDisplay({
	timer,
	updateTimerState,
	status,
	switchStatusState,
}: Props) {
	const [showInput, setShowInput] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// 自動フォーカスするための設定
	useEffect(() => {
		if (showInput && inputRef.current) {
			inputRef.current.focus();
		}
	}, [showInput]);

	// カウントダウン設定
	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (status === 'PlayMode') {
			intervalId = setInterval(() => {
				if (timer === '00:01' || timer === '00:00') {
					clearInterval(intervalId);
					switchStatusState('DoneMode');
					updateTimerState('00:00');
				} else {
					const newTimerValue = createTimerValueFromCountdown(timer);
					updateTimerState(newTimerValue);
				}
			}, 1000);
		}
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [status, timer]);

	return (
		<>
			{showInput ? (
				<input
					className={`${timerStyle} ${timerFocusStyle}`}
					ref={inputRef}
					placeholder={timer}
					value={timer}
					type="text"
					pattern="[0-9:]*"
					maxLength={5}
					inputMode="numeric"
					onFocus={() => switchStatusState('InputMode')}
					onChange={() => {}}
					onKeyDown={e => {
						const newTimerValue = createTimerValueFromInput({
							e,
							inputRef,
							timer,
							status,
							switchStatusState,
						});
						updateTimerState(newTimerValue);
					}}
					onBlur={() => {
						setShowInput(false);
						switchStatusState('StandbyMode');
					}}
					name="countdown"
				/>
			) : (
				<p
					className={`${timerStyle} ${timerPStyle}`}
					onClick={() => {
						if (status === 'StandbyMode' || status === 'StopMode' || status === 'ResetMode') {
							setShowInput(true);
						}
					}}
				>
					{timer}
				</p>
			)}
		</>
	);
}
