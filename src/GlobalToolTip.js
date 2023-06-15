import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';



export  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.mode === 'dark' ? '#556d90' : '#a9c6f7',
      color: theme.palette.mode === 'dark' ? 'white' : 'black',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: theme.palette.mode === 'dark' ? '1px solid #104475' : '1px solid #a9c6f7' , 
    },
    [`& .${tooltipClasses.arrow}`]: {
      backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#ffffff',
      color: theme.palette.mode === 'dark' ? '#104475' : '#a9c6f7',
    },
  }));
  
