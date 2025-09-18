import { GenericContainer, Network } from 'testcontainers';
import * as path from 'path';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

export async function setupDatabaseSnapshot() {
  // Create a shared network for the containers
  const network = await new Network().start();

  const pgContainer = await new PostgreSqlContainer('postgres:16-alpine')
    .withDatabase('users')
    .withNetwork(network)
    .withNetworkAliases('postgres')
    .start();

  const connectionConfig = {
    host: pgContainer.getHost(),
    port: pgContainer.getPort(),
    user: pgContainer.getUsername(),
    password: pgContainer.getPassword(),
    database: pgContainer.getDatabase(),
  };

  const migrationsDir = path.resolve(process.cwd(), 'migrations');
  const flywayContainer = await new GenericContainer('flyway/flyway')
    .withNetwork(network)
    .withCommand([
      '-locations=filesystem:/flyway/sql',
      `-url=jdbc:postgresql://postgres:5432/${connectionConfig.database}`,
      `-user=${connectionConfig.user}`,
      `-password=${connectionConfig.password}`,
      'migrate',
    ])
    .withBindMounts([
      {
        source: migrationsDir,
        target: '/flyway/sql',
      },
    ])
    .start();

  // Get and log container logs
  const logs = await flywayContainer.logs();
  let logContent = '';

  logs.on('data', (chunk: string) => {
    logContent += chunk.toString();
  });

  // Wait for logs to be fully read
  await new Promise((resolve) => {
    logs.on('end', resolve);
  });

  // Check for success in logs
  if (logContent.includes('Successfully applied')) {
    await pgContainer.snapshot();
    return { pgContainer, connectionConfig, network };
  }

  console.error('Flyway migration failed. Logs:', logContent);

  throw new Error('Flyway migration failed. Check the logs for details.');
}
