import { useState, useEffect } from 'react';
import '../css/UserFactures.css';
import UserNavBar from "../components/NavBar/UserNavBar.jsx";
import axios from 'axios';

// Import react-pdf and your FacturePDF component
import { PDFDownloadLink } from '@react-pdf/renderer';
import FacturePDF from '../utilities/FacturePDF.jsx';  // Adjust path if needed

export default function UserFactures() {
    const [factures, setFactures] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getAllFact");
                
                // Format factures using the embedded UserId data
                const formattedFactures = response.data.map(facture => ({
                    id: facture._id,
                    numero: `FAC-${facture.Numero}`,
                    date: facture.Date.substring(0, 10),
                    client: `${facture.UserId.Immeuble || 'Unknown'} - ${facture.UserId.Appartement || 'Unknown'}`,
                    userFullName: `${facture.UserId.FirstName || ''} ${facture.UserId.LastName || ''}`.trim(),
                    montant: facture.Montant,
                    statut: facture.Statut,
                    type: facture.Type,
                    userId: facture.UserId._id
                }));
                
                setFactures(formattedFactures);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [filtre, setFiltre] = useState('tous');
    const [recherche, setRecherche] = useState('');
    const [selectedFacture, setSelectedFacture] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filtrerFactures = () => {
        return factures.filter(facture => {
            const statusMatch = filtre === 'tous' || facture.statut === filtre;
            if (!recherche.trim()) return statusMatch;

            const searchTerm = recherche.toLowerCase();
            return (
                statusMatch && (
                    facture.numero.toLowerCase().includes(searchTerm) ||
                    facture.type.toLowerCase().includes(searchTerm) ||
                    facture.userFullName.toLowerCase().includes(searchTerm)
                )
            );
        });
    };

    const marquerCommePayee = async (id) => {
        try {
            setFactures(factures.map(facture =>
                facture.id === id ? {...facture, statut: 'Payée'} : facture
            ));

            await axios.put(`http://localhost:3000/api/update/${id}`, { 
                Statut: 'Payée' 
            });

            console.log("Facture marquée comme payée avec succès");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la facture:", error);
            // revert not implemented here for simplicity
        }
    };

    const handleViewFacture = (facture) => {
        setSelectedFacture({
            ...facture,
            client: facture.client,
            userFullName: facture.userFullName
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (loading) return <div className="loading">Chargement en cours...</div>;

    return (
        <>
            <UserNavBar/>
            <div className="factures-container">
                <h1>Gestion des Factures</h1>

                <div className="filtres">
                    <div className="filtre-group">
                        <label>Statut :</label>
                        <select value={filtre} onChange={(e) => setFiltre(e.target.value)}>
                            <option value="tous">Toutes les factures</option>
                            <option value="Payée">Payées</option>
                            <option value="En attente">En attente</option>
                            <option value="En retard">En retard</option>
                        </select>
                    </div>

                    <div className="filtre-group">
                        <label>Rechercher :</label>
                        <input
                            type="text"
                            placeholder="Numéro, type ou nom..."
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Numéro</th>
                                <th>Date</th>
                                <th>Appartement</th>
                                <th>Locataire</th>
                                <th>Type</th>
                                <th>Montant</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrerFactures().map(facture => (
                                <tr key={facture.id}>
                                    <td>{facture.numero}</td>
                                    <td>{facture.date}</td>
                                    <td>{facture.client}</td>
                                    <td>{facture.userFullName}</td>
                                    <td>{facture.type}</td>
                                    <td>{facture.montant.toFixed(2)} €</td>
                                    <td>
                                        <span className={`statut ${facture.statut.replace(' ', '-')}`}>
                                            {facture.statut}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn-action" onClick={() => handleViewFacture(facture)}>Voir</button>

                                        <PDFDownloadLink
                                            document={<FacturePDF facture={facture} />}
                                            fileName={`${facture.numero}.pdf`}
                                            className="btn-action"
                                        >
                                            {({ loading }) => (loading ? 'Chargement PDF...' : 'PDF')}
                                        </PDFDownloadLink>

                                        {facture.statut !== 'Payée' && (
                                            <button
                                                className="btn-action payer"
                                                onClick={() => marquerCommePayee(facture.id)}
                                            >
                                                Marquer payée
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && selectedFacture && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModal}>
                            &times;
                        </button>

                        <div className="facture-header">
                            <h2>Facture #{selectedFacture.numero}</h2>
                            <span className={`statut ${selectedFacture.statut.replace(' ', '-')}`}>
                                {selectedFacture.statut}
                            </span>
                        </div>

                        <div className="facture-details">
                            <div className="detail-row">
                                <span className="detail-label">Date:</span>
                                <span>{selectedFacture.date}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Appartement:</span>
                                <span>{selectedFacture.client}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Locataire:</span>
                                <span>{selectedFacture.userFullName}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Type:</span>
                                <span>{selectedFacture.type}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Montant:</span>
                                <span className="montant">{selectedFacture.montant.toFixed(2)} €</span>
                            </div>
                        </div>

                        <div className="facture-actions">
                            <PDFDownloadLink
                                document={<FacturePDF facture={selectedFacture} />}
                                fileName={`${selectedFacture.numero}.pdf`}
                                className="btn-action pdf"
                            >
                                {({ loading }) => (loading ? 'Chargement PDF...' : 'Télécharger PDF')}
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}