import React from 'react';
import { useParams } from 'react-router-dom';
import generatePalette from './ColorHelper';

function FindPalette({ children, colorPalettes }) {
    const { id } = useParams();
    const correctPalette = colorPalettes.find((palette) => palette.id === id);
    const generatedPalette = generatePalette(correctPalette);

    return (
        <>
            {React.cloneElement(children, {
                palette: generatedPalette,
            })}
        </>
    );
}

export default FindPalette;
