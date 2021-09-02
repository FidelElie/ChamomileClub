import Head from "next/head";
import PropTypes from "prop-types";

// ! Library
import { useApp } from "../../../lib/providers/app";

// ! Components
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = (props) => {
  const { children } = props;

  const { titleBase, titleSuffix, disableNavbar, disableFooter } = useApp();

  return (
    <div className="w-full min-h-screen flex flex-col transition-colors bg-primary dark:bg-inverted shadow-lg">
      <Head>
        <title>{ titleBase } | { titleSuffix }</title>
        <link rel="shortcut icon" href="./icon.svg" />
      </Head>
      { !disableNavbar && <Navbar /> }
      { children }
      { !disableFooter && <Footer /> }
    </div>
  )
}

AppLayout.propTypes = { children: PropTypes.node.isRequired }

export default AppLayout;
