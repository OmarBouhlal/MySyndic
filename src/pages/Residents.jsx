import '../css/Home.scss';
import UserNavBar from "../components/NavBar/UserNavBar.jsx";
import Card from '../components/NavBar/Card.jsx';
import image from "../assets/syd.jpg";
import SearchBar from '../components/SearchBar.jsx';
import { useState, useEffect } from 'react';
import "../css/Search.scss";
import { useNavigate } from 'react-router-dom';

export default function Residents() {
    const [filteredCards, setFilteredCards] = useState([]);
    const [initialCards, setInitialCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResidentsData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/api/allusers');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch residents data');
                }
                
                const data = await response.json();
                setInitialCards(data.data || []); 
                setFilteredCards(data.data || []);
            } catch (err) {
                console.error("Error fetching residents:", err);
                setError(err.message);
                
                
                
            } finally {
                setLoading(false);
            }
        };

        fetchResidentsData();
    }, []); 

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredCards(initialCards);
            return;
        }
        
        const filtered = initialCards.filter(card => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
                (card.title && card.title.toLowerCase().includes(searchTermLower)) ||
                (card.Appartement && card.Appartement.toLowerCase().includes(searchTermLower)) ||
                (card.Immeuble && card.Immeuble.toLowerCase().includes(searchTermLower))
            );
        });

        setFilteredCards(filtered);
    };
     const navigate = useNavigate();
    function navig() {
       
    navigate('/AdminFactures');
    }
    return(
        <>
            <UserNavBar/>
            <SearchBar onSearch={handleSearch} />
            <div className='Cards'>
                {loading && <div className="loading">Chargement en cours...</div>}
                {error && <div className="error">Erreur: {error} (Utilisation des données locales)</div>}
                
                {filteredCards.map(card => (
                    <Card
                        key={card.id}
                        title={card.FirstName+" "+card.LastName}
                        image={image}
                        Appartement={card.Appartement}
                        Immeuble={card.Immeuble}
                        footer={<button onClick={navig}>Voir Facture</button>}
                    />
                ))}

                {!loading && filteredCards.length === 0 && (
                    <div className="no-results">
                        Aucun résident trouvé
                    </div>
                )}
            </div>
        </>
    );
}
