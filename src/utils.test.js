const test = require('ava');
const { isLocalPath } = require('./utils')

test('isLocalPath', t => {
  const sampleDependencies = [
    '1.0.0 - 2.9999.9999',
    '>=1.0.2 <2.1.2',
    '>1.0.2 <=2.3.4',
    '2.0.1',
    '<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0',
    'http://asdf.com/asdf.tar.gz',
    '~1.2',
    '~1.2.3',
    '2.x',
    '3.3.x',
    'latest',
    'file:../dyl',
  ]

  const localPaths = sampleDependencies.filter(isLocalPath)

  t.deepEqual(localPaths, [
    'file:../dyl',
  ])
});