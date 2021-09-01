import { joinClasses } from "../../lib/utilities"

const PageHeading = ({ children }) => (
  <h1 className="text-6xl tracking-tighter text-white mb-1 md:text-8xl">
    { children }
  </h1>
)

const PageTagline = ({ children }) => (
  <p className="text-white text-xl font-light">
    { children }
  </p>
)

const PageHeader = ({ title, tagline }) => (
  <div className="mb-8">
    <PageHeading>{ title }</PageHeading>
    <PageTagline>{ tagline }</PageTagline>
  </div>
)

const SubTitle = ({ children }) => (
  <h2 className="text-4xl tracking-tighter text-white mt-4 mb-2">
    { children }
  </h2>
)

const SubSubTitle = ({ children, topMargin }) => (
  <h3 className={joinClasses("text-2xl tracking-tighter text-red-600 mb-1", {
    "mt-5": topMargin
  })}>
    { children }
  </h3>
)

const Paragraph = ({ children }) => (
  <p className="text-gray-200 mb-2">{ children }</p>
)

const UnorderedList = ({ id, items }) => (
  <ul className="list-disc ml-5" id={id}>
    {
      items.map((item, index) => <li key={`${item}-${index}`}>{ item }</li>)
    }
  </ul>
)

export {
  PageHeading,
  PageTagline,
  PageHeader,
  SubTitle,
  SubSubTitle,
  UnorderedList,
  Paragraph
}
