import React from 'react';

const SbarByEwayBill = () => {

  // search by eway bill number
  const searchbyewaybill = () => {
    let filter = document.getElementById('bill_input').value;
    let table = document.getElementById('table');
    let tr = table.getElementsByTagName('tr');
    for (let i = 1; i < tr.length; i++) {
      let td1 = tr[i].getElementsByTagName('td')[1];
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
      <input type="text" className="search-input" id="bill_input" placeholder="Search By EwayBill" onKeyUp={searchbyewaybill} />
    </>
  );
}

export { SbarByEwayBill };

