import React, { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { AppBar } from '../../Helpers/MuiDrawerStyles';

function CreatePaletteNav({
    open,
    handleDrawerOpen,
    handleBack,
    paletteSave,
    usedPaletteNames,
}) {
    const [newPaletteName, setNewPaletteName] = useState('');

    const handlePaletteNameChange = (e) => {
        setNewPaletteName(e.target.value);
    };

    const handlePaletteSave = () => {
        paletteSave(newPaletteName);
    };

    React.useEffect(() => {
        if (!ValidatorForm.hasValidationRule('isPaletteNameUnique')) {
            ValidatorForm.addValidationRule('isPaletteNameUnique', (_value) => {
                return usedPaletteNames.every(
                    (name) =>
                        name.toLowerCase() !== newPaletteName.toLowerCase(),
                );
            });
        }

        return function cleanCustomRules() {
            if (ValidatorForm.hasValidationRule('isPaletteNameUnique')) {
                ValidatorForm.removeValidationRule('isPaletteNameUnique');
            }
        };
    });

    return (
        <>
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
        </>
    );
}

export default CreatePaletteNav;
