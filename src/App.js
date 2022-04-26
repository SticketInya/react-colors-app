import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import DefaultColors from './Components/DefaultColors';
import FindPalette from './Helpers/FindPalette';
import PaletteList from './Components/PaletteList/PaletteList';
import SingleColorPalette from './Components/SingleColorPalette/SingleColorPalette';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route
                    path={'/'}
                    element={<PaletteList palettes={DefaultColors} />}
                />
                <Route
                    path={'palette/:id'}
                    element={<FindPalette colorPalettes={DefaultColors} />}
                />
                <Route
                    path={'palette/:paletteId/:colorId'}
                    element={<SingleColorPalette />}
                />
                <Route path={'*'} element={<Navigate to='/' replace />} />
            </Routes>
        </div>
    );
}

export default App;
