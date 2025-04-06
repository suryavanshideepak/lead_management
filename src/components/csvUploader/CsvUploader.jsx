import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import * as Papa from "papaparse";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CsvUploader = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      complete: (result) => {
        const filteredData = result.data.filter(row => row.name.trim() !== "");
        onFileUpload(filteredData);
      },
      header: true,
      skipEmptyLines: true,
    });
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        display:'flex',
        border: "1px solid #32de84",
        padding: '0px 40px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
        "&:hover": { backgroundColor: "#e3f2fd" },
      }}
    >
    <Typography sx={{color:'#32de84'}}>Import</Typography>
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{color:'#32de84', marginRight:2,marginLeft:2}}  fontSize="large" />
      {fileName && (
        <Typography variant="body2" mt={1} color="textSecondary">
          Selected: {fileName}
        </Typography>
      )}
    </Box>
  );
};

export default CsvUploader;
