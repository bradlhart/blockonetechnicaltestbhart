import React from 'react';
import './ListHeader.css';

export const ListHeader: React.FC = () => {
  return (
    <div className="ui segment">
      <div className="ui three column divided grid listHeader listContent">
        <div className="seven wide mobile eight wide tablet ten wide computer column">Hash</div>
        <div className="five wide mobile five wide tablet four wide computer column">Timestamp</div>
        <div className="four wide mobile three wide tablet two wide computer column">Actions</div>
      </div>
    </div>
  );
};
