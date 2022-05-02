import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

import '../../static/css/OutletCommonChild.scss'

import { db } from '../../utils/firebase-config';
import { collection, getDocs } from "firebase/firestore"

function PrjType() {

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "PrjType");

    const redirect = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({...doc.data()})))
        }

        getUsers();
    }, [])

    return (
        <div className='ProjectType Common'>
            <div className="title">
                Project Type
            </div>

            <button
                className='btn-add'
                onClick={() => {
                    redirect('add')
                }}>
                Add
            </button>

            <table className='table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{user.name}</td>
                                <td>{user.description}</td>
                                <td>{user.priority}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PrjType