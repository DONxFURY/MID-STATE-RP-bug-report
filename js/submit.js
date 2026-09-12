function send(webhook, data){
fetch(webhook,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
});
}
