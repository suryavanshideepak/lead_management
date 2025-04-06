import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Button, Box, useTheme, Paper, Typography, Grid2 } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import AssignLeadModal from "../leadModal/AssignLeadModal";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getAllLeads, importLeadsFromCsv } from "../../app/leads/leadSlice";
import SearchBar from "../searchComponent/SearchBar";
import Toaster from "../../containers/Toaster";
import DispositionFilter from "../SelectComponent/DispositionFilter";
import CreateLeadModal from "../createLead/CreateLeadModal";
import CsvUploader from "../csvUploader/CsvUploader";


const LeadTable = () => {
  const { allLeads } = useSelector(state => state.lead)
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const [loading, setLoading] = useState(false)
  const [openCreateLeadModal, setOpenCreateLeadModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [pagination, setPagination] = useState({pageIndex:0, pageSize:10})
  const [rowSelection, setRowSelection] = useState({})
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch()

  const theme = useTheme()

  const handleFileUpload = (file) => {
    setLoading(true)
    dispatch(importLeadsFromCsv({leads:file})).unwrap().then((res) => {
      setLoading(false)
      fetchAllLeads()
      setToast({ open: true, message: res.message})
    }).catch((err) => {
        setToast({ open: true, message: err.message || 'Something went wrong', severity:'error'})
    })
  };

  const handleExport = () => {
    const csv = Papa.unparse(allLeads);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    link.click();
  };

  const handleAssignLead = (row) => {
    // setSelectedLead(row.original);
    setShowAssignModal(true);
  };

  const fetchAllLeads = (search, desposition) => {
    dispatch(getAllLeads({ 
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search,
      desposition
    })).unwrap().then((res) => {
      setTotalCount(res?.totalLeads || 0)
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
  },[dispatch, pagination.pageIndex, pagination.pageSize])
  

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
      accessorKey: "email", 
      header: "Email",
      size: 200,
      Cell: ({ cell }) => (
        <Typography color="textSecondary">{cell.getValue()}</Typography>
      )
    },
    // { 
    //   accessorKey: "status",
    //   header: "Status",
    //   size: 100,
    //   Cell: ({ cell }) => {
    //     const status = cell.getValue();
    //     let color;
    //     switch(status) {
    //       case 'Active': color = theme.palette.success.main; break;
    //       case 'Inactive': color = theme.palette.error.main; break;
    //       case 'Pending': color = theme.palette.warning.main; break;
    //       default: color = theme.palette.text.secondary;
    //     }
    //     return (
    //       <Box
    //         sx={{
    //           backgroundColor: `${color}20`,
    //           color: color,
    //           borderRadius: '4px',
    //           padding: '4px 8px',
    //           display: 'inline-block',
    //           fontWeight: '500',
    //           width:'100%'
    //         }}
    //       >
    //         {status}
    //       </Box>
    //     );
    //   }
    // },
    { 
      accessorKey: "desposition", 
      header: "Desposition",
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
      accessorKey: "action", 
      header: "Action",
      size: 200,
      Cell: ({ cell }) => (
  <></>
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
          maxWidth: '90vw', overflow: 'hidden', 
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
        
          <Grid2 container spacing={1} justifyContent="flex-end">
            <Grid2 item xs={12} sm={4}>
              <CsvUploader onFileUpload={handleFileUpload} />
            </Grid2>
            <Grid2 item xs={6} sm={4}>
              <Button variant="contained" onClick={handleExport} sx={{ backgroundColor: "#32de84", width: "100%" }}>
                Export Leads
              </Button>
            </Grid2>
            <Grid2 item xs={6} sm={4}>
              <Button variant="contained" sx={{ backgroundColor: "#32de84", width: "100%" }} onClick={() => setOpenCreateLeadModal(true)}>
                Create Order
              </Button>
            </Grid2>
          </Grid2>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Grid2 container spacing={1}>
            <Grid2 item xs={12} sm={6} md={4}>
              <SearchBar onSearch={(query) => fetchAllLeads(query)}/>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={4}>
              <DispositionFilter onFilter={(query) => fetchAllLeads('',query)} />
            </Grid2>
            <Grid2 item xs={12} sm={6} md={4}>
            {Object.keys(rowSelection).length >  0 ? <Button
              variant="contained"
              onClick={() => handleAssignLead(rowSelection)}
              sx={{ mr: 1 }}
              color="success"
            >
              Assign
            </Button> : ''}
            
          </Grid2>
          </Grid2>
        </Box>
        <Box sx={{ width: "100%", overflowX: "auto", maxWidth: '100vw'  }}> 
        <MaterialReactTable
          state= {{isLoading:loading,pagination, rowSelection}}
          columns={columns}
          data={allLeads?.data?.length ? allLeads.data : []}
          // enableRowActions
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
              maxHeight: '70vh',
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
          // renderRowActions={({ row }) => (
          //   <Button
          //     variant="contained"
          //     onClick={() => handleAssignLead(row)}
          //     sx={{ mr: 1 }}
          //   >
          //     Assign
          //   </Button>
          // )}
          manualPagination={true}
          onPaginationChange={ setPagination }
          rowCount={totalCount ?? 0}
          enableRowSelection={true}
          getRowId={(row) => row._id}
          onRowSelectionChange={ setRowSelection}
        />
        </Box>
      </Paper>
      {showAssignModal && (
        <AssignLeadModal lead={selectedLead} onClose={() => setShowAssignModal(false)}/>
      )}
      <Toaster message={toast.message} open={toast.open} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}/>
      <CreateLeadModal open={openCreateLeadModal} onClose={() => setOpenCreateLeadModal(false)} onSubmit={handleCreateLead} />
    </Box>
  )
}

export default LeadTable