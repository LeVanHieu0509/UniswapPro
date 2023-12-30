import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useMemo } from "react";

export function TokenList({ data }: any) {
  const formatData = useMemo(
    () =>
      data?.map((item) => ({
        value: item.tokenBalance,
        name: item.name,
        symbol: item.symbol,
      })),
    [data]
  );

  return (
    <Card placeholder className="mt-6 w-96">
      <CardBody placeholder>
        <Typography placeholder variant="h5" color="blue-gray" className="mb-2">
          Your token list
        </Typography>

        {formatData?.map((item) => (
          <div
            role="button"
            className="border-b flex flex-row align-center  items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div className="mb-0 mr-4  rounded bg-amber-500 p-2 ">
              <p>{item.name}</p>
            </div>

            <div className="flex flex-row items-center">
              <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                {item.value}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal text-gray-700 mb-0 ml-16">{item.symbol}</p>
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
