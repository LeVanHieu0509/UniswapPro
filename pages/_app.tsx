import type { AppProps } from "next/app";

import { ThemeProvider } from "@material-tailwind/react";
import moment from "moment-timezone";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { MaterialTailwindControllerProvider } from "context";
import ThemeWrapper from "../src/containers/theme-wrapper";
import { store } from "../src/redux/store";
import "../src/styles/global.css";
import { GlobalStyle } from "../src/styles/globals";
import { default as version } from "../version.json";
import RootAppLoading from "components/root-app-loading";
import useWindowResize from "hooks/use-window-resize";
import { useRouter } from "next/router";
import { SwapTokenContextProvider } from "../Context/SwapTokenContextProvider";

const App = ({ Component, pageProps }: AppProps) => {
  const size = useWindowResize();
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      toast.dismiss();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (window) {
      moment.tz.setDefault("Asia/Ho_Chi_Minh");
      console.log(`version-cube: #${version.build} (${version.date})`);
    }
  }, []);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [size?.height]);

  return (
    <Provider store={store}>
      <SwapTokenContextProvider>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <ThemeWrapper component={<Component {...pageProps} />}>
              <GlobalStyle />
              <RootAppLoading />
              <ToastContainer />
            </ThemeWrapper>
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </SwapTokenContextProvider>
    </Provider>
  );
};

export default App;
