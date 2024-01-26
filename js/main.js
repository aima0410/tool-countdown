'use strict';
{
  // --------------------------- 変数の宣言 ------------------------------
  // 取得したDOM
  const slider = document.querySelector('#slider');
  const btn = document.querySelector('#btn');
  const numbersCheckbox = document.querySelector('#numbers-checkbox');
  const symbolsCheckbox = document.querySelector('#symbols-checkbox');
  const result = document.querySelector('#result');
  // パスワードの原材料
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const bigLetters = letters.toUpperCase(); //文字列を大文字化
  const numbers = '0123456789';
  const symbols = '!#$%&()';
  // パスワード生成時に操作する値
  let randomGenerateLength = 0;
  let pwdSeed = '';
  let pwd = '';
  // --------------------------- 関数の宣言 ------------------------------
  function isGeneratePwdSeedBase() {
    let tmp = '';

    // 「アルファベットの小文字」を最低1個含める
    tmp += letters[Math.floor(Math.random() * letters.length)];
    randomGenerateLength -= 1;
    pwdSeed = letters;

    // 「アルファベットの大文字」を最低1個含める
    tmp += bigLetters[Math.floor(Math.random() * bigLetters.length)];
    randomGenerateLength -= 1;
    pwdSeed += bigLetters;

    // CheckBoxにチェックがついている場合「数字」を最低1個含める
    if (numbersCheckbox.checked) {
      tmp += numbers[Math.floor(Math.random() * numbers.length)];
      randomGenerateLength -= 1;
      pwdSeed += numbers;
    }

    // CheckBoxにチェックがついている場合「記号」を最低1個含める
    if (symbolsCheckbox.checked) {
      tmp += symbols[Math.floor(Math.random() * symbols.length)];
      randomGenerateLength -= 1;
      pwdSeed += symbols;
    }
    pwd = tmp;
  }
  // --------------------------------------
  function isShuffleString(str) {
    // 文字列を配列に変換
    const array = str.split('');

    // 配列をシャッフル
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    // 配列を文字列に変換
    const shuffledString = array.join('');
    return shuffledString;
  }
  // --------------------------------------
  function isCheckForConsecutiveString(str) {
    for (let i = 0; i < str.length - 1; i++) {
      if (str[i] === str[i + 1]) {
        return true; // 同じ文字が連続している場合
      }
    }
    return false; // 同じ文字が連続していない場合
  }
  // --------------------------------------
  function isGeneratePwd() {
    randomGenerateLength = slider.value;
    isGeneratePwdSeedBase();
    for (let i = 0; i < randomGenerateLength; i++) {
      pwd += pwdSeed[Math.floor(Math.random() * pwdSeed.length)];
    }
    // 連続する文字列が消えるまで永遠にシャッフル
    do {
      pwd = isShuffleString(pwd);
    } while (isCheckForConsecutiveString(pwd));
  }
  // --------------------------------------
  function isStringCoppy(text) {
    // navigator.clipboardが利用可能な場合
    if (navigator.clipboard) {
      // クリップボードにコピー
      navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // navigator.clipboardが利用できない場合、document.execCommandを使用
      const textarea = document.createElement('textarea');
      textarea.textContent = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');  // コピー
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textarea);  // textarea要素を削除
    }
  }
  function isRemoveMessage() {
    if (document.querySelector('#message')) {
      result.parentNode.removeChild(document.querySelector('#message'));
    }
  }
  // --------------------------- イベントの設置 ---------------------------
  // inputの値を変化させたときに発火するイベント
  slider.addEventListener('input', () => {
    const pwdLength = document.querySelector('#pwd-length');
    pwdLength.textContent = slider.value;
  });
  // --------------------------------------
  btn.addEventListener('click', () => {
    // 前回の「パスワードがコピーされました」のメッセージがあれば削除
    isRemoveMessage();
    // パスワードを生成
    isGeneratePwd();
    // 生成したパスワードを表示
    result.textContent = pwd;
  });
  // --------------------------------------
  result.parentNode.addEventListener("click", () => {
    // 前回の「パスワードがコピーされました」のメッセージがあれば削除
    isRemoveMessage();

    // パスワードを文字列で取得
    const text = result.innerText;

    // パスワードをコピー
    isStringCoppy(text);

    // 「パスワードがコピーされました」を表示させる
    const message = document.createElement('p');
    message.setAttribute('id', 'message');
    message.textContent = 'パスワードがコピーされました';
    result.parentElement.appendChild(message);
  });
  // --------------------------------------
  // ダブルタップによる拡大防止
  document.addEventListener('touchend', function (event) {
    let lastTouchEnd;
    let now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  });
  // --------------------------- 処理の実行 ------------------------------
  window.addEventListener('load', () => {
    isGeneratePwd();
    result.textContent = pwd;
  });

}