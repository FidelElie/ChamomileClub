import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig =  nextJest({ dir: "./" });

export default createJestConfig(
	{
		verbose: true,
		testEnvironment: "node",
		watchman: false
	} satisfies Config
);
