import React, { Component, useState } from 'react';

export default function Jar(props) {
    const [jar, setJar] = useState(props.jar)
    return(
        <div 
            style={{
                border: "3px solid black", 
                borderRadius: "15px",
                borderTop: "none",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                height: "400px", 
                width: "300px",
                marginLeft: "30px",
                }}>
            {JSON.stringify(jar)}
        </div>  
    )
}