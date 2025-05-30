import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import fs from "node:fs";
import path from "node:path";

const getConfig = () => {
	const files = fs.readdirSync("./src");
	return files.flatMap((v) => {
		const fname = path.parse(v).name;
		return [
			{
				input: `src/${v}`,
				output: {
					file: `dist/${fname}.js`,
					format: "amd",
				},
				plugins: [
					resolve({
						browser: true,
						preferBuiltins: false,
						moduleDirectories: ["node_modules"],
						extensions: [".js", ".jsx", ".ts", ".tsx"],
					}),
					commonjs({ include: /node_modules/ }),
					esbuild({
						target: "es2015",
						include: /\.[jt]sx?$/,
						exclude: [],
						minify: false,
					}),
				],
			},
			{
				input: `src/${v}`,
				output: {
					file: `dist/${fname}.min.js`,
					format: "amd",
				},
				plugins: [
					resolve({
						browser: true,
						preferBuiltins: false,
						moduleDirectories: ["node_modules"],
						extensions: [".js", ".jsx", ".ts", ".tsx"],
					}),
					commonjs({ include: /node_modules/ }),
					esbuild({
						target: "es2015",
						include: /\.[jt]sx?$/,
						exclude: [],
						minify: true,
					}),
				],
			},
		];
	});
};

export default getConfig();
