import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    MEMBERS_ROUTE,
    REVIEWS_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE
} from "../utils/consts";
import "./NavBar.css"
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";

const NavBar = observer(() => {
    const {member} = useContext(Context)
    const navigate = useNavigate()
    const tokenRoleId = jwt_decode(localStorage.getItem('token')).roleId

    const logOut = () => {
        localStorage.removeItem('token')
        member.setMember({})
        member.setIsAuth(false)
        navigate(HOME_ROUTE)
    }

    return (
        <div>
            <Navbar expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/" className="brand">Дачный кооператив</Navbar.Brand>
                    {member.isAuth ?
                        <Nav>
                            {tokenRoleId === 1 ?
                                <Nav>
                                    <Nav.Link href={MEMBERS_ROUTE} className="navBarLinks">Список участников</Nav.Link>
                                </Nav>:<Nav/>
                            }
                            <Nav.Link href={REVIEWS_ROUTE} className="navBarLinks">Отзывы</Nav.Link>
                            <Nav.Link href={PROFILE_ROUTE} className="navBarLinks">Профиль</Nav.Link>
                            <Button className="navBarLinks ms-1" onClick={logOut}>Выйти</Button>
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link href={LOGIN_ROUTE}>Войти</Nav.Link>
                            <Button className="ms-2" href={REGISTRATION_ROUTE}>Зарегистрироваться</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;