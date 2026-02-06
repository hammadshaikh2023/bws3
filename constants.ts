import { ServiceData, IndustryData, CaseStudy, TeamMember, NavLink, Testimonial, BlogPost } from './types';
import { IMAGES } from './assets/images';

// --- Navigation Structure ---
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { 
    label: 'Services', 
    path: '/services',
    subLinks: [
      { label: 'Custom Web Development', path: '/services/web-development' },
      { label: 'Mobile App Engineering', path: '/services/mobile-app-development' },
      { label: 'Enterprise Software', path: '/services/enterprise' },
      { label: 'UI/UX Design', path: '/services/ui-ux' },
      { label: 'Cloud Architecture', path: '/services/cloud' },
      { label: 'AI & Machine Learning', path: '/services/ai-ml' },
      { label: 'DevOps & Security', path: '/services/devops' },
      { label: 'Blockchain Solutions', path: '/services/blockchain' },
      { label: 'Legacy Modernization', path: '/services/modernization' }
    ]
  },
  {
    label: 'Industries',
    path: '/industries',
    subLinks: [
      { label: 'FinTech', path: '/industries/fintech' },
      { label: 'Healthcare', path: '/industries/healthcare' },
      { label: 'E-Commerce', path: '/industries/ecommerce' },
      { label: 'Real Estate', path: '/industries/real-estate' },
      { label: 'Education', path: '/industries/education' },
      { label: 'Logistics', path: '/industries/logistics' },
      { label: 'Media', path: '/industries/media' }
    ]
  },
  { label: 'Work', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// --- Services Data (9 Pages) ---
export const SERVICES: ServiceData[] = [
  {
    id: 'web-dev',
    slug: 'web-development',
    title: 'Custom Web Development',
    icon: 'Globe',
    shortDescription: 'Scalable, high-performance web applications built for growth.',
    fullDescription: 'We don’t just write code; we architect digital ecosystems. Our web development services are rooted in a mobile-first, performance-obsessed philosophy. From PWAs to complex SaaS platforms, we build the walls that scale with your ambition.',
    problem: 'Off-the-shelf solutions limit growth, while poorly architected custom sites suffer from slow load times and security vulnerabilities.',
    solution: 'We build bespoke React and Node.js applications using microservices architecture, ensuring your platform is fast, secure, and ready for millions of users.',
    process: [
      { step: 1, title: 'Discovery', desc: 'We dive deep into your business logic.' },
      { step: 2, title: 'Architecture', desc: 'Blueprinting the system for scalability.' },
      { step: 3, title: 'Development', desc: 'Agile sprints with bi-weekly deliverables.' },
      { step: 4, title: 'Launch & Scale', desc: 'CI/CD pipelines and monitoring setup.' }
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    benefits: ['99.9% Uptime SLA', '<1s Load Times', 'SEO Optimized Core'],
    relatedServices: ['mobile-apps', 'ui-ux', 'cloud'],
    meta: {
      title: 'Custom Web Development Services | Big Wall Solutions',
      description: 'Enterprise-grade web development services. We build scalable React & Node.js applications tailored to your business needs.',
      keywords: ['web development', 'react agency', 'enterprise software', 'custom web apps'],
      type: 'service'
    }
  },
  {
    id: 'mobile-apps',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    icon: 'Smartphone',
    shortDescription: 'Native and cross-platform apps that users love to touch.',
    fullDescription: 'We build apps that people can\'t put down. From fintech to healthcare, our apps have generated over $50M in revenue for our clients. We deliver native performance with the flexibility of React Native, ensuring your app feels at home on both iOS and Android while sharing a single robust codebase.',
    problem: 'Most apps fail because they\'re built for the business, not the user. Poor UX, slow performance, and lack of scalability kill great ideas.',
    solution: 'We leverage React Native and Expo to deliver pixel-perfect, native-feeling experiences with 90% code sharing, cutting time-to-market in half. We start with user research, build with cutting-edge tech, and iterate based on real data.',
    process: [
      { step: 1, title: 'Discovery & Strategy', desc: 'Deep dive into your business, users, and competition.' },
      { step: 2, title: 'UX/UI Design', desc: 'Wireframes, prototypes, and pixel-perfect designs.' },
      { step: 3, title: 'Development', desc: 'Agile sprints with transparent progress tracking.' },
      { step: 4, title: 'Launch & Scale', desc: 'App store optimization and post-launch support.' }
    ],
    techStack: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase', 'AWS'],
    benefits: ['10M+ Downloads Generated', '4.9 App Store Rating Avg', '100+ Apps Launched'],
    stats: [
        { label: 'App Store Rating', value: '4.9' },
        { label: 'Apps Launched', value: '100+' },
        { label: 'Downloads', value: '10M+' }
    ],
    faq: [
      { question: 'How long does it take to develop a mobile app?', answer: 'Typically 3-6 months depending on complexity. We provide detailed timelines during discovery.' },
      { question: 'Do you build for both iOS and Android?', answer: 'Yes, we specialize in cross-platform development using React Native which allows us to deploy to both platforms from a single codebase, as well as native development.' },
      { question: 'Will I own the code?', answer: 'Absolutely. Once the project is paid in full, you own 100% of the IP and source code.' }
    ],
    relatedServices: ['ui-ux', 'qa-testing', 'maintenance'], // slugs or ids
    meta: {
      title: 'Mobile App Development Services | iOS & Android | Big Wall Solutions',
      description: 'Expert mobile app development for iOS and Android. From concept to launch, we build high-performance apps that users love. Get your free consultation.',
      keywords: ['mobile app development', 'iOS app development', 'Android app development', 'custom mobile apps', 'app development company'],
      type: 'service'
    }
  },
  {
      id: 'ui-ux',
      slug: 'ui-ux',
      title: 'UI/UX Design',
      icon: 'PenTool',
      shortDescription: 'Human-centric design that converts visitors into believers.',
      fullDescription: 'Design is not just how it looks; it is how it works. Our design team blends psychology, data, and art to create interfaces that are intuitive, accessible, and delight users at every touchpoint.',
      problem: 'Complex products often confuse users, leading to high churn rates and low adoption.',
      solution: 'We employ a user-centered design process, utilizing extensive user testing and iterative prototyping to ensure usability is baked in from day one.',
      process: [
        { step: 1, title: 'Research', desc: 'User personas and competitive analysis.' },
        { step: 2, title: 'Wireframing', desc: 'Low-fidelity structural layouts.' },
        { step: 3, title: 'Visual Design', desc: 'High-fidelity UI with design systems.' },
        { step: 4, title: 'Testing', desc: 'Usability testing and refinement.' }
      ],
      techStack: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
      benefits: ['Increased Conversion', 'Brand Consistency', 'Accessibility Compliant'],
      relatedServices: ['web-dev', 'mobile-apps'],
      meta: {
        title: 'UI/UX Design Agency | User Centric Interfaces | Big Wall Solutions',
        description: 'World-class UI/UX design services. We create beautiful, functional digital products that users love.',
        keywords: ['ui design', 'ux research', 'product design', 'web design'],
        type: 'service'
      }
  },
  {
      id: 'ai-ml',
      slug: 'ai-ml',
      title: 'AI & Machine Learning',
      icon: 'Cpu',
      shortDescription: 'Intelligent systems that learn and adapt to your data.',
      fullDescription: 'Unlocking the power of data through predictive modeling and generative AI integration. We help businesses automate complex tasks and gain deeper insights.',
      problem: 'Data is abundant but often underutilized due to lack of processing intelligence.',
      solution: 'We integrate LLMs and custom ML models to automate workflows, provide chatbots, and analyze massive datasets in real-time.',
      process: [
        { step: 1, title: 'Data Audit', desc: 'Assessing data quality and availability.' },
        { step: 2, title: 'Model Selection', desc: 'Choosing the right algorithms.' },
        { step: 3, title: 'Training', desc: 'Fine-tuning models on your data.' },
        { step: 4, title: 'Integration', desc: 'Deploying via API to your apps.' }
      ],
      techStack: ['Python', 'TensorFlow', 'OpenAI API', 'Gemini API'],
      benefits: ['Automation', 'Predictive Insights', 'Personalization'],
      relatedServices: ['web-dev', 'cloud'],
      meta: {
        title: 'AI & Machine Learning Solutions | Big Wall Solutions',
        description: 'Integrate AI into your business. From chatbots to predictive analytics, we build smart software.',
        keywords: ['ai development', 'machine learning', 'nlp', 'data science'],
        type: 'service'
      }
  },
  {
      id: 'cloud',
      slug: 'cloud',
      title: 'Cloud Architecture',
      icon: 'Cloud',
      shortDescription: 'Secure, scalable cloud infrastructure on AWS and Google Cloud.',
      fullDescription: 'We design and deploy robust cloud environments that scale automatically with your traffic.',
      problem: 'Legacy servers crash under load and are expensive to maintain.',
      solution: 'We migrate you to a serverless or containerized architecture using Kubernetes for maximum efficiency.',
      process: [
          { step: 1, title: 'Audit', desc: 'Review current infrastructure.' },
          { step: 2, title: 'Plan', desc: 'Architect cloud roadmap.' },
          { step: 3, title: 'Migrate', desc: 'Move data with zero downtime.' },
          { step: 4, title: 'Optimize', desc: 'Cost and performance tuning.' }
      ],
      techStack: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes'],
      benefits: ['Auto-scaling', 'Cost Reduction', 'Global CDN'],
      meta: { title: 'Cloud Architecture Services', description: 'Cloud migration and DevOps services.', keywords: ['aws', 'google cloud', 'devops'], type: 'service' }
  },
  {
      id: 'enterprise',
      slug: 'enterprise',
      title: 'Enterprise Software',
      icon: 'Briefcase',
      shortDescription: 'Custom ERP and CRM solutions for large organizations.',
      fullDescription: 'Streamline operations with bespoke software tailored to your specific workflows.',
      problem: 'Generic software does not fit unique enterprise processes.',
      solution: 'We build custom portals that integrate seamlessly with your existing legacy systems.',
      process: [
          { step: 1, title: 'Analysis', desc: 'Workflow mapping.' },
          { step: 2, title: 'Design', desc: 'System architecture.' },
          { step: 3, title: 'Build', desc: 'Secure development.' },
          { step: 4, title: 'Train', desc: 'Employee onboarding.' }
      ],
      techStack: ['Java', 'Spring Boot', '.NET', 'Angular'],
      benefits: ['Process Efficiency', 'Data Security', 'Integration'],
      meta: { title: 'Enterprise Software Development', description: 'Custom ERP & CRM solutions.', keywords: ['enterprise software', 'erp', 'crm'], type: 'service' }
  },
  {
      id: 'devops',
      slug: 'devops',
      title: 'DevOps & Security',
      icon: 'Shield',
      shortDescription: 'Automated pipelines and ironclad security protocols.',
      fullDescription: 'Accelerate deployment cycles while maintaining the highest security standards.',
      problem: 'Slow release cycles and security vulnerabilities.',
      solution: 'We implement CI/CD pipelines and automated security testing.',
      process: [
          { step: 1, title: 'Assess', desc: 'Security audit.' },
          { step: 2, title: 'Automate', desc: 'CI/CD setup.' },
          { step: 3, title: 'Secure', desc: 'Penetration testing.' },
          { step: 4, title: 'Monitor', desc: '24/7 logging.' }
      ],
      techStack: ['Jenkins', 'GitLab CI', 'Terraform', 'Sonarqube'],
      benefits: ['Faster Releases', 'Security Compliance', 'Reliability'],
      meta: { title: 'DevOps Services', description: 'CI/CD and security automation.', keywords: ['devops', 'security', 'ci/cd'], type: 'service' }
  },
  {
      id: 'blockchain',
      slug: 'blockchain',
      title: 'Blockchain Solutions',
      icon: 'Link',
      shortDescription: 'Smart contracts and decentralized applications (dApps).',
      fullDescription: 'Leverage the transparency and security of blockchain for your business.',
      problem: 'Lack of transparency and trust in digital transactions.',
      solution: 'We develop secure smart contracts and blockchain-based ledgers.',
      process: [
          { step: 1, title: 'Ideate', desc: 'Use case validation.' },
          { step: 2, title: 'Architect', desc: 'Chain selection.' },
          { step: 3, title: 'Code', desc: 'Smart contract dev.' },
          { step: 4, title: 'Audit', desc: 'Security verification.' }
      ],
      techStack: ['Solidity', 'Ethereum', 'Web3.js', 'Polygon'],
      benefits: ['Transparency', 'Immutability', 'Automation'],
      meta: { title: 'Blockchain Development', description: 'Smart contracts and dApps.', keywords: ['blockchain', 'web3', 'smart contracts'], type: 'service' }
  },
  {
      id: 'modernization',
      slug: 'modernization',
      title: 'Legacy Modernization',
      icon: 'RefreshCw',
      shortDescription: 'Transforming outdated systems into modern powerhouses.',
      fullDescription: 'Don’t let old tech hold you back. We refactor and rebuild legacy apps.',
      problem: 'Old systems are slow, insecure, and hard to maintain.',
      solution: 'We incrementally rewrite legacy codebases to modern stacks.',
      process: [
          { step: 1, title: 'Review', desc: 'Codebase analysis.' },
          { step: 2, title: 'Strategy', desc: 'Strangler fig pattern.' },
          { step: 3, title: 'Refactor', desc: 'Incremental updates.' },
          { step: 4, title: 'Switch', desc: 'Full migration.' }
      ],
      techStack: ['React', 'Node.js', 'Cloud', 'Microservices'],
      benefits: ['Performance', 'Maintainability', 'Scalability'],
      meta: { title: 'Legacy Modernization', description: 'Update old software to modern tech.', keywords: ['legacy code', 'refactoring', 'modernization'], type: 'service' }
  }
];

// --- Industries Data ---
export const INDUSTRIES: IndustryData[] = [
  {
    id: 'fintech',
    slug: 'fintech',
    title: 'FinTech',
    icon: 'Landmark',
    color: '#ffd700', // Gold
    shortDescription: 'Secure banking portals, trading platforms, and payment gateways.',
    fullDescription: 'In the fast-paced world of finance, milliseconds matter. We build high-frequency trading platforms, secure digital wallets, and blockchain-enabled payment gateways that are as robust as they are fast.',
    stats: [
      { label: 'Security Compliance', value: '100%' },
      { label: 'Transaction Speed', value: '<50ms' }
    ],
    challenges: [
      { title: 'Security Risks', desc: 'Constant threat of cyberattacks and fraud.' },
      { title: 'Regulatory Compliance', desc: 'Navigating complex HIPAA, GDPR, and PCI-DSS rules.' },
      { title: 'Legacy Systems', desc: 'Outdated mainframes slowing down innovation.' }
    ],
    solutions: [
      { title: 'Bank-Grade Encryption', desc: 'End-to-end encryption for all data at rest and in transit.' },
      { title: 'AI Fraud Detection', desc: 'Real-time machine learning models to detect anomalies.' },
      { title: 'Modern APIs', desc: 'Microservices architecture to connect with legacy banks.' }
    ],
    meta: {
      title: 'FinTech Software Development | Big Wall Solutions',
      description: 'Secure and scalable fintech solutions. We build trading platforms, wallets, and banking apps.',
      keywords: ['fintech development', 'banking software', 'blockchain', 'trading platforms'],
      type: 'service'
    }
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    title: 'Healthcare',
    icon: 'HeartPulse',
    color: '#00ff66', // Green
    shortDescription: 'HIPAA-compliant telehealth apps and patient management systems.',
    fullDescription: 'Digital health is saving lives. We engineer telemedicine platforms, EHR integrations, and IoT wearable apps that connect patients with providers instantly and securely.',
    stats: [
      { label: 'HIPAA Compliant', value: 'Yes' },
      { label: 'Uptime', value: '99.99%' }
    ],
    challenges: [
      { title: 'Data Privacy', desc: 'Protecting sensitive patient records.' },
      { title: 'Interoperability', desc: 'Connecting disjointed hospital systems.' },
      { title: 'User Experience', desc: 'Making complex medical data accessible to patients.' }
    ],
    solutions: [
      { title: 'Secure Cloud Infrastructure', desc: 'HIPAA-compliant AWS/Google Cloud architecture.' },
      { title: 'HL7 & FHIR Integration', desc: 'Standardized data exchange between systems.' },
      { title: 'Accessible UI Design', desc: 'Interfaces designed for all ages and abilities.' }
    ],
    meta: {
      title: 'Healthcare Software Development | Big Wall Solutions',
      description: 'Custom healthcare software development. Telehealth, EHR, and medical apps.',
      keywords: ['healthcare software', 'telehealth app', 'medical app development'],
      type: 'service'
    }
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: 'E-Commerce',
    icon: 'ShoppingCart',
    color: '#ff0099', // Pink
    shortDescription: 'High-conversion storefronts and inventory management tools.',
    fullDescription: 'We transform visitors into customers. Our e-commerce solutions range from headless Shopify builds to custom marketplaces handling thousands of transactions per minute.',
    stats: [
      { label: 'Conversion Uplift', value: '+45%' },
      { label: 'Page Speed', value: '98/100' }
    ],
    challenges: [
      { title: 'Cart Abandonment', desc: 'High friction during checkout.' },
      { title: 'Mobile Performance', desc: 'Slow loading times on mobile devices.' },
      { title: 'Inventory Sync', desc: 'Overselling due to lack of real-time data.' }
    ],
    solutions: [
      { title: 'Headless Architecture', desc: 'Decoupled frontend for lightning speed.' },
      { title: 'One-Click Checkout', desc: 'Streamlined payment flows.' },
      { title: 'Real-Time Sync', desc: 'Websockets for instant inventory updates.' }
    ],
    meta: {
      title: 'E-Commerce Development Services | Big Wall Solutions',
      description: 'Build high-converting online stores. Headless commerce and custom marketplaces.',
      keywords: ['ecommerce development', 'headless shopify', 'online store'],
      type: 'service'
    }
  },
  {
    id: 'logistics',
    slug: 'logistics',
    title: 'Logistics',
    icon: 'Truck',
    color: '#ff9900', // Orange
    shortDescription: 'Real-time tracking, fleet management, and supply chain optimization.',
    fullDescription: 'Efficiency is the currency of logistics. We build fleet management dashboards, last-mile delivery apps, and AI-powered route optimization tools.',
    stats: [
      { label: 'Fuel Saved', value: '20%' },
      { label: 'Delivery Speed', value: '+30%' }
    ],
    challenges: [
      { title: 'Route Inefficiency', desc: 'Wasted fuel and time on bad routes.' },
      { title: 'Lack of Visibility', desc: 'Customers not knowing where packages are.' },
      { title: 'Paperwork', desc: 'Manual processes slowing down operations.' }
    ],
    solutions: [
      { title: 'AI Route Optimization', desc: 'Algorithms to find the fastest path.' },
      { title: 'IoT Tracking', desc: 'Real-time sensors on all assets.' },
      { title: 'Digital Proof of Delivery', desc: 'Mobile apps for drivers.' }
    ],
    meta: {
      title: 'Logistics Software Solutions | Big Wall Solutions',
      description: 'Fleet management and supply chain software. Optimize your logistics operations.',
      keywords: ['logistics software', 'fleet management', 'supply chain'],
      type: 'service'
    }
  },
  {
    id: 'media',
    slug: 'media',
    title: 'Media & Entertainment',
    icon: 'MonitorPlay',
    color: '#bd00ff', // Purple
    shortDescription: 'Streaming platforms and content management systems.',
    fullDescription: 'Content is king, but delivery is queen. We architect scalable video streaming platforms and interactive media apps that engage millions.',
    stats: [
      { label: 'Concurrent Users', value: '1M+' },
      { label: 'Latency', value: 'Low' }
    ],
    challenges: [
      { title: 'Buffering', desc: 'Poor video quality on slow connections.' },
      { title: 'Scalability', desc: 'Traffic spikes during live events.' },
      { title: 'Monetization', desc: 'Integrating ads and paywalls smoothly.' }
    ],
    solutions: [
      { title: 'Adaptive Bitrate Streaming', desc: 'Smooth playback on any device.' },
      { title: 'Serverless Edge', desc: 'Global CDN for low latency.' },
      { title: 'Dynamic Ad Insertion', desc: 'Personalized ads without interrupting flow.' }
    ],
    meta: {
      title: 'Media & Streaming App Development | Big Wall Solutions',
      description: 'Build your own streaming platform (OTT). Scalable video and media solutions.',
      keywords: ['streaming app', 'video platform', 'ott development'],
      type: 'service'
    }
  },
  {
    id: 'education',
    slug: 'education',
    title: 'EdTech',
    icon: 'GraduationCap',
    color: '#00ccff', // Cyan
    shortDescription: 'Learning management systems (LMS) and virtual classrooms.',
    fullDescription: 'Education is evolving. We build immersive LMS platforms, gamified learning apps, and virtual classrooms that make learning accessible and engaging.',
    stats: [
      { label: 'Student Engagement', value: '+50%' },
      { label: 'Accessibility', value: 'WCAG 2.1' }
    ],
    challenges: [
      { title: 'Student Engagement', desc: 'Boring content leading to dropouts.' },
      { title: 'Remote Access', desc: 'Need for stable virtual classrooms.' },
      { title: 'Assessment', desc: 'Preventing cheating in online exams.' }
    ],
    solutions: [
      { title: 'Gamification', desc: 'Badges, leaderboards, and rewards.' },
      { title: 'WebRTC Video', desc: 'Stable, high-quality video classrooms.' },
      { title: 'AI Proctoring', desc: 'Smart algorithms to monitor exams.' }
    ],
    meta: {
      title: 'EdTech Software Development | Big Wall Solutions',
      description: 'Custom LMS and learning apps. Transform education with digital tools.',
      keywords: ['edtech', 'lms development', 'e-learning app'],
      type: 'service'
    }
  },
  {
    id: 'real-estate',
    slug: 'real-estate',
    title: 'Real Estate',
    icon: 'Building',
    color: '#ff3333', // Red
    shortDescription: 'Property listings, virtual tours, and CRM integration.',
    fullDescription: 'We help agencies sell faster. From 3D virtual tours to automated CRM flows for agents, our prop-tech solutions modernize the real estate experience.',
    stats: [
      { label: 'Sales Velocity', value: '+25%' },
      { label: 'Lead Capture', value: 'Automated' }
    ],
    challenges: [
      { title: 'Visualization', desc: 'Buyers cannot visit properties in person.' },
      { title: 'Lead Management', desc: 'Agents losing track of potential buyers.' },
      { title: 'Paperwork', desc: 'Slow contract processes.' }
    ],
    solutions: [
      { title: 'VR/AR Tours', desc: 'Immersive 3D property walkthroughs.' },
      { title: 'CRM Integration', desc: 'Auto-sync leads from portal to CRM.' },
      { title: 'Digital Signatures', desc: 'Secure, legally binding e-signatures.' }
    ],
    meta: {
      title: 'PropTech & Real Estate Software | Big Wall Solutions',
      description: 'Real estate apps and portals. Virtual tours and CRM solutions for agencies.',
      keywords: ['proptech', 'real estate app', 'property management software'],
      type: 'service'
    }
  }
];

// --- Case Studies ---
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'expo-city',
    slug: 'expo-city-eats',
    client: 'Expo City Dubai',
    title: 'Expo City Eats',
    category: 'FoodTech',
    image: IMAGES.caseStudy1,
    stats: [
      { label: 'Orders/Day', value: '15k+' },
      { label: 'App Rating', value: '4.9' },
    ],
    summary: 'A seamless dining companion app for millions of visitors at the world expo.',
    meta: {
      title: 'Case Study: Expo City Eats | Big Wall Solutions',
      description: 'Building a high-scale food ordering app for Expo City Dubai.',
      keywords: ['foodtech', 'mobile app', 'dubai expo'],
      type: 'article'
    }
  },
  {
    id: 'fintech-app',
    slug: 'fintech-dashboard-revamp',
    client: 'VaultFlow',
    title: 'Next-Gen Fintech App',
    category: 'FinTech',
    image: IMAGES.caseStudy2,
    stats: [
      { label: 'Speed Increase', value: '300%' },
      { label: 'Transactions', value: '$2B+' },
    ],
    summary: 'Transforming a legacy banking portal into a sleek, React-based financial super-app.',
    meta: {
      title: 'Case Study: VaultFlow Fintech Revamp | Big Wall Solutions',
      description: 'See how we helped VaultFlow increase transaction speed by 300%.',
      keywords: ['fintech case study', 'banking software', 'legacy modernization'],
      type: 'article'
    }
  },
  {
    id: 'healthcare-platform',
    slug: 'telehealth-platform',
    client: 'MediConnect',
    title: 'Telehealth Platform',
    category: 'Healthcare',
    image: IMAGES.caseStudy3,
    stats: [
      { label: 'Active Users', value: '50k+' },
      { label: 'Uptime', value: '99.99%' },
    ],
    summary: 'HIPAA-compliant secure bridge between patients and doctors with real-time video.',
    meta: {
      title: 'Case Study: MediConnect Telehealth | Big Wall Solutions',
      description: 'Developing a secure, HIPAA-compliant telehealth solution for remote patient care.',
      keywords: ['healthcare app', 'telehealth development', 'hipaa compliant'],
      type: 'article'
    }
  }
];

// --- Testimonials ---
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'CTO',
    company: 'Expo City Dubai',
    quote: 'Big Wall Solutions didn’t just build an app; they engineered an experience that handled millions of users flawlessly.',
    image: IMAGES.testimonial1
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Founder',
    company: 'VaultFlow',
    quote: 'The technical expertise this team brings is unmatched. They transformed our clunky legacy system into a market leader.',
    image: IMAGES.testimonial2
  },
  {
    id: 't3',
    name: 'Dr. Emily Al-Fayed',
    role: 'Director',
    company: 'MediConnect',
    quote: 'Security was our top priority. Big Wall delivered a fortress that is also incredibly user-friendly.',
    image: IMAGES.testimonial3
  }
];

// --- Blog Posts ---
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of Mobile Architecture: React Native vs Native',
    excerpt: 'Why hybrid development is taking over the enterprise world.',
    date: 'Oct 12, 2024',
    category: 'Engineering',
    slug: 'react-native-vs-native',
    image: IMAGES.blog1
  },
  {
    id: 'b2',
    title: 'Scaling Node.js to 10 Million Users',
    excerpt: 'Lessons learned from architecting high-load systems.',
    date: 'Sep 28, 2024',
    category: 'Backend',
    slug: 'scaling-nodejs',
    image: IMAGES.blog2
  },
  {
    id: 'b3',
    title: 'AI Integration in 2025: Beyond the Hype',
    excerpt: 'Practical applications of LLMs in business software today.',
    date: 'Sep 15, 2024',
    category: 'AI / ML',
    slug: 'ai-integration-2025',
    image: IMAGES.blog3
  }
];

export const TEAM: TeamMember[] = [
  {
    name: "Alex Rivera",
    role: "Chief Architect",
    bio: "Ex-Google engineer with a passion for scalable systems and mountain climbing.",
    image: IMAGES.team1
  },
  {
    name: "Sarah Chen",
    role: "Head of Design",
    bio: "Believes that every pixel serves a purpose. 10 years crafting award-winning interfaces.",
    image: IMAGES.team2
  },
  {
    name: "James Okon",
    role: "Lead Strategist",
    bio: "Turning business goals into technical reality. Coffee connoisseur.",
    image: IMAGES.team3
  }
];