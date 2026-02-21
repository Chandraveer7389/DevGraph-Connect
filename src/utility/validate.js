const validate = (req) => {
    const {firstName,lastName} = req;
    if(!firstName || !lastName) {
        throw new Error("No lastName or first Name");
    }
}
module.exports = {validate}