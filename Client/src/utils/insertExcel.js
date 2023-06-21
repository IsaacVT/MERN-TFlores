import { useState } from 'react';
// Excel
import * as XLSX from 'xlsx/xlsx.mjs';
// @mui
import { Stack, Button, Typography } from '@mui/material';
// Icons
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SystemUpdateAltRoundedIcon from '@mui/icons-material/SystemUpdateAltRounded';
// Services
import { InsertNewData } from '../services/user-service';

const FileUploader = () => {

    const [dataFile, setDataFile] = useState(null);
    const [nameFile, setNameFile] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);

    const resetFile = () => {
        setDataFile(null);
        setNameFile('');
    }

    const extractData = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file !== null) {
            setNameFile(file.name);

            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const excelData = XLSX.utils.sheet_to_json(worksheet);
                console.log("🚀 ~ file: UserPage.js:122 ~ extractData ~ excelData:", excelData)

                setDataFile(excelData);
            }

            reader.readAsArrayBuffer(file);
        } else {
            console.log('No file loaded')
        }
    }

    const sendData = () => {
        setIsEnabled(false);
        const file = dataFile;
        const formData = new FormData();
        formData.append("excelData", JSON.stringify(file));

        try {
            Promise.resolve(
                InsertNewData(formData)
            ).then((res) => {
                console.log("🚀 ~ file: insertExcel.js:57 ~ ).then ~ res:", res)
                resetFile();
                window.location.reload(true)
            })
        } catch (error) {
            console.log("🚀 ~ file: insertExcel.js:62 ~ sendData ~ error:", error)
        }
    }

    return (
        <Stack direction={'row'} spacing={3} alignItems="center">
            <>
                {nameFile !== '' &&
                    <>
                        <Typography variant="h6">Data from : {nameFile}</Typography>

                        <Button variant="contained" component='label' color={'warning'} startIcon={<SystemUpdateAltRoundedIcon />} onClick={sendData} disabled={!isEnabled}>
                            Send file
                        </Button>
                    </>
                }
            </>

            <Button variant="contained" component='label' color='success' startIcon={<UploadFileRoundedIcon />} onChange={extractData}>
                Upload excel
                <input hidden accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" />
            </Button>
        </Stack>
    )
}

export default FileUploader;