const mongoose=require('mongoose');
const connect =mongoose.connect('mongodb+srv://shamanthshanbough:2WAPVyJG52M7ufSs@formdata.cyo3clp.mongodb.net/');
// shamanthshanbough
//2WAPVyJG52M7ufSs
// mongodb+srv://shamanthshanbough:2WAPVyJG52M7ufSs@formdata.cyo3clp.mongodb.net/?retryWrites=true&w=majority&appName=Formdata
// mongodb+srv://shamanthshanbough:2WAPVyJG52M7ufSs@formdata.cyo3clp.mongodb.net/

connect.then(()=>{
    console.log('database connected')
})

.catch(()=>{
    console.log('database not connected')
})

const Loginschema=new mongoose.Schema({
    name: {
    type:String,
    required:[true,'please provide name'],
     },
     Email:{
        type:String,
        required:[true],
     }
});

const collection=new mongoose.model('Form',Loginschema);
module.exports=collection;