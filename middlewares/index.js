const  JWTValidator = require('../middlewares/validate-jwt');
const  RoleValidator = require('../middlewares/validate-role');

module.exports = {
    ...JWTValidator,
    ...RoleValidator,
}