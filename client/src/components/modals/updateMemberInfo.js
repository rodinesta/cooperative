import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {changeInfo, updatePhoto} from "../../http/MemberAPI";
import {PROFILE_ROUTE} from "../../utils/consts";

const UpdateMemberInfo = ({show, onHide, id}) => {
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const updateInfoFunc = () => {
        changeInfo(id, secondName, firstName, phoneNumber).then(data => onHide())
    }

    return (
        <Modal
        show={show}
        onHide={onHide}
        centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить информацию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Фамилия"}
                        value={secondName}
                        onChange={e => setSecondName(e.target.value)}/>
                    <Form.Control
                        className="mt-2"
                        placeholder={"Имя"}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}/>
                    <Form.Control
                        className="mt-2"
                        placeholder={"Номер телефона"}
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-dark"} onClick={updateInfoFunc} href={PROFILE_ROUTE}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateMemberInfo;