import React from 'react';

const CommunityListPaper = ({ communityInfo, onClick }) => {
  return (
    <div>
      <div onClick={onClick}>
        {communityInfo.title}
        <br />
        {communityInfo.nickname}
        <hr />
      </div>
    </div>
  );
};

export default CommunityListPaper;
