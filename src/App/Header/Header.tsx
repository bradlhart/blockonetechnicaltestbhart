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
      <div className="fourteen wide column">
        <h2 className="ui header">Block.one Web Application Developer Technical Test</h2>
      </div>
      <div className="two wide column">
        <div className={'ui button ' + (loading ? 'loading disabled' : undefined)} onClick={handleOnClick}>
          LOAD
        </div>
      </div>
    </div>
  );
};
