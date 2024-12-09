import React from 'react'
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { display } from '@mui/system';


const CustomDatePicker = styled(DatePicker)(({ marginLeft, marginRight, top, theme }) => ({

  
  '& .MuiStack-root': {
    overflow: 'hidden',
  },
  '& .MuiInputBase-root': {
    marginRight: marginRight || '8px',
    marginLeft: marginLeft || '10px',
    '& .MuiInputAdornment-root': {

    },
  },
  '& .MuiOutlinedInput-root': {
    height: '49px',
    '& fieldset': {

    },
    '&:hover fieldset': {
   
    },
    '&.Mui-focused fieldset': {

    },
  },
  '& .MuiInputLabel-root': {
    left:  top || '0px' ,
    '&.Mui-focused': {
    },
  },
}));

export default function Datepicker({ onData, label, marginLeft, marginRight, top }) {

  const [value, setValue] = React.useState(dayjs());

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} sx={{overflow:'hidden'}}>
          <CustomDatePicker
            label={label}
            value={value}
            required
            onChange={(newValue) => { setValue(newValue); onData(newValue) }}
            format="DD/MM/YYYY"
            marginLeft={marginLeft}
            marginRight={marginRight}
            top={top}
            sx={{width:240}}
            
          />
        </DemoContainer>
      </LocalizationProvider>

    </>
  )
}
