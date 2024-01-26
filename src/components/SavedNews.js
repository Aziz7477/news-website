
import { Card, CardHeader, CardMedia, Typography, CardContent, Box, Button } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const SavedNews = () => {
  const dispatch = useDispatch();
  const saveNewsR = useSelector((state) => state.saveNews);
  const saveNews = JSON.parse(localStorage.getItem("saveNews")).reverse() || [];

  useEffect(() => {

  }, [saveNewsR])
  const handleSaveNews = (article) => {
    const savedArticles = JSON.parse(localStorage.getItem("saveNews")) || [];
    const updateArticles = savedArticles.filter((sArticle) => sArticle.id !== article.id);
    dispatch({ type: "SET_SAVENEWS", payload: updateArticles })
    localStorage.setItem("saveNews", JSON.stringify(updateArticles));

  }


  return (
    <>
      <Typography style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "80px",
        fontWeight: "bold",
        fontSize: "30px",
      }}>History</Typography>
      <Typography sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        paddingTop: "15px",

      }}>

        {
          saveNews && saveNews.length > 0
            ?
            saveNews.map((article) => {
              return (
                <>
                  <Card sx={{ maxWidth: "705px", marginBottom: 5, background: "#e1fbfd", margin: "15px" }} >
                    <Typography style={{ display: "flex", justifyContent: "space-between" }}>
                      <CardHeader style={{ paddingBottom: 5 }} title={<Typography sx={{ fontWeight: "bold", fontSize: 25 }}>{article.author}</Typography>} />
                      <div onClick={() => handleSaveNews(article)}>
                        <BookmarkIcon style={{ marginTop: 10, marginRight: 10, cursor: "pointer", fontSize: "33px" }} />
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
                    <Box style={{ padding: "10px 20px", width: "100%" }}>
                      <CardMedia

                        component="img"
                        height="100%"
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
            <div style={{
              paddingTop: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold", 
            }} >No Save Image Found!</div>
        }
      </Typography>
    </>
  )
}
export default SavedNews;
