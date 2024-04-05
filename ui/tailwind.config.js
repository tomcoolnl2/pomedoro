const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const defaultTheme = require('tailwindcss/defaultTheme');
const { join } = require('path');

module.exports = {
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {
            colors: {
                tomato: {
                    '50': '#fff3f1',
                    '100': '#ffe4df',
                    '200': '#ffcec5',
                    '300': '#ffac9d',
                    '400': '#ff7c64',
                    '500': '#ff6347',
                    '600': '#ed3615',
                    '700': '#c8290d',
                    '800': '#a5260f',
                    '900': '#882614',
                    '950': '#4b0f04',
                },
            },
            fontFamily: {
                dancingScript: ['"Dancing Script"', ...defaultTheme.fontFamily.sans],
                confortaa: ['"Comfortaa"', ...defaultTheme.fontFamily.sans],
            },
            animation: {
				fade: 'fadeIn .5s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
        },
    },
    plugins: [],
};
