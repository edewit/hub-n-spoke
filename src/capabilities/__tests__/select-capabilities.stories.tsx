import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {storiesOf} from '@storybook/react';
import capabilities from '../../data-examples/capabilities.json';
import {SelectCapabilities} from "../select-capabilities";
import {action} from "@storybook/addon-actions";

const items = capabilities.map(c => ({
  id: c.module,
  name: c.name,
  description: c.description,
  category: c.metadata.category,
  icon: c.metadata.icon,
  fields: c.props,
  selected: c.module === 'welcome',
  disabled: c.module === 'welcome'
})).filter(c => c.category !== 'frontend');

storiesOf('SelectCapabilities', module)
  .add('simple', () => (
    <SelectCapabilities items={items} onSave={action('save')} onCancel={action('cancel')}/>
  ));
