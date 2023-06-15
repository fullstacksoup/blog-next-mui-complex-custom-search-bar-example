import * as React from "react";
import { useContext } from "react";
import {RootCompContext} from "@/pages/_app";
import { alpha, styled } from '@mui/material/styles';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useRouter } from 'next/router'
import SearchResultsGrid from "./SearchResultsGrid";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {    
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80ch',
    },
  },
}));


export default function LayoutSearchField(props) {
  const router = useRouter()
  
 
  const [showResults, setShowResults] = React.useState(false);
  const {
    searchTerm,
    setSearchTerm,        
    postsData,
    albumData,    
    setFilteredPostsData,    
    setFilteredAlbumsData,    
    setFilteredResultsCategories
  } = useContext(RootCompContext);
  const { selectProduct, setSelectProduct } = useContext(RootCompContext);

  const handleSearchTerm = (e) => {

    setSearchTerm(e.target.value);

    var tmpPostsData = [];
    var tmpAlbumsData = [];
    var tmpCategoriesData = [];

    if (e.target.value.length > 0) {      
      
      postsData.forEach((element) => {
        if (
          element.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          console.log('FOUND', element.title.toLowerCase())                  
          tmpPostsData.push(element);
          if(!tmpCategoriesData.includes(element.category)){
            tmpCategoriesData.push(element.category)
          }
          
        }
      });

      albumData.forEach((element) => {
          if (
            element.title
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            tmpAlbumsData.push(element);
            if(!tmpCategoriesData.includes(element.category)){
              tmpCategoriesData.push(element.category)
            }
            }
      });    
      
      setFilteredResultsCategories(tmpCategoriesData)
      setFilteredPostsData(tmpPostsData);
      setFilteredAlbumsData(tmpAlbumsData);        
    }

  };


  

  const handleOpenSearchResults = () => {
    
    setShowResults(true);
  };

  return (
    <>
      <Box
        alignContent="center"
        
        sx={{  position: "absolute", top: "1vh", left: "20vw", zIndex: 99 }}
      >
        <ClickAwayListener onClickAway={() => setShowResults(false)}>
          <Box textAlign="left" sx={{ width: "50vw", position: "relative" }}>
            <Stack spacing={0}>
              <Search>
                 <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  size="small"
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Products"
                  inputProps={{ "aria-label": "search google maps" }}
                  onChange={(e) => handleSearchTerm(e)}
                  onFocus={() => handleOpenSearchResults()}
                  value={searchTerm}
                />
              </Search>
              
              <SearchResultsGrid
                showResults={showResults}
                searchTerm={searchTerm}                
              />
            </Stack>
          </Box>
        </ClickAwayListener>
      </Box>
    </>
  );
}
