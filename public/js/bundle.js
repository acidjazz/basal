var _,
  slice = [].slice;

_ = {
  i: function() {
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
    this.jinit();
    jpatch = $.ajax({
      url: url,
      data: data,
      type: 'PATCH'
    });
    jpatch.fail(function(response) {
      return this.fail(response);
    });
    return jpatch;
  },
  get: function() {
    var args, jget;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.jinit();
    jget = $.get.apply($, args);
    jget.fail((function(_this) {
      return function(response) {
        return _this.fail(response);
      };
    })(this));
    return jget;
  },
  fail: function(response) {
    var body, editor, error, file, pug;
    error = response.responseJSON.errors[0];
    pug = error.message.match(/Pug Error: (.*?):([0-9]+):([0-9]+)/);
    if (pug !== null) {
      error.message = error.message.replace(/Pug Error: (.*?):([0-9]+):([0-9]+)/, '');
      error.file = pug[1];
      error.line = pug[2];
    }
    file = this.encode("" + error.file);
    switch (config.app.editor) {
      case 'macvim':
        editor = 'mvim://open?url=file://';
        break;
      case 'sublime':
        editor = 'subl://open?url=file://';
        break;
      case 'emacs':
        editor = 'emacs://open?url=file://';
        break;
      case 'textmate':
        editor = 'textmate://open/?url=file://';
        break;
      case 'phpstorm':
        editor = 'phpstorm://open?file=';
    }
    body = "<pre>" + error.message + "</pre>\n<a href=\"" + editor + file + "&line=" + error.line + "\"><b>" + error.file + ":" + error.line + "</b></a>";
    return Prompt.i(error.type, body, ['OK']);
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

_.i();

var config;

config = {
  "view": {
    "paths": ["/Users/k/basal/resources/views"],
    "compiled": "/Users/k/basal/storage/framework/views"
  },
  "app": {
    "editor": "macvim"
  },
  "color": {
    "white1": "#ffffff",
    "white2": "#f1f1f1",
    "white3": "#F4F4F4",
    "black1": "#000000",
    "black2": "#282828",
    "red1": "#C8212B",
    "cyan1": "#5FA793",
    "yellow1": "#F6BB45",
    "orange1": "#F68F62",
    "skin1": "#F3DDA3",
    "google_blue": "#4285f4",
    "google_green": "#34a853",
    "google_yellow": "#fbbc05",
    "google_red": "#ea4335",
    "github_blue": "#0D2636",
    "facebook_blue": "#4867AA",
    "instagram_or": "#FF7804",
    "twitter_blue": "#00ACED"
  },
  "font": {
    "h1": {
      "font-family": "Roboto",
      "font-size": "34px",
      "font-weight": "300"
    },
    "h1b": {
      "font-family": "Roboto",
      "font-size": "34px",
      "font-weight": "700"
    },
    "h2": {
      "font-family": "Roboto",
      "font-size": "24px",
      "font-weight": "300"
    },
    "h3": {
      "font-family": "Roboto",
      "font-size": "20px"
    },
    "c1": {
      "font-family": "Roboto",
      "font-size": "14px",
      "font-weight": "300"
    },
    "c1s": {
      "font-family": "Roboto",
      "font-size": "14px",
      "font-weight": "300"
    },
    "c1b": {
      "font-family": "Roboto",
      "font-size": "16px",
      "font-weight": "500"
    },
    "c2": {
      "font-family": "Roboto",
      "font-size": "18px",
      "font-weight": "300"
    },
    "c2b": {
      "font-family": "Roboto",
      "font-size": "18px",
      "font-weight": "500"
    },
    "notfound": {
      "font-family": "Monoton",
      "font-size": "75px"
    }
  },
  "meta": {
    "title": "basal",
    "url": "http://basal.dev/",
    "description": "minimal content management",
    "keywords": "cms",
    "repo": "http://www.github.com/acidjazz/basal"
  },
  "debugbar": {
    "enabled": null,
    "storage": {
      "enabled": true,
      "driver": "file",
      "path": "/Users/k/basal/storage/debugbar",
      "connection": null,
      "provider": ""
    },
    "include_vendors": true,
    "capture_ajax": true,
    "clockwork": false,
    "collectors": {
      "phpinfo": true,
      "messages": true,
      "time": true,
      "memory": true,
      "exceptions": true,
      "log": true,
      "db": true,
      "views": true,
      "route": true,
      "laravel": false,
      "events": false,
      "default_request": false,
      "symfony_request": true,
      "mail": true,
      "logs": false,
      "files": false,
      "config": false,
      "auth": false,
      "gate": false,
      "session": true
    },
    "options": {
      "auth": {
        "show_name": false
      },
      "db": {
        "with_params": true,
        "timeline": false,
        "backtrace": false,
        "explain": {
          "enabled": false,
          "types": ["SELECT"]
        },
        "hints": true
      },
      "mail": {
        "full_log": false
      },
      "views": {
        "data": false
      },
      "route": {
        "label": true
      },
      "logs": {
        "file": null
      }
    },
    "inject": true,
    "route_prefix": "_debugbar"
  },
  "cache": {
    "default": "array",
    "stores": {
      "apc": {
        "driver": "apc"
      },
      "array": {
        "driver": "array"
      },
      "database": {
        "driver": "database",
        "table": "cache",
        "connection": null
      },
      "file": {
        "driver": "file",
        "path": "/Users/k/basal/storage/framework/cache"
      },
      "memcached": {
        "driver": "memcached",
        "servers": [
          {
            "host": "127.0.0.1",
            "port": 11211,
            "weight": 100
          }
        ]
      },
      "redis": {
        "driver": "redis",
        "connection": "default"
      }
    },
    "prefix": "laravel"
  },
  "queue": {
    "default": "array",
    "connections": {
      "sync": {
        "driver": "sync"
      },
      "database": {
        "driver": "database",
        "table": "jobs",
        "queue": "default",
        "expire": 60
      },
      "beanstalkd": {
        "driver": "beanstalkd",
        "host": "localhost",
        "queue": "default",
        "ttr": 60
      },
      "sqs": {
        "driver": "sqs",
        "key": "your-public-key",
        "secret": "your-secret-key",
        "queue": "your-queue-url",
        "region": "us-east-1"
      },
      "iron": {
        "driver": "iron",
        "host": "mq-aws-us-east-1.iron.io",
        "token": "your-token",
        "project": "your-project-id",
        "queue": "your-queue-name",
        "encrypt": true
      },
      "redis": {
        "driver": "redis",
        "connection": "default",
        "queue": "default",
        "expire": 60
      }
    },
    "failed": {
      "database": "mongodb",
      "table": "failed_jobs"
    }
  }
};

var Dashboard;

Dashboard = {
  data: {},
  i: function() {
    return this.getdata((function(_this) {
      return function() {
        return _this.populate();
      };
    })(this));
  },
  populate: function() {
    return $('.dashboard .value').each((function(_this) {
      return function(i, el) {
        return $(el).html(_this.dotstovalue($(el).data('value')));
      };
    })(this));
  },
  getdata: function(complete) {
    return _.get('/api/users').done((function(_this) {
      return function(response) {
        _this.data.users = response;
        return complete();
      };
    })(this));
  },
  dotstovalue: function(dots) {
    var dim, j, len, ref, result;
    result = this.data;
    ref = dots.split('.');
    for (j = 0, len = ref.length; j < len; j++) {
      dim = ref[j];
      result = result[dim];
    }
    return result;
  }
};

var Global;

Global = {
  window: false,
  i: function() {
    Global.handlers();
    return Global.loginCheck();
  },
  handlers: function() {
    $('header > .inner > .me > .profile').click(Global.userProfileHandler);
    $('header > .inner > .me > .oauths > .oauth').click(Global.userOauthHandler);
    return $('header > .inner > .me > .picture > .logout').click(Global.logoutHandler);
  },
  logoutHandler: function() {
    Spinner.i($('header'));
    return Me.logout(function() {
      _.swap('.me > .profile');
      _.swap('.me > .picture');
      Notice.i('Logout Successful', 'success');
      return Spinner.d();
    });
  },
  userProfileHandler: function() {
    var oa, tl;
    oa = $('.oauths');
    tl = new TimelineMax({
      repeat: 0
    });
    if (oa.hasClass('off')) {
      _.on(oa);
      return tl.to('#profileSVG', 0.8, {
        morphSVG: '#cancelSVG',
        ease: Power4.easeInOut
      });
    } else {
      tl.to('#profileSVG', 0.8, {
        morphSVG: '#profileSVG',
        ease: Power4.easeInOut
      });
      return _.off(oa, {
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
    Spinner.i($('header'));
    return Me.oauth(type, function(uri) {
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
    Spinner.d();
    Global.login(user);
    return Notice.i('Login Successful', 'success');
  },
  login: function(user) {
    window.User = user;
    $('header > .inner > .me > .picture > img').attr('src', User.picture);
    _.off('.me > .profile');
    _.off('.me > .oauths');
    return _.on('.me > .picture');
  },
  loginCheck: function() {
    return Me.authed(function(result) {
      if (result !== false) {
        return Global.login(result);
      }
    });
  }
};

var Index;

_.constructor();

Index = (function() {
  function Index() {
    this.handlers();
  }

  Index.prototype.handlers = function() {
    return $('.top .burger').click(this.mobile);
  };

  Index.prototype.mobile = function() {
    _.swap('.top > .burger');
    return _.swap('.top > .menu');
  };

  return Index;

})();



var Me;

Me = {
  logout: function(complete) {
    return _.get('/api/auth/logout').done(function(response) {
      return complete();
    });
  },
  oauth: function(type, complete) {
    return _.get("/api/auth/" + type).done(function(response) {
      return complete(response.data.uri);
    });
  },
  authed: function(result) {
    return _.get('/api/auth').done(function(response) {
      return result(response.data.user);
    });
  }
};

var Notfound;

Notfound = {
  i: function() {
    $('#lineerror').novacancy({
      'reblinkProbability': 0.1,
      'blinkMin': 0.2,
      'blinkMax': 0.6,
      'loopMin': 8,
      'loopMax': 10,
      'color': '#ffffff',
      'glow': ['0 0 80px #ffffff', '0 0 30px #008000', '0 0 6px #0000ff']
    });
    return $('#linecode').novacancy({
      'blink': 1,
      'off': 1,
      'color': 'Red',
      'glow': ['0 0 80px Red', '0 0 30px FireBrick', '0 0 6px DarkRed']
    });
  }
};

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
      _.on(Notice.el);
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
    _.off(Notice.el, {
      offing: true,
      offtime: 0.2
    });
    return Notice.on = false;
  }
};

var Prompt,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Prompt = {
  el: {},
  options: {},
  callback: false,
  params: {},
  i: function(title, copy, options, params, callback) {
    var i, j, len, o, option;
    if (options == null) {
      options = ['OK'];
    }
    Prompt.callback = false;
    Prompt.params = false;
    if (typeof params === 'function') {
      Prompt.callback = params;
    }
    if (typeof callback === 'function') {
      Prompt.callback = callback;
    }
    if (typeof params === 'object') {
      Prompt.params = params;
    }
    Prompt.el = $('.prompt');
    Prompt.el.find('.title').html(title);
    Prompt.el.find('.copy').html(copy);
    if (typeof params === 'object' && 'textarea' in params && params.textarea === true) {
      _.on(Prompt.el.find('.textarea'));
      Prompt.el.find('.textarea > textarea').val(params.value);
    }
    Prompt.options = Prompt.el.find('.options > .option');
    _.off(Prompt.options);
    Prompt.options.removeClass('active');
    Prompt.options.first().addClass('active');
    for (i = j = 0, len = options.length; j < len; i = ++j) {
      o = options[i];
      option = Prompt.el.find(".options  > .option_" + (i + 1));
      _.on(option);
      option.html(o).data('value', o);
    }
    _.on(Prompt.el, _.on('.fade'));
    return Prompt.handlers();
  },
  handlers: function() {
    $(document).keydown(Prompt.keydown);
    Prompt.options.on('click', Prompt.click);
    return Prompt.el.find('.inner > .cancel').on('click', Prompt.cancel);
  },
  keydown: function() {
    var current, k, keys, shift;
    k = event.which;
    keys = [39, 9, 37, 13, 27];
    if (indexOf.call(keys, k) < 0) {
      return true;
    }
    current = Prompt.el.find('.option.on.active');
    shift = window.event.shiftKey;
    if (k === 39 || (k === 9 && !shift)) {
      current.removeClass('active');
      if (current.next().hasClass('on')) {
        current.next().addClass('active');
      } else {
        Prompt.el.find('.option_1').addClass('active');
      }
      return false;
    }
    if (k === 37 || (k === 9 && shift)) {
      current.removeClass('active');
      if (current.prev().hasClass('on')) {
        current.prev().addClass('active');
      } else {
        Prompt.el.find('.option.on').last().addClass('active');
      }
      return false;
    }
    if (k === 13) {
      Prompt.trigger(Prompt.el.find('.option.active').data('value'));
      return false;
    }
    if (k === 27) {
      Prompt.trigger(false);
      return false;
    }
  },
  cancel: function() {
    return Prompt.trigger(false);
  },
  click: function() {
    return Prompt.trigger($(this).data('value'));
  },
  trigger: function(value) {
    var val;
    _.off(Prompt.el.find('.textarea'));
    _.off(Prompt.el, {
      offing: true,
      offtime: 0.2
    });
    _.off('.fade', {
      offing: true,
      offitme: 0.2
    });
    Prompt.options.unbind('click', Prompt.click);
    $(document).unbind('keydown', Prompt.keydown);
    if (Prompt.params.textarea) {
      val = Prompt.el.find('.textarea > textarea').val();
      return typeof Prompt.callback === "function" ? Prompt.callback({
        response: value,
        val: val
      }) : void 0;
    } else {
      return typeof Prompt.callback === "function" ? Prompt.callback(value) : void 0;
    }
  }
};

var Spinner;

Spinner = {
  state: false,
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
    _.on(this.el);
    return this.state = true;
  },
  d: function() {
    return setTimeout((function(_this) {
      return function() {
        _.off(_this.el);
        return _this.state = false;
      };
    })(this), 100);
  }
};

var Users;

Users = {
  i: function() {
    console.log('Users.i');
    return this.load();
  },
  load: function() {
    Spinner.i($('.users > .content'));
    return _.get('/api/users', {
      view: true
    }).done(function(response) {
      $('.users > .content').html(response.view);
      return Spinner.d();
    });
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiZGFzaGJvYXJkLmNvZmZlZSIsImdsb2JhbC5jb2ZmZWUiLCJpbmRleC5jb2ZmZWUiLCJtYWluLmpzIiwibWUuY29mZmVlIiwibm90Zm91bmQuY29mZmVlIiwibm90aWNlLmNvZmZlZSIsInByb21wdC5jb2ZmZWUiLCJzcGlubmVyLmNvZmZlZSIsInVzZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUE7RUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFB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QUFELEdBQVM7RUFuQlIsQ0FKSDtFQXlCQSxDQUFBLEVBQUcsU0FBQTtXQUNELFVBQUEsQ0FBVyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDVCxDQUFDLENBQUMsR0FBRixDQUFNLEtBQUMsQ0FBQSxFQUFQO2VBQ0EsS0FBQyxDQUFBLEtBQUQsR0FBUztNQUZBO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYLEVBR0UsR0FIRjtFQURDLENBekJIOzs7QUNGRixJQUFBOztBQUFBLEtBQUEsR0FFRTtFQUFBLENBQUEsRUFBRyxTQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaO1dBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBQTtFQUZDLENBQUg7RUFJQSxJQUFBLEVBQU0sU0FBQTtJQUNKLE9BQU8sQ0FBQyxDQUFSLENBQVUsQ0FBQSxDQUFFLG1CQUFGLENBQVY7V0FDQSxDQUFDLENBQUMsR0FBRixDQUFNLFlBQU4sRUFDRTtNQUFBLElBQUEsRUFBTSxJQUFOO0tBREYsQ0FFQSxDQUFDLElBRkQsQ0FFTSxTQUFDLFFBQUQ7TUFDSixDQUFBLENBQUUsbUJBQUYsQ0FBc0IsQ0FBQyxJQUF2QixDQUE0QixRQUFRLENBQUMsSUFBckM7YUFDQSxPQUFPLENBQUMsQ0FBUixDQUFBO0lBRkksQ0FGTjtFQUZJLENBSk4iLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OLmVycm9yc1swXVxuICAgIHB1ZyA9IGVycm9yLm1lc3NhZ2UubWF0Y2ggL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKyk6KFswLTldKykvXG4gICAgaWYgcHVnIGlzbnQgbnVsbFxuICAgICAgZXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UucmVwbGFjZSAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKTooWzAtOV0rKS8sICcnXG4gICAgICBlcnJvci5maWxlID0gcHVnWzFdXG4gICAgICBlcnJvci5saW5lID0gcHVnWzJdXG5cbiAgICBmaWxlID0gQGVuY29kZSBcIiN7ZXJyb3IuZmlsZX1cIlxuXG4gICAgc3dpdGNoIGNvbmZpZy5hcHAuZWRpdG9yXG4gICAgICB3aGVuICdtYWN2aW0nIHRoZW4gZWRpdG9yID0gJ212aW06Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnc3VibGltZScgdGhlbiBlZGl0b3IgPSAnc3VibDovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdlbWFjcycgdGhlbiBlZGl0b3IgPSAnZW1hY3M6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAndGV4dG1hdGUnIHRoZW4gZWRpdG9yID0gJ3RleHRtYXRlOi8vb3Blbi8/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdwaHBzdG9ybScgdGhlbiBlZGl0b3IgPSAncGhwc3Rvcm06Ly9vcGVuP2ZpbGU9J1xuXG4gICAgYm9keSA9IFwiXCJcIlxuICAgICAgPHByZT4je2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICA8YSBocmVmPVwiI3tlZGl0b3J9I3tmaWxlfSZsaW5lPSN7ZXJyb3IubGluZX1cIj48Yj4je2Vycm9yLmZpbGV9OiN7ZXJyb3IubGluZX08L2I+PC9hPlxuICAgIFwiXCJcIlxuICAgIFByb21wdC5pIGVycm9yLnR5cGUsIGJvZHksIFsnT0snXVxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbl8uaSgpXG4iLCJjb25maWcgPSB7XCJ2aWV3XCI6e1wicGF0aHNcIjpbXCIvVXNlcnMvay9iYXNhbC9yZXNvdXJjZXMvdmlld3NcIl0sXCJjb21waWxlZFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvdmlld3NcIn0sXCJhcHBcIjp7XCJlZGl0b3JcIjpcIm1hY3ZpbVwifSxcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJ3aGl0ZTJcIjpcIiNmMWYxZjFcIixcIndoaXRlM1wiOlwiI0Y0RjRGNFwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJibGFjazJcIjpcIiMyODI4MjhcIixcInJlZDFcIjpcIiNDODIxMkJcIixcImN5YW4xXCI6XCIjNUZBNzkzXCIsXCJ5ZWxsb3cxXCI6XCIjRjZCQjQ1XCIsXCJvcmFuZ2UxXCI6XCIjRjY4RjYyXCIsXCJza2luMVwiOlwiI0YzRERBM1wiLFwiZ29vZ2xlX2JsdWVcIjpcIiM0Mjg1ZjRcIixcImdvb2dsZV9ncmVlblwiOlwiIzM0YTg1M1wiLFwiZ29vZ2xlX3llbGxvd1wiOlwiI2ZiYmMwNVwiLFwiZ29vZ2xlX3JlZFwiOlwiI2VhNDMzNVwiLFwiZ2l0aHViX2JsdWVcIjpcIiMwRDI2MzZcIixcImZhY2Vib29rX2JsdWVcIjpcIiM0ODY3QUFcIixcImluc3RhZ3JhbV9vclwiOlwiI0ZGNzgwNFwiLFwidHdpdHRlcl9ibHVlXCI6XCIjMDBBQ0VEXCJ9LFwiZm9udFwiOntcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwifSxcImMxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzFzXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNnB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9LFwiYzJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJjMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI1MDBcIn0sXCJub3Rmb3VuZFwiOntcImZvbnQtZmFtaWx5XCI6XCJNb25vdG9uXCIsXCJmb250LXNpemVcIjpcIjc1cHhcIn19LFwibWV0YVwiOntcInRpdGxlXCI6XCJiYXNhbFwiLFwidXJsXCI6XCJodHRwOi8vYmFzYWwuZGV2L1wiLFwiZGVzY3JpcHRpb25cIjpcIm1pbmltYWwgY29udGVudCBtYW5hZ2VtZW50XCIsXCJrZXl3b3Jkc1wiOlwiY21zXCIsXCJyZXBvXCI6XCJodHRwOi8vd3d3LmdpdGh1Yi5jb20vYWNpZGphenovYmFzYWxcIn0sXCJkZWJ1Z2JhclwiOntcImVuYWJsZWRcIjpudWxsLFwic3RvcmFnZVwiOntcImVuYWJsZWRcIjp0cnVlLFwiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2RlYnVnYmFyXCIsXCJjb25uZWN0aW9uXCI6bnVsbCxcInByb3ZpZGVyXCI6XCJcIn0sXCJpbmNsdWRlX3ZlbmRvcnNcIjp0cnVlLFwiY2FwdHVyZV9hamF4XCI6dHJ1ZSxcImNsb2Nrd29ya1wiOmZhbHNlLFwiY29sbGVjdG9yc1wiOntcInBocGluZm9cIjp0cnVlLFwibWVzc2FnZXNcIjp0cnVlLFwidGltZVwiOnRydWUsXCJtZW1vcnlcIjp0cnVlLFwiZXhjZXB0aW9uc1wiOnRydWUsXCJsb2dcIjp0cnVlLFwiZGJcIjp0cnVlLFwidmlld3NcIjp0cnVlLFwicm91dGVcIjp0cnVlLFwibGFyYXZlbFwiOmZhbHNlLFwiZXZlbnRzXCI6ZmFsc2UsXCJkZWZhdWx0X3JlcXVlc3RcIjpmYWxzZSxcInN5bWZvbnlfcmVxdWVzdFwiOnRydWUsXCJtYWlsXCI6dHJ1ZSxcImxvZ3NcIjpmYWxzZSxcImZpbGVzXCI6ZmFsc2UsXCJjb25maWdcIjpmYWxzZSxcImF1dGhcIjpmYWxzZSxcImdhdGVcIjpmYWxzZSxcInNlc3Npb25cIjp0cnVlfSxcIm9wdGlvbnNcIjp7XCJhdXRoXCI6e1wic2hvd19uYW1lXCI6ZmFsc2V9LFwiZGJcIjp7XCJ3aXRoX3BhcmFtc1wiOnRydWUsXCJ0aW1lbGluZVwiOmZhbHNlLFwiYmFja3RyYWNlXCI6ZmFsc2UsXCJleHBsYWluXCI6e1wiZW5hYmxlZFwiOmZhbHNlLFwidHlwZXNcIjpbXCJTRUxFQ1RcIl19LFwiaGludHNcIjp0cnVlfSxcIm1haWxcIjp7XCJmdWxsX2xvZ1wiOmZhbHNlfSxcInZpZXdzXCI6e1wiZGF0YVwiOmZhbHNlfSxcInJvdXRlXCI6e1wibGFiZWxcIjp0cnVlfSxcImxvZ3NcIjp7XCJmaWxlXCI6bnVsbH19LFwiaW5qZWN0XCI6dHJ1ZSxcInJvdXRlX3ByZWZpeFwiOlwiX2RlYnVnYmFyXCJ9LFwiY2FjaGVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwic3RvcmVzXCI6e1wiYXBjXCI6e1wiZHJpdmVyXCI6XCJhcGNcIn0sXCJhcnJheVwiOntcImRyaXZlclwiOlwiYXJyYXlcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJjYWNoZVwiLFwiY29ubmVjdGlvblwiOm51bGx9LFwiZmlsZVwiOntcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvY2FjaGVcIn0sXCJtZW1jYWNoZWRcIjp7XCJkcml2ZXJcIjpcIm1lbWNhY2hlZFwiLFwic2VydmVyc1wiOlt7XCJob3N0XCI6XCIxMjcuMC4wLjFcIixcInBvcnRcIjoxMTIxMSxcIndlaWdodFwiOjEwMH1dfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwifX0sXCJwcmVmaXhcIjpcImxhcmF2ZWxcIn0sXCJxdWV1ZVwiOntcImRlZmF1bHRcIjpcImFycmF5XCIsXCJjb25uZWN0aW9uc1wiOntcInN5bmNcIjp7XCJkcml2ZXJcIjpcInN5bmNcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJqb2JzXCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwiZXhwaXJlXCI6NjB9LFwiYmVhbnN0YWxrZFwiOntcImRyaXZlclwiOlwiYmVhbnN0YWxrZFwiLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwidHRyXCI6NjB9LFwic3FzXCI6e1wiZHJpdmVyXCI6XCJzcXNcIixcImtleVwiOlwieW91ci1wdWJsaWMta2V5XCIsXCJzZWNyZXRcIjpcInlvdXItc2VjcmV0LWtleVwiLFwicXVldWVcIjpcInlvdXItcXVldWUtdXJsXCIsXCJyZWdpb25cIjpcInVzLWVhc3QtMVwifSxcImlyb25cIjp7XCJkcml2ZXJcIjpcImlyb25cIixcImhvc3RcIjpcIm1xLWF3cy11cy1lYXN0LTEuaXJvbi5pb1wiLFwidG9rZW5cIjpcInlvdXItdG9rZW5cIixcInByb2plY3RcIjpcInlvdXItcHJvamVjdC1pZFwiLFwicXVldWVcIjpcInlvdXItcXVldWUtbmFtZVwiLFwiZW5jcnlwdFwiOnRydWV9LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwiZXhwaXJlXCI6NjB9fSxcImZhaWxlZFwiOntcImRhdGFiYXNlXCI6XCJtb25nb2RiXCIsXCJ0YWJsZVwiOlwiZmFpbGVkX2pvYnNcIn19fTsiLCJEYXNoYm9hcmQgPVxuXG4gIGRhdGE6IHt9XG5cbiAgaTogLT5cbiAgICBAZ2V0ZGF0YSA9PlxuICAgICAgQHBvcHVsYXRlKClcblxuICBwb3B1bGF0ZTogLT5cbiAgICAkKCcuZGFzaGJvYXJkIC52YWx1ZScpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgJChlbCkuaHRtbCBAZG90c3RvdmFsdWUgJChlbCkuZGF0YSAndmFsdWUnXG5cbiAgZ2V0ZGF0YTogKGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgJy9hcGkvdXNlcnMnXG4gICAgICAuZG9uZSAocmVzcG9uc2UgKSA9PlxuICAgICAgICBAZGF0YS51c2VycyA9IHJlc3BvbnNlXG4gICAgICAgIGNvbXBsZXRlKClcblxuICBkb3RzdG92YWx1ZTogKGRvdHMpIC0+XG4gICAgcmVzdWx0ID0gQGRhdGFcbiAgICBmb3IgZGltIGluIGRvdHMuc3BsaXQgJy4nXG4gICAgICByZXN1bHQgPSByZXN1bHRbZGltXVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuXG4iLCJHbG9iYWwgPVxuXG4gICMga2V2aW4gb2xzb24gKGtldmluQDI1Ni5pbykgYWthIPCfjIDwn463XG5cbiAgd2luZG93OiBmYWxzZVxuXG4gIGk6IC0+XG4gICAgR2xvYmFsLmhhbmRsZXJzKClcbiAgICBHbG9iYWwubG9naW5DaGVjaygpXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucHJvZmlsZScpLmNsaWNrIEdsb2JhbC51c2VyUHJvZmlsZUhhbmRsZXJcbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAub2F1dGhzID4gLm9hdXRoJykuY2xpY2sgR2xvYmFsLnVzZXJPYXV0aEhhbmRsZXJcbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5sb2dvdXQnKS5jbGljayBHbG9iYWwubG9nb3V0SGFuZGxlclxuXG4gIGxvZ291dEhhbmRsZXI6IC0+XG5cbiAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgIE1lLmxvZ291dCAtPlxuICAgICAgXy5zd2FwICcubWUgPiAucHJvZmlsZSdcbiAgICAgIF8uc3dhcCAnLm1lID4gLnBpY3R1cmUnXG4gICAgICBOb3RpY2UuaSAnTG9nb3V0IFN1Y2Nlc3NmdWwnLCAnc3VjY2VzcydcbiAgICAgIFNwaW5uZXIuZCgpXG5cbiAgdXNlclByb2ZpbGVIYW5kbGVyOiAtPlxuXG4gICAgb2EgPSAkKCcub2F1dGhzJylcbiAgICB0bCA9IG5ldyBUaW1lbGluZU1heCByZXBlYXQ6IDBcblxuICAgIGlmIG9hLmhhc0NsYXNzICdvZmYnXG4gICAgICBfLm9uIG9hXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNjYW5jZWxTVkcnLCBlYXNlOlBvd2VyNC5lYXNlSW5PdXR9XG4gICAgZWxzZVxuICAgICAgdGwudG8gJyNwcm9maWxlU1ZHJywgMC44LCB7bW9ycGhTVkc6ICcjcHJvZmlsZVNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICAgIF8ub2ZmIG9hLCBvZmZpbmc6IDAuNVxuXG4gIHVzZXJPYXV0aEhhbmRsZXI6IC0+XG5cbiAgICB0eXBlID0gJCh0aGlzKS5kYXRhICd0eXBlJ1xuXG4gICAgR2xvYmFsLnVzZXJQcm9maWxlSGFuZGxlcigpXG4gICAgcmV0dXJuIHRydWUgaWYgdHlwZSBpcyAnY2FuY2VsJ1xuXG4gICAgR2xvYmFsLm9hdXRoV2luZG93ICcvbG9hZGluZydcblxuICAgIFNwaW5uZXIuaSAkKCdoZWFkZXInKVxuXG4gICAgTWUub2F1dGggdHlwZSwgKHVyaSkgLT5cbiAgICAgIEdsb2JhbC53aW5kb3cubG9jYXRpb24uaHJlZiA9IHVyaVxuXG4gIG9hdXRoV2luZG93OiAodXJsKSAtPlxuICAgIHcgPSA2NDBcbiAgICBoID0gNTUwXG4gICAgbGVmdCA9IChzY3JlZW4ud2lkdGgvMikgLSAody8yKVxuICAgIHRvcCA9IChzY3JlZW4uaGVpZ2h0LzIpIC0gKGgvMilcblxuXG4gICAgR2xvYmFsLndpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgJ0xvZ2luIC8gUmVnaXN0ZXInLCBcInRvb2xiYXI9bm8sIGxvY2F0aW9uPW5vLCBkaXJlY3Rvcmllcz1ubywgc3RhdHVzPW5vLCBtZW51YmFyPW5vLCBzY3JvbGxiYXJzPW5vLCByZXNpemFibGU9bm8sIGNvcHloaXN0b3J5PW5vLCB3aWR0aD0je3d9LGhlaWdodD0je2h9LHRvcD0je3RvcH0sbGVmdD0je2xlZnR9XCIpXG4gICAgR2xvYmFsLndpbmRvdy5mb2N1cyBpZiB3aW5kb3cuZm9jdXNcblxuICAgIHJldHVyblxuXG4gIG9hdXRoQ29tcGxldGU6ICh1c2VyKSAtPlxuXG4gICAgU3Bpbm5lci5kKClcblxuICAgIEdsb2JhbC5sb2dpbiB1c2VyXG5cbiAgICBOb3RpY2UuaSAnTG9naW4gU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuXG4gIGxvZ2luOiAodXNlcikgLT5cblxuICAgIHdpbmRvdy5Vc2VyID0gdXNlclxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiBpbWcnKS5hdHRyICdzcmMnLCBVc2VyLnBpY3R1cmVcbiAgICBfLm9mZiAnLm1lID4gLnByb2ZpbGUnXG4gICAgXy5vZmYgJy5tZSA+IC5vYXV0aHMnXG4gICAgXy5vbiAnLm1lID4gLnBpY3R1cmUnXG5cbiAgbG9naW5DaGVjazogLT5cbiAgICBNZS5hdXRoZWQgKHJlc3VsdCkgLT5cbiAgICAgIEdsb2JhbC5sb2dpbihyZXN1bHQpIGlmIHJlc3VsdCBpc250IGZhbHNlXG4iLCJfLmNvbnN0cnVjdG9yKClcblxuY2xhc3MgSW5kZXhcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAbW9iaWxlXG5cbiAgbW9iaWxlOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG4iLG51bGwsIk1lID1cblxuICBsb2dvdXQ6IChjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2F1dGgvbG9nb3V0J1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZSgpXG5cbiAgb2F1dGg6ICh0eXBlLCBjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0IFwiL2FwaS9hdXRoLyN7dHlwZX1cIlxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZShyZXNwb25zZS5kYXRhLnVyaSlcblxuICBhdXRoZWQ6IChyZXN1bHQpIC0+XG4gICAgXy5nZXQgJy9hcGkvYXV0aCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgcmVzdWx0IHJlc3BvbnNlLmRhdGEudXNlclxuIiwiTm90Zm91bmQgPVxuICBpOiAtPlxuICAgICQoJyNsaW5lZXJyb3InKS5ub3ZhY2FuY3lcbiAgICAgICdyZWJsaW5rUHJvYmFiaWxpdHknOiAwLjFcbiAgICAgICdibGlua01pbic6IDAuMlxuICAgICAgJ2JsaW5rTWF4JzogMC42XG4gICAgICAnbG9vcE1pbic6IDhcbiAgICAgICdsb29wTWF4JzogMTBcbiAgICAgICdjb2xvcic6ICcjZmZmZmZmJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4ICNmZmZmZmYnLCAnMCAwIDMwcHggIzAwODAwMCcsICcwIDAgNnB4ICMwMDAwZmYnXVxuXG4gICAgJCgnI2xpbmVjb2RlJykubm92YWNhbmN5XG4gICAgICAnYmxpbmsnOiAxXG4gICAgICAnb2ZmJzogMVxuICAgICAgJ2NvbG9yJzogJ1JlZCdcbiAgICAgICdnbG93JzogWycwIDAgODBweCBSZWQnLCAnMCAwIDMwcHggRmlyZUJyaWNrJywgJzAgMCA2cHggRGFya1JlZCddXG4iLCJOb3RpY2UgPVxuXG4gIHR5cGVzOiBbJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZyddXG4gIGVsOiBmYWxzZVxuICBvbjogZmFsc2VcbiAgdGltZW91dDogZmFsc2VcblxuICBpOiAoY29weSx0eXBlPSdpbmZvJykgLT5cblxuICAgIE5vdGljZS5lbCA9ICQoJy5ub3RpY2UnKSBpZiBOb3RpY2UuZWwgaXMgZmFsc2VcblxuICAgIGZvciBkdHlwZSBpbiBOb3RpY2UudHlwZXNcbiAgICAgIE5vdGljZS5lbC5yZW1vdmVDbGFzcyBkdHlwZVxuXG4gICAgTm90aWNlLmVsLmFkZENsYXNzIHR5cGVcblxuICAgIE5vdGljZS5lbC5maW5kKCcuY29weSA+IC5tZXNzYWdlJykuaHRtbCBjb3B5XG5cbiAgICBpZiBOb3RpY2Uub24gaXMgZmFsc2VcbiAgICAgIF8ub24gTm90aWNlLmVsXG4gICAgICBOb3RpY2UuaGFuZGxlcnMub24oKVxuICAgICAgTm90aWNlLm9uID0gdHJ1ZVxuXG4gICAgTm90aWNlLnRpbWVvdXQgPSBzZXRUaW1lb3V0IC0+XG4gICAgICBOb3RpY2UuZCgpXG4gICAgLCA1MDAwXG5cbiAgaGFuZGxlcnM6XG4gICAgb246IC0+XG4gICAgICAkKCcubm90aWNlID4gLmlubmVyID4gLmNsb3NlJykuY2xpY2sgTm90aWNlLmRcbiAgICBvZmY6IC0+XG4gICAgICAkKCcubm90aWNlID4gLmlubmVyID4gLmNsb3NlJykudW5iaW5kICdjbGljaycsIE5vdGljZS5kXG5cbiAgZDogLT5cbiAgICBjbGVhclRpbWVvdXQgTm90aWNlLnRpbWVvdXQgaWYgTm90aWNlLnRpbWVvdXQgaXNudCBmYWxzZVxuICAgIE5vdGljZS50aW1lb3V0ID0gZmFsc2VcbiAgICBOb3RpY2UuaGFuZGxlcnMub2ZmKClcbiAgICBfLm9mZiBOb3RpY2UuZWwsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC4yXG4gICAgTm90aWNlLm9uID0gZmFsc2VcbiIsIlByb21wdCA9XG4gIGVsOiB7fVxuICBvcHRpb25zOiB7fVxuICBjYWxsYmFjazogZmFsc2VcbiAgcGFyYW1zOiB7fVxuXG4gIGk6ICh0aXRsZSwgY29weSwgb3B0aW9ucz1bJ09LJ10sIHBhcmFtcywgY2FsbGJhY2spIC0+XG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBmYWxzZVxuICAgIFByb21wdC5wYXJhbXMgPSBmYWxzZVxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ2Z1bmN0aW9uJ1xuICAgIFByb21wdC5jYWxsYmFjayA9IGNhbGxiYWNrIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG5cbiAgICBQcm9tcHQucGFyYW1zID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCdcblxuICAgIFByb21wdC5lbCA9ICQgJy5wcm9tcHQnXG5cbiAgICBQcm9tcHQuZWwuZmluZCAnLnRpdGxlJ1xuICAgICAgLmh0bWwgdGl0bGVcbiAgICBQcm9tcHQuZWwuZmluZCAnLmNvcHknXG4gICAgICAuaHRtbCBjb3B5XG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAndGV4dGFyZWEnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLnRleHRhcmVhIGlzIHRydWVcbiAgICAgIF8ub24gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICAgIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCBwYXJhbXMudmFsdWVcblxuICAgIFByb21wdC5vcHRpb25zID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb25zID4gLm9wdGlvbidcbiAgICBfLm9mZiBQcm9tcHQub3B0aW9uc1xuICAgIFByb21wdC5vcHRpb25zLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gICAgZm9yIG8saSBpbiBvcHRpb25zXG4gICAgICBvcHRpb24gPSBQcm9tcHQuZWwuZmluZCBcIi5vcHRpb25zICA+IC5vcHRpb25fI3tpKzF9XCJcbiAgICAgIF8ub24gb3B0aW9uXG4gICAgICBvcHRpb24uaHRtbCBvXG4gICAgICAgIC5kYXRhICd2YWx1ZScsIG9cblxuICAgIF8ub24gUHJvbXB0LmVsLFxuICAgIF8ub24gJy5mYWRlJ1xuXG4gICAgUHJvbXB0LmhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKGRvY3VtZW50KS5rZXlkb3duIFByb21wdC5rZXlkb3duXG4gICAgUHJvbXB0Lm9wdGlvbnMub24gJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbm5lciA+IC5jYW5jZWwnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2FuY2VsXG5cbiAga2V5ZG93bjogLT5cbiAgICBrID0gZXZlbnQud2hpY2hcbiAgICBrZXlzID0gWzM5LCA5LCAzNywgMTMsIDI3XVxuICAgIHJldHVybiB0cnVlIGlmIGsgbm90IGluIGtleXNcblxuICAgIGN1cnJlbnQgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbi5vbi5hY3RpdmUnXG4gICAgc2hpZnQgPSB3aW5kb3cuZXZlbnQuc2hpZnRLZXlcblxuICAgIGlmIGsgaXMgMzkgb3IgKGsgaXMgOSBhbmQgIXNoaWZ0KVxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgaWYgY3VycmVudC5uZXh0KCkuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBjdXJyZW50Lm5leHQoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgZWxzZVxuICAgICAgICBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbl8xJykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAzNyBvciAoayBpcyA5IGFuZCBzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQucHJldigpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5wcmV2KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24ub24nKS5sYXN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAxM1xuICAgICAgUHJvbXB0LnRyaWdnZXIgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24uYWN0aXZlJykuZGF0YSAndmFsdWUnXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZiBrIGlzIDI3XG4gICAgICBQcm9tcHQudHJpZ2dlcihmYWxzZSlcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gIGNhbmNlbDogLT5cbiAgICBQcm9tcHQudHJpZ2dlciBmYWxzZVxuXG4gIGNsaWNrOiAtPlxuICAgIFByb21wdC50cmlnZ2VyICQodGhpcykuZGF0YSAndmFsdWUnXG5cbiAgdHJpZ2dlcjogKHZhbHVlKSAtPlxuICAgIF8ub2ZmIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgXy5vZmYgUHJvbXB0LmVsLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuMlxuICAgIF8ub2ZmICcuZmFkZScsIG9mZmluZzogdHJ1ZSwgb2ZmaXRtZTogMC4yXG4gICAgUHJvbXB0Lm9wdGlvbnMudW5iaW5kICdjbGljaycsIFByb21wdC5jbGlja1xuICAgICQoZG9jdW1lbnQpLnVuYmluZCAna2V5ZG93bicsIFByb21wdC5rZXlkb3duXG4gICAgaWYgUHJvbXB0LnBhcmFtcy50ZXh0YXJlYVxuICAgICAgdmFsID0gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsKClcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gcmVzcG9uc2U6IHZhbHVlLCB2YWw6IHZhbFxuICAgIGVsc2VcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gdmFsdWVcbiIsIlxuU3Bpbm5lciA9XG5cbiAgc3RhdGU6IGZhbHNlXG5cbiAgZWw6IHt9XG5cbiAgaTogKGVsLCBvdmVycmlkZSkgLT5cblxuICAgIEBlbCA9ICQoJy5zcGlubmVyJylcblxuICAgIHJlY3QgPSBlbFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgY29vcmRzID1cbiAgICAgIHRvcDogXCIje3JlY3QudG9wICsgJCh3aW5kb3cpLnNjcm9sbFRvcCgpfXB4XCJcbiAgICAgIGxlZnQ6IFwiI3tyZWN0LmxlZnR9cHhcIlxuICAgICAgd2lkdGg6IFwiI3tyZWN0LndpZHRofXB4XCJcbiAgICAgIGhlaWdodDogXCIje3JlY3QuaGVpZ2h0fXB4XCJcblxuICAgIGlmIG92ZXJyaWRlIGlzbnQgdW5kZWZpbmVkXG4gICAgICBmb3Iga2V5LCBjb29yZCBvZiBvdmVycmlkZVxuICAgICAgICBjb29yZHNba2V5XSA9IGNvb3JkXG5cbiAgICBAZWwuY3NzIGNvb3Jkc1xuXG4gICAgXy5vbiBAZWxcbiAgICBAc3RhdGUgPSB0cnVlXG5cbiAgZDogLT5cbiAgICBzZXRUaW1lb3V0ID0+XG4gICAgICBfLm9mZiBAZWxcbiAgICAgIEBzdGF0ZSA9IGZhbHNlXG4gICAgLCAxMDBcbiIsIlxuVXNlcnMgPVxuXG4gIGk6IC0+XG4gICAgY29uc29sZS5sb2cgJ1VzZXJzLmknXG4gICAgQGxvYWQoKVxuXG4gIGxvYWQ6IC0+XG4gICAgU3Bpbm5lci5pKCQoJy51c2VycyA+IC5jb250ZW50JykpXG4gICAgXy5nZXQgJy9hcGkvdXNlcnMnLFxuICAgICAgdmlldzogdHJ1ZVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICQoJy51c2VycyA+IC5jb250ZW50JykuaHRtbCByZXNwb25zZS52aWV3XG4gICAgICBTcGlubmVyLmQoKVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
