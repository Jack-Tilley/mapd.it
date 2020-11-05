import React, {useState, useContext} from 'react';
import {MapContext} from './MapContext'
import { DrawingManager } from '@react-google-maps/api'

const DrawingComponent = () => {
    const [ myMap, setMyMap, center, setCenter, isLoaded, draw, setDraw, nodes, setNodes, activeNode, setActiveNode, icon, setIcon] = useContext(MapContext);

    const options = {
        polylineOptions : {
            strokeWeight : 10,
            // editable : true,
        },
        markerOptions : {
            title: "Hello",
            label: "hi",
            icon: icon
        }
    }

    const onPolylineComplete = polyline => {
        // console.log(polyline.getPath().getArray().toString())
        let roughPath = polyline.getPath().getArray().toString().split(",")
        let path = []
        for (let i=0; i<roughPath.length; i+=2){
            path.push(roughPath[i] + "," + roughPath[i+1])
        }

        handleActiveNodeChange(path, "polyline", polyline, icon)
        setDraw(false) // we do this instead of !draw because we want drawing component to leave when a new one is added
    }
    
    const onMarkerComplete = marker => {
        console.log(marker)
        marker.title = activeNode.label
        marker.label = activeNode.label
        // marker.icon = icon // need to figure out how to get custom icon
        let position = ["(" + marker.position.lat() + ", " + marker.position.lng() + ")"]
        handleActiveNodeChange(position, "marker", marker, icon)
        setDraw(false) // we do this instead of !draw because we want drawing component to leave when a new one is added
    }

    const onOverlayComplete = e => {
        // add overlay to nodes
        console.log('Drawing component unmounted')
    }

    const handleActiveNodeChange = (position, nodeType, nodeReference, icon) =>{
        let newActiveNode = activeNode
        newActiveNode.latLngArr = position
        newActiveNode.nodeType = nodeType
        newActiveNode.nodeReference = nodeReference
        newActiveNode.icon = icon
        setActiveNode(newActiveNode)
        // console.log(newActiveNode)
        // setNodes(nodes)
        // console.log(nodes)
    }
    

    const renderDrawingComponent = () => (
        <>
            <DrawingManager onOverlayComplete={onOverlayComplete} onPolylineComplete={onPolylineComplete} onMarkerComplete={onMarkerComplete} options={{options}}>
            </DrawingManager>
        </>
      )
    return draw ? renderDrawingComponent() : null
}
export default DrawingComponent