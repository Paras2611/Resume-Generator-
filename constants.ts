
import { ResumeData } from './types';

export const INITIAL_DATA: ResumeData = {
  experienceLevel: 'experienced',
  personalInfo: {
    fullName: "Aarav Sharma",
    jobTitle: "Senior Frontend Engineer",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
    website: "aaravsharma.in",
    linkedin: "linkedin.com/in/aaravsharma",
    github: "github.com/aaravsharma",
    summary: "Innovative and detail-oriented Frontend Engineer with over 6 years of experience in the Indian tech ecosystem. Proven track record of building high-performance web applications for fintech and e-commerce sectors. Proficient in the modern React ecosystem, TypeScript, and cloud-native architectures."
  },
  experience: [
    {
      id: '1',
      company: "Flipkart",
      position: "Senior Frontend Developer",
      location: "Bengaluru, KA",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description: "• Spearheaded the frontend overhaul of the checkout flow using Next.js, reducing cart abandonment by 15% during Big Billion Days.\n• Mentored a squad of 4 junior developers and conducted React workshops for the team.\n• Optimized mobile web performance for tier-2 and tier-3 city network conditions, improving TTI by 40%."
    },
    {
      id: '2',
      company: "Zomato",
      position: "Frontend Developer",
      location: "Gurugram, HR",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      description: "• Developed responsive UI components for the partner dashboard using React and Redux.\n• Integrated payment gateways (Razorpay, Paytm) and real-time order tracking using WebSockets.\n• Collaborated with product teams to launch the Zomato Gold subscription feature."
    }
  ],
  education: [
    {
      id: '1',
      institution: "Indian Institute of Technology, Bombay",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science and Engineering",
      startDate: "2014-07",
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
    { id: '6', name: "AWS", level: "Advanced" }
  ],
  projects: [
    {
      id: '1',
      name: "DesiLedger",
      description: "A digital khata (ledger) application for small shopkeepers to track credits and payments digitally.",
      link: "github.com/aaravsharma/desiledger",
      technologies: "React Native, Firebase, Node.js"
    }
  ]
};
