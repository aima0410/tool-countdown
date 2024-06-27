import { useState } from "react";

export default function Template() {
  const [text, setText] = useState("");
  return (
    <>
      <input
        value={text}
        name="text"
        onChange={(e) => setText(e.target.value)}
        aria-label="Text Input"
      />
      <p>入力した値：{text}</p>
    </>
  );
}
