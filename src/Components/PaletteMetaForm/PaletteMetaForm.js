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
        handleClose();
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
                <DialogTitle>Name Your Palette</DialogTitle>
                <ValidatorForm onSubmit={handlePaletteSave}>
                    <DialogContent>
                        <DialogContentText>
                            Please name your beautiful Palette! Make sure to use
                            a just as unique name as it is!
                        </DialogContentText>
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
                            fullWidth
                            margin='normal'
                            label='Palette Name'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' type='submit'>
                            Save
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}
