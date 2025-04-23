'use client';

import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFDownloadLink,
  Link
} from '@react-pdf/renderer';
import { FaFilePdf } from 'react-icons/fa';

// Define types for the component props
interface LearningResource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'course';
}

interface Node {
  id: string;
  question: string;
  isLeaf?: boolean;
  recommendation?: string;
  description?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | string;
  pros?: string[];
  cons?: string[];
  learningResources?: LearningResource[];
  options?: { id: string; text: string; nextNodeId?: string }[];
}

interface PDFExportProps {
  path: Node[];
  currentNode: Node;
  answers?: string[];
}

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a56db',
    fontWeight: 'bold',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  pathItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  questionNumber: {
    width: 25,
    fontWeight: 'bold',
  },
  question: {
    flex: 1,
    fontWeight: 'bold',
  },
  answer: {
    marginLeft: 25,
    marginBottom: 10,
    color: '#4b5563',
  },
  recommendationBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f9ff',
    borderRadius: 5,
  },
  prosConsSection: {
    marginTop: 10,
  },
  list: {
    marginLeft: 15,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bullet: {
    width: 10,
  },
  learningResources: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 5,
  },
  resourceItem: {
    marginBottom: 8,
  },
  resourceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  resourceType: {
    fontSize: 10,
    color: '#6b7280',
    marginLeft: 5,
  },
  resourceUrl: {
    fontSize: 10,
    color: '#3b82f6',
    textDecoration: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#6b7280',
  },
});

// PDF Document definition
const RecommendationDocument: React.FC<PDFExportProps> = ({ 
  path, 
  currentNode, 
  answers = [] 
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>AIML Solution Recommendation</Text>
      
      <View style={styles.section}>
        <Text style={styles.title}>Your Path</Text>
        {path.map((node: Node, index: number) => (
          <View key={index}>
            <View style={styles.pathItem}>
              <Text style={styles.questionNumber}>{index + 1}.</Text>
              <Text style={styles.question}>{node.question}</Text>
            </View>
            {answers[index] && (
              <Text style={styles.answer}>Selected: {answers[index]}</Text>
            )}
          </View>
        ))}
      </View>
      
      {currentNode.isLeaf && (
        <View style={styles.section}>
          <Text style={styles.title}>Recommendation:</Text>
          <View style={styles.recommendationBox}>
            <Text style={styles.subtitle}>{currentNode.recommendation}</Text>
            <Text style={styles.text}>{currentNode.description}</Text>
            
            {currentNode.skillLevel && (
              <Text style={[styles.text, { marginTop: 10 }]}>
                Skill Level: {currentNode.skillLevel}
              </Text>
            )}

            {currentNode.pros && currentNode.pros.length > 0 && (
              <View style={styles.prosConsSection}>
                <Text style={styles.subtitle}>Pros:</Text>
                <View style={styles.list}>
                  {currentNode.pros.map((pro: string, i: number) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.text}>{pro}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {currentNode.cons && currentNode.cons.length > 0 && (
              <View style={styles.prosConsSection}>
                <Text style={styles.subtitle}>Cons:</Text>
                <View style={styles.list}>
                  {currentNode.cons.map((con: string, i: number) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.text}>{con}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {currentNode.learningResources && currentNode.learningResources.length > 0 && (
              <View style={styles.learningResources}>
                <Text style={styles.subtitle}>Learning Resources:</Text>
                <View style={styles.list}>
                  {currentNode.learningResources.map((resource: LearningResource, i: number) => (
                    <View key={i} style={styles.resourceItem}>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.resourceTitle}>{resource.title}</Text>
                        <Text style={styles.resourceType}>({resource.type})</Text>
                      </View>
                      <Link src={resource.url}>
                        <Text style={styles.resourceUrl}>{resource.url}</Text>
                      </Link>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      )}
      
      <Text style={styles.footer}>
        Generated by AIML Decision Tree Tool • {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);

// The actual PDF export button component
const PDFExport: React.FC<PDFExportProps> = ({ path, currentNode, answers = [] }) => {
  if (!currentNode || !currentNode.isLeaf) {
    return null;
  }

  return (
    <PDFDownloadLink 
      document={<RecommendationDocument path={path} currentNode={currentNode} answers={answers} />} 
      fileName="aiml-recommendation.pdf"
      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow transition-colors"
    >
      {({ loading }) => (
        loading ? 
        'Preparing document...' : 
        <>
          <FaFilePdf />
          <span>Export as PDF</span>
        </>
      )}
    </PDFDownloadLink>
  );
};

export default PDFExport; 