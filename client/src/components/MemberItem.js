import React, {useEffect, useState} from 'react';
import {receiveSectorById} from "../http/SectorAPI";

const MemberItem = ({member}) => {

    const [sector, setSector] = useState([])
    useEffect(() => {
        receiveSectorById(member.SectorId).then(data => setSector(data))
    }, [])

    return (
        <div className="memberItem mt-4" key={member.id}>
            <text className="memberItemName">{member.secondName} {member.firstName} {member.thirdName}</text>
            <text style={{fontFamily: "Inter Regular"}}>Задолженность: {member.duty} рублей</text>
            <text style={{fontFamily: "Inter Regular"}}>Ежемесячный взнос: {member.paymentAmount} рублей</text>
            <text style={{fontFamily: "Inter Regular"}}>Адрес участка: {sector.address}</text>
        </div>
    );
};

export default MemberItem;