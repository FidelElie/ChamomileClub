import { useState } from "react";

// ! Assets
import LoaderIcon from "../../../assets/images/loader.svg";

// ! Libarary
import openings from "../../../assets/data/openings";
import { Paragraph, SubSubTitle } from "../../core/Prose";

// ! Components
import { Input, Textarea } from "../../misc/Inputs";
import { joinClasses } from "../../../lib/utilities";

const openingsNames = openings.map(opening => opening.name);
const initialFormState = {
  name: "",
  email: "",
  position: openingsNames[0],
  instagram: "",
  linkedin: "",
  facebook: "",
  question1: "",
  question2: ""
}
const initialRequestState = {
  success: false,
  requested: false,
  error: false
}

const ApplicationForm = (props) => {
  const { position } = props;
  const [data, setData] = useState(initialFormState);
  const [requestState, setRequestState] = useState(initialRequestState);

  const changeRequestState = (value) =>
    setRequestState({ ...requestState, ...value });

  const changeData = (key, value) => setData({...data, ...{[key]: value}});

  const submissionOccuring = Object
    .values(requestState)
    .map(state => !!state)
    .includes(true)

  const submitApplication = async (event) => {
    event.preventDefault();
    changeRequestState({ requested: true });

    const applicationData = { position, ...data }

    const applicationRequest = await fetch("/api/email/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(applicationData)
    });

    const applicationResponse = await applicationRequest.json();

    if (applicationResponse.error) {
      changeRequestState({
        error: applicationResponse.error,
        requested: false,
      });
      setTimeout(() => {
        changeRequestState({ error: false });
      }, 5000)
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
      <div className="flex flex-col space-y-2">
        <SubSubTitle>About You</SubSubTitle>
        <Input
          id="name"
          placeholder="First Name"
          value={data.name}
          onChange={event => changeData("name", event.target.value)}
        />
        <Input
          id="email"
          placeholder="Email Address"
          value={data.email}
          onChange={event => changeData("email", event.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <SubSubTitle>Socials</SubSubTitle>
        <Input
          id="instagram"
          placeholder="Instagram Link (Optional)"
          value={data.instagram}
          onChange={event => changeData("instagram", event.target.value)}
        />
        <Input
          id="linkedin"
          placeholder="Linkedin Link (Optional)"
          value={data.linkedin}
          onChange={event => changeData("linkedin", event.target.value)}
        />
        <Input
          id="facebook"
          placeholder="Facebook Link (Optional)"
          value={data.facebook}
          onChange={event => changeData("facebook", event.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <SubSubTitle>Questions</SubSubTitle>
        <Paragraph>Not required by any means but highly recommended.</Paragraph>
        <Textarea
          id="question1"
          placeholder="Why would you like to join The Chamomile Club?"
          rows={5}
          value={data.question1}
          onChange={event => changeData("question1", event.target.value)}
        />
        <Textarea
          id="question2"
          placeholder="What skills will you bring to The Chamomile Club?"
          rows={5}
          value={data.question2}
          onChange={event => changeData("question2", event.target.value)}
        />
      </div>
      <div className="flex flex-col md:items-center md:space-x-3 md:flex-row">
        <button className="px-5 py-3 w-min whitespace-nowrap shadow text-white flex items-center bg-green-900 dark:bg-invertedDark" type="submit" disabled={submissionOccuring}>
          Apply
        </button>
        {
          requestState.requested && <LoaderIcon className="w-6 h-6 animate-spin opacity-75 mr-3 text-white" />
        }
        <div className="flex items-center text-white text-xl font-light relative">
          <span className={joinClasses("transition-opacity absolute",{
            "opacity-0": !requestState.success,
            "opacity-100": requestState.success
          })}>
            Thank You, We Will Be In Touch
          </span>
          <span className={joinClasses("transition-opacity absolute",{
            "opacity-0": !requestState.error,
            "opacity-100": requestState.error
          })}>
            Sorry An Error Occured Please Try Again
          </span>
        </div>
      </div>
    </form>
  )
}

export default ApplicationForm;
