import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ReviewItem from "./ReviewItem";

const ReviewList = observer(() => {
    const {review} = useContext(Context)

    return (
        <Row className="d-flex">
            {review.review?.map(review =>
                <ReviewItem key={review.id} review={review}/>
            )}
        </Row>
    );
});

export default ReviewList;