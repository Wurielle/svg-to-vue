#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const {Listr} = require('listr2')
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const {pascalCase, paramCase} = require('change-case')
const cwd = process.cwd()
const targetDir = path.resolve(cwd, argv._[0])
const outputDir = argv.output ? path.resolve(cwd, argv.output) : path.join(targetDir, 'components')
const prepend = argv.prepend || '';
const append = argv.append || '';
const isTypescript = argv.ts;

const ctx = {}
const tasks = new Listr(
    [
        {
            title: 'Getting icons',
            task: async (ctx) => {
                ctx.iconsFiles = glob.sync('**/*.svg', {cwd: targetDir});
            },
        },
        {
            title: 'Generating metadata',
            task: async (ctx) => {
                ctx.filesMetadatas = ctx.iconsFiles.map((filepath) => {
                    const parsedPath = path.parse(filepath)
                    const name = [prepend, paramCase(parsedPath.name), append].filter(Boolean).join('-')
                    return {
                        name,
                        filepath,
                        componentFilename: pascalCase(name).replace(new RegExp('_', 'g'), ''),
                        componentName: paramCase(name),
                    }
                })
            },
        },
        {
            title: 'Generating component files',
            task: async (ctx) => {
                fs.mkdirSync(outputDir, { recursive: true })
                ctx.filesMetadatas.forEach(async ({filepath, componentName, componentFilename}) => {
                    const fileConent = await fs.readFileSync(path.resolve(targetDir, filepath), 'utf8')
                    const template = `<template>\n${fileConent}</template>\n<script${isTypescript && ' lang="ts"' || ''}>export default { name: '${componentName}' }</script>\n`
                    fs.writeFileSync(path.resolve(outputDir, `${componentFilename}.vue`), template)
                })
            },
        },
    ],
    {ctx},
)

try {
    tasks.run()
} catch (e) {
    console.error(e)
}
