import { NavbarWithSearch } from "UI/header";
import Hero from "UI/hero";
import SearchToken from "UI/search-token";
import Setting from "UI/setting";
import { useCallback, useMemo, useState } from "react";
import { Container } from "styles";
import { Flex } from "styles/common";
import { HomeScreenWrapper } from "./styled";

type SwitchSetting = "HERO" | "SETTING" | "SEARCH-TOKEN";
interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  const [switchSetting, setSwitchSetting] = useState<{ type: SwitchSetting; data: any }>({
    type: "HERO",
    data: "",
  });
  const [transfer, setTransfer] = useState({
    FROM: "ETH",
    TO: "ETH",
  });

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
    [transfer]
  );

  return (
    <HomeScreenWrapper>
      <NavbarWithSearch />
      <Container>
        <Flex justify="center">
          <Content
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
