const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))

app.get('/calculator',function(req,res){
    res.sendfile(__dirname+'/views/file.html');
});

app.post('/calculator',function(req,res){
    var user =(req.body.v1)
    var ListOfElement = [];
    var number = '';
    var opration = '';
    var True = true;
    var ListOfElementop=['**','/','*','-','+']
    var i = 0;
    while (i<user.length){
        if (user[i] == '*' && user[i+1] == '*'){
            opration += user[i];
        }else if ((user[i] == '-' || user[i] == '+' || user[i] == '*' || user[i] == '/') && True){
            opration += user[i]
            ListOfElement.push(parseInt(number));
            ListOfElement.push(opration);
            number ='';
            opration ='';
            True = false;
        }else{
            number += user[i];
            True = true;
        }
        i++
    }
    
    ListOfElement.push(parseInt(number))
    var OprationConditions = false;
    var NewNumber
    while (true){
        if (ListOfElement.length==1){
            break
        }
        
        var j=0
        while (j < ListOfElementop.length){
            i=0
            while(i<ListOfElement.length){
                if (ListOfElement[i]==ListOfElementop[j]){
                    break
                }
                i++ 
                
            }
            if(i<ListOfElement.length){
            break
            }
            j++;
        }
        var oprator = (ListOfElement[i])
        if (oprator == '**'){
            NewNumber = (ListOfElement[i-1]) ** (ListOfElement[i+1])
            OprationConditions = true;
        }else if(oprator == '/'){
            NewNumber = (ListOfElement[i-1]) / (ListOfElement[i+1])
            OprationConditions = true;
        }else if (oprator == '*' ){
            NewNumber = (ListOfElement[i-1]) * (ListOfElement[i+1])
            OprationConditions = true;
        }else if (oprator == '-' ){
            NewNumber = (ListOfElement[i-1]) - (ListOfElement[i+1])
            OprationConditions = true;
        }else if(oprator == '+' ){
            NewNumber = (ListOfElement[i-1]) + (ListOfElement[i+1])
            OprationConditions = true;
        }
        if (OprationConditions){
                ListOfElement.splice(i-1,3,Number(NewNumber))
                OprationConditions = false;
            }
        }

    
    res.send('<h1 style="color: green">  Your Answer is '+ListOfElement[0]+'</h1>')
})

app.listen(2020,()=>{
    console.log(' ** Working..! **')
});