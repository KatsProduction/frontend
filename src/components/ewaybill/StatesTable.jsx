import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function StatesTable({ stateManager, Close, code, checkedID }) {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Exit early if either code or checkedID is not available
    if (!code || !checkedID || code.length === 0 || checkedID.length === 0) {
      setOptions([]);
      return;
    }

    const remod_array = code.map((value) => {
      const isChecked = checkedID.find(checkedStatus => checkedStatus.id === value.state_code);
      return { ...value, checked: isChecked ? isChecked.Include_Waybill === 1 : false };
    });

    setOptions(remod_array);
  }, [code, checkedID]);

  const handleParentChange = (event) => {
    const allChecked = event.target.checked;
    setOptions(prevOptions =>
      prevOptions.map(option => ({ ...option, checked: allChecked }))
    );
  };

  const handleChildChange = (id) => (event) => {
    const updatedOptions = options.map(option =>
      option.state_code === id ? { ...option, checked: event.target.checked } : option
    );
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedOptions = options.filter(option => option.checked);
    const unselectedOptions = options.filter(option => !option.checked);
    const mergedOptions = [
      ...selectedOptions.map(option => ({ id: option.state_code, Include_Waybill: 1 })),
      ...unselectedOptions.map(option => ({ id: option.state_code, Include_Waybill: 0 }))
    ];
    const submissionData = {
      selectedStates: mergedOptions,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/submit-states`, submissionData, { withCredentials: true });
      document.getElementById('setting-success-message').innerHTML = 'Saved';
      setTimeout(() => Close(), 3000);
    } catch (error) {
      console.error(error);
      document.getElementById('setting-fail-message').innerHTML = 'Error saving data';
    } finally {
      setLoading(false);
    }
  };

  // Prevent dialog from opening if code and checkedID are not present
  const isDialogOpen = stateManager && options.length > 0;
  console.log(isDialogOpen);

  // Display the options in a grid format
  const columnCount = 3;
  const columnLength = Math.ceil(options.length / columnCount);
  const columns = Array.from({ length: columnCount }, (_, index) =>
    options.slice(index * columnLength, (index + 1) * columnLength)
  );

  return (
   
    <Dialog
      open={isDialogOpen}
      onClose={Close}
      PaperProps={{ component: 'form', className: 'overflow-x-hidden max-w-[75%] custom-dialog' }}
    >
      <h1 className='text-center p-8 text-xl font-poppins'>State Settings</h1>

      {options.length > 0 && (
        <FormControlLabel
          label="Select All"
          control={
            <Checkbox
              checked={options.every(option => option.checked)}
              onChange={handleParentChange}
            />
          }
          className="w-full p-4"
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        {columns.map((column, colIndex) => (
          <Box key={colIndex} sx={{ margin: 1 }}>
            {column.map(option => (
              <FormControlLabel
                key={option.state_code}
                label={`${option.state_name_c} (${option.state_code})`}
                control={
                  <Checkbox
                    checked={option.checked}
                    onChange={handleChildChange(option.state_code)}
                  />
                }
                sx={{ display: 'block' }}
              />
            ))}
          </Box>
        ))}
      </Box>

      {options.length > 0 && (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
        <span className="text-green-800 font-semibold ml-4 mt-1" id="setting-success-message"></span>
        <span className="text-red-600 font-semibold ml-4 mt-1" id="setting-fail-message"></span>
        {loading && <i className="fa fa-spinner fa-spin mt-1" style={{ fontSize: "24px" }}></i>}
      </Box>
      )}
    </Dialog>
  );
}
