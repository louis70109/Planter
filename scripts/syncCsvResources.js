const fs = require('fs');
const path = require('path');

const jsonfile = require('jsonfile');
const parseCsv = require('csv-parse/lib/sync');
const globby = require('globby');

const tsvPaths = globby.sync('./resources/*.tsv');

const files = tsvPaths.map((tsvPath) => ({
  basename: path.basename(tsvPath, '.tsv'),
  file: fs.readFileSync(path.resolve(tsvPath), 'utf8'),
}));

const columnsFiles = ['plants'];

const parsedFiles = files.map(({ basename, file }) => ({
  basename,
  json: parseCsv(file, {
    columns: columnsFiles.includes(basename),
    delimiter: '\t',
  }),
}));

parsedFiles.forEach((parsedFile) => {
  jsonfile.writeFileSync(
    `./resources/${parsedFile.basename}.json`,
    parsedFile.json
  );
});
