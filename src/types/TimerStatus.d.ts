type TimerStatus =
	| 'StandbyMode' // default
	| 'InputMode' // 入力中, inputにフォーカス中
	| 'ErrorMode' // 無効な値を受け取ったとき
	| 'PlayMode' // カウントダウンの作動中
	| 'StopMode' // カウントダウンの一時停止中
	| 'ResetMode' // 最後にユーザが入力した値にタイマーがリセットされたとき
	| 'DoneMode'; // カウントダウン完了後、ユーザの操作待ち

export default TimerStatus;
