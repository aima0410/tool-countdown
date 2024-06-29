// ---- utils ----
import { createTimerValueFromNumPad } from '@utils/createTimerValueUtils';
// ---- Components ----
import NumKey from '@ui-parts/NumKey';

const PadKeysStatus = {
	StandbyMode: { numKeys: false, funcKeys: true },
	InputMode: { numKeys: false, funcKeys: true },
	ErrorMode: { numKeys: false, funcKeys: true },
	PlayMode: { numKeys: true, funcKeys: true },
	StopMode: { numKeys: false, funcKeys: true },
};

type TimerStatus = 'StandbyMode' | 'InputMode' | 'ErrorMode' | 'PlayMode' | 'StopMode';

interface Props {
	timer: string;
	updateTimerState: (newTimerValue: string) => void;
	status: TimerStatus;
	switchStatusState: (newMode: TimerStatus) => void;
}

export default function NumPad({ timer, updateTimerState, status, switchStatusState }: Props) {
	if (timer !== '00:00') {
		PadKeysStatus[status].funcKeys = false;
	} else {
		PadKeysStatus[status].funcKeys = true;
	}
	const isInactive = PadKeysStatus[status];

	const handleClick = (key: string) => {
		// 01_NumKeyの入力値から新しいタイマーを作成
		{
			let value: string = timer;
			if (key === 'AC') {
				value = '00:00';
			} else {
				value = createTimerValueFromNumPad(value, key);
			}
			const newTimerValue = value;
			updateTimerState(newTimerValue);
		}
		// 02_StatusをStandbyModeに変更
		{
			if (status !== 'StandbyMode') {
				switchStatusState('StandbyMode');
			}
		}
	};

	return (
		<fieldset>
			<div>
				<NumKey
					num={1}
					value={null}
					onClick={() => {
						handleClick(String(1));
					}}
					isInactive={isInactive}
				/>
				<NumKey
					num={2}
					value={null}
					onClick={() => {
						handleClick(String(2));
					}}
					isInactive={isInactive}
				/>
				<NumKey
					num={3}
					value={null}
					onClick={() => {
						handleClick(String(3));
					}}
					isInactive={isInactive}
				/>
			</div>
			<div>
				<NumKey
					num={4}
					value={null}
					onClick={() => {
						handleClick(String(4));
					}}
					isInactive={isInactive}
				/>
				<NumKey
					num={5}
					value={null}
					onClick={() => {
						handleClick(String(5));
					}}
					isInactive={isInactive}
				/>
				<NumKey
					num={6}
					value={null}
					onClick={() => {
						handleClick(String(6));
					}}
					isInactive={isInactive}
				/>
			</div>
			<div>
				<NumKey
					num={7}
					value={null}
					onClick={() => {
						handleClick(String(7));
					}}
					isInactive={isInactive}
				/>
				<NumKey
					num={8}
					value={null}
					onClick={() => {
						handleClick(String(8));
					}}
					isInactive={isInactive}
				/>
				<NumKey
					num={9}
					value={null}
					onClick={() => {
						handleClick(String(9));
					}}
					isInactive={isInactive}
				/>
			</div>
			<div>
				<NumKey
					num={null}
					value="C"
					onClick={() => {
						handleClick('C');
					}}
					isInactive={isInactive}
				/>
				<NumKey
					num={0}
					value={null}
					onClick={() => {
						handleClick(String(0));
					}}
					isInactive={isInactive}
				/>
				<NumKey
					num={null}
					value="AC"
					onClick={() => {
						handleClick('AC');
					}}
					isInactive={isInactive}
				/>
			</div>
		</fieldset>
	);
}
