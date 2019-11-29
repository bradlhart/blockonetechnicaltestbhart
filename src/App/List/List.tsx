import React from 'react';

import { ListHeader } from './ListHeader/ListHeader';

export const List: React.FC = ({ loading, blockList }) => {
  return (
    <div className="ui segments">
      <ListHeader />
      {loading ? <div className="ui segment center aligned">Fetching Data...</div> : blockList}
    </div>
  );
};
