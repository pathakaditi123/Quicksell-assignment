import React from 'react';
import './profile.css';
const Profile = ({ name, available }) => {
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
    const dotColor = available ? 'green' : 'grey';

    return (
        <div className="profile-container">
            <div className="profile-pic" style={{ backgroundColor: getRandomColor() }}>{initials}</div>
            <div className="availability-dot" style={{ backgroundColor: dotColor }}></div>
        </div>
    );
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default Profile;
