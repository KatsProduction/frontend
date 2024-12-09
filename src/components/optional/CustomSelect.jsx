import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CustomSelect({selectBankOption}) {
    const [bank, setBank] = React.useState('');

    // const handleChange = (event) => {
    //     setBank(event.target.value);
    //     selectBankOption(event.target.value);
    // };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 140}}>
                <InputLabel id="demo-simple-select-helper-label" sx={{marginTop:'5px'}}>Select Bank</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={bank}
                    label="Select Bank"
                    required
                    onChange={(event)=>{setBank(event.target.value); selectBankOption(event.target.value)}}
                    sx={{height:'49px',marginTop:'8px'}}
                >
                    {/* <MenuItem value="">
                        <em>None</em>
                    </MenuItem> */}
                    <MenuItem value={'HDFC'}>HDFC</MenuItem>
                    <MenuItem value={'ICICI'}>ICICI</MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}
