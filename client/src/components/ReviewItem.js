import React, {useContext, useEffect} from 'react';
import moment from "moment";
import 'moment/locale/ru'
import {receiveMember} from "../http/MemberAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const ReviewItem = observer(({review}) => {

    moment.locale('ru')
    const formattedDate = moment(review.createdAt).format('DD MMMM, HH:mm ')

    const {member} = useContext(Context)
    useEffect(() => {
        receiveMember(review.MemberId).then(data => {
            member.setMember(data)
        })
    }, [])

    return (
        <div className="review">
            <text className="reviewMember">{member.member.firstName} {member.member.secondName}</text>
            <text className="reviewDate">{formattedDate}</text>
            <text className="reviewText">{review.text}</text>
            <text className="reviewComments">Смотреть комментарии (n штук)</text>
        </div>
    );
});

export default ReviewItem;