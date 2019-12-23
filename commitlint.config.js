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
        'demo',
        'merge'
      ].concat(fs.readdirSync('packages'))
    ],
    'type-case': [2, 'always',
      [
        'lower-case',
        'camel-case'
      ]
    ],
    'scope-case': [2, 'always',
      [
        'lower-case',
        'camel-case'
      ]
    ]
  }
}