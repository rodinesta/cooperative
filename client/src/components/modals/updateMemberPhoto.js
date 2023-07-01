import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";
import {updatePhoto} from "../../http/MemberAPI";
import jwt_decode from "jwt-decode";
import {PROFILE_ROUTE} from "../../utils/consts";

const UpdateMemberPhoto = observer(({show, onHide}) => {

    const token = jwt_decode(localStorage.getItem('token'))
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const updatePhotoFunc = () => {
        const formData = new FormData();
        formData.append('id', token.id)
        formData.append('Img', file)
        updatePhoto(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить фотографию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="file" onChange={selectFile}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-dark"} onClick={updatePhotoFunc} href={PROFILE_ROUTE}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateMemberPhoto;