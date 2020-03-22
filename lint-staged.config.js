module.exports = {
  'packages/**/*.js': [
    'cross-env EFF_ABSOLUTE_PATHS=true eslint --fix --format friendly',
    'git add'
  ],
  'src/**/*.js': [
    'cross-env EFF_ABSOLUTE_PATHS=true eslint --fix --format friendly',
    'git add'
  ],
  'test/**/*.js': [
    'cross-env EFF_ABSOLUTE_PATHS=true eslint --fix --format friendly',
    'git add'
  ]
}
