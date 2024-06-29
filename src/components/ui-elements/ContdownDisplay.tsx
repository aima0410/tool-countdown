import { useState, useRef, useEffect } from 'react';
// ---- utiles ----
import { createTimerValueFromInput } from '@utils/createTimerValueUtils';

type TimerStatus = 'StandbyMode' | 'InputMode' | 'ErrorMode' | 'PlayMode' | 'StopMode';

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

	useEffect(() => {
		// 自動フォーカスするための設定
		if (showInput && inputRef.current) {
			inputRef.current.focus();
		}
	}, [showInput]);

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
