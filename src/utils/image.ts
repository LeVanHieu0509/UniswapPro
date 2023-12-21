import FileResizer from "react-image-file-resizer";

export function getBase64FromFile(file: File) {
  return new Promise<string>((resolve) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export function getBufferFromFile(file: File) {
  return new Promise<Buffer>((resolve) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      resolve(Buffer.from(reader.result as ArrayBuffer));
    };
    reader.readAsArrayBuffer(file);
  });
}

// export const convertBase64Grayscale = async (file: File) => {
//   try {
//     Jimp.decoders["image/jpeg"] = (data: Buffer) =>
//       JPEG.decode(data, { maxMemoryUsageInMB: 1024 });
//     const buf = await getBufferFromFile(file);
//     let image = await Jimp.read(buf);
//     if (image.bitmap.width > 1024) {
//       image = image.resize(1024, Jimp.AUTO);
//     }
//     return image.greyscale().colorType(0).getBase64Async(file.type);
//   } catch (err) {
//     console.log("FAIL to read Bufer from Resizer.");
//     console.log(err);
//     return null;
//   }
// };

// export const compositeImage = async (fileFront: File, fileBack: File) => {
//   try {
//     Jimp.decoders["image/jpeg"] = (data: Buffer) =>
//       JPEG.decode(data, { maxMemoryUsageInMB: 1024 });
//     let imageF = await Jimp.read(await getBufferFromFile(fileFront));
//     let imageB = await Jimp.read(await getBufferFromFile(fileBack));
//     if (imageF.bitmap.width > 1024) {
//       imageF = imageF.resize(1024, Jimp.AUTO);
//     }
//     if (imageB.bitmap.width > 1024) {
//       imageB = imageB.resize(1024, Jimp.AUTO);
//     }
//     imageF = imageF.greyscale().colorType(0);
//     imageB = imageB.greyscale().colorType(0);
//     const y = imageF.bitmap.height;
//     return new Jimp(
//       Math.max(imageF.bitmap.width, imageB.bitmap.width),
//       imageF.bitmap.height + imageB.bitmap.height,
//       0xffffffff
//     )
//       .composite(imageF, 0, 0)
//       .composite(imageB, 0, y)
//       .getBase64Async(fileFront.type);
//   } catch (e) {}
// };

export const reduceImage = async (file: File, percent: number) => {
  return new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      1024,
      1024,
      "JPEG",
      percent,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
};
