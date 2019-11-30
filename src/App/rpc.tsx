import { JsonRpc } from 'eosjs';

const rpc = new JsonRpc('https://api.eosnewyork.io');

export const rpcGetInfo = () => rpc.get_info();

export const rpcGetBlock = (block_num: number) => rpc.get_block(block_num);
