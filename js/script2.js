$(document).ready(function(){
  window.onkeyup = keyup;
  let us,eu;
  Moneey();
  checkCookie("username");
  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }
  function checkCookie(acc) {
    var username = getCookie(acc);
    if (username != "")readdata(username);
  }




  function  keyup(e) {
    if(e.keyCode == 13){
      var tx = $("#hiddenInput").val();
      console.log(tx);
      readdata(tx);
      setCookie("username", tx, 365);
    }
  }
  function Moneey(){
    var txt1 = document.createElement("p");
    var txt2 = document.createElement("p");
    var txt3 = document.createElement("p");
    jQuery.ajax({
      dataType: "json",
      url: "https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR",
      success: function(data){
        txt1.innerHTML = "Eth in USD dollars: <mark class='orange'>" + data[0].price_usd; +  "</mark> $";
        us = data[0].price_usd;
        eu = data[0].price_eur;
        $(txt1).appendTo(".inner");
      }

    });
  }

  function readdata(acc){
    console.log(eu);
    jQuery(function(){
      var link = "https://api.ethermine.org/miner/" + acc + "/currentStats";
      jQuery.ajax({
        dataType: "json",
        url: link,
        success: function(data){
          if(data.status == "ERROR"){
            console.log(data.error);
          }
          else{
            var txt1 = document.createElement("p");
            var txt2 = document.createElement("p");
            var txt3 = document.createElement("p");
            var txt4 = document.createElement("p");
            var txt5 = document.createElement("p");
            var txt6 = document.createElement("p");
            for(var category in data.data){
              if(category = "reportedHashrate"){
                if((data.data[category]) > 1) txt1.innerHTML = "Reported hashrate: <mark class='green'>" + ((data.data[category])/1000000).toFixed(3) +  "</mark> Mh/s";
                else txt1.innerHTML = "Reported hashrate: <mark class='red'> 0 </mark> Mh/s";
              }
              if(category = "currentHashrate"){
                if((data.data[category]) > 1) txt2.innerHTML = "Current hashrate: <mark class='green'>" + ((data.data[category])/1000000).toFixed(3) +  "</mark> Mh/s";
                else txt2.innerHTML = "Current hashrate: <mark class='red'> 0 </mark> Mh/s";
              }
              if(category = "averageHashrate"){
                if((data.data[category]) > 1) txt3.innerHTML = "Average hashrate: <mark class='green'>" + ((data.data[category])/1000000).toFixed(3) +  "</mark> Mh/s";
                else txt3.innerHTML = "Average hashrate: <mark class='red'> 0 </mark> Mh/s";
              }
              if(category = "unpaid"){
                txt4.innerHTML = "Unpaid: <mark class='red'>" + ((data.data[category])/1000000000000000000).toFixed(6) +  "</mark> Ethereums";
                txt5.innerHTML = "Unpaid in USD: <mark class='red'>" + ((((data.data[category])/1000000000000000000))*us).toFixed(6) +  "</mark> $";
                txt6.innerHTML = "Unpaid in Euro: <mark class='red'>" + ((((data.data[category])/1000000000000000000).toFixed(6))*eu).toFixed(6) +  "</mark> €";

              }
            }

            $(txt1).appendTo(".rightinner");
            $(txt2).appendTo(".rightinner");
            $(txt3).appendTo(".rightinner");
            $(txt4).appendTo(".leftinner");
            $(txt5).appendTo(".leftinner");
            $(txt6).appendTo(".leftinner");

          }

        }
      });
    });
  }

});

