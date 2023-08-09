//localhost:3001/
const router = require('express').Router();

router.get("/", async(req,res) =>{

    //read your database

    const posts = [{
        name: "Hi",
        desc: "Lol"
    }, {
        name: "bie",
        desc: "Lo3423l"
    }  ]//get plain true

    res.render("homepage", {
        logged_in: req.session.logged_in,
        posts
    })
})

router.get("/login", async(req,res)=>{
    if (req.session.logged_in) {
        res.redirect('/');
        return;
      }
    res.render("login")
})

router.get("/dashboard", async(req,res)=>{

    res.render("dashboard", {
        logged_in: req.session.logged_in
})
})
// router.get("/", async(req,res)=>{

//     res.render()
// })
// router.get("/", async(req,res)=>{

//     res.render()
// })
// router.get("/", async(req,res)=>{

//     res.render()
// })

module.exports = router;