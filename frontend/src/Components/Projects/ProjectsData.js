import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaDatabase, FaChartBar, FaRobot, FaChartPie, FaShoppingCart, FaPizzaSlice, FaUtensils, FaTaxi, FaMoneyBillWave, FaFutbol, FaPlane, FaFileExcel, FaChartLine } from 'react-icons/fa';
import image from '../../assets/image.jpg'

const projectsData = [
  {
    id: 1,
    title: "Performance Review of Forggith Pharmaceuticals",
    description: "Designed an insightful Power BI reporting solution for Forggith Pharmaceuticals, providing a deep dive into sales and marketing performance, and empowering stakeholders with data-driven insights for optimized performance.",
    image: image, 
    tags: ["Power BI", "Data Analysis", "Pharmaceuticals", "Sales Analytics"],
    github: "#",
    demo: "#",
    category: "data-visualization",
    featured: true,
    iconTypes: ["chart-pie", "chart-bar"],
    viewProject: "https://github.com/Taofik06/Performance-Review-of-Forggith-Pharmaceuticals",
    viewDashboard: "https://app.powerbi.com/view?r=eyJrIjoiYjYwNWI4YWUtYTZjYS00NjM2LWE2YzgtNzRmZjc0OGVmNjY4IiwidCI6ImQwNDU3ZGRiLTJmYTUtNGM1Mi05YmUzLTJhMzIzYTAxZjRhMiJ9&pageName=ReportSection"
  },
  {
    id: 2,
    title: "Leveraging Data Driven Insights for E-Commerce Growth",
    description: "Performed an End-to-End data analytics process building a robust pipeline for data cleaning, integration, and visualization, culminating in an insightful business/sales dashboard that offers performance summary and actionable insights for growth.",
    image: image,
    tags: ["E-Commerce", "Data Pipeline", "Dashboard", "Sales Analytics"],
    github: "#",
    demo: "#",
    category: "data-science",
    featured: true,
    iconTypes: ["shopping-cart", "chart-line"],
    viewProject: "https://github.com/Taofik06/Leveraging-Data-Driven-Insights-for-E-commerce-Growth/blob/main/Leveraging%20Data-Driven%20Insights%20for%20E-commerce%20Growth.ipynb",
    viewDashboard: "https://app.powerbi.com/view?r=eyJrIjoiNDFjMDFkMmMtNTJiNi00M2NlLTg0ZmYtMDNmMjI2NzZiY2I3IiwidCI6ImQwNDU3ZGRiLTJmYTUtNGM1Mi05YmUzLTJhMzIzYTAxZjRhMiJ9"
  },
  {
    id: 3,
    title: "Operational Efficiency and Customer Insight Analysis with SQL",
    description: "Conducted a comprehensive SQL based analysis of Pizza Runner's data to generate insights for Operations efficiency optimization and customer service improvement.",
    image: image,
    tags: ["SQL", "Operations", "Customer Analytics", "Data Analysis"],
    github: "#",
    demo: "#",
    category: "data-analysis",
    featured: true,
    iconTypes: ["pizza-slice", "database"],
    viewProject: "https://github.com/Taofik06/Business-Analysis-with-SQL-Operaional-Efficiency-and-Customer-Insights-at-Pizza-Runner"
  },
  {
    id: 4,
    title: "Danny's Diner SQL-Based Analysis of Customer Spending",
    description: "A data-driven analysis using SQL to provide actionable insights for enhancing customer experience and making informed business decisions.",
    image: image,
    tags: ["SQL", "Customer Analysis", "Business Intelligence", "Restaurant Analytics"],
    github: "#",
    demo: "#",
    category: "data-analysis",
    featured: false,
    iconTypes: ["utensils", "database"],
    viewProject: "https://github.com/Taofik06/Danny-s-Diner-SQL-Based-Analysis-of-Customer-Spending-and-Preferences/tree/main"
  },
  {
    id: 5,
    title: "Sales Forecast and Comparative Analysis of Company Profiles",
    description: "Conducted in-depth analysis and sales forecast of two prominent cab companies in the US, comparing their market dynamics, performance, and customer profiles to generate actionable insights for investment decision.",
    image: image,
    tags: ["Forecasting", "Comparative Analysis", "Market Research", "Investment Analytics"],
    github: "#",
    demo: "#",
    category: "data-science",
    featured: false,
    iconTypes: ["taxi", "chart-line"],
    viewProject: "https://github.com/Taofik06/Sales-Forecast-And-Comparative-Analysis/blob/main/Sales%20Forecast%20And%20Comparative%20Analysis%20of%20Company%20Profile.ipynb"
  },
  {
    id: 6,
    title: "Analysis and Prediction of Bank Term Deposit Subscription",
    description: "Conducted comprehensive data wrangling, exploratory data analysis, and feature engineering on the Portuguese bank marketing dataset, leading to the successful deployment of a predictive model on Streamlit to predict term deposit subscription.",
    image: image,
    tags: ["Machine Learning", "Streamlit", "Banking", "Predictive Analytics"],
    github: "#",
    demo: "#",
    category: "machine-learning",
    featured: false,
    iconTypes: ["money", "robot"],
    viewProject: "https://github.com/Taofik06/-PREDICTION-OF-BANK-TERM-DEPOSIT-CUSTOMER-SUBSCRIPTION/blob/main/Bank_Marketing_Project.ipynb"
  },
  {
    id: 7,
    title: "Sales Analytics with Excel",
    description: "Analyzed a comprehensive sales dataset with Excel to generate valuable insights, build a dynamic and interactive dashboard to answer critical business questions to make informed data driven decision.",
    image: image,
    tags: ["Excel", "Dashboard", "Sales Analytics", "Business Intelligence"],
    github: "#",
    demo: "#",
    category: "data-analysis",
    featured: false,
    iconTypes: ["excel", "chart-bar"],
    viewProject: "https://medium.com/@opeyemitaofik96/sales-analytics-with-excel-ae9d7a3476c4"
  },
  {
    id: 8,
    title: "FIFA 21 Player Value Prediction",
    description: "Developed a Machine Learning model with 98% accuracy using Regression technique in Python to predict the value of players in the FIFA 21 dataset, which contained over 18,000 observations. Used Power BI to create a visually-engaging dashboard for enhanced data exploration and analysis.",
    image: image,
    tags: ["Machine Learning", "Python", "Power BI", "Regression", "Sports Analytics"],
    github: "#",
    demo: "#",
    category: "machine-learning",
    featured: false,
    iconTypes: ["football", "robot"],
    viewProject: "https://github.com/Taofik06/Machine_Learning_Projects/blob/main/FIFA%2021%20PLAYER%20VALUE%20PREDICTION.ipynb"
  },
  {
    id: 9,
    title: "Routing Optimization for Aeronautical Networks",
    description: "Dijkstra and Extended Dijkstra Algorithm were used to solve real-life routing optimization problem for Aeronautical networks: single-objective and multiple-objectives optimization challenges of 216 airplanes trying to access internet from ground stations while maximizing transmission rate and minimizing latency.",
    image: image,
    tags: ["Optimization", "Algorithms", "Network Analysis", "Aeronautical"],
    github: "#",
    demo: "#",
    category: "optimization",
    featured: false,
    iconTypes: ["plane", "chart-line"],
    viewProject: "https://github.com/Taofik06/Routing-Optimisation-for-Aeronautical-Networks/blob/main/RoutingOptimisation.ipynb"
  },
  {
    id: 10,
    title: "Exploratory Data Analysis with Python",
    description: "Performed an exploratory data analysis using Python on Olympics dataset (36,931 rows, 13 columns from 1896 to 2014). Analysis included summer and winter Olympics games data along with economic parameters (population, GDP) of participating countries.",
    image: image,
    tags: ["Python", "EDA", "Olympics", "Sports Analytics"],
    github: "#",
    demo: "#", 
    category: "data-analysis",
    featured: false,
    iconTypes: ["chart-bar", "chart-line"],
    viewProject: "hhttps://github.com/Taofik06/Exploratory_Data_Analysis/blob/main/EXPLORATORY%20DATA%20%20ANALYSIS.%20OLYMPICS%201896-2014%20DATASET.ipynb"
  }
];

export default projectsData;