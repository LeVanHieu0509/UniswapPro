import { NavbarWithSearch } from "UI/header";
import Hero from "UI/hero";
import SearchToken from "UI/search-token";
import Setting from "UI/setting";
import { useCallback, useMemo, useState } from "react";
import { Container } from "styles";
import { Flex } from "styles/common";
import { HomeScreenWrapper } from "./styled";
import { swapUpdatePrice } from "contracts/swapUpdatePrice";
import { getPrice } from "contracts/fetchingPrice";

type SwitchSetting = "HERO" | "SETTING" | "SEARCH-TOKEN";
interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  const [switchSetting, setSwitchSetting] = useState<{ type: SwitchSetting; data: any }>({
    type: "HERO",
    data: "",
  });
  const [transfer, setTransfer] = useState({
    FROM: {
      symbol: "WETH",
    },
    TO: {
      symbol: "DAI",
    },
  });
  const [tokenSwapOutput, setTokenSwapOutput] = useState(0);
  const [poolMessage, setPoolMessage] = useState();
  const [search, setSearch] = useState(false);
  const [swapAmount, setSwapAmount] = useState();

  console.log("transfer", transfer);

  const Content = useMemo(() => {
    switch (switchSetting.type) {
      case "SETTING":
        return Setting;
      case "HERO":
        return Hero;
      case "SEARCH-TOKEN":
        return SearchToken;
    }
  }, [switchSetting]);

  const handleChange = useCallback(
    (key: string, value: string) => {
      setTransfer((pre) => ({
        ...pre,
        [key]: value,
      }));
    },
    [switchSetting]
  );

  const callOutPut = useCallback(async (value) => {
    if (value) {
      const yourAccount = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
      const deadline = 10,
        slippageAmount = 25;

      const data = await swapUpdatePrice({
        inputAmount: value,
        slippageAmount,
        deadline,
        walletAddress: yourAccount,
      });

      setTokenSwapOutput(data[1]);

      const poolAddress = "0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8";
      const poolData = await getPrice(value, poolAddress);
      console.log({ poolData });
      const message: any = `${value} ${poolData[2]} = ${poolData[0]} ${poolData[1]}`;
      setPoolMessage(message);
      setSearch(false);
    }
  }, []);

  return (
    <HomeScreenWrapper>
      <NavbarWithSearch />
      <Container>
        <Flex justify="center">
          <Content
            search={search}
            setSearch={setSearch}
            swapAmount={swapAmount}
            poolMessage={poolMessage}
            tokenSwapOutput={tokenSwapOutput}
            setSwapAmount={setSwapAmount}
            callOutPut={callOutPut}
            transfer={transfer}
            switchSetting={switchSetting}
            onChange={handleChange}
            setSwitchSetting={setSwitchSetting}
          />

          <div style={{ height: 500 }}></div>
        </Flex>
      </Container>
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
