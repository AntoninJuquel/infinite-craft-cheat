import { Integer, Node } from 'neo4j-driver';

export default interface Pair {
  first: string;
  second: string;
  result: string;
}

export type PairNode = Node<Integer, Pair>;
