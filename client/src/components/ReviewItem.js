import React, {useContext, useEffect, useState} from 'react';
import moment from "moment";
import 'moment/locale/ru'
import {receiveMember} from "../http/MemberAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {REVIEW_ROUTE} from "../utils/consts";
import {receiveComments} from "../http/CommentAPI";

const ReviewItem = observer(({review}) => {

    moment.locale('ru')
    const formattedDate = moment(review.createdAt).format('DD MMMM, HH:mm ')

    const {member} = useContext(Context)
    const [user, setUser] = useState(member)
    const [count, setCount] = useState(null)

    useEffect(() => {
        receiveMember(review.MemberId).then(data => {
            setUser(data)
        })
        receiveComments().then(data => {
            setCount(data.filter(item => item.ReviewId == review.id).length)
        })
    }, [])

    const navigate = useNavigate()

    return (
        <div className="review reviewBackground" onClick={() => navigate('/review/' + review.id)}>
            <text className="reviewMember">{user.firstName} {user.secondName}</text>
            <text className="reviewDate">{formattedDate}</text>
            <text className="reviewText">{review.text}</text>
            <text className="reviewComments">Смотреть комментарии ({count} штук)</text>
        </div>
    );
});

export default ReviewItem;