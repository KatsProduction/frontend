import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const VerifyProfile = (props) => {
    // check whether cookie name token is present before displaying profile page

    // received main component
    const { Component } = props;
    const [isLoged, setIsLoged] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


  

    useEffect(() => {
        // checking token cookie 
        verifyToken().then((data) => {
            console.log(data);
            if (data) {
                setIsLoged(true);
                navigate('/transport',{state:location.state});
            } else {
                setIsLoged(false);
                navigate('/');
            };
            // console.log(data);
        }).catch((err) => {
            console.log(err)
        });

    }, []);
    return (
        <>
            {/* <Component /> */}
            {isLoged ? <Component /> : null}
        </>
    );
}

const verifyToken = async () => {
    // this variable store cookie that contain name token
    try {
        var element;
        // cookies present
        console.log(document.cookie);
        if (document.cookie !== "") {
            const cookie_array = document.cookie.split(';');
            // reading all cookie
            for (let index = 0; index < cookie_array.length; index++) {
                // finding cookie with name token
                if (cookie_array[index].split('=')[0].trim() === 'token') {
                    element = cookie_array[index];
                    break;
                }
            }
            // if cookie with name token is present verfiy the token
            if (element.split('=')[0].trim() === 'token') {
                // token verification start
                const token = element.split('=')[1];
                // console.log(token);
                const result = await axios({
                    method: 'POST',
                    url: `${import.meta.env.VITE_APP_BASE_URL}/verifytoken`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true,
                    data: { token: token }
                });
                // it may be true or false
                console.log(result.data);
                return result.data.isLoged;
            } else {
                // some other name cookie is present
                console.log('some other name cookie exist');
                return false;
            }
        } else {
            // cookie not exist
            console.log('cookie not exist');
            return false;
        }
    } catch (err) {
        // error in verifying token
        console.log('token verify error' + err);
        return false;
    }
}
export { VerifyProfile, verifyToken };