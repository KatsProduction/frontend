import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { MenuItem, Select, FormControl, InputLabel, Card, CardContent } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';

export default function FinancialYear() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState([]);
    const [FY, setFY] = useState('');
    const { cmp_name, id } = location.state || {};

    const requestSender = () => {
        axios.post(`${import.meta.env.VITE_APP_BASE_URL}/listFinanceYear`, { id: id },{withCredentials:true})
            .then(response => {
                console.log(response.data.finance_list);
                setData(response.data.finance_list);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {

        requestSender();

    }, []);



    const handleChange = (event) => {
        setFY(event.target.value);
       const db_name =  data.map((value, index) => {
            if (value.FY === event.target.value) {
               return value.dbname;
            }
        });

        navigate('/login', { state: { selected_financial_year: event.target.value, db_name: db_name } });

    };

    return (
        <>
            <div className='flex items-center justify-center w-full h-screen'>
                <Card style={{ width: 600, padding: 15,boxShadow:'-5px 0px 10px rgba(204, 204, 204, 0.3), 5px 0 10px rgba(204, 204, 204, 0.3), 0 5px 10px rgba(204, 204, 204, 0.3)'  }}>
                    <CardContent style={{ textAlign: 'center', padding: '20px 20px 0 20px' }}>
                        <BusinessIcon style={{ fontSize: 40, color: '#4dabf5' }} />
                        <h1>{`Financial Year [${cmp_name}]`}</h1>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel>Select Year</InputLabel>
                            <Select value={FY} onChange={handleChange} label="Select Year">
                                {
                                    data.map((value, index) => (
                                        <MenuItem key={index} value={value.FY} className='cursor-pointer'>{value.FY}</MenuItem>
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
