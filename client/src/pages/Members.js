import React, {useContext, useEffect, useState} from 'react';
import {receiveMembers, registrateUser, registration} from "../http/MemberAPI";
import {Context} from "../index";
import {Button, Container, Row} from "react-bootstrap";
import MemberList from "../components/MemberList";
import {observer} from "mobx-react-lite";

const Members = () => {
    const {member} = useContext(Context)

    const [login, setLogin] = useState()
    const [password, setPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [secondName, setSecondName] = useState()
    const [thirdName, setThirdName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()

    const click = async () => {
        try {
            await registrateUser(login, password, firstName, secondName, thirdName, phoneNumber, 1)
            receiveMembers().then(data => {
                member.setMember(data)
            })
            setLogin('')
            setPassword('')
            setFirstName('')
            setSecondName('')
            setThirdName('')
            setPhoneNumber('')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {
        receiveMembers().then(data => {
            member.setMember(data)
        })
    }, [])

    return (
        <Container>
            <Row className="addMember mt-4">
                <text style={{fontFamily: "Inter Bold", fontSize: "24px", marginBottom: '10px'}}>Добавить участника</text>
                <textarea
                    style={{resize: "none", borderRadius: "5px"}}
                    value={login}
                    placeholder="Логин"
                    onChange={e => setLogin(e.target.value)}/>
                <textarea
                    style={{resize: "none", borderRadius: "5px"}}
                    value={password}
                    placeholder="Пароль"
                    onChange={e => setPassword(e.target.value)}/>
                <textarea
                    style={{resize: "none", borderRadius: "5px"}}
                    value={secondName}
                    placeholder="Фамилия"
                    onChange={e => setSecondName(e.target.value)}/>
                <textarea
                    style={{resize: "none", borderRadius: "5px"}}
                    value={firstName}
                    placeholder="Имя"
                    onChange={e => setFirstName(e.target.value)}/>
                <textarea
                    style={{resize: "none", borderRadius: "5px"}}
                    value={thirdName}
                    placeholder="Отчество"
                    onChange={e => setThirdName(e.target.value)}/>
                <textarea
                    style={{resize: "none", borderRadius: "5px"}}
                    value={phoneNumber}
                    placeholder="Номер телефона"
                    onChange={e => setPhoneNumber(e.target.value)}/>
                <Button
                    className="btn btn-secondary"
                    style={{width: '250px'}}
                    onClick={click}>
                    Добавить участника</Button>
            </Row>
            <MemberList/>
        </Container>
    );
};

export default observer(Members);