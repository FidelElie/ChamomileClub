import Head from "next/head";
import PropTypes from "prop-types";

// ! Components
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = (props) => {
  const { title, disableNavbar, disableFooter, children } = props;

  return (
    <div className="w-full min-h-screen flex flex-col relative bg-primary dark:bg-inverted">
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="./icon.svg" />
      </Head>
      {!disableNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!disableFooter && <Footer />}
    </div>
  );
};

AppLayout.propTypes = {
  title: PropTypes.string,
  disableNavbar: PropTypes.bool,
  disableFooter: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

AppLayout.defaultProps = {
  title: "The Chamomile Club | Introducing London Hold'em",
  disableNavbar: false,
  disableFooter: false,
};

export default AppLayout;
