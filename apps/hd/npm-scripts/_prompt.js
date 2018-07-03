/**
 */

const inquirer = require('inquirer')
const ora = require('ora')

const args = ['--color'] // Node colorful always

const questions = [
  {
    name: 'project',
    message: 'Please input the project name:',
    validate: (str) => Boolean(str.length)
  },
  {
    name: 'conf',
    type: 'checkbox',
    message: 'Please make your choice:',
    choices: [
      { name: 'Sprite (是否生成雪碧图)', value: 's' },
      { name: 'Retina (是否支持 Retina 雪碧图)', value: 'r' },
      { name: 'CSS Module (是否使用 CSS Module)', value: 'm' },
      { name: 'Use React (是否使用 React, 默认 Preact)', value: 'R' },
      { name: '是否生成server端API文档', value: 'A' }
    ]
  }
]

module.exports = () => new Promise((resolve) => {
  inquirer.prompt(questions).then(function ({ project, conf }) {
    args.push(`--env.p=${project}`)

    conf.map((command) => args.push(`--env.${command}`))

    console.log('\n')

    const oraInstance = ora({
      color: 'cyan',
      text: 'Please waiting for the webpack start'
    }).start()

    resolve({
      oraInstance,
      args: args.join(' ')
    })
  })
})
