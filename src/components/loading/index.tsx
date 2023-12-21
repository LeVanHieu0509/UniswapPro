import { Spinner } from "@material-tailwind/react";
import { LoadingWrapper } from "./styled";

interface LoadingFixedProps {
  loading?: boolean;
  color?: string;
  isFullContent?: boolean;
}

const LoadingSection = ({ loading = true, color, isFullContent = false }: LoadingFixedProps) => {
  return loading ? (
    <LoadingWrapper isFullContent={isFullContent}>{loading && <Spinner className="h-4 w-4" />}</LoadingWrapper>
  ) : null;
};

export default LoadingSection;
