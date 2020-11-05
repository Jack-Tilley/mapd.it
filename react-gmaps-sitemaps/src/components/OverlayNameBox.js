import React, {useState, useContext} from 'react';
import {MapContext} from './MapContext'

const OverlayNameBox = () => {
    const [name, setName] = useState('')
    const [ myMap, setMyMap, center, setCenter, isLoaded, draw, setDraw, nodes, setNodes] = useContext(MapContext);

    const addItem = () => {
        // updateDM()
        let newNode = {
                value: name,
                label: name,
                // icon: <FontAwesomeIcon icon={faHome} />,
        }

        // updateNodes(mynodes.map(item => 
        //     item.children === target.parent.children
        //     ? {...item, children : target.parent.children.concat(newNode)} 
        //     : item
        // )); 
        console.log('node added')
    }

    return (
        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
    )
}
export default OverlayNameBox;