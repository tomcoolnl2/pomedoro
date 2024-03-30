import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ButtonComponent> = {
	component: ButtonComponent,
	title: 'UI Components/Button',
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		style: {
			control: 'select',
			options: ['primary', 'secondary', 'default'],
		},
		label: {
			control: 'text',
		},
		tooltip: {
			control: 'text',
		},
	},
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
	args: {
		size: 'medium',
		style: 'primary',
		label: 'Click Me!',
		tooltip: 'Primary Button Tooltip',
	},
};

export const Secondary: Story = {
	args: {
		size: 'medium',
		style: 'secondary',
		label: 'Secondary Action',
		tooltip: 'Secondary Button Tooltip',
	},
};

export const CustomSize: Story = {
	args: {
		size: 'large',
		style: 'default',
		label: 'Large Button',
		tooltip: 'Large Button Tooltip',
	},
};

// Example using the play function to interact with the component in tests
export const WithCustomInteraction: Story = {
	args: {
		size: 'small',
		style: 'primary',
		label: 'Click Me!',
		tooltip: 'Interact Tooltip',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/Click Me!/)).toBeTruthy();
	},
};
