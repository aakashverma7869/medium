let index = (req, res) => {
    res.render("index");
}
let login = (req, res) => {
    res.render("LoginPage");
}


module.exports = {
    index:index,
    login:login
}