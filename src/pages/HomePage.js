import React, { useEffect, useState } from 'react';
import Header from '../components/header'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList, postUsersList, deleteUsersList, updateUsersList, getUser } from '../api/getUsersList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Checkbox, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import TablePagination from '@mui/material/TablePagination';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CloseIcon from '@mui/icons-material/Close';
import { alphabets, emailregx, alphanum } from '../util/helpers';
import moment from "moment"
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import DeleteDialog from '../components/DeleteDialog'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'poolJoinedDate',
        numeric: true,
        disablePadding: false,
        label: 'PoolJoinedDate',
    },
    {
        id: 'PoolEndDate',
        numeric: true,
        disablePadding: false,
        label: 'PoolEndDate',
    },
    {
        id: 'primaryskills',
        numeric: true,
        disablePadding: false,
        label: 'PrimarySkills',
    },
    {
        id: 'delete',
        numeric: true,
        disablePadding: false,
        label: 'Delete',
    },
    {
        id: 'edit',
        numeric: true,
        disablePadding: false,
        label: 'Update',
    },
    {
        id: 'details',
        numeric: true,
        disablePadding: false,
        label: 'Details ',
    },
];
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = Array.isArray(array) ? array.map((el, index) => [el, index]) : [];
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableToolbar(props) {
    const { numSelected, handleOpen } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    UserLists
                </Typography>
            )}

            {numSelected > 0 ? (
                null
            ) : (
                <Tooltip title="Create">
                    <IconButton>
                        <AddIcon onClick={handleOpen} />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    handleOpen: PropTypes.func.isRequired
};

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {/* <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    /> */}
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const HomePage = () => {
    const usersList = useSelector(state => state.Users.data)
    const [data, setUserData] = useState([])
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setopenDeleteDialog] = useState(false)
    const [showToastDelete, setshowToastDelete] = useState(false)
    const [openEditDialog, setopenEditDialog] = useState(false)
    const [showToastEdit, setshowToastEdit] = useState(false)
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [joindedDate, setJoinedDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [admin, setAdminBool] = useState(true);
    const [active, setActive] = useState(true);
    const [skills, setSkills] = useState("");

    const [updateUserName, updatesetUserName] = useState("");
    const [updateuserEmail, updatesetUserEmail] = useState("");
    const [updatejoindedDate, updatesetJoinedDate] = useState(null)
    const [updateendDate, updatesetEndDate] = useState(null)
    const [updateadmin, updatesetAdminBool] = useState();
    const [updateactive, updatesetActive] = useState(true);
    const [updateskills, updatesetSkills] = useState("");

    const [isValidName, setIsValidName] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidDate, setIsValidDate] = useState(true)
    const [isValidSkills, setIsValidSkills] = useState(true)
    const [Loading, setLoading] = useState(false)
    const [showToast, setToast] = useState(false)
    const [showToastemail, setToastemail] = useState(false)
    const [message, setMessage] = useState("")
    const [findUser, setIndexOfFindUser] = useState("")
    const [name, setname] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("email")) {
            navigate("/SignIn")
        }
        getUsersList(dispatch)
        setLoading(false)
        let username = localStorage.getItem("name")
        setname(username)
    }, [])

    useEffect(() => {
        if (usersList.length !== 0) {
            setUserData(usersList)
        } else {
            setUserData([])
        }

    }, [usersList])

    const visibleRows = React.useMemo(
        () =>
            stableSort(data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, data.length !== 0 ? data : ""],
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseDeleteDialog = () => {
        setopenDeleteDialog(false);
    };

    const handleCloseEditDialog = () => {
        setopenEditDialog(false);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const reload = () => window.location.reload();

    const onClickHandler = () => {
        let end = endDate === null ? "" : (moment(endDate).format('MM/DD/YYYY hh:mm a'))
        const find = data.findIndex(item => item.email === userEmail)

        if (userName.match(alphabets)) {
            setIsValidName(true)
            if (userEmail.match(emailregx)) {
                setIsValidEmail(true)
                if (joindedDate) {
                    setIsValidDate(true)
                    if (skills.match(alphanum)) {
                        if (find === -1) {
                            console.log("new email")
                            setIsValidSkills(true)
                            postUsersList(userName, userEmail, admin, active, moment(joindedDate).format('MM/DD/YYYY hh:mm a'), end, skills)
                            setMessage("The User Has been created Successfully")
                            setOpen(false);
                            reload()
                            setLoading(true)
                            setToastemail(false)
                            setToast(true)
                        } else {
                            setToastemail(true)
                            setMessage("This Email Already Exsist")
                        }
                    }
                    else {
                        setIsValidSkills(false)
                    }
                }
                else {
                    setIsValidDate(false)
                }
            }

            else {
                setIsValidEmail(false)
            }
        }
        else {
            setIsValidName(false)
        }

    }

    const onUpdateHandler = () => {
        let end = updateendDate === null ? "" : moment(updateendDate).format('MMMM Do YYYY, h:mm:ss a')
        let id = findUser.id;
        if (updateUserName.match(alphabets)) {
            setIsValidName(true)
            if (updateuserEmail.match(emailregx)) {
                setIsValidEmail(true)
                if (updatejoindedDate) {
                    setIsValidDate(true)
                    if (updateskills.match(alphanum)) {
                        console.log("new email")
                        setIsValidSkills(true)
                        updateUsersList(id, updateUserName, updateuserEmail, updateadmin, updateactive, moment(updatejoindedDate).format('MMMM Do YYYY, h:mm:ss a'), end, updateskills)
                        setMessage("The User Has been Updated Successfully")
                        setOpen(false);
                        reload()
                        setLoading(true)
                        setToast(true)
                    }
                    else {
                        setIsValidSkills(false)
                    }
                }
                else {
                    setIsValidDate(false)
                }
            }

            else {
                setIsValidEmail(false)
            }
        }
        else {
            setIsValidName(false)
        }

    }

    //Open delete dialog
    const onHandleDelete = (row) => {
        let findIndex = data.find(item => item.id === row.id)
        setIndexOfFindUser(findIndex)
        setopenDeleteDialog(true)
    }

    const handleDelete = () => {
        let id = findUser.id;
        deleteUsersList(id)
        setMessage("The User Has been Deleted Successfully")
        setopenDeleteDialog(false);
        reload()
        setLoading(true)
        setshowToastDelete(true)
    }

    const onHandleEdit = (row) => {
        let findIndex = data.find(item => item.id === row.id)
        setIndexOfFindUser(findIndex)
        updatesetUserName(findIndex.name)
        updatesetUserEmail(findIndex.email)
        updatesetJoinedDate(moment(findIndex.poolJoinedDate).format("MM/DD/YYYY hh:mm a"))
        updatesetEndDate(moment(findIndex.poolEndDate).format("MM/DD/YYYY hh:mm a"))
        updatesetAdminBool(findIndex.isAdmin)
        updatesetActive(findIndex.active)
        updatesetSkills(findIndex.primarySkills)
        setIndexOfFindUser(findIndex)
        setopenEditDialog(true)
    }

    const HandleNavigate = (row) => {
        let findIndex = data.find(item => item.id === row.id)
        localStorage.setItem("data", JSON.stringify(findIndex))
        navigate(`/details/${findIndex.id}/${findIndex.email}`);
        getUser(dispatch, findIndex.id)

    }

    return (
        <>
            <Header username={name} />
            {showToast && <Alert onClose={() => { setToast(false) }}>{message}</Alert>}
            {showToastDelete && <Alert onClose={() => setshowToastDelete(false)}>{message}</Alert>}
            {Loading &&
                <CircularProgress size="lg" />}
            <Box sx={{ width: '90%', mt: 10, ml: 9 }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} handleOpen={handleOpen} />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 750 }} aria-label="simple table" >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {visibleRows.length !== 0 ? visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.email);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.email}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >

                                            <TableCell padding="checkbox">
                                                {/* <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                /> */}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.poolJoinedDate}</TableCell>
                                            <TableCell align="right">{row.poolEndDate}</TableCell>
                                            <TableCell align="right">{row.primarySkills}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Delete">
                                                    <IconButton>
                                                        <DeleteIcon onClick={() => onHandleDelete(row)} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Update">
                                                    <IconButton>
                                                        <ModeEditIcon onClick={() => onHandleEdit(row)} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Button sx={{ color: "green" }} onClick={() => HandleNavigate(row)}>
                                                    ViewDetails
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    )
                                }) : <Box style={{ width: 200, margin: "0 auto" }}><Typography>No record Found!</Typography></Box>}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
                    />
                </Paper>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    {showToastemail && <Alert severity="error" onClose={() => { setToastemail(false); }}>{message}</Alert>}
                    <Tooltip title="close" align="left">
                        <IconButton sx={{ float: "right" }}>
                            <CloseIcon onClick={handleClose} />
                        </IconButton>
                    </Tooltip>
                    <h2 id="child-modal-title" >Create Users</h2>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            value={userName}
                            error={!isValidName}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            id="email"
                            label="Email Address"
                            value={userEmail}
                            error={!isValidEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            sx={{ ml: 5 }}
                        />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",

                    }}>
                        <Box
                            sx={{ width: 270 }}
                        >
                            {!isValidName && <Typography style={{ color: '#d11212', justifyContent: "flex-start" }}>Name is Required</Typography>}
                        </Box>
                        <Box>
                            {!isValidEmail && <Typography style={{ color: '#d11212', alignItems: "flex-end" }}>Email-id is required.</Typography>}
                        </Box>
                    </Box>

                    <FormControl sx={{ mt: 2, minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Admin</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            value={admin}
                            onChange={(e) => setAdminBool(e.target.value)}
                            label="Admin"
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </FormControl>
                    {!admin ?
                        <>
                            <FormControl sx={{ mt: 2, ml: 5, minWidth: 230 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Active</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="active"
                                    value={active}
                                    onChange={(e) => setActive(e.target.value)}
                                    label="Active"
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    sx={{
                                        width: 230,
                                        mt: 2,

                                    }}
                                    id="joinedDate"
                                    label="Joined Date"
                                    value={joindedDate}
                                    onChange={(value) => setJoinedDate(value)}
                                />
                                <DateTimePicker
                                    sx={{
                                        width: 230,
                                        mt: 2,
                                        ml: 5
                                    }}
                                    disablePast
                                    id="endDate"
                                    label="End Date"
                                    value={endDate}
                                    onChange={(value) => setEndDate(value)}
                                />

                            </LocalizationProvider>
                            {!isValidDate && <Typography style={{ color: '#d11212' }}>DateField is Required</Typography>}
                            <TextField
                                fullWidth
                                id="skills"
                                label="PrimarySkills"
                                error={!isValidSkills}
                                value={skills}
                                sx={{
                                    mt: 2,
                                }}
                                onChange={(e) => setSkills(e.target.value)}
                            />
                            {!isValidSkills && <Typography style={{ color: '#d11212' }}>Primary Field is Required</Typography>}
                        </>
                        : null
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onClickHandler}
                    >
                        Create
                    </Button>
                </Box>
            </Modal>
            <DeleteDialog
                openDialog={openDeleteDialog}
                onDialogClose={handleCloseDeleteDialog}
                onClickDeleteHandler={handleDelete}
            />
            <Modal
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    <Tooltip title="close" align="left">
                        <IconButton sx={{ float: "right" }}>
                            <CloseIcon onClick={handleCloseEditDialog} />
                        </IconButton>
                    </Tooltip>
                    <h2 id="child-modal-title" >Update Users</h2>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            value={updateUserName}
                            error={!isValidName}
                            onChange={(e) => updatesetUserName(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            id="email"
                            label="Email Address"
                            value={updateuserEmail}
                            error={!isValidEmail}
                            onChange={(e) => updatesetUserEmail(e.target.value)}
                            sx={{ ml: 5 }}
                        />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",

                    }}>
                        <Box
                            sx={{ width: 270 }}
                        >
                            {!isValidName && <Typography style={{ color: '#d11212', justifyContent: "flex-start" }}>Name is Required</Typography>}
                        </Box>
                        <Box>
                            {!isValidEmail && <Typography style={{ color: '#d11212', alignItems: "flex-end" }}>Email-id is required.</Typography>}
                        </Box>
                    </Box>
                    <FormControl sx={{ mt: 2, minWidth: 230 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Admin</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            value={updateadmin}
                            onChange={(e) => updatesetAdminBool(e.target.value)}
                            label="Admin"
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </FormControl>
                    {!updateadmin ?
                        <>
                            <FormControl sx={{ mt: 2, ml: 5, minWidth: 230 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Active</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="active"
                                    value={updateactive}
                                    onChange={(e) => updatesetActive(e.target.value)}
                                    label="Active"
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    disableFuture
                                    sx={{
                                        width: 230,
                                        mt: 2,

                                    }}
                                    id="joinedDate"
                                    label="Joined Date"
                                    value={updatejoindedDate}
                                    onChange={(value) => updatesetJoinedDate(value)}
                                />
                                <DateTimePicker
                                    disablePast
                                    sx={{
                                        width: 230,
                                        mt: 2,
                                        ml: 5
                                    }}

                                    id="endDate"
                                    label="End Date"
                                    value={updateendDate}
                                    onChange={(value) => updatesetEndDate(value)}
                                />

                            </LocalizationProvider>
                            {!isValidDate && <Typography style={{ color: '#d11212' }}>DateField is Required</Typography>}
                            <TextField
                                fullWidth
                                id="skills"
                                label="PrimarySkills"
                                error={!isValidSkills}
                                value={updateskills}
                                sx={{
                                    mt: 2,
                                }}
                                onChange={(e) => updatesetSkills(e.target.value)}
                            />
                            {!isValidSkills && <Typography style={{ color: '#d11212' }}>Primary Field is Required</Typography>}
                        </>
                        : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onUpdateHandler}
                    >
                        Update
                    </Button>
                </Box>

            </Modal>
        </>
    )
}
export default HomePage;