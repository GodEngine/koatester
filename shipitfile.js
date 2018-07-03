'use strict'

module.exports = function (shipit) {
  require('shipit-better-deploy')(shipit)
  require('shipit-better-cnpm')(shipit)
  require('shipit-pm')(shipit)
  shipit.initConfig({
    default: {
      workspace: '/tmp/deploy/webapp',
      deployTo: '/home/work/webapp',
      repositoryUrl: 'https://github.com/GodEngine/koatester.git',
      ignores: ['.git'],
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: true,
      pullDataDeploy: true,
      cnpm: {
        compare: true,
        flags: '--production',
        local: false,
        npm: 'cnpm',
        remote: true
      },
      pm: {
        production: {
          path: '/home/work/webapp/current/pm2/production.json'
        }
      }
    },
    production: {
      servers: ['root@39.104.167.151'],
      branch: 'master'
    }
  })
}
