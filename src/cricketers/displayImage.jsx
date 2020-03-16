import React from 'react'

export default function displayImage(props) {
    return (
        <>
            <img style={{ width: "150px" }} src={`http://localhost:2000/uploads/${props.image}`} alt="image not found"></img>
        </>
    )
}
