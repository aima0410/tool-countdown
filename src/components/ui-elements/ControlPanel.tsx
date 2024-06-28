import ControlButton from "@ui-parts/ControlButton";

export default function ControlPanel() {
  return (
    <fieldset>
      <ControlButton value="START" isInactive={false} onClick={() => {}} />
      <div>
        <ControlButton value="STOP" isInactive={true} onClick={() => {}} />
        <ControlButton value="RESET" isInactive={true} onClick={() => {}} />
      </div>
    </fieldset>
  );
}
