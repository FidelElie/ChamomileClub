import Link from "next/link";
import PropTypes from "prop-types";

// ! Library
import { joinClasses } from "../../lib/utilities";

const links = [
  { name: "Home", href: "/" },
  { navbarName: "The Rules", footerName: "Rules", href: "/rules" },
  { navbarName: "The Hands", footerName: "Hands", href: "/hands" },
  { navbarName: "The Founders", footerName: "Founders", href: "/founders" },
  { navbarName: "The Team", footerName: "Team", href: "/team" },
  { name: "Jobs", href: "/jobs", footerOnly: true }
]

const NavLinks = (props) => {
  const { id, linkStyle, mode } = props;

  const determineLinkName = (link) => {
    if (`${mode.toLowerCase()}Name` in link) {
      return link[`${mode.toLowerCase()}Name`];
    } else {
      return link.name;
    }
  }

  const determineValidLink = (link) => {
    if (mode === "navbar" && link.footerOnly) {
      return false
    } else if (mode === "footer" && link.navbarOnly) {
      return false
    } else {
      return true;
    }
  }

  return (
    <>
      {
        links.map(link => {
          return determineValidLink(link) && (
            <Link href={link.href} key={`${id}-${link.href}`}>
              <a className={joinClasses({ [linkStyle]: linkStyle })}>
                { determineLinkName(link) }
              </a>
            </Link>
          )
        })
      }
    </>
  )
}

NavLinks.propTypes = {
  id: PropTypes.string.isRequired,
  linkStyle: PropTypes.string,
  mode: PropTypes.oneOf(["navbar", "footer"]).isRequired
}

export default NavLinks;
