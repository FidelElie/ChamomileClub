import joinClasses from "./joinClasses";

describe("joinClasses", () => {
	it("joins strings", () => {
		expect(joinClasses("my-3", "ml-3")).toBe("my-3 ml-3");
	});

	it("joins numbers", () => {
		expect(joinClasses(1, 2, 3)).toBe("1 2 3");
	})

	it("joins objects with falsy values", () => {
		expect(joinClasses({
			"my-3": true,
			"ml-3": false,
			"mr-2": null,
			"rounded-md": undefined
		})).toBe("my-3");
	});

	it("joins heterogenous arguments", () => {
		expect(joinClasses("my-3 rounded px-3", {
			"ml-3": true,
			"shadow": undefined
		})).toBe("my-3 rounded px-3 ml-3");
	});

	it("returns empty string with no classes", () => {
		expect(joinClasses({})).toBe("");
	});

	it("joins raw conditionals", () => {
		expect(joinClasses(true && "my-2", undefined && "rounded")).toBe("my-2")
	})
});
