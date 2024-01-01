import React from "react";
import { TableSwapWrapper } from "./styled";
import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";

interface TableSwapProps {
  heads: any;
  rows: any;
}

const TableSwap = ({ heads, rows }: TableSwapProps) => {
  return (
    <TableSwapWrapper className="shadow-xl rounded-xl">
      <Card placeholder className="h-full w-full">
        <CardHeader placeholder floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography placeholder variant="h5" color="blue-gray">
                Recent Transactions
              </Typography>
              <Typography placeholder color="gray" className="mt-1 font-normal">
                These are details about the last transactions
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input crossOrigin label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
              </div>
              <Button placeholder className="flex items-center gap-3" size="sm">
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody placeholder className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {heads.map((head) => (
                  <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      placeholder
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ img, name, amount, date, status, account, accountNumber, expiry }, index) => {
                const isLast = index === rows.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          placeholder
                          src={img}
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography placeholder variant="small" color="blue-gray" className="font-bold">
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography placeholder variant="small" color="blue-gray" className="font-normal">
                        {amount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography placeholder variant="small" color="blue-gray" className="font-normal">
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          color={status === "paid" ? "green" : status === "pending" ? "amber" : "red"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography placeholder variant="small" color="blue-gray" className="font-normal capitalize">
                        {account.split("-").join(" ")} {accountNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton placeholder variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter placeholder className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button placeholder variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton placeholder variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton placeholder variant="text" size="sm">
              2
            </IconButton>
            <IconButton placeholder variant="text" size="sm">
              3
            </IconButton>
            <IconButton placeholder variant="text" size="sm">
              ...
            </IconButton>
            <IconButton placeholder variant="text" size="sm">
              8
            </IconButton>
            <IconButton placeholder variant="text" size="sm">
              9
            </IconButton>
            <IconButton placeholder variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button placeholder variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
    </TableSwapWrapper>
  );
};

export default TableSwap;
