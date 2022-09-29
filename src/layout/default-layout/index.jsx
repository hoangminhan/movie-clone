import { Footer, Header, Sidebar } from "components";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const DefaultLayout = ({ children, showTab = false }) => {
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
  }, []);
  return (
    <div className="bg-[#1c1c1e]">
      <Sidebar isToggle={toggleMenu} handleToggleMenu={handleToggleMenu} />
      <div
        className={`${
          toggleMenu ? "ml-[100px] duration-300 ease-in-out" : "ml-[270px]"
        }`}
      >
        <section
          className={`px-[24px] ${
            pathname === "/" ||
            pathname === "/tv-show" ||
            pathname === "/people"
              ? "px-[24px]"
              : ""
          }`}
        >
          {showTab && <Header />}
          {children}
        </section>
      </div>
      <Footer toggleMenu={toggleMenu} />
    </div>
  );
};
