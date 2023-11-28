const express= require("express");
const get_route= express();

const user_controller= require("../controllers/userController");


get_route.set('view engine', 'ejs');
get_route.set('views', "./views/users");
//get_route.set('views', __dirname + '/views/users');

const bodyParser= require("body-parser");
get_route.use(bodyParser.json());
get_route.use(bodyParser.urlencoded({extended: true}));
const auth= require("../middleware/auth");

const multer= require("multer");
const path= require("path");


get_route.use(express.static('public'));

const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/productImages'), function(err, success){

            if(err){
                throw err
            }

        });
    },
    
    filename: function(req, file, cb){

        const name= Date.now()+'-'+file.originalname;
        cb(null, name, function(error, success){

            if(error){
                throw error
            }

        });

    }
});

const upload= multer({storage: storage});



get_route.post('/register', user_controller.register_user);
get_route.post('/login', user_controller.user_login);
get_route.post('/logout', auth, user_controller.logout);
get_route.post('/logout/:token', auth, user_controller.logoutone);
get_route.get('/getuser', user_controller.getuser);
get_route.post('/reset/:token', auth, user_controller.resetpassword);
get_route.post('/forget', user_controller.forget_password);
//get_route.get('/get-imagebyid/:id', auth, user_controller.getimagebyid);

//review_routes.post('/updatereview', ratecontroller.updatereviewp);

get_route.get('/resetpassword', user_controller.emailforgot);
//get_route.post('/resetpassword', user_controller.e);
get_route.post('/resetpassword', user_controller.forgetuser);


module.exports= get_route;

// const auth= require("../middleware/auth");
// product_route.post('/add-product', upload.array('images', 8), auth, product_controller.addproduct);
//get_route.get('/get-data', user_controller.product);