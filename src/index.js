import { store } from "app/store";
import { LoadingSuspense } from "components";
import { Suspense, useContext } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import i18n from "translation/i18n";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { UserProviderContext } from "contexts";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import vi from "javascript-time-ago/locale/vi.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(vi);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense
    fallback={
      <>
        <LoadingSuspense color="black" type="bubbles" />
      </>
    }
  >
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Provider store={store}>
          <UserProviderContext>
            <App />
          </UserProviderContext>
        </Provider>
      </BrowserRouter>
    </I18nextProvider>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
