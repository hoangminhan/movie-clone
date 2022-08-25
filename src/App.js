import { DefaultLayout, NotFoundLayout } from "layout";
import React from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import RouteList from "routes";
import "./App.less";

function App() {
  let mainContent = useRoutes(RouteList);
  return (
    <div className="text-2xl text-[#989898] font-poppin">
      {/* <Routes>
        {RouteList.map((item, index) => {
          console.log({ item });
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
                  console.log("object", subRoute);
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
