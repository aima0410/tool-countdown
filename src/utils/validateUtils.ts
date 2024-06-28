export const isValidInputKey = (key: string) =>
	key === 'Backspace' || key === 'Enter' || /^[0-9]+$/.test(key);
