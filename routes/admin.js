var express = require("express");
var exe = require("../conn");
var router = express.Router();

function checklogin(req,res,next){
    if(req.session.admin){
        next();
    }else{
        res.redirect("/admin/welcome_admin")
    }   
}


router.get("/welcome_admin", (req, res) =>{
    res.render("admin/welcome_admin.ejs");
});

router.get("/login", (req, res) =>{
    res.render("admin/login.ejs");
});



/* LOGIN PROCESS */
router.post("/login_process",async function(req,res){
    var data = req.body;
    if(!data.admin_email || !data.admin_password) {
        return res.render("login.ejs"); // just reload login without error
    }
    var sql = `SELECT * FROM admin WHERE admin_email = ? AND admin_password = ?`;
    var result = await exe(sql,[data.admin_email, data.admin_password]);
    if(result.length > 0){
        req.session.id = result[0].admin_id;
        req.session.success =  "Login Successful! 🎉";
        res.redirect("/admin/home");
    }else{
        res.render("/admin", { error: "Invalid Mobile or Password" });
    }
});

router.get("/", checklogin, (req, res) =>{
    res.render("admin/welcome_admin.ejs");
});
router.get("/home", checklogin, (req, res) =>{
    res.render("admin/home.ejs");
});

router.get("/dashboard", checklogin, (req, res) =>{
    res.render("admin/dashboard.ejs");
});

router.get("/destinations", checklogin, (req, res) => {
    res.render("admin/destinations.ejs");
});



// Travel Requests Table
router.get("/booking",checklogin, (req, res) => {
    var sql = "SELECT * FROM travel_requests ORDER BY travel_id DESC";

    exe(sql).then(requests => {
        res.render("admin/booking.ejs", { requests, success: req.query.success });
    });
});

// DELETE TRAVEL REQUEST
router.get("/booking/delete/:id", async (req, res) => {
    var travel_id = req.params.id;
    var sql = "DELETE FROM travel_requests WHERE travel_id = ?";
    await exe(sql, [travel_id]);
    res.redirect("/admin/booking");
});


// ADD NEW TRAVEL REQUEST
router.post("/add_travel_request", async (req, res) => {
    var { fullName, email, mobileNumber, travelDate } = req.body;

    var sql = `
        INSERT INTO travel_requests (full_name, email, mobile_number, travel_date)
        VALUES (?, ?, ?, ?)
    `;

    await exe(sql, [fullName, email, mobileNumber, travelDate]);
    res.redirect("/admin/booking?success=1");
});

// BLOG LIST PAGE
router.get("/blog", checklogin,  async (req, res) => {

    var sql = "SELECT * FROM blogs ORDER BY blog_id DESC";
    var blogs = await exe(sql);   // blogs data

    res.render("admin/blog.ejs", {
        blogs: blogs
    });
});

router.post("/add_blog", async function (req, res) {

  let filename = "";

  // image upload
  if (req.files && req.files.blog_image) {
    filename = Date.now() + "_" + req.files.blog_image.name;
    req.files.blog_image.mv("public/assets/images/" + filename);
  }

  const data = req.body;

  const sql = `
    INSERT INTO blogs
    (blog_title, blog_publish_date, blog_short_description, blog_full_description, blog_image)
    VALUES (?,?,?,?,?)
  `;

  await exe(sql, [
    data.blog_title,
    data.blog_publish_date,
    data.blog_short_description,
    data.blog_full_description,
    filename
  ]);

  res.redirect("/admin/blog?success=1");
});

// DELETE BLOG
router.get('/delete_blog/:id', async (req, res) => {

    var blog_id = req.params.id;

    // Safety check
    if (!blog_id) {
        return res.redirect('/admin/blog');
    }

    var sql = "DELETE FROM blogs WHERE blog_id = ?";
    await exe(sql, [blog_id]);

    res.redirect('/admin/blog?deleted=1');
});

// SHOW EDIT FORM

router.get("/edit-blog/:id", async (req, res) => {

    const blog_id = req.params.id;

    const sql = "SELECT * FROM blogs WHERE blog_id = ?";
    const blogs = await exe(sql, [blog_id]);

    if (blogs.length > 0) {

        let publishDate = "";
        if (blogs[0].blog_publish_date) {
            publishDate = new Date(blogs[0].blog_publish_date)
                .toISOString()
                .split("T")[0];
        }

        res.render("admin/edit_blog", {
            blog: blogs[0],
            publishDate
        });

    } else {
        res.send("Blog not found");
    }
});



router.post("/update_blog/:id", async (req, res) => {

    const blog_id = req.params.id;

    // old image fetch
    const old = await exe(
        "SELECT blog_image FROM blogs WHERE blog_id = ?",
        [blog_id]
    );

    let filename = old[0].blog_image;

    // new image upload
    if (req.files && req.files.blog_image) {
        filename = Date.now() + "_" + req.files.blog_image.name;
        req.files.blog_image.mv("public/assets/images/" + filename);
    }

    const {
        blog_title,
        blog_short_description,
        blog_full_description,
        blog_publish_date
    } = req.body;

    const sql = `
        UPDATE blogs SET
            blog_title = ?,
            blog_short_description = ?,
            blog_full_description = ?,
            blog_image = ?,
            blog_publish_date = ?
        WHERE blog_id = ?
    `;

    await exe(sql, [
        blog_title,
        blog_short_description,
        blog_full_description,
        filename,
        blog_publish_date,
        blog_id
    ]);

    res.redirect("/admin/blog?updated=1");
});





// Categories Page (Admin)
router.get("/categories", checklogin, async (req, res) => {
    try {
        const categories = await exe("SELECT * FROM travel_categories ORDER BY id DESC");
        res.render("admin/categories.ejs", { categories });
    } catch (err) {
        console.error(err);
        res.send("Error loading categories");
    }
});

// Save Category
router.post("/categories/add", async (req, res) => {
    try {
        let filename = "";

        if (req.files && req.files.image) {
            filename = Date.now() + "_" + req.files.image.name;
            await req.files.image.mv("public/assets/images/" + filename);
        }

        const { category_name, description } = req.body;

        const sql = `
            INSERT INTO travel_categories (category_name, description, image)
            VALUES (?, ?, ?)
        `;

        await exe(sql, [category_name, description, filename]);

        res.redirect("/admin/categories");
    } catch (err) {
        console.error(err);
        res.send("Error adding category");
    }
});

// Delete Category
router.get("/categories/delete/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;   
        const sql = "DELETE FROM travel_categories WHERE id = ?";
        await exe(sql, [categoryId]);
        res.redirect("/admin/categories");
    } catch (err) {
        console.error(err);
        res.send("Error deleting category");
    }   
});

// Show Edit Category Form
router.get("/categories/edit/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;   
        const sql = "SELECT * FROM travel_categories WHERE id = ?";
        const categories = await exe(sql, [categoryId]);
        if (categories.length > 0) {
            res.render("admin/edit-category", { category: categories[0] });
        } else {
            res.send("Category not found");
        }
    } catch (err) {
        console.error(err);
        res.send("Error loading category");
    }
});

// Update Category

router.post("/update-category/:id", async (req, res) => {
    const categoryId = req.params.id;   
    const old = await exe(
        "SELECT image FROM travel_categories WHERE id = ?",
        [categoryId]
    );

    let filename = old[0].image;
    if (req.files && req.files.image) {
        filename = Date.now() + "_" + req.files.image.name;
        req.files.image.mv("public/assets/images/" + filename);
    }
    const { category_name, description } = req.body;

    const sql = `
        UPDATE travel_categories SET
            category_name = ?,
            description = ?,
            image = ?
        WHERE id = ?
    `;
    await exe(sql, [
        category_name,
        description,    
        filename,
        categoryId
    ]);
    res.redirect("/admin/categories");
}
);;






// SHOW ALL CONTACT REQUESTS
router.get("/contact",checklogin, async (req, res) => {

    var sql = "SELECT * FROM contact_requests ORDER BY id DESC";

    var data = await exe(sql);

    res.render("admin/contact_list", {
        data: data
    });
});

router.get("/contact/delete/:id", async (req, res) => {

    var id = req.params.id;
    var sql = "DELETE FROM contact_requests WHERE id = ?";

    await exe(sql, [id]);
    res.redirect("/admin/contact");
});

router.get("/packages",checklogin, async(req, res) =>{
   
    var sql ="SELECT * FROM packages";
    var packages = await exe(sql);  
    
    // packages data
    var packet = {packages};



    res.render("admin/packages.ejs",packet);
});

router.post("/packages",checklogin, async (req, res) => {
    let filename = "";
    // image upload
    if (req.files && req.files.package_image) {
      filename = Date.now() + "_" + req.files.package_image.name;
      req.files.package_image.mv("public/assets/images/" + filename);
    }
    const data = req.body;
    const sql = `
      INSERT INTO packages
        (package_title, short_description, total_days, total_nights, location, dublicate_price, price, package_image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await exe(sql, [
      data.package_title,
      data.short_description,
      data.total_days,
      data.total_nights,
      data.location,
      data.dublicate_price,
      data.price,
      filename
    ]);
    res.redirect("/admin/packages?success=1");
  });

 router.get("/packages/delete/:id", async (req, res) => {
    var id = req.params.id;
    var sql = "DELETE FROM packages WHERE package_id = ?";
    await exe(sql, [id]);
    res.redirect("/admin/packages");
});

router.get("/packages/edit/:id", async (req, res) => {
    const package_id = req.params.id;
    const sql = "SELECT * FROM packages WHERE package_id = ?";
    const packages = await exe(sql, [package_id]);
    if (packages.length > 0) {
        res.render("admin/edit_packages.ejs", {
            package: packages[0]
        });
    } else {
        res.send("Package not found");
    }
});

router.post("/packages/update/:id", async (req, res) => {   
    const package_id = req.params.id;
    // old image fetch
    const old = await exe(
        "SELECT package_image FROM packages WHERE package_id = ?",
        [package_id]
    );
    let filename = old[0].package_image;
    // new image upload
    if (req.files && req.files.package_image) {
        filename = Date.now() + "_" + req.files.package_image.name;
        req.files.package_image.mv("public/assets/images/" + filename);
    }
    const {
        package_title,
        short_description,
        total_days,
        total_nights,
        location,
        dublicate_price,
        price
    } = req.body;
    const sql = `
        UPDATE packages SET
            package_title = ?,
            short_description = ?,
            total_days = ?,
            total_nights = ?,
            location = ?,
            dublicate_price = ?,
            price = ?,
            package_image = ?
        WHERE package_id = ?
    `;
    await exe(sql, [
        package_title,
        short_description,
        total_days,
        total_nights,
        location,
        dublicate_price,
        price,
        filename,
        package_id
    ]);
    res.redirect("/admin/packages");
});

router.get("/gallery", async (req, res) => {
    var sql = "SELECT * FROM gallery";

    var gallery = await exe(sql);

    res.render("admin/gallery.ejs", { gallery });
});

router.post("/gallery",checklogin,  async (req, res) => {
    try {
        let filename = null;

        // If file upload via req.files (using express-fileupload or similar)
        if (req.files && req.files.image_file) {
            filename = Date.now() + "_" + req.files.image_file.name;
            await req.files.image_file.mv("public/assets/images/" + filename);
        }

        var { image_title } = req.body;

        // Check for missing fields: image_title and filename (file was not uploaded)
        if (!image_title || !filename) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const sql = `
            INSERT INTO gallery (image_title, image_file)
            VALUES (?, ?)
        `;
        await exe(sql, [image_title, filename]);

        res.redirect("/admin/gallery?success=1");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

// DELETE GALLERY IMAGE
router.get("/gallery/delete/:id", async (req, res) => {
    var id = req.params.id;
    var sql = "DELETE FROM gallery WHERE gallery_id = ?";
    await exe(sql, [id]);
    res.redirect("/admin/gallery");
});

router.get("/gallery/edit/:id", async (req, res) => {
    try {
        const galleryId = req.params.id;
        const sql = "SELECT * FROM gallery WHERE gallery_id = ?";
        const images = await exe(sql, [galleryId]);
        if (images.length > 0) {
            res.render("admin/edit-gallery", { image: images[0] });
        }
            else {
            res.send("Image not found");
        }
    } catch (err) {
        console.error(err);
        res.send("Error loading image");
    }
});

// UPDATE GALLERY IMAGE
router.post("/gallery/update/:id", async (req, res) => {
    const galleryId = req.params.id;
    const old = await exe(  
        "SELECT image_file FROM gallery WHERE gallery_id = ?",
        [galleryId]
    );
    let filename = old[0].image_file;
    if (req.files && req.files.image_file) {
        filename = Date.now() + "_" + req.files.image_file.name;
        req.files.image_file.mv("public/assets/images/" + filename);
    }
    const { image_title } = req.body;
    const sql = `
        UPDATE gallery SET
            image_title = ?,
            image_file = ?
        WHERE gallery_id = ?
    `;
    await exe(sql, [
        image_title,
        filename,
        galleryId
    ]);
    res.redirect("/admin/gallery");
});

module.exports = router; 
