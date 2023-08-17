import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { emailregx } from '../util/helpers';
import { getUsersList } from '../api/getUsersList'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
function SignInPage() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true)
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Users.data);
  const navigate = useNavigate()

  useEffect(() => {
    if (email.match(emailregx)) {
      setIsValidEmail(true)
    }
  }, [email, data])

  useEffect(() => {
    getUsersList(dispatch)
  }, [])

  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/")
    }
  }, [])

  const onChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const onClickHandler = () => {
    let filter = Array.isArray(data) ? data.filter(item => item.isAdmin == "true") : [];
    let findemail = filter.findIndex((item) => {
      if (item.email === email) {
        return true;
      } else {
        return false;
      }
    })
    let Username = filter.find((item) => {
      if (item.email === email) {
        return item.name;
      }
    })
    if (findemail !== -1) {
      if (email.match(emailregx)) {
        getUsersList(dispatch)
        let userEmailID = email.toString()
        localStorage.setItem("email", userEmailID)
        localStorage.setItem("name", Username.name)
        setIsValidEmail(true)
        setEmail('')
        navigate("/")
      }
      else {
        setIsValidEmail(false)
      }
    } else {
      setIsValidEmail(false)
    }


  }
  return (
    <Container>
      <Box
        sx={{
          width: 800,
          height: 400,
          margin: "0 auto",
          border: "1px solid #dfd0d0",
          borderRadius: "10px",
          boxShadow: "5px 10px #888888",
          backgroundColor: '#f8f1ff',
          marginTop: "100px"
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign In
          </Typography>
          <Box
            sx={{ mt: 4, width: 400 }}
          >
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              value={email}
              error={!isValidEmail}
              focused={!isValidEmail}
              onChange={(e) => onChangeHandler(e)}
            />
            {!isValidEmail && <Typography style={{ color: '#d11212' }}>Please enter a valid Admin email address.</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickHandler}

            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignInPage;
