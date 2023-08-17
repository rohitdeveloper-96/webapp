import Header from '../components/header'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUser } from '../api/getUsersList'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
const UserDetails = () => {
    const { id, useremail } = useParams();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails.userDetails);
    const [username,setUsername] = useState("")
    const [email, setemail] = useState("")
    const [JoineDate, setJoinedDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [skills, setSkills] = useState("")
    const [active, setActive] = useState(false)
    const [name, setname] = useState("")
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        getUser(dispatch, id)
        let username = localStorage.getItem("name")
        setname(username)
    }, [])
    useEffect(() => {
        let active = (userDetails.active ?? "").toString();
        let admin = (userDetails.isAdmin ?? "").toString();
        setUsername(userDetails.name)
        setemail(userDetails.email)
        setJoinedDate(userDetails.poolJoinedDate)
        setEndDate(userDetails.poolEndDate)
        setSkills(userDetails.primarySkills)
        setActive(active)
        setAdmin(admin)
    }, [userDetails])

    const onClickHandler = () => {
        navigate('/')
    }

    return (
        <div>
            <Header username={name} />
            <Box
                sx={{
                    width: 800,
                    height: 470,
                    margin: "0 auto",
                    border: "1px solid #dfd0d0",
                    borderRadius: "10px",
                    boxShadow: "5px 10px #888888",
                    backgroundColor: '#f8f1ff',
                    marginTop: "100px"
                }}
            >
                <Typography variant='h6' mt={2} mr={3} sx={{ textAlign: "center" }}>{"User Details".toUpperCase()}</Typography>
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Box sx={{ width: 600, textAlign: "center" }}><Typography variant='h6' >{"UserName"}</Typography></Box>
                    <Typography variant='h6' sx={{ width: 400 }}>{":"}</Typography>
                    <Typography variant='h6' sx={{ width: 400 }}>{username}</Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Box sx={{ width: 600, textAlign: "center" }}> <Typography variant='h6'>{"Email-id"}</Typography></Box>
                    <Box sx={{ width: 100 }}><Typography variant='h6' sx={{ width: 400 }}>{":"}</Typography></Box>
                    <Box sx={{ width: 600, textAlign: "center" }}><Typography variant='h6' >{email}</Typography></Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Box sx={{ width: 600, textAlign: "center" }}> <Typography variant='h6'>{"Admin"}</Typography></Box>
                    <Box sx={{ width: 100 }}><Typography variant='h6' sx={{ width: 400 }}>{":"}</Typography></Box>
                    <Box sx={{ width: 600, textAlign: "center" }}><Typography variant='h6' >{admin}</Typography></Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                >
                    <Box sx={{ width: 600, textAlign: "center" }}> <Typography variant='h6'>{"Active"}</Typography></Box>
                    <Box sx={{ width: 100 }}><Typography variant='h6' sx={{ width: 400 }}>{":"}</Typography></Box>
                    <Box sx={{ width: 600, textAlign: "center" }}><Typography variant='h6' >{active}</Typography></Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                >
                    <Box sx={{ width: 600, textAlign: "center" }}> <Typography variant='h6'>{"JoinedDate"}</Typography></Box>
                    <Box sx={{ width: 100 }}><Typography variant='h6' sx={{ width: 400 }}>{":"}</Typography></Box>
                    <Box sx={{ width: 600, textAlign: "center" }}><Typography variant='h6' >{JoineDate}</Typography></Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                >
                    <Box sx={{ width: 600, textAlign: "center" }}> <Typography variant='h6'>{"EndDate"}</Typography></Box>
                    <Box sx={{ width: 100 }}><Typography variant='h6' sx={{ width: 400 }}>{":"}</Typography></Box>
                    <Box sx={{ width: 600, textAlign: "center" }}><Typography variant='h6' >{endDate}</Typography></Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                >
                    <Box sx={{ width: 600, textAlign: "center" }}> <Typography variant='h6'>{"PrimarySkills"}</Typography></Box>
                    <Box sx={{ width: 100 }}><Typography variant='h6' sx={{ width: 400 }}>{":"}</Typography></Box>
                    <Box sx={{ width: 600, textAlign: "center" }}><Typography variant='h6' >{skills}</Typography></Box>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    color='success'
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onClickHandler}

                >
                    Back
                </Button>
            </Box>
        </div>

    )
}
export default UserDetails