// ---- types ----
import TimerStatus from 'src/types/TimerStatus';
// ---- utils ----
import { createTimerValueFromNumPad } from '@utils/createTimerValueUtils';
// ---- Components ----
import PadKey from '@ui-parts/PadKey';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ==== KumaUI CSS ====
const PadRowStyle = css`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	padding:0 20px;
	border-radius: 10px;
`;

// ==== 型定義 ====
type PadKeys = {
	num: number | null;
	value: 'AC' | 'C' | null;
};

type RenderPadKey = PadKeys & {
	id: number;
};

interface Props {
	timer: string;
	updateTimerState: (newTimerValue: string) => void;
	status: TimerStatus;
	switchStatusState: (newMode: TimerStatus) => void;
}

// ==== コンポーネント関数 ====
export default function NumPad({ timer, updateTimerState, status, switchStatusState }: Props) {
	const isInactive = {
		numKeys: status === 'PlayMode' || status === 'DoneMode',
		funcKeys: status === 'PlayMode' || timer === '00:00',
	};

	const handleClick = (key: string) => {
		// 01_NumKeyの入力値から新しいタイマーを作成
		{
			// 「AC」かそれ以外かで条件分岐 → 新規タイマー作成
			const newTimerValue = key === 'AC' ? '00:00' : createTimerValueFromNumPad(timer, key);
			// 新しいタイマーをセット
			updateTimerState(newTimerValue);
		}
		// 02_StatusをStandbyModeに変更
		{
			if (status !== 'StandbyMode') switchStatusState('StandbyMode');
		}
	};

	const renderPadKey = ({ num, value, id }: RenderPadKey) => (
		<PadKey
			num={num}
			value={value}
			key={id}
			onClick={() => handleClick(value || String(num))}
			isInactive={isInactive}
		/>
	);

	const numPadKeys: PadKeys[][] = [
		// PadKey型オブジェクトの配列の配列
		[
			{ num: 1, value: null },
			{ num: 2, value: null },
			{ num: 3, value: null },
		],
		[
			{ num: 4, value: null },
			{ num: 5, value: null },
			{ num: 6, value: null },
		],
		[
			{ num: 7, value: null },
			{ num: 8, value: null },
			{ num: 9, value: null },
		],
		[
			{ num: null, value: 'C' },
			{ num: 0, value: null },
			{ num: null, value: 'AC' },
		],
	] as const; // 不変の配列、読み取り専用

	return (
		<fieldset
			className={css`
				all: unset;
				width: 100%;
				margin-bottom: 15px;
			`}
		>
			{numPadKeys.map((padRow, i) => (
				<div key={i} className={PadRowStyle}>
					{padRow.map((key, i) => renderPadKey({ num: key.num, value: key.value, id: i }))}
				</div>
			))}
		</fieldset>
	);
}
