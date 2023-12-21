import { PlusIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";
import styled from "styled-components";

export default function EmptyComp({ onClick, loadingCreateCart }: { onClick: any; loadingCreateCart: any }) {
  return (
    <Wrap>
      <div className=" mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex flex-col justify-center py-6 items-center">
          <div className="flex justify-center items-center">
            <img
              className="w-60 h-40"
              src="https://res.cloudinary.com/daqsjyrgg/image/upload/v1690257804/jjqw2hfv0t6karxdeq1s.svg"
              alt="image empty states"
            />
          </div>
          <p className="text-gray-700 font-medium text-2xl text-center mb-3">
            Hoá đơn của bạn đang trống, vui lòng tạo mới!
          </p>
          <div className="flex flex-col justify-center">
            <button
              onClick={onClick}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loadingCreateCart ? <Spinner className="h-4 w-4" /> : <PlusIcon height={14} width={14} />}
              <span className="ml-2">Tạo mới hoá đơn</span>
            </button>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  text-align: center;
  padding-top: 16px;
  img {
    display: inline-block;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #636566;
  }
`;
