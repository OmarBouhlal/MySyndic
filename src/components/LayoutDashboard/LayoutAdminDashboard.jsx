import '../../css/LayoutDash.css'
import { useEffect} from 'react';
import {Chart as ChartJS,defaults} from 'chart.js/auto';
import {Bar,Doughnut,Pie} from 'react-chartjs-2';


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
export default function LayoutAdminDashboard() {


    useEffect(() => {
        const makeDraggable = (table) => {
            let offsetX, offsetY;

            const move = (e) => {
                table.style.left = `${e.clientX - offsetX}px`;
                table.style.top = `${e.clientY - offsetY}px`;

            };

            const handleMouseDown = (e) => {
                offsetX = e.clientX - table.offsetLeft;
                offsetY = e.clientY - table.offsetTop;
                document.addEventListener('mousemove', move);
            };

            const handleMouseUp = () => {
                document.removeEventListener('mousemove', move);
            };

            table.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                table.removeEventListener('mousedown', handleMouseDown);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        };

        const tables = document.querySelectorAll('.draggable-table');
        tables.forEach(table => {
            makeDraggable(table);
        });

    }, []);
    return (
        <>


                <table className="Residents_table draggable-table"
                       style={{ position: 'absolute' }}>
                    <caption>Habitants</caption>
                    <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Immeuble</th>
                        <th>Appt</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Omar</td>
                        <td>Bouhlal</td>
                        <td>5</td>
                        <td>7</td>
                        <td>omarbouhlal05@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Tim</td>
                        <td>Martin</td>
                        <td>5</td>
                        <td>7</td>
                        <td>TimMARTIN@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Steve</td>
                        <td>Jobs</td>
                        <td>8</td>
                        <td>7</td>
                        <td>SteveJobs@hotmail.fr</td>
                    </tr>
                    <tr>
                        <td>Michael</td>
                        <td>Richards</td>
                        <td>A</td>
                        <td>8</td>
                        <td>CaptainRICHARDS@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Robert</td>
                        <td>Downey JR</td>
                        <td>B</td>
                        <td>4</td>
                        <td>irONman@gmail.com</td>
                    </tr>
                    <tr>
                        <td>bICYCLE</td>
                        <td>NAH</td>
                        <td>40</td>
                        <td>1</td>
                        <td>BICYCLEYEAH@gmail.com</td>
                    </tr>
                    </tbody>
                </table>



                <table className="Factures_table draggable-table"
                       style={{ position: 'absolute' }}>
                    <caption>Factures</caption>
                    <thead>
                    <tr>
                        <th>Montant</th>
                        <th>Immeuble</th>
                        <th>Sujet</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>20</td>
                        <td>5</td>
                        <td>rinçage de toilette</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>A</td>
                        <td>Femmes de Ménage</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>K</td>
                        <td>Aménagement de Parking</td>
                    </tr>
                    <tr>
                        <td>80</td>
                        <td>5</td>
                        <td>Guardien d'Immeuble</td>
                    </tr>
                    <tr>
                        <td>40</td>
                        <td>7</td>
                        <td>A ajouter</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>5</td>
                        <td>TBA</td>
                    </tr>
                    </tbody>
                </table>

            <div className="BarResidents draggable-table" style={{ position: 'absolute' , width : '400px' ,height : '400px' }}>
            <Bar

               data = {{labels :["ImmA" , "ImmB", "ImmC"] , datasets  : [{
                   label : "Nombre d'habitants par Immeuble" ,
                       data : [10,20,7]
               },
               ]
               }}
            options={{
                backgroundColor : "#009879",
                hoverBackgroundColor : "green",
                plugins: {
                    title: {
                        text : "Couverture Démographique" ,
                        align : "center"},

                },

           }}/>

            </div>
            <div className="doughnutImmeubleFactures draggable-table" style={{ position: 'absolute' , width : '350px' ,height : '300px' }}>
            <Pie data = {
                {
                    labels: [
                'Factures Payés',
                'Factures Impayés'
                ],
                datasets: [{
                data: [10,11],
                backgroundColor: [
                'green',
                'red',
                ],
                hoverOffset: 4
            }]
                }
            }
            options={{
                plugins : {
                    title : {
                        text : "Implication des habitants de l'immeuble" ,
                        align : "center",
                    }

            }}}>
            </Pie>
            </div>





        </>
    )
}