import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({onFileData}) {
  const  [fileName,setFileName] = React.useState("Upload");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming you want to read the first sheet only
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Call the function passed as a prop with the parsed data
        // console.log(jsonData);
        onFileData(jsonData,file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{marginLeft:'15px',height:'49px',marginTop:'8px',  backgroundColor:'#178D56',borderRadius:'11px',minWidth:'80px',width:'150px'}}
      className='hover:!bg-[#30aa71]'
    >
    <span>{fileName}</span>
      <VisuallyHiddenInput type="file"   accept=".xlsx,.xls"  onChange={handleFileUpload}/>
    </Button>
    </div>
  );
}
