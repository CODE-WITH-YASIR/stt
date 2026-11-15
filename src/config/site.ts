export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  category: string;
  url: string;
  ogImage: string;
  contact: {
    email: string;
    supportEmail: string;
    phone: string;
    phoneDisplay: string;
    whatsappNumber: string;
    whatsappUrl: string;
    address: string;
    city: string;
    country: string;
    operatingHours: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    discord: string;
  };
  stats: {
    value: string;
    label: string;
    description: string;
  }[];
  navItems: {
    label: string;
    href: string;
    badge?: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "NIYAN",
  legalName: "NIYAN AI & Digital Solutions Technologies",
  tagline: "Building Intelligent Solutions for a Digital Future.",
  description:
    "We combine AI, software engineering, and digital innovation to transform ideas into impactful solutions for students, startups, businesses, and organizations.",
  category: "AI, Software Development & Digital Solutions",
  url: "https://niyan.ai",
  ogImage: "https://niyan.ai/og-image.jpg",
  contact: {
    email: "mohamedyasir2005@gmail.com",
    supportEmail: "mohamedyasir2005@gmail.com",
    phone: "",
    phoneDisplay: "",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917010886321",
    whatsappUrl: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917010886321"}?text=${encodeURIComponent("Hi NIYAN Team, I am interested in NIYAN Technologies services. I would like to discuss a project.")}`,
    address: "Tech Innovation Hub, Cyber Park, Sector 62",
    city: "Bengaluru, Karnataka",
    country: "India",
    operatingHours: "Monday - Saturday: 9:00 AM - 8:00 PM IST",
  },
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    discord: "https://discord.com",
  },
  stats: [
    {
      value: "8 Core",
      label: "Specialized Disciplines",
      description: "From custom neural networks to web platforms and mobile apps",
    },
    {
      value: "100%",
      label: "Code & IP Ownership",
      description: "Complete repository, weights, and deployment handover",
    },
    {
      value: "End-to-End",
      label: "Production Engineering",
      description: "From architectural conception to cloud deployment and monitoring",
    },
    {
      value: "Dedicated",
      label: "Technical Mentorship",
      description: "Rigorous 1-on-1 code walkthroughs and IEEE-standard capstone guidance",
    },
  ],
  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Engagement", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
