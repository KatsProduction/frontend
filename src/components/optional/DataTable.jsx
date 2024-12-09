import * as React from 'react';
import Box from '@mui/material/Box';
import excel_icon from './../../assets/excel_icon.png'
import * as XLSX from 'xlsx/xlsx';
import { DataGrid } from '@mui/x-data-grid';

// Export data to Excel
const exportToExcel = (headers, rows, keyMaker) => {
  // 1. Create a new sheet with the data and headers
  const excelData = [headers.map(header => keyMaker(header)), ...rows.map(row => headers.map(header => row[header]))];

  // 2. Convert to Excel format
  const worksheet = XLSX.utils.aoa_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 3. Export to file
  XLSX.writeFile(workbook, 'table_data.xlsx');
};



export default function DataGridDemo({ jsonData }) {

  if (!jsonData) {
    return null;
  }


  // Function to format date fields and split from 'T'
  const createData = (dataObj, headers, index) => {

    return headers.reduce((acc, header) => {
      if ([
        'Registration_Date',
        'Fitness_Valid_Upto',
        'Insurance_Valid_Upto',
        'PUCC_Upto',
        'National_Permit_Upto',
        'Permit_Upto',
        'Permit_Valid_From',
        'dob',
        'doe',
        'doi',
        'transport_doe',
        'transport_doi',
        'Expiry_Date'
      ].includes(header)) {
        acc[header] = dataObj[header] ? dataObj[header].split('T')[0] : ''; // format date
      }
      else if ([
        'toll_txn_datetime',
        'txn_post_time',
        'require_time',
      ].includes(header)) {
        const d = new Date(dataObj[header]);
        acc[header] = d.toLocaleString();
      } else {
        acc[header] = dataObj[header] || " "; // handle empty values
      }
      return acc;
    }, { id: index + 1 });
    // Keep an id field for DataGrid
  };




  // Function to capitalize headers
  const keyMaker = (key) => {
    const split_key = key.split('_');
    return split_key.map(value => value.charAt(0).toUpperCase() + value.slice(1)).join(' ');
  };


  // List of keys to exclude
  const excludeKeys = ['Date_Created', 'createdDate', 'udf2', 'walletId', 'udf5', 'udf3', 'acqId', 'merchantId', 'reqSource',
    'txnReconDate', 'udf1', 'narration', 'Offense_Details_List'];
  const widthKeys = ['Document_Type', 'veh_no', 'Expiry_Date'];
  // Dynamically generate columns based on the first object in jsonData
  const columns = jsonData.length > 0
    ? Object.keys(jsonData[0])
      .filter((key) => !excludeKeys.includes(key))
      .map((key) => ({
        field: key,
        headerName: keyMaker(key),
        width: widthKeys.includes(key) ? 294.4: 200
      }))
    : [];
  // console.log(columns);
  // Array of headers for rows
  const headers = columns.map(col => col.field);
  // console.log(headers);

  // Generate rows dynamically using createData
  const rows = jsonData.map((dataObj, index) => { return createData(dataObj, headers, index) });
  // console.log(rows);

  const paginationModel = { page: 0, pageSize: 25 };

  return (
    <>
      <div className='flex items-center justify-end p-2'>
        <img title="Export" src={excel_icon} className="export w-6 h-6 cursor-pointer mix-blend-multiply border-none transition duration-[0.3s]" id="export-btn" onClick={() => { exportToExcel(headers, rows, keyMaker) }} />
      </div>
      {/* #847bff */}
      <Box sx={{ height: '360px', width: '100%', overflow: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[25, 50, 75]}
          getRowId={(row) => row.id} // Make sure each row has a unique ID
          hideFooterSelectedRowCount={true}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#847bff', // Change to your desired color
              color: '#fff', // Change text color if needed
            },
            '& .MuiDataGrid-columnHeaders': {
              '& .MuiDataGrid-row--borderBottom.css-yrdy0g-MuiDataGrid-columnHeaderRow': {
                backgroundColor: '#847bff', // Style for the nested row with borderBottom class
              },
            },
           
          }}

        />
      </Box>
    </>
  );
}
