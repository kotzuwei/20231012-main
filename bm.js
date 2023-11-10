function bracketMatch(inputString){ //input一字串,output是否正確
    var stack = [];
    var idx = 0;
    var Bracket = {'{':'}', '[':']', '(':')', '<':'>'}; //儲存左右括弧的對應關係
    var flag = true; //紀錄有無match
    //var currentChar=inputString[0];//method 1
    var currentChar=inputString.charAt(0); //method 2 =字串索引值0的位子

    //loop
    while(currentChar != ''){
    //if(currentChar == '{' || currentChar=='[' || currentChar=='(') //m1
    if(Bracket[currentChar] != undefined){ //m2 if current有被bracket定義
        stack.push(currentChar); //if是左括弧 丟到stack
    }else if(currentChar == '}' || currentChar==']' || currentChar==')'){
            if(stack.length==0){ //is stack empty?
                flag = false; //flag變成1 unmatch
                break;//unmatch
            }else{
            var openBracket = stack.pop(); //抓出字串最後一個元素跟current比
            if(Bracket[openBracket] != currentChar){
                flag = false;
                break;
            }
            /*if(   openBracket == '{' && currentChar=='}' 
                || openBracket == '[' && currentChar==']' 
                || openBracket == '(' && currentChar==')'){
                    //match
                }
            else{
                //unmatch
                flag = false; //flag變成1 unmatch
                break;
            }*/
            } 
    }
    //next char
    currentChar = inputString.charAt(++idx); //++index
    }

    //true/false?
    if(stack.length==0 && flag){
        //match
        //console.log("Matched!")
        return true;
    
    }else{
        //unmatch
        //console.log("Unmatched!")
        return false;
    }
    
    /*
    if(stack.length==0 && idx == currentChar.length){ //next char = currentChar長度
    //match
    //console.log("Matched!")
    
    }else{
    //unmatch
    //console.log("Unmatched!")
    }

    if(stack.length==0 && currentChar == ' '){
    //match
    //console.log("Matched!")
    
    }else{
    //unmatch
    //console.log("Unmatched!")
    }
    */
}



if(bracketMatch("([])}")){
   console.log("Matched!")
}else{
   console.log("Unmatched!")
}

