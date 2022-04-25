import React from 'react';
import { useParams } from 'react-router-dom';
import ColorPalette from '../Components/ColorPalette/ColorPalette';
import generatePalette from './ColorHelper';

function FindPalette({ colorPalettes }) {
    const { id } = useParams();
    const correctPalette = colorPalettes.find((palette) => palette.id === id);

    return <ColorPalette palette={generatePalette(correctPalette)} />;
}

export default FindPalette;
