import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import {HubNSpoke, HubItem} from '../hub-n-spoke';

export const items: HubItem[] = [
  {
    id: 'hub1',
    title: 'Hub1',
    overview: {
      component: (<p>this is hub 1 overview</p>),
    },
    form: {
      component: (<p>this is hub 1 edition form</p>),
    }
  },
  {
    id: 'hub2',
    title: 'Hub2',
    overview: {
      component: (<p>this is hub 2 overview</p>),
    },
    form: {
      component: (<p>this is hub 2 edition form</p>),
    }
  },
  {
    id: 'hub3',
    title: 'Hub3',
    overview: {
      component: (<p>this is hub 3 overview</p>),
      width: 'full',
    },
    form: {
      component: (<p>this is hub 3 edition form</p>),
    }
  }
];

storiesOf('HubNSpoke', module)
  .add('simple', () => (
    <HubNSpoke items={items}/>
  ));
