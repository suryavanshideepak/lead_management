import React, { useEffect, useState } from 'react'
import LeadTable from '../../components/leadTable/LeadTable'
import { Box, Paper , useTheme} from '@mui/material'
import Sidebar from '../../components/dashboard/Sidebar'
import Navbar from '../../components/nav/Navbar'

const Leads = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const toggleDrawer = () => {
        setOpen(!open);
    };


    return (
    <Box sx={{ display: 'flex', overflow: 'hidden' }}>
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Navbar title={"Leads"} open={open} toggle={toggleDrawer}/>
        <LeadTable/>
    </Box>
  )
}

export default Leads