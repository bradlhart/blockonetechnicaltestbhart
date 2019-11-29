import React, { useState } from 'react';
import { GetBlockResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import './BlockSegment.css';

interface BlockSegmentProps {
  blockInfo: GetBlockResult;
}

export const BlockSegment: React.FC<BlockSegmentProps> = ({ blockInfo }: BlockSegmentProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const expandRawData = () => setExpanded(!expanded);

  return (
    <div className="ui segment" onClick={expandRawData}>
      <div className="ui three column divided grid">
        <div className="ten wide column">{blockInfo.id}</div>
        <div className="three wide column">{blockInfo.timestamp}</div>
        <div className="three wide column">{blockInfo.transactions ? blockInfo.transactions.length : null}</div>
      </div>
      {expanded ? (
        <div className="ui segment rawDisplayContainer">
          <pre>{JSON.stringify(blockInfo, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
};
