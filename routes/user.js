var express = require("express");
var exe = require("../conn");

var router = express.Router();

/* HOME */
router.get("/", (req, res) => {
    res.render("user/home.ejs");  
});

/* PACKAGES */
router.get("/packages",async (req,res)=>{
    var sql ="SELECT * FROM packages";
    var packages = await exe(sql);   // packages data
    res.render("user/packages.ejs", { packages });
    });

/* BLOGS */
router.get("/blogs", async (req,res)=>{

    var sql = "SELECT * FROM blogs ORDER BY blog_id DESC";
    var blogs = await exe(sql);   // blogs data
    res.render("user/blogs.ejs", {
        blogs: blogs
    });
});


router.get("/blog/:id", async (req, res) => {
    var blogId = req.params.id;
    var sql = "SELECT * FROM blog WHERE blog_id = ?";
    var blogs = await exe(sql, [blogId]);
    if (blogs.length > 0) {
        res.render("user/edit_blog.ejs", {
            blog: blogs[0]
        });
    } else {
        res.status(404).send("Blog not found");
    }   
}); 




/// VIEW CATEGORIES (USER SIDE)
router.get("/categories", (req, res) => {
    exe("SELECT * FROM travel_categories ORDER BY id DESC").then(categories => {
        res.render("user/categories.ejs", { categories });
    });
});

/* GALLERY */
router.get("/gallery", (req,res)=>{
    res.render("user/gallery.ejs");
});

/* ABOUT */
router.get("/about", (req,res)=>{
    res.render("user/about.ejs");
});

/* CONTACT */
router.get("/contact", (req,res)=>{
    res.render("user/contact.ejs");
});

/* BOOKING PAGE */
router.get("/booking", (req,res)=>{
    res.render("user/booking.ejs", {
        success : req.query.success
    });
});

/* SUBMIT REQUEST */
router.post("/submit_request", async (req,res)=>{

    var { fullName, email, mobileNumber, travelDate } = req.body;

    var sql = `
        INSERT INTO travel_requests
        (full_name, email, mobile_number, travel_date)
        VALUES (?, ?, ?, ?)
    `;

    await exe(sql, [fullName, email, mobileNumber, travelDate]);

    res.redirect("/user/booking?success=1");
});

/* GAO PAGE */
router.get("/gao", (req,res)=>{
    res.render("user/gao.ejs");
});

router.get("/kerala", (req,res)=>{
    res.render("user/kerala.ejs");
});

router.get("/dubai", (req, res) => {
    res.render("user/dubai.ejs");
});





// VIEW CATEGORIES (USER SIDE)
router.get("/categories", async (req, res) => {
    try {
        // DB मधून सर्व categories fetch करा
        const categories = await exe("SELECT * FROM travel_categories ORDER BY id DESC");

        // Render user/categories.ejs आणि categories पास करा
        res.render("user/categories.ejs", { categories });
    } catch (err) {
        console.error(err);
        res.send("Error loading categories");
    }
});

// CONTACT PAGE
router.get("/contact", (req, res) => {
    res.render("user/contact.ejs", {
        success: req.query.success
    });

});



// ADD NEW CONTACT REQUEST
router.post("/contact", async (req, res) => {

    var {
        firstName,
        lastName,
        email,
        phone,
        destination,
        travelDate,
        travelers,
        budget,
        message
    } = req.body;

    var sql = `
        INSERT INTO contact_requests
        (first_name, last_name, email, phone, destination, travel_date, travelers, budget, message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await exe(sql, [
        firstName,
        lastName,
        email,
        phone,
        destination,
        travelDate,
        travelers,
        budget,
        message
    ]);

    res.redirect("/user/contact?success=1");
    
});







module.exports = router;