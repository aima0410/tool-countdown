'use strict';
{
  // ============================= 変数の宣言 ============================
  const timer = document.querySelector('#timer');
  const doField = document.querySelector('#do-field');
  const startBtn = document.querySelector('#start-btn');
  const stopBtn = document.querySelector('#stop-btn');
  const resetBtn = document.querySelector('#reset-btn');
  const inputBtns = document.querySelectorAll('.input-btn');
  const inputNumBtns = document.querySelectorAll('.input-btn__num');
  const inputClearBtn = document.querySelector('#input-btn__clear');
  const inputAllClearBtn = document.querySelector('#input-btn__all-clear');
  let endTime;
  let nowTime;
  let stopIntervalId;
  let stopSetTimeOutId;
  const timerLength = 5; // 00:00 5文字
  const checkCharacterHalf = '0123456789'; // 半角の数字
  const checkCharacterFull = '０１２３４５６７８９'; // 全角の数字
  // ============================= 関数の宣言 ============================
  function isSetTimer() {
    const p = timer.value;
    const m = Number(p.slice(0, 2));
    const s = Number(p.slice(3, 5));
    const seconds = s % 60;
    const minutes = m + Math.floor(s / 60);
    const ms = (minutes * 60 * 1000) + (seconds * 1000);
    return ms;
  }
  // ----------------------------
  function isCheckRemainingTime() {
    // 残り時間 ＝ 終了時刻 ー 現在時刻
    let countDown = endTime - new Date().getTime();
    // ③残り時間が0になった時点でタイマーを終了させる
    if (countDown < 0) {
      setTimeout(onPress, 300);
      clearInterval(stopIntervalId);
      timer.value = '00:00';
      return;
    }
    countDown += 700;
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
  function isCreateAfterValue(nowText, addCharacter) {
    // 文字列を配列化
    let array = nowText.split('');
    // 最初の１文字目を削除
    array.shift();
    // 末尾にkeyを追加
    array.push(`${addCharacter}`);
    // :を削除
    array.splice(1, 1);
    // :を別の場所に追加
    array.splice(2, 0, ':');
    // 配列を文字列に戻す
    const afterText = array.join('');
    timer.value = afterText;
    if (timer.value === '00:00') {
      inputClearBtn.disabled = true;
      inputAllClearBtn.disabled = true;
    } else {
      inputClearBtn.disabled = false;
      inputAllClearBtn.disabled = false;
    }
  }
  // ----------------------------
  function isDeleteValue(nowText) {
    // 文字列を配列化
    let array = nowText.split('');
    // 最後の１文字目を削除
    array.pop();
    // 先頭に0を追加
    array.unshift('0');
    // :を削除
    array.splice(3, 1);
    // :を別の場所に追加
    array.splice(2, 0, ':');
    // 配列を文字列に戻す
    const afterText = array.join('');
    timer.value = afterText;
    if (timer.value === '00:00') {
      inputClearBtn.disabled = true;
      inputAllClearBtn.disabled = true;
    } else {
      inputClearBtn.disabled = false;
      inputAllClearBtn.disabled = false;
    }
  }
  // ----------------------------
  function isAlertTyping(b, message) {
    if (b) {
      if (document.querySelector('#alert')) {
        return;
      }
      const alert = document.createElement('p');
      alert.textContent = message;
      alert.setAttribute('id', 'alert');
      timer.parentNode.insertBefore(alert, doField);
    } else {
      if (document.querySelector('#alert')) {
        const alert = document.querySelector('#alert');
        alert.remove();
      }
    }
  }
  // ----------------------------
  // 引用元（https://zenn.dev/terrierscript/articles/2022-07-15-audio-context-sound-effect）
  function onPress() {
    const audioCtx = new window.AudioContext();

    const nodes = [
      audioCtx.createOscillator(),
      audioCtx.createOscillator()
    ];
    const hz = 1700;
    nodes.map(node => {
      node.type = 'sine';
      node.frequency.setValueAtTime(hz, audioCtx.currentTime);
      // オシレーターノードを出力先(スピーカー)に接続
      node.connect(audioCtx.destination);
    })

    const length = 0.1;
    const rest = 0.025;
    nodes[0].start(audioCtx.currentTime); // 0
    nodes[0].stop(audioCtx.currentTime + length); // 0.1
    nodes[1].start(audioCtx.currentTime + length + rest); // 0.125
    nodes[1].stop(audioCtx.currentTime + length * 2 + rest); // 0.225
  }
  // ============================= イベントの設置 ============================
  timer.addEventListener('click', (e) => {
    if (!(timer.value)) {
      timer.value = '00:00';
    }
    timer.setSelectionRange(timer.value.length, timer.value.length);

    stopBtn.disabled = true;
    resetBtn.disabled = true;
    stopBtn.classList.add('hide');
    resetBtn.classList.add('hide');
  });
  // ----------------------------
  timer.addEventListener('focus', () => {
    const message = document.createElement('p');
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 500) {
      message.textContent = '半角数字を入力し、タイマーをセットして下さい。';
    } else if (viewportWidth < 335) {
      message.textContent = '半角数字を入力し、タイマーをセットして下さい。';
    } else {
      message.textContent = 'そのまま半角数字を入力し、タイマーをセットして下さい。';
    }
    message.setAttribute('id', 'message');
    timer.parentNode.insertBefore(message, doField);
  });
  // ----------------------------
  timer.addEventListener('blur', () => {
    const message = document.querySelector('#message');
    message.remove();
    const p = timer.value;
    isAlertTyping(false, '');
  });
  // ----------------------------
  timer.addEventListener('input', (e) => {
    const inputText = e.target.value;
    let addedCharacters = inputText.slice(timerLength);
    const beforeText = inputText.replace(addedCharacters, '');
    timer.value = beforeText;
    if (addedCharacters.length === 1) {
      for (let i = 0; i < checkCharacterHalf.length; i++) {
        // 半角数字と一致したらそのまま入力開始
        if (addedCharacters === checkCharacterHalf[i]) {
          isCreateAfterValue(beforeText, addedCharacters);
        } else if (addedCharacters === checkCharacterFull[i]) {
          isAlertTyping(true, '※全角の数字は入力できません。');
        }
        // 全角数字と一致したら変換して入力開始
        // if(addedCharacters === checkCharacterFull[i]){
        //   addedCharacters = checkCharacterHalf[i];
        //   console.log(addedCharacters);
        //   isCreateAfterValue(beforeText, addedCharacters);
        // } 
      }
    }
  });
  // ----------------------------
  timer.addEventListener('keydown', (e) => {
    timer.dataset.savetime = 0;
    isAlertTyping(false, '');
    // 数字以外のキーをキャンセル（※Backspaceも含む）
    if (checkEKey(e)) {
      // valueの先頭２文字と同じキーが押された場合はバグが生じるのでキャンセル
      if ((e.key === timer.value[0] || e.key === timer.value[1]) || (e.code === timer.value[0] || e.code === timer.value[1])) {
        e.preventDefault();
        let keyCode = e.which || e.keyCode;
        const os = navigator.platform;
        if (keyCode === 229) {
          isAlertTyping(true, '※全角の数字は入力できません。');
        } else {
          if (os === "Windows") {
            // Windows の場合の処理
            if (keyCode >= 96 && keyCode <= 105) {
              isAlertTyping(true, '※全角の数字は入力できません。');
            } else {
              // 現在の表示をダウンロード
              const beforeText = timer.value;
              isCreateAfterValue(beforeText, e.key);
            }
          } else if (os === "macOS") {
            // macOS の場合の処理
            if (keyCode >= 106 && keyCode <= 115) {
              isAlertTyping(true, '※全角の数字は入力できません。');
            } else {
              // 現在の表示をダウンロード
              const beforeText = timer.value;
              isCreateAfterValue(beforeText, e.key);
            }
          } else {
            // その他の OS の場合の処理
            if (keyCode >= 112 && keyCode <= 121) {
              isAlertTyping(true, '※全角の数字は入力できません。');
            } else {
              // 現在の表示をダウンロード
              const beforeText = timer.value;
              isCreateAfterValue(beforeText, e.key);
            }
          }
        }
      }
    } else if (e.key === 'Enter' || e.code === 'Enter') {
      startBtn.click();
    } else if (e.key === 'Backspace' || e.code === 'Backspace') {
      e.preventDefault();
      isDeleteValue(timer.value);
      if (timer.value === '00:00') {
        inputClearBtn.disabled = true;
        inputAllClearBtn.disabled = true;
      } else {
        inputClearBtn.disabled = false;
        inputAllClearBtn.disabled = false;
      }
    } else {
      e.preventDefault();
      if ((!(e.key === 'Control') && !(e.key === 'Shift') && !(e.key === 'Alt') && !(e.key === 'Meta')) || (!(e.key === 'Control') && !(e.key === 'Shift') && !(e.key === 'Alt') && !(e.key === 'Meta'))) {
        isAlertTyping(true, '※数字以外の文字は入力できません。');
      }
    }
  });
  // ----------------------------
  // 【手順】
  // ①カウントダウンの終了時刻を求める（開始時刻＋カウントダウンタイム）
  startBtn.addEventListener('click', () => {
    const tmp = isSetTimer();
    nowTime = new Date().getTime();
    endTime = new Date().getTime() + isSetTimer();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
    stopBtn.classList.remove('hide');
    resetBtn.classList.remove('hide');
    for (let i = 0; i < inputBtns.length; i++) {
      inputBtns[i].disabled = true;
    }
    timer.disabled = true;
    // ②残り時間を求める
    stopIntervalId = setInterval(
      // 第2引数で指定した間隔で、第1引数の処理を繰り返す
      isCheckRemainingTime, // 関数を指定するだけなので()は付けない。
      100 // 何msで繰り返すのか
    );
    let s;
    function isCreateEndStatus() {
      if (!(timer.dataset.savetime === '0')) {
        s = Number(timer.dataset.savetime) / 1000;
        timer.dataset.savetime = 0;
      } else {
        s = tmp / 1000;
      }
      const minutes = Math.floor(s / 60);
      const seconds = s % 60;
      const minutesText = String(minutes).padStart(2, '0');
      const secondsText = String(seconds).padStart(2, '0');
      timer.value = `${minutesText + ':' + secondsText}`;
      startBtn.disabled = false;
      stopBtn.disabled = true;
      resetBtn.disabled = true;
      timer.disabled = false;
      for (let i = 0; i < inputBtns.length; i++) {
        inputBtns[i].disabled = false;
      }
      if (timer.value === '00:00') {
        inputClearBtn.disabled = true;
        inputAllClearBtn.disabled = true;
      }
    }
    const resetTime = endTime + 1300 - nowTime;
    stopSetTimeOutId = setTimeout(isCreateEndStatus, resetTime);
  });
  // ----------------------------
  stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    timer.disabled = false;
    for (let i = 0; i < inputBtns.length; i++) {
      inputBtns[i].disabled = false;
    }
    clearInterval(stopIntervalId);
    clearTimeout(stopSetTimeOutId);
    if (timer.dataset.savetime === '0') {
      const defaultTimerSet = endTime - nowTime;
      timer.dataset.savetime = defaultTimerSet;
    }
  });
  // ----------------------------
  resetBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    timer.disabled = false;
    for (let i = 0; i < inputBtns.length; i++) {
      inputBtns[i].disabled = false;
    }
    if (!(timer.dataset.savetime === '0')) {
      const s = Number(timer.dataset.savetime) / 1000;
      const minutes = Math.floor(s / 60);
      const seconds = s % 60;
      const minutesText = String(minutes).padStart(2, '0');
      const secondsText = String(seconds).padStart(2, '0');
      timer.value = `${minutesText + ':' + secondsText}`;
    }
  });
  // ----------------------------
  for (let i = 0; i < inputNumBtns.length; i++) {
    inputNumBtns[i].addEventListener('click', () => {
      if (!(timer.value)) {
        timer.value = '00:00';
      }
      const addedCharacter = Number(inputNumBtns[i].textContent);
      const beforeText = timer.value;
      isCreateAfterValue(beforeText, addedCharacter);
      if (timer.value === '00:00') {
        inputClearBtn.disabled = true;
        inputAllClearBtn.disabled = true;
      } else {
        inputClearBtn.disabled = false;
        inputAllClearBtn.disabled = false;
      }
      stopBtn.disabled = true;
      resetBtn.disabled = true;
      stopBtn.classList.add('hide');
      resetBtn.classList.add('hide');
    });
  }
  // ----------------------------
  inputClearBtn.addEventListener('click', () => {
    isDeleteValue(timer.value);
    if (timer.value === '00:00') {
      inputClearBtn.disabled = true;
      inputAllClearBtn.disabled = true;
    } else {
      inputClearBtn.disabled = false;
      inputAllClearBtn.disabled = false;
    }
  })
  // ----------------------------
  inputAllClearBtn.addEventListener('click', () => {
    timer.value = '00:00';

    inputClearBtn.disabled = true;
    inputAllClearBtn.disabled = true;
  })
  // ----------------------------
  document.addEventListener('touchend', function (event) {
    let lastTouchEnd;
    let now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  });
  // ============================= 処理の宣言 ============================
  window.addEventListener('load', () => {
    if (timer.value === '00:00') {
      inputClearBtn.disabled = true;
      inputAllClearBtn.disabled = true;
    }
  });
}