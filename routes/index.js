var router = require('express').Router();

var csv = require('fast-csv');

router.get('/map', function(req,res)
    {

     res.render('map');

    }
);

router.get('/mapLocation', function(req,res)
    {
        var flag =0;

        var locationData = [];

        var readCSV = function(){

            return new Promise(function(resolve,reject)
                    {

                        csv
                            .fromPath("data/data2.csv")                                 //Interative loop
                            .on("data", function(data){
                                // console.log(data);


                                if(flag)

                                    locationData.push(data);
                                flag = flag+1;

                            })
                            .on("end", function(){

                        console.log("done");
                        // console.log(locationData);
                        resolve(locationData);
                    });

            });


        }

        readCSV().then((locationData)=>{console.log(locationData)});
    }
);

module.exports = router;
