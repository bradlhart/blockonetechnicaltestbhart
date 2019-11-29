import Promise from 'bluebird';
import React, { useState, ReactElement } from 'react';
import { JsonRpc } from 'eosjs';
import { GetBlockResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import './App.css';

import { Header } from './Header/Header';
import { List } from './List/List';
import { BlockSegment } from './List/BlockSegment/BlockSegment';

const rpc = new JsonRpc('https://api.eosnewyork.io');

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rowCount] = useState<number>(10);
  const [recentBlockSegments, setRecentBlockSegments] = useState<ReactElement<any>[]>([]);

  const loadBlockInformation = async () => {
    setLoading(true);
    setRecentBlockSegments([]);
    const blockNumbers = findLastBlockNumByCount(rowCount);
    const blockSegments: ReactElement<any>[] = await Promise.mapSeries(blockNumbers, (blockNum: number) =>
      createBlockSegmentComponent(blockNum)
    );
    setRecentBlockSegments(blockSegments);
    setLoading(false);
  };

  const findLastBlockNumByCount = async (count: number) => {
    const chainInfo = await rpc.get_info();
    const recentBlockNum = chainInfo.last_irreversible_block_num;
    const blockNumbers = [];
    for (let i = recentBlockNum; i > recentBlockNum - count; i--) blockNumbers.push(i);
    return blockNumbers;
  };

  const createBlockSegmentComponent = async (blockNum: number) => {
    const blockInfo: GetBlockResult  = await rpc.get_block(blockNum);
    return <BlockSegment key={blockInfo.block_num} blockInfo={blockInfo} />;
    //return <div className="ui segment">Error Retrieving Block Number {blockNum}</div>;
  };

  return (
    <div className="ui container">
      <div className="ui segment rootSegment">
        <Header loading={loading} loadBlockInformation={loadBlockInformation} />
        <List loading={loading} blockList={recentBlockSegments} />
      </div>
    </div>
  );
};
