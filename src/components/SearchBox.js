import { useDispatch, useSelector } from "react-redux";
import { InputAdornment, Input, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchBox() {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.search);
    const handleSearch = (e) => {
        let value = e.target.value;
        dispatch({ type: "SET_SEARCH", payload: value });
    };
    const handleSButtonClick = () => {
        dispatch({ type: "SET_BTN_CLICK", payload:true})
        
    }


    return (
        <div className="search">
            <Input
                onChange={handleSearch}
                placeholder="Search.."
                value={searchValue}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton value={false} onClick={handleSButtonClick} aria-label="Search">
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
        </div>
    );
}

export default SearchBox;
