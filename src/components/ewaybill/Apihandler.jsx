import React, { useState } from 'react';
import axios from 'axios';
import './../../css/ewaybill/Apihandler.css';
import { setDefaults, fromLatLng } from "react-geocode";


const Apihandler = (props) => {
    console.log(props);
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedTr, setSelectedTr] = useState("");
    const [option, setOption] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedState, setState] = useState("");
    const [transitType, setTransitType] = useState("");
    const [reason, setReason] = useState("");
    const [extendInfo, setInfo] = useState({
        address_line1: "",
        from_pincode: "",
        remaining_distance: "",
        extend_remarks: ""
    });
    const [addressLoader, setAddressLoader] = useState(false);

    let name, value;
    function handleInput(e) {
        name = e.target.name;
        value = e.target.value;
        setInfo({ ...extendInfo, [name]: value })
    }
    // console.log(extendInfo);
    setDefaults({
        key: import.meta.env.VITE_APP_GEOCODING_API_KEY, // Your API key here.
        language: "en", // Default language for responses.
        region: "es", // Default region for responses.
    });
    async function openGoogleMap(e) {
        try {
            const gst =  props.getUser;
            const user = props.user;
            setLoading(true);
            let vehicleNumber = e.target.parentElement.parentElement.parentElement.parentElement.children[9].innerHTML;
            // console.log(vehicleNumber);
            if (vehicleNumber && vehicleNumber.length > 0) {
                const vechileUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/vehicle?vehicleNumber=${vehicleNumber}&user=${user}&gst=${gst}`;
                const location_tracker = await axios.get(vechileUrl);
                // console.log(location_tracker);
                if (location_tracker && location_tracker.data && location_tracker.data.latitude) {
                    const queryString = new URLSearchParams({
                        lat: location_tracker.data.latitude,
                        lan: location_tracker.data.longitude
                    }).toString();

                    setLoading(false);
                    const mapUrl = `/mapView?${queryString}`
                    window.open(mapUrl, '_blank');
                    // console.log('hi');
                }
                // } else {
                //     setLoading(false);
                //     alert("it is a Broker vehicle");
                // }

                else if (location_tracker && location_tracker.data && location_tracker.data.latLngDTO) {
                    // console.log('hello');
                    const queryString = new URLSearchParams({
                        lat: location_tracker.data.latLngDTO.lat,
                        lan: location_tracker.data.latLngDTO.lng
                    }).toString();

                    // console.log(queryString);
                    setLoading(false);
                    const mapUrl = `/mapView?${queryString}`
                    window.open(mapUrl, '_blank');
                }
                else {

                    setLoading(false);
                    alert("it is a Broker vehicle");
                }

            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }


    // change ewaybill date time format
    function formatDateCustom(dateString) {
        // Parse the input date string to a Date object
        const date = new Date(dateString);

        // Get date components
        const day = String(date.getUTCDate()).padStart(2, '0');       // Day with leading zero
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month with leading zero (getUTCMonth() gives 0-based index)
        const year = date.getUTCFullYear();                            // Year

        // Get time components
        let hours = date.getUTCHours();                                // Hours
        const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Minutes with leading zero
        const seconds = String(date.getUTCSeconds()).padStart(2, '0'); // Seconds with leading zero

        // Determine AM/PM and convert to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;                                      // Convert 24-hour format to 12-hour format

        // Format the date as 'dd/mm/yyyy hh:mm:ss AM/PM'
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;

        return formattedDate;
    }



    // showing vehicle number
    async function vehicleNumber(event) {
        try {
            const eway_bill_number = event.target.parentElement.children[1].innerHTML;
            let gst_number = document.getElementById("gst-number").innerHTML.split(' ')[2];
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/getewb?eway_bill_number=${eway_bill_number}&gst=${gst_number}`);
            let modified_cell_data = response.data;
            console.log(modified_cell_data);
            // console.log(event.target.parentElement.children[10].innerHTML);
            event.target.parentElement.children[10].innerHTML = modified_cell_data + `<br /><i class='fa fa-map-marker tracker' aria-hidden='true' style='color:red;cursor:pointer'></i>`;
        } catch (e) {
            console.log(e);
        }
    }

    async function showpopup(e) {
        try {
            await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/getoption`, { withCredentials: true });
            let eway_bill_number = e.target.parentElement.parentElement.parentElement.innerHTML.split('<br>')[0];
            let vehicle_number = e.target.parentElement.parentElement.parentElement.parentElement.children[10].innerHTML.split('<br>')[0];
            let document_number = e.target.parentElement.parentElement.parentElement.parentElement.children[5].innerHTML;
            let document_date = e.target.parentElement.parentElement.parentElement.parentElement.children[6].innerHTML;

            document.getElementsByClassName('bill-value')[0].innerHTML = `${eway_bill_number}`;
            document.getElementsByClassName('document-number')[0].innerHTML = `${document_number}`;
            document.getElementsByClassName('document-date')[0].innerHTML = `${document_date}`;
            document.getElementsByClassName('vehicle-number')[0].innerHTML = `${vehicle_number}`;
            document.getElementsByClassName('center')[0].style.display = "block";
            document.querySelector(".popup").classList.add('opened');
        } catch (error) {
            if (error.response.data.status == 401) {
                alert('session expired');
                navigate('/');
            } else if (error.response.data.status == 500) {
                alert('internal server error');
            } else {
                alert('something went wrong');
            }
        }
    }

    async function showpopup2(e) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/getoption`, { withCredentials: true });
            setOption(response.data.message)
            let eway_bill_number = e.target.parentElement.parentElement.parentElement.innerHTML.split('<br>')[0];
            // let status = e.target.parentElement.parentElement.parentElement.parentElement.children[16].innerHTML;
            let status = e.target.parentElement.parentElement.parentElement.parentElement.children[13].innerHTML;



            if (status === '-') {
                document.getElementById('selectOption').value = "";
            } else {
                document.getElementById('selectOption').value = status;
            }
            document.getElementsByClassName('bill-value')[1].innerHTML = `${eway_bill_number}`;
            document.getElementsByClassName('get-vehicle-center')[0].style.display = "block";
            document.querySelector(".get-vehicle-popup").classList.add('open');
            setSelectedTr(e.target.parentElement.parentElement.parentElement.parentElement);
        } catch (error) {
            if (error.response.data.status == 401) {
                alert('session expired');
                navigate('/');
            } else if (error.response.data.status == 500) {
                alert('internal server error');
            } else {
                alert('something went wrong');
            }
        }

    }

    function handleChange(e) {
        setSelectedValue(e.target.value);
    }


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            let eway_bill_number = e.target.parentElement.parentElement.parentElement.innerHTML.split('<br>')[0];
            let gst_number = document.getElementById("gst-number").innerHTML.split(' ')[2];
            let status_value = document.getElementById('selectOption').value;
            let remark_value = document.getElementById('remark').value;
            if (status_value === "") {
                selectedTr.target.parentElement.children[16].innerHTML = "-";
            } else {
                selectedTr.target.parentElement.children[16].innerHTML = status_value;
            }
            if (remark_value === "") {
                selectedTr.target.parentElement.children[17].innerHTML = "-";
            } else {
                selectedTr.target.parentElement.children[17].innerHTML = remark_value;
            }
            closewindow();
            document.getElementById('selectOption').value = "";
            setSelectedValue("");
            let selected_value = selectedTr.target.parentElement.children[16].innerHTML;
            let no_value = selectedTr.target.parentElement.children[17].innerHTML;
            await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/setstatus?eway_bill_number=${eway_bill_number}&gst=${gst_number}&status=${selected_value}&remark=${no_value}`,{withCredentials:true});
            // await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/setremark?eway_bill_number=${eway_bill_number}&gst=${gst_number}&remark=${no_value}`);
        } catch (e) {
            console.log('status not update' + e);
        }
    }


    function closewindow1() {
        document.getElementsByClassName('popup')[0].classList.remove('active');
        document.getElementsByClassName('center')[0].style.display = "none";
    }

    function closewindow() {
        document.getElementsByClassName('get-vehicle-popup')[0].classList.remove('active');
        document.getElementsByClassName('get-vehicle-center')[0].style.display = "none";
    }





    async function handleVehicleStatus(e) {
        try {
            e.preventDefault();

            let eway_bill_number = selectedTr.children[1].innerHTML.split('<br>')[0];
            let gst_number = document.getElementById("gst-number").innerHTML.split(' ')[2];
            let status_value = document.getElementById('selectOption').value;
            let remark_value = document.getElementById('remark').value;
            // console.log(eway_bill_number, gst_number, status_value, remark_value);
            if (status_value === "") {

                // console.log(selectedTr.children[16].innerHTML = "-");
                selectedTr.children[13].innerHTML = "-";
            } else {
                // console.log( selectedTr.children[16].innerHTML = status_value);
                selectedTr.children[13].innerHTML = status_value;
            }
            if (remark_value === "") {
                // console.log(selectedTr.children[17].innerHTML = "-");
                selectedTr.children[14].innerHTML = "-";
            } else {
                // console.log(selectedTr.children[17].innerHTML = remark_value);
                selectedTr.children[14].innerHTML = remark_value;
            }
            closewindow();
            document.getElementById('selectOption').value = "";
            setSelectedValue("");
            let selected_value = selectedTr.children[13].innerHTML;
            let no_value = selectedTr.children[14].innerHTML;
            // console.log(selected_value);
            // console.log(no_value);
            await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/setstatus?eway_bill_number=${eway_bill_number}&gst=${gst_number}&status=${selected_value}&remark=${no_value}`, { withCredentials: true });
            if (selected_value === 'Vehicle Reached') {
                selectedTr.style.backgroundColor = "#23c560";
            }
            // await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/setremark?eway_bill_number=${eway_bill_number}&gst=${gst_number}&remark=${no_value}`);
        } catch (error) {
            console.log(error);
            if (error.response.data.status == 401) {
                alert('session expired');
                navigate('/');
            } else if (error.response.data.status == 500) {
                alert('internal server error');
            } else {
               alert('something went wrong');
            }
        }
    }
    async function getAddress(e) {
        try {
            const gst =  props.getUser;
            const user = props.user;
            // console.log(addressLoader);
            setAddressLoader(true);
            // console.log(addressLoader);
            let vehicle_number = e.target.parentElement.parentElement.parentElement.parentElement.children[9].innerHTML;
            let destination_pincode = e.target.parentElement.parentElement.parentElement.parentElement.children[6].innerHTML;
            // console.log(destination_pincode);
            let status = e.target.parentElement.parentElement.parentElement.parentElement.children[13];
            let eway_bill_number = e.target.parentElement.parentElement.parentElement.innerHTML.split('<br>')[0];
            // console.log(vehicle_number);
            let selected_row = e.target.parentElement.parentElement.parentElement.parentElement;
            if (vehicleNumber && vehicleNumber.length > 0) {
                const vechileUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/vehicle?vehicleNumber=${vehicle_number}&user=${user}&gst=${gst}`;
                // console.log(vechileUrl);
                const location_tracker = await axios.get(vechileUrl);
                // console.log(location_tracker);

                if (location_tracker && location_tracker.data && location_tracker.data.latitude) {
                    fromLatLng(parseFloat(location_tracker.data.latitude), parseFloat(location_tracker.data.longitude))
                        .then(({ results }) => {
                            let address = "";
                            results[0].address_components.map(async (element) => {
                                address = address + " " + element.long_name;
                                if (destination_pincode === element.long_name) {
                                    // console.log('true');
                                    status.innerHTML = "Vehicle Reached";
                                    console.log(`${import.meta.env.VITE_APP_BASE_URL}/api/setstatus?eway_bill_number=${eway_bill_number}&gst=${gst}&status=Vehicle Reached`);
                                    await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/setstatus?eway_bill_number=${eway_bill_number}&gst=${gst}&status=Vehicle Reached`,{withCredentials:true});
                                    selected_row.style.backgroundColor = '#0cff00';

                                }
                                setAddressLoader(false);
                            });
                            // console.log(results);
                            // console.log(document.getElementById('display-address'));
                            document.getElementById('display-address').innerHTML = address;
                            document.getElementById('overlay').style.display = 'block';

                            // alert(address)

                        })
                        .catch(console.error, setAddressLoader(false));
                }
                else if (location_tracker && location_tracker.data && location_tracker.data.latLngDTO) {
                    fromLatLng(parseFloat(location_tracker.data.latLngDTO.lat), parseFloat(location_tracker.data.latLngDTO.lng))
                        .then(({ results }) => {
                            let address = "";
                            results[0].address_components.map(async (element) => {
                                address = address + " " + element.long_name;
                                if (destination_pincode === element.long_name) {
                                    // console.log('true');
                                    status.innerHTML = "Vehicle Reached";
                                    await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/setstatus?eway_bill_number=${eway_bill_number}&gst=${gst}&status=Vehicle Reached`,{withCredentials:true});
                                    selected_row.style.backgroundColor = '#0cff00';


                                }
                                setAddressLoader(false)
                            });
                            // console.log(results);
                            // console.log(addressLoader);
                            // console.log(document.getElementById('display-address'));
                            document.getElementById('display-address').innerHTML = address;
                            document.getElementById('overlay').style.display = 'block';
                            // alert(address)
                        })
                        .catch(console.error, setAddressLoader(false));
                }
                else {
                    setAddressLoader(false)
                    alert("it is a Broker vehicle");
                }

            }
        } catch (e) {
            console.log(e);
        }
    }

    function closePopup() {
        document.getElementById('overlay').style.display = 'none';
    }


    // handling onchange
    function handleState(e) {
        setState(e.target.value);
        console.log(e.target.value);
    }

    function handleReason(e) {
        setReason(e.target.value);
        console.log(e.target.value);
    }


    function handleTransitType(e) {
        setTransitType(e.target.value);
        console.log(e.target.value);
    }

    async function handleExtendBill(e) {
        e.preventDefault();
        let eway_bill_number = document.getElementsByClassName('bill-value')[0].innerHTML;
        let gst_number = document.getElementById("gst-number").innerHTML.split(' ')[2];
        let vehicle_number = document.getElementsByClassName('vehicle-number')[0].innerHTML;
        let document_number = document.getElementsByClassName('document-number')[0].innerHTML;
        let document_date = document.getElementsByClassName('document-date')[0].innerHTML;
        const response1 = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_APP_BASE_URL}/api/getewbDetail?gst=${gst_number}&ewb=${eway_bill_number}`,
        });
        let extended_ewayBill_data = {
            userGstin: gst_number,
            eway_bill_number: eway_bill_number,
            vehicle_number: vehicle_number,
            mode_of_transport: 5,
            state: selectedState,
            extend_validity_reason: reason,
            consignment_status: 'T',
            transporter_document_number: document_number,
            transporter_document_date: document_date,
            address_line2: "",
            address_line3: "",
            state_of_consignor: response1.data.state_of_consignor,
            place_of_consignor: response1.data.place_of_consignor,
            ...extendInfo,
        };

        const url = `${import.meta.env.VITE_APP_BASE_URL}/api/remainingDistance?from_pincode=${extendInfo.from_pincode}&pincode_of_delivery=${response1.data.pincode_of_delivery}`;
        const respone2 = await axios({
            method: 'GET',
            url: url,
        });
        extended_ewayBill_data.remaining_distance = respone2.data.distance;
        console.log(extended_ewayBill_data);

    }



    function sortableTableByColumn(table, column, asc = true) {
        const dirModifier = asc ? 1 : -1;
        const tbody = document.getElementById(table).tBodies[0];
        const rows = Array.from(tbody.querySelectorAll('tr'));
        //    console.log(tbody);
        //    console.log(rows);
        // sort each row
        const sortRows = rows.sort((a, b) => {
            // console.log(a,b);
            const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
            // console.log(aColText,bColText);
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
            // return 1;

        });

        //    console.log(sortRows);

        // remove all existing rows
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        // readd the newly sorted rows
        tbody.append(...sortRows);



        // remember how the column is sorted currently
        let selected_table = document.getElementById(table);
        selected_table.querySelectorAll('th').forEach(th => { th.classList.remove('th-sort-asc', 'th-sort-desc') });
        document.getElementById(table).querySelector(`th:nth-child(${column + 1}`).classList.toggle('th-sort-asc', asc);
        document.getElementById(table).querySelector(`th:nth-child(${column + 1}`).classList.toggle('th-sort-desc', !asc);
    }

    document.querySelectorAll('.table-sortable th').forEach((headerCell, index) => {
        if (index === 0) {
            return; // Do nothing for the first header cell
        }
        // console.log(headerCell);
        headerCell.onclick = () => {
            // const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell.classList.contains('th-sort-asc');
            sortableTableByColumn('table', headerIndex, !currentIsAscending);
            // console.log('sdffdfds');
        }
    })





    return (
        <>

            {
                loading ? (<div className="loader-container bg-black">
                    <h1 className='text-white font-Poppin text-3xl'>Loading Map </h1><div class="loadingio-spinner-ellipsis-2by998twmg8"><div class="ldio-yzaezf3dcmj">
                        <div></div><div></div><div></div><div></div><div></div>
                    </div></div>
                    {/* <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                    /> */}
                </div>) : (<></>)
            }
            <div className="mt-5">
                <div className='overflow-auto' style={{ height: props.checkData ? '440px' : 'auto' }}>
                    <table id="table" className='table-fixed overflow-auto table table-sortable  rounded-lg font-poppins w-full border-collapse'>
                        <thead>
                            <tr>
                                <th className='w-20 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>S.No</th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>E-way Bill Number
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Vehicle No.
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>E-way Bill Date
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Expiry Date
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>E-way Bill Status
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>

                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Document Number
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Document Date
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Pincode of Delivery
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>State Name of Delivery
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Place of Delivery
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Extended Times
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Reject Status
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>

                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Status
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                                <th className='w-44 bg-[#847bff] text-xs font-medium text-center font-poppins sticky  top-0 border-none z-[2] px-[10px] py-[10px] text-white'>Remark
                                    <i class="fa-solid fa-caret-down carrat-asc text-white ml-1 hidden"></i>
                                    <i class="fa-solid fa-caret-up carrat-desc text-white ml-1 hidden"></i>
                                </th>
                            </tr>
                        </thead>


                        {props.loading ? (<tr>
                            <td colSpan={18} className='text-xs  text-left font-poppins pl-[15%] py-[10px]'> <i class="fa fa-spinner fa-spin" style={{ fontSize: "30px" }}></i></td>

                        </tr>) : props.checkData ? (

                            <tbody>{props.arrayName.map((item, index) => (

                                <tr key={index} className='dynamic_row' style={{
                                    backgroundColor: item.status === "Vehicle Reached" ? '#23c560' : "",
                                    color: item.status === "Vehicle Reached" ? 'black' : "",
                                }} ><td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{index + 1}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.eway_bill_number}
                                        {/* onClick={(e) => { vehicleNumber(e) }} */}
                                        <br />
                                        <div class="dropdown">
                                            <i style={{ cursor: "pointer" }} className=" fa fa-caret-down dropbtn"></i>
                                            <div class="dropdown-content">
                                                <li style={{ cursor: "pointer" }} onClick={(e) => { showpopup2(e) }} className='hover:bg-blue-300 hover:rounded font-Poppin font-semibold text-xs' >Get Vehicle</li>
                                                <li style={{ cursor: "pointer" }} onClick={async (e) => await openGoogleMap(e)} className='hover:bg-blue-300 hover:rounded font-Poppin font-semibold text-xs' >View Map</li>
                                                <li style={{ cursor: "pointer" }} onClick={(e) => { getAddress(e) }} className='hover:bg-blue-300 hover:rounded font-Poppin font-semibold text-xs' >Get Address</li>
                                                {/* <li style={{ cursor: "pointer" }} onClick={(e) => { showpopup(e) }} className='hover:bg-blue-300 hover:rounded font-Poppin font-semibold text-xs' >Extend E-Way Bill</li> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.vehicle_number}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{formatDateCustom(item.eway_bill_date)}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{formatDateCustom(item.eway_bill_valid_date)}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.eway_bill_status}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.document_number}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{formatDateCustom(item.document_date)}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.pincode_of_delivery}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.state_name_of_delivery}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.place_of_delivery}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.extended_times}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.reject_status}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.Vehicle_Status ? item.Vehicle_Status : '-'}</td>
                                    <td className='text-xs border-b-2 border-solid border-indigo-200 text-center font-poppins px-[10px] py-[10px]'>{item.Remarks ? item.Remarks : '-'}</td>
                                </tr>
                            ))}
                            </tbody>
                        ) : (
                            <tr>
                                <td colSpan={18} className='text-sm  text-left font-poppins pl-[15%] py-[10px]'>NO DATA TO SHOW</td>
                            </tr>
                        )}
                    </table>

                </div>

            </div>


            <div className='center bg-gradient-to-r from-cyan-500 to-blue-500'>
                <div className='popup w-2/4  h-fit bg-white p-10 shadow-lg rounded-md'>

                    <form autoComplete="off" onSubmit={(e) => { handleExtendBill(e) }}>
                        <div className='close-btn mb-4'><i onClick={closewindow1} className='fa fa-window-close' style={{ color: 'black', cursor: 'pointer', display: 'block', textAlign: 'right', fontSize: '25px' }} aria-hidden="true"></i></div>

                        <div className="w-full mb-5  flex flex-row items-center justify-between ">
                            <h2>Eway Bill Number : <span className='bill-value'></span></h2>
                            <h2>Transport Document Number : <span className='document-number'></span></h2>
                        </div>


                        <div className="w-full mb-8  flex flex-row items-center justify-between ">
                            <h2>Vehicle Number : <span className='vehicle-number'></span></h2>
                            <h2>Transport Document Date : <span className='document-date'></span></h2>
                        </div>


                        <div className='flex items-center justify-around '>
                            <div className="relative z-0 w-2/4 mb-5 group">
                                <input onChange={(e) => handleInput(e)} type="text" name="address_line1" id="current_place" className="block py-2.5 px-0 w-3/4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="Current Place" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current Place</label>
                            </div>
                            <div className="relative z-0 w-2/4 mb-5 group">
                                <input onChange={(e) => handleInput(e)} type="text" name="from_pincode" id="current_pincode" className="block py-2.5 px-0 w-3/4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="Current Pincode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current Pincode</label>
                            </div>
                        </div>

                        <div className='flex items-center justify-around '>
                            <div className="relative z-0 w-2/4 mb-5 group ">
                                <input onChange={(e) => handleInput(e)} type="text" name="extend_remarks" id="destination_pincode" className="block py-2.5 px-0 w-3/4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="Destination Pincode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Extend Remark</label>
                            </div>
                            <div className="relative z-0 w-2/4 mb-5 group">
                                <input onChange={(e) => handleInput(e)} type="text" name="remaining_distance" id="remaining_distance" className="block py-2.5 px-0 w-3/4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="Remaining Distance" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Remaining Distance</label>
                            </div>
                        </div>




                        <label for="State" class="block mb-2 text-sm font-medium text-black">Current State</label>
                        <select required onChange={(e) => handleState(e)} id="state" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected>Choose a State</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadra & Nagar Haveli & Daman & Diu">Dadra & Nagar Haveli & Daman & Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Other Territory">Other Territory</option>
                            <option value="Ladakh">Ladakh</option>
                        </select>


                        <label for="consignment" class="block mb-2 text-sm font-medium text-black">Transit Type</label>
                        <select required onChange={(e) => handleTransitType(e)} id="consignment" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected>Choose Option</option>
                            <option value="W">Warehouse</option>
                            <option value="R">Road</option>
                            <option value="O">Other</option>
                        </select>



                        <label for="Reason" class="block mb-2 text-sm font-medium text-black">Extension Reason</label>
                        <select required onChange={(e) => handleReason(e)} id="reason" class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected>Choose Option</option>
                            <option value="natural climate">Natural Climate</option>
                            <option value="law and other sitration">Law and Other Sitration</option>
                            <option value="accident">Accident</option>
                            <option value="Other">Other</option>
                        </select>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>


                </div>
            </div>



            <div className='get-vehicle-center'>
                <div className='get-vehicle-popup'>

                    <div className='close-btn'><i onClick={closewindow} className='fa fa-window-close' style={{ color: 'white', cursor: 'pointer', display: 'block', textAlign: 'right', fontSize: '25px' }} aria-hidden="true"></i></div>
                    <div className='form mt-2 '>
                        <div className='selected-bill mt-2 '>
                            <span className='mt-3 mb-2'>Eway Bill Number </span>
                            <span className='mt-3 mb-2 bill-value'> </span>
                        </div>


                        <form style={{ width: '90%' }} onSubmit={(e) => { handleVehicleStatus(e) }} autoComplete="off">
                            <div className='form-element mt-2'>
                                <label for="selectOption" class="m-0  select-status">Status</label>
                                <select required onChange={handleChange} defaultValue="" id="selectOption" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5">
                                    <option selected disabled value="">Choose Option</option>
                                    {option.map((item, index) => (
                                        <>
                                            <option key={index} className="" value={item.VEHICLE_STATUS}>{item.VEHICLE_STATUS}</option>
                                        </>
                                    ))}
                                </select>
                            </div>
                            <div className='remark mt-4' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label htmlFor="remark" className='m-0 label-remark'>Remark</label>
                                <textarea name='remark' placeholder='Remark' className='input-remark' id='remark'></textarea>
                            </div>
                            <input type='submit' value="Submit" className='mt-5 mb-2 py-1 px-2 submit-status' />
                        </form>
                    </div>
                </div>
            </div>

            {addressLoader ? (<>    <div className='overlay'>
                <h1 style={{ fontSize: "30px", display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>Loading Address</h1> <div class="loadingio-spinner-ellipsis-2by998twmg8 mt-1"><div class="ldio-yzaezf3dcmj">
                    <div></div><div></div><div></div><div></div><div></div>
                </div></div>
            </div></>) : (<>
                <div id="overlay" className="main-box">
                    <div className="address-container">
                        <button className="btn-close" onClick={closePopup}>X</button>
                        <h2 id='address-heading' className='text-2xl font-Poppin font-semibold'>Current Address</h2>
                        <p id="display-address" className='font-medium pt-8'></p>
                    </div>
                </div>
            </>)}



        </>
    );
}


export { Apihandler };

