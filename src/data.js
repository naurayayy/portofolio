export const NAV_LINKS = [
  ['home', 'Home'],
  ['about', 'About'],
  ['projects', 'Projects'],
  ['community', 'Community'],
  ['contact', 'Contact'],
]

export const SOCIALS = [
  ['instagram', 'Instagram'],
  ['dribbble', 'Dribbble'],
  ['behance', 'Behance'],
  ['linkedin-in', 'LinkedIn'],
  ['github', 'GitHub'],
]

export const STATS = [
  { value: 150, suffix: '+', label: 'Projects' },
  { value: 98, suffix: '%', label: 'Satisfaction' },
  { value: 5, suffix: '+', label: 'Yrs Exp' },
]

export const SERVICES = [
  { icon: 'laptop-code', tone: 'ic-mint', title: 'Web Development', text: 'Custom websites built with modern technologies for optimal performance and user experience.', href: '#projects', cta: 'View Projects' },
  { icon: 'mobile-alt', tone: 'ic-blush', title: 'Mobile Apps', text: 'Native and cross-platform applications that deliver seamless experiences on iOS and Android.', href: '#projects', cta: 'View Projects' },
  { icon: 'paint-brush', tone: 'ic-mint', title: 'UI/UX Design', text: 'User-centered design solutions that create intuitive and conversion-focused digital experiences.', href: '#projects', cta: 'View Projects' },
  { icon: 'bullhorn', tone: 'ic-blush', title: 'Brand Identity', text: 'Complete brand identity packages that make your business memorable and distinctive.', href: '#projects', cta: 'View Projects' },
  { icon: 'search', tone: 'ic-mint', title: 'SEO Optimization', text: 'Strategies that improve your online visibility and drive organic traffic to your platforms.', href: '#contact', cta: 'Get Started' },
  { icon: 'cogs', tone: 'ic-blush', title: 'Digital Strategy', text: 'Comprehensive strategies that align with your goals and maximize your return on investment.', href: '#contact', cta: 'Learn More' },
]

export const FILTERS = [
  ['all', 'All Projects'],
  ['web', 'Web Design'],
  ['mobile', 'Mobile App'],
  ['branding', 'Branding'],
  ['ui-ux', 'UI/UX'],
]

// tech: [name, isGreen]
export const PROJECTS = [
  {
    id: 'ecommerce', featured: true, category: 'web ui-ux', cat: 'Web Development • UI/UX',
    title: 'Modern E-Commerce Platform', second: 'Live Demo',
    img: '/projects/ecommerce.svg',
    desc: 'A comprehensive e-commerce solution with advanced filtering, real-time inventory management, and seamless checkout experience built with modern technologies.',
    tech: [['React'], ['Node.js'], ['MongoDB', true], ['Stripe'], ['Redux', true]],
    modalDesc: 'A comprehensive e-commerce solution with advanced filtering, real-time inventory management, and seamless checkout experience. Built with React, Node.js, and MongoDB for optimal performance.',
    modalImg: '/projects/ecommerce.svg',
  },
  {
    id: 'fitness', category: 'mobile ui-ux', cat: 'Mobile App • UI/UX',
    title: 'FitTrack Mobile App', second: 'Live Demo',
    img: '/projects/fittrack.svg',
    desc: 'Intuitive fitness tracking app with personalized workout plans, progress monitoring, and social features to keep users motivated.',
    tech: [['React Native'], ['Firebase', true], ['Redux']],
    modalDesc: 'Intuitive fitness tracking app with personalized workout plans, progress monitoring, and social features to keep users motivated on their fitness journey.',
    modalImg: '/projects/fittrack.svg',
  },
  {
    id: 'brand', category: 'branding', cat: 'Branding',
    title: 'Sustainable Brand Identity', second: 'Portfolio',
    img: '/projects/brand.svg',
    desc: 'Complete brand identity design for an eco-friendly startup, including logo, color palette, typography, and brand guidelines.',
    tech: [['Illustrator', true], ['Photoshop', true], ['InDesign']],
    modalDesc: 'Complete brand identity design for an eco-friendly startup. Includes logo system, color palette, typography guidelines, and comprehensive brand manual.',
    modalImg: '/projects/brand.svg',
  },
  {
    id: 'restaurant', category: 'web', cat: 'Web Development',
    title: 'Restaurant Website', second: 'Live Site',
    img: '/projects/restaurant.svg',
    desc: 'Elegant restaurant website with online reservation system, menu showcase, and location integration.',
    tech: [['HTML5'], ['CSS3'], ['JavaScript', true], ['PHP']],
    modalDesc: 'Elegant restaurant website with online reservation system, menu showcase, and Google Maps integration. Fully responsive and optimised for conversions.',
    modalImg: '/projects/restaurant.svg',
  },
  {
    id: 'dashboard', category: 'ui-ux', cat: 'UI/UX Design',
    title: 'Analytics Dashboard', second: 'Prototype',
    img: '/projects/dashboard.svg',
    desc: 'Clean and intuitive dashboard design for data visualization with focus on usability and information hierarchy.',
    tech: [['Figma'], ['Principle'], ['Sketch', true]],
    modalDesc: 'Clean and intuitive dashboard design for data visualization. Focused on information hierarchy, accessibility, and a calm visual language that reduces cognitive load.',
    modalImg: '/projects/dashboard.svg',
  },
  {
    id: 'travel', category: 'mobile', cat: 'Mobile Development',
    title: 'Travel Companion App', second: 'App Store',
    img: '/projects/travel.svg',
    desc: 'Comprehensive travel app with itinerary planning, local recommendations, and offline map functionality.',
    tech: [['Flutter', true], ['Dart'], ['Google Maps', true]],
    modalDesc: 'Comprehensive travel app with itinerary planning, local recommendations, and offline map functionality built with Flutter for cross-platform support.',
    modalImg: '/projects/travel.svg',
  },
]

// Photos live in /public (e.g. public/gmd2.jpeg). tags: [text, isGreen]
export const COMMUNITY = [
  { icon: 'chalkboard-teacher', tone: 'tl-edu', photo: 'gmd2.jpeg', org: 'Gerakan Mengajar Desa', role: 'Head of Curriculum Division (Curriculum Manager)', period: 'August 2025 – March 2026',
    desc: 'Designed the curriculum for the teaching volunteers and coordinated the Training of Trainers agenda to prepare them before heading to the village.',
    tags: [['Leadership'], ['Curriculum Design', true], ['Coordination', true]] },
  { icon: 'file-alt', tone: 'tl-comm', photo: 'hima-ti.jpg', org: 'Himpunan Mahasiswa Teknik Informatika D3', role: 'Secretary', period: 'July 2025 – February 2026',
    desc: 'Handled administration, correspondence, and documentation for the Informatics Engineering (D3) student association.',
    tags: [['Administration'], ['Communication'], ['Organization', true]] },
  { icon: 'code', tone: 'tl-health', photo: 'csa.jpeg', org: 'Creative Student Association', role: 'Programming Division Member', period: 'April 2025 – April 2026',
    desc: "Wrote code for the association's projects, joined the events division when events were held, and worked as a data analyst on project work.",
    tags: [['Programming'], ['Data Analysis', true], ['Event Management']] },
  { icon: 'hand-holding-heart', tone: 'tl-edu', photo: 'bantu.jpeg', org: 'Bantu Mereka Indonesia', role: 'Volunteer', period: 'April 2025',
    desc: 'Spent a day volunteering at a home for children with cancer in Bandung.',
    tags: [['Volunteering'], ['Empathy', true], ['Teamwork']] },
  { icon: 'book-reader', tone: 'tl-comm', photo: 'gmd1.jpeg', org: 'Gerakan Mengajar Desa', role: 'Inspiring Tutor, Events Division', period: 'October 2024 – March 2025',
    desc: "Served in my group's events division and taught in a village for a week. Prepared a week of teaching materials for elementary school students and planned the agenda for the closing performance.",
    tags: [['Teaching'], ['Event Planning', true], ['Teamwork', true]] },
  { icon: 'bullhorn', tone: 'tl-health', photo: 'genlit.jpeg', org: 'Indorelawan x Generasi Literasi', role: 'Public Relations Division', period: 'June 2024 – October 2024',
    desc: 'Opened donations for reading houses, connected reading houses with volunteer groups, and created a social media campaign about the reading emergency.',
    tags: [['Public Relations'], ['Social Media Campaign'], ['Communication', true]] },
  { icon: 'graduation-cap', tone: 'tl-edu', photo: 'novo.jpeg', org: 'Novoclub by Paragon', role: 'Volunteer', period: 'January 2024 – September 2024',
    desc: "Joined Novoclub Region 3 and learned about leadership and responsibility through the community's webinars and programs.",
    tags: [['Leadership'], ['Responsibility', true], ['Learning']] },
]

export const CONTACTS = [
  { icon: 'envelope', tone: 'ic-blush', title: 'Email', text: 'nauranisa1204@gmail.com', href: 'mailto:nauranisa1204@gmail.com', note: 'I typically respond within 24 hours' },
  { icon: 'phone', tone: 'ic-mint', title: 'Phone / WhatsApp', text: '+62 812-3456-7890', href: 'tel:+6281234567890', note: 'Available Mon–Fri, 9AM–6PM WIB' },
  { icon: 'map-marker-alt', tone: 'ic-blush', title: 'Location', note: 'Available for remote work worldwide', place: 'Indonesia 🇮🇩' },
]