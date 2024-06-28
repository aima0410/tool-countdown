interface Props {
  e: React.KeyboardEvent<HTMLInputElement>;
	timer: string;
	setTimer: React.Dispatch<React.SetStateAction<string>>;
}

export default function createTimerValue({ e, timer, setTimer }: Props) {
	// 00_入力値の受け取り
	const newValue = e.key;

	// 01_配列化したstete変数を取得　※文字列はイミュータブル
	const array = timer.split('');

	// 02_最初の１文字目を削除
	array.shift();

	// 03_末尾に「入力値（value）」を追加
	array.push(newValue);

	// 04_セミコロンを削除
	array.splice(1, 1);

	// 05_セミコロンを別の場所に追加
	array.splice(2, 0, ':');

	// 06_配列を文字列に戻す
	const newTimerValue = array.join('');

	// 07_stateのセット関数に新しいタイマーをセット
	setTimer(newTimerValue);
}
