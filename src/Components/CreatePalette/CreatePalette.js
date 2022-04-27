import * as React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { useNavigate } from 'react-router-dom';

//MUI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';

//Own
import DndColorBoxList from '../DndColorBoxList/DndColorBoxList';
import CreatePaletteNav from '../CreatePaletteNav/CreatePaletteNav';

import './CreatePalette.css';
import ColorPickerForm from '../ColorPickerForm/ColorPickerForm';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
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

export default function CreatePalette({
    savePalette,
    getNames,
    defaultColors,
    getRandomColor,
    maxColors = 20,
}) {
    const [open, setOpen] = React.useState(true);

    const [allColors, setAllColors] = React.useState(defaultColors);
    const usedPaletteNames = getNames();
    const isPaletteFull = allColors.length >= maxColors;

    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleGetRandomColor = () => {
        let randomColor = getRandomColor();
        //TODO - Fix Duplicate Colors
        // while (!allColors.filter((color) => color.name !== randomColor.name)) {
        //     randomColor = getRandomColor();
        //     console.log(randomColor);
        // }
        setAllColors((prevColors) => [...prevColors, randomColor]);
    };

    const handlePaletteSave = (newPaletteName) => {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, '-'),
            emoji: ':)',
            colors: allColors,
        };
        savePalette(newPalette);
    };

    const handleBack = () => {
        navigate('../');
    };

    const addColor = (newColorEntry) => {
        setAllColors((prevColors) => [...prevColors, newColorEntry]);
    };

    const deleteColor = (name) => {
        setAllColors((prevColors) =>
            prevColors.filter((color) => color.name !== name),
        );
    };

    const clearPalette = () => {
        setAllColors([]);
    };

    const handleSortEnd = ({ oldIndex, newIndex }) => {
        setAllColors((prevColors) => arrayMove(prevColors, oldIndex, newIndex));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CreatePaletteNav
                AppBar={AppBar}
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleBack={handleBack}
                usedPaletteNames={usedPaletteNames}
                paletteSave={handlePaletteSave}
            />
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
                    <Button variant='contained' onClick={clearPalette}>
                        Clear Palette
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={handleGetRandomColor}
                        disabled={isPaletteFull}
                    >
                        Random Color
                    </Button>
                </div>
                <ColorPickerForm
                    isPaletteFull={isPaletteFull}
                    allColors={allColors}
                    addColor={addColor}
                />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <DndColorBoxList
                    allColors={allColors}
                    deleteColor={deleteColor}
                    axis='xy'
                    onSortEnd={handleSortEnd}
                />
            </Main>
        </Box>
    );
}
