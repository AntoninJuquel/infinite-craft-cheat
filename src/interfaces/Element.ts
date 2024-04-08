import { Integer, Node } from 'neo4j-driver';

export default interface Element {
  text: string;
  emoji: string;
  discovered: boolean;
}

export type ElementNode = Node<Integer, Element>;
