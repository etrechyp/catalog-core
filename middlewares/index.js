const  fieldValidator = require('../middlewares/validateFields');
const  JWTValidator = require('../middlewares/validate-jwt');
const  RoleValidator = require('../middlewares/validate-role');
const validateFile = require('../middlewares/validate-file')

module.exports = {
    ...fieldValidator,
    ...JWTValidator,
    ...RoleValidator,
    ...validateFile
}