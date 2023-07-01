import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {receiveSectors} from "../http/SectorAPI";
import UpdateSectorPhoto from "../components/modals/updateSectorPhoto";

const Sectors = () => {

    const[sectors, setSectors] = useState([])
    const[selectedSectorId, setSelectedSectorId] = useState()

    useEffect(() => {
        receiveSectors().then(data => setSectors(data))
    }, [])

    const getMembersName = (id) => {
        let res = ""
        sectors[id].Members.forEach((member, index) => res += `${member.secondName} ${member.firstName}${++index == sectors[id].Members.length ? '' : ', '} `)
        return res
    }
    const getMembersDuty = (id) => {
        let res = 0
        sectors[id].Members.forEach(member => res += member.duty)
        return res
    }

    const click = (id) => {
        setUpdatePhotoVisible(true)
        setSelectedSectorId(id)
    }

    const [updatePhotoVisible, setUpdatePhotoVisible] = useState(false)

    console.log(sectors)

    return (
        <Container>
            <div style={{display: "flex", flexWrap: 'wrap', marginTop: '20px', justifyContent: "center"}}>
                {sectors.map((sector, index) => (
                    <div className="sectors" key={sector.id}>
                        <text>{sector.address}</text>
                        <div className="w-100 d-flex justify-content-center">
                            <img src={process.env.REACT_APP_API_URL + sector.photo} style={{maxWidth: '545px', height: '400px', objectFit: "cover"}}/>
                        </div>
                        <text style={{fontSize: "20px"}}>Проживающие: {getMembersName(index)}</text>
                        <text style={{fontSize: "20px"}}>Долг: {getMembersDuty(index)} рублей</text>
                        <text style={{fontSize: "20px"}}>Статус: {sector.SectorStatus.title}</text>
                        <Button style={{marginTop: "15px", width: "100%"}} onClick={() => click(sector.id)}>Сменить фотографию</Button>
                    </div>
                ))}
            </div>
            <UpdateSectorPhoto show={updatePhotoVisible} onHide={() => setUpdatePhotoVisible(false)} id={selectedSectorId}/>
        </Container>
    );
};

export default Sectors;