// ---- utils ----
import { isValidInputKey } from '@utils/validateUtils';
// ---- types ----
import TimerStatus from 'src/types/TimerStatus';

// ==== 型定義 ====
interface Props {
	e: React.KeyboardEvent<HTMLInputElement>;
	inputRef: React.RefObject<HTMLInputElement>;
	timer: string;
	status: TimerStatus;
	switchStatusState: (newMode: TimerStatus) => void;
}

interface TimerUpdatePorps {
	prevTimerValue: string;
	key: string;
	isDelete: boolean;
}

// =================== 外部ファイルで使用する関数 ===================
// ---- Input入力値からタイマーの新しい値を作成 ----
export function createTimerValueFromInput({
	e,
	inputRef,
	timer,
	status,
	switchStatusState,
}: Props) {
	/* 00_バリデーションと早期リターン */
	{
		// 有効な入力じゃなかった場合は早期リターン
		const isEarlyReturn = !isValidInputKey(e.key);
		if (isEarlyReturn) {
			e.preventDefault();
			switchStatusState('ErrorMode');
			return timer;
		}
		// Enterだった場合はフォーカスを外して早期リターン
		if (e.key === 'Enter') {
			inputRef.current?.blur();
			switchStatusState('PlayMode');
			return timer;
		}
	}
	// 01_ErrorModeだった場合はInputModeに切り替え
	{
		status === 'ErrorMode' && switchStatusState('InputMode');
	}
	/* 02_タイマーの値を作成してセットする */
	{
		// keyを取得
		const key = e.key;
		// keyが「Backspace」だった場合はdeleteする
		const isDelete = key === 'Backspace';
		const prevTimerValue = timer;
		const newTimerValue = createTimerValue({ prevTimerValue, key, isDelete });
		return newTimerValue;
	}
}

// ---- PadKeyの入力値からタイマーの新しい値を作成 ----
export function createTimerValueFromNumPad(timer: string, key: string) {
	// keyが「C」だった場合はdeleteする
	const isDelete = key === 'C';
	const prevTimerValue = timer;
	const newTimerValue = createTimerValue({ prevTimerValue, key, isDelete });
	return newTimerValue;
}

// ---- カウントダウン時のタイマーの1秒後の値を作成 ----
export function createTimerValueFromCountdown(timer: string) {
	const m = Number(timer.substring(0, 2));
	const s = Number(timer.slice(-2));

	let newMinute;
	let newSecond;

	if (m >= 99 && s >= 60) {
		newMinute = String(m);
		newSecond = String(s - 1);
	} else if (s >= 60) {
		newMinute = String(m + 1).padStart(2, '0'); // 常に2桁
		newSecond = String(s - 60 - 1).padStart(2, '0');
	} else if (s === 0) {
		newMinute = String(m - 1).padStart(2, '0');
		newSecond = String(59);
	} else {
		newMinute = String(m).padStart(2, '0');
		newSecond = String(s - 1).padStart(2, '0');
	}

	return newMinute + ':' + newSecond;
}

// =================== このファイル内でのみ使用する関数 ===================
// ---- タイマーの値をいい感じに加工する【この関数は、2つの関数で共有されてる】----
function createTimerValue({ prevTimerValue, key, isDelete }: TimerUpdatePorps) {
	// 前のタイマーからコロンを除去、新しい文字列として新規作成
	const valueWithoutColon = prevTimerValue.replace(':', '');
	// 配列化
	const array: Array<string> = valueWithoutColon.split('');

	if (isDelete) {
		// 01_最後の１文字を削除
		array.pop();
		// 02_先頭に"0"を追加
		array.unshift('0');
		// 03_コロンを追加
		array.splice(2, 0, ':');
	} else {
		// 00_入力値の受け取り
		const newValue = key;
		// 01_最初の１文字目を削除
		array.shift();
		// 02_末尾に「入力値（value）」を追加
		array.push(newValue);
		// 03_コロンを追加
		array.splice(2, 0, ':');
	}
	// 配列を文字列に戻す
	const newTimerValue = array.join('');
	// 新しいタイマーをリターン
	return newTimerValue;
}
