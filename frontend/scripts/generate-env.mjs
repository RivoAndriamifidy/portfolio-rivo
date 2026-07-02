import { writeFileSync } from 'node:fs';

const apiUrl =
  process.env.API_URL ?? 'https://api.rivoandry.site/api';

const content = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
};
`;

writeFileSync('src/environments/environment.production.ts', content);
console.log(`Environment generated with API_URL=${apiUrl}`);