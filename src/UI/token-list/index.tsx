import React from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { BugAntIcon } from "@heroicons/react/24/solid";
import Icons from "components/icons";

export function TokenList() {
  const [openNav, setOpenNav] = React.useState(false);
  const tokens = [
    {
      value: 34,
      name: "GOLD COIN",
    },
    {
      value: 34,
      name: "GOLD COIN",
    },
    {
      value: 34,
      name: "GOLD COIN",
    },
    {
      value: 34,
      name: "GOLD COIN",
    },
  ];
  return (
    <Card placeholder className="mt-6 w-96">
      <CardBody placeholder>
        <Typography placeholder variant="h5" color="blue-gray" className="mb-2">
          Connect Wallet
        </Typography>

        {tokens.map((item) => (
          <div
            role="button"
            className="border-b flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <Icons icon="tick" color="black" />
            </div>
            <div>
              <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                34
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </CardBody>
      <CardFooter placeholder className="pt-0">
        <a href="#" className="inline-block">
          <Button placeholder size="sm" variant="text" className="flex items-center gap-2">
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
