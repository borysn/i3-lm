/**
 * save.js
 * author: borysn
 * license: MIT
 */
const fsUtils = require('./fsUtils');
const config = require('./config');
const i3LmCmd = require('./i3LmCmd');

// save
function save() {
  i3LmCmd.call(this);
}

// inherit i3LmCmd
save.prototype = Object.create(i3LmCmd.prototype);

/**
 * exec
 */
save.prototype.exec = function(workspace) {
  // test valid worksapce
  if (fsUtils.isValidWorkspace(workspace)) {
     // save workspace using i3-save-tree cmd
     execSync(getSaveCmd(num));
     // edit layout file
     editLayout(config.LAYOUTS_DIR + `/workspace_${num}.json`);
  } else {
    // error and exit
    console.log(chalk.red('[Error] invalid workspace selected'));
    process.exit(1);
  }
}

/**
 * edit layout
 *
 */
function editLayout(file) {
  // read file
  fs.readFile(file, (err, fd) => {
    if (err) {
      console.log(chalk.red(`${err}`));
      console.log(chalk.red('[Error] Cannot read file'));
      process.exit(1);
    } else {
      // modify file contents & write
      // replace "// " before "class"
      // replace "// " before "instance"
      // replace "// " before "title"
      // replace "// " before "transient_for"
      const data = fd.toString()
        .replace(/\/\/\s\"class\"/g,'"class"')
        .replace(/\/\/\s\"instance\"/g, '"instance"');
        //.replace(/\/\/\s\"title\"/g, '"title"')
        //.replace(/\/\/\s\"transient_for\"/g, '"transient_for"');

      fs.writeFile(file, data, 'utf8', (err) => {
          if (err) {
            console.log(chalk.red(`${err}`));
            process.exit(1);
          }
      });
    }
  });
}

/**
 * getSaveCmd
 *
 * getSaveCmd :: num -> String
 */
function getSaveCmd(num) {
 return `i3-save-tree --workspace ${num} > ${config.USER_HOME}/.config/i3/layouts/workspace_${num}.json`.toString();
};

// set contstructor
save.prototype.constructor = save;

module.exports = save;
