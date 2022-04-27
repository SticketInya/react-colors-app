import * as React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { useNavigate } from 'react-router-dom';

//MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { DrawerHeader, Main, drawerWidth } from '../../Helpers/MuiDrawerStyles';

//Own
import DndColorBoxList from '../DndColorBoxList/DndColorBoxList';
import CreatePaletteNav from '../CreatePaletteNav/CreatePaletteNav';

import './CreatePalette.css';
import ColorPickerForm from '../ColorPickerForm/ColorPickerForm';

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
