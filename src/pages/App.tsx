// ---- Components ----
import Timer from '@layouts/Timer';
import Description from '@layouts/Description';
// ---- reset.css ----
import '/public/reset.css';
// ---- Fonts ----
import '@fontsource-variable/montserrat'; // Supports weights 100-900
import '@fontsource-variable/noto-sans-jp'; // Supports weights 100-900
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

export default function App() {
	return (
		<main
			className={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 100px 0 500px;
				font-family: var(--def-font);
			`}
		>
			<h1>カウントダウンタイマー</h1>
			<Timer />
			<Description />
		</main>
	);
}
