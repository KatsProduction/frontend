import React, { useState, useEffect } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import './../css/ewaybill/ewaybill.css';
import { Heading } from './ewaybill/Heading';
import { FormSection } from './ewaybill/FormSection';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StatesTable from './ewaybill/StatesTable';




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

const Ewaybill = () => {


    // check status of admin or not
    const [checkAdmin, setAdminStatus] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [stateCode, setStateCode] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

    const navigate = useNavigate();

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
            document.getElementById('gst-number').innerHTML = `GSTIN : ${data.gst}`;
            if (data.isAdmin) {
                setAdminStatus(true);
                // console.log('adming ');
            } else {
                setAdminStatus(false);
                // console.log('not admig');
            }
        }).catch((err) => {
            alert('Session Timeout');
            navigate('/');
        });
    }, []);






    // show popup
    async function showpopup() {
        document.getElementsByClassName('gps-main-container')[0].style.display = "block";
        document.querySelector(".gps-popup").classList.add('opened');

    }

    const fetch_state_code = async () => {
        try {
            const results = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_APP_BASE_URL}/stateCode`,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // console.log(results.data.out);
            setStateCode(results.data.out);
        } catch (error) {
            console.log(error);
            // if (error.response.data.status == 401) {
            //     alert('session expired');
            //     navigate('/');
            // } else if (error.response.data.status == 500) {
            //     alert('internal server error');
            // } else {
            //     alert('something went wrong');
            // }
        }
    }


    const fetched_checked_state = async () => {
        try {
            const results = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_APP_BASE_URL}/getstatecode`,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // console.log(results.data.out);
            setCheckedState(results.data.out);
        } catch (error) {
            console.log(error);
            // if (error.response.data.status == 401) {
            //     alert('session expired');
            //     navigate('/');
            // } else if (error.response.data.status == 500) {
            //     alert('internal server error');
            // } else {
            //     alert('something went wrong');
            // }
        }
    }

    const handleClickOpen = async () => {
        setOpen(true);
        await fetch_state_code();
        await fetched_checked_state();
    };



    const handleClickClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/*  fasttag pannel start */}
            <div className='ewaybill-pannel sm:w-full md:w-[82%]'>

                <div className='w-full flex items-center justify-between  bg-[#f5f6fa] h-16 p-2'>

                    <div className='h-20  w-2/4 flex items-center justify-center'>
                        <h1 className=' text-2xl font-poppins py-4  text-center font-medium' style={{ textShadow: '1px 1px #ccc' }}>E-WAY BILL</h1>
                    </div>
                    {/* gstin number */}
                    <div className="">
                        <h3 id="gst-number" className="gst-number "></h3>
                    </div>
                    <div>
                        {/* {checkAdmin ? <button onClick={showpopup} className="bg-blue-950 text-white  ml-1 py-2 px-4 border border-white  rounded-md font-montserrat" >
                            Admin
                            <SettingsIcon className='pl-1 w-10 h-10 cursor-pointer text-white' />
                        </button> : <button onClick={showpopup} className="bg-black text-white  ml-1 py-2 px-4 border border-white  rounded-md font-montserrat" >
                            Settings
                            <SettingsIcon className='pl-1 w-10 h-10 cursor-pointer text-white' />
                        </button>} */}


                        {checkAdmin ? <button onClick={showpopup} className="bg-black text-white  ml-1 py-2 px-4 border border-white  rounded-md font-montserrat" >
                            Settings
                            <SettingsIcon className='pl-1 w-10 h-10 cursor-pointer text-white' />
                        </button> : null}




                        <button onClick={handleClickOpen} className="bg-black text-white  ml-1 py-2 px-4 border border-white  rounded-md font-montserrat" >
                            State
                            <SettingsIcon className='pl-1 w-10 h-10 cursor-pointer text-white' />
                        </button>
                    </div>

                </div>


                <section className='mt-4 px-5'>
                    <FormSection />
                </section>

                <Heading />
                <StatesTable stateManager={open} Close={handleClickClose} code={stateCode} checkedID={checkedState} />
            </div>




        </>
    )
}


export { Ewaybill };