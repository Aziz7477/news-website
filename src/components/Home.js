
import { Card, CardHeader, CardMedia, Typography, CardContent, Box, Button } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Home({ cat }) {
    const articles = useSelector((state) => state.articles);
    const categories = useSelector((state) => state.categories);
    const searchValue = useSelector((state) => state.search);
    const prevSearch = useSelector((state) => state.prevSearch);
    const saveNews = useSelector((state) => state.saveNews);
    const dispatch = useDispatch();
    dispatch({ type: "SET_CATEGORY", payload: cat })

    const [isClicked,SetIsClicked] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [categories, searchValue.length > 0]);
    const HandleClicked=()=>{
        SetIsClicked(true)
        dispatch({type:"SET_ARTICLE",payload:saveNews})
    }

    const handleSaveNews = (article) => {
        dispatch({ type: "SET_SAVENEWS", payload: article });
    }
    console.log(saveNews);
    console.log(isClicked);
    console.log(articles); 
    return (
        <>
            <div style={{

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "5px",
                paddingTop: "70px"
            }}>
                <div className="heading" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width:"70vh"

                }}>
                    <div>bgfbgfbfgbHi</div>
                    <h3 style={{}}>{prevSearch ? prevSearch.toUpperCase() : categories ? categories : "Top Headlines"}</h3>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center", fontWeight:"bold",cursor:"pointer",color:"#7126ff"}}>
                        <BookmarksIcon style={{fontSize:"35px"}} onClick={HandleClicked}></BookmarksIcon>
                        SAVE NEWS
                    </div>
                    
                </div>

                {
                    articles && articles.length > 0
                        ?
                        articles.map((article) => {
                            return (
                                <>
                                    <Card sx={{ maxWidth: "705px", marginBottom: 5, background: "#e1fbfd", position: "relative" }} >
                                        <Typography style={{ display: "flex", justifyContent: "space-between" }}>
                                            <CardHeader style={{ paddingBottom: 5 }} title={<Typography sx={{ fontWeight: "bold", fontSize: 25 }}>{article.author}</Typography>} />
                                            <div onClick={() => handleSaveNews(article)}>
                                                <BookmarkBorderIcon style={{ marginTop: 10, marginRight: 10, cursor: "pointer", fontSize: "33px" }} />
                                            </div>
                                        </Typography>

                                        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "500" }}>
                                                <span>{new Date(article.published).toLocaleTimeString()}</span>
                                                <span>{new Date(article.published).toLocaleDateString()}</span>
                                            </div>
                                        </CardContent>

                                        <CardContent style={{ fontWeight: "bold", fontSize: "20px" }}>
                                            <Typography variant="body3" color="text.secondary">
                                                {article.title}
                                            </Typography>

                                        </CardContent>
                                        <Box style={{ padding: "10px 20px" }}>
                                            <CardMedia

                                                component="img"
                                                height="10%"
                                                image={article.image}
                                                alt="Failed to load"
                                            />
                                        </Box>

                                        <CardContent>
                                            <Typography>
                                                {article.description}
                                            </Typography>
                                        </CardContent>
                                        <Button
                                            style={{ marginLeft: "10px", marginBottom: "15px" }}
                                            href={article.url}
                                            target="_blank"
                                        >
                                            read more
                                        </Button>
                                    </Card>
                                </>
                            )
                        })
                        :
                        <img style={{ width: 50, paddingTop: 300 }} src="https://i.stack.imgur.com/kOnzy.gif" alt="" />
                }
            </div>
        </>

    )
}

export default Home;