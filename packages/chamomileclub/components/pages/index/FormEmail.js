import { useState } from "react";
import { Input } from "../../misc/Inputs";

// ! Assets
import LoaderIcon from "../../../assets/images/loader.svg";

// ! Library
import { joinClasses } from "../../../lib/utilities";

const initialRequestState = {
  success: false,
  requested: false,
  error: false
}

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [requestState, setRequestState] = useState(initialRequestState);

  const changeRequestState = (value) =>
    setRequestState({...requestState, ...value});

  const submissionOccuring = Object
    .values(requestState)
    .map(state => !!state)
    .includes(true)

  const subscribeUser = async (event) => {
    event.preventDefault();
    changeRequestState({ requested: true });

    const subscriptionRequest = await fetch("/api/email/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email })
    });
    const subscriptionResponse = await subscriptionRequest.json();

    if (subscriptionResponse.error) {
      changeRequestState({
        error: subscriptionResponse.error,
        requested: false,
      });
      setTimeout(() => {
        changeRequestState({ error: false });
      }, 5000)
      return;
    }

    setEmail("");
    changeRequestState({ requested: false, success: true });
    setTimeout(() => {
      changeRequestState({ success: false })
    }, 5000);
  }

  return (
    <form onSubmit={subscribeUser} className="w-full space-y-3 md:w-1/2">
      <Input
        id="email"
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={event => setEmail(event.target.value)}
        required
      />
      <div className="flex flex-col items-center md:space-x-3 md:flex-row">
        <button className="px-5 py-3 shadow text-white flex items-center bg-green-900 dark:bg-invertedDark disabled:opacity-50" type="submit" disabled={submissionOccuring}>
          Subscribe
        </button>
        {
          requestState.requested && <LoaderIcon className="w-6 h-6 animate-spin opacity-75 mr-3 text-white" />
        }
        <div className="flex items-center text-white text-xl font-light relative">
          <span className={joinClasses("transition-opacity absolute whitespace-nowrap", {
            "opacity-0": !requestState.success,
            "opacity-100": requestState.success
          })}>
            Thank You For Subscribing.
          </span>
          <span className={joinClasses("transition-opacity absolute whitespace-nowrap", {
            "opacity-0": !requestState.error,
            "opacity-100": requestState.error
          })}>
            Sorry An Error Occurred Please Try Again.
          </span>
        </div>
      </div>
    </form>
  )
}

export default EmailForm;
