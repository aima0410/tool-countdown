// ---- Components ----
import Timer from '@layouts/Timer';
// ---- reset.css ----
import '/public/reset.css';
// ---- Fonts ----
import '@fontsource-variable/montserrat'; // Supports weights 100-900
import '@fontsource-variable/noto-sans-jp'; // Supports weights 100-900
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ==== コンポーネント関数 ====
export default function App() {
	return (
		<main
			className={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				min-height: 100dvh;
				padding: 100px 0;
				font-family: var(--def-font);
			`}
		>
			<Timer />
		</main>
	);
}
