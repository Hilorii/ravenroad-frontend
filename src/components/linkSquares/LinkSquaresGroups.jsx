import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRoute, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './LinkSquares.css';

const SquaresGroup = () => {
    return (
        <div className="squares-container">
            <SquareLink
                icon={faUsers}
                label="STWÓRZ GRUPĘ"
                link="/create-group"
            />
        </div>
    );
};

const SquareLink = ({ icon, label, link }) => {
    return (
        <Link to={link} className="square">
            <div className="icon-wrapper">
                <FontAwesomeIcon icon={icon} size="3x" />
            </div>
            <div className="overlay">
                <span>{label}</span>
            </div>
        </Link>
    );
};

export default SquaresGroup;
