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
		// タイマーからコロンを除去、新しい文字列として新規作成
		const valueWithoutColon = timer.replace(':', '');
		// 配列化
		const array: Array<string> = valueWithoutColon.split('');

		// Backspaceだった場合は
		if (e.key === 'Backspace') {
			// 01_最後の１文字を削除
			array.pop();
			// 02_先頭に"0"を追加
			array.unshift('0');
			// 03_コロンを追加
			array.splice(2, 0, ':');
		} else {
			// 00_入力値の受け取り
			const newValue = e.key;
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
}

export function createTimerValueFromNumPad(value: string, key: string) {
	// タイマーからコロンを除去、新しい文字列として新規作成
	const valueWithoutColon = value.replace(':', '');
	// 配列化
	const array: Array<string> = valueWithoutColon.split('');

	if (key === 'C') {
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
