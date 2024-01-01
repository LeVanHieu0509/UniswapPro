import { NavbarWithSearch } from "UI/header";
import TableSwap from "UI/table";
import { Container } from "styles";
import { TableWrapper, TokensScreenWrapper } from "./styled";

interface TokensScreenProps {}

const TABLE_HEAD = ["Token Name", "Price", "Change", "TVL", "Volume", ""];

const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Ether ETH",
    amount: "$2,500",
    date: "+235.5",
    status: "$7895.3 M",
    account: "$789 M",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Ether ETH",
    amount: "$2,500",
    date: "+235.5",
    status: "$7895.3 M",
    account: "$789 M",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Ether ETH",
    amount: "$2,500",
    date: "+235.5",
    status: "$7895.3 M",
    account: "$789 M",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Ether ETH",
    amount: "$2,500",
    date: "+235.5",
    status: "$7895.3 M",
    account: "$789 M",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Ether ETH",
    amount: "$2,500",
    date: "+235.5",
    status: "$7895.3 M",
    account: "$789 M",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Ether ETH",
    amount: "$2,500",
    date: "+235.5",
    status: "$7895.3 M",
    account: "$789 M",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Ether ETH",
    amount: "$2,500",
    date: "+235.5",
    status: "$7895.3 M",
    account: "$789 M",
  },
];

const TokensScreen = ({}: TokensScreenProps) => {
  return (
    <TokensScreenWrapper>
      <NavbarWithSearch />
      <Container>
        <TableWrapper>
          <TableSwap heads={TABLE_HEAD} rows={TABLE_ROWS} />
        </TableWrapper>
      </Container>
    </TokensScreenWrapper>
  );
};

export default TokensScreen;
