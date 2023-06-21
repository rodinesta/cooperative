import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate, NavLink} from "react-router-dom";
import {LOGIN_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {loginFunc} from "../http/MemberAPI";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const {member} = useContext(Context)
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        try {
            let data = await loginFunc(login, password)
            member.setMember(data)
            member.setIsAuth(true)
            navigate(PROFILE_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите логин"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form className="d-flex justify-content-center mt-3 pl-3 pr-3">
                        <Button style={{width: '200px'}} onClick={click}>Войти</Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;