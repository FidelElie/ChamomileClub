import { useState } from "react";
import PropTypes from "prop-types";

// ! Library
import { joinClasses } from "../../../lib/utilities";

// ! Assets
import { AceSpades } from "@chamomileclub/casinojs";
import ThemeToggle from "../../misc/ThemeToggle";

// ! Components
import NavLinks from "../../misc/NavLinks";

const Navbar = props => {
  const { fixed } = props;
  const [navigationToggled, setNavigationToggled] = useState(false);

  return (
    <nav className={joinClasses("w-screen transition-colors" , {
      "fixed z-20": fixed,
      "bg-green-900 dark:bg-invertedDark shadow-lg": navigationToggled
      })}>
      <div className="px-8 w-full flex flex-col py-4 box-border space-y-2 container mx-auto">
        <div className="flex items-center justify-between space-x-3">
          <AceSpades
            className={joinClasses("w-min h-16 transform transition-transform shadow-lg rounded-md border border-transparent cursor-pointer hover:border-red-500", {
              "rotate-45": navigationToggled
            })}
            onClick={() => setNavigationToggled(!navigationToggled)}
          />
          { navigationToggled && <ThemeToggle/> }
        </div>
        {
          navigationToggled && (
            <div className="flex justify-between space-x-2">
              <div className="flex flex-col space-y-2 py-2 sm:space-y-0 sm:space-x-4 sm:flex-row">
                <NavLinks
                  id="navbar-links"
                  mode="navbar"
                  linkStyle="text-white w-min font-light whitespace-nowrap hover:text-red-500"
                />
              </div>
              <div className="flex flex-col">
              </div>
            </div>
          )
        }
      </div>
    </nav>
  )
}

Navbar.propTypes = { fixed: PropTypes.bool }

Navbar.defaultProps = { fixed: true }

export default Navbar;
