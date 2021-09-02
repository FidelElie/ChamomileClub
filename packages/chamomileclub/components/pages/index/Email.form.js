import { useState } from "react";

// ! Components
import { Loading, Success, Error } from "../../misc/StateDisplays";

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
      return;
    }

    changeRequestState({ requested: false, success: true });
    setTimeout(() => {
      setEmail("");
      changeRequestState({ success: false })
    }, 5000);
  }

  return (
    <form onSubmit={subscribeUser} className="w-full space-y-2 md:w-1/2">
      {
        (Object
          .values(requestState)
          .filter(x => x === false).length === 3) && (
          <>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="w-full rounded-md px-5 py-3"
              required
            />
            <button className="px-5 py-3 rounded-md text-white bg-green-900 dark:bg-invertedDark" type="submit">
              Subscribe
            </button>
          </>
        )
      }
      { requestState.requested && <Loading message="Signing You Up... Please Wait."/> }
      { requestState.success && <Success message="Thank You For Subscribing" /> }
      {
        requestState.error && (
          <div className="flex flex-col items-center space-y-2">
            <Error message="Sorry An Error Occurred Please Try Again."/>
            <button
              className="px-5 py-3 bg-green-900 rounded-md shadow text-white dark:bg-invertedDark"
              onClick={() => changeRequestState({ error: false })}
              type="button"
            >
              Retry
            </button>
          </div>
        )
      }
    </form>
  )
}

export default EmailForm;
