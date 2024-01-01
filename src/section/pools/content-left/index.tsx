import { ArrowDownIcon, FireIcon } from "@heroicons/react/24/solid";
import { Checkbox, Typography } from "@material-tailwind/react";
import SearchToken from "UI/search-token";
import useClickAway from "hooks/use-click-away";
import { useRef, useState } from "react";
import { Flex, FlexColumn } from "styles/common";
import { ContentLeftWrapper } from "./styled";

type SwitchSetting = "HERO" | "SETTING" | "SEARCH-TOKEN";
interface ContentLeftProps {
  onChange: any;
  transfer: any;
  setTransfer: any;
}

const ContentLeft = ({ onChange, setTransfer, transfer }: ContentLeftProps) => {
  const ref = useRef<HTMLDivElement>();
  const [switchSetting, setSwitchSetting] = useState<{ type: SwitchSetting; data: any }>(null);
  const [showFeeTeir, setShowFeeTeir] = useState(false);

  useClickAway(ref, () => {
    setSwitchSetting(null);
  });

  return (
    <ContentLeftWrapper className="border p-16 rounded-xl">
      <h4>Select Pair</h4>

      <Flex gap={16} gapMb={16} className="relative">
        <button
          onClick={() =>
            setSwitchSetting({
              type: "HERO",
              data: "FROM",
            })
          }
          className="bg-amber-500 mt-16 w-full flex items-center justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          type="button"
        >
          <FireIcon className="w-5" />
          {transfer.FROM}
          <ArrowDownIcon className="w-5" />
        </button>
        <button
          onClick={() =>
            setSwitchSetting({
              type: "HERO",
              data: "TO",
            })
          }
          className="bg-amber-500 mt-16 w-full flex items-center justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          type="button"
        >
          <FireIcon className="w-5" />
          {transfer.TO}
          <ArrowDownIcon className="w-5" />
        </button>
        {switchSetting && (
          <div className="absolute bg-white z-10 top-16" ref={ref}>
            <SearchToken
              setSwitchSetting={setSwitchSetting}
              switchSetting={switchSetting}
              onChange={onChange}
              transfer={transfer}
            />
          </div>
        )}
      </Flex>

      <FlexColumn gap={16}>
        <Flex className="border-2 w-100 rounded-xl p-8 mt-20" justify="space-between" align="center">
          <FlexColumn>
            <p className="mb-0"> Fee Teir</p>
            <p className="mb-0">the % you will earn in fee</p>
          </FlexColumn>

          <button
            onClick={() => setShowFeeTeir(!showFeeTeir)}
            className="bg-amber-500  font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            {showFeeTeir ? "Hide" : "Show"}
          </button>
        </Flex>
        {showFeeTeir && (
          <Flex gap={16}>
            {["0.05", "0.3", "1"].map((item) => (
              <FlexColumn gap={16} className="border-2 rounded-xl p-8 mt-20" justify="space-between" align="center">
                <Flex className="w-full" align="center" justify="space-between">
                  <h4 className="bold">{item}%</h4>
                  <Checkbox crossOrigin defaultChecked className="w-6" />
                </Flex>
                <p className="mb-0">the % you will earn in fee</p>

                <button
                  onClick={() => {}}
                  className=" w-100 bg-amber-500  font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                >
                  Select
                </button>
              </FlexColumn>
            ))}
          </Flex>
        )}

        <FlexColumn gap={16} className="w-100">
          <Typography variant="h6" placeholder="">
            Deposit Amount
          </Typography>

          <FlexColumn>
            <div className="relative flex w-full justify-between gap-4">
              <input
                type="email"
                className="peer  w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                value="0"
              />
              <button
                className="cursor-pointer  select-none rounded bg-amber-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Uniswap
                <p className="mb-0">Bal: 0</p>
              </button>
            </div>
          </FlexColumn>
          <FlexColumn>
            <div className="relative flex w-full justify-between gap-4">
              <input
                type="email"
                className="peer  w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                value="0"
              />
              <button
                className="cursor-pointer  select-none rounded bg-amber-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Ether
                <p className="mb-0">Bal: 0</p>
              </button>
            </div>
          </FlexColumn>
        </FlexColumn>
      </FlexColumn>
    </ContentLeftWrapper>
  );
};

export default ContentLeft;
