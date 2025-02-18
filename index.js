const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors({optionsSuccessStatus:200}));

app.use(express.static('/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
});

app.get('/api/:date?',(req,res)=>{
    const dateString = req.params.date;
    let newDate;
    if(!dateString){
        newDate = new Date();
    }else if(/\d{5,}/.test(dateString)){
        newDate = new Date(parseInt(dateString));
    }else{
        newDate = new Date(dateString);
    }

    if(isNaN(newDate)){
        return res.json({error:"Invalid date"});
    }else{
        return res.json({unix: newDate.getTime(), utc:newDate.toDateString()});
        
    }
});

const listern = app.listen(process.env.PORT || 3000,()=>{console.log(`App is listening on port ${listern.address().port} | ${listern.address()}`)});