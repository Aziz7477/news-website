
import { Card, CardHeader, CardMedia, Typography, CardContent, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

function Home() {
    const articles = useSelector((state) => state.articles);
    const categories = useSelector((state) => state.categories);
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
                                    <Card sx={{ maxWidth: "705px", marginBottom: 5, background: "#e1fbfd" }} >
                                        <CardHeader
                                            title={article.source.name}
                                            subheader={
                                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                                                    <span>{new Date(article.publishedAt).toLocaleTimeString()}</span>
                                                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                                </div>
                                            }
                                        />
                                        <CardContent style={{ fontWeight: "bold", fontSize: "20px" }}>
                                            <Typography variant="body3" color="text.secondary">
                                                {article.title}
                                            </Typography>

                                        </CardContent>
                                        <Box style={{ padding: "10px 20px" }}>
                                            <CardMedia

                                                component="img"
                                                height="10%"
                                                image={article.urlToImage}
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