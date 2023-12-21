import React from "react";
import { HeroWrapper } from "./styled";
import { Flex, FlexColumn } from "styles/common";
import { Button, Switch, Typography } from "@material-tailwind/react";
import IconSetting from "components/table/icons/setting";
import { PowerIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";

interface HeroProps {
  setSwitchSetting: any;
  switchSetting: any;
  transfer?: any;
}

const Setting = ({ setSwitchSetting }: HeroProps) => {
  return (
    <HeroWrapper className="shadow-xl rounded-xl p-16 mt-24">
      <Flex justify="space-between" className="mb-16" align="center">
        <Typography variant="h6" placeholder="">
          Setting
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

      <FlexColumn gap={16}>
        <FlexColumn>
          <Flex className="mb-16" align="center">
            <Typography variant="h6" placeholder="">
              Slippage tolerance
            </Typography>
            <div className="h-4 w-4 cursor-pointer ml-2">
              <LockClosedIcon />
            </div>
          </Flex>
          <div className="relative flex w-full justify-between gap-4">
            <button
              className="cursor-pointer  select-none rounded bg-amber-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Auto
            </button>

            <input
              type="email"
              className="peer  w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value="0"
            />
          </div>
        </FlexColumn>
        <FlexColumn>
          <Flex className="mb-16" align="center">
            <Typography variant="h6" placeholder="">
              Slippage tolerance
            </Typography>
            <div className="h-4 w-4 cursor-pointer ml-2">
              <LockClosedIcon />
            </div>
          </Flex>
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
              Minutes
            </button>
          </div>
        </FlexColumn>
      </FlexColumn>

      <div className="mt-24">
        <Typography variant="h6" placeholder="">
          Interface Setting
        </Typography>

        <div className="mb-16 flex justify-between items-center">
          <Typography variant="small" placeholder="">
            Transaction Deadline
          </Typography>
          <div>
            <Switch crossOrigin color="amber" defaultChecked />
          </div>
        </div>
      </div>
    </HeroWrapper>
  );
};

export default Setting;
