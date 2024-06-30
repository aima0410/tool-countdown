import { useState } from 'react';
// ---- types ----
import TimerStatus from 'src/types/TimerStatus';
// ---- Components ----
import ControlButton from '@ui-parts/ControlButton';
import DoneMessage from '@components/ui-elements/DoneMessage';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

interface Props {
	timer: string;
	updateTimerState: (newTimerValue: string | undefined) => void;
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
	ResetMode: standardMode,
	DoneMode: { start: true, stop: true, reset: true },
};

export default function ControlPanel({
	timer,
	updateTimerState,
	status,
	switchStatusState,
}: Props) {
	const [initialTimer, setInitialTimer] = useState('00:00');
	const isInactive = ControlButtonsStatus[status];

	const saveInitialTimer = () => {
		setInitialTimer(timer);
	};

	const handleClickStart = () => {
		status !== 'StopMode' && saveInitialTimer();
		switchStatusState('PlayMode');
	};
	const handleClickStop = () => {
		switchStatusState('StopMode');
	};
	const handleClickReset = () => {
		updateTimerState(initialTimer);
		switchStatusState('ResetMode');
	};

	return (
		<>
			<fieldset
				className={css`
					all: unset;
					display: flex;
					flex-direction: column;
					width: 100%;
				`}
			>
				<ControlButton
					value="START"
					isInactive={isInactive.start}
					onClick={() => {
						handleClickStart();
					}}
				/>
				{status === 'PlayMode' ||
				status === 'StopMode' ||
				status === 'ResetMode' ||
				status === 'DoneMode' ? (
					<div
						className={css`
							display: flex;
							justify-content: space-between;
							flex-wrap: wrap;
							width: 100%;
						`}
					>
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
				) : null}
			</fieldset>
			{status === 'DoneMode' && (
				<DoneMessage
					updateTimerState={updateTimerState}
					switchStatusState={switchStatusState}
					initialTimer={initialTimer}
				/>
			)}
		</>
	);
}
