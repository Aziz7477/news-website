import { useDispatch, useSelector } from "react-redux";
import { InputAdornment, Input, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchBox() {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.search);
    const searchBtnClicked = useSelector((state) => state.searchBtnClicked);
    const handleSearch = (e) => {
        let value = e.target.value;
        dispatch({ type: "SET_SEARCH", payload: value });
    };
    const handleSButtonClick = (e) => {
        dispatch({ type: "SET_BTN_CLICK", payload: searchBtnClicked + 1 });
        if (searchValue.length > 1) {
            dispatch({ type: "SET_ARTICLE", payload: [] })
        }

    }
    const handleEnterKey=(e)=>{
        if(e.key === "Enter"){
            handleSButtonClick();
        }
    }


    return (
        <>
            <Input
            onKeyDown={handleEnterKey}
                onChange={handleSearch}
                placeholder="Search.."
                value={searchValue}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton  onClick={handleSButtonClick} aria-label="Search">
                            <SearchIcon style={{ fontSize: 30, color: "white" }} />
                        </IconButton>
                    </InputAdornment>
                }
                sx={{
                    backgroundColor: "#4c40a0",

                    borderRadius: "4px",
                    fontSize: "14px",
                    height: "45px",
                    padding: "12px",
                    color: "white",
                    '& input': {
                        fontSize: '17px',
                        padding: '8px',
                    },
                    '& input::placeholder': {
                        color: 'white',
                    },
                    '&:hover': {
                        backgroundColor: "#6257ab",
                    },

                }}
            />
        </>
    );
}

export default SearchBox;
