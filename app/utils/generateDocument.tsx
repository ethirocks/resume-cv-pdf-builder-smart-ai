import * as Print from 'expo-print';
import { FormData } from '../types';

export const generatePDFDocument = async (formData: FormData) => {
  const educationEntries = formData.education.map((edu) => `
    <h3>${edu.institution}</h3>
    <p>${edu.degree}</p>
    <p style="text-align: right;">${edu.startDate.toDateString()} - ${edu.currently ? 'Present' : edu.endDate?.toDateString()}</p>
  `).join('');

  const experienceEntries = formData.experience.map((exp) => `
    <h3>${exp.company}</h3>
    <p>${exp.role}</p>
    <p style="text-align: right;">${exp.startDate.toDateString()} - ${exp.currently ? 'Present' : exp.endDate?.toDateString()}</p>
    <ul>${exp.description.split('\n').map(item => `<li>${item}</li>`).join('')}</ul>
  `).join('');

  const htmlContent = `
    <html>
      <body>
        <h1 style="text-align: center;">${formData.name}</h1>
        <p>Email: ${formData.email}</p>
        <p>Phone: ${formData.phone}</p>
        <p>LinkedIn: ${formData.linkedin}</p>
        <hr />
        <h2>Education</h2>
        ${educationEntries}
        <hr />
        <h2>Experience</h2>
        ${experienceEntries}
        <hr />
        <h2>Skills</h2>
        <p>${formData.skills}</p>
      </body>
    </html>
  `;
  
  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  return uri;
};

export const generateWordDocument = async (formData: FormData) => {
  // Similar content generation logic for Word format
  // For demonstration, it will be the same as PDF generation
  const educationEntries = formData.education.map((edu) => `
    <h3>${edu.institution}</h3>
    <p>${edu.degree}</p>
    <p style="text-align: right;">${edu.startDate.toDateString()} - ${edu.currently ? 'Present' : edu.endDate?.toDateString()}</p>
  `).join('');

  const experienceEntries = formData.experience.map((exp) => `
    <h3>${exp.company}</h3>
    <p>${exp.role}</p>
    <p style="text-align: right;">${exp.startDate.toDateString()} - ${exp.currently ? 'Present' : exp.endDate?.toDateString()}</p>
    <ul>${exp.description.split('\n').map(item => `<li>${item}</li>`).join('')}</ul>
  `).join('');

  const htmlContent = `
    <html>
      <body>
        <h1 style="text-align: center;">${formData.name}</h1>
        <p>Email: ${formData.email}</p>
        <p>Phone: ${formData.phone}</p>
        <p>LinkedIn: ${formData.linkedin}</p>
        <hr />
        <h2>Education</h2>
        ${educationEntries}
        <hr />
        <h2>Experience</h2>
        ${experienceEntries}
        <hr />
        <h2>Skills</h2>
        <p>${formData.skills}</p>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  return uri;
};
