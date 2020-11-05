import React, {useState, useEffect, useContext} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {parse, stringify} from 'flatted';

import AddNodeModal from './AddNodeModal'
import {MapContext} from './MapContext'


const SiteTree = () => {
    const [ myMap, setMyMap, center, setCenter, isLoaded, draw, setDraw, nodes, setNodes, activeNode, setActiveNode, icon, setIcon] = useContext(MapContext);
    const [checked, setChecked] = useState(['Mods'])
    const [expanded, setExpanded] = useState([])
    const [value, setValue]= useState('')
    const [nodeType, setNodeType] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [event, setEvent] = useState()

    const onCheck = (checked, targetNode) => {
        // let x = parse(stringify(targetNode))
        // console.log(x)
        // console.log(targetNode["nodeReference"])
        // targetNode.nodeReference.visible = false
        setChecked(checked);
        // console.log(checked)
    }

    const onExpand = (expanded) => {
        setExpanded(expanded);
        // console.log(expanded)
    }

    const onClick = (e) => {
        console.log(e)
        if (e.value === '+'){
            setEvent(e)
            setActiveNode(null)
            handleClickOpen()
      }
    }

    const handleClickOpen = () => {
        setModalOpen(true);
      };

    const addItem = (target) => {
        // updateDM()
        let newNode = {
                value: value,
                label: value,
                latLngArr: [],
                apiPath: '',
                nodeType: nodeType,
                icon: icon,
                // icon: <FontAwesomeIcon icon={faHome} />,
        }
        setActiveNode(newNode)
        setNodes(nodes.map(item => 
            item.children === target.parent.children
            ? {...item, children : target.parent.children.concat(newNode)} 
            : item
        )); 
    }

    return (
        <>
        <CheckboxTree
            checked={checked}
            expanded={expanded}
            iconsClass="fa5"
            nodes={nodes}
            onCheck={onCheck}
            onExpand={onExpand}
            onClick={onClick}
        >
        </CheckboxTree>
        <AddNodeModal modalOpen={modalOpen} setModalOpen={setModalOpen} value={value} setValue={setValue} nodeType={nodeType} setNodeType={setNodeType} addItem={addItem} event={event} setEvent={setEvent}/>
        </>
    );
}


export default SiteTree;