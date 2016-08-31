(function () {
'use strict';

var _;
var slice = [].slice;
_ = {
  constructor: function() {
    return this.console = setInterval(this.detect.bind(this), 200);
  },
  p: {
    offing: false,
    offtime: 0
  },
  turn: function(el, remove, add) {
    if (remove == null) {
      remove = false;
    }
    if (add == null) {
      add = false;
    }
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (remove !== false) {
      el.removeClass(remove);
    }
    if (add !== false) {
      el.addClass(add);
    }
    return true;
  },
  off: function(el, p) {
    if (p == null) {
      p = {};
    }
    if (p.offing && p.offtime > 0) {
      this.turn(el, false, 'offing');
      setTimeout((function(_this) {
        return function() {
          _this.turn(el, 'offing', false);
          return _this.turn(el, 'on', 'off');
        };
      })(this), p.offtime * 1000 + 100);
    } else {
      this.turn(el, 'on', 'off');
    }
  },
  on: function(el, p) {
    return this.turn(el, 'off', 'on');
  },
  swap: function(el, p) {
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (el.hasClass('off')) {
      this.on(el, p);
    } else {
      this.off(el, p);
    }
  },
  encode: function(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  },
  t: function(category, action, label, value) {
    return _gaq.push(['_trackEvent', category, action, label, value]);
  },
  rand: function(min, max) {
    return Math.floor(Math.random() * max) + min;
  },
  fit: function(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio;
    ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: srcWidth * ratio,
      height: srcHeight * ratio
    };
  },
  jinit: function() {
    return $.ajaxSetup({
      dataType: "json"
    });
  },
  patch: function(url, data) {
    var jpatch;
    _.jinit();
    jpatch = $.ajax({
      url: url,
      data: data,
      type: 'PATCH'
    });
    jpatch.always(function(response) {
      return Spinner.d();
    });
    jpatch.fail(function(response) {
      var body, error;
      error = response.responseJSON.error;
      body = "<b>" + error.message + "</b><br /><br />\n" + error.file + ":" + error.line;
      return Prompt.i(error.type, body, ['OK']);
    });
    return jpatch;
  },
  get: function() {
    var args, jget;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _.jinit();
    jget = $.get.apply($, args);
    jget.always(function(response) {
      return Spinner.d();
    });
    jget.fail(function(response) {
      var body, error;
      error = response.responseJSON.error;
      body = "<b>" + error.message + "</b><br /><br />\n" + error.file + ":" + error.line;
      return Prompt.i(error.type, body, ['OK']);
    });
    return jget;
  },
  llc: function() {
    var ascii;
    ascii = "\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: " + config.meta.repo;
    return console.log(ascii, "color: grey; font-family: Menlo, monospace;");
  },
  detect: function() {
    if (((window.outerHeight - window.innerHeight) > 100) || ((window.outerWidth - window.innerWidth) > 100)) {
      this.llc();
      return clearInterval(this.console);
    }
  }
};

var _$1 = _;

var Spinner$1;

Spinner$1 = {
  el: {},
  i: function(el, override) {
    var coord, coords, key, rect;
    this.el = $('.spinner');
    rect = el[0].getBoundingClientRect();
    coords = {
      top: (rect.top + $(window).scrollTop()) + "px",
      left: rect.left + "px",
      width: rect.width + "px",
      height: rect.height + "px"
    };
    if (override !== void 0) {
      for (key in override) {
        coord = override[key];
        coords[key] = coord;
      }
    }
    this.el.css(coords);
    return _$1.on(this.el);
  },
  d: function() {
    return setTimeout((function(_this) {
      return function() {
        return _$1.off(_this.el);
      };
    })(this), 100);
  }
};

var Spinner$2 = Spinner$1;

var Prompt$1;
var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
Prompt$1 = {
  el: {},
  options: {},
  callback: false,
  params: {},
  i: function(title, copy, options, params, callback) {
    var i, j, len, o, option;
    if (options == null) {
      options = ['OK'];
    }
    Prompt$1.callback = false;
    Prompt$1.params = false;
    if (typeof params === 'function') {
      Prompt$1.callback = params;
    }
    if (typeof callback === 'function') {
      Prompt$1.callback = callback;
    }
    if (typeof params === 'object') {
      Prompt$1.params = params;
    }
    Prompt$1.el = $('.prompt');
    Prompt$1.el.find('.title').html(title);
    Prompt$1.el.find('.copy').html(copy);
    if (typeof params === 'object' && 'textarea' in params && params.textarea === true) {
      _$1.on(Prompt$1.el.find('.textarea'));
      Prompt$1.el.find('.textarea > textarea').val(params.value);
    }
    Prompt$1.options = Prompt$1.el.find('.options > .option');
    _$1.off(Prompt$1.options);
    Prompt$1.options.removeClass('active');
    Prompt$1.options.first().addClass('active');
    for (i = j = 0, len = options.length; j < len; i = ++j) {
      o = options[i];
      option = Prompt$1.el.find(".options  > .option_" + (i + 1));
      _$1.on(option);
      option.html(o).data('value', o);
    }
    _$1.on(Prompt$1.el, _$1.on('.fade'));
    return Prompt$1.handlers();
  },
  handlers: function() {
    $(document).keydown(Prompt$1.keydown);
    Prompt$1.options.on('click', Prompt$1.click);
    return Prompt$1.el.find('.inner > .cancel').on('click', Prompt$1.cancel);
  },
  keydown: function() {
    var current, k, keys, shift;
    k = event.which;
    keys = [39, 9, 37, 13, 27];
    if (indexOf.call(keys, k) < 0) {
      return true;
    }
    current = Prompt$1.el.find('.option.on.active');
    shift = window.event.shiftKey;
    if (k === 39 || (k === 9 && !shift)) {
      current.removeClass('active');
      if (current.next().hasClass('on')) {
        current.next().addClass('active');
      } else {
        Prompt$1.el.find('.option_1').addClass('active');
      }
      return false;
    }
    if (k === 37 || (k === 9 && shift)) {
      current.removeClass('active');
      if (current.prev().hasClass('on')) {
        current.prev().addClass('active');
      } else {
        Prompt$1.el.find('.option.on').last().addClass('active');
      }
      return false;
    }
    if (k === 13) {
      Prompt$1.trigger(Prompt$1.el.find('.option.active').data('value'));
      return false;
    }
    if (k === 27) {
      Prompt$1.trigger(false);
      return false;
    }
  },
  cancel: function() {
    return Prompt$1.trigger(false);
  },
  click: function() {
    return Prompt$1.trigger($(this).data('value'));
  },
  trigger: function(value) {
    var val;
    _$1.off(Prompt$1.el.find('.textarea'));
    _$1.off(Prompt$1.el);
    _$1.off('.fade');
    Prompt$1.options.unbind('click', Prompt$1.click);
    $(document).unbind('keydown', Prompt$1.keydown);
    console.log(Prompt$1.params);
    if (Prompt$1.params.textarea) {
      val = Prompt$1.el.find('.textarea > textarea').val();
      return typeof Prompt$1.callback === "function" ? Prompt$1.callback({
        response: value,
        val: val
      }) : void 0;
    } else {
      return typeof Prompt$1.callback === "function" ? Prompt$1.callback(value) : void 0;
    }
  }
};

var Prompt$2 = Prompt$1;

var Notice;

Notice = {
  types: ['info', 'success', 'warning'],
  el: false,
  on: false,
  timeout: false,
  i: function(copy, type) {
    var dtype, i, len, ref;
    if (type == null) {
      type = 'info';
    }
    if (Notice.el === false) {
      Notice.el = $('.notice');
    }
    ref = Notice.types;
    for (i = 0, len = ref.length; i < len; i++) {
      dtype = ref[i];
      Notice.el.removeClass(dtype);
    }
    Notice.el.addClass(type);
    Notice.el.find('.copy > .message').html(copy);
    if (Notice.on === false) {
      _$1.on(Notice.el);
      Notice.handlers.on();
      Notice.on = true;
    }
    return Notice.timeout = setTimeout(function() {
      return Notice.d();
    }, 5000);
  },
  handlers: {
    on: function() {
      return $('.notice > .inner > .close').click(Notice.d);
    },
    off: function() {
      return $('.notice > .inner > .close').unbind('click', Notice.d);
    }
  },
  d: function() {
    if (Notice.timeout !== false) {
      clearTimeout(Notice.timeout);
    }
    Notice.timeout = false;
    Notice.handlers.off();
    _$1.off(Notice.el, {
      offing: true,
      offtime: 0.2
    });
    return Notice.on = false;
  }
};

var Notice$1 = Notice;

var Me;

Me = {
  logout: function(complete) {
    return _$1.get('/api/auth/logout').done(function(response) {
      return complete();
    });
  },
  oauth: function(type, complete) {
    return _$1.get("/api/auth/" + type).done(function(response) {
      return complete(response.data.uri);
    });
  },
  authed: function(result) {
    return _$1.get('/api/auth').done(function(response) {
      return result(response.data.user);
    });
  }
};

var Me$1 = Me;

var Global;

Global = {
  window: false,
  i: function() {
    Global.handlers();
    return Global.loginCheck();
  },
  handlers: function() {
    $('header > .inner > .user > .profile').click(Global.userProfileHandler);
    $('header > .inner > .user > .oauths > .oauth').click(Global.userOauthHandler);
    return $('header > .inner > .user > .picture > .logout').click(Global.logoutHandler);
  },
  logoutHandler: function() {
    Spinner$2.i($('header'));
    return Me$1.logout(function() {
      _$1.swap('.user > .profile');
      _$1.swap('.user > .picture');
      return Notice$1.i('Logout Successful', 'success');
    });
  },
  userProfileHandler: function() {
    var oa, tl;
    oa = $('.oauths');
    tl = new TimelineMax({
      repeat: 0
    });
    if (oa.hasClass('off')) {
      _$1.on(oa);
      return tl.to('#profileSVG', 0.8, {
        morphSVG: '#cancelSVG',
        ease: Back.easeInOut
      });
    } else {
      tl.to('#profileSVG', 0.8, {
        morphSVG: '#profileSVG',
        ease: Back.easeInOut
      });
      return _$1.off(oa, {
        offing: 0.5
      });
    }
  },
  userOauthHandler: function() {
    var type;
    type = $(this).data('type');
    Global.userProfileHandler();
    if (type === 'cancel') {
      return true;
    }
    Global.oauthWindow('/loading');
    Spinner$2.i($('header'));
    return Me$1.oauth(type, function(uri) {
      return Global.window.location.href = uri;
    });
  },
  oauthWindow: function(url) {
    var h, left, top, w;
    w = 640;
    h = 550;
    left = (screen.width / 2) - (w / 2);
    top = (screen.height / 2) - (h / 2);
    Global.window = window.open(url, 'Login / Register', "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ",height=" + h + ",top=" + top + ",left=" + left);
    if (window.focus) {
      Global.window.focus;
    }
  },
  oauthComplete: function(user) {
    Spinner$2.d();
    Global.login(user);
    return Notice$1.i('Login Successful', 'success');
  },
  login: function(user) {
    window.User = user;
    $('header > .inner > .user > .picture > img').attr('src', User.picture);
    _$1.off('.user > .profile');
    _$1.off('.user > .oauths');
    return _$1.on('.user > .picture');
  },
  loginCheck: function() {
    return Me$1.authed(function(result) {
      if (result !== false) {
        return Global.login(result);
      }
    });
  }
};

var Global$1 = Global;

Global$1.i();

_$1.constructor();

window.Spinner = Spinner$2;

window.Global = Global$1;

window.Prompt = Prompt$2;

window.Me = Me$1;

}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJyZXNvdXJjZXMvY29mZmVlLzI1Ni5jb2ZmZWUiLCJyZXNvdXJjZXMvY29mZmVlL3NwaW5uZXIuY29mZmVlIiwicmVzb3VyY2VzL2NvZmZlZS9wcm9tcHQuY29mZmVlIiwicmVzb3VyY2VzL2NvZmZlZS9ub3RpY2UuY29mZmVlIiwicmVzb3VyY2VzL2NvZmZlZS9tZS5jb2ZmZWUiLCJyZXNvdXJjZXMvY29mZmVlL2dsb2JhbC5jb2ZmZWUiLCJyZXNvdXJjZXMvY29mZmVlL21haW4uY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICBmaXQ6IChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSAtPlxuICAgIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyBzcmNXaWR0aCwgbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0KVxuICAgIHdpZHRoOiBzcmNXaWR0aCpyYXRpbywgaGVpZ2h0OiBzcmNIZWlnaHQqcmF0aW9cblxuICBqaW5pdDogLT5cbiAgICAkLmFqYXhTZXR1cFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiXG5cbiAgcGF0Y2g6ICh1cmwsIGRhdGEpIC0+XG5cbiAgICBfLmppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5hbHdheXMgKHJlc3BvbnNlKSAtPlxuICAgICAgU3Bpbm5lci5kKClcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OLmVycm9yXG4gICAgICBib2R5ID0gXCJcIlwiXG4gICAgICAgIDxiPiN7ZXJyb3IubWVzc2FnZX08L2I+PGJyIC8+PGJyIC8+XG4gICAgICAgICN7ZXJyb3IuZmlsZX06I3tlcnJvci5saW5lfVxuICAgICAgXCJcIlwiXG4gICAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgXy5qaW5pdCgpXG5cbiAgICBqZ2V0ID0gJC5nZXQgYXJncy4uLlxuXG4gICAgamdldC5hbHdheXMgKHJlc3BvbnNlKSAtPlxuICAgICAgU3Bpbm5lci5kKClcblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBlcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lcnJvclxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8Yj4je2Vycm9yLm1lc3NhZ2V9PC9iPjxiciAvPjxiciAvPlxuICAgICAgICAje2Vycm9yLmZpbGV9OiN7ZXJyb3IubGluZX1cbiAgICAgIFwiXCJcIlxuICAgICAgUHJvbXB0LmkgZXJyb3IudHlwZSwgYm9keSwgWydPSyddXG5cbiAgICByZXR1cm4gamdldFxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbmBleHBvcnQgZGVmYXVsdCBfYFxuIiwiYGltcG9ydCBfIGZyb20gJy4vMjU2LmNvZmZlZSdgXG5cblNwaW5uZXIgPVxuICBlbDoge31cblxuXG4gIGk6IChlbCwgb3ZlcnJpZGUpIC0+XG5cbiAgICBAZWwgPSAkKCcuc3Bpbm5lcicpXG5cbiAgICByZWN0ID0gZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGNvb3JkcyA9XG4gICAgICB0b3A6IFwiI3tyZWN0LnRvcCArICQod2luZG93KS5zY3JvbGxUb3AoKX1weFwiXG4gICAgICBsZWZ0OiBcIiN7cmVjdC5sZWZ0fXB4XCJcbiAgICAgIHdpZHRoOiBcIiN7cmVjdC53aWR0aH1weFwiXG4gICAgICBoZWlnaHQ6IFwiI3tyZWN0LmhlaWdodH1weFwiXG5cbiAgICBpZiBvdmVycmlkZSBpc250IHVuZGVmaW5lZFxuICAgICAgZm9yIGtleSwgY29vcmQgb2Ygb3ZlcnJpZGVcbiAgICAgICAgY29vcmRzW2tleV0gPSBjb29yZFxuXG4gICAgQGVsLmNzcyBjb29yZHNcblxuICAgIF8ub24gQGVsXG5cbiAgZDogLT5cbiAgICBzZXRUaW1lb3V0ID0+XG4gICAgICBfLm9mZiBAZWxcbiAgICAsIDEwMFxuXG5gZXhwb3J0IGRlZmF1bHQgU3Bpbm5lcmBcbiIsImBpbXBvcnQgXyBmcm9tICcuLzI1Ni5jb2ZmZWUnYFxuXG5Qcm9tcHQgPVxuICBlbDoge31cbiAgb3B0aW9uczoge31cbiAgY2FsbGJhY2s6IGZhbHNlXG4gIHBhcmFtczoge31cblxuICBpOiAodGl0bGUsIGNvcHksIG9wdGlvbnM9WydPSyddLCBwYXJhbXMsIGNhbGxiYWNrKSAtPlxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gZmFsc2VcbiAgICBQcm9tcHQucGFyYW1zID0gZmFsc2VcblxuICAgIFByb21wdC5jYWxsYmFjayA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdmdW5jdGlvbidcbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBjYWxsYmFjayBpZiB0eXBlb2YgY2FsbGJhY2sgaXMgJ2Z1bmN0aW9uJ1xuXG4gICAgUHJvbXB0LnBhcmFtcyA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnXG5cbiAgICBQcm9tcHQuZWwgPSAkICcucHJvbXB0J1xuXG4gICAgUHJvbXB0LmVsLmZpbmQgJy50aXRsZSdcbiAgICAgIC5odG1sIHRpdGxlXG4gICAgUHJvbXB0LmVsLmZpbmQgJy5jb3B5J1xuICAgICAgLmh0bWwgY29weVxuXG4gICAgaWYgdHlwZW9mIHBhcmFtcyBpcyAnb2JqZWN0JyBhbmQgJ3RleHRhcmVhJyBvZiBwYXJhbXMgYW5kIHBhcmFtcy50ZXh0YXJlYSBpcyB0cnVlXG4gICAgICBfLm9uIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgICBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhID4gdGV4dGFyZWEnXG4gICAgICAgIC52YWwgcGFyYW1zLnZhbHVlXG5cbiAgICBQcm9tcHQub3B0aW9ucyA9IFByb21wdC5lbC5maW5kICcub3B0aW9ucyA+IC5vcHRpb24nXG4gICAgXy5vZmYgUHJvbXB0Lm9wdGlvbnNcbiAgICBQcm9tcHQub3B0aW9ucy5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIFByb21wdC5vcHRpb25zLmZpcnN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcblxuICAgIGZvciBvLGkgaW4gb3B0aW9uc1xuICAgICAgb3B0aW9uID0gUHJvbXB0LmVsLmZpbmQgXCIub3B0aW9ucyAgPiAub3B0aW9uXyN7aSsxfVwiXG4gICAgICBfLm9uIG9wdGlvblxuICAgICAgb3B0aW9uLmh0bWwgb1xuICAgICAgICAuZGF0YSAndmFsdWUnLCBvXG5cbiAgICBfLm9uIFByb21wdC5lbCxcbiAgICBfLm9uICcuZmFkZSdcblxuICAgIFByb21wdC5oYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChkb2N1bWVudCkua2V5ZG93biBQcm9tcHQua2V5ZG93blxuICAgIFByb21wdC5vcHRpb25zLm9uICdjbGljaycsIFByb21wdC5jbGlja1xuICAgIFByb21wdC5lbC5maW5kKCcuaW5uZXIgPiAuY2FuY2VsJykub24gJ2NsaWNrJywgUHJvbXB0LmNhbmNlbFxuXG4gIGtleWRvd246IC0+XG4gICAgayA9IGV2ZW50LndoaWNoXG4gICAga2V5cyA9IFszOSwgOSwgMzcsIDEzLCAyN11cbiAgICByZXR1cm4gdHJ1ZSBpZiBrIG5vdCBpbiBrZXlzXG5cbiAgICBjdXJyZW50ID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb24ub24uYWN0aXZlJ1xuICAgIHNoaWZ0ID0gd2luZG93LmV2ZW50LnNoaWZ0S2V5XG5cbiAgICBpZiBrIGlzIDM5IG9yIChrIGlzIDkgYW5kICFzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQubmV4dCgpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5uZXh0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb25fMScpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMzcgb3IgKGsgaXMgOSBhbmQgc2hpZnQpXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBpZiBjdXJyZW50LnByZXYoKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIGN1cnJlbnQucHJldigpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBlbHNlXG4gICAgICAgIFByb21wdC5lbC5maW5kKCcub3B0aW9uLm9uJykubGFzdCgpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMTNcbiAgICAgIFByb21wdC50cmlnZ2VyIFByb21wdC5lbC5maW5kKCcub3B0aW9uLmFjdGl2ZScpLmRhdGEgJ3ZhbHVlJ1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgaWYgayBpcyAyN1xuICAgICAgUHJvbXB0LnRyaWdnZXIoZmFsc2UpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICBjYW5jZWw6IC0+XG4gICAgUHJvbXB0LnRyaWdnZXIgZmFsc2VcblxuICBjbGljazogLT5cbiAgICBQcm9tcHQudHJpZ2dlciAkKHRoaXMpLmRhdGEgJ3ZhbHVlJ1xuXG4gIHRyaWdnZXI6ICh2YWx1ZSkgLT5cbiAgICBfLm9mZiBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhJ1xuICAgIF8ub2ZmIFByb21wdC5lbFxuICAgIF8ub2ZmICcuZmFkZSdcbiAgICBQcm9tcHQub3B0aW9ucy51bmJpbmQgJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgJChkb2N1bWVudCkudW5iaW5kICdrZXlkb3duJywgUHJvbXB0LmtleWRvd25cbiAgICBjb25zb2xlLmxvZyBQcm9tcHQucGFyYW1zXG4gICAgaWYgUHJvbXB0LnBhcmFtcy50ZXh0YXJlYVxuICAgICAgdmFsID0gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsKClcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gcmVzcG9uc2U6IHZhbHVlLCB2YWw6IHZhbFxuICAgIGVsc2VcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gdmFsdWVcblxuYGV4cG9ydCBkZWZhdWx0IFByb21wdGBcbiIsImBpbXBvcnQgXyBmcm9tICcuLzI1Ni5jb2ZmZWUnYFxuXG5Ob3RpY2UgPVxuXG4gIHR5cGVzOiBbJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZyddXG4gIGVsOiBmYWxzZVxuICBvbjogZmFsc2VcbiAgdGltZW91dDogZmFsc2VcblxuICBpOiAoY29weSx0eXBlPSdpbmZvJykgLT5cblxuICAgIE5vdGljZS5lbCA9ICQoJy5ub3RpY2UnKSBpZiBOb3RpY2UuZWwgaXMgZmFsc2VcblxuICAgIGZvciBkdHlwZSBpbiBOb3RpY2UudHlwZXNcbiAgICAgIE5vdGljZS5lbC5yZW1vdmVDbGFzcyBkdHlwZVxuXG4gICAgTm90aWNlLmVsLmFkZENsYXNzIHR5cGVcblxuICAgIE5vdGljZS5lbC5maW5kKCcuY29weSA+IC5tZXNzYWdlJykuaHRtbCBjb3B5XG5cbiAgICBpZiBOb3RpY2Uub24gaXMgZmFsc2VcbiAgICAgIF8ub24gTm90aWNlLmVsXG4gICAgICBOb3RpY2UuaGFuZGxlcnMub24oKVxuICAgICAgTm90aWNlLm9uID0gdHJ1ZVxuXG4gICAgTm90aWNlLnRpbWVvdXQgPSBzZXRUaW1lb3V0IC0+XG4gICAgICBOb3RpY2UuZCgpXG4gICAgLCA1MDAwXG5cbiAgaGFuZGxlcnM6XG4gICAgb246IC0+XG4gICAgICAkKCcubm90aWNlID4gLmlubmVyID4gLmNsb3NlJykuY2xpY2sgTm90aWNlLmRcbiAgICBvZmY6IC0+XG4gICAgICAkKCcubm90aWNlID4gLmlubmVyID4gLmNsb3NlJykudW5iaW5kICdjbGljaycsIE5vdGljZS5kXG5cbiAgZDogLT5cbiAgICBjbGVhclRpbWVvdXQgTm90aWNlLnRpbWVvdXQgaWYgTm90aWNlLnRpbWVvdXQgaXNudCBmYWxzZVxuICAgIE5vdGljZS50aW1lb3V0ID0gZmFsc2VcbiAgICBOb3RpY2UuaGFuZGxlcnMub2ZmKClcbiAgICBfLm9mZiBOb3RpY2UuZWwsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC4yXG4gICAgTm90aWNlLm9uID0gZmFsc2VcblxuYGV4cG9ydCBkZWZhdWx0IE5vdGljZWBcbiIsIlxuYGltcG9ydCBfIGZyb20gJy4vMjU2LmNvZmZlZSdgXG5cbk1lID1cblxuICBsb2dvdXQ6IChjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2F1dGgvbG9nb3V0J1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZSgpXG5cbiAgb2F1dGg6ICh0eXBlLCBjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0IFwiL2FwaS9hdXRoLyN7dHlwZX1cIlxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZShyZXNwb25zZS5kYXRhLnVyaSlcblxuICBhdXRoZWQ6IChyZXN1bHQpIC0+XG4gICAgXy5nZXQgJy9hcGkvYXV0aCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgcmVzdWx0IHJlc3BvbnNlLmRhdGEudXNlclxuXG5gZXhwb3J0IGRlZmF1bHQgTWVgXG4iLCJgaW1wb3J0IF8gZnJvbSAnLi8yNTYuY29mZmVlJ2BcbmBpbXBvcnQgTWUgZnJvbSAnLi9tZS5jb2ZmZWUnYFxuYGltcG9ydCBTcGlubmVyIGZyb20gJy4vc3Bpbm5lci5jb2ZmZWUnYFxuYGltcG9ydCBOb3RpY2UgZnJvbSAnLi9ub3RpY2UuY29mZmVlJ2BcblxuR2xvYmFsID1cblxuICAjIGtldmluIG9sc29uIChrZXZpbkAyNTYuaW8pIGFrYSDwn4yA8J+Ot1xuXG4gIHdpbmRvdzogZmFsc2VcblxuICBpOiAtPlxuICAgIEdsb2JhbC5oYW5kbGVycygpXG4gICAgR2xvYmFsLmxvZ2luQ2hlY2soKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLnVzZXIgPiAucHJvZmlsZScpLmNsaWNrIEdsb2JhbC51c2VyUHJvZmlsZUhhbmRsZXJcbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAudXNlciA+IC5vYXV0aHMgPiAub2F1dGgnKS5jbGljayBHbG9iYWwudXNlck9hdXRoSGFuZGxlclxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC51c2VyID4gLnBpY3R1cmUgPiAubG9nb3V0JykuY2xpY2sgR2xvYmFsLmxvZ291dEhhbmRsZXJcblxuICBsb2dvdXRIYW5kbGVyOiAtPlxuXG4gICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICBNZS5sb2dvdXQgLT5cbiAgICAgIF8uc3dhcCAnLnVzZXIgPiAucHJvZmlsZSdcbiAgICAgIF8uc3dhcCAnLnVzZXIgPiAucGljdHVyZSdcbiAgICAgIE5vdGljZS5pICdMb2dvdXQgU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuXG4gIHVzZXJQcm9maWxlSGFuZGxlcjogLT5cblxuICAgIG9hID0gJCgnLm9hdXRocycpXG4gICAgdGwgPSBuZXcgVGltZWxpbmVNYXggcmVwZWF0OiAwXG5cbiAgICBpZiBvYS5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgXy5vbiBvYVxuICAgICAgdGwudG8gJyNwcm9maWxlU1ZHJywgMC44LCB7bW9ycGhTVkc6ICcjY2FuY2VsU1ZHJywgZWFzZTpCYWNrLmVhc2VJbk91dH1cbiAgICBlbHNlXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNwcm9maWxlU1ZHJywgZWFzZTpCYWNrLmVhc2VJbk91dH1cbiAgICAgIF8ub2ZmIG9hLCBvZmZpbmc6IDAuNVxuXG4gIHVzZXJPYXV0aEhhbmRsZXI6IC0+XG5cbiAgICB0eXBlID0gJCh0aGlzKS5kYXRhICd0eXBlJ1xuXG4gICAgR2xvYmFsLnVzZXJQcm9maWxlSGFuZGxlcigpXG4gICAgcmV0dXJuIHRydWUgaWYgdHlwZSBpcyAnY2FuY2VsJ1xuXG4gICAgR2xvYmFsLm9hdXRoV2luZG93ICcvbG9hZGluZydcblxuICAgIFNwaW5uZXIuaSAkKCdoZWFkZXInKVxuXG4gICAgTWUub2F1dGggdHlwZSwgKHVyaSkgLT5cbiAgICAgIEdsb2JhbC53aW5kb3cubG9jYXRpb24uaHJlZiA9IHVyaVxuXG4gIG9hdXRoV2luZG93OiAodXJsKSAtPlxuICAgIHcgPSA2NDBcbiAgICBoID0gNTUwXG4gICAgbGVmdCA9IChzY3JlZW4ud2lkdGgvMikgLSAody8yKVxuICAgIHRvcCA9IChzY3JlZW4uaGVpZ2h0LzIpIC0gKGgvMilcblxuXG4gICAgR2xvYmFsLndpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgJ0xvZ2luIC8gUmVnaXN0ZXInLCBcInRvb2xiYXI9bm8sIGxvY2F0aW9uPW5vLCBkaXJlY3Rvcmllcz1ubywgc3RhdHVzPW5vLCBtZW51YmFyPW5vLCBzY3JvbGxiYXJzPW5vLCByZXNpemFibGU9bm8sIGNvcHloaXN0b3J5PW5vLCB3aWR0aD0je3d9LGhlaWdodD0je2h9LHRvcD0je3RvcH0sbGVmdD0je2xlZnR9XCIpXG4gICAgR2xvYmFsLndpbmRvdy5mb2N1cyBpZiB3aW5kb3cuZm9jdXNcblxuICAgIHJldHVyblxuXG4gIG9hdXRoQ29tcGxldGU6ICh1c2VyKSAtPlxuXG4gICAgU3Bpbm5lci5kKClcblxuICAgIEdsb2JhbC5sb2dpbiB1c2VyXG5cbiAgICBOb3RpY2UuaSAnTG9naW4gU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuXG4gIGxvZ2luOiAodXNlcikgLT5cblxuICAgIHdpbmRvdy5Vc2VyID0gdXNlclxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLnVzZXIgPiAucGljdHVyZSA+IGltZycpLmF0dHIgJ3NyYycsIFVzZXIucGljdHVyZVxuICAgIF8ub2ZmICcudXNlciA+IC5wcm9maWxlJ1xuICAgIF8ub2ZmICcudXNlciA+IC5vYXV0aHMnXG4gICAgXy5vbiAnLnVzZXIgPiAucGljdHVyZSdcblxuICBsb2dpbkNoZWNrOiAtPlxuXG4gICAgTWUuYXV0aGVkIChyZXN1bHQpIC0+XG4gICAgICBHbG9iYWwubG9naW4ocmVzdWx0KSBpZiByZXN1bHQgaXNudCBmYWxzZVxuXG5gZXhwb3J0IGRlZmF1bHQgR2xvYmFsYFxuIiwiXG5gaW1wb3J0IF8gZnJvbSAnLi8yNTYuY29mZmVlJ2BcblxuYGltcG9ydCBTcGlubmVyIGZyb20gJy4vc3Bpbm5lci5jb2ZmZWUnYFxuYGltcG9ydCBQcm9tcHQgZnJvbSAnLi9wcm9tcHQuY29mZmVlJ2BcbmBpbXBvcnQgTm90aWNlIGZyb20gJy4vbm90aWNlLmNvZmZlZSdgXG5cbmBpbXBvcnQgR2xvYmFsIGZyb20gJy4vZ2xvYmFsLmNvZmZlZSdgXG5gaW1wb3J0IE1lIGZyb20gJy4vbWUuY29mZmVlJ2BcblxuR2xvYmFsLmkoKVxuXy5jb25zdHJ1Y3RvcigpXG5cbndpbmRvdy5TcGlubmVyID0gU3Bpbm5lclxud2luZG93Lkdsb2JhbCA9IEdsb2JhbFxud2luZG93LlByb21wdCA9IFByb21wdFxud2luZG93Lk1lID0gTWVcbiJdLCJuYW1lcyI6WyJTcGlubmVyIiwiXyIsIlByb21wdCIsIk1lIiwiTm90aWNlIiwiR2xvYmFsIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFBLENBQUEsQ0FBQTtBQUFBLElBQUE7QUFBQSxDQUFBLEdBRUU7RUFBQSxXQUFBLEVBQWE7V0FDWCxJQUFDLENBQUEsT0FBRCxHQUFXLFdBQUEsQ0FBWSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxJQUFiLENBQVosRUFBNkIsR0FBN0I7R0FEYjtFQUdBLENBQUEsRUFDRTtJQUFBLE1BQUEsRUFBUSxLQUFSO0lBQ0EsT0FBQSxFQUFTLENBRFQ7R0FKRjtFQU9BLElBQUEsRUFBTSxTQUFDLEVBQUQsRUFBSyxNQUFMLEVBQW1CLEdBQW5COztNQUFLLFNBQU87OztNQUFPLE1BQUk7O0lBRTNCLElBQUcsQ0FBQSxDQUFBLEVBQUEsWUFBa0IsTUFBbEIsQ0FBSDtNQUNFLEVBQUEsR0FBSyxDQUFBLENBQUUsRUFBRixFQURQOztJQUdBLElBQUcsTUFBQSxLQUFZLEtBQWY7TUFDRSxFQUFFLENBQUMsV0FBSCxDQUFlLE1BQWYsRUFERjs7SUFHQSxJQUFHLEdBQUEsS0FBUyxLQUFaO01BQ0UsRUFBRSxDQUFDLFFBQUgsQ0FBWSxHQUFaLEVBREY7O1dBR087R0FsQlQ7RUFvQkEsR0FBQSxFQUFLLFNBQUMsRUFBRCxFQUFLLENBQUw7O01BQUssSUFBRTs7SUFFVixJQUFHLENBQUMsQ0FBQyxNQUFGLElBQWEsQ0FBQyxDQUFDLE9BQUYsR0FBWSxDQUE1QjtNQUVFLElBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLEtBQVYsRUFBaUIsUUFBakI7TUFDQSxVQUFBLENBQVcsQ0FBQSxTQUFBLEtBQUE7ZUFBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjs7T0FGUyxDQUFBLENBQUEsSUFBQSxDQUFYLEVBR0UsQ0FBQyxDQUFDLE9BQUYsR0FBVSxJQUFWLEdBQWlCLEdBSG5CLEVBSEY7S0FBQSxNQUFBO01BU0UsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQixFQVRGOztHQXRCRjtFQW1DQSxFQUFBLEVBQUksU0FBQyxFQUFELEVBQUssQ0FBTDtXQUNGLElBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLEtBQVYsRUFBaUIsSUFBakI7R0FwQ0Y7RUFzQ0EsSUFBQSxFQUFNLFNBQUMsRUFBRCxFQUFLLENBQUw7SUFFSixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLEVBQUUsQ0FBQyxRQUFILENBQVksS0FBWixDQUFIO01BQ0UsSUFBQyxDQUFBLEVBQUQsQ0FBSSxFQUFKLEVBQVEsQ0FBUixFQURGO0tBQUEsTUFBQTtNQUdFLElBQUMsQ0FBQSxHQUFELENBQUssRUFBTCxFQUFTLENBQVQsRUFIRjs7R0EzQ0Y7RUFrREEsTUFBQSxFQUFRLFNBQUMsR0FBRDtXQUNDLGtCQUFBLENBQW1CLEdBQW5CLENBQ0wsQ0FBQyxPQURJLENBQ0ksSUFESixFQUNVLEtBRFYsQ0FFTCxDQUFDLE9BRkksQ0FFSSxJQUZKLEVBRVUsS0FGVixDQUdMLENBQUMsT0FISSxDQUdJLEtBSEosRUFHVyxLQUhYLENBSUwsQ0FBQyxPQUpJLENBSUksS0FKSixFQUlXLEtBSlgsQ0FLTCxDQUFDLE9BTEksQ0FLSSxLQUxKLEVBS1csS0FMWCxDQU1MLENBQUMsT0FOSSxDQU1JLE1BTkosRUFNWSxHQU5aO0dBbkRUO0VBMkRBLENBQUEsRUFBRyxTQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CLEtBQW5CLEVBQTBCLEtBQTFCO1dBQ0QsSUFBSSxDQUFDLElBQUwsQ0FBVSxDQUFDLGFBQUQsRUFBZ0IsUUFBaEIsRUFBMEIsTUFBMUIsRUFBa0MsS0FBbEMsRUFBeUMsS0FBekMsQ0FBVjtHQTVERjtFQThEQSxJQUFBLEVBQU0sU0FBQyxHQUFELEVBQU0sR0FBTjtXQUNHLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBSSxDQUFDLE1BQUwsRUFBQSxHQUFnQixHQUEzQixDQUFBLEdBQWtDO0dBL0QzQztFQWlFQSxHQUFBLEVBQUssU0FBQyxRQUFELEVBQVcsU0FBWCxFQUFzQixRQUF0QixFQUFnQyxTQUFoQztRQUNIO0lBQUEsS0FBQSxHQUFRLElBQUksQ0FBQyxHQUFMLENBQVMsUUFBQSxHQUFXLFFBQXBCLEVBQThCLFNBQUEsR0FBWSxTQUExQztXQUNSO01BQUEsS0FBQSxFQUFPLFFBQUEsR0FBUyxLQUFoQjtNQUF1QixNQUFBLEVBQVEsU0FBQSxHQUFVLEtBQXpDOztHQW5FRjtFQXFFQSxLQUFBLEVBQU87V0FDTCxDQUFDLENBQUMsU0FBRixDQUNFO01BQUEsUUFBQSxFQUFVLE1BQVY7S0FERjtHQXRFRjtFQXlFQSxLQUFBLEVBQU8sU0FBQyxHQUFELEVBQU0sSUFBTjtRQUVMO0lBQUEsQ0FBQyxDQUFDLEtBQUY7SUFFQSxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsQ0FDUDtNQUFBLEdBQUEsRUFBSyxHQUFMO01BQ0EsSUFBQSxFQUFNLElBRE47TUFFQSxJQUFBLEVBQU0sT0FGTjtLQURPO0lBS1QsTUFBTSxDQUFDLE1BQVAsQ0FBYyxTQUFDLFFBQUQ7YUFDWixPQUFPLENBQUMsQ0FBUjtLQURGO0lBR0EsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFDLFFBQUQ7VUFDVjtNQUFBLEtBQUEsR0FBUSxRQUFRLENBQUMsWUFBWSxDQUFDO01BQzlCLElBQUEsR0FBTyxLQUFBLEdBQ0EsS0FBSyxDQUFDLE9BRE4sR0FDYyxvQkFEZCxHQUVILEtBQUssQ0FBQyxJQUZILEdBRVEsR0FGUixHQUVXLEtBQUssQ0FBQzthQUV4QixNQUFNLENBQUMsQ0FBUCxDQUFTLEtBQUssQ0FBQyxJQUFmLEVBQXFCLElBQXJCLEVBQTJCLENBQUMsSUFBRCxDQUEzQjtLQU5GO1dBUU87R0E3RlQ7RUErRkEsR0FBQSxFQUFLO1FBRUg7SUFGSTtJQUVKLENBQUMsQ0FBQyxLQUFGO0lBRUEsSUFBQSxHQUFPLENBQUMsQ0FBQyxHQUFGLFVBQU0sSUFBTjtJQUVQLElBQUksQ0FBQyxNQUFMLENBQVksU0FBQyxRQUFEO2FBQ1YsT0FBTyxDQUFDLENBQVI7S0FERjtJQUdBLElBQUksQ0FBQyxJQUFMLENBQVUsU0FBQyxRQUFEO1VBQ1I7TUFBQSxLQUFBLEdBQVEsUUFBUSxDQUFDLFlBQVksQ0FBQztNQUM5QixJQUFBLEdBQU8sS0FBQSxHQUNBLEtBQUssQ0FBQyxPQUROLEdBQ2Msb0JBRGQsR0FFSCxLQUFLLENBQUMsSUFGSCxHQUVRLEdBRlIsR0FFVyxLQUFLLENBQUM7YUFFeEIsTUFBTSxDQUFDLENBQVAsQ0FBUyxLQUFLLENBQUMsSUFBZixFQUFxQixJQUFyQixFQUEyQixDQUFDLElBQUQsQ0FBM0I7S0FORjtXQVFPO0dBaEhUO0VBa0hBLEdBQUEsRUFBSztRQUNIO0lBQUEsS0FBQSxHQUFRLDJoQ0FBQSxHQW1CRCxNQUFNLENBQUMsSUFBSSxDQUFDO1dBRW5CLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWixFQUFtQiw2Q0FBbkI7R0F4SUY7RUEwSUEsTUFBQSxFQUFRO0lBQ04sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVAsR0FBcUIsTUFBTSxDQUFDLFdBQTdCLENBQUEsR0FBNEMsR0FBN0MsQ0FBQSxJQUFxRCxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVAsR0FBb0IsTUFBTSxDQUFDLFVBQTVCLENBQUEsR0FBMEMsR0FBM0MsQ0FBekQ7TUFDRSxJQUFDLENBQUEsR0FBRDthQUNBLGFBQUEsQ0FBYyxJQUFDLENBQUEsT0FBZixFQUZGOztHQTNJRjs7O0FBK0lGOztBQ2pKQSxJQUFBQTs7QUFFQUEsU0FBQSxHQUNFO0VBQUEsRUFBQSxFQUFJLEVBQUo7RUFHQSxDQUFBLEVBQUcsU0FBQyxFQUFELEVBQUssUUFBTDtRQUVEO0lBQUEsSUFBQyxDQUFBLEVBQUQsR0FBTSxDQUFBLENBQUUsVUFBRjtJQUVOLElBQUEsR0FBTyxFQUFHLENBQUEsQ0FBQSxDQUFFLENBQUMscUJBQU47SUFFUCxNQUFBLEdBQ0U7TUFBQSxHQUFBLEVBQU8sQ0FBQyxJQUFJLENBQUMsR0FBTCxHQUFXLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxTQUFWLEVBQVosQ0FBQSxHQUFrQyxJQUF6QztNQUNBLElBQUEsRUFBUyxJQUFJLENBQUMsSUFBTixHQUFXLElBRG5CO01BRUEsS0FBQSxFQUFVLElBQUksQ0FBQyxLQUFOLEdBQVksSUFGckI7TUFHQSxNQUFBLEVBQVcsSUFBSSxDQUFDLE1BQU4sR0FBYSxJQUh2Qjs7SUFLRixJQUFHLFFBQUEsS0FBYyxNQUFqQjtXQUNFLGVBQUE7O1FBQ0UsTUFBTyxDQUFBLEdBQUEsQ0FBUCxHQUFjO09BRmxCOztJQUlBLElBQUMsQ0FBQSxFQUFFLENBQUMsR0FBSixDQUFRLE1BQVI7V0FFQUMsR0FBQyxDQUFDLEVBQUYsQ0FBSyxJQUFDLENBQUEsRUFBTjtHQXJCRjtFQXVCQSxDQUFBLEVBQUc7V0FDRCxVQUFBLENBQVcsQ0FBQSxTQUFBLEtBQUE7YUFBQTtlQUNUQSxHQUFDLENBQUMsR0FBRixDQUFNLEtBQUMsQ0FBQSxFQUFQOztLQURTLENBQUEsQ0FBQSxJQUFBLENBQVgsRUFFRSxHQUZGO0dBeEJGOzs7QUE0QkY7O0FDL0JBLElBQUFDLFFBQUEsQ0FBQTtBQUFBLElBQUE7QUFFQUEsUUFBQSxHQUNFO0VBQUEsRUFBQSxFQUFJLEVBQUo7RUFDQSxPQUFBLEVBQVMsRUFEVDtFQUVBLFFBQUEsRUFBVSxLQUZWO0VBR0EsTUFBQSxFQUFRLEVBSFI7RUFLQSxDQUFBLEVBQUcsU0FBQyxLQUFELEVBQVEsSUFBUixFQUFjLE9BQWQsRUFBOEIsTUFBOUIsRUFBc0MsUUFBdEM7UUFFRDs7TUFGZSxVQUFRLENBQUMsSUFBRDs7SUFFdkJBLFFBQU0sQ0FBQyxRQUFQLEdBQWtCO0lBQ2xCQSxRQUFNLENBQUMsTUFBUCxHQUFnQjtJQUVoQixJQUE0QixPQUFPLE1BQVAsS0FBaUIsVUFBN0M7TUFBQUEsUUFBTSxDQUFDLFFBQVAsR0FBa0IsT0FBbEI7O0lBQ0EsSUFBOEIsT0FBTyxRQUFQLEtBQW1CLFVBQWpEO01BQUFBLFFBQU0sQ0FBQyxRQUFQLEdBQWtCLFNBQWxCOztJQUVBLElBQTBCLE9BQU8sTUFBUCxLQUFpQixRQUEzQztNQUFBQSxRQUFNLENBQUMsTUFBUCxHQUFnQixPQUFoQjs7SUFFQUEsUUFBTSxDQUFDLEVBQVAsR0FBWSxDQUFBLENBQUUsU0FBRjtJQUVaQSxRQUFNLENBQUMsRUFBRSxDQUFDLElBQVYsQ0FBZSxRQUFmLENBQ0UsQ0FBQyxJQURILENBQ1EsS0FEUjtJQUVBQSxRQUFNLENBQUMsRUFBRSxDQUFDLElBQVYsQ0FBZSxPQUFmLENBQ0UsQ0FBQyxJQURILENBQ1EsSUFEUjtJQUdBLElBQUcsT0FBTyxNQUFQLEtBQWlCLFFBQWpCLElBQThCLFVBQUEsSUFBYyxNQUE1QyxJQUF1RCxNQUFNLENBQUMsUUFBUCxLQUFtQixJQUE3RTtNQUNFRCxHQUFDLENBQUMsRUFBRixDQUFLQyxRQUFNLENBQUMsRUFBRSxDQUFDLElBQVYsQ0FBZSxXQUFmLENBQUw7TUFDQUEsUUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFWLENBQWUsc0JBQWYsQ0FDRSxDQUFDLEdBREgsQ0FDTyxNQUFNLENBQUMsS0FEZCxFQUZGOztJQUtBQSxRQUFNLENBQUMsT0FBUCxHQUFpQkEsUUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFWLENBQWUsb0JBQWY7SUFDakJELEdBQUMsQ0FBQyxHQUFGLENBQU1DLFFBQU0sQ0FBQyxPQUFiO0lBQ0FBLFFBQU0sQ0FBQyxPQUFPLENBQUMsV0FBZixDQUEyQixRQUEzQjtJQUNBQSxRQUFNLENBQUMsT0FBTyxDQUFDLEtBQWYsRUFBc0IsQ0FBQyxRQUF2QixDQUFnQyxRQUFoQztTQUVBLGlEQUFBOztNQUNFLE1BQUEsR0FBU0EsUUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFWLENBQWUsc0JBQUEsR0FBc0IsQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFyQztNQUNURCxHQUFDLENBQUMsRUFBRixDQUFLLE1BQUw7TUFDQSxNQUFNLENBQUMsSUFBUCxDQUFZLENBQVosQ0FDRSxDQUFDLElBREgsQ0FDUSxPQURSLEVBQ2lCLENBRGpCOztJQUdGQSxHQUFDLENBQUMsRUFBRixDQUFLQyxRQUFNLENBQUMsRUFBWixFQUNBRCxHQUFDLENBQUMsRUFBRixDQUFLLE9BQUwsQ0FEQTtXQUdBQyxRQUFNLENBQUMsUUFBUDtHQXpDRjtFQTJDQSxRQUFBLEVBQVU7SUFDUixDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsT0FBWixDQUFvQkEsUUFBTSxDQUFDLE9BQTNCO0lBQ0FBLFFBQU0sQ0FBQyxPQUFPLENBQUMsRUFBZixDQUFrQixPQUFsQixFQUEyQkEsUUFBTSxDQUFDLEtBQWxDO1dBQ0FBLFFBQU0sQ0FBQyxFQUFFLENBQUMsSUFBVixDQUFlLGtCQUFmLENBQWtDLENBQUMsRUFBbkMsQ0FBc0MsT0FBdEMsRUFBK0NBLFFBQU0sQ0FBQyxNQUF0RDtHQTlDRjtFQWdEQSxPQUFBLEVBQVM7UUFDUDtJQUFBLENBQUEsR0FBSSxLQUFLLENBQUM7SUFDVixJQUFBLEdBQU8sQ0FBQyxFQUFELEVBQUssQ0FBTCxFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCO0lBQ1AsSUFBZSxhQUFTLElBQVQsRUFBQSxDQUFBLEtBQWY7YUFBTyxLQUFQOztJQUVBLE9BQUEsR0FBVUEsUUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFWLENBQWUsbUJBQWY7SUFDVixLQUFBLEdBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUVyQixJQUFHLENBQUEsS0FBSyxFQUFMLElBQVcsQ0FBQyxDQUFBLEtBQUssQ0FBTCxJQUFXLENBQUMsS0FBYixDQUFkO01BQ0UsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsUUFBcEI7TUFDQSxJQUFHLE9BQU8sQ0FBQyxJQUFSLEVBQWMsQ0FBQyxRQUFmLENBQXdCLElBQXhCLENBQUg7UUFDRSxPQUFPLENBQUMsSUFBUixFQUFjLENBQUMsUUFBZixDQUF3QixRQUF4QixFQURGO09BQUEsTUFBQTtRQUdFQSxRQUFNLENBQUMsRUFBRSxDQUFDLElBQVYsQ0FBZSxXQUFmLENBQTJCLENBQUMsUUFBNUIsQ0FBcUMsUUFBckMsRUFIRjs7YUFJTyxNQU5UOztJQVFBLElBQUcsQ0FBQSxLQUFLLEVBQUwsSUFBVyxDQUFDLENBQUEsS0FBSyxDQUFMLElBQVcsS0FBWixDQUFkO01BQ0UsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsUUFBcEI7TUFDQSxJQUFHLE9BQU8sQ0FBQyxJQUFSLEVBQWMsQ0FBQyxRQUFmLENBQXdCLElBQXhCLENBQUg7UUFDRSxPQUFPLENBQUMsSUFBUixFQUFjLENBQUMsUUFBZixDQUF3QixRQUF4QixFQURGO09BQUEsTUFBQTtRQUdFQSxRQUFNLENBQUMsRUFBRSxDQUFDLElBQVYsQ0FBZSxZQUFmLENBQTRCLENBQUMsSUFBN0IsRUFBbUMsQ0FBQyxRQUFwQyxDQUE2QyxRQUE3QyxFQUhGOzthQUlPLE1BTlQ7O0lBUUEsSUFBRyxDQUFBLEtBQUssRUFBUjtNQUNFQSxRQUFNLENBQUMsT0FBUCxDQUFlQSxRQUFNLENBQUMsRUFBRSxDQUFDLElBQVYsQ0FBZSxnQkFBZixDQUFnQyxDQUFDLElBQWpDLENBQXNDLE9BQXRDLENBQWY7YUFDTyxNQUZUOztJQUdBLElBQUcsQ0FBQSxLQUFLLEVBQVI7TUFDRUEsUUFBTSxDQUFDLE9BQVAsQ0FBZSxLQUFmO2FBQ08sTUFGVDs7R0EzRUY7RUErRUEsTUFBQSxFQUFRO1dBQ05BLFFBQU0sQ0FBQyxPQUFQLENBQWUsS0FBZjtHQWhGRjtFQWtGQSxLQUFBLEVBQU87V0FDTEEsUUFBTSxDQUFDLE9BQVAsQ0FBZSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLE9BQWIsQ0FBZjtHQW5GRjtFQXFGQSxPQUFBLEVBQVMsU0FBQyxLQUFEO1FBQ1A7SUFBQUQsR0FBQyxDQUFDLEdBQUYsQ0FBTUMsUUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFWLENBQWUsV0FBZixDQUFOO0lBQ0FELEdBQUMsQ0FBQyxHQUFGLENBQU1DLFFBQU0sQ0FBQyxFQUFiO0lBQ0FELEdBQUMsQ0FBQyxHQUFGLENBQU0sT0FBTjtJQUNBQyxRQUFNLENBQUMsT0FBTyxDQUFDLE1BQWYsQ0FBc0IsT0FBdEIsRUFBK0JBLFFBQU0sQ0FBQyxLQUF0QztJQUNBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxNQUFaLENBQW1CLFNBQW5CLEVBQThCQSxRQUFNLENBQUMsT0FBckM7SUFDQSxPQUFPLENBQUMsR0FBUixDQUFZQSxRQUFNLENBQUMsTUFBbkI7SUFDQSxJQUFHQSxRQUFNLENBQUMsTUFBTSxDQUFDLFFBQWpCO01BQ0UsR0FBQSxHQUFNQSxRQUFNLENBQUMsRUFBRSxDQUFDLElBQVYsQ0FBZSxzQkFBZixDQUNKLENBQUMsR0FERzt1REFFTkEsUUFBTSxDQUFDLFNBQVU7UUFBQSxRQUFBLEVBQVUsS0FBVjtRQUFpQixHQUFBLEVBQUssR0FBdEI7a0JBSG5CO0tBQUEsTUFBQTt1REFLRUEsUUFBTSxDQUFDLFNBQVUsZ0JBTG5COztHQTVGRjs7O0FBbUdGOztBQ3RHQSxJQUFBOztBQUVBLE1BQUEsR0FFRTtFQUFBLEtBQUEsRUFBTyxDQUFDLE1BQUQsRUFBUSxTQUFSLEVBQWtCLFNBQWxCLENBQVA7RUFDQSxFQUFBLEVBQUksS0FESjtFQUVBLEVBQUEsRUFBSSxLQUZKO0VBR0EsT0FBQSxFQUFTLEtBSFQ7RUFLQSxDQUFBLEVBQUcsU0FBQyxJQUFELEVBQU0sSUFBTjtRQUVEOztNQUZPLE9BQUs7O0lBRVosSUFBNEIsTUFBTSxDQUFDLEVBQVAsS0FBYSxLQUF6QztNQUFBLE1BQU0sQ0FBQyxFQUFQLEdBQVksQ0FBQSxDQUFFLFNBQUYsRUFBWjs7O1NBRUEscUNBQUE7O01BQ0UsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFWLENBQXNCLEtBQXRCOztJQUVGLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBVixDQUFtQixJQUFuQjtJQUVBLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBVixDQUFlLGtCQUFmLENBQWtDLENBQUMsSUFBbkMsQ0FBd0MsSUFBeEM7SUFFQSxJQUFHLE1BQU0sQ0FBQyxFQUFQLEtBQWEsS0FBaEI7TUFDRUQsR0FBQyxDQUFDLEVBQUYsQ0FBSyxNQUFNLENBQUMsRUFBWjtNQUNBLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBaEI7TUFDQSxNQUFNLENBQUMsRUFBUCxHQUFZLEtBSGQ7O1dBS0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsVUFBQSxDQUFXO2FBQzFCLE1BQU0sQ0FBQyxDQUFQO0tBRGUsRUFFZixJQUZlO0dBckJuQjtFQXlCQSxRQUFBLEVBQ0U7SUFBQSxFQUFBLEVBQUk7YUFDRixDQUFBLENBQUUsMkJBQUYsQ0FBOEIsQ0FBQyxLQUEvQixDQUFxQyxNQUFNLENBQUMsQ0FBNUM7S0FERjtJQUVBLEdBQUEsRUFBSzthQUNILENBQUEsQ0FBRSwyQkFBRixDQUE4QixDQUFDLE1BQS9CLENBQXNDLE9BQXRDLEVBQStDLE1BQU0sQ0FBQyxDQUF0RDtLQUhGO0dBMUJGO0VBK0JBLENBQUEsRUFBRztJQUNELElBQStCLE1BQU0sQ0FBQyxPQUFQLEtBQW9CLEtBQW5EO01BQUEsWUFBQSxDQUFhLE1BQU0sQ0FBQyxPQUFwQixFQUFBOztJQUNBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0lBQ2pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBaEI7SUFDQUEsR0FBQyxDQUFDLEdBQUYsQ0FBTSxNQUFNLENBQUMsRUFBYixFQUFpQjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQWMsT0FBQSxFQUFTLEdBQXZCO0tBQWpCO1dBQ0EsTUFBTSxDQUFDLEVBQVAsR0FBWTtHQXBDZDs7O0FBc0NGOztBQ3pDQSxJQUFBOztBQUVBLEVBQUEsR0FFRTtFQUFBLE1BQUEsRUFBUSxTQUFDLFFBQUQ7V0FFTkEsR0FBQyxDQUFDLEdBQUYsQ0FBTSxrQkFBTixDQUNFLENBQUMsSUFESCxDQUNRLFNBQUMsUUFBRDthQUNKLFFBQUE7S0FGSjtHQUZGO0VBTUEsS0FBQSxFQUFPLFNBQUMsSUFBRCxFQUFPLFFBQVA7V0FFTEEsR0FBQyxDQUFDLEdBQUYsQ0FBTSxZQUFBLEdBQWEsSUFBbkIsQ0FDRSxDQUFDLElBREgsQ0FDUSxTQUFDLFFBQUQ7YUFDSixRQUFBLENBQVMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUF2QjtLQUZKO0dBUkY7RUFZQSxNQUFBLEVBQVEsU0FBQyxNQUFEO1dBQ05BLEdBQUMsQ0FBQyxHQUFGLENBQU0sV0FBTixDQUNFLENBQUMsSUFESCxDQUNRLFNBQUMsUUFBRDthQUNKLE1BQUEsQ0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQXJCO0tBRko7R0FiRjs7O0FBaUJGOztBQ3RCQSxJQUFBOztBQUtBLE1BQUEsR0FJRTtFQUFBLE1BQUEsRUFBUSxLQUFSO0VBRUEsQ0FBQSxFQUFHO0lBQ0QsTUFBTSxDQUFDLFFBQVA7V0FDQSxNQUFNLENBQUMsVUFBUDtHQUpGO0VBTUEsUUFBQSxFQUFVO0lBRVIsQ0FBQSxDQUFFLG9DQUFGLENBQXVDLENBQUMsS0FBeEMsQ0FBOEMsTUFBTSxDQUFDLGtCQUFyRDtJQUNBLENBQUEsQ0FBRSw0Q0FBRixDQUErQyxDQUFDLEtBQWhELENBQXNELE1BQU0sQ0FBQyxnQkFBN0Q7V0FDQSxDQUFBLENBQUUsOENBQUYsQ0FBaUQsQ0FBQyxLQUFsRCxDQUF3RCxNQUFNLENBQUMsYUFBL0Q7R0FWRjtFQVlBLGFBQUEsRUFBZTtJQUViRCxTQUFPLENBQUMsQ0FBUixDQUFVLENBQUEsQ0FBRSxRQUFGLENBQVY7V0FFQUcsSUFBRSxDQUFDLE1BQUgsQ0FBVTtNQUNSRixHQUFDLENBQUMsSUFBRixDQUFPLGtCQUFQO01BQ0FBLEdBQUMsQ0FBQyxJQUFGLENBQU8sa0JBQVA7YUFDQUcsUUFBTSxDQUFDLENBQVAsQ0FBUyxtQkFBVCxFQUE4QixTQUE5QjtLQUhGO0dBaEJGO0VBcUJBLGtCQUFBLEVBQW9CO1FBRWxCO0lBQUEsRUFBQSxHQUFLLENBQUEsQ0FBRSxTQUFGO0lBQ0wsRUFBQSxHQUFTLElBQUEsV0FBQSxDQUFZO01BQUEsTUFBQSxFQUFRLENBQVI7S0FBWjtJQUVULElBQUcsRUFBRSxDQUFDLFFBQUgsQ0FBWSxLQUFaLENBQUg7TUFDRUgsR0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMO2FBQ0EsRUFBRSxDQUFDLEVBQUgsQ0FBTSxhQUFOLEVBQXFCLEdBQXJCLEVBQTBCO1FBQUMsUUFBQSxFQUFVLFlBQVg7UUFBeUIsSUFBQSxFQUFLLElBQUksQ0FBQyxTQUFuQztPQUExQixFQUZGO0tBQUEsTUFBQTtNQUlFLEVBQUUsQ0FBQyxFQUFILENBQU0sYUFBTixFQUFxQixHQUFyQixFQUEwQjtRQUFDLFFBQUEsRUFBVSxhQUFYO1FBQTBCLElBQUEsRUFBSyxJQUFJLENBQUMsU0FBcEM7T0FBMUI7YUFDQUEsR0FBQyxDQUFDLEdBQUYsQ0FBTSxFQUFOLEVBQVU7UUFBQSxNQUFBLEVBQVEsR0FBUjtPQUFWLEVBTEY7O0dBMUJGO0VBaUNBLGdCQUFBLEVBQWtCO1FBRWhCO0lBQUEsSUFBQSxHQUFPLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsTUFBYjtJQUVQLE1BQU0sQ0FBQyxrQkFBUDtJQUNBLElBQWUsSUFBQSxLQUFRLFFBQXZCO2FBQU8sS0FBUDs7SUFFQSxNQUFNLENBQUMsV0FBUCxDQUFtQixVQUFuQjtJQUVBRCxTQUFPLENBQUMsQ0FBUixDQUFVLENBQUEsQ0FBRSxRQUFGLENBQVY7V0FFQUcsSUFBRSxDQUFDLEtBQUgsQ0FBUyxJQUFULEVBQWUsU0FBQyxHQUFEO2FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBdkIsR0FBOEI7S0FEaEM7R0E1Q0Y7RUErQ0EsV0FBQSxFQUFhLFNBQUMsR0FBRDtRQUNYO0lBQUEsQ0FBQSxHQUFJO0lBQ0osQ0FBQSxHQUFJO0lBQ0osSUFBQSxHQUFPLENBQUMsTUFBTSxDQUFDLEtBQVAsR0FBYSxDQUFkLENBQUEsR0FBbUIsQ0FBQyxDQUFBLEdBQUUsQ0FBSDtJQUMxQixHQUFBLEdBQU0sQ0FBQyxNQUFNLENBQUMsTUFBUCxHQUFjLENBQWYsQ0FBQSxHQUFvQixDQUFDLENBQUEsR0FBRSxDQUFIO0lBRzFCLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLE1BQU0sQ0FBQyxJQUFQLENBQVksR0FBWixFQUFpQixrQkFBakIsRUFBcUMscUhBQUEsR0FBc0gsQ0FBdEgsR0FBd0gsVUFBeEgsR0FBa0ksQ0FBbEksR0FBb0ksT0FBcEksR0FBMkksR0FBM0ksR0FBK0ksUUFBL0ksR0FBdUosSUFBNUw7SUFDaEIsSUFBdUIsTUFBTSxDQUFDLEtBQTlCO01BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFkOztHQXZERjtFQTJEQSxhQUFBLEVBQWUsU0FBQyxJQUFEO0lBRWJILFNBQU8sQ0FBQyxDQUFSO0lBRUEsTUFBTSxDQUFDLEtBQVAsQ0FBYSxJQUFiO1dBRUFJLFFBQU0sQ0FBQyxDQUFQLENBQVMsa0JBQVQsRUFBNkIsU0FBN0I7R0FqRUY7RUFtRUEsS0FBQSxFQUFPLFNBQUMsSUFBRDtJQUVMLE1BQU0sQ0FBQyxJQUFQLEdBQWM7SUFFZCxDQUFBLENBQUUsMENBQUYsQ0FBNkMsQ0FBQyxJQUE5QyxDQUFtRCxLQUFuRCxFQUEwRCxJQUFJLENBQUMsT0FBL0Q7SUFDQUgsR0FBQyxDQUFDLEdBQUYsQ0FBTSxrQkFBTjtJQUNBQSxHQUFDLENBQUMsR0FBRixDQUFNLGlCQUFOO1dBQ0FBLEdBQUMsQ0FBQyxFQUFGLENBQUssa0JBQUw7R0ExRUY7RUE0RUEsVUFBQSxFQUFZO1dBRVZFLElBQUUsQ0FBQyxNQUFILENBQVUsU0FBQyxNQUFEO01BQ1IsSUFBd0IsTUFBQSxLQUFZLEtBQXBDO2VBQUEsTUFBTSxDQUFDLEtBQVAsQ0FBYSxNQUFiLEVBQUE7O0tBREY7R0E5RUY7OztBQWlGRjs7QUNoRkFFLFFBQU0sQ0FBQyxDQUFQOztBQUNBSixHQUFDLENBQUMsV0FBRjs7QUFFQSxNQUFNLENBQUMsT0FBUCxHQUFpQkQ7O0FBQ2pCLE1BQU0sQ0FBQyxNQUFQLEdBQWdCSzs7QUFDaEIsTUFBTSxDQUFDLE1BQVAsR0FBZ0JIOztBQUNoQixNQUFNLENBQUMsRUFBUCxHQUFZQzs7Iiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
