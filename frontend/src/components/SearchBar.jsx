import { useState } from "react";
import { useDispatch } from "react-redux";
import { getReviews, findMatchingReviews } from "../features/reviews/reviewSlice";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";

function SearchBar() {
  const dispatch = useDispatch();

  const [searchBar, setSearchBar] = useState("");

  const handleChangeSearchBar = (e) => {
    const { value } = e.target;
    setSearchBar(value);
  };

  const handlePress = (e) => {
    const { key } = e;
    if (key === "Enter"){
      submitSearch();
    }
  };

  const submitSearch = () => {
    dispatch(findMatchingReviews(searchBar))
  };

  const resetSearch = () => {
    dispatch(getReviews());
    setSearchBar("");
  };

  return (
    <div id="search-bar">
    <IconButton onClick={submitSearch} sx={{ mb: 0.4 }}>
      <SearchIcon />
    </IconButton>
    <InputBase
      placeholder="Search ChewReviews..."
      value={searchBar}
      onChange={handleChangeSearchBar}
      onKeyDown={handlePress}
    />
    <IconButton onClick={resetSearch} sx={{ mb: 0.5, ml: 9 }}>
      <CloseIcon />
    </IconButton>
  </div>
  );
}

export default SearchBar;