import { useState, useRef, useEffect } from 'react';
// ---- utiles ----
import { createTimerValueFromInput } from '@utils/createTimerValueUtils';

interface Props {
	timer: string;
	updateTimerState: (newTimerValue: string) => void;
}

export default function CountdownDisplay({ timer, updateTimerState }: Props) {
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
			{showInput ? (
				<input
					ref={inputRef}
					placeholder={timer}
					value={timer}
					type="text"
					pattern="[0-9:]*"
					maxLength={5}
					inputMode="numeric"
					onChange={() => {}}
					onKeyDown={e => {
						const newTimerValue = createTimerValueFromInput({ e, inputRef, timer });
						updateTimerState(newTimerValue);
					}}
					onBlur={() => {
						setShowInput(false);
					}}
					name="countdown"
				/>
			) : (
				<p
					onClick={() => {
						setShowInput(true);
					}}
				>
					{timer}
				</p>
			)}
		</>
	);
}
