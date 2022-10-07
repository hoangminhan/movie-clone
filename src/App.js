import { ComponentModalGlobal } from "modal";
import { useLocation, useRoutes } from "react-router-dom";
import RouteList from "routes";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.less";
import { useContext, useLayoutEffect } from "react";
import { useEffect } from "react";
import { UserContext } from "contexts";
import { ConfigProvider } from "antd";
import viVN from "antd/es/locale/vi_VN";
import enUS from "antd/es/locale/en_US";
import { app } from "./firebase";

function App() {
  const stateContext = useContext(UserContext);
  const { localeGlobal } = stateContext;
  const [globalLocale, setGlobalLocale] = localeGlobal;
  let mainContent = useRoutes(RouteList);
  const location = useLocation();

  useEffect(() => {
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
    <ConfigProvider locale={globalLocale === "vi-VN" ? viVN : enUS}>
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
    </ConfigProvider>
  );
}

export default App;
