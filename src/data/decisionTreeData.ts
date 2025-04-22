export interface Option {
  id: string;
  text: string;
  nextNodeId?: string;
}

export interface Node {
  id: string;
  question: string;
  options: Option[];
  isLeaf?: boolean;
  recommendation?: string;
  description?: string;
}

export const decisionTreeData: Node[] = [
  {
    id: "root",
    question: "What is your primary goal with AI/ML?",
    options: [
      { id: "data-analysis", text: "Data Analysis and Insights", nextNodeId: "data-analysis" },
      { id: "automation", text: "Automation and Efficiency", nextNodeId: "automation" },
      { id: "prediction", text: "Prediction and Forecasting", nextNodeId: "prediction" },
      { id: "personalization", text: "Personalization", nextNodeId: "personalization" },
      { id: "vision", text: "Computer Vision", nextNodeId: "vision" },
      { id: "nlp", text: "Natural Language Processing", nextNodeId: "nlp" },
    ],
  },
  {
    id: "data-analysis",
    question: "What kind of data analysis do you need?",
    options: [
      { id: "exploratory", text: "Exploratory Data Analysis", nextNodeId: "exploratory" },
      { id: "pattern", text: "Pattern Recognition", nextNodeId: "pattern" },
      { id: "segmentation", text: "Segmentation and Clustering", nextNodeId: "segmentation" },
    ],
  },
  {
    id: "exploratory",
    question: "What is the scale of your data?",
    options: [
      { id: "small-scale", text: "Small to Medium Scale", nextNodeId: "small-eda" },
      { id: "big-data", text: "Big Data", nextNodeId: "big-eda" },
    ],
  },
  {
    id: "small-eda",
    question: "What level of expertise do you have?",
    options: [
      { id: "beginner", text: "Beginner", nextNodeId: "pandas-solution" },
      { id: "intermediate", text: "Intermediate", nextNodeId: "r-solution" },
      { id: "advanced", text: "Advanced", nextNodeId: "python-solution" },
    ],
  },
  {
    id: "pandas-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Pandas & Jupyter Notebooks",
    description: "Python's Pandas library combined with Jupyter Notebooks provides an accessible way to perform exploratory data analysis with a gentle learning curve.",
  },
  {
    id: "r-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "R with RStudio",
    description: "R with RStudio offers powerful statistical analysis capabilities with excellent visualization tools like ggplot2.",
  },
  {
    id: "python-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Python Data Science Stack",
    description: "Advanced Python libraries including NumPy, Pandas, Matplotlib, Seaborn, and SciPy offer comprehensive data analysis capabilities.",
  },
  {
    id: "big-eda",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Apache Spark with PySpark",
    description: "For big data analysis, Apache Spark with PySpark interface provides distributed computing capabilities to handle large datasets efficiently.",
  },
  {
    id: "pattern",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Scikit-learn Pattern Mining",
    description: "Scikit-learn offers various algorithms for pattern recognition and association rule mining to discover relationships in your data.",
  },
  {
    id: "segmentation",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "K-means Clustering",
    description: "K-means and hierarchical clustering algorithms help segment your data into meaningful groups based on similarity.",
  },
  {
    id: "automation",
    question: "What area do you want to automate?",
    options: [
      { id: "business-process", text: "Business Processes", nextNodeId: "rpa-solution" },
      { id: "decision-making", text: "Decision Making", nextNodeId: "decision-automation" },
      { id: "customer-service", text: "Customer Service", nextNodeId: "chatbot-solution" },
    ],
  },
  {
    id: "rpa-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Robotic Process Automation (RPA)",
    description: "Tools like UiPath or Automation Anywhere can automate repetitive business processes with minimal coding.",
  },
  {
    id: "decision-automation",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Decision Tree Systems",
    description: "Implement decision tree algorithms or rule-based systems to automate complex decision-making processes.",
  },
  {
    id: "chatbot-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Conversational AI Platform",
    description: "Platforms like Dialogflow or Microsoft Bot Framework can help build intelligent chatbots to automate customer service.",
  },
  {
    id: "prediction",
    question: "What type of prediction are you interested in?",
    options: [
      { id: "numerical", text: "Numerical Prediction", nextNodeId: "regression-solution" },
      { id: "categorical", text: "Categorical Prediction", nextNodeId: "classification-solution" },
      { id: "time-series", text: "Time Series Forecasting", nextNodeId: "time-series-solution" },
    ],
  },
  {
    id: "regression-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Regression Models",
    description: "Linear regression, random forest regression, or gradient boosting algorithms can predict numerical values based on your data.",
  },
  {
    id: "classification-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Classification Algorithms",
    description: "Algorithms like SVM, Random Forest, or Neural Networks can classify data into categories with high accuracy.",
  },
  {
    id: "time-series-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Time Series Models",
    description: "ARIMA, Prophet, or LSTM networks are specialized for time series forecasting and can capture seasonal patterns.",
  },
  {
    id: "personalization",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Recommendation Systems",
    description: "Collaborative filtering, content-based filtering, or hybrid recommendation systems can provide personalized suggestions to users.",
  },
  {
    id: "vision",
    question: "What type of vision task do you need?",
    options: [
      { id: "object-detection", text: "Object Detection", nextNodeId: "object-detection-solution" },
      { id: "image-classification", text: "Image Classification", nextNodeId: "image-classification-solution" },
      { id: "face-recognition", text: "Face Recognition", nextNodeId: "face-recognition-solution" },
    ],
  },
  {
    id: "object-detection-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "YOLO or Faster R-CNN",
    description: "YOLO (You Only Look Once) or Faster R-CNN are state-of-the-art object detection algorithms that can identify multiple objects in images.",
  },
  {
    id: "image-classification-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Convolutional Neural Networks (CNN)",
    description: "CNN architectures like ResNet, VGG, or EfficientNet excel at classifying images into categories.",
  },
  {
    id: "face-recognition-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Face Recognition APIs",
    description: "APIs like Amazon Rekognition or pre-trained models like FaceNet can be used for accurate face recognition applications.",
  },
  {
    id: "nlp",
    question: "What Natural Language Processing task do you need?",
    options: [
      { id: "sentiment-analysis", text: "Sentiment Analysis", nextNodeId: "sentiment-analysis-solution" },
      { id: "text-generation", text: "Text Generation", nextNodeId: "text-generation-solution" },
      { id: "language-translation", text: "Language Translation", nextNodeId: "translation-solution" },
    ],
  },
  {
    id: "sentiment-analysis-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "BERT for Sentiment Analysis",
    description: "Fine-tuned BERT models can provide accurate sentiment analysis of text with contextual understanding.",
  },
  {
    id: "text-generation-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "GPT Models",
    description: "GPT-based models are excellent for generating human-like text for various applications.",
  },
  {
    id: "translation-solution",
    isLeaf: true,
    question: "Recommended Solution:",
    options: [],
    recommendation: "Transformer-based Translation Models",
    description: "Models like T5 or BART can provide high-quality machine translation between different languages.",
  },
]; 