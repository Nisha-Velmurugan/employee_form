const express =  require('express');
const mysql = require("mysql");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const hbs = require("hbs");


app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'emp_det',
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('success');
    }
})

const location =  path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");
app.get("/", (req,res)=>{
    //res.send("<h1>Hello</h1>");
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { name, employee_id, dept, gender, designation, salary } = req.body;

    console.log("Submitted data:", { name, employee_id, dept, gender, designation, salary });

    const sql = "INSERT INTO emptable (name, employee_id, department, gender, designation, salary) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, employee_id, dept, gender, designation, salary];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error storing form data in the database:", err);
            res.status(500).send("Error storing form data in the database");
        } else {
            const alertScript = "<script>alert('Form submitted');</script>";

            console.log("Form data stored in the database");

            res.status(200).send("Form data stored successfully");
        }
    });
});



app.listen(3000, ()=>{
    console.log("server started @ port 3000")
})