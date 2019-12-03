import Promise from 'bluebird';
import React, { useState, ReactElement, Dispatch, SetStateAction } from 'react';
import { RpcError } from 'eosjs';
import { rpcGetInfo, rpcGetBlock } from "./rpc";
import { GetBlockResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import BlockSegment from './List/BlockSegment/BlockSegment';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [rowCount] = useState<number>(10);
  const [lastBlockNum, setLastBlockNum] = useState<number|undefined>(undefined);
  const [recentBlockSegments, setRecentBlockSegments] = useState<ReactElement<any>[]>([]);

  const loadBlockInformation = async () => {
    setLoading(true);
    const blockNum: number | undefined = await findLastBlockNumByCount(setError);
    if (!blockNum) return;
    const blockNumbers = propagateBlockNumberList(lastBlockNum, blockNum, rowCount);
    let newBlockSegments: ReactElement<any>[] = await Promise.mapSeries(blockNumbers, (blockNum: number) =>
      createBlockSegmentComponent(blockNum)
    );
    const blockSegments = newBlockSegments.concat(recentBlockSegments).slice(0, 10);
    setLastBlockNum(blockNum);
    setRecentBlockSegments(blockSegments);
    setLoading(false);
  };

  return (
    <div className="ui container">
      <div className="ui segment rootSegment">
        <Header loading={loading} loadBlockInformation={loadBlockInformation} />
        <List loading={loading} errorMsg={error} blockList={recentBlockSegments} />
      </div>
    </div>
  );
};

export const findLastBlockNumByCount = async (setError: Dispatch<SetStateAction<string>>) => {
  try {
    const chainInfo = await rpcGetInfo();
    return chainInfo.last_irreversible_block_num;
  } catch (e) {
    setError(`Error Retrieving Chain Info: ${e.message}`);
    if (e instanceof RpcError)
      console.log(JSON.stringify(e.json, null, 2));
  }
};

export const propagateBlockNumberList = (lastBlockNum: number|undefined, blockNum: number, rowCount: number) => {
  const blockNumbers = [];
  let amount = 0;
  if (lastBlockNum && blockNum - lastBlockNum <= 9) amount = blockNum - lastBlockNum;
  else amount = rowCount;
  for (let i = blockNum; i > blockNum - amount; i--) blockNumbers.push(i);
  return blockNumbers;
};

export const createBlockSegmentComponent = async (blockNum: number) => {
  try {
    const blockInfo: GetBlockResult  = await rpcGetBlock(blockNum);
    return <BlockSegment key={blockInfo.block_num} blockInfo={blockInfo} />;
  } catch (e) {
    if (e instanceof RpcError)
      console.log(JSON.stringify(e.json, null, 2));
    return <div className="ui segment">Error Retrieving Block Number {blockNum}</div>;
  }
};

export default App;
