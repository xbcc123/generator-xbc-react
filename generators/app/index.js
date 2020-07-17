'use strict';

const yosay = require('yosay');
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const path = require('path')
const fs = require('fs')

const Utils = {
	read(root, filter, files, prefix) {
		prefix = prefix || '';
		files = files || [];
        filter = filter || this.noDotFiles;
		var dir = path.join(root, prefix);
        if (!fs.existsSync(dir)){
            return files;
		}
        if (fs.statSync(dir).isDirectory()){
			fs.readdirSync(dir)
			.filter(filter)
			.forEach(function (name) {
				Utils.read(root, filter, files, path.join(prefix, name));
			});
		} else {
			files.push(prefix);
		}
        return files;
	},

	noDotFiles(x) {
		// console.log(x)
		// return x[0] !== '.'; // 过滤器前面为.的文件
		return true
	}
}

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
	// 获取文件目录
	const sourceDir = path.join(this.templatePath());
	const filePaths = Utils.read(sourceDir);
	console.log(filePaths)
	// this.fs.copyTpl(
    //     `${this.templatePath()}/**/!(_)*`,
    //     this.destinationPath(),
    //     this.answers,
    //     {},
    //     { globOptions: { dot: true, ignore: ['.+\.png']  } }    // Copy all dots files.
	// );

	// ejs无法编译png等文件 png等文件中带有%会导致ejs编译失败
	filePaths.forEach(filePath => {
		if(/.+\.html/.test(filePath)) {
			this.fs.copyTpl(
				`${this.templatePath()}/${filePath}`,
				`${this.destinationPath()}/${filePath}`,
				this.answers,
				{},
				{ globOptions: { dot: true } }    // Copy all dots files.
			);
		}else {
			this.fs.copy(
				`${this.templatePath()}/${filePath}`,
				`${this.destinationPath()}/${filePath}`,
				{ globOptions: { dot: true } },
				this.answers,
				{}
			);
		}
	})
  }


  /**
   * Install dependencies
   */
  install() {
    const { logger } = this.options;
    // logger.info('安装依赖，过程持续1~2分钟');
    // this.npmInstall();
  }

  /**
   * Prompt user to start project
   */
  end() {
    const { name } = this.answers;
    const { logger } = this.options;

    // logger.info('本次初始化过程结束, 请通过以下命令运行项目: ');
    console.log('本次初始化过程结束, 请通过以下命令运行项目: ');
	console.log(chalk.cyan('  cd'), name);
	console.log(chalk.cyan('  cnpm i'),);
    console.log(`  ${chalk.cyan('fef dev')}`);
    console.log('  编码愉快!');
    // logger.info('编码愉快!');
  }
};
