import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import GuideMain from '../assets/img/GuideMain.png';
import GuideAccompanyList from '../assets/img/GuideAccompanyList.png';
import GuideAccompanyDetail from '../assets/img/GuideAccompanyDetail.png';
import GuideAccompanyWrite from '../assets/img/GuideAccompanyWrite.png';
import GuideMore from '../assets/img/GuideMore.png';
import moyoColor from '../api/moyoColor';

const NewbieGuide = () => {
  const history = useHistory();
  const [state, setState] = useState(false);

  useEffect(() => {
    setState({ open: true });
  }, []);

  const closeGuide = () => {
    setState({ open: false });
    history.push('/accompany');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <AutoRotatingCarousel
        label="MOYO 시작!"
        open={state.open}
        onClose={closeGuide}
        onStart={closeGuide}
        mobile
        autoplay={false}
        style={{ position: 'absolute' }}
      >
        <Slide
          media={<img src={GuideMain} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_1 }}
          title="1 This is a very cool feature"
          subtitle="Just using this will blow your mind."
        />
        <Slide
          media={<img src={GuideAccompanyList} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_2 }}
          title="2 Ever wanted to be popular?"
          subtitle="Well just mix two colors and your are good to go!"
        />
        <Slide
          media={<img src={GuideAccompanyDetail} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_3 }}
          title="3 May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
        <Slide
          media={<img src={GuideAccompanyWrite} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_4 }}
          title="4 May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
        <Slide
          media={<img src={GuideMore} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_5 }}
          title="5 May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
      </AutoRotatingCarousel>
    </div>
  );
};

export default NewbieGuide;
