module.exports = {
  checkLogin,
  checkRegister
}

function checkRegister(req, res, next){
  const data = req.body
  if(!data.username || !data.password){
    res.status(401).json({message: "Please provide a field filled out for username, password AND deprtment"})
  } else {
    next();
  }
}

function checkLogin(req, res, next){
  const data = req.body;

  if(!data.username || !data.password){
    res.status(401).json({message: "Please provide username and password"})
  } else {
    next();
  }
}