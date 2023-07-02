import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import ReviewList from "../components/ReviewList";
import {createReview, receiveReviews} from "../http/ReviewAPI";
import {Context} from "../index";
import jwt_decode from "jwt-decode";

const Reviews = observer(() => {
    const {review} = useContext(Context)
    const [text, setText] = useState('');
    const handleChange = (event) => {
        setText(event.target.value);
    };
    const autoResize = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    let memberId
    try {
       memberId = jwt_decode(localStorage.getItem('token')).id
    } catch (e) {
        memberId = null
    }
    const click = async () => {
        try {
            await createReview(text, memberId)
            setText('')
            receiveReviews().then(data => {
                review.setReview(data)
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {
        receiveReviews().then(data => {
            review.setReview(data)
        })
    }, [])

    return (
        <div>
            <Container>
                {memberId != null ? <div className="writeReview mt-4">
                    <h3>Оставьте здесь свой отзыв</h3>
                    <textarea
                        style={{resize: "none", borderRadius: "5px"}}
                        value={text}
                        className="textReview"
                        placeholder="Введите текст отзыва"
                        onChange={handleChange}
                        onInput={autoResize}
                        maxLength={4000}/>
                    <p>Осталось {4000 - text.length} символов</p>
                    <div style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                        <Button onClick={click}>Опубликовать</Button>
                    </div>
                </div> : <> </>}

                <div className="reviewList">
                    <ReviewList/>
                </div>

            </Container>
        </div>
    );
});

export default Reviews;