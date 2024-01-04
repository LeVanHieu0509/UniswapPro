import { Typography } from "@material-tailwind/react";
import IconSetting from "components/table/icons/setting";
import { Flex, FlexColumn } from "styles/common";
import { HeroWrapper } from "./styled";
import { useContext } from "react";
import { SwapTokenContext } from "../../../Context/SwapTokenContextProvider";
import LoadingSection from "components/loading";

interface HeroProps {
  setSwitchSetting: any;
  switchSetting: any;
  transfer?: any;
  callOutPut?: any;
  setSwapAmount?: any;
  tokenSwapOutput?: any;
  swapAmount?: any;
  poolMessage?: any;
  setSearch?: any;
  search?: any;
}

const Hero = ({
  swapAmount,
  poolMessage,
  tokenSwapOutput,
  setSwapAmount,
  callOutPut,
  transfer,
  setSwitchSetting,
  switchSetting,
  setSearch,
  search,
}: HeroProps) => {
  const { singleSwapToken, account, connectWallet } = useContext(SwapTokenContext);

  console.log(swapAmount);
  return (
    <HeroWrapper className="shadow-xl rounded-xl p-16 mt-24">
      <Flex justify="space-between" className="mb-16" align="center">
        <Typography variant="h6" placeholder="">
          Swap
        </Typography>
        <div
          className="h-6 w-6 cursor-pointer"
          onClick={() =>
            setSwitchSetting({
              type: "SETTING",
              data: "",
            })
          }
        >
          <IconSetting fill="black" />
        </div>
      </Flex>
      <FlexColumn gap={16}>
        <div className="relative flex w-full max-w-[24rem]">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              onChange={(e) => (callOutPut(e.target.value), setSwapAmount(e.target.value), setSearch(true))}
              type="email"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={swapAmount}
              defaultValue={0}
            />
          </div>
          <button
            onClick={() =>
              setSwitchSetting({
                type: "SEARCH-TOKEN",
                data: "FROM",
              })
            }
            className="cursor-pointer !absolute right-1 top-1 select-none rounded bg-amber-500 py-1 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <div className="flex items-center gap-2 ">
              <h6 className="bold"> {transfer["FROM"].symbol}</h6>
              <h6>{transfer["FROM"]?.tokenBalance?.slice(0, 9)}</h6>
            </div>
          </button>
        </div>

        <div className="relative flex w-full max-w-[24rem]">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              type="email"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={search ? "0" : tokenSwapOutput}
            />
          </div>
          <button
            onClick={() =>
              setSwitchSetting({
                type: "SEARCH-TOKEN",
                data: "TO",
              })
            }
            className="cursor-pointer !absolute right-1 top-1 select-none rounded bg-amber-500 py-1 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <div className="flex items-center gap-2 ">
              <h6 className="bold"> {transfer["TO"].symbol}</h6>
              <h6>{transfer["TO"]?.tokenBalance?.slice(0, 9)}</h6>
            </div>
          </button>
        </div>
      </FlexColumn>

      <div className="mt-16"> {search ? <LoadingSection loading={true} /> : poolMessage}</div>
      {account ? (
        <button
          onClick={() =>
            singleSwapToken({
              token1: transfer["FROM"],
              token2: transfer["TO"],
              swapAmount,
            })
          }
          className="mt-16 w-full flex items-center justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          type="button"
        >
          <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="metamask" className="w-6 h-6" />
          Swap
        </button>
      ) : (
        <button
          onClick={() => connectWallet()}
          className=" flex items-center justify-center  mt-16 w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          type="button"
        >
          <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="metamask" className="w-6 h-6" />
          Connect Wallet
        </button>
      )}
    </HeroWrapper>
  );
};

export default Hero;
