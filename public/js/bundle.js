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
      $('.clients > .content > .listing').html(response.view);
      return Spinner.d();
    });
  },
  handlers: function() {
    $('.add > .ctab').click(this.addHandler);
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
    return _.get('/api/clients/add', {
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
    "blue1": "#1da7ee",
    "blue2": "#0073bb",
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
    "h2b": {
      "font-family": "Roboto",
      "font-size": "24px",
      "font-weight": "700"
    },
    "h3": {
      "font-family": "Roboto",
      "font-size": "20px"
    },
    "h3b": {
      "font-family": "Roboto",
      "font-size": "20px",
      "font-weight": "700"
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
    "repo": "https://github.com/acidjazz/basal"
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
    gets = ['users', 'clients', 'structures', 'entries'];
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

var Entries;

Entries = {
  addSelectClient: {},
  addSelectStructure: {},
  addSelectClientId: false,
  placeholders: ["That's what I'm blogging about", "Have you guys been blogging?", "Hold all my calls, I'm blogging", "Tell Donnie I'm blogging and I'll call him back", "I gotta run, you should be blogging", "I want you on the phone, but I also want you blogging"],
  i: function() {
    return this.selectize();
  },
  selectize: function() {
    this.addSelectClient = Selectize.clients($('.add > .client > select'), Entries.clientSelectHandler);
    return this.addSelectStructure = Selectize.structures($('.add > .structure > select'), Entries.structureSelectHandler, {
      client: Entries.getAddSelectClientId
    });
  },
  clientSelectHandler: function(e) {
    var client_id;
    client_id = $(e.currentTarget).val();
    console.log(client_id);
    if (client_id.length !== 24) {
      return false;
    }
    Entries.addSelectClientId = client_id;
    console.log(Entries.addSelectStructure);
    Entries.addSelectStructure[0].selectize.enable();
    Entries.addSelectStructure[0].selectize.clearOptions();
    return console.log(Entries.addSelectStructure);
  },
  structureSelectHandler: function(e) {
    var structure_id;
    structure_id = $(e.currentTarget).val();
    console.log(structure_id);
    if (structure_id.length !== 24) {
      return false;
    }
  },
  getAddSelectClientId: function() {
    return Entries.addSelectClientId;
  },
  blog: function(el) {
    var editor;
    return editor = new Quill(el.find('.editor')[0], {
      modules: {
        toolbar: el.find('.toolbar')[0]
      },
      placeholder: Entries.placeholders[Math.floor(Math.random() * Entries.placeholders.length)],
      theme: 'snow'
    });
  },
  tags: function(el) {
    return el.find('input').selectize({
      plugins: ['restore_on_backspace', 'remove_button'],
      delimiter: ',',
      persist: false,
      create: function(input) {
        return {
          value: input,
          text: input
        };
      }
    });
  }
};

var Global;

Global = {
  window: false,
  i: function() {
    Global.handlers();
    Global.loginCheck();
    if (Page !== void 0) {
      return _.on(".menu > .options > .option_" + Page);
    }
  },
  handlers: function() {
    $('header > .inner > .me > .profile').click(Global.userProfileHandler);
    $('header > .inner > .me > .oauths > .oauth').click(Global.userOauthHandler);
    $('header > .inner > .me > .picture > .logout').click(Global.logoutHandler);
    return $('.menu > .options > .option').click(Global.menuHandler);
  },
  menuHandler: function() {
    var selected;
    _.off($('.menu > .options > .option'));
    selected = $(this).find('.label').html();
    return _.on($(".menu > .options > .option.option_" + selected));
  },
  logoutHandler: function() {
    return Prompt.i('Logout', 'Are you sure you want to log out?', ['Yes', 'No'], function(response) {
      if (response !== 'Yes') {
        return false;
      }
      Spinner.i($('header'));
      return Me.logout(function() {
        _.swap('.me > .profile');
        _.swap('.me > .picture');
        Notice.i('Logout Successful', 'success');
        return Spinner.d();
      });
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
    _.on('.me > .picture');
    if (User.client !== void 0) {
      return $('header > .inner > .client > .name').html(User.client.name);
    }
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

var Selectize;

Selectize = {
  clients: function(element, handler, options) {
    var selectClient;
    selectClient = element.selectize({
      placeholder: "Choose a Client ",
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      create: false,
      preload: 'focus',
      render: {
        option: function(item, escape) {
          return "<div>" + item.name + "</div>";
        }
      },
      load: function(query, callback) {
        return _.get('/api/clients', options).done(function(response) {
          var i, item, len, ref, results;
          results = [];
          ref = response.data;
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            results.push({
              id: item._id,
              name: item.name
            });
          }
          return callback(results);
        });
      }
    });
    selectClient.change(handler);
    return selectClient;
  },
  structures: function(element, handler, options) {
    var selectStructure;
    selectStructure = element.selectize({
      placeholder: "Choose a Structure   ",
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      create: false,
      preload: 'focus',
      render: {
        option: function(item, escape) {
          return "<div>" + item.name + "</div>";
        }
      },
      load: function(query, callback) {
        return _.get('/api/structures', options).done(function(response) {
          var i, item, len, ref, results;
          results = [];
          ref = response.data;
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            results.push({
              id: item._id,
              name: item.name
            });
          }
          return callback(results);
        });
      }
    });
    selectStructure.change(handler);
    return selectStructure;
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
    this.load();
    this.template = $('.add > #template').html();
    this.handlers();
    this.entityAdd();
    return Time.i();
  },
  load: function() {
    Spinner.i($('.structures > .content'));
    return _.get('/api/structures', {
      view: true
    }).done(function(response) {
      $('.structures > .content > .listing').html(response.view);
      return Spinner.d();
    });
  },
  handlers: function() {
    $('.page.structures > .ctab').click(this.toggleAddHandler);
    $('.add > .entities > .more').click(this.entityAddHandler);
    $('.add > .entities').on('click', '.entity > .remove', this.entityRemoveHandler);
    $('.add > .submit > .ctap').click(this.submitHandler);
    return Selectize.clients($('.add > .client > select'));
  },
  toggleAddHandler: function() {
    _.swap('.add');
    return $('.add > .name input').focus();
  },
  entityAddHandler: function() {
    return Structures.entityAdd(true);
  },
  entityRemoveHandler: function() {
    return $(this).parent().remove();
  },
  entityAdd: function(focus) {
    if (focus == null) {
      focus = false;
    }
    $('.add > .entities').append(this.template);
    this.selectize();
    if (focus) {
      return $('.add > .entities > .entity > .input.selectize-input input').last().focus();
    }
  },
  selectize: function() {
    return $('.entities > .entity > .input > select').selectize({
      placeholder: "Type"
    });
  },
  submitHandler: function() {
    var structure;
    structure = {};
    structure.entities = [];
    structure.name = $('.add > .name input').val();
    structure.client = $('.add > .client select').val();
    return $('.add > .entities > .entity').each(function(i, el) {
      var jinput, jselect;
      jinput = $(el).find('.input > input');
      jselect = $(el).find('.input > select');
      return structure.entities.push({
        name: jinput.val(),
        type: jselect.val()
      });
    }).promise().done(function() {
      return _.get('/api/structures/add', structure).always(function() {
        return Spinner.d();
      }).done(function(response) {
        console.log(response);
        $('.add > .entities').empty();
        _.off('.add');
        Notice.i('Structure added successfully', 'success');
        return Structures.load();
      });
    });
  }
};

var Users;

Users = {
  selectClient: false,
  i: function() {
    this.load();
    Time.i();
    return this.handlers();
  },
  load: function() {
    Spinner.i($('.users > .content'));
    return _.get('/api/users', {
      view: true
    }).done(function(response) {
      $('.users > .content').html(response.view);
      Spinner.d();
      return Users.selectize();
    });
  },
  handlers: function() {
    return $('.users > .content').on('change', '.details > .detail > .value.toggle > input:checkbox', this.toggleHandler);
  },
  toggleHandler: function() {
    var checked, t;
    t = $(this);
    if (t.is(':checked')) {
      checked = 1;
    } else {
      checked = 0;
    }
    return Users.update(t.data('_id'), t.data('field'), checked);
  },
  selectClientHandler: function(e) {
    var client_id, user_id;
    client_id = $(e.currentTarget).val();
    user_id = $(e.currentTarget).data('_id');
    if (client_id.length !== 24) {
      return false;
    }
    return Users.update(user_id, 'client', client_id);
  },
  selectize: function() {
    return Selectize.clients($('.user > .details > .detail_client > .value.select select'), this.selectClientHandler);
  },
  update: function(_id, field, value) {
    var params;
    params = {};
    params[field] = value;
    Spinner.i($('.users > .content'));
    return _.get("/api/users/update/" + _id, params).always(function() {
      return Spinner.d();
    }).done(function(response) {
      Notice.i('User updated successfully', 'success');
      return $(".user.user_" + response.data.user._id + " > .details > .detail_updated > .value > time").attr('title', response.data.user.updated_at);
    });
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudHMuY29mZmVlIiwiY29uZmlnLmNvZmZlZSIsImRhc2hib2FyZC5jb2ZmZWUiLCJlbnRyaWVzLmNvZmZlZSIsImdsb2JhbC5jb2ZmZWUiLCJpbmRleC5jb2ZmZWUiLCJtYWluLmpzIiwibWUuY29mZmVlIiwibm90Zm91bmQuY29mZmVlIiwibm90aWNlLmNvZmZlZSIsInByb21wdC5jb2ZmZWUiLCJzZWxlY3RpemUuY29mZmVlIiwic3Bpbm5lci5jb2ZmZWUiLCJzdHJ1Y3R1cmVzLmNvZmZlZSIsInVzZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUE7RUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFh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Q0FDRSxDQUFDLElBREgsQ0FDUSxPQURSLEVBQ2lCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBRHBDO0lBRkksQ0FIUjtFQU5NLENBcENSIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIGZpdDogKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIC0+XG4gICAgcmF0aW8gPSBNYXRoLm1pbihtYXhXaWR0aCAvIHNyY1dpZHRoLCBtYXhIZWlnaHQgLyBzcmNIZWlnaHQpXG4gICAgd2lkdGg6IHNyY1dpZHRoKnJhdGlvLCBoZWlnaHQ6IHNyY0hlaWdodCpyYXRpb1xuXG4gIGppbml0OiAtPlxuICAgICQuYWpheFNldHVwXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCJcblxuICBwYXRjaDogKHVybCwgZGF0YSkgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqcGF0Y2ggPSAkLmFqYXhcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgICB0eXBlOiAnUEFUQ0gnXG5cbiAgICBqcGF0Y2guZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpnZXQgPSAkLmdldCBhcmdzLi4uXG5cbiAgICBqZ2V0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4gamdldFxuXG4gIGZhaWw6IChyZXNwb25zZSkgLT5cblxuICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OLmVycm9yc1swXVxuICAgIHB1ZyA9IGVycm9yLm1lc3NhZ2UubWF0Y2ggL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvXG4gICAgaWYgcHVnIGlzbnQgbnVsbFxuICAgICAgZXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UucmVwbGFjZSAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS8sICcnXG4gICAgICBlcnJvci5maWxlID0gcHVnWzFdXG4gICAgICBlcnJvci5saW5lID0gcHVnWzJdXG5cbiAgICBmaWxlID0gQGVuY29kZSBcIiN7ZXJyb3IuZmlsZX1cIlxuXG4gICAgc3dpdGNoIGNvbmZpZy5hcHAuZWRpdG9yXG4gICAgICB3aGVuICdtYWN2aW0nIHRoZW4gZWRpdG9yID0gJ212aW06Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnc3VibGltZScgdGhlbiBlZGl0b3IgPSAnc3VibDovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdlbWFjcycgdGhlbiBlZGl0b3IgPSAnZW1hY3M6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAndGV4dG1hdGUnIHRoZW4gZWRpdG9yID0gJ3RleHRtYXRlOi8vb3Blbi8/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdwaHBzdG9ybScgdGhlbiBlZGl0b3IgPSAncGhwc3Rvcm06Ly9vcGVuP2ZpbGU9J1xuXG4gICAgaWYgZXJyb3IuZmlsZSBpc250IG51bGxcbiAgICAgIGJvZHkgPSBcIlwiXCJcbiAgICAgICAgPHByZT4je2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICAgIDxhIGhyZWY9XCIje2VkaXRvcn0je2ZpbGV9JmxpbmU9I3tlcnJvci5saW5lfVwiPjxiPiN7ZXJyb3IuZmlsZX06I3tlcnJvci5saW5lfTwvYj48L2E+XG4gICAgICBcIlwiXCJcbiAgICBlbHNlXG4gICAgICBib2R5ID0gZXJyb3IubWVzc2FnZVxuXG4gICAgUHJvbXB0LmkgZXJyb3IudHlwZSwgYm9keSwgWydPSyddXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cDovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuXy5pKClcbiIsIlRpbWUgPVxuICBpbnRlcnZhbDogZmFsc2VcbiAgZ2FwOiAxMDAwXG5cbiAgaTogLT5cbiAgICBAc2NyYXBlKClcbiAgICBAaW50M2VydmFsID0gc2V0SW50ZXJ2YWwgQHNjcmFwZSwgQGdhcFxuXG4gIHNjcmFwZTogLT5cbiAgICAkKCd0aW1lJykuZWFjaCAoaSwgZWwpID0+XG4gICAgICBqZWwgPSAkIGVsXG4gICAgICBqZWwuaHRtbCBtb21lbnQoamVsLmF0dHIoJ3RpdGxlJykpLmZyb21Ob3coKVxuXG4iLCJDbGllbnRzID1cblxuICBpOiAtPlxuICAgIEBsb2FkKClcbiAgICBAaGFuZGxlcnMoKVxuICAgIFRpbWUuaSgpXG5cbiAgICAkKCcuZGF0ZScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgY29uc29sZS5sb2cgaSwgZWxcblxuICBsb2FkOiAtPlxuICAgIFNwaW5uZXIuaSgkKCcuY2xpZW50cyA+IC5jb250ZW50JykpXG4gICAgXy5nZXQgJy9hcGkvY2xpZW50cycsXG4gICAgICB2aWV3OiB0cnVlXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgJCgnLmNsaWVudHMgPiAuY29udGVudCA+IC5saXN0aW5nJykuaHRtbCByZXNwb25zZS52aWV3XG4gICAgICBTcGlubmVyLmQoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5hZGQgPiAuY3RhYicpLmNsaWNrIEBhZGRIYW5kbGVyXG4gICAgJCgnLmFkZCA+IC5pbnB1dCA+IGlucHV0Jykua2V5dXAgQGFkZEVudGVySGFuZGxlclxuXG4gIGFkZEVudGVySGFuZGxlcjogKGUpIC0+XG4gICAgQ2xpZW50cy5hZGRIYW5kbGVyKCkgaWYgZS53aGljaCA9PSAxM1xuXG4gIGFkZEhhbmRsZXI6IC0+XG5cbiAgICBpbnB1dGVsID0gJCgnLmFkZCA+IC5pbnB1dCcpXG4gICAgaW5wdXQgPSAkKCcuYWRkID4gLmlucHV0ID4gaW5wdXQnKVxuXG4gICAgaWYgaW5wdXRlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgXy5vbiBpbnB1dGVsXG4gICAgICByZXR1cm4gaW5wdXQuZm9jdXMoKVxuXG4gICAgaWYgaW5wdXQudmFsKCkgPT0gXCJcIlxuICAgICAgTm90aWNlLmkgJ1BsYWNlIHNwZWNpZnkgYSBuYW1lJywgJ3dhcm5pbmcnXG4gICAgICByZXR1cm4gaW5wdXQuZm9jdXMoKVxuXG4gICAgU3Bpbm5lci5pKCQoJy5jbGllbnRzID4gLmNvbnRlbnQnKSlcbiAgICBfLmdldCAnL2FwaS9jbGllbnRzL2FkZCcsIG5hbWU6IGlucHV0LnZhbCgpXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBjb25zb2xlLmxvZyByZXNwb25zZVxuICAgICAgaW5wdXQudmFsKCcnKVxuICAgICAgXy5vZmYgaW5wdXRlbFxuICAgICAgTm90aWNlLmkgJ0NsaWVudCBhZGRlZCBzdWNjZXNzZnVsbHknLCAnc3VjY2VzcydcbiAgICAgIENsaWVudHMubG9hZCgpXG4iLCJjb25maWcgPSB7XCJ2aWV3XCI6e1wicGF0aHNcIjpbXCIvVXNlcnMvay9iYXNhbC9yZXNvdXJjZXMvdmlld3NcIl0sXCJjb21waWxlZFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvdmlld3NcIn0sXCJhcHBcIjp7XCJlZGl0b3JcIjpcIm1hY3ZpbVwifSxcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJ3aGl0ZTJcIjpcIiNmMWYxZjFcIixcIndoaXRlM1wiOlwiI0Y0RjRGNFwiLFwiZ3JleTFcIjpcIiNlNWU1ZTVcIixcImdyZXkyXCI6XCIjZjVmNWY1XCIsXCJncmV5M1wiOlwiI2QwZDBkMFwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJibGFjazJcIjpcIiMyODI4MjhcIixcImJsYWNrM1wiOlwiIzMzMzMzM1wiLFwicmVkMVwiOlwiI0M4MjEyQlwiLFwiY3lhbjFcIjpcIiM1RkE3OTNcIixcInllbGxvdzFcIjpcIiNGNkJCNDVcIixcIm9yYW5nZTFcIjpcIiNGNjhGNjJcIixcInNraW4xXCI6XCIjRjNEREEzXCIsXCJncmVlbjFcIjpcIiM1YmE1NDFcIixcImdyZWVuMlwiOlwiIzg4ZDk2ZFwiLFwiZ3JlZW4zXCI6XCIjNzdkMzU4XCIsXCJibHVlMVwiOlwiIzFkYTdlZVwiLFwiYmx1ZTJcIjpcIiMwMDczYmJcIixcImdvb2dsZV9ibHVlXCI6XCIjNDI4NWY0XCIsXCJnb29nbGVfZ3JlZW5cIjpcIiMzNGE4NTNcIixcImdvb2dsZV95ZWxsb3dcIjpcIiNmYmJjMDVcIixcImdvb2dsZV9yZWRcIjpcIiNlYTQzMzVcIixcImdpdGh1Yl9ibHVlXCI6XCIjMEQyNjM2XCIsXCJmYWNlYm9va19ibHVlXCI6XCIjNDg2N0FBXCIsXCJpbnN0YWdyYW1fb3JcIjpcIiNGRjc4MDRcIixcInR3aXR0ZXJfYmx1ZVwiOlwiIzAwQUNFRFwifSxcImZvbnRcIjp7XCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImgxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIn0sXCJoM2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJjMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMxc1wiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTZweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifSxcImMyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9LFwibm90Zm91bmRcIjp7XCJmb250LWZhbWlseVwiOlwiTW9ub3RvblwiLFwiZm9udC1zaXplXCI6XCI3NXB4XCJ9fSxcIm1ldGFcIjp7XCJ0aXRsZVwiOlwiYmFzYWxcIixcInVybFwiOlwiaHR0cDovL2Jhc2FsLmRldi9cIixcImRlc2NyaXB0aW9uXCI6XCJtaW5pbWFsIGNvbnRlbnQgbWFuYWdlbWVudFwiLFwia2V5d29yZHNcIjpcImNtc1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2FjaWRqYXp6L2Jhc2FsXCJ9LFwiZGVidWdiYXJcIjp7XCJlbmFibGVkXCI6bnVsbCxcInN0b3JhZ2VcIjp7XCJlbmFibGVkXCI6dHJ1ZSxcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9kZWJ1Z2JhclwiLFwiY29ubmVjdGlvblwiOm51bGwsXCJwcm92aWRlclwiOlwiXCJ9LFwiaW5jbHVkZV92ZW5kb3JzXCI6dHJ1ZSxcImNhcHR1cmVfYWpheFwiOnRydWUsXCJjbG9ja3dvcmtcIjpmYWxzZSxcImNvbGxlY3RvcnNcIjp7XCJwaHBpbmZvXCI6dHJ1ZSxcIm1lc3NhZ2VzXCI6dHJ1ZSxcInRpbWVcIjp0cnVlLFwibWVtb3J5XCI6dHJ1ZSxcImV4Y2VwdGlvbnNcIjp0cnVlLFwibG9nXCI6dHJ1ZSxcImRiXCI6dHJ1ZSxcInZpZXdzXCI6dHJ1ZSxcInJvdXRlXCI6dHJ1ZSxcImxhcmF2ZWxcIjpmYWxzZSxcImV2ZW50c1wiOmZhbHNlLFwiZGVmYXVsdF9yZXF1ZXN0XCI6ZmFsc2UsXCJzeW1mb255X3JlcXVlc3RcIjp0cnVlLFwibWFpbFwiOnRydWUsXCJsb2dzXCI6ZmFsc2UsXCJmaWxlc1wiOmZhbHNlLFwiY29uZmlnXCI6ZmFsc2UsXCJhdXRoXCI6ZmFsc2UsXCJnYXRlXCI6ZmFsc2UsXCJzZXNzaW9uXCI6dHJ1ZX0sXCJvcHRpb25zXCI6e1wiYXV0aFwiOntcInNob3dfbmFtZVwiOmZhbHNlfSxcImRiXCI6e1wid2l0aF9wYXJhbXNcIjp0cnVlLFwidGltZWxpbmVcIjpmYWxzZSxcImJhY2t0cmFjZVwiOmZhbHNlLFwiZXhwbGFpblwiOntcImVuYWJsZWRcIjpmYWxzZSxcInR5cGVzXCI6W1wiU0VMRUNUXCJdfSxcImhpbnRzXCI6dHJ1ZX0sXCJtYWlsXCI6e1wiZnVsbF9sb2dcIjpmYWxzZX0sXCJ2aWV3c1wiOntcImRhdGFcIjpmYWxzZX0sXCJyb3V0ZVwiOntcImxhYmVsXCI6dHJ1ZX0sXCJsb2dzXCI6e1wiZmlsZVwiOm51bGx9fSxcImluamVjdFwiOnRydWUsXCJyb3V0ZV9wcmVmaXhcIjpcIl9kZWJ1Z2JhclwifSxcImNhY2hlXCI6e1wiZGVmYXVsdFwiOlwiYXJyYXlcIixcInN0b3Jlc1wiOntcImFwY1wiOntcImRyaXZlclwiOlwiYXBjXCJ9LFwiYXJyYXlcIjp7XCJkcml2ZXJcIjpcImFycmF5XCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiY2FjaGVcIixcImNvbm5lY3Rpb25cIjpudWxsfSxcImZpbGVcIjp7XCJkcml2ZXJcIjpcImZpbGVcIixcInBhdGhcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL2NhY2hlXCJ9LFwibWVtY2FjaGVkXCI6e1wiZHJpdmVyXCI6XCJtZW1jYWNoZWRcIixcInNlcnZlcnNcIjpbe1wiaG9zdFwiOlwiMTI3LjAuMC4xXCIsXCJwb3J0XCI6MTEyMTEsXCJ3ZWlnaHRcIjoxMDB9XX0sXCJyZWRpc1wiOntcImRyaXZlclwiOlwicmVkaXNcIixcImNvbm5lY3Rpb25cIjpcImRlZmF1bHRcIn19LFwicHJlZml4XCI6XCJsYXJhdmVsXCJ9LFwicXVldWVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwiY29ubmVjdGlvbnNcIjp7XCJzeW5jXCI6e1wiZHJpdmVyXCI6XCJzeW5jXCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiam9ic1wiLFwicXVldWVcIjpcImRlZmF1bHRcIixcImV4cGlyZVwiOjYwfSxcImJlYW5zdGFsa2RcIjp7XCJkcml2ZXJcIjpcImJlYW5zdGFsa2RcIixcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInR0clwiOjYwfSxcInNxc1wiOntcImRyaXZlclwiOlwic3FzXCIsXCJrZXlcIjpcInlvdXItcHVibGljLWtleVwiLFwic2VjcmV0XCI6XCJ5b3VyLXNlY3JldC1rZXlcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLXVybFwiLFwicmVnaW9uXCI6XCJ1cy1lYXN0LTFcIn0sXCJpcm9uXCI6e1wiZHJpdmVyXCI6XCJpcm9uXCIsXCJob3N0XCI6XCJtcS1hd3MtdXMtZWFzdC0xLmlyb24uaW9cIixcInRva2VuXCI6XCJ5b3VyLXRva2VuXCIsXCJwcm9qZWN0XCI6XCJ5b3VyLXByb2plY3QtaWRcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLW5hbWVcIixcImVuY3J5cHRcIjp0cnVlfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcImV4cGlyZVwiOjYwfX0sXCJmYWlsZWRcIjp7XCJkYXRhYmFzZVwiOlwibW9uZ29kYlwiLFwidGFibGVcIjpcImZhaWxlZF9qb2JzXCJ9fX07IiwiRGFzaGJvYXJkID1cblxuICBkYXRhOnt9XG5cbiAgaTogLT5cbiAgICBAZ2V0ZGF0YSA9PlxuICAgICAgQHBvcHVsYXRlKClcblxuICBwb3B1bGF0ZTogLT5cbiAgICAkKCcuZGFzaGJvYXJkIC52YWx1ZScpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgJChlbCkuaHRtbCBAZG90c3RvdmFsdWUgJChlbCkuZGF0YSAndmFsdWUnXG5cbiAgZ2V0ZGF0YTogKGNvbXBsZXRlKSAtPlxuXG4gICAgZ2V0cyA9IFsndXNlcnMnLCdjbGllbnRzJywgJ3N0cnVjdHVyZXMnLCAnZW50cmllcyddXG5cbiAgICAkKGdldHMpLmVhY2ggKGluZGV4LCBnZXQpID0+XG4gICAgICBfLmdldCBcIi9hcGkvI3tnZXR9XCJcbiAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgICAgIEBkYXRhW2dldF0gPSByZXNwb25zZVxuICAgICAgICAgIGlmIE9iamVjdC5rZXlzKEBkYXRhKS5sZW5ndGggPT0gZ2V0cy5sZW5ndGhcbiAgICAgICAgICAgIGNvbXBsZXRlKClcblxuICBkb3RzdG92YWx1ZTogKGRvdHMpIC0+XG4gICAgcmVzdWx0ID0gQGRhdGFcbiAgICBmb3IgZGltIGluIGRvdHMuc3BsaXQgJy4nXG4gICAgICByZXN1bHQgPSByZXN1bHRbZGltXVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuXG4iLCJcbkVudHJpZXMgPVxuXG4gIGFkZFNlbGVjdENsaWVudDoge31cbiAgYWRkU2VsZWN0U3RydWN0dXJlOiB7fVxuXG4gIGFkZFNlbGVjdENsaWVudElkOiBmYWxzZVxuXG4gIHBsYWNlaG9sZGVyczogW1xuICAgIFwiVGhhdCdzIHdoYXQgSSdtIGJsb2dnaW5nIGFib3V0XCJcbiAgICBcIkhhdmUgeW91IGd1eXMgYmVlbiBibG9nZ2luZz9cIlxuICAgIFwiSG9sZCBhbGwgbXkgY2FsbHMsIEknbSBibG9nZ2luZ1wiXG4gICAgXCJUZWxsIERvbm5pZSBJJ20gYmxvZ2dpbmcgYW5kIEknbGwgY2FsbCBoaW0gYmFja1wiXG4gICAgXCJJIGdvdHRhIHJ1biwgeW91IHNob3VsZCBiZSBibG9nZ2luZ1wiXG4gICAgXCJJIHdhbnQgeW91IG9uIHRoZSBwaG9uZSwgYnV0IEkgYWxzbyB3YW50IHlvdSBibG9nZ2luZ1wiXG4gIF1cblxuICBpOiAtPlxuXG4gICAgQHNlbGVjdGl6ZSgpXG5cbiAgICAjIGJsb2cgZW50cnlcbiAgICAjRW50cmllcy5ibG9nKCQoJy5lbnRpdHlfYmxvZycpKVxuICAgICMgdGFncyBlbnRpdHlcbiAgICAjRW50cmllcy50YWdzKCQoJy5lbnRpdHlfdGFncycpKVxuXG4gIHNlbGVjdGl6ZTogLT5cblxuICAgIEBhZGRTZWxlY3RDbGllbnQgPSBTZWxlY3RpemUuY2xpZW50cyAkKCcuYWRkID4gLmNsaWVudCA+IHNlbGVjdCcpLCBFbnRyaWVzLmNsaWVudFNlbGVjdEhhbmRsZXJcbiAgICBAYWRkU2VsZWN0U3RydWN0dXJlID0gU2VsZWN0aXplLnN0cnVjdHVyZXMgJCgnLmFkZCA+IC5zdHJ1Y3R1cmUgPiBzZWxlY3QnKSwgRW50cmllcy5zdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyLFxuICAgICAgY2xpZW50OiBFbnRyaWVzLmdldEFkZFNlbGVjdENsaWVudElkXG5cbiAgY2xpZW50U2VsZWN0SGFuZGxlcjogKGUpIC0+XG4gICAgY2xpZW50X2lkID0gJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpXG4gICAgY29uc29sZS5sb2cgY2xpZW50X2lkXG4gICAgcmV0dXJuIGZhbHNlIGlmIGNsaWVudF9pZC5sZW5ndGggaXNudCAyNFxuICAgIEVudHJpZXMuYWRkU2VsZWN0Q2xpZW50SWQgPSBjbGllbnRfaWRcbiAgICBjb25zb2xlLmxvZyBFbnRyaWVzLmFkZFNlbGVjdFN0cnVjdHVyZVxuICAgIEVudHJpZXMuYWRkU2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5lbmFibGUoKVxuICAgIEVudHJpZXMuYWRkU2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5jbGVhck9wdGlvbnMoKVxuICAgIGNvbnNvbGUubG9nIEVudHJpZXMuYWRkU2VsZWN0U3RydWN0dXJlXG5cbiAgc3RydWN0dXJlU2VsZWN0SGFuZGxlcjogKGUpIC0+XG4gICAgc3RydWN0dXJlX2lkID0gJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpXG4gICAgY29uc29sZS5sb2cgc3RydWN0dXJlX2lkXG4gICAgcmV0dXJuIGZhbHNlIGlmIHN0cnVjdHVyZV9pZC5sZW5ndGggaXNudCAyNFxuXG4gIGdldEFkZFNlbGVjdENsaWVudElkOiAtPlxuICAgIHJldHVybiBFbnRyaWVzLmFkZFNlbGVjdENsaWVudElkXG5cbiAgYmxvZzogKGVsKSAtPlxuICAgIGVkaXRvciA9IG5ldyBRdWlsbCBlbC5maW5kKCcuZWRpdG9yJylbMF0sXG4gICAgICBtb2R1bGVzOlxuICAgICAgICB0b29sYmFyOiBlbC5maW5kKCcudG9vbGJhcicpWzBdXG4gICAgICBwbGFjZWhvbGRlcjogRW50cmllcy5wbGFjZWhvbGRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRW50cmllcy5wbGFjZWhvbGRlcnMubGVuZ3RoKV1cbiAgICAgIHRoZW1lOiAnc25vdydcblxuICB0YWdzOiAoZWwpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5zZWxlY3RpemVcbiAgICAgIHBsdWdpbnM6IFsncmVzdG9yZV9vbl9iYWNrc3BhY2UnLCdyZW1vdmVfYnV0dG9uJ11cbiAgICAgIGRlbGltaXRlcjogJywnXG4gICAgICBwZXJzaXN0OiBmYWxzZVxuICAgICAgY3JlYXRlOiAoaW5wdXQpIC0+XG4gICAgICAgIHZhbHVlOiBpbnB1dFxuICAgICAgICB0ZXh0OiBpbnB1dFxuIiwiR2xvYmFsID1cblxuICAjIGtldmluIG9sc29uIChrZXZpbkAyNTYuaW8pIGFrYSDwn4yA8J+Ot1xuXG4gIHdpbmRvdzogZmFsc2VcblxuICBpOiAtPlxuICAgIEdsb2JhbC5oYW5kbGVycygpXG4gICAgR2xvYmFsLmxvZ2luQ2hlY2soKVxuXG4gICAgXy5vbiBcIi5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uXyN7UGFnZX1cIiBpZiBQYWdlIGlzbnQgdW5kZWZpbmVkXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucHJvZmlsZScpLmNsaWNrIEdsb2JhbC51c2VyUHJvZmlsZUhhbmRsZXJcbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAub2F1dGhzID4gLm9hdXRoJykuY2xpY2sgR2xvYmFsLnVzZXJPYXV0aEhhbmRsZXJcbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5sb2dvdXQnKS5jbGljayBHbG9iYWwubG9nb3V0SGFuZGxlclxuICAgICQoJy5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uJykuY2xpY2sgR2xvYmFsLm1lbnVIYW5kbGVyXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgXy5vZmYgJCgnLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb24nKVxuICAgIHNlbGVjdGVkID0gJCh0aGlzKS5maW5kKCcubGFiZWwnKS5odG1sKClcbiAgICBfLm9uICQoXCIubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbi5vcHRpb25fI3tzZWxlY3RlZH1cIilcblxuICBsb2dvdXRIYW5kbGVyOiAtPlxuXG4gICAgUHJvbXB0LmkgJ0xvZ291dCcsICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gbG9nIG91dD8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgIHJldHVybiBmYWxzZSBpZiByZXNwb25zZSBpc250ICdZZXMnXG5cbiAgICAgIFNwaW5uZXIuaSAkKCdoZWFkZXInKVxuXG4gICAgICBNZS5sb2dvdXQgLT5cbiAgICAgICAgXy5zd2FwICcubWUgPiAucHJvZmlsZSdcbiAgICAgICAgXy5zd2FwICcubWUgPiAucGljdHVyZSdcbiAgICAgICAgTm90aWNlLmkgJ0xvZ291dCBTdWNjZXNzZnVsJywgJ3N1Y2Nlc3MnXG4gICAgICAgIFNwaW5uZXIuZCgpXG5cbiAgdXNlclByb2ZpbGVIYW5kbGVyOiAtPlxuXG4gICAgb2EgPSAkKCcub2F1dGhzJylcbiAgICB0bCA9IG5ldyBUaW1lbGluZU1heCByZXBlYXQ6IDBcblxuICAgIGlmIG9hLmhhc0NsYXNzICdvZmYnXG4gICAgICBfLm9uIG9hXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNjYW5jZWxTVkcnLCBlYXNlOlBvd2VyNC5lYXNlSW5PdXR9XG4gICAgZWxzZVxuICAgICAgdGwudG8gJyNwcm9maWxlU1ZHJywgMC44LCB7bW9ycGhTVkc6ICcjcHJvZmlsZVNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICAgIF8ub2ZmIG9hLCBvZmZpbmc6IDAuNVxuXG4gIHVzZXJPYXV0aEhhbmRsZXI6IC0+XG5cbiAgICB0eXBlID0gJCh0aGlzKS5kYXRhICd0eXBlJ1xuXG4gICAgR2xvYmFsLnVzZXJQcm9maWxlSGFuZGxlcigpXG4gICAgcmV0dXJuIHRydWUgaWYgdHlwZSBpcyAnY2FuY2VsJ1xuXG4gICAgR2xvYmFsLm9hdXRoV2luZG93ICcvbG9hZGluZydcblxuICAgIFNwaW5uZXIuaSAkKCdoZWFkZXInKVxuXG4gICAgTWUub2F1dGggdHlwZSwgKHVyaSkgLT5cbiAgICAgIEdsb2JhbC53aW5kb3cubG9jYXRpb24uaHJlZiA9IHVyaVxuXG4gIG9hdXRoV2luZG93OiAodXJsKSAtPlxuICAgIHcgPSA2NDBcbiAgICBoID0gNTUwXG4gICAgbGVmdCA9IChzY3JlZW4ud2lkdGgvMikgLSAody8yKVxuICAgIHRvcCA9IChzY3JlZW4uaGVpZ2h0LzIpIC0gKGgvMilcblxuXG4gICAgR2xvYmFsLndpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgJ0xvZ2luIC8gUmVnaXN0ZXInLCBcInRvb2xiYXI9bm8sIGxvY2F0aW9uPW5vLCBkaXJlY3Rvcmllcz1ubywgc3RhdHVzPW5vLCBtZW51YmFyPW5vLCBzY3JvbGxiYXJzPW5vLCByZXNpemFibGU9bm8sIGNvcHloaXN0b3J5PW5vLCB3aWR0aD0je3d9LGhlaWdodD0je2h9LHRvcD0je3RvcH0sbGVmdD0je2xlZnR9XCIpXG4gICAgR2xvYmFsLndpbmRvdy5mb2N1cyBpZiB3aW5kb3cuZm9jdXNcblxuICAgIHJldHVyblxuXG4gIG9hdXRoQ29tcGxldGU6ICh1c2VyKSAtPlxuXG4gICAgU3Bpbm5lci5kKClcblxuICAgIEdsb2JhbC5sb2dpbiB1c2VyXG5cbiAgICBOb3RpY2UuaSAnTG9naW4gU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuXG4gIGxvZ2luOiAodXNlcikgLT5cblxuICAgIHdpbmRvdy5Vc2VyID0gdXNlclxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiBpbWcnKS5hdHRyICdzcmMnLCBVc2VyLnBpY3R1cmVcbiAgICBfLm9mZiAnLm1lID4gLnByb2ZpbGUnXG4gICAgXy5vZmYgJy5tZSA+IC5vYXV0aHMnXG4gICAgXy5vbiAnLm1lID4gLnBpY3R1cmUnXG5cbiAgICBpZiBVc2VyLmNsaWVudCBpc250IHVuZGVmaW5lZFxuICAgICAgJCgnaGVhZGVyID4gLmlubmVyID4gLmNsaWVudCA+IC5uYW1lJykuaHRtbCBVc2VyLmNsaWVudC5uYW1lXG5cbiAgbG9naW5DaGVjazogLT5cbiAgICBNZS5hdXRoZWQgKHJlc3VsdCkgLT5cbiAgICAgIEdsb2JhbC5sb2dpbihyZXN1bHQpIGlmIHJlc3VsdCBpc250IGZhbHNlXG4iLCJfLmNvbnN0cnVjdG9yKClcblxuY2xhc3MgSW5kZXhcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAbW9iaWxlXG5cbiAgbW9iaWxlOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG4iLG51bGwsIk1lID1cblxuICBsb2dvdXQ6IChjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2F1dGgvbG9nb3V0J1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZSgpXG5cbiAgb2F1dGg6ICh0eXBlLCBjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0IFwiL2FwaS9hdXRoLyN7dHlwZX1cIlxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZShyZXNwb25zZS5kYXRhLnVyaSlcblxuICBhdXRoZWQ6IChyZXN1bHQpIC0+XG4gICAgXy5nZXQgJy9hcGkvYXV0aCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgcmVzdWx0IHJlc3BvbnNlLmRhdGEudXNlclxuIiwiTm90Zm91bmQgPVxuICBpOiAtPlxuICAgICQoJyNsaW5lZXJyb3InKS5ub3ZhY2FuY3lcbiAgICAgICdyZWJsaW5rUHJvYmFiaWxpdHknOiAwLjFcbiAgICAgICdibGlua01pbic6IDAuMlxuICAgICAgJ2JsaW5rTWF4JzogMC42XG4gICAgICAnbG9vcE1pbic6IDhcbiAgICAgICdsb29wTWF4JzogMTBcbiAgICAgICdjb2xvcic6ICcjZmZmZmZmJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4ICNmZmZmZmYnLCAnMCAwIDMwcHggIzAwODAwMCcsICcwIDAgNnB4ICMwMDAwZmYnXVxuXG4gICAgJCgnI2xpbmVjb2RlJykubm92YWNhbmN5XG4gICAgICAnYmxpbmsnOiAxXG4gICAgICAnb2ZmJzogMVxuICAgICAgJ2NvbG9yJzogJ1JlZCdcbiAgICAgICdnbG93JzogWycwIDAgODBweCBSZWQnLCAnMCAwIDMwcHggRmlyZUJyaWNrJywgJzAgMCA2cHggRGFya1JlZCddXG4iLCJOb3RpY2UgPVxuXG4gIHR5cGVzOiBbJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZyddXG4gIGVsOiBmYWxzZVxuICBvbjogZmFsc2VcbiAgdGltZW91dDogZmFsc2VcblxuICBpOiAoY29weSx0eXBlPSdpbmZvJykgLT5cblxuICAgIE5vdGljZS5lbCA9ICQoJy5ub3RpY2UnKSBpZiBOb3RpY2UuZWwgaXMgZmFsc2VcblxuICAgIGZvciBkdHlwZSBpbiBOb3RpY2UudHlwZXNcbiAgICAgIE5vdGljZS5lbC5yZW1vdmVDbGFzcyBkdHlwZVxuXG4gICAgTm90aWNlLmVsLmFkZENsYXNzIHR5cGVcblxuICAgIE5vdGljZS5lbC5maW5kKCcuY29weSA+IC5tZXNzYWdlJykuaHRtbCBjb3B5XG5cbiAgICBpZiBOb3RpY2Uub24gaXMgZmFsc2VcbiAgICAgIF8ub24gTm90aWNlLmVsXG4gICAgICBOb3RpY2UuaGFuZGxlcnMub24oKVxuICAgICAgTm90aWNlLm9uID0gdHJ1ZVxuXG4gICAgTm90aWNlLnRpbWVvdXQgPSBzZXRUaW1lb3V0IC0+XG4gICAgICBOb3RpY2UuZCgpXG4gICAgLCA1MDAwXG5cbiAgaGFuZGxlcnM6XG4gICAgb246IC0+XG4gICAgICAkKCcubm90aWNlID4gLmlubmVyID4gLmNsb3NlJykuY2xpY2sgTm90aWNlLmRcbiAgICBvZmY6IC0+XG4gICAgICAkKCcubm90aWNlID4gLmlubmVyID4gLmNsb3NlJykudW5iaW5kICdjbGljaycsIE5vdGljZS5kXG5cbiAgZDogLT5cbiAgICBjbGVhclRpbWVvdXQgTm90aWNlLnRpbWVvdXQgaWYgTm90aWNlLnRpbWVvdXQgaXNudCBmYWxzZVxuICAgIE5vdGljZS50aW1lb3V0ID0gZmFsc2VcbiAgICBOb3RpY2UuaGFuZGxlcnMub2ZmKClcbiAgICBfLm9mZiBOb3RpY2UuZWwsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC4yXG4gICAgTm90aWNlLm9uID0gZmFsc2VcbiIsIlByb21wdCA9XG4gIGVsOiB7fVxuICBvcHRpb25zOiB7fVxuICBjYWxsYmFjazogZmFsc2VcbiAgcGFyYW1zOiB7fVxuXG4gIGk6ICh0aXRsZSwgY29weSwgb3B0aW9ucz1bJ09LJ10sIHBhcmFtcywgY2FsbGJhY2spIC0+XG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBmYWxzZVxuICAgIFByb21wdC5wYXJhbXMgPSBmYWxzZVxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ2Z1bmN0aW9uJ1xuICAgIFByb21wdC5jYWxsYmFjayA9IGNhbGxiYWNrIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG5cbiAgICBQcm9tcHQucGFyYW1zID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCdcblxuICAgIFByb21wdC5lbCA9ICQgJy5wcm9tcHQnXG5cbiAgICBQcm9tcHQuZWwuZmluZCAnLnRpdGxlJ1xuICAgICAgLmh0bWwgdGl0bGVcbiAgICBQcm9tcHQuZWwuZmluZCAnLmNvcHknXG4gICAgICAuaHRtbCBjb3B5XG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAndGV4dGFyZWEnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLnRleHRhcmVhIGlzIHRydWVcbiAgICAgIF8ub24gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICAgIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCBwYXJhbXMudmFsdWVcblxuICAgIFByb21wdC5vcHRpb25zID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb25zID4gLm9wdGlvbidcbiAgICBfLm9mZiBQcm9tcHQub3B0aW9uc1xuICAgIFByb21wdC5vcHRpb25zLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gICAgZm9yIG8saSBpbiBvcHRpb25zXG4gICAgICBvcHRpb24gPSBQcm9tcHQuZWwuZmluZCBcIi5vcHRpb25zICA+IC5vcHRpb25fI3tpKzF9XCJcbiAgICAgIF8ub24gb3B0aW9uXG4gICAgICBvcHRpb24uaHRtbCBvXG4gICAgICAgIC5kYXRhICd2YWx1ZScsIG9cblxuICAgIF8ub24gUHJvbXB0LmVsLFxuICAgIF8ub24gJy5mYWRlJ1xuXG4gICAgUHJvbXB0LmhhbmRsZXJzKClcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmZvY3VzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKGRvY3VtZW50KS5rZXlkb3duIFByb21wdC5rZXlkb3duXG4gICAgUHJvbXB0Lm9wdGlvbnMub24gJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbm5lciA+IC5jYW5jZWwnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2FuY2VsXG5cbiAga2V5ZG93bjogLT5cbiAgICBrID0gZXZlbnQud2hpY2hcbiAgICBrZXlzID0gWzM5LCA5LCAzNywgMTMsIDI3XVxuICAgIHJldHVybiB0cnVlIGlmIGsgbm90IGluIGtleXNcblxuICAgIGN1cnJlbnQgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbi5vbi5hY3RpdmUnXG4gICAgc2hpZnQgPSB3aW5kb3cuZXZlbnQuc2hpZnRLZXlcblxuICAgIGlmIGsgaXMgMzkgb3IgKGsgaXMgOSBhbmQgIXNoaWZ0KVxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgaWYgY3VycmVudC5uZXh0KCkuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBjdXJyZW50Lm5leHQoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgZWxzZVxuICAgICAgICBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbl8xJykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAzNyBvciAoayBpcyA5IGFuZCBzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQucHJldigpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5wcmV2KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24ub24nKS5sYXN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAxM1xuICAgICAgUHJvbXB0LnRyaWdnZXIgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24uYWN0aXZlJykuZGF0YSAndmFsdWUnXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZiBrIGlzIDI3XG4gICAgICBQcm9tcHQudHJpZ2dlcihmYWxzZSlcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gIGNhbmNlbDogLT5cbiAgICBQcm9tcHQudHJpZ2dlciBmYWxzZVxuXG4gIGNsaWNrOiAtPlxuICAgIFByb21wdC50cmlnZ2VyICQodGhpcykuZGF0YSAndmFsdWUnXG5cbiAgdHJpZ2dlcjogKHZhbHVlKSAtPlxuICAgIF8ub2ZmIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgXy5vZmYgUHJvbXB0LmVsLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuMlxuICAgIF8ub2ZmICcuZmFkZScsIG9mZmluZzogdHJ1ZSwgb2ZmaXRtZTogMC4yXG4gICAgUHJvbXB0Lm9wdGlvbnMudW5iaW5kICdjbGljaycsIFByb21wdC5jbGlja1xuICAgICQoZG9jdW1lbnQpLnVuYmluZCAna2V5ZG93bicsIFByb21wdC5rZXlkb3duXG4gICAgaWYgUHJvbXB0LnBhcmFtcy50ZXh0YXJlYVxuICAgICAgdmFsID0gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsKClcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gcmVzcG9uc2U6IHZhbHVlLCB2YWw6IHZhbFxuICAgIGVsc2VcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gdmFsdWVcbiIsIlNlbGVjdGl6ZSA9XG5cbiAgY2xpZW50czogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0Q2xpZW50ID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIENsaWVudCBcIlxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PiN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS9jbGllbnRzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RDbGllbnQuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0Q2xpZW50XG5cbiAgc3RydWN0dXJlczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG5cbiAgICBzZWxlY3RTdHJ1Y3R1cmUgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIGEgU3RydWN0dXJlICAgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgcmVuZGVyOlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj4je2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0U3RydWN0dXJlLmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdFN0cnVjdHVyZVxuXG4iLCJcblNwaW5uZXIgPVxuXG4gIHN0YXRlOiBmYWxzZVxuXG4gIGVsOiB7fVxuXG4gIGk6IChlbCwgb3ZlcnJpZGUpIC0+XG5cbiAgICBAZWwgPSAkKCcuc3Bpbm5lcicpXG5cbiAgICByZWN0ID0gZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGNvb3JkcyA9XG4gICAgICB0b3A6IFwiI3tyZWN0LnRvcCArICQod2luZG93KS5zY3JvbGxUb3AoKX1weFwiXG4gICAgICBsZWZ0OiBcIiN7cmVjdC5sZWZ0fXB4XCJcbiAgICAgIHdpZHRoOiBcIiN7cmVjdC53aWR0aH1weFwiXG4gICAgICBoZWlnaHQ6IFwiI3tyZWN0LmhlaWdodH1weFwiXG5cbiAgICBpZiBvdmVycmlkZSBpc250IHVuZGVmaW5lZFxuICAgICAgZm9yIGtleSwgY29vcmQgb2Ygb3ZlcnJpZGVcbiAgICAgICAgY29vcmRzW2tleV0gPSBjb29yZFxuXG4gICAgQGVsLmNzcyBjb29yZHNcblxuICAgIF8ub24gQGVsXG4gICAgQHN0YXRlID0gdHJ1ZVxuXG4gIGQ6IC0+XG4gICAgc2V0VGltZW91dCA9PlxuICAgICAgXy5vZmYgQGVsXG4gICAgICBAc3RhdGUgPSBmYWxzZVxuICAgICwgMTAwXG4iLCJTdHJ1Y3R1cmVzID1cblxuICB0ZW1wbGF0ZTogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQGxvYWQoKVxuXG4gICAgQHRlbXBsYXRlID0gJCgnLmFkZCA+ICN0ZW1wbGF0ZScpLmh0bWwoKVxuICAgIEBoYW5kbGVycygpXG4gICAgQGVudGl0eUFkZCgpXG5cbiAgICBUaW1lLmkoKVxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnN0cnVjdHVyZXMgPiAuY29udGVudCcpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsXG4gICAgICB2aWV3OiB0cnVlXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgJCgnLnN0cnVjdHVyZXMgPiAuY29udGVudCA+IC5saXN0aW5nJykuaHRtbCByZXNwb25zZS52aWV3XG4gICAgICBTcGlubmVyLmQoKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnLnBhZ2Uuc3RydWN0dXJlcyA+IC5jdGFiJykuY2xpY2sgQHRvZ2dsZUFkZEhhbmRsZXJcblxuICAgICQoJy5hZGQgPiAuZW50aXRpZXMgPiAubW9yZScpLmNsaWNrIEBlbnRpdHlBZGRIYW5kbGVyXG4gICAgJCgnLmFkZCA+IC5lbnRpdGllcycpLm9uICdjbGljaycsJy5lbnRpdHkgPiAucmVtb3ZlJywgQGVudGl0eVJlbW92ZUhhbmRsZXJcbiAgICAkKCcuYWRkID4gLnN1Ym1pdCA+IC5jdGFwJykuY2xpY2sgQHN1Ym1pdEhhbmRsZXJcblxuICAgIFNlbGVjdGl6ZS5jbGllbnRzICQoJy5hZGQgPiAuY2xpZW50ID4gc2VsZWN0JylcblxuICB0b2dnbGVBZGRIYW5kbGVyOiAtPlxuICAgIF8uc3dhcCAnLmFkZCdcbiAgICAkKCcuYWRkID4gLm5hbWUgaW5wdXQnKS5mb2N1cygpXG5cbiAgZW50aXR5QWRkSGFuZGxlcjogLT5cbiAgICBTdHJ1Y3R1cmVzLmVudGl0eUFkZCh0cnVlKVxuXG4gIGVudGl0eVJlbW92ZUhhbmRsZXI6IC0+XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKVxuXG4gIGVudGl0eUFkZDogKGZvY3VzPWZhbHNlKSAtPlxuICAgICQoJy5hZGQgPiAuZW50aXRpZXMnKS5hcHBlbmQgQHRlbXBsYXRlXG4gICAgQHNlbGVjdGl6ZSgpXG4gICAgaWYgIGZvY3VzXG4gICAgICAkKCcuYWRkID4gLmVudGl0aWVzID4gLmVudGl0eSA+IC5pbnB1dC5zZWxlY3RpemUtaW5wdXQgaW5wdXQnKS5sYXN0KCkuZm9jdXMoKVxuXG4gIHNlbGVjdGl6ZTogLT5cbiAgICAkKCcuZW50aXRpZXMgPiAuZW50aXR5ID4gLmlucHV0ID4gc2VsZWN0Jykuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJUeXBlXCJcblxuICBzdWJtaXRIYW5kbGVyOiAtPlxuXG4gICAgc3RydWN0dXJlID0ge31cbiAgICBzdHJ1Y3R1cmUuZW50aXRpZXMgPSBbXVxuXG4gICAgc3RydWN0dXJlLm5hbWUgPSAkKCcuYWRkID4gLm5hbWUgaW5wdXQnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5jbGllbnQgPSAkKCcuYWRkID4gLmNsaWVudCBzZWxlY3QnKS52YWwoKVxuXG4gICAgJCgnLmFkZCA+IC5lbnRpdGllcyA+IC5lbnRpdHknKS5lYWNoIChpLCBlbCkgLT5cblxuICAgICAgamlucHV0ID0gJChlbCkuZmluZCAnLmlucHV0ID4gaW5wdXQnXG4gICAgICBqc2VsZWN0ID0gJChlbCkuZmluZCAnLmlucHV0ID4gc2VsZWN0J1xuXG4gICAgICBzdHJ1Y3R1cmUuZW50aXRpZXMucHVzaFxuICAgICAgICBuYW1lOiBqaW5wdXQudmFsKClcbiAgICAgICAgdHlwZToganNlbGVjdC52YWwoKVxuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG5cbiAgICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMvYWRkJywgc3RydWN0dXJlXG4gICAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgY29uc29sZS5sb2cgcmVzcG9uc2VcbiAgICAgICAgICAkKCcuYWRkID4gLmVudGl0aWVzJykuZW1wdHkoKVxuICAgICAgICAgIF8ub2ZmICcuYWRkJ1xuICAgICAgICAgIE5vdGljZS5pICdTdHJ1Y3R1cmUgYWRkZWQgc3VjY2Vzc2Z1bGx5JywgJ3N1Y2Nlc3MnXG4gICAgICAgICAgU3RydWN0dXJlcy5sb2FkKClcblxuXG4iLCJVc2VycyA9XG5cbiAgc2VsZWN0Q2xpZW50OiBmYWxzZVxuXG4gIGk6IC0+XG4gICAgQGxvYWQoKVxuICAgIFRpbWUuaSgpXG4gICAgQGhhbmRsZXJzKClcblxuICBsb2FkOiAtPlxuICAgIFNwaW5uZXIuaSgkKCcudXNlcnMgPiAuY29udGVudCcpKVxuICAgIF8uZ2V0ICcvYXBpL3VzZXJzJyxcbiAgICAgIHZpZXc6IHRydWVcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAkKCcudXNlcnMgPiAuY29udGVudCcpLmh0bWwgcmVzcG9uc2Uudmlld1xuICAgICAgU3Bpbm5lci5kKClcbiAgICAgIFVzZXJzLnNlbGVjdGl6ZSgpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnVzZXJzID4gLmNvbnRlbnQnKS5vbiAnY2hhbmdlJywgJy5kZXRhaWxzID4gLmRldGFpbCA+IC52YWx1ZS50b2dnbGUgPiBpbnB1dDpjaGVja2JveCcsIEB0b2dnbGVIYW5kbGVyXG5cbiAgdG9nZ2xlSGFuZGxlcjogLT5cbiAgICB0ID0gJCB0aGlzXG4gICAgaWYgdC5pcygnOmNoZWNrZWQnKSB0aGVuIGNoZWNrZWQgPSAxIGVsc2UgY2hlY2tlZCA9IDBcbiAgICBVc2Vycy51cGRhdGUgdC5kYXRhKCdfaWQnKSwgdC5kYXRhKCdmaWVsZCcpLCBjaGVja2VkXG5cbiAgc2VsZWN0Q2xpZW50SGFuZGxlcjogKGUpIC0+XG5cbiAgICBjbGllbnRfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICB1c2VyX2lkID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEgJ19pZCdcblxuICAgIHJldHVybiBmYWxzZSBpZiBjbGllbnRfaWQubGVuZ3RoIGlzbnQgMjRcblxuICAgIFVzZXJzLnVwZGF0ZSB1c2VyX2lkLCAnY2xpZW50JywgY2xpZW50X2lkXG5cbiAgc2VsZWN0aXplOiAtPlxuICAgIFNlbGVjdGl6ZS5jbGllbnRzICQoJy51c2VyID4gLmRldGFpbHMgPiAuZGV0YWlsX2NsaWVudCA+IC52YWx1ZS5zZWxlY3Qgc2VsZWN0JyksQHNlbGVjdENsaWVudEhhbmRsZXJcblxuICB1cGRhdGU6IChfaWQsIGZpZWxkLCB2YWx1ZSkgLT5cblxuICAgIHBhcmFtcyA9IHt9XG4gICAgcGFyYW1zW2ZpZWxkXSA9IHZhbHVlXG4gICAgU3Bpbm5lci5pKCQoJy51c2VycyA+IC5jb250ZW50JykpXG5cbiAgICBfLmdldCBcIi9hcGkvdXNlcnMvdXBkYXRlLyN7X2lkfVwiLCBwYXJhbXNcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgJ1VzZXIgdXBkYXRlZCBzdWNjZXNzZnVsbHknLCAnc3VjY2VzcydcbiAgICAgICAgJChcIi51c2VyLnVzZXJfI3tyZXNwb25zZS5kYXRhLnVzZXIuX2lkfSA+IC5kZXRhaWxzID4gLmRldGFpbF91cGRhdGVkID4gLnZhbHVlID4gdGltZVwiKVxuICAgICAgICAgIC5hdHRyICd0aXRsZScsIHJlc3BvbnNlLmRhdGEudXNlci51cGRhdGVkX2F0XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
