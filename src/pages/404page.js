import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
const errorPage = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography component="h1" variant="h5"  >
                404 Page Not Found
            </Typography>
        </Box >
    )
}
export default errorPage