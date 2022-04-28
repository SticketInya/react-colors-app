import React, { useEffect, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

//Mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PaletteMetaForm({ usedPaletteNames, paletteSave }) {
    const [newPaletteName, setNewPaletteName] = useState('');
    const [open, setOpen] = useState(false);

    const handlePaletteNameChange = (e) => {
        setNewPaletteName(e.target.value);
    };

    const handlePaletteSave = () => {
        paletteSave(newPaletteName);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
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
        <div>
            <Button variant='contained' onClick={handleClickOpen}>
                Save Palette
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Name your beautiful and super-duper unique color
                        palette!
                    </DialogContentText>
                    <ValidatorForm
                        onSubmit={handlePaletteSave}
                        className='CreatePaletteNav__form'
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
                            variant='filled'
                            label='Palette Name'
                        />
                        <Button variant='contained' type='submit'>
                            Save
                        </Button>
                    </ValidatorForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
