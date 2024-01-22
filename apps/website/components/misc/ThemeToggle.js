// ! Library
import { BlackChip, WhiteChip } from "@chamomileclub/casinojs";
import { useTheme } from "../../lib/providers/Theme.provider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return theme === "light"
    ? (
      <WhiteChip
        className="w-min h-8 rounded-full shadow-lg"
        onClick={toggleTheme}
      />
    )
    : (
      <BlackChip
        className="w-min h-8 rounded-full shadow-lg"
        onClick={toggleTheme}
      />
    );
};

export default ThemeToggle;
