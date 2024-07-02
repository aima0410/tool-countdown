// ---- types ----
import TimerStatus from 'src/types/TimerStatus';
// ---- Components ----
import ControlButton from '@ui-parts/ControlButton';
import DoneModal from '@components/ui-elements/DoneModal';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ==== 型定義 ====
interface Props {
	timer: string;
	updateTimerState: (newTimerValue: string | undefined) => void;
	initialTimer: string;
	saveInitialTimer: () => void;
	status: TimerStatus;
	switchStatusState: (newMode: TimerStatus) => void;
}

// ==== データの宣言 ====
// ControlPanelのボタンのdisabled属性のboolean値（モード毎に管理）
const standardMode = { start: false, stop: true, reset: true };
const ControlButtonsStatus = {
	StandbyMode: standardMode,
	InputMode: standardMode,
	ErrorMode: standardMode,
	PlayMode: { start: true, stop: false, reset: true },
	StopMode: { start: false, stop: true, reset: false },
	ResetMode: { start: false, stop: true, reset: false },
	DoneMode: { start: true, stop: true, reset: true },
};

// ==== コンポーネント関数 ====
export default function ControlPanel({
	timer,
	updateTimerState,
	initialTimer,
	saveInitialTimer,
	status,
	switchStatusState,
}: Props) {
	const isInactive = ControlButtonsStatus[status];

	// STARTボタンのイベントハンドラ関数
	const handleClickStart = () => {
		status !== 'StopMode' && saveInitialTimer();
		switchStatusState('PlayMode');
	};
	// STOPボタンのイベントハンドラ関数
	const handleClickStop = () => {
		switchStatusState('StopMode');
	};
	// RESETボタンのイベントハンドラ関数
	const handleClickReset = () => {
		if (status === 'StopMode') {
			updateTimerState(initialTimer);
			switchStatusState('ResetMode');
		} else {
			updateTimerState('00:00');
			switchStatusState('StandbyMode');
		}
	};

	return (
		<>
			<fieldset
				className={css`
					all: unset;
					display: flex;
					flex-direction: column;
					width: 100%;
					margin-bottom: 25px;
				`}
			>
				<ControlButton
					value="START"
					isInactive={timer === '00:00' ? true : isInactive.start}
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
				<DoneModal
					updateTimerState={updateTimerState}
					switchStatusState={switchStatusState}
					initialTimer={initialTimer}
				/>
			)}
		</>
	);
}
