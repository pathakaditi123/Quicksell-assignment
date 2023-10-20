import React, { useState, useEffect } from 'react';
import KanbanColumn from './components/KanbanColumn';
import ControlPanel from './components/ControlPanel/ControlPanel';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedBy, setGroupedBy] = useState(localStorage.getItem('groupedBy') || 'status');
  const [sortedBy, setSortedBy] = useState(localStorage.getItem('sortedBy') || 'priority');

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('groupedBy', groupedBy);
    localStorage.setItem('sortedBy', sortedBy);
  }, [groupedBy, sortedBy]);

  function getSortedTickets(tickets) {
    return [...tickets].sort((a, b) => {
      if (sortedBy === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  }

  function generateColumns() {
    let columns = [];
    const sortedTickets = getSortedTickets(tickets);

    if (groupedBy === 'status') {
      columns = ["Backlog", "Todo", "In progress", "Done", "Cancel"].map(status => (
        <KanbanColumn 
          key={status}
          status={status}
          tickets={sortedTickets.filter(ticket => ticket.status === status)}
          users={users}
          groupedBy={groupedBy}
          sortedBy={sortedBy}
        />
      ));
    } else if (groupedBy === 'user') {
      columns = users.map(user => (
        <KanbanColumn 
          key={user.id}
          status={user.name}
          tickets={sortedTickets.filter(ticket => ticket.userId === user.id)}
          users={users}
          groupedBy={groupedBy}
          sortedBy={sortedBy}
        />
      ));
    } else if (groupedBy === 'priority') {
      const priorities = [
        { level: 4, name: 'Urgent' },
        { level: 3, name: 'High' },
        { level: 2, name: 'Medium' },
        { level: 1, name: 'Low' },
        { level: 0, name: 'No priority' }
      ];
      columns = priorities.map(priority => (
        <KanbanColumn 
          key={priority.level}
          status={priority.name}
          tickets={sortedTickets.filter(ticket => ticket.priority === priority.level)}
          users={users}
          groupedBy={groupedBy}
          sortedBy={sortedBy}
        />
      ));
    }

    return columns;
  }

  return (
    <>
      <ControlPanel setGroupedBy={setGroupedBy} setSortedBy={setSortedBy} />
      <div className="App">
        <div className="kanban-navbar">
          {generateColumns()}
        </div>
      </div>
    </>
  );
}

export default App;
