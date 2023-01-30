import * as fse from 'fs-extra';
import * as path from 'path';

//  Main IIFE function
(async () => {
  //  1. Add global paths
  //  If this file is moved, this paths have to be updated as well
  const LIBS_API_ROOT_PATH = `${__dirname}/../libs/api`;
  const LIBS_SHARED_ROOT_PATH = `${__dirname}/../libs/shared`;
  const LIBS_WEB_ROOT_PATH = `${__dirname}/../libs/web`;

  const API_APP_PREFIX = 'api';
  const WEB_APP_PREFIX = 'web';

  //  2. Check is api/web/shared top level
  await updateProjectJson(LIBS_SHARED_ROOT_PATH);
  await updateProjectJson(LIBS_API_ROOT_PATH, API_APP_PREFIX);
  await updateProjectJson(LIBS_WEB_ROOT_PATH, WEB_APP_PREFIX);
})();

/**
 * Recursively adds tags to nx libs depending on their location
 * @param currPath is starting point of lib search
 * @param appPrefix
 */
export async function updateProjectJson(currPath: string, appPrefix?: string): Promise<void> {
  const files = await fse.readdir(currPath);

  for (const fileOrDir of files) {
    const absolutePath = path.join(currPath, fileOrDir);
    const isDirectory = (await fse.stat(absolutePath)).isDirectory();

    if (isDirectory) {
      //  If directory, call self and repeat all the of the steps above
      await updateProjectJson(absolutePath, appPrefix);
    } else if (isFileProjectJson(fileOrDir)) {
      // if File & project.json file, get & set tags to the lib
      const tags = generateTags(absolutePath, appPrefix);

      await addTagsToTheProjectJson(tags, absolutePath);
    }
  }
}

/**
 * Checks if passed string is a project.json file
 * @param fileOrDir file or directory being checked if its named as a project.json
 */
function isFileProjectJson(fileOrDir: string) {
  const projectJson = 'project.json';

  return fileOrDir === projectJson;
}

/**
 * Creates tags depending on the url-path of a lib
 * @param absolutePath is full path to current lib
 * @param appPrefix
 */
function generateTags(absolutePath: string, appPrefix?: string): string[] {
  const defaultTags = ['data', 'middleware', 'logic', 'http', 'feature', 'core', 'util', 'ui', 'shell'];
  const tags: string[] = [];

  defaultTags.forEach(tag =>
    absolutePath.match(tag) ? tags.push(`type:${tag}`) : null,
  );

  if (appPrefix) {
    tags.push(`scope:${appPrefix}`);
  } else {
    tags.push(`scope:shared`);
  }

  return tags;
}

/**
 * Writes tags to the project.json file & prettifies the file afterwards
 * @param tags is collection of tags that is being written to the lib
 * @param projectJsonPath is a absolute path to the lib's project.json file
 */
async function addTagsToTheProjectJson(tags: string[], projectJsonPath: string): Promise<void> {
  const modifiedProjectJson = await fse.readJSON(projectJsonPath);

  modifiedProjectJson.tags = tags;

  await fse.writeJSON(projectJsonPath, modifiedProjectJson, { spaces: 2 });
}
