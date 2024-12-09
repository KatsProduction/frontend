import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuItem, Select, FormControl, InputLabel, Card, CardContent } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';

export default function Company() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [company, setCompany] = React.useState('');
    const [id, selectedID] = useState("");
  

    const handleChange = (event) => {
       setCompany(event.target.value);
      const id =  data.map((value, index) => {
            if (value.Company === event.target.value) {
               return value.id;
            }
        });
        
        navigate('/financialYear', { state: { cmp_name:event.target.value,id:id} });

    };
    useEffect(() => {

        axios.get(`${import.meta.env.VITE_APP_BASE_URL}/listCompany`,{withCredentials:true})
            .then(response => {
                // console.log(response.data.cmp_list);
                setData(response.data.cmp_list);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className='flex items-center justify-center w-full h-screen'>
                <Card style={{ width: 700, padding: 15,boxShadow:'-5px 0px 10px rgba(204, 204, 204, 0.3), 5px 0 10px rgba(204, 204, 204, 0.3), 0 5px 10px rgba(204, 204, 204, 0.3)' }}>
                    <CardContent style={{ textAlign: 'center', padding: '20px 20px 0 20px' }}>
                        <BusinessIcon style={{ fontSize: 40, color: '#4dabf5' }} />
                        {/* <h1>Select Company</h1> */}
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel>Select company</InputLabel>
                            <Select value={company} onChange={handleChange} label="Select company">
                                {
                                    data.map((value, index) => (
                                        <MenuItem key={index} value={value.Company} className='cursor-pointer'>{value.Company}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>


            </div>




        </>
    )
}
