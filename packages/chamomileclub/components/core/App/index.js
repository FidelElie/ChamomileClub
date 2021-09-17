import Head from "next/head";
import PropTypes from "prop-types";

// ! Library
import { joinClasses } from "../../../lib/utilities";

// ! Components
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = (props) => {
  const {
    title,
    disableNavbar,
    disableFooter,
    disableContainer,
    children
  } = props;

  return (
    <div className="w-full min-h-screen flex flex-col transition-colors shadow-lg bg-primary dark:bg-inverted">
      <Head>
        <title>{ title }</title>
        <link rel="shortcut icon" href="./icon.svg" />
      </Head>
      { !disableNavbar && <Navbar /> }
      <main className="flex-grow">
        <div className={joinClasses({
          "w-full container max-w-4xl mx-auto px-8 pt-28 pb-10": !disableContainer
        })}>
          { children }
        </div>
      </main>
      { !disableFooter && <Footer /> }
    </div>
  )
}

AppLayout.propTypes = {
  title: PropTypes.string,
  disableNavbar: PropTypes.bool,
  disableFooter: PropTypes.bool,
  disableContainer: PropTypes.bool,
  children: PropTypes.node.isRequired
}

AppLayout.defaultProps = {
  title: "The Chamomile Club | Introducing London Hold'em",
  disableNavbar: false,
  disableFooter: false,
  disableContainer: false
}

export default AppLayout;
