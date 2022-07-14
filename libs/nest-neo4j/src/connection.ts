import neo4j, { Driver } from 'neo4j-driver';

let driver: Driver;
let readDriver: Driver;

export const getSession = () => {
  if (!driver) {
    driver = neo4j.driver(process.env.NEO4J_URI || 'neo4j://localhost:7687');
  }
  const session = driver.session();
  return session;
};
export const getReadSession = () => {
  if (!readDriver) {
    readDriver = neo4j.driver(
      process.env.NEO4J_READ_URI || 'neo4j://localhost:7687',
    );
  }
  const session = readDriver.session();
  return session;
};
