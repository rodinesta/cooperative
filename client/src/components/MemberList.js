import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import {Context} from "../index";
import {receiveMembers} from "../http/MemberAPI";

const MemberList = observer(() => {
    const {member} = useContext(Context)

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([])

    useEffect(() => {
        receiveMembers().then(data => {
            setFilteredMembers(data)
        })
    }, [])

    const handleSearch = (event) =>  {
        const {value} = event.target
        setSearchTerm(value)
        const filteredMembers = member.member.filter(member =>
                member.secondName.toLowerCase().includes(value.toLowerCase()))
        setFilteredMembers(filteredMembers)
    };

    return (
        <>
            <Row className="mt-4">
                <textarea
                    className="searchMember"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    maxLength={50}
                    placeholder=" 🔍︎ Поиск по фамилии"/>
            </Row>
            <Row className="d-flex">
                {filteredMembers?.map(member =>
                    <div className="memberItem mt-4" key={member.id}>
                        <text className="memberItemName">{member.secondName} {member.firstName} {member.thirdName}</text>
                        <text style={{fontFamily: "Inter Regular"}}>Задолженность: {member.duty} рублей</text>
                        <text style={{fontFamily: "Inter Regular"}}>Ежемесячный взнос: {member.paymentAmount} рублей</text>
                        <text style={{fontFamily: "Inter Regular"}}>Адрес участка: </text>
                    </div>
                )}
            </Row>
        </>
    );
});

export default MemberList;