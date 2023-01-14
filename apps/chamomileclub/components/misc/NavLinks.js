import Link from "next/link";
import PropTypes from "prop-types";

// ! Library
import { joinClasses } from "../../lib/utilities";

const links = [
  { name: "Home", href: "/", navbarOnly: true },
  { name: "Rules", footerName: "Rules", href: "/rules" },
  { name: "Hands", footerName: "Hands", href: "/hands" },
  { name: "Founders", footerName: "Founders", href: "/founders" },
  { name: "Team", footerName: "Team", href: "/team" },
  { name: "Jobs", href: "/jobs" }
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
            <Link
              href={link.href} key={`${id}-${link.href}`}
              className={joinClasses({ [linkStyle]: linkStyle })}
            >
              { determineLinkName(link) }
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
