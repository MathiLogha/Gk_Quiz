var mongoose = require('mongoose');
var express = require('express');
var bp = require('body-parser');
var app = express();
var PORT = 3001;

app.use(bp.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
})

app.listen(PORT,()=>{
    console.log(`Server is working at ${PORT}`);
});


app.post('/answer', async function(req,res){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/quiz',
        {
            useNewUrlParser:true});
            console.log('Connected to database') ;
            const schema = new mongoose.Schema({
                Ques_No : {
                    type : Number,
                    required : true
                },
                Ans : {
                    type : String,
                    required : true
                }
            });
                   
                  
    const table = mongoose.model('questions1', schema);

    const ques1 = await table.find({Ques_No : 1});
    const ques2 = await table.find({Ques_No : 2});
    const ques3 = await table.find({Ques_No : 3});
    const ques4 = await table.find({Ques_No : 4});
    const ques5 = await table.find({Ques_No : 5});

    const val1 = req.body.q1;
    const val2 = req.body.q2;
    const val3 = req.body.q3;
    const val4 = req.body.q4;
    const val5 = req.body.q5;

    const ans1 = ques1.find((a) => a.Ans === val1);
    const ans2 = ques2.find((a) => a.Ans === val2);
    const ans3 = ques3.find((a) => a.Ans === val3);
    const ans4 = ques4.find((a) => a.Ans === val4);
    const ans5 = ques5.find((a) => a.Ans === val5);

    if (ans1 && ans2 && ans3 && ans4 && ans5)
    {
      res.send('5 out of 5 --- All answers are correct :)!!');
    } 
    else if((ans1 && ans2 && ans3 && ans4 && !ans5) || (ans1 && ans2 && ans3 && !ans4 && ans5) || (ans1 && ans2 && !ans3 && ans4 && ans5)||(ans1 && !ans2 && ans3 && ans4 && ans5) ||(!ans1 && ans2 && ans3 && ans4 && ans5))
    {
      res.send('4 out of 5');
    }
    else if((ans1 && ans2 && ans3 && !ans4 && !ans5) || (ans1 && ans2 && !ans3 && ans4 && !ans5) || (ans1 && ans2 && !ans3 && !ans4 && ans5) || (!ans1 && ans2 && ans3 && ans4 && !ans5)|| (!ans1 && ans2 && ans3 && !ans4 && ans5)|| (!ans1 && !ans2 && ans3 && ans4 && ans5))
    {
      res.send('3 out of 5');
    }
    else if((ans1 && ans2 && !ans3 && !ans4 && !ans5) || (ans1 && !ans2 && ans3 && !ans4 && !ans5) ||(ans1 && !ans2 && !ans3 && ans4 && !ans5) || (ans1 && !ans2 && !ans3 && !ans4 && ans5)|| (!ans1 && ans2 && ans3 && !ans4 && !ans5)|| (!ans1 && ans2 && !ans3 && ans4 && !ans5) || (!ans1 && ans2 && !ans3 && !ans4 && ans5) || (!ans1 && !ans2 && ans3 && ans4 && !ans5)|| (!ans1 && !ans2 && ans3 && !ans4 && ans5)|| (!ans1 && !ans2 && !ans3 && ans4 && ans5))
    {
      res.send('2 out of 5');
    }
    else if((ans1 && !ans2 && !ans3 && !ans4 && !ans5) || (!ans1 && ans2 && !ans3 && !ans4 && !ans5) || (!ans1 && !ans2 && ans3 && !ans4 && !ans5) || (!ans1 && !ans2 && ans3 && !ans4 && !ans5) || (!ans1 && !ans2 && !ans3 && ans4 && !ans5) || (!ans1 && !ans2 && !ans3 && !ans4 && ans5))
    {
      res.send('1 out of 5');
    }
    else
    {
      res.send('All Answers Are Wrong :(');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to database');
  }
});