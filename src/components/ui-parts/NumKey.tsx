interface Props {
  num: number | null;
  value: string | null;
  onClick: () => void;
}

export default function NumKey({ num, value, onClick }: Props) {
  return <button onClick={onClick}>{num ?? value}</button>;
}
