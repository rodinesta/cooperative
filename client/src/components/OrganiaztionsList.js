import React, {useEffect, useState} from 'react';
import axios from "axios";

const OrganiaztionsList = ({supOrgs}) => {
    const [resources, setResources] = useState([])
    useEffect(() => {
        async function fetchResources() {
            return await axios.get(process.env.REACT_APP_API_URL + 'api/resource')
        }
        fetchResources().then(res => setResources(res.data))    }, [])

    return (
        <>
            {supOrgs.map(item => (
                <tr style={{fontFamily: "Inter Regular"}} key={item.id}>
                    <th>{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.information}</td>
                    <td>{item.requisites}</td>
                    <td>{}</td>
                </tr>
            ))}
        </>
    );
};

export default OrganiaztionsList;