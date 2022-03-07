import { RefObject, useEffect, useRef } from "react";

function useOnClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
	const handlerReference = useRef<Function>(handler);

	useEffect(
		() => {
			const listener = (event: Event) => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(event.target as Node)) {
					return;
				}
				handlerReference.current(event);
			};
			document.addEventListener("mousedown", listener);
			document.addEventListener("touchstart", listener);
			return () => {
				document.removeEventListener("mousedown", listener);
				document.removeEventListener("touchstart", listener);
			};
		},
		[ref]
	);

	return (newHandler: Function) => handlerReference.current = newHandler;
}

export default useOnClickOutside;
