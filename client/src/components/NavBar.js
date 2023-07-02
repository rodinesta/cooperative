import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    MEMBERS_ROUTE,
    REVIEWS_ROUTE,
    PROFILE_ROUTE, SECTOR_ROUTE, SUPORGS_ROUTE
} from "../utils/consts";
import "./NavBar.css"
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";

const NavBar = observer(() => {
    const {member} = useContext(Context)
    const navigate = useNavigate()
    let tokenRoleId
    try {
        tokenRoleId = jwt_decode(localStorage.getItem('token')).roleId
    } catch (e) {

    }

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
                    <div className="d-flex align-items-center">
                        <Navbar.Brand href="/" className="brand">Дачный кооператив</Navbar.Brand>
                        <Nav>
                            <Nav.Link href={SUPORGS_ROUTE} className="navBarLinks">Поставляющие организации</Nav.Link>
                            <Nav.Link href={REVIEWS_ROUTE} className="navBarLinks">Отзывы</Nav.Link>
                        </Nav>
                    </div>

                    {member.isAuth ?
                        <Nav>
                            {tokenRoleId === 2 ?
                                <Nav>
                                    <Nav.Link href={SECTOR_ROUTE} className="navBarLinks">Список участков</Nav.Link>
                                    <Nav.Link href={MEMBERS_ROUTE} className="navBarLinks">Список участников</Nav.Link>
                                </Nav>:<Nav/>
                            }
                            <Nav.Link href={PROFILE_ROUTE} className="navBarLinks">Профиль</Nav.Link>
                            <Button className="navBarLinks ms-1" onClick={logOut}>Выйти</Button>
                        </Nav>
                        :
                        <Nav>
                            <Button className="ms-2" href={LOGIN_ROUTE}>Войти</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;