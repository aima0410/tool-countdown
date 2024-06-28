interface Props {
  value: string;
  onClick: () => void;
}

export default function ControlButton({ value, onClick }: Props) {
  return <button onClick={onClick}>{value}</button>;
}
