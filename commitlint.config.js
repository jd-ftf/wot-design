const fs = require('fs')

module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'type-enum': [2, 'always',
      [
        'release',
        'update',
        'nothing',
        'feat',
        'style',
        'test',
        'refactor',
        'chore',
        'fix',
        'docs',
        'config',
        'util',
        'demo',
        'merge'
      ].concat(fs.readdirSync('packages'))
    ],
    'type-case': [2, 'always',
      [
        'lower-case',
        'camel-case',
        'kebab-case'
      ]
    ],
    'scope-case': [2, 'always',
      [
        'lower-case',
        'camel-case',
        'kebab-case'
      ]
    ],
    'header-max-length': [0, 'always', 100]
  }
}
