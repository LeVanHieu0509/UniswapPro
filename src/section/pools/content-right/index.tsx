import { CreditCardIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { Flex, FlexColumn } from "styles/common";
import { ContentRightWrapper } from "./styled";

interface ContentRightProps {}

const ContentRight = ({}: ContentRightProps) => {
  return (
    <ContentRightWrapper className="border p-16 rounded-xl">
      <h4>Set Price Range</h4>

      <FlexColumn align="center">
        <p>Current Price: 41.1494 Testv4 per WETH</p>
        <CreditCardIcon width={100} />
        <h4>Your position will appear here</h4>
      </FlexColumn>
      <FlexColumn>
        <Flex gap={16} className="w-100" justify="space-between">
          <FlexColumn gap={16} className=" border-2 rounded-xl p-8 mt-20" justify="space-between" align="center">
            <Flex className="" align="center" justify="space-between">
              <h4 className="bold">Min Price</h4>
            </Flex>

            <Flex gap={16} className="">
              <button
                onClick={() => {}}
                className=" bg-amber-500  font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-2 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                <MinusCircleIcon className="w-6" />
              </button>
              <input
                className=" w-20 peer bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                placeholder=" "
              />
              <button
                onClick={() => {}}
                className=" bg-amber-500  font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-2 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                <PlusCircleIcon className="w-6" />
              </button>
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16} className="border-2 rounded-xl p-8 mt-20" justify="space-between" align="center">
            <Flex className="" align="center" justify="space-between">
              <h4 className="bold">Max Price</h4>
            </Flex>

            <Flex gap={16} className=" w-100">
              <button
                onClick={() => {}}
                className=" bg-amber-500  font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-2 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                <MinusCircleIcon className="w-6" />
              </button>
              <input
                className="w-20 peer bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                placeholder=" "
              />
              <button
                onClick={() => {}}
                className=" bg-amber-500  font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-2 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                <PlusCircleIcon className="w-6" />
              </button>
            </Flex>
          </FlexColumn>
        </Flex>

        <Flex gap={16} className="w-100">
          <button
            onClick={() => {}}
            className="w-100 bg-amber-500 mt-16 w-full flex items-center justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
            type="button"
          >
            Full Range
          </button>

          <button
            onClick={() => {}}
            className="w-full bg-amber-500 mt-16 w-full flex items-center justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg  text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
            type="button"
          >
            Enter a amount
          </button>
        </Flex>
      </FlexColumn>
    </ContentRightWrapper>
  );
};

export default ContentRight;
