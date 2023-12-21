import { Alert } from "components/alert";
import CryptoJS from "crypto-js";
import { get, isArray, range, round, sum } from "lodash";
import moment from "moment";

export const handleError = (
  e: any,
  defaultMessage = "Lỗi kết nối mạng. Quý khách vui lòng truy cập lại sau hoặc liên hệ Tổng đài Dịch vụ khách hàng 1800 96 96 90 (miễn cước) để được hỗ trợ nhanh kịp thời."
) => {
  if (!e?.isAxiosError) {
    Alert("ERROR", defaultMessage);
    return;
  }
  if (!e?.response) {
    Alert(
      "ERROR",
      "Lỗi kết nối mạng. Quý khách vui lòng truy cập lại sau hoặc liên hệ Tổng đài Dịch vụ khách hàng 1800 96 96 90 (miễn cước) để được hỗ trợ nhanh kịp thời."
    );
    return;
  }
  const status = get(e, "response.status");
  switch (status) {
    case 401: {
      Alert("ERROR", "Phiên đăng nhập đã hết hạn");
      break;
    }
    case 400:
    case 500:
    case 502:
    case 503:
    case 422: {
      Alert(
        "ERROR",
        "Lỗi kết nối mạng. Quý khách vui lòng truy cập lại sau hoặc liên hệ Tổng đài Dịch vụ khách hàng 1800 96 96 90 (miễn cước) để được hỗ trợ nhanh kịp thời."
      );
      break;
    }
    default: {
      Alert("ERROR", defaultMessage);
      break;
    }
  }
};

export const typeOnlyNumber = (text: string) => {
  let value = text.replace(/[^0-9]/g, "") + "";
  return value;
};

export const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
};

export const percentageFormula = (value: number, maxValue: number) => {
  return Math.round((value / maxValue) * 100);
};

export const formatNumberToMoneyString = (
  number: number | string,
  lang?: "us" | "vi"
): { value: number; unit: string; result: string } => {
  number = Math.round(+number);

  if (number >= 1000) {
    let numberObj = {
      value: number,
      unit: "",
      result: "",
    };

    if (number >= 1000000000) {
      numberObj.value = Math.round(number / 1000000) / 1000;
      numberObj.unit = lang === "us" ? "B" : " Tỷ";
    } else if (number >= 1000000) {
      numberObj.value = Math.round(number / 100000) / 10;
      numberObj.unit = lang === "us" ? "M" : " Tr";
    }
    // else if (number >= 1000) {
    //   numberObj.value = Math.round(number / 100) / 10;
    //   numberObj.unit = lang === "us" ? "K" : " Ng";
    // }
    numberObj.result = formatNumber(numberObj.value) + numberObj.unit;

    return numberObj;
  } else {
    return {
      value: number ? +number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : 0,
      unit: "",
      result: number ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : "0",
    };
  }
};

export const formatToMoney = (num: number | string, minimumFractionDigits = 0) => {
  const language = process.browser && navigator ? navigator.language : "en";
  return (+num)?.toLocaleString(language, { minimumFractionDigits: minimumFractionDigits });
};

export const formatNumber = (num: number | string, round?: boolean, minimumFractionDigits = 0) => {
  if (round) {
    return !isNaN(+num)
      ? Math.round(+num)?.toLocaleString("de-DE", { minimumFractionDigits: minimumFractionDigits })
      : "0";
  } else {
    return !isNaN(+num) ? (+num)?.toLocaleString("de-DE", { minimumFractionDigits: minimumFractionDigits }) : "0";
  }
};

export const encryptPassword = (val: string) => {
  let res = CryptoJS.AES.encrypt(JSON.stringify(val), "secretFWD2021").toString();
  return res;
};

export const coverDateNumberToString = (date: any) => {
  if (date?.length < 10) {
    return date;
  }
  if (/[0-3][0-9]\/[0-1][0-9]\/[1-2]\d{3}/.test(date)) {
    return date;
  }
  if (date && moment(date).isValid()) {
    return moment(date).format("DD/MM/YYYY");
  }
  return date;
};

export const formatNumberTwoString = (stt: number) => {
  if (stt < 10) return stt.toString().length > 1 ? stt : "0" + stt.toString();
  return stt;
};

export const calculateTotal = (data: any[], key: string): number => {
  if (!data?.length) {
    return 0;
  }

  return sum(data.map((item) => item[key]));
};

export const calculatePercent = (number: number, total: number, max?: number, decimal = 0): number => {
  if (!number || !total) {
    return 0;
  }

  const percent = round((number / total) * 100, decimal);

  if (max) {
    return percent >= max ? max : percent;
  }

  return percent;
};

export const convertTabToPlaceHolder = (tab: string) => {
  switch (tab) {
    case "daily":
      return "Chọn ngày";
    case "monthly":
      return "Chọn tháng";
    case "yearly":
      return "Chọn năm";
    default:
      return null;
  }
};

export const getDateFrom = (format?: string): string => {
  return moment()
    .startOf("month")
    .format(format ?? "DD/MM/YYYY");
};

export const getDateTo = (format?: string): string => {
  return moment().format(format ?? "DD/MM/YYYY");
};

export const formatDateRequest = (date: string): string => {
  const dateFormat = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
  return dateFormat;
};

export const formatDateRequestFromMonth = (date: string): string => {
  const dateFormat = moment(date, "MM/YYYY").format("YYYY-MM");
  return dateFormat;
};

export function addLevelDepth(data: any) {
  let maxDepth = 0;

  function addLevel(list: any[], level = 0) {
    list?.forEach((item) => {
      if (level > maxDepth) {
        maxDepth = level;
      }
      item.level = level;
      addLevel(item.children, level + 1);
    });
  }
  addLevel(data);

  function addDepth(list: any[]) {
    list?.forEach((item) => {
      item.depth = maxDepth - item.level;
      addDepth(item.children);
    });
  }
  addDepth(data);

  return data;
}

export function sumCalculator(items: any[], key: string) {
  return items?.reduce((total, item) => total + item?.[key], 0);
}

export const checkIsAD = (agentCode: string) => {
  if (agentCode?.startsWith("AD")) {
    return true;
  } else {
    return false;
  }
};

export const sizeFile = (value: any): number => {
  let total = 0;
  if (isArray(value)) {
    total = sum(value.map((size) => +(size / (1024 * 1024)).toFixed(2)));
  } else {
    total = +(value / (1024 * 1024)).toFixed(2);
  }

  return total;
};

export const sizeFileString = (size: number): string => {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return +(size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
};

export const agentRole = (designation: string) => {
  if (["FSC", "SFSC", "HDBS", "AGRBS", "FWP", "DFWP"].includes(designation)) {
    return "TV";
  } else {
    return "CQL";
  }
};

export const agentIFARole = (designation: string) => {
  if (
    [
      "FWMCEO",
      "FWMSUM",
      "FWMAL",
      "FWMAM",
      "FWMAD",
      "FWMMAD",
      "FWMSD",
      "FWMMSD",
      "FWMRD",
      "FWMTD",
      "BREMP",
      "ASEMP",
      "AVEMP",
      "MOEMP",
      "TDEMP",
      "BOEMP",
      "WAEMP",
      "ABKEMP",
      "VHEMP",
    ].includes(designation)
  ) {
    return "CQL";
  } else {
    return "TV";
  }
};

export const lineChartByYearNumber = ["", ...range(1, 13).map((item) => item)];

export const getPreviousArrVal = (arr: number[]) => {
  const outputArr = [];
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
    outputArr.push(total - arr[i]);
  }
  return outputArr;
};

export const convertNameToCharacter = (name: string) => {
  const splitName = name?.split(" ");
  let fristCharacter = "";
  let lastCharacter = "";

  if (splitName?.length == 1) {
    lastCharacter = splitName?.pop();
  } else {
    fristCharacter = splitName?.shift().slice(0, 1);
    lastCharacter = splitName?.pop().slice(0, 1);
  }
  return fristCharacter + lastCharacter;
};

export const convertIdentityType: any = {
  CMND: "CMND",
  CCCD: "CCCD",
  HC: "Hộ chiếu",
};
