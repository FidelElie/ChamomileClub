import PropTypes from "prop-types";

const ProseList = (props) => {
	const { id, items, ordered } = props;

	const ListElement = ordered ? "ol" : "ul";

	return (
		<ListElement
			className={joinClasses("space-y-3 ml-10", {
				"list-disc": !ordered,
				"list-decimal": ordered
			})}
			id={id}
		>
			{
				items.map(
					(item, index) =>
						<li className="text-xl text-white font-light" key={`${item}-${index}`}>
							{item}
						</li>
				)
			}
		</ListElement>
	)
}

ProseList.propTypes = {
	id: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
	ordered: PropTypes.bool
}

ProseList.defaultProps = {
	ordered: false
}

export default ProseList;
