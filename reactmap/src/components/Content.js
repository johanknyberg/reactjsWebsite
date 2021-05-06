import { useState, useRef, useMemo, useCallback } from "react"
import "./Content.css"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'


const center = {
    lat: 51.505,
    lng: -0.09,
  }
  

const Content = () => {
    
    return (
       <div className="content">
           <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers />
            </MapContainer>
       </div> 
    )
}
const Markers = () => {
    const [markerList, setMarker] = useState([])
    const map = useMapEvents({
        click(e) {
            setMarker([...markerList, e.latlng])
            console.log(e.latlng)
        }
    })
    return (
        markerList.length > 0?
        markerList.map(marker => {
            return (
                <DraggableMarker lat={marker.lat} lng={marker.lng} />
            )})
        : null
    )
}
function DraggableMarker({lat, lng}) {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState({lat, lng})
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
        dragend() {
            const marker = markerRef.current
            if (marker != null) {
            setPosition(marker.getLatLng())
            }
        },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])
    
    return (
        <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
            {draggable
                ? 'Marker is draggable'
                : 'Click here to make marker draggable'}
            </span>
        </Popup>
        </Marker>
    )
}
export default Content;