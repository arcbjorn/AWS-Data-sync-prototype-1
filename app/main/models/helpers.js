/* eslint-disable import/prefer-default-export */

exports.makeFilePath = (
  userId,
  name,
  cloudPath
) => {
  return cloudPath ? `${userId}/${cloudPath}` : `${userId}/${name}`;
}

exports.makeDirectoryPath = (
  userId,
  directoryPath
) => {
  return directoryPath ? `${userId}/${directoryPath}/` : `${userId}/`;
}
