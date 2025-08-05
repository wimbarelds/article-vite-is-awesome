/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: () => ({
        lg: {
          css: {
            li: {
              'margin-top': '0.1em',
              'margin-bottom': '0.1em',
            },
          },
        },
        DEFAULT: {
          css: {
            '--tw-prose-invert-links': 'var(--color-orange-400)',
            '--tw-prose-invert-bullets': 'var(--color-slate-100)',
            'a:hover': {
              color: 'var(--color-red-500)',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
};
