import React, { useState } from 'react'
import CustomButton from './optional/CustomButton';
import Datepicker from './optional/Datepicker';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputFileUpload from './optional/UploadButton';
import LicenseForm from './LicenseForm';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import DataTable from './optional/DataTable';




export default function DLsearch() {

    const [DOB, setDOB] = useState('');
    const [url, setURL] = useState('');
    const [checkArray, setIsArray] = useState(false);
    const [checkObj, setIsObj] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apidata, setapiData] = useState([]);
    const [value, setValue] = useState("");
    const [excelData, setExcelData] = useState("");
    const [checkUploaded, setUploaded] = React.useState(false);
    const [dbData, setDbData] = useState([]);


    //   handle display fetched data
    const displayFetchedData = async (e) => {
        e.preventDefault();
        setIsArray(false)
        setUploaded(false);
        setLoading(true);

        try {

            // Make API request
            const response = await axios({
                url: `${import.meta.env.VITE_APP_BASE_URL}/DL/search`,
                method: 'POST',
                withCredentials: true,
                data: { dl_number: value, dob: DOB },
            });

            const output = response.data;

            if (output && output.licenseData) {
                setIsObj(true);
                const base64String = `${output.licenseData.profile_image}`;
                setURL(base64String);
                setapiData(output.licenseData);
            }

        } catch (error) {
            setIsObj(false);
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
            // Always hide the loader after the request completes
            setLoading(false);
        }
    };



    const handleChangeInDate = (e) => {
        let year = e.$y;
        let month = e.$M > 9 ? e.$M + 1 : '0' + Number(e.$M + 1);
        let date = e.$D;
        setDOB(`${year}-${month}-${date}`);
    }

    // handle uploaded excel file
    const handleFileChange = (data, fileName) => {
        setExcelData(data);
    };


    // Function to handle individual DL request in a loop
    async function sendRequest(dl_details,index) {
        try {
            // Convert Excel serial number to date
            // console.log(dl_details);
            let converted_days_to_date = new Date((dl_details[1] - 25569) * 86400 * 1000);
            // console.log(converted_days_to_date);
            if (converted_days_to_date == 'Invalid Date') {
                alert('Please Reupload file');
            }
            dl_details[1] = converted_days_to_date.toISOString().split('T')[0];
            //    console.log(dl_details);
            // Send POST request with DL details
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_APP_BASE_URL}/DL/insert`,
                withCredentials: true,
                data: { DL_Details: dl_details }
            });

            const output = response.data;
            console.log(output);
            if (output.hasOwnProperty('msg')) {
                // console.log(`DL No ${dl_details[0]} is inserted`);
                // Filter out successfully inserted DL from excelData
                setExcelData((prevData) => prevData.filter((_, i) => i !== index));
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
            throw new Error(`Error processing DL ${dl_details[0]}`);
        }
    }

    // Function to handle the uploaded Excel file and send requests in a loop
    const handleUploadedFile = async (e) => {
        e.preventDefault();
        setIsObj(false);
        setIsArray(false); // Hide table while uploading
        setUploaded(true); // Show loading indicator


        if (!excelData || excelData.length === 0) {
            alert('No data available to process');
            return;
        }

        let count = 0;
        // Loop through Excel data and send requests
        for (let i = 0; i < excelData.length; i++) {
            try {
                const received_count = await sendRequest(excelData[i],i);
                count += received_count;  // Increment count for each successful request
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

        setExcelData([]); // Clear Excel data after processing
        setUploaded(false); // Hide loading indicator once the process is finished

    };


    const display_all_dl = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsObj(false);
        setUploaded(false);
        try {
            setIsArray(true);
            // Make API request
            const response = await axios({
                url: `${import.meta.env.VITE_APP_BASE_URL}/DL/showDLList`,
                method: 'GET',
                withCredentials: true
            });

            const output = response.data;


            if (output && output.results) {
                if (Array.isArray(output.results)) {
                    setIsArray(true);
                    setDbData(output.results);
                }
            } else {
                alert('No data available');
            }
        } catch (error) {
            setIsArray(false);
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
            setLoading(false);
        }
    }

    return (
        <>

            {/* truck verify pannel start */}
            <div className='dl-pannel  sm:w-full md:w-[82%] flex-grow-[2] overflow-auto'>

                {/* header pannel */}
                <div className='w-full flex items-center justify-between  bg-[#f5f6fa] h-16 p-2'>
                    <div className='h-20  w-2/4 flex items-center justify-center'>
                        <h1 className=' text-2xl font-poppins py-4  text-center font-medium' style={{ textShadow: '1px 1px #ccc' }}>DL SEARCH</h1>
                    </div>
                </div>


                {/* section pannel */}
                <div className=' flex items-center justify-between  p-2 h-18'>
                    <div className='h-18 p-3  flex  items-center justify-start '>
                        <form onSubmit={displayFetchedData} autoComplete='off' className='h-18 p-3  flex  items-center justify-start '>
                            <TextField
                                id="outlined-basic"
                                required={true}
                                label='Driving License Number'
                                variant="outlined"
                                onChange={(e) => { setValue(e.target.value) }}
                                value={value}
                                sx={{
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

                            />
                            <Datepicker onData={handleChangeInDate} label='DOB' top='10px' />
                            <CustomButton marginLeft='15px' type='submit' value='Search' />
                        </form>
                        <form className='' autoComplete='off' onSubmit={display_all_dl}>
                            <CustomButton type='submit' value='View All' />
                        </form>
                    </div>

                    <form className='h-18 p-2    flex  items-center justify-start' autoComplete='off' onSubmit={handleUploadedFile}  >
                        <InputFileUpload onFileData={handleFileChange} />
                        <CustomButton type='submit' value='Submit' />
                    </form>
                </div>


                {/* api data table */}
                <div className='w-full px-5'>



                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="300px" width="97%" marginX="auto">
                            <CircularProgress />
                        </Box>
                    ) :
                        checkObj ? (<LicenseForm title='Driving License  Details' data={apidata} checkArray={checkArray} loading={loading} url={url} />) :
                            checkArray ? (<DataTable jsonData={dbData} />) :
                                checkUploaded ? (<div>
                                    {
                                        excelData.map((item, index) => (

                                            <h1 key={index} className='dynamic_row p-2'>
                                                <span colSpan={18} className='text-left'>{`${item[0]}  ${item[1]}`}</span>
                                            </h1>
                                        ))}
                                </div>)
                                    : <></>
                    }




                </div>
            </div>

        </>
    )
}




