#!/usr/bin/env node
const fs = require('fs')
const {join, parse} = require('path')


const normalizeSchema = dp => {
  for (const propertyName in dp) {
    if (dp[propertyName].constructor === Object) {
      dp[propertyName] = [dp[propertyName]]
    }
  }
  return dp
}

const nomralizeDateFormat = dp => {
  for (const idx in dp.resources) {
    const resource = dp.resources[idx]
    if (resource.schema) {
      for (const id in resource.schema.fields) {
        const field = resource.schema.fields[id]
        if (field.type === 'date') {
          field.format = 'any'
        }
      }
    }
  }
  return dp
}

const normalizeType = dp => {
  for (const idx in dp.resources) {
    const resource = dp.resources[idx]
    if (resource.schema) {
      for (const id in resource.schema.fields) {
        const field = resource.schema.fields[id]
        const unsupportedNumberTypes = ['decimal', 'double', 'float']
        if (unsupportedNumberTypes.indexOf(field.type) > -1) {
          field.type = 'number'
        }
      }
    }
  }
  return dp
}

const normalizeResourcesNames = dp => {
  for (const idx in dp.resources) {
    if (dp.resources[idx].name) {
      dp.resources[idx].name = dp.resources[idx].name.toLowerCase().replace(' ', '-')
    } else {
      const pathParts = parse(dp.resources[idx].path)
      dp.resources[idx].name = pathParts.name
    }
  }
  dp.name = dp.name.toLowerCase().replace(' ', '-')
  return dp
}

const normalizeLicenses = dp => {
  
  normalizeSchema(dp)
  if (dp.license) {
    if (typeof dp.licensne === 'string') {
      dp.licenses = new Array()
      dp.licenses.push({name: dp.license})
      delete dp.license.licenses
    } else if (isArray(dp.license)) {
      dp.licenses = dp.license
      delete dp.license
    }
  }  
  return dp
}
const isArray = (a) => {
  return (!!a) && (a.constructor === Array);
}

const normalizeSources = dp => {
  for (const idx in dp.sources) {
    if (!dp.sources[idx].title) {
      dp.sources[idx].title = dp.sources[idx].name ? dp.sources[idx].name : 'unknown'
    }
    if (dp.sources[idx].web && !dp.sources[idx].path) {
      dp.sources[idx].path = dp.sources[idx].web
      delete dp.sources[idx].web
    }
  }
  for (const idx in dp.resources) {
    for (const id in dp.resources[idx].sources) {
      if (!dp.resources[idx].sources[id].title) {
        dp.resources[idx].sources[id].title = dp.resources[idx].sources[id].name ? dp.resources[idx].sources[id].name : 'unknown'
      }
    }
  }
  return dp
}

const normalizeContributors = dp => {
  const normalizeContributorsTitle = dp => {
    for (const idx in dp.contributors) {
      if (!dp.contributors[idx].title) {
        dp.contributors[idx].title = dp.contributors[idx].name ? dp.contributors[idx].name : ''
      }
    }
  }
  if (dp.author) {
    if (dp.contributors) {
      dp.contributors.push({title: dp.author})
      delete dp.author
      normalizeContributorsTitle(dp)
    } else {
      dp.contributors = new Array()
      dp.contributors.push({title: dp.author})
      delete dp.author
      normalizeContributorsTitle(dp)
    }
  } else {
    normalizeContributorsTitle(dp)
  }
  return dp
}

const normalizePath = dp => {
  for (const idx in dp.resources) {
    if (dp.resources[idx].path) {
      if (dp.resources[idx].url) {
        delete dp.resources[idx].url
      }
    } else if (dp.resources[idx].url) {
      dp.resources[idx].path = dp.resources[idx].url
      delete dp.resources[idx].url
    }
  }
  return dp
}

const readDatapackage = path => {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}

const normalizeAll = dp => {
  dp = normalizePath(dp)
  dp = normalizeSchema(dp)
  dp = nomralizeDateFormat(dp)
  dp = normalizeType(dp)
  dp = normalizeResourcesNames(dp)
  dp = normalizeLicenses(dp)
  dp = normalizeSources(dp)
  dp = normalizeContributors(dp)
  return dp
}

const normalize = path => {
  const writeDatapackage = dp => {
    fs.writeFile(path, JSON.stringify(dp, null, 2), err => {
      if (err) {
        console.error(err.message)
        return
      }
      console.log(JSON.stringify(dp, null, 2))
      console.log('Datapackage.json has been normalized')
    })
  }
  if (!path) {
    path = 'datapackage.json'
    const dp = readDatapackage(path)
    normalizeAll(dp)
    writeDatapackage(dp)
  } else if (fs.lstatSync(path).isFile()) {
    const dp = readDatapackage(path)
    normalizeAll(dp)
    writeDatapackage(dp)
  } else {
    path = join(path, 'datapackage.json')
    const dp = readDatapackage(path)
    normalizeAll(dp)
    writeDatapackage(dp)
  }
}

if (process.argv[1] === '/usr/local/bin/normalize.js'){
  const pathForDataset = process.argv[2]
  normalize(pathForDataset)
}
module.exports = {
  normalize,
  normalizeAll,
  nomralizeDateFormat,
  normalizePath,
  normalizeResourcesNames,
  normalizeSchema,
  normalizeLicenses,
  normalizeSources,
  normalizeContributors,
  normalizeType,
  readDatapackage
}
