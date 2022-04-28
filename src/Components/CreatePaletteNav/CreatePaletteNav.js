import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { AppBar } from '../../Helpers/MuiDrawerStyles';

import './CreatePaletteNav.scss';
import PaletteMetaForm from '../PaletteMetaForm/PaletteMetaForm';

function CreatePaletteNav({
    open,
    handleDrawerOpen,
    handleBack,
    paletteSave,
    usedPaletteNames,
}) {
    return (
        <>
            <CssBaseline />
            <AppBar className='CreatePaletteNav' position='fixed' open={open}>
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
                        Create your Palette
                    </Typography>
                </Toolbar>
                <div className='Btn__container'>
                    <PaletteMetaForm
                        paletteSave={paletteSave}
                        usedPaletteNames={usedPaletteNames}
                    />
                    <Button
                        variant='outlined'
                        onClick={handleBack}
                        style={{ backgroundColor: 'white' }}
                    >
                        Back
                    </Button>
                </div>
            </AppBar>
        </>
    );
}

export default CreatePaletteNav;
