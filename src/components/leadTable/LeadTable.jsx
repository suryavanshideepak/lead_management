import React, { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import {
  Button,
  Box,
  Typography,
  Grid2,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import AssignLeadModal from "../leadModal/AssignLeadModal";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  assignLead,
  createOrder,
  getAllAssignee,
  getAllLeads,
  importLeadsFromCsv,
  updateLead,
} from "../../app/leads/leadSlice";
import SearchBar from "../searchComponent/SearchBar";
import Toaster from "../../containers/Toaster";
import DispositionFilter from "../SelectComponent/DispositionFilter";
import CreateLeadModal from "../createLead/CreateLeadModal";
import CsvUploader from "../csvUploader/CsvUploader";
import { getAllUser } from "../../app/users/userSlice";
import { formatDate, getAssigneeName } from "../../utils/helpers";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ViewEditLead from "../view_editLead/ViewEditLead";

const getDispositionBadge = (val) => {
  if (!val) {
    return (
      <Chip
        size="small"
        label="New"
        sx={{
          backgroundColor: "#eff6ff",
          color: "#1d4ed8",
          border: "1px solid #bfdbfe",
          fontSize: "0.72rem",
          fontWeight: 600,
          borderRadius: "6px",
        }}
      />
    );
  }
  const v = val.toLowerCase();
  if (v.includes("verified") || v.includes("delivered")) {
    return (
      <Chip
        size="small"
        label={val}
        sx={{
          backgroundColor: "#ecfdf5",
          color: "#065f46",
          border: "1px solid #a7f3d0",
          fontSize: "0.72rem",
          fontWeight: 600,
          borderRadius: "6px",
        }}
      />
    );
  }
  if (v.includes("placed")) {
    return (
      <Chip
        size="small"
        label={val}
        sx={{
          backgroundColor: "#f5f3ff",
          color: "#7c3aed",
          border: "1px solid #ddd6fe",
          fontSize: "0.72rem",
          fontWeight: 600,
          borderRadius: "6px",
        }}
      />
    );
  }
  if (v.includes("cancel") || v.includes("switch") || v.includes("not connected")) {
    return (
      <Chip
        size="small"
        label={val}
        sx={{
          backgroundColor: "#fff1f2",
          color: "#be123c",
          border: "1px solid #fecdd3",
          fontSize: "0.72rem",
          fontWeight: 600,
          borderRadius: "6px",
        }}
      />
    );
  }
  if (v.includes("callback") || v.includes("ringing")) {
    return (
      <Chip
        size="small"
        label={val}
        sx={{
          backgroundColor: "#fffbeb",
          color: "#b45309",
          border: "1px solid #fde68a",
          fontSize: "0.72rem",
          fontWeight: 600,
          borderRadius: "6px",
        }}
      />
    );
  }
  return (
    <Chip
      size="small"
      label={val}
      sx={{
        backgroundColor: "#f1f5f9",
        color: "#334155",
        border: "1px solid #e2e8f0",
        fontSize: "0.72rem",
        fontWeight: 600,
        borderRadius: "6px",
      }}
    />
  );
};

const LeadTable = () => {
  const { allLeads, allAssignee } = useSelector((state) => state.lead);
  const { allUsers } = useSelector((state) => state.user);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [openCreateLeadModal, setOpenCreateLeadModal] = useState(false);
  const [openViewEditModal, setOpenViewEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [isViewLeadModal, setIsViewLeadModal] = useState(false);
  const [leadDetails, setLeadDetails] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState(null);
  const [isRefreshTable, setRefreshTable] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [employee, setEmployee] = useState({});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    setLoading(true);
    dispatch(importLeadsFromCsv({ leads: file }))
      .unwrap()
      .then((res) => {
        setLoading(false);
        fetchAllLeads();
        setToast({ open: true, message: res.message });
      })
      .catch((err) => {
        setToast({ open: true, message: err.message || "Something went wrong", severity: "error" });
      });
  };

  const handleExport = () => {
    if (!allLeads?.data?.length) {
      setToast({ open: true, message: "No leads data available to export", severity: "warning" });
      return;
    }
    const csv = Papa.unparse(allLeads.data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    link.click();
  };

  const handleAssignLead = () => {
    const selectedRows = Object.keys(rowSelection).map((id) =>
      allLeads?.data.find((row) => row._id === id)
    );
    const sId = selectedRows.filter(Boolean).map((item) => item._id);
    if (!sId.length) return;
    setSelectedLeads(sId);
    setShowAssignModal(true);
  };

  const fetchAllLeads = (search, desposition) => {
    setLoading(true);
    setRefreshTable(false);
    dispatch(
      getAllLeads({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search,
        userId: employee?._id,
        desposition,
        fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : null,
        toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : null,
      })
    )
      .unwrap()
      .then((res) => {
        setLoading(false);
        setTotalCount(res?.totalLeads || 0);
      })
      .catch((err) => {
        setToast({ open: true, message: err.message || "Something went wrong", severity: "error" });
      })
      .finally(() => setLoading(false));
  };

  const handleCreateLead = (leadData) => {
    dispatch(createOrder(leadData))
      .unwrap()
      .then((res) => {
        fetchAllLeads();
        setToast({ open: true, message: res.message });
      })
      .catch((err) => {
        setToast({ open: true, message: err.message || "Something went wrong", severity: "error" });
      });
  };

  const handleUpdateLead = (leadData) => {
    dispatch(updateLead({ id: leadData.id, payload: leadData }))
      .then((res) => {
        fetchAllLeads();
        setToast({ open: true, message: res.message });
      })
      .catch((err) => {
        setToast({ open: true, message: err.message || "Something went wrong", severity: "error" });
      });
  };

  const handleEmployeeFilter = (event) => {
    const selectedId = event.target.value;
    const selectedEmployee = allUsers?.users?.find((user) => user._id === selectedId) || null;
    setEmployee(selectedEmployee);
  };

  const assignLeadFunc = (payload) => {
    setLoading(true);
    dispatch(assignLead(payload))
      .unwrap()
      .then((res) => {
        clearFilter();
        setRefreshTable(true);
        setToast({ open: true, message: res.message });
      })
      .catch((err) => {
        setToast({ open: true, message: err.message || "Something went wrong", severity: "error" });
      });
  };

  const clearFilter = () => {
    setRowSelection({});
    setEmployee({});
    setFromDate(null);
    setToDate(null);
  };

  const handleViewLead = (data) => {
    setOpenViewEditModal(true);
    setIsViewLeadModal(true);
    setLeadDetails(data);
  };

  const handleEditLead = (data) => {
    setOpenViewEditModal(true);
    setIsViewLeadModal(false);
    setLeadDetails(data);
  };

  useEffect(() => {
    fetchAllLeads();
    dispatch(getAllUser());
    dispatch(getAllAssignee());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchAllLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate, employee]);

  useEffect(() => {
    if (isRefreshTable) {
      dispatch(getAllAssignee());
      fetchAllLeads();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshTable]);

  const selectedCount = Object.keys(rowSelection).length;

  const columns = useMemo(
    () => [
      {
        accessorKey: "created_at",
        header: "Date",
        size: 110,
        Cell: ({ cell }) => (
          <Typography sx={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 500 }}>
            {formatDate(cell.getValue())}
          </Typography>
        ),
      },
      {
        accessorKey: "name",
        header: "Lead Name",
        size: 160,
        Cell: ({ cell }) => (
          <Typography sx={{ color: "#0f172a", fontSize: "0.875rem", fontWeight: 600 }}>
            {cell.getValue() || "—"}
          </Typography>
        ),
      },
      {
        accessorKey: "phone",
        header: "Mobile",
        size: 130,
        Cell: ({ cell }) => (
          <Typography sx={{ color: "#334155", fontSize: "0.825rem", fontFamily: "monospace" }}>
            {cell.getValue() || "—"}
          </Typography>
        ),
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 180,
        Cell: ({ cell }) => (
          <Typography
            noWrap
            sx={{ color: "#64748b", fontSize: "0.8rem", maxWidth: 180 }}
            title={cell.getValue() || ""}
          >
            {cell.getValue() || "—"}
          </Typography>
        ),
      },
      {
        accessorKey: "assignee",
        header: "Assignee",
        size: 140,
        Cell: ({ cell }) => {
          const assigneeName = getAssigneeName(
            cell.row.original,
            allAssignee?.assigneeData,
            allUsers?.users
          );
          const isUnassigned = assigneeName === "Unassigned" || !assigneeName;
          return (
            <Chip
              size="small"
              label={assigneeName || "Unassigned"}
              sx={{
                backgroundColor: isUnassigned ? "#f8fafc" : "#eff6ff",
                color: isUnassigned ? "#94a3b8" : "#2563eb",
                border: `1px solid ${isUnassigned ? "#e2e8f0" : "#bfdbfe"}`,
                fontSize: "0.72rem",
                fontWeight: 600,
                borderRadius: "6px",
              }}
            />
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 110,
        Cell: ({ cell }) => {
          const val = cell.getValue();
          const num = Number(val);
          const formatted = !isNaN(num) ? `₹${num.toLocaleString()}` : val ? `₹${val}` : "—";
          return (
            <Typography sx={{ color: "#0f172a", fontWeight: 700, fontSize: "0.875rem" }}>
              {formatted}
            </Typography>
          );
        },
      },
      {
        accessorKey: "desposition",
        header: "Disposition",
        size: 140,
        Cell: ({ cell }) => getDispositionBadge(cell.getValue()),
      },
      {
        accessorKey: "comment",
        header: "Comment",
        size: 160,
        Cell: ({ cell }) => (
          <Typography
            noWrap
            sx={{ color: "#64748b", fontSize: "0.8rem", maxWidth: 160 }}
            title={cell.getValue() || ""}
          >
            {cell.getValue() || "—"}
          </Typography>
        ),
      },
      {
        accessorKey: "action",
        header: "Actions",
        size: 100,
        enableSorting: false,
        Cell: ({ cell }) => (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              p: "2px",
            }}
          >
            <Tooltip title="View Lead" arrow>
              <IconButton
                size="small"
                onClick={() => handleViewLead(cell.row.original)}
                sx={{
                  color: "#64748b",
                  borderRadius: "6px",
                  p: 0.6,
                  "&:hover": { color: "#2563eb", backgroundColor: "#eff6ff" },
                }}
              >
                <RemoveRedEyeOutlinedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Lead" arrow>
              <IconButton
                size="small"
                onClick={() => handleEditLead(cell.row.original)}
                sx={{
                  color: "#64748b",
                  borderRadius: "6px",
                  p: 0.6,
                  "&:hover": { color: "#10b981", backgroundColor: "#ecfdf5" },
                }}
              >
                <EditOutlinedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allAssignee, allUsers]
  );

  return (
    <Box sx={{ width: "100%", pb: 2 }}>
      {/* Header Section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.02em",
                fontSize: { xs: "1.25rem", sm: "1.45rem" },
              }}
            >
              Lead Management
            </Typography>
            <Chip
              size="small"
              icon={<ContactPhoneOutlinedIcon sx={{ fontSize: "13px !important", color: "#2563eb" }} />}
              label={`${totalCount} Leads`}
              sx={{
                backgroundColor: "#eff6ff",
                color: "#1d4ed8",
                fontWeight: 600,
                fontSize: "0.72rem",
                height: "22px",
                borderRadius: "10px",
                border: "1px solid #bfdbfe",
              }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.825rem", mt: 0.25 }}>
            Real-time pipeline of customer leads, assignments, and disposition statuses.
          </Typography>
        </Box>

        {/* Action Controls */}
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}>
          <CsvUploader onFileUpload={handleFileUpload} />
          <Button
            variant="outlined"
            size="small"
            onClick={handleExport}
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: "18px !important" }} />}
            sx={{
              height: "36px",
              px: 2,
              borderRadius: "9px",
              borderColor: "#e2e8f0",
              backgroundColor: "#ffffff",
              color: "#334155",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.8rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              "&:hover": {
                borderColor: "#cbd5e1",
                backgroundColor: "#f8fafc",
              },
            }}
          >
            Export Leads
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpenCreateLeadModal(true)}
            startIcon={<AddIcon sx={{ fontSize: "18px !important" }} />}
            sx={{
              height: "36px",
              px: 2.25,
              borderRadius: "9px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.8rem",
              boxShadow: "0 2px 4px 0 rgba(16, 185, 129, 0.25)",
              "&:hover": {
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                boxShadow: "0 4px 8px 0 rgba(16, 185, 129, 0.35)",
              },
            }}
          >
            Create Order
          </Button>
        </Stack>
      </Stack>

      {/* Filter Toolbar Card */}
      <Card
        sx={{
          mb: 2,
          backgroundColor: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.04)",
        }}
      >
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Grid2 container spacing={1.5} alignItems="center">
            {/* Search */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <SearchBar onSearch={(query) => fetchAllLeads(query)} />
            </Grid2>

            {/* Disposition */}
            <Grid2 size={{ xs: 12, sm: 6, md: 2.5 }}>
              <DispositionFilter onFilter={(query) => fetchAllLeads("", query)} />
            </Grid2>

            {/* Employee */}
            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.85rem" }}>Employee</InputLabel>
                <Select
                  value={employee?._id || ""}
                  onChange={handleEmployeeFilter}
                  label="Employee"
                  MenuProps={{ PaperProps: { sx: { maxHeight: 220, borderRadius: "10px" } } }}
                  sx={{
                    height: "38px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    backgroundColor: "#f8fafc",
                    "& fieldset": { borderColor: "#e2e8f0" },
                    "&:hover fieldset": { borderColor: "#cbd5e1" },
                    "&.Mui-focused fieldset": { borderColor: "#10b981" },
                  }}
                >
                  <MenuItem value="">
                    <em>All Employees</em>
                  </MenuItem>
                  {allUsers?.users?.length > 0
                    ? allUsers.users.map((item) => (
                        <MenuItem key={item._id} value={item._id} sx={{ fontSize: "0.85rem" }}>
                          {item.name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid2>

            {/* Date Pickers */}
            <Grid2 size={{ xs: 6, sm: 3, md: 1.75 }}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(date) => setFromDate(date)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        height: "38px",
                        borderRadius: "8px",
                        fontSize: "0.825rem",
                        backgroundColor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                        "&:hover fieldset": { borderColor: "#cbd5e1" },
                        "&.Mui-focused fieldset": { borderColor: "#10b981" },
                      },
                    },
                  },
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 6, sm: 3, md: 1.75 }}>
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(date) => setToDate(date)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        height: "38px",
                        borderRadius: "8px",
                        fontSize: "0.825rem",
                        backgroundColor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                        "&:hover fieldset": { borderColor: "#cbd5e1" },
                        "&.Mui-focused fieldset": { borderColor: "#10b981" },
                      },
                    },
                  },
                }}
              />
            </Grid2>

            {/* Filter Actions */}
            <Grid2 size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 0.5 }}>
              <Button
                variant="text"
                size="small"
                onClick={clearFilter}
                startIcon={<FilterAltOffOutlinedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  color: "#64748b",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  "&:hover": { color: "#0f172a", backgroundColor: "#f1f5f9" },
                }}
              >
                Clear All Filters
              </Button>

              {selectedCount > 0 && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAssignLead}
                  startIcon={<AssignmentIndOutlinedIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    px: 2,
                    boxShadow: "0 2px 4px 0 rgba(37, 99, 235, 0.25)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    },
                  }}
                >
                  Assign Selected ({selectedCount})
                </Button>
              )}
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      {/* Main Table Card */}
      <Card
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
          overflow: "hidden",
        }}
      >
        <MaterialReactTable
          state={{ isLoading: loading, pagination, rowSelection }}
          columns={columns}
          data={allLeads?.data?.length ? allLeads.data : []}
          enableDensityToggle={false}
          enableColumnActions={false}
          enableColumnFilters={false}
          enableFullScreenToggle={false}
          enableHiding={false}
          enableSorting={true}
          enableRowSelection={true}
          getRowId={(row) => row._id}
          onRowSelectionChange={setRowSelection}
          manualPagination={true}
          onPaginationChange={setPagination}
          rowCount={totalCount ?? 0}
          initialState={{ density: "comfortable" }}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: "#f8fafc",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "#475569",
              py: 1.5,
              borderBottom: "2px solid #e2e8f0",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              borderBottom: "1px solid #f1f5f9",
              color: "#334155",
              fontSize: "0.85rem",
              py: 1.25,
            },
          }}
          muiTableBodyProps={{
            sx: {
              "& tr": {
                transition: "background-color 0.15s ease-in-out",
              },
              "& tr:hover": {
                backgroundColor: "#f8fafc !important",
              },
            },
          }}
          muiBottomToolbarProps={{
            sx: {
              backgroundColor: "#ffffff",
              borderTop: "1px solid #f1f5f9",
              py: 1,
            },
          }}
        />
      </Card>

      {showAssignModal && (
        <AssignLeadModal
          leads={selectedLeads}
          assignLeadFunc={assignLeadFunc}
          onClose={() => setShowAssignModal(false)}
        />
      )}
      <ViewEditLead
        open={openViewEditModal}
        onClose={() => setOpenViewEditModal(false)}
        isViewLeadModal={isViewLeadModal}
        leadDetails={leadDetails}
        onSubmit={handleUpdateLead}
      />
      <Toaster
        message={toast.message}
        open={toast.open}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
      <CreateLeadModal
        open={openCreateLeadModal}
        onClose={() => setOpenCreateLeadModal(false)}
        onSubmit={handleCreateLead}
      />
    </Box>
  );
};

export default LeadTable;