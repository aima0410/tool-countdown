/** @type {import("prettier").config } */
const config = {
	semi: true, // 末尾のセミコロンあり
	tabWidth: 2, // タブサイズ2
	singleQuote: true, // シングルクォーテーションで統一
	printWidth: 100, // 自動折り返し文字数
	trailingComma: 'es5',
	useTabs: true, // タブでインデントする
	quoteProps: 'consistent', // オブジェクトのプロパティに1つでも引用符が必要なものがあればすべてつける
	bracketSpacing: true, // 波括弧内にスペースをつける { foo: bar }
	arrowParens: 'avoid', // 可能な場合はアロー関数の引数から()を除去する
};

export default config;
