import React, { useEffect, useState,useRef } from 'react';
// import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import dashboard from './../assets/dashboard.png';
import docattach from './../assets/docattach.png';
import docsearch from './../assets/docsearch.png';
import deliveryTruck from './../assets/delivery-truck.png';
import ewaybill from './../assets/ewaybill.png';
import fasttag from './../assets/fasttag.png';
import accountverify from './../assets/AccountVerify.png';
import challan from './../assets/trafficChallan.png';
import logout from './../assets/logout.png';
import Dashboard from './Dashboard';
import Fasttag from './Fasttag';
import { Ewaybill } from './Ewaybill';
import Truckverify from './Truckverify';
import Challan from './Challan';
import DLsearch from './DLsearch';
import Aadhar from './Aadhar';
import Pan from './Pan';
import GST from './GST';
import Alert from './optional/Alert';
import logo from './../assets/logo.jpeg'
import AccountVerify from './AccountVerify';
import APICount from './APICount';


function Transport() {
  const [activeComponent, setActiveComponent] = useState(null);


  const [alertOpen, setAlertOpen] = useState(true);


  const handleCloseAlert = () => {
    setAlertOpen(false);
    setActiveComponent('Dashboard');
  };


  var sidebar;
  useEffect(() => {
    sidebar = document.getElementsByClassName("sidebar")[0];
  }, []);

  // minimize and maximize navbar
  const handleClick = () => {
    const icon = document.getElementById('hamberger_icon');
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.toggle("close");
    if (sidebar.className.indexOf('close') == -1) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  }

  // handle menu click
  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  // render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'DocAttach':
        return <Dashboard />;
      case 'DL Search':
        return <DLsearch />;
      case 'Truckverify':
        return <Truckverify />;
      case 'Ewaybill':
        return <Ewaybill />;
      case 'PanVerify':
        return <Dashboard />;
      case 'Challan':
        return <Challan />;
      case 'Fasttag':
        return <Fasttag />;
      case 'AccountVerify':
        return <AccountVerify />;
      case 'Aadhar':
        return <Aadhar />;
      case 'Pan':
        return <Pan />;
      case 'GST':
          return <GST />;
      case 'API':
        return <APICount />;
      case 'Logout':
        return    <Alert open={alertOpen} onClose={handleCloseAlert} />;
      default:
        return <Dashboard />;
    }
  };

  // handle mobile and desktop navbar
  function handleMenu() {
    const menu = document.getElementById('menu');
    const icon = document.getElementById('hamberger_icon');
    const body = document.getElementsByTagName('body')[0];

    menu.classList.toggle('active');
    if (icon.className.indexOf('fa-bars') == -1) {
      body.style.overflowY = "auto";
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
    else {
      body.style.overflowY = "hidden";
      icon.classList.add('fa-xmark');
      icon.classList.remove('fa-bars');
    };
  }


  return (
    <>

      <div className='app  sm:flex-col  md:flex-row'>

        <header className='sidebar relative md:w-64 md:h-full sm:bg-bgmenu '>
          <div className='flex sm:items-center sm:justify-between sm:px-3 sm:py-3 sm:shadow-md md:shadow-none md:justify-center bg-bgmenu  '>
            {/* logo */}
            <div className='h-14'>
              <img src={logo} className="h-full max-w-full" />
              {/* <span className='rounded-md text-black bg-white sm:py-3 sm:px-4 font-extrabold  font-poppins  md:py-2 md:px-3'>T</span> */}
            </div>

            {/* brand name */}
            {/* <span className='bord text pl-3 font-bold text-3xl text-white font-poppins sm:hidden md:block'>LOGO</span> */}

            {/* hamberger icon */}
            <button className='z-[7000]  md:hidden' id="nav-dialog">
              <i onClick={handleMenu} id="hamberger_icon" className="fa-solid fa-bars p-1 px-2  text-white  text-xl  border-x-2 border-y-2 border-white border-solid cursor-pointer"></i>
            </button>
          </div>

          {/* min and max icon */}
          <i onClick={handleClick} className="fa-solid fa-chevron-right absolute  cursor-pointer  px-2 py-1 top-24 -right-3 transform translate-y-[-50%]  bg-menus font-extrabold text-white border-x-2 border-y-2 border-solid border-white rounded-full  text-md sm:hidden md:block md:z-50"></i>


          {/* navbar */}
          <nav id="menu" className='flex sm:items-end sm:justify-end md:justify-center sm:flex-col sm:absolute sm:top-0 sm:left-0 sm:w-full sm:h-screen sm:z-[5000] sm:bg-bgmenu   sm:translate-x-[100%]  sm:transition-all sm:duration-[0.5s]  sm:ease-linear  sm:opacity-0 sm:invisible sm:pointer-events-none  md:h-[88.3%] md:w-full  md:static md:opacity-100 md:transition-none md:translate-x-0 md:pointer-events-auto md:visible'>
            <ul className=' sm:w-full sm:h-[90%] flex flex-col sm:justify-start  md:h-full md:justify-start md:px-2 md:py-5'>

              <Link to="#" onClick={() => handleMenuClick('Dashboard')} className='w-full sm:basis-[15%]  md:basis-[120px]'>
                <li className='sm:pl-4 sm:h-full flex items-center justify-start bg-bgmenu text-white hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={dashboard} className=' w-6 h-6' />
                  <span className='sm:pl-2 text font-medium text-lg font-work'>Dashboard</span>
                </li>
              </Link>
              {/* http://13.126.159.250:4453/ */}
              <Link to="http://13.126.159.250:4453/" onClick={() => handleMenuClick('Dashboard')} className=' w-full  sm:basis-[15%]  md:basis-[120px]'>
                <li className='sm:pl-4  sm:h-full flex items-center justify-start bg-bgmenu text-white hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={docattach} className=' w-6 h-6' />
                  <span className='sm:pl-2 text font-medium text-lg font-work '>Doc Attach</span>
                </li>
              </Link>

       

              <Link to="#" onClick={() => handleMenuClick('Ewaybill')} className='w-full   sm:basis-[15%]  md:basis-[120px]'>
                <li className='sm:pl-4 sm:h-full flex items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black    cursor-pointer md:border-b-[1px] md:border-solid md:md:border-b-slate-500'>
                  <img src={ewaybill} className=' w-6 h-6' />
                  <span className='sm:pl-2 text font-medium text-lg font-work '>E-Way Bill</span>
                </li>
              </Link>


              <Link to="#" onClick={() => handleMenuClick('Challan')} className='w-full   sm:basis-[15%]  md:basis-[120px]'>
                <li className='sm:pl-4 sm:h-full flex items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={challan} className=' w-6 h-6' />
                  <span className='sm:pl-2 text font-medium text-lg font-work'>Traffic Challan</span>
                </li>
              </Link>

              <Link to="#" onClick={() => handleMenuClick('Fasttag')} className='w-full   sm:basis-[15%]  md:basis-[120px]'>
                <li className=' sm:pl-4 flex sm:h-full items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={fasttag} className=' w-6 h-6' />
                  <span className='sm:pl-2 text font-medium text-lg font-work'>Fastag</span>
                </li>
              </Link>


              <Link to="#" onClick={() => handleMenuClick('DL Search')} className=' w-full  sm:basis-[15%]  md:basis-[120px]'>
                <li className='sm:pl-4  sm:h-full flex items-center justify-start bg-bgmenu text-white hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={docattach} className=' w-6 h-6' />
                  <span className='sm:pl-2 text font-medium text-lg font-work '>DL Search</span>
                </li>
              </Link>


              <Link to="#" onClick={() => handleMenuClick('Truckverify')} className='w-full   sm:basis-[15%]  md:basis-[120px]'>
                <li className='sm:pl-4 sm:h-full flex  items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black    cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={deliveryTruck} className=' w-6 h-6' />
                  <span className='sm:pl-2 text font-medium text-lg font-work '>Truck Verify</span>
                </li>
              </Link>


              <Link to="#" onClick={() => handleMenuClick('Pan')} className='w-full   sm:basis-[15%]  md:basis-[120px]'>
                <li className='sm:pl-4  sm:h-full flex  items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={docsearch} className=' w-6 h-6' />

                  <span className='sm:pl-2 text font-medium text-lg font-work '>Pan Verify</span>
                </li>
              </Link>


              {/* <Link to="#" onClick={() => handleMenuClick('Aadhar')} className='w-full   sm:basis-[15%]  md:basis-[120px]'>
                <li className=' sm:pl-4 flex sm:h-full items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={logout} className=' w-6 h-6' />
                  <span className=' pl-2 text font-medium text-lg font-work '>Aadhar Verify</span>
                </li>
              </Link> */}

              {/* <Link to="#" onClick={() => handleMenuClick('GST')} className='w-full   sm:basis-[15%]  md:basis-[120px]'>
                <li className=' sm:pl-4 flex sm:h-full items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={logout} className=' w-6 h-6' />
                  <span className=' pl-2 text font-medium text-lg font-work '>GST Verify</span>
                </li>
              </Link> */}

              {/* <Link to="#" onClick={() => handleMenuClick('AccountVerify')} className='w-full   sm:basis-[15%]  md:basis-[120px]'>
                <li className=' sm:pl-4  flex sm:h-full  items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={accountverify} className=' w-6 h-6' />
                  <span className='pl-2 text font-medium text-lg font-work'>Account Verify</span>
                </li>
              </Link> */}

              <Link to="#" onClick={() => handleMenuClick('API')} className='w-full sm:basis-[15%]  md:basis-[120px]'>
                <li className=' sm:pl-4  flex sm:h-full  items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={accountverify} className='w-6 h-6' />
                  <span className='pl-2 text font-medium text-lg font-work'>API Count</span>
                </li>
              </Link>


              <Link to="#" onClick={() =>{ handleMenuClick('Logout');setAlertOpen(true)}} className='w-full   sm:basis-[15%]  md:basis-[120px]'>
                <li className=' sm:pl-4 flex sm:h-full items-center justify-start text-white bg-bgmenu hover:text-amber-200 hover:bg-black   cursor-pointer md:border-b-[1px] md:border-solid md:border-b-slate-500'>
                  <img src={logout} className=' w-6 h-6' />
                  <span className=' pl-2 text font-medium text-lg font-work '>Logout</span>
                </li>
              </Link>


            </ul>
          </nav>

        </header>


        {renderComponent()}
      
      </div>



    </>
  )
}

export { Transport };
