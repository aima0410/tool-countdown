import { isValidInputKey } from '@utils/validateUtils';

interface Props {
	e: React.KeyboardEvent<HTMLInputElement>;
	inputRef: React.RefObject<HTMLInputElement>;
	timer: string;
	setTimer: React.Dispatch<React.SetStateAction<string>>;
}

export default function createTimerValue({ e, inputRef, timer, setTimer }: Props) {
	/* 00_バリデーションと早期リターン */
	{
		// 有効な入力じゃなかった場合は早期リターン
		const isEarlyReturn = !isValidInputKey(e.key);
		console.log(isEarlyReturn);
		if (isEarlyReturn) {
			e.preventDefault();
			return;
		}
		// Enterだった場合はフォーカスを外して早期リターン
		if (e.key === 'Enter') {
			inputRef.current?.blur();
			return;
		}
	}

	/* 01_タイマーの値を作成してセットする */
	{
		let array: Array<string>;

		// Backspaceだった場合は
		if (e.key === 'Backspace') {
			// 01_配列化したstate変数を取得　※文字列はイミュータブル
			array = timer.split('');
			// 02_最後の１文字を削除
			array.pop();
			// 03_先頭に"0"を追加
			array.unshift('0');
			// 04_セミコロンを削除
			array.splice(3, 1);
			// 05_別の場所にセミコロンを追加
			array.splice(2, 0, ':');
		} else {
			// 00_入力値の受け取り
			const newValue = e.key;
			// 01_配列化したstete変数を取得　※文字列はイミュータブル
			array = timer.split('');
			// 02_最初の１文字目を削除
			array.shift();
			// 03_末尾に「入力値（value）」を追加
			array.push(newValue);
			// 04_セミコロンを削除
			array.splice(1, 1);
			// 05_セミコロンを別の場所に追加
			array.splice(2, 0, ':');
		}
		// 06_配列を文字列に戻す
		const newTimerValue = array.join('');
		// 07_stateのセット関数に新しいタイマーをセット
		setTimer(newTimerValue);
	}
}
