import React, { useEffect } from "react";
import { ScanBarCodeWrapper } from "./styled";
import { initCamera } from "./js";
interface ScanBarCodeProps {
  onChange: any;
  hide?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-tab-group": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-tab-panel": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-tab": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "resize-observer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "capture-photo": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "custom-clipboard-copy": any;
      "web-share": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "files-dropzone": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

const ScanBarCode = ({ onChange, hide = false }: ScanBarCodeProps) => {
  useEffect(() => {
    const callback = (value) => {
      onChange("product_bar_code", value);
    };
    if (!canUseDOM) {
      return null;
    } else {
      initCamera(callback);
    }
  }, [canUseDOM]);

  return (
    <ScanBarCodeWrapper hide={hide}>
      <>
        <noscript style={{ display: "none" }}>
          &lt;div class="noscript"&gt; JavaScript is required to properly view this site. &lt;/div&gt;
        </noscript>
        <div style={{ display: "none" }} className="global-actions w-full" id="globalActions">
          <button style={{ display: "none" }} id="historyBtn" title="History">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-clock"
              viewBox="0 0 16 16"
            >
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
            </svg>
            <span>History</span>
          </button>
          <button id="settingsBtn" title="Settings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-sliders2"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5ZM12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5ZM1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8Zm9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5Zm1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"
              />
            </svg>
            <span>Settings</span>
          </button>
        </div>
        <dialog style={{ display: "none" }} id="historyDialog" className="modal history-modal">
          <header>
            History
            <form method="dialog">
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
                <span className="visually-hidden">Close</span>
              </button>
            </form>
          </header>
          <ul id="historyList" />
          <button type="button" id="deleteHistoryBtn">
            Delete history
          </button>
        </dialog>
        <dialog style={{ display: "none" }} id="settingsDialog" className="modal settings-modal">
          <header>
            Cài đặt
            <form method="dialog">
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
                <span className="visually-hidden">Close</span>
              </button>
            </form>
          </header>
          <form name="settings-form" autoComplete="false">
            <fieldset name="barcode-found-settings">
              <ul>
                <li>
                  <label>
                    <input type="checkbox" name="beep" /> Bật âm thanh
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="vibrate" /> Bật chế độ rung (mobile)
                  </label>
                </li>
                <li style={{ display: "none" }}>
                  <label>
                    <input type="checkbox" name="openWebPage" /> Open web pages automatically
                  </label>
                </li>
                <li style={{ display: "none" }}>
                  <label>
                    <input type="checkbox" name="openWebPageSameTab" /> Open web pages in the same tab
                  </label>
                </li>
                <li style={{ display: "none" }}>
                  <label>
                    <input type="checkbox" name="addToHistory" /> Add to history
                  </label>
                </li>
              </ul>
            </fieldset>
          </form>
        </dialog>
        <header className="site-header" style={{ display: "none" }}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            width={80}
            height={80}
            xmlSpace="preserve"
            className="logo"
          >
            <path
              fill="var(--links)"
              d="M93.867,51.2H8.533C3.814,51.2,0,55.014,0,59.733v85.333c0,4.719,3.814,8.533,8.533,8.533s8.533-3.814,8.533-8.533v-76.8 h76.8c4.719,0,8.533-3.814,8.533-8.533S98.586,51.2,93.867,51.2z"
            />
            <path
              fill="var(--links)"
              d="M503.467,51.2h-85.333c-4.719,0-8.533,3.814-8.533,8.533s3.814,8.533,8.533,8.533h76.8v76.8c0,4.719,3.814,8.533,8.533,8.533c4.719,0,8.533-3.814,8.533-8.533V59.733C512,55.014,508.186,51.2,503.467,51.2z"
            />
            <path
              fill="var(--links)"
              d="M503.467,358.4c-4.719,0-8.533,3.814-8.533,8.533v76.8h-76.8c-4.719,0-8.533,3.814-8.533,8.533s3.814,8.533,8.533,8.533h85.333c4.719,0,8.533-3.814,8.533-8.533v-85.333C512,362.214,508.186,358.4,503.467,358.4z"
            />
            <path
              fill="var(--links)"
              d="M93.867,443.733h-76.8v-76.8c0-4.719-3.814-8.533-8.533-8.533S0,362.214,0,366.933v85.333c0,4.719,3.814,8.533,8.533,8.533h85.333c4.719,0,8.533-3.814,8.533-8.533S98.586,443.733,93.867,443.733z"
            />
            <path
              fill="var(--links)"
              d="M503.467,247.467H8.533C3.814,247.467,0,251.281,0,256s3.814,8.533,8.533,8.533h494.933c4.719,0,8.533-3.814,8.533-8.533S508.186,247.467,503.467,247.467z"
            />
            <path
              fill="currentColor"
              d="M119.467,119.467c-4.71,0-8.533,3.823-8.533,8.533v93.867c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V128C128,123.29,124.177,119.467,119.467,119.467z"
            />
            <path
              fill="currentColor"
              d="M153.6,119.467c-4.71,0-8.533,3.823-8.533,8.533v93.867c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V128C162.133,123.29,158.31,119.467,153.6,119.467z"
            />
            <path
              fill="currentColor"
              d="M187.733,119.467c-4.71,0-8.533,3.823-8.533,8.533v93.867c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V128C196.267,123.29,192.444,119.467,187.733,119.467z"
            />
            <path
              fill="currentColor"
              d="M221.867,119.467c-4.71,0-8.533,3.823-8.533,8.533v93.867c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V128C230.4,123.29,226.577,119.467,221.867,119.467z"
            />
            <path
              fill="currentColor"
              d="M256,119.467c-4.71,0-8.533,3.823-8.533,8.533v93.867c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V128C264.533,123.29,260.71,119.467,256,119.467z"
            />
            <path
              fill="currentColor"
              d="M290.133,119.467c-4.71,0-8.533,3.823-8.533,8.533v93.867c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V128C298.667,123.29,294.844,119.467,290.133,119.467z"
            />
            <path
              fill="currentColor"
              d="M324.267,119.467c-4.71,0-8.533,3.823-8.533,8.533v93.867c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V128C332.8,123.29,328.977,119.467,324.267,119.467z"
            />
            <path
              fill="currentColor"
              d="M358.4,119.467c-4.71,0-8.533,3.823-8.533,8.533v93.867c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V128C366.933,123.29,363.11,119.467,358.4,119.467z"
            />
            <path
              fill="currentColor"
              d="M392.533,119.467c-4.71,0-8.533,3.823-8.533,8.533v93.867c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V128C401.067,123.29,397.244,119.467,392.533,119.467z"
            />
            <path
              fill="currentColor"
              d="M119.467,281.6c-4.71,0-8.533,3.823-8.533,8.533v110.933c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V290.133C128,285.423,124.177,281.6,119.467,281.6z"
            />
            <path
              fill="currentColor"
              d="M153.6,281.6c-4.71,0-8.533,3.823-8.533,8.533V384c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533v-93.867C162.133,285.423,158.31,281.6,153.6,281.6z"
            />
            <path
              fill="currentColor"
              d="M187.733,281.6c-4.71,0-8.533,3.823-8.533,8.533V384c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-93.867C196.267,285.423,192.444,281.6,187.733,281.6z"
            />
            <path
              fill="currentColor"
              d="M221.867,281.6c-4.71,0-8.533,3.823-8.533,8.533V384c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533v-93.867C230.4,285.423,226.577,281.6,221.867,281.6z"
            />
            <path
              fill="currentColor"
              d="M256,281.6c-4.71,0-8.533,3.823-8.533,8.533V384c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-93.867C264.533,285.423,260.71,281.6,256,281.6z"
            />
            <path
              fill="currentColor"
              d="M290.133,281.6c-4.71,0-8.533,3.823-8.533,8.533V384c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-93.867C298.667,285.423,294.844,281.6,290.133,281.6z"
            />
            <path
              fill="currentColor"
              d="M324.267,281.6c-4.71,0-8.533,3.823-8.533,8.533V384c0,4.71,3.823,8.533,8.533,8.533S332.8,388.71,332.8,384v-93.867C332.8,285.423,328.977,281.6,324.267,281.6z"
            />
            <path
              fill="currentColor"
              d="M358.4,281.6c-4.71,0-8.533,3.823-8.533,8.533V384c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-93.867C366.933,285.423,363.11,281.6,358.4,281.6z"
            />
            <path
              fill="currentColor"
              d="M392.533,281.6c-4.71,0-8.533,3.823-8.533,8.533v110.933c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V290.133C401.067,285.423,397.244,281.6,392.533,281.6z"
            />
          </svg>
          <h1>Barcode/QR code Scanner</h1>
          <div className="fork">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="currentColor"
              className="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>
              Fork me on{" "}
              <a href="https://github.com/georapbox/barcode-scanner" target="_blank" rel="noreferrer noopener">
                Github
              </a>
            </span>
          </div>
        </header>
        <div className="toastContainer">
          <div id="toastContainer" />
        </div>
        <div className="container w-full">
          <a-tab-group>
            <a-tab slot="tab" role="heading" id="cameraTab" style={{ display: "none" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={26}
                height={26}
                fill="currentColor"
                className="bi bi-webcam"
                viewBox="0 0 16 16"
              >
                <path d="M0 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H9.269c.144.162.33.324.531.475a6.785 6.785 0 0 0 .907.57l.014.006.003.002A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.224-.947l.003-.002.014-.007a4.473 4.473 0 0 0 .268-.148 6.75 6.75 0 0 0 .639-.421c.2-.15.387-.313.531-.475H2a2 2 0 0 1-2-2V6Zm2-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2Z" />
                <path d="M8 6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm7 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
              </svg>
              <span>Use webcam</span>
            </a-tab>
            <a-tab-panel slot="panel" id="cameraPanel">
              <div className="scan-frame-container">
                <resize-observer>
                  <capture-photo facing-mode="environment" no-image="" className={hide ? "height-200" : ""}>
                    <button type="button" id="scanBtn" className="scan-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={36}
                        height={36}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
                      </svg>
                      Click vào đây để quét mã vạch/ QR Code
                    </button>
                    <span slot="capture-button" />
                    <span slot="facing-mode-button-content" title="Switch camera">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon"
                        viewBox="0 0 512 512"
                        width={22}
                        height={22}
                      >
                        <path
                          d="M350.54 148.68l-26.62-42.06C318.31 100.08 310.62 96 302 96h-92c-8.62 0-16.31 4.08-21.92 10.62l-26.62 42.06C155.85 155.23 148.62 160 140 160H80a32 32 0 00-32 32v192a32 32 0 0032 32h352a32 32 0 0032-32V192a32 32 0 00-32-32h-59c-8.65 0-16.85-4.77-22.46-11.32z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={32}
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={32}
                          d="M124 158v-22h-24v22M335.76 285.22v-13.31a80 80 0 00-131-61.6M176 258.78v13.31a80 80 0 00130.73 61.8"
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={32}
                          d="M196 272l-20-20-20 20M356 272l-20 20-20-20"
                        />
                      </svg>
                      <span className="visually-hidden">Switch camera</span>
                    </span>
                    <div slot="actions">
                      <div className="zoom-controls" id="zoomControls">
                        <button type="button" title="Zoom out" data-action="zoom-out">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            fill="currentColor"
                            className="bi bi-zoom-out"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                            />
                            <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                            <path
                              fillRule="evenodd"
                              d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
                            />
                          </svg>
                        </button>
                        <label id="zoomLevel" />
                        <button type="button" title="Zoom in" data-action="zoom-in">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            fill="currentColor"
                            className="bi bi-zoom-in"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                            />
                            <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                            <path
                              fillRule="evenodd"
                              d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </capture-photo>
                </resize-observer>
                <div id="scanFrame" className="scan-frame">
                  {/* <svg viewBox="0 0 100 100">
        <path d="M15,2 L2,2 L2,15" fill="none" stroke="var(--scan-frame-color)" stroke-width="2" stroke-linejoin="round" />
        <path d="M2,85 L2,98 L15,98" fill="none" stroke="var(--scan-frame-color)" stroke-width="2" stroke-linejoin="round" />
        <path d="M85,98 L98,98 L98,85" fill="none" stroke="var(--scan-frame-color)" stroke-width="2" stroke-linejoin="round" />
        <path d="M98,15 L98,2 L85,2" fill="none" stroke="var(--scan-frame-color)" stroke-width="2" stroke-linejoin="round" />
      </svg> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M336 448h56a56 56 0 0056-56v-56M448 176v-56a56 56 0 00-56-56h-56M176 448h-56a56 56 0 01-56-56v-56M64 176v-56a56 56 0 0156-56h56"
                      fill="none"
                      stroke="var(--scan-frame-color)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={10}
                    />
                  </svg>
                </div>
              </div>
              <div id="scanInstructions" className={hide ? "hide-mobile" : "scan-instructions mt-16"}>
                <p>Vui lòng đặt Barcode/QR Code ở giữa khung hình</p>
              </div>
              <dialog id="cameraResults" className={hide ? "hide-mobile" : "results"}>
                <div className="results__actions">
                  <custom-clipboard-copy from="#cameraResults .results__item" />
                  <web-share>
                    <button slot="button" type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-share"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                      </svg>
                      Share
                    </button>
                  </web-share>
                </div>
              </dialog>
            </a-tab-panel>
            <a-tab slot="tab" role="heading" id="fileTab" style={{ display: "none" }}>
              <svg
                width={18}
                height={18}
                viewBox="0 0 21 21"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <g transform="translate(-850.000000, -2681.000000)">
                    <g transform="translate(100.000000, 2626.000000)">
                      <g transform="translate(748.000000, 54.000000)">
                        <g>
                          <polygon id="Path" points="0 0 24 0 24 24 0 24" />
                          <path
                            d="M10.21,16.83 L12.96,13.29 L16.5,18 L5.5,18 L8.25,14.47 L10.21,16.83 Z M20,4 L23,4 L23,6 L20,6 L20,8.99 L18,8.99 L18,6 L15,6 L15,4 L18,4 L18,1 L20,1 L20,4 Z M18,20 L18,10 L20,10 L20,20 C20,21.1 19.1,22 18,22 L4,22 C2.9,22 2,21.1 2,20 L2,6 C2,4.9 2.9,4 4,4 L14,4 L14,6 L4,6 L4,20 L18,20 Z"
                            fill="currentColor"
                          />
                          <path d="M16.5,18 L5.5,18 L8.25,14.47 L10.21,16.83 L12.96,13.29 L16.5,18 Z M17,7 L14,7 L14,6 L4,6 L4,20 L18,20 L18,10 L17,10 L17,7 Z" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span>Use image</span>
            </a-tab>
            <a-tab-panel slot="panel" id="filePanel" style={{ display: "none" }}>
              <files-dropzone id="dropzone" className="dropzone">
                <span className="dropzone-instructions">
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 21 21"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                      <g transform="translate(-850.000000, -2681.000000)">
                        <g transform="translate(100.000000, 2626.000000)">
                          <g transform="translate(748.000000, 54.000000)">
                            <g>
                              <polygon id="Path" points="0 0 24 0 24 24 0 24" />
                              <path
                                d="M10.21,16.83 L12.96,13.29 L16.5,18 L5.5,18 L8.25,14.47 L10.21,16.83 Z M20,4 L23,4 L23,6 L20,6 L20,8.99 L18,8.99 L18,6 L15,6 L15,4 L18,4 L18,1 L20,1 L20,4 Z M18,20 L18,10 L20,10 L20,20 C20,21.1 19.1,22 18,22 L4,22 C2.9,22 2,21.1 2,20 L2,6 C2,4.9 2.9,4 4,4 L14,4 L14,6 L4,6 L4,20 L18,20 Z"
                                fill="currentColor"
                              />
                              <path d="M16.5,18 L5.5,18 L8.25,14.47 L10.21,16.83 L12.96,13.29 L16.5,18 Z M17,7 L14,7 L14,6 L4,6 L4,20 L18,20 L18,10 L17,10 L17,7 Z" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  Click or drop an image to scan
                </span>
              </files-dropzone>
              <dialog id="fileResults" className="results">
                <div className="results__actions">
                  <custom-clipboard-copy from="#fileResults .results__item" />
                  <web-share>
                    <button slot="button" type="button" title="Share">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-share"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                      </svg>
                      Share
                    </button>
                  </web-share>
                </div>
              </dialog>
            </a-tab-panel>
          </a-tab-group>
        </div>
        <p style={{ display: "none" }} className="supported-formats" id="supportedFormats" />
        <footer style={{ display: "none" }}>
          <p>
            Licensed under{" "}
            <a href="https://georapbox.mit-license.org/@2022" target="_blank" rel="noopener">
              The MIT License (MIT)
            </a>
          </p>
        </footer>
      </>
    </ScanBarCodeWrapper>
  );
};

export default ScanBarCode;
