import { useState } from "react";
import PropTypes from "prop-types";

// ! Library
import { joinClasses } from "../../lib/utilities";

const Accordion = (props) => {
  const { header, children } = props;
  const [toggled, setToggled] = useState(false);

  return (
    <div className="flex flex-col shadow-lg rounded-md overflow-hidden">
      <div
        className="px-5 py-4 flex justify-between items-center bg-green-900 dark:bg-invertedDark"
        onClick={() => setToggled(!toggled)}
      >
        <span className="text-xl font-semibold text-white">{header}</span>
        <span className="text-sm text-white">{toggled ? "Less" : "More"}</span>
      </div>
      <div
        className={joinClasses("py-4 px-5 bg-white", {
          hidden: !toggled,
        })}
      >
        {children}
      </div>
    </div>
  );
};

Accordion.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Accordion.defaultProps = { header: "Accordion Header" };

export default Accordion;
