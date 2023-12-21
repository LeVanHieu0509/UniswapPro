import JPEG from "jpeg-js";

export function getBase64(file: File) {
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

export function toBuffer(ab: ArrayBuffer) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

export const resizeImageBase64 = async (file: File, isGreyScale: boolean = false) => {
  try {
    const Jimp = (await import("jimp/browser/lib/jimp")).default;
    Jimp.decoders["image/jpeg"] = (data: Buffer) => JPEG.decode(data, { maxMemoryUsageInMB: 1024 });
    const buf = await getBufferFromFile(file);
    let image = await Jimp.read(buf);
    if (image.bitmap.width > 1024) {
      image = image.resize(1024, Jimp.AUTO);
    }

    return isGreyScale ? image.greyscale().colorType(0).getBase64Async(file.type) : image.getBase64Async(file.type);
  } catch (err) {
    console.log("FAIL to read Bufer from Resizer.");
    console.log(err);
    return null;
  }
};

export const compositeImage = async (fileFront: File, fileBack: File) => {
  try {
    const Jimp = (await import("jimp")).default;
    Jimp.decoders["image/jpeg"] = (data: Buffer) => JPEG.decode(data, { maxMemoryUsageInMB: 1024 });
    let imageF = await Jimp.read(await getBufferFromFile(fileFront));
    let imageB = await Jimp.read(await getBufferFromFile(fileBack));
    if (imageF.bitmap.width > 1024) {
      imageF = imageF.resize(1024, Jimp.AUTO);
    }
    if (imageB.bitmap.width > 1024) {
      imageB = imageB.resize(1024, Jimp.AUTO);
    }
    imageF = imageF.greyscale().colorType(0);
    imageB = imageB.greyscale().colorType(0);
    const y = imageF.bitmap.height;
    return new Jimp(
      Math.max(imageF.bitmap.width, imageB.bitmap.width),
      imageF.bitmap.height + imageB.bitmap.height,
      0xffffffff
    )
      .composite(imageF, 0, 0)
      .composite(imageB, 0, y)
      .getBase64Async(fileFront.type);
  } catch (e) {}
};

export async function urltoFile(url: string, filename: string = "image", mimeType = "image/jpeg") {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  return new File([buf], filename, { type: mimeType });
}
