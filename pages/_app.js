import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import AppLayout from '../components/AppLayout';
import NextNProgress from 'nextjs-progressbar';
import '../styles/globals.css';
import { createContext, Fragment, useState } from "react";
import useSWR from 'swr';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export const RootCompContext = createContext(null);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MainApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;  
  
  const { data, error } = useSWR('/api/getData', fetcher);
  
  const [darkState, setDarkState] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [historyResults, setHistoryResults] = useState([]);
  const [suggestionResults, setSuggestionResults] = useState([]);
  const [maxRecordsReturned ] = useState(10);
  const [selectProduct, setSelectProduct] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [filteredPostsData, setFilteredPostsData] = useState([]);
  const [filteredAlbumsData, setFilteredAlbumsData] = useState([]);
  const [filteredResultsCategories, setFilteredResultsCategories] = useState([]);
  
  React.useEffect(() => {
    
    if(data) {
      setPostsData(data.posts);
      setAlbumData(data.albums);  
    }
  
  }, [data])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            // Purple and green play nicely together.
            main: '#4674c3',
            
          },
          secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
          },
          warning: {
            // Purple and green play nicely together.
            main: red[300],            
          },
          dark: {
            // Purple and green play nicely together.
            main: grey[700],            
          },
          
          default: {
            // Purple and green play nicely together.
            main: grey[50]          
          },

          mode: darkState? 'dark' : 'light',
          // mode: 'dark' ,
        },
       
        // breakpoints: {
        //   values: {
        //     xs: 0,
        //     sm: 600,
        //     md: 900,
        //     lg: 1700,
        //     xl: 1720,
        //   },
        // },
    }), [darkState]);

  const handleThemeChange = () => {
    setDarkState(!darkState);        
  
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      
        
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          
          <NextNProgress
            color={theme.palette.mode==='light'?'#CD6155': '#CD6155'}
            startPosition={0.3}
            stopDelayMs={200}
            height={10}
            showOnShallow={true}
          />
             <RootCompContext.Provider
                value={{
                  searchTerm,
                  setSearchTerm,
                  filteredResults,
                  setFilteredResults,
                  historyResults,
                  setHistoryResults,
                  suggestionResults,
                  setSuggestionResults,
                  selectProduct,
                  setSelectProduct,
                  maxRecordsReturned,
                  postsData,
                  albumData,
                  filteredPostsData, 
                  setFilteredPostsData,
                  filteredAlbumsData, 
                  setFilteredAlbumsData,
                  filteredResultsCategories, 
                  setFilteredResultsCategories
                }}
              >
                
              <AppLayout handleThemeChange={handleThemeChange} darkState={darkState}  mainPage={                  
                <>         
                    <Component {...pageProps} /> 
                </>}
              />
          </RootCompContext.Provider>
      

        </ThemeProvider>
      
    </CacheProvider>
  );
}

MainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
  allProducts: PropTypes.array.isRequired,
};

