import React, { useState } from 'react'
import LeadTable from '../../components/leadTable/LeadTable'
import { Box } from '@mui/material'
import Sidebar from '../../components/dashboard/Sidebar'
import Navbar from '../../components/nav/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarCollapse } from '../../app/users/userSlice'

const Leads = () => {
    const { isOpen } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const toggleDrawer = () => {
        dispatch(sidebarCollapse(!isOpen))
    };


    return (
        <Box sx={{ display: 'flex', overflow: 'hidden' }}>
            <Sidebar toggleDrawer={toggleDrawer} />
            <Navbar title={"Leads"} toggle={toggleDrawer} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: 'margin 0.3s ease, width 0.3s ease',
                    marginLeft: isOpen ? '10px' : '0px',
                    width: isOpen ? 'calc(100% - 250px)' : 'calc(100% - 56px)',
                    overflow: 'hidden',
                }}
            >
                <LeadTable />
            </Box>
        </Box>
    )
}

export default Leads