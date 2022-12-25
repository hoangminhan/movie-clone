import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer, Header, Sidebar } from "components";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const DefaultLayout = ({
  children,
  showTab = false,
  page,
  showMenu = true,
}) => {
  const location = useLocation();
  const { pathname } = location;
  const [toggleMenu, setToggleMenu] = useState(
    !!sessionStorage.getItem("isToggleMenu") || false
  );
  const handleToggleMenu = (data) => {
    setToggleMenu(data);
  };
  useLayoutEffect(() => {
    if (pathname !== "/") {
      sessionStorage.setItem("isToggleMenu", true);
      setToggleMenu(sessionStorage.getItem("isToggleMenu"));
    }
  }, [location.pathname]);

  const [isHiddenSidebar, setIsHiddenSidebar] = useState(true);
  const handleClickLeftArrow = () => {
    setIsHiddenSidebar(true);
  };

  return (
    <div className="bg-[#162a45]">
      <aside
        className={`fixed z-[3] top-0 bottom-0 left-0 bg-[#22354e] duration-300 ease-in-out transition-all ${
          !toggleMenu ? "tablet:w-[180px] lg:w-[270px]" : "tablet:w-[80px]"
        }
        ${isHiddenSidebar ? "w-0" : "w-[270px]"}
        
        `}
      >
        <div
          className={`absolute top-2 left-4 ${
            isHiddenSidebar ? "hidden" : "block tablet:hidden"
          }`}
          onClick={() => {
            handleClickLeftArrow();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <Sidebar
          isToggle={toggleMenu}
          isHiddenSidebar={isHiddenSidebar}
          setIsHiddenSidebar={setIsHiddenSidebar}
          handleToggleMenu={handleToggleMenu}
        />
      </aside>
      <div
        className={`relative ${
          toggleMenu
            ? "ml-0 tablet:ml-[80px] duration-300 ease-in-out transition-all"
            : "ml-0 tablet:ml-[180px] lg:ml-[270px]"
        }`}
      >
        {/* overlay on mobile */}
        <div
          className={`absolute bg-black inset-0 z-[2] ${
            isHiddenSidebar
              ? "opacity-0 hidden"
              : "opacity-60 block tablet:hidden"
          }`}
          onClick={() => {
            setIsHiddenSidebar(true);
          }}
        ></div>
        <section
          // ${
          //   pathname === "/" ||
          //   pathname === "/tv-show" ||
          //   pathname === "/people"
          //     ? "px-[24px]"
          //     : ""
          // }
          className={`px-[12px] lg:px-[24px] 
          
          `}
        >
          {showMenu && (
            <Header
              page={page}
              showMenu={showMenu}
              setIsHiddenSidebar={setIsHiddenSidebar}
              isHiddenSidebar={isHiddenSidebar}
            />
          )}
          {children}
        </section>
      </div>
      <Footer toggleMenu={toggleMenu} />
    </div>
  );
};
