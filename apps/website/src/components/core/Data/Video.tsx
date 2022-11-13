import { JSX, Show } from "solid-js";
import classNames from "classnames";

import { OBJECT_FITS } from "~/library/styles/maps";

const Video = (props: VideoProps) => {
	const {
		class: _class,
		ref,
		overlay,
		fit,
		children,
		...videoProps
	} = props;

	return (
		<div class="relative" {...(ref ? { ref } : {})}>
			<video {...videoProps} class={classNames(
				fit && OBJECT_FITS[fit],
				_class
			)}/>
			<Show when={!!overlay}>
				<div class={classNames(
					"absolute w-full h-full top-0 left-0",
					overlay
				)}>
					{ children }
				</div>
			</Show>
		</div>
	)
}

interface VideoProps {
	class?: string,
	ref?: HTMLDivElement,
	src: string,
	autoplay?: boolean,
	fit?: keyof typeof OBJECT_FITS,
	muted?: boolean,
	loop?: boolean,
	overlay?: string,
	children?: JSX.Element
}

export default Video;
export type { VideoProps }
