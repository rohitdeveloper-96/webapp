import Modal from '@mui/material/Modal';
import { Checkbox, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
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
const DeleteDialog = ({ openDialog, onDialogClose,onClickDeleteHandler}) => {
    return (
        <Modal
            open={openDialog}
            onClose={onDialogClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style, width: 500 }}>
                <Tooltip title="close" align="left">
                    <IconButton sx={{ float: "right" }}>
                        <CloseIcon onClick={onDialogClose} />
                    </IconButton>
                </Tooltip>
                <Typography variant='h4' sx={{ textAlign: "center" }}>Delete User</Typography>
                <Typography variant='h5' mt={3} sx={{ textAlign: "center" }}>Are You Sure Want to Delete this UsersName?</Typography>
                <Box
                    sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="error"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onClickDeleteHandler}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>

        </Modal>
    )
}
export default DeleteDialog