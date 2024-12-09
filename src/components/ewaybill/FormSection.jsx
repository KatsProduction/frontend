
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchData } from './SearchData.jsx';
import { Apihandler } from './Apihandler.jsx';
import './../../css/ewaybill/Formsection.css';
import CustomButton from '../optional/CustomButton.jsx';
import Datepicker from './../../components/optional/Datepicker.jsx';
import { useNavigate } from 'react-router-dom';
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
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            data: { token },
        });
        return response.data;
    } catch (err) {
        console.error('Token verification failed', err);
        throw new Error('Invalid token');
    }
};


const FormSection = () => {

    const navigate = useNavigate();

    //  state managment start

    // check whether data receive is array or not
    const [checkArray, setIsArray] = useState(false);

    // store fetched data
    const [data, setData] = useState([]);

    // store user data
    const [user, setUser] = useState();

    // capture status of data loaded or not
    const [loading, setLoading] = useState(false);

    // store the selected date by user
    const [displayData, setDisplayData] = React.useState({
        "presentDate": `${new Date().getFullYear()}-${new Date().getMonth() >= 9 ? new Date().getMonth() + 1 : '0' + Number(new Date().getMonth() + 1)}-${new Date().getDate() >=10 ? new Date().getDate() :  '0' + new Date().getDate()}`
    });

    const [gst, setGST] = useState();
    // state managment end

    // get user info
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
            setGST(data.gst);
            setUser(data.user);
        }).catch((err) => {
            alert('Session Timeout');
            // navigate('/');
        });
    }, []);

    // handle date input field 
    const handleChangeInDate = (e) => {
        let year = e.$y;
        let month = e.$M >= 9 ? e.$M + 1 : '0' + Number(e.$M + 1);
        let date = e.$D >=10 ?  e.$D :  '0' + Number(e.$D) ;
        setDisplayData((prevFormData) => ({
            ...prevFormData,
            ['presentDate']: `${year}-${month}-${date}`

        }));
        console.log(date);
    }

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            document.getElementById('bill_input').value = "";
            document.getElementById('bill_date').value = "";
            var status_notifier = document.getElementById('button-status-notifier');
            status_notifier.innerHTML = "";

            // removing display none property from all row before fetching
            let table = document.getElementById('table');
            let tr = table.getElementsByTagName('tr');
            for (let i = 1; i < tr.length; i++) {
                tr[i].style.display = "";
            }

            setLoading(true);


            // Send data to server using Axios      
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_APP_BASE_URL}/api/getbill?date=${displayData.presentDate}&gst=${gst}`,
                withCredentials: true,

            });
            const output = response.data;

            // received data is array? 
            if (Array.isArray(output.out)) {
                const result = output.out;
                setData(result);
                setIsArray(true);
                status_notifier.innerHTML = "All E-way Bills";

            } else {
                // received data is not array
                const result = await output;
                setData(result);
                setIsArray(false);
            }
            setLoading(false);

        } catch (error) {
            if (error.response.data.status == 401) {
                alert('session expired');
                navigate('/');
            } else if (error.response.data.status == 500) {
                alert('internal server error');
            } else {
                alert('something went wrong');
            }

        }
    }

    return (
        <>
            <div className='filter-pannel'>


                <div className='flex  items-center justify-start '>
                    <div className=''>
                        <form className="h-18  py-2 sm:block md:flex  items-center justify-between" onSubmit={(event) => { handleSubmit(event) }}>
                            <Datepicker onData={handleChangeInDate} label='Date' top='10px' marginLeft='0px' />
                            <CustomButton value='Get Bills' id="fetch-btn" type="submit"  />
                            {/* <input type="submit" className="fetch" value="All E-Way Bills" id="fetch-btn" /> */}
                        </form>
                    </div>
                </div>
                {/* showing status of ewaybill displayed */}
                <div className='sm:mt-2 md:mt-2'>
                    <h5 id="button-status-notifier" className='text-2xl text-black text-center'></h5>
                </div>
            </div>

            {/* search pannel*/}
            <SearchData tableName='table' />


            {/* showing ewaybill table */}
            <Apihandler checkData={checkArray} arrayName={data} loading={loading} getUser={gst} user={user}/>

        </>
    );
}


export { FormSection };