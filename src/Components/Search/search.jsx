import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css"
import useAutocomplete from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import search from "./icons8-search-50.png";

const Input = styled("input")(({ theme }) => ({
  height: 40,
  width: "700px",
  outline: "none",
  color: "#2c6487",
  backgroundColor: "white",
  border: "none",
  borderRadius: 50,
  paddingLeft: 30,
  fontSize: 18,
  [theme.breakpoints.down("md")]: {
    width: 350, 
    marginLeft: "auto",
    marginRight: "auto",
  },
  "@media (max-width: 400px)": { // Added media query for screens smaller than 400px
    width: "100%",
    fontSize: 16,
    paddingLeft: 20,
    marginTop: 8,
    marginBottom: 1,
  },
 
}));

const Listbox = styled("ul")(({ theme }) => ({
  width:"35%",
  color: "#2c6487",
  borderRadius: "0 0 10px 10px",
  marginLeft:25,
  padding: 10,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  boxShadow: "8px 8px 20px rgb(128, 128, 128)",
  overflow: "auto",
  maxHeight: 250,

  [theme.breakpoints.down("md")]: {
    width: "50%", // Width for tablets and larger screens
    marginLeft: "auto",
    marginRight: "auto",
  },
  "@media (max-width: 400px)": { // Added media query for screens smaller than 400px
    width: "60%",
    fontSize: 14,
    maxHeight: 200,
    marginLeft:10,
    
  },
  // border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#2c6487",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#f4b31a",
    color: "white",
  },
}));

function Search() {
  const [decks, setDecks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://cardsy.onrender.com/deck`);
        setDecks(response.data);
        // console.log("decks", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    searchDecks();
  }, [searchTerm]); // Trigger searchDecks() whenever searchTerm changes

  function searchDecks() {
    const filteredDecks = decks.filter((deck) =>
      deck.name.includes(searchTerm)
    );
    setSearchResults(filteredDecks);
  }

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: decks,
    getOptionLabel: (option) => option.name,
  });

  return (
    <>
    <div className="loSearch">
      
      <div>
     <div {...getRootProps()}>
     <Input
            {...getInputProps({
              onChange: (event) => setSearchTerm(event.target.value),
            })}
            placeholder="Search posts..."
          />
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <Link className="loSearchLink" to={`/deck/${option._id}`}>
                <li {...getOptionProps({ option, index })}>{option.name}</li>
              </Link>
            ))}
          </Listbox>
        ) : null}
      </div> 

      
        <img src={search} alt="#" className="searchLogo"/>
     
    </div>
    </>
  );
}

export default Search;




