App = {
  web3Provider: null,
  contracts: {},
  account:0x0,

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    
    if(typeof web3 !== 'undefined'){
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    }else{    
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Contest.json", function(contest){
      App.contracts.Contest = TruffleContract(contest);
      App.contracts.Contest.setProvider(App.web3Provider);
      App.listenForEvents();
      return App.render();
    });
  },

  render: function(){
    var contestInstance;
    var loader = $("#loader");
    var content = $("#content");
    loader.show();
    content.hide();
    web3.eth.getCoinbase(function(err, account){
      if(err === null){
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    /*web3.eth.getAccounts(function(err, account){
      if(err === null){
        App.account = account[0];
        $("#accountAddress").html("Your Account: " + account);
      }
    });*/
    //load contract data
    App.contracts.Contest.deployed().then(function(instance){
      contestInstance = instance;
      return contestInstance.contestantsCount();
    }).then(function(contestantsCount){
      var contestantsResults = $("#contestantsResults");
      contestantsResults.empty();

      var contestantsSelect = $("#contestantsSelect");
      contestantsSelect.empty();

      for(var i = 1; i <= contestantsCount; i++){
        contestInstance.contestants(i).then(function(contestant){
          var id = contestant[0];
          var name = contestant[1];
          var voteCount = contestant[2];
          //Render contestant Result
          var contestantTemplate = "<tr><td>" + id + "</td><td>" + 
                    name + "</td><td>" + voteCount + "</td></tr>";
          contestantsResults.append(contestantTemplate);
          //Render candidate voting option
          var contestantOption = "<option value='" + id + "' >" + name + "</option>";
          contestantsSelect.append(contestantOption);
        });
      }
      loader.hide();
      content.show();
    }).catch(function(error){
      console.warn(error);
    });
  },

  //Listen for events emitted from the contract
  listenForEvents: function(){
    App.contracts.Contest.deployed().then(function(instance){
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(err, event){
        console.log("Event triggered", event);
        //Reload when a new vote is recorded
        App.render();
      });
    });
  },

  castVote: function(){
    var contestantId = $('#contestantsSelect').val();
    App.contracts.Contest.deployed().then(function(instance){
      return instance.vote(contestantId, { from: App.account});
    }).then(function(result){
      //wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err){
      console.error(err);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
