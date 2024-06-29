import { useState } from 'react';
// ---- Components ----
import CountdownDisplay from '@ui-elements/ContdownDisplay';
import ControlPanel from '@ui-elements/ControlPanel';
import NumPad from '@ui-elements/NumPad';

type TimerStatus = 'StandbyMode' | 'InputMode' | 'PlayMode' | 'StopMode';

export default function Timer() {
	const [timer, setTimer] = useState('00:00');
	const [status, setStatus] = useState<TimerStatus>('StandbyMode');

	const updateTimerState = (newTimerValue: string | undefined) => {
		setTimer(newTimerValue ?? '00:00');
	};

	const updateStatusState = (newMode: TimerStatus) => {
		setStatus(newMode);
	};

	return (
		<section>
			<CountdownDisplay timer={timer} updateTimerState={updateTimerState} />
			<ControlPanel updateStatusState={updateStatusState} />
			<NumPad timer={timer} updateTimerState={updateTimerState} />
		</section>
	);
}
