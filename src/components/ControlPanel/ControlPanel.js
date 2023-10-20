import React, { useState, useEffect, useRef } from 'react';  
import './ControlPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { VscChevronDown } from "react-icons/vsc";

const ControlPanel = ({ setGroupedBy, setSortedBy }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null); 

    const storedGroupedBy = localStorage.getItem('groupedBy') || 'status';
    const storedSortedBy = localStorage.getItem('sortedBy') || 'priority';
    
    const [currentGroupedBy, setCurrentGroupedBy] = useState(storedGroupedBy);
    const [currentSortedBy, setCurrentSortedBy] = useState(storedSortedBy);

    useEffect(() => {
        setGroupedBy(currentGroupedBy);
        setSortedBy(currentSortedBy);
        localStorage.setItem('groupedBy', currentGroupedBy);
        localStorage.setItem('sortedBy', currentSortedBy);
    }, [currentGroupedBy, currentSortedBy, setGroupedBy, setSortedBy]);

    
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="control-panel">
            <button onClick={() => setShowDropdown(!showDropdown)}>
                <FontAwesomeIcon className='buttonicon'icon={faSlidersH} />  Display <VscChevronDown />
            </button>
            {showDropdown && (
                <div className="dropdown-content" ref={dropdownRef}>
                    <label>
                        Grouping:
                        <select 
                            value={currentGroupedBy} 
                            onChange={(e) => {
                                setCurrentGroupedBy(e.target.value);
                                setShowDropdown(false);  
                            }}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </label>
                    <label>
                        Ordering:
                        <select 
                            value={currentSortedBy} 
                            onChange={(e) => {
                                setCurrentSortedBy(e.target.value);
                                setShowDropdown(false); 
                            }}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </label>
                </div>
            )}
        </div>
    );
}

export default ControlPanel;
