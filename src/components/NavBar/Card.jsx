import React from 'react';
import '../../css/Card.scss'; // Import the CSS file

const Card = ({ title, image, Immeuble, footer,Appartement }) => {
    return (
        <div className="card">
            {image && <div className="card-image-container">
                <img src={image} alt={title} className="card-image" />
            </div>}
            <div className="card-content">
                <h2 className="card-title">Nom: {title}</h2>
                <p className="card-description">Imm: {Immeuble}</p>
                <p className="card-description">App: {Appartement}</p>

            </div>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
};

export default Card;
