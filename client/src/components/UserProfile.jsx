import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ match }) => {
    const user_id = match.params.user_id;


    const fetchUnMatchListData = async (user_id) => {
        try {
            const response = await axios.get(`http://localhost:4000/user/unmatchlist/${user_id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchUnMatchListData(user_id)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user_id]);


    return (
        <h1>Hello World</h1>
    )
}

export default UserProfile;

