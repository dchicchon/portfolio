// install dependencies based on projects in target directory
import fs from 'fs';
import path, { dirname } from 'path';
import chalk from 'chalk'
import { fileURLToPath } from 'url';
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectsPath = process.env.PROJECTS_DIR;
const projectRoutesPath = path.join(__dirname, '..', 'src', 'utils', 'projectRoutes.js')
const rootPackageJsonPath = path.join(__dirname, '..', 'package.json')
const projectList = [];
const fileMap = {
    packageJson: 'package.json'
}
// don't download things that are already in our root json. We reserve this for `npm
const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath));
const { dependencies: rootDependencies } = rootPackageJson;
const depFilterList = ['react', 'react-dom', ...Object.keys(rootDependencies)]

const quote = (text) => `"${text}"`
const parseFile = (file, projectName, projectPath) => {
    if (file !== fileMap.packageJson) return
    const packageJsonPath = path.join(projectPath, file);
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))
    if (!packageJson.reactProject || !packageJson.reactProject.ready) return;

    // Lets do easier way first then figure it out later
    // lets run an npm install in the directory to refresh
    const options = {
        encoding: 'utf-8'
    }
    console.log({ projectPath, projectName })
    console.log(chalk.yellow(`updating project:${projectName} dependencies`))
    const installOutput = execSync(`cd ${projectPath} && npm i`, options);
    // console.log(chalk.cyanBright(installOutput))

    // Download all deps to this portfolio directory
    const { dependencies, devDependencies } = packageJson;

    // Install dependencies
    const filteredDeps = Object.keys(dependencies).filter((dep => !depFilterList.includes(dep)))
    const installDeps = filteredDeps.join(' ');
    const dependenciesInstall = execSync(`npm i ${installDeps}`);
    // console.log(chalk.green(dependenciesInstall))

    // Install dev dependencies
    const filteredDevDeps = Object.keys(devDependencies).filter((dep => !depFilterList.includes(dep)))
    const installDevDeps = filteredDevDeps.join(' ');
    const devDependenciesInstall = execSync(`npm i ${installDevDeps}`);
    // console.log(chalk.green(devDependenciesInstall))

    const { entry, name, description } = packageJson.reactProject;

    // we should make a full url path to this package
    // we should resolve to the package.json entry
    const entryPath = path.resolve(projectPath, entry);
    const insertProject = {
        entry: quote(entryPath),
        name: `${projectName}`,
        export: name || (projectName[0].toUpperCase() + projectName.slice(1)).replace('-', ''),
        description: quote(description),
    }
    projectList.push(insertProject);

    // then make sure that the project either
    // 1. Uses the deps from it's directory,
    // Somehow redirect all projects to use the node_modules
    // from their directory?
    // or
    // 2. We install it's deps here in this project then build it
    // maybe by using a npm install --no-save?
}

// pass options like --converse or whatever to show install logs
const loadProjects = () => {
    console.log({ projectRoutesPath });
    // read all files at projectDir
    const projects = fs.readdirSync(projectsPath)
    projects.forEach(projectName => {
        // console.log(projectName);
        const projectPath = path.join(projectsPath, projectName);
        const isDir = fs.lstatSync(projectPath).isDirectory();
        try {
            if (isDir) {
                const projectFiles = fs.readdirSync(projectPath);
                projectFiles.forEach((file) => parseFile(file, projectName, projectPath))
            }
        } catch (err) {
            console.log(err)
            console.log(chalk.yellow(`Skippping project: ${projectName}`))
        }
    })

    console.log({ projectList })
    const lines = []
    projectList.forEach((project => {
        lines.push(`import ${project.export} from ${project.entry};`);
    }))

    // const projectNames = projectList.map((p) => p.name).join(',')
    lines.push('export const projectMap = {');
    projectList.forEach((p) => {
        lines.push(`${quote(p.name)}:{
        export: ${p.export},
        description: ${p.description}
    },`)

    })
    lines.push('};')
    const content = lines.join('\n')

    fs.writeFileSync(projectRoutesPath, content)

}

loadProjects();