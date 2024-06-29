import { useState } from 'react';
// ---- Components ----
import ControlButton from '@ui-parts/ControlButton';

type TimerStatus = 'StandbyMode' | 'InputMode' | 'PlayMode' | 'StopMode';

interface Props {
	updateStatusState: (newMode: TimerStatus) => void;
}

export default function ControlPanel({ updateStatusState }: Props) {
	const [isInactives, setIsInactives] = useState({ start: false, stop: true, reset: true });

	const handleClickStart = () => {
		setIsInactives({ start: true, stop: false, reset: true });
		updateStatusState('PlayMode');
	};
	const handleClickStop = () => {
		setIsInactives({ start: false, stop: true, reset: false });
		updateStatusState('StopMode');
	};
	const handleClickReset = () => {
		setIsInactives({ start: false, stop: true, reset: true });
		updateStatusState('StandbyMode');
	};

	return (
		<fieldset>
			<ControlButton value="START" isInactive={isInactives.start} onClick={handleClickStart} />
			<div>
				<ControlButton value="STOP" isInactive={isInactives.stop} onClick={handleClickStop} />
				<ControlButton value="RESET" isInactive={isInactives.reset} onClick={handleClickReset} />
			</div>
		</fieldset>
	);
}
