 AOS.init();
 $(document).ready(function(){
                            // modal
                            var modal = document.getElementById('modal1');
                            var span = document.getElementsByClassName("modal-close")[0];
                            span.onclick = function() {
                            	modal.style.display = "none";
                            }
                            window.onclick = function(event) {
                            	if (event.target == modal) {
                            		modal.style.display = "none";
                            	}
                            }
                            $(".cube").click(function(){
                            	var id = $(this).attr('id');
                                // name
                                var tp1 = id + "-n";
                                var name = document.getElementById(tp1).innerHTML;
                                // info
                                var tp2 = id + "-info";
                                var info = document.getElementById(tp2).innerHTML;
                                // img
                                var tp3 = id + "-pic";
                                var img = document.getElementById(tp3).src;
                                // set modal
                                document.getElementById("modal-header").innerHTML =  "<i class='fas fa-star' style='color:#e62b1e;'></i> "+name;
                                document.getElementById("modal-content").innerHTML = info;
                                document.getElementById("modal-img").src = img;
                                // open modal
                                $('#modal1').modal('open');
                                
                              });
                          });

 $(document).ready(function(){
  $('.sidenav').sidenav();
});

 function makeTimer() {

  var endTime = new Date("29 September 2018 10:30:00 GMT+01:00");         
  endTime = (Date.parse(endTime) / 1000);

  var now = new Date();
  now = (Date.parse(now) / 1000);

  var timeLeft = endTime - now;

  var days = Math.floor(timeLeft / 86400); 
  var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
  var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
  var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

  if (days < "10") { days = "0" + days; }
  if (hours < "10") { hours = "0" + hours; }
  if (minutes < "10") { minutes = "0" + minutes; }
  if (seconds < "10") { seconds = "0" + seconds; }

  $("#days").html(days);
  $("#hours").html(hours);
  $("#minutes").html(minutes);
  $("#seconds").html(seconds);        

}

setInterval(function() { makeTimer(); }, 1000);


$(document).ready(function(){
 $('.modal').modal();
});


                    // smooth scroll
                    let anchorlinks = document.querySelectorAll('a[href^="#"]')
                    for (let item of anchorlinks) { 
                      item.addEventListener('click', (e)=> {
                        let hashval = item.getAttribute('href')
                        let target = document.querySelector(hashval)
                        target.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        })
                        history.pushState(null, null, hashval)
                        e.preventDefault()
                      })
                    }


                    // preloader
                    $(window).on("load",function() { 
                      $("#status").fadeOut("fast"); 
                      $("#preloader").delay(500).fadeOut("slow"); 
                    })

                    // Stars
                    
                    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

                    var starDensity = .216;
                    var speedCoeff = .05;
                    var width;
                    var height;
                    var starCount;
                    var circleRadius;
                    var circleCenter;
                    var first = true;
                    var giantColor = '255,255,255';
                    var starColor = '255,255,255';
                    var cometColor = '255,255,255';
                    var canva = document.getElementById('universe');
                    var stars = [];

                    windowResizeHandler();
                    window.addEventListener('resize', windowResizeHandler, false);

                    createUniverse();

                    function createUniverse() {
                      universe = canva.getContext('2d');

                      for (var i = 0; i < starCount; i++) {
                        stars[i] = new Star();
                        stars[i].reset();
                      }

                      draw();
                    }

                    function draw() {
                      universe.clearRect(0, 0, width, height);

                      var starsLength = stars.length;

                      for (var i = 0; i < starsLength; i++) {
                        var star = stars[i];
                        star.move();
                        star.fadeIn();
                        star.fadeOut();
                        star.draw();
                      }

                      window.requestAnimationFrame(draw);
                    }

                    function Star() {

                      this.reset = function() {
                        this.giant = getProbability(3);
                        this.comet = this.giant || first ? false : getProbability(10);
                        this.x = getRandInterval(0, width - 10);
                        this.y = getRandInterval(0, height);
                        this.r = getRandInterval(1.1, 2.6);
                        this.dx = getRandInterval(speedCoeff, 6 * speedCoeff) + (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) + speedCoeff * 2;
                        this.dy = -getRandInterval(speedCoeff, 6 * speedCoeff) - (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120);
                        this.fadingOut = null;
                        this.fadingIn = true;
                        this.opacity = 0;
                        this.opacityTresh = getRandInterval(.2, 1 - (this.comet + 1 - 1) * .4);
                        this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * .001;
                      };

                      this.fadeIn = function() {
                        if (this.fadingIn) {
                          this.fadingIn = this.opacity > this.opacityTresh ? false : true;
                          this.opacity += this.do;
                        }
                      };

                      this.fadeOut = function() {
                        if (this.fadingOut) {
                          this.fadingOut = this.opacity < 0 ? false : true;
                          this.opacity -= this.do / 2;
                          if (this.x > width || this.y < 0) {
                            this.fadingOut = false;
                            this.reset();
                          }
                        }
                      };

                      this.draw = function() {
                        universe.beginPath();

                        if (this.giant) {
                          universe.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')';
                          universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
                        } else if (this.comet) {
                          universe.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')';
                          universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);
                  // commet
                  for (var i = 0; i < 30; i++) {
                    universe.fillStyle = 'rgba(' + cometColor + ',' + (this.opacity - (this.opacity / 20) * i) + ')';
                    universe.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
                    universe.fill();
                  }
                } else {
                  universe.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')';
                  universe.rect(this.x, this.y, this.r, this.r);
                }

                universe.closePath();
                universe.fill();
              };

              this.move = function() {
                this.x += this.dx;
                this.y += this.dy;
                if (this.fadingOut === false) {
                  this.reset();
                }
                if (this.x > width - (width / 4) || this.y < 0) {
                  this.fadingOut = true;
                }
              };

              (function() {
                setTimeout(function() {
                  first = false;
                }, 50)
              })()
            }

            function getProbability(percents) {
              return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
            }

            function getRandInterval(min, max) {
              return (Math.random() * (max - min) + min);
            }

            function windowResizeHandler() {
              width = window.innerWidth;
              height = window.innerHeight;
              starCount = width * starDensity;
              circleRadius = (width > height ? height / 2 : width / 2);
              circleCenter = {
                x: width / 2,
                y: height / 2
              }

              canva.setAttribute('width', width);
              canva.setAttribute('height', height);
            }

            // header
            $(document).ready(function(){
              $(".sidenav li>a").css({"color":"#191919"});
              $(window).scroll(function() {    
                var scroll = $(window).scrollTop();
                if (scroll >= 200) {
                  $("nav").addClass("navClass");
                  $("#logoMain").attr('src','images/tedxjnec1.png');
                  $("#logoMain").width(180).height(40);
                        // $("nav ul a").css('color','#191919');
                        $("nav ul a").css({"font-weight":"700","color":"#191919"});
                        $(".sidenav li>a").css({"color":"#191919"});
                      }
                      else {
                        $("nav").removeClass("navClass");
                        $("#logoMain").attr('src','images/tedxjnec1-light-2.png');
                        $("#logoMain").height(50).width(220);
                        $("nav ul a").css('color', '#fff');
                        $(".sidenav li>a").css({"color":"#191919"});
                      }
                    });
            });

            
            $(document).ready(function(){
              $('[data-toggle="popover"]').popover(); 
            });

            
