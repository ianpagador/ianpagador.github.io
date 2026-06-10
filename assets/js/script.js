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
      var height = Math.max(460, Math.min(540, width * 0.62));

      skillsCanvas.width = width;
      skillsCanvas.height = height;

      window.WordCloud(skillsCanvas, {
        list: skills.map(function (skill) {
          return [skill.name, skill.value];
        }),
        gridSize: Math.round(9 * width / 1024),
        weightFactor: function (size) {
          var range = maxWeight - minWeight || 1;
          var normalized = (size - minWeight) / range;
          return normalized * (width * 0.08) + width * 0.026;
        },
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "#1a1a1a",
        rotateRatio: 0.35,
        rotationSteps: 2,
        backgroundColor: "transparent",
        minSize: 10,
        drawOutOfBound: false,
        shrinkToFit: true,
        origin: [width / 2, height / 2 - 10],
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
