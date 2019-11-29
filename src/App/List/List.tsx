import React, { ReactElement } from 'react';
import './List.css';

import { ListHeader } from './ListHeader/ListHeader';

interface ListProps {
  loading: boolean;
  blockList: ReactElement<any>[];
}

export const List: React.FC<ListProps> = ({ loading, blockList }: ListProps) => {
  return (
    <div className="ui segments">
      <ListHeader />
      {loading ? (
        <div className="ui segment center aligned">Fetching Data...</div>
      ) : blockList.length === 0 ? (
        <div className="ui segment center aligned">No Data To Display, Click Load To Retrieve Data</div>
      ) : (
        blockList
      )}
    </div>
  );
};
