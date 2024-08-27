const parseLetters = (str,letters_number) =>{
    return str.split(" ").map((st)=> st[0]).slice(0,letters_number).join("");
}
const trimText = (str,count) =>{
    return str.length > count?str.substring(0,count).concat("..."):str;
}
const convertSeconds = (miliseconds) => {
    var hours, minutes, seconds, total_hours, total_minutes, total_seconds;
    
    total_seconds = miliseconds;
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
  
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);
    
    return hours+":"+minutes+":"+seconds;
  };
const ts = (date = false) =>{
    return date?new Date(date).getTime():new Date().getTime();
}
const isTaskAssingnedOn = (task,userid)=>{
    return task.user && task.user[0] && task.user[0].id === userid;
}

export {isTaskAssingnedOn,parseLetters,trimText,convertSeconds,ts};