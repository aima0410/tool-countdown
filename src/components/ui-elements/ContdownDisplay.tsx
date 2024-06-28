import { useState, useRef, useEffect } from "react";

export default function CountdownDisplay() {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 自動フォーカスするための設定
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return (
    <>
      {showInput ? (
        <input
          ref={inputRef}
          placeholder="00:00"
          value="00:00"
          type="text"
          pattern="[0-9:]*"
          maxLength={5}
          inputMode="numeric"
          onChange={() => {}}
          onBlur={() => {
            setShowInput(false);
          }}
          name="countdown"
        />
      ) : (
        <p
          onClick={() => {
            setShowInput(true);
          }}
        >
          00:00
        </p>
      )}
    </>
  );
}
