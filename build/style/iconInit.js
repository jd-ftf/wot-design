var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../src/style/icon.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes;
var classList = [];

nodes.forEach((node) => {
  var selector = node.selector || '';
  var reg = new RegExp(/\.jm-icon-([^:]+):before/);
  var arr = selector.match(reg);

  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});

fs.writeFile(path.resolve(__dirname, '../../examples-m/icon.json'), JSON.stringify(classList), () => {});
