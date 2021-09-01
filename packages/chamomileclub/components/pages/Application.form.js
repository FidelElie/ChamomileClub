import { useState } from "react";

// ! Libarary
import openings from "../../assets/data/openings";

// ! Components
import { Loading, Success, Error } from "../misc/StateDisplays";

const openingsNames = openings.map(opening => opening.name);
const initialFormState = {
  name: "",
  email: "",
  position: openingsNames[0],
  instagram: "",
  linkedin: ""
}
const initialRequestState = {
  success: false,
  requested: false,
  error: false
}

const ApplicationForm = () => {
  const [data, setData] = useState(initialFormState);
  const [requestState, setRequestState] = useState(initialRequestState);

  const changeRequestState = (value) =>
    setRequestState({ ...requestState, ...value });

  const changeData = (key, value) => setData({...data, ...{[key]: value}})

  const submitApplication = async (event) => {
    event.preventDefault();
    changeRequestState({ requested: true });

    const applicationRequest = await fetch("/api/email/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const applicationResponse = await applicationRequest.json();


    if (applicationResponse.error) {
      changeRequestState({
        error: applicationResponse.error,
        requested: false,
      });
      return;
    }

    changeRequestState({ requested: false, success: true });
    setTimeout(() => {
      setData(initialFormState);
      changeRequestState({ success: false })
    }, 5000);
  }

  return (
    <form  onSubmit={submitApplication} className="w-full space-y-3">
      {
        Object
          .values(requestState)
          .filter(x => x === false).length === 3 && (
            <>
              <div className="flex flex-col space-y-1">
                <span className="text-white">General</span>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  autoComplete="none"
                  value={data.name}
                  onChange={event => changeData("name", event.target.value)}
                  className="w-full rounded-md px-5 py-3"
                  required
                />
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={event => changeData("email", event.target.value)}
                  className="w-full rounded-md px-5 py-3"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="position" className="text-white">Position</label>
                <select
                  value={data.position}
                  onChange={event => changeData("position", event.target.value)}
                  className="w-full px-5 py-3 rounded-md"
                >
                  {openingsNames.map(name => <option key={`position-${name}`}>{name}</option>)}
                </select>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-white">Socials</span>
                <label htmlFor="instagram" className="sr-only">Instagram Handle (Optional)</label>
                <input
                  id="instagram"
                  name="instagram"
                  type="text"
                  placeholder="Instagram Handle (Optional)"
                  value={data.instagram}
                  onChange={event => changeData("instagram", event.target.value)}
                  className="w-full rounded-md px-5 py-3"
                />
                <label htmlFor="linkedin" className="sr-only">Linkedin Profile</label>
                <input
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  placeholder="Linkedin Profile (Optional)"
                  value={data.linkedin}
                  onChange={event => changeData("linkedin", event.target.value)}
                  className="w-full rounded-md px-5 py-3"
                />
              </div>
              <button className="px-5 py-3 rounded-md text-white bg-green-900 dark:bg-invertedDark" type="submit">
                Apply
              </button>
            </>
          )
      }
      {requestState.requested && <Loading message="Sending Application... Please Wait." />}
      {requestState.success && <Success message="Thank You, We Will Be In Touch" />}
      {
        requestState.error && (
          <div className="flex flex-col items-center space-y-2">
            <Error message="Sorry An Error Occurred Please Try Again." />
            <button
              className="px-5 py-3 bg-primary rounded-md shadow text-white dark:bg-invertedLight"
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

export default ApplicationForm;
