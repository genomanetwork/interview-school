import React from 'react';
import fs from 'fs';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToFile
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 25
  },
  divider: {
    height: 1,
    width: 250,
    backgroundColor: '#000000',
    marginTop: 5,
    marginBottom: 15
  },
  subdivider: {
    height: 1,
    width: 50,
    backgroundColor: '#000000',
    marginVertical: 5
  },
  section: {
    margin: 10,
    padding: 10,

    name: {
      fontSize: 14,
    },
    row: {
      fontSize: 12,
      marginBottom: 5
    }
  }
});

const PDFDocument = ({sections = []}) => {

  const userSections = sections.map(section => {
    const sectionSchedule = section.schedule.map((day, i) => <Text key={i} style={styles.section.row}>{`${day.weekDay}: Start at ${day.startAt} and finish at ${day.endAt}`}</Text>);
    return (
      <View key={section._id} style={styles.section}>
        <Text style={styles.section.name}>{section.subject}</Text>
        <View style={styles.divider} />
        {sectionSchedule}
        <View style={styles.subdivider} />
        <Text style={styles.section.row}>{`Teacher: ${section.teacher}`}</Text>
        <Text style={styles.section.row}>{`Classroom: ${section.classroom}`}</Text>
      </View>
    );
  });

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {userSections}
      </Page>
    </Document>
  );
};

export async function printPDF(userId, userSections = []) {
  const documentsPath = `${process.cwd()}/backend/public/docs/${userId}`;

  if (!fs.existsSync(documentsPath)) {
    fs.mkdirSync(documentsPath, {recursive: true});
  }

  await renderToFile(<PDFDocument sections={userSections} />, `${documentsPath}/mySchedule.pdf`);

  return `${documentsPath}/mySchedule.pdf`;
}
