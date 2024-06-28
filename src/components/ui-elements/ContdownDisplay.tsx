import { useState, useRef, useEffect } from 'react';
// ---- utiles ----
import createTimerValue from '@utils/createTimerValue';

export default function CountdownDisplay() {
	const [showInput, setShowInput] = useState(false);
	const [timer, setTimer] = useState('00:00');
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
					onChange={e => {
						createTimerValue({ e, setTimer });
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
