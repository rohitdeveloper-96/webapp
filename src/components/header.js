import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

const settings = ['Logout'];

function Header({username}) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onClickHandler = () => {
        localStorage.removeItem('email')
        navigate("/SignIn")
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{ backgroundColor: "green" }} >
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <AdbIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            HappiestMinds
                        </Typography>
                    </Box>

                    <Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}>
                            <Tooltip title="click">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6" mt={0.5} ml={1} sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                            }}>
                                Hai {username}
                            </Typography>
                        </Box>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={onClickHandler}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Header;
