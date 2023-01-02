import {
  faArrowCircleUp,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer, Header, Sidebar } from "components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const topRef = useRef(null);
  const handleClick = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // visible back to top button when height window >500
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#162a45]" ref={topRef}>
      <aside
        className={`fixed z-[3] top-0 bottom-0 left-0 bg-[#22354e] duration-300 ease-in-out transition-all ${
          !toggleMenu ? "tablet:w-[180px] lg:w-[230px]" : "tablet:w-[80px]"
        }
        ${isHiddenSidebar ? "w-0" : "w-[230px]"}
        
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
            : "ml-0 tablet:ml-[180px] lg:ml-[230px]"
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
      <div
        className={` transition-all duration-150 ease-linear ${
          isVisible
            ? "fixed z-[2] bottom-9 right-4 text-white bg-primarybg w-[50px] h-[50px] justify-center items-center rounded-full cursor-pointer flex"
            : "hidden"
        }`}
        onClick={() => {
          handleClick();
        }}
      >
        <FontAwesomeIcon beat icon={faArrowCircleUp} />
      </div>
    </div>
  );
};
