import React, {useState, useEffect} from 'react';

const ColorsIndex = (props) => {
    const [colors, setColors] = useState([]);

    const fetchColors = () => {
        fetch('http://localhost:3000/api/color', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then((res) => res.json())
        .then((colorData) => {
            console.log(colorData)
            setColors(colorData)
        })
    }

    useEffect(() => {
        fetchColors();
    }, [])

    return(
        <div>
            User's colors will go here
        </div>
    )
}

export default ColorsIndex;