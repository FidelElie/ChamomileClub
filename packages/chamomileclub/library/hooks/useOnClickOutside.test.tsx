import React, { useRef } from "react";
import { render } from "@testing-library/react";

import useOnClickOutside from "./useOnClickOutside";

const UseOnClickOutside = () => {
	const divReference = useRef<HTMLDivElement>(null);

	useOnClickOutside(divReference, () => { console.log("Clicked outside" )});

	return (
		<div ref={divReference}>Click Here</div>
	)
}

describe("useOnClickOutside", () => {
	it("render without error", () => {
		render(<UseOnClickOutside/>);
	})
});
