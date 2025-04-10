import { Box, Button, Grid2, IconButton, Paper, Typography, useTheme } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import React, { useEffect, useState } from 'react'
import SearchBar from '../searchComponent/SearchBar'
import DispositionFilter from '../SelectComponent/DispositionFilter'
import { DatePicker } from '@mui/x-date-pickers'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, getAllAssignee, getAllLeads, getLeadsForEmployee, updateLead } from '../../app/leads/leadSlice'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dayjs from 'dayjs'
import { formatDate } from '../../utils/helpers'
import ViewEditLead from '../view_editLead/ViewEditLead'
import Toaster from '../../containers/Toaster'
import CreateLeadModal from '../createLead/CreateLeadModal'
import { selectAuthState } from '../../app/auth/authSlice'

const EmployeeLeadTable = () => {
    const { allEmployeeLeads } = useSelector(state => state.lead)
    const { user } = useSelector(selectAuthState)
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({pageIndex:0, pageSize:10})
    const [openCreateLeadModal, setOpenCreateLeadModal] = useState(false)
    const [openViewEditModal, setOpenViewEditModal] = useState(false)
    const [isViewLeadModal, setIsViewLeadModal] = useState(false);
    const [leadDetails, setLeadDetails] = useState(false);
    const [isRefreshTable, setRefreshTable] = useState(false)
    const [totalCount, setTotalCount] = useState(0);
    const [employee, setEmployee] = useState({});
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const dispatch = useDispatch()
  
    const theme = useTheme()
  
    const fetchAllLeads = (search, desposition) => {
      setLoading(true)
      setRefreshTable(false)
      dispatch(getLeadsForEmployee({ 
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search,
        userId: user?._id,
        desposition,
        fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : null,
        toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : null,
      })).unwrap().then((res) => {
        setLoading(false)
        setTotalCount(res?.totalLeads || 0)
      }).catch((err) => {
          setToast({ open: true, message: err.message || 'Something went wrong', severity:'error'})
      }).finally(() => setLoading(false))
    }
  
    const handleCreateLead = (leadData) => {
      dispatch(createOrder(leadData)).unwrap().then((res) => {
        fetchAllLeads()
        setToast({ open: true, message: res.message})
      }).catch((err) => {
          setToast({ open: true, message: err.message || 'Something went wrong', severity:'error'})
      })
    }
  
    const handleUpdateLead = (leadData) => {
      dispatch(updateLead({id:leadData.id,payload:leadData})).then((res) => {
        fetchAllLeads()
        setToast({ open: true, message: res.message})
      }).catch((err) => {
        setToast({ open: true, message: err.message || 'Something went wrong', severity:'error'})
      })
    }
  
    const clearFilter = () => {
      setEmployee({})
      setFromDate(null)
      setToDate(null)
      setEmployee({})
    }
  
    const handleViewLead =(data) => {
      setOpenViewEditModal(true)
      setIsViewLeadModal(true)
      setLeadDetails(data)
    }
  
    const handleEditLead = (data) => {
      setOpenViewEditModal(true)
      setIsViewLeadModal(false)
      setLeadDetails(data)
    }
  
    useEffect(() => {
      fetchAllLeads()
    },[dispatch, pagination.pageIndex, pagination.pageSize,])
  
    useEffect(() => {
      fetchAllLeads()
    },[fromDate,toDate,employee])
    
    useEffect(() => {
      if(isRefreshTable){
        fetchAllLeads()
      }
    },[isRefreshTable])

    const columns = [
        { 
          accessorKey: "created_at", 
          header: "Date",
          size: 150,
          Cell: ({ cell }) => (
            <Typography fontWeight="medium">{formatDate(cell.getValue())}</Typography>
          )
        },
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
            <Box>
              <IconButton onClick={()=> handleViewLead(cell.row.original)}>
                <RemoveRedEyeOutlinedIcon />
              </IconButton>
              <IconButton onClick={() => handleEditLead(cell.row.original)}>
                <EditOutlinedIcon/>
              </IconButton>
            </Box>
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
        width:'97%',
        height:'85vh'
      }}
    >

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
          overflow: 'hidden', 
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
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
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(date) => setFromDate(date)}
                slotProps={{
                  textField: { 
                    size: "small", 
                    sx: { 
                      fontSize: "14px", 
                      "& .MuiInputBase-root": { height: "37px" } 
                    }
                  }
                }}
              />
              </Grid2>
              <Grid2 item xs={12} sm={6} md={4}>
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(date) => setToDate(date)}
                slotProps={{
                  textField: { 
                    size: "small", 
                    sx: { 
                      fontSize: "14px", 
                      "& .MuiInputBase-root": { height: "37px" } 
                    }
                  }
                }}
              />
            </Grid2>
            <Grid2 item xs={12} sm={6} md={4}>
              <Button variant="contained" color="warning" onClick={clearFilter}>
                Clear Filter
              </Button>
            </Grid2>
          </Grid2>
        </Box>
        <MaterialReactTable
          state= {{isLoading:loading,pagination}}
          columns={columns}
          data={allEmployeeLeads?.data?.length ? allEmployeeLeads.data : []}
          // enableRowActions
          enableDensityToggle={false}
          initialState={{density:'spacious'}}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              overflow: 'auto',
              height:'80vh'
            }
          }}
          muiTableContainerProps={{
            sx: {
              maxHeight: '56vh',
              overflow: 'auto',
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: '#32de84',
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
          manualPagination={true}
          onPaginationChange={ setPagination }
          rowCount={totalCount ?? 0}
        />
      </Paper>
      <ViewEditLead open={openViewEditModal} onClose={() => setOpenViewEditModal(false)} isViewLeadModal={isViewLeadModal} leadDetails={leadDetails} onSubmit={handleUpdateLead}/>
      <Toaster message={toast.message} open={toast.open} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}/>
      <CreateLeadModal open={openCreateLeadModal} onClose={() => setOpenCreateLeadModal(false)} onSubmit={handleCreateLead} />
    </Box>
  )
}

export default EmployeeLeadTable