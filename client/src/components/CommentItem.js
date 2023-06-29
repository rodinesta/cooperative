import React, {useEffect, useState} from 'react';
import {receiveMember} from "../http/MemberAPI";
import moment from "moment/moment";

const CommentItem = ({ comment }) => {
    moment.locale('ru')
    const formattedDate = moment(comment.createdAt).format('DD MMMM, HH:mm ')

    const [user, setUser] = useState([])
    useEffect(() => {
        receiveMember(comment.MemberId).then(data => {
            setUser(data)
        })
    }, [])

    return (
        <div key={comment.id} className="comments">
            <text style={{fontFamily: "Inter Bold", fontSize: "18px"}}>{user.firstName} {user.secondName}</text>
            <text className="reviewDate" style={{fontSize: "14px"}}>{formattedDate}</text>
            <text style={{fontFamily: "Inter Regular", fontSize: "16px"}}>{comment.text}</text>
        </div>
    );
};

export default CommentItem;
