import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { loadLocalItem } from "redux/store";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "styles/theme";
import { AdminLayoutWrapper } from "./styled";
import { useRouter } from "next/router";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { ButtonPrimary } from "styles/buttons";
import LoadingPage from "components/loading-page";
import { listSidenav } from "@constants";

interface ThemeWrapperProps {
  children: React.ReactNode;
  component: React.ReactNode | any;
}

const ThemeWrapper = ({ children, component }: ThemeWrapperProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openExpiredModal, setOpenExpiredModal] = useState(false);

  const linkNotHandle = !["/_error", "/login", "/"].includes(router.pathname);

  useEffect(() => {
    const listenter = function (ev: MouseEvent) {
      const button = ev.target as HTMLButtonElement;
      if (button.tagName === "BUTTON" && !button.disabled) {
        const clickable = button.dataset.clickable;
        if (clickable === "false") {
          ev.preventDefault();
          ev.stopPropagation();
          return;
        }
        button.dataset.clickable = "false";
        button.style.pointerEvents = "none";
        setTimeout(() => {
          button.dataset.clickable = "true";
          button.style.pointerEvents = "";
        }, 300);
      }
    };
    document.addEventListener("click", listenter);
    return () => {
      document.removeEventListener("click", listenter);
    };
  }, []);

  //handle expired token
  useEffect(() => {
    const currentUser = loadLocalItem("currentUser");
    const orderCarts = loadLocalItem("orderCarts");
    const cacheData = loadLocalItem("cacheData");

    if (currentUser) {
      dispatch(rootAction.setCurrentUser(currentUser));
      dispatch(rootAction.setOrderCarts(orderCarts));
      dispatch(rootAction.setCacheData(cacheData));
    }

    dispatch(rootAction.setInitialized(true));

    const listenerExpires = () => {
      localStorage.removeItem("currentUser");

      if (linkNotHandle) {
        setOpenExpiredModal(true);
      }
    };

    window.addEventListener("expirestoken", listenerExpires);
    return () => {
      window.removeEventListener("expirestoken", listenerExpires);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkNotHandle]);

  const handleExpired = () => {
    setOpenExpiredModal(false);
    router.replace("/auth/sign-in");
  };

  useEffect(() => {
    const currentUser = loadLocalItem("currentUser");
    if (!currentUser.tokens) {
      router.replace("/auth/sign-in");
    }
  }, []);

  // useEffect(() => {
  //   const currentUser = loadLocalItem("currentUser");
  //   const listLinkAccess = listSidenav.filter((item) => item.role.includes(currentUser?.user?.usr_roles));

  //   if (currentUser.tokens && !listLinkAccess.find((item) => item.href === router.pathname)) {
  //     router.push("/manager/tao-hoa-don");
  //   }
  // }, []);

  return (
    <ThemeProvider theme={LightTheme}>
      <Head>
        <link rel="icon" href={`${process.env.basePath}/favicon.ico`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Là cửa hàng chuyên phân phối các mặt hàng tiêu dùng, thực phẩm, Tạp hoá JUN BF mang trong mình sứ mệnh cung cấp đến tay người tiêu dùng các sản phẩm sạch, có nguồn gốc xuất xứ rõ ràng, chất lượng tốt nhất với giá cả cạnh tranh nhất."
        />
        <title>TẠP HOÁ JUN BF</title>
      </Head>
      {children}
      <AdminLayoutWrapper>{component}</AdminLayoutWrapper>

      {/* <Dialog handler={() => {}} open={openExpiredModal} size="sm">
        <DialogHeader>
          <p>Thông báo</p>
        </DialogHeader>
        <DialogBody>
          <p>Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.</p>
        </DialogBody>
        <DialogFooter>
          <ButtonPrimary onClick={handleExpired}>Tôi đã hiểu</ButtonPrimary>
        </DialogFooter>
      </Dialog> */}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
