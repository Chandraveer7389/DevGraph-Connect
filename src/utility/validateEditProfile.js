const validateEditProfile = (req) => {
    const notAllowedUpdates = ["email","password"];
    const isEditAllowed = Object.keys(req.body).every((field) => !notAllowedUpdates.includes(field) )
    return isEditAllowed
}
module.exports = validateEditProfile