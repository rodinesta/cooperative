import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {receiveOneReview} from "../http/ReviewAPI";
import {Context} from "../index";
import {receiveMember} from "../http/MemberAPI";
import moment from "moment/moment";
import CommentItem from "../components/CommentItem";
import {createComment, receiveComments} from "../http/CommentAPI";
import jwt_decode from "jwt-decode";

const ReviewPage = observer(() => {

    const {review, member} = useContext(Context)

    moment.locale('ru')
    const formattedDate = moment(review.createdAt).format('DD MMMM, HH:mm ')

    const {id} = useParams()
    const [user, setUser] = useState(member)
    const [comments, setComments] = useState([])

    const [text, setText] = useState('');
    const handleChange = (event) => {
        setText(event.target.value);
    };
    const autoResize = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    useEffect(() => {
        receiveOneReview(id).then(data => {
            review.setReview(data)
        })
        receiveComments().then(data => {
            const filteredComments = data.filter(item => item.ReviewId == id);
            setComments(filteredComments);
        });
    }, [])

    useEffect(() => {
        if(review.review.MemberId) {
            receiveMember(review.review.MemberId).then(data => {
                setUser(data)
            })
        }
    }, [review.review.MemberId])

    console.log(review.review.MemberId)

    let token
    try {
        token = jwt_decode(localStorage.getItem('token'))
    } catch {
        token = null
    }
    const createCommentBtn = async () => {
        await createComment(text, id, token.id)
        receiveComments().then(data => {
            const filteredComments = data.filter(item => item.ReviewId == id);
            setComments(filteredComments);
        });
    }

    return (
        <Container>
            <div className="reviewBackground mt-4">
                <div className="review">
                    <text style={{fontFamily: "Inter Bold", fontSize: "28px"}}>{user.firstName} {user.secondName}</text>
                    <text style={{fontFamily: "Inter Regular", fontSize: "16px", color: "#888"}}>{formattedDate}</text>
                    <text style={{fontFamily: "Inter Regular", fontSize: "20px"}}>{review.review.text}</text>
                </div>
                <div className="commentsBorder">
                    {comments?.map(comment => (
                        <CommentItem comment={comment} key={comment.id}/>
                    ))}
                </div>
                {token != null ? <div className="createComment">
                    <textarea
                        value={text}
                        placeholder="Оставьте свой комментарий"
                        onChange={handleChange}
                        onInput={autoResize}
                        maxLength={500}/>
                    <div style={{width: '100%', textAlign: 'right'}}>
                        <Button onClick={createCommentBtn}>Отправить</Button>
                    </div>
                </div> : <></>}
            </div>
        </Container>
    );
});

export default ReviewPage;