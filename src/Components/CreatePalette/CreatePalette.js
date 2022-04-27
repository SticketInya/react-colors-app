import * as React from 'react';
import { ChromePicker } from 'react-color';

//MUI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function CreatePalette() {
    const [open, setOpen] = React.useState(true);
    const [color, setColor] = React.useState('rgba(0,0,0,1)');
    const [currentColor, setCurrentColor] = React.useState('blue');
    const [allColors, setAllColors] = React.useState(['red', 'purple']);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    const handleColorChangeComplete = (newCurrentColor) => {
        setCurrentColor(newCurrentColor.hex);
    };

    const addColor = () => {
        setAllColors((prevColors) => [...prevColors, currentColor]);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='fixed' open={open}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' noWrap component='div'>
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant='persistent'
                anchor='left'
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <h3>Create Your Palette</h3>
                <div className='btn-container'>
                    <Button variant='contained'>Contained</Button>
                    <Button variant='outlined'>Outlined</Button>
                </div>
                <ChromePicker
                    color={color}
                    onChange={handleColorChange}
                    onChangeComplete={handleColorChangeComplete}
                />
                <Button
                    variant='contained'
                    style={{ backgroundColor: currentColor }}
                    onClick={addColor}
                >
                    Add Color
                </Button>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <div>
                    <ul className='CreatePalette__colors'>
                        {allColors.map((color) => {
                            return (
                                <li
                                    key={color}
                                    style={{
                                        color: 'white',
                                        backgroundColor: color,
                                    }}
                                >
                                    {color}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Main>
        </Box>
    );
}
