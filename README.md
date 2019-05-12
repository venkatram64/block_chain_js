step 1:
got to https://www.truffleframework.com/truffle
npm install truffle -g
step 2:
download  ganache from following link and install
https://www.truffleframework.com/ganache 

it will be uses as ethereum local blockchain network

step 3:install chrome browser extension -> metamask

step 4:

install truffle unbox pet-shop, this  is a sample appliaction

step 5:
go to cmd, get the solidity version
truffle version

step 6: migrate the program, after writing the Contest.sol

step 7: truffle migrate

To get the values from contract:

step 8: got to truffle console using following command
truffle console
step 9: run the following command
Contest.deployed().then(function(instance){app=instance})

step 10:
run the following:
app.contestant()
step 10: to get the node address, run the following command
app.address

step 11: remove the Contest.sol code, and keep below
pragma solidity 0.5.0;

//creating the contract
contract Contest {    
    //declaring variables
    string public contestant;
    //declaring constructor
    constructor () public {
        contestant = "Tom";
    }
}

step 12:
reset the ethereum block chain(testing)
run the following command
truffle migrate --reset

step 13:
got to truffle console, run the following command
truffle console

step 14: run the following command
Contest.deployed().then(function(instance){app=instance})

step 15:
    app.contestants(1)

    app.contestantsCount()

step 16:
    app.contestants(1).then(function(c){contestant = c})

step 17:
    contestant

    contestant[1]

    contestant[0].toNumber()

step 18:
    web3.js is the nodejs interface for ethereum.

    in truffle controle, type the following command.
    web3

    web3.eth.getAccounts()

    web3.eth.accounts


setp 19:
    after writing the test cases,
    run the following command in truffle console.
    test



step 20:

to deploy the app
    truffle migrate --reset

step 21:

to run the server

npm run dev



metamask:
sort fat peasant sleep enact cruel february regular elegant vivid agree elbow

venkat123(password)

http://127.0.0.1:7545

testing for vote: 
step 1: deploy: truffle migrate --reset
step 2: truffle console
step 3: Contest.deployed().then(function(instance){app=instance})
step 4: web3.eth.getAccounts().then(function(acc){account=acc})
step 5: account[0]
step 6: app.vote(1, {from: account[0]})
step 7: check the : http://localhost:3000
step 8: to come out of the truffle console, use .exit
step 9: run the test cases, use the following command
    truffle test

for any modification in solidity file, deploy use the following command:
following the vote's steps 1 to 9
 app.vote(1, {from: account[0]})
 app.vote(2, {from: account[1]})
