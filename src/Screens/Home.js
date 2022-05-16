import React, { Fragment, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import SearchAppBar from "../Components/NavBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SkeletonCom from "../Components/Skeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

const api = createApi({
  accessKey: "nwjXJuP6AI73YO0Ccqb5OByKvv4PaThWoXmCft_sltw",
});
const Home = () => {
  const [data, setPhotosResponse] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    api.search
      .getPhotos({
        query: searchValue || "laptop",
        page: pageNumber,
        per_page: "20",
      })
      .then((result) => {
        setPhotosResponse(result);
        setLoading(false);
      });
  }, [searchValue, pageNumber]);
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setPageNumber(1);
  };
  const handlePagesNumber = (e) => {
    setPageNumber(e.target.textContent);
  };
  return (
    <Fragment>
      <SearchAppBar handleChange={handleChange} />
      <Container
        sx={{
          minHeight: "100vh",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
        }}
      >
        {loading ? (
          <SkeletonCom />
        ) : (
          <Box
            sx={{
              width: "100%",
              flexWrap: "wrap",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {data.response.results.map((item) => {
              console.log(item);
              return (
                <Card
                  key={item.id}
                  sx={{
                    // maxWidth: 345,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "20px 10px",
                    width: 268,
                    borderRadius: "20px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.urls.small}
                    alt=""
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.alt_description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.tags[0]?.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <Link
                        style={{
                          textTransform: "none",
                          textDecoration: "none",
                        }}
                        href={item.urls.full}
                      >
                        High Resolution
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        )}
        <Stack spacing={2}>
          {loading ? (
            ""
          ) : data.response.total_pages > 1 ? (
            <Pagination
              onClick={handlePagesNumber}
              count={data.response.total_pages}
              color="secondary"
            />
          ) : (
            ""
          )}
        </Stack>
      </Container>
    </Fragment>
  );
};
export default Home;
