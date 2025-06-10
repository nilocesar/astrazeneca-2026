events.on("ready", function () {
  modal();
  nota();
  // clock();
  exercTime();
  dragdrop();
  quiz();

  controlComplete();
  animate_wow();

  $(".btnVoltar").on("click", function () {
    navigate.goto("00_menu");
  });
});

function modal() {
  $(".openModal").on("click", function () {
    var mod = $(this).attr("mod");
    $("." + mod).css("display", "flex");
    $("html").css("overflow-y", "hidden");
  });

  $(".modalGeral .modal-close").on("click", function () {
    $(".modalGeral").css("display", "none");
    $("html").css("overflow-y", "auto");

    console.log($(this).parent().find("video").get(0));
    $(this).parent().find("video").get(0).pause();
  });
}

function nota() {
  $(".icons img").addClass("inativo");
  $(".icons img").on("click", function () {
    var videoCurrent = $(this).parent().attr("item");
    var status = $(this).attr("status");

    //$(this).parent().find('img').addClass('inativo');
    $(this).removeClass("inativo");
    $(this).parent().find("img").css("pointer-events", "none");

    scorm.saveObject("video" + videoCurrent, status);
  });
}

function clock() {
  $(".clockTxt").css("display", "none");
  $(".clockBtn").on("click", function () {
    $(this).removeClass("pulse animated infinite");
    $(".clockTxt").css("display", "flex");

    $("html, body").animate(
      {
        scrollTop:
          $(".clockTxt").offset().top -
          $(".header").height() -
          $(".header").height() * 0.2,
      },
      500
    );
  });
}

function dragdrop() {
  $(".arrasteExercicio").each(function () {
    var _template = $(this);

    _template.find(".feed").css("display", "none");
    _template.find(".alert").css("display", "none");

    ///randomizar arrastes
    _template.find(".itCons").html(
      _template.find(".itCons .itContainer").sort(function () {
        return Math.random() - 0.5;
      })
    );

    $(_template).drag_drop_exerc({
      itemClass: "dragDrop_element",
      limiteAlvo: 1,
      call: function (e) {
        if (e.action.status == "init") {
        }
        if (e.action.status == "confirmar") {
          //e.action.response

          $(_template).find(".confirmar").css("display", "none");
          $(_template).find(".dragDrop_element").addClass("inativoArraste");

          var _feed = null;
          var _status = "positivo";
          if (e.action.response == true) {
            _feed = _template.find(".feed-pos");
            _template.find(".feed-pos").css("display", "flex");
            _template.find(".alert").css("display", "block");
          } else {
            _feed = _template.find(".feed-neg");
            _template.find(".feed-neg").css("display", "flex");
            _template.find(".alert").css("display", "block");
            _status = "negativo";
          }

          $("html, body").animate(
            {
              scrollTop:
                $(_template).offset().top -
                $(".header").height() -
                $(".header").height() * 0.5,
            },
            500
          );

          scorm.saveObject("arraste" + _template.attr("arraste"), _status);
        }
      },
    });
  });
}

function quiz() {
  $(".containerExercicio .btnConfrmar").css("display", "none");
  $(".containerExercicio .feed").css("display", "none");
  $(".rodape").css("display", "none");

  $(".exercicioInit").each(function () {
    var _template = $(this);

    _template.find(".alter").on("click", function () {
      _template.find(".alter").removeClass("active");
      $(this).addClass("active");

      _template.attr("res", $(this).attr("res"));
      _template.attr("indice", $(this).attr("indice"));

      confereBtn();
    });

    $(".containerExercicio .btnConfrmar").on("click", function () {
      var res = 0;

      $(".exercicioInit").each(function (ind, it) {
        var _template = $(this);

        _template.find(".alter").each(function (indice, item) {
          if ($(item).attr("res") == 1) {
            $(item).find(".selector").addClass("pos");
          }
        });

        if (_template.attr("res") == 1) {
          res += 1;
          _template.find(".active .selector").addClass("pos");
          scorm.saveObject("quiz" + (ind + 1), "positivo");
        } else {
          _template.find(".active .selector").addClass("neg");
          scorm.saveObject("quiz" + (ind + 1), "negativo");
        }

        avaliacao(ind, _template.attr("correta"), _template.attr("indice"));
      });

      var _feed = null;
      if (res == 4) {
        _feed = $(".containerExercicio .feed-positivo1");
        $(".containerExercicio .feed-positivo1").css("display", "flex");
      } else if (res == 3) {
        _feed = $(".containerExercicio .feed-positivo2");
        $(".containerExercicio .feed-positivo2").css("display", "flex");
      } else {
        _feed = $(".containerExercicio .feed-negativo");
        $(".containerExercicio .feed-negativo").css("display", "flex");
      }

      $(".containerExercicio .btnConfrmar").css("display", "none");
      $(".rodape").css("display", "block");

      $("html, body").animate(
        {
          scrollTop:
            _feed.offset().top -
            $(".header").height() -
            $(".header").height() * 0.5,
        },
        500
      );

      $(".containerExercicio .alter").addClass("inativ");
    });
  });

  function confereBtn() {
    var _status = true;
    $(".exercicioInit").each(function () {
      var _template = $(this);
      if (!_template.attr("res")) _status = false;
    });

    if (_status) {
      $(".containerExercicio .btnConfrmar").css("display", "flex");

      $("html, body").animate(
        {
          scrollTop: $(".containerExercicio .btnConfrmar").offset().top,
        },
        500
      );
    }
  }
}

function exercTime() {
  $(".exercic02 .feedImg").css("display", "none");
  $(".inativeB").css("display", "none");

  $(".exercic02 .itq").on("click", function () {
    $(".exercic02 .itq").css("pointer-events", "none");

    var _it = $(this).attr("it");
    if (_it == 1) {
      $(this).addClass("itPos");
      $(".exercic02 .feedImgPos").css("display", "block");
    } else {
      $(this).addClass("itNeg");
      $(".exercic02 .feedImgNeg").css("display", "block");

      $(".exercic02 .itq[it=1]").addClass("itPos");
    }

    $(".inativeB").css("display", "block");

    $("html, body").animate(
      {
        scrollTop: $(".exercic02").offset().top - $(".header").height() * 10,
      },
      500
    );
  });
}

function avaliacao(_indice, _correta, _resposta) {
  var _status = "";
  var _id = "a" + _indice;
  var _idObj = _id + "Obj";

  if (_resposta == _correta) _status = "correct";
  else _status = "wrong";

  console.log(_indice + " " + _status + " " + _id + " " + _idObj);

  ///
  scorm.set("cmi.interactions." + _indice + ".id", _id);
  scorm.set("cmi.interactions." + _indice + ".type", "choice"); // choice
  scorm.set("cmi.interactions." + _indice + ".objectives.0.id", _idObj);
  scorm.set("cmi.interactions." + _indice + ".time", "00:00:12.0"); /// Tempo que foi dada a resposta
  scorm.set(
    "cmi.interactions." + _indice + ".correct_responses.0.pattern",
    _correta
  ); /// Resposta correta.
  scorm.set("cmi.interactions." + _indice + ".student_response", _resposta); /// Resposta dada.
  scorm.set("cmi.interactions." + _indice + ".result", _status); /// Status da resposta Resposta.
  scorm.set("cmi.interactions." + _indice + ".weighting", 1); // Peso da questão
  scorm.set("cmi.interactions." + _indice + ".latency", "00:00:12"); // tempo gasto
  scorm.save();
}

function controlComplete() {
  $("#controlComplete").isInViewportComplete({
    container: window,
    call: function () {
      console.log("complete one-page");
      scorm.setCompleted();
    },
  });
}

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
