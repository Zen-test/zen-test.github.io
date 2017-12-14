$(document).ready(function() {
  $(".btn-slide").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate({
        scrollTop: $(hash).offset().top
      }, 600);
    }
  });

  var scrolling = false;

  $(window).bind("mousewheel DOMMouseScroll", function(event){
    console.log("Delta " + event.originalEvent.wheelDelta);
    console.log("Detail " + event.originalEvent.detail);
    if(scrolling) {
      return;
    }

    var currentTop = $(window).scrollTop();
    var scrollingDown = true;
    var offsetArr = [];
    $("div").filter(function() {
      return this.id.match("section*");
    }).each(function() {
      offsetArr.push(Math.floor($("#" + this.id).offset().top));
    });

    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail <0) {
      scrollingDown = false;
    }

    var currentSection = 0;
    for (i = 0; i < offsetArr.length; i++) {
      if (currentTop == 0)
        break;
      if (currentTop < offsetArr[i]) {
        currentSection = i - 1;
        break;
      }
      currentSection = i;
    }

    if (scrollingDown && currentTop < offsetArr[currentSection + 1]) {
      scrolling = true;
      $("html, body").animate().stop;
      $("html, body").animate({
        scrollTop: offsetArr[currentSection + 1]}, 600, function() {scrolling = false;});
      }
      if (!scrollingDown && currentTop >= offsetArr[currentSection - 1]) {
        scrolling = true;
      $("html, body").animate().stop;
      $("html, body").animate({
        scrollTop: offsetArr[currentSection - 1]}, 600, function() {scrolling = false;});
      }
  });

  $(function() {
    $("#section2").waypoint(function() {
      $(".section2 h1").toggleClass("appear");
      var time = 0;
      $(".section2 li").each(function() {
        var listItem = this;
        setTimeout(function() {
          $(listItem).toggleClass("appear");
        }, time)
        time += 150;
      });
      setTimeout(function() {
        $(".section2 img").toggleClass("appear");
      }, time);
    }, {
      offset: "20%"
    });

    $("#section3").waypoint(function(direction) {
      var time = 0;
      if (direction == "down") {
        $(".platforms-list .col").each(function() {
          var listItem = this;
          setTimeout(function() {
            $(listItem).addClass("platforms-list-appear");
          }, time)
          time += 100;
        });
        setTimeout(function() {
          $(".download").addClass("download-appear");
        }, time);
      }
      else {
        $(".platforms-list .col").removeClass("platforms-list-appear");
          $(".download").removeClass("download-appear");
      }
    }, {
      offset: "20%"
    });
  });
})