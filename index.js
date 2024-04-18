const express = require('express');
const collection = require('./Config');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/Login', async (req, res) => {
    const data = {
        name: req.body.name,
        Email: req.body.Email
    };
    const userdata = await collection.insertMany(data);
    console.log(data);
});

app.get('/Users', async (req, res) => {
    try {
        const users = await collection.find({});
        res.render('Users', { users });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Error fetching user data');
    }
});

app.get('/UserData', async (req, res) => {
    try {
        const users = await collection.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/Update/:id', async (req, res) => {
    try {
        const { name, Email } = req.body;
        const userId = req.params.id;    
        // Check if both name and Email are provided
        if (!name || !Email) {
            return res.status(400).send('Name and Email are required');
        }
        // Find the user by ID and update the fields
        const user = await collection.findOneAndUpdate(
            { _id: userId },
            { $set: { name, Email } }, // Use $set to update specific fields
            { new: true }
        );
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.redirect('/Users');
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).send('Error updating user data');
    }
});

app.get('/Update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).send('User ID is missing');
        }
        const user = await collection.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('Update', { userId: userId, user: user });
    } catch (error) {
        console.error('Error rendering update page:', error);
        res.status(500).send('Error rendering update page');
    }
});

app.delete('/Delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        // Find the user by ID and delete it
        const deletedUser = await collection.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});


app.listen(3000, () => {
    console.log('SERVER CONNECTED SUCCESSFULLY');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/Update', (req, res) => {
    res.render('Update');
});








// const express=require('express');
// const collection=require('./Config');

// const app=express();

// app.set('view engine','ejs');
// app.use(express.json());
// app.use(express.urlencoded({extended:false })); 

// app.post('/Login',async(req,res)=>{
//     const data={
//         name: req.body.name,
//         Email: req.body.Email
//     }
//     const userdata  =await collection.insertMany(data)
//     console.log(data);
// })

// app.get('/UserData', async (req, res) => {
//     try {
//         // Retrieve user data from the database (e.g., using Mongoose)
//         const users = await collection.find({});
//         // Send the user data back as a JSON response
//         res.json(users);
//     } catch (error) {
//         // If there is an error, send back a 500 status with the error message
//         res.status(500).json({ error: error.message });
//     }
// });

// app.put('/Update/:id', async (req, res) => {
//     try {
//         // Retrieve form data from the request
//         const { name, Email } = req.body;
//         const userId = req.params.id;
//         // Update the user's information in the database
//         // Example using Mongoose:
//         const user = await collection.findOneAndUpdate({ _id: userId }, { name, Email }, { new: true });
//         // Redirect the user to the "/Users" page with the updated data
//         res.redirect('/Users');
//     } catch (error) {
//         // Handle errors (e.g., display error message)
//         console.error('Error updating user data:', error);
//         res.status(500).send('Error updating user data');
//     }
// });

// // app.post('/Update', async (req, res) => {
// //     try {
// //         // Retrieve form data from the request
// //         const { name, Email } = req.body;

// //         // Update the user's information in the database
// //         // Example using Mongoose:
// //         const user = await collection.findOneAndUpdate({ _id: req.user.id }, { name, Email }, { new: true });

// //         // Redirect the user to the "/Users" page with the updated data
// //         res.redirect('/Users');
// //     } catch (error) {
// //         // Handle errors (e.g., display error message)
// //         console.error('Error updating user data:', error);
// //         res.status(500).send('Error updating user data');
// //     }
// // });
// app.get('/Update/:id', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         res.render('Update', { userId });
//     } catch (error) {
//         console.error('Error rendering update page:', error);
//         res.status(500).send('Error rendering update page');
//     }
// });


// app.listen(3000,()=>{
// console.log('SERVER CONNECTED SUCCESSFULLY');  
// })

// app.get('/',(req,res)=>{
// res.render('login');
// })

// app.get('/Users',(req,res)=>{
//     res.render('Users');
// })


// app.get('/Update',(req,res)=>{
//     const userId = req.params.id;
//     res.render('Update');
// })



