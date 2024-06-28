import NumKey from "@ui-parts/NumKey";

export default function NumPad() {
  return (
    <fieldset>
      <div>
        <NumKey num={1} value={null} onClick={() => {}} isInactive={false} />
        <NumKey num={2} value={null} onClick={() => {}} isInactive={false} />
        <NumKey num={3} value={null} onClick={() => {}} isInactive={false} />
      </div>
      <div>
        <NumKey num={4} value={null} onClick={() => {}} isInactive={false} />
        <NumKey num={5} value={null} onClick={() => {}} isInactive={false} />
        <NumKey num={6} value={null} onClick={() => {}} isInactive={false} />
      </div>
      <div>
        <NumKey num={7} value={null} onClick={() => {}} isInactive={false} />
        <NumKey num={8} value={null} onClick={() => {}} isInactive={false} />
        <NumKey num={9} value={null} onClick={() => {}} isInactive={false} />
      </div>
      <div>
        <NumKey num={null} value="C" onClick={() => {}} isInactive={true} />
        <NumKey num={0} value={null} onClick={() => {}} isInactive={false} />
        <NumKey num={null} value="AC" onClick={() => {}} isInactive={true} />
      </div>
    </fieldset>
  );
}
