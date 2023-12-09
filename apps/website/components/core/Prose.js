import PropTypes from "prop-types";

import { joinClasses } from "../../lib/utilities";

const PageHeading = ({ children }) => (
  <h1 className="text-6xl tracking-tighter font-heading text-white mb-1 md:text-8xl">
    {children}
  </h1>
);

const PageTagline = ({ children }) => (
  <p className="text-white text-xl font-light">{children}</p>
);

const PageHeader = ({ title, tagline }) => (
  <div className="mb-8">
    <PageHeading>{title}</PageHeading>
    <PageTagline>{tagline}</PageTagline>
  </div>
);

const SubTitle = ({ children }) => (
  <h2 className="text-4xl tracking-tighter font-heading text-white mt-4 mb-2">
    {children}
  </h2>
);

const SubSubTitle = ({ children, topMargin }) => (
  <h3
    className={joinClasses("text-3xl tracking-tighter text-red-600 mb-1", {
      "mt-5": topMargin,
    })}
  >
    {children}
  </h3>
);

const Paragraph = ({ children }) => (
  <p className="text-gray-100 text-xl mb-2 font-light">{children}</p>
);

const List = (props) => {
  const { id, items, ordered } = props;

  const ListElement = ordered ? "ol" : "ul";

  return (
    <ListElement
      className={joinClasses("space-y-3 ml-10", {
        "list-disc": !ordered,
        "list-decimal": ordered,
      })}
      id={id}
    >
      {items.map((item, index) => (
        <li className="text-xl text-white font-light" key={`${item}-${index}`}>
          {item}
        </li>
      ))}
    </ListElement>
  );
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  ordered: PropTypes.bool,
};
List.defaultProps = {
  ordered: false,
};

export {
  PageHeading,
  PageTagline,
  PageHeader,
  SubTitle,
  SubSubTitle,
  List,
  Paragraph,
};
