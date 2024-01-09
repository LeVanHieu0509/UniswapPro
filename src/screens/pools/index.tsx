import { ArrowLeftCircleIcon, CreditCardIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import { NavbarWithSearch } from "UI/header";
import IconSetting from "components/table/icons/setting";
import { useCallback, useContext, useState } from "react";
import ContentLeft from "section/pools/content-left";
import ContentRight from "section/pools/content-right";
import { Container } from "styles";
import { Flex, FlexColumn } from "styles/common";
import { SwapTokenContext } from "../../../Context/SwapTokenContextProvider";
import { HeaderWrapper, LiquidityWrapper, PoolsScreenWrapper } from "./styled";

interface PoolsScreenProps {}

const PoolsScreen = ({}: PoolsScreenProps) => {
  const { account, createLiquidityAndPool, tokenData, getAllLiquidity } = useContext(SwapTokenContext);
  const [modifiedData, setModifiedData] = useState({
    fee: 0,
    minPrice: 0,
    maxPrice: 0,
    slippage: 25,
    deadline: 10,
    tokenAmountOne: 0,
    tokenAmountTwo: 0,
  });

  const [showAddLiquidity, setShowAddLiquidity] = useState(false);
  const [transfer, setTransfer] = useState({
    FROM: {
      symbol: "WETH",
      tokenAddress: null,
    },
    TO: {
      symbol: "DAI",
      tokenAddress: null,
    },
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

  const handleChangeCreatePool = useCallback(
    (key: string, value: string) => {
      setModifiedData((pre) => ({
        ...pre,
        [key]: value,
      }));
    },
    [transfer]
  );
  console.log({ tokenData, transfer });

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
                <ContentLeft
                  modifiedData={modifiedData}
                  onChangeCreatePool={handleChangeCreatePool}
                  transfer={transfer}
                  setTransfer={setTransfer}
                  onChange={handleChange}
                />
                <ContentRight transfer={transfer} onChangeCreatePool={handleChangeCreatePool} />
              </Flex>
              <Flex gap={16} justify="center" className="w-full ">
                <button
                  onClick={() =>
                    createLiquidityAndPool({
                      tokenAddress0: transfer["FROM"].tokenAddress.tokenAddress,
                      tokenAddress1: transfer["TO"].tokenAddress.tokenAddress,
                      fee: modifiedData.fee,
                      tokenPrice1: modifiedData.minPrice,
                      tokenPrice2: modifiedData.maxPrice,
                      slippage: modifiedData.slippage,
                      deadline: modifiedData.deadline,
                      tokenAmountOne: modifiedData.tokenAmountOne,
                      tokenAmountTwo: modifiedData.tokenAmountTwo,
                    })
                  }
                  className=" bg-amber-500 mt-16  align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                  type="button"
                >
                  Add Liquidity
                </button>
              </Flex>
            </>
          ) : (
            <>
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
              </FlexColumn>
              {account ? (
                <FlexColumn>
                  <h4 className="mb-16">Your Position</h4>

                  <FlexColumn gap={16} className="w-100 rounded-xl border p-16">
                    {[0, 1].map((_, key) => (
                      <Flex key={key} justify="space-between" align="center" className="w-full">
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
              ) : (
                <FlexColumn align="center" justify="center">
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
              )}
            </>
          )}
        </LiquidityWrapper>
      </Container>
    </PoolsScreenWrapper>
  );
};

export default PoolsScreen;
