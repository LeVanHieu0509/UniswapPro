import styled from "styled-components";

export default function EmptyData({ text }: { text: string }) {
  return (
    <Wrap>
      <img src={`${process.env.basePath}/img/empty.svg`} alt="Empty" />
      <p>{text}</p>
    </Wrap>
  );
}

const Wrap = styled.div`
  text-align: center;
  padding: 40px;
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
