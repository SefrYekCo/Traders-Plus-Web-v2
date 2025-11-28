/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';
import { Button } from 'antd';


export const ReportsExport = ({csvData, fileName}) => {
    const [loading ,setLoading] = useState(false)

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {

        setLoading(true)

        const ws = XLSX.utils.json_to_sheet(csvData);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);
        setLoading(false)
    }

    // console.log(csvData);

    return (
        <Button type='primary' style={{alignSelf:"start"}} loading={loading} disabled = {csvData.length > 0 ? false : true}  onClick={(e) => exportToCSV(csvData,fileName)}>
             خروجی
        </Button>
    )

}
    
