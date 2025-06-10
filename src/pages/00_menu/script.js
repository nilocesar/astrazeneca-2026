events.on("ready", function () {
  animate_wow();

  // $(".it").addClass("inativo");
  // $(".it1").removeClass("inativo");
});

function animate_wow() {
  // scorm.setCompleted();
  // Helper function for add element box list in WOW
  WOW.prototype.addBox = function (element) {
    this.boxes.push(element);
  };

  var wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
  });
  wow.init();

  $(".pulse").addClass("animated pulse infinite");
  $(".flash").addClass("wow animated flash infinite");
  $(".left").addClass("wow animated fadeInLeft");
  $(".right").addClass("wow animated fadeInRight");
  $(".down").addClass("wow animated fadeInDown");
  $(".in").addClass("wow animated fadeIn");
  $(".up").addClass("wow animated fadeInUp");
  $(".zoomIn").addClass("wow animated zoomIn");
  $(".rotateIn").addClass("animated rotateIn");
  $(".lightSpeedInRight").addClass("animated lightSpeedInRight");
  $(".jackInTheBox").addClass("animated jackInTheBox");
  $(".flipInX").addClass("animated flipInX");
  $(".flipInY").addClass("animated flipInY");

  for (let i = 1; i < 18; i++) {
    var tempo = i / 2;
    $(".delay" + i).css("animation-delay", tempo + "s");
  }
}
