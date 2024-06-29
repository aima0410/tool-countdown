import { isValidInputKey } from '@utils/validateUtils';

interface Props {
	e: React.KeyboardEvent<HTMLInputElement>;
	inputRef: React.RefObject<HTMLInputElement>;
	timer: string;
}

export function createTimerValueFromInput({ e, inputRef, timer }: Props) {
	/* 00_バリデーションと早期リターン */
	{
		// 有効な入力じゃなかった場合は早期リターン
		const isEarlyReturn = !isValidInputKey(e.key);
		if (isEarlyReturn) {
			e.preventDefault();
			return timer;
		}
		// Enterだった場合はフォーカスを外して早期リターン
		if (e.key === 'Enter') {
			inputRef.current?.blur();
			return timer;
		}
	}

	/* 01_タイマーの値を作成してセットする */
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

export function createTimerValueFromNumPad(value: string, key: string) {
	// keyが「C」だった場合はdeleteする
	const isDelete = key === 'C';
	const prevTimerValue = value;
	const newTimerValue = createTimerValue({ prevTimerValue, key, isDelete });
	return newTimerValue;
}

// =================== このファイル内でのみ使用する関数 ===================
interface TimerUpdatePorps {
	prevTimerValue: string;
	key: string;
	isDelete: boolean;
}

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
