export default function CountdownDisplay() {
  let showInput = false;
  return (
    <>
      {showInput ? (
        <input
          placeholder="00:00"
          value="00:00"
          type="text"
          pattern="[0-9:]*"
          maxLength={5}
          inputMode="numeric"
          onChange={() => {}}
          name="countdown"
        />
      ) : (
        <p>00:00</p>
      )}
    </>
  );
}
