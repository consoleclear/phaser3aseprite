import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {languageOptions: {globals: {...globals.browser, ...globals.node}},
        rules: {
            'object-curly-spacing': ['error', 'never'],
            'key-spacing': ['error', {'beforeColon': false}],
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', {'before': false}],
            'arrow-parens': ['error', 'always'],
            'arrow-spacing': 'error',
            'no-multi-spaces': 'error',
            'no-trailing-spaces': ['error'],
            'space-infix-ops': ['error'],
            'space-in-parens': ['error', 'never'],
            'space-before-function-paren': ['error', 'never'],
            'space-before-blocks': ['error', 'always'],
            'keyword-spacing': ['error', {'before': true}],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4, {'SwitchCase': 1}],
        },
    },
    pluginJs.configs.recommended,
];