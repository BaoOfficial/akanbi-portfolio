// ContactData.js - Without JSX elements
import React from 'react';

// Export contact details without JSX
export const contactInfo = {
  email: {
    title: "Email",
    value: "taofik.akanbi@gmail.com",
    link: "mailto:taofik.akanbi@gmail.com",
    delay: 100
  },
  phone: {
    title: "Phone",
    value: "+234 801 234 5678",
    link: "tel:+2348012345678",
    delay: 200
  },
  location: {
    title: "Location",
    value: "Lagos, Nigeria",
    link: "https://maps.google.com/?q=Lagos,Nigeria",
    delay: 300
  },
  workingHours: {
    title: "Working Hours",
    value: "Mon - Fri: 9AM - 5PM",
    delay: 400
  }
};

// Export social links without JSX
export const socialInfo = {
  linkedin: {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/taofik-akanbi/",
    color: "bg-blue-600",
    delay: 500
  },
  github: {
    name: "GitHub",
    link: "https://github.com/Taofik06/",
    color: "bg-gray-800",
    delay: 600
  },
  twitter: {
    name: "Twitter",
    link: "https://x.com/teekay_akanbi",
    color: "bg-blue-400",
    delay: 700
  },
};

// Config settings
export const contactConfig = {
  title: "Get in Touch",
  description: "I'm always open to discussing new projects, opportunities in data science, or potential collaborations.",
  responseTime: "I typically respond to messages within 24 hours. For urgent inquiries, please reach out via phone.",
  availabilityStatus: {
    available: true,
    message: "Currently available for freelance projects and consulting"
  }
};