import LoadingSection from "components/loading";
import dynamic from "next/dynamic";
import { Flex } from "styles/common";
import { LoadingPageWrapper } from "./styled";

interface LoadingFixedProps {
  loading?: boolean;
}
const Portal = dynamic(() => import("components/portal"), { ssr: false });

const LoadingPage = ({ loading }: LoadingFixedProps) => {
  return loading ? (
    <Portal>
      <LoadingPageWrapper>
        <Flex justify="center" align="center" className="" style={{ margin: "auto 0", height: "100vh" }}>
          <LoadingSection loading={loading} />
        </Flex>
      </LoadingPageWrapper>
    </Portal>
  ) : null;
};

export default LoadingPage;
