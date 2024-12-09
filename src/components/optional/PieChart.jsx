import * as  React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography,Box,CircularProgress  } from '@mui/material';


// const data2 = [
//   { label: 'Group A', value: 2400 },
//   { label: 'Group B', value: 4567 },
// ];




export default function Driv({title,fastTagData}) {

  const [pieloading, setPieLoading] = React.useState(true); // Add loading state

  React.useEffect(() => {
    const timing = setTimeout(() => {
      setPieLoading(false);
    }, 500); // Adjust time as needed

    return () => clearTimeout(timing);
  }, []);


   // Check if fastTagData is defined and contains valid data
   if (!fastTagData) {
    return null;  // Do not render anything if there's no valid data
  }

  const data2 = fastTagData.map(item => ({
    label: item.MonthYear,
    value: item.TotalAmount
  }));
  // console.log(data2);

    // Simulate loading delay (optional, can be removed if data is ready immediately)


  return (
    <>

             {/* <Card sx={{ padding: '1%', boxShadow: 2, borderRadius: 2, maxWidth: 800, width: 600, flexBasis: '46%', marginX: 'auto',height:300 }}> */}
       <Card className='min-w-[300px] p-2 bg-white shadow-lg !rounded-lg h-68 mt-4' >
          <CardContent >
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className='font-poppins'>{title}</span>
              {/* <div>
              <FormControlLabel control={<Checkbox />} label="Chart" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Show Value" />
            </div> */}
            </Typography>
            {/* sx={{display:'flex',alignItems:'center',flexDirection:'col',justifyContent:'flex-start'}} */}

            <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* <div className=''>
                <PieChart sx={{}}
                  series={[
                    {
                      data: data2,
                      cx: 70,
                      cy: 100,
                      innerRadius: 60,
                      outerRadius: 40,

                    },
                  ]}
                  height={170}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                  width={150}
                />
                <Typography variant="subtitle1" component="div" sx={{ marginTop: 1 }}>
                  Doc Attachment
                </Typography>
              </div>
               */}
              {/* <div className=''>
                <PieChart sx={{}}
                  series={[
                    {
                      data: data2,
                      cx: 70,
                      cy: 100,
                      innerRadius: 60,
                      outerRadius: 40,

                    },
                  ]}
                  height={170}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                  width={150}
                />
                <Typography variant="subtitle1" component="div" sx={{ marginTop: 1 }}>
                 Traffic Challan
                </Typography>
              </div> */}

              {/* <div className=''> */}
              {pieloading ? ( // Show loading indicator while loading
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress />
            </Box>
          ) : (
                <PieChart sx={{}}
                  series={[
                    {
                      data: data2,
                      cx: 110,
                      cy: 80,
                      innerRadius: 50,
                      outerRadius: 80,
                      // arcLabel: (params) => `${params.label}: ${params.formattedValue}`, // Custom label with label and value
                      arcLabelMinAngle: 20,

                    },
                  ]}
                  width={350}
                  // height={170}

                  className='!w-full !h-44'
                />
              )}
                {/* <Typography variant="subtitle1" component="div" sx={{ marginTop: 1 }}>
                  FasTag
                </Typography> */}
              {/* </div> */}
            </Box>

          </CardContent>
        </Card>
  

    </>
  )
}
