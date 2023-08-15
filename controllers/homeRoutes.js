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
router.get("/logout", async(req,res)=>{
    try {
        if (req.session.logged_in) {
          req.session.destroy((err) => {
            if (err) {
              console.error('Error destroying session:', err);
              res.status(500).json({ message: 'Internal server error' });
            } else {
              // Redirect to a different page after logout
              res.redirect('/login'); // Change '/login' to the desired redirect URL
            }
          });
        } else {
          res.status(404).json({ message: 'Session not found' });
        }
      } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    res.render("logout")
})
// router.get("/", async(req,res)=>{

//     res.render()
// })
// router.get("/", async(req,res)=>{

//     res.render()
// })

module.exports = router;