import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { LanguageProject, Profile } from "./component";

export const Header = ({ page, setIsHiddenSidebar, isHiddenSidebar }) => {
  const [t] = useTranslation();
  const location = useLocation();
  const { pathname } = location;
  const handleContentHeader = (page) => {
    switch (page) {
      case "keyword":
        return t("Keyword");
      case "discovery":
        return <p>{t("FIND FILMS THAT BEST FIT YOU")}</p>;
      case "genres":
        return t("Genres");
      case "movie":
        return "Detail movie";
      case "Cast":
        return t("Actor Info");
      case "Search":
        return t("Search");
      case "Favorite":
        return t("Favorite");
      case "History":
        return t("Watched");
      case "Account Settings":
        return t("Account Settings");
      default:
        return <Menu setIsHiddenSidebar={setIsHiddenSidebar} />;
    }
  };
  return (
    <header className="flex justify-between items-center h-[70px] before:absolute before:h-[1px] before:w-[100%] before:left-[0px] before:right-[0px] before:top-[70px] before:bg-[#4f4e4e] text-white">
      <div className="text-[20px] whitespace-nowrap">
        {handleContentHeader(page)}
      </div>

      <div className="flex justify-end items-center gap-[20px] basis-3/5">
        <div
          className="block tablet:hidden"
          onClick={() => {
            setIsHiddenSidebar(false);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <LanguageProject />
        <Profile />
      </div>
    </header>
  );
};
