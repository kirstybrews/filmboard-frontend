import React from 'react';

const UserProfile = ({ currentUser }) => {
    return (
        <h1>Welcome, {currentUser.name}!</h1>
    )
}

export default UserProfile;