import { FC } from "react";
import style from "./style.module.scss";

const SearchInput: FC<{ onSearch: React.Dispatch<React.SetStateAction<string>> }> = ({ onSearch }) => {
  return (
    <div className={style.search_wrapper}>
      <input
        type="text"
        className={style.instant_search}
        placeholder="Search your trip"
        onInput={(e) => onSearch((e.target as HTMLInputElement).value)}
      />
    </div>
  );
};

export default SearchInput;
