import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './../../css/ewaybill/Heading.css';



const Heading = () => {
    const navigate = useNavigate();
    const [checkAdmin, setStatus] = useState(false);
    const [gpsOption, setOption] = useState("");
    const [user, setUser] = useState("");
    const [gst, setGst] = useState("");
    const [loader, setLoader] = useState(false);


    function closewindow() {
        document.getElementById('alert-fail-message').innerHTML = "";
        document.getElementById('alert-success-message').innerHTML = "";
        const gps_url = document.getElementById('current_gps').value = "";
        const api_key = document.getElementById('current_apikey').value = "";
        const auth_key = document.getElementById('current_authkey').value = "";
        document.getElementById('gps-option').value = "option";
        document.getElementsByClassName('gps-popup')[0].classList.remove('active');
        document.getElementsByClassName('gps-main-container')[0].style.display = "none";
    }

    async function handleSelect(e) {
        try {
            setOption(e.target.value);
            document.getElementById('alert-fail-message').innerHTML = "";
            document.getElementById('alert-success-message').innerHTML = "";
            document.getElementById('current_gps').value = "";
            document.getElementById('current_apikey').value = "";
            document.getElementById('current_authkey').value = "";
            if (e.target.value === 'Wheelseye') {
                document.getElementById('current_gps').removeAttribute('disabled');
                document.getElementById('current_apikey').removeAttribute('disabled');
                document.getElementById('current_authkey').setAttribute('disabled', true);
                const url = `${import.meta.env.VITE_APP_BASE_URL}/api/getTracker?gst=${gst}&user=${user}&option=${e.target.value}`
                const response = await axios({
                    method: 'GET',
                    url: url,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                document.getElementById('current_gps').value = response.data.GPS_URL;
                document.getElementById('current_apikey').value = response.data.TRANS_KEY;
                // document.getElementById('current_authkey').value =response.data.etrans_auth;


            } else if (e.target.value === 'option') {
                document.getElementById('current_gps').setAttribute('disabled', true);
                document.getElementById('current_apikey').setAttribute('disabled', true);
                document.getElementById('current_authkey').setAttribute('disabled', true);
            } else {
                document.getElementById('current_gps').removeAttribute('disabled');
                document.getElementById('current_apikey').removeAttribute('disabled');
                document.getElementById('current_authkey').removeAttribute('disabled');
                const url = `${import.meta.env.VITE_APP_BASE_URL}/api/getTracker?gst=${gst}&user=${user}&option=${e.target.value}`
                const response = await axios({
                    method: 'GET',
                    url: url,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                document.getElementById('current_gps').value = response.data.GPS_URL;
                document.getElementById('current_apikey').value = response.data.TRANS_KEY;
                document.getElementById('current_authkey').value = response.data.AUTH_KEY;
            }
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

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            document.getElementById('alert-fail-message').innerHTML = "";
            document.getElementById('alert-success-message').innerHTML = "";
            const gps_url = document.getElementById('current_gps').value;
            const api_key = document.getElementById('current_apikey').value;
            const auth_key = document.getElementById('current_authkey').value;

            if (gpsOption === 'Wheelseye') {
                const gst_number = gst;
                const admin_user = user;
                const getgps = gpsOption;
                const url = `${import.meta.env.VITE_APP_BASE_URL}/api/tracker?admin_user=${admin_user}&gst_number=${gst_number}&${gpsOption}_tracker=${getgps}&${gpsOption}_url=${gps_url}&${gpsOption}_key=${api_key}`;
                console.log(url);
                setLoader(true);
                const respone = await axios({
                    method: 'GET',
                    url: url,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setLoader(false);
                if (respone.data.message === 'Added') {
                    document.getElementById('alert-success-message').innerHTML = respone.data.message;
                } else {
                    document.getElementById('alert-fail-message').innerHTML = "failed";
                }

            }

            else if (gpsOption === 'etrans') {

                const gps_url = document.getElementById('current_gps').value;
                const api_key = document.getElementById('current_apikey').value;
                const gst_number = gst;
                const admin_user = user;
                const getgps = gpsOption;
                const url = `${import.meta.env.VITE_APP_BASE_URL}/api/tracker?admin_user=${admin_user}&gst_number=${gst_number}&${gpsOption}_tracker=${getgps}&${gpsOption}_url=${gps_url}&${gpsOption}_key=${api_key}&${gpsOption}_auth=${auth_key}`;
                setLoader(true);
                const respone = await axios({
                    method: 'GET',
                    url: url,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setLoader(false);
                if (respone.data.message === 'Added') {
                    document.getElementById('alert-success-message').innerHTML = respone.data.message;
                } else {
                    document.getElementById('alert-fail-message').innerHTML = "failed";
                }
            }
            else {
                document.getElementById('alert-fail-message').innerHTML = "Choose Option";
            }

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


            <div className='gps-main-container bg-gradient-to-r from-cyan-500 to-blue-500'>
                <div className='gps-popup w-2/4  h-fit bg-white p-10 shadow-lg rounded-md'>

                    <form autoComplete="off" onSubmit={(e) => { handleSubmit(e) }}>
                        <div className='gps-close-btn mb-2'><i onClick={closewindow} className='fa fa-window-close' style={{ color: 'black', cursor: 'pointer', display: 'block', textAlign: 'right', fontSize: '25px' }} aria-hidden="true"></i></div>
                        <h1 className="text-center font-semibold text-2xl mb-3 font-Poppin ">GPS Setting</h1>
                        <label for="gps-tracker" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select GPS Tracker</label>
                        <select required onChange={(e) => { handleSelect(e) }} id="gps-option" class="mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="option">Choose Option</option>
                            <option value="Wheelseye">Wheelseye</option>
                            <option value="etrans">Etrans</option>
                        </select>

                        <div className="relative z-0 w-full mb-5 gps_url group">
                            <input type="text" name="currentTracker" id="current_gps" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="Current URL" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">GPS URL</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 api-key group">
                            <input type="text" name="currentapikey" id="current_apikey" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="Current API Key" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">API KEY</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 auth-key group ">
                            <input type="text" name="currentauthkey" id="current_authkey" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required disabled />
                            <label htmlFor="Current Auth Key" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">AUTH KEY</label>
                        </div>

                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button><span className="text-green-800 font-semibold ml-4" id="alert-success-message"></span> <span className="text-red-600 font-semibold ml-4" id="alert-fail-message"></span> {loader ? <i class="fa fa-spinner fa-spin " style={{ fontSize: "24px" }}></i> : <></>}
                    </form>


                </div>
            </div>



        </>
    );
}

export { Heading };