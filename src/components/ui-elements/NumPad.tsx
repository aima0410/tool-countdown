import { useState } from 'react';
// ---- utils ----
import { createTimerValueFromNumPad } from '@utils/createTimerValueUtils';
// ---- Components ----
import NumKey from '@ui-parts/NumKey';

interface Props {
	timer: string;
	updateTimerState: (newTimerValue: string) => void;
}

export default function NumPad({ timer, updateTimerState }: Props) {
	const [isInactiveNumKeys, setIsInactiveNumKeys] = useState({
		numKeys: false,
		funcKeys: true,
	});

	const handleClick = (key: string) => {
		let value: string = timer;
		if (key === 'AC') {
			value = '00:00';
		} else {
			value = createTimerValueFromNumPad(value, key);
		}
		const newTimerValue = value;
		updateTimerState(newTimerValue);
		updateIsInactiveState(newTimerValue);
	};

	const updateIsInactiveState = (newTimerValue: string) => {
		// NumPadのdisabled属性の状態を管理しているstate変数を新しいオブジェクトとしてコピー
		const nextIsinactiveNumKeysState = { ...isInactiveNumKeys };
		// 更新後のタイマーが"00:00"ならファンクションキーはdisabledに。
		const isInactiveFuncKeys = newTimerValue === '00:00';
		nextIsinactiveNumKeysState.funcKeys = isInactiveFuncKeys;
		// NumPadの新しいdisabled属性の状態をセット
		setIsInactiveNumKeys(nextIsinactiveNumKeysState);
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
					isInactive={isInactiveNumKeys}
				/>
				<NumKey
					num={2}
					value={null}
					onClick={() => {
						handleClick(String(2));
					}}
					isInactive={isInactiveNumKeys}
				/>
				<NumKey
					num={3}
					value={null}
					onClick={() => {
						handleClick(String(3));
					}}
					isInactive={isInactiveNumKeys}
				/>
			</div>
			<div>
				<NumKey
					num={4}
					value={null}
					onClick={() => {
						handleClick(String(4));
					}}
					isInactive={isInactiveNumKeys}
				/>
				<NumKey
					num={5}
					value={null}
					onClick={() => {
						handleClick(String(5));
					}}
					isInactive={isInactiveNumKeys}
				/>
				<NumKey
					num={6}
					value={null}
					onClick={() => {
						handleClick(String(6));
					}}
					isInactive={isInactiveNumKeys}
				/>
			</div>
			<div>
				<NumKey
					num={7}
					value={null}
					onClick={() => {
						handleClick(String(7));
					}}
					isInactive={isInactiveNumKeys}
				/>
				<NumKey
					num={8}
					value={null}
					onClick={() => {
						handleClick(String(8));
					}}
					isInactive={isInactiveNumKeys}
				/>
				<NumKey
					num={9}
					value={null}
					onClick={() => {
						handleClick(String(9));
					}}
					isInactive={isInactiveNumKeys}
				/>
			</div>
			<div>
				<NumKey
					num={null}
					value="C"
					onClick={() => {
						handleClick('C');
					}}
					isInactive={isInactiveNumKeys}
				/>
				<NumKey
					num={0}
					value={null}
					onClick={() => {
						handleClick(String(0));
					}}
					isInactive={isInactiveNumKeys}
				/>
				<NumKey
					num={null}
					value="AC"
					onClick={() => {
						handleClick('AC');
					}}
					isInactive={isInactiveNumKeys}
				/>
			</div>
		</fieldset>
	);
}
