import '../../css/LayoutDash.css';
import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';
import axios from "axios";
import DataTable from "react-data-table-component";
import Draggable from 'react-draggable';

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function LayoutAdminDashboard() {
    const [chartData, setChartData] = useState({ immeubles: [], counts: [] });
    const [residentsData, setResidentsData] = useState([]);
    const [facturesData, setFacturesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [residentsFilterText, setResidentsFilterText] = useState('');
    const [facturesFilterText, setFacturesFilterText] = useState('');
    const [zIndex, setZIndex] = useState(1); // Track the highest z-index

    const residentsRef = useRef(null);
    const facturesRef = useRef(null);
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);

    const handleDeleteUser = async (userId) => {
    if (window.confirm('Do you accept deleting this user')) {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            
            const residentsRes = await axios.get("http://localhost:3000/api/allusers");
            setResidentsData(residentsRes.data.data.map(user => ({
                _id: user._id,
                firstName: user.FirstName,
                lastName: user.LastName,
                immeuble: user.Immeuble,
                appt: user.Appartement,
                email: user.email
            })));
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    }
};

    const handleStartDrag = (ref) => {
        
        const newZIndex = zIndex + 1;
        setZIndex(newZIndex);
        if (ref.current) {
            ref.current.style.zIndex = newZIndex;
        }
    };

    const TooltipWrapper = ({ children, content }) => (
        <div
            title={content}
            style={{
                display: 'inline-block',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}
        >
            {children}
        </div>
    );

    const residentsColumns = [
        { name: 'First Name', selector: row => row.firstName, sortable: true, cell: row => <TooltipWrapper content={row.firstName}>{row.firstName}</TooltipWrapper> },
        { name: 'Last Name', selector: row => row.lastName, sortable: true, cell: row => <TooltipWrapper content={row.lastName}>{row.lastName}</TooltipWrapper> },
        { name: 'Immeuble', selector: row => row.immeuble, sortable: true, cell: row => <TooltipWrapper content={row.immeuble}>{row.immeuble}</TooltipWrapper> },
        { name: 'Appartement', selector: row => row.appt, sortable: true, cell: row => <TooltipWrapper content={row.appt}>{row.appt}</TooltipWrapper> },
        { name: 'Email', selector: row => row.email, sortable: true, cell: row => <TooltipWrapper content={row.email}>{row.email}</TooltipWrapper> },
        {name: 'Actions',cell: (row) => (<button onClick={() => handleDeleteUser(row._id)} style={{backgroundColor: '#ff4444',color: 'white',border: 'none',padding: '5px 10px',borderRadius: '4px',cursor: 'pointer'}}
            >
                Delete
            </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
    ];

    const facturesColumns = [
        { name: 'First Name', selector: row => row.userFirstName, sortable: true, cell: row => <TooltipWrapper content={row.userFirstName}>{row.userFirstName}</TooltipWrapper> },
        { name: 'Last Name', selector: row => row.userLastName, sortable: true, cell: row => <TooltipWrapper content={row.userLastName}>{row.userLastName}</TooltipWrapper> },
        { name: 'Immeuble', selector: row => row.userImmeuble, sortable: true, cell: row => <TooltipWrapper content={row.userImmeuble}>{row.userImmeuble}</TooltipWrapper> },
        { name: 'Appartement', selector: row => row.userAppartement, sortable: true, cell: row => <TooltipWrapper content={row.userAppartement}>{row.userAppartement}</TooltipWrapper> },
        { name: 'Montant', selector: row => row.montant, sortable: true, cell: row => <TooltipWrapper content={row.montant}>{row.montant}</TooltipWrapper> },
        { name: 'Type', selector: row => row.type, sortable: true, cell: row => <TooltipWrapper content={row.type}>{row.type}</TooltipWrapper> },
        { name: 'Statut', selector: row => row.statut, sortable: true, cell: row => <TooltipWrapper content={row.statut}><span style={{ color: row.statut === 'Payée' ? 'green' : row.statut === 'En attente' ? 'orange' : row.statut === 'En retard' ? 'red' : null, fontWeight: 'bold' }}>{row.statut}</span></TooltipWrapper> }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [immeublesRes, residentsRes, facturesRes] = await Promise.all([
                    axios.get("http://localhost:3000/api/getIMS"),
                    axios.get("http://localhost:3000/api/allusers"),
                    axios.get("http://localhost:3000/api/getAllFact")
                ]);

                setChartData({
                    immeubles: immeublesRes.data.chartData.immeubles,
                    counts: immeublesRes.data.chartData.counts.map(item => item.count)
                });

                setResidentsData(residentsRes.data.data.map(user => ({
                    firstName: user.FirstName,
                    lastName: user.LastName,
                    immeuble: user.Immeuble,
                    appt: user.Appartement,
                    email: user.email
                })));

                setFacturesData(facturesRes.data.map(facture => ({
                    montant: facture.Montant,
                    type: facture.Type,
                    statut: facture.Statut,
                    userFirstName: facture.UserId?.FirstName || 'N/A',
                    userLastName: facture.UserId?.LastName || 'N/A',
                    userImmeuble: facture.UserId?.Immeuble || 'N/A',
                    userAppartement: facture.UserId?.Appartement || 'N/A'
                })));

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredResidents = residentsData.filter(item =>
        item.firstName.toLowerCase().includes(residentsFilterText.toLowerCase()) ||
        item.lastName.toLowerCase().includes(residentsFilterText.toLowerCase()) ||
        item.immeuble.toLowerCase().includes(residentsFilterText.toLowerCase()) ||
        item.appt?.toLowerCase().includes(residentsFilterText.toLowerCase()) ||
        item.email.toLowerCase().includes(residentsFilterText.toLowerCase())
    );

    const filteredFactures = facturesData.filter(item =>
        item.userFirstName.toLowerCase().includes(facturesFilterText.toLowerCase()) ||
        item.userLastName.toLowerCase().includes(facturesFilterText.toLowerCase()) ||
        item.userImmeuble.toLowerCase().includes(facturesFilterText.toLowerCase()) ||
        item.statut.toLowerCase().includes(facturesFilterText.toLowerCase()) ||
        item.userAppartement.toLowerCase().includes(facturesFilterText.toLowerCase())
    );


    return (
        <>
            <Draggable 
                nodeRef={residentsRef}
                onStart={() => handleStartDrag(residentsRef)}
            >
                <div 
                    ref={residentsRef} 
                    className="draggable-table" 
                    style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        left: '100px', 
                        borderRadius: '10px',  
                        zIndex: 1,
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)' 
                    }}
                >
                    <DataTable
                        title="Habitants"
                        columns={residentsColumns}
                        data={filteredResidents}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10]}
                        progressPending={loading}
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                            <input
                                type="text"
                                placeholder="Chercher habitants..."
                                value={residentsFilterText}
                                onChange={e => setResidentsFilterText(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: 'none',
                                    outline: 'none'
                                }}
                            />
                        }
                        customStyles={{
                            table: {
                                style: {
                                    margin: 0,
                                    borderCollapse: 'collapse'
                                }
                            },
                            headCells: {
                                style: {
                                    backgroundColor: '#009879',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    paddingLeft: '8px',
                                    paddingRight: '8px',
                                },
                            },
                            cells: {
                                style: {
                                    paddingLeft: '8px',
                                    paddingRight: '8px',
                                }
                            }
                        }}
                    />
                </div>
            </Draggable>

            <Draggable 
                nodeRef={facturesRef}
                onStart={() => handleStartDrag(facturesRef)}
            >
                <div 
                    ref={facturesRef} 
                    className="draggable-table" 
                    style={{ 
                        position: 'absolute', 
                        bottom: '0px', 
                        left: '100px', 
                        borderRadius: '10px', 
                        overflow: 'hidden',
                        zIndex: 1 
                    }}
                >
                    <DataTable
                        title="Factures"
                        columns={facturesColumns}
                        data={filteredFactures}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        progressPending={loading}
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                            <input
                                type="text"
                                placeholder="Filtrer factures..."
                                value={facturesFilterText}
                                onChange={e => setFacturesFilterText(e.target.value)}
                                style={{ width: '100%', padding: '10px' }}
                            />
                        }
                        customStyles={{
                            headCells: {
                                style: {
                                    backgroundColor: '#009879',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    paddingLeft: '8px', 
                                    paddingRight: '8px',
                                    overflow: 'visible', 
                                    whiteSpace: 'normal', 
                                },
                            },
                        }}
                    />
                </div>
            </Draggable>

            <Draggable 
                nodeRef={barChartRef}
                onStart={() => handleStartDrag(barChartRef)}
            >
                <div 
                    ref={barChartRef} 
                    className="draggable-chart" 
                    style={{ 
                        position: 'absolute', 
                        width: '400px', 
                        top: '0px', 
                        left: '1100px', 
                        height: '50%', 
                        backgroundColor: 'white', 
                        padding: '10px', 
                        borderRadius: '10px',
                        zIndex: 1 
                    }}
                >
                    <Bar
                        data={{
                            labels: chartData.immeubles,
                            datasets: [{
                                label: "Nombre d'habitants par Immeuble",
                                data: chartData.counts,
                                backgroundColor: "#009879",
                                hoverBackgroundColor: "green"
                            }]
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Couverture Démographique",
                                    align: "center"
                                }
                            }
                        }}
                    />
                </div>
            </Draggable>

            <Draggable 
                nodeRef={pieChartRef}
                onStart={() => handleStartDrag(pieChartRef)}
            >
                <div 
                    ref={pieChartRef} 
                    className="draggable-chart" 
                    style={{ 
                        position: 'absolute', 
                        width: '350px', 
                        top: '400px', 
                        left: '1100px', 
                        height: '45%', 
                        backgroundColor: 'white', 
                        padding: '10px', 
                        borderRadius: '10px',
                        zIndex: 1 // Initial z-index
                    }}
                >
                    <Pie
                        data={{
                            labels: ['Factures Payés', 'Factures Impayés'],
                            datasets: [{
                                data: [
                                    facturesData.filter(f => f.statut === 'Payée').length,
                                    facturesData.filter(f => f.statut !== 'Payée').length
                                ],
                                backgroundColor: ['green', 'red'],
                                hoverOffset: 4
                            }]
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Statut des Factures",
                                    align: "center"
                                }
                            }
                        }}
                    />
                </div>
            </Draggable>
        </>
    );
}