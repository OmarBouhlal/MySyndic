import { useState } from 'react';
import '../css/UserFactures.css';
import AdminNavBar from "../components/NavBar/AdminNavBar.jsx";

export default function UserFactures() {
    const [factures, setFactures] = useState([
        {
            id: 1,
            numero: 'FAC-2023-001',
            date: '2023-01-15',
            client: 'Appartement B12',
            montant: 150.00,
            statut: 'Payée',
            type: 'Charges mensuelles'
        },
        {
            id: 2,
            numero: 'FAC-2023-002',
            date: '2023-01-16',
            client: 'Appartement C05',
            montant: 180.50,
            statut: 'En retard',
            type: 'Charges mensuelles'
        },
        {
            id: 3,
            numero: 'FAC-2023-003',
            date: '2023-02-10',
            client: 'Appartement A03',
            montant: 320.75,
            statut: 'En attente',
            type: 'Travaux ascenseur'
        }
    ]);

    const [filtre, setFiltre] = useState('tous');
    const [recherche, setRecherche] = useState('');

    const filtrerFactures = () => {
        return factures.filter(facture => {
            const statusMatch = filtre === 'tous' || facture.statut === filtre;
            if (!recherche.trim()) return statusMatch;

            const searchTerm = recherche.toLowerCase();
            return (
                statusMatch && (
                    facture.numero.toLowerCase().includes(searchTerm) ||
                    facture.client.toLowerCase().includes(searchTerm) ||
                    facture.type.toLowerCase().includes(searchTerm)
                )
            );
        });
    };

    const marquerCommePayee = (id) => {
        setFactures(factures.map(facture =>
            facture.id === id ? {...facture, statut: 'Payée'} : facture
        ));
    };

    return (
        <>
            <AdminNavBar/>
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
                            placeholder="Numéro, client ou type..."
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                        />
                    </div>
                </div>

                <button className="btn-nouvelle">+ Nouvelle Facture</button>

                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Numéro</th>
                            <th>Date</th>
                            <th>Client</th>
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
                                <td>{facture.type}</td>
                                <td>{facture.montant.toFixed(2)} €</td>
                                <td>
                                    <span className={`statut ${facture.statut.replace(' ', '-')}`}>
                                        {facture.statut}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-action">Voir</button>
                                    <button className="btn-action">PDF</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}