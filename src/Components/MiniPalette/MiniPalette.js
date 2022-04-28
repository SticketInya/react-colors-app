import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Mui
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue, red } from '@mui/material/colors';

import './MiniPalette.scss';

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
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    backgroundColor: red[100],
                                    color: red[600],
                                }}
                            >
                                <DeleteIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Delete' />
                    </ListItem>

                    <ListItem button onClick={handleClose} key={'btn-cancel'}>
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    backgroundColor: blue[100],
                                    color: blue[600],
                                }}
                            >
                                <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Cancel' />
                    </ListItem>
                </List>
            </Dialog>
        </>
    );
}
