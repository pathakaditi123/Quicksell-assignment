import React from 'react';
import './Card.css';
import Profile from '../profile/profile';

// React Icons
import { VscPassFilled, VscCircle, VscEllipsis, VscCircleFilled } from "react-icons/vsc";
import { TiAdjustContrast, TiDelete } from "react-icons/ti";
import { FcHighPriority } from "react-icons/fc";
import { TbCircleDotted } from "react-icons/tb";
import { LuSignalLow, LuSignalMedium, LuSignalHigh } from "react-icons/lu";

const Card = ({ id, title, tag, user, status, priority, groupedBy }) => {

    const getStatusIcon = () => {
        const icons = {
            'Backlog': <TbCircleDotted className="icon status-icon" />,
            'Todo': <VscCircle className="icon status-icon todo-icon" />,
            'In progress': <TiAdjustContrast className="icon status-icon in-progress-icon" />,
            'Done': <VscPassFilled className="icon status-icon done-icon" />,
            'Cancel': <TiDelete className="icon status-icon cancel-icon" />
        };
        return icons[status] || null;
    }

    const getPriorityIcon = () => {
        const icons = [
            <VscEllipsis className="icon" />,
            <LuSignalLow className="icon" />,
            <LuSignalMedium className="icon" />,
            <LuSignalHigh className="icon" />,
            <FcHighPriority className="icon" />
        ];
        return icons[priority] || null;
    }

    const displayTag = (typeof tag === 'string') ? tag : 'N/A';

    return (
        <div className="card">
            <div className="card-header">
                <h4>{id}</h4>
                <Profile 
                    name={user ? user.name : "Unknown"} 
                    className="profile-margin" 
                    available={user ? user.available : false} 
                />
            </div>
            <div className="card-content">
                <span className="content-with-icon">
                    {groupedBy !== 'status' && getStatusIcon()}
                    <p>{title || "No title provided"}</p>
                </span>
            </div>
            <div className="card-footer">
                {(groupedBy === 'status' || groupedBy === 'user') && getPriorityIcon(priority)}
                <button className={`tag ${displayTag.toLowerCase()}`}>
                    <VscCircleFilled className='dot-feature' /> {displayTag}
                </button>
            </div>
        </div>
    );
};

export default Card;
