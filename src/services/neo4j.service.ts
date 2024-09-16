import neo4j from 'neo4j-driver';

import Element, { ElementNode } from '../interfaces/Element';

const uri = process.env.NEO4J_URI || 'neo4j://localhost:7687';
const user = process.env.NEO4J_USERNAME || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'password';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  disableLosslessIntegers: true,
});

driver.getServerInfo().then((info) => {
  console.log(`Connected to ${info.agent} at ${info.address}`);
});

async function addElement(element: Element) {
  const session = driver.session();
  let res;
  try {
    const { text, emoji } = element;
    res = await session.run(
      `
      MERGE (e:Element {name: $text ,text: $text, emoji: $emoji})
      RETURN e
      `,
      {
        text,
        emoji,
      },
    );
  } catch (e) {
    console.error('Error adding element');
    console.error(e);
  } finally {
    await session.close();
  }

  return res;
}

async function addRelationship(
  first: Element,
  second: Element,
  result: Element,
) {
  const session = driver.session();
  let res;
  try {
    const { text: firstText } = first;
    const { text: secondText } = second;
    const { text: resultText, emoji: resultEmoji, discovered } = result;

    res = await session.run(
      `
      MATCH (a: Element {text: $firstText}), (b:Element {text: $secondText})
      OPTIONAL MATCH (c:Element {text: $resultText})
      CALL apoc.do.when(
          c IS NULL, 
          'MERGE (d: Element {name: $resultText, text: $resultText, emoji: $resultEmoji, discovered: $discovered}) RETURN d',
          'MERGE (d: Dump {name: "Dump"}) return d',
          {resultText: $resultText, resultEmoji: $resultEmoji, discovered: $discovered}
      ) YIELD value
      WITH a,b,value.d as d
      MERGE (a)-[:CREATE {first: $firstText, second: $secondText, result: $resultText}]->(d)
      MERGE (b)-[:CREATE {first: $secondText, second: $firstText, result: $resultText}]->(d)
      RETURN a,b,d
      `,
      {
        firstText,
        secondText,
        resultText,
        resultEmoji,
        discovered,
      },
    );
  } catch (e) {
    console.error('Error adding pair');
    console.error(e);
  } finally {
    await session.close();
  }

  return res;
}

async function getElement(text: string) {
  const session = driver.session();
  let res;
  try {
    res = await session.run<{ e: ElementNode }>(
      `
      MATCH (e:Element {text: $text})
      RETURN e
      `,
      {
        text,
      },
    );
  } catch (e) {
    console.error('Error getting element');
    console.error(e);
  } finally {
    await session.close();
  }

  return res;
}

async function getElements() {
  const session = driver.session();
  let res;
  try {
    res = await session.run<{ e: ElementNode }>(
      `
      MATCH (e:Element)
      RETURN e
      `,
    );
  } catch (e) {
    console.error('Error getting elements');
    console.error(e);
  } finally {
    await session.close();
  }

  return res;
}

async function getElementsToBePaired() {
  const session = driver.session();
  let res;
  try {
    res = await session.run(
      `
      MATCH (e:Element)
      WITH collect(e) AS nodes, count(e) AS totalNodes
      UNWIND nodes AS e
      OPTIONAL MATCH (e)-[r:CREATE]->()
      WITH e, count(r) AS relationshipCount, totalNodes
      WHERE relationshipCount < totalNodes OR relationshipCount IS NULL
      RETURN e
      `,
    );
  } catch (e) {
    console.error('Error getting elements to be paired');
    console.error(e);
  } finally {
    await session.close();
  }

  return res;
}

async function getElementsToPairWith(element: Element) {
  const session = driver.session();
  let res;
  try {
    const { text } = element;
    res = await session.run(
      `
      MATCH (e:Element)
      WHERE NOT (e:Element)-[:CREATE {second: $text}]->()
      RETURN e
      `,
      {
        text,
      },
    );
  } catch (e) {
    console.error('Error getting elements to pair with');
    console.error(e);
  } finally {
    await session.close();
  }

  return res;
}

interface ElementsToBePairedToPairWith {
  mainNode: ElementNode;
  otherNodes: ElementNode[];
}

async function getElementsToBePairedToPairWith() {
  const session = driver.session();
  let res;
  try {
    res = await session.run<ElementsToBePairedToPairWith>(
      `
      MATCH (e:Element)
      WITH collect(e) AS nodes, count(e) AS totalNodes
      UNWIND nodes AS mainNode
      OPTIONAL MATCH (mainNode)-[r:CREATE]->()
      WITH mainNode, count(r) AS relationshipCount, totalNodes
      WHERE relationshipCount < totalNodes OR relationshipCount IS NULL
      WITH mainNode, relationshipCount, totalNodes
      MATCH (other:Element)
      WHERE NOT (other)-[:CREATE {second: mainNode.text}]->()
      RETURN mainNode, collect(other) AS otherNodes
      `,
    );
  } catch (e) {
    console.error('Error getting elements to be paired');
    console.error(e);
  } finally {
    await session.close();
  }
  return res;
}

export {
  driver as default,
  addElement,
  addRelationship,
  getElement,
  getElements,
  getElementsToBePaired,
  getElementsToPairWith,
  getElementsToBePairedToPairWith,
};
