#!/usr/bin/env node
// We need to get access to the File System module inside of our project
// to do so we have to add in a require statement and add in the module
// from the node standard library that we want to make use of.
// fs -> file system module

const fs = require('fs');
const { lstat } = fs.promises;
const chalk = require('chalk');
const path = require('path');

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    // error handling code 
    throw new Error(err);
  }

  const statPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for ( let stats of allStats) {
    const index = allStats.indexOf(stats);

    if(stats.isFile()) {
      console.log(chalk.blue(filenames[index]));
    } else {
      console.log(chalk.bold(filenames[index]));
    }
  }
  
});