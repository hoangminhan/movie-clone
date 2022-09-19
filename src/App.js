import { ComponentModalGlobal } from "modal";
import { useLocation, useRoutes } from "react-router-dom";
import RouteList from "routes";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.less";
import { useContext, useLayoutEffect } from "react";
import { useEffect } from "react";
import { UserContext } from "contexts";

function App() {
  let mainContent = useRoutes(RouteList);
  const location = useLocation();

  useEffect(() => {
    console.log("scroll");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  useEffect(() => {
    AOS.init({
      once: true,
      initClassName: "aos-init",
      easing: "ease-in-sine",
    });
  }, []);

  return (
    <div className="text-2xl text-[#989898] font-poppin">
      {/* <Routes>
        {RouteList.map((item, index) => {
          let Page = item.component;
          const checkLayout = item.layout;
          let CurrentLayout = checkLayout ? DefaultLayout : NotFoundLayout;
          return (
            <Route
              path={item.path}
              element={
                <React.Suspense fallback={<></>}>
                  <CurrentLayout>
                    <Page />
                  </CurrentLayout>
                </React.Suspense>
              }
              key={index}
            >
              {item?.routes?.length &&
                item.routes.map((subRoute, index) => {
                  Page = subRoute.component;
                  return index === 0 ? (
                    <Route index element={<Page />} />
                  ) : (
                    <Route path={subRoute.path} element={<Page />} />
                  );
                })}
            </Route>
          );
        })}
      </Routes> */}
      {mainContent}
    </div>
  );
}

export default App;
