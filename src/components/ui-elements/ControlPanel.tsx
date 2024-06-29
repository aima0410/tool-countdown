// ---- Components ----
import ControlButton from '@ui-parts/ControlButton';

type TimerStatus = 'StandbyMode' | 'InputMode' | 'ErrorMode' | 'PlayMode' | 'StopMode';

interface Props {
	updateTimerState: (newTimerValue: string | undefined) => void;
	initialTimer: string;
	saveInitialTimer: () => void;
	status: TimerStatus;
	switchStatusState: (newMode: TimerStatus) => void;
}

// ControlPanelのボタンのdisabled属性のboolean値（モード毎に管理）
const standardMode = { start: false, stop: true, reset: true };
const ControlButtonsStatus = {
	StandbyMode: standardMode,
	InputMode: standardMode,
	ErrorMode: standardMode,
	PlayMode: { start: true, stop: false, reset: true },
	StopMode: { start: false, stop: true, reset: false },
};

export default function ControlPanel({ updateTimerState, initialTimer, saveInitialTimer, status, switchStatusState }: Props) {
	const isInactive = ControlButtonsStatus[status];

	const handleClickStart = () => {
		status !== 'StopMode' && saveInitialTimer();
		switchStatusState('PlayMode');
	};
	const handleClickStop = () => {
		switchStatusState('StopMode');
	};
	const handleClickReset = () => {
		updateTimerState(initialTimer);
		switchStatusState('StandbyMode');
	};

	return (
		<fieldset>
			<ControlButton
				value="START"
				isInactive={isInactive.start}
				onClick={() => {
					handleClickStart();
				}}
			/>
			<div>
				<ControlButton
					value="STOP"
					isInactive={isInactive.stop}
					onClick={() => {
						handleClickStop();
					}}
				/>
				<ControlButton
					value="RESET"
					isInactive={isInactive.reset}
					onClick={() => {
						handleClickReset();
					}}
				/>
			</div>
		</fieldset>
	);
}
