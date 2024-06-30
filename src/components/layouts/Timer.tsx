import { useState } from 'react';
// ---- types ----
import TimerStatus from 'src/types/TimerStatus';
// ---- Components ----
import CountdownDisplay from '@ui-elements/ContdownDisplay';
import ControlPanel from '@ui-elements/ControlPanel';
import NumPad from '@ui-elements/NumPad';

export default function Timer() {
	const [timer, setTimer] = useState('00:00');
	const [status, setStatus] = useState<TimerStatus>('StandbyMode');

	const updateTimerState = (newTimerValue: string | undefined) => {
		setTimer(newTimerValue ?? '00:00');
	};

	const switchStatusState = (newMode: TimerStatus) => {
		setStatus(newMode);
	};

	return (
		<section>
			<CountdownDisplay
				timer={timer}
				updateTimerState={updateTimerState}
				status={status}
				switchStatusState={switchStatusState}
			/>
			<ControlPanel
				timer={timer}
				updateTimerState={updateTimerState}
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
