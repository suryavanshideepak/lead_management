import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Button, Box, useTheme, Paper, Typography } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import AssignLeadModal from "../leadModal/AssignLeadModal";
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getAllLeads } from "../../app/leads/leadSlice";
import SearchBar from "../searchComponent/SearchBar";
import Toaster from "../../containers/Toaster";
import DispositionFilter from "../SelectComponent/DispositionFilter";
import CreateLeadModal from "../createLead/CreateLeadModal";

const LeadTable = () => {
  const { allLeads } = useSelector(state => state.lead)
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const [leads, setLeads] = useState([]);
  const [openCreateLeadModal, setOpenCreateLeadModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch()

  const theme = useTheme()

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    console.log(sheet); 
    setLeads(sheet);
  };

  reader.readAsArrayBuffer(file);
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log(results)
        setLeads(results.data);
      },
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(leads);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    link.click();
  };

  const handleAssignLead = (row) => {
    setSelectedLead(row.original);
    setShowAssignModal(true);
  };

  const fetchAllLeads = (search,disposition) => {
    dispatch(getAllLeads({ page: page + 1, limit: pageSize,search, disposition})).unwrap().then((res) => {
      setTotalCount(res.totalCount || 0)
    }).catch((err) => {
        setToast({ open: true, message: err.message || 'Something went wrong', severity:'error'})
    })
  }

  const handleCreateLead = (leadData) => {
    dispatch(createOrder(leadData)).unwrap().then((res) => {
      fetchAllLeads()
      setToast({ open: true, message: res.message})
    }).catch((err) => {
        setToast({ open: true, message: err.message || 'Something went wrong', severity:'error'})
    })
  }

  useEffect(() => {
    fetchAllLeads()
  },[dispatch, page, pageSize])
  

  const columns = [
    { 
      accessorKey: "name", 
      header: "Name",
      size: 150,
      Cell: ({ cell }) => (
        <Typography fontWeight="medium">{cell.getValue()}</Typography>
      )
    },
    { 
      accessorKey: "address", 
      header: "Address",
      size: 200,
      Cell: ({ cell }) => (
        <Typography color="textSecondary">{cell.getValue()}</Typography>
      )
    },
    { 
      accessorKey: "phone", 
      header: "Mobile",
      size: 200,
      Cell: ({ cell }) => (
        <Typography color="textSecondary">{cell.getValue()}</Typography>
      )
    },
    { 
      accessorKey: "comment", 
      header: "Comment",
      size: 200,
      Cell: ({ cell }) => (
        <Typography color="textSecondary">{cell.getValue()}</Typography>
      )
    },
    { 
      accessorKey: "email", 
      header: "Email",
      size: 200,
      Cell: ({ cell }) => (
        <Typography color="textSecondary">{cell.getValue()}</Typography>
      )
    },
    { 
      accessorKey: "status",
      header: "Status",
      size: 100,
      Cell: ({ cell }) => {
        const status = cell.getValue();
        let color;
        switch(status) {
          case 'Active': color = theme.palette.success.main; break;
          case 'Inactive': color = theme.palette.error.main; break;
          case 'Pending': color = theme.palette.warning.main; break;
          default: color = theme.palette.text.secondary;
        }
        return (
          <Box
            sx={{
              backgroundColor: `${color}20`,
              color: color,
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'inline-block',
              fontWeight: '500',
              width:'100%'
            }}
          >
            {status}
          </Box>
        );
      }
    },
    { 
      accessorKey: "desposition", 
      header: "Desposition",
      size: 200,
      Cell: ({ cell }) => (
        <Typography color="textSecondary">{cell.getValue()}</Typography>
      )
    },
  ];
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: 8,
        transition: 'width 0.3s ease, margin 0.3s ease',
      }}
    >

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          maxHeight: '80vh', 
          width:'85%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Lead Management
          </Typography>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            id="file-upload"
          />
          <Button variant="contained" onClick={handleExport} sx={{ ml: 2, backgroundColor: '#32de84', }}>
            Export Leads
          </Button>
          <Button variant="contained" sx={{ ml: 2, backgroundColor: '#32de84', }} onClick={() => setOpenCreateLeadModal(true)}>
            Create Order
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <SearchBar onSearch={(query) => fetchAllLeads(query)}/>
          <DispositionFilter onFilter={(query) => fetchAllLeads('',query)} />
        </Box>
        <Box sx={{ overflow: 'auto', maxWidth: '100%' }}> 
        <MaterialReactTable
          columns={columns}
          data={allLeads?.data?.length ? allLeads.data : []}
          enableRowActions
          enableDensityToggle={false}
          initialState={{density:'spacious'}}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              overflow: 'auto',
            }
          }}
          muiTableContainerProps={{
            sx: {
              maxHeight: '70vh', // Limit height to keep scrolling active
              overflow: 'auto',
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: '#d3d3d3',
              fontWeight: '600',
              color: theme.palette.text.primary,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }
          }}
          muiTableBodyCellProps={{
            sx: {
              borderBottom: `1px solid ${theme.palette.divider}`,
            }
          }}
          muiTableBodyProps={{
            sx: {
              '& tr:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
              '& tr:hover': {
                backgroundColor: theme.palette.action.selected,
              }
            }
          }}
          renderRowActions={({ row }) => (
            <Button
              variant="contained"
              onClick={() => handleAssignLead(row)}
              sx={{ mr: 1 }}
            >
              Assign
            </Button>
          )}
          manualPagination
          rowCount={totalCount}
          pageCount={page}
          onPaginationChange={({pageIndex, pageSize}) => {
            setPage(pageIndex)
            setPageSize(pageIndex)
          }}
        />
        </Box>
      </Paper>
      {showAssignModal && (
        <AssignLeadModal
          lead={selectedLead}
          onClose={() => setShowAssignModal(false)}
        />
      )}
      <Toaster
          message={toast.message}
          open={toast.open}
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
          />
      <CreateLeadModal open={openCreateLeadModal} onClose={() => setOpenCreateLeadModal(false)} onSubmit={handleCreateLead} />
    </Box>
  )
}

export default LeadTable