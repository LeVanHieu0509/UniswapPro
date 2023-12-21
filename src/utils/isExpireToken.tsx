import jwtDecode from "jwt-decode";

type tokenDecodeType = {
  exp: number;
};
export default function isExpireToken(accessToken: string) {
  const decodeToken: tokenDecodeType = jwtDecode(accessToken);
  const dateNow = new Date();
  const exp = decodeToken.exp * 1000;
  if (exp < dateNow.getTime()) {
    return true;
  }
  return false;
}
