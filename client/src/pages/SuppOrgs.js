import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import axios from "axios";

const SuppOrgs = () => {
    const [supOrgs, setSupOrgs] = useState([])

    useEffect(() => {
        async function fetchSupOrgs() {
            return await axios.get(process.env.REACT_APP_API_URL + 'api/supplyingOrganization')
        }
        fetchSupOrgs().then(res => setSupOrgs(res.data))
    }, [])

    return (
        <Container className="mt-4">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Информация</th>
                        <th>Реквизиты</th>
                        <th>Ресурс</th>
                    </tr>
                </thead>
                <tbody>
                {supOrgs.map((item, index) => (
                    <tr style={{fontFamily: "Inter Regular"}} key={item.id}>
                        <th>{item.id}</th>
                        <td>{item.title}</td>
                        <td>{item.information}</td>
                        <td>{item.requisites}</td>
                        <td>{item.Resource.title}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
    );
};

export default SuppOrgs;