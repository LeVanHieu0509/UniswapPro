import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { SearchInputWrapper } from "./styled";
import SearchInputIcon from "components/icons/source/search-input";

interface SearchInputProps {}

const SearchInput = ({}: SearchInputProps) => {
  const [email, setEmail] = React.useState("");
  const onChange = ({ target }) => setEmail(target.value);

  return (
    <SearchInputWrapper>
      <div className="w-72">
        <Input className="p-4" crossOrigin label="Input With Icon" icon={<SearchInputIcon />} />
      </div>
    </SearchInputWrapper>
  );
};

export default SearchInput;
