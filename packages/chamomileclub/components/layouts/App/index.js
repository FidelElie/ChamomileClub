import Head from "next/head";
import PropTypes from "prop-types";

// ! Components
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = (props) => {
  const { title, navbarFixed, children } = props;

  return (
    <div className="w-full min-h-screen flex flex-col transition-colors bg-primary dark:bg-inverted shadow-lg">
      <Head>
        <title>{ title }</title>
        <link rel="shortcut icon" href="./icon.svg" />
      </Head>
      <Navbar fixed={navbarFixed}/>
      { children }
      <Footer/>
    </div>
  )
}

AppLayout.propTypes = {
  title: PropTypes.string,
  navbarFixed: PropTypes.bool,
  children: PropTypes.node.isRequired
}

AppLayout.defaultProps = {
  title: "The Chamomile Club | Introducting London Hold'Em",
  navbarFixed: true
}

export default AppLayout;
