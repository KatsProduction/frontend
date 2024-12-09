import { React, useState } from 'react';
import LoginPic from './../assets/loginpic.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Spinner } from './../components/optional/Spinner';
import '../css/Login.css';
import { useLocation } from 'react-router-dom';
import CustomButton from './optional/CustomButton';


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordStatus, setpasswordVisible] = useState(false);
    const [otp, setOTP] = useState('');
    const [otpStatus, setotpStatus] = useState('');
    const [checkVerifyStatus, setVerifyStatus] = useState(true);

    const location = useLocation();

    const { selected_financial_year, db_name } = location.state || {}


    const navigate = useNavigate();

    // Define the restricted characters
    const restrictedCharacters = ['"', "'", ';', '=', '-', '/'];


    // capture status of data loaded or not
    const [loading, setLoading] = useState(false);

    // alert message
    function showToast(message) {
        let toast = document.createElement('div');
        toast.classList.add('toast-container');
        toast.innerHTML = message;
        let toastBox = document.getElementById('toastBox');
        toastBox.appendChild(toast);
        setTimeout(() => { toast.remove() }, 4000);
    }


    // Function to handle input key press
    const handleKeyDown = (event) => {
        // Get the key value
        const { key } = event;

        // Prevent input if key is one of the restricted characters
        if (restrictedCharacters.includes(key)) {
            event.preventDefault(); // Prevents the character from being typed
        }
    };


    const handleInput = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_APP_BASE_URL}/login`,
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: false,
                data: {
                    username: username,
                    password: password,
                    db_name: db_name[0],
                    otp: otp
                }
            });
            const output = await result.data;
            console.log(output);
            setLoading(false);

            // successful login
            if (output.status === 200) {
                console.log('matched');
                let date = new Date();
                date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // 24 hrs in milliseconds
                let expires = "expires=" + date.toUTCString();

                // Set the cookie with the key `username` and value `JohnDoe`
                document.cookie = "token=" + output.token + ";" + expires + ";path=/";
                navigate('/transport', { state: location.state });

            }
        }
        catch (error) {
            setLoading(false);
            console.log(error);
            // if (error.message.indexOf("Cannot read properties of undefined (reading '0')") !== -1) {
            //     alert('please login again');
            //     navigate('/');
            // }
            // if (error.response.data.status == 500) {
            //     // let errorMessage = `<i class='fa-solid fa-circle-xmark error'> </i> ${error.response.data.msg}`;
            //     // showToast(errorMessage);
            //     navigate('/');

            // } else {
            //     console.log(error.response.data.msg);
            //     let errorMessage = `<i class='fa-solid fa-circle-xmark error'> </i> ${error.response.data.msg}`;
            //     showToast(errorMessage);
            // }
        }

    }

    const showHidePassword = () => {
        setpasswordVisible(!passwordStatus);
    }



    const handleOTP = async (e) => {
        try {
            if (username !== "" && password !== "") {

                const response = await axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_APP_BASE_URL}/otp`,
                    data: { username: username, password: password, db_name: db_name[0] },
                    withCredentials: true
                });
                const output = response.data;
                if (output.status == 200) {
                    let successMessage = `<i class='fa-solid fa-circle-check check'></i>  Mail sent`;
                    showToast(successMessage);
                }

            } else {
                let errorMessage = `<i class='fa-solid fa-circle-xmark error'> </i> Fields are Empty`;
                showToast(errorMessage);
            }
        } catch (error) {
            console.log(error);
            if (error.status == 500) {
                let errorMessage = `<i class='fa-solid fa-circle-xmark error'> </i> ${error.response.data.msg}`;
                showToast(errorMessage);
            } else {
                console.log(error.response.data.msg);
                let errorMessage = `<i class='fa-solid fa-circle-xmark error'> </i> ${error.response.data.msg}`;
                showToast(errorMessage);
            }
        }

    }

    return (
        <>
            {loading ? (<> <Spinner /> </>) : (<></>)}
            <div className='login'>
                <div className='login-content'>
                    <div className="right-side-container">
                        <img src={LoginPic} className='loginpic max-w-80' />
                    </div>


                    <div className='login-form'>
                        <h2 className='form-title text-3xl'>Log In</h2>
                        <form className='registration-form' id="registration-form" onSubmit={handleInput}>


                            <div className='form-group'>
                                <label htmlFor='UserName'><i class="fa-solid fa-user"></i></label>
                                <input required type="text" name="username" id="user_name" autoComplete="off"
                                    onKeyDown={handleKeyDown} onChange={(e) => { setUsername(e.target.value) }} value={username} placeholder="UserName" />
                            </div>
                            {/* 9311864808 */}

                            <div className='form-group'>
                                <label htmlFor='Password'><i class="fa fa-key"></i></label>
                                <input required type={passwordStatus ? 'text' : 'password'} name="pwd" id="password" autoComplete="off"
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    // onChange={(e) => { setPassword(9311864808) }} 
                                    value={password} placeholder="Password" />
                                {passwordStatus ? (<i class="fa fa-eye cursor-pointer" aria-hidden="true" onClick={showHidePassword} ></i>) : (<i class="fa fa-eye-slash cursor-pointer" onClick={showHidePassword} aria-hidden="true"></i>)}
                            </div>


                            {checkVerifyStatus ? "" : (
                                <>
                                    <div className="form-group form-button">
                                        <input type="button" name="send-otp" id="send-otp" className="otp-submit" value='Send OTP' onClick={handleOTP} />
                                    </div>



                                    <div className='form-group'>
                                        <label htmlFor='OTP'></label>
                                        <input required type="text" name="otp" id="otp" autoComplete="off"
                                            onChange={(e) => { setOTP(e.target.value) }} value={otp} placeholder="Please Enter OTP here" />
                                    </div>


                                </>
                            )}



                            <div className="form-group form-button">
                                {/* <input type="submit" name="login" id="login" className="form-submit" value='Submit' /> */}
                                <CustomButton type='submit' value='Submit' id="login" marginLeft="0px" />
                                <NavLink to="/register" className="signup-image-link text-blue-400">Create an Account</NavLink>
                            </div>

                        </form>
                    </div>

                </div>

            </div>


            <div id="toastBox"></div>
        </>
    )
}

export { Login };
