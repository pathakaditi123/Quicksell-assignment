import React from 'react';
import './KanbanColumn.css';
import Card from './Card/Card';
import {
    VscPassFilled,
    VscCircle,
    VscEllipsis,
    VscAdd
} from "react-icons/vsc";
import {
    TiAdjustContrast,
    TiDelete
} from "react-icons/ti";
import { FcHighPriority } from "react-icons/fc";
import { TbCircleDotted } from "react-icons/tb";
import {
    LuSignalLow,
    LuSignalMedium,
    LuSignalHigh
} from "react-icons/lu";
import Profile from './profile/profile';

const getStatusIcon = (status) => {
    const icons = {
        'Backlog': <TbCircleDotted className="status-icon" />,
        'Todo': <VscCircle className="todo-icon" />,
        'In progress': <TiAdjustContrast className="in-progress-icon" />,
        'Done': <VscPassFilled className="done-icon" />,
        'Cancel': <TiDelete className="cancel-icon" />
    };
    return icons[status] || null;
}

const getPriorityIcon = (priority) => {
    const icons = [
        <VscEllipsis className="priority-icon" />,
        <LuSignalLow className="priority-icon" />,
        <LuSignalMedium className="priority-icon" />,
        <LuSignalHigh className="priority-icon" />,
        <FcHighPriority className="priority-icon" />
    ];
    return icons[priority] || null;
}

const priorityText = ["No priority", "Low", "Medium", "High", "Urgent"];

const KanbanColumn = ({ status, tickets, users, groupedBy, sortedBy }) => {
    let filteredTickets = [...tickets];

    const filterBy = {
        'status': ticket => ticket.status === status,
        'user': ticket => users.some(u => u.id === ticket.userId && u.name === status),
        'priority': ticket => priorityText[ticket.priority] === status
    };

    if (filterBy[groupedBy]) {
        filteredTickets = filteredTickets.filter(filterBy[groupedBy]);
    }

    if (sortedBy === 'priority') {
        filteredTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortedBy === 'title') {
        filteredTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    const ticketCount = filteredTickets.length;

    return (
        <div className="kanban-column">
            <div className="kanban-column-header">
                <div className="header-content">
                    <div className="status-info">
                        {groupedBy === 'priority' && getPriorityIcon(priorityText.findIndex(p => p === status))}
                        {groupedBy === 'user' && <Profile name={status} available={true} className="user-icon" />}
                        {groupedBy === 'status' && getStatusIcon(status)}
                        <h2>{status}</h2>
                        <span>{ticketCount}</span>
                    </div>
                    <div className="actions">
                        <VscAdd className="add-ticket" />
                        <VscEllipsis className='add-more' />
                    </div>
                </div>
            </div>
            <div className="kanban-column-content">
                {filteredTickets.map(ticket => (
                    <Card
                        key={ticket.id}
                        id={ticket.id}
                        title={ticket.title}
                        tag={ticket.tag[0]}
                        user={users.find(u => u.id === ticket.userId)}
                        priority={ticket.priority}
                        status={ticket.status}
                        groupedBy={groupedBy}
                    />
                ))}
            </div>
        </div>
    );
}

export default KanbanColumn;
export { getStatusIcon, getPriorityIcon };
