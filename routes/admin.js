const express = require( "express");
const  upload = require  ("../config/multerConfig.js");
const adminController = require("../controllers/admin/adminController.js");
const OrderController = require("../controllers/admin/OrderController.js");

const  userController =  require("../controllers/admin/userController.js");
const  adminMiddleware  = require ("../middleware/adminMiddleware.js");
const router = express.Router();

router.use(adminMiddleware);

//Admin Routes
router.get("/",adminController.dashboard);
router.get("/orders",OrderController.index);
router.get("/add_order",OrderController.show);
router.post("/add_order",OrderController.store);
router.get("/invoice",OrderController.invoice);
router.get("/order_detail/:id",OrderController.order_detail);
router.get("/status/:id/:detail",OrderController.order_change);
// router.post("/genrate_pdf",OrderController.genrate_pdf);
//Category Rotes

//Products Routes




module.exports = router;