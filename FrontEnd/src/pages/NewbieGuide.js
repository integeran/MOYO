import React, { useState } from 'react';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import GuideMain from '../assets/img/GuideMain.png';
import GuideAccompanyList from '../assets/img/GuideAccompanyList.png';
import GuideAccompanyDetail from '../assets/img/GuideAccompanyDetail.png';
import GuideAccompanyWrite from '../assets/img/GuideAccompanyWrite.png';
import GuideMore from '../assets/img/GuideMore.png';

const NewbieGuide = () => {
  const { red, blue, green } = require('@material-ui/core/colors');
  const Button = require('@material-ui/core/Button').default;
  const [state, setState] = useState(false);
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <Button onClick={() => setState({ open: true })}>Open carousel</Button>
      <AutoRotatingCarousel
        label="Get started"
        open={state.open}
        onClose={() => setState({ open: false })}
        onStart={() => setState({ open: false })}
        mobile
        autoplay={false}
        style={{ position: 'absolute' }}
      >
        <Slide
          media={<img src={GuideMain} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: red[600] }}
          title="1 This is a very cool feature"
          subtitle="Just using this will blow your mind."
        />
        <Slide
          media={<img src={GuideAccompanyList} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: blue[600] }}
          title="2 Ever wanted to be popular?"
          subtitle="Well just mix two colors and your are good to go!"
        />
        <Slide
          media={<img src={GuideAccompanyDetail} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: green[600] }}
          title="3 May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
        <Slide
          media={<img src={GuideAccompanyWrite} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: green[600] }}
          title="4 May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
        <Slide
          media={<img src={GuideMore} />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: green[600] }}
          title="5 May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
      </AutoRotatingCarousel>
    </div>
  );
};

export default NewbieGuide;
