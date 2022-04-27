import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import DefaultColors from './Components/DefaultColors';
import FindPalette from './Helpers/FindPalette';
import PaletteList from './Components/PaletteList/PaletteList';
import ColorPalette from './Components/ColorPalette/ColorPalette';
import SingleColorPalette from './Components/SingleColorPalette/SingleColorPalette';
import CreatePalette from './Components/CreatePalette/CreatePalette';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route
                    path={'/'}
                    element={<PaletteList palettes={DefaultColors} />}
                />
                <Route path={'palette/new'} element={<CreatePalette />} />
                <Route
                    path={'palette/:id'}
                    element={
                        <FindPalette colorPalettes={DefaultColors}>
                            <ColorPalette />
                        </FindPalette>
                    }
                />
                <Route
                    path={'palette/:id/:colorId'}
                    element={
                        <FindPalette colorPalettes={DefaultColors}>
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
