import PropTypes from "prop-types";

// ! Library
import { BlueChip, GreenChip, RedChip } from "@chamomileclub/casinojs";

const Loading = (props) => {
  const { message } = props;

  return (
    <div className="w-full flex flex-col items-center space-y-5">
      <BlueChip
        className="h-auto animate-spin rounded-full shadow-lg w-32"
      />
      <span className="text-lg font-medium text-white">{message}</span>
    </div>
  )
}

const Success = (props) => {
  const { message } = props;

  return (
    <div className="w-full flex flex-col items-center space-y-5">
      <GreenChip
        className="h-auto rounded-full shadow-lg w-32"
      />
      <span className="text-lg font-medium text-white">{message}</span>
    </div>
  )
}

const Error = (props) => {
  const { message } = props;

  return (
    <div className="w-full flex flex-col items-center space-y-5">
      <RedChip
        className="h-auto rounded-full shadow-lg w-32"
      />
      <span className="text-lg font-medium text-white">{message}</span>
    </div>
  )
}

Loading.propTypes = Success.propTypes = Error.propTypes = {
  mesasge: PropTypes.string,
}

export { Loading, Success, Error }
