import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchResultList from "./PostSearchResultList";
import SearchHistoryList from "./SearchHistoryList";
import AlbumSearchResultList from './AlbumSearchResultList'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useContext } from 'react'
import { RootCompContext } from "@/pages/_app";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid(props) {
  console.log("BasicGrid props", props);
  const {
    filteredPostsData, 
    setFilteredPostsData,
    filteredAlbumsData, 
    setFilteredAlbumsData,
    filteredResultsCategories
    } = useContext(RootCompContext);

  const [searchTerm, setSearchTerm] = React.useState(null);
  console.log("BasicGrid props.searchTerm", props.searchTerm);
  console.log("BasicGrid filteredPostsData", filteredPostsData);
  console.log("BasicGrid filteredAlbumsData", filteredAlbumsData);
  console.log("BasicGrid filteredResultsCategories", filteredResultsCategories);
  
  React.useEffect(() => {
    setFilteredPostsData(props.filteredPostsData);
    setFilteredAlbumsData(props.filteredAlbumsData);
  }, [props.data]);

  React.useEffect(() => {
    setSearchTerm(props.searchTerm);
  }, [props.searchTerm]);

  return (
    <>
     {props.showResults && 
      <>
        <Box
          sx={{
            width: "96%",
            marginLeft: "23px",
            height: "60vh",
            position: "relative",
            zIndex: 99,
            display: "block",
            // opacity: [0.9, 0.8, 9.5],
            opacity: 1.0,
            backgroundColor: "#FAFAFA",
            "&:hover": {
              backgroundColor: "#FAFAFA",
              opacity: 1.0,
              // opacity: [0.9, 0.8, 1.0],
            },
          }}
        >
        <Grid container spacing={1} columns={16}>
          <Grid item xs={16}>
            {(!Boolean(filteredPostsData) && !Boolean(filteredAlbumsData)) &&
              <Box sx={{ '& > :not(style)': { m: 0.5 } }}>
                {staticCategories.map((elem, index) => (
                  <Chip label={elem} key={index} variant="outlined" color="primary"/>  
                ))}
              </Box>
            }
            {(Boolean(filteredPostsData) || Boolean(filteredAlbumsData)) &&
              <Box sx={{ '& > :not(style)': { m: 0.5 } }}>
                {filteredResultsCategories.map((elem, index) => (
                  <Chip label={elem} key={index} variant="outlined" color="primary"/>  
                ))}
              </Box>
            }
          </Grid>

          <Grid item xs={8}>
            {Boolean(filteredPostsData) &&
              <Box style={{margin: 1, maxHeight: '47vh', overflow: 'auto'}}>
                {(filteredPostsData.length > 0) && (
                  <>    
                    <SearchResultList
                      key={1}
                      data={filteredPostsData}
                      
                      handleSelectedProduct={props.handleSelectedProduct}
                      searchTerm={props.searchTerm}
                    />
                  </>
                )}
              </Box>
            }
          </Grid>
          
          <Grid item xs={8}>
            {Boolean(filteredAlbumsData) &&
              <Box style={{margin: 1, maxHeight: '47vh', overflow: 'auto'}}>
              {(filteredAlbumsData.length > 0) && (
                <>    
                  <AlbumSearchResultList
                    key={2}
                    data={filteredAlbumsData}
                    
                    handleSelectedProduct={props.handleSelectedProduct}
                    searchTerm={props.searchTerm}
                  />
                </>
              )}                      
            </Box>
            }
            
          </Grid>    
        </Grid>
      </Box>
      </>
      }
    </>
  );
}

const staticCategories = [
  "Food",
  "Pets",
  "Electronics",
  "Autotmotive",
  "Shopping",
  "Home",
  "Garden",
  "Recreation",
  "Rock",
  "Jazz",
  "Pop",
  "Dark Synth",
  "Funk",
  "Punk"
]