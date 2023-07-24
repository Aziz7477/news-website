
import { Card, CardHeader, CardMedia, Typography, CardContent, Box, Button } from "@mui/material";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

import { useSelector } from "react-redux";
import { useEffect } from "react";

function Home() {
    const articles = useSelector((state) => state.articles);
    const categories = useSelector((state) => state.categories);

    useEffect(() => {
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        });
      }, [categories]);

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
                <h3>{categories ? categories : "Top Headlines"}</h3>
                {
                    articles && articles.length > 0
                        ?
                        articles.map((article) => {
                            return (
                                <>
                                    <Card sx={{ maxWidth: "705px", marginBottom: 5, background: "#e1fbfd", position: "relative" }} >
                                        <CardHeader
                                            title={article.author}
                                            subheader={
                                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                                                    <span>{new Date(article.published).toLocaleTimeString()}</span>
                                                    <span>{new Date(article.published).toLocaleDateString()}</span>
                                                </div>
                                            }
                                        />
                                        <TurnedInNotIcon style={{ position: "absolute", top: 10, left: 660, cursor: "pointer", fontSize: "27px" }} />
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