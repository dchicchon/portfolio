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
const wrapImport = (text) => `import(${text})`;

const installDependencies = async (packageJsonPath) => {
    loggy.log('installing dependencies');
    const packageJsonFile = await fs.promises.readFile(packageJsonPath)
    // we could just read the package.json in here instead
    const packageJson = JSON.parse(packageJsonFile);
    const dirPath = path.dirname(packageJsonPath);
    // we should cd to the directory at the package.json level rather than relying on the one passed in
    const execSyncOptions = { encoding: 'utf-8' };
    const installOutput = execSync(`cd ${dirPath} && npm i`, execSyncOptions);
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
    // const relativeIconPath = path.relative(projectPagePath, iconPath);
    return iconPath
}

/**
 * 
 * @param {string} file Name of file being parsed
 * @param {string} projectName  Project name
 * @param {Path} projectPath Path to project directory
 * @returns 
 */
const parseFile = async (file, projectName, projectPath) => {
    loggy.log('Parsing File');
    try {
        const packageJsonPath = path.join(projectPath, file);
        // we can also check if a packageJson path was passed
        const packageJsonFile = await fs.promises.readFile(packageJsonPath);
        const packageJson = JSON.parse(packageJsonFile)
        if (!packageJson.reactProject || !packageJson.reactProject.ready) return;
        if (installDeps) {
            loggy.log(`updating project:${projectName} dependencies`);
            if (packageJson.reactProject.installJson) {
                const installJsonPath = path.join(projectPath, packageJson.reactProject.installJson);
                await installDependencies(installJsonPath);
                // checking for the install json of the project, lets use that for installation
            } else {
                await installDependencies(packageJsonPath);
            }
            // Check if there is a specified package.json to install dependencies
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
        };
        const iconPath = getIcon(projectPath, icon);
        if (iconPath) {
            insertProject.icon = quote(iconPath);
        }
        return insertProject;
    } catch (err) {
        loggy.log(`Parse file failed for ${projectName}`)
        loggy.log(err);
        return err;
    }

}

const parseProjects = async (projects) => {
    const promiseList = [];
    loggy.log('Found the following items in your projects directory')
    loggy.log(projects)
    projects.forEach(projectName => {
        loggy.log('Parsing Project')
        loggy.log(projectName);
        const projectPath = path.join(projectsPath, projectName);
        const isDir = fs.lstatSync(projectPath).isDirectory();
        try {
            if (!isDir) {
                return loggy.log('Found item is not a project. Skipping...')
            };
            const projectFiles = fs.readdirSync(projectPath);
            // see if there is a package.json path
            const packageJson = projectFiles.find(p => p === fileMap.packageJson);
            if (!packageJson) return;
            const promise = parseFile(packageJson, projectName, projectPath)
            promiseList.push(promise);
        } catch (err) {
            loggy.info(chalk.yellow(`Skippping project: ${projectName}`))
            console.log(err)
        }
    })
    const promiseResults = await Promise.allSettled(promiseList);
    const projectList = promiseResults.filter(result => {
        if (!result.value || !result.value.entry) {
            return false;
        }
        return true;
    }).map(result => result.value);
    return projectList
}

const lazyImport = (projectList) => {
    const lines = []
    lines.push('export const projectMap = {');
    projectList.forEach((p) => {
        lines.push(`${quote(p.name)}: {`)
        lines.push(`title: ${quote(p.title)},`)
        lines.push(`description: ${p.description},`)
        lines.push(`export: () => ${wrapImport(p.entry)},`)
        if (p.icon) {
            lines.push(`icon: () => ${wrapImport(p.icon)},`)
        }
        lines.push('},')

    })
    lines.push('};')
    const content = lines.join('\n')
    fs.writeFileSync(projectRoutesPath, content)
}

const loadProjects = async () => {
    loggy.info('Loading Projects...')
    loggy.info('Running load projects with the following flags:')
    loggy.info({
        installDeps, verbose
    })
    if (!projectsPath) {
        loggy.info('Missing PROJECTS_DIR environment variable. Please specify directory to look for projects')
        return
    }
    // read all files at projectDir
    const projects = await fs.promises.readdir(projectsPath)
    const projectList = await parseProjects(projects);
    loggy.info('Projects ready for import:');
    loggy.info({ projectList })
    lazyImport(projectList)
}

loadProjects();