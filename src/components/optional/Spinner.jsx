import './../../css/spinner.css';
import { CircularProgress } from '@mui/material';
// import Box from '@mui/material/Box';

 function Spinner(){
    return (<>
    <div className='overlay'>
    {/* <i class="fa fa-spinner fa-spin" style={{fontSize: "30px",display:'flex',justifyContent:'center',alignItems:'center',color:'white' }}></i>  */}
    <CircularProgress />
    </div>
    </>);
}

export {Spinner};