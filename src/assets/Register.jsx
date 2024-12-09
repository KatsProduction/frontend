import { React, useState } from "react";
import Signpic from './../assets/signpic.svg';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Spinner } from "./Spinner";
import '../css/Register.css';
const Register = () => {

            // capture status of data loaded or not
            const [loading, setLoading] = useState(false);


    // hold user registration detail
    const [user, setUser] = useState({
        companyName: "",
        fullname: "",
        useremail: "",
        mobileNumber: "",
        gst: ""
    });


    // storing user registration data
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        if (name == "gst") {
            value = value.toUpperCase();
            setUser({ ...user, [name]: value });
        } else {
            setUser({ ...user, [name]: value });
        }
    }

    // hold all error in registration form
    let FormError = {};

    const validationForm = () => {

        if (!user.companyName.trim()) {
            FormError.companyName = 'Company Name is Required'
        };
        if (!user.fullname.trim()) {
            FormError.fullname = 'Full Name is Required'
        };
        if (!user.mobileNumber.match(/^\d{10}$/)) {
            FormError.mobileNumber = 'Mobile Number Not Valid'
        };
        if (!user.gst.trim()) {
            FormError.gst = 'GST Number is Required'
        } else {
            if (!user.gst.match(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{15}$/)) {
                FormError.gst = 'incorrect GST'
            }
        };
        if (!user.useremail.trim()) {
            FormError.useremail = 'Invalid email format.';
        }

        return Object.keys(FormError).length === 0;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (validationForm()) {
                // if no error present
                // condition to send data to server
                console.log(`${import.meta.env.VITE_APP_BASE_URL}/userregister`);
                setLoading(true);
                const result = await axios({
                    method: 'POST',
                    // url: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/userregister`,
                    // url: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/userregister`,
                    url: `${import.meta.env.VITE_APP_BASE_URL}/userregister`,
                    withCredentials:true,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: user
                });
                const output = await result.data;
                setLoading(false);
                
                if (output.message === "Internal Server Error") {
                    
                    let errorMessage = `<i class='fa-solid fa-circle-xmark error'> </i> ${result.data.message}`;
                    showToast(errorMessage);
                }
                if (output.message === "Successfully Registered") {
                    let successMessage = `<i class='fa-solid fa-circle-check check'></i> ${result.data.message}`;
                    showToast(successMessage);
                }
                if (output.message === "data already exist") {
                    let errorMessage = `<i class='fa-solid fa-circle-exclamation exclamation'></i> ${result.data.message}`;
                    showToast(errorMessage);
                }
            }
            else {
                // if error present
                Object.keys(FormError).forEach((key) => {
                    const value = FormError[key];
                    let errorMessage = `<i class='fa-solid fa-circle-xmark error'> </i> ${value}`;
                    showToast(errorMessage);
                });
            }
        } catch (e) {
            console.log( e);
        }
    }

    // alert notification function
    function showToast(message) {
        let toast = document.createElement('div');
        toast.classList.add('toast-container');
        toast.innerHTML = message;
        let toastBox = document.getElementById('toastBox');
        toastBox.appendChild(toast);
        setTimeout(() => { toast.remove() }, 4000);
    }

    return (
        <>
         { loading ? (<> <Spinner /> </>) : (<></>)}
            {/* main container */}
            <div className='signup'>
                {/*  center div */}
                <div className='signup-content'>
                    <div className='signup-form'>
                        <h2 className='form-title'>Sign up</h2>

                        <form className='registration-form' id="registration-form" onSubmit={handleSubmit}>
                            {/* company name */}
                            <div className='form-group'>
                                <label htmlFor='Company Name'><i class="fa-solid fa-building"></i></label>
                                <input required type="text" name="companyName" id="company_name" autoComplete="off"
                                    onChange={handleInput}
                                    placeholder="Your Company Name" />
                            </div>
                            {/* user name */}
                            <div className='form-group'>
                                <label htmlFor='Contact Name'><i class="zmdi zmdi-account"></i></label>
                                <input required type="text" name="fullname" id="contact_person" autoComplete="off"
                                    onChange={handleInput} value={user.fullname}
                                    placeholder="Your Name" />
                            </div>
                            {/* mobile number */}
                            <div className='form-group'>
                                <label htmlFor='Mobile Number'><i class="zmdi zmdi-phone"></i></label>
                                <input required type="text" name="mobileNumber" id="mobile_number" autoComplete="off"
                                    onChange={handleInput} value={user.mobileNumber}
                                    placeholder="Mobile Number" maxLength={10} />
                            </div>

                            {/* email */}
                            <div className='form-group'>
                                <label htmlFor='Email'><i class="zmdi zmdi-email"></i></label>
                                <input required type="email" name="useremail" id="email" autoComplete="off"
                                    onChange={handleInput} value={user.email}
                                    placeholder="Email" />
                            </div>

                            {/* gst */}
                            <div className='form-group'>
                                <label htmlFor='GST'><i class="fa-solid fa-percent"></i></label>
                                <input required type="text" name="gst" id="gst_number" autoComplete="off"
                                    onChange={handleInput} value={user.gst} 
                                    placeholder="GST Number" maxLength={15} />
                            </div>

                            {/* submit button */}
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" />
                                <NavLink to="/" className="login-image-link text-blue-500">I am Already Register</NavLink>
                            </div>

                        </form>
                    </div>
                    <div className="right-side">
                        <img src={Signpic} className='signpic' />
                    </div>
                </div>

            </div>


            {/* notification element */}
            <div id="toastBox"></div>
        </>)
}
export { Register };