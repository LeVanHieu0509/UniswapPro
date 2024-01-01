import { ArrowLeftCircleIcon, CreditCardIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import { NavbarWithSearch } from "UI/header";
import IconSetting from "components/table/icons/setting";
import { Container } from "styles";
import { Flex, FlexColumn } from "styles/common";
import { HeaderWrapper, LiquidityWrapper, PoolsScreenWrapper } from "./styled";
import ContentLeft from "section/pools/content-left";
import ContentRight from "section/pools/content-right";
import { useCallback, useState } from "react";

interface PoolsScreenProps {}

const PoolsScreen = ({}: PoolsScreenProps) => {
  const [showAddLiquidity, setShowAddLiquidity] = useState(false);
  const [transfer, setTransfer] = useState({
    FROM: "ETH",
    TO: "ETH",
  });

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
    <PoolsScreenWrapper>
      <NavbarWithSearch />
      <Container>
        <LiquidityWrapper className="shadow-xl rounded-xl">
          {showAddLiquidity ? (
            <>
              <HeaderWrapper>
                <ArrowLeftCircleIcon onClick={() => setShowAddLiquidity(false)} className="h-10 w-10" />
                <h5>Add Liquidity</h5>

                <Flex gap={16} gapMb={16}>
                  <h6>Clear ALL</h6>
                  <IconSetting fill="black" />
                </Flex>
              </HeaderWrapper>
              <Flex gap={16}>
                <ContentLeft transfer={transfer} setTransfer={setTransfer} onChange={handleChange} />
                <ContentRight />
              </Flex>
            </>
          ) : (
            <>
              {" "}
              <FlexColumn align="center" justify="center">
                <Flex className="w-100" align="center" justify="space-between">
                  <h1>Pool</h1>
                  <button
                    onClick={() => setShowAddLiquidity(true)}
                    className="bg-amber-500 mt-16 flex items-center justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                    type="button"
                  >
                    <PlusSmallIcon className="w-5" />
                    New position
                  </button>
                </Flex>

                <FlexColumn align="center">
                  <h4>Your active v3 liquidity positions will appear hear</h4>
                  <CreditCardIcon width={100} />

                  <button
                    onClick={() => {}}
                    className="bg-amber-500 mt-16 flex items-center justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                    type="button"
                  >
                    Connect Wallet
                  </button>
                </FlexColumn>
              </FlexColumn>
              <FlexColumn>
                <h4 className="mb-16">Your Position</h4>

                <FlexColumn gap={16} className="w-100 rounded-xl border p-16">
                  {[0, 1].map(() => (
                    <Flex justify="space-between" align="center" className="w-full">
                      <FlexColumn>
                        <h4>Shoab/Ryyan3000</h4>
                        <p>Min: 0.999 --- Max: 1.000</p>
                      </FlexColumn>
                      <button
                        onClick={() => {}}
                        className="bg-amber-500 mt-16 flex items-center justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                        type="button"
                      >
                        In range
                      </button>
                    </Flex>
                  ))}
                </FlexColumn>
              </FlexColumn>
            </>
          )}
        </LiquidityWrapper>
      </Container>
    </PoolsScreenWrapper>
  );
};

export default PoolsScreen;
