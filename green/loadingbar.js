function progress(){
    var percent = document.querySelector('.percent');
    var progress = document.querySelector('.progress');
    var text = document.querySelector('.text');
    var count = 4;
    var per = 16;
    var loading = setInterval(animate, 50);
    function animate(){
      if(count == 100 && per == 400){
        clearInterval(loading);
        location.href = "Canvas.html";
        return 0;
      }else{
        per = per + 4;
        count = count + 1;
        progress.style.width = per + 'px';
        percent.innerHTML = '<p>They are coming!</p><p> ' + count + '%</p>';
      }
    }
  }
  document.body.style.zoom = 0.5

  progress();
  