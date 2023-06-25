import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import MemberItem from "./MemberItem";

const MemberList = observer(() => {
    const {member} = useContext(Context)

    return (
        <Row className="d-flex">
            {member.member?.map(member =>
                <MemberItem key={member.id} member={member}/>
            )}
        </Row>
    );
});

export default MemberList;