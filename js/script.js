var input;
var cursor;
var hiddenInput;
var content = [];
var lastContent = "", targetContent = "";
var inputLock = false;
var autoWriteTimer;

var isMobile, isIE;

window.onload = function() {

    isMobile = navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/);

    isIE = (navigator.appName == 'Microsoft Internet Explorer');

    input = document.getElementById('input');

    hiddenInput = document.getElementById('hiddenInput');
    hiddenInput.focus();

    cursor = document.createElement('cursor');
    cursor.setAttribute('class', 'blink');
    cursor.innerHTML = "|";

    if (!isMobile && !isIE) input.appendChild(cursor);

    function refresh() {

        inputLock = true;

        if (targetContent.length - lastContent.length == 0) return;

        var v = targetContent.substring(0, lastContent.length + 1);

        content = [];

        var blinkPadding = false;

        for (var i = 0; i < v.length; i++) {
            var l = v.charAt(i);

            var d = document.createElement('div');
            d.setAttribute('class', 'letterContainer');

            var d2 = document.createElement('div');

            var animClass = (i % 2 == 0) ? 'letterAnimTop' : 'letterAnimBottom';

            var letterClass = (lastContent.charAt(i) == l) ? 'letterStatic' : animClass;

            if (letterClass != 'letterStatic') blinkPadding = true;

            d2.setAttribute('class', letterClass);

            d.appendChild(d2);

            d2.innerHTML = l;
            content.push(d);
        }

        input.innerHTML = '';

        for (var i = 0; i < content.length; i++) {
            input.appendChild(content[i]);
        }

        cursor.style.paddingLeft = (blinkPadding) ? '22px' : '0';

        if (!isMobile && !isIE) input.appendChild(cursor);

        if (targetContent.length - lastContent.length > 1) setTimeout(refresh, 150);
        else inputLock = false;

        lastContent = v;
    }

    if (document.addEventListener) {

        document.addEventListener('touchstart', function(e) {
            clearInterval(autoWriteTimer);
            targetContent = lastContent;
        }, false);

        document.addEventListener('click', function(e) {
            clearInterval(autoWriteTimer);
            targetContent = lastContent;
            hiddenInput.focus();
        }, false);

        if (!isIE) {
            hiddenInput.addEventListener('input', function(e) {
                e.preventDefault();
                targetContent = hiddenInput.value;
                if (!inputLock) refresh();

            }, false);
        } else {
            setInterval(function() {
                targetContent = hiddenInput.value;

                if (targetContent != lastContent && !inputLock) refresh();
            }, 100);
        }

    }

    hiddenInput.value = "";

    autoWriteTimer = setTimeout(function() {
        if (lastContent != "") return;
        targetContent = "Enter your miner id...";
        refresh();
    }, 2000);
    jQuery(function(){
      jQuery.ajax({
        dataType: "json",
        url: "https://api.ethermine.org/poolStats/",
        success: function(data){
          for(var member in data){
            if(member == "data"){
              var txt1 = document.createElement("p");
              var txt2 = document.createElement("p");
              var txt3 = document.createElement("p");


              for(category in data[member]){
                if(category == "poolStats"){
                  var hashrate = parseInt((data[member][category].hashRate));
                  txt3.innerHTML = "Pool hashrate: <mark class='yellow'>" + (hashrate/1000000) + "</mark> Mh/s";
                  txt2.innerHTML = "Total miners: <mark class='yellow'>" + (data[member][category].miners) +  "</mark>";
                  txt1.innerHTML = "Total workers: <mark class='yellow'>" + (data[member][category].workers)+  "</mark>";

                }
              }
              $(txt3).appendTo(".inner");
              $(txt2).appendTo(".inner");
              $(txt1).appendTo(".inner");
            }
          }
        }
      });
    });
}
