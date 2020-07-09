const fs = require('fs')
const ejs = require('ejs')
const copydir = require('copy-dir');

const isAValidName = (name) => {
    return /^[a-zA-Z]+$/.test(name) 
}

const createFile = (path, fileName, moduleName) => {
    const destination = `${process.cwd()}/${path}/${fileName}.js`
    const source = (__dirname).replace(/\\/g, "/") + '/templates/module/'+fileName+'.js.ejs'
    ejs.renderFile(source, { name: moduleName }, (err, html) => {
        if (err) return console.error('2. '+err.toString());
        fs.writeFile(destination, html, (err) => {
            if (err) return console.log('1. ' + err.toString());
            console.log(`  File created : ${destination}`)
        });
    });
}

const api = (name) => {
    const moduleName = name.toLowerCase()
    if(!isAValidName(moduleName)) return console.log('Name string is not in format [[a-zA-Z]]')
    if (!fs.existsSync('src')) { fs.mkdirSync('src'); console.log('  Folder created : `/src`')}
    if (!fs.existsSync('src/api')) { fs.mkdirSync('src/api'); console.log('  Folder created : `/src/api`')}

    const folderPath = `src/api/${moduleName}`
    if (fs.existsSync(folderPath)) return console.log(`Module already exists : ${folderPath}`)
    else fs.mkdirSync(folderPath)
    const arr = ['controller', 'helpers', 'model', 'routes', 'validator']

    for(let x of arr) {
        createFile(folderPath, x, moduleName)
    }
}

const packageJson = (name) => {
    const obj = {
        "name": name,
        "version": "1.0.0",
        "description": `${name} backend`,
        "main": "app.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "start:dev": "nodemon --ignore '*.json' ./app.js",
          "start:prod": `pm2 start ./app.js --name ${name}`
        },
        "dependencies": {
          "body-parser": "^1.19.0",
          "compression": "^1.7.4",
          "cors": "^2.8.5",
          "express": "^4.17.1",
          "express-joi-validation": "^4.0.3",
          "helmet": "^3.21.2",
          "@hapi/joi": "^17.1.1",
          "mongoose": "^5.9.1",
          "morgan": "^1.9.1"
        }
      }
      return obj
}

const project = (name) => {
    const moduleName = name.toLowerCase()
    if(!isAValidName(moduleName)) return console.log('Name string is not in format [[a-zA-Z]]')
    const fromDir = (__dirname).replace(/\\/g, "/") + '/templates/project'
    const toDir = (process.cwd()).replace(/\\/g, "/") + `/${moduleName}`
    if(fs.existsSync(toDir)) return console.log('Folder with the name already exists.')
    else fs.mkdirSync(toDir)
    copydir(fromDir, toDir, (err) => {
        if (err) return console.error('3. '+err.toString());
        fs.writeFileSync(toDir+'/package.json', JSON.stringify(packageJson(moduleName), null, 4), 'utf8')
        console.log('Project generated!')
        console.log('Have a nice day!!')
    })

}


const auth = () => {
    const fromDir = (__dirname).replace(/\\/g, "/") + '/templates/auth'
    const toDir = (process.cwd()).replace(/\\/g, "/") + `/src/api/auth`
    if (!fs.existsSync('src')) { fs.mkdirSync('src'); console.log('  Folder created : `/src`')}
    if (!fs.existsSync('src/api')) { fs.mkdirSync('src/api'); console.log('  Folder created : `/src/api`')}

    if(fs.existsSync(toDir)) return console.log('Auth Folder already exists.')
    else fs.mkdirSync(toDir)
    copydir(fromDir, toDir, (err) => {
        if (err) return console.error('4. '+err.toString());
        console.log('Auth Module generated!')
    })

}

module.exports = { api, project, auth }