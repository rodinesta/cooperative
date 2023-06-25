import React from 'react';
import {observer} from "mobx-react-lite";

const MemberItem = observer(({member}) => {

    return (
        <div className="memberItem mt-4">
            <text className="memberItemName">{member.secondName} {member.firstName} {member.thirdName}</text>
            <text style={{fontFamily: "Inter Regular"}}>Задолженность: {member.duty} рублей</text>
            <text style={{fontFamily: "Inter Regular"}}>Ежемесячный взнос: {member.paymentAmount} рублей</text>
            <text style={{fontFamily: "Inter Regular"}}>Адрес участка: </text>
        </div>
    );
});

export default MemberItem;