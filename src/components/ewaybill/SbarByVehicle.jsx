import React from 'react';

const SbarByVehicle = () => {
  // search by vehicle number
  const searchbyvehicle = () => {

    let filter = document.getElementById('vehicle_input').value;
    let table = document.getElementById('table');
    let tr = table.getElementsByTagName('tr');


    for (let i = 1; i < tr.length; i++) {
      let td1 = tr[i].getElementsByTagName('td')[2];
      let text_value = td1.textContent || td1.innerHTML;
      text_value = " " + text_value.slice(0, filter.length);

      if (text_value.trim() === filter) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    };

    // condition for empty search field 
    if (filter == "") {
      document.getElementById('button-status-notifier').innerHTML = "All E-Way Bills";
    }
  }

  return (
    <>
      <input type="text" className="search-input" id="vehicle_input" placeholder="Search By Vehicle" onKeyUp={searchbyvehicle} />
    </>
  );
}

export { SbarByVehicle };

