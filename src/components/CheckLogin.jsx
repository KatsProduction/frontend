import { verifyToken } from "./VerifyProfile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const CheckLogin = (props) => {
  // received login component
  const { Component, Component2 } = props;
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [isLoged, setIsLoged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { selected_financial_year, db_name} = location.state || {}
  console.log(location.state);

  useEffect(() => {
    // condition based on token verification output
    verifyToken().then((data) => {
      if (!data) {
        // if not verified
        // console.log(data);
        setIsLoged(false);
        setIsLoading(false);
        navigate('/login', { state: location.state });
      } else {
        // if verified
        console.log(data);
        setIsLoading(false);
        setIsLoged(true);
        navigate('/transport');
      };
    }).catch((err) => {
      console.log(err)
      setIsLoading(false); // Handle error and stop loading
    });

  }, []);


    return (
      <>
        {isLoged ? null : <Component />}
      </>
    );
  
}

export { CheckLogin }