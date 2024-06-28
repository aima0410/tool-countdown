interface Props {
  num: number | null;
  value: string | null;
  onClick: () => void;
  isInactive: boolean;
}

export default function NumKey({ num, value, onClick, isInactive }: Props) {
  return (
    <button onClick={onClick} disabled={isInactive}>
      {num ?? value}
    </button>
  );
}
