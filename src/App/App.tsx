import Promise from 'bluebird';
import React, { useState, useEffect } from 'react';
import { JsonRpc, RpcError } from 'eosjs';
import './App.css';

import { Header } from './Header/Header';
import { List } from './List/List';
import { BlockSegment } from './List/BlockSegment/BlockSegment';

const rpc = new JsonRpc('https://api.eosnewyork.io');

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recentBlockSegments, setRecentBlockSegments] = useState([]);

  const loadBlockInformation = async () => {
    setLoading(true);
    setRecentBlockSegments([]);
    const chainInfo = await rpc.get_info();
    const recentBlockNum = chainInfo.last_irreversible_block_num;
    const rowCount = 10;
    const blockNumbers = [];
    for (let i = recentBlockNum; i > recentBlockNum - rowCount; i--) blockNumbers.push(i);
    const blockSegments = await Promise.mapSeries(blockNumbers, (blockNum: number) =>
      createBlockSegmentComponent(blockNum)
    );
    setRecentBlockSegments(blockSegments);
    setLoading(false);
  };

  const createBlockSegmentComponent = blockNum => {
    return new Promise(resolve => {
      rpc
        .get_block(blockNum)
        .then(blockInfo => {
          return resolve(<BlockSegment className="ui segment" key={blockInfo.block_num} blockInfo={blockInfo} />);
        })
        .catch(() => {
          return resolve(<div className="ui segment">Error Retrieving Block Number {blockNum}</div>);
        });
    });
  };

  return (
    <div className="ui container">
      <div className="ui segment" style={{ margin: '20px' }}>
        <Header loading={loading} loadBlockInformation={loadBlockInformation} />
        <List loading={loading} blockList={recentBlockSegments} />
      </div>
    </div>
  );
};

export default App;
