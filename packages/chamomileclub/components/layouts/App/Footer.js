// ! Assets
import { AceSpades } from "@chamomileclub/casinojs";
import ThemeToggle from "../../misc/ThemeToggle";

// ! Components
import NavLinks from "../../misc/NavLinks";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col bg-green-900 dark:bg-invertedDark py-4">
      <div className="w-full flex flex-col justify-center px-5 box-border">
        <div className="w-full flex items-center justify-center py-2">
          <AceSpades className="w-min h-12 shadow-lg rounded-md"/>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 pb-2">
          <NavLinks
            id="footer-links"
            mode="footer"
            linkStyle="text-white w-min font-light whitespace-nowrap"
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-between px-5 box-border ">
        <span className="text-sm text-white font-light">
          &copy; Copyright The Founders Club 2021
        </span>
        <ThemeToggle/>
      </div>
    </footer>
  )
}

export default Footer;
