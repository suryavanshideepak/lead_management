import React, { useState } from 'react'
import LeadTable from '../../components/leadTable/LeadTable'
import { Box } from '@mui/material'
import Sidebar from '../../components/dashboard/Sidebar'
import Navbar from '../../components/nav/Navbar'

const Leads = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };


    return (
    <Box sx={{ display: 'flex', overflow: 'hidden' }}>
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Navbar title={"Leads"} open={open} toggle={toggleDrawer}/>
        <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: 'margin 0.3s ease, width 0.3s ease',
                    marginLeft: open ? '10px' : '0px', // Adjusting margin based on sidebar width
                    width: open ? 'calc(100% - 250px)' : 'calc(100% - 56px)', // Adjusting width dynamically
                    overflow: 'hidden',
                }}
            >
        <LeadTable/>
        </Box>
    </Box>
  )
}

export default Leads