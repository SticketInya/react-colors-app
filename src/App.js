import './App.css';
import generatePalette from './Helpers/ColorHelper';
import ColorPalette from './Components/ColorPalette/ColorPalette';
import DefaultColors from './Components/DefaultColors';

function App() {
    return (
        <div className='App'>
            <ColorPalette palette={generatePalette(DefaultColors[0])} />
        </div>
    );
}

export default App;
