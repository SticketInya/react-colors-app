import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from '../DraggableColorBox/DraggableColorBox';

import './DndColorBoxList.css';

function DndColorBoxList({ allColors, deleteColor }) {
    return (
        <div className='DndColorBoxList'>
            {allColors.map((color, index) => (
                <DraggableColorBox
                    index={index}
                    color={color.color}
                    name={color.name}
                    key={color.name}
                    deleteColor={deleteColor}
                />
            ))}
        </div>
    );
}

export default SortableContainer(DndColorBoxList);
