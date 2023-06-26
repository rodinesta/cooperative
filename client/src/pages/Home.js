import React, {useContext, useEffect} from 'react';
import {Container, Row} from "react-bootstrap";
import Slider from "../components/Slider";
import ReviewItem from "../components/ReviewItem";
import {Context} from "../index";
import ReviewList from "../components/ReviewList";
import {receiveReviews} from "../http/ReviewAPI";

const Home = () => {
    const {review} = useContext(Context)

    useEffect(() => {
        receiveReviews().then(data => {
            review.setReview(data)
        })
    }, [review])

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
                <h2>Отзывы</h2>
                <Row className="d-flex">
                    {review.review?.slice(0, 2).map(review =>
                        <ReviewItem key={review.id} review={review}/>
                    )}
                </Row>
                <h2>Контактные данные</h2>
                <text>+7 (777) 777-77-77 Россия, Томск, 123456, р-н Кужлевка СТ</text>
            </Container>
        </div>
    );
};

export default Home;