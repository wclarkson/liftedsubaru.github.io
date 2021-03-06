// TODO this should probably all be redone with gulp
const handlebars = require('handlebars'); // eslint-disable-line
const friendlyUrl = require('friendly-url');
const fs = require('fs');
const template = require('./template.hbs');
const moment = require('moment');
const guideImageLocation = "/static/img/guides";

let ROOTURL = ''; // 'file:///Users/honzie/Documents/personal/liftedsubaru.github.io'
if (process.argv[2] == 'dev') ROOTURL = "file:///Users/honzie/Documents/personal/liftedsubaru.github.io"

const detailPageConfigs = [];

const CurrentDate = moment().format('MM.DD.YY-mm.ss');;

function renderHomePage(categories) {
  return template({
    home: true,
    detailPageConfigs,
    categories,
    ROOTURL,
    guideImageLocation,
    version:CurrentDate
  });
}

function renderListView() {
  return template({
    list: true,
    detailPageConfigs,
    ROOTURL,
    guideImageLocation,
    version:CurrentDate
  });
}

function renderDetailPage(detail) {
  var temp = detail;
  temp.detailpage = true;
  temp.ROOTURL = ROOTURL;
  temp.guideImageLocation = guideImageLocation;
  temp.version = CurrentDate;
  return template(temp);
}

function saveFiles(contentHash, i, cb) {
  const key = Object.keys(contentHash)[i];
  const value = contentHash[key];
  i += 1;
  // . prefix important
  fs.writeFile(`.${key}`, value, (err) => {
    if (err) return console.log(err);
    console.log(`SAVED: ${key}`);
    if (i < Object.keys(contentHash).length) {
      return saveFiles(contentHash, i, cb);
    }
    return cb();
  });
}

function init(cb) {
  // Clean out detail page dir
  const deletedFiles = [];
  const dirname = '../detail-page';
  fs.readdir(dirname, (err, filenames) => {
    filenames.forEach((filename) => {
      console.log('Cleaning out detail page dir');
      fs.unlink(`${dirname}/${filename}`, (err) => {
        if (err) throw err;
        deletedFiles.push(filename);
        console.log(`successfully deleted ${filename}`);
        if (deletedFiles.length === filenames.length) getPageConfigs(cb);
      });
    });
    if (!filenames.length) {
      getPageConfigs(cb);
    }
  });
}

function getPageConfigs(cb) {
  console.log('getting detail page configs');
  const dirname = './detail-pages';
  fs.readdir(dirname, (err, filenames) => {
    filenames.forEach((filename) => {
      fs.readFile(`${dirname}/${filename}`, 'utf-8', (error, content) => {
        if (error) return null;
        detailPageConfigs.push(JSON.parse(content));
        if (detailPageConfigs.length === filenames.length) cb();
      });
    });
  });
}

function main() {
  const html = {};
  const categories = [];
  detailPageConfigs.forEach((detail, i) => {
    const url = `./detail-page/${friendlyUrl(detail.title)}.html`; // fileName
    html[url] = renderDetailPage(detail);
    const tempDetail = detail;
    detail.url = url;
    detail.id = i; // it can change each time, just for muri grid

    var category = tempDetail.category.toUpperCase();
    if(categories.indexOf(category) < 0){ // only unique cats plz
      categories.push(category)
    }
  });

  html['./index.html'] = renderHomePage(categories);
  html['./list.html'] = renderListView();

  saveFiles(html, 0, () => {
    console.log('\nDone.');
  });
}


init(main);

// Unused, might be needed

/* @params string,
    @params int,
*/
function abbreviate(inputString, k) {
  if (inputString.length > k) {
    const charactersAllowed = k - 3; // 3 for my dot dot dots
    return `${inputString.slice(0, charactersAllowed)}...`;
  }
  return inputString;
}
