const http= require('http')
const port =3033
const server=http.createServer(function(request,response){
    if(request.url=== '/'){
        response.end('welcome to the website')
    }
    else if(request.url==='/about'){
     response.end('welcome to about page')
    }
    else if (request.url ==='/users'){
        const users=[
            {id:1,name:'john'},
            {id:2, name:'steven'}
        ]
        response.end(JSON.stringify(users))
    }else if(request.url==='/sachin'){
        response.end('welcome home Jesus Christ')
    }else if(request.url==='/sys_time'){
        const  dateTime =new Date()
        response.end(JSON.stringify({value:dateTime}))
    }else{
        response.end('page not found')
    }
})
server.listen(port,function(){
    console.log('server is running', port)
})
