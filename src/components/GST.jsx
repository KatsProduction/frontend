import React, { useState } from 'react'
import './../css/GST.css';
import TextField from '@mui/material/TextField';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomButton from './optional/CustomButton';
import axios from 'axios';
import Pannel from './optional/Pannel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


export default function GST() {


    const [value,setValue] = useState("");

    const [checkArray, setIsArray] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apidata, setapiData] = useState('');

    //   handle display fetched data
    const displayFetchedData = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await axios({
            url: `${import.meta.env.VITE_APP_BASE_URL}/gst/gstInfo`,
            method: 'POST',
            data: { gst_no: value }
        });

        const output = response.data;
        console.log(output);
        if (output.hasOwnProperty('msg')) {
            // console.log('shivam');
            setIsArray(false);
        } else {
            setapiData(output);
            setIsArray(true);
            // console.log('sharma');

        }
        setLoading(false);
    }



    const handleInput = (e) => {
        typedValue = e.target.value;
    }
    return (
        <>
            {/* truck verify pannel start */}
            <div className='truck-pannel  sm:w-full md:w-[82%] flex-grow-[2]'>

                {/* header pannel */}

                <div className='w-full flex items-center justify-between  bg-[#f5f6fa] h-16 p-2'>
                    <h1 className='font-montserrat font-medium'>USER ID : 13</h1>
                    <div className=' h-20  w-2/4 flex items-center justify-center'>
            <h1 className=' text-2xl font-poppins py-4  text-center font-medium' style={{ textShadow: '1px 1px #ccc' }}>GST</h1>
          </div>
                    <button className="bg-black text-white  py-2 px-4 border border-white  rounded-md font-montserrat" >
                        Settings
                        <SettingsIcon className='pl-1 w-10 h-10 cursor-pointer text-white' />
                    </button>
                </div>

                {/* section pannel */}
                <div className=''>
                    <form className='w-full  h-18 p-4 flex  items-center justify-start' onSubmit={displayFetchedData} autoComplete='off'>
                        {/* <Outlinedfield handleChange={handleInput} labled='GSTIN Number' /> */}
                        <TextField required={true} id="outlined-basic" label='GST Number' sx={{ marginTop: '8px' }} variant="outlined" onChange={(e) => { setValue(e.target.value) }} value={value} />
                        <CustomButton  type='submit' value='Search' />
                    </form>
                </div>

                {/* api data table */}
                <div className='w-full p-3'>
                    {/* <ApiHandler data={apidata} checkArray={checkArray} loading={loading}  />  */}


              {loading ? 
                   <Accordion disabled>
                   <AccordionSummary id="panel-header" aria-controls="panel-content" className='text-cyan-500'>
                     loading ...
                   </AccordionSummary>
                   <AccordionDetails>
                    No data to Show
                   </AccordionDetails>
               </Accordion>  : 
                    checkArray ? <Pannel title='RC Details' data={apidata} checkArray={checkArray} loading={loading} /> : <></>}
                </div>

            </div>


        </>
    )
}
