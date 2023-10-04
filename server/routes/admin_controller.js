const pool = require('./db');
const bcrypt = require('bcrypt');

//PRODUCTS

getProducts = (req, res) =>{
    pool.query("SELECT * FROM products", (error, result) => {
        if(error) throw error;

        res.status(200).json(result.rows.sort((a, b)=> a.id - b.id));
    });
};

addProduct = (req, res) =>{
    const {name, price, age_type, gender, color, images, brand, slug} = req.body;

    pool.query("INSERT INTO products (name, price, age_type, gender, color, images, brand, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [name, price, age_type, gender, color, images, brand, slug], (error, result) => {
        if(error) throw error;

        res.status(201).json(result.rows[0]);
    });
};

editProduct = (req, res) =>{
    const {name, price, age_type, gender, color, images, brand, slug} = req.body;
    const id = parseInt(req.params.id);

    pool.query("UPDATE products SET name = $1, price = $2, age_type = $3, gender = $4, color = $5, images = $6, brand = $7, slug = $8 WHERE id = $9 RETURNING *", [name, price, age_type, gender, color, images, brand, slug, id], (error, result) => {
        if(error) throw error;

        res.status(200).json(result.rows[0]);
    });
};

deleteProduct = (req, res) =>{
    const id = parseInt(req.params.id);

    pool.query("DELETE FROM products WHERE id = $1", [id], (error, result) => {
        if(error) throw error;

        res.status(200).send("Deleted.");
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////


//ACCOUNTS

getAccounts = (req, res) =>{
    pool.query("SELECT * FROM accounts", (error, result) => {
        if(error) throw error;

        res.status(200).json(result.rows.sort((a, b)=> a.id - b.id));
    });
};

isAdmin = (req, res) =>{
    if(req.user.id)
    {
        pool.query("SELECT * FROM accounts WHERE id = $1", [req.user.id], (error, result) => {
            if(error) throw error;

            if(result.rows[0].is_admin)
            {
                res.status(200).json({isAdmin: true});
            }
            else
            {
                req.logOut(()=>{
                    res.status(200).json({isAdmin: false});
                });
            }
        });
    }
    else res.status(200).send("not admin");
}

addAccount = async (req, res) =>{
    const {firstName, lastName, email, password, isAdmin} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query("INSERT INTO accounts (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *", [firstName, lastName, email, hashedPassword, isAdmin], (error, result) => {
        if(error) throw error;

        pool.query("INSERT INTO profiles (user_id, name, tel_nr, country, city, address, zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7)", [result.rows[0].id, `${firstName} ${lastName}`, null, null, null, null, null], (error, result) => {
            if(error) throw error;
        });

        res.status(201).json(result.rows[0]);
    });
};

editAccount = async (req, res) =>{
    const {firstName, lastName, email, password, isAdmin} = req.body;
    const id = parseInt(req.params.id);
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query("UPDATE accounts SET first_name = $1, last_name = $2, email = $3, password = $4, is_admin = $5 WHERE id = $6 RETURNING *", [firstName, lastName, email, hashedPassword, isAdmin, id], (error, result) => {
        if(error) throw error;

        res.status(200).json(result.rows[0]);
    });
};

deleteAccount = (req, res) =>{
    const id = parseInt(req.params.id);

    pool.query("DELETE FROM accounts WHERE id = $1", [id], (error, result) => {
        if(error) throw error;

        pool.query("DELETE FROM profiles WHERE user_id = $1", [id], (error, result) => {
            if(error) throw error;
    
        });

        res.status(200).send("Deleted.");
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////


//PROFILES

getProfiles = (req, res) =>{
    pool.query("SELECT * FROM profiles", (error, result) => {
        if(error) throw error;

        res.status(200).json(result.rows.sort((a, b)=> a.id - b.id));
    });
};


editProfile = (req, res) =>{
    const {tel_nr, country, city, address, zip_code} = req.body;
    const id = parseInt(req.params.id);

    pool.query("UPDATE profiles SET tel_nr = $1, country = $2, city = $3, address = $4, zip_code = $5 WHERE id = $6 RETURNING * ", [tel_nr, country, city, address, zip_code, id], (error, result) => {
        if(error) throw error;

        res.status(200).json(result.rows[0]);
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
    getAccounts,
    isAdmin,
    addAccount,
    editAccount,
    deleteAccount,
    getProfiles,
    editProfile
};