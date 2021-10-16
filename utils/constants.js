const errorCodes = {
  BAD_REQUEST_ERROR: 400,
  AUTHENTICATION_ERROR: 401,
  AUTHORIZATION_ERROR: 403,
  RESOURCE_NOT_FOUND_ERROR: 404,
  CONFLICTS_ERROR: 409,
  INTERNAL_SERVER_ERROR: 500
}

const successCodes = {
  REQUEST_SUCCESS: 200,
  RESOURCE_CREATED_SUCCESS: 201
}

const regExpUrl = /ht{2}ps?:\/\/(w{3}\.)?[\w\-]+\.[a-z]{1,3}([\.\/][^\.\/][\w\-\.~:\/\?#\[\]@!\$\&\'\(\)\*\+\,\;\=]*)?#?$/;

module.exports = {
  errorCodes,
  successCodes,
  regExpUrl
}