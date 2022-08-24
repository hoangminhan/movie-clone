import { DefaultLayout, NotFoundLayout } from "layout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import RouteList from "routes";
import "./App.less";

function App() {
  return (
    <div className="text-2xl text-[#989898] font-poppin">
      <Routes>
        {RouteList.map((item, index) => {
          const Page = item.component;
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
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
