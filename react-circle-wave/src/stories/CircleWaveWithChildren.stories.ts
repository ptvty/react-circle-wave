import type { Meta, StoryObj } from '@storybook/react';

import { CircleWave } from '../CircleWave';
import { CircleWaveWithChildren } from './CircleWaveWithChildren';

const meta: Meta<typeof CircleWave> = {
    title: 'CircleWave/WithChildren',
    component: CircleWaveWithChildren,
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
        stopped: false,
    }
};

export const Colors: Story = {
    args: {
        size: 150,
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
};