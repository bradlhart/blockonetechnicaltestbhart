import React from 'react';
import './Header.css';

interface HeaderProps {
  loading: boolean;
  loadBlockInformation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ loading, loadBlockInformation }: HeaderProps) => {
  const handleOnClick = () => loadBlockInformation();

  return (
    <div className="ui two column grid">
      <div className="sixteen wide mobile twelve wide tablet fourteen wide computer column">
        <h2 className="ui header">Block.one Web Application Developer Technical Test</h2>
      </div>
      <div className="sixteen wide mobile four wide tablet two wide computer column" style={{textAlign: 'right'}}>
        <div className={'ui button ' + (loading ? 'loading disabled' : undefined)} onClick={handleOnClick}>
          LOAD
        </div>
      </div>
    </div>
  );
};
