
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SettingsIcon from '@mui/icons-material/Settings';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import './../css/Fasttag.css';
import axios from 'axios';
import Datepicker from './optional/Datepicker';
import CustomButton from './optional/CustomButton';
import DataTable from './optional/DataTable';
import CustomSelect from './optional/CustomSelect';
import { useNavigate } from 'react-router-dom';

const PREFIX = 'Fasttag';
const classes = {
    root: `${PREFIX}-root`,
    dialog: `${PREFIX}-dialog`,
    content: `${PREFIX}-content`,
    sbtbtn: `${PREFIX}-sbtbtn`,
    styleddatepicker: `styledatepicker`

}

const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        width: '100%',
        height: 'auto',
        '& .dialogcontent': {
            height: 'auto',
            overflowY: 'auto',
        },
        '& .dialogTitle': {
            fontFamily: "Poppins !important"
        },
        '& .firstInputField': {
            width: '100%'
        },
        '& .customTextField': {
            width: '100%',
            marginTop: '3% !important'
        },
        '& .sbtbtn': {
            width: '80px',
            marginTop: '4% !important'
        },
    }
}))

// Function to extract token from cookie
const getTokenFromCookies = () => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === 'token') {
            return value;
        }
    }
    return null;
};

// Function to verify the token by making an API request
const verifyToken = async (token) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_APP_BASE_URL}/verifytoken`,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: { token },
        });
        return response.data;
    } catch (err) {
        console.error('Token verification failed', err);
        throw new Error('Invalid token');
    }
};



const Fasttag = () => {
    const navigate = useNavigate();

    // check status of admin or not
    const [checkAdmin, setAdminStatus] = useState(false);

    // set bank
    const [bank, setBank] = React.useState('');
    const [open, setOpen] = React.useState(false);

    // store fetched data
    const [apidata, setapiData] = React.useState([]);

    // store setting data
    const [settingData, setSettingData] = useState([]);

    // capture status of data loaded or not
    const [loading, setLoading] = useState(false);

    // capture status of data loaded or not
    const [settingloader, setSettingLoader] = useState(false);

    // check whether data receive is array or not
    const [checkArray, setIsArray] = useState(false);

    const [successMessage, setSuccessMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');


    const [displayData, setDisplayData] = React.useState({
        "bank": "",
        "presentDate": `${new Date().getFullYear()}-${new Date().getMonth() >= 9 ? new Date().getMonth() + 1 : '0' + Number(new Date().getMonth() + 1)}-${new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate()}`
    });



    const getGstAndUser = async () => {
        try {
            const token = getTokenFromCookies();
            if (!token) {
                throw new Error('No token found');
            }

            const result = await verifyToken(token);
            return result;
        } catch (err) {
            // console.log('Token verify error:', err);
            throw err;
        }
    };



    useEffect(() => {
        // getting gsin number
        getGstAndUser().then((data) => {
            console.log(data);
            if (data.isAdmin) {
                setAdminStatus(true);
            } else {
                setAdminStatus(false);
            }
        }).catch((err) => {
            console.log(err);
            // alert('Session Timeout');
            // navigate('/');
        });
    }, []);


    const handleClickOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // Set select bank value
    const handleChange = async (event) => {
        const selectedBank = event.target.value;
        setBank(selectedBank); // Update bank state

        setLoading(true); // Set loading state
        setErrorMessage(''); // Reset any previous error messages
        setSuccessMessage(''); // Reset any previous success messages
        try {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_APP_BASE_URL}/fastTag/getSetting?bank=${selectedBank}`,
                withCredentials: true,
            });

            // Check if the response contains the expected data
            const { out } = response.data;

            if (out) {
                // Update settingData with the fetched values, providing fallbacks
                setSettingData({
                    baseURL: out.baseURL || "",
                    requestSource: out.requestSource || "",
                    authorization: out.authorization || "",
                    salt: out.salt || "",
                    merchantID: out.merchantID || "",
                    walletID: out.walletID || ""
                });
            } else {
                setErrorMessage("No settings found for the selected bank."); // Handle missing settings
            }
        } catch (err) {
            console.error("Error fetching bank settings:", err); // Log the error
            setErrorMessage("Failed to fetch bank settings. Please try again."); // Inform the user
        } finally {
            setLoading(false); // Reset loading state
        }
    };


    // show and hide bank option
    const handleOption = () => {
        let box = document.getElementById('box');
        box.classList.toggle('hidden');
    }

    // handle input data
    const handleInput = (event) => {
        const { name, value } = event.target;
        setSettingData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

    };

    // Handle form data submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSettingLoader(true); // Set loading state

        try {
            const response = await axios({
                url: `${import.meta.env.VITE_APP_BASE_URL}/fastTag/addSetting`,
                method: 'POST',
                withCredentials: true,
                data: { data: settingData, bank: bank },
            });

            // Check if the response indicates success
            if (response.data.msg) { // Assuming your API responds with a success key
                setSuccessMessage("Saved successfully!"); // Set success message
                setErrorMessage("");
                setTimeout(() => { setOpen(false); setSuccessMessage("") }, 3000); // Close the modal after 3 seconds
            } else {
                setSuccessMessage("");
                setErrorMessage("Failed to save settings."); // Set error message based on response
            }
        } catch (err) {
            console.error("Submission error:", err);

            setErrorMessage("An error occurred. Please try again."); // Set a generic error message
        } finally {
            setSettingLoader(false); // Reset loading state
        }
    };



    // handle display fetched data
    const displayFetchedData = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);  // Set loading state to true

            const response = await axios({
                url: `${import.meta.env.VITE_APP_BASE_URL}/fastTag/displayTollTax`,
                method: 'POST',
                withCredentials: true,
                data: displayData,
            });

            const output = response.data;

            if (output && output.hasOwnProperty('output')) {
                const result = output.output;

                if (Array.isArray(result)) {
                    // If result is an array, update the state
                    setapiData(result);
                    setIsArray(true);
                } else {
                    // If result is not an array, set isArray to false and handle error case
                    setIsArray(false);
                    alert("Received data is not an array");
                }
            } else {
                alert("Invalid response format or missing 'output' key");
            }
        } catch (error) {
            setIsArray(false);  // Set isArray to false in case of error
            console.error(error);  // Log a detailed error message
        } finally {
            setLoading(false);  // Ensure the loading state is reset after completion
        }
    };


    const selectBankOption = (bankOption) => {
        setDisplayData((prevFormData) => ({
            ...prevFormData, ['bank']: bankOption
        }));
    }

    const handleChangeInDate = (e) => {
        let year = e.$y;
        let month = e.$M >= 9 ? e.$M + 1 : '0' + Number(e.$M + 1);
        let date = e.$D >= 10 ? e.$D : '0' + Number(e.$D);
        setDisplayData((prevFormData) => ({
            ...prevFormData,
            ['presentDate']: `${year}-${month}-${date}`
        }));

    }



    return (
        <>
            {/*  fasttag pannel start */}
            <div className='fastag-pannel sm:w-full md:w-[82%] overflow-auto'>
                {/* main container */}
                <div className='flex justify-start items-start h-full flex-col relative '>

                    {/* setting option start */}
                    <div className='w-full flex items-center justify-between  bg-[#f5f6fa] h-16 p-2'>

                        <div className='h-20  w-2/4 flex items-center justify-center'>
                            <h1 className=' text-2xl font-poppins py-4  text-center font-medium' style={{ textShadow: '1px 1px #ccc' }}>FASTag</h1>
                        </div>
                        {checkAdmin ? <button className="bg-black text-white  py-2 px-4 border border-white  rounded-md font-montserrat" onClick={handleOption}>
                            Settings
                            <SettingsIcon className='pl-1 w-10 h-10 cursor-pointer text-white' />
                        </button> : null}


                        <Box id="box" sx={{ width: 220 }} className="bg-transparent mt-2 absolute top-16 right-2 hidden z-50">
                            <FormControl className='w-full'>
                                <InputLabel id="demo-simple-select-label" className='bg-white'>Select Bank</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={bank}
                                    label="Bank"
                                    onChange={handleChange}
                                    className='bg-white'
                                >
                                    <MenuItem value="HDFC" onClick={handleClickOpen}>HDFC</MenuItem>
                                    <MenuItem value="ICICI" onClick={handleClickOpen}>ICICI</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                    </div>
                    {/* setting option end */}


                    <Dialog
                        fullWidth={true}
                        maxWidth={'sm'}
                        open={open}
                        onClose={handleClose}
                    >
                        <Root className={classes.root}>
                            <DialogTitle className="dialogTitle">{`${bank} Settings`}</DialogTitle>
                            <DialogContent className="dialogContent">
                                <form
                                    sx={{
                                        maxWidth: '100%'
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    height='auto'
                                    onSubmit={handleSubmit}

                                >

                                    <TextField onChange={handleInput} value={settingData.baseURL} name="baseURL" className="firstInputField" id="baseurl" placeholder="BASE URL" variant="standard" />
                                    <TextField onChange={handleInput} value={settingData.requestSource} name="requestSource" className="customTextField" id="request_source" placeholder="REQUEST SOURCE" variant="standard" />
                                    <TextField onChange={handleInput} value={settingData.authorization} name="authorization" className="customTextField" id="authorization" placeholder="AUTHORIZATION" variant="standard" />
                                    <TextField onChange={handleInput} value={settingData.salt} name="salt" className="customTextField" id="salt" placeholder="SALT" variant="standard" />
                                    <TextField onChange={handleInput} value={settingData.merchantID} name="merchantID" className="customTextField" id="merchant-id" placeholder="MERCHANT ID" variant="standard" />
                                    <TextField onChange={handleInput} value={settingData.walletID} name="walletID" className="customTextField" id="wallet-id" placeholder="WALLET ID" variant="standard" />
                                    <button type="submit" className="sbtbtn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={settingloader}>{settingloader ? "Saving..." : "Save"}</button>
                                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                </form>
                            </DialogContent>
                        </Root>
                    </Dialog>


                    {/* from date */}
                    <div className='w-full px-5 mt-3 flex items-center justify-between'>
                        <form className='w-full  h-18  flex  items-center justify-start' onSubmit={displayFetchedData} autoComplete='off'>
                            <Datepicker onData={handleChangeInDate} label='Date' top='0px' marginLeft='0px' />
                            <CustomSelect selectBankOption={selectBankOption} />
                            <CustomButton marginLeft='8px' type='submit' value='Search' />
                        </form>
                    </div>






                    {/* api data table */}
                    <div className='w-full px-5'>
                        {loading ? <Box display="flex" justifyContent="center" alignItems="center" height="300px" width="97%" marginX="auto">
                            <CircularProgress />
                        </Box> : checkArray ? <DataTable jsonData={apidata} /> : <></>}

                    </div>
                </div>
                {/* main container end  */}

            </div>
            {/* fastag pannel end */}

        </>

    )
}

export default Fasttag;