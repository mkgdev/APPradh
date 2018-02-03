var router = require('express').Router();



router.get('/map', function(req,res)
    {

     res.render('map');

    }
);

module.exports = router;
