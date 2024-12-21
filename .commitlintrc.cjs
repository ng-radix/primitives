// @ts-check

/** @type {import('@commitlint/types').UserConfig} */
const config = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'release',
                'build',
                'chore',
                'ci',
                'docs',
                'feat',
                'fix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test'
            ]
        ],
        'scope-enum': [
            2,
            'always',
            [
                'primitives',
                'accordion',
                'alert-dialog',
                'aspect-ratio',
                'avatar',
                'card',
                'checkbox',
                'collapsible',
                'context-menu',
                'dropdown-menu',
                'dialog',
                'radio',
                'radio-group',
                'toggle',
                'toggle-group',
                'code',
                'separator',
                'select',
                'slider',
                'tooltip',
                'kbd',
                'tabs',
                'radix-docs',
                'radix-ssr-testing',
                'roving-focus',
                'showcase-taxonomy',
                'progress',
                'shadcn',
                'switch',
                'docs',
                'core',
                'release',
                'deps',
                'deps-dev',
                'changelog',
                'ci',
                'build',
                'theme',
                'themer',
                'popover'
            ]
        ]
    }
};

module.exports = config;
