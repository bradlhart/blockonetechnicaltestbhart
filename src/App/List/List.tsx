import React, { ReactElement } from 'react';
import './List.css';

import { ListHeader } from './ListHeader/ListHeader';

interface ListProps {
  loading: boolean;
  errorMsg: string;
  blockList: ReactElement<any>[];
}

export const List: React.FC<ListProps> = ({ loading, errorMsg, blockList }: ListProps) => {
  return (
    <div className="ui segments">
      <ListHeader />
      {errorMsg ? (
        <div className="ui segment center aligned">{errorMsg}</div>
      ) : loading ? (
        <div className="ui segment center aligned">Fetching Data...</div>
      ) : blockList.length === 0 ? (
        <div className="ui segment center aligned">No Data To Display, Click Load To Retrieve Data</div>
      ) : (
        blockList
      )}
    </div>
  );
};
