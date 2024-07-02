import { useState, useEffect } from 'react';
// ---- utils ----
import { playCompletionSound } from '@utils/soundUtils';
// ---- types ----
import TimerStatus from 'src/types/TimerStatus';
// ---- Components ----
import CountdownDisplay from '@ui-elements/ContdownDisplay';
import ControlPanel from '@ui-elements/ControlPanel';
import NumPad from '@ui-elements/NumPad';
import Message from '@components/ui-elements/Message';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';
import ClearTimerButton from '@components/ui-parts/ClearTimerButton';

// ==== コンポーネント関数 ====
export default function Timer() {
	const [timer, setTimer] = useState('00:00');
	const [initialTimer, setInitialTimer] = useState('00:00');
	const [status, setStatus] = useState<TimerStatus>('StandbyMode');

	// タイマーの値を更新
	const updateTimerState = (newTimerValue: string | undefined) => {
		setTimer(newTimerValue ?? '00:00');
	};

	// セットしたタイマーの値を保存
	const saveInitialTimer = () => {
		setInitialTimer(timer);
	};

	// タイマーのModeを変更
	const switchStatusState = (newMode: TimerStatus) => {
		setStatus(newMode);
	};

	// カウントダウン完了時のサウンド設定
	useEffect(() => {
		if (timer === '00:00' && status === 'DoneMode') {
			setTimeout(() => playCompletionSound(), 500);
		}
	}, [timer]);

	return (
		<section
			className={css`
				position: relative;
				display: grid;
				place-items: center;
				max-width: 500px;
				width: 86vw;
				padding: 50px 40px 40px;
				background-color: #fff;
				box-shadow:
					9px 9px 15px #8baa9d,
					-5px -5px 8px #a3d1c0;
				border-radius: 10px;
				margin: 0 auto 50px;
				@media (max-width: 500px) {
					padding: 50px 20px 20px;
				}
			`}
		>
			{timer !== '00:00' && status === 'StandbyMode' && (
				<ClearTimerButton updateTimerState={updateTimerState} />
			)}
			<CountdownDisplay
				timer={timer}
				updateTimerState={updateTimerState}
				saveInitialTimer={saveInitialTimer}
				status={status}
				switchStatusState={switchStatusState}
			/>
			<Message timer={timer} status={status} />
			<ControlPanel
				timer={timer}
				updateTimerState={updateTimerState}
				initialTimer={initialTimer}
				saveInitialTimer={saveInitialTimer}
				status={status}
				switchStatusState={switchStatusState}
			/>
			<NumPad
				timer={timer}
				updateTimerState={updateTimerState}
				status={status}
				switchStatusState={switchStatusState}
			/>
		</section>
	);
}
