import React, { useState, useEffect } from 'react'
import './../css/APICount.css';
import axios from 'axios';
import Datepicker from './optional/Datepicker';
import CustomButton from './optional/CustomButton';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';
import DataTable from './optional/DataTable';


export default function APICount() {
  const [apiCount, setApiCount] = useState('');
  const [startDate, setstartDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth() >= 9 ? new Date().getMonth() + 1 : '0' + Number(new Date().getMonth() + 1)}-${new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate()}`);
  const [endDate, setendDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth() >= 9 ? new Date().getMonth() + 1 : '0' + Number(new Date().getMonth() + 1)}-${new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate()}`);


  const [loading, setLoading] = useState(false);
  const [checkArray, setIsArray] = useState(false);


  async function count_api_hit(e) {
    e.preventDefault();
    setLoading(false);
    try {
      setLoading(true);
      // Validate input dates
      if (!startDate || !endDate) {
        alert('Start date and end date are required');
        return;
      }

      // Optionally set loading state here, if applicable
      // setLoading(true);

      const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_APP_BASE_URL}/api/count`,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        data: {
          fromDate: startDate,
          toDate: endDate,
        },
      });

      console.log(response.data);
      if (Array.isArray(response.data.out)) {
        setIsArray(true);
        setApiCount(response.data.out);
        if (response.data.out.length === 0) {
          setIsArray(false);
          alert('No Data Found');
        }
      } else {
        setApiCount('');
        setIsArray(false);
      }

    } catch (error) {
      setIsArray(false);
      setLoading(false);
      console.error('Error fetching API count:', error);
      if (error.response.data.status == 401) {
        alert('Session Expired');
      } else if (error.response.data.status == 500) {
        alert('Internal Server Error');
      } else if (error.response.data.status == 404) {
        alert('No Record Present');
      } else {
        alert('something went wrong');
      }
      // Optionally, set an error state here to display to the user
    } finally {
      setLoading(false);
    }
  }


  // finding gsin number
  const getGstAndUser = async () => {
    var element;
    if (document.cookie !== "") {
      // cookie exist
      const cookie_array = document.cookie.split(';');
      // checking cookie with name token
      for (let index = 0; index < cookie_array.length; index++) {
        if (cookie_array[index].split('=')[0].trim() === 'token') {
          element = cookie_array[index];
          break;
        }
      }
      // if cookie with name token is present verfiy the token
      if (element.split('=')[0].trim() === 'token') {
        // token verification start
        try {
          const token = element.split('=')[1];
          const result = await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_APP_BASE_URL}/verifytoken`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: { token: token }
          });
          return result.data;
        } catch (err) {
          console.log('token verify error' + err);
          return false;
        }

      } else {
        // some other name cookie exist
        return false;
      }
    } else {
      // cookie not exist
      return false;
    }

  }
  const handleFromDate = (e) => {
    let year = e.$y;
    let month = e.$M >= 9 ? e.$M + 1 : '0' + Number(e.$M + 1);
    let date = e.$D >= 10 ? e.$D : '0' + Number(e.$D);
    setstartDate(`${year}-${month}-${date}`);
    console.log(`${year}-${month}-${date}`);
  }

  const handleToDate = (e) => {
    let year = e.$y;
    let month = e.$M >= 9 ? e.$M + 1 : '0' + Number(e.$M + 1);
    let date = e.$D >= 10 ? e.$D : '0' + Number(e.$D);
    setendDate(`${year}-${month}-${date}`);
    console.log(`${year}-${month}-${date}`)
  }

  return (
    <>
      <div className='api-pannel  sm:w-full md:w-[82%] flex-grow-[2]'>

        <div className='p-8 flex flex-col items-start justify-start'>
          <h1 className='text-blue-600 font-semibold text-3xl py-2 font-poppins mr-2'>API COUNT</h1>
          <form autoComplete='off' className='w-full  h-18  py-4  flex  items-center justify-start' onSubmit={count_api_hit}>
            <Datepicker onData={handleFromDate} label='From Date' marginLeft='0px' top='0px' />
            <Datepicker onData={handleToDate} label='To Date' top='10px' />
            <CustomButton marginLeft='8px' type='submit' value='Search' />
          </form>
        </div>

          <div className='w-full px-8 mt-6'>
          {loading ? (<Box display="flex" justifyContent="center" alignItems="center" height="300px" width="97%" marginX="auto">
            <CircularProgress />
          </Box>) : checkArray ? (<DataTable jsonData={apiCount} />) : null}
          </div>
      </div>
    </>
  )
}
