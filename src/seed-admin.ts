/**
 * One-time seed script: npm run seed:admin
 * Creates the admin user in the database.
 * Usage: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret npm run seed:admin
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config();

const ds = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: true,
});

async function main() {
  await ds.initialize();
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD env vars');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  await ds.query(
    `INSERT INTO admin_users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = $2`,
    [email, hash],
  );
  console.log(`Admin user "${email}" seeded successfully.`);
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
