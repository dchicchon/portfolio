// install dependencies based on projects in target directory
import fs from 'fs';
import path, { dirname } from 'path';
import chalk from 'chalk'
import { fileURLToPath } from 'url';
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectsPath = process.env.PROJECTS_DIR;
const projectRoutesDirPath = path.join(__dirname, '..', 'src', 'utils');
const projectRoutesPath = path.join(projectRoutesDirPath, 'projectRoutes.jsx');
const projectPagePath = path.join(__dirname, '..', 'src', 'pages', 'Projects')
const rootPackageJsonPath = path.join(__dirname, '..', 'package.json');
// const sourcePath = path.join(__dirname, '..', 'src');
// const projectList = [];
const fileMap = {
    packageJson: 'package.json'
}
const runtimeOptions = process.argv.slice(2);
const installDeps = runtimeOptions.includes('--installDeps');
const verbose = runtimeOptions.includes('--verbose');
// don't download things that are already in our root json. We reserve this for `npm
const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath));
const { dependencies: rootDependencies } = rootPackageJson;
const depFilterList = ['react', 'react-dom', ...Object.keys(rootDependencies)]

const isObject = (val) => {
    return typeof val === 'object' && !Array.isArray(val) && val !== null
}

class Logger {
    constructor(props) {
        this.verbose = props.verbose;
    }
    info(message) {
        if (isObject(message)) {
            return console.log(message);
        }
        console.log(chalk.yellow(message));
    }

    log(message) {
        if (this.verbose) {
            if (isObject(message)) {
                return console.log(message);
            }
            console.log(chalk.green(message));
        }
    }
}

const props = {
    verbose
}
const loggy = new Logger(props)

const quote = (text) => `"${text}"`

const installDependencies = (projectPath, packageJson) => {
    const execSyncOptions = { encoding: 'utf-8' };
    const installOutput = execSync(`cd ${projectPath} && npm i`, execSyncOptions);
    loggy.log(installOutput)
    const { dependencies, devDependencies } = packageJson;
    const filteredDeps = Object.keys(dependencies).filter((dep => !depFilterList.includes(dep)))
    const installDeps = filteredDeps.join(' ');
    const dependenciesInstall = execSync(`npm i ${installDeps}`);
    loggy.log(dependenciesInstall);
    const filteredDevDeps = Object.keys(devDependencies).filter((dep => !depFilterList.includes(dep)))
    const installDevDeps = filteredDevDeps.join(' ');
    const devDependenciesInstall = execSync(`npm i ${installDevDeps}`);
    loggy.log(devDependenciesInstall);
}

const getIcon = (projectPath, icon) => {
    if (!icon) return ""
    const iconPath = path.resolve(projectPath, icon);
    const relativeIconPath = path.relative(projectPagePath, iconPath);
    return relativeIconPath
}

/**
 * 
 * @param {string} file Name of file being parsed
 * @param {string} projectName  Project name
 * @param {Path} projectPath Path to project directory
 * @returns 
 */
const parseFile = async (file, projectName, projectPath) => {
    const packageJsonPath = path.join(projectPath, file);

    const packageJsonFile = await fs.promises.readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonFile)
    if (!packageJson.reactProject || !packageJson.reactProject.ready) return;

    if (installDeps) {
        loggy.log(`updating project:${projectName} dependencies`);
        installDependencies(projectName, projectPath, packageJson)
    }

    const { description: mainDescription } = packageJson;
    const { entry, title, description, icon } = packageJson.reactProject;

    const entryPath = path.resolve(projectPath, entry);
    const relativeEntryPath = path.relative(projectRoutesDirPath, entryPath)


    const insertProject = {
        entry: quote(relativeEntryPath),
        title: title || projectName[0].toUpperCase() + projectName.slice(1),
        name: projectName,
        description: description ? quote(description) : quote(mainDescription),
        icon: getIcon(projectPath, icon)
    }
    return insertProject;
}

const parseProjects = async (projects) => {
    const promiseList = [];
    projects.forEach(projectName => {
        const projectPath = path.join(projectsPath, projectName);
        const isDir = fs.lstatSync(projectPath).isDirectory();
        try {
            if (!isDir) return;
            const projectFiles = fs.readdirSync(projectPath);
            const packageJson = projectFiles.find(p => p === fileMap.packageJson);
            if (!packageJson) return;
            const promise = parseFile(packageJson, projectName, projectPath)
            promiseList.push(promise);
        } catch (err) {
            console.log(err)
            console.log(chalk.yellow(`Skippping project: ${projectName}`))
        }
    })
    const promiseResults = await Promise.allSettled(promiseList);
    const projectList = promiseResults.filter(result => {
        if (result.value) {
            return result.value
        }
        loggy.log("The below project was not valid for project parsing")
        loggy.log(result)
    }).map(result => result.value);
    return projectList
}

const lazyImport = (projectList) => {
    const lines = []
    lines.push('export const projectMap = {');
    projectList.forEach((p) => {
        lines.push(`
        ${quote(p.name)}:{
            title: ${quote(p.title)},
            description: ${p.description},
            export: () => import(${p.entry}),
            icon: ${quote(p.icon)}
        },`)

    })
    lines.push('};')
    const content = lines.join('\n')
    fs.writeFileSync(projectRoutesPath, content)
}

const loadProjects = async () => {
    loggy.info('Loading Projects...')
    // read all files at projectDir
    const projects = await fs.promises.readdir(projectsPath)
    const projectList = await parseProjects(projects);
    loggy.info('Final Results');
    loggy.info({ projectList })
    lazyImport(projectList)
}

loadProjects();