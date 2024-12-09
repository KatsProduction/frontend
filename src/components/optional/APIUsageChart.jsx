import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography, FormControlLabel, Checkbox, Box,CircularProgress   } from '@mui/material';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const dataset = [
  { MonthYear: 'Sep 2024', API_NAME: 'challan', TotalSource: 1 },
  { MonthYear: 'Sep 2024', API_NAME: 'dl', TotalSource: 1 },
  { MonthYear: 'Sep 2024', API_NAME: 'ewaybill', TotalSource: 4 },
  { MonthYear: 'Oct 2024', API_NAME: 'challan', TotalSource: 1 },
  { MonthYear: 'Oct 2024', API_NAME: 'ewaybill', TotalSource: 7 },
  { MonthYear: 'Oct 2024', API_NAME: 'fastag', TotalSource: 10 },
  { MonthYear: 'Oct 2024', API_NAME: 'rc', TotalSource: 1 },
];




export default function APIUsageChart({apiHitData}) {
console.log(apiHitData);
  
  const [apiloading, setapiLoading] = React.useState(true); // Add loading state

  React.useEffect(() => {
    const timing = setTimeout(() => {
      setapiLoading(false);
    }, 500); // Adjust time as needed

    return () => clearTimeout(timing);
  }, []);


     // Check if fastTagData is defined and contains valid data
     if (!apiHitData) {
      return null;  // Do not render anything if there's no valid data
    }
  
  // Transform the dataset to match the structure for the BarChart
  const formattedData = apiHitData.reduce((acc, item) => {
    const { MonthYear, API_NAME, TotalSource } = item;
  
    if (!acc[MonthYear]) {
      acc[MonthYear] = { MonthYear }
    };
    acc[MonthYear][API_NAME] = TotalSource;
    return acc;
  }, {});
  
  
  
  const chartSetting = {
    // yAxis: [
    //   {
    //     label: 'Total Source',
    //   },
    // ],
    width: 500,
    height: 300,
  };




  const data = Object.values(formattedData);
  return (
    <Card className='min-w-[300px] p-2 bg-white shadow-lg !rounded-lg mt-4'>
      <CardContent>
        <Typography variant="h6"  component="div" sx={{ fontWeight: 'bold', marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className='font-poppins'>API Count Tracker</span>
        </Typography>
        <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {apiloading ? ( // Show loading indicator while loading
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress />
            </Box>
          ) : (
          <BarChart
            dataset={data}
            xAxis={[{ scaleType: 'band', dataKey: 'MonthYear' }]}
            series={[
              { dataKey: 'challan', label: 'Challan' },
              { dataKey: 'dl', label: 'DL' },
              { dataKey: 'ewaybill', label: 'E-Waybill' },
              { dataKey: 'fastag', label: 'Fastag' },
              { dataKey: 'rc', label: 'RC' },
            ]}
            {...chartSetting}
          />
        )}
        </Box>
      </CardContent>
    </Card>
  );
}
