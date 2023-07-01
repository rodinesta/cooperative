import React, {useEffect, useState} from 'react';
import {Button, Container, Dropdown, Row} from "react-bootstrap";
import {createSector, receiveSectors} from "../http/SectorAPI";
import UpdateSectorPhoto from "../components/modals/updateSectorPhoto";
import {receiveMembers, setSector, updatePhoto} from "../http/MemberAPI";
import axios from "axios";
import SetSectorMembers from "../components/modals/setSectorMembers";

const Sectors = () => {

    const [sectors, setSectors] = useState([])
    const [statuses, setStatuses] = useState([])
    const [selectedStatus, setSelectedStatus] = useState([])
    const [selectedSectorId, setSelectedSectorId] = useState()
    const [file, setFile] = useState(null)
    const [address, setAddress] = useState()

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        receiveSectors().then(data => setSectors(data))
        axios.get(process.env.REACT_APP_API_URL + 'api/sectorStatus').then(data => setStatuses(data.data))
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

    const addSector = () => {
        const formData = new FormData();
        formData.append('address', address)
        formData.append('SectorStatusId', selectedStatus[0].id)
        formData.append('photo', file)
        createSector(formData)
        window.location.reload()
    }
    const updatePhotoBtn = (id) => {
        setUpdatePhotoVisible(true)
        setSelectedSectorId(id)
    }

    const setMembersBtn = (id) => {
        setMembersVisible(true)
        setSelectedSectorId(id)
    }

    const [updatePhotoVisible, setUpdatePhotoVisible] = useState(false)
    const [membersVisible, setMembersVisible] = useState(false)

    return (
        <Container>
            <Row className="addMember mt-4">
                <text style={{fontFamily: "Inter Bold", fontSize: "24px", marginBottom: '10px'}}>Добавить участок</text>
                <textarea
                    style={{resize: "none", borderRadius: "5px"}}
                    value={address}
                    placeholder="Адрес"
                    onChange={e => setAddress(e.target.value)}/>
                <Dropdown className="mb-2">
                    <Dropdown.Toggle>Статус</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {statuses.map(status =>
                        <Dropdown.Item
                            key={status.id}
                            className={selectedStatus.includes(status) ? 'selected' : ''}
                            onClick={() => {
                                setSelectedStatus([status]);
                            }}>
                            {status.title}
                        </Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <div>
                    <text style={{fontFamily: "Inter Regular", fontSize: "18px"}}>Фотография: </text>
                    <input
                        type="file"
                        className="mb-2"
                        onChange={selectFile}/>
                </div>
                <Button
                    className="btn btn-secondary"
                    style={{width: '250px'}}
                    onClick={addSector}>
                    Добавить участок</Button>
            </Row>
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
                        <Button style={{marginTop: "15px", width: "100%"}} onClick={() => setMembersBtn(sector.id)}>Сменить проживающих</Button>
                        <Button style={{marginTop: "15px", width: "100%"}} onClick={() => updatePhotoBtn(sector.id)}>Сменить фотографию</Button>
                    </div>
                ))}
            </div>
            <SetSectorMembers show={membersVisible} onHide={() => setMembersVisible(false)} id={selectedSectorId}/>
            <UpdateSectorPhoto show={updatePhotoVisible} onHide={() => setUpdatePhotoVisible(false)} id={selectedSectorId}/>
        </Container>
    );
};

export default Sectors;