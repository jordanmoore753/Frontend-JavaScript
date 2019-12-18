$(function() {
  function luhnAlgorithm(cc_number) {
    let obj = {
      odds: 0,
      evens: 0,
    };

    for (let i = 0, len = cc_number.length; i < len; i += 1) {
      if (i % 2 == 1) {
        cc_number[i] = (+cc_number[i] * 2) + "";

        if (cc_number[i].length > 1) {
          cc_number[i] = +cc_number[i][0] + +cc_number[i][1];
        } else {
          cc_number[i] = +cc_number[i];
        }

        obj.odds += cc_number[i];
      } else {
        obj.evens += +cc_number[i];
      }
    }

    return obj;
  }

  $("nav a").on("mouseenter", function() {
    $(this).next("ul").addClass('active-ul');
  });

  $("nav").on("mouseleave", function() {
    $(this).find("ul ul").removeClass('active-ul');
  });

  $(".button").on("click", function(e) {
    e.preventDefault();

    $(this).addClass("clicked");
  });

  $(".toggle").on("click", function(e) {
    e.preventDefault();

    $(this).next('.accordion').toggleClass('opened');
  });

  $("form").on("submit", function(e) {
    e.preventDefault();
    var cc_number = $(this).find("[type=text]").val();
    cc_number = cc_number.split("").reverse();

    let oddsEvensCount = luhnAlgorithm(cc_number);

    if ((oddsEvensCount.odds + oddsEvensCount.evens) % 10 == 0) {
      $(this).find('.error').toggleClass('active-status', false);
      $(this).find('.success').toggleClass('active-status', true);
    }
    else {
      $(this).find('.error').toggleClass('active-status', true);
      $(this).find('.success').toggleClass('active-status', false);
    }
  });

  $("ul a").on("click", function(e) {
    e.preventDefault();

    var month = $(this).text(),
        $stone = $("#birthstone");

    let emeraldsToMonth = {
      January: 'garnet',
      February: 'amethyst',
      March: 'aquamarine or bloodstone',
      April: 'diamond',
      May: 'emerald',
      June: 'pearl, moonstone, or lexandrite',
      July: 'ruby',
      August: 'peridot',
      September: 'sapphire',
      October: 'opal or tourmaline',
      November: 'topaz or citrine',
      December: 'turquoise, zircon, or tanzanite',
    };

    $stone.text('Your birthstone is ' + emeraldsToMonth[month] + '.');
  });
});
