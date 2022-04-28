import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Mui
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

import './MiniPalette.css';

export default function MiniPalette({
    paletteName,
    emoji,
    colors,
    id,
    deletePalette,
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();
    const colorBoxes = colors.map((color) => {
        return (
            <div
                key={id + color.name}
                className='miniColor'
                style={{ backgroundColor: color.color }}
            />
        );
    });

    const goToPalette = () => {
        navigate(`/palette/${id}`);
    };

    const handleDelete = () => {
        deletePalette(id);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleClick = (e) => {
        e.stopPropagation();
        setDialogOpen(true);
    };

    return (
        <>
            <div className='MiniPalette' onClick={goToPalette}>
                <DeleteIcon
                    onClick={handleClick}
                    className='MiniPalette__delete'
                />
                <div className='MiniPalette__container'>
                    <div className='MiniPalette__colors'>{colorBoxes}</div>
                    <h2 className='MiniPalette__title'>
                        {paletteName}
                        <span className='emoji'>{emoji}</span>
                    </h2>
                </div>
            </div>
            <Dialog onClose={handleClose} open={dialogOpen}>
                <DialogTitle>
                    Would you like to delete this Palette?
                </DialogTitle>
                <List sx={{ pt: 0 }}>
                    <ListItem button onClick={handleDelete} key={'bnt-delete'}>
                        <ListItemText primary='Delete' />
                    </ListItem>

                    <ListItem button onClick={handleClose} key={'btn-cancel'}>
                        <ListItemText primary='Cancel' />
                    </ListItem>
                </List>
            </Dialog>
        </>
    );
}
