import { Alert, Slide, Snackbar } from '@mui/material';

export const AlertToast = ({ message, setMessage }: any) => {
    function TransitionLeft(props: any) {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setMessage({ status: '', description: '' });
    };

    return (
        <Snackbar
            open={message.status !== ''}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={TransitionLeft}
        >
            <Alert onClose={handleClose} severity={message.status} sx={{ width: '100%' }}>
                {message.description}
            </Alert>
        </Snackbar>
    );
};
