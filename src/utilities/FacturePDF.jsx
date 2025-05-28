import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #009879',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009879',
    marginBottom: 5
  },
  status: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: '#009879',
    padding: 5,
    borderRadius: 3,
    alignSelf: 'flex-start'
  },
  section: {
    marginBottom: 15
  },
  label: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 3
  },
  value: {
    fontSize: 14,
    marginBottom: 10
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009879'
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    color: '#999999',
    textAlign: 'center'
  }
});


const FacturePDF = ({ facture }) => {
  // Dynamically set status style: red if "En retard", else default
  const statusStyle = [
    styles.status,
    facture.statut === 'En retard' 
      ? { backgroundColor: '#e74c3c', color: '#fff' }
      : {},
      facture.statut === 'En attente' 
      ? { backgroundColor: 'orange', color: '#fff' }
      : {}
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Facture #{facture.numero}</Text>
          <Text style={statusStyle}>{facture.statut}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{facture.date}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Appartement:</Text>
          <Text style={styles.value}>{facture.client}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{facture.type}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Montant:</Text>
          <Text style={[styles.value, styles.amount]}>{facture.montant.toFixed(2)} €</Text>
        </View>

        <View style={styles.footer}>
          <Text>Merci pour votre confiance</Text>
          <Text>© 2025 ENSAM Gestion des Factures</Text>
        </View>
      </Page>
    </Document>
  );
};
// ...existing code...

export default FacturePDF;