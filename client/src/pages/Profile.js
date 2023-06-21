import React, {useContext, useEffect} from 'react';
import {Button, Container} from "react-bootstrap";
import avt from "../static/image 2.png"
import d from "../static/дача1.jpg"
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import {receiveMember} from "../http/MemberAPI";
import {observer} from "mobx-react-lite";

const Profile = observer(() => {
    const {member} = useContext(Context)
    const token = jwt_decode(localStorage.getItem('token'))

    useEffect(() => {
        receiveMember(token.id).then(data => member.setMember(data))
    }, [])

    return (
        <div style={{background: 'white'}}>
            <Container>
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="profile-info">
                            <h3>Добро пожаловать, {member.member.firstName}!</h3>
                            <text>Контактные данные: {member.member.phoneNumber}</text>
                            <text>Адрес участка: </text>
                            <text>Ежемесячная плата: {member.member.paymentAmount} рублей.</text>
                            <text>Задолженность: {member.member.duty} рублей.</text>
                            <Button>Сменить личные данные</Button>
                        </div>
                    </div>

                    <div>
                        <div className="avatar px-5">
                            <img src={avt} style={{width: '250px', height: '333px'}}/>
                            <Button>Сменить фотографию</Button>
                        </div>
                    </div>
                </div>
                <div className="sectorPhoto">
                    <h3>Фотография участка</h3>
                    <img src={d} style={{width: '55%', marginBottom: '50px'}}/>
                </div>
            </Container>
        </div>

    );
});

export default Profile;