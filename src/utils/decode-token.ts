import jwtDecode from "jwt-decode";

type TokenDecodded = {
  exp: number;
  ide: number;
  sub: string;
};

export default function decodeToken(accessToken: string): TokenDecodded {
  const decoded: TokenDecodded = jwtDecode(accessToken);
  return decoded;
}
