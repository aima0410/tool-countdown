// 引用元（https://zenn.dev/terrierscript/articles/2022-07-15-audio-context-sound-effect）
export function playCompletionSound() {
	const audioCtx = new window.AudioContext();

	const nodes = [audioCtx.createOscillator(), audioCtx.createOscillator()];
	const hz = 1700;
	nodes.map(node => {
		node.type = 'sine';
		node.frequency.setValueAtTime(hz, audioCtx.currentTime);
		// オシレーターノードを出力先(スピーカー)に接続
		node.connect(audioCtx.destination);
	});

	const length = 0.1;
	const rest = 0.025;
	nodes[0].start(audioCtx.currentTime); // 0
	nodes[0].stop(audioCtx.currentTime + length); // 0.1
	nodes[1].start(audioCtx.currentTime + length + rest); // 0.125
	nodes[1].stop(audioCtx.currentTime + length * 2 + rest); // 0.225
}
