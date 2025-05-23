import '../css/Home.css';
import UserNavBar from "../components/NavBar/UserNavBar.jsx";
import Card from '../components/NavBar/Card.jsx';
import image from "../assets/syd.jpg"
import SearchBar from '../components/SearchBar.jsx';
import { useState } from 'react';
import "../css/Search.css"
export default function Residents() {
    const initialCards = [
        {
            id: 1,
            title: "Aymane",
            image: image,
            Appartement: "App1",
            Immeuble: "Imm1"
        },
        {
            id: 2,
            title: "eddddddddddddddd",
            image: image,
            Appartement: "App1",
            Immeuble: "Majorant Pas Vacciné"
        },
        {
            id: 3,
            title: "Aymaneeee",
            image: image,
            Appartement: "App1",
            Immeuble: "Majorant Pas Vaccinédfd"
        },
        {
            id: 4,
            title: "Aymane",
            image: image,
            Immeuble: "Majorant Pas Vacciné"
        },
        {
            id: 5,
            title: "Aymane",
            image: image,
            Immeuble: "Majorant Pas Vacciné"
        },
        {
            id: 6,
            title: "Aymane",
            image: image,
            Immeuble: "Majorant Pas Vacciné"
        },
        {
            id: 7,
            title: "Aymane",
            image: image,
            Immeuble: "Majorant Pas Vacciné"
        }
    ];

    const [filteredCards, setFilteredCards] = useState(initialCards);

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredCards(initialCards);//lakant search empty
            return;
        }
        const filtered = initialCards.filter(card => {
            const searchTermLower = searchTerm.toLowerCase();

            return (
                card.title.toLowerCase().includes(searchTermLower) ||
                (card.Appartement && card.Appartement.toLowerCase().includes(searchTermLower)) ||
                (card.Immeuble && card.Immeuble.toLowerCase().includes(searchTermLower))
            );
        });

        setFilteredCards(filtered);
    };

    return(
        <>
            <UserNavBar/>
            <SearchBar onSearch={handleSearch} />
            <div className='Cards'>
                {filteredCards.map(card => (
                    <Card
                        key={card.id}
                        title={card.title}
                        image={card.image}//A regler
                        Appartement={card.Appartement}
                        Immeuble={card.Immeuble}
                        footer={<><button>Voir Facture</button>

                        </>
                        }
                    />
                ))}

                {filteredCards.length === 0 && (
                    <div className="no-results">
                        Aucun résident trouvé
                    </div>
                )}
            </div>
        </>
    );
}
