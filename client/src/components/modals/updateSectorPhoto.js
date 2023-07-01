import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";
import {PROFILE_ROUTE, SECTOR_ROUTE} from "../../utils/consts";
import {changePhoto} from "../../http/SectorAPI";
import {useNavigate} from "react-router-dom";

const UpdateSectorPhoto = observer(({show, onHide, id}) => {

    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const changePhotoFunc = async () => {
        const formData = new FormData();
        formData.append('id', id)
        formData.append('photo', file)
        await changePhoto(formData)
        onHide()
        window.location.reload()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить фотографию участка
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="file" onChange={selectFile}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-dark"} onClick={changePhotoFunc}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateSectorPhoto;