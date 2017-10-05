const test = require('ava')
const norm = require('../index.js')

test('checks normalized all properties', t => {
  const pathToDataset = 'test/fixtures/invalid-dp.json'
  const dp = norm.readDatapackage(pathToDataset)
  const res = norm.normalizeAll(dp)
  const pathTovalidDataset = 'test/fixtures/valid-dp.json'
  const exp = norm.readDatapackage(pathTovalidDataset)
  t.deepEqual(res, exp)
})

test('check licenses property function', t => {
  const pathToDataset = 'test/fixtures/invalid-licenses.json'
  const dp = norm.readDatapackage(pathToDataset)
  const res = norm.normalizeLicenses(dp)
  const pathToValidDataset = 'test/fixtures/valid-dp.json'
  const exp = norm.readDatapackage(pathToValidDataset)
  t.deepEqual(res, exp)
})
test('check resources property function', t => {
  const pathToDataset = 'test/fixtures/invalid-resources.json'
  const dp = norm.readDatapackage(pathToDataset)
  const res = norm.normalizeResourcesNames(dp)
  const pathToValidDataset = 'test/fixtures/valid-dp.json'
  const exp = norm.readDatapackage(pathToValidDataset)
  t.deepEqual(res, exp)
})
test('check sources property function', t => {
  const pathToDataset = 'test/fixtures/invalid-sources.json'
  const dp = norm.readDatapackage(pathToDataset)
  const res = norm.normalizeSources(dp)
  const pathToValidDataset = 'test/fixtures/valid-dp.json'
  const exp = norm.readDatapackage(pathToValidDataset)
  t.deepEqual(res, exp)
})
test('check contributors property function', t => {
  const pathToDataset = 'test/fixtures/invalid-contributors.json'
  const dp = norm.readDatapackage(pathToDataset)
  const res = norm.normalizeContributors(dp)
  const pathToValidDataset = 'test/fixtures/valid-dp.json'
  const exp = norm.readDatapackage(pathToValidDataset)
  t.deepEqual(res, exp)
})
