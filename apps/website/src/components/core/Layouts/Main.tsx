import { Show, type JSX } from "solid-js";
import { Head, Title } from "solid-start";

const Main = (props: MainProps) => {
	const {
		title,
		header,
		aside,
		footer,
		children
	} = props;

	return (
		<div class="bg-green">
			<Show when={!!title}>
				<Head>
					<Title>{title}</Title>
				</Head>
			</Show>
			<div class="flex">
				<Show when={!!aside}>{aside}</Show>
				<div class="flex flex-col">
					<Show when={!!header}>{header}</Show>
					<main class="min-h-screen">
						{children}
					</main>
					<Show when={!!footer}>{footer}</Show>
				</div>
			</div>
		</div>
	)
}

interface MainProps {
	title?: string,
	aside?: JSX.Element,
	footer?: JSX.Element,
	header?: JSX.Element,
	children: JSX.Element
}

export default Main;
export type { MainProps }
