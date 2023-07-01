import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {receiveMembers, setSector} from "../../http/MemberAPI";

const SetSectorMembers = ({show, onHide, id}) => {
    const [members, setMembers] = useState([])
    const [selectedMembers, setSelectedMembers] = useState([])

    useEffect(() => {
        receiveMembers().then(data => setMembers(data))
    }, [])

    const setSectorMembers = () => {
        try {
            selectedMembers.forEach(member => setSector(member.id, id))
            window.location.reload()
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить проживающих
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mb-2">
                    <Dropdown.Toggle>Участники</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {members.map(member =>
                            <Dropdown.Item
                                key={member.id}
                                className={selectedMembers.includes(member) ? 'selected' : ''}
                                onClick={() => {
                                    if (!selectedMembers.includes(member)) {
                                        setSelectedMembers([...selectedMembers, member]);
                                    } else {
                                        setSelectedMembers(selectedMembers.filter((selectedMember) => selectedMember !== member));
                                    }
                                }}>
                                {member.secondName} {member.firstName}
                            </Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-dark"} onClick={setSectorMembers}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SetSectorMembers;