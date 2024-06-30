import { useState, useEffect } from 'react';
// ---- Types ----
import TimerStatus from 'src/types/TimerStatus';
// ---- Images ----
import goodImg from '@assets/good.svg';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ==== 型定義 ====
interface Props {
	updateTimerState: (newTimerValue: string) => void;
	switchStatusState: (newMode: TimerStatus) => void;
	initialTimer: string;
}

// ==== コンポーネント関数 ====
export default function DoneModal({ updateTimerState, switchStatusState, initialTimer }: Props) {
	const [isVisible, setIsVisible] = useState(false);

	// モーダル表示をカウントダウン完了から500ms遅らせる処理
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 500); // 500ms遅延
		return () => clearTimeout(timer); // コンポーネントのアンマウント時にタイマーをクリア
	}, []);

	return isVisible ? (
		<section
			className={css`
				z-index: 999;
				display: grid;
				place-items: center;
				position: fixed;
				inset: 0;
				background-color: rgba(0, 0, 0, 0.5);
				text-align: center;
				letter-spacing: 0.07em;
				transition: all 200ms ease;
			`}
		>
			<div
				className={css`
					max-width: 400px;
					width: 80%;
					padding: 30px 0;
					background-color: #fff;
					border-radius: 10px;
				`}
			>
				<img
					src={goodImg}
					alt="「いいね！」のイラスト画像"
					className={css`
						display: block;
						user-select: none;
						width: 15%;
						margin: 0 auto 10px;
					`}
				/>
				<p
					className={css`
						width: 100%;
						margin-bottom: 16px;
						font-size: 11px;
					`}
				>
					カウントダウンが終了しました。
				</p>
				<button
					onClick={() => {
						updateTimerState(initialTimer);
						switchStatusState('StandbyMode');
					}}
					className={css`
						display: block;
						user-select: none;
						width: 80%;
						padding: 15px 0;
						background-color: #7eb8a9;
						border-radius: 5px;
						box-shadow: 0 5px 5px #ddd;
						margin: 0 auto;
						color: #fff;
						font-weight: 500;
						transition: all 200ms ease;
						&:hover {
							user-select: none;
							background-color: #679a8c;
						}
						&:active {
							user-select: none;
							box-shadow: none;
							transform: translateY(2px);
						}
					`}
				>
					CLOSE
				</button>
			</div>
		</section>
	) : null;
}
