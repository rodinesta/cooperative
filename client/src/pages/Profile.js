import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image} from "react-bootstrap";
import d from "../static/дача1.jpg"
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import {receiveMember} from "../http/MemberAPI";
import {observer} from "mobx-react-lite";
import UpdatePhoto from "../components/modals/updatePhoto";

const Profile = observer(() => {
    const {member} = useContext(Context)
    const token = jwt_decode(localStorage.getItem('token'))
    const [updatePhotoVisible, setUpdatePhotoVisible] = useState(false)

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
                            <Image src={process.env.REACT_APP_API_URL + member.member.photo} style={{width: '250px', height: '333px'}}/>
                            <Button onClick={() => setUpdatePhotoVisible(true)}>Сменить фотографию</Button>
                        </div>
                    </div>
                </div>
                <div className="sectorPhoto">
                    <h3>Фотография участка</h3>
                    <img src={d} style={{width: '55%', marginBottom: '50px'}}/>
                </div>
                <UpdatePhoto show={updatePhotoVisible} onHide={() => setUpdatePhotoVisible(false)}/>
            </Container>
        </div>

    );
});

export default Profile;