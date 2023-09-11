import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { user_id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/${user_id}`);
                setUserData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, [user_id]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{userData.name}</h1>
            <p>{userData.email}</p>
        </div>
    );
};

export default ProfilePage;


