import '../../css/LayoutDash.css'
import {useEffect} from "react";


export default function LayoutUserDashboard(){



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
              <table className="PaidFactures draggable-table"
                     style={{ position: 'absolute' }}>
                  <caption>Factures Payés</caption>
                  <thead>
                  <tr>
                      <th>Montant</th>
                      <th>Objet</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>30</td>
                      <td>Amenagement de Terasse </td>
                  </tr>
                  <tr>
                      <td>30</td>
                      <td>Femmes de Ménage</td>

                  </tr>
                  <tr>
                      <td>25</td>
                      <td>bla bla</td>

                  </tr>
                  </tbody>
              </table>
              <div className="OnGoingFacturesContainer draggable-table" style={{ position: 'absolute' }}>
              <table className="OnGoingFactures"
                     >
                  <caption>Factures</caption>
                  <thead>
                  <tr>
                      <th>Montant</th>
                      <th>Objet</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>40</td>
                      <td>Amenagement de Terasse </td>
                  </tr>
                  <tr>
                      <td>30</td>
                      <td>Femmes de Ménage</td>

                  </tr>
                  <tr>
                      <td>25</td>
                      <td>bla bla</td>

                  </tr>
                  </tbody>
              </table>
                  <div className="PaymentFacturesButtonsContainer">
                      <button className="PaymentFacturesFactures">Pay ALL</button>
                      <button className="PaymentFacturesFactures">Pay</button>
                  </div>
              </div>
          </>
      )
    }