(function ($) {
  "use strict";

  // Sticky Menu
  $(window).scroll(function () {
    if ($(".navigation").offset().top > 100) {
      $(".navigation").addClass("nav-bg");
    } else {
      $(".navigation").removeClass("nav-bg");
    }
  });

  // Background-images
  $("[data-background]").each(function () {
    $(this).css({
      "background-image": "url(" + $(this).data("background") + ")",
    });
  });

  // background color
  $("[data-color]").each(function () {
    $(this).css({
      "background-color": $(this).data("color"),
    });
  });

  // progress bar
  $("[data-progress]").each(function () {
    $(this).css({
      bottom: $(this).data("progress"),
    });
  });

  /* ########################################### hero parallax ############################################## */
  window.onload = function () {
    var parallaxBox = document.getElementById("parallax");
    if (!parallaxBox) {
      return;
    }

    var layers = [
      { id: "l3", speed: 20 },
      { id: "l5", speed: 30 },
      { id: "l6", speed: 45 },
      { id: "l8", speed: 25 },
      { id: "l9", speed: 40 },
    ];
    var layerPositions = [];

    layers.forEach(function (layer) {
      var element = document.getElementById(layer.id);
      if (element) {
        layerPositions.push({
          id: layer.id,
          left: element.offsetLeft,
          top: element.offsetTop,
          speed: layer.speed,
        });
      }
    });

    parallaxBox.onmousemove = function (event) {
      event = event || window.event;
      var x = event.clientX - parallaxBox.offsetLeft,
        y = event.clientY - parallaxBox.offsetTop;

      layerPositions.forEach(function (layer) {
        mouseParallax(layer.id, layer.left, layer.top, x, y, layer.speed);
      });
    };
  };

  function mouseParallax(id, left, top, mouseX, mouseY, speed) {
    var obj = document.getElementById(id);
    var parentObj = obj.parentNode,
      containerWidth = parseInt(parentObj.offsetWidth),
      containerHeight = parseInt(parentObj.offsetHeight);
    obj.style.left =
      left -
      ((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) *
        speed +
      "px";
    obj.style.top =
      top -
      ((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) *
        speed +
      "px";
  }
  /* ########################################### /hero parallax ############################################## */

  // testimonial-slider
  $(".testimonial-slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    arrows: false,
    adaptiveHeight: true,
  });

  // clients logo slider
  $(".client-logo-slider").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Shuffle js filter and masonry
  var Shuffle = window.Shuffle;
  var shuffleWrapper = document.querySelector(".shuffle-wrapper");

  if (shuffleWrapper && Shuffle) {
    var myShuffle = new Shuffle(shuffleWrapper, {
      itemSelector: ".shuffle-item",
      buffer: 1,
    });

    jQuery('input[name="shuffle-filter"]').on("change", function (evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);
      }
    });
  }

  // Technical skills word cloud
  var skillsDataElement = document.getElementById("skills-word-cloud-data");
  var skillsCanvas = document.getElementById("skills-word-cloud");

  if (skillsDataElement && skillsCanvas && window.WordCloud) {
    var skills = JSON.parse(skillsDataElement.textContent);
    var values = skills.map(function (skill) {
      return skill.value;
    });
    var maxWeight = Math.max.apply(null, values);
    var minWeight = Math.min.apply(null, values);

    var renderSkillsWordCloud = function () {
      var wrapper = skillsCanvas.parentElement;
      var width = wrapper.offsetWidth;
      var height = Math.max(360, Math.min(480, width * 0.55));

      skillsCanvas.width = width;
      skillsCanvas.height = height;

      window.WordCloud(skillsCanvas, {
        list: skills.map(function (skill) {
          return [skill.name, skill.value];
        }),
        gridSize: Math.round(10 * width / 1024),
        weightFactor: function (size) {
          var range = maxWeight - minWeight || 1;
          var normalized = (size - minWeight) / range;
          return normalized * (width * 0.09) + width * 0.028;
        },
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "#1a1a1a",
        rotateRatio: 0.35,
        rotationSteps: 2,
        backgroundColor: "transparent",
        minSize: 10,
        drawOutOfBound: false,
        shrinkToFit: true,
      });
    };

    renderSkillsWordCloud();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderSkillsWordCloud, 200);
    });
  }
})(jQuery);
