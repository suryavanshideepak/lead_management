import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button } from "@mui/material";
import * as Papa from "papaparse";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

const CsvUploader = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      complete: (result) => {
        const filteredData = result.data.filter(row => row.name && row.name.trim() !== "");
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
    <Box {...getRootProps()} sx={{ display: "inline-block", width: { xs: "100%", sm: "auto" } }}>
      <input {...getInputProps()} />
      <Button
        variant="outlined"
        size="small"
        startIcon={<UploadFileOutlinedIcon sx={{ fontSize: '18px !important', color: '#2563eb' }} />}
        sx={{
          height: '36px',
          px: 2,
          borderRadius: '9px',
          borderColor: '#e2e8f0',
          backgroundColor: '#ffffff',
          color: '#334155',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.8rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          width: '100%',
          '&:hover': {
            borderColor: '#cbd5e1',
            backgroundColor: '#f8fafc',
          },
        }}
      >
        {fileName ? `Imported: ${fileName.slice(0, 14)}...` : 'Import CSV'}
      </Button>
    </Box>
  );
};

export default CsvUploader;
