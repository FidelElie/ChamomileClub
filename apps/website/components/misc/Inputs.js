import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { joinClasses } from "../../lib/utilities";

const Input = (props) => {
  const { id, type, placeholder, label, onChange, value, autoComplete } = props;

  const [fieldOccupied, setFieldOccupied] = useState(false);

  useEffect(() => {
    setFieldOccupied(value !== "");
  }, [value]);

  return (
    <div className="flex flex-col w-full md:items-center md:flex-row">
      <label
        htmlFor={id}
        className={joinClasses(
          "px-5 py-3 text-white bg-green-900 dark:bg-invertedDark",
          {
            "sr-only": !fieldOccupied,
          },
        )}
      >
        {label || placeholder || id}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder || id}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="flex-grow px-5 py-3 focus:outline-none"
      />
    </div>
  );
};

const Textarea = (props) => {
  const { id, placeholder, label, rows, onChange, value } = props;

  const [fieldOccupied, setFieldOccupied] = useState(false);

  useEffect(() => {
    setFieldOccupied(value !== "");
  }, [value]);

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className={joinClasses(
          "px-5 py-3 text-white bg-green-900 dark:bg-invertedDark",
          {
            "sr-only": !fieldOccupied,
          },
        )}
      >
        {label || placeholder || id}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder || id}
        value={value}
        rows={rows}
        onChange={onChange}
        className="flex-grow px-5 py-3 focus:outline-none"
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "email"]),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
};

export { Input, Textarea };
