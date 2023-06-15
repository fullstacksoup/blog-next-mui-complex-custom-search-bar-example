import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useState } from "react";
import { RootCompContext } from "@/pages/_app";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";


export default function SearchHistoryList(props) {
  const [checked, setChecked] = React.useState([0]);

  const { searchTerm, filteredResults, historyResults } = useContext(RootCompContext);
  const [searchHistoryData, setSearchHistoryData] = React.useState([]);
  const parent = React.useRef(null);


  return (
    <>
      {(filteredResults.length === 0 || searchTerm.length === 0) && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            Search History
          </Typography>

          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
            }}
            ref={parent}
          >
            {historyResults.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() =>
                      props.handleRemoveSearchHistoryItem(item.guid)
                    }
                  >
                    <ClearIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() =>
                    props.handleSelectedProductFromHistory(
                      item.guid,
                      item.handle,
                      item.title,
                      item.imgURL
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={item.imgURL}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.value}`}
                    primaryTypographyProps={{
                      fontSize: 14,
                      color: "purple",
                      fontWeight: "bold",
                    }}
                    secondary={`All Departments`}
                    secondaryTypographyProps={{
                      fontSize: 12,
                      fontWeight: "medium",
                      color: "darkgray",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
}
