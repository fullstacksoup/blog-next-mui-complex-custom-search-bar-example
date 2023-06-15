import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


export default function ProgressBarGoal(props) {
  const [value, setValue] = React.useState(50)
  React.useEffect(() => {
    const interValID = setInterval(() => {
    const newVal = value + 1      
        if(newVal <= 100) {
          setValue(newVal)
        }
        else {
          clearInterval(interValID)
        }
      }, 1000);
    }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
     
      <BorderLinearProgress variant="determinate" value={50} />
    </Box>
  );
}