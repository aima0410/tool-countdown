// ---- Images ----
import clickImg from '@assets/click.svg';
import clickMessageImg from '@assets/clickMessage.svg';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ==== 型定義 ====
interface HideStyle {
	opacity: number;
	visibility: 'visible' | 'hidden' | 'collapse';
}

// ==== コンポーネント関数 ====
export default function ClickMe({ showTutorial }: { showTutorial: boolean }) {
	let hideStyle: HideStyle | undefined;
	if (!showTutorial) {
		hideStyle = {
			opacity: 0,
			visibility: 'hidden',
		};
	}

	return (
		<div
			className={css`
				position: absolute;
				bottom: -10px;
				right: -35px;
				width: 60px;
				opacity: 1;
				visibility: visible;
				transition:
					opacity 400ms ease,
					visibility 300ms ease;
				@media (max-width: 500px) {
					right: -20px;
					width: 40px;
				}
			`}
			style={{ opacity: hideStyle?.opacity, visibility: hideStyle?.visibility || 'visible' }}
		>
			<img
				src={clickMessageImg}
				alt=""
				className={css`
					display: block;
					animation: scaleAnime 2s ease-in-out infinite;
					@keyframes scaleAnime {
						0% {
							transform: scale(1);
						}
						50% {
							transform: scale(1.1);
						}
						100% {
							transform: scale(1);
						}
					}
				`}
			/>
			<img
				src={clickImg}
				alt=""
				className={css`
					position: relative;
					right: 3px;
					display: block;
					width: 86%;
					animation: rotateAnime 2s ease-in-out infinite;
					@keyframes rotateAnime {
						0% {
							transform: rotate(0deg);
						}
						50% {
							transform: rotate(-10deg);
						}
						100% {
							transform: rotate(0deg);
						}
					}
				`}
			/>
		</div>
	);
}
