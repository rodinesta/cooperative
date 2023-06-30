import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {receiveSectors} from "../http/SectorAPI";

const Sectors = () => {

    const[sectors, setSectors] = useState([])
    useEffect(() => {
        receiveSectors().then(data => setSectors(data))
    }, [])

    return (
        <Container>
            <div style={{display: "flex", flexWrap: 'wrap', marginTop: '20px'}}>
                {sectors.map(sector => (
                    <div className="sectors" key={sector.id}>
                        <text>{sector.address}</text>
                        <img src={process.env.REACT_APP_API_URL + sector.photo} style={{width: '545px', height: '400px'}}/>
                        <Button style={{marginTop: "15px", width: "50%"}}>Сменить фотографию</Button>
                    </div>
                ))}
            </div>

        </Container>
    );
};

export default Sectors;