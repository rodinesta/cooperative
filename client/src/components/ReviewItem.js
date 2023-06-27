import React, {useContext, useEffect, useState} from 'react';
import moment from "moment";
import 'moment/locale/ru'
import {receiveMember} from "../http/MemberAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const ReviewItem = observer(({review}) => {

    moment.locale('ru')
    const formattedDate = moment(review.createdAt).format('DD MMMM, HH:mm ')

    const {member} = useContext(Context)
    const [user, setUser] = useState(member)

    useEffect(() => {
        receiveMember(review.MemberId).then(data => {
            setUser(data)
        })
    }, [])

    return (
        <div className="review">
            <text className="reviewMember">{user.firstName} {user.secondName}</text>
            <text className="reviewDate">{formattedDate}</text>
            <text className="reviewText">{review.text}</text>
            <text className="reviewComments">Смотреть комментарии (n штук)</text>
        </div>
    );
});

export default ReviewItem;