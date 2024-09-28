#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import { componentTemplate, customHookTemplate } from './templates/dashboardTemplate';

const program = new Command();

const packageJson = await import('../package.json', { assert: { type: 'json' } });

program
    .name('wixter')
    .description('A CLI tool for generating React components, custom hooks, and API functions.')
    .version(packageJson.default.version);

// Command for creating components and hooks
program
    .command('dashboard')
    .description('Generate React components and custom hooks.')
    .option('-c, --component <name>', 'Create a new component with the specified name')
    .option('-h, --hook <name>', 'Create a new custom hook with the specified name')
    .action(async (options) => {
        if (options.component) {
            const componentName = options.component;
            const componentDir = path.join(process.cwd(), `src/dashboard/components/${componentName}`);
            const spinner = ora(`Creating component ${componentName}...`).start();

            try {
                await fs.ensureDir(componentDir);
                const indexFilePath = path.join(componentDir, 'index.tsx');
                const indexContent = componentTemplate(componentName);
                await fs.writeFile(indexFilePath, indexContent);
                spinner.succeed(`Component ${componentName} created successfully at ${componentDir}`);
            } catch (error) {
                spinner.fail('Error creating component');
                console.error(error);
            }
        }

        if (options.hook) {
            const hookName = options.hook;
            const hookDir = path.join(process.cwd(), `src/hooks/${hookName}`);
            const spinner = ora(`Creating hook ${hookName}...`).start();

            try {
                await fs.ensureDir(hookDir);
                const hookFilePath = path.join(hookDir, `use${hookName}.ts`);
                const hookContent = customHookTemplate(hookName);
                await fs.writeFile(hookFilePath, hookContent);
                spinner.succeed(`Hook use${hookName} created successfully at ${hookDir}`);
            } catch (error) {
                spinner.fail('Error creating hook');
                console.error(error);
            }
        }

        if (!options.component && !options.hook) {
            console.error('Either component name or hook name is required.');
            process.exit(1);
        }
    });

// Command for creating functions
program
    .command('api')
    .description('Generate API functions.')
    .option('-f, --function <name>', 'Create a new API function with the specified name')
    .action(async (options) => {
        const functionName = options.function;

        if (!functionName) {
            console.error('Function name is required. Use -f or --function to specify it.');
            process.exit(1);
        }

        const functionDir = path.join(process.cwd(), `src/api/functions/${functionName}`);
        const spinner = ora(`Creating function ${functionName}...`).start(); // Start spinner

        try {
            await fs.ensureDir(functionDir);
            const functionFilePath = path.join(functionDir, `${functionName}.ts`);
            const functionContent = `export const ${functionName} = () => {
                // Your function logic here
            };`;

            await fs.writeFile(functionFilePath, functionContent);
            spinner.succeed(`Function ${functionName} created successfully at ${functionDir}`);
        } catch (error) {
            spinner.fail('Error creating function');
            console.error(error);
        }
    });

// Show help if no command is provided
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

program.parse(process.argv);