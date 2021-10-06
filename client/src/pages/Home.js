import React, { useEffect, useState } from "react";
import Games from "../Components/Games";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Card, CardContent } from "@mui/material";

//apollo queries (Troy)
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { ADD_USER } from "../utils/mutations";
import { LOGIN_USER } from "../utils/mutations";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Home = () => {
  // game state for api fetch
  const [games, setGames] = useState([]);

  // create a state for the user input
  const [searchInput, setSearchInput] = useState("");

  const GAME_API = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page1`;

  // when component mounts, do game api fetch
  useEffect(() => {
    fetch(GAME_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setGames(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput === "") {
      return;
    }
    const SEARCH_API = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&search=${searchInput}`;

    fetch(SEARCH_API)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main classNmae="home-app" style={{ backgroundColor: "#8e8e8e" }}>
      <form onSubmit={handleSearchSubmit}>
        <Search style={{ color: "white" }}>
          <IconButton
            size="medium"
            aria-label="search"
            color="inherit"
            role="button"
            onClick={handleSearchSubmit}
          >
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: 'wrap',
        }}
      >
        {games.length > 0 && games.map((game) => <Games game={game} />)}
      </div>
    </main>
  );
};

export default Home;
