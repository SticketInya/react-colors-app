import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import DefaultColors from './Components/DefaultColors';
import FindPalette from './Helpers/FindPalette';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route exact path={'/'} element={<h1>Home</h1>} />
                <Route
                    exact
                    path={'/palette/:id'}
                    element={<FindPalette colorPalettes={DefaultColors} />}
                />
                <Route path={'*'} element={<Navigate to='/' replace />} />
            </Routes>
        </div>
    );
}

export default App;
