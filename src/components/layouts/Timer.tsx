import { useState } from 'react';
// ---- Components ----
import CountdownDisplay from '@ui-elements/ContdownDisplay';
import ControlPanel from '@ui-elements/ControlPanel';
import NumPad from '@ui-elements/NumPad';

export default function Timer() {
	const [timer, setTimer] = useState('00:00');

	const updateTimerValue = (newTimerValue: string | undefined) => {
		setTimer(newTimerValue ?? '00:00');
	};

	return (
		<section>
			<CountdownDisplay timer={timer} updateTimerValue={updateTimerValue} />
			<ControlPanel />
			<NumPad timer={timer} updateTimerValue={updateTimerValue} />
		</section>
	);
}
