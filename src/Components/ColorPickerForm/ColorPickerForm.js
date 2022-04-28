import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@mui/material';

import './ColorPickerForm.scss';

function ColorPickerForm({ isPaletteFull, allColors, addColor }) {
    const [color, setColor] = useState('rgba(0,0,0,1)');
    const [currentColor, setCurrentColor] = useState('blue');
    const [newColorName, setNewColorName] = useState('');

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    const handleColorChangeComplete = (newCurrentColor) => {
        setCurrentColor(newCurrentColor.hex);
    };

    const handleColorNameChange = (e) => {
        setNewColorName(e.target.value);
    };

    const handleSubmit = () => {
        const newColorEntry = { name: newColorName, color: currentColor };
        addColor(newColorEntry);
        setNewColorName('');
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

        return function cleanCustomRules() {
            if (ValidatorForm.hasValidationRule('isColorNameUnique')) {
                ValidatorForm.removeValidationRule('isColorNameUnique');
            }
            if (ValidatorForm.hasValidationRule('isColorUnique')) {
                ValidatorForm.removeValidationRule('isColorUnique');
            }
        };
    });

    return (
        <div className='ColorPickerForm'>
            <ChromePicker
                className='ColorPickerForm__colorpicker'
                color={color}
                onChange={handleColorChange}
                onChangeComplete={handleColorChangeComplete}
            />
            <ValidatorForm
                onSubmit={handleSubmit}
                className='ColorPickerForm__form'
            >
                <TextValidator
                    className='ColorPickerForm__input'
                    name='newColorName'
                    variant='filled'
                    label='Color Name'
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
                    className='ColorPickerForm__submit'
                    type='submit'
                    variant='contained'
                    style={{
                        backgroundColor: isPaletteFull ? 'grey' : currentColor,
                    }}
                    disabled={isPaletteFull}
                >
                    {isPaletteFull ? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    );
}

export default ColorPickerForm;
