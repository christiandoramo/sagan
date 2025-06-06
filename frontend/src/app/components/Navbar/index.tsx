import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import EventIcon from "@mui/icons-material/Event"
export const Navbar = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <EventIcon/>
                </IconButton>
            <Typography variant="h6">Navbar</Typography>
            </Toolbar>
        </AppBar>
    )
}