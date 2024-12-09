import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';




const StyledButton = styled(Button)(({ marginLeft,padding,height }) => ({
  backgroundColor: '#847bff',
  borderRadius:'11px',
  color: 'white',
  padding:  padding  || '8px 16px' ,
  fontSize: '14px',
  height: height || '49px',
  minWidth:'80px',
  width:'150px',
  marginLeft: marginLeft || '15px', // Correctly use marginLeft prop
  marginTop: '8px',
  '&:hover': {
    // backgroundColor: '#303f9f',
    backgroundColor: '#303f9f',
  },
}));



export default function CustomButton({ marginLeft, value,type,padding,receiveAction,height,id}) {
  return (
    <>
      <StyledButton type={type}  id={id} variant="contained" size="large" marginLeft={marginLeft} padding={padding} onClick={receiveAction} height={height} className='font-poppins text-lg'>
        {value}
      </StyledButton>
    </>
  );
}