import Promise from 'bluebird';
import React, { useState, ReactElement } from 'react';
import { JsonRpc, RpcError } from 'eosjs';
import { GetBlockResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import './App.css';

import { Header } from './Header/Header';
import { List } from './List/List';
import { BlockSegment } from './List/BlockSegment/BlockSegment';

const rpc = new JsonRpc('https://api.eosnewyork.io');

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [rowCount] = useState<number>(10);
  const [recentBlockSegments, setRecentBlockSegments] = useState<ReactElement<any>[]>([]);

  const loadBlockInformation = async () => {
    setLoading(true);
    setRecentBlockSegments([]);
    const blockNumbers: number[] | undefined = await findLastBlockNumByCount(rowCount);
    if (!blockNumbers) return;
    const blockSegments: ReactElement<any>[] = await Promise.mapSeries(blockNumbers, (blockNum: number) =>
      createBlockSegmentComponent(blockNum)
    );
    setRecentBlockSegments(blockSegments);
    setLoading(false);
  };

  const findLastBlockNumByCount = async (count: number) => {
    try {
      const chainInfo = await rpc.get_info();
      const recentBlockNum = chainInfo.last_irreversible_block_num;
      const blockNumbers = [];
      for (let i = recentBlockNum; i > recentBlockNum - count; i--) blockNumbers.push(i);
      return blockNumbers;
      } catch (e) {
        setError(`Error Retrieving Chain Info: ${e.message}`);
        if (e instanceof RpcError)
          console.log(JSON.stringify(e.json, null, 2));
      }
  };

  const createBlockSegmentComponent = async (blockNum: number) => {
    try {
      const blockInfo: GetBlockResult  = await rpc.get_block(blockNum);
      return <BlockSegment key={blockInfo.block_num} blockInfo={blockInfo} />;
    } catch (e) {
      if (e instanceof RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      return <div className="ui segment">Error Retrieving Block Number {blockNum}</div>;
    }
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
