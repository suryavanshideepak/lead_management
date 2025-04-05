import React, { useEffect, useState } from 'react'
import LeadTable from '../../components/leadTable/LeadTable'
import { Box, Paper , useTheme} from '@mui/material'
import Sidebar from '../../components/dashboard/Sidebar'
import Navbar from '../../components/nav/Navbar'
import { useDispatch } from 'react-redux'
import { getAllLeads } from '../../app/leads/leadSlice'

const Leads = () => {
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
    const theme = useTheme();
    const dispatch = useDispatch()

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        dispatch(getAllLeads()).unwrap().then((res) => {
            setToast({ open: true, message: res.message });
        }).catch((err) => {
            setToast({ open: true, message: err.message || 'Something went wrong', severity:'error'})
        })
      },[])
    return (
    <Box sx={{ display: 'flex', overflow: 'hidden' }}>
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Navbar title={"Leads"} open={open} toggle={toggleDrawer}/>
        <LeadTable/>
    </Box>
  )
}

export default Leads