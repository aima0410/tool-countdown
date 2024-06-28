export default function CountdownDisplay() {
  return (
    <input
      placeholder="00:00"
      value="00:00"
      type="text"
      pattern="[0-9:]*"
      maxLength={5}
      inputMode="numeric"
    />
  );
}
