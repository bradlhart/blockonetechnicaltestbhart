import React from 'react';
import './ListHeader.css';

export const ListHeader: React.FC = () => {
  return (
    <div className="ui segment">
      <div className="ui three column divided grid listHeader">
        <div className="ten wide column">Hash</div>
        <div className="three wide column">Timestamp</div>
        <div className="three wide column">Actions</div>
      </div>
    </div>
  );
};
