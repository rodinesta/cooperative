import React from 'react';
import {Container} from "react-bootstrap";
import Slider from "../components/Slider";

const Home = () => {
    return (
        <div style={{background: "#FFFFFF"}}>
            <div className='image'>
                <div className='dark'>
                    <h1>Дачный кооператив “Кужлевка”</h1>
                </div>
            </div>

            <Container className='homePageInfo pb-5'>
                <h2>О нас</h2>
                <text>Мы занимаемся помощью в обслуживании дач, находящихся в дачном кооперативе “Кужлевка”. На данном сайте вы найдете информацию о правлении, графике работы, а так же контактные данные. </text>
                <h2>Фотографии</h2>
                <Slider/>
                <h2>Контактные данные</h2>
                <text>+7 (777) 777-77-77 Россия, Томск, 123456, р-н Кужлевка СТ</text>
            </Container>
        </div>
    );
};

export default Home;