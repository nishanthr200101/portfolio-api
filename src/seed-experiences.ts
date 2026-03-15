/**
 * Seed/upsert script: npm run seed:experiences
 * Clears and repopulates the experiences table from resume data.
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const ds = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: true,
});

const experiences = [
  {
    title: 'Product Engineer',
    company_name: 'Amphisoft Technologies',
    icon_key: 'amphisoft',
    icon_bg: '#383E56',
    date: 'Nov 2021 – Jun 2022',
    sort_order: 1,
    points: [
      'Built and maintained 2 college websites, focusing on responsive design and user engagement.',
      'Developed 3+ interactive mini-games for a children\'s application using Three.js, delivering an engaging and immersive user experience.',
      'Collaborated with cross-functional teams to meet project deadlines and deliver high-quality products.',
    ],
  },
  {
    title: 'Software Development Engineer',
    company_name: 'HRlytics',
    icon_key: 'hrlytics',
    icon_bg: '#E6DEDD',
    date: 'Jun 2022 – Sept 2024',
    sort_order: 2,
    points: [
      'Developed and maintained 4 frontend modules using React.js, collaborating closely with Django backend and testing teams.',
      'Improved application performance by integrating CDN, reducing load times and enhancing scalability for high-traffic usage.',
      'Architected scalable state management using Redux Toolkit and Context API, improving maintainability across large codebases.',
      'Collaborated closely with backend and testing teams to ensure seamless integration and accurate implementation of features.',
      'Mentored 5 junior developers, guiding them through modern frontend technologies and best practices.',
    ],
  },
  {
    title: 'Full-Stack Developer',
    company_name: 'SD Innovations',
    icon_key: 'studio_diseno',
    icon_bg: '#1e3a5f',
    date: 'Sept 2024 – Oct 2025',
    sort_order: 3,
    points: [
      'Designed and developed scalable full-stack SaaS applications using React.js, Nest.js, and PostgreSQL following microservices architecture and REST API best practices.',
      'Architected scalable state management using Redux Toolkit and Context API; set up GitHub Actions CI/CD pipelines reducing deployment time.',
      'Optimized frontend performance through code splitting and lazy loading, improving load times by 30%.',
      'Engineered a reusable authentication and authorization microservice using JWT and OAuth 2.0, deployed behind an API Gateway to secure multiple client applications.',
      'Developed a standalone email and notification microservice integrated via an API Gateway, handling transactional emails and real-time notifications across multiple client projects.',
      'Built a DOCX to HTML conversion engine with support for content tagging and validation checking, enabling structured document processing for client SaaS platforms.',
    ],
  },
  {
    title: 'Team Lead',
    company_name: 'SD Innovations',
    icon_key: 'studio_diseno',
    icon_bg: '#1e3a5f',
    date: 'Nov 2025 – Present',
    sort_order: 4,
    points: [
      'Led development of 3+ SaaS platforms using React.js, Next.js, and Node.js, serving 10,000+ users with scalable cloud infrastructure deployed on AWS.',
      'Reduced cloud service costs by 25% by optimizing Cache API middleware to mask endpoints, manage user sessions, and minimize server calls.',
      'Implemented Next.js SSR, lazy loading, and SEO optimizations, boosting application performance by 40%.',
      'Led a team of 5+ developers, conducting code reviews, defining technical standards, and improving team productivity via streamlined workflows.',
      'Architected scalable microservice-based backend services deployed using Docker containers on AWS EC2 with Nginx reverse proxy and CI/CD pipelines via GitHub Actions.',
      'Engineered a multi-tenant workflow engine using Fastify and Node.js with a PostgreSQL schema-per-tenant architecture, supporting white-label configuration for client-specific branding.',
      'Architected and delivered a Micro Frontend platform with 42 independent modules integrated using Single SPA, deployed via Azure Pipelines and provisioned with Terraform.',
      'Leveraged AI tools (Claude Code, GitHub Copilot, Cursor) to accelerate development workflows, improve code quality, and boost team productivity across SaaS projects.',
    ],
  },
];

async function main() {
  await ds.initialize();

  // Clear existing and re-insert with latest data
  await ds.query('TRUNCATE TABLE experiences RESTART IDENTITY');

  for (const exp of experiences) {
    await ds.query(
      `INSERT INTO experiences (title, company_name, icon_key, icon_bg, date, points, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        exp.title,
        exp.company_name,
        exp.icon_key,
        exp.icon_bg,
        exp.date,
        JSON.stringify(exp.points),
        exp.sort_order,
      ],
    );
  }
  console.log('Experiences seeded with resume data — 4 entries!');
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
