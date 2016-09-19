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
    pug = error.message.match(/Pug Error: (.*?):([0-9]+)/);
    if (pug !== null) {
      error.message = error.message.replace(/Pug Error: (.*?):([0-9]+)/, '');
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
    if (error.file !== null) {
      body = "<pre>" + error.message + "</pre>\n<a href=\"" + editor + file + "&line=" + error.line + "\"><b>" + error.file + ":" + error.line + "</b></a>";
    } else {
      body = error.message;
    }
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

var Time;

Time = {
  interval: false,
  gap: 1000,
  i: function() {
    this.scrape();
    return this.int3erval = setInterval(this.scrape, this.gap);
  },
  scrape: function() {
    return $('time').each((function(_this) {
      return function(i, el) {
        var jel;
        jel = $(el);
        return jel.html(moment(jel.attr('title')).fromNow());
      };
    })(this));
  }
};

var Clients;

Clients = {
  i: function() {
    this.load();
    this.handlers();
    Time.i();
    return $('.date').each(function(i, el) {
      return console.log(i, el);
    });
  },
  load: function() {
    Spinner.i($('.clients > .content'));
    return _.get('/api/clients', {
      view: true
    }).done(function(response) {
      $('.clients > .content').html(response.view);
      return Spinner.d();
    });
  },
  handlers: function() {
    $('.add > .ctap').click(this.addHandler);
    return $('.add > .input > input').keyup(this.addEnterHandler);
  },
  addEnterHandler: function(e) {
    if (e.which === 13) {
      return Clients.addHandler();
    }
  },
  addHandler: function() {
    var input, inputel;
    inputel = $('.add > .input');
    input = $('.add > .input > input');
    if (inputel.hasClass('off')) {
      _.on(inputel);
      return input.focus();
    }
    if (input.val() === "") {
      Notice.i('Place specify a name', 'warning');
      return input.focus();
    }
    Spinner.i($('.clients > .content'));
    return _.get('/api/client/add', {
      name: input.val()
    }).always(function() {
      return Spinner.d();
    }).done(function(response) {
      console.log(response);
      input.val('');
      _.off(inputel);
      Notice.i('Client added successfully', 'success');
      return Clients.load();
    });
  }
};

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
    "grey1": "#e5e5e5",
    "grey2": "#f5f5f5",
    "grey3": "#d0d0d0",
    "black1": "#000000",
    "black2": "#282828",
    "black3": "#333333",
    "red1": "#C8212B",
    "cyan1": "#5FA793",
    "yellow1": "#F6BB45",
    "orange1": "#F68F62",
    "skin1": "#F3DDA3",
    "green1": "#5ba541",
    "green2": "#88d96d",
    "green3": "#77d358",
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
    var gets;
    gets = ['users', 'clients', 'structures'];
    return $(gets).each((function(_this) {
      return function(index, get) {
        return _.get("/api/" + get).done(function(response) {
          _this.data[get] = response;
          if (Object.keys(_this.data).length === gets.length) {
            return complete();
          }
        });
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
    Prompt.handlers();
    return Prompt.options.first().focus();
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

var Structures;

Structures = {
  template: false,
  i: function() {
    this.template = $('.entities > #template').html();
    this.handlers();
    return this.entityAdd();
  },
  handlers: function() {
    $('.content > .add > .entities > .more').click(this.entityAddHandler);
    $('.content > .add > .entities').on('click', '.entity > .remove', this.entityRemoveHandler);
    return $('.content > .add > .submit > .ctap').click(this.submitHandler);
  },
  entityAddHandler: function() {
    return Structures.entityAdd();
  },
  entityRemoveHandler: function() {
    return $(this).parent().remove();
  },
  entityAdd: function() {
    $('.entities').append(this.template);
    return this.select2();
  },
  select2: function() {
    return $('.entities > .entity > .input > select').select2({
      placeholder: "Type",
      minimumResultsForSearch: -1
    });
  },
  submitHandler: function() {
    return console.log('submit');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudHMuY29mZmVlIiwiY29uZmlnLmNvZmZlZSIsImRhc2hib2FyZC5jb2ZmZWUiLCJnbG9iYWwuY29mZmVlIiwiaW5kZXguY29mZmVlIiwibWFpbi5qcyIsIm1lLmNvZmZlZSIsIm5vdGZvdW5kLmNvZmZlZSIsIm5vdGljZS5jb2ZmZWUiLCJwcm9tcHQuY29mZmVlIiwic3Bpbm5lci5jb2ZmZWUiLCJzdHJ1Y3R1cmVzLmNvZmZlZSIsInVzZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUE7RUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFD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Q0FBQyxHQUFSLENBQVksUUFBWjtFQUZhLENBM0JmOzs7QUNERixJQUFBOztBQUFBLEtBQUEsR0FFRTtFQUFBLENBQUEsRUFBRyxTQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaO1dBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBQTtFQUZDLENBQUg7RUFJQSxJQUFBLEVBQU0sU0FBQTtJQUNKLE9BQU8sQ0FBQyxDQUFSLENBQVUsQ0FBQSxDQUFFLG1CQUFGLENBQVY7V0FDQSxDQUFDLENBQUMsR0FBRixDQUFNLFlBQU4sRUFDRTtNQUFBLElBQUEsRUFBTSxJQUFOO0tBREYsQ0FFQSxDQUFDLElBRkQsQ0FFTSxTQUFDLFFBQUQ7TUFDSixDQUFBLENBQUUsbUJBQUYsQ0FBc0IsQ0FBQyxJQUF2QixDQUE0QixRQUFRLENBQUMsSUFBckM7YUFDQSxPQUFPLENBQUMsQ0FBUixDQUFBO0lBRkksQ0FGTjtFQUZJLENBSk4iLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuXG4gICAgZXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04uZXJyb3JzWzBdXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG5fLmkoKVxuIiwiVGltZSA9XG4gIGludGVydmFsOiBmYWxzZVxuICBnYXA6IDEwMDBcblxuICBpOiAtPlxuICAgIEBzY3JhcGUoKVxuICAgIEBpbnQzZXJ2YWwgPSBzZXRJbnRlcnZhbCBAc2NyYXBlLCBAZ2FwXG5cbiAgc2NyYXBlOiAtPlxuICAgICQoJ3RpbWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGplbCA9ICQgZWxcbiAgICAgIGplbC5odG1sIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuZnJvbU5vdygpXG5cbiIsIkNsaWVudHMgPVxuXG4gIGk6IC0+XG4gICAgQGxvYWQoKVxuICAgIEBoYW5kbGVycygpXG4gICAgVGltZS5pKClcblxuICAgICQoJy5kYXRlJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBjb25zb2xlLmxvZyBpLCBlbFxuXG4gIGxvYWQ6IC0+XG4gICAgU3Bpbm5lci5pKCQoJy5jbGllbnRzID4gLmNvbnRlbnQnKSlcbiAgICBfLmdldCAnL2FwaS9jbGllbnRzJyxcbiAgICAgIHZpZXc6IHRydWVcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAkKCcuY2xpZW50cyA+IC5jb250ZW50JykuaHRtbCByZXNwb25zZS52aWV3XG4gICAgICBTcGlubmVyLmQoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5hZGQgPiAuY3RhcCcpLmNsaWNrIEBhZGRIYW5kbGVyXG4gICAgJCgnLmFkZCA+IC5pbnB1dCA+IGlucHV0Jykua2V5dXAgQGFkZEVudGVySGFuZGxlclxuXG4gIGFkZEVudGVySGFuZGxlcjogKGUpIC0+XG4gICAgQ2xpZW50cy5hZGRIYW5kbGVyKCkgaWYgZS53aGljaCA9PSAxM1xuXG4gIGFkZEhhbmRsZXI6IC0+XG5cbiAgICBpbnB1dGVsID0gJCgnLmFkZCA+IC5pbnB1dCcpXG4gICAgaW5wdXQgPSAkKCcuYWRkID4gLmlucHV0ID4gaW5wdXQnKVxuXG4gICAgaWYgaW5wdXRlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgXy5vbiBpbnB1dGVsXG4gICAgICByZXR1cm4gaW5wdXQuZm9jdXMoKVxuXG4gICAgaWYgaW5wdXQudmFsKCkgPT0gXCJcIlxuICAgICAgTm90aWNlLmkgJ1BsYWNlIHNwZWNpZnkgYSBuYW1lJywgJ3dhcm5pbmcnXG4gICAgICByZXR1cm4gaW5wdXQuZm9jdXMoKVxuXG4gICAgU3Bpbm5lci5pKCQoJy5jbGllbnRzID4gLmNvbnRlbnQnKSlcbiAgICBfLmdldCAnL2FwaS9jbGllbnQvYWRkJywgbmFtZTogaW5wdXQudmFsKClcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGNvbnNvbGUubG9nIHJlc3BvbnNlXG4gICAgICBpbnB1dC52YWwoJycpXG4gICAgICBfLm9mZiBpbnB1dGVsXG4gICAgICBOb3RpY2UuaSAnQ2xpZW50IGFkZGVkIHN1Y2Nlc3NmdWxseScsICdzdWNjZXNzJ1xuICAgICAgQ2xpZW50cy5sb2FkKClcbiIsImNvbmZpZyA9IHtcInZpZXdcIjp7XCJwYXRoc1wiOltcIi9Vc2Vycy9rL2Jhc2FsL3Jlc291cmNlcy92aWV3c1wiXSxcImNvbXBpbGVkXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay92aWV3c1wifSxcImFwcFwiOntcImVkaXRvclwiOlwibWFjdmltXCJ9LFwiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcIndoaXRlMlwiOlwiI2YxZjFmMVwiLFwid2hpdGUzXCI6XCIjRjRGNEY0XCIsXCJncmV5MVwiOlwiI2U1ZTVlNVwiLFwiZ3JleTJcIjpcIiNmNWY1ZjVcIixcImdyZXkzXCI6XCIjZDBkMGQwXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImJsYWNrMlwiOlwiIzI4MjgyOFwiLFwiYmxhY2szXCI6XCIjMzMzMzMzXCIsXCJyZWQxXCI6XCIjQzgyMTJCXCIsXCJjeWFuMVwiOlwiIzVGQTc5M1wiLFwieWVsbG93MVwiOlwiI0Y2QkI0NVwiLFwib3JhbmdlMVwiOlwiI0Y2OEY2MlwiLFwic2tpbjFcIjpcIiNGM0REQTNcIixcImdyZWVuMVwiOlwiIzViYTU0MVwiLFwiZ3JlZW4yXCI6XCIjODhkOTZkXCIsXCJncmVlbjNcIjpcIiM3N2QzNThcIixcImdvb2dsZV9ibHVlXCI6XCIjNDI4NWY0XCIsXCJnb29nbGVfZ3JlZW5cIjpcIiMzNGE4NTNcIixcImdvb2dsZV95ZWxsb3dcIjpcIiNmYmJjMDVcIixcImdvb2dsZV9yZWRcIjpcIiNlYTQzMzVcIixcImdpdGh1Yl9ibHVlXCI6XCIjMEQyNjM2XCIsXCJmYWNlYm9va19ibHVlXCI6XCIjNDg2N0FBXCIsXCJpbnN0YWdyYW1fb3JcIjpcIiNGRjc4MDRcIixcInR3aXR0ZXJfYmx1ZVwiOlwiIzAwQUNFRFwifSxcImZvbnRcIjp7XCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImgxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIn0sXCJjMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMxc1wiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTZweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifSxcImMyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9LFwibm90Zm91bmRcIjp7XCJmb250LWZhbWlseVwiOlwiTW9ub3RvblwiLFwiZm9udC1zaXplXCI6XCI3NXB4XCJ9fSxcIm1ldGFcIjp7XCJ0aXRsZVwiOlwiYmFzYWxcIixcInVybFwiOlwiaHR0cDovL2Jhc2FsLmRldi9cIixcImRlc2NyaXB0aW9uXCI6XCJtaW5pbWFsIGNvbnRlbnQgbWFuYWdlbWVudFwiLFwia2V5d29yZHNcIjpcImNtc1wiLFwicmVwb1wiOlwiaHR0cDovL3d3dy5naXRodWIuY29tL2FjaWRqYXp6L2Jhc2FsXCJ9LFwiZGVidWdiYXJcIjp7XCJlbmFibGVkXCI6bnVsbCxcInN0b3JhZ2VcIjp7XCJlbmFibGVkXCI6dHJ1ZSxcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9kZWJ1Z2JhclwiLFwiY29ubmVjdGlvblwiOm51bGwsXCJwcm92aWRlclwiOlwiXCJ9LFwiaW5jbHVkZV92ZW5kb3JzXCI6dHJ1ZSxcImNhcHR1cmVfYWpheFwiOnRydWUsXCJjbG9ja3dvcmtcIjpmYWxzZSxcImNvbGxlY3RvcnNcIjp7XCJwaHBpbmZvXCI6dHJ1ZSxcIm1lc3NhZ2VzXCI6dHJ1ZSxcInRpbWVcIjp0cnVlLFwibWVtb3J5XCI6dHJ1ZSxcImV4Y2VwdGlvbnNcIjp0cnVlLFwibG9nXCI6dHJ1ZSxcImRiXCI6dHJ1ZSxcInZpZXdzXCI6dHJ1ZSxcInJvdXRlXCI6dHJ1ZSxcImxhcmF2ZWxcIjpmYWxzZSxcImV2ZW50c1wiOmZhbHNlLFwiZGVmYXVsdF9yZXF1ZXN0XCI6ZmFsc2UsXCJzeW1mb255X3JlcXVlc3RcIjp0cnVlLFwibWFpbFwiOnRydWUsXCJsb2dzXCI6ZmFsc2UsXCJmaWxlc1wiOmZhbHNlLFwiY29uZmlnXCI6ZmFsc2UsXCJhdXRoXCI6ZmFsc2UsXCJnYXRlXCI6ZmFsc2UsXCJzZXNzaW9uXCI6dHJ1ZX0sXCJvcHRpb25zXCI6e1wiYXV0aFwiOntcInNob3dfbmFtZVwiOmZhbHNlfSxcImRiXCI6e1wid2l0aF9wYXJhbXNcIjp0cnVlLFwidGltZWxpbmVcIjpmYWxzZSxcImJhY2t0cmFjZVwiOmZhbHNlLFwiZXhwbGFpblwiOntcImVuYWJsZWRcIjpmYWxzZSxcInR5cGVzXCI6W1wiU0VMRUNUXCJdfSxcImhpbnRzXCI6dHJ1ZX0sXCJtYWlsXCI6e1wiZnVsbF9sb2dcIjpmYWxzZX0sXCJ2aWV3c1wiOntcImRhdGFcIjpmYWxzZX0sXCJyb3V0ZVwiOntcImxhYmVsXCI6dHJ1ZX0sXCJsb2dzXCI6e1wiZmlsZVwiOm51bGx9fSxcImluamVjdFwiOnRydWUsXCJyb3V0ZV9wcmVmaXhcIjpcIl9kZWJ1Z2JhclwifSxcImNhY2hlXCI6e1wiZGVmYXVsdFwiOlwiYXJyYXlcIixcInN0b3Jlc1wiOntcImFwY1wiOntcImRyaXZlclwiOlwiYXBjXCJ9LFwiYXJyYXlcIjp7XCJkcml2ZXJcIjpcImFycmF5XCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiY2FjaGVcIixcImNvbm5lY3Rpb25cIjpudWxsfSxcImZpbGVcIjp7XCJkcml2ZXJcIjpcImZpbGVcIixcInBhdGhcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL2NhY2hlXCJ9LFwibWVtY2FjaGVkXCI6e1wiZHJpdmVyXCI6XCJtZW1jYWNoZWRcIixcInNlcnZlcnNcIjpbe1wiaG9zdFwiOlwiMTI3LjAuMC4xXCIsXCJwb3J0XCI6MTEyMTEsXCJ3ZWlnaHRcIjoxMDB9XX0sXCJyZWRpc1wiOntcImRyaXZlclwiOlwicmVkaXNcIixcImNvbm5lY3Rpb25cIjpcImRlZmF1bHRcIn19LFwicHJlZml4XCI6XCJsYXJhdmVsXCJ9LFwicXVldWVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwiY29ubmVjdGlvbnNcIjp7XCJzeW5jXCI6e1wiZHJpdmVyXCI6XCJzeW5jXCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiam9ic1wiLFwicXVldWVcIjpcImRlZmF1bHRcIixcImV4cGlyZVwiOjYwfSxcImJlYW5zdGFsa2RcIjp7XCJkcml2ZXJcIjpcImJlYW5zdGFsa2RcIixcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInR0clwiOjYwfSxcInNxc1wiOntcImRyaXZlclwiOlwic3FzXCIsXCJrZXlcIjpcInlvdXItcHVibGljLWtleVwiLFwic2VjcmV0XCI6XCJ5b3VyLXNlY3JldC1rZXlcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLXVybFwiLFwicmVnaW9uXCI6XCJ1cy1lYXN0LTFcIn0sXCJpcm9uXCI6e1wiZHJpdmVyXCI6XCJpcm9uXCIsXCJob3N0XCI6XCJtcS1hd3MtdXMtZWFzdC0xLmlyb24uaW9cIixcInRva2VuXCI6XCJ5b3VyLXRva2VuXCIsXCJwcm9qZWN0XCI6XCJ5b3VyLXByb2plY3QtaWRcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLW5hbWVcIixcImVuY3J5cHRcIjp0cnVlfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcImV4cGlyZVwiOjYwfX0sXCJmYWlsZWRcIjp7XCJkYXRhYmFzZVwiOlwibW9uZ29kYlwiLFwidGFibGVcIjpcImZhaWxlZF9qb2JzXCJ9fX07IiwiRGFzaGJvYXJkID1cblxuICBkYXRhOnt9XG5cbiAgaTogLT5cbiAgICBAZ2V0ZGF0YSA9PlxuICAgICAgQHBvcHVsYXRlKClcblxuICBwb3B1bGF0ZTogLT5cbiAgICAkKCcuZGFzaGJvYXJkIC52YWx1ZScpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgJChlbCkuaHRtbCBAZG90c3RvdmFsdWUgJChlbCkuZGF0YSAndmFsdWUnXG5cbiAgZ2V0ZGF0YTogKGNvbXBsZXRlKSAtPlxuXG4gICAgZ2V0cyA9IFsndXNlcnMnLCdjbGllbnRzJywgJ3N0cnVjdHVyZXMnXVxuXG4gICAgJChnZXRzKS5lYWNoIChpbmRleCwgZ2V0KSA9PlxuICAgICAgXy5nZXQgXCIvYXBpLyN7Z2V0fVwiXG4gICAgICAgIC5kb25lIChyZXNwb25zZSkgPT5cbiAgICAgICAgICBAZGF0YVtnZXRdID0gcmVzcG9uc2VcbiAgICAgICAgICBpZiBPYmplY3Qua2V5cyhAZGF0YSkubGVuZ3RoID09IGdldHMubGVuZ3RoXG4gICAgICAgICAgICBjb21wbGV0ZSgpXG5cbiAgZG90c3RvdmFsdWU6IChkb3RzKSAtPlxuICAgIHJlc3VsdCA9IEBkYXRhXG4gICAgZm9yIGRpbSBpbiBkb3RzLnNwbGl0ICcuJ1xuICAgICAgcmVzdWx0ID0gcmVzdWx0W2RpbV1cblxuICAgIHJldHVybiByZXN1bHRcblxuIiwiR2xvYmFsID1cblxuICAjIGtldmluIG9sc29uIChrZXZpbkAyNTYuaW8pIGFrYSDwn4yA8J+Ot1xuXG4gIHdpbmRvdzogZmFsc2VcblxuICBpOiAtPlxuICAgIEdsb2JhbC5oYW5kbGVycygpXG4gICAgR2xvYmFsLmxvZ2luQ2hlY2soKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnKS5jbGljayBHbG9iYWwudXNlclByb2ZpbGVIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLm9hdXRocyA+IC5vYXV0aCcpLmNsaWNrIEdsb2JhbC51c2VyT2F1dGhIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiAubG9nb3V0JykuY2xpY2sgR2xvYmFsLmxvZ291dEhhbmRsZXJcblxuICBsb2dvdXRIYW5kbGVyOiAtPlxuXG4gICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICBNZS5sb2dvdXQgLT5cbiAgICAgIF8uc3dhcCAnLm1lID4gLnByb2ZpbGUnXG4gICAgICBfLnN3YXAgJy5tZSA+IC5waWN0dXJlJ1xuICAgICAgTm90aWNlLmkgJ0xvZ291dCBTdWNjZXNzZnVsJywgJ3N1Y2Nlc3MnXG4gICAgICBTcGlubmVyLmQoKVxuXG4gIHVzZXJQcm9maWxlSGFuZGxlcjogLT5cblxuICAgIG9hID0gJCgnLm9hdXRocycpXG4gICAgdGwgPSBuZXcgVGltZWxpbmVNYXggcmVwZWF0OiAwXG5cbiAgICBpZiBvYS5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgXy5vbiBvYVxuICAgICAgdGwudG8gJyNwcm9maWxlU1ZHJywgMC44LCB7bW9ycGhTVkc6ICcjY2FuY2VsU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgIGVsc2VcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI3Byb2ZpbGVTVkcnLCBlYXNlOlBvd2VyNC5lYXNlSW5PdXR9XG4gICAgICBfLm9mZiBvYSwgb2ZmaW5nOiAwLjVcblxuICB1c2VyT2F1dGhIYW5kbGVyOiAtPlxuXG4gICAgdHlwZSA9ICQodGhpcykuZGF0YSAndHlwZSdcblxuICAgIEdsb2JhbC51c2VyUHJvZmlsZUhhbmRsZXIoKVxuICAgIHJldHVybiB0cnVlIGlmIHR5cGUgaXMgJ2NhbmNlbCdcblxuICAgIEdsb2JhbC5vYXV0aFdpbmRvdyAnL2xvYWRpbmcnXG5cbiAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgIE1lLm9hdXRoIHR5cGUsICh1cmkpIC0+XG4gICAgICBHbG9iYWwud2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmlcblxuICBvYXV0aFdpbmRvdzogKHVybCkgLT5cbiAgICB3ID0gNjQwXG4gICAgaCA9IDU1MFxuICAgIGxlZnQgPSAoc2NyZWVuLndpZHRoLzIpIC0gKHcvMilcbiAgICB0b3AgPSAoc2NyZWVuLmhlaWdodC8yKSAtIChoLzIpXG5cblxuICAgIEdsb2JhbC53aW5kb3cgPSB3aW5kb3cub3Blbih1cmwsICdMb2dpbiAvIFJlZ2lzdGVyJywgXCJ0b29sYmFyPW5vLCBsb2NhdGlvbj1ubywgZGlyZWN0b3JpZXM9bm8sIHN0YXR1cz1ubywgbWVudWJhcj1ubywgc2Nyb2xsYmFycz1ubywgcmVzaXphYmxlPW5vLCBjb3B5aGlzdG9yeT1ubywgd2lkdGg9I3t3fSxoZWlnaHQ9I3tofSx0b3A9I3t0b3B9LGxlZnQ9I3tsZWZ0fVwiKVxuICAgIEdsb2JhbC53aW5kb3cuZm9jdXMgaWYgd2luZG93LmZvY3VzXG5cbiAgICByZXR1cm5cblxuICBvYXV0aENvbXBsZXRlOiAodXNlcikgLT5cblxuICAgIFNwaW5uZXIuZCgpXG5cbiAgICBHbG9iYWwubG9naW4gdXNlclxuXG4gICAgTm90aWNlLmkgJ0xvZ2luIFN1Y2Nlc3NmdWwnLCAnc3VjY2VzcydcblxuICBsb2dpbjogKHVzZXIpIC0+XG5cbiAgICB3aW5kb3cuVXNlciA9IHVzZXJcblxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5waWN0dXJlID4gaW1nJykuYXR0ciAnc3JjJywgVXNlci5waWN0dXJlXG4gICAgXy5vZmYgJy5tZSA+IC5wcm9maWxlJ1xuICAgIF8ub2ZmICcubWUgPiAub2F1dGhzJ1xuICAgIF8ub24gJy5tZSA+IC5waWN0dXJlJ1xuXG4gIGxvZ2luQ2hlY2s6IC0+XG4gICAgTWUuYXV0aGVkIChyZXN1bHQpIC0+XG4gICAgICBHbG9iYWwubG9naW4ocmVzdWx0KSBpZiByZXN1bHQgaXNudCBmYWxzZVxuIiwiXy5jb25zdHJ1Y3RvcigpXG5cbmNsYXNzIEluZGV4XG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBoYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnRvcCAuYnVyZ2VyJykuY2xpY2sgQG1vYmlsZVxuXG4gIG1vYmlsZTogLT5cbiAgICBfLnN3YXAgJy50b3AgPiAuYnVyZ2VyJ1xuICAgIF8uc3dhcCAnLnRvcCA+IC5tZW51J1xuIixudWxsLCJNZSA9XG5cbiAgbG9nb3V0OiAoY29tcGxldGUpIC0+XG5cbiAgICBfLmdldCAnL2FwaS9hdXRoL2xvZ291dCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgY29tcGxldGUoKVxuXG4gIG9hdXRoOiAodHlwZSwgY29tcGxldGUpIC0+XG5cbiAgICBfLmdldCBcIi9hcGkvYXV0aC8je3R5cGV9XCJcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgY29tcGxldGUocmVzcG9uc2UuZGF0YS51cmkpXG5cbiAgYXV0aGVkOiAocmVzdWx0KSAtPlxuICAgIF8uZ2V0ICcvYXBpL2F1dGgnXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIHJlc3VsdCByZXNwb25zZS5kYXRhLnVzZXJcbiIsIk5vdGZvdW5kID1cbiAgaTogLT5cbiAgICAkKCcjbGluZWVycm9yJykubm92YWNhbmN5XG4gICAgICAncmVibGlua1Byb2JhYmlsaXR5JzogMC4xXG4gICAgICAnYmxpbmtNaW4nOiAwLjJcbiAgICAgICdibGlua01heCc6IDAuNlxuICAgICAgJ2xvb3BNaW4nOiA4XG4gICAgICAnbG9vcE1heCc6IDEwXG4gICAgICAnY29sb3InOiAnI2ZmZmZmZidcbiAgICAgICdnbG93JzogWycwIDAgODBweCAjZmZmZmZmJywgJzAgMCAzMHB4ICMwMDgwMDAnLCAnMCAwIDZweCAjMDAwMGZmJ11cblxuICAgICQoJyNsaW5lY29kZScpLm5vdmFjYW5jeVxuICAgICAgJ2JsaW5rJzogMVxuICAgICAgJ29mZic6IDFcbiAgICAgICdjb2xvcic6ICdSZWQnXG4gICAgICAnZ2xvdyc6IFsnMCAwIDgwcHggUmVkJywgJzAgMCAzMHB4IEZpcmVCcmljaycsICcwIDAgNnB4IERhcmtSZWQnXVxuIiwiTm90aWNlID1cblxuICB0eXBlczogWydpbmZvJywnc3VjY2VzcycsJ3dhcm5pbmcnXVxuICBlbDogZmFsc2VcbiAgb246IGZhbHNlXG4gIHRpbWVvdXQ6IGZhbHNlXG5cbiAgaTogKGNvcHksdHlwZT0naW5mbycpIC0+XG5cbiAgICBOb3RpY2UuZWwgPSAkKCcubm90aWNlJykgaWYgTm90aWNlLmVsIGlzIGZhbHNlXG5cbiAgICBmb3IgZHR5cGUgaW4gTm90aWNlLnR5cGVzXG4gICAgICBOb3RpY2UuZWwucmVtb3ZlQ2xhc3MgZHR5cGVcblxuICAgIE5vdGljZS5lbC5hZGRDbGFzcyB0eXBlXG5cbiAgICBOb3RpY2UuZWwuZmluZCgnLmNvcHkgPiAubWVzc2FnZScpLmh0bWwgY29weVxuXG4gICAgaWYgTm90aWNlLm9uIGlzIGZhbHNlXG4gICAgICBfLm9uIE5vdGljZS5lbFxuICAgICAgTm90aWNlLmhhbmRsZXJzLm9uKClcbiAgICAgIE5vdGljZS5vbiA9IHRydWVcblxuICAgIE5vdGljZS50aW1lb3V0ID0gc2V0VGltZW91dCAtPlxuICAgICAgTm90aWNlLmQoKVxuICAgICwgNTAwMFxuXG4gIGhhbmRsZXJzOlxuICAgIG9uOiAtPlxuICAgICAgJCgnLm5vdGljZSA+IC5pbm5lciA+IC5jbG9zZScpLmNsaWNrIE5vdGljZS5kXG4gICAgb2ZmOiAtPlxuICAgICAgJCgnLm5vdGljZSA+IC5pbm5lciA+IC5jbG9zZScpLnVuYmluZCAnY2xpY2snLCBOb3RpY2UuZFxuXG4gIGQ6IC0+XG4gICAgY2xlYXJUaW1lb3V0IE5vdGljZS50aW1lb3V0IGlmIE5vdGljZS50aW1lb3V0IGlzbnQgZmFsc2VcbiAgICBOb3RpY2UudGltZW91dCA9IGZhbHNlXG4gICAgTm90aWNlLmhhbmRsZXJzLm9mZigpXG4gICAgXy5vZmYgTm90aWNlLmVsLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuMlxuICAgIE5vdGljZS5vbiA9IGZhbHNlXG4iLCJQcm9tcHQgPVxuICBlbDoge31cbiAgb3B0aW9uczoge31cbiAgY2FsbGJhY2s6IGZhbHNlXG4gIHBhcmFtczoge31cblxuICBpOiAodGl0bGUsIGNvcHksIG9wdGlvbnM9WydPSyddLCBwYXJhbXMsIGNhbGxiYWNrKSAtPlxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gZmFsc2VcbiAgICBQcm9tcHQucGFyYW1zID0gZmFsc2VcblxuICAgIFByb21wdC5jYWxsYmFjayA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdmdW5jdGlvbidcbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBjYWxsYmFjayBpZiB0eXBlb2YgY2FsbGJhY2sgaXMgJ2Z1bmN0aW9uJ1xuXG4gICAgUHJvbXB0LnBhcmFtcyA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnXG5cbiAgICBQcm9tcHQuZWwgPSAkICcucHJvbXB0J1xuXG4gICAgUHJvbXB0LmVsLmZpbmQgJy50aXRsZSdcbiAgICAgIC5odG1sIHRpdGxlXG4gICAgUHJvbXB0LmVsLmZpbmQgJy5jb3B5J1xuICAgICAgLmh0bWwgY29weVxuXG4gICAgaWYgdHlwZW9mIHBhcmFtcyBpcyAnb2JqZWN0JyBhbmQgJ3RleHRhcmVhJyBvZiBwYXJhbXMgYW5kIHBhcmFtcy50ZXh0YXJlYSBpcyB0cnVlXG4gICAgICBfLm9uIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgICBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhID4gdGV4dGFyZWEnXG4gICAgICAgIC52YWwgcGFyYW1zLnZhbHVlXG5cbiAgICBQcm9tcHQub3B0aW9ucyA9IFByb21wdC5lbC5maW5kICcub3B0aW9ucyA+IC5vcHRpb24nXG4gICAgXy5vZmYgUHJvbXB0Lm9wdGlvbnNcbiAgICBQcm9tcHQub3B0aW9ucy5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIFByb21wdC5vcHRpb25zLmZpcnN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcblxuICAgIGZvciBvLGkgaW4gb3B0aW9uc1xuICAgICAgb3B0aW9uID0gUHJvbXB0LmVsLmZpbmQgXCIub3B0aW9ucyAgPiAub3B0aW9uXyN7aSsxfVwiXG4gICAgICBfLm9uIG9wdGlvblxuICAgICAgb3B0aW9uLmh0bWwgb1xuICAgICAgICAuZGF0YSAndmFsdWUnLCBvXG5cbiAgICBfLm9uIFByb21wdC5lbCxcbiAgICBfLm9uICcuZmFkZSdcblxuICAgIFByb21wdC5oYW5kbGVycygpXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5mb2N1cygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChkb2N1bWVudCkua2V5ZG93biBQcm9tcHQua2V5ZG93blxuICAgIFByb21wdC5vcHRpb25zLm9uICdjbGljaycsIFByb21wdC5jbGlja1xuICAgIFByb21wdC5lbC5maW5kKCcuaW5uZXIgPiAuY2FuY2VsJykub24gJ2NsaWNrJywgUHJvbXB0LmNhbmNlbFxuXG4gIGtleWRvd246IC0+XG4gICAgayA9IGV2ZW50LndoaWNoXG4gICAga2V5cyA9IFszOSwgOSwgMzcsIDEzLCAyN11cbiAgICByZXR1cm4gdHJ1ZSBpZiBrIG5vdCBpbiBrZXlzXG5cbiAgICBjdXJyZW50ID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb24ub24uYWN0aXZlJ1xuICAgIHNoaWZ0ID0gd2luZG93LmV2ZW50LnNoaWZ0S2V5XG5cbiAgICBpZiBrIGlzIDM5IG9yIChrIGlzIDkgYW5kICFzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQubmV4dCgpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5uZXh0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb25fMScpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMzcgb3IgKGsgaXMgOSBhbmQgc2hpZnQpXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBpZiBjdXJyZW50LnByZXYoKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIGN1cnJlbnQucHJldigpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBlbHNlXG4gICAgICAgIFByb21wdC5lbC5maW5kKCcub3B0aW9uLm9uJykubGFzdCgpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMTNcbiAgICAgIFByb21wdC50cmlnZ2VyIFByb21wdC5lbC5maW5kKCcub3B0aW9uLmFjdGl2ZScpLmRhdGEgJ3ZhbHVlJ1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgaWYgayBpcyAyN1xuICAgICAgUHJvbXB0LnRyaWdnZXIoZmFsc2UpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICBjYW5jZWw6IC0+XG4gICAgUHJvbXB0LnRyaWdnZXIgZmFsc2VcblxuICBjbGljazogLT5cbiAgICBQcm9tcHQudHJpZ2dlciAkKHRoaXMpLmRhdGEgJ3ZhbHVlJ1xuXG4gIHRyaWdnZXI6ICh2YWx1ZSkgLT5cbiAgICBfLm9mZiBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhJ1xuICAgIF8ub2ZmIFByb21wdC5lbCwgb2ZmaW5nOiB0cnVlLCBvZmZ0aW1lOiAwLjJcbiAgICBfLm9mZiAnLmZhZGUnLCBvZmZpbmc6IHRydWUsIG9mZml0bWU6IDAuMlxuICAgIFByb21wdC5vcHRpb25zLnVuYmluZCAnY2xpY2snLCBQcm9tcHQuY2xpY2tcbiAgICAkKGRvY3VtZW50KS51bmJpbmQgJ2tleWRvd24nLCBQcm9tcHQua2V5ZG93blxuICAgIGlmIFByb21wdC5wYXJhbXMudGV4dGFyZWFcbiAgICAgIHZhbCA9IFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCgpXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHJlc3BvbnNlOiB2YWx1ZSwgdmFsOiB2YWxcbiAgICBlbHNlXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHZhbHVlXG4iLCJcblNwaW5uZXIgPVxuXG4gIHN0YXRlOiBmYWxzZVxuXG4gIGVsOiB7fVxuXG4gIGk6IChlbCwgb3ZlcnJpZGUpIC0+XG5cbiAgICBAZWwgPSAkKCcuc3Bpbm5lcicpXG5cbiAgICByZWN0ID0gZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGNvb3JkcyA9XG4gICAgICB0b3A6IFwiI3tyZWN0LnRvcCArICQod2luZG93KS5zY3JvbGxUb3AoKX1weFwiXG4gICAgICBsZWZ0OiBcIiN7cmVjdC5sZWZ0fXB4XCJcbiAgICAgIHdpZHRoOiBcIiN7cmVjdC53aWR0aH1weFwiXG4gICAgICBoZWlnaHQ6IFwiI3tyZWN0LmhlaWdodH1weFwiXG5cbiAgICBpZiBvdmVycmlkZSBpc250IHVuZGVmaW5lZFxuICAgICAgZm9yIGtleSwgY29vcmQgb2Ygb3ZlcnJpZGVcbiAgICAgICAgY29vcmRzW2tleV0gPSBjb29yZFxuXG4gICAgQGVsLmNzcyBjb29yZHNcblxuICAgIF8ub24gQGVsXG4gICAgQHN0YXRlID0gdHJ1ZVxuXG4gIGQ6IC0+XG4gICAgc2V0VGltZW91dCA9PlxuICAgICAgXy5vZmYgQGVsXG4gICAgICBAc3RhdGUgPSBmYWxzZVxuICAgICwgMTAwXG4iLCJTdHJ1Y3R1cmVzID1cblxuICB0ZW1wbGF0ZTogZmFsc2VcblxuICBpOiAtPlxuICAgIEB0ZW1wbGF0ZSA9ICQoJy5lbnRpdGllcyA+ICN0ZW1wbGF0ZScpLmh0bWwoKVxuICAgIEBoYW5kbGVycygpXG4gICAgQGVudGl0eUFkZCgpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLmNvbnRlbnQgPiAuYWRkID4gLmVudGl0aWVzID4gLm1vcmUnKS5jbGljayBAZW50aXR5QWRkSGFuZGxlclxuICAgICQoJy5jb250ZW50ID4gLmFkZCA+IC5lbnRpdGllcycpLm9uICdjbGljaycsJy5lbnRpdHkgPiAucmVtb3ZlJywgQGVudGl0eVJlbW92ZUhhbmRsZXJcblxuICAgICQoJy5jb250ZW50ID4gLmFkZCA+IC5zdWJtaXQgPiAuY3RhcCcpLmNsaWNrIEBzdWJtaXRIYW5kbGVyXG5cbiAgZW50aXR5QWRkSGFuZGxlcjogLT5cbiAgICBTdHJ1Y3R1cmVzLmVudGl0eUFkZCgpXG5cbiAgZW50aXR5UmVtb3ZlSGFuZGxlcjogLT5cbiAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZSgpXG5cbiAgZW50aXR5QWRkOiAtPlxuICAgICQoJy5lbnRpdGllcycpLmFwcGVuZCBAdGVtcGxhdGVcbiAgICBAc2VsZWN0MigpXG5cbiAgc2VsZWN0MjogLT5cbiAgICAkKCcuZW50aXRpZXMgPiAuZW50aXR5ID4gLmlucHV0ID4gc2VsZWN0Jykuc2VsZWN0MlxuICAgICAgcGxhY2Vob2xkZXI6IFwiVHlwZVwiLCBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcblxuICBzdWJtaXRIYW5kbGVyOiAtPlxuXG4gICAgY29uc29sZS5sb2cgJ3N1Ym1pdCdcbiIsIlxuVXNlcnMgPVxuXG4gIGk6IC0+XG4gICAgY29uc29sZS5sb2cgJ1VzZXJzLmknXG4gICAgQGxvYWQoKVxuXG4gIGxvYWQ6IC0+XG4gICAgU3Bpbm5lci5pKCQoJy51c2VycyA+IC5jb250ZW50JykpXG4gICAgXy5nZXQgJy9hcGkvdXNlcnMnLFxuICAgICAgdmlldzogdHJ1ZVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICQoJy51c2VycyA+IC5jb250ZW50JykuaHRtbCByZXNwb25zZS52aWV3XG4gICAgICBTcGlubmVyLmQoKVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
