import React, { useEffect, useRef, useState } from "react";
import { BarcodeScannerWrapper } from "./styled";
import { barcode } from "./config";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasgRef = useRef(null);
  const resultRef = useRef<any>(null);

  const [state, setState] = useState();
  const sound: any = new Audio(`${process.env.basePath}/public/barcode.wav`);

  useEffect(() => {
    barcode.config.start = 0.1;
    barcode.config.end = 0.9;
    barcode.config.video = "#barcodevideo";
    barcode.config.canvas = "#barcodecanvas";
    barcode.config.canvasg = "#barcodecanvasg";

    barcode.setHandler(function (barcode) {
      console.log("barcode", barcode);
      setState(barcode);
    });

    barcode.init();
  }, [state]);

  return (
    <BarcodeScannerWrapper>
      <div id="barcode">
        <video ref={videoRef} id="barcodevideo" autoPlay></video>
        <canvas ref={canvasRef} id="barcodecanvasg"></canvas>
      </div>
      <canvas ref={canvasgRef} id="barcodecanvas"></canvas>
      <div id="result" ref={resultRef}>
        {" "}
        {state}
      </div>
    </BarcodeScannerWrapper>
  );
};

export default BarcodeScanner;
