import React from 'react';
import { useHistory } from 'react-router';

const CommunityDetail = () => {
  const history = useHistory();
  const communityData = history.location.state.community;
  console.log(communityData);
  return (
    <div>
      {communityData.communityType}
      <br />
      {communityData.title}
      <br />
      {communityData.nickname}
      <hr />
      {communityData.contents}
    </div>
  );
};

export default CommunityDetail;
