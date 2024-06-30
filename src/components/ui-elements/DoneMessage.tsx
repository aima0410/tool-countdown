import { useState, useEffect } from 'react';
// ---- Types ----
import TimerStatus from 'src/types/TimerStatus';

interface Props {
	updateTimerState: (newTimerValue: string) => void;
	switchStatusState: (newMode: TimerStatus) => void;
	initialTimer: string;
}

export default function DoneMessage({ updateTimerState, switchStatusState, initialTimer }: Props) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 500); // 500ms遅延

		return () => clearTimeout(timer); // コンポーネントのアンマウント時にタイマーをクリア
	}, []);

	return isVisible ? (
		<div>
			タイマー完了！
			<button
				onClick={() => {
					updateTimerState(initialTimer);
					switchStatusState('StandbyMode');
				}}
			>
				CLOSE
			</button>
		</div>
	) : null;
}
