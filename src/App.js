import { useLocation, useRoutes } from "react-router-dom";
import RouteList from "routes";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.less";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "contexts";
import { ConfigProvider } from "antd";
import viVN from "antd/es/locale/vi_VN";
import enUS from "antd/es/locale/en_US";
import {
  app,
  getTokenPermision,
  messagingMovie,
  // onMessageListener,
} from "./firebase-custom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useFirebaseRealTime, useNotification } from "hooks";
import { onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

function App() {
  const stateContext = useContext(UserContext);
  const { localeGlobal, currentDataUser } = stateContext;
  const [globalLocale, setGlobalLocale] = localeGlobal;
  const [dataUser] = currentDataUser;
  let mainContent = useRoutes(RouteList);
  const location = useLocation();
  const { handlePopupNotification } = useNotification();
  const { handleAddNotification } = useFirebaseRealTime();

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

  // FCM
  useEffect(() => {
    getTokenPermision();
    const channel = new BroadcastChannel("notifications");
    channel.addEventListener("message", (event) => {
      console.log("Receive background: ", event.data);
    });
  }, []);
  // onMessageListener().then((data) => {
  //   handlePopupNotification(data.notification.body, "info");
  //   console.log("Receive foreground: ", data);
  // });
  // nhận thông báo when đang sử dụng web site

  onMessage(messagingMovie, async (payload) => {
    console.log({ payload });
    const { messageId, notification } = payload;
    try {
      await handleAddNotification(
        { noti_id: messageId, description: notification.body },
        dataUser.uid
      );
      handlePopupNotification(payload.notification.body, "info");
    } catch (error) {
      console.log("error");
    }
  });

  onBackgroundMessage(messagingMovie, async (payload) => {
    console.log({ payload });
    // const { messageId, notification } = payload;
    // try {
    //   await handleAddNotification(
    //     { noti_id: messageId, description: notification.body },
    //     dataUser.uid
    //   );
    //   handlePopupNotification(payload.notification.body, "info");
    // } catch (error) {
    //   console.log("error");
    // }
  });
  console.log({ dataUser });

  return (
    <ConfigProvider locale={globalLocale === "vi-VN" ? viVN : enUS}>
      <>
        <ToastContainer limit={3} />

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
          {/* back to top */}
        </div>
      </>
    </ConfigProvider>
  );
}

export default App;
