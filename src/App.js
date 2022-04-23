import './App.css';
import generatePalette from './Helpers/ColorHelper';
import ColorPalette from './Components/ColorPalette/ColorPalette';
import DefaultColors from './Components/DefaultColors';

function App() {
    console.log(generatePalette(DefaultColors[0]));
    return (
        <div className='App'>
            <ColorPalette {...DefaultColors[0]} />
        </div>
    );
}

export default App;
