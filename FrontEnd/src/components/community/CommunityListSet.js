import React from 'react';
import { useHistory } from 'react-router';
import CommunityListPaper from './CommunityListPaper';

const CommunityListSet = ({ communityData }) => {
  const history = useHistory();
  const handleCommunityClick = community => {
    history.push({
      pathname: '/community/communityList/' + community.cmId,
      state: {
        prevpath: history.location.pathname,
        community: community,
      },
    });
  };
  return (
    <div>
      {communityData.map(community => (
        <CommunityListPaper
          key={community.cmId}
          communityInfo={community}
          onClick={() => handleCommunityClick(community)}
        />
      ))}
    </div>
  );
};

export default CommunityListSet;
