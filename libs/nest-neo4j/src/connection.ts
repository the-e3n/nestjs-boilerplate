import neo4j, { Driver } from 'neo4j-driver';

let driver: Driver;

export const getSession = () => {
  if (!driver) {
    driver = neo4j.driver(process.env.NEO4J_URI || 'neo4j://localhost:7687');
  }
  const session = driver.session();
  return session;
  //   try {
  //     const result = await session.writeTransaction((tx) =>
  //       tx.run(
  //         'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)',
  //         { message: 'hello, world' },
  //       ),
  //     );

  //     const singleRecord = result.records[0];
  //     const greeting = singleRecord.get(0);

  //     console.log(greeting);
  //   } finally {
  //     await session.close();
  //   }

  //   // on application exit:
  //   await driver.close();
};
