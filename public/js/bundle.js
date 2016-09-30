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
  post: function() {
    var args, jpost;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    jpost = $.post.apply($, args);
    jpost.fail((function(_this) {
      return function(response) {
        return _this.fail(response);
      };
    })(this));
    return jpost;
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
        return jel.html(moment(jel.attr('title')).fromNow(true));
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

var Entities;

Entities = {
  blogs: [],
  placeholders: ["That's what I'm blogging about", "Have you guys been blogging?", "Hold all my calls, I'm blogging", "Tell Donnie I'm blogging and I'll call him back", "I gotta run, you should be blogging", "I want you on the phone, but I also want you blogging"],
  Blog: function(el, name) {
    var editor;
    editor = el.find('.blog').summernote({
      placeholder: this.placeholders[Math.floor(Math.random() * this.placeholders.length)],
      callbacks: {
        onImageUpload: function(files) {
          return Entities.imageUpload(files, this);
        }
      }
    });
    return this.blogs.push({
      name: name,
      editor: editor,
      el: el.find('.blog')
    });
  },
  blogGetCode: function(name) {
    var blog, i, len, ref;
    ref = this.blogs;
    for (i = 0, len = ref.length; i < len; i++) {
      blog = ref[i];
      if (blog.name === name) {
        return blog.el.summernote('code');
      }
    }
  },
  blogFocus: function(name) {
    var blog, i, len, ref, results;
    ref = this.blogs;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      blog = ref[i];
      if (blog.name === name) {
        results.push($('.note-editable').focus());
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  imageUpload: function(files, el) {
    var fd;
    fd = new FormData();
    fd.append('file', files[0]);
    console.log(fd);
    return _.post({
      xhr: function() {
        var xhr;
        xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(e) {
          var complete;
          complete = e.loaded / e.total;
          if (complete < 1) {
            Notice.i('Uploading image..', {
              progress: complete
            });
          }
          if (complete === 1) {
            return Notice.i('Processing image..', {
              progress: complete
            });
          }
        }, false);
        return xhr;
      },
      url: '/api/upload',
      data: fd,
      cache: false,
      contentType: false,
      processData: false,
      success: function(result) {
        $(el).summernote('editor.insertImage', result.data.url);
        return Notice.i('File uploaded successfully', {
          type: 'success'
        });
      }
    });
  },
  Tags: function(el, name) {
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

var Entries;

Entries = {
  addSelectClient: {},
  addSelectStructure: {},
  addSelectClientId: false,
  _id: false,
  i: function() {
    this.selectize();
    return this.handlers();
  },
  selectize: function() {
    this.addSelectClient = Selectize.clients($('.modify > .client > select'), Entries.clientSelectHandler);
    return this.addSelectStructure = Selectize.structures($('.modify > .structure > select'), Entries.structureSelectHandler, {
      client: Entries.getAddSelectClientId
    });
  },
  handlers: function() {
    $('.page.entries > .modify > .submit').click(this.submit);
    return $('.focusme').focus(function() {
      return $('.note-editable').focus();
    });
  },
  submit: function() {
    var entries, name;
    name = $('.page.entries > .modify > .name > .input > input').val();
    entries = [];
    return $('.page.entries > .modify > .body > .entity').each(function(i, el) {
      var blog, type, value;
      name = $(el).find('.label').html();
      type = $(el).data('type');
      switch (type) {
        case 'Text':
          value = $(el).find('input').val();
          break;
        case 'Tags':
          value = $(el).find('input').val().split(',');
          break;
        case 'Blog':
          blog = Entities.blogGetCode(name);
          value = blog;
      }
      return entries.push({
        name: name,
        type: type,
        value: value
      });
    }).promise().done(function() {
      var call;
      Spinner.i($('.page.entries > .modify'));
      if (Entries._id === false) {
        call = '/api/entries/add';
      } else {
        call = "/api/entries/update/" + Entries._id;
      }
      return _.get(call, {
        name: name,
        entries: entries
      }).always(function() {
        return Spinner.d();
      }).done(function(response) {
        Notice.i(response.data.status, {
          type: 'success'
        });
        return Entries._id = response.data._id;
      });
    });
  },
  clientSelectHandler: function(e) {
    var client_id;
    client_id = $(e.currentTarget).val();
    if (client_id.length !== 24) {
      return false;
    }
    Entries.addSelectClientId = client_id;
    Entries.addSelectStructure[0].selectize.enable();
    return Entries.addSelectStructure[0].selectize.clearOptions();
  },
  structureSelectHandler: function(e) {
    var structure_id;
    structure_id = $(e.currentTarget).val();
    if (structure_id.length !== 24) {
      return false;
    }
    return Entries.loadStructure(structure_id);
  },
  getAddSelectClientId: function() {
    return Entries.addSelectClientId;
  },
  loadStructure: function(_id) {
    Spinner.i($('.page.entries > .modify'));
    return _.get('/api/structures', {
      _id: _id
    }).always(function() {
      return Spinner.d();
    }).done((function(_this) {
      return function(response) {
        return _this.loadEntities(response.data[0].entities);
      };
    })(this));
  },
  loadEntities: function(entities) {
    var body, entity, entityEl, html, i, j, len, tabindex;
    _.on('.page.entries > .modify > .name');
    body = $('.page.entries > .modify > .body');
    body.html('');
    tabindex = 2;
    for (i = j = 0, len = entities.length; j < len; i = ++j) {
      entity = entities[i];
      html = $(".page.entries > #template > .entity_" + entity.type);
      html.find('input,select,textarea').attr('tabindex', tabindex++);
      body.append(html);
      entityEl = $(".page.entries > .modify > .body > .entity_" + entity.type);
      entityEl.find('.label').html(entity.name);
      if (Entities[entity.type] !== void 0) {
        Entities[entity.type](entityEl, entity.name);
      }
    }
    $('[tabindex=1]').focus();
    return _.on('.page.entries > .modify > .submit');
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
  progress: false,
  timeout: false,
  close: true,
  "default": {
    type: 'info',
    progress: false,
    timeout: 5000
  },
  i: function(copy, options) {
    var dtype, i, key, len, param, ref;
    if (options == null) {
      options = {};
    }
    this.options = Object.assign({}, this["default"]);
    for (key in options) {
      param = options[key];
      this.options[key] = param;
    }
    if (this.el === false) {
      this.el = $('.notice');
    }
    ref = this.types;
    for (i = 0, len = ref.length; i < len; i++) {
      dtype = ref[i];
      this.el.removeClass(dtype);
    }
    this.el.addClass(this.options.type);
    this.el.find('.copy > .message').html(copy);
    if (this.options.progress !== false) {
      if (this.progress === false) {
        _.on(this.el.find('.notice_progress'));
        this.progress = true;
      }
      if (this.close === true) {
        _.off(this.el.find('.close'));
        this.close = false;
      }
      if (this.on === false) {
        setTimeout((function(_this) {
          return function() {
            return _this.el.find('.full').css('width', _this.options.progress * 100 + '%');
          };
        })(this), 100);
      } else {
        this.el.find('.full').css('width', this.options.progress * 100 + '%');
      }
    }
    if (this.options.progress === false && this.progress === true) {
      this.el.find('.full').css('width', '0%');
      _.off(this.el.find('.notice_progress'));
      this.progress = false;
      _.on(this.el.find('.close'));
      this.close = true;
    }
    if (this.on === false) {
      _.on(this.el);
      this.handlers.on();
      this.on = true;
    }
    if (this.options.timeout !== false && this.options.progress === false) {
      return this.timeout = setTimeout((function(_this) {
        return function() {
          return _this.d();
        };
      })(this), this.options.timeout);
    }
  },
  handlers: {
    on: function() {
      return $('.notice').on('click', '.inner > .close > .inner', Notice.d);
    },
    off: function() {
      return $('.notice').off('click', '.inner > .close > .inner', Notice.d);
    }
  },
  d: function() {
    if (Notice.timeout !== false) {
      clearTimeout(Notice.timeout);
    }
    Notice.timeout = false;
    Notice.handlers.off();
    _.on(Notice.el.find('.close'));
    Notice.close = true;
    _.off(Notice.el.find('.notice_progress'));
    Notice.progress = false;
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
    _.on(Prompt.el, _.on('.bfade'));
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
    _.off('.bfade', {
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
  selectClients: false,
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
    return $('.add > .submit > .ctap').click(this.submitHandler);
  },
  toggleAddHandler: function() {
    _.swap('.add');
    $('.add > .name .client select').focus();
    if (Structures.selectClients === false) {
      Structures.selectClients = Selectize.clients($('.add > .client > select'));
    }
    return Structures.selectClients[0].selectize.focus();
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
    $('.add > .entities > .body').append(this.template);
    this.selectize();
    if (focus) {
      return $('.add > .entities > .body > .entity > .input.selectize-input input').last().focus();
    }
  },
  selectize: function() {
    return $('.entities > .body > .entity > .input > select').selectize({
      placeholder: "Type"
    });
  },
  submitHandler: function() {
    var structure;
    structure = {};
    structure.entities = [];
    structure.name = $('.add > .name input').val();
    structure.client = $('.add > .client select').val();
    return $('.add > .entities > .body > .entity').each(function(i, el) {
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
        Structures.load();
        return $('.add > .name input').val('');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudHMuY29mZmVlIiwiY29uZmlnLmNvZmZlZSIsImRhc2hib2FyZC5jb2ZmZWUiLCJlbnRpdGllcy5jb2ZmZWUiLCJlbnRyaWVzLmNvZmZlZSIsImdsb2JhbC5jb2ZmZWUiLCJpbmRleC5jb2ZmZWUiLCJtYWluLmpzIiwibWUuY29mZmVlIiwibm90Zm91bmQuY29mZmVlIiwibm90aWNlLmNvZmZlZSIsInByb21wdC5jb2ZmZWUiLCJzZWxlY3RpemUuY29mZmVlIiwic3Bpbm5lci5jb2ZmZWUiLCJzdHJ1Y3R1cmVzLmNvZmZlZSIsInVzZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUE7RUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxD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LENBQUMsTUFBTixDQUFhLE9BQWIsRUFBc0IsUUFBdEIsRUFBZ0MsU0FBaEM7RUFQbUIsQ0F4QnJCO0VBaUNBLFNBQUEsRUFBVyxTQUFBO1dBQ1QsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsQ0FBQSxDQUFFLDBEQUFGLENBQWxCLEVBQWdGLElBQUMsQ0FBQSxtQkFBakY7RUFEUyxDQWpDWDtFQW9DQSxNQUFBLEVBQVEsU0FBQyxHQUFELEVBQU0sS0FBTixFQUFhLEtBQWI7QUFFTixRQUFBO0lBQUEsTUFBQSxHQUFTO0lBQ1QsTUFBTyxDQUFBLEtBQUEsQ0FBUCxHQUFnQjtJQUNoQixPQUFPLENBQUMsQ0FBUixDQUFVLENBQUEsQ0FBRSxtQkFBRixDQUFWO1dBRUEsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxvQkFBQSxHQUFxQixHQUEzQixFQUFrQyxNQUFsQyxDQUNFLENBQUMsTUFESCxDQUNVLFNBQUE7YUFDTixPQUFPLENBQUMsQ0FBUixDQUFBO0lBRE0sQ0FEVixDQUdFLENBQUMsSUFISCxDQUdRLFNBQUMsUUFBRDtNQUNKLE1BQU0sQ0FBQyxDQUFQLENBQVMsMkJBQVQsRUFBc0MsU0FBdEM7YUFDQSxDQUFBLENBQUUsYUFBQSxHQUFjLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQWpDLEdBQXFDLCtDQUF2QyxDQUNFLENBQUMsSUFESCxDQUNRLE9BRFIsRUFDaUIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFEcEM7SUFGSSxDQUhSO0VBTk0sQ0FwQ1IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgcG9zdDogKGFyZ3MuLi4pIC0+XG5cbiAgICBqcG9zdCA9ICQucG9zdCBhcmdzLi4uXG5cbiAgICBqcG9zdC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwb3N0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuXG4gICAgZXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04uZXJyb3JzWzBdXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG5fLmkoKVxuIiwiVGltZSA9XG4gIGludGVydmFsOiBmYWxzZVxuICBnYXA6IDEwMDBcblxuICBpOiAtPlxuICAgIEBzY3JhcGUoKVxuICAgIEBpbnQzZXJ2YWwgPSBzZXRJbnRlcnZhbCBAc2NyYXBlLCBAZ2FwXG5cbiAgc2NyYXBlOiAtPlxuICAgICQoJ3RpbWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGplbCA9ICQgZWxcbiAgICAgIGplbC5odG1sIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuZnJvbU5vdyB0cnVlXG5cbiIsIkNsaWVudHMgPVxuXG4gIGk6IC0+XG4gICAgQGxvYWQoKVxuICAgIEBoYW5kbGVycygpXG4gICAgVGltZS5pKClcblxuICAgICQoJy5kYXRlJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBjb25zb2xlLmxvZyBpLCBlbFxuXG4gIGxvYWQ6IC0+XG4gICAgU3Bpbm5lci5pKCQoJy5jbGllbnRzID4gLmNvbnRlbnQnKSlcbiAgICBfLmdldCAnL2FwaS9jbGllbnRzJyxcbiAgICAgIHZpZXc6IHRydWVcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAkKCcuY2xpZW50cyA+IC5jb250ZW50ID4gLmxpc3RpbmcnKS5odG1sIHJlc3BvbnNlLnZpZXdcbiAgICAgIFNwaW5uZXIuZCgpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLmFkZCA+IC5jdGFiJykuY2xpY2sgQGFkZEhhbmRsZXJcbiAgICAkKCcuYWRkID4gLmlucHV0ID4gaW5wdXQnKS5rZXl1cCBAYWRkRW50ZXJIYW5kbGVyXG5cbiAgYWRkRW50ZXJIYW5kbGVyOiAoZSkgLT5cbiAgICBDbGllbnRzLmFkZEhhbmRsZXIoKSBpZiBlLndoaWNoID09IDEzXG5cbiAgYWRkSGFuZGxlcjogLT5cblxuICAgIGlucHV0ZWwgPSAkKCcuYWRkID4gLmlucHV0JylcbiAgICBpbnB1dCA9ICQoJy5hZGQgPiAuaW5wdXQgPiBpbnB1dCcpXG5cbiAgICBpZiBpbnB1dGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBfLm9uIGlucHV0ZWxcbiAgICAgIHJldHVybiBpbnB1dC5mb2N1cygpXG5cbiAgICBpZiBpbnB1dC52YWwoKSA9PSBcIlwiXG4gICAgICBOb3RpY2UuaSAnUGxhY2Ugc3BlY2lmeSBhIG5hbWUnLCAnd2FybmluZydcbiAgICAgIHJldHVybiBpbnB1dC5mb2N1cygpXG5cbiAgICBTcGlubmVyLmkoJCgnLmNsaWVudHMgPiAuY29udGVudCcpKVxuICAgIF8uZ2V0ICcvYXBpL2NsaWVudHMvYWRkJywgbmFtZTogaW5wdXQudmFsKClcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGNvbnNvbGUubG9nIHJlc3BvbnNlXG4gICAgICBpbnB1dC52YWwoJycpXG4gICAgICBfLm9mZiBpbnB1dGVsXG4gICAgICBOb3RpY2UuaSAnQ2xpZW50IGFkZGVkIHN1Y2Nlc3NmdWxseScsICdzdWNjZXNzJ1xuICAgICAgQ2xpZW50cy5sb2FkKClcbiIsImNvbmZpZyA9IHtcInZpZXdcIjp7XCJwYXRoc1wiOltcIi9Vc2Vycy9rL2Jhc2FsL3Jlc291cmNlcy92aWV3c1wiXSxcImNvbXBpbGVkXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay92aWV3c1wifSxcImFwcFwiOntcImVkaXRvclwiOlwibWFjdmltXCJ9LFwiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcIndoaXRlMlwiOlwiI2YxZjFmMVwiLFwid2hpdGUzXCI6XCIjRjRGNEY0XCIsXCJncmV5MVwiOlwiI2U1ZTVlNVwiLFwiZ3JleTJcIjpcIiNmNWY1ZjVcIixcImdyZXkzXCI6XCIjZDBkMGQwXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImJsYWNrMlwiOlwiIzI4MjgyOFwiLFwiYmxhY2szXCI6XCIjMzMzMzMzXCIsXCJyZWQxXCI6XCIjQzgyMTJCXCIsXCJjeWFuMVwiOlwiIzVGQTc5M1wiLFwieWVsbG93MVwiOlwiI0Y2QkI0NVwiLFwib3JhbmdlMVwiOlwiI0Y2OEY2MlwiLFwic2tpbjFcIjpcIiNGM0REQTNcIixcImdyZWVuMVwiOlwiIzViYTU0MVwiLFwiZ3JlZW4yXCI6XCIjODhkOTZkXCIsXCJncmVlbjNcIjpcIiM3N2QzNThcIixcImJsdWUxXCI6XCIjMWRhN2VlXCIsXCJibHVlMlwiOlwiIzAwNzNiYlwiLFwiZ29vZ2xlX2JsdWVcIjpcIiM0Mjg1ZjRcIixcImdvb2dsZV9ncmVlblwiOlwiIzM0YTg1M1wiLFwiZ29vZ2xlX3llbGxvd1wiOlwiI2ZiYmMwNVwiLFwiZ29vZ2xlX3JlZFwiOlwiI2VhNDMzNVwiLFwiZ2l0aHViX2JsdWVcIjpcIiMwRDI2MzZcIixcImZhY2Vib29rX2JsdWVcIjpcIiM0ODY3QUFcIixcImluc3RhZ3JhbV9vclwiOlwiI0ZGNzgwNFwiLFwidHdpdHRlcl9ibHVlXCI6XCIjMDBBQ0VEXCJ9LFwiZm9udFwiOntcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJoMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwifSxcImgzYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImMxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzFzXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNnB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9LFwiYzJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJjMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI1MDBcIn0sXCJub3Rmb3VuZFwiOntcImZvbnQtZmFtaWx5XCI6XCJNb25vdG9uXCIsXCJmb250LXNpemVcIjpcIjc1cHhcIn19LFwibWV0YVwiOntcInRpdGxlXCI6XCJiYXNhbFwiLFwidXJsXCI6XCJodHRwOi8vYmFzYWwuZGV2L1wiLFwiZGVzY3JpcHRpb25cIjpcIm1pbmltYWwgY29udGVudCBtYW5hZ2VtZW50XCIsXCJrZXl3b3Jkc1wiOlwiY21zXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovYmFzYWxcIn0sXCJkZWJ1Z2JhclwiOntcImVuYWJsZWRcIjpudWxsLFwic3RvcmFnZVwiOntcImVuYWJsZWRcIjp0cnVlLFwiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2RlYnVnYmFyXCIsXCJjb25uZWN0aW9uXCI6bnVsbCxcInByb3ZpZGVyXCI6XCJcIn0sXCJpbmNsdWRlX3ZlbmRvcnNcIjp0cnVlLFwiY2FwdHVyZV9hamF4XCI6dHJ1ZSxcImNsb2Nrd29ya1wiOmZhbHNlLFwiY29sbGVjdG9yc1wiOntcInBocGluZm9cIjp0cnVlLFwibWVzc2FnZXNcIjp0cnVlLFwidGltZVwiOnRydWUsXCJtZW1vcnlcIjp0cnVlLFwiZXhjZXB0aW9uc1wiOnRydWUsXCJsb2dcIjp0cnVlLFwiZGJcIjp0cnVlLFwidmlld3NcIjp0cnVlLFwicm91dGVcIjp0cnVlLFwibGFyYXZlbFwiOmZhbHNlLFwiZXZlbnRzXCI6ZmFsc2UsXCJkZWZhdWx0X3JlcXVlc3RcIjpmYWxzZSxcInN5bWZvbnlfcmVxdWVzdFwiOnRydWUsXCJtYWlsXCI6dHJ1ZSxcImxvZ3NcIjpmYWxzZSxcImZpbGVzXCI6ZmFsc2UsXCJjb25maWdcIjpmYWxzZSxcImF1dGhcIjpmYWxzZSxcImdhdGVcIjpmYWxzZSxcInNlc3Npb25cIjp0cnVlfSxcIm9wdGlvbnNcIjp7XCJhdXRoXCI6e1wic2hvd19uYW1lXCI6ZmFsc2V9LFwiZGJcIjp7XCJ3aXRoX3BhcmFtc1wiOnRydWUsXCJ0aW1lbGluZVwiOmZhbHNlLFwiYmFja3RyYWNlXCI6ZmFsc2UsXCJleHBsYWluXCI6e1wiZW5hYmxlZFwiOmZhbHNlLFwidHlwZXNcIjpbXCJTRUxFQ1RcIl19LFwiaGludHNcIjp0cnVlfSxcIm1haWxcIjp7XCJmdWxsX2xvZ1wiOmZhbHNlfSxcInZpZXdzXCI6e1wiZGF0YVwiOmZhbHNlfSxcInJvdXRlXCI6e1wibGFiZWxcIjp0cnVlfSxcImxvZ3NcIjp7XCJmaWxlXCI6bnVsbH19LFwiaW5qZWN0XCI6dHJ1ZSxcInJvdXRlX3ByZWZpeFwiOlwiX2RlYnVnYmFyXCJ9LFwiY2FjaGVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwic3RvcmVzXCI6e1wiYXBjXCI6e1wiZHJpdmVyXCI6XCJhcGNcIn0sXCJhcnJheVwiOntcImRyaXZlclwiOlwiYXJyYXlcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJjYWNoZVwiLFwiY29ubmVjdGlvblwiOm51bGx9LFwiZmlsZVwiOntcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvY2FjaGVcIn0sXCJtZW1jYWNoZWRcIjp7XCJkcml2ZXJcIjpcIm1lbWNhY2hlZFwiLFwic2VydmVyc1wiOlt7XCJob3N0XCI6XCIxMjcuMC4wLjFcIixcInBvcnRcIjoxMTIxMSxcIndlaWdodFwiOjEwMH1dfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwifX0sXCJwcmVmaXhcIjpcImxhcmF2ZWxcIn0sXCJxdWV1ZVwiOntcImRlZmF1bHRcIjpcImFycmF5XCIsXCJjb25uZWN0aW9uc1wiOntcInN5bmNcIjp7XCJkcml2ZXJcIjpcInN5bmNcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJqb2JzXCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwiZXhwaXJlXCI6NjB9LFwiYmVhbnN0YWxrZFwiOntcImRyaXZlclwiOlwiYmVhbnN0YWxrZFwiLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwidHRyXCI6NjB9LFwic3FzXCI6e1wiZHJpdmVyXCI6XCJzcXNcIixcImtleVwiOlwieW91ci1wdWJsaWMta2V5XCIsXCJzZWNyZXRcIjpcInlvdXItc2VjcmV0LWtleVwiLFwicXVldWVcIjpcInlvdXItcXVldWUtdXJsXCIsXCJyZWdpb25cIjpcInVzLWVhc3QtMVwifSxcImlyb25cIjp7XCJkcml2ZXJcIjpcImlyb25cIixcImhvc3RcIjpcIm1xLWF3cy11cy1lYXN0LTEuaXJvbi5pb1wiLFwidG9rZW5cIjpcInlvdXItdG9rZW5cIixcInByb2plY3RcIjpcInlvdXItcHJvamVjdC1pZFwiLFwicXVldWVcIjpcInlvdXItcXVldWUtbmFtZVwiLFwiZW5jcnlwdFwiOnRydWV9LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwiZXhwaXJlXCI6NjB9fSxcImZhaWxlZFwiOntcImRhdGFiYXNlXCI6XCJtb25nb2RiXCIsXCJ0YWJsZVwiOlwiZmFpbGVkX2pvYnNcIn19fTsiLCJEYXNoYm9hcmQgPVxuXG4gIGRhdGE6e31cblxuICBpOiAtPlxuICAgIEBnZXRkYXRhID0+XG4gICAgICBAcG9wdWxhdGUoKVxuXG4gIHBvcHVsYXRlOiAtPlxuICAgICQoJy5kYXNoYm9hcmQgLnZhbHVlJykuZWFjaCAoaSwgZWwpID0+XG4gICAgICAkKGVsKS5odG1sIEBkb3RzdG92YWx1ZSAkKGVsKS5kYXRhICd2YWx1ZSdcblxuICBnZXRkYXRhOiAoY29tcGxldGUpIC0+XG5cbiAgICBnZXRzID0gWyd1c2VycycsJ2NsaWVudHMnLCAnc3RydWN0dXJlcycsICdlbnRyaWVzJ11cblxuICAgICQoZ2V0cykuZWFjaCAoaW5kZXgsIGdldCkgPT5cbiAgICAgIF8uZ2V0IFwiL2FwaS8je2dldH1cIlxuICAgICAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICAgICAgQGRhdGFbZ2V0XSA9IHJlc3BvbnNlXG4gICAgICAgICAgaWYgT2JqZWN0LmtleXMoQGRhdGEpLmxlbmd0aCA9PSBnZXRzLmxlbmd0aFxuICAgICAgICAgICAgY29tcGxldGUoKVxuXG4gIGRvdHN0b3ZhbHVlOiAoZG90cykgLT5cbiAgICByZXN1bHQgPSBAZGF0YVxuICAgIGZvciBkaW0gaW4gZG90cy5zcGxpdCAnLidcbiAgICAgIHJlc3VsdCA9IHJlc3VsdFtkaW1dXG5cbiAgICByZXR1cm4gcmVzdWx0XG5cbiIsIkVudGl0aWVzID1cblxuICBibG9nczogW11cblxuICBwbGFjZWhvbGRlcnM6IFtcbiAgICBcIlRoYXQncyB3aGF0IEknbSBibG9nZ2luZyBhYm91dFwiXG4gICAgXCJIYXZlIHlvdSBndXlzIGJlZW4gYmxvZ2dpbmc/XCJcbiAgICBcIkhvbGQgYWxsIG15IGNhbGxzLCBJJ20gYmxvZ2dpbmdcIlxuICAgIFwiVGVsbCBEb25uaWUgSSdtIGJsb2dnaW5nIGFuZCBJJ2xsIGNhbGwgaGltIGJhY2tcIlxuICAgIFwiSSBnb3R0YSBydW4sIHlvdSBzaG91bGQgYmUgYmxvZ2dpbmdcIlxuICAgIFwiSSB3YW50IHlvdSBvbiB0aGUgcGhvbmUsIGJ1dCBJIGFsc28gd2FudCB5b3UgYmxvZ2dpbmdcIlxuICBdXG5cbiAgQmxvZzogKGVsLCBuYW1lKSAtPlxuXG4gICAgZWRpdG9yID0gZWwuZmluZCgnLmJsb2cnKS5zdW1tZXJub3RlXG4gICAgICBwbGFjZWhvbGRlcjogQHBsYWNlaG9sZGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBAcGxhY2Vob2xkZXJzLmxlbmd0aCldXG4gICAgICBjYWxsYmFja3M6XG4gICAgICAgIG9uSW1hZ2VVcGxvYWQ6IChmaWxlcykgLT5cbiAgICAgICAgICBFbnRpdGllcy5pbWFnZVVwbG9hZCBmaWxlcywgdGhpc1xuXG4gICAgQGJsb2dzLnB1c2ggbmFtZTogbmFtZSwgZWRpdG9yOiBlZGl0b3IsIGVsOiBlbC5maW5kKCcuYmxvZycpXG5cbiAgYmxvZ0dldENvZGU6IChuYW1lKSAtPlxuICAgIGZvciBibG9nIGluIEBibG9nc1xuICAgICAgcmV0dXJuIGJsb2cuZWwuc3VtbWVybm90ZSgnY29kZScpIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gXG4gIGJsb2dGb2N1czogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICBpZiBibG9nLm5hbWUgaXMgbmFtZVxuICAgICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuICBpbWFnZVVwbG9hZDogKGZpbGVzLCBlbCkgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBmaWxlc1swXVxuICAgIGNvbnNvbGUubG9nIGZkXG5cbiAgICBfLnBvc3RcbiAgICAgIHhocjogLT5cbiAgICAgICAgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lciAncHJvZ3Jlc3MnLCAoZSkgLT5cbiAgICAgICAgICBjb21wbGV0ZSA9IGUubG9hZGVkIC8gZS50b3RhbFxuICAgICAgICAgIGlmIGNvbXBsZXRlIDwgMSB0aGVuIE5vdGljZS5pICdVcGxvYWRpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAgIGlmIGNvbXBsZXRlIGlzIDEgdGhlbiBOb3RpY2UuaSAnUHJvY2Vzc2luZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICwgZmFsc2VcbiAgICAgICAgcmV0dXJuIHhoclxuXG4gICAgICB1cmw6ICcvYXBpL3VwbG9hZCdcbiAgICAgIGRhdGE6IGZkXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZVxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSAtPlxuICAgICAgICAkKGVsKS5zdW1tZXJub3RlKCdlZGl0b3IuaW5zZXJ0SW1hZ2UnLCByZXN1bHQuZGF0YS51cmwpXG4gICAgICAgIE5vdGljZS5pICdGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuXG5cbiAgVGFnczogKGVsLCBuYW1lKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0Jykuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3Jlc3RvcmVfb25fYmFja3NwYWNlJywncmVtb3ZlX2J1dHRvbiddXG4gICAgICBkZWxpbWl0ZXI6ICcsJ1xuICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICAgIGNyZWF0ZTogKGlucHV0KSAtPlxuICAgICAgICB2YWx1ZTogaW5wdXRcbiAgICAgICAgdGV4dDogaW5wdXRcbiIsIlxuRW50cmllcyA9XG5cbiAgYWRkU2VsZWN0Q2xpZW50OiB7fVxuICBhZGRTZWxlY3RTdHJ1Y3R1cmU6IHt9XG5cbiAgYWRkU2VsZWN0Q2xpZW50SWQ6IGZhbHNlXG5cbiAgX2lkOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBAc2VsZWN0aXplKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gIHNlbGVjdGl6ZTogLT5cblxuICAgIEBhZGRTZWxlY3RDbGllbnQgPSBTZWxlY3RpemUuY2xpZW50cyAkKCcubW9kaWZ5ID4gLmNsaWVudCA+IHNlbGVjdCcpLFxuICAgICAgRW50cmllcy5jbGllbnRTZWxlY3RIYW5kbGVyXG4gICAgQGFkZFNlbGVjdFN0cnVjdHVyZSA9IFNlbGVjdGl6ZS5zdHJ1Y3R1cmVzICQoJy5tb2RpZnkgPiAuc3RydWN0dXJlID4gc2VsZWN0JyksXG4gICAgICBFbnRyaWVzLnN0cnVjdHVyZVNlbGVjdEhhbmRsZXIsXG4gICAgICBjbGllbnQ6IEVudHJpZXMuZ2V0QWRkU2VsZWN0Q2xpZW50SWRcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcucGFnZS5lbnRyaWVzID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5jbGljayBAc3VibWl0XG5cbiAgICAkKCcuZm9jdXNtZScpLmZvY3VzIC0+XG4gICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuICBzdWJtaXQ6IC0+XG5cbiAgICBuYW1lID0gJCgnLnBhZ2UuZW50cmllcyA+IC5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICBlbnRyaWVzID0gW11cblxuICAgICQoJy5wYWdlLmVudHJpZXMgPiAubW9kaWZ5ID4gLmJvZHkgPiAuZW50aXR5JykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBuYW1lID0gJChlbCkuZmluZCgnLmxhYmVsJykuaHRtbCgpXG4gICAgICB0eXBlID0gJChlbCkuZGF0YSAndHlwZSdcblxuICAgICAgc3dpdGNoIHR5cGVcbiAgICAgICAgd2hlbiAnVGV4dCcgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKClcbiAgICAgICAgd2hlbiAnVGFncycgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKCkuc3BsaXQgJywnXG4gICAgICAgIHdoZW4gJ0Jsb2cnXG4gICAgICAgICAgYmxvZyA9IEVudGl0aWVzLmJsb2dHZXRDb2RlIG5hbWVcbiAgICAgICAgICB2YWx1ZSA9IGJsb2dcblxuICAgICAgZW50cmllcy5wdXNoIG5hbWU6IG5hbWUsIHR5cGU6IHR5cGUsIHZhbHVlOiB2YWx1ZVxuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG5cbiAgICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyaWVzID4gLm1vZGlmeScpKVxuXG4gICAgICBpZiBFbnRyaWVzLl9pZCBpcyBmYWxzZVxuICAgICAgICBjYWxsID0gJy9hcGkvZW50cmllcy9hZGQnXG4gICAgICBlbHNlIGNhbGwgPSBcIi9hcGkvZW50cmllcy91cGRhdGUvI3tFbnRyaWVzLl9pZH1cIlxuXG4gICAgICBfLmdldCBjYWxsLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIGVudHJpZXM6IGVudHJpZXNcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBFbnRyaWVzLl9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG5cbiAgY2xpZW50U2VsZWN0SGFuZGxlcjogKGUpIC0+XG4gICAgY2xpZW50X2lkID0gJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpXG4gICAgcmV0dXJuIGZhbHNlIGlmIGNsaWVudF9pZC5sZW5ndGggaXNudCAyNFxuICAgIEVudHJpZXMuYWRkU2VsZWN0Q2xpZW50SWQgPSBjbGllbnRfaWRcbiAgICBFbnRyaWVzLmFkZFNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuZW5hYmxlKClcbiAgICBFbnRyaWVzLmFkZFNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuY2xlYXJPcHRpb25zKClcblxuICBzdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyOiAoZSkgLT5cbiAgICBzdHJ1Y3R1cmVfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICByZXR1cm4gZmFsc2UgaWYgc3RydWN0dXJlX2lkLmxlbmd0aCBpc250IDI0XG4gICAgRW50cmllcy5sb2FkU3RydWN0dXJlIHN0cnVjdHVyZV9pZFxuXG4gIGdldEFkZFNlbGVjdENsaWVudElkOiAtPlxuICAgIHJldHVybiBFbnRyaWVzLmFkZFNlbGVjdENsaWVudElkXG5cbiAgbG9hZFN0cnVjdHVyZTogKF9pZCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyaWVzID4gLm1vZGlmeScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsXG4gICAgICBfaWQ6IF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgQGxvYWRFbnRpdGllcyByZXNwb25zZS5kYXRhWzBdLmVudGl0aWVzXG5cbiAgbG9hZEVudGl0aWVzOiAoZW50aXRpZXMpIC0+XG4gICAgXy5vbiAnLnBhZ2UuZW50cmllcyA+IC5tb2RpZnkgPiAubmFtZSdcbiAgICBib2R5ID0gJCgnLnBhZ2UuZW50cmllcyA+IC5tb2RpZnkgPiAuYm9keScpXG4gICAgYm9keS5odG1sICcnXG4gICAgdGFiaW5kZXggPSAyXG5cbiAgICBmb3IgZW50aXR5LCBpIGluIGVudGl0aWVzXG4gICAgICBodG1sID0gJChcIi5wYWdlLmVudHJpZXMgPiAjdGVtcGxhdGUgPiAuZW50aXR5XyN7ZW50aXR5LnR5cGV9XCIpXG4gICAgICBodG1sLmZpbmQoJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYScpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXgrK1xuICAgICAgYm9keS5hcHBlbmQgaHRtbFxuICAgICAgZW50aXR5RWwgPSAkKFwiLnBhZ2UuZW50cmllcyA+IC5tb2RpZnkgPiAuYm9keSA+IC5lbnRpdHlfI3tlbnRpdHkudHlwZX1cIilcbiAgICAgIGVudGl0eUVsLmZpbmQoJy5sYWJlbCcpLmh0bWwgZW50aXR5Lm5hbWVcbiAgICAgIGlmIEVudGl0aWVzW2VudGl0eS50eXBlXSBpc250IHVuZGVmaW5lZFxuICAgICAgICBFbnRpdGllc1tlbnRpdHkudHlwZV0oZW50aXR5RWwsIGVudGl0eS5uYW1lKVxuICAgICQoJ1t0YWJpbmRleD0xXScpLmZvY3VzKClcbiAgICBfLm9uICcucGFnZS5lbnRyaWVzID4gLm1vZGlmeSA+IC5zdWJtaXQnXG4iLCJHbG9iYWwgPVxuXG4gICMga2V2aW4gb2xzb24gKGtldmluQDI1Ni5pbykgYWthIPCfjIDwn463XG5cbiAgd2luZG93OiBmYWxzZVxuXG4gIGk6IC0+XG4gICAgR2xvYmFsLmhhbmRsZXJzKClcbiAgICBHbG9iYWwubG9naW5DaGVjaygpXG5cbiAgICBfLm9uIFwiLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb25fI3tQYWdlfVwiIGlmIFBhZ2UgaXNudCB1bmRlZmluZWRcblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5wcm9maWxlJykuY2xpY2sgR2xvYmFsLnVzZXJQcm9maWxlSGFuZGxlclxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5vYXV0aHMgPiAub2F1dGgnKS5jbGljayBHbG9iYWwudXNlck9hdXRoSGFuZGxlclxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5waWN0dXJlID4gLmxvZ291dCcpLmNsaWNrIEdsb2JhbC5sb2dvdXRIYW5kbGVyXG4gICAgJCgnLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb24nKS5jbGljayBHbG9iYWwubWVudUhhbmRsZXJcblxuICBtZW51SGFuZGxlcjogLT5cbiAgICBfLm9mZiAkKCcubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbicpXG4gICAgc2VsZWN0ZWQgPSAkKHRoaXMpLmZpbmQoJy5sYWJlbCcpLmh0bWwoKVxuICAgIF8ub24gJChcIi5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uLm9wdGlvbl8je3NlbGVjdGVkfVwiKVxuXG4gIGxvZ291dEhhbmRsZXI6IC0+XG5cbiAgICBQcm9tcHQuaSAnTG9nb3V0JywgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0PycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgcmV0dXJuIGZhbHNlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcblxuICAgICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICAgIE1lLmxvZ291dCAtPlxuICAgICAgICBfLnN3YXAgJy5tZSA+IC5wcm9maWxlJ1xuICAgICAgICBfLnN3YXAgJy5tZSA+IC5waWN0dXJlJ1xuICAgICAgICBOb3RpY2UuaSAnTG9nb3V0IFN1Y2Nlc3NmdWwnLCAnc3VjY2VzcydcbiAgICAgICAgU3Bpbm5lci5kKClcblxuICB1c2VyUHJvZmlsZUhhbmRsZXI6IC0+XG5cbiAgICBvYSA9ICQoJy5vYXV0aHMnKVxuICAgIHRsID0gbmV3IFRpbWVsaW5lTWF4IHJlcGVhdDogMFxuXG4gICAgaWYgb2EuaGFzQ2xhc3MgJ29mZidcbiAgICAgIF8ub24gb2FcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI2NhbmNlbFNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICBlbHNlXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNwcm9maWxlU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgICAgXy5vZmYgb2EsIG9mZmluZzogMC41XG5cbiAgdXNlck9hdXRoSGFuZGxlcjogLT5cblxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICBHbG9iYWwudXNlclByb2ZpbGVIYW5kbGVyKClcbiAgICByZXR1cm4gdHJ1ZSBpZiB0eXBlIGlzICdjYW5jZWwnXG5cbiAgICBHbG9iYWwub2F1dGhXaW5kb3cgJy9sb2FkaW5nJ1xuXG4gICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICBNZS5vYXV0aCB0eXBlLCAodXJpKSAtPlxuICAgICAgR2xvYmFsLndpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJpXG5cbiAgb2F1dGhXaW5kb3c6ICh1cmwpIC0+XG4gICAgdyA9IDY0MFxuICAgIGggPSA1NTBcbiAgICBsZWZ0ID0gKHNjcmVlbi53aWR0aC8yKSAtICh3LzIpXG4gICAgdG9wID0gKHNjcmVlbi5oZWlnaHQvMikgLSAoaC8yKVxuXG5cbiAgICBHbG9iYWwud2luZG93ID0gd2luZG93Lm9wZW4odXJsLCAnTG9naW4gLyBSZWdpc3RlcicsIFwidG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPSN7d30saGVpZ2h0PSN7aH0sdG9wPSN7dG9wfSxsZWZ0PSN7bGVmdH1cIilcbiAgICBHbG9iYWwud2luZG93LmZvY3VzIGlmIHdpbmRvdy5mb2N1c1xuXG4gICAgcmV0dXJuXG5cbiAgb2F1dGhDb21wbGV0ZTogKHVzZXIpIC0+XG5cbiAgICBTcGlubmVyLmQoKVxuXG4gICAgR2xvYmFsLmxvZ2luIHVzZXJcblxuICAgIE5vdGljZS5pICdMb2dpbiBTdWNjZXNzZnVsJywgJ3N1Y2Nlc3MnXG5cbiAgbG9naW46ICh1c2VyKSAtPlxuXG4gICAgd2luZG93LlVzZXIgPSB1c2VyXG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IGltZycpLmF0dHIgJ3NyYycsIFVzZXIucGljdHVyZVxuICAgIF8ub2ZmICcubWUgPiAucHJvZmlsZSdcbiAgICBfLm9mZiAnLm1lID4gLm9hdXRocydcbiAgICBfLm9uICcubWUgPiAucGljdHVyZSdcblxuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50ID4gLm5hbWUnKS5odG1sIFVzZXIuY2xpZW50Lm5hbWVcblxuICBsb2dpbkNoZWNrOiAtPlxuICAgIE1lLmF1dGhlZCAocmVzdWx0KSAtPlxuICAgICAgR2xvYmFsLmxvZ2luKHJlc3VsdCkgaWYgcmVzdWx0IGlzbnQgZmFsc2VcbiIsIl8uY29uc3RydWN0b3IoKVxuXG5jbGFzcyBJbmRleFxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy50b3AgLmJ1cmdlcicpLmNsaWNrIEBtb2JpbGVcblxuICBtb2JpbGU6IC0+XG4gICAgXy5zd2FwICcudG9wID4gLmJ1cmdlcidcbiAgICBfLnN3YXAgJy50b3AgPiAubWVudSdcbiIsbnVsbCwiTWUgPVxuXG4gIGxvZ291dDogKGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgJy9hcGkvYXV0aC9sb2dvdXQnXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIGNvbXBsZXRlKClcblxuICBvYXV0aDogKHR5cGUsIGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgXCIvYXBpL2F1dGgvI3t0eXBlfVwiXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIGNvbXBsZXRlKHJlc3BvbnNlLmRhdGEudXJpKVxuXG4gIGF1dGhlZDogKHJlc3VsdCkgLT5cbiAgICBfLmdldCAnL2FwaS9hdXRoJ1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICByZXN1bHQgcmVzcG9uc2UuZGF0YS51c2VyXG4iLCJOb3Rmb3VuZCA9XG4gIGk6IC0+XG4gICAgJCgnI2xpbmVlcnJvcicpLm5vdmFjYW5jeVxuICAgICAgJ3JlYmxpbmtQcm9iYWJpbGl0eSc6IDAuMVxuICAgICAgJ2JsaW5rTWluJzogMC4yXG4gICAgICAnYmxpbmtNYXgnOiAwLjZcbiAgICAgICdsb29wTWluJzogOFxuICAgICAgJ2xvb3BNYXgnOiAxMFxuICAgICAgJ2NvbG9yJzogJyNmZmZmZmYnXG4gICAgICAnZ2xvdyc6IFsnMCAwIDgwcHggI2ZmZmZmZicsICcwIDAgMzBweCAjMDA4MDAwJywgJzAgMCA2cHggIzAwMDBmZiddXG5cbiAgICAkKCcjbGluZWNvZGUnKS5ub3ZhY2FuY3lcbiAgICAgICdibGluayc6IDFcbiAgICAgICdvZmYnOiAxXG4gICAgICAnY29sb3InOiAnUmVkJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4IFJlZCcsICcwIDAgMzBweCBGaXJlQnJpY2snLCAnMCAwIDZweCBEYXJrUmVkJ11cbiIsIk5vdGljZSA9XG5cbiAgdHlwZXM6IFsnaW5mbycsJ3N1Y2Nlc3MnLCd3YXJuaW5nJ11cblxuICBlbDogZmFsc2VcblxuICBvbjogZmFsc2VcbiAgcHJvZ3Jlc3M6IGZhbHNlXG4gIHRpbWVvdXQ6IGZhbHNlXG4gIGNsb3NlOiB0cnVlXG5cbiAgZGVmYXVsdDpcbiAgICB0eXBlOiAnaW5mbydcbiAgICBwcm9ncmVzczogZmFsc2VcbiAgICB0aW1lb3V0OiA1MDAwXG5cbiAgaTogKGNvcHksb3B0aW9ucz17fSkgLT5cblxuICAgIEBvcHRpb25zID0gT2JqZWN0LmFzc2lnbiB7fSwgQGRlZmF1bHRcblxuICAgIGZvciBrZXksIHBhcmFtIG9mIG9wdGlvbnNcbiAgICAgIEBvcHRpb25zW2tleV0gPSBwYXJhbVxuXG4gICAgQGVsID0gJCgnLm5vdGljZScpIGlmIEBlbCBpcyBmYWxzZVxuXG4gICAgZm9yIGR0eXBlIGluIEB0eXBlc1xuICAgICAgQGVsLnJlbW92ZUNsYXNzIGR0eXBlXG4gICAgQGVsLmFkZENsYXNzIEBvcHRpb25zLnR5cGVcbiAgICBAZWwuZmluZCgnLmNvcHkgPiAubWVzc2FnZScpLmh0bWwgY29weVxuXG4gICAgaWYgQG9wdGlvbnMucHJvZ3Jlc3MgaXNudCBmYWxzZVxuICAgICAgaWYgQHByb2dyZXNzIGlzIGZhbHNlXG4gICAgICAgIF8ub24gQGVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgICAgICBAcHJvZ3Jlc3MgPSB0cnVlXG4gICAgICBpZiBAY2xvc2UgaXMgdHJ1ZVxuICAgICAgICBfLm9mZiBAZWwuZmluZCgnLmNsb3NlJylcbiAgICAgICAgQGNsb3NlID0gZmFsc2VcbiAgICAgIGlmIEBvbiBpcyBmYWxzZVxuICAgICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgICAgQGVsLmZpbmQoJy5mdWxsJykuY3NzKCd3aWR0aCcsIEBvcHRpb25zLnByb2dyZXNzKjEwMCArICclJylcbiAgICAgICAgLCAxMDBcbiAgICAgIGVsc2VcbiAgICAgICAgQGVsLmZpbmQoJy5mdWxsJykuY3NzKCd3aWR0aCcsIEBvcHRpb25zLnByb2dyZXNzKjEwMCArICclJylcblxuICAgIGlmIEBvcHRpb25zLnByb2dyZXNzIGlzIGZhbHNlIGFuZCBAcHJvZ3Jlc3MgaXMgdHJ1ZVxuICAgICAgQGVsLmZpbmQoJy5mdWxsJykuY3NzKCd3aWR0aCcsICcwJScpXG4gICAgICBfLm9mZiBAZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgICBAcHJvZ3Jlc3MgPSBmYWxzZVxuICAgICAgXy5vbiBAZWwuZmluZCgnLmNsb3NlJylcbiAgICAgIEBjbG9zZSA9IHRydWVcblxuICAgIGlmIEBvbiBpcyBmYWxzZVxuICAgICAgXy5vbiBAZWxcbiAgICAgIEBoYW5kbGVycy5vbigpXG4gICAgICBAb24gPSB0cnVlXG5cbiAgICBpZiBAb3B0aW9ucy50aW1lb3V0IGlzbnQgZmFsc2UgYW5kIEBvcHRpb25zLnByb2dyZXNzIGlzIGZhbHNlXG4gICAgICBAdGltZW91dCA9IHNldFRpbWVvdXQgPT5cbiAgICAgICAgQGQoKVxuICAgICAgLCBAb3B0aW9ucy50aW1lb3V0XG5cbiAgaGFuZGxlcnM6XG4gICAgb246IC0+XG4gICAgICAkKCcubm90aWNlJykub24gJ2NsaWNrJywgJy5pbm5lciA+IC5jbG9zZSA+IC5pbm5lcicsIE5vdGljZS5kXG4gICAgb2ZmOiAtPlxuICAgICAgJCgnLm5vdGljZScpLm9mZiAnY2xpY2snLCAnLmlubmVyID4gLmNsb3NlID4gLmlubmVyJywgTm90aWNlLmRcblxuICBkOiAtPlxuICAgIGNsZWFyVGltZW91dCBOb3RpY2UudGltZW91dCBpZiBOb3RpY2UudGltZW91dCBpc250IGZhbHNlXG4gICAgTm90aWNlLnRpbWVvdXQgPSBmYWxzZVxuICAgIE5vdGljZS5oYW5kbGVycy5vZmYoKVxuICAgIF8ub24gTm90aWNlLmVsLmZpbmQoJy5jbG9zZScpXG4gICAgTm90aWNlLmNsb3NlID0gdHJ1ZVxuICAgIF8ub2ZmIE5vdGljZS5lbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICBOb3RpY2UucHJvZ3Jlc3MgPSBmYWxzZVxuICAgIF8ub2ZmIE5vdGljZS5lbCwgb2ZmaW5nOiB0cnVlLCBvZmZ0aW1lOiAwLjJcbiAgICBOb3RpY2Uub24gPSBmYWxzZVxuIiwiUHJvbXB0ID1cbiAgZWw6IHt9XG4gIG9wdGlvbnM6IHt9XG4gIGNhbGxiYWNrOiBmYWxzZVxuICBwYXJhbXM6IHt9XG5cbiAgaTogKHRpdGxlLCBjb3B5LCBvcHRpb25zPVsnT0snXSwgcGFyYW1zLCBjYWxsYmFjaykgLT5cblxuICAgIFByb21wdC5jYWxsYmFjayA9IGZhbHNlXG4gICAgUHJvbXB0LnBhcmFtcyA9IGZhbHNlXG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBwYXJhbXMgaWYgdHlwZW9mIHBhcmFtcyBpcyAnZnVuY3Rpb24nXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gY2FsbGJhY2sgaWYgdHlwZW9mIGNhbGxiYWNrIGlzICdmdW5jdGlvbidcblxuICAgIFByb21wdC5wYXJhbXMgPSBwYXJhbXMgaWYgdHlwZW9mIHBhcmFtcyBpcyAnb2JqZWN0J1xuXG4gICAgUHJvbXB0LmVsID0gJCAnLnByb21wdCdcblxuICAgIFByb21wdC5lbC5maW5kICcudGl0bGUnXG4gICAgICAuaHRtbCB0aXRsZVxuICAgIFByb21wdC5lbC5maW5kICcuY29weSdcbiAgICAgIC5odG1sIGNvcHlcblxuICAgIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCcgYW5kICd0ZXh0YXJlYScgb2YgcGFyYW1zIGFuZCBwYXJhbXMudGV4dGFyZWEgaXMgdHJ1ZVxuICAgICAgXy5vbiBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhJ1xuICAgICAgUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsIHBhcmFtcy52YWx1ZVxuXG4gICAgUHJvbXB0Lm9wdGlvbnMgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbnMgPiAub3B0aW9uJ1xuICAgIF8ub2ZmIFByb21wdC5vcHRpb25zXG4gICAgUHJvbXB0Lm9wdGlvbnMucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmFkZENsYXNzICdhY3RpdmUnXG5cbiAgICBmb3IgbyxpIGluIG9wdGlvbnNcbiAgICAgIG9wdGlvbiA9IFByb21wdC5lbC5maW5kIFwiLm9wdGlvbnMgID4gLm9wdGlvbl8je2krMX1cIlxuICAgICAgXy5vbiBvcHRpb25cbiAgICAgIG9wdGlvbi5odG1sIG9cbiAgICAgICAgLmRhdGEgJ3ZhbHVlJywgb1xuXG4gICAgXy5vbiBQcm9tcHQuZWwsXG4gICAgXy5vbiAnLmJmYWRlJ1xuXG4gICAgUHJvbXB0LmhhbmRsZXJzKClcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmZvY3VzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKGRvY3VtZW50KS5rZXlkb3duIFByb21wdC5rZXlkb3duXG4gICAgUHJvbXB0Lm9wdGlvbnMub24gJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbm5lciA+IC5jYW5jZWwnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2FuY2VsXG5cbiAga2V5ZG93bjogLT5cbiAgICBrID0gZXZlbnQud2hpY2hcbiAgICBrZXlzID0gWzM5LCA5LCAzNywgMTMsIDI3XVxuICAgIHJldHVybiB0cnVlIGlmIGsgbm90IGluIGtleXNcblxuICAgIGN1cnJlbnQgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbi5vbi5hY3RpdmUnXG4gICAgc2hpZnQgPSB3aW5kb3cuZXZlbnQuc2hpZnRLZXlcblxuICAgIGlmIGsgaXMgMzkgb3IgKGsgaXMgOSBhbmQgIXNoaWZ0KVxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgaWYgY3VycmVudC5uZXh0KCkuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBjdXJyZW50Lm5leHQoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgZWxzZVxuICAgICAgICBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbl8xJykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAzNyBvciAoayBpcyA5IGFuZCBzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQucHJldigpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5wcmV2KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24ub24nKS5sYXN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAxM1xuICAgICAgUHJvbXB0LnRyaWdnZXIgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24uYWN0aXZlJykuZGF0YSAndmFsdWUnXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZiBrIGlzIDI3XG4gICAgICBQcm9tcHQudHJpZ2dlcihmYWxzZSlcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gIGNhbmNlbDogLT5cbiAgICBQcm9tcHQudHJpZ2dlciBmYWxzZVxuXG4gIGNsaWNrOiAtPlxuICAgIFByb21wdC50cmlnZ2VyICQodGhpcykuZGF0YSAndmFsdWUnXG5cbiAgdHJpZ2dlcjogKHZhbHVlKSAtPlxuICAgIF8ub2ZmIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgXy5vZmYgUHJvbXB0LmVsLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuMlxuICAgIF8ub2ZmICcuYmZhZGUnLCBvZmZpbmc6IHRydWUsIG9mZml0bWU6IDAuMlxuICAgIFByb21wdC5vcHRpb25zLnVuYmluZCAnY2xpY2snLCBQcm9tcHQuY2xpY2tcbiAgICAkKGRvY3VtZW50KS51bmJpbmQgJ2tleWRvd24nLCBQcm9tcHQua2V5ZG93blxuICAgIGlmIFByb21wdC5wYXJhbXMudGV4dGFyZWFcbiAgICAgIHZhbCA9IFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCgpXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHJlc3BvbnNlOiB2YWx1ZSwgdmFsOiB2YWxcbiAgICBlbHNlXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHZhbHVlXG4iLCJTZWxlY3RpemUgPVxuXG4gIGNsaWVudHM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuICAgIHNlbGVjdENsaWVudCA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgYSBDbGllbnQgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgcmVuZGVyOlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj4je2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvY2xpZW50cycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0Q2xpZW50LmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdENsaWVudFxuXG4gIHN0cnVjdHVyZXM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuXG4gICAgc2VsZWN0U3RydWN0dXJlID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIFN0cnVjdHVyZSAgIFwiXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXY+I3tpdGVtLm5hbWV9PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdFN0cnVjdHVyZS5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RTdHJ1Y3R1cmVcblxuIiwiXG5TcGlubmVyID1cblxuICBzdGF0ZTogZmFsc2VcblxuICBlbDoge31cblxuICBpOiAoZWwsIG92ZXJyaWRlKSAtPlxuXG4gICAgQGVsID0gJCgnLnNwaW5uZXInKVxuXG4gICAgcmVjdCA9IGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBjb29yZHMgPVxuICAgICAgdG9wOiBcIiN7cmVjdC50b3AgKyAkKHdpbmRvdykuc2Nyb2xsVG9wKCl9cHhcIlxuICAgICAgbGVmdDogXCIje3JlY3QubGVmdH1weFwiXG4gICAgICB3aWR0aDogXCIje3JlY3Qud2lkdGh9cHhcIlxuICAgICAgaGVpZ2h0OiBcIiN7cmVjdC5oZWlnaHR9cHhcIlxuXG4gICAgaWYgb3ZlcnJpZGUgaXNudCB1bmRlZmluZWRcbiAgICAgIGZvciBrZXksIGNvb3JkIG9mIG92ZXJyaWRlXG4gICAgICAgIGNvb3Jkc1trZXldID0gY29vcmRcblxuICAgIEBlbC5jc3MgY29vcmRzXG5cbiAgICBfLm9uIEBlbFxuICAgIEBzdGF0ZSA9IHRydWVcblxuICBkOiAtPlxuICAgIHNldFRpbWVvdXQgPT5cbiAgICAgIF8ub2ZmIEBlbFxuICAgICAgQHN0YXRlID0gZmFsc2VcbiAgICAsIDEwMFxuIiwiU3RydWN0dXJlcyA9XG5cbiAgdGVtcGxhdGU6IGZhbHNlXG4gIHNlbGVjdENsaWVudHM6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEBsb2FkKClcblxuICAgIEB0ZW1wbGF0ZSA9ICQoJy5hZGQgPiAjdGVtcGxhdGUnKS5odG1sKClcbiAgICBAaGFuZGxlcnMoKVxuICAgIEBlbnRpdHlBZGQoKVxuXG4gICAgVGltZS5pKClcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5zdHJ1Y3R1cmVzID4gLmNvbnRlbnQnKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLFxuICAgICAgdmlldzogdHJ1ZVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICQoJy5zdHJ1Y3R1cmVzID4gLmNvbnRlbnQgPiAubGlzdGluZycpLmh0bWwgcmVzcG9uc2Uudmlld1xuICAgICAgU3Bpbm5lci5kKClcblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJy5wYWdlLnN0cnVjdHVyZXMgPiAuY3RhYicpLmNsaWNrIEB0b2dnbGVBZGRIYW5kbGVyXG5cbiAgICAkKCcuYWRkID4gLmVudGl0aWVzID4gLm1vcmUnKS5jbGljayBAZW50aXR5QWRkSGFuZGxlclxuICAgICQoJy5hZGQgPiAuZW50aXRpZXMnKS5vbiAnY2xpY2snLCcuZW50aXR5ID4gLnJlbW92ZScsIEBlbnRpdHlSZW1vdmVIYW5kbGVyXG4gICAgJCgnLmFkZCA+IC5zdWJtaXQgPiAuY3RhcCcpLmNsaWNrIEBzdWJtaXRIYW5kbGVyXG5cblxuICB0b2dnbGVBZGRIYW5kbGVyOiAtPlxuXG4gICAgXy5zd2FwICcuYWRkJ1xuICAgICQoJy5hZGQgPiAubmFtZSAuY2xpZW50IHNlbGVjdCcpLmZvY3VzKClcblxuICAgIGlmIFN0cnVjdHVyZXMuc2VsZWN0Q2xpZW50cyBpcyBmYWxzZVxuICAgICAgU3RydWN0dXJlcy5zZWxlY3RDbGllbnRzID0gU2VsZWN0aXplLmNsaWVudHMgJCgnLmFkZCA+IC5jbGllbnQgPiBzZWxlY3QnKVxuICAgIFN0cnVjdHVyZXMuc2VsZWN0Q2xpZW50c1swXS5zZWxlY3RpemUuZm9jdXMoKVxuXG4gIGVudGl0eUFkZEhhbmRsZXI6IC0+XG4gICAgU3RydWN0dXJlcy5lbnRpdHlBZGQodHJ1ZSlcblxuICBlbnRpdHlSZW1vdmVIYW5kbGVyOiAtPlxuICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlKClcblxuICBlbnRpdHlBZGQ6IChmb2N1cz1mYWxzZSkgLT5cbiAgICAkKCcuYWRkID4gLmVudGl0aWVzID4gLmJvZHknKS5hcHBlbmQgQHRlbXBsYXRlXG4gICAgQHNlbGVjdGl6ZSgpXG4gICAgaWYgIGZvY3VzXG4gICAgICAkKCcuYWRkID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5ID4gLmlucHV0LnNlbGVjdGl6ZS1pbnB1dCBpbnB1dCcpLmxhc3QoKS5mb2N1cygpXG5cbiAgc2VsZWN0aXplOiAtPlxuICAgICQoJy5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eSA+IC5pbnB1dCA+IHNlbGVjdCcpLnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiVHlwZVwiXG5cbiAgc3VibWl0SGFuZGxlcjogLT5cblxuICAgIHN0cnVjdHVyZSA9IHt9XG4gICAgc3RydWN0dXJlLmVudGl0aWVzID0gW11cblxuICAgIHN0cnVjdHVyZS5uYW1lID0gJCgnLmFkZCA+IC5uYW1lIGlucHV0JykudmFsKClcbiAgICBzdHJ1Y3R1cmUuY2xpZW50ID0gJCgnLmFkZCA+IC5jbGllbnQgc2VsZWN0JykudmFsKClcblxuICAgICQoJy5hZGQgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHknKS5lYWNoIChpLCBlbCkgLT5cblxuICAgICAgamlucHV0ID0gJChlbCkuZmluZCAnLmlucHV0ID4gaW5wdXQnXG4gICAgICBqc2VsZWN0ID0gJChlbCkuZmluZCAnLmlucHV0ID4gc2VsZWN0J1xuXG4gICAgICBzdHJ1Y3R1cmUuZW50aXRpZXMucHVzaFxuICAgICAgICBuYW1lOiBqaW5wdXQudmFsKClcbiAgICAgICAgdHlwZToganNlbGVjdC52YWwoKVxuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG5cbiAgICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMvYWRkJywgc3RydWN0dXJlXG4gICAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgY29uc29sZS5sb2cgcmVzcG9uc2VcbiAgICAgICAgICAkKCcuYWRkID4gLmVudGl0aWVzJykuZW1wdHkoKVxuICAgICAgICAgIF8ub2ZmICcuYWRkJ1xuICAgICAgICAgIE5vdGljZS5pICdTdHJ1Y3R1cmUgYWRkZWQgc3VjY2Vzc2Z1bGx5JywgJ3N1Y2Nlc3MnXG4gICAgICAgICAgU3RydWN0dXJlcy5sb2FkKClcbiAgICAgICAgICAkKCcuYWRkID4gLm5hbWUgaW5wdXQnKS52YWwoJycpXG5cblxuIiwiVXNlcnMgPVxuXG4gIHNlbGVjdENsaWVudDogZmFsc2VcblxuICBpOiAtPlxuICAgIEBsb2FkKClcbiAgICBUaW1lLmkoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgbG9hZDogLT5cbiAgICBTcGlubmVyLmkoJCgnLnVzZXJzID4gLmNvbnRlbnQnKSlcbiAgICBfLmdldCAnL2FwaS91c2VycycsXG4gICAgICB2aWV3OiB0cnVlXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgJCgnLnVzZXJzID4gLmNvbnRlbnQnKS5odG1sIHJlc3BvbnNlLnZpZXdcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgICBVc2Vycy5zZWxlY3RpemUoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy51c2VycyA+IC5jb250ZW50Jykub24gJ2NoYW5nZScsICcuZGV0YWlscyA+IC5kZXRhaWwgPiAudmFsdWUudG9nZ2xlID4gaW5wdXQ6Y2hlY2tib3gnLCBAdG9nZ2xlSGFuZGxlclxuXG4gIHRvZ2dsZUhhbmRsZXI6IC0+XG4gICAgdCA9ICQgdGhpc1xuICAgIGlmIHQuaXMoJzpjaGVja2VkJykgdGhlbiBjaGVja2VkID0gMSBlbHNlIGNoZWNrZWQgPSAwXG4gICAgVXNlcnMudXBkYXRlIHQuZGF0YSgnX2lkJyksIHQuZGF0YSgnZmllbGQnKSwgY2hlY2tlZFxuXG4gIHNlbGVjdENsaWVudEhhbmRsZXI6IChlKSAtPlxuXG4gICAgY2xpZW50X2lkID0gJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpXG4gICAgdXNlcl9pZCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhICdfaWQnXG5cbiAgICByZXR1cm4gZmFsc2UgaWYgY2xpZW50X2lkLmxlbmd0aCBpc250IDI0XG5cbiAgICBVc2Vycy51cGRhdGUgdXNlcl9pZCwgJ2NsaWVudCcsIGNsaWVudF9pZFxuXG4gIHNlbGVjdGl6ZTogLT5cbiAgICBTZWxlY3RpemUuY2xpZW50cyAkKCcudXNlciA+IC5kZXRhaWxzID4gLmRldGFpbF9jbGllbnQgPiAudmFsdWUuc2VsZWN0IHNlbGVjdCcpLEBzZWxlY3RDbGllbnRIYW5kbGVyXG5cbiAgdXBkYXRlOiAoX2lkLCBmaWVsZCwgdmFsdWUpIC0+XG5cbiAgICBwYXJhbXMgPSB7fVxuICAgIHBhcmFtc1tmaWVsZF0gPSB2YWx1ZVxuICAgIFNwaW5uZXIuaSgkKCcudXNlcnMgPiAuY29udGVudCcpKVxuXG4gICAgXy5nZXQgXCIvYXBpL3VzZXJzL3VwZGF0ZS8je19pZH1cIiwgcGFyYW1zXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pICdVc2VyIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JywgJ3N1Y2Nlc3MnXG4gICAgICAgICQoXCIudXNlci51c2VyXyN7cmVzcG9uc2UuZGF0YS51c2VyLl9pZH0gPiAuZGV0YWlscyA+IC5kZXRhaWxfdXBkYXRlZCA+IC52YWx1ZSA+IHRpbWVcIilcbiAgICAgICAgICAuYXR0ciAndGl0bGUnLCByZXNwb25zZS5kYXRhLnVzZXIudXBkYXRlZF9hdFxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
