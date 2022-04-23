import './App.css';
import ColorPalette from './Components/ColorPalette/ColorPalette';
import DefaultColors from './Components/DefaultColors';

function App() {
    return (
        <div className='App'>
            <ColorPalette {...DefaultColors[0]} />
        </div>
    );
}

export default App;
