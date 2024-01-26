
import { Card, CardHeader, CardMedia, Typography, CardContent, Box, Button } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ cat }) {
    const articles = useSelector((state) => state.articles);
    const categories = useSelector((state) => state.categories);
    const searchValue = useSelector((state) => state.search);
    const prevSearch = useSelector((state) => state.prevSearch);
    const saveNews = useSelector((state) => state.saveNews);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    dispatch({ type: "SET_CATEGORY", payload: cat })

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [categories, searchValue.length > 0]);
    const HandleClicked = () => {
        navigate("/save-news")
    }
    const handleSaveNews = (article) => {
        const savedArticles = JSON.parse(localStorage.getItem("saveNews")) || [];
        console.log(savedArticles);
        const alreadySavedArticles = savedArticles.some((sArticle) => sArticle.id === article.id)
        if (!alreadySavedArticles) {
            savedArticles.push(article);
            dispatch({ type: "SET_SAVENEWS", payload: savedArticles })
            localStorage.setItem("saveNews", JSON.stringify(savedArticles));

        }
        else if (alreadySavedArticles) {
            const updateArticles = savedArticles.filter((sArticle) => sArticle.id !== article.id);
            dispatch({ type: "SET_SAVENEWS", payload: savedArticles })
            localStorage.setItem("saveNews", JSON.stringify(updateArticles));

        }


    }
    useEffect(() => {


    }, [saveNews]);

    return (
        <>
            <Typography sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "5px",
                paddingTop: "70px",
                '@media (max-width: 900px)': {
                    paddingTop: "50px",
                }
            }}>
                <Card sx={{
                    maxWidth: "705px",
                    minWidth: "800px",
                    position: "relative",
                    borderRadius: 0,
                    boxShadow: 'none',
                    '@media (max-width: 900px)': {
                        minWidth: "40px",
                        width: "100%",

                    }
                }} >
                    <CardContent sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        border: 0,

                    }}>
                        <h3 className="h3">{prevSearch ? prevSearch.toUpperCase() : categories ? categories : "Top Headlines"}</h3>
                        <div onClick={HandleClicked} style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", cursor: "pointer", color: "#7126ff" }}>
                            <BookmarksIcon style={{ fontSize: "35px" }} ></BookmarksIcon>
                            SAVED NEWS
                        </div>
                    </CardContent>


                </Card>

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
            </Typography>
        </>

    )
}

export default Home;