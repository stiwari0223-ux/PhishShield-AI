PhishShield – AI-Based Phishing Detection System

PhishShield is an AI-powered web application designed to detect phishing URLs and help users avoid malicious websites before interacting with them. With phishing being one of the most common and dangerous cyber threats today, this project focuses on providing a lightweight, real-time, and user-friendly solution using machine learning.

The system analyzes structural and lexical features of URLs—such as length, special characters, presence of IP addresses, and suspicious keywords—to classify whether a link is Safe or Phishing. PhishShield aims not only to enhance cybersecurity but also to promote digital awareness and safer browsing habits.

 Features
Real-time URL phishing detection
Machine Learning–based classification
Confidence score for each prediction
User-friendly web interface
Fast response using Flask backend
Educational insights into suspicious URL patterns

How It Works

User enters a suspicious URL in the web interface
The backend extracts multiple URL-based features:
URL length
Number of special characters
Presence of IP address
Subdomains count
Keywords like login, verify, update
Extracted features are passed to a trained ML model
The model predicts whether the URL is Phishing or Legitimate
Result and confidence score are displayed to the user

Tech Stack

Backend
Python
Flask
Scikit-learn
Pandas, NumPy
Frontend
HTML
CSS
JavaScript
Machine Learning
Random Forest Classifier
Logistic Regression (evaluated)
Feature-based URL classification

Model Performance

Best Model: Random Forest
Accuracy: ~96.5%
Inference Time: < 300 ms per URL

🎯 Project Objectives
Detect phishing URLs accurately using AI
Reduce user exposure to online fraud
Encourage safe and informed browsing behavior
Demonstrate practical application of machine learning in cybersecurity

🌍 Social Impact
PhishShield aligns with UN Sustainable Development Goal 16 (SDG-16) by promoting secure digital infrastructure and reducing cybercrime. The project contributes to improving trust and safety in online environments.

🔮 Future Scope
Browser extension (Chrome / Firefox)
Email phishing detection
Deep learning models (LSTM / CNN)
Live URL threat intelligence integration
Mobile application support

📂 Dataset
Public phishing datasets from Kaggle and UCI ML Repository

Labeled URLs (phishing & legitimate)

🧑‍💻 Author
Sudhanshu Tiwari
B.Tech – Computer Science & Engineering (Data Science)
