import './../css/Dashboard.css'
import React, { useEffect, useState } from 'react';
import CardReport from './optional/CardReport';
import DocAttach from './../assets/Doc Attached.png';
import EwayBill from './../assets/E-Way Bill.png';
import Truck from './../assets/Truck Verify.png';
import PieChart from './optional/PieChart';
import axios from 'axios';
import BarAnimation from './BarAnimation';
import ApiLineChart from './optional/APIUsageChart';
import DocExpiring from './optional/DocExpiring';
import CustomModal from './optional/CustomModal';


function Dashboard() {
  const [ewayBillCount, setEwayBillCount] = useState(0);
  const [verifiedTruckCount,setTruckCount] = useState(0);
  const [notVerifiedTruck,setNverifiedTruckCount] = useState(0);
  const [fastTagData, setfastTagData] = useState("");
  const [challanData, setChallanData] = useState("");
  const [apiTracker, setApiTracker] = useState("");
  const [userData,setUser] = useState("");
  const [docSummary,setDocSummary] = useState([]);
  const [docExpiring,setDocExpiring] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // getting gsin number
    countEwaybill();
    countVerifyTruck();
    countDocAttach();
    displayFastagChart();
    displayChallanChart();
    displayAPIChart();
    docExpiringData();
    //  const user_data = getGstAndUser();
    
    getGstAndUser().then(async (user_data) => {
      // await count_api_hit(13);
      console.log(user_data);
      setUser(user_data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);



  async function countEwaybill() {
    const result = await axios({
      method: 'post',
      url: `${import.meta.env.VITE_APP_BASE_URL}/ewaybill/count`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    // console.log(result.data);
    setEwayBillCount(result.data.out.count);
  }

  

  async function countVerifyTruck() {
    const result = await axios({
      method: 'post',
      url: `${import.meta.env.VITE_APP_BASE_URL}/truck/count`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log(result.data);
    setTruckCount(result.data.out.count.Verified_Vehicles);
    setNverifiedTruckCount(result.data.out.count.Unverified_Vehicles);
    // setEwayBillCount(result.data.out.count);
  }

  async function countDocAttach() {
    const result = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_APP_BASE_URL}/challan/attached-document-summary`,
      withCredentials: true,
    });
    setDocSummary(result.data);
  }

  async function count_api_hit(user_id) {
    const result = await axios({
      method: 'post',
      url: `${import.meta.env.VITE_APP_BASE_URL}/api/count`,
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true
      },
      data: { userID: user_id }
    });

  }
  

  const displayFastagChart = async () => {
    const response = await axios({
      method: 'get',
      withCredentials: true,
      url: `${import.meta.env.VITE_APP_BASE_URL}/fastag/data`
    });
    console.log(response.data);
    setfastTagData(response.data.out);
  }


  const displayChallanChart = async () => {
    const response = await axios({
      method: 'get',
      withCredentials: true,
      url: `${import.meta.env.VITE_APP_BASE_URL}/challan/data`
    });
    // console.log(response.data);
    setChallanData(response.data.out);

    // setfastTagData(response.data.out);
  }


  const displayAPIChart = async () => {
    const response = await axios({
      method: 'get',
      withCredentials: true,
      url: `${import.meta.env.VITE_APP_BASE_URL}/api/apiHit`
    });
    console.log(response.data);
    // setChallanData(response.data.out);
    setApiTracker(response.data.out);

    // setfastTagData(response.data.out);
  }
  // countEwaybill();

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
            withCredentials: true,
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

  const getGreeting = () => {
    const currentHour = new Date().getHours(); // Get current hour (0-23)
    
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  

  async function docExpiringData() {
    const result = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_APP_BASE_URL}/doc/expiring`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log(result.data);
    setDocExpiring(result.data.out);
  }

  return (
    <>
      <div className=' dashboard-pannel sm:w-full md:w-[82%] flex-grow-[2] bg-[#f4f4f4] p-2 overflow-auto'>


        {/* Dashboar title */}
        <div className='p-2 px-10 flex justify-between items-center'>
          <div>
            <h1 className='text-xl font-poppins font-medium text-slate-500'>Dashboard</h1>
            <h5 className='text-sm font-poppins font-medium text-black'>Hi {userData === "" ? "" : userData.user.toUpperCase()} {getGreeting()}</h5>
          </div>
          {/* <Drawrr /> */}
        </div>

        {/* cards */}
        <div className='flex justify-between p-8 '>
          <CardReport title='Doc Attached' count='0' image={DocAttach}  documentSummary={docSummary} />
          <CardReport title='E-Way Bill' image={EwayBill} count={ewayBillCount} />
          <CardReport title='Truck Verify' count={verifiedTruckCount}  image={Truck} Nverified={notVerifiedTruck} />
          {/* <CardReport title='DL Verify' count='0' image={Pan} /> */}
        </div>
        {/* cards */}


        <div className='p-1'>

          <div className='flex flex-wrap justify-around '>

            <div class="first-column basis-[45.5%]" >
              <DocExpiring title={'Documents Expiring'} data={docExpiring} />
              <ApiLineChart apiHitData={apiTracker}/>
            </div>

            <div className='second-column basis-[45.5%]'>
              <BarAnimation challanData={challanData} />
              <PieChart title='FasTag' fastTagData={fastTagData} />
            </div>
          </div>
 
        </div>



         <CustomModal />

      </div>
    </>
  );
}

export default Dashboard; 