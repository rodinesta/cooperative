import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import {Context} from "../index";
import {receiveMembers} from "../http/MemberAPI";
import {receiveSectorById, receiveSectors} from "../http/SectorAPI";
import MemberItem from "./MemberItem";

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
                    <MemberItem member={member}/>
                )}
            </Row>
        </>
    );
});

export default MemberList;