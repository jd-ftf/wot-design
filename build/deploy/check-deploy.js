const stopRelease = (reason) => {
  process.stderr.write(reason + '\n')
  process.exit(1)
}

const ref = process.env.GITHUB_REF
const splits = ref.split('/')
const version = splits[splits.length - 1]
if (!version) {
  stopRelease('Can\'t find version to release, and stop to release !')
}

if (version !== `v${require('../../package.json').version}`) {
  stopRelease('The release version isn\'t same as package.json')
}

if (!process.env.RELEASE_NOTE) {
  stopRelease('Can\'t find the version\'s release notes of changelog.md')
}
