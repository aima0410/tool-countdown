import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
// Components
import Template from '@components/Template';

test('template component Test', async () => {
	const user = userEvent.setup();
	render(<Template />);

	const textElement = screen.getByText('入力した値：');
	expect(textElement).toBeInTheDocument();

	const inputElement = screen.getByLabelText('Text Input');
	await user.type(inputElement, 'Hello World!');
	expect(screen.getByText('入力した値：Hello World!')).toBeInTheDocument();
});
