'use strict';

const yosay = require('yosay');
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
        const { chalk } = this.options.utils;

        this.log(yosay('xbc-react'));
        this.log(
            chalk.magenta(
                `欢迎您` +
                '这是一款react脚手架.' +
                '\n'
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
            default: 'xbc-react-cli'
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
            this.answers
        );
    }

    /**
     * Install dependencies
     */
    install() {
        const { log } = this.options;

        log.info('安装依赖，过程持续1~2分钟');
        this.npmInstall();
    }

    /**
     * Prompt user to start project
     */
    end() {
        const { name } = this.answers;
        const { log } = this.options;
        const { chalk } = this.options.utils;

        log.info('本次初始化过程结束, 请通过以下命令运行项目: ');
        console.log();
        console.log(chalk.cyan('  cd'), name);
        console.log(`  ${chalk.cyan('feflow dev')}`);
        console.log();
        log.info('编码愉快!');
    }
};
