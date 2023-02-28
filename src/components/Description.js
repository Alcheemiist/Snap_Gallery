import { useState } from "react"
import './Description.css'

function Description(prop) {
    const [state, setState] = useState(false)

    return (
        <div className="Description">
            {
                (state) ?
                <button className="btp" onClick={() => setState(!state)}> Hide </button>
                : 
                <button className="btp" onClick={() => setState(!state)}> Display </button>
            }
            {
                state && (
                    <div className="text">
                        <div>AlbumId : {prop.Card.albumId} </div>
                        <div>Id : {prop.Card.id} </div>
                        <div>Title : {prop.Card.title}</div>
                        <div>Description :  Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </div>
                )
            }        
        </div>
    )
}

export default Description