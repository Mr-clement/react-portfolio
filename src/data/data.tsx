import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import TwitterIcon from '../components/Icon/TwitterIcon';
import heroImage from '../images/profil.png';
import porfolioImage1 from '../images/portfolio/portfolio-1.jpg';
import porfolioImage2 from '../images/portfolio/portfolio-2.jpg';
import porfolioImage3 from '../images/portfolio/portfolio-3.jpg';
import porfolioImage4 from '../images/portfolio/portfolio-4.jpg';
import porfolioImage5 from '../images/portfolio/portfolio-5.jpg';
import porfolioImage6 from '../images/portfolio/portfolio-6.jpg';
import porfolioImage7 from '../images/portfolio/portfolio-7.jpg';
import porfolioImage8 from '../images/portfolio/portfolio-8.jpg';
import porfolioImage9 from '../images/portfolio/portfolio-9.jpg';
import porfolioImage10 from '../images/portfolio/portfolio-10.jpg';
import porfolioImage11 from '../images/portfolio/portfolio-11.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Clément AMLAGAN',
  description: "Portfolio professionnel de Clément Amlagan, développeur web et mobile full stack.",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: 'Clement AMLAGAN',
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Développeur web et mobile full stack basé à Lomé, Togo, spécialisé dans la création d'applications modernes et
        responsives avec <strong className="text-stone-100">React</strong>, <strong className="text-stone-100">React Native</strong>,
        <strong className="text-stone-100">Node.js</strong> et <strong className="text-stone-100">Django</strong>.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Je conçois des interfaces performantes, je résous des problèmes techniques complexes et j'aime proposer des
        expériences numériques claires et efficaces.
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/resume.pdf',
      text: 'Télécharger le CV',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: heroImage,
  description: `Développeur web passionné par la création d'applications modernes et responsives. Compétences en frontend
  et backend avec React, React Native, Node.js et Django. Capable de travailler en équipe, résoudre des problèmes
  techniques et développer des interfaces performantes.`,
  aboutItems: [
    {label: 'Localisation', text: 'Lomé, Togo', Icon: MapIcon},
    {label: 'Téléphone', text: '+228 99403839', Icon: CalendarIcon},
    {label: 'Email', text: 'amlaganclement@gmail.com', Icon: FlagIcon},
    {label: 'LinkedIn', text: 'clement-amlagan-20231234a', Icon: SparklesIcon},
    {label: 'GitHub', text: 'github.com/MrCLET', Icon: AcademicCapIcon},
    {label: 'Disponibilité', text: 'Télétravail possible', Icon: BuildingOffice2Icon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Langues',
    skills: [
      {
        name: 'Français',
        level: 10,
      },
      {
        name: 'Anglais',
        level: 7,
      },
      {
        name: 'Ewe',
        level: 8,
      },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      {
        name: 'React',
        level: 10,
      },
      {
        name: 'React Native',
        level: 8,
      },
      {
        name: 'Tailwind CSS',
        level: 8,
      },
    ],
  },
  {
    name: 'Backend',
    skills: [
      {
        name: 'Node.js',
        level: 9,
      },
      {
        name: 'Express.js',
        level: 8,
      },
      {
        name: 'Django',
        level: 4,
      },
    ],
  },
  {
    name: 'Bases de données',
    skills: [
      {
        name: 'MongoDB',
        level: 8,
      },
      {
        name: 'MySQL',
        level: 7,
      },
      {
        name: 'APIs REST',
        level: 8,
      },
    ],
  },
  {
    name: 'Outils',
    skills: [
      {
        name: 'Git / GitHub',
        level: 9,
      },
      {
        name: 'Vercel',
        level: 8,
      },
      {
        name: 'Postman',
        level: 7,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Applications Web & Mobiles',
    description: 'Développement de projets web et mobiles modernes avec React, React Native, Node.js et MongoDB.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage1,
  },
  {
    title: 'Blog Full Stack',
    description: 'Blog dynamique avec authentification, commentaires et gestion des utilisateurs.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage2,
  },
  {
    title: 'Application de Restauration',
    description: 'Solution Django pour la gestion des menus, commandes et interface administrateur.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage3,
  },
  {
    title: 'Dashboard Administratif',
    description: 'Interface d’administration responsive avec statistiques et gestion de contenu.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage4,
  },
  {
    title: 'Site Vitrine',
    description: 'Site de présentation responsive développé avec React, HTML5 et CSS3.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage5,
  },
  {
    title: 'API REST Node.js',
    description: 'API backend sécurisée avec Node.js, Express et gestion de base MongoDB.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage6,
  },
  {
    title: 'Prototype E-commerce',
    description: 'Prototype de boutique en ligne avec catalogue, panier et paiements simulés.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage7,
  },
  {
    title: 'Application Mobile',
    description: 'Prototype natif multiplateforme avec React Native pour Android et iOS.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage8,
  },
  {
    title: 'Micro-service Django',
    description: 'Service Python/Django dédié à la gestion des données et des APIs REST.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage9,
  },
  {
    title: 'Optimisation des Performances',
    description: 'Amélioration de la vitesse et de l’expérience utilisateur pour des interfaces fluides.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage10,
  },
  {
    title: 'Déploiement & CI/CD',
    description: 'Configuration de déploiement et automatisation avec Vercel et Postman.',
    url: 'https://github.com/MrCLET',
    image: porfolioImage11,
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: '2026',
    location: 'Formation Développement Web et Mobile',
    title: 'React, React Native, Node.js, Full Stack',
    content: <p>Formation intensive dédiée au développement d'applications web et mobiles, du frontend au backend.</p>,
  },
  {
    date: '2022 – 2023',
    location: 'Institut Polytechnique DEFITECH',
    title: 'Formation Développement d’Applications (DA)',
    content: <p>Programme spécialisé en conception d’applications, architecture logicielle et technologies web modernes.</p>,
  },
  {
    date: '2023 – 2024',
    location: 'Udemy',
    title: 'Bootcamp Full Stack',
    content: <p>Apprentissage approfondi de HTML, CSS, JavaScript, Node.js et React pour des projets complets.</p>,
  },
  {
    date: '2025',
    location: 'Udemy',
    title: 'Bootcamp Développeur Python',
    content: <p>Formation Python avancée, scripting, automatisation et création d’APIs REST.</p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: '2026 – Aujourd’hui',
    location: 'NUMERUM DEV CENTER — Lomé, Togo',
    title: 'Développeur Web Full Stack',
    content: (
      <p>
        Développement et maintenance d'applications web robustes. Conception d'interfaces modernes et responsives,
        intégration frontend avec React et JavaScript, et collaboration backend pour optimiser les échanges API.
      </p>
    ),
  },
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'Client satisfait',
      text: 'Clément a livré une application réactive et performante, avec une excellente maîtrise du backend et une interface fluide.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg',
    },
    {
      name: 'Responsable produit',
      text: 'Travail professionnel, respect des délais et excellente capacité à résoudre les problèmes techniques.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/14.jpg',
    },
    {
      name: 'Collègue',
      text: 'Clément s’adapte rapidement, partage ses connaissances avec l’équipe et construit des solutions robustes.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Contactez-moi',
  description: 'Disponible pour des missions à distance. N’hésitez pas à me contacter pour des projets web ou mobiles.',
  items: [
    {
      type: ContactType.Email,
      text: 'amlaganclement@gmail.com',
      href: 'mailto:amlaganclement@gmail.com',
    },
    {
      type: ContactType.Phone,
      text: '+228 99403839',
      href: 'tel:+22899403839',
    },
    {
      type: ContactType.Location,
      text: 'Lomé, Togo',
      href: 'https://www.google.com/maps/search/Lom%C3%A9+Togo',
    },
    {
      type: ContactType.LinkedIn,
      text: 'clement-amlagan-20231234a',
      href: 'https://www.linkedin.com/in/clement-amlagan-20231234a',
    },
    {
      type: ContactType.Github,
      text: 'github.com/MrCLET',
      href: 'https://github.com/MrCLET',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/MrCLET'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/clement-amlagan-20231234a'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/MrCLET'},
  {label: 'Twitter', Icon: TwitterIcon, href: 'https://twitter.com/MrCLET'},
];
