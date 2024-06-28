interface Props {
  e: React.ChangeEvent<HTMLInputElement>;
  setTimer: React.Dispatch<React.SetStateAction<string>>;
}

export default function createTimerValue({ e, setTimer }: Props) {
  const value = e.target.value;
  setTimer(value);
}
