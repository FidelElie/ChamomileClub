import PropTypes from "prop-types";

// ! Library
import { BlueChip, GreenChip, BlackChip } from "@chamomileclub/casinojs";

// ! Components
import { Paragraph } from "../core/Prose";

const Loading = (props) => {
  const { message } = props;

  return (
    <div className="w-full flex flex-col items-center space-y-5 my-10">
      <div className="flex items-center space-x-2">
        <BlueChip
          className="h-auto animate-pulse rounded-full shadow-lg w-10"
        />
        <GreenChip
          className="h-auto animate-pulse rounded-full shadow-lg w-10"
        />
        <BlackChip
          className="h-auto animate-pulse rounded-full shadow-lg w-10"
        />
      </div>
      <Paragraph>{message}</Paragraph>
    </div>
  )
}

const Success = (props) => {
  const { message } = props;

  return (
    <div className="w-full flex flex-col items-center space-y-5 my-10">
      <Paragraph>{message}</Paragraph>
    </div>
  )
}

const Error = (props) => {
  const { message } = props;

  return (
    <div className="w-full flex flex-col items-center space-y-5 my-10">
      <Paragraph>{message}</Paragraph>
    </div>
  )
}

Loading.propTypes = Success.propTypes = Error.propTypes = {
  mesasge: PropTypes.string,
}

export { Loading, Success, Error }
