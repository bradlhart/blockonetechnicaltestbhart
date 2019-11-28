import React, { useState } from 'react';

export const BlockSegment: React.FC = ({ blockInfo }) => {
  const [expanded, setExpanded] = useState(false);

  const expandRawData = () => setExpanded(!expanded);

  return (
    <div className="ui segment" onClick={expandRawData}>
      <div className="ui three column divided grid">
        <div className="ten wide column">{blockInfo.id}</div>
        <div className="three wide column">{blockInfo.timestamp}</div>
        <div className="three wide column">{blockInfo.transactions ? blockInfo.transactions.length : null}</div>
      </div>
      {expanded ? (
        <div className="ui segment" style={{ maxHeight: '200px', overflow: 'auto' }}>
          <pre>{JSON.stringify(blockInfo, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
};
