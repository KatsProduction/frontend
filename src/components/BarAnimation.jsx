import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent,CircularProgress  } from '@mui/material';

const highlightScope = {
  highlight: 'series',
  fade: 'global',
};




export default function BarAnimation({challanData}) {
  // console.log(challanData);

    // Don't render the component if challanData is not present
    if (!challanData || !challanData.disposedArray || !challanData.activeArray || !challanData.monthNameArray) {
      return null;
    }
  const [seriesNb, setSeriesNb] = React.useState(2);
  const [itemNb, setItemNb] = React.useState(8);
  const [loading, setLoading] = React.useState(true); // Add loading state

  // Add colors to each series
const series = [
  {
    label: 'Disposed',
    data: challanData.disposedArray,
    color: 'blue',  // Set color
  },
  {
    label: 'Active',
    data: challanData.activeArray,
    color: 'green',  // Set color
  }
  // Add other series here...
].map((s) => ({ ...s, highlightScope }));

  // Simulate loading delay (optional, can be removed if data is ready immediately)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  // X-axis data for the MonthName
const labels = challanData.monthNameArray;


  return (
    // <Card sx={{ padding: '1%', boxShadow: 2, borderRadius: 2, maxWidth: 800, width: 600, flexBasis: '46%' }}>
    
    <Card className='min-w-[300px] p-2 bg-white shadow-lg !rounded-lg mt-4'>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className='font-poppins'>Traffic Challan</span>
          {/* <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-poppins text-xl font-medium hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded">
                            <svg className="fill-current w-4 h-4 mr-2 inline-block " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                            Save Report
                        </button> */}
        </Typography>
        <Box sx={{ width: '100%' }}>
        {loading ? ( // Show loading indicator while loading
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress />
            </Box>
          ) : (
          <BarChart
            height={300}
            series={series
              .slice(0, seriesNb)
              .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
            xAxis={[{ scaleType: 'band', data: labels.slice(0, itemNb) }]} // Updated to include MonthName labels
       
          />

          )}
        </Box>
      </CardContent>
    </Card>


  );
}
