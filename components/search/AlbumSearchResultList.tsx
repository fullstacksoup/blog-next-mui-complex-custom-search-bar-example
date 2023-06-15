import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AlbumIcon from '@mui/icons-material/Album';
import { useContext } from 'react'
import {RootCompContext} from "@/pages/_app";
import { Typography } from '@mui/material';
import Link from 'next/link';
  
  
export default function AlbumSearchResultList(props) {  
  
  const [searchTerms, setSearchTerms] = React.useState([])  
  const {searchTerm, filteredAlbumsData,  maxRecordsReturned } = useContext(RootCompContext);


  React.useEffect(() => {
    var searchStr = []
    searchStr.push(`${props.searchTerm}`)
    
    setSearchTerms(searchStr)
  }, [props.searchTerm])
  

  const Highlight = ({ children, highlightIndex }) => (
    <strong className="highlighted-text">{children}</strong>
  );
  
  
  return (
    <>   
      {(filteredAlbumsData.length > 0 && searchTerm.length > 0) && 
      <>  
      <Typography variant='subtitle1' sx={{mt: 2, ml: 2, color: 'black'}}>
        Album Search Results
      </Typography>

      <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
        {filteredAlbumsData.slice(0, maxRecordsReturned).map((item) => (
          <ListItemButton
            key={item.id}
            sx={{ py: 0, minHeight: 42, color: 'rgba(5,5,5,.8)' }}
            // onClick={() => props.handleSelectedProduct(item.id, item.handle, item.title, item.images.edges[0].node.url)}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
            <AlbumIcon/>
            </ListItemIcon> 
    
            {item.title}
                          
        </ListItemButton>
        ))}
    </List>
    </>
     }
     </>
  );
}