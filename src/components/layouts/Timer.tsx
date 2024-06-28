import CountdownDisplay from "@ui-elements/ContdownDisplay";
import ControlPanel from "@ui-elements/ControlPanel";
import NumPad from "@ui-elements/NumPad";

export default function Timer() {
  return (
    <section>
      <CountdownDisplay />
      <ControlPanel />
      <NumPad />
    </section>
  );
}
