'use strict';
{
  // ============================= 変数の宣言 ============================
  const timer = document.querySelector('#timer');
  const btn = document.querySelector('#btn');
  let endTime;
  let stopIntervalId;
  const timerLength = 5; // 00:00 5文字
  const checkCharacterHalf = '0123456789';
  const checkCharacterFull = '０１２３４５６７８９';
  // ============================= 関数の宣言 ============================
  function isCheckRemainingTime() {
    // 残り時間 ＝ 終了時刻 ー 現在時刻
    let countDown = endTime - new Date().getTime();
    // ③残り時間が0になった時点でタイマーを終了させる
    if (countDown < 0) {
      countDown = 3 * 60 * 1000;
      btn.disabled = false;
      onPress();
      clearInterval(stopIntervalId);
    }
    const totalSeconds = Math.floor(countDown / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minutesText = String(minutes).padStart(2, '0');
    const secondsText = String(seconds).padStart(2, '0');
    timer.value = `${minutesText + ':' + secondsText}`;
  }
  // ----------------------------
  function checkEKey(e) {
    for (let i = 0; i < checkCharacterHalf.length; i++) {
      // PCからの入力をチェック
      if (e.key === checkCharacterHalf[i]) {
        // return `${i}が一致しました`;
        return true;
      }
      // SPからの入力をチェック
      if (e.code === checkCharacterHalf[i]) {
        // return `${i}が一致しました`;
        return true;
      }
    }
    // return '何も一致しませんでした';
    return false;
  }
  // ----------------------------
  function isCreateAfterValue(nowText, addCharacter){
    // 文字列を配列化
    let array = nowText.split('');
    // 最初の１文字目を削除
    array.shift();
    // 末尾にkeyを追加
    array.push(`${addCharacter}`);
    // :を削除
    array.splice(1, 1);
    // :を別の場所に追加
    array.splice(2,0,':');
    // 配列を文字列に戻す
    const afterText = array.join('');
    timer.value = afterText;
  }
  // ----------------------------
  function onPress() {
    const audioCtx = new window.AudioContext()

    const nodes = [
      audioCtx.createOscillator(),
      audioCtx.createOscillator()
    ]
    const hz = 1700
    nodes.map(node => {
      node.type = 'sine'
      node.frequency.setValueAtTime(hz, audioCtx.currentTime)
      // オシレーターノードを出力先(スピーカー)に接続
      node.connect(audioCtx.destination)
    })

    const length = 0.1
    const rest = 0.025
    nodes[0].start(audioCtx.currentTime) // 0
    nodes[0].stop(audioCtx.currentTime + length) // 0.1
    nodes[1].start(audioCtx.currentTime + length + rest) // 0.125
    nodes[1].stop(audioCtx.currentTime + length * 2 + rest) // 0.225
  }
  // ============================= イベントの設置 ============================
  timer.addEventListener('click', (e) => {
    if (!(timer.value)) {
      timer.value = '00:00';
    }
    timer.setSelectionRange(timer.value.length, timer.value.length);
  });
  // ----------------------------
  timer.addEventListener('focus', () => {
    const message = document.createElement('p');
    message.textContent = 'そのまま半角数字を入力し、タイマーをセットして下さい。';
    message.setAttribute('id', 'message');
    timer.parentNode.insertBefore(message, btn);
  });
  // ----------------------------
  timer.addEventListener('blur', () => {
    const message = document.querySelector('#message');
    message.remove();
    const p = timer.value;
  });
  // ----------------------------
  timer.addEventListener('input', (e) => {
    const inputText = e.target.value;
    let addedCharacters = inputText.slice(timerLength);
    const beforeText = inputText.replace(addedCharacters, '');
    timer.value = beforeText;
    if(addedCharacters.length === 1){
      for(let i = 0; i < checkCharacterHalf.length; i++){
        // 半角数字と一致したらそのまま入力開始
        if(addedCharacters === checkCharacterHalf[i]){
          isCreateAfterValue(beforeText, addedCharacters);
        } 
      }
      // 全角数字と一致したら変換して入力開始
      for(let i = 0; i < checkCharacterFull.length; i++){
        // 半角数字と一致したらそのまま入力開始
        if(addedCharacters === checkCharacterFull[i]){
          addedCharacters = checkCharacterHalf[i];
          isCreateAfterValue(beforeText, addedCharacters);
        } 
      }
    }
  });
  // ----------------------------
  timer.addEventListener('keydown', (e) => {
    // 数字以外のキーをキャンセル（※Backspaceも含む）
    if (checkEKey(e)) {
      // valueの先頭２文字と同じキーが押された場合はバグが生じるのでキャンセル
      if (e.key === timer.value[0] || e.key === timer.value[1]) {
        e.preventDefault();
        // 現在の表示をダウンロード
        const beforeText = timer.value;
        isCreateAfterValue(beforeText, e.key);
      }
    } else {
      e.preventDefault();
    }
  });
  // ----------------------------
  // 【手順】
  // ①カウントダウンの終了時刻を求める（開始時刻＋カウントダウンタイム）
  btn.addEventListener('click', () => {
    endTime = new Date().getTime() + 3 * 60 * 1000;
    btn.disabled = true;
    // ②残り時間を求める
    stopIntervalId = setInterval(
      // 第2引数で指定した間隔で、第1引数の処理を繰り返す
      isCheckRemainingTime, // 関数を指定するだけなので()は付けない。
      100 // 何msで繰り返すのか
    );
  });
  // ============================= 処理の宣言 ============================
  window.addEventListener('load',()=>{

  });
}
