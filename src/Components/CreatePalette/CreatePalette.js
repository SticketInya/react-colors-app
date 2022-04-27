import * as React from 'react';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

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

//Own
import './CreatePalette.css';
import { useNavigate } from 'react-router-dom';
import DndColorBoxList from '../DndColorBoxList/DndColorBoxList';

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
    const [color, setColor] = React.useState('rgba(0,0,0,1)');
    const [currentColor, setCurrentColor] = React.useState('blue');
    const [newColorName, setNewColorName] = React.useState('');
    const [newPaletteName, setNewPaletteName] = React.useState('');
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

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    const handleColorChangeComplete = (newCurrentColor) => {
        setCurrentColor(newCurrentColor.hex);
    };

    const handleColorNameChange = (e) => {
        setNewColorName(e.target.value);
    };

    const handlePaletteNameChange = (e) => {
        setNewPaletteName(e.target.value);
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

    const handlePaletteSave = () => {
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

    const addColor = (e) => {
        const newColorEntry = { name: newColorName, color: currentColor };
        setAllColors((prevColors) => [...prevColors, newColorEntry]);
        setNewColorName('');
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

    React.useEffect(() => {
        if (!ValidatorForm.hasValidationRule('isColorNameUnique')) {
            ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
                return allColors.every(
                    ({ name }) =>
                        name.toLocaleLowerCase() !== value.toLocaleLowerCase(),
                );
            });
        }

        if (!ValidatorForm.hasValidationRule('isColorUnique')) {
            ValidatorForm.addValidationRule('isColorUnique', (_value) => {
                return allColors.every(({ color }) => color !== currentColor);
            });
        }

        if (!ValidatorForm.hasValidationRule('isPaletteNameUnique')) {
            ValidatorForm.addValidationRule('isPaletteNameUnique', (_value) => {
                return usedPaletteNames.every(
                    (name) =>
                        name.toLowerCase() !== newPaletteName.toLowerCase(),
                );
            });
        }

        return function cleanCustomRules() {
            if (ValidatorForm.hasValidationRule('isColorNameUnique')) {
                ValidatorForm.removeValidationRule('isColorNameUnique');
            }
            if (ValidatorForm.hasValidationRule('isColorUnique')) {
                ValidatorForm.removeValidationRule('isColorUnique');
            }
            if (ValidatorForm.hasValidationRule('isPaletteNameUnique')) {
                ValidatorForm.removeValidationRule('isPaletteNameUnique');
            }
        };
    });

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
                    <ValidatorForm
                        onSubmit={handlePaletteSave}
                        className='save-form'
                    >
                        <TextValidator
                            name='newPaletteName'
                            value={newPaletteName}
                            onChange={handlePaletteNameChange}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={[
                                'this field is required',
                                'Palette name must be unique',
                            ]}
                        />
                        <Button variant='contained' type='submit'>
                            Save
                        </Button>
                    </ValidatorForm>

                    <Button
                        variant='outlined'
                        onClick={handleBack}
                        style={{ backgroundColor: 'white' }}
                    >
                        Back
                    </Button>
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
                <ChromePicker
                    color={color}
                    onChange={handleColorChange}
                    onChangeComplete={handleColorChangeComplete}
                />
                <ValidatorForm onSubmit={addColor}>
                    <TextValidator
                        name='newColorName'
                        value={newColorName}
                        onChange={handleColorNameChange}
                        validators={[
                            'required',
                            'isColorNameUnique',
                            'isColorUnique',
                        ]}
                        errorMessages={[
                            'this field is required',
                            'Color name must be unique',
                            'This color is already used',
                        ]}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        style={{
                            backgroundColor: isPaletteFull
                                ? 'grey'
                                : currentColor,
                        }}
                        disabled={isPaletteFull}
                    >
                        {isPaletteFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
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
