import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import DefaultColors from './Components/DefaultColors';
import FindPalette from './Helpers/FindPalette';
import PaletteList from './Components/PaletteList/PaletteList';
import ColorPalette from './Components/ColorPalette/ColorPalette';
import SingleColorPalette from './Components/SingleColorPalette/SingleColorPalette';
import CreatePalette from './Components/CreatePalette/CreatePalette';
import { useState } from 'react';

function App() {
    const [allPalettes, setAllPalettes] = useState(DefaultColors);

    const savePalette = (newPalette) => {
        setAllPalettes((prevState) => [...prevState, newPalette]);
    };

    const getPaletteNames = () => {
        return allPalettes.map((palette) => palette.paletteName);
    };

    return (
        <div className='App'>
            <Routes>
                <Route
                    path={'/'}
                    element={<PaletteList palettes={allPalettes} />}
                />
                <Route
                    path={'palette/new'}
                    element={
                        <CreatePalette
                            savePalette={savePalette}
                            getNames={getPaletteNames}
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
