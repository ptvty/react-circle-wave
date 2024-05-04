import type { Meta, StoryObj } from '@storybook/react';

import { CircleWave } from '../CircleWave';

const meta: Meta<typeof CircleWave> = {
  title: 'CircleWave/Raw',
  component: CircleWave,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CircleWave>;

export const Basic: Story = {
  args: {
    size: 150,
  },
};

export const Colors: Story = {
  args: {
    size: 150,
    stopped: false,
    colors: ['red', 'blue'],
  },
};

export const HighAmplitude: Story = {
  args: {
    size: 150,
    amplitude: 0.3,
    stopped: false,
    colors: ['red', 'blue'],
  },
};

export const HighSpeed: Story = {
  args: {
    size: 150,
    speed: 400,
    stopped: false,
    colors: ['red', 'blue'],
  },
};

export const Gradient: Story = {
  args: {
    size: 150,
    stopped: false,
    gradient: [
      { offset: 0, color: 'orange' },
      { offset: 20, color: 'red' },
      { offset: 100, color: 'gold' },
    ],
  },
  parameters: {
    backgrounds: { default: 'hex(333333)' },
  },
};

