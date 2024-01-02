import { Typography } from "@material-tailwind/react";
import SearchInputIcon from "components/icons/source/search-input";
import IconSetting from "components/table/icons/setting";
import { Flex, FlexColumn } from "styles/common";
import { ButtonToken, SearchTokenWrapper } from "./styled";
import { useContext } from "react";
import { SwapTokenContext } from "../../../Context/SwapTokenContextProvider";

interface SearchTokenProps {
  setSwitchSetting?: any;
  switchSetting?: any;
  onChange?: any;
  transfer?: any;
}

const SearchToken = ({ transfer, onChange, setSwitchSetting, switchSetting }: SearchTokenProps) => {
  const listToken = ["ETH", "DAI", "DOG", "FUN", "WETH9", "UNI", "TIME", "LOO", "OOO", "HEY"];
  const { tokenData, getPrice } = useContext(SwapTokenContext);

  console.log({ tokenData });
  return (
    <SearchTokenWrapper className="shadow-xl rounded-xl p-16 mt-24">
      <Flex justify="space-between" className="mb-16" align="center">
        <Typography variant="h6" placeholder="">
          Search
        </Typography>
        <div
          className="h-6 w-6 cursor-pointer"
          onClick={() =>
            setSwitchSetting({
              type: "HERO",
              data: "",
            })
          }
        >
          <IconSetting fill="black" />
        </div>
      </Flex>
      <FlexColumn gap={16} gapMb={16}>
        <div className="w-full flex relative">
          <input
            type="email"
            className="peer w-full  rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder="Search name and past the address..."
            value=""
          />
          <div className="absolute right-2 top-2">
            <SearchInputIcon fill="black" />
          </div>
        </div>

        <div className="relative grid gap-x-2 gap-y-3 grid-cols-4">
          {tokenData.map((item) => (
            <ButtonToken
              active={item.symbol == transfer[switchSetting.data].symbol}
              onClick={() => {
                setSwitchSetting({
                  type: "HERO",
                  data: "",
                });
                onChange(switchSetting.data, {
                  ...item,
                  tokenAddress: item,
                });
              }}
              className="cursor-pointer select-none rounded py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              {item.symbol}
            </ButtonToken>
          ))}
        </div>
      </FlexColumn>
    </SearchTokenWrapper>
  );
};

export default SearchToken;
