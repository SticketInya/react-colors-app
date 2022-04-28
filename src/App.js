import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import DefaultColors from './Components/DefaultColors';
import FindPalette from './Helpers/FindPalette';
import PaletteList from './Components/PaletteList/PaletteList';
import ColorPalette from './Components/ColorPalette/ColorPalette';
import SingleColorPalette from './Components/SingleColorPalette/SingleColorPalette';
import CreatePalette from './Components/CreatePalette/CreatePalette';
import { useEffect, useState } from 'react';

function App() {
    const [allPalettes, setAllPalettes] = useState(() => getInitalPalettes());

    function getInitalPalettes() {
        return JSON.parse(localStorage.getItem('palettes')) || DefaultColors;
    }

    const savePalette = (newPalette) => {
        setAllPalettes((prevState) => [...prevState, newPalette]);
    };

    const deletePalette = (paletteId) => {
        setAllPalettes((prevPalettes) => {
            return prevPalettes.filter((palette) => palette.id !== paletteId);
        });
    };

    const getPaletteNames = () => {
        return allPalettes.map((palette) => palette.paletteName);
    };

    const getRandomColor = () => {
        const randPaletteIndex = Math.floor(Math.random() * allPalettes.length);
        const randColorIndex = Math.floor(
            Math.random() * allPalettes[randPaletteIndex].colors.length,
        );
        return allPalettes[randPaletteIndex].colors[randColorIndex];
    };

    useEffect(() => {
        localStorage.setItem('palettes', JSON.stringify(allPalettes));
    }, [allPalettes]);

    return (
        <div className='App'>
            <Routes>
                <Route
                    path={'/'}
                    element={
                        <PaletteList
                            palettes={allPalettes}
                            deletePalette={deletePalette}
                        />
                    }
                />
                <Route
                    path={'palette/new'}
                    element={
                        <CreatePalette
                            savePalette={savePalette}
                            getNames={getPaletteNames}
                            defaultColors={DefaultColors[0].colors}
                            getRandomColor={getRandomColor}
                        />
                    }
                />
                <Route
                    path={'palette/:id'}
                    element={
                        <FindPalette colorPalettes={allPalettes}>
                            <ColorPalette />
                        </FindPalette>
                    }
                />
                <Route
                    path={'palette/:id/:colorId'}
                    element={
                        <FindPalette colorPalettes={allPalettes}>
                            <SingleColorPalette />
                        </FindPalette>
                    }
                />
                <Route path={'*'} element={<Navigate to='/' replace />} />
            </Routes>
        </div>
    );
}

export default App;
