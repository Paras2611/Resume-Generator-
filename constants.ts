
import { ResumeData } from './types';

export const INITIAL_DATA: ResumeData = {
  experienceLevel: 'experienced',
  personalInfo: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Frontend Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    summary: "Creative and detail-oriented Frontend Engineer with over 6 years of experience building scalable web applications. Proficient in the modern React ecosystem, TypeScript, and UI/UX design. Passionate about performance optimization and accessible web design."
  },
  experience: [
    {
      id: '1',
      company: "TechNova Solutions",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description: "• Led the frontend architecture migration from legacy code to Next.js and TypeScript, improving load times by 40%.\n• Mentored a team of 4 junior developers, conducting code reviews and implementing best practices.\n• Collaborated with designers to implement a new design system using Tailwind CSS."
    },
    {
      id: '2',
      company: "Creative Pulse Agency",
      position: "Frontend Developer",
      location: "Austin, TX",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      description: "• Developed responsive websites for over 20 clients using React and Gatsby.\n• Integrated third-party APIs including Stripe and Contentful.\n• Optimized SEO and accessibility scores, achieving 100% on Lighthouse audits."
    }
  ],
  education: [
    {
      id: '1',
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-05",
      current: false
    }
  ],
  skills: [
    { id: '1', name: "React / Next.js", level: "Expert" },
    { id: '2', name: "TypeScript", level: "Expert" },
    { id: '3', name: "Tailwind CSS", level: "Advanced" },
    { id: '4', name: "Node.js", level: "Intermediate" },
    { id: '5', name: "GraphQL", level: "Intermediate" },
    { id: '6', name: "Figma", level: "Advanced" }
  ],
  projects: [
    {
      id: '1',
      name: "E-commerce Dashboard",
      description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization.",
      link: "github.com/alexmorgan/dashboard",
      technologies: "React, D3.js, Firebase"
    }
  ]
};