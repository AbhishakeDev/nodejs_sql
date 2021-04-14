const express = require('express');
const mysql = require('mysql');

// Create connection 
//first create the db nodemysql without specifying database:nodemysql in the config and after createing it then add it here
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

//connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql connected');
})

const app = express();

//create db
app.get('/createdb', (req, res) => {
    let sql = 'Create database nodemysql';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Database created')
    })
})

//creating table

app.get('/createpoststable', (req, res) => {
    let sql = 'Create table posts(id int AUTO_INCREMENT,title varchar(255),body varchar(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post table created');
    })
})

//insert post 1 
app.get('/addpost1', (req, res) => {
    let post = { title: 'post 1', body: 'This is post nunber 1' }
    let sql = 'insert into posts SET ?';//the ? is the placeholder for post which we specify on the next line in query as second parameter
    let query = db.query(sql, post, (err, result) => {
        //post is the placeholder for the sql query which is the second param of this function
        if (err) throw err;
        console.log(result);
        res.send('Post 1 added');
    })
})


//insert post 2
app.get('/addpost2', (req, res) => {
    let post = { title: 'post 2', body: 'This is post nunber 2' }
    let sql = 'insert into posts SET ?';//the ? is the placeholder for post which we specify on the next line in query as second parameter
    let query = db.query(sql, post, (err, result) => {
        //post is the placeholder for the sql query which is the second param of this function
        if (err) throw err;
        console.log(result);
        res.send('Post 2 added');
    })
})


//select posts
app.get('/getposts', (req, res) => {
    let sql = 'select * from posts';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('posts fetched');
    })
})

//select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `select * from posts where id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post fetched');
    })
})

//update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'updated title';
    let sql = `UPDATE posts set title = '${newTitle}' where id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('posts updated');
    })
})

//delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `delete from posts where id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post deleted');
    })
})



app.listen('4', () => {
    console.log(`Server running on port 4`)
})