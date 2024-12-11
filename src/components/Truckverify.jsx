import React, { useState } from 'react';
import './../css/Truckverify.css';
import TextField from '@mui/material/TextField';
import CustomButton from './optional/CustomButton';
import axios from 'axios';
import Pannel from './optional/Pannel';
import InputFileUpload from './optional/UploadButton';
import { useNavigate } from 'react-router-dom';
import DataTable from './optional/DataTable';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

export default function Truckverify({ dbName }) {
    const navigate = useNavigate();

    // State variables
    const [value, setValue] = useState('');
    const [checkObj, setIsObj] = useState(false);
    const [checkArray, setIsArray] = useState(false);
    const [checkUploaded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apidata, setapiData] = useState('');
    const [dbData, setDbData] = useState('');
    const [excelData, setExcelData] = useState('');


    // Function to handle individual vehicle API request
    const displayFetchedData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsArray(false);
        setUploaded(false);

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/truckverify/checkVehicle`, {
                Vehicle_no: [value.toUpperCase()],
            }, { withCredentials: true });

            const output = response.data;
            if (output && output.received_API_object) {
                setapiData(output.received_API_object);
                setIsObj(true);
            } else {
                alert('No data available');
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
            setLoading(false);
        }
    };

    // Handle file change and store data
    const handleFileChange = (data, fileName) => {
        setExcelData(data);
    };

    // Reusable function to send requests for each vehicle number
    const sendRequest = async (vehicle_number,index) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/truckverify/dbcheck`, {
                Vehicle_no: vehicle_number
            }, { withCredentials: true });

            const output = response.data;
            if (output.hasOwnProperty('msg')) {
                       // Filter out successfully inserted vehicle from excelData
                       setExcelData((prevData) => {
                        //    console.log(prevData);
                        //    prevData.filter((_, i) => {console.log(i);console.log(index);i !== index});
                    // console.log(prevData.filter((_, i) => i !== index));
                    return prevData.filter((_, i) => i !== index)
                });
                // alert(`Vehicle No ${vehicle_number} is inserted`);
                return 1; // Return 1 for successful processing
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
            throw new Error(`Error processing Vehicle ${vehicle_number}`);
        }
    };
    
    
    
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
                //    console.log(excelData);
    
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
    

    // Fetch and display all trucks data
    const viewAllTruck = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsObj(false);
        setUploaded(false);
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/truckverify/showTruckList`, {
                withCredentials: true,
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
            setLoading(false);
        }
    };

    return (
        <div className='truck-pannel sm:w-full md:w-[82%] flex-grow-[2] overflow-auto'>
            {/* Header Panel */}
            <div className='w-full flex items-center justify-between bg-[#f5f6fa] h-16 p-2'>
                <div className='h-20 w-2/4 flex items-center justify-center'>
                    <h1 className='text-2xl font-poppins py-4 text-center font-medium' style={{ textShadow: '1px 1px #ccc' }}>RC STATUS</h1>
                </div>
            </div>

            {/* Action Panel */}
            <div className='flex items-center justify-between p-2 h-18'>
                <div className='h-18 p-3 flex items-center justify-start'>
                    <form autoComplete='off' onSubmit={displayFetchedData}>
                        <TextField required id="outlined-basic" label='Vehicle Number'
                            sx={{
                                marginTop: '8px',
                                '& .MuiOutlinedInput-root': { height: '49px', '& input': { padding: '8px' } },
                                '& .MuiInputLabel-root': {
                                    top: '-3px'
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    top: '0px', // Color when the label is focused
                                },
                                '& .MuiInputLabel-asterisk': {
                                    color: 'red', // Asterisk color
                                }


                            }}
                            variant="outlined" onChange={(e) => setValue(e.target.value)} value={value} />
                        <CustomButton marginLeft='15px' type='submit' value='Search' />
                    </form>
                    <form autoComplete='off' onSubmit={viewAllTruck}>
                        <CustomButton type='submit' value='View All' />
                    </form>
                </div>
                <form autoComplete='off' onSubmit={handleUploadedFile} className='h-18 p-2    flex  items-center justify-start'>
                    <InputFileUpload onFileData={handleFileChange} />
                    <CustomButton type='submit' value='Submit' />
                </form>
            </div>

            {/* Display Data */}
            <div className='w-full px-5 py-2'>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="300px" width="97%" marginX="auto">
                        <CircularProgress />
                    </Box>
                ) : checkObj ? (
                    <Pannel title='RC Details' data={apidata} />
                ) : checkArray ? (
                    <DataTable jsonData={dbData} />
                ) : checkUploaded ? (
                    <div>
                        {excelData.map((item, index) => (
                            <h1 key={index} className='dynamic_row p-2'>
                                <span colSpan={18} className='text-left'>{item[0]}</span>
                            </h1>
                        ))}
                 
                    </div>
                ) : null}
            </div>
        </div>
    );
}
