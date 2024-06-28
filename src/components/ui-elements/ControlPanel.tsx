import ControlButton from "@ui-parts/ControlButton";

export default function ControlPanel() {
  return (
    <fieldset>
      <ControlButton value="START" onClick={() => {}} />
      <div>
        <ControlButton value="STOP" onClick={() => {}} />
        <ControlButton value="RESET" onClick={() => {}} />
      </div>
    </fieldset>
  );
}
