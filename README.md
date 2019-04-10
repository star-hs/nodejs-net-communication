# nodejs-net-communication
use net module to build multiterminal communication by command line

## has done
1. 支持多端通信，广播和单播
2. 任何一客户端断开链接，不会影响其余主机通信
3. 支持修改主机名

## there are some difficulties to resolve
1. telnet不支持中文
2. telnet如果打错了字然后退格会出错
3. 如果你在打字的同时，别人发送信息过来，会打断你的信息

