interface Props {
  num: number;
  onClick: () => void;
}

export default function NumKey({ num, onClick }: Props) {
  return <button onClick={onClick}>{num}</button>;
}
