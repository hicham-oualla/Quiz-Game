    // Timer countdown
    var timeleft = 9;
    var downloadTimer = setInterval(function(){
      timeleft--;
      document.getElementById("time").textContent = timeleft;
      if(timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("time").textContent = "Time's up!";
      }
    }, 1000);