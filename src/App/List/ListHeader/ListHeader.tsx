import React, { useState } from 'react';

export const ListHeader: React.FC = () => {
  return (
    <div className="ui segment">
      <div className="ui three column divided grid" style={{ fontWeight: 'bold' }}>
        <div className="ten wide column">Hash</div>
        <div className="three wide column">Timestamp</div>
        <div className="three wide column">Actions</div>
      </div>
    </div>
  );
};
