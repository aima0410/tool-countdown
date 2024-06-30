import { useState, useRef, useEffect } from 'react';
// ---- types ----
import TimerStatus from 'src/types/TimerStatus';
// ---- utiles ----
import { createTimerValueFromInput } from '@utils/createTimerValueUtils';
import { createTimerValueFromCountdown } from '@utils/createTimerValueUtils';

interface Props {
	timer: string;
	updateTimerState: (newTimerValue: string) => void;
	status: TimerStatus;
	switchStatusState: (newMode: TimerStatus) => void;
}

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
					console.log(timer);
					const newTimerValue = createTimerValueFromCountdown(timer);
					console.log(newTimerValue);
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
			<p>{status}</p>
			{showInput ? (
				<input
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
					onClick={() => {
						if (status === 'StandbyMode' || status === 'StopMode') {
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
