import React, { useState } from 'react'
import axios from 'axios';
import './../css/Challan.css';
import CustomButton from './optional/CustomButton';
import TextField from '@mui/material/TextField';
import InputFileUpload from './optional/UploadButton';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';
import DataTable from './optional/DataTable';



export default function Challan() {


  const [value, setValue] = useState("");
  const [excelData, setExcelData] = useState("");
  // store fetched data
  const [apidata, setapiData] = React.useState([]);
  // capture status of data loaded or not
  const [loading, setLoading] = useState(false);
  // check whether data receive is array or not
  const [checkArray, setIsArray] = useState(false);
  const [checkObj, setIsObj] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);
  const [checkUploaded, setUploaded] = React.useState(false);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };


  // handle uploaded excel file
  const handleFileChange = (data, fileName) => {
    setExcelData(data);
  };

  // Reusable function to send requests for each vehicle number
  const sendRequest = async (vehicle_number,index) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_APP_BASE_URL}/challan/search`,
        withCredentials: true,
        data: { Vehicle_no: vehicle_number }
      });

      const output = response.data;
      if (output.hasOwnProperty('out')) {
        // Filter out successfully inserted vehicle from excelData
        setExcelData((prevData) => {
          console.log(prevData);
          prevData.filter((_, i) => { console.log(i); console.log(index); i !== index });
          console.log(prevData.filter((_, i) => i !== index));
          return prevData.filter((_, i) => i !== index)
        });
        // alert(`Vehicle No ${vehicle_number} is inserted`);
        return 1; // Return 1 for successful processing
      }
    } catch (error) {
      if (error.response.data.status == 401) {
        alert('Session Expired');
      } else if (error.response.data.status == 500) {
        alert('Internal Server Error');
      } else if (error.response.data.status == 404) {
        alert('No Record Present');
      } else {
        alert('something went wrong');
      }
      throw new Error(`Error processing Vehicle ${vehicle_number}`);
    }
  };



  // handle uploaded excel file
  const handleUploadedFile = async (e) => {
    e.preventDefault();
    setIsArray(false);
    setIsObj(false);
    setUploaded(true);

    if (!excelData || excelData.length === 0) {
      alert('No data available to process');
      return;
    }

    let count = 0;

    for (let i = 0; i < excelData.length; i++) {
      try {
        const received_count = await sendRequest(excelData[i],0);
        count += received_count;  // Increment count for each successful request
        // alert(count);

      } catch (error) {
        console.log(error);
        alert(`${error.message}`);
      }
    }

    if (count === excelData.length) {
      alert('All data fetched successfully');
    } else if (count > 0) {
      alert('Partial data fetched successfully');
    } else {
      alert('No data fetched successfully');
    }

    setUploaded(false);
  };



  // handle read challan
  const handleReadChallan = async (e) => {
    e.preventDefault();

    // Reset state before new fetch
    setIsArray(false);
    setIsObj(false);
    setUploaded(false);

    try {
      setLoading(true); // Set loading state before the API request

      const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_APP_BASE_URL}/challan/readAll`,
        withCredentials: true, // Ensure cookies are sent with request
      });

      const output = response.data;
      console.log(output);

      if (output && output.hasOwnProperty('out')) {
        if (Array.isArray(output.out)) {
          setIsArray(true);
          setapiData(output.out); // Populate the table or UI with the response data
        } else {
          setIsArray(false);
          alert(output.out);
        }
      }
    } catch (error) {
      setIsArray(false);
      console.log(error);
      if (error.response.data.status == 401) {
        alert('Session Expired');
      } else if (error.response.data.status == 500) {
        alert('Internal Server Error');
      } else if (error.response.data.status == 404) {
        alert('No Record Present');
      } else {
        alert('something went wrong');
      }


    } finally {
      setLoading(false); // Ensure loading state is stopped
    }
  };

  const handleRemoveChallan = async (e) => {
    e.preventDefault();
    setIsArray(false);
    setIsObj(false);
    setUploaded(false);
    if (window.confirm("Are you Sure ?")) {
      try {
        setLoading(true);

        const response = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_APP_BASE_URL}/challan/removeAll`,
          withCredentials: true
        });
        let output = response.data;
        // console.log(output);

        if (output.hasOwnProperty('msg')) {
          alert('removed all challan');
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.status == 401) {
          alert('Session Expired');
        } else if (error.response.data.status == 500) {
          alert('Internal Server Error');
        } else if (error.response.data.status == 404) {
          alert('No Record Present');
        } else {
          alert('something went wrong');
        }
      }
      finally {
        setLoading(false);
      }
    }

  }
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsObj(false);
    setUploaded(false);

    try {

      const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_APP_BASE_URL}/challan/search`,
        withCredentials: true,
        data: { Vehicle_no: [value.toUpperCase()] } // Ensure Vehicle_no is in uppercase
      });

      const output = response.data;
      console.log(output);

      if (output && output.hasOwnProperty('out')) {
        if (Array.isArray(output.out)) {
          setIsArray(true);
          setapiData(output.out); // Update API data state
        } else {
          setIsArray(false);
          alert(output.out);
        }
      }

    } catch (error) {
      setIsArray(false);
      console.log(error);

      if (error.response.data.status == 401) {
        alert('Session Expired');
      } else if (error.response.data.status == 500) {
        alert('Internal Server Error');
      } else if (error.response.data.status == 404) {
        alert('No Record Present');
      } else {
        alert('something went wrong');
      }

    } finally {
      setLoading(false); // Ensure loader is stopped after the request
    }
  };



  return (

    <>
      {/* challan pannel start */}

      <div className='challan-pannel  sm:w-full md:w-[82%] flex-grow-[2] overflow-auto'>

        {/* header pannel */}
        <div className='w-full flex items-center justify-between  bg-[#f5f6fa] h-16 p-2 '>

          <div className=' h-20  w-2/4 flex items-center justify-center'>
            <h1 className=' text-2xl font-poppins py-4  text-center font-medium' style={{ textShadow: '1px 1px #ccc' }}>CHALLAN</h1>
          </div>
        </div>

        {/* section pannel */}
        <div className='flex items-center justify-between h-18 px-5 mt-4'>
          <div className='flex items-center justify-start h-18 '>
            {/* serach challan by vehicle number */}
            <form className='' autoComplete='off' onSubmit={handleSubmit}>
              <TextField required={true} id="outlined-basic" sx={{
                marginTop: '8px',
                width: '200px',
                '& .MuiOutlinedInput-root': {
                  height: '49px', // Set the desired height for the whole field
                  '& input': {
                    padding: '8px', // Adjust the input padding
                  },
                },
                '& .MuiInputLabel-root': {
                  top: '-3px', // Adjust label position if necessary
                  transformOrigin: 'left center'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  top: '0px', // Color when the label is focused
                },
                '& .MuiInputLabel-asterisk': {
                  color: 'red', // Asterisk color
                }
              }}
                label='Vehicle Number' variant="outlined" onChange={(e) => { setValue(e.target.value) }} value={value} />
              <CustomButton type='submit' value='Search' />
            </form>

            {/* read all challan from database */}
            <form className='' autoComplete='off' onSubmit={handleReadChallan}>
              <CustomButton type='submit' value='View All' />
            </form>

            {/* remove all challan from database */}
            <form className='' autoComplete='off' onSubmit={handleRemoveChallan}>
              <CustomButton type='submit' value='Delete All' open={alertOpen} onClose={handleCloseAlert} />
            </form>

          </div>

          {/* <div className='h-18  flex  items-start justify-start border border-solid border-red-700'>
       
          </div> */}

          {/* upload excel file and read one by one */}
          <form className='h-18 p-2    flex  items-center justify-start' autoComplete='off' onSubmit={handleUploadedFile} >
            <InputFileUpload onFileData={handleFileChange} />
            <CustomButton type='submit' value='Submit' />
          </form>


        </div>
        {/* <span className='w-full'>{fileName}</span> */}

        {/* search data in table */}
        <div className='w-full px-5 sm:block md:flex items-start justify-between mt-4'>
          {/* <SearchData tableName="challan-table" /> */}
        </div>


        {/* api data table */}

        <div className='w-full px-5 mt-6'>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px" width="97%" marginX="auto">
              <CircularProgress />
            </Box>
          ) : checkArray ? (<DataTable jsonData={apidata} />) : checkUploaded ? (
            <div>
              {excelData.map((item, index) => (
                <h1 key={index} className='dynamic_row p-2'>
                  <span colSpan={18} className='text-left'>{item[0]}</span>
                </h1>
              ))}
            </div>
          ) : null}
          {/* <DataTable /> */}
          {/* <ApiHandler data={apidata} checkArray={checkArray} loading={loading} uploadedData={excelData} checkUploadStatus={checkUploaded} /> */}
        </div>
      </div>


    </>
  )
}
