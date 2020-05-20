'use strict';

const yosay = require('yosay');
const chalk = require('chalk');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor() {
    super(...arguments);

    this.answers = {};
  }

  /**
   * Print welcome message
   */
  initializing() {
    this.log(yosay('fef脚手架'));
    this.log(
      chalk.magenta(
        `您好` +
        '\n' +
        '这是中谷科技后台管理前端项目脚手架'
      )
    );
  }

  /**
   * Interact with developer.
   */
  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: '请输入项目名称',
      default: 'my-project'
    }, {
      type: 'input',
      name: 'description',
      message: '请输入项目描述信息',
      default: '项目基本描述'
    }, {
      type: 'input',
      name: 'version',
      message: '请输入版本 (1.0.0):',
      default: '1.0.0'
    }]).then((answers) => {
      this.answers = answers;
    });
  }

  /**
   * Copy templates
   */
  writing() {
    const { name } = this.answers;
    this.destinationRoot(this.destinationPath(name));

    this.fs.copyTpl(
        `${this.templatePath()}/**/!(_)*`,
        this.destinationPath(),
        this.answers,
        {},
        { globOptions: { dot: true } }    // Copy all dots files.
    );
  }

  /**
   * Install dependencies
   */
  install() {
    const { logger } = this.options;

    logger.info('安装依赖，过程持续1~2分钟');
    this.npmInstall();
  }

  /**
   * Prompt user to start project
   */
  end() {
    const { name } = this.answers;
    const { logger } = this.options;

    logger.info('本次初始化过程结束, 请通过以下命令运行项目: ');
    console.log();
    console.log(chalk.cyan('  cd'), name);
    console.log(`  ${chalk.cyan('fef dev')}`);
    console.log();
    logger.info('编码愉快!');
  }
};
