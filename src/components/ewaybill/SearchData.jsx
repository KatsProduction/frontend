
import { SbarByEwayBill } from "./SbarByEwayBill";
import { SbarByDocumentNumber } from "./SbarByDocumentNumber";
import { SbarByVehicle } from "./SbarByVehicle";
import excel_icon from './../../assets/excel_icon.png';
import * as XLSX from 'xlsx/xlsx';






const SearchData = ({ tableName }) => {

  // converting all eway bill table data to excel
  const exportToExcel = () => {
    const table = document.getElementById(tableName);
    const workbook = XLSX.utils.table_to_book(table);

    for (let i = 0; i < table.children[1].children.length; i++) {
      let ewaybill_td = table.children[1].children[i].children[1].innerHTML;

      let selected_field = 2 + i;

      workbook.Sheets.Sheet1[`B${selected_field}`].v = ewaybill_td.split('<br>')[0];
    }
    XLSX.writeFile(workbook, 'table.xlsx');
  };

 

  return (
    <>
      <div className="flex items-start justify-between px-0 mt-4 ">

        {/* component for search by ewaybill valid date */}
        <SbarByVehicle />


        {/* component for search by ewaybill left */}
        <SbarByEwayBill />

        {/* component for search by ewaybill document number */}
        <SbarByDocumentNumber />


        {/* export excel icon */}
        <img title="All Eway Bill" src={excel_icon} className="export w-6 h-6 cursor-pointer mix-blend-multiply border-none transition duration-[0.3s] mt-2" id="export-btn" onClick={exportToExcel} />

      </div>


    </>);
}

export { SearchData };