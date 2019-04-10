const net = require('net');
var chatServer = net.createServer();
var clientList = [];
chatServer.on('connection', function(client) {
    clientList.push(client);
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write(
        "help\r\n\r\n"+
        "----------------------------------------------\r\n\r\n"+
        "1. set your host name -> $ setName py\r\n\r\n"+
        "2. broadcast -> hello\r\n\r\n"+
        "3. unicast -> $ to py hello\r\n\r\n"+
        "----------------------------------------------\r\n\r\n"
    );
    let message = "";
    let model = "normal";
    client.on('data', function(data) {
        //console.log(data.toString() == '\r\n');
        
        if(data !=  '\r\n') {
            message += data;
            
        }
        //message中不记录\r\n
        else {
            console.log(message);
            let arr = message.split(' ');
            if(arr[0] == '$') {
                if(arr[1] == 'setName') {
                    client.name = arr[2];
                    client.write(">>>you have set your hostname as " + client.name +"\r\n");
                }
                else if(arr[1] == "to") {
                    let receiver_name = arr[2];
                    arr.splice(0, 3);
                    message = arr.join(' ');
                    console.log(message);
                    unicast(message, receiver_name);
                    client.write(">>>message has been send!\r\n");
                }
            }
            else {
                broadcast(message, client);
                client.write(">>>message has been send!\r\n");
            }
            console.log("host name:");
            for(item of clientList) {
                console.log(item.name);
            }
            
            message = "";
        }
        
    })
    client.on('end', function() {
        clientList.splice(clientList.indexOf(client), 1);
    })
    client.on('error', function(e) {
        console.log(e);
    })
    function broadcast(message, client) {
        for(let i = 0; i < clientList.length; i++) {
            if(client != clientList[i]) {
                clientList[i].write(client.name + ' says to all: ' + message + '\r\n');
            }
        }
       
    }
    function unicast(message, receiver_name) {
        for(item of clientList) {
            if(receiver_name == item.name) {
                item.write(client.name + " only says to you: " + message + '\r\n');
            }
        }
        
    }
})


chatServer.listen(9000);

