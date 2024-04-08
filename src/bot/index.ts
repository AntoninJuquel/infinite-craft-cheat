import { getPair } from '../services/infinite-craft.service';
import {
  getElementsToBePairedToPairWith,
  addRelationship,
  getElements,
} from '../services/neo4j.service';
import Element from '../interfaces/Element';

async function main() {
  const res = await getElementsToBePairedToPairWith();

  if (res) {
    for (const record of res.records) {
      const mainNode = record.get('mainNode');
      const otherNodes = record.get('otherNodes');
      for (const element of otherNodes) {
        const pair = await getPair(
          mainNode.properties.text,
          element.properties.text,
        );
        const newElement = {
          text: pair.data.result,
          emoji: pair.data.emoji,
          discovered: pair.data.isNew,
        };
        console.log(
          `${mainNode.properties.emoji} ${mainNode.properties.text} + ${element.properties.emoji} ${element.properties.text} = ${newElement.emoji} ${newElement.text}`,
        );
        await addRelationship(
          mainNode.properties,
          element.properties,
          newElement,
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  await main();
}

export interface Dump {
  'infinite-craft-data': {
    elements: Element[];
  };
  command: string;
}

export async function dump() {
  const res = await getElements();
  let values: Dump = {
    'infinite-craft-data': {
      elements: [],
    },
    command: '',
  };
  if (res) {
    const elements = res.records.map((record) => record.get('e').properties);
    const data = { elements };
    const command = `localStorage.setItem('infinite-craft-data', '${JSON.stringify(
      data,
    )}')`;

    values = {
      'infinite-craft-data': data,
      command,
    };
  }

  return values;
}

main();
