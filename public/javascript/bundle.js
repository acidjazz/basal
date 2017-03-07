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
  range: function(start, end) {
    var j, num, ref, ref1, result;
    result = [];
    for (num = j = ref = start, ref1 = end; ref <= ref1 ? j <= ref1 : j >= ref1; num = ref <= ref1 ? ++j : --j) {
      result.push(num);
    }
    return result;
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
        _this.fail(response);
        return jget.fail(response);
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
        _this.fail(response);
        return jpost.fail(response);
      };
    })(this));
    return jpost;
  },
  fail: function(response) {
    var body, editor, error, file, pug, ref, ref1;
    error = (ref = response.responseJSON) != null ? (ref1 = ref.errors) != null ? ref1[0] : void 0 : void 0;
    if (error === void 0) {
      return Prompt.i(response.status, response.statusText);
    }
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
    ascii = "\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: https://256.io/\n:: " + config.meta.repo;
    return console.log(ascii, "color: grey; font-family: Menlo, monospace;");
  },
  detect: function() {
    if (((window.outerHeight - window.innerHeight) > 100) || ((window.outerWidth - window.innerWidth) > 100)) {
      this.llc();
      return clearInterval(this.console);
    }
  },
  methods: function(obj) {
    var i, m, res;
    res = [];
    for (i in obj) {
      m = obj[i];
      if (typeof m === 'function') {
        res.push(m);
      }
    }
    return res;
  }
};

_.i();

var Time;

Time = {
  interval: false,
  gap: 1000,
  i: function() {
    if (this.interval === false) {
      this.interval = setInterval(this.scrape, this.gaa);
    }
    return this.scrape();
  },
  scrape: function() {
    return $('time').each((function(_this) {
      return function(i, el) {
        var jel;
        jel = $(el);
        jel.html(moment(jel.attr('title')).fromNow());
        return jel.attr('aria-label', moment(jel.attr('title')).calendar());
      };
    })(this));
  }
};

var Client;

Client = {
  selectUser: false,
  _id: false,
  crop: false,
  profile: false,
  i: function() {
    var match;
    this.handlers();
    if (match = location.pathname.match(/\/clients\/([0-9a-fA-F]{24})/)) {
      this._id = match[1];
      this.load(this._id);
    }
    this.selectUser = Selectize.users($('.page.client > .input-users > input'), this.selectUserHandler, {
      me: false
    });
    return $('.page.client > .input > input').focus();
  },
  handlers: function() {
    $('.page.client > .submit').click(this.modifyHandler);
    $(document).on('dragover', this.dragover);
    $(document).on('dragleave', this.dragleave);
    $(document).on('dragenter dragover', this.cancel);
    $(document).on('drop dragdrop', this.drop);
    $('.input-image > button.cta').on('click', this.chooseFile);
    return $('.input-image > input:file').change(this.change);
  },
  cancel: function() {
    return event.preventDefault();
  },
  dragover: function() {
    return _.on('.input-image');
  },
  dragleave: function() {
    return _.off('.input-image');
  },
  drop: function(e) {
    var files;
    e.preventDefault();
    _.off('.input-image');
    if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length) {
      files = e.originalEvent.dataTransfer.files;
    }
    return Client.croppie(files[0]);
  },
  change: function() {
    var files;
    if ($(this)[0].files) {
      files = $(this)[0].files;
    }
    return Client.croppie(files[0]);
  },
  chooseFile: function() {
    return $('.input-image > input').trigger('click');
  },
  croppie: function(file) {
    var reader;
    reader = new FileReader();
    reader.onloadend = function() {
      if (Client.crop !== false) {
        Client.crop.croppie('destroy');
        Client.crop = false;
      }
      return Client.crop = $('.input-image > .croppie').croppie({
        url: reader.result,
        enforceBoundary: false,
        viewport: {
          width: 200,
          height: 200
        },
        boundary: {
          width: 300,
          height: 300
        }
      });
    };
    return reader.readAsDataURL(file);
  },
  selectUserHandler: function() {},
  modifyHandler: function() {
    if (Client.crop !== false) {
      return Client.crop.croppie('result', {
        type: 'canvas',
        format: 'jpeg'
      }).then(function(response) {
        return Client.imageUpload(Client.dataURItoBlob(response), function() {
          return Client.modify();
        });
      });
    } else {
      return Client.modify();
    }
  },
  modify: function() {
    var call, name, users;
    name = $('.page.client > .input-name > input').val();
    users = $('.page.client > .input-users > input').val().split(',');
    call = '/api/clients/add';
    if (Client._id !== false) {
      call = "/api/clients/update/" + Client._id;
    }
    Spinner.i($('.page.client'));
    return _.get(call, {
      name: name,
      users: users,
      profile: Client.profile
    }).always(function() {
      return Spinner.d();
    }).done(function(response) {
      Notice.i(response.data.status, {
        type: 'success'
      });
      if (Client._id === false) {
        window.history.pushState({}, '', "/clients/" + response.data._id);
      }
      Client._id = response.data._id;
      if (Client.profile) {
        return $('.page.client > .input-image > .picture').css('background-image', "url('" + Client.profile + "')");
      }
    });
  },
  load: function() {
    Spinner.i($('.page.client'));
    return _.get('/api/clients/', {
      _id: this._id
    }).always(function() {
      return Spinner.d();
    }).done(function(response) {
      var client, index, ref, results, user;
      if (response.data.length < 1) {
        location.href = '/clients/new';
      }
      client = response.data[0];
      $('.page.client > .input-name > input').val(client.name);
      if (client.profile) {
        $('.page.client > .input-image > .picture').css('background-image', "url('" + client.profile + "')");
        Client.profile = client.profile;
      }
      ref = client.users;
      results = [];
      for (index in ref) {
        user = ref[index];
        if (user.id !== User._id) {
          Client.selectUser[0].selectize.addOption({
            id: user.id,
            name: user.name + " (" + user.email + ")"
          });
          results.push(Client.selectUser[0].selectize.addItem(user.id));
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
  },
  dataURItoBlob: function(dataURI) {
    var byteString, i, ia, mimeString;
    byteString = void 0;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    ia = new Uint8Array(byteString.length);
    i = 0;
    while (i < byteString.length) {
      ia[i] = byteString.charCodeAt(i);
      i++;
    }
    return new Blob([ia], {
      type: mimeString
    });
  },
  imageUpload: function(blob, callback) {
    var fd;
    fd = new FormData();
    fd.append('file', blob);
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
      error: function() {
        return Notice.d();
      },
      success: function(result) {
        Notice.i('File uploaded successfully', {
          type: 'success',
          timeout: 600
        });
        Client.profile = result.data.url;
        return setTimeout(function() {
          return callback(result);
        }, 1200);
      }
    });
  }
};

var Clients;

Clients = {
  i: function() {
    return Listing.i('clients', Clients.action);
  },
  action: function(type) {
    switch (type) {
      case 'Client Invite':
        if (Listing.selected.length > 1) {
          Notice.i('Please choose a single client for an invite link', {
            type: 'warning'
          });
          return false;
        }
        return Clients.getInvite(Listing.selected[0]);
    }
  },
  getInvite: function(client) {
    Spinner.i($('.page.clients'));
    return _.get('/api/invite/add', {
      client: client
    }).always(function() {
      return Spinner.d();
    }).done(function(response) {
      console.log(response);
      return Prompt.i('Client Invite', 'Share this URL with your client to allow them to modify their own entries', ['OK'], {
        clipboard: true,
        value: window.location.origin + '/invite/' + response.data.invite.hash
      });
    });
  }
};

var config;

config = {
  "app": {
    "name": "Laravel",
    "env": "local",
    "debug": true,
    "url": "http://basal.dev:8080",
    "timezone": "UTC",
    "locale": "en",
    "fallback_locale": "en",
    "key": "base64:QYpzRq+ob5uLcUbtemS+jaTN6gbQPS6WX/pZN97bT9g=",
    "cipher": "AES-256-CBC",
    "log": "single",
    "log_level": "debug",
    "providers": ["Illuminate\\Auth\\AuthServiceProvider", "Illuminate\\Broadcasting\\BroadcastServiceProvider", "Illuminate\\Bus\\BusServiceProvider", "Illuminate\\Cache\\CacheServiceProvider", "Illuminate\\Foundation\\Providers\\ConsoleSupportServiceProvider", "Illuminate\\Cookie\\CookieServiceProvider", "Illuminate\\Database\\DatabaseServiceProvider", "Illuminate\\Encryption\\EncryptionServiceProvider", "Illuminate\\Filesystem\\FilesystemServiceProvider", "Illuminate\\Foundation\\Providers\\FoundationServiceProvider", "Illuminate\\Hashing\\HashServiceProvider", "Illuminate\\Mail\\MailServiceProvider", "Illuminate\\Notifications\\NotificationServiceProvider", "Illuminate\\Pagination\\PaginationServiceProvider", "Illuminate\\Pipeline\\PipelineServiceProvider", "Illuminate\\Queue\\QueueServiceProvider", "Illuminate\\Redis\\RedisServiceProvider", "Illuminate\\Auth\\Passwords\\PasswordResetServiceProvider", "Illuminate\\Session\\SessionServiceProvider", "Illuminate\\Translation\\TranslationServiceProvider", "Illuminate\\Validation\\ValidationServiceProvider", "Illuminate\\View\\ViewServiceProvider", "Laravel\\Tinker\\TinkerServiceProvider", "Jenssegers\\Mongodb\\MongodbServiceProvider", "Larjectus\\ServiceProvider", "Larpug\\ServiceProvider", "Barryvdh\\Debugbar\\ServiceProvider", "App\\Providers\\AppServiceProvider", "App\\Providers\\AuthServiceProvider", "App\\Providers\\EventServiceProvider", "App\\Providers\\RouteServiceProvider"],
    "aliases": {
      "App": "Illuminate\\Support\\Facades\\App",
      "Artisan": "Illuminate\\Support\\Facades\\Artisan",
      "Auth": "Illuminate\\Support\\Facades\\Auth",
      "Blade": "Illuminate\\Support\\Facades\\Blade",
      "Broadcast": "Illuminate\\Support\\Facades\\Broadcast",
      "Bus": "Illuminate\\Support\\Facades\\Bus",
      "Cache": "Illuminate\\Support\\Facades\\Cache",
      "Config": "Illuminate\\Support\\Facades\\Config",
      "Cookie": "Illuminate\\Support\\Facades\\Cookie",
      "Crypt": "Illuminate\\Support\\Facades\\Crypt",
      "DB": "Illuminate\\Support\\Facades\\DB",
      "Debugbar": "Barryvdh\\Debugbar\\Facade",
      "Eloquent": "Illuminate\\Database\\Eloquent\\Model",
      "Moloquent": "Jenssegers\\Mongodb\\Eloquent\\Model",
      "Event": "Illuminate\\Support\\Facades\\Event",
      "File": "Illuminate\\Support\\Facades\\File",
      "Gate": "Illuminate\\Support\\Facades\\Gate",
      "Hash": "Illuminate\\Support\\Facades\\Hash",
      "Lang": "Illuminate\\Support\\Facades\\Lang",
      "Log": "Illuminate\\Support\\Facades\\Log",
      "Mail": "Illuminate\\Support\\Facades\\Mail",
      "Notification": "Illuminate\\Support\\Facades\\Notification",
      "Password": "Illuminate\\Support\\Facades\\Password",
      "Queue": "Illuminate\\Support\\Facades\\Queue",
      "Redirect": "Illuminate\\Support\\Facades\\Redirect",
      "Redis": "Illuminate\\Support\\Facades\\Redis",
      "Request": "Illuminate\\Support\\Facades\\Request",
      "Response": "Illuminate\\Support\\Facades\\Response",
      "Route": "Illuminate\\Support\\Facades\\Route",
      "Schema": "Illuminate\\Support\\Facades\\Schema",
      "Session": "Illuminate\\Support\\Facades\\Session",
      "Storage": "Illuminate\\Support\\Facades\\Storage",
      "URL": "Illuminate\\Support\\Facades\\URL",
      "Validator": "Illuminate\\Support\\Facades\\Validator",
      "View": "Illuminate\\Support\\Facades\\View"
    }
  },
  "cache": {
    "default": "file",
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
        "path": "/Users/k/basal/storage/framework/cache/data"
      },
      "memcached": {
        "driver": "memcached",
        "persistent_id": null,
        "sasl": [null, null],
        "options": [],
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
  "debugbar": {
    "enabled": false,
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
  "mail": {
    "driver": "smtp",
    "host": "smtp.mailgun.org",
    "port": 587,
    "from": {
      "address": "hello@example.com",
      "name": "Example"
    },
    "encryption": "tls",
    "username": null,
    "password": null,
    "sendmail": "/usr/sbin/sendmail -bs",
    "markdown": {
      "theme": "default",
      "paths": ["/Users/k/basal/resources/views/vendor/mail"]
    }
  },
  "queue": {
    "default": "sync",
    "connections": {
      "sync": {
        "driver": "sync"
      },
      "database": {
        "driver": "database",
        "table": "jobs",
        "queue": "default",
        "retry_after": 90
      },
      "beanstalkd": {
        "driver": "beanstalkd",
        "host": "localhost",
        "queue": "default",
        "retry_after": 90
      },
      "sqs": {
        "driver": "sqs",
        "key": "your-public-key",
        "secret": "your-secret-key",
        "prefix": "https://sqs.us-east-1.amazonaws.com/your-account-id",
        "queue": "your-queue-name",
        "region": "us-east-1"
      },
      "redis": {
        "driver": "redis",
        "connection": "default",
        "queue": "default",
        "retry_after": 90
      }
    },
    "failed": {
      "database": "mongodb",
      "table": "failed_jobs"
    }
  },
  "services": {
    "mailgun": {
      "domain": null,
      "secret": null
    },
    "ses": {
      "key": null,
      "secret": null,
      "region": "us-east-1"
    },
    "sparkpost": {
      "secret": null
    },
    "stripe": {
      "model": "App\\User",
      "key": null,
      "secret": null
    }
  },
  "session": {
    "driver": "file",
    "lifetime": 120,
    "expire_on_close": false,
    "encrypt": false,
    "files": "/Users/k/basal/storage/framework/sessions",
    "connection": null,
    "table": "sessions",
    "store": null,
    "lottery": [2, 100],
    "cookie": "laravel_session",
    "path": "/",
    "domain": null,
    "secure": false,
    "http_only": true
  },
  "view": {
    "paths": ["/Users/k/basal/resources/views"],
    "compiled": "/Users/k/basal/storage/framework/views"
  },
  "color": {
    "white1": "#ffffff",
    "white2": "#f8f8f8",
    "white3": "#F4F4F4",
    "white4": "#FAFAFA",
    "grey1": "#e5e5e5",
    "grey2": "#f5f5f5",
    "grey3": "#d0d0d0",
    "black1": "#000000",
    "black2": "#282828",
    "black3": "#333333",
    "black4": "#23292E",
    "black5": "#3E4347",
    "black6": "#494E52",
    "red1": "#C8212B",
    "yellow1": "#F6BB45",
    "cyan1": "#5FA793",
    "orange1": "#F68F62",
    "skin1": "#F3DDA3",
    "green1": "#5ba541",
    "green2": "#88d96d",
    "green3": "#77d358",
    "blue1": "#1da7ee",
    "blue2": "#0073bb",
    "blue3": "#4F5D95",
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
    "404": {
      "font-family": "Monoton",
      "font-size": "75px"
    },
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
    "c1b": {
      "font-family": "Roboto",
      "font-size": "16px",
      "font-weight": "500"
    },
    "c1tb": {
      "font-family": "Roboto",
      "font-size": "14px",
      "font-weight": "400"
    },
    "c1s": {
      "font-family": "Roboto",
      "font-size": "12px",
      "font-weight": "300",
      "letter-spacing": "0.5px"
    },
    "c1sb": {
      "font-family": "Roboto",
      "font-size": "12px",
      "font-weight": "600",
      "letter-spacing": "0.5px"
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
    }
  },
  "meta": {
    "title": "basal",
    "url": "https://basal.tech/",
    "description": "minimal content management",
    "keywords": "cms",
    "repo": "https://github.com/acidjazz/basal"
  },
  "settings": {
    "perpage": 10
  }
};

var Dashboard;

Dashboard = {
  i: function() {
    if (window.User !== void 0) {
      return this.load();
    }
  },
  load: function(complete) {
    _.off('.page.home');
    _.on('.page.dashboard');
    Spinner.i($('.page.dashboard > .collections'));
    return _.get('/api/clients', {
      view: 'dashboard'
    }).always(function() {
      return Spinner.d();
    }).done(function(response) {
      Time.i();
      return $('.collections').html(response.view);
    });
  }
};

var Entities;

Entities = {
  blogs: [],
  crops: {},
  images: {},
  placeholders: ["That's what I'm blogging about", "Have you guys been blogging?", "Hold all my calls, I'm blogging", "Tell Donnie I'm blogging and I'll call him back", "I gotta run, you should be blogging", "I want you on the phone, but I also want you blogging"],
  Blog: function(el, name, value) {
    var editor;
    if (value == null) {
      value = false;
    }
    editor = el.find('.blog').summernote({
      placeholder: this.placeholders[Math.floor(Math.random() * this.placeholders.length)],
      callbacks: {
        onImageUpload: function(files) {
          return Entities.imageUpload(files, this);
        }
      }
    });
    if (value !== false) {
      el.find('.blog').summernote('code', value);
    }
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
      error: function() {
        return Notice.d();
      },
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
  },
  Date: function(el, name, value) {
    return el.find('input').flatpickr({
      dateFormat: 'm/d/Y'
    });
  },
  DateTime: function(el, name, value) {
    return el.find('input').flatpickr({
      dateFormat: 'm/d/Y h:i K',
      enableTime: true
    });
  },
  DateRange: function(el, name, value) {
    return el.find('input').flatpickr({
      dateFormat: 'm/d/Y',
      mode: 'range'
    });
  },
  DateTimeRange: function(el, name, value) {
    return el.find('input').flatpickr({
      dateFormat: 'm/d/Y h:i K',
      enableTime: true,
      mode: 'range'
    });
  },
  Image: function(el, name, value) {
    this.imageHandlers(el);
    if (value !== void 0) {
      Entities.cropper(value, el);
      return Entities.images[name] = value;
    }
  },
  imageHandlers: function(el, name) {
    el.on('dragover', this.imageHandler.dragover);
    el.on('dragleave', this.imageHandler.dragleave);
    el.on('dragenter dragover', this.imageHandler.cancel);
    el.on('drop dragdrop', this.imageHandler.drop);
    el.find('.input-image > button.cta.select').on('click', this.imageHandler.chooseFile);
    el.find('.input-image > button.cta.save').on('click', this.imageHandler.save);
    return el.find('.input-image > input:file').on('change', this.imageHandler.change);
  },
  imageHandler: {
    dragover: function() {
      return _.on($(this).find('.input-image'));
    },
    dragleave: function() {
      return _.off($(this).find('.input-image'));
    },
    cancel: function() {
      return event.preventDefault();
    },
    drop: function(e) {
      var files;
      e.preventDefault();
      _.off($(this).find('.input-image'));
      if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length) {
        files = e.originalEvent.dataTransfer.files;
      }
      return Entities.loadCropper(files[0], $(this));
    },
    chooseFile: function() {
      return $(this).parent().find('input').trigger('click');
    },
    change: function() {
      var files;
      if ($(this)[0].files) {
        files = $(this)[0].files;
        return Entities.loadCropper(files[0], $(this).parent().parent());
      }
    },
    save: function() {
      var index, name;
      name = $(this).parent().parent().data('name');
      index = $(this).parent().parent().data('index');
      Spinner.i($(".entity_index_" + index));
      return Entities.crops[name].getCroppedCanvas().toBlob(function(blob) {
        return Client.imageUpload(blob, function(result) {
          Spinner.d();
          return Entities.images[name] = result.data.url;
        });
      }, 'image/jpeg');
    }
  },
  loadCropper: function(file, el) {
    var reader;
    reader = new FileReader();
    reader.onloadend = function() {
      return Entities.cropper(reader.result, el);
    };
    return reader.readAsDataURL(file);
  },
  cropper: function(url, el) {
    var index, name;
    name = el.data('name');
    index = el.data('index');
    console.log(name, index);
    if (Entities.crops[name] !== void 0) {
      Entities.crops[name].destroy();
      Entities.crops[name] = false;
    }
    el.find('.cropper').attr('src', url);
    Entities.crops[name] = new Cropper(el.find('.cropper')[0], {
      minContainerHeight: 300,
      minCanvasHeight: 300,
      responsive: true,
      preview: "div.entity_index_" + index + " > div.input-image > div.picture",
      autoCropArea: 1,
      strict: false,
      highlight: true
    });
    return _.on(el.find('.save'));
  }
};

var Entries;

Entries = {
  i: function() {
    if ((typeof User !== "undefined" && User !== null ? User.client : void 0) !== void 0) {
      return Listing.i('entries', false, ['structure']);
    } else {
      return Listing.i('entries', false, ['client', 'structure']);
    }
  }
};

var Entry;

Entry = {
  selectStructure: {},
  _id: false,
  structure: false,
  selectedStructure: false,
  entry: false,
  i: function() {
    var match;
    if (match = location.hash.match(/#structure=([0-9a-fA-F]{24})/)) {
      Entry.selectedStructure = match[1];
    }
    this.selectize();
    this.handlers();
    if (match = location.pathname.match(/\/entries\/([0-9a-fA-F]{24})/)) {
      this._id = match[1];
      return this.load(this._id);
    } else {
      return Entry.selectStructure[0].selectize.focus();
    }
  },
  structureSpecified: function() {
    if (Entry.selectedStructure !== false) {
      return Entry.selectStructure[0].selectize.setValue(Entry.selectedStructure);
    }
  },
  selectize: function() {
    return this.selectStructure = Selectize.structures($('.modify > .structure > select'), Entry.structureSelectHandler);
  },
  handlers: function() {
    $('.page.entry > .modify > .submit').click(this.submit);
    $('.page.entry > .modify > .another').click(this.another);
    $('.page.entry > .modify > .cancel').click(this.cancel);
    return $('.focusme').focus(function() {
      return $('.note-editable').focus();
    });
  },
  load: function(_id) {
    Spinner.i($('.page.entry'));
    return _.get('/api/entries/', {
      _id: _id
    }).always(function() {
      return Spinner.d();
    }).done(function(response) {
      var entry;
      entry = response.data[0];
      Entry.entry = entry;
      Entry.selectStructure[0].selectize.addOption({
        id: entry.structure.id,
        name: entry.structure.name,
        clientProfile: entry.client.profile
      });
      Entry.selectStructure[0].selectize.setValue(entry.structure.id);
      return Entry.selectStructure[0].selectize.disable();
    });
  },
  submit: function() {
    var entities, name;
    name = $('.page.entry > .modify > .name > .input > input').val();
    entities = {};
    return $('.page.entry > .modify > .body > .entity').each(function(i, el) {
      var blog, entity_name, type, value;
      entity_name = $(el).find('.label').html();
      type = $(el).data('type');
      switch (type) {
        case 'Text':
        case 'Link':
        case 'Date':
        case 'Time':
        case 'DateTime':
        case 'DateRange':
        case 'DateTimeRange':
          value = $(el).find('input').val();
          break;
        case 'Tags':
          value = $(el).find('input').val().split(',');
          break;
        case 'Blog':
          blog = Entities.blogGetCode(entity_name);
          value = blog;
          break;
        case 'Image':
          value = Entities.images[entity_name];
      }
      return entities[entity_name] = {
        name: entity_name,
        type: type,
        value: value
      };
    }).promise().done(function() {
      var call;
      Spinner.i($('.page.entry > .modify'));
      call = '/api/entries/add';
      if (Entry._id !== false) {
        call = "/api/entries/update/" + Entry._id;
      }
      return _.get(call, {
        name: name,
        structure: Entry.structure,
        entities: entities
      }).always(function() {
        return Spinner.d();
      }).done(function(response) {
        Notice.i(response.data.status, {
          type: 'success'
        });
        if (Entry._id === false) {
          window.history.pushState({}, '', "/entries/" + response.data._id);
        }
        Entry._id = response.data._id;
        return _.on('.page.entry > .modify > .another');
      });
    });
  },
  another: function() {
    return location.href = "/entries/new#structure=" + Entry.structure;
  },
  cancel: function() {
    if (document.referrer.indexOf(window.location.host) === -1) {
      return location.href = "/entries";
    } else {
      return window.history.back();
    }
  },
  structureSelectHandler: function(e) {
    var structure_id;
    structure_id = $(e.currentTarget).val();
    if (structure_id.length !== 24) {
      return false;
    }
    return Entry.loadStructure(structure_id);
  },
  loadStructure: function(_id) {
    Spinner.i($('.page.entry > .modify'));
    return _.get('/api/structures', {
      _id: _id
    }).always(function() {
      return Spinner.d();
    }).done((function(_this) {
      return function(response) {
        Entry.structure = _id;
        return _this.loadEntities(response.data[0].entities);
      };
    })(this));
  },
  loadEntities: function(entities, name) {
    var body, entity, entityEl, html, i, index, ref, ref1, tabindex, value;
    if (name == null) {
      name = false;
    }
    _.on('.page.entry > .modify > .name');
    if (Entry.entry.name !== false) {
      $('.page.entry > .modify > .name > .input > input').val(Entry.entry.name);
    }
    body = $('.page.entry > .modify > .body');
    body.html('');
    tabindex = 3;
    index = 0;
    for (i in entities) {
      entity = entities[i];
      html = $(".page.entry > #template > .entity_" + entity.type).clone();
      html.addClass("entity_index_" + (++index));
      html.data("index", index);
      html.data("name", entity.name);
      if ((ref = Entry.entry.entities) != null ? (ref1 = ref[i]) != null ? ref1.value : void 0 : void 0) {
        value = Entry.entry.entities[i].value;
        switch (entity.type) {
          case 'Tags':
          case 'Text':
          case 'Link':
          case 'Date':
          case 'Time':
          case 'DateTime':
          case 'DateRange':
          case 'DateTimeRange':
            html.find('input').val(value);
        }
      }
      html.find('input,select,textarea').attr('tabindex', tabindex++);
      body.append(html);
      entityEl = $(".page.entry > .modify > .body .entity_index_" + index);
      entityEl.find('.label').html(entity.name);
      if (Entities[entity.type] !== void 0) {
        Entities[entity.type](entityEl, entity.name, value);
      }
    }
    $('[tabindex=2]').focus();
    _.on('.page.entry > .modify > .submit');
    $('.page.entry > .modify > .submit').attr('tabindex', tabindex++);
    return $('.page.entry > .modify > .another').attr('tabindex', tabindex);
  }
};

var Filter;

Filter = {
  filter: false,
  endpoint: false,
  filters: [],
  i: function(filters) {
    var filter, i, j, len, len1, ref, ref1;
    this.filters = filters;
    ref = this.filters;
    for (i = 0, len = ref.length; i < len; i++) {
      filter = ref[i];
      _.on(".filter_" + filter);
    }
    ref1 = this.filters;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      filter = ref1[j];
      if (Query.param(filter) !== void 0) {
        Filter.selected(filter);
      }
    }
    $(".listing").on('click', '.list-header > .filters > .filter', this.handlers.filterHandler);
    return $(".listing").on('click', '.list-header > .filters > .filter > .option_selected > .icon.cancel', this.handlers.filterClearHandler);
  },
  d: function() {
    _.off(".selection.selection_" + Filter.filter);
    $('.selection > .inner > .search > input').val('');
    Filter.handlers.d();
    return Listing.unselectAll();
  },
  get: function(search) {
    var filter, index, options, ref;
    if (search == null) {
      search = null;
    }
    Spinner.i($(".selection.selection_" + Filter.filter + " > .inner > .values"));
    options = {
      view: 'filters'
    };
    if (Listing.deleted === true) {
      options.deleted = true;
    }
    ref = Filter.filters;
    for (index in ref) {
      filter = ref[index];
      if (filter !== Filter.filter && Query.param(filter) !== void 0) {
        options[filter + '.name'] = Query.param(filter);
      }
    }
    if (search !== null) {
      options.name = search;
    }
    return _.get("/api/" + this.endpoint, options).done(function(response) {
      $('.selection > .inner > .values').html(response.view);
      return Spinner.d();
    });
  },
  select: function(option) {
    Query.param('page', false);
    Query.param(Filter.filter, option);
    Filter.selected(Filter.filter);
    Filter.d();
    return Listing.load();
  },
  selected: function(filter) {
    if (Query.param(filter) === void 0) {
      $(".filter_" + filter + " > .option_selected > .copy").html('');
      _.on(".filter_" + filter + " > .option_default");
      _.off(".filter_" + filter + " > .option_selected");
      return true;
    }
    $(".filter_" + filter + " > .option_selected > .copy").html(Query.param(filter));
    _.off(".filter_" + filter + " > .option_default");
    return _.on(".filter_" + filter + " > .option_selected");
  },
  handlers: {
    i: function() {
      $('.selection').on('click', '.inner > .label > .icon.cancel', Filter.d);
      $('.selection').on('keyup', ' .inner > .search > input', this.keyHandler);
      $('.selection').on('click', '.inner > .values > .value', this.selectHandler);
      $('.selection').on('mouseover', '.inner > .values > .value', this.hoverHandler);
      $('.selection').on('blur', Filter.d);
      $('.selection').on('click', this.insideCheck);
      return $(document).on('click', this.outsideCheck);
    },
    d: function() {
      $('.selection').off('click', '.inner > .label > .icon.cancel', Filter.d);
      $('.selection').off('keyup', ' .inner > .search > input', this.keyHandler);
      $('.selection').off('click', '.inner > .values > .value', this.selectHandler);
      $('.selection').off('mouseover', '.inner > .values > .value', this.hoverHandler);
      $('.selection').off('blur', Filter.d);
      $('.selection').off('click', this.insideCheck);
      return $(document).off('click', this.outsideCheck);
    },
    filterClearHandler: function() {
      console.log('about to clear');
      Filter.filter = $(this).data('filter');
      Filter.select(false);
      Filter.d();
      return false;
    },
    filterHandler: function() {
      Filter.d();
      event.stopPropagation();
      Filter.filter = $(this).data('filter');
      Filter.endpoint = $(this).data('endpoint');
      if ($(".selection.selection_" + Filter.filter).hasClass('on')) {
        Filter.d();
        return false;
      }
      Filter.handlers.i();
      $(".selection.selection_" + Filter.filter + " > .inner > .values").html('');
      _.on(".selection.selection_" + Filter.filter);
      $(".selection.selection_" + Filter.filter + " > .inner > .search > input").focus();
      return Filter.get();
    },
    insideCheck: function() {
      return event.stopPropagation();
    },
    outsideCheck: function() {
      return Filter.d();
    },
    hoverHandler: function() {
      _.off('.selection > .inner > .values > .value.on');
      return _.on($(this));
    },
    selectHandler: function() {
      return Filter.select($(this).find('.name').html());
    },
    keyHandler: function() {
      var key;
      key = event.keyCode;
      switch (key) {
        case 27:
          Filter.d();
          break;
        case 40:
        case 39:
          Filter.nav('down');
          break;
        case 37:
        case 38:
          Filter.nav('up');
          break;
        case 13:
          Filter.select($('.selection > .inner > .values > .value.on > .name').html());
          break;
        default:
          Filter.get($(this).val());
      }
      return true;
    }
  },
  nav: function(dir) {
    var cur, next;
    cur = $('.selection > .inner > .values > .value.on');
    if (dir === 'down') {
      next = cur.next();
    }
    if (dir === 'up') {
      next = cur.prev();
    }
    _.off(cur);
    if (next.length !== 0) {
      _.on(next);
      return;
    }
    if (dir === 'down') {
      _.on('.selection > .inner > .values > .value:first-child');
    }
    if (dir === 'up') {
      return _.on('.selection > .inner > .values > .value:last-child');
    }
  }
};

var Global;

Global = {
  window: false,
  windowTimer: false,
  init: false,
  "protected": ['entries', 'structures', 'clients', 'users'],
  i: function() {
    Global.handlers();
    Global.loginCheck();
    if (typeof Page !== "undefined" && Page !== null) {
      return $(".menu > .option_" + Page).addClass('active');
    }
  },
  handlers: function() {
    $('header > .inner > .me > .profile').click(Global.userProfileHandler);
    $('.oauths > .oauth').click(Global.userOauthHandler);
    $('header > .inner > .me > .picture > .logout').click(Global.logoutHandler);
    return $('.menu > .option').click(Global.menuHandler);
  },
  menuHandler: function() {
    $('.menu > .option').removeClass('active');
    $(this).addClass('active');
    return Spinner.i($('header'));
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
        Notice.i('Logout successful', {
          type: 'success'
        });
        Spinner.d();
        return setTimeout(function() {
          return location.href = '/';
        }, 1200);
      });
    });
  },
  userProfileHandler: function() {
    var oa, tl;
    oa = $('header > .inner > .me > .oauths');
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
    var params, type;
    type = $(this).data('type');
    if (type === 'cancel') {
      return true;
    }
    Global.oauthWindow('/loading');
    Spinner.i($('header'));
    params = {};
    if (Invite.hash) {
      params.invite = Invite.hash;
    }
    return Me.oauth(type, params, function(uri) {
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
    Global.windowTimer = setInterval(function() {
      if (Global.window.closed) {
        clearInterval(Global.windowTimer);
        Spinner.d();
        return console.log('closing our shite');
      }
    }, 50);
  },
  oauthComplete: function(user) {
    Spinner.d();
    Global.login(user);
    Notice.i('Login successful', {
      type: 'success'
    });
    if (User.client !== void 0) {
      setTimeout(function() {
        return location.href = '/entries';
      });
      return 2000;
    } else {
      setTimeout(function() {
        return location.href = '/';
      });
      return 2000;
    }
  },
  login: function(user) {
    window.User = user;
    $('header > .inner > .me > .picture > .image').css('background-image', "url(" + User.picture + ")");
    _.off('.me > .profile');
    _.off('.me > .oauths');
    _.on('.me > .picture');
    if (User.client !== void 0) {
      $('header > .inner > .client > .name').html(User.client.name);
      $('header > .inner > .client > .picture').css('background-image', "url(" + User.client.profile + ")");
      _.on('header > .inner > .client');
      _.off('header > .inner > .logo');
      _.off('header > .inner > .name');
      _.off('header > .inner > .menu > .option_clients');
      _.off('header > .inner > .menu > .option_structures');
      return _.on('header > .inner > .menu');
    }
  },
  loginCheck: function() {
    return Me.authed(function(result) {
      if (result !== false) {
        Global.login(result);
      }
      if (Global["protected"].indexOf(location.pathname.replace(/\//g, '')) !== -1 && result === false) {
        location.href = '/';
      }
      if (Global.init !== false && (result !== false || Global.init === 'Invite')) {
        window[Global.init].i();
      }
      if (window.User === void 0) {
        _.on('header > .inner > .me > .profile');
        _.on('.page.home');
        _.on('header > .inner > .logo');
        _.on('header > .inner > .name');
      }
      if ((typeof User !== "undefined" && User !== null ? User.client : void 0) !== void 0 && Page !== 'entries') {
        location.href = '/entries';
      }
      if (window.User !== void 0 && User.client === void 0) {
        _.on('header > .inner > .logo');
        _.on('header > .inner > .name');
        return _.on('.menu');
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

var Invite;

Invite = {
  hash: false,
  i: function() {
    var match;
    Spinner.i($('.page.invite'));
    if ((typeof User !== "undefined" && User !== null) !== false) {
      Spinner.d();
      return Prompt.i('Invite Erorr', 'You are currently logged in', ['OK'], {}, function() {
        return location.href = '/';
      });
    } else {
      if (match = location.pathname.match(/\/invite\/([0-9a-fA-F]{8})/)) {
        this.hash = match[1];
        return this.load(this.hash);
      } else {

      }
    }
  },
  load: function(hash) {
    return _.get('/api/invite/get', {
      hash: hash
    }).always(function() {
      return Spinner.d();
    }).done(function(result) {
      var invite;
      invite = result.data.invite;
      $('.page.invite > .profile').css('background-image', "url(" + invite.client.profile + ")");
      return $('.page.invite > .title').html(invite.client.name);
    });
  }
};

var Listing;

Listing = {
  content: false,
  selected: [],
  filters: [],
  selectedCursor: 0,
  deleted: false,
  otherActions: false,
  i: function(content, otherActions, filters) {
    if (otherActions == null) {
      otherActions = false;
    }
    if (filters == null) {
      filters = [];
    }
    this.filters = filters;
    this.content = content;
    this.otherActions = otherActions;
    if (document.location.pathname.indexOf('deleted') !== -1) {
      _.on(".page." + this.content + " > .active.deleted");
      this.deleted = true;
      _.off('.state_actions > .actions > .action.delete');
      _.on('.state_actions > .actions > .action.restore');
      _.on('.state_actions > .actions > .action.force');
      _.off(".state_actions > .actions > .action_" + Listing.content);
    } else {
      _.on($(".page." + this.content + " > .deleted").not('.active'));
      _.on(".state_actions > .actions > .action_" + Listing.content);
    }
    Search.i();
    this.load();
    this.handlers();
    if (this.filters.length > 0) {
      return Filter.i(this.filters);
    }
  },
  handlers: function() {
    $(".listing." + this.content).on('click', '.checkbox', this.checkboxHandler);
    $(".listing." + this.content).on('click', '.switch', this.switchHandler);
    $(".listing." + this.content).on('change', '.list-header > .checkbox > input', this.selectAllHandler);
    $(".listing." + this.content).on('change', '.checkbox > input', this.stateHandler);
    $(".listing." + this.content).on('click', '.list-header > .state_actions > .actions > .action', this.actionHandler);
    return $(".listing." + this.content).on('click', '> .inner > .paginate > .inner > .num', this.pageHandler);
  },
  checkboxHandler: function() {
    var cb;
    cb = $(this).find('input');
    if (event.target.type !== 'checkbox') {
      cb[0].checked = !cb[0].checked;
      return cb.change();
    }
  },
  switchHandler: function() {
    var _id, el, name, value;
    el = $(this);
    _id = el.data('_id');
    name = el.data('name');
    value = !el.hasClass('on');
    return Listing.toggle([_id], name, value, function() {
      return _.swap(el);
    });
  },
  toggle: function(ids, name, value, complete) {
    return ids.forEach(function(_id, index) {
      var options;
      options = {};
      options[name] = value;
      return _.get("/api/" + Listing.content + "/update/" + _id, options).done(function(resposne) {
        if (index === ids.length - 1) {
          Notice.i("Updated successfully", {
            type: 'success'
          });
          return typeof complete === "function" ? complete() : void 0;
        }
      });
    });
  },
  selectAllHandler: function() {
    if (this.checked) {
      return $('.listing > .inner > .items > .item > .checkbox > input').prop('checked', true);
    } else {
      return $('.listing > .inner > .items > .item > .checkbox > input').prop('checked', false);
    }
  },
  unselectAll: function() {
    $(".listing." + Listing.content + " > .inner > .items > .item > .checkbox > input").prop('checked', false);
    $(".listing." + Listing.content + " > .list-header > .checkbox > input").prop('checked', false);
    return Listing.stateHandler();
  },
  stateHandler: function() {
    var ids;
    ids = [];
    return $('.items > .item > .checkbox > input').each(function(i, el) {
      if (el.checked) {
        return ids.push($(el).data('_id'));
      }
    }).promise().done(function() {
      if (ids.length > 0) {
        $('.listing > .list-header > .state_actions > .copy > .value').text(ids.length);
        _.off('.listing > .list-header > .state_stats');
        _.on('.listing > .list-header > .state_actions');
      } else {
        _.on('.listing > .list-header > .state_stats');
        _.off('.listing > .list-header > .state_actions');
      }
      return Listing.selected = ids;
    });
  },
  pageLinks: function() {
    var params;
    params = Query.params();
    return $('.paginate > .inner > .num').each(function(i, el) {
      var page, query;
      page = $(el).data('page');
      if (page === void 0) {
        return;
      }
      params.page = page;
      query = Query.stringify(params);
      return $(el).attr('href', "?" + (Query.stringify(params)));
    });
  },
  pageHandler: function() {
    var page;
    page = $(this).data('page');
    if (page === void 0) {
      return true;
    }
    Listing.unselectAll();
    Query.param('page', page);
    Listing.load();
    return false;
  },
  actionHandler: function() {
    var type, value;
    type = $(this).data('type');
    switch (type) {
      case 'delete':
        return Prompt.i("Deleting " + Listing.selected.length + " item(s)", 'Are you sure you want to delete these?', ['Yes', 'No'], function(response) {
          if (response !== 'Yes') {
            return true;
          }
          return Listing.deleteSelected();
        });
      case 'restore':
        return Prompt.i("Restoring " + Listing.selected.length + " item(s)", 'Are you sure you want to restore these?', ['Yes', 'No'], function(response) {
          if (response !== 'Yes') {
            return true;
          }
          return Listing.deleteSelected(0, 'restore');
        });
      case 'force':
        return Prompt.i("Deleting " + Listing.selected.length + " item(s)", 'Are you sure you want to PERMANENTLY delete these?', ['Yes', 'No'], function(response) {
          if (response !== 'Yes') {
            return true;
          }
          return Listing.deleteSelected(0, 'force');
        });
      case 'publish':
      case 'hide':
        value = type === 'publish';
        Spinner.i($(".listing." + Listing.content));
        return Listing.toggle(Listing.selected, 'active', value, function() {
          $('.switch.active').each(function(i, el) {
            var _id, j, len, ref, results;
            ref = Listing.selected;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              _id = ref[j];
              if (_id === $(el).data('_id') && value === true) {
                _.on($(el));
              }
              if (_id === $(el).data('_id') && value === false) {
                results.push(_.off($(el)));
              } else {
                results.push(void 0);
              }
            }
            return results;
          });
          if (value) {
            Notice.i(Listing.selected.length + " Entries published", {
              type: 'success'
            });
          } else {
            Notice.i(Listing.selected.length + " Entries hidden", {
              type: 'success'
            });
          }
          return Spinner.d();
        });
      default:
        return Listing.otherActions(type);
    }
  },
  "delete": function(id, type, callback) {
    if (type == null) {
      type = 'delete';
    }
    Spinner.i($(".listing." + Listing.content));
    return _.get("/api/" + Listing.content + "/" + type + "/" + id).always(function() {
      return Spinner.d();
    }).done(function(response) {
      return callback(true);
    }).fail(function() {
      return callback(false);
    });
  },
  deleteSelected: function(cursor, type) {
    if (cursor == null) {
      cursor = 0;
    }
    if (type == null) {
      type = 'delete';
    }
    if (Listing.selected.length === cursor) {
      if (type === 'delete') {
        Notice.i('Deleted successfully', {
          type: 'success'
        });
      }
      if (type === 'restore') {
        Notice.i('Restored successfully', {
          type: 'success'
        });
      }
      if (type === 'force') {
        Notice.i('Permanently deleted successfully', {
          type: 'success'
        });
      }
      Listing.unselectAll();
      this.load();
      return true;
    }
    return Listing["delete"](Listing.selected[cursor], type, function(result) {
      if (result === true) {
        return Listing.deleteSelected(++cursor, type);
      }
    });
  },
  load: function() {
    var filter, j, len, options, ref;
    Spinner.i($(".listing." + Listing.content));
    options = {
      view: true
    };
    if (Listing.deleted === true) {
      options.deleted = true;
    }
    ref = this.filters;
    for (j = 0, len = ref.length; j < len; j++) {
      filter = ref[j];
      if (Query.param(filter) !== void 0) {
        options[filter + '.name'] = Query.param(filter);
      }
    }
    if (Query.param('page') !== void 0) {
      options.page = Query.param('page');
    }
    if (Query.param('search') !== void 0) {
      options.search = Query.param('search');
    }
    return _.get("/api/" + this.content, options).done((function(_this) {
      return function(response) {
        Time.i();
        Spinner.d();
        $('.listing > .list-header > .state_stats > .copy > .value').text(response.paginate.total);
        $("." + _this.content + " > .content > .listing > .inner").html(response.view);
        return Listing.pageLinks();
      };
    })(this));
  }
};



var Me;

Me = {
  logout: function(complete) {
    return _.get('/api/auth/logout').done(function(response) {
      return complete();
    });
  },
  oauth: function(type, params, complete) {
    if (params == null) {
      params = {};
    }
    return _.get("/api/auth/" + type, params).done(function(response) {
      return complete(response.data.uri);
    });
  },
  authed: function(result) {
    return _.get('/api/auth').done(function(response) {
      return result(response.data.user);
    });
  },
  get: {
    clientId: function() {
      return User.client.id;
    }
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
    var i, input, j, len, o, option;
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
    Prompt.el.find('.title').html(title).attr('title', title);
    Prompt.el.find('.copy').html(copy);
    if (typeof params === 'object' && 'textarea' in params && params.textarea === true) {
      _.on(Prompt.el.find('.textarea'));
      Prompt.el.find('.textarea > textarea').val(params.value);
    }
    if (typeof params === 'object' && 'clipboard' in params && params.clipboard === true) {
      input = Prompt.el.find('.input');
      _.on(input);
      input.find('input').val(params.value);
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
    Prompt.el.find('.inner > .cancel').on('click', Prompt.cancel);
    return Prompt.el.find('.clipboard').on('click', Prompt.clipboard);
  },
  clipboard: function() {
    Prompt.el.find('.input > input').select();
    if (document.execCommand('copy')) {
      return Notice.i('Copied to clipboard', {
        type: 'success'
      });
    } else {
      return Notice.i('Unable to clipboard', {
        type: 'warning'
      });
    }
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
      offing: false,
      offtime: 0.2
    });
    _.off('.bfade');
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

var Query;

Query = {
  getQuery: function() {
    return location.search.slice(1);
  },
  setQuery: function(params) {
    var query;
    query = qs.stringify(params);
    if (query === void 0 || query === '') {
      history.pushState(null, null, location.pathname);
      return true;
    }
    return history.pushState(null, null, location.pathname + '?' + query);
  },
  param: function(key, value) {
    var params, query;
    query = this.getQuery();
    params = qs.parse(query);
    if (value === void 0) {
      return params[key];
    }
    if (value === false) {
      delete params[key];
    } else {
      params[key] = value;
    }
    return this.setQuery(params);
  },
  params: function() {
    return qs.parse(this.getQuery());
  },
  stringify: function(params) {
    return qs.stringify(params);
  }
};

var Search;

Search = {
  i: function() {
    if (Query.param('search') !== void 0) {
      $('.list-header > .search > input').val(Query.param('search'));
      $('.list-header > .search > input').addClass('active');
      _.on('.list-header > .search > .cancel');
    }
    return this.handlers();
  },
  handlers: function() {
    $('.listing').on('click', '.cancel', this.cancelHandler);
    return $('.listing').on('keyup', '.list-header > .search > input', this.searchHandler);
  },
  cancelHandler: function() {
    $('.list-header > .search > input').val('');
    _.off('.list-header > .search > .cancel');
    $('.list-header > .search > input').removeClass('active');
    if (Query.param('search') !== void 0) {
      Query.param('search', false);
      return Listing.load();
    }
  },
  searchHandler: function() {
    var key, val;
    key = event.keyCode;
    val = $(this).val();
    if (val !== '') {
      $('.list-header > .search > input').addClass('active');
      _.on('.list-header > .search > .cancel');
    } else {
      $('.list-header > .search > input').removeClass('active');
      _.off('.list-header > .search > .cancel');
    }
    if (key === 13) {
      Query.param('search', val);
      return Listing.load();
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
      openOnFocus: true,
      onLoad: Entry.structureSpecified,
      render: {
        item: function(item, escape) {
          return "<div><img class=\"profile\" src=\"" + item.clientProfile + "\"/> " + item.name + "</div>";
        },
        option: function(item, escape) {
          return "<div><img class=\"profile\" src=\"" + item.clientProfile + "\"/> " + item.name + "</div>";
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
              name: item.name,
              clientName: item.client.name,
              clientProfile: item.client.profile
            });
          }
          return callback(results);
        });
      }
    });
    selectStructure.change(handler);
    return selectStructure;
  },
  users: function(element, handler, options) {
    var selectUser;
    selectUser = element.selectize({
      plugins: ['remove_button'],
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      create: false,
      preload: 'focus',
      render: {
        option: function(item, escape) {
          return "<div style='line-height: 30px;'>" + item.name + " (" + item.email + ") <img src='" + item.picture + "' style='float: left; width: 30px; height: 30px; margin-right: 10px;' /></div>";
        }
      },
      load: function(query, callback) {
        return _.get('/api/users', options).done(function(response) {
          var i, item, len, ref, results;
          results = [];
          ref = response.data;
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            results.push({
              id: item._id,
              name: item.name,
              email: item.email,
              picture: item.picture
            });
          }
          return callback(results);
        });
      }
    });
    selectUser.change(handler);
    return selectUser;
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
    _.off(this.el);
    return this.state = false;
  }
};

var Structure;

Structure = {
  template: false,
  _id: false,
  clientSelect: false,
  i: function() {
    var match;
    this.template = $('.modify > #template').html();
    this.handlers();
    this.clientSelect = Selectize.clients($('.page.structure > .modify > .detail.client > .input > select'), this.clientSelecthandler);
    if (match = location.pathname.match(/\/structures\/([0-9a-fA-F]{24})/)) {
      this._id = match[1];
      this.load(this._id);
      _.on('.modify > .submit > .cta');
    } else {
      this.entityAdd();
      _.off('.modify > .clientAccess > .switch');
    }
    if (this._id === false) {
      return this.clientSelect[0].selectize.focus();
    }
  },
  handlers: function() {
    $('.modify > .entities > .more').click(this.entityAddHandler);
    $('.modify > .entities').on('click', '.entity > .remove', this.entityRemoveHandler);
    $('.modify > .submit > .ctap').click(this.submitHandler);
    $('.modify > .submit > .cta').click(this.newEntryHandler);
    return $('.modify > .clientAccess > .switch').on('click', this.checkboxHandler);
  },
  checkboxHandler: function() {
    return _.swap(this);
  },
  load: function() {
    Spinner.i($('.page.structure'));
    return _.get('/api/structures/', {
      _id: this._id
    }).always(function() {
      return Spinner.d();
    }).done(function(response) {
      var entity, i, ref, structure;
      if (response.data.length < 1) {
        location.href = '/structures/new';
      }
      structure = response.data[0];
      $('.modify > .name > .input > input').val(structure.name);
      if (structure.clientAccess === true) {
        _.on('.modify > .clientAccess > .switch');
      } else {
        _.off('.modify > .clientAccess > .switch');
      }
      ref = structure.entities;
      for (i in ref) {
        entity = ref[i];
        Structure.entityAdd(false, entity);
      }
      Structure.clientSelect[0].selectize.addOption({
        id: structure.client.id,
        name: structure.client.name
      });
      return Structure.clientSelect[0].selectize.setValue(structure.client.id);
    });
  },
  entityAddHandler: function() {
    return Structure.entityAdd(true);
  },
  entityRemoveHandler: function() {
    return $(this).parent().remove();
  },
  entityAdd: function(focus, entity) {
    if (focus == null) {
      focus = false;
    }
    if (entity == null) {
      entity = false;
    }
    $('.modify > .entities > .body').append(this.template);
    if (entity !== false) {
      $('.modify > .entities > .body > .entity:last-child').find('.input > input').val(entity.name);
      this.selectize($('.modify > .entities > .body > .entity:last-child').find('.input > select'), entity.type);
    } else {
      this.selectize($('.modify > .entities > .body > .entity:last-child').find('.input > select'));
    }
    if (focus) {
      return $('.modify > .entities > .body > .entity > .input.selectize-input input').last().focus();
    }
  },
  selectize: function(el, value) {
    var ized;
    if (value == null) {
      value = false;
    }
    ized = el.selectize({
      placeholder: "Type"
    });
    return ized[0].selectize.setValue(value);
  },
  submitHandler: function() {
    var structure;
    structure = {};
    structure.entities = {};
    structure.client = $('.modify > .client > .input > select').val();
    structure.name = $('.modify > .name > .input > input').val();
    structure.clientAccess = $('.modify > .clientAccess > .switch').hasClass('on');
    return $('.modify > .entities > .body > .entity').each(function(i, el) {
      var name, type;
      name = $(el).find('.input > input').val();
      type = $(el).find('.input > select').val();
      return structure.entities[name] = {
        name: name,
        type: type
      };
    }).promise().done(function() {
      console.log(structure.entities);
      return Structure.modify(structure);
    });
  },
  newEntryHandler: function() {
    return location.href = "/entries/new#structure=" + Structure._id;
  },
  modify: function(structure) {
    var call;
    Spinner.i($('.page.structure'));
    call = '/api/structures/add';
    if (Structure._id !== false) {
      call = "/api/structures/update/" + Structure._id;
    }
    return _.get(call, structure).always(function() {
      return Spinner.d();
    }).done(function(response) {
      Notice.i(response.data.status, 'success');
      _.on('.modify > .submit > .cta');
      if (Structure._id === false) {
        window.history.pushState({}, '', "/structures/" + response.data._id);
      }
      return Structure._id = response.data._id;
    });
  }
};

var Structures;

Structures = {
  i: function() {
    return Listing.i('structures', false, ['client']);
  }
};

var Users;

Users = {
  i: function() {
    return Listing.i('users');
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJmaWx0ZXIuY29mZmVlIiwiZ2xvYmFsLmNvZmZlZSIsImluZGV4LmNvZmZlZSIsImludml0ZS5jb2ZmZWUiLCJsaXN0aW5nLmNvZmZlZSIsIm1haW4uY29mZmVlIiwibWUuY29mZmVlIiwibm90Zm91bmQuY29mZmVlIiwibm90aWNlLmNvZmZlZSIsInByb21wdC5jb2ZmZWUiLCJxdWVyeS5jb2ZmZWUiLCJzZWFyY2guY29mZmVlIiwic2VsZWN0aXplLmNvZmZlZSIsInNwaW5uZXIuY29mZmVlIiwic3RydWN0dXJlLmNvZmZlZSIsInN0cnVjdHVyZXMuY29mZmVlIiwidXNlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOztBQUFBLENBQUEsR0FFRTtFQUFBLENBQUEsRUFBRyxTQUFBO1dBQ0QsSUFBQyxDQUFBLE9BQUQsR0FBVyxXQUFBLENBQVksSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUFaLEVBQTZCLEdBQTdCO0VBRFYsQ0FBSDtFQUdBLENBQUEsRUFDRTtJQUFBLE1BQUEsRUFBUSxLQUFSO0lBQ0EsT0FBQSxFQUFTLENBRFQ7R0FKRjtFQU9BLElBQUEsRUFBTSxTQUFDLEVBQUQsRUFBSyxNQUFMLEVBQW1CLEdBQW5COztNQUFLLFNBQU87OztNQUFPLE1BQUk7O0lBRTNCLElBQUcsQ0FBQSxDQUFBLEVBQUEsWUFBa0IsTUFBbEIsQ0FBSDtNQUNFLEVBQUEsR0FBSyxDQUFBLENBQUUsRUFBRixFQURQOztJQUdBLElBQUcsTUFBQSxLQUFZLEtBQWY7TUFDRSxFQUFFLENBQUMsV0FBSCxDQUFlLE1BQWYsRUFERjs7SUFHQSxJ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IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIHJhbmdlOiAoc3RhcnQsIGVuZCkgLT5cbiAgICByZXN1bHQgPSBbXVxuICAgIGZvciBudW0gaW4gW3N0YXJ0Li5lbmRdXG4gICAgICByZXN1bHQucHVzaCBudW1cbiAgICByZXN1bHRcblxuICBmaXQ6IChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSAtPlxuICAgIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyBzcmNXaWR0aCwgbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0KVxuICAgIHdpZHRoOiBzcmNXaWR0aCpyYXRpbywgaGVpZ2h0OiBzcmNIZWlnaHQqcmF0aW9cblxuICBqaW5pdDogLT5cbiAgICAkLmFqYXhTZXR1cFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiXG5cbiAgcGF0Y2g6ICh1cmwsIGRhdGEpIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAganBhdGNoID0gJC5hamF4XG4gICAgICB1cmw6IHVybFxuICAgICAgZGF0YTogZGF0YVxuICAgICAgdHlwZTogJ1BBVENIJ1xuXG4gICAganBhdGNoLmZhaWwgKHJlc3BvbnNlKSAtPlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBhdGNoXG5cbiAgZ2V0OiAoYXJncy4uLikgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqZ2V0ID0gJC5nZXQgYXJncy4uLlxuXG4gICAgamdldC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAgamdldC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpnZXRcblxuICBwb3N0OiAoYXJncy4uLikgLT5cblxuICAgIGpwb3N0ID0gJC5wb3N0IGFyZ3MuLi5cblxuICAgIGpwb3N0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqcG9zdC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwb3N0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuXG4gICAgZXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04/LmVycm9ycz9bMF1cbiAgICBpZiBlcnJvciBpcyB1bmRlZmluZWRcbiAgICAgIHJldHVybiBQcm9tcHQuaSByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHRcblxuICAgIHB1ZyA9IGVycm9yLm1lc3NhZ2UubWF0Y2ggL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvXG4gICAgaWYgcHVnIGlzbnQgbnVsbFxuICAgICAgZXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UucmVwbGFjZSAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS8sICcnXG4gICAgICBlcnJvci5maWxlID0gcHVnWzFdXG4gICAgICBlcnJvci5saW5lID0gcHVnWzJdXG5cbiAgICBmaWxlID0gQGVuY29kZSBcIiN7ZXJyb3IuZmlsZX1cIlxuXG4gICAgc3dpdGNoIGNvbmZpZy5hcHAuZWRpdG9yXG4gICAgICB3aGVuICdtYWN2aW0nIHRoZW4gZWRpdG9yID0gJ212aW06Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnc3VibGltZScgdGhlbiBlZGl0b3IgPSAnc3VibDovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdlbWFjcycgdGhlbiBlZGl0b3IgPSAnZW1hY3M6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAndGV4dG1hdGUnIHRoZW4gZWRpdG9yID0gJ3RleHRtYXRlOi8vb3Blbi8/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdwaHBzdG9ybScgdGhlbiBlZGl0b3IgPSAncGhwc3Rvcm06Ly9vcGVuP2ZpbGU9J1xuXG4gICAgaWYgZXJyb3IuZmlsZSBpc250IG51bGxcbiAgICAgIGJvZHkgPSBcIlwiXCJcbiAgICAgICAgPHByZT4je2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICAgIDxhIGhyZWY9XCIje2VkaXRvcn0je2ZpbGV9JmxpbmU9I3tlcnJvci5saW5lfVwiPjxiPiN7ZXJyb3IuZmlsZX06I3tlcnJvci5saW5lfTwvYj48L2E+XG4gICAgICBcIlwiXCJcbiAgICBlbHNlXG4gICAgICBib2R5ID0gZXJyb3IubWVzc2FnZVxuXG4gICAgUHJvbXB0LmkgZXJyb3IudHlwZSwgYm9keSwgWydPSyddXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cHM6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbiAgbWV0aG9kczogKG9iaikgLT5cbiAgICByZXMgPSBbXVxuICAgIGZvciBpLG0gb2Ygb2JqXG4gICAgICBpZiB0eXBlb2YgbSBpcyAnZnVuY3Rpb24nXG4gICAgICAgIHJlcy5wdXNoIG1cbiAgICByZXR1cm4gcmVzXG5cbl8uaSgpXG4iLCJUaW1lID1cbiAgaW50ZXJ2YWw6IGZhbHNlXG4gIGdhcDogMTAwMFxuXG4gIGk6IC0+XG4gICAgQGludGVydmFsID0gc2V0SW50ZXJ2YWwoQHNjcmFwZSwgQGdhYSkgaWYgQGludGVydmFsIGlzIGZhbHNlXG4gICAgQHNjcmFwZSgpXG5cbiAgc2NyYXBlOiAtPlxuICAgICQoJ3RpbWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGplbCA9ICQgZWxcbiAgICAgIGplbC5odG1sIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuZnJvbU5vdygpXG4gICAgICBqZWwuYXR0ciAnYXJpYS1sYWJlbCcsIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuY2FsZW5kYXIoKVxuIiwiQ2xpZW50ID1cblxuICBzZWxlY3RVc2VyOiBmYWxzZVxuICBfaWQ6IGZhbHNlXG4gIGNyb3A6IGZhbHNlXG4gIHByb2ZpbGU6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEBoYW5kbGVycygpXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvY2xpZW50c1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG5cbiAgICBAc2VsZWN0VXNlciA9IFNlbGVjdGl6ZS51c2VycyAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtdXNlcnMgPiBpbnB1dCcpLCBAc2VsZWN0VXNlckhhbmRsZXIsIG1lOiBmYWxzZVxuXG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0ID4gaW5wdXQnKS5mb2N1cygpXG4gXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmNsaWVudCA+IC5zdWJtaXQnKS5jbGljayBAbW9kaWZ5SGFuZGxlclxuXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdvdmVyJywgQGRyYWdvdmVyXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdsZWF2ZScsIEBkcmFnbGVhdmVcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2VudGVyIGRyYWdvdmVyJywgQGNhbmNlbFxuXG4gICAgJChkb2N1bWVudCkub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAZHJvcFxuXG4gICAgJCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YScpLm9uICdjbGljaycsIEBjaG9vc2VGaWxlXG4gICAgJCgnLmlucHV0LWltYWdlID4gaW5wdXQ6ZmlsZScpLmNoYW5nZSBAY2hhbmdlXG5cbiAgY2FuY2VsOiAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICBkcmFnb3ZlcjogLT5cbiAgICBfLm9uICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJhZ2xlYXZlOiAtPlxuICAgIF8ub2ZmICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJvcDogKGUpIC0+XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgXy5vZmYgJy5pbnB1dC1pbWFnZSdcblxuICAgIGlmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgYW5kIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoXG4gICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hhbmdlOiAtPlxuICAgIGlmICQodGhpcylbMF0uZmlsZXNcbiAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hvb3NlRmlsZTogLT5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG4gIGNyb3BwaWU6IChmaWxlKSAtPlxuICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIub25sb2FkZW5kID0gLT5cblxuICAgICAgaWYgQ2xpZW50LmNyb3AgaXNudCBmYWxzZVxuICAgICAgICBDbGllbnQuY3JvcC5jcm9wcGllICdkZXN0cm95J1xuICAgICAgICBDbGllbnQuY3JvcCA9IGZhbHNlXG5cbiAgICAgIENsaWVudC5jcm9wID0gJCgnLmlucHV0LWltYWdlID4gLmNyb3BwaWUnKS5jcm9wcGllXG4gICAgICAgIHVybDogcmVhZGVyLnJlc3VsdFxuICAgICAgICBlbmZvcmNlQm91bmRhcnk6IGZhbHNlXG4gICAgICAgIHZpZXdwb3J0OlxuICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICBoZWlnaHQ6IDIwMFxuICAgICAgICBib3VuZGFyeTpcbiAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgaGVpZ2h0OiAzMDBcblxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMIGZpbGVcblxuICBzZWxlY3RVc2VySGFuZGxlcjogLT5cblxuICBtb2RpZnlIYW5kbGVyOiAtPlxuXG4gICAgaWYgQ2xpZW50LmNyb3AgaXNudCBmYWxzZVxuICAgICAgQ2xpZW50LmNyb3AuY3JvcHBpZSAncmVzdWx0JyxcbiAgICAgICAgdHlwZTogJ2NhbnZhcydcbiAgICAgICAgZm9ybWF0OiAnanBlZydcbiAgICAgIC50aGVuIChyZXNwb25zZSkgLT5cbiAgICAgICAgQ2xpZW50LmltYWdlVXBsb2FkIENsaWVudC5kYXRhVVJJdG9CbG9iKHJlc3BvbnNlKSwgLT5cbiAgICAgICAgICBDbGllbnQubW9kaWZ5KClcbiAgICBlbHNlXG4gICAgICBDbGllbnQubW9kaWZ5KClcblxuICBtb2RpZnk6IC0+XG5cbiAgICBuYW1lID0gJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LW5hbWUgPiBpbnB1dCcpLnZhbCgpXG4gICAgdXNlcnMgPSAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtdXNlcnMgPiBpbnB1dCcpLnZhbCgpLnNwbGl0ICcsJ1xuXG4gICAgY2FsbCA9ICcvYXBpL2NsaWVudHMvYWRkJ1xuICAgIGlmIENsaWVudC5faWQgaXNudCBmYWxzZVxuICAgICAgY2FsbCA9IFwiL2FwaS9jbGllbnRzL3VwZGF0ZS8je0NsaWVudC5faWR9XCJcblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnQnKSlcblxuICAgIF8uZ2V0IGNhbGwsIG5hbWU6IG5hbWUsIHVzZXJzOiB1c2VycywgcHJvZmlsZTogQ2xpZW50LnByb2ZpbGVcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBpZiBDbGllbnQuX2lkIGlzIGZhbHNlXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIHt9LCAnJywgXCIvY2xpZW50cy8je3Jlc3BvbnNlLmRhdGEuX2lkfVwiXG4gICAgICAgIENsaWVudC5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuICAgICAgICBpZiBDbGllbnQucHJvZmlsZVxuICAgICAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1pbWFnZSA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoJyN7Q2xpZW50LnByb2ZpbGV9JylcIlxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuY2xpZW50JykpXG5cbiAgICBfLmdldCAnL2FwaS9jbGllbnRzLycsXG4gICAgICBfaWQ6IEBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2NsaWVudHMvbmV3JyBpZiByZXNwb25zZS5kYXRhLmxlbmd0aCA8IDFcbiAgICAgIGNsaWVudCA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1uYW1lID4gaW5wdXQnKS52YWwgY2xpZW50Lm5hbWVcbiAgICAgIGlmIGNsaWVudC5wcm9maWxlXG4gICAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1pbWFnZSA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoJyN7Y2xpZW50LnByb2ZpbGV9JylcIlxuICAgICAgICBDbGllbnQucHJvZmlsZSA9IGNsaWVudC5wcm9maWxlXG4gICAgICBmb3IgaW5kZXgsIHVzZXIgb2YgY2xpZW50LnVzZXJzXG4gICAgICAgIGlmIHVzZXIuaWQgaXNudCBVc2VyLl9pZFxuICAgICAgICAgIENsaWVudC5zZWxlY3RVc2VyWzBdLnNlbGVjdGl6ZS5hZGRPcHRpb24gaWQ6IHVzZXIuaWQsIG5hbWU6IFwiI3t1c2VyLm5hbWV9ICgje3VzZXIuZW1haWx9KVwiXG4gICAgICAgICAgQ2xpZW50LnNlbGVjdFVzZXJbMF0uc2VsZWN0aXplLmFkZEl0ZW0gdXNlci5pZFxuXG5cbiAgZGF0YVVSSXRvQmxvYjogKGRhdGFVUkkpIC0+XG4gICAgYnl0ZVN0cmluZyA9IHVuZGVmaW5lZFxuICAgIGlmIGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwXG4gICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pXG4gICAgZWxzZVxuICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSlcbiAgICAjIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXVxuICAgICMgd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpXG4gICAgaSA9IDBcbiAgICB3aGlsZSBpIDwgYnl0ZVN0cmluZy5sZW5ndGhcbiAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpXG4gICAgICBpKytcbiAgICBuZXcgQmxvYihbIGlhIF0sIHR5cGU6IG1pbWVTdHJpbmcpXG4gICAgICAgIFxuICBpbWFnZVVwbG9hZDogKGJsb2IsIGNhbGxiYWNrKSAtPlxuXG4gICAgZmQgPSBuZXcgRm9ybURhdGEoKVxuICAgIGZkLmFwcGVuZCAnZmlsZScsIGJsb2JcblxuICAgIF8ucG9zdFxuICAgICAgeGhyOiAtPlxuICAgICAgICB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyICdwcm9ncmVzcycsIChlKSAtPlxuICAgICAgICAgIGNvbXBsZXRlID0gZS5sb2FkZWQgLyBlLnRvdGFsXG4gICAgICAgICAgaWYgY29tcGxldGUgPCAxIHRoZW4gTm90aWNlLmkgJ1VwbG9hZGluZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICAgaWYgY29tcGxldGUgaXMgMSB0aGVuIE5vdGljZS5pICdQcm9jZXNzaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgLCBmYWxzZVxuICAgICAgICByZXR1cm4geGhyXG5cbiAgICAgIHVybDogJy9hcGkvdXBsb2FkJ1xuICAgICAgZGF0YTogZmRcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgY29udGVudFR5cGU6IGZhbHNlXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICAgIGVycm9yOiAtPlxuICAgICAgICBOb3RpY2UuZCgpXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSAtPlxuICAgICAgICBOb3RpY2UuaSAnRmlsZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcycsIHRpbWVvdXQ6IDYwMFxuICAgICAgICBDbGllbnQucHJvZmlsZSA9IHJlc3VsdC5kYXRhLnVybFxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgY2FsbGJhY2socmVzdWx0KVxuICAgICAgICAsIDEyMDBcblxuXG4iLCJDbGllbnRzID1cbiAgaTogLT5cbiAgICBMaXN0aW5nLmkgJ2NsaWVudHMnLCBDbGllbnRzLmFjdGlvblxuXG4gIGFjdGlvbjogKHR5cGUpIC0+XG5cbiAgICBzd2l0Y2ggdHlwZVxuICAgICAgd2hlbiAnQ2xpZW50IEludml0ZSdcbiAgICAgICAgaWYgTGlzdGluZy5zZWxlY3RlZC5sZW5ndGggPiAxXG4gICAgICAgICAgTm90aWNlLmkgJ1BsZWFzZSBjaG9vc2UgYSBzaW5nbGUgY2xpZW50IGZvciBhbiBpbnZpdGUgbGluaycsIHR5cGU6ICd3YXJuaW5nJ1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBDbGllbnRzLmdldEludml0ZShMaXN0aW5nLnNlbGVjdGVkWzBdKVxuXG4gIGdldEludml0ZTogKGNsaWVudCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnRzJykpXG5cbiAgICBfLmdldCAnL2FwaS9pbnZpdGUvYWRkJywgY2xpZW50OiBjbGllbnRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGNvbnNvbGUubG9nIHJlc3BvbnNlXG4gICAgICBQcm9tcHQuaShcbiAgICAgICAgJ0NsaWVudCBJbnZpdGUnLFxuICAgICAgICAnU2hhcmUgdGhpcyBVUkwgd2l0aCB5b3VyIGNsaWVudCB0byBhbGxvdyB0aGVtIHRvIG1vZGlmeSB0aGVpciBvd24gZW50cmllcycsXG4gICAgICAgIFsnT0snXSxcbiAgICAgICAgICBjbGlwYm9hcmQ6IHRydWVcbiAgICAgICAgICB2YWx1ZTogd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvaW52aXRlLycgKyByZXNwb25zZS5kYXRhLmludml0ZS5oYXNoLFxuICAgICAgKVxuXG5cblxuIiwiY29uZmlnID0ge1wiYXBwXCI6e1wibmFtZVwiOlwiTGFyYXZlbFwiLFwiZW52XCI6XCJsb2NhbFwiLFwiZGVidWdcIjp0cnVlLFwidXJsXCI6XCJodHRwOi8vYmFzYWwuZGV2OjgwODBcIixcInRpbWV6b25lXCI6XCJVVENcIixcImxvY2FsZVwiOlwiZW5cIixcImZhbGxiYWNrX2xvY2FsZVwiOlwiZW5cIixcImtleVwiOlwiYmFzZTY0OlFZcHpScStvYjV1TGNVYnRlbVMramFUTjZnYlFQUzZXWC9wWk45N2JUOWc9XCIsXCJjaXBoZXJcIjpcIkFFUy0yNTYtQ0JDXCIsXCJsb2dcIjpcInNpbmdsZVwiLFwibG9nX2xldmVsXCI6XCJkZWJ1Z1wiLFwicHJvdmlkZXJzXCI6W1wiSWxsdW1pbmF0ZVxcXFxBdXRoXFxcXEF1dGhTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcQnJvYWRjYXN0aW5nXFxcXEJyb2FkY2FzdFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxCdXNcXFxcQnVzU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXENhY2hlXFxcXENhY2hlU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEZvdW5kYXRpb25cXFxcUHJvdmlkZXJzXFxcXENvbnNvbGVTdXBwb3J0U2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXENvb2tpZVxcXFxDb29raWVTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcRGF0YWJhc2VcXFxcRGF0YWJhc2VTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcRW5jcnlwdGlvblxcXFxFbmNyeXB0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEZpbGVzeXN0ZW1cXFxcRmlsZXN5c3RlbVNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxGb3VuZGF0aW9uXFxcXFByb3ZpZGVyc1xcXFxGb3VuZGF0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEhhc2hpbmdcXFxcSGFzaFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxNYWlsXFxcXE1haWxTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcTm90aWZpY2F0aW9uc1xcXFxOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcUGFnaW5hdGlvblxcXFxQYWdpbmF0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFBpcGVsaW5lXFxcXFBpcGVsaW5lU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFF1ZXVlXFxcXFF1ZXVlU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFJlZGlzXFxcXFJlZGlzU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEF1dGhcXFxcUGFzc3dvcmRzXFxcXFBhc3N3b3JkUmVzZXRTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcU2Vzc2lvblxcXFxTZXNzaW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFRyYW5zbGF0aW9uXFxcXFRyYW5zbGF0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFZhbGlkYXRpb25cXFxcVmFsaWRhdGlvblNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxWaWV3XFxcXFZpZXdTZXJ2aWNlUHJvdmlkZXJcIixcIkxhcmF2ZWxcXFxcVGlua2VyXFxcXFRpbmtlclNlcnZpY2VQcm92aWRlclwiLFwiSmVuc3NlZ2Vyc1xcXFxNb25nb2RiXFxcXE1vbmdvZGJTZXJ2aWNlUHJvdmlkZXJcIixcIkxhcmplY3R1c1xcXFxTZXJ2aWNlUHJvdmlkZXJcIixcIkxhcnB1Z1xcXFxTZXJ2aWNlUHJvdmlkZXJcIixcIkJhcnJ5dmRoXFxcXERlYnVnYmFyXFxcXFNlcnZpY2VQcm92aWRlclwiLFwiQXBwXFxcXFByb3ZpZGVyc1xcXFxBcHBTZXJ2aWNlUHJvdmlkZXJcIixcIkFwcFxcXFxQcm92aWRlcnNcXFxcQXV0aFNlcnZpY2VQcm92aWRlclwiLFwiQXBwXFxcXFByb3ZpZGVyc1xcXFxFdmVudFNlcnZpY2VQcm92aWRlclwiLFwiQXBwXFxcXFByb3ZpZGVyc1xcXFxSb3V0ZVNlcnZpY2VQcm92aWRlclwiXSxcImFsaWFzZXNcIjp7XCJBcHBcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEFwcFwiLFwiQXJ0aXNhblwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQXJ0aXNhblwiLFwiQXV0aFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQXV0aFwiLFwiQmxhZGVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEJsYWRlXCIsXCJCcm9hZGNhc3RcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEJyb2FkY2FzdFwiLFwiQnVzXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxCdXNcIixcIkNhY2hlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxDYWNoZVwiLFwiQ29uZmlnXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxDb25maWdcIixcIkNvb2tpZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQ29va2llXCIsXCJDcnlwdFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQ3J5cHRcIixcIkRCXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxEQlwiLFwiRGVidWdiYXJcIjpcIkJhcnJ5dmRoXFxcXERlYnVnYmFyXFxcXEZhY2FkZVwiLFwiRWxvcXVlbnRcIjpcIklsbHVtaW5hdGVcXFxcRGF0YWJhc2VcXFxcRWxvcXVlbnRcXFxcTW9kZWxcIixcIk1vbG9xdWVudFwiOlwiSmVuc3NlZ2Vyc1xcXFxNb25nb2RiXFxcXEVsb3F1ZW50XFxcXE1vZGVsXCIsXCJFdmVudFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcRXZlbnRcIixcIkZpbGVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEZpbGVcIixcIkdhdGVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEdhdGVcIixcIkhhc2hcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEhhc2hcIixcIkxhbmdcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXExhbmdcIixcIkxvZ1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcTG9nXCIsXCJNYWlsXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxNYWlsXCIsXCJOb3RpZmljYXRpb25cIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXE5vdGlmaWNhdGlvblwiLFwiUGFzc3dvcmRcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFBhc3N3b3JkXCIsXCJRdWV1ZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUXVldWVcIixcIlJlZGlyZWN0XCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxSZWRpcmVjdFwiLFwiUmVkaXNcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFJlZGlzXCIsXCJSZXF1ZXN0XCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxSZXF1ZXN0XCIsXCJSZXNwb25zZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUmVzcG9uc2VcIixcIlJvdXRlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxSb3V0ZVwiLFwiU2NoZW1hXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxTY2hlbWFcIixcIlNlc3Npb25cIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFNlc3Npb25cIixcIlN0b3JhZ2VcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFN0b3JhZ2VcIixcIlVSTFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcVVJMXCIsXCJWYWxpZGF0b3JcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFZhbGlkYXRvclwiLFwiVmlld1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcVmlld1wifX0sXCJjYWNoZVwiOntcImRlZmF1bHRcIjpcImZpbGVcIixcInN0b3Jlc1wiOntcImFwY1wiOntcImRyaXZlclwiOlwiYXBjXCJ9LFwiYXJyYXlcIjp7XCJkcml2ZXJcIjpcImFycmF5XCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiY2FjaGVcIixcImNvbm5lY3Rpb25cIjpudWxsfSxcImZpbGVcIjp7XCJkcml2ZXJcIjpcImZpbGVcIixcInBhdGhcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL2NhY2hlL2RhdGFcIn0sXCJtZW1jYWNoZWRcIjp7XCJkcml2ZXJcIjpcIm1lbWNhY2hlZFwiLFwicGVyc2lzdGVudF9pZFwiOm51bGwsXCJzYXNsXCI6W251bGwsbnVsbF0sXCJvcHRpb25zXCI6W10sXCJzZXJ2ZXJzXCI6W3tcImhvc3RcIjpcIjEyNy4wLjAuMVwiLFwicG9ydFwiOjExMjExLFwid2VpZ2h0XCI6MTAwfV19LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCJ9fSxcInByZWZpeFwiOlwibGFyYXZlbFwifSxcImRlYnVnYmFyXCI6e1wiZW5hYmxlZFwiOmZhbHNlLFwic3RvcmFnZVwiOntcImVuYWJsZWRcIjp0cnVlLFwiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2RlYnVnYmFyXCIsXCJjb25uZWN0aW9uXCI6bnVsbCxcInByb3ZpZGVyXCI6XCJcIn0sXCJpbmNsdWRlX3ZlbmRvcnNcIjp0cnVlLFwiY2FwdHVyZV9hamF4XCI6dHJ1ZSxcImNsb2Nrd29ya1wiOmZhbHNlLFwiY29sbGVjdG9yc1wiOntcInBocGluZm9cIjp0cnVlLFwibWVzc2FnZXNcIjp0cnVlLFwidGltZVwiOnRydWUsXCJtZW1vcnlcIjp0cnVlLFwiZXhjZXB0aW9uc1wiOnRydWUsXCJsb2dcIjp0cnVlLFwiZGJcIjp0cnVlLFwidmlld3NcIjp0cnVlLFwicm91dGVcIjp0cnVlLFwibGFyYXZlbFwiOmZhbHNlLFwiZXZlbnRzXCI6ZmFsc2UsXCJkZWZhdWx0X3JlcXVlc3RcIjpmYWxzZSxcInN5bWZvbnlfcmVxdWVzdFwiOnRydWUsXCJtYWlsXCI6dHJ1ZSxcImxvZ3NcIjpmYWxzZSxcImZpbGVzXCI6ZmFsc2UsXCJjb25maWdcIjpmYWxzZSxcImF1dGhcIjpmYWxzZSxcImdhdGVcIjpmYWxzZSxcInNlc3Npb25cIjp0cnVlfSxcIm9wdGlvbnNcIjp7XCJhdXRoXCI6e1wic2hvd19uYW1lXCI6ZmFsc2V9LFwiZGJcIjp7XCJ3aXRoX3BhcmFtc1wiOnRydWUsXCJ0aW1lbGluZVwiOmZhbHNlLFwiYmFja3RyYWNlXCI6ZmFsc2UsXCJleHBsYWluXCI6e1wiZW5hYmxlZFwiOmZhbHNlLFwidHlwZXNcIjpbXCJTRUxFQ1RcIl19LFwiaGludHNcIjp0cnVlfSxcIm1haWxcIjp7XCJmdWxsX2xvZ1wiOmZhbHNlfSxcInZpZXdzXCI6e1wiZGF0YVwiOmZhbHNlfSxcInJvdXRlXCI6e1wibGFiZWxcIjp0cnVlfSxcImxvZ3NcIjp7XCJmaWxlXCI6bnVsbH19LFwiaW5qZWN0XCI6dHJ1ZSxcInJvdXRlX3ByZWZpeFwiOlwiX2RlYnVnYmFyXCJ9LFwibWFpbFwiOntcImRyaXZlclwiOlwic210cFwiLFwiaG9zdFwiOlwic210cC5tYWlsZ3VuLm9yZ1wiLFwicG9ydFwiOjU4NyxcImZyb21cIjp7XCJhZGRyZXNzXCI6XCJoZWxsb0BleGFtcGxlLmNvbVwiLFwibmFtZVwiOlwiRXhhbXBsZVwifSxcImVuY3J5cHRpb25cIjpcInRsc1wiLFwidXNlcm5hbWVcIjpudWxsLFwicGFzc3dvcmRcIjpudWxsLFwic2VuZG1haWxcIjpcIi91c3Ivc2Jpbi9zZW5kbWFpbCAtYnNcIixcIm1hcmtkb3duXCI6e1widGhlbWVcIjpcImRlZmF1bHRcIixcInBhdGhzXCI6W1wiL1VzZXJzL2svYmFzYWwvcmVzb3VyY2VzL3ZpZXdzL3ZlbmRvci9tYWlsXCJdfX0sXCJxdWV1ZVwiOntcImRlZmF1bHRcIjpcInN5bmNcIixcImNvbm5lY3Rpb25zXCI6e1wic3luY1wiOntcImRyaXZlclwiOlwic3luY1wifSxcImRhdGFiYXNlXCI6e1wiZHJpdmVyXCI6XCJkYXRhYmFzZVwiLFwidGFibGVcIjpcImpvYnNcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJyZXRyeV9hZnRlclwiOjkwfSxcImJlYW5zdGFsa2RcIjp7XCJkcml2ZXJcIjpcImJlYW5zdGFsa2RcIixcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInJldHJ5X2FmdGVyXCI6OTB9LFwic3FzXCI6e1wiZHJpdmVyXCI6XCJzcXNcIixcImtleVwiOlwieW91ci1wdWJsaWMta2V5XCIsXCJzZWNyZXRcIjpcInlvdXItc2VjcmV0LWtleVwiLFwicHJlZml4XCI6XCJodHRwczovL3Nxcy51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS95b3VyLWFjY291bnQtaWRcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLW5hbWVcIixcInJlZ2lvblwiOlwidXMtZWFzdC0xXCJ9LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwicmV0cnlfYWZ0ZXJcIjo5MH19LFwiZmFpbGVkXCI6e1wiZGF0YWJhc2VcIjpcIm1vbmdvZGJcIixcInRhYmxlXCI6XCJmYWlsZWRfam9ic1wifX0sXCJzZXJ2aWNlc1wiOntcIm1haWxndW5cIjp7XCJkb21haW5cIjpudWxsLFwic2VjcmV0XCI6bnVsbH0sXCJzZXNcIjp7XCJrZXlcIjpudWxsLFwic2VjcmV0XCI6bnVsbCxcInJlZ2lvblwiOlwidXMtZWFzdC0xXCJ9LFwic3Bhcmtwb3N0XCI6e1wic2VjcmV0XCI6bnVsbH0sXCJzdHJpcGVcIjp7XCJtb2RlbFwiOlwiQXBwXFxcXFVzZXJcIixcImtleVwiOm51bGwsXCJzZWNyZXRcIjpudWxsfX0sXCJzZXNzaW9uXCI6e1wiZHJpdmVyXCI6XCJmaWxlXCIsXCJsaWZldGltZVwiOjEyMCxcImV4cGlyZV9vbl9jbG9zZVwiOmZhbHNlLFwiZW5jcnlwdFwiOmZhbHNlLFwiZmlsZXNcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL3Nlc3Npb25zXCIsXCJjb25uZWN0aW9uXCI6bnVsbCxcInRhYmxlXCI6XCJzZXNzaW9uc1wiLFwic3RvcmVcIjpudWxsLFwibG90dGVyeVwiOlsyLDEwMF0sXCJjb29raWVcIjpcImxhcmF2ZWxfc2Vzc2lvblwiLFwicGF0aFwiOlwiL1wiLFwiZG9tYWluXCI6bnVsbCxcInNlY3VyZVwiOmZhbHNlLFwiaHR0cF9vbmx5XCI6dHJ1ZX0sXCJ2aWV3XCI6e1wicGF0aHNcIjpbXCIvVXNlcnMvay9iYXNhbC9yZXNvdXJjZXMvdmlld3NcIl0sXCJjb21waWxlZFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvdmlld3NcIn0sXCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwid2hpdGUyXCI6XCIjZjhmOGY4XCIsXCJ3aGl0ZTNcIjpcIiNGNEY0RjRcIixcIndoaXRlNFwiOlwiI0ZBRkFGQVwiLFwiZ3JleTFcIjpcIiNlNWU1ZTVcIixcImdyZXkyXCI6XCIjZjVmNWY1XCIsXCJncmV5M1wiOlwiI2QwZDBkMFwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJibGFjazJcIjpcIiMyODI4MjhcIixcImJsYWNrM1wiOlwiIzMzMzMzM1wiLFwiYmxhY2s0XCI6XCIjMjMyOTJFXCIsXCJibGFjazVcIjpcIiMzRTQzNDdcIixcImJsYWNrNlwiOlwiIzQ5NEU1MlwiLFwicmVkMVwiOlwiI0M4MjEyQlwiLFwieWVsbG93MVwiOlwiI0Y2QkI0NVwiLFwiY3lhbjFcIjpcIiM1RkE3OTNcIixcIm9yYW5nZTFcIjpcIiNGNjhGNjJcIixcInNraW4xXCI6XCIjRjNEREEzXCIsXCJncmVlbjFcIjpcIiM1YmE1NDFcIixcImdyZWVuMlwiOlwiIzg4ZDk2ZFwiLFwiZ3JlZW4zXCI6XCIjNzdkMzU4XCIsXCJibHVlMVwiOlwiIzFkYTdlZVwiLFwiYmx1ZTJcIjpcIiMwMDczYmJcIixcImJsdWUzXCI6XCIjNEY1RDk1XCIsXCJnb29nbGVfYmx1ZVwiOlwiIzQyODVmNFwiLFwiZ29vZ2xlX2dyZWVuXCI6XCIjMzRhODUzXCIsXCJnb29nbGVfeWVsbG93XCI6XCIjZmJiYzA1XCIsXCJnb29nbGVfcmVkXCI6XCIjZWE0MzM1XCIsXCJnaXRodWJfYmx1ZVwiOlwiIzBEMjYzNlwiLFwiZmFjZWJvb2tfYmx1ZVwiOlwiIzQ4NjdBQVwiLFwiaW5zdGFncmFtX29yXCI6XCIjRkY3ODA0XCIsXCJ0d2l0dGVyX2JsdWVcIjpcIiMwMEFDRURcIn0sXCJmb250XCI6e1wiNDA0XCI6e1wiZm9udC1mYW1pbHlcIjpcIk1vbm90b25cIixcImZvbnQtc2l6ZVwiOlwiNzVweFwifSxcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJoMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwifSxcImgzYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImMxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNnB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9LFwiYzF0YlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjQwMFwifSxcImMxc1wiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTJweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjAuNXB4XCJ9LFwiYzFzYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTJweFwiLFwiZm9udC13ZWlnaHRcIjpcIjYwMFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjAuNXB4XCJ9LFwiYzJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJjMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI1MDBcIn19LFwibWV0YVwiOntcInRpdGxlXCI6XCJiYXNhbFwiLFwidXJsXCI6XCJodHRwczovL2Jhc2FsLnRlY2gvXCIsXCJkZXNjcmlwdGlvblwiOlwibWluaW1hbCBjb250ZW50IG1hbmFnZW1lbnRcIixcImtleXdvcmRzXCI6XCJjbXNcIixcInJlcG9cIjpcImh0dHBzOi8vZ2l0aHViLmNvbS9hY2lkamF6ei9iYXNhbFwifSxcInNldHRpbmdzXCI6e1wicGVycGFnZVwiOjEwfX07IiwiRGFzaGJvYXJkID1cblxuICBpOiAtPlxuICAgIEBsb2FkKCkgaWYgd2luZG93LlVzZXIgaXNudCB1bmRlZmluZWRcblxuICBsb2FkOiAoY29tcGxldGUpIC0+XG4gICAgXy5vZmYgJy5wYWdlLmhvbWUnXG4gICAgXy5vbiAnLnBhZ2UuZGFzaGJvYXJkJ1xuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5kYXNoYm9hcmQgPiAuY29sbGVjdGlvbnMnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2NsaWVudHMnLFxuICAgICAgdmlldzogJ2Rhc2hib2FyZCdcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIFRpbWUuaSgpXG4gICAgICAkKCcuY29sbGVjdGlvbnMnKS5odG1sIHJlc3BvbnNlLnZpZXdcblxuIiwiRW50aXRpZXMgPVxuXG4gIGJsb2dzOiBbXVxuICBjcm9wczoge31cbiAgaW1hZ2VzOiB7fVxuXG4gIHBsYWNlaG9sZGVyczogW1xuICAgIFwiVGhhdCdzIHdoYXQgSSdtIGJsb2dnaW5nIGFib3V0XCJcbiAgICBcIkhhdmUgeW91IGd1eXMgYmVlbiBibG9nZ2luZz9cIlxuICAgIFwiSG9sZCBhbGwgbXkgY2FsbHMsIEknbSBibG9nZ2luZ1wiXG4gICAgXCJUZWxsIERvbm5pZSBJJ20gYmxvZ2dpbmcgYW5kIEknbGwgY2FsbCBoaW0gYmFja1wiXG4gICAgXCJJIGdvdHRhIHJ1biwgeW91IHNob3VsZCBiZSBibG9nZ2luZ1wiXG4gICAgXCJJIHdhbnQgeW91IG9uIHRoZSBwaG9uZSwgYnV0IEkgYWxzbyB3YW50IHlvdSBibG9nZ2luZ1wiXG4gIF1cblxuICBCbG9nOiAoZWwsIG5hbWUsIHZhbHVlPWZhbHNlKSAtPlxuXG4gICAgZWRpdG9yID0gZWwuZmluZCgnLmJsb2cnKS5zdW1tZXJub3RlXG4gICAgICBwbGFjZWhvbGRlcjogQHBsYWNlaG9sZGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBAcGxhY2Vob2xkZXJzLmxlbmd0aCldXG4gICAgICBjYWxsYmFja3M6XG4gICAgICAgIG9uSW1hZ2VVcGxvYWQ6IChmaWxlcykgLT5cbiAgICAgICAgICBFbnRpdGllcy5pbWFnZVVwbG9hZCBmaWxlcywgdGhpc1xuXG4gICAgZWwuZmluZCgnLmJsb2cnKS5zdW1tZXJub3RlKCdjb2RlJywgdmFsdWUpIGlmIHZhbHVlIGlzbnQgZmFsc2VcblxuICAgIEBibG9ncy5wdXNoIG5hbWU6IG5hbWUsIGVkaXRvcjogZWRpdG9yLCBlbDogZWwuZmluZCgnLmJsb2cnKVxuXG4gIGJsb2dHZXRDb2RlOiAobmFtZSkgLT5cbiAgICBmb3IgYmxvZyBpbiBAYmxvZ3NcbiAgICAgIHJldHVybiBibG9nLmVsLnN1bW1lcm5vdGUoJ2NvZGUnKSBpZiBibG9nLm5hbWUgaXMgbmFtZVxuIFxuICBibG9nRm9jdXM6IChuYW1lKSAtPlxuICAgIGZvciBibG9nIGluIEBibG9nc1xuICAgICAgaWYgYmxvZy5uYW1lIGlzIG5hbWVcbiAgICAgICAgJCgnLm5vdGUtZWRpdGFibGUnKS5mb2N1cygpXG5cbiAgaW1hZ2VVcGxvYWQ6IChmaWxlcywgZWwpIC0+XG5cbiAgICBmZCA9IG5ldyBGb3JtRGF0YSgpXG4gICAgZmQuYXBwZW5kICdmaWxlJywgZmlsZXNbMF1cblxuICAgIF8ucG9zdFxuICAgICAgeGhyOiAtPlxuICAgICAgICB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyICdwcm9ncmVzcycsIChlKSAtPlxuICAgICAgICAgIGNvbXBsZXRlID0gZS5sb2FkZWQgLyBlLnRvdGFsXG4gICAgICAgICAgaWYgY29tcGxldGUgPCAxIHRoZW4gTm90aWNlLmkgJ1VwbG9hZGluZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICAgaWYgY29tcGxldGUgaXMgMSB0aGVuIE5vdGljZS5pICdQcm9jZXNzaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgLCBmYWxzZVxuICAgICAgICByZXR1cm4geGhyXG5cbiAgICAgIHVybDogJy9hcGkvdXBsb2FkJ1xuICAgICAgZGF0YTogZmRcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgY29udGVudFR5cGU6IGZhbHNlXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICAgIGVycm9yOiAtPlxuICAgICAgICBOb3RpY2UuZCgpXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSAtPlxuICAgICAgICAkKGVsKS5zdW1tZXJub3RlKCdlZGl0b3IuaW5zZXJ0SW1hZ2UnLCByZXN1bHQuZGF0YS51cmwpXG4gICAgICAgIE5vdGljZS5pICdGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuXG4gIFRhZ3M6IChlbCwgbmFtZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLnNlbGVjdGl6ZVxuICAgICAgcGx1Z2luczogWydyZXN0b3JlX29uX2JhY2tzcGFjZScsJ3JlbW92ZV9idXR0b24nXVxuICAgICAgZGVsaW1pdGVyOiAnLCdcbiAgICAgIHBlcnNpc3Q6IGZhbHNlXG4gICAgICBjcmVhdGU6IChpbnB1dCkgLT5cbiAgICAgICAgdmFsdWU6IGlucHV0XG4gICAgICAgIHRleHQ6IGlucHV0XG5cbiAgRGF0ZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLmZsYXRwaWNrclxuICAgICAgZGF0ZUZvcm1hdDogJ20vZC9ZJ1xuXG4gIERhdGVUaW1lOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1kgaDppIEsnXG4gICAgICBlbmFibGVUaW1lOiB0cnVlXG5cbiAgRGF0ZVJhbmdlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1knXG4gICAgICBtb2RlOiAncmFuZ2UnXG5cbiAgRGF0ZVRpbWVSYW5nZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLmZsYXRwaWNrclxuICAgICAgZGF0ZUZvcm1hdDogJ20vZC9ZIGg6aSBLJ1xuICAgICAgZW5hYmxlVGltZTogdHJ1ZVxuICAgICAgbW9kZTogJ3JhbmdlJ1xuXG4gIEltYWdlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuXG4gICAgQGltYWdlSGFuZGxlcnMgZWxcblxuICAgICMgcHJlbG9hZCBleGlzdGluZyBpbWFnZXNcbiAgICBpZiB2YWx1ZSBpc250IHVuZGVmaW5lZFxuICAgICAgRW50aXRpZXMuY3JvcHBlcih2YWx1ZSwgZWwpXG4gICAgICBFbnRpdGllcy5pbWFnZXNbbmFtZV0gPSB2YWx1ZVxuXG5cbiAgaW1hZ2VIYW5kbGVyczogKGVsLCBuYW1lKSAtPlxuXG4gICAgZWwub24gJ2RyYWdvdmVyJywgQGltYWdlSGFuZGxlci5kcmFnb3ZlclxuICAgIGVsLm9uICdkcmFnbGVhdmUnLCBAaW1hZ2VIYW5kbGVyLmRyYWdsZWF2ZVxuICAgIGVsLm9uICdkcmFnZW50ZXIgZHJhZ292ZXInLCBAaW1hZ2VIYW5kbGVyLmNhbmNlbFxuICAgIGVsLm9uICdkcm9wIGRyYWdkcm9wJywgQGltYWdlSGFuZGxlci5kcm9wXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YS5zZWxlY3QnKS5vbiAnY2xpY2snLCBAaW1hZ2VIYW5kbGVyLmNob29zZUZpbGVcbiAgICBlbC5maW5kKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhLnNhdmUnKS5vbiAnY2xpY2snLCBAaW1hZ2VIYW5kbGVyLnNhdmVcbiAgICBlbC5maW5kKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dDpmaWxlJykub24gJ2NoYW5nZScsIEBpbWFnZUhhbmRsZXIuY2hhbmdlXG5cbiAgaW1hZ2VIYW5kbGVyOlxuXG4gICAgZHJhZ292ZXI6IC0+XG4gICAgICBfLm9uICQodGhpcykuZmluZCgnLmlucHV0LWltYWdlJylcbiAgICBkcmFnbGVhdmU6IC0+XG4gICAgICBfLm9mZiAkKHRoaXMpLmZpbmQoJy5pbnB1dC1pbWFnZScpXG4gICAgY2FuY2VsOiAtPlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgZHJvcDogKGUpIC0+XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBfLm9mZiAkKHRoaXMpLmZpbmQgJy5pbnB1dC1pbWFnZSdcblxuICAgICAgaWYgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlciBhbmQgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGhcbiAgICAgICAgZmlsZXMgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzXG5cbiAgICAgIEVudGl0aWVzLmxvYWRDcm9wcGVyIGZpbGVzWzBdLCAkKHRoaXMpXG5cbiAgICBjaG9vc2VGaWxlOiAtPlxuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG4gICAgY2hhbmdlOiAtPlxuICAgICAgaWYgJCh0aGlzKVswXS5maWxlc1xuICAgICAgICBmaWxlcyA9ICQodGhpcylbMF0uZmlsZXNcblxuICAgICAgICBFbnRpdGllcy5sb2FkQ3JvcHBlciBmaWxlc1swXSwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKVxuXG4gICAgc2F2ZTogLT5cblxuICAgICAgbmFtZSA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZGF0YSAnbmFtZSdcbiAgICAgIGluZGV4ID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5kYXRhICdpbmRleCdcblxuICAgICAgU3Bpbm5lci5pKCQoXCIuZW50aXR5X2luZGV4XyN7aW5kZXh9XCIpKVxuXG4gICAgICBFbnRpdGllcy5jcm9wc1tuYW1lXS5nZXRDcm9wcGVkQ2FudmFzKCkudG9CbG9iIChibG9iKSAtPlxuICAgICAgICBDbGllbnQuaW1hZ2VVcGxvYWQgYmxvYiwgKHJlc3VsdCkgLT5cbiAgICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICAgIEVudGl0aWVzLmltYWdlc1tuYW1lXSA9IHJlc3VsdC5kYXRhLnVybFxuICAgICAgLCAnaW1hZ2UvanBlZydcblxuICBsb2FkQ3JvcHBlcjogKGZpbGUsIGVsKSAtPlxuXG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuXG4gICAgcmVhZGVyLm9ubG9hZGVuZCA9IC0+XG4gICAgICBFbnRpdGllcy5jcm9wcGVyIHJlYWRlci5yZXN1bHQsIGVsXG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwgZmlsZVxuXG4gIGNyb3BwZXI6ICh1cmwsIGVsKSAtPlxuXG4gICAgbmFtZSA9IGVsLmRhdGEgJ25hbWUnXG4gICAgaW5kZXggPSBlbC5kYXRhICdpbmRleCdcblxuICAgIGNvbnNvbGUubG9nIG5hbWUsIGluZGV4XG5cbiAgICBpZiBFbnRpdGllcy5jcm9wc1tuYW1lXSBpc250IHVuZGVmaW5lZFxuICAgICAgRW50aXRpZXMuY3JvcHNbbmFtZV0uZGVzdHJveSgpXG4gICAgICBFbnRpdGllcy5jcm9wc1tuYW1lXSA9IGZhbHNlXG5cbiAgICBlbC5maW5kKCcuY3JvcHBlcicpLmF0dHIgJ3NyYycsIHVybFxuXG4gICAgRW50aXRpZXMuY3JvcHNbbmFtZV0gPSBuZXcgQ3JvcHBlciBlbC5maW5kKCcuY3JvcHBlcicpWzBdLFxuICAgICAgbWluQ29udGFpbmVySGVpZ2h0OiAzMDBcbiAgICAgIG1pbkNhbnZhc0hlaWdodDogMzAwXG4gICAgICByZXNwb25zaXZlOiB0cnVlXG4gICAgICBwcmV2aWV3OiBcImRpdi5lbnRpdHlfaW5kZXhfI3tpbmRleH0gPiBkaXYuaW5wdXQtaW1hZ2UgPiBkaXYucGljdHVyZVwiXG4gICAgICBhdXRvQ3JvcEFyZWE6IDFcbiAgICAgIHN0cmljdDogZmFsc2VcbiAgICAgIGhpZ2hsaWdodDogdHJ1ZVxuXG4gICAgXy5vbiBlbC5maW5kKCcuc2F2ZScpXG5cblxuIiwiRW50cmllcyA9XG5cbiAgaTogLT5cblxuICAgICMgbGltaXQgZmlsdGVyIHR5cGVzIGJhc2VkIG9uIHVzZXIgdHlwZVxuICAgIGlmIFVzZXI/LmNsaWVudCBpc250IHVuZGVmaW5lZFxuICAgICAgTGlzdGluZy5pICdlbnRyaWVzJywgZmFsc2UsIFsnc3RydWN0dXJlJ11cbiAgICBlbHNlXG4gICAgICBMaXN0aW5nLmkgJ2VudHJpZXMnLCBmYWxzZSwgWydjbGllbnQnLCAnc3RydWN0dXJlJ11cbiIsIkVudHJ5ID1cblxuICBzZWxlY3RTdHJ1Y3R1cmU6IHt9XG5cbiAgX2lkOiBmYWxzZVxuICBzdHJ1Y3R1cmU6IGZhbHNlXG4gIHNlbGVjdGVkU3RydWN0dXJlOiBmYWxzZVxuICBlbnRyeTogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5oYXNoLm1hdGNoIC8jc3RydWN0dXJlPShbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgRW50cnkuc2VsZWN0ZWRTdHJ1Y3R1cmUgPSBtYXRjaFsxXVxuXG4gICAgQHNlbGVjdGl6ZSgpXG4gICAgQGhhbmRsZXJzKClcblxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL2VudHJpZXNcXC8oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEBfaWQgPSBtYXRjaFsxXVxuICAgICAgQGxvYWQgQF9pZFxuICAgIGVsc2VcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuZm9jdXMoKVxuXG4gIHN0cnVjdHVyZVNwZWNpZmllZDogLT5cbiAgICBpZiBFbnRyeS5zZWxlY3RlZFN0cnVjdHVyZSBpc250IGZhbHNlXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLnNldFZhbHVlIEVudHJ5LnNlbGVjdGVkU3RydWN0dXJlXG5cbiAgc2VsZWN0aXplOiAtPlxuXG4gICAgQHNlbGVjdFN0cnVjdHVyZSA9IFNlbGVjdGl6ZS5zdHJ1Y3R1cmVzICQoJy5tb2RpZnkgPiAuc3RydWN0dXJlID4gc2VsZWN0JyksXG4gICAgICBFbnRyeS5zdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLnN1Ym1pdCcpLmNsaWNrIEBzdWJtaXRcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYW5vdGhlcicpLmNsaWNrIEBhbm90aGVyXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmNhbmNlbCcpLmNsaWNrIEBjYW5jZWxcblxuICAgICQoJy5mb2N1c21lJykuZm9jdXMgLT5cbiAgICAgICQoJy5ub3RlLWVkaXRhYmxlJykuZm9jdXMoKVxuXG5cbiAgbG9hZDogKF9pZCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeScpKVxuXG4gICAgXy5nZXQgJy9hcGkvZW50cmllcy8nLFxuICAgICAgX2lkOiBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGVudHJ5ID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgRW50cnkuZW50cnkgPSBlbnRyeVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5hZGRPcHRpb25cbiAgICAgICAgaWQ6IGVudHJ5LnN0cnVjdHVyZS5pZCwgbmFtZTogZW50cnkuc3RydWN0dXJlLm5hbWUsIGNsaWVudFByb2ZpbGU6IGVudHJ5LmNsaWVudC5wcm9maWxlXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLnNldFZhbHVlIGVudHJ5LnN0cnVjdHVyZS5pZFxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5kaXNhYmxlKClcblxuICBzdWJtaXQ6IC0+XG5cbiAgICBuYW1lID0gJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCgpXG4gICAgZW50aXRpZXMgPSB7fVxuXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmJvZHkgPiAuZW50aXR5JykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBlbnRpdHlfbmFtZSA9ICQoZWwpLmZpbmQoJy5sYWJlbCcpLmh0bWwoKVxuICAgICAgdHlwZSA9ICQoZWwpLmRhdGEgJ3R5cGUnXG5cbiAgICAgIHN3aXRjaCB0eXBlXG4gICAgICAgIHdoZW4gJ1RleHQnLCdMaW5rJywnRGF0ZScsJ1RpbWUnLCdEYXRlVGltZScsJ0RhdGVSYW5nZScsJ0RhdGVUaW1lUmFuZ2UnIHRoZW4gdmFsdWUgPSAkKGVsKS5maW5kKCdpbnB1dCcpLnZhbCgpXG4gICAgICAgIHdoZW4gJ1RhZ3MnIHRoZW4gdmFsdWUgPSAkKGVsKS5maW5kKCdpbnB1dCcpLnZhbCgpLnNwbGl0ICcsJ1xuICAgICAgICB3aGVuICdCbG9nJ1xuICAgICAgICAgIGJsb2cgPSBFbnRpdGllcy5ibG9nR2V0Q29kZSBlbnRpdHlfbmFtZVxuICAgICAgICAgIHZhbHVlID0gYmxvZ1xuICAgICAgICB3aGVuICdJbWFnZSdcbiAgICAgICAgICB2YWx1ZSA9IEVudGl0aWVzLmltYWdlc1tlbnRpdHlfbmFtZV1cblxuICAgICAgZW50aXRpZXNbZW50aXR5X25hbWVdID0gbmFtZTogZW50aXR5X25hbWUsIHR5cGU6IHR5cGUsIHZhbHVlOiB2YWx1ZVxuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG5cbiAgICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnknKSlcblxuICAgICAgY2FsbCA9ICcvYXBpL2VudHJpZXMvYWRkJ1xuICAgICAgaWYgRW50cnkuX2lkIGlzbnQgZmFsc2VcbiAgICAgICAgY2FsbCA9IFwiL2FwaS9lbnRyaWVzL3VwZGF0ZS8je0VudHJ5Ll9pZH1cIlxuXG4gICAgICBfLmdldCBjYWxsLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIHN0cnVjdHVyZTogRW50cnkuc3RydWN0dXJlXG4gICAgICAgIGVudGl0aWVzOiBlbnRpdGllc1xuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIEVudHJ5Ll9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL2VudHJpZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBFbnRyeS5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuICAgICAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYW5vdGhlcidcblxuICBhbm90aGVyOiAtPlxuICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9lbnRyaWVzL25ldyNzdHJ1Y3R1cmU9I3tFbnRyeS5zdHJ1Y3R1cmV9XCJcbiAgY2FuY2VsOiAtPlxuICAgIGlmIGRvY3VtZW50LnJlZmVycmVyLmluZGV4T2Yod2luZG93LmxvY2F0aW9uLmhvc3QpIGlzIC0xXG4gICAgICBsb2NhdGlvbi5ocmVmID0gXCIvZW50cmllc1wiXG4gICAgZWxzZVxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpXG4gIHN0cnVjdHVyZVNlbGVjdEhhbmRsZXI6IChlKSAtPlxuICAgIHN0cnVjdHVyZV9pZCA9ICQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKVxuICAgIHJldHVybiBmYWxzZSBpZiBzdHJ1Y3R1cmVfaWQubGVuZ3RoIGlzbnQgMjRcbiAgICAjaWYgRW50cnkuZW50cnkgaXNudCBmYWxzZVxuICAgICMgIEVudHJ5LmxvYWRFbnRpdGllcyBFbnRyeS5lbnRyeS5lbnRpdGllcywgRW50cnkuZW50cnkubmFtZVxuICAgICNlbHNlXG4gICAgRW50cnkubG9hZFN0cnVjdHVyZSBzdHJ1Y3R1cmVfaWRcblxuICBsb2FkU3RydWN0dXJlOiAoX2lkKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsXG4gICAgICBfaWQ6IF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgRW50cnkuc3RydWN0dXJlID0gX2lkXG4gICAgICBAbG9hZEVudGl0aWVzIHJlc3BvbnNlLmRhdGFbMF0uZW50aXRpZXNcblxuICBsb2FkRW50aXRpZXM6IChlbnRpdGllcywgbmFtZT1mYWxzZSkgLT5cblxuICAgIF8ub24gJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lJ1xuICAgIGlmIEVudHJ5LmVudHJ5Lm5hbWUgaXNudCBmYWxzZVxuICAgICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbChFbnRyeS5lbnRyeS5uYW1lKVxuXG4gICAgYm9keSA9ICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5JylcbiAgICBib2R5Lmh0bWwgJydcblxuICAgIHRhYmluZGV4ID0gM1xuICAgIGluZGV4ID0gMFxuXG4gICAgZm9yIGksIGVudGl0eSBvZiBlbnRpdGllc1xuXG4gICAgICBodG1sID0gJChcIi5wYWdlLmVudHJ5ID4gI3RlbXBsYXRlID4gLmVudGl0eV8je2VudGl0eS50eXBlfVwiKS5jbG9uZSgpXG4gICAgICBodG1sLmFkZENsYXNzIFwiZW50aXR5X2luZGV4XyN7KytpbmRleH1cIlxuICAgICAgaHRtbC5kYXRhIFwiaW5kZXhcIiwgaW5kZXhcbiAgICAgIGh0bWwuZGF0YSBcIm5hbWVcIiwgZW50aXR5Lm5hbWVcblxuICAgICAgaWYgRW50cnkuZW50cnkuZW50aXRpZXM/W2ldPy52YWx1ZVxuXG4gICAgICAgIHZhbHVlID0gRW50cnkuZW50cnkuZW50aXRpZXNbaV0udmFsdWVcblxuICAgICAgICBzd2l0Y2ggZW50aXR5LnR5cGVcbiAgICAgICAgICB3aGVuICdUYWdzJywgJ1RleHQnLCdMaW5rJywnRGF0ZScsJ1RpbWUnLCdEYXRlVGltZScsJ0RhdGVSYW5nZScsJ0RhdGVUaW1lUmFuZ2UnIHRoZW4gaHRtbC5maW5kKCdpbnB1dCcpLnZhbCB2YWx1ZVxuXG4gICAgICBodG1sLmZpbmQoJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYScpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXgrK1xuICAgICAgYm9keS5hcHBlbmQgaHRtbFxuXG4gICAgICBlbnRpdHlFbCA9ICQoXCIucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keSAuZW50aXR5X2luZGV4XyN7aW5kZXh9XCIpXG4gICAgICBlbnRpdHlFbC5maW5kKCcubGFiZWwnKS5odG1sIGVudGl0eS5uYW1lXG5cbiAgICAgIGlmIEVudGl0aWVzW2VudGl0eS50eXBlXSBpc250IHVuZGVmaW5lZFxuICAgICAgICBFbnRpdGllc1tlbnRpdHkudHlwZV0oZW50aXR5RWwsIGVudGl0eS5uYW1lLCB2YWx1ZSlcblxuICAgICQoJ1t0YWJpbmRleD0yXScpLmZvY3VzKClcbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0J1xuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4KytcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYW5vdGhlcicpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXhcbiIsIkZpbHRlciA9XG4gIGZpbHRlcjogZmFsc2VcbiAgZW5kcG9pbnQ6IGZhbHNlXG4gIGZpbHRlcnM6IFtdXG5cbiAgaTogKGZpbHRlcnMpIC0+XG5cbiAgICBAZmlsdGVycyA9IGZpbHRlcnNcblxuICAgIF8ub24gXCIuZmlsdGVyXyN7ZmlsdGVyfVwiIGZvciBmaWx0ZXIgaW4gQGZpbHRlcnNcblxuICAgIGZvciBmaWx0ZXIgaW4gQGZpbHRlcnNcbiAgICAgIGlmIFF1ZXJ5LnBhcmFtKGZpbHRlcikgaXNudCB1bmRlZmluZWRcbiAgICAgICAgRmlsdGVyLnNlbGVjdGVkIGZpbHRlclxuXG4gICAgJChcIi5saXN0aW5nXCIpLm9uICdjbGljaycsICcubGlzdC1oZWFkZXIgPiAuZmlsdGVycyA+IC5maWx0ZXInLCBAaGFuZGxlcnMuZmlsdGVySGFuZGxlclxuICAgICQoXCIubGlzdGluZ1wiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLmZpbHRlcnMgPiAuZmlsdGVyID4gLm9wdGlvbl9zZWxlY3RlZCA+IC5pY29uLmNhbmNlbCcsIEBoYW5kbGVycy5maWx0ZXJDbGVhckhhbmRsZXJcblxuICBkOiAtPlxuICAgIF8ub2ZmIFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiXG4gICAgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dCcpLnZhbCAnJ1xuICAgIEZpbHRlci5oYW5kbGVycy5kKClcbiAgICBMaXN0aW5nLnVuc2VsZWN0QWxsKClcbiAgICAjU3Bpbm5lci5kKClcblxuICBnZXQ6IChzZWFyY2g9bnVsbCkgLT5cbiAgICBTcGlubmVyLmkoJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn0gPiAuaW5uZXIgPiAudmFsdWVzXCIpKVxuXG4gICAgb3B0aW9ucyA9XG4gICAgICB2aWV3OiAnZmlsdGVycydcblxuICAgIG9wdGlvbnMuZGVsZXRlZCA9IHRydWUgaWYgTGlzdGluZy5kZWxldGVkIGlzIHRydWVcblxuICAgIGZvciBpbmRleCwgZmlsdGVyIG9mIEZpbHRlci5maWx0ZXJzXG4gICAgICBpZiBmaWx0ZXIgaXNudCBGaWx0ZXIuZmlsdGVyIGFuZCBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIG9wdGlvbnNbZmlsdGVyICsgJy5uYW1lJ10gPSBRdWVyeS5wYXJhbSBmaWx0ZXJcblxuICAgIG9wdGlvbnMubmFtZSA9IHNlYXJjaCBpZiBzZWFyY2ggaXNudCBudWxsXG5cbiAgICBfLmdldCBcIi9hcGkvI3tAZW5kcG9pbnR9XCIsIG9wdGlvbnNcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcycpLmh0bWwgcmVzcG9uc2Uudmlld1xuICAgICAgU3Bpbm5lci5kKClcblxuICBzZWxlY3Q6IChvcHRpb24pIC0+XG4gICAgUXVlcnkucGFyYW0gJ3BhZ2UnLCBmYWxzZVxuICAgIFF1ZXJ5LnBhcmFtIEZpbHRlci5maWx0ZXIsIG9wdGlvblxuICAgIEZpbHRlci5zZWxlY3RlZCBGaWx0ZXIuZmlsdGVyXG4gICAgRmlsdGVyLmQoKVxuICAgIExpc3RpbmcubG9hZCgpXG5cbiAgc2VsZWN0ZWQ6IChmaWx0ZXIpIC0+XG4gICAgaWYgUXVlcnkucGFyYW0oZmlsdGVyKSBpcyB1bmRlZmluZWRcbiAgICAgICQoXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWQgPiAuY29weVwiKS5odG1sICcnXG4gICAgICBfLm9uIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX2RlZmF1bHRcIlxuICAgICAgXy5vZmYgXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWRcIlxuICAgICAgcmV0dXJuIHRydWVcbiAgICAkKFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkID4gLmNvcHlcIikuaHRtbCBRdWVyeS5wYXJhbSBmaWx0ZXJcbiAgICBfLm9mZiBcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9kZWZhdWx0XCJcbiAgICBfLm9uIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkXCJcblxuICBoYW5kbGVyczpcblxuICAgIGk6IC0+XG5cbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLmxhYmVsID4gLmljb24uY2FuY2VsJywgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAna2V5dXAnLCcgLmlubmVyID4gLnNlYXJjaCA+IGlucHV0JywgQGtleUhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBzZWxlY3RIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ21vdXNlb3ZlcicsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQGhvdmVySGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdibHVyJywgIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2NsaWNrJywgQGluc2lkZUNoZWNrXG5cbiAgICAgICQoZG9jdW1lbnQpLm9uICdjbGljaycsIEBvdXRzaWRlQ2hlY2tcblxuICAgIGQ6IC0+XG5cbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC5sYWJlbCA+IC5pY29uLmNhbmNlbCcsIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdrZXl1cCcsJyAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXQnLCBAa2V5SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnY2xpY2snLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBzZWxlY3RIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdtb3VzZW92ZXInLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBob3ZlckhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2JsdXInLCAgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2NsaWNrJywgQGluc2lkZUNoZWNrXG5cbiAgICAgICQoZG9jdW1lbnQpLm9mZiAnY2xpY2snLCBAb3V0c2lkZUNoZWNrXG5cblxuICAgIGZpbHRlckNsZWFySGFuZGxlcjogLT5cbiAgICAgIGNvbnNvbGUubG9nICdhYm91dCB0byBjbGVhcidcbiAgICAgIEZpbHRlci5maWx0ZXIgPSAkKHRoaXMpLmRhdGEgJ2ZpbHRlcidcbiAgICAgIEZpbHRlci5zZWxlY3QgZmFsc2VcbiAgICAgIEZpbHRlci5kKClcblxuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICBmaWx0ZXJIYW5kbGVyOiAtPlxuICAgICAgRmlsdGVyLmQoKVxuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgRmlsdGVyLmZpbHRlciA9ICQodGhpcykuZGF0YSAnZmlsdGVyJ1xuICAgICAgRmlsdGVyLmVuZHBvaW50ID0gJCh0aGlzKS5kYXRhICdlbmRwb2ludCdcblxuXG4gICAgICBpZiAkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIEZpbHRlci5kKClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgIEZpbHRlci5oYW5kbGVycy5pKClcblxuICAgICAgJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn0gPiAuaW5uZXIgPiAudmFsdWVzXCIpLmh0bWwgJydcbiAgICAgIF8ub24gXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9XCJcbiAgICAgICQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9ID4gLmlubmVyID4gLnNlYXJjaCA+IGlucHV0XCIpLmZvY3VzKClcblxuICAgICAgRmlsdGVyLmdldCgpXG5cbiAgICBpbnNpZGVDaGVjazogLT5cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgb3V0c2lkZUNoZWNrOiAtPlxuICAgICAgRmlsdGVyLmQoKVxuXG4gICAgaG92ZXJIYW5kbGVyOiAtPlxuXG4gICAgICBfLm9mZiAnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUub24nXG4gICAgICBfLm9uICQodGhpcylcblxuICAgIHNlbGVjdEhhbmRsZXI6IC0+XG4gICAgICBGaWx0ZXIuc2VsZWN0ICQodGhpcykuZmluZCgnLm5hbWUnKS5odG1sKClcblxuICAgIGtleUhhbmRsZXI6IC0+XG5cbiAgICAgIGtleSA9IGV2ZW50LmtleUNvZGVcblxuICAgICAgc3dpdGNoIGtleVxuICAgICAgICB3aGVuIDI3IHRoZW4gRmlsdGVyLmQoKVxuICAgICAgICB3aGVuIDQwLCAzOSB0aGVuIEZpbHRlci5uYXYgJ2Rvd24nXG4gICAgICAgIHdoZW4gMzcsMzggdGhlbiBGaWx0ZXIubmF2ICd1cCdcbiAgICAgICAgd2hlbiAxMyB0aGVuIEZpbHRlci5zZWxlY3QgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUub24gPiAubmFtZScpLmh0bWwoKVxuICAgICAgICBlbHNlIEZpbHRlci5nZXQgJCh0aGlzKS52YWwoKVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gIG5hdjogKGRpcikgLT5cblxuICAgIGN1ciA9ICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlLm9uJylcbiAgICBuZXh0ID0gY3VyLm5leHQoKSBpZiBkaXIgaXMgJ2Rvd24nXG4gICAgbmV4dCA9IGN1ci5wcmV2KCkgaWYgZGlyIGlzICd1cCdcbiAgICBfLm9mZiBjdXJcblxuICAgIGlmIG5leHQubGVuZ3RoIGlzbnQgMFxuICAgICAgXy5vbiBuZXh0XG4gICAgICByZXR1cm5cblxuICAgIF8ub24gJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlOmZpcnN0LWNoaWxkJyBpZiBkaXIgaXMgJ2Rvd24nXG4gICAgXy5vbiAnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWU6bGFzdC1jaGlsZCcgaWYgZGlyIGlzICd1cCdcblxuIiwiR2xvYmFsID1cblxuICAjIGtldmluIG9sc29uIChrZXZpbkAyNTYuaW8pIPCfjIDwn463XG5cbiAgd2luZG93OiBmYWxzZVxuICB3aW5kb3dUaW1lcjogZmFsc2VcbiAgaW5pdDogZmFsc2VcbiAgcHJvdGVjdGVkOiBbJ2VudHJpZXMnLCdzdHJ1Y3R1cmVzJywnY2xpZW50cycsJ3VzZXJzJ11cblxuICBpOiAtPlxuICAgIEdsb2JhbC5oYW5kbGVycygpXG4gICAgR2xvYmFsLmxvZ2luQ2hlY2soKVxuXG4gICAgJChcIi5tZW51ID4gLm9wdGlvbl8je1BhZ2V9XCIpLmFkZENsYXNzKCdhY3RpdmUnKSBpZiBQYWdlP1xuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnKS5jbGljayBHbG9iYWwudXNlclByb2ZpbGVIYW5kbGVyXG4gICAgJCgnLm9hdXRocyA+IC5vYXV0aCcpLmNsaWNrIEdsb2JhbC51c2VyT2F1dGhIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiAubG9nb3V0JykuY2xpY2sgR2xvYmFsLmxvZ291dEhhbmRsZXJcbiAgICAkKCcubWVudSA+IC5vcHRpb24nKS5jbGljayBHbG9iYWwubWVudUhhbmRsZXJcblxuICBtZW51SGFuZGxlcjogLT5cbiAgICAkKCcubWVudSA+IC5vcHRpb24nKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICQodGhpcykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICBTcGlubmVyLmkoJCgnaGVhZGVyJykpXG5cbiAgbG9nb3V0SGFuZGxlcjogLT5cblxuICAgIFByb21wdC5pICdMb2dvdXQnLCAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICByZXR1cm4gZmFsc2UgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuXG4gICAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgICAgTWUubG9nb3V0IC0+XG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnBpY3R1cmUnXG4gICAgICAgIE5vdGljZS5pICdMb2dvdXQgc3VjY2Vzc2Z1bCcsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuICAgICAgICAsIDEyMDBcblxuICB1c2VyUHJvZmlsZUhhbmRsZXI6IC0+XG5cbiAgICBvYSA9ICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5vYXV0aHMnKVxuICAgIHRsID0gbmV3IFRpbWVsaW5lTWF4IHJlcGVhdDogMFxuXG4gICAgaWYgb2EuaGFzQ2xhc3MgJ29mZidcbiAgICAgIF8ub24gb2FcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI2NhbmNlbFNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICBlbHNlXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNwcm9maWxlU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgICAgXy5vZmYgb2EsIG9mZmluZzogMC41XG5cbiAgdXNlck9hdXRoSGFuZGxlcjogLT5cblxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICByZXR1cm4gdHJ1ZSBpZiB0eXBlIGlzICdjYW5jZWwnXG5cbiAgICBHbG9iYWwub2F1dGhXaW5kb3cgJy9sb2FkaW5nJ1xuXG4gICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICBwYXJhbXMgPSB7fVxuICAgIHBhcmFtcy5pbnZpdGUgPSBJbnZpdGUuaGFzaCBpZiBJbnZpdGUuaGFzaFxuXG4gICAgTWUub2F1dGggdHlwZSwgcGFyYW1zLCAodXJpKSAtPlxuICAgICAgR2xvYmFsLndpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJpXG5cbiAgb2F1dGhXaW5kb3c6ICh1cmwpIC0+XG4gICAgdyA9IDY0MFxuICAgIGggPSA1NTBcbiAgICBsZWZ0ID0gKHNjcmVlbi53aWR0aC8yKSAtICh3LzIpXG4gICAgdG9wID0gKHNjcmVlbi5oZWlnaHQvMikgLSAoaC8yKVxuXG5cbiAgICBHbG9iYWwud2luZG93ID0gd2luZG93Lm9wZW4odXJsLCAnTG9naW4gLyBSZWdpc3RlcicsIFwidG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPSN7d30saGVpZ2h0PSN7aH0sdG9wPSN7dG9wfSxsZWZ0PSN7bGVmdH1cIilcbiAgICBHbG9iYWwud2luZG93LmZvY3VzIGlmIHdpbmRvdy5mb2N1c1xuICAgIEdsb2JhbC53aW5kb3dUaW1lciA9IHNldEludGVydmFsIC0+XG4gICAgICBpZiBHbG9iYWwud2luZG93LmNsb3NlZFxuICAgICAgICBjbGVhckludGVydmFsIEdsb2JhbC53aW5kb3dUaW1lclxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBjb25zb2xlLmxvZyAnY2xvc2luZyBvdXIgc2hpdGUnXG4gICAgLCA1MFxuXG4gICAgcmV0dXJuXG5cbiAgb2F1dGhDb21wbGV0ZTogKHVzZXIpIC0+XG4gICAgU3Bpbm5lci5kKClcbiAgICBHbG9iYWwubG9naW4gdXNlclxuICAgIE5vdGljZS5pICdMb2dpbiBzdWNjZXNzZnVsJywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgaWYgVXNlci5jbGllbnQgaXNudCB1bmRlZmluZWRcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZW50cmllcydcbiAgICAgIDIwMDBcbiAgICBlbHNlXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcbiAgICAgIDIwMDBcblxuICBsb2dpbjogKHVzZXIpIC0+XG5cbiAgICB3aW5kb3cuVXNlciA9IHVzZXJcblxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5waWN0dXJlID4gLmltYWdlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tVc2VyLnBpY3R1cmV9KVwiXG4gICAgXy5vZmYgJy5tZSA+IC5wcm9maWxlJ1xuICAgIF8ub2ZmICcubWUgPiAub2F1dGhzJ1xuICAgIF8ub24gJy5tZSA+IC5waWN0dXJlJ1xuXG4gICAgaWYgVXNlci5jbGllbnQgaXNudCB1bmRlZmluZWRcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5jbGllbnQgPiAubmFtZScpLmh0bWwgVXNlci5jbGllbnQubmFtZVxuICAgICAgJCgnaGVhZGVyID4gLmlubmVyID4gLmNsaWVudCA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tVc2VyLmNsaWVudC5wcm9maWxlfSlcIlxuICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLmNsaWVudCdcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubG9nbydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vcHRpb25fY2xpZW50cydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vcHRpb25fc3RydWN0dXJlcydcbiAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51J1xuXG4gIGxvZ2luQ2hlY2s6IC0+XG5cbiAgICBNZS5hdXRoZWQgKHJlc3VsdCkgLT5cblxuICAgICAgR2xvYmFsLmxvZ2luKHJlc3VsdCkgaWYgcmVzdWx0IGlzbnQgZmFsc2VcblxuICAgICAgIyBpZiB0aGUgcGFnZSB3ZXJlIG9uIFxuICAgICAgaWYgR2xvYmFsLnByb3RlY3RlZC5pbmRleE9mKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcLy9nLCAnJykpIGlzbnQgLTEgYW5kIHJlc3VsdCBpcyBmYWxzZVxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG5cbiAgICAgIGlmIEdsb2JhbC5pbml0IGlzbnQgZmFsc2UgYW5kICggcmVzdWx0IGlzbnQgZmFsc2Ugb3IgR2xvYmFsLmluaXQgaXMgJ0ludml0ZScgKVxuICAgICAgICB3aW5kb3dbR2xvYmFsLmluaXRdLmkoKVxuXG4gICAgICAjIHR1cm4gb24gYWxsIGxvZ2luIC8gcmVnaXN0cmF0aW9uIGRpdnNcbiAgICAgIGlmIHdpbmRvdy5Vc2VyIGlzIHVuZGVmaW5lZFxuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucHJvZmlsZSdcbiAgICAgICAgXy5vbiAnLnBhZ2UuaG9tZSdcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLmxvZ28nXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5uYW1lJ1xuXG4gICAgICAjIGNsaWVudCBiYXNlZCB1c2VyLCBnbyB0byBlbnRyaWVzXG4gICAgICBpZiBVc2VyPy5jbGllbnQgaXNudCB1bmRlZmluZWQgYW5kIFBhZ2UgaXNudCAnZW50cmllcydcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZW50cmllcydcblxuICAgICAgaWYgd2luZG93LlVzZXIgaXNudCB1bmRlZmluZWQgYW5kIFVzZXIuY2xpZW50IGlzIHVuZGVmaW5lZFxuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubG9nbydcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm5hbWUnXG4gICAgICAgIF8ub24gJy5tZW51J1xuIiwiXy5jb25zdHJ1Y3RvcigpXG5cbmNsYXNzIEluZGV4XG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBoYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnRvcCAuYnVyZ2VyJykuY2xpY2sgQG1vYmlsZVxuXG4gIG1vYmlsZTogLT5cbiAgICBfLnN3YXAgJy50b3AgPiAuYnVyZ2VyJ1xuICAgIF8uc3dhcCAnLnRvcCA+IC5tZW51J1xuIiwiSW52aXRlID1cbiAgaGFzaDogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmludml0ZScpKVxuXG4gICAgaWYgVXNlcj8gaXNudCBmYWxzZVxuICAgICAgU3Bpbm5lci5kKClcbiAgICAgIFByb21wdC5pICdJbnZpdGUgRXJvcnInLCAnWW91IGFyZSBjdXJyZW50bHkgbG9nZ2VkIGluJywgWydPSyddLCB7fSwgLT5cbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuXG4gICAgZWxzZVxuICAgICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvaW52aXRlXFwvKFswLTlhLWZBLUZdezh9KS9cbiAgICAgICAgQGhhc2ggPSBtYXRjaFsxXVxuICAgICAgICBAbG9hZCBAaGFzaFxuICAgICAgZWxzZVxuXG4gIGxvYWQ6IChoYXNoKSAtPlxuXG4gICAgXy5nZXQgJy9hcGkvaW52aXRlL2dldCcsXG4gICAgICBoYXNoOiBoYXNoXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzdWx0KSAtPlxuICAgICAgaW52aXRlID0gcmVzdWx0LmRhdGEuaW52aXRlXG5cbiAgICAgICQoJy5wYWdlLmludml0ZSA+IC5wcm9maWxlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJyxcInVybCgje2ludml0ZS5jbGllbnQucHJvZmlsZX0pXCJcbiAgICAgICQoJy5wYWdlLmludml0ZSA+IC50aXRsZScpLmh0bWwgaW52aXRlLmNsaWVudC5uYW1lXG4iLCJMaXN0aW5nID1cbiAgY29udGVudDogZmFsc2VcbiAgc2VsZWN0ZWQ6IFtdXG4gIGZpbHRlcnM6IFtdXG4gIHNlbGVjdGVkQ3Vyc29yOiAwXG4gIGRlbGV0ZWQ6IGZhbHNlXG5cbiAgb3RoZXJBY3Rpb25zOiBmYWxzZVxuXG4gIGk6IChjb250ZW50LCBvdGhlckFjdGlvbnM9ZmFsc2UsIGZpbHRlcnM9W10pIC0+XG5cbiAgICBAZmlsdGVycyA9IGZpbHRlcnNcbiAgICBAY29udGVudCA9IGNvbnRlbnRcbiAgICBAb3RoZXJBY3Rpb25zID0gb3RoZXJBY3Rpb25zXG5cbiAgICBpZiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCdkZWxldGVkJykgaXNudCAtMVxuICAgICAgXy5vbiBcIi5wYWdlLiN7QGNvbnRlbnR9ID4gLmFjdGl2ZS5kZWxldGVkXCJcbiAgICAgIEBkZWxldGVkID0gdHJ1ZVxuICAgICAgXy5vZmYgJy5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uLmRlbGV0ZSdcbiAgICAgIF8ub24gJy5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uLnJlc3RvcmUnXG4gICAgICBfLm9uICcuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbi5mb3JjZSdcbiAgICAgIF8ub2ZmIFwiLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb25fI3tMaXN0aW5nLmNvbnRlbnR9XCJcbiAgICBlbHNlXG4gICAgICBfLm9uICQoXCIucGFnZS4je0Bjb250ZW50fSA+IC5kZWxldGVkXCIpLm5vdCAnLmFjdGl2ZSdcbiAgICAgIF8ub24gXCIuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbl8je0xpc3RpbmcuY29udGVudH1cIlxuXG4gICAgU2VhcmNoLmkoKVxuICAgIEBsb2FkKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgRmlsdGVyLmkgQGZpbHRlcnMgaWYgQGZpbHRlcnMubGVuZ3RoID4gMFxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLmNoZWNrYm94JywgQGNoZWNrYm94SGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLnN3aXRjaCcsIEBzd2l0Y2hIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjaGFuZ2UnLCAnLmxpc3QtaGVhZGVyID4gLmNoZWNrYm94ID4gaW5wdXQnLCBAc2VsZWN0QWxsSGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2hhbmdlJywgJy5jaGVja2JveCA+IGlucHV0JywgQHN0YXRlSGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb24nLCBAYWN0aW9uSGFuZGxlclxuXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICc+IC5pbm5lciA+IC5wYWdpbmF0ZSA+IC5pbm5lciA+IC5udW0nLCBAcGFnZUhhbmRsZXJcblxuICBjaGVja2JveEhhbmRsZXI6IC0+XG4gICAgY2IgPSAkKHRoaXMpLmZpbmQgJ2lucHV0J1xuICAgIGlmIGV2ZW50LnRhcmdldC50eXBlIGlzbnQgJ2NoZWNrYm94J1xuICAgICAgY2JbMF0uY2hlY2tlZCA9ICFjYlswXS5jaGVja2VkXG4gICAgICBjYi5jaGFuZ2UoKVxuXG4gIHN3aXRjaEhhbmRsZXI6IC0+XG5cbiAgICBlbCA9ICQodGhpcylcblxuICAgIF9pZCA9IGVsLmRhdGEgJ19pZCdcbiAgICBuYW1lID0gZWwuZGF0YSAnbmFtZSdcbiAgICB2YWx1ZSA9ICFlbC5oYXNDbGFzcyAnb24nXG5cbiAgICBMaXN0aW5nLnRvZ2dsZSBbX2lkXSwgbmFtZSwgdmFsdWUsIC0+XG4gICAgICBfLnN3YXAgZWxcblxuICB0b2dnbGU6IChpZHMsIG5hbWUsIHZhbHVlLCBjb21wbGV0ZSkgLT5cblxuICAgIGlkcy5mb3JFYWNoIChfaWQsIGluZGV4KSAtPlxuXG4gICAgICBvcHRpb25zID0ge31cbiAgICAgIG9wdGlvbnNbbmFtZV0gPSB2YWx1ZVxuXG4gICAgICBfLmdldCBcIi9hcGkvI3tMaXN0aW5nLmNvbnRlbnR9L3VwZGF0ZS8je19pZH1cIixcbiAgICAgICAgb3B0aW9uc1xuICAgICAgLmRvbmUgKHJlc3Bvc25lKSAtPlxuICAgICAgICBpZiBpbmRleCBpcyBpZHMubGVuZ3RoLTFcbiAgICAgICAgICBOb3RpY2UuaSBcIlVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICAgIGNvbXBsZXRlPygpXG5cbiAgc2VsZWN0QWxsSGFuZGxlcjogLT5cbiAgICBpZiB0aGlzLmNoZWNrZWRcbiAgICAgICQoJy5saXN0aW5nID4gLmlubmVyID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLnByb3AgJ2NoZWNrZWQnLCB0cnVlXG4gICAgZWxzZVxuICAgICAgJCgnLmxpc3RpbmcgPiAuaW5uZXIgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykucHJvcCAnY2hlY2tlZCcsIGZhbHNlXG5cbiAgdW5zZWxlY3RBbGw6IC0+XG4gICAgICAkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9ID4gLmlubmVyID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dFwiKS5wcm9wICdjaGVja2VkJywgZmFsc2VcbiAgICAgICQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH0gPiAubGlzdC1oZWFkZXIgPiAuY2hlY2tib3ggPiBpbnB1dFwiKS5wcm9wICdjaGVja2VkJywgZmFsc2VcbiAgICAgIExpc3Rpbmcuc3RhdGVIYW5kbGVyKClcblxuICBzdGF0ZUhhbmRsZXI6IC0+XG4gICAgaWRzID0gW11cblxuICAgICQoJy5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXQnKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIGlmIGVsLmNoZWNrZWRcbiAgICAgICAgaWRzLnB1c2ggJChlbCkuZGF0YSAnX2lkJ1xuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG4gICAgICBpZiBpZHMubGVuZ3RoID4gMFxuICAgICAgICAkKCcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zID4gLmNvcHkgPiAudmFsdWUnKS50ZXh0IGlkcy5sZW5ndGhcbiAgICAgICAgXy5vZmYgJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzJ1xuICAgICAgICBfLm9uICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zJ1xuICAgICAgZWxzZVxuICAgICAgICBfLm9uICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cydcbiAgICAgICAgXy5vZmYgJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMnXG4gICAgICBMaXN0aW5nLnNlbGVjdGVkID0gaWRzXG5cbiAgcGFnZUxpbmtzOiAtPlxuICAgIHBhcmFtcyA9IFF1ZXJ5LnBhcmFtcygpXG4gICAgJCgnLnBhZ2luYXRlID4gLmlubmVyID4gLm51bScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgcGFnZSA9ICQoZWwpLmRhdGEgJ3BhZ2UnXG4gICAgICByZXR1cm4gaWYgcGFnZSBpcyB1bmRlZmluZWRcbiAgICAgIHBhcmFtcy5wYWdlID0gcGFnZVxuICAgICAgcXVlcnkgPSBRdWVyeS5zdHJpbmdpZnkgcGFyYW1zXG4gICAgICAkKGVsKS5hdHRyICdocmVmJywgXCI/I3tRdWVyeS5zdHJpbmdpZnkocGFyYW1zKX1cIlxuXG4gIHBhZ2VIYW5kbGVyOiAtPlxuICAgIHBhZ2UgPSAkKHRoaXMpLmRhdGEgJ3BhZ2UnXG4gICAgcmV0dXJuIHRydWUgaWYgcGFnZSBpcyB1bmRlZmluZWRcbiAgICBMaXN0aW5nLnVuc2VsZWN0QWxsKClcbiAgICBRdWVyeS5wYXJhbSAncGFnZScsIHBhZ2VcbiAgICBMaXN0aW5nLmxvYWQoKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGFjdGlvbkhhbmRsZXI6IC0+XG4gICAgdHlwZSA9ICQodGhpcykuZGF0YSAndHlwZSdcblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdkZWxldGUnXG4gICAgICAgIFByb21wdC5pIFwiRGVsZXRpbmcgI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gaXRlbShzKVwiLFxuICAgICAgICAgICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZXNlPycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmV0dXJuIHRydWUgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuICAgICAgICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCgpXG4gICAgICB3aGVuICdyZXN0b3JlJ1xuICAgICAgICBQcm9tcHQuaSBcIlJlc3RvcmluZyAje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBpdGVtKHMpXCIsXG4gICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZXN0b3JlIHRoZXNlPycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmV0dXJuIHRydWUgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuICAgICAgICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCAwLCAncmVzdG9yZSdcbiAgICAgIHdoZW4gJ2ZvcmNlJ1xuICAgICAgICBQcm9tcHQuaSBcIkRlbGV0aW5nICN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IGl0ZW0ocylcIixcbiAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIFBFUk1BTkVOVExZIGRlbGV0ZSB0aGVzZT8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJldHVybiB0cnVlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcbiAgICAgICAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQgMCwgJ2ZvcmNlJ1xuXG4gICAgICB3aGVuICdwdWJsaXNoJywgJ2hpZGUnXG5cbiAgICAgICAgdmFsdWUgPSAodHlwZSBpcyAncHVibGlzaCcpXG4gICAgICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuICAgICAgICBMaXN0aW5nLnRvZ2dsZSBMaXN0aW5nLnNlbGVjdGVkLCAnYWN0aXZlJywgdmFsdWUsIC0+XG5cbiAgICAgICAgICAkKCcuc3dpdGNoLmFjdGl2ZScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgICAgICAgZm9yIF9pZCBpbiBMaXN0aW5nLnNlbGVjdGVkXG4gICAgICAgICAgICAgIF8ub24gJChlbCkgaWYgX2lkIGlzICQoZWwpLmRhdGEoJ19pZCcpIGFuZCB2YWx1ZSBpcyB0cnVlXG4gICAgICAgICAgICAgIF8ub2ZmICQoZWwpIGlmIF9pZCBpcyAkKGVsKS5kYXRhKCdfaWQnKSBhbmQgdmFsdWUgaXMgZmFsc2VcblxuICAgICAgICAgIGlmIHZhbHVlXG4gICAgICAgICAgICBOb3RpY2UuaSBcIiN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IEVudHJpZXMgcHVibGlzaGVkXCIsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIE5vdGljZS5pIFwiI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gRW50cmllcyBoaWRkZW5cIiwgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgU3Bpbm5lci5kKClcblxuXG4gICAgICBlbHNlXG4gICAgICAgIExpc3Rpbmcub3RoZXJBY3Rpb25zKHR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgZGVsZXRlOiAoaWQsdHlwZT0nZGVsZXRlJyxjYWxsYmFjaykgLT5cblxuICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuICAgIF8uZ2V0IFwiL2FwaS8je0xpc3RpbmcuY29udGVudH0vI3t0eXBlfS8je2lkfVwiXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBjYWxsYmFjayB0cnVlXG4gICAgLmZhaWwgLT5cbiAgICAgIGNhbGxiYWNrIGZhbHNlXG5cbiAgZGVsZXRlU2VsZWN0ZWQ6IChjdXJzb3I9MCx0eXBlPSdkZWxldGUnKSAtPlxuXG4gICAgaWYgTGlzdGluZy5zZWxlY3RlZC5sZW5ndGggaXMgY3Vyc29yXG4gICAgICBpZiB0eXBlIGlzICdkZWxldGUnXG4gICAgICAgIE5vdGljZS5pICdEZWxldGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgaWYgdHlwZSBpcyAncmVzdG9yZSdcbiAgICAgICAgTm90aWNlLmkgJ1Jlc3RvcmVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgaWYgdHlwZSBpcyAnZm9yY2UnXG4gICAgICAgIE5vdGljZS5pICdQZXJtYW5lbnRseSBkZWxldGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgTGlzdGluZy51bnNlbGVjdEFsbCgpXG4gICAgICBAbG9hZCgpXG5cbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBMaXN0aW5nLmRlbGV0ZSBMaXN0aW5nLnNlbGVjdGVkW2N1cnNvcl0sdHlwZSwgKHJlc3VsdCkgLT5cbiAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQoKytjdXJzb3IsIHR5cGUpIGlmIHJlc3VsdCBpcyB0cnVlXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuXG4gICAgb3B0aW9ucyA9IHZpZXc6IHRydWVcblxuICAgIG9wdGlvbnMuZGVsZXRlZCA9IHRydWUgaWYgTGlzdGluZy5kZWxldGVkIGlzIHRydWVcblxuICAgIGZvciBmaWx0ZXIgaW4gQGZpbHRlcnNcbiAgICAgIGlmIFF1ZXJ5LnBhcmFtKGZpbHRlcikgaXNudCB1bmRlZmluZWRcbiAgICAgICAgb3B0aW9uc1tmaWx0ZXIgKyAnLm5hbWUnXSA9IFF1ZXJ5LnBhcmFtIGZpbHRlclxuICAgIGlmIFF1ZXJ5LnBhcmFtKCdwYWdlJykgaXNudCB1bmRlZmluZWRcbiAgICAgIG9wdGlvbnMucGFnZSA9IFF1ZXJ5LnBhcmFtICdwYWdlJ1xuICAgIGlmIFF1ZXJ5LnBhcmFtKCdzZWFyY2gnKSBpc250IHVuZGVmaW5lZFxuICAgICAgb3B0aW9ucy5zZWFyY2ggPSBRdWVyeS5wYXJhbSAnc2VhcmNoJ1xuXG4gICAgXy5nZXQgXCIvYXBpLyN7QGNvbnRlbnR9XCIsIG9wdGlvbnNcbiAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICBUaW1lLmkoKVxuICAgICAgU3Bpbm5lci5kKClcbiAgICAgICQoJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzID4gLmNvcHkgPiAudmFsdWUnKS50ZXh0IHJlc3BvbnNlLnBhZ2luYXRlLnRvdGFsXG4gICAgICAkKFwiLiN7QGNvbnRlbnR9ID4gLmNvbnRlbnQgPiAubGlzdGluZyA+IC5pbm5lclwiKS5odG1sIHJlc3BvbnNlLnZpZXdcbiAgICAgIExpc3RpbmcucGFnZUxpbmtzKClcblxuXG4iLCIiLCJNZSA9XG5cbiAgbG9nb3V0OiAoY29tcGxldGUpIC0+XG5cbiAgICBfLmdldCAnL2FwaS9hdXRoL2xvZ291dCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgY29tcGxldGUoKVxuXG4gIG9hdXRoOiAodHlwZSwgcGFyYW1zPXt9LCBjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0IFwiL2FwaS9hdXRoLyN7dHlwZX1cIiwgcGFyYW1zXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIGNvbXBsZXRlKHJlc3BvbnNlLmRhdGEudXJpKVxuXG4gIGF1dGhlZDogKHJlc3VsdCkgLT5cbiAgICBfLmdldCAnL2FwaS9hdXRoJ1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICByZXN1bHQgcmVzcG9uc2UuZGF0YS51c2VyXG5cbiAgZ2V0OlxuICAgIGNsaWVudElkOiAtPlxuICAgICAgcmV0dXJuIFVzZXIuY2xpZW50LmlkXG4iLCJOb3Rmb3VuZCA9XG4gIGk6IC0+XG4gICAgJCgnI2xpbmVlcnJvcicpLm5vdmFjYW5jeVxuICAgICAgJ3JlYmxpbmtQcm9iYWJpbGl0eSc6IDAuMVxuICAgICAgJ2JsaW5rTWluJzogMC4yXG4gICAgICAnYmxpbmtNYXgnOiAwLjZcbiAgICAgICdsb29wTWluJzogOFxuICAgICAgJ2xvb3BNYXgnOiAxMFxuICAgICAgJ2NvbG9yJzogJyNmZmZmZmYnXG4gICAgICAnZ2xvdyc6IFsnMCAwIDgwcHggI2ZmZmZmZicsICcwIDAgMzBweCAjMDA4MDAwJywgJzAgMCA2cHggIzAwMDBmZiddXG5cbiAgICAkKCcjbGluZWNvZGUnKS5ub3ZhY2FuY3lcbiAgICAgICdibGluayc6IDFcbiAgICAgICdvZmYnOiAxXG4gICAgICAnY29sb3InOiAnUmVkJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4IFJlZCcsICcwIDAgMzBweCBGaXJlQnJpY2snLCAnMCAwIDZweCBEYXJrUmVkJ11cbiIsIk5vdGljZSA9XG5cbiAgdHlwZXM6IFsnaW5mbycsJ3N1Y2Nlc3MnLCd3YXJuaW5nJ11cblxuICBlbDogZmFsc2VcblxuICBvbjogZmFsc2VcbiAgcHJvZ3Jlc3M6IGZhbHNlXG4gIHRpbWVvdXQ6IGZhbHNlXG4gIGNsb3NlOiB0cnVlXG5cbiAgZGVmYXVsdDpcbiAgICB0eXBlOiAnaW5mbydcbiAgICBwcm9ncmVzczogZmFsc2VcbiAgICB0aW1lb3V0OiA1MDAwXG5cbiAgaTogKGNvcHksb3B0aW9ucz17fSkgLT5cblxuICAgIEBvcHRpb25zID0gT2JqZWN0LmFzc2lnbiB7fSwgQGRlZmF1bHRcblxuICAgIGZvciBrZXksIHBhcmFtIG9mIG9wdGlvbnNcbiAgICAgIEBvcHRpb25zW2tleV0gPSBwYXJhbVxuXG4gICAgQGVsID0gJCgnLm5vdGljZScpIGlmIEBlbCBpcyBmYWxzZVxuXG4gICAgZm9yIGR0eXBlIGluIEB0eXBlc1xuICAgICAgQGVsLnJlbW92ZUNsYXNzIGR0eXBlXG4gICAgQGVsLmFkZENsYXNzIEBvcHRpb25zLnR5cGVcbiAgICBAZWwuZmluZCgnLmNvcHkgPiAubWVzc2FnZScpLmh0bWwgY29weVxuXG4gICAgaWYgQG9wdGlvbnMucHJvZ3Jlc3MgaXNudCBmYWxzZVxuICAgICAgaWYgQHByb2dyZXNzIGlzIGZhbHNlXG4gICAgICAgIF8ub24gQGVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgICAgICBAcHJvZ3Jlc3MgPSB0cnVlXG4gICAgICBpZiBAY2xvc2UgaXMgdHJ1ZVxuICAgICAgICBfLm9mZiBAZWwuZmluZCgnLmNsb3NlJylcbiAgICAgICAgQGNsb3NlID0gZmFsc2VcbiAgICAgIGlmIEBvbiBpcyBmYWxzZVxuICAgICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgICAgQGVsLmZpbmQoJy5mdWxsJykuY3NzKCd3aWR0aCcsIEBvcHRpb25zLnByb2dyZXNzKjEwMCArICclJylcbiAgICAgICAgLCAxMDBcbiAgICAgIGVsc2VcbiAgICAgICAgQGVsLmZpbmQoJy5mdWxsJykuY3NzKCd3aWR0aCcsIEBvcHRpb25zLnByb2dyZXNzKjEwMCArICclJylcblxuICAgIGlmIEBvcHRpb25zLnByb2dyZXNzIGlzIGZhbHNlIGFuZCBAcHJvZ3Jlc3MgaXMgdHJ1ZVxuICAgICAgQGVsLmZpbmQoJy5mdWxsJykuY3NzKCd3aWR0aCcsICcwJScpXG4gICAgICBfLm9mZiBAZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgICBAcHJvZ3Jlc3MgPSBmYWxzZVxuICAgICAgXy5vbiBAZWwuZmluZCgnLmNsb3NlJylcbiAgICAgIEBjbG9zZSA9IHRydWVcblxuICAgIGlmIEBvbiBpcyBmYWxzZVxuICAgICAgXy5vbiBAZWxcbiAgICAgIEBoYW5kbGVycy5vbigpXG4gICAgICBAb24gPSB0cnVlXG5cbiAgICBpZiBAb3B0aW9ucy50aW1lb3V0IGlzbnQgZmFsc2UgYW5kIEBvcHRpb25zLnByb2dyZXNzIGlzIGZhbHNlXG4gICAgICBAdGltZW91dCA9IHNldFRpbWVvdXQgPT5cbiAgICAgICAgQGQoKVxuICAgICAgLCBAb3B0aW9ucy50aW1lb3V0XG5cbiAgaGFuZGxlcnM6XG4gICAgb246IC0+XG4gICAgICAkKCcubm90aWNlJykub24gJ2NsaWNrJywgJy5pbm5lciA+IC5jbG9zZSA+IC5pbm5lcicsIE5vdGljZS5kXG4gICAgb2ZmOiAtPlxuICAgICAgJCgnLm5vdGljZScpLm9mZiAnY2xpY2snLCAnLmlubmVyID4gLmNsb3NlID4gLmlubmVyJywgTm90aWNlLmRcblxuICBkOiAtPlxuICAgIGNsZWFyVGltZW91dCBOb3RpY2UudGltZW91dCBpZiBOb3RpY2UudGltZW91dCBpc250IGZhbHNlXG4gICAgTm90aWNlLnRpbWVvdXQgPSBmYWxzZVxuICAgIE5vdGljZS5oYW5kbGVycy5vZmYoKVxuICAgIF8ub24gTm90aWNlLmVsLmZpbmQoJy5jbG9zZScpXG4gICAgTm90aWNlLmNsb3NlID0gdHJ1ZVxuICAgIF8ub2ZmIE5vdGljZS5lbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICBOb3RpY2UucHJvZ3Jlc3MgPSBmYWxzZVxuICAgIF8ub2ZmIE5vdGljZS5lbCwgb2ZmaW5nOiB0cnVlLCBvZmZ0aW1lOiAwLjJcbiAgICBOb3RpY2Uub24gPSBmYWxzZVxuIiwiUHJvbXB0ID1cbiAgZWw6IHt9XG4gIG9wdGlvbnM6IHt9XG4gIGNhbGxiYWNrOiBmYWxzZVxuICBwYXJhbXM6IHt9XG5cbiAgaTogKHRpdGxlLCBjb3B5LCBvcHRpb25zPVsnT0snXSwgcGFyYW1zLCBjYWxsYmFjaykgLT5cblxuICAgIFByb21wdC5jYWxsYmFjayA9IGZhbHNlXG4gICAgUHJvbXB0LnBhcmFtcyA9IGZhbHNlXG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBwYXJhbXMgaWYgdHlwZW9mIHBhcmFtcyBpcyAnZnVuY3Rpb24nXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gY2FsbGJhY2sgaWYgdHlwZW9mIGNhbGxiYWNrIGlzICdmdW5jdGlvbidcblxuICAgIFByb21wdC5wYXJhbXMgPSBwYXJhbXMgaWYgdHlwZW9mIHBhcmFtcyBpcyAnb2JqZWN0J1xuXG4gICAgUHJvbXB0LmVsID0gJCAnLnByb21wdCdcblxuICAgIFByb21wdC5lbC5maW5kICcudGl0bGUnXG4gICAgICAuaHRtbCB0aXRsZVxuICAgICAgLmF0dHIgJ3RpdGxlJywgdGl0bGVcbiAgICBQcm9tcHQuZWwuZmluZCAnLmNvcHknXG4gICAgICAuaHRtbCBjb3B5XG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAndGV4dGFyZWEnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLnRleHRhcmVhIGlzIHRydWVcbiAgICAgIF8ub24gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICAgIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCBwYXJhbXMudmFsdWVcblxuICAgIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCcgYW5kICdjbGlwYm9hcmQnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLmNsaXBib2FyZCBpcyB0cnVlXG4gICAgICBpbnB1dCA9IFByb21wdC5lbC5maW5kICcuaW5wdXQnXG4gICAgICBfLm9uIGlucHV0XG4gICAgICBpbnB1dC5maW5kKCdpbnB1dCcpLnZhbCBwYXJhbXMudmFsdWVcblxuXG4gICAgUHJvbXB0Lm9wdGlvbnMgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbnMgPiAub3B0aW9uJ1xuICAgIF8ub2ZmIFByb21wdC5vcHRpb25zXG4gICAgUHJvbXB0Lm9wdGlvbnMucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmFkZENsYXNzICdhY3RpdmUnXG5cbiAgICBmb3IgbyxpIGluIG9wdGlvbnNcbiAgICAgIG9wdGlvbiA9IFByb21wdC5lbC5maW5kIFwiLm9wdGlvbnMgID4gLm9wdGlvbl8je2krMX1cIlxuICAgICAgXy5vbiBvcHRpb25cbiAgICAgIG9wdGlvbi5odG1sIG9cbiAgICAgICAgLmRhdGEgJ3ZhbHVlJywgb1xuXG4gICAgXy5vbiBQcm9tcHQuZWwsXG4gICAgXy5vbiAnLmJmYWRlJ1xuXG4gICAgUHJvbXB0LmhhbmRsZXJzKClcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmZvY3VzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKGRvY3VtZW50KS5rZXlkb3duIFByb21wdC5rZXlkb3duXG4gICAgUHJvbXB0Lm9wdGlvbnMub24gJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbm5lciA+IC5jYW5jZWwnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2FuY2VsXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5jbGlwYm9hcmQnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2xpcGJvYXJkXG5cblxuICBjbGlwYm9hcmQ6IC0+XG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbnB1dCA+IGlucHV0Jykuc2VsZWN0KClcbiAgICBpZiBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG4gICAgICBOb3RpY2UuaSAnQ29waWVkIHRvIGNsaXBib2FyZCcsIHR5cGU6ICdzdWNjZXNzJ1xuICAgIGVsc2VcbiAgICAgIE5vdGljZS5pICdVbmFibGUgdG8gY2xpcGJvYXJkJywgdHlwZTogJ3dhcm5pbmcnXG5cbiAga2V5ZG93bjogLT5cbiAgICBrID0gZXZlbnQud2hpY2hcbiAgICBrZXlzID0gWzM5LCA5LCAzNywgMTMsIDI3XVxuICAgIHJldHVybiB0cnVlIGlmIGsgbm90IGluIGtleXNcblxuICAgIGN1cnJlbnQgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbi5vbi5hY3RpdmUnXG4gICAgc2hpZnQgPSB3aW5kb3cuZXZlbnQuc2hpZnRLZXlcblxuICAgIGlmIGsgaXMgMzkgb3IgKGsgaXMgOSBhbmQgIXNoaWZ0KVxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgaWYgY3VycmVudC5uZXh0KCkuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBjdXJyZW50Lm5leHQoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgZWxzZVxuICAgICAgICBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbl8xJykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAzNyBvciAoayBpcyA5IGFuZCBzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQucHJldigpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5wcmV2KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24ub24nKS5sYXN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAxM1xuICAgICAgUHJvbXB0LnRyaWdnZXIgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24uYWN0aXZlJykuZGF0YSAndmFsdWUnXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZiBrIGlzIDI3XG4gICAgICBQcm9tcHQudHJpZ2dlcihmYWxzZSlcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gIGNhbmNlbDogLT5cbiAgICBQcm9tcHQudHJpZ2dlciBmYWxzZVxuXG4gIGNsaWNrOiAtPlxuICAgIFByb21wdC50cmlnZ2VyICQodGhpcykuZGF0YSAndmFsdWUnXG5cbiAgdHJpZ2dlcjogKHZhbHVlKSAtPlxuICAgIF8ub2ZmIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgXy5vZmYgUHJvbXB0LmVsLCBvZmZpbmc6IGZhbHNlLCBvZmZ0aW1lOiAwLjJcbiAgICAjXy5vZmYgJy5iZmFkZScsIG9mZmluZzogZmFsc2UsIG9mZml0bWU6IDAuMlxuICAgIF8ub2ZmICcuYmZhZGUnXG4gICAgUHJvbXB0Lm9wdGlvbnMudW5iaW5kICdjbGljaycsIFByb21wdC5jbGlja1xuICAgICQoZG9jdW1lbnQpLnVuYmluZCAna2V5ZG93bicsIFByb21wdC5rZXlkb3duXG4gICAgaWYgUHJvbXB0LnBhcmFtcy50ZXh0YXJlYVxuICAgICAgdmFsID0gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsKClcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gcmVzcG9uc2U6IHZhbHVlLCB2YWw6IHZhbFxuICAgIGVsc2VcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gdmFsdWVcbiIsIlF1ZXJ5ID1cblxuICBnZXRRdWVyeTogLT5cbiAgICByZXR1cm4gbG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpXG5cbiAgc2V0UXVlcnk6IChwYXJhbXMpIC0+XG4gICAgcXVlcnkgPSBxcy5zdHJpbmdpZnkgcGFyYW1zXG4gICAgaWYgcXVlcnkgaXMgdW5kZWZpbmVkIG9yIHF1ZXJ5IGlzICcnXG4gICAgICBoaXN0b3J5LnB1c2hTdGF0ZSBudWxsLCBudWxsLCBsb2NhdGlvbi5wYXRobmFtZVxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGhpc3RvcnkucHVzaFN0YXRlIG51bGwsIG51bGwsIGxvY2F0aW9uLnBhdGhuYW1lICsgJz8nICsgcXVlcnlcbiAgICBcbiAgcGFyYW06IChrZXksIHZhbHVlKSAtPlxuXG4gICAgcXVlcnkgPSBAZ2V0UXVlcnkoKVxuXG4gICAgcGFyYW1zID0gcXMucGFyc2UgcXVlcnlcblxuICAgIHJldHVybiBwYXJhbXNba2V5XSBpZiB2YWx1ZSBpcyB1bmRlZmluZWRcblxuICAgIGlmIHZhbHVlIGlzIGZhbHNlXG4gICAgICBkZWxldGUgcGFyYW1zW2tleV1cbiAgICBlbHNlXG4gICAgICBwYXJhbXNba2V5XSA9IHZhbHVlXG4gICAgQHNldFF1ZXJ5IHBhcmFtc1xuXG4gIHBhcmFtczogLT5cbiAgICByZXR1cm4gcXMucGFyc2UgQGdldFF1ZXJ5KClcblxuICBzdHJpbmdpZnk6IChwYXJhbXMpIC0+XG4gICAgcmV0dXJuIHFzLnN0cmluZ2lmeSBwYXJhbXNcblxuIiwiU2VhcmNoID1cblxuICBpOiAtPlxuXG4gICAgaWYgUXVlcnkucGFyYW0oJ3NlYXJjaCcpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAkKCcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gaW5wdXQnKS52YWwgUXVlcnkucGFyYW0gJ3NlYXJjaCdcbiAgICAgICQoJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiBpbnB1dCcpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBfLm9uICcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gLmNhbmNlbCdcblxuICAgIEBoYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLmxpc3RpbmcnKS5vbiAnY2xpY2snLCAnLmNhbmNlbCcsIEBjYW5jZWxIYW5kbGVyXG4gICAgJCgnLmxpc3RpbmcnKS5vbiAna2V5dXAnLCAnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IGlucHV0JywgQHNlYXJjaEhhbmRsZXJcblxuICBjYW5jZWxIYW5kbGVyOiAtPlxuICAgICQoJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiBpbnB1dCcpLnZhbCAnJ1xuICAgIF8ub2ZmICcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gLmNhbmNlbCdcbiAgICAkKCcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gaW5wdXQnKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIGlmIFF1ZXJ5LnBhcmFtKCdzZWFyY2gnKSBpc250IHVuZGVmaW5lZFxuICAgICAgUXVlcnkucGFyYW0gJ3NlYXJjaCcsIGZhbHNlXG4gICAgICBMaXN0aW5nLmxvYWQoKVxuXG4gIHNlYXJjaEhhbmRsZXI6IC0+XG5cbiAgICBrZXkgPSBldmVudC5rZXlDb2RlXG5cbiAgICB2YWwgPSAkKHRoaXMpLnZhbCgpXG5cbiAgICBpZiB2YWwgaXNudCAnJ1xuICAgICAgJCgnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IGlucHV0JykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIF8ub24gJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiAuY2FuY2VsJ1xuICAgIGVsc2VcbiAgICAgICQoJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiBpbnB1dCcpLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBfLm9mZiAnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IC5jYW5jZWwnXG5cbiAgICBpZiBrZXkgaXMgMTNcbiAgICAgIFF1ZXJ5LnBhcmFtKCdzZWFyY2gnLCB2YWwpXG4gICAgICBMaXN0aW5nLmxvYWQoKVxuXG5cbiIsIlNlbGVjdGl6ZSA9XG5cbiAgY2xpZW50czogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0Q2xpZW50ID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIENsaWVudCBcIlxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PiN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS9jbGllbnRzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RDbGllbnQuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0Q2xpZW50XG5cbiAgc3RydWN0dXJlczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG5cbiAgICBzZWxlY3RTdHJ1Y3R1cmUgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIGEgU3RydWN0dXJlICAgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgb3Blbk9uRm9jdXM6IHRydWVcbiAgICAgIG9uTG9hZDogRW50cnkuc3RydWN0dXJlU3BlY2lmaWVkXG4gICAgICByZW5kZXI6XG4gICAgICAgIGl0ZW06IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj48aW1nIGNsYXNzPVxcXCJwcm9maWxlXFxcIiBzcmM9XFxcIiN7aXRlbS5jbGllbnRQcm9maWxlfVxcXCIvPiAje2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj48aW1nIGNsYXNzPVxcXCJwcm9maWxlXFxcIiBzcmM9XFxcIiN7aXRlbS5jbGllbnRQcm9maWxlfVxcXCIvPiAje2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lLCBjbGllbnROYW1lOiBpdGVtLmNsaWVudC5uYW1lLCBjbGllbnRQcm9maWxlOiBpdGVtLmNsaWVudC5wcm9maWxlXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0U3RydWN0dXJlLmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdFN0cnVjdHVyZVxuXG4gIHVzZXJzOiAoZWxlbWVudCwgaGFuZGxlciwgb3B0aW9ucykgLT5cbiAgICBzZWxlY3RVc2VyID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsdWdpbnM6IFsncmVtb3ZlX2J1dHRvbiddXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXYgc3R5bGU9J2xpbmUtaGVpZ2h0OiAzMHB4Oyc+I3tpdGVtLm5hbWV9ICgje2l0ZW0uZW1haWx9KSA8aW1nIHNyYz0nI3tpdGVtLnBpY3R1cmV9JyBzdHlsZT0nZmxvYXQ6IGxlZnQ7IHdpZHRoOiAzMHB4OyBoZWlnaHQ6IDMwcHg7IG1hcmdpbi1yaWdodDogMTBweDsnIC8+PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL3VzZXJzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWUsIGVtYWlsOiBpdGVtLmVtYWlsLCBwaWN0dXJlOiBpdGVtLnBpY3R1cmVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RVc2VyLmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdFVzZXJcblxuXG4iLCJcblNwaW5uZXIgPVxuXG4gIHN0YXRlOiBmYWxzZVxuXG4gIGVsOiB7fVxuXG4gIGk6IChlbCwgb3ZlcnJpZGUpIC0+XG5cbiAgICBAZWwgPSAkKCcuc3Bpbm5lcicpXG5cbiAgICByZWN0ID0gZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGNvb3JkcyA9XG4gICAgICB0b3A6IFwiI3tyZWN0LnRvcCArICQod2luZG93KS5zY3JvbGxUb3AoKX1weFwiXG4gICAgICBsZWZ0OiBcIiN7cmVjdC5sZWZ0fXB4XCJcbiAgICAgIHdpZHRoOiBcIiN7cmVjdC53aWR0aH1weFwiXG4gICAgICBoZWlnaHQ6IFwiI3tyZWN0LmhlaWdodH1weFwiXG5cbiAgICBpZiBvdmVycmlkZSBpc250IHVuZGVmaW5lZFxuICAgICAgZm9yIGtleSwgY29vcmQgb2Ygb3ZlcnJpZGVcbiAgICAgICAgY29vcmRzW2tleV0gPSBjb29yZFxuXG4gICAgQGVsLmNzcyBjb29yZHNcblxuICAgIF8ub24gQGVsXG4gICAgQHN0YXRlID0gdHJ1ZVxuXG4gIGQ6IC0+XG4gICAgXy5vZmYgQGVsXG4gICAgQHN0YXRlID0gZmFsc2VcbiIsIlN0cnVjdHVyZSA9XG5cbiAgdGVtcGxhdGU6IGZhbHNlXG4gIF9pZDogZmFsc2VcblxuICBjbGllbnRTZWxlY3Q6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEB0ZW1wbGF0ZSA9ICQoJy5tb2RpZnkgPiAjdGVtcGxhdGUnKS5odG1sKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgQGNsaWVudFNlbGVjdCA9IFNlbGVjdGl6ZS5jbGllbnRzICQoJy5wYWdlLnN0cnVjdHVyZSA+IC5tb2RpZnkgPiAuZGV0YWlsLmNsaWVudCA+IC5pbnB1dCA+IHNlbGVjdCcpLFxuICAgICAgQGNsaWVudFNlbGVjdGhhbmRsZXJcblxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL3N0cnVjdHVyZXNcXC8oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEBfaWQgPSBtYXRjaFsxXVxuICAgICAgQGxvYWQgQF9pZFxuICAgICAgXy5vbiAnLm1vZGlmeSA+IC5zdWJtaXQgPiAuY3RhJ1xuICAgIGVsc2VcbiAgICAgIEBlbnRpdHlBZGQoKVxuICAgICAgXy5vZmYgJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCdcblxuICAgIEBjbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLmZvY3VzKCkgaWYgQF9pZCBpcyBmYWxzZVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5tb3JlJykuY2xpY2sgQGVudGl0eUFkZEhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzJykub24gJ2NsaWNrJywnLmVudGl0eSA+IC5yZW1vdmUnLCBAZW50aXR5UmVtb3ZlSGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YXAnKS5jbGljayBAc3VibWl0SGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YScpLmNsaWNrIEBuZXdFbnRyeUhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLmNsaWVudEFjY2VzcyA+IC5zd2l0Y2gnKS5vbiAnY2xpY2snLCBAY2hlY2tib3hIYW5kbGVyXG5cbiAgY2hlY2tib3hIYW5kbGVyOiAtPlxuICAgIF8uc3dhcCB0aGlzXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5zdHJ1Y3R1cmUnKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMvJyxcbiAgICAgIF9pZDogQF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvc3RydWN0dXJlcy9uZXcnIGlmIHJlc3BvbnNlLmRhdGEubGVuZ3RoIDwgMVxuICAgICAgc3RydWN0dXJlID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwgc3RydWN0dXJlLm5hbWVcblxuICAgICAgaWYgc3RydWN0dXJlLmNsaWVudEFjY2VzcyBpcyB0cnVlXG4gICAgICAgIF8ub24gJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCdcbiAgICAgIGVsc2VcbiAgICAgICAgXy5vZmYgJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCdcblxuICAgICAgZm9yIGksIGVudGl0eSBvZiBzdHJ1Y3R1cmUuZW50aXRpZXNcbiAgICAgICAgU3RydWN0dXJlLmVudGl0eUFkZCBmYWxzZSwgZW50aXR5XG5cbiAgICAgIFN0cnVjdHVyZS5jbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLmFkZE9wdGlvblxuICAgICAgICBpZDogc3RydWN0dXJlLmNsaWVudC5pZCwgbmFtZTogc3RydWN0dXJlLmNsaWVudC5uYW1lXG4gICAgICBTdHJ1Y3R1cmUuY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBzdHJ1Y3R1cmUuY2xpZW50LmlkXG5cblxuXG4gIGVudGl0eUFkZEhhbmRsZXI6IC0+XG4gICAgU3RydWN0dXJlLmVudGl0eUFkZCh0cnVlKVxuXG4gIGVudGl0eVJlbW92ZUhhbmRsZXI6IC0+XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKVxuXG4gIGVudGl0eUFkZDogKGZvY3VzPWZhbHNlLCBlbnRpdHk9ZmFsc2UpIC0+XG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHknKS5hcHBlbmQgQHRlbXBsYXRlXG5cbiAgICBpZiBlbnRpdHkgaXNudCBmYWxzZVxuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gaW5wdXQnKS52YWwoZW50aXR5Lm5hbWUpXG4gICAgICBAc2VsZWN0aXplICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpLCBlbnRpdHkudHlwZVxuICAgIGVsc2VcbiAgICAgIEBzZWxlY3RpemUgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gc2VsZWN0JylcblxuICAgIGlmICBmb2N1c1xuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eSA+IC5pbnB1dC5zZWxlY3RpemUtaW5wdXQgaW5wdXQnKS5sYXN0KCkuZm9jdXMoKVxuXG4gIHNlbGVjdGl6ZTogKGVsLCB2YWx1ZT1mYWxzZSkgLT5cbiAgICBpemVkID0gZWwuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJUeXBlXCJcblxuICAgIGl6ZWRbMF0uc2VsZWN0aXplLnNldFZhbHVlIHZhbHVlXG5cbiAgc3VibWl0SGFuZGxlcjogLT5cblxuICAgIHN0cnVjdHVyZSA9IHt9XG4gICAgc3RydWN0dXJlLmVudGl0aWVzID0ge31cbiAgICBzdHJ1Y3R1cmUuY2xpZW50ID0gJCgnLm1vZGlmeSA+IC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5uYW1lID0gJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5jbGllbnRBY2Nlc3MgPSAkKCcubW9kaWZ5ID4gLmNsaWVudEFjY2VzcyA+IC5zd2l0Y2gnKS5oYXNDbGFzcyAnb24nXG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5JykuZWFjaCAoaSwgZWwpIC0+XG5cbiAgICAgIG5hbWUgPSAkKGVsKS5maW5kKCcuaW5wdXQgPiBpbnB1dCcpLnZhbCgpXG4gICAgICB0eXBlID0gJChlbCkuZmluZCgnLmlucHV0ID4gc2VsZWN0JykudmFsKClcblxuICAgICAgc3RydWN0dXJlLmVudGl0aWVzW25hbWVdID1cbiAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB0eXBlOiB0eXBlXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgY29uc29sZS5sb2cgc3RydWN0dXJlLmVudGl0aWVzXG4gICAgICBTdHJ1Y3R1cmUubW9kaWZ5IHN0cnVjdHVyZVxuXG4gIG5ld0VudHJ5SGFuZGxlcjogLT5cbiAgICBsb2NhdGlvbi5ocmVmID0gXCIvZW50cmllcy9uZXcjc3RydWN0dXJlPSN7U3RydWN0dXJlLl9pZH1cIlxuXG4gIG1vZGlmeTogKHN0cnVjdHVyZSkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5zdHJ1Y3R1cmUnKSlcblxuICAgIGNhbGwgPSAnL2FwaS9zdHJ1Y3R1cmVzL2FkZCdcbiAgICBpZiBTdHJ1Y3R1cmUuX2lkIGlzbnQgZmFsc2VcbiAgICAgIGNhbGwgPSBcIi9hcGkvc3RydWN0dXJlcy91cGRhdGUvI3tTdHJ1Y3R1cmUuX2lkfVwiXG5cbiAgICBfLmdldCBjYWxsLCBzdHJ1Y3R1cmVcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsICdzdWNjZXNzJ1xuICAgICAgICBfLm9uICcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnXG4gICAgICAgIGlmIFN0cnVjdHVyZS5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9zdHJ1Y3R1cmVzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgU3RydWN0dXJlLl9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4iLCJTdHJ1Y3R1cmVzID1cbiAgaTogLT5cbiAgICBMaXN0aW5nLmkgJ3N0cnVjdHVyZXMnLCBmYWxzZSwgWydjbGllbnQnXVxuXG4iLCJVc2VycyA9XG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICd1c2VycydcbiJdfQ==
