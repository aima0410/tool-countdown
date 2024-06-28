interface Props {
  value: string;
  isInactive: boolean;
  onClick: () => void;
}

export default function ControlButton({ value, isInactive, onClick }: Props) {
  return <button onClick={onClick} disabled={isInactive}>{value}</button>;
}
