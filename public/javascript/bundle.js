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
    "url": "http://127.0.0.1:8000",
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
        _.off('.listing > .list-header > .search');
        _.on('.listing > .list-header > .state_actions');
      } else {
        _.on('.listing > .list-header > .state_stats');
        _.on('.listing > .list-header > .search');
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
      Notice.i(response.data.status, {
        type: 'success'
      });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJmaWx0ZXIuY29mZmVlIiwiZ2xvYmFsLmNvZmZlZSIsImluZGV4LmNvZmZlZSIsImludml0ZS5jb2ZmZWUiLCJsaXN0aW5nLmNvZmZlZSIsIm1haW4uY29mZmVlIiwibWUuY29mZmVlIiwibm90Zm91bmQuY29mZmVlIiwibm90aWNlLmNvZmZlZSIsInByb21wdC5jb2ZmZWUiLCJxdWVyeS5jb2ZmZWUiLCJzZWFyY2guY29mZmVlIiwic2VsZWN0aXplLmNvZmZlZSIsInNwaW5uZXIuY29mZmVlIiwic3RydWN0dXJlLmNvZmZlZSIsInN0cnVjdHVyZXMuY29mZmVlIiwidXNlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOztBQUFBLENBQUEsR0FFRTtFQUFBLENBQUEsRUFBRyxTQUFBO1dBQ0QsSUFBQyxDQUFBLE9BQUQsR0FBVyxXQUFBLENBQVksSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUFaLEVBQTZCLEdBQTdCO0VBRFYsQ0FBSDtFQUdBLENBQUEsRUFDRTtJQUFBLE1BQUEsRUFBUSxLQUFSO0lBQ0EsT0FBQSxFQUFTLENBRFQ7R0FKRjtFQU9BLElBQUEsRUFBTSxTQUFDLEVBQUQsRUFBSyxNQUFMLEVBQW1CLEdBQW5COztNQUFLLFNBQU87OztNQUFPLE1BQUk7O0lBRTNCLElBQUcsQ0FBQSxDQUFBLEVBQUEsWUFBa0IsTUFBbEIsQ0FBSDtNQUNFLEVBQUEsR0FBSyxDQUFBLENBQUUsRUFBRixFQURQOztJQUdBLElBQUcsTUFBQSxLQUFZLEtBQWY7TUFDRSxFQUFFLENBQUMsV0FBSCxDQUFlLE1BQWYsRUFERjs7SUFHQSxJ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RyxTQUFBO1dBQ0QsT0FBTyxDQUFDLENBQVIsQ0FBVSxPQUFWO0VBREMsQ0FBSCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICByYW5nZTogKHN0YXJ0LCBlbmQpIC0+XG4gICAgcmVzdWx0ID0gW11cbiAgICBmb3IgbnVtIGluIFtzdGFydC4uZW5kXVxuICAgICAgcmVzdWx0LnB1c2ggbnVtXG4gICAgcmVzdWx0XG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpnZXQuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgcG9zdDogKGFyZ3MuLi4pIC0+XG5cbiAgICBqcG9zdCA9ICQucG9zdCBhcmdzLi4uXG5cbiAgICBqcG9zdC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAganBvc3QuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcG9zdFxuXG4gIGZhaWw6IChyZXNwb25zZSkgLT5cblxuICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OPy5lcnJvcnM/WzBdXG4gICAgaWYgZXJyb3IgaXMgdW5kZWZpbmVkXG4gICAgICByZXR1cm4gUHJvbXB0LmkgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0XG5cbiAgICBwdWcgPSBlcnJvci5tZXNzYWdlLm1hdGNoIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspL1xuICAgIGlmIHB1ZyBpc250IG51bGxcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlLnJlcGxhY2UgL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvLCAnJ1xuICAgICAgZXJyb3IuZmlsZSA9IHB1Z1sxXVxuICAgICAgZXJyb3IubGluZSA9IHB1Z1syXVxuXG4gICAgZmlsZSA9IEBlbmNvZGUgXCIje2Vycm9yLmZpbGV9XCJcblxuICAgIHN3aXRjaCBjb25maWcuYXBwLmVkaXRvclxuICAgICAgd2hlbiAnbWFjdmltJyB0aGVuIGVkaXRvciA9ICdtdmltOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3N1YmxpbWUnIHRoZW4gZWRpdG9yID0gJ3N1Ymw6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnZW1hY3MnIHRoZW4gZWRpdG9yID0gJ2VtYWNzOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3RleHRtYXRlJyB0aGVuIGVkaXRvciA9ICd0ZXh0bWF0ZTovL29wZW4vP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAncGhwc3Rvcm0nIHRoZW4gZWRpdG9yID0gJ3BocHN0b3JtOi8vb3Blbj9maWxlPSdcblxuICAgIGlmIGVycm9yLmZpbGUgaXNudCBudWxsXG4gICAgICBib2R5ID0gXCJcIlwiXG4gICAgICAgIDxwcmU+I3tlcnJvci5tZXNzYWdlfTwvcHJlPlxuICAgICAgICA8YSBocmVmPVwiI3tlZGl0b3J9I3tmaWxlfSZsaW5lPSN7ZXJyb3IubGluZX1cIj48Yj4je2Vycm9yLmZpbGV9OiN7ZXJyb3IubGluZX08L2I+PC9hPlxuICAgICAgXCJcIlwiXG4gICAgZWxzZVxuICAgICAgYm9keSA9IGVycm9yLm1lc3NhZ2VcblxuICAgIFByb21wdC5pIGVycm9yLnR5cGUsIGJvZHksIFsnT0snXVxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHBzOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG4gIG1ldGhvZHM6IChvYmopIC0+XG4gICAgcmVzID0gW11cbiAgICBmb3IgaSxtIG9mIG9ialxuICAgICAgaWYgdHlwZW9mIG0gaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICByZXMucHVzaCBtXG4gICAgcmV0dXJuIHJlc1xuXG5fLmkoKVxuIiwiVGltZSA9XG4gIGludGVydmFsOiBmYWxzZVxuICBnYXA6IDEwMDBcblxuICBpOiAtPlxuICAgIEBpbnRlcnZhbCA9IHNldEludGVydmFsKEBzY3JhcGUsIEBnYWEpIGlmIEBpbnRlcnZhbCBpcyBmYWxzZVxuICAgIEBzY3JhcGUoKVxuXG4gIHNjcmFwZTogLT5cbiAgICAkKCd0aW1lJykuZWFjaCAoaSwgZWwpID0+XG4gICAgICBqZWwgPSAkIGVsXG4gICAgICBqZWwuaHRtbCBtb21lbnQoamVsLmF0dHIoJ3RpdGxlJykpLmZyb21Ob3coKVxuICAgICAgamVsLmF0dHIgJ2FyaWEtbGFiZWwnLCBtb21lbnQoamVsLmF0dHIoJ3RpdGxlJykpLmNhbGVuZGFyKClcbiIsIkNsaWVudCA9XG5cbiAgc2VsZWN0VXNlcjogZmFsc2VcbiAgX2lkOiBmYWxzZVxuICBjcm9wOiBmYWxzZVxuICBwcm9maWxlOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBAaGFuZGxlcnMoKVxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL2NsaWVudHNcXC8oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEBfaWQgPSBtYXRjaFsxXVxuICAgICAgQGxvYWQgQF9pZFxuXG4gICAgQHNlbGVjdFVzZXIgPSBTZWxlY3RpemUudXNlcnMgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LXVzZXJzID4gaW5wdXQnKSwgQHNlbGVjdFVzZXJIYW5kbGVyLCBtZTogZmFsc2VcblxuICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dCA+IGlucHV0JykuZm9jdXMoKVxuIFxuICBoYW5kbGVyczogLT5cbiAgICAkKCcucGFnZS5jbGllbnQgPiAuc3VibWl0JykuY2xpY2sgQG1vZGlmeUhhbmRsZXJcblxuICAgICQoZG9jdW1lbnQpLm9uICdkcmFnb3ZlcicsIEBkcmFnb3ZlclxuICAgICQoZG9jdW1lbnQpLm9uICdkcmFnbGVhdmUnLCBAZHJhZ2xlYXZlXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdlbnRlciBkcmFnb3ZlcicsIEBjYW5jZWxcblxuICAgICQoZG9jdW1lbnQpLm9uICdkcm9wIGRyYWdkcm9wJywgQGRyb3BcblxuICAgICQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEnKS5vbiAnY2xpY2snLCBAY2hvb3NlRmlsZVxuICAgICQoJy5pbnB1dC1pbWFnZSA+IGlucHV0OmZpbGUnKS5jaGFuZ2UgQGNoYW5nZVxuXG4gIGNhbmNlbDogLT5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgZHJhZ292ZXI6IC0+XG4gICAgXy5vbiAnLmlucHV0LWltYWdlJ1xuXG4gIGRyYWdsZWF2ZTogLT5cbiAgICBfLm9mZiAnLmlucHV0LWltYWdlJ1xuXG4gIGRyb3A6IChlKSAtPlxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIF8ub2ZmICcuaW5wdXQtaW1hZ2UnXG5cbiAgICBpZiBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyIGFuZCBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aFxuICAgICAgZmlsZXMgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzXG5cbiAgICBDbGllbnQuY3JvcHBpZSBmaWxlc1swXVxuXG4gIGNoYW5nZTogLT5cbiAgICBpZiAkKHRoaXMpWzBdLmZpbGVzXG4gICAgICBmaWxlcyA9ICQodGhpcylbMF0uZmlsZXNcbiAgICBDbGllbnQuY3JvcHBpZSBmaWxlc1swXVxuXG4gIGNob29zZUZpbGU6IC0+XG4gICAgJCgnLmlucHV0LWltYWdlID4gaW5wdXQnKS50cmlnZ2VyICdjbGljaydcblxuICBjcm9wcGllOiAoZmlsZSkgLT5cbiAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLm9ubG9hZGVuZCA9IC0+XG5cbiAgICAgIGlmIENsaWVudC5jcm9wIGlzbnQgZmFsc2VcbiAgICAgICAgQ2xpZW50LmNyb3AuY3JvcHBpZSAnZGVzdHJveSdcbiAgICAgICAgQ2xpZW50LmNyb3AgPSBmYWxzZVxuXG4gICAgICBDbGllbnQuY3JvcCA9ICQoJy5pbnB1dC1pbWFnZSA+IC5jcm9wcGllJykuY3JvcHBpZVxuICAgICAgICB1cmw6IHJlYWRlci5yZXN1bHRcbiAgICAgICAgZW5mb3JjZUJvdW5kYXJ5OiBmYWxzZVxuICAgICAgICB2aWV3cG9ydDpcbiAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgaGVpZ2h0OiAyMDBcbiAgICAgICAgYm91bmRhcnk6XG4gICAgICAgICAgd2lkdGg6IDMwMFxuICAgICAgICAgIGhlaWdodDogMzAwXG5cbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTCBmaWxlXG5cbiAgc2VsZWN0VXNlckhhbmRsZXI6IC0+XG5cbiAgbW9kaWZ5SGFuZGxlcjogLT5cblxuICAgIGlmIENsaWVudC5jcm9wIGlzbnQgZmFsc2VcbiAgICAgIENsaWVudC5jcm9wLmNyb3BwaWUgJ3Jlc3VsdCcsXG4gICAgICAgIHR5cGU6ICdjYW52YXMnXG4gICAgICAgIGZvcm1hdDogJ2pwZWcnXG4gICAgICAudGhlbiAocmVzcG9uc2UpIC0+XG4gICAgICAgIENsaWVudC5pbWFnZVVwbG9hZCBDbGllbnQuZGF0YVVSSXRvQmxvYihyZXNwb25zZSksIC0+XG4gICAgICAgICAgQ2xpZW50Lm1vZGlmeSgpXG4gICAgZWxzZVxuICAgICAgQ2xpZW50Lm1vZGlmeSgpXG5cbiAgbW9kaWZ5OiAtPlxuXG4gICAgbmFtZSA9ICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1uYW1lID4gaW5wdXQnKS52YWwoKVxuICAgIHVzZXJzID0gJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LXVzZXJzID4gaW5wdXQnKS52YWwoKS5zcGxpdCAnLCdcblxuICAgIGNhbGwgPSAnL2FwaS9jbGllbnRzL2FkZCdcbiAgICBpZiBDbGllbnQuX2lkIGlzbnQgZmFsc2VcbiAgICAgIGNhbGwgPSBcIi9hcGkvY2xpZW50cy91cGRhdGUvI3tDbGllbnQuX2lkfVwiXG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuY2xpZW50JykpXG5cbiAgICBfLmdldCBjYWxsLCBuYW1lOiBuYW1lLCB1c2VyczogdXNlcnMsIHByb2ZpbGU6IENsaWVudC5wcm9maWxlXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pIHJlc3BvbnNlLmRhdGEuc3RhdHVzLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgaWYgQ2xpZW50Ll9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL2NsaWVudHMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBDbGllbnQuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiAgICAgICAgaWYgQ2xpZW50LnByb2ZpbGVcbiAgICAgICAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtaW1hZ2UgPiAucGljdHVyZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCcje0NsaWVudC5wcm9maWxlfScpXCJcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudCcpKVxuXG4gICAgXy5nZXQgJy9hcGkvY2xpZW50cy8nLFxuICAgICAgX2lkOiBAX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy9jbGllbnRzL25ldycgaWYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPCAxXG4gICAgICBjbGllbnQgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtbmFtZSA+IGlucHV0JykudmFsIGNsaWVudC5uYW1lXG4gICAgICBpZiBjbGllbnQucHJvZmlsZVxuICAgICAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtaW1hZ2UgPiAucGljdHVyZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCcje2NsaWVudC5wcm9maWxlfScpXCJcbiAgICAgICAgQ2xpZW50LnByb2ZpbGUgPSBjbGllbnQucHJvZmlsZVxuICAgICAgZm9yIGluZGV4LCB1c2VyIG9mIGNsaWVudC51c2Vyc1xuICAgICAgICBpZiB1c2VyLmlkIGlzbnQgVXNlci5faWRcbiAgICAgICAgICBDbGllbnQuc2VsZWN0VXNlclswXS5zZWxlY3RpemUuYWRkT3B0aW9uIGlkOiB1c2VyLmlkLCBuYW1lOiBcIiN7dXNlci5uYW1lfSAoI3t1c2VyLmVtYWlsfSlcIlxuICAgICAgICAgIENsaWVudC5zZWxlY3RVc2VyWzBdLnNlbGVjdGl6ZS5hZGRJdGVtIHVzZXIuaWRcblxuXG4gIGRhdGFVUkl0b0Jsb2I6IChkYXRhVVJJKSAtPlxuICAgIGJ5dGVTdHJpbmcgPSB1bmRlZmluZWRcbiAgICBpZiBkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMFxuICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKVxuICAgIGVsc2VcbiAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pXG4gICAgIyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF1cbiAgICAjIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKVxuICAgIGkgPSAwXG4gICAgd2hpbGUgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoXG4gICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKVxuICAgICAgaSsrXG4gICAgbmV3IEJsb2IoWyBpYSBdLCB0eXBlOiBtaW1lU3RyaW5nKVxuICAgICAgICBcbiAgaW1hZ2VVcGxvYWQ6IChibG9iLCBjYWxsYmFjaykgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBibG9iXG5cbiAgICBfLnBvc3RcbiAgICAgIHhocjogLT5cbiAgICAgICAgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lciAncHJvZ3Jlc3MnLCAoZSkgLT5cbiAgICAgICAgICBjb21wbGV0ZSA9IGUubG9hZGVkIC8gZS50b3RhbFxuICAgICAgICAgIGlmIGNvbXBsZXRlIDwgMSB0aGVuIE5vdGljZS5pICdVcGxvYWRpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAgIGlmIGNvbXBsZXRlIGlzIDEgdGhlbiBOb3RpY2UuaSAnUHJvY2Vzc2luZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICwgZmFsc2VcbiAgICAgICAgcmV0dXJuIHhoclxuXG4gICAgICB1cmw6ICcvYXBpL3VwbG9hZCdcbiAgICAgIGRhdGE6IGZkXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZVxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgICBlcnJvcjogLT5cbiAgICAgICAgTm90aWNlLmQoKVxuICAgICAgc3VjY2VzczogKHJlc3VsdCkgLT5cbiAgICAgICAgTm90aWNlLmkgJ0ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnLCB0aW1lb3V0OiA2MDBcbiAgICAgICAgQ2xpZW50LnByb2ZpbGUgPSByZXN1bHQuZGF0YS51cmxcbiAgICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdClcbiAgICAgICAgLCAxMjAwXG5cblxuIiwiQ2xpZW50cyA9XG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICdjbGllbnRzJywgQ2xpZW50cy5hY3Rpb25cblxuICBhY3Rpb246ICh0eXBlKSAtPlxuXG4gICAgc3dpdGNoIHR5cGVcbiAgICAgIHdoZW4gJ0NsaWVudCBJbnZpdGUnXG4gICAgICAgIGlmIExpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RoID4gMVxuICAgICAgICAgIE5vdGljZS5pICdQbGVhc2UgY2hvb3NlIGEgc2luZ2xlIGNsaWVudCBmb3IgYW4gaW52aXRlIGxpbmsnLCB0eXBlOiAnd2FybmluZydcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgQ2xpZW50cy5nZXRJbnZpdGUoTGlzdGluZy5zZWxlY3RlZFswXSlcblxuICBnZXRJbnZpdGU6IChjbGllbnQpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuY2xpZW50cycpKVxuXG4gICAgXy5nZXQgJy9hcGkvaW52aXRlL2FkZCcsIGNsaWVudDogY2xpZW50XG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBjb25zb2xlLmxvZyByZXNwb25zZVxuICAgICAgUHJvbXB0LmkoXG4gICAgICAgICdDbGllbnQgSW52aXRlJyxcbiAgICAgICAgJ1NoYXJlIHRoaXMgVVJMIHdpdGggeW91ciBjbGllbnQgdG8gYWxsb3cgdGhlbSB0byBtb2RpZnkgdGhlaXIgb3duIGVudHJpZXMnLFxuICAgICAgICBbJ09LJ10sXG4gICAgICAgICAgY2xpcGJvYXJkOiB0cnVlXG4gICAgICAgICAgdmFsdWU6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2ludml0ZS8nICsgcmVzcG9uc2UuZGF0YS5pbnZpdGUuaGFzaCxcbiAgICAgIClcblxuXG5cbiIsImNvbmZpZyA9IHtcImFwcFwiOntcIm5hbWVcIjpcIkxhcmF2ZWxcIixcImVudlwiOlwibG9jYWxcIixcImRlYnVnXCI6dHJ1ZSxcInVybFwiOlwiaHR0cDovLzEyNy4wLjAuMTo4MDAwXCIsXCJ0aW1lem9uZVwiOlwiVVRDXCIsXCJsb2NhbGVcIjpcImVuXCIsXCJmYWxsYmFja19sb2NhbGVcIjpcImVuXCIsXCJrZXlcIjpcImJhc2U2NDpRWXB6UnErb2I1dUxjVWJ0ZW1TK2phVE42Z2JRUFM2V1gvcFpOOTdiVDlnPVwiLFwiY2lwaGVyXCI6XCJBRVMtMjU2LUNCQ1wiLFwibG9nXCI6XCJzaW5nbGVcIixcImxvZ19sZXZlbFwiOlwiZGVidWdcIixcInByb3ZpZGVyc1wiOltcIklsbHVtaW5hdGVcXFxcQXV0aFxcXFxBdXRoU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEJyb2FkY2FzdGluZ1xcXFxCcm9hZGNhc3RTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcQnVzXFxcXEJ1c1NlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxDYWNoZVxcXFxDYWNoZVNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxGb3VuZGF0aW9uXFxcXFByb3ZpZGVyc1xcXFxDb25zb2xlU3VwcG9ydFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxDb29raWVcXFxcQ29va2llU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXERhdGFiYXNlXFxcXERhdGFiYXNlU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEVuY3J5cHRpb25cXFxcRW5jcnlwdGlvblNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxGaWxlc3lzdGVtXFxcXEZpbGVzeXN0ZW1TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcRm91bmRhdGlvblxcXFxQcm92aWRlcnNcXFxcRm91bmRhdGlvblNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxIYXNoaW5nXFxcXEhhc2hTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcTWFpbFxcXFxNYWlsU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXE5vdGlmaWNhdGlvbnNcXFxcTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFBhZ2luYXRpb25cXFxcUGFnaW5hdGlvblNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxQaXBlbGluZVxcXFxQaXBlbGluZVNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxRdWV1ZVxcXFxRdWV1ZVNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxSZWRpc1xcXFxSZWRpc1NlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxBdXRoXFxcXFBhc3N3b3Jkc1xcXFxQYXNzd29yZFJlc2V0U2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFNlc3Npb25cXFxcU2Vzc2lvblNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxUcmFuc2xhdGlvblxcXFxUcmFuc2xhdGlvblNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxWYWxpZGF0aW9uXFxcXFZhbGlkYXRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcVmlld1xcXFxWaWV3U2VydmljZVByb3ZpZGVyXCIsXCJMYXJhdmVsXFxcXFRpbmtlclxcXFxUaW5rZXJTZXJ2aWNlUHJvdmlkZXJcIixcIkplbnNzZWdlcnNcXFxcTW9uZ29kYlxcXFxNb25nb2RiU2VydmljZVByb3ZpZGVyXCIsXCJMYXJqZWN0dXNcXFxcU2VydmljZVByb3ZpZGVyXCIsXCJMYXJwdWdcXFxcU2VydmljZVByb3ZpZGVyXCIsXCJCYXJyeXZkaFxcXFxEZWJ1Z2JhclxcXFxTZXJ2aWNlUHJvdmlkZXJcIixcIkFwcFxcXFxQcm92aWRlcnNcXFxcQXBwU2VydmljZVByb3ZpZGVyXCIsXCJBcHBcXFxcUHJvdmlkZXJzXFxcXEF1dGhTZXJ2aWNlUHJvdmlkZXJcIixcIkFwcFxcXFxQcm92aWRlcnNcXFxcRXZlbnRTZXJ2aWNlUHJvdmlkZXJcIixcIkFwcFxcXFxQcm92aWRlcnNcXFxcUm91dGVTZXJ2aWNlUHJvdmlkZXJcIl0sXCJhbGlhc2VzXCI6e1wiQXBwXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxBcHBcIixcIkFydGlzYW5cIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEFydGlzYW5cIixcIkF1dGhcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEF1dGhcIixcIkJsYWRlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxCbGFkZVwiLFwiQnJvYWRjYXN0XCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxCcm9hZGNhc3RcIixcIkJ1c1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQnVzXCIsXCJDYWNoZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQ2FjaGVcIixcIkNvbmZpZ1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQ29uZmlnXCIsXCJDb29raWVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXENvb2tpZVwiLFwiQ3J5cHRcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXENyeXB0XCIsXCJEQlwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcREJcIixcIkRlYnVnYmFyXCI6XCJCYXJyeXZkaFxcXFxEZWJ1Z2JhclxcXFxGYWNhZGVcIixcIkVsb3F1ZW50XCI6XCJJbGx1bWluYXRlXFxcXERhdGFiYXNlXFxcXEVsb3F1ZW50XFxcXE1vZGVsXCIsXCJNb2xvcXVlbnRcIjpcIkplbnNzZWdlcnNcXFxcTW9uZ29kYlxcXFxFbG9xdWVudFxcXFxNb2RlbFwiLFwiRXZlbnRcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEV2ZW50XCIsXCJGaWxlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxGaWxlXCIsXCJHYXRlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxHYXRlXCIsXCJIYXNoXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxIYXNoXCIsXCJMYW5nXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxMYW5nXCIsXCJMb2dcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXExvZ1wiLFwiTWFpbFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcTWFpbFwiLFwiTm90aWZpY2F0aW9uXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxOb3RpZmljYXRpb25cIixcIlBhc3N3b3JkXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxQYXNzd29yZFwiLFwiUXVldWVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFF1ZXVlXCIsXCJSZWRpcmVjdFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUmVkaXJlY3RcIixcIlJlZGlzXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxSZWRpc1wiLFwiUmVxdWVzdFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUmVxdWVzdFwiLFwiUmVzcG9uc2VcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFJlc3BvbnNlXCIsXCJSb3V0ZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUm91dGVcIixcIlNjaGVtYVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcU2NoZW1hXCIsXCJTZXNzaW9uXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxTZXNzaW9uXCIsXCJTdG9yYWdlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxTdG9yYWdlXCIsXCJVUkxcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFVSTFwiLFwiVmFsaWRhdG9yXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxWYWxpZGF0b3JcIixcIlZpZXdcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFZpZXdcIn19LFwiY2FjaGVcIjp7XCJkZWZhdWx0XCI6XCJmaWxlXCIsXCJzdG9yZXNcIjp7XCJhcGNcIjp7XCJkcml2ZXJcIjpcImFwY1wifSxcImFycmF5XCI6e1wiZHJpdmVyXCI6XCJhcnJheVwifSxcImRhdGFiYXNlXCI6e1wiZHJpdmVyXCI6XCJkYXRhYmFzZVwiLFwidGFibGVcIjpcImNhY2hlXCIsXCJjb25uZWN0aW9uXCI6bnVsbH0sXCJmaWxlXCI6e1wiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay9jYWNoZS9kYXRhXCJ9LFwibWVtY2FjaGVkXCI6e1wiZHJpdmVyXCI6XCJtZW1jYWNoZWRcIixcInBlcnNpc3RlbnRfaWRcIjpudWxsLFwic2FzbFwiOltudWxsLG51bGxdLFwib3B0aW9uc1wiOltdLFwic2VydmVyc1wiOlt7XCJob3N0XCI6XCIxMjcuMC4wLjFcIixcInBvcnRcIjoxMTIxMSxcIndlaWdodFwiOjEwMH1dfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwifX0sXCJwcmVmaXhcIjpcImxhcmF2ZWxcIn0sXCJkZWJ1Z2JhclwiOntcImVuYWJsZWRcIjpmYWxzZSxcInN0b3JhZ2VcIjp7XCJlbmFibGVkXCI6dHJ1ZSxcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9kZWJ1Z2JhclwiLFwiY29ubmVjdGlvblwiOm51bGwsXCJwcm92aWRlclwiOlwiXCJ9LFwiaW5jbHVkZV92ZW5kb3JzXCI6dHJ1ZSxcImNhcHR1cmVfYWpheFwiOnRydWUsXCJjbG9ja3dvcmtcIjpmYWxzZSxcImNvbGxlY3RvcnNcIjp7XCJwaHBpbmZvXCI6dHJ1ZSxcIm1lc3NhZ2VzXCI6dHJ1ZSxcInRpbWVcIjp0cnVlLFwibWVtb3J5XCI6dHJ1ZSxcImV4Y2VwdGlvbnNcIjp0cnVlLFwibG9nXCI6dHJ1ZSxcImRiXCI6dHJ1ZSxcInZpZXdzXCI6dHJ1ZSxcInJvdXRlXCI6dHJ1ZSxcImxhcmF2ZWxcIjpmYWxzZSxcImV2ZW50c1wiOmZhbHNlLFwiZGVmYXVsdF9yZXF1ZXN0XCI6ZmFsc2UsXCJzeW1mb255X3JlcXVlc3RcIjp0cnVlLFwibWFpbFwiOnRydWUsXCJsb2dzXCI6ZmFsc2UsXCJmaWxlc1wiOmZhbHNlLFwiY29uZmlnXCI6ZmFsc2UsXCJhdXRoXCI6ZmFsc2UsXCJnYXRlXCI6ZmFsc2UsXCJzZXNzaW9uXCI6dHJ1ZX0sXCJvcHRpb25zXCI6e1wiYXV0aFwiOntcInNob3dfbmFtZVwiOmZhbHNlfSxcImRiXCI6e1wid2l0aF9wYXJhbXNcIjp0cnVlLFwidGltZWxpbmVcIjpmYWxzZSxcImJhY2t0cmFjZVwiOmZhbHNlLFwiZXhwbGFpblwiOntcImVuYWJsZWRcIjpmYWxzZSxcInR5cGVzXCI6W1wiU0VMRUNUXCJdfSxcImhpbnRzXCI6dHJ1ZX0sXCJtYWlsXCI6e1wiZnVsbF9sb2dcIjpmYWxzZX0sXCJ2aWV3c1wiOntcImRhdGFcIjpmYWxzZX0sXCJyb3V0ZVwiOntcImxhYmVsXCI6dHJ1ZX0sXCJsb2dzXCI6e1wiZmlsZVwiOm51bGx9fSxcImluamVjdFwiOnRydWUsXCJyb3V0ZV9wcmVmaXhcIjpcIl9kZWJ1Z2JhclwifSxcIm1haWxcIjp7XCJkcml2ZXJcIjpcInNtdHBcIixcImhvc3RcIjpcInNtdHAubWFpbGd1bi5vcmdcIixcInBvcnRcIjo1ODcsXCJmcm9tXCI6e1wiYWRkcmVzc1wiOlwiaGVsbG9AZXhhbXBsZS5jb21cIixcIm5hbWVcIjpcIkV4YW1wbGVcIn0sXCJlbmNyeXB0aW9uXCI6XCJ0bHNcIixcInVzZXJuYW1lXCI6bnVsbCxcInBhc3N3b3JkXCI6bnVsbCxcInNlbmRtYWlsXCI6XCIvdXNyL3NiaW4vc2VuZG1haWwgLWJzXCIsXCJtYXJrZG93blwiOntcInRoZW1lXCI6XCJkZWZhdWx0XCIsXCJwYXRoc1wiOltcIi9Vc2Vycy9rL2Jhc2FsL3Jlc291cmNlcy92aWV3cy92ZW5kb3IvbWFpbFwiXX19LFwicXVldWVcIjp7XCJkZWZhdWx0XCI6XCJzeW5jXCIsXCJjb25uZWN0aW9uc1wiOntcInN5bmNcIjp7XCJkcml2ZXJcIjpcInN5bmNcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJqb2JzXCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwicmV0cnlfYWZ0ZXJcIjo5MH0sXCJiZWFuc3RhbGtkXCI6e1wiZHJpdmVyXCI6XCJiZWFuc3RhbGtkXCIsXCJob3N0XCI6XCJsb2NhbGhvc3RcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJyZXRyeV9hZnRlclwiOjkwfSxcInNxc1wiOntcImRyaXZlclwiOlwic3FzXCIsXCJrZXlcIjpcInlvdXItcHVibGljLWtleVwiLFwic2VjcmV0XCI6XCJ5b3VyLXNlY3JldC1rZXlcIixcInByZWZpeFwiOlwiaHR0cHM6Ly9zcXMudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20veW91ci1hY2NvdW50LWlkXCIsXCJxdWV1ZVwiOlwieW91ci1xdWV1ZS1uYW1lXCIsXCJyZWdpb25cIjpcInVzLWVhc3QtMVwifSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInJldHJ5X2FmdGVyXCI6OTB9fSxcImZhaWxlZFwiOntcImRhdGFiYXNlXCI6XCJtb25nb2RiXCIsXCJ0YWJsZVwiOlwiZmFpbGVkX2pvYnNcIn19LFwic2VydmljZXNcIjp7XCJtYWlsZ3VuXCI6e1wiZG9tYWluXCI6bnVsbCxcInNlY3JldFwiOm51bGx9LFwic2VzXCI6e1wia2V5XCI6bnVsbCxcInNlY3JldFwiOm51bGwsXCJyZWdpb25cIjpcInVzLWVhc3QtMVwifSxcInNwYXJrcG9zdFwiOntcInNlY3JldFwiOm51bGx9LFwic3RyaXBlXCI6e1wibW9kZWxcIjpcIkFwcFxcXFxVc2VyXCIsXCJrZXlcIjpudWxsLFwic2VjcmV0XCI6bnVsbH19LFwic2Vzc2lvblwiOntcImRyaXZlclwiOlwiZmlsZVwiLFwibGlmZXRpbWVcIjoxMjAsXCJleHBpcmVfb25fY2xvc2VcIjpmYWxzZSxcImVuY3J5cHRcIjpmYWxzZSxcImZpbGVzXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay9zZXNzaW9uc1wiLFwiY29ubmVjdGlvblwiOm51bGwsXCJ0YWJsZVwiOlwic2Vzc2lvbnNcIixcInN0b3JlXCI6bnVsbCxcImxvdHRlcnlcIjpbMiwxMDBdLFwiY29va2llXCI6XCJsYXJhdmVsX3Nlc3Npb25cIixcInBhdGhcIjpcIi9cIixcImRvbWFpblwiOm51bGwsXCJzZWN1cmVcIjpmYWxzZSxcImh0dHBfb25seVwiOnRydWV9LFwidmlld1wiOntcInBhdGhzXCI6W1wiL1VzZXJzL2svYmFzYWwvcmVzb3VyY2VzL3ZpZXdzXCJdLFwiY29tcGlsZWRcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL3ZpZXdzXCJ9LFwiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcIndoaXRlMlwiOlwiI2Y4ZjhmOFwiLFwid2hpdGUzXCI6XCIjRjRGNEY0XCIsXCJ3aGl0ZTRcIjpcIiNGQUZBRkFcIixcImdyZXkxXCI6XCIjZTVlNWU1XCIsXCJncmV5MlwiOlwiI2Y1ZjVmNVwiLFwiZ3JleTNcIjpcIiNkMGQwZDBcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiYmxhY2syXCI6XCIjMjgyODI4XCIsXCJibGFjazNcIjpcIiMzMzMzMzNcIixcImJsYWNrNFwiOlwiIzIzMjkyRVwiLFwiYmxhY2s1XCI6XCIjM0U0MzQ3XCIsXCJibGFjazZcIjpcIiM0OTRFNTJcIixcInJlZDFcIjpcIiNDODIxMkJcIixcInllbGxvdzFcIjpcIiNGNkJCNDVcIixcImN5YW4xXCI6XCIjNUZBNzkzXCIsXCJvcmFuZ2UxXCI6XCIjRjY4RjYyXCIsXCJza2luMVwiOlwiI0YzRERBM1wiLFwiZ3JlZW4xXCI6XCIjNWJhNTQxXCIsXCJncmVlbjJcIjpcIiM4OGQ5NmRcIixcImdyZWVuM1wiOlwiIzc3ZDM1OFwiLFwiYmx1ZTFcIjpcIiMxZGE3ZWVcIixcImJsdWUyXCI6XCIjMDA3M2JiXCIsXCJibHVlM1wiOlwiIzRGNUQ5NVwiLFwiZ29vZ2xlX2JsdWVcIjpcIiM0Mjg1ZjRcIixcImdvb2dsZV9ncmVlblwiOlwiIzM0YTg1M1wiLFwiZ29vZ2xlX3llbGxvd1wiOlwiI2ZiYmMwNVwiLFwiZ29vZ2xlX3JlZFwiOlwiI2VhNDMzNVwiLFwiZ2l0aHViX2JsdWVcIjpcIiMwRDI2MzZcIixcImZhY2Vib29rX2JsdWVcIjpcIiM0ODY3QUFcIixcImluc3RhZ3JhbV9vclwiOlwiI0ZGNzgwNFwiLFwidHdpdHRlcl9ibHVlXCI6XCIjMDBBQ0VEXCJ9LFwiZm9udFwiOntcIjQwNFwiOntcImZvbnQtZmFtaWx5XCI6XCJNb25vdG9uXCIsXCJmb250LXNpemVcIjpcIjc1cHhcIn0sXCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImgxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIn0sXCJoM2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJjMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTZweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifSxcImMxdGJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI0MDBcIn0sXCJjMXNcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjEycHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIixcImxldHRlci1zcGFjaW5nXCI6XCIwLjVweFwifSxcImMxc2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjEycHhcIixcImZvbnQtd2VpZ2h0XCI6XCI2MDBcIixcImxldHRlci1zcGFjaW5nXCI6XCIwLjVweFwifSxcImMyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9fSxcIm1ldGFcIjp7XCJ0aXRsZVwiOlwiYmFzYWxcIixcInVybFwiOlwiaHR0cHM6Ly9iYXNhbC50ZWNoL1wiLFwiZGVzY3JpcHRpb25cIjpcIm1pbmltYWwgY29udGVudCBtYW5hZ2VtZW50XCIsXCJrZXl3b3Jkc1wiOlwiY21zXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovYmFzYWxcIn0sXCJzZXR0aW5nc1wiOntcInBlcnBhZ2VcIjoxMH19OyIsIkRhc2hib2FyZCA9XG5cbiAgaTogLT5cbiAgICBAbG9hZCgpIGlmIHdpbmRvdy5Vc2VyIGlzbnQgdW5kZWZpbmVkXG5cbiAgbG9hZDogKGNvbXBsZXRlKSAtPlxuICAgIF8ub2ZmICcucGFnZS5ob21lJ1xuICAgIF8ub24gJy5wYWdlLmRhc2hib2FyZCdcbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZGFzaGJvYXJkID4gLmNvbGxlY3Rpb25zJykpXG5cbiAgICBfLmdldCAnL2FwaS9jbGllbnRzJyxcbiAgICAgIHZpZXc6ICdkYXNoYm9hcmQnXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBUaW1lLmkoKVxuICAgICAgJCgnLmNvbGxlY3Rpb25zJykuaHRtbCByZXNwb25zZS52aWV3XG5cbiIsIkVudGl0aWVzID1cblxuICBibG9nczogW11cbiAgY3JvcHM6IHt9XG4gIGltYWdlczoge31cblxuICBwbGFjZWhvbGRlcnM6IFtcbiAgICBcIlRoYXQncyB3aGF0IEknbSBibG9nZ2luZyBhYm91dFwiXG4gICAgXCJIYXZlIHlvdSBndXlzIGJlZW4gYmxvZ2dpbmc/XCJcbiAgICBcIkhvbGQgYWxsIG15IGNhbGxzLCBJJ20gYmxvZ2dpbmdcIlxuICAgIFwiVGVsbCBEb25uaWUgSSdtIGJsb2dnaW5nIGFuZCBJJ2xsIGNhbGwgaGltIGJhY2tcIlxuICAgIFwiSSBnb3R0YSBydW4sIHlvdSBzaG91bGQgYmUgYmxvZ2dpbmdcIlxuICAgIFwiSSB3YW50IHlvdSBvbiB0aGUgcGhvbmUsIGJ1dCBJIGFsc28gd2FudCB5b3UgYmxvZ2dpbmdcIlxuICBdXG5cbiAgQmxvZzogKGVsLCBuYW1lLCB2YWx1ZT1mYWxzZSkgLT5cblxuICAgIGVkaXRvciA9IGVsLmZpbmQoJy5ibG9nJykuc3VtbWVybm90ZVxuICAgICAgcGxhY2Vob2xkZXI6IEBwbGFjZWhvbGRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQHBsYWNlaG9sZGVycy5sZW5ndGgpXVxuICAgICAgY2FsbGJhY2tzOlxuICAgICAgICBvbkltYWdlVXBsb2FkOiAoZmlsZXMpIC0+XG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VVcGxvYWQgZmlsZXMsIHRoaXNcblxuICAgIGVsLmZpbmQoJy5ibG9nJykuc3VtbWVybm90ZSgnY29kZScsIHZhbHVlKSBpZiB2YWx1ZSBpc250IGZhbHNlXG5cbiAgICBAYmxvZ3MucHVzaCBuYW1lOiBuYW1lLCBlZGl0b3I6IGVkaXRvciwgZWw6IGVsLmZpbmQoJy5ibG9nJylcblxuICBibG9nR2V0Q29kZTogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICByZXR1cm4gYmxvZy5lbC5zdW1tZXJub3RlKCdjb2RlJykgaWYgYmxvZy5uYW1lIGlzIG5hbWVcbiBcbiAgYmxvZ0ZvY3VzOiAobmFtZSkgLT5cbiAgICBmb3IgYmxvZyBpbiBAYmxvZ3NcbiAgICAgIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gICAgICAgICQoJy5ub3RlLWVkaXRhYmxlJykuZm9jdXMoKVxuXG4gIGltYWdlVXBsb2FkOiAoZmlsZXMsIGVsKSAtPlxuXG4gICAgZmQgPSBuZXcgRm9ybURhdGEoKVxuICAgIGZkLmFwcGVuZCAnZmlsZScsIGZpbGVzWzBdXG5cbiAgICBfLnBvc3RcbiAgICAgIHhocjogLT5cbiAgICAgICAgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lciAncHJvZ3Jlc3MnLCAoZSkgLT5cbiAgICAgICAgICBjb21wbGV0ZSA9IGUubG9hZGVkIC8gZS50b3RhbFxuICAgICAgICAgIGlmIGNvbXBsZXRlIDwgMSB0aGVuIE5vdGljZS5pICdVcGxvYWRpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAgIGlmIGNvbXBsZXRlIGlzIDEgdGhlbiBOb3RpY2UuaSAnUHJvY2Vzc2luZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICwgZmFsc2VcbiAgICAgICAgcmV0dXJuIHhoclxuXG4gICAgICB1cmw6ICcvYXBpL3VwbG9hZCdcbiAgICAgIGRhdGE6IGZkXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZVxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgICBlcnJvcjogLT5cbiAgICAgICAgTm90aWNlLmQoKVxuICAgICAgc3VjY2VzczogKHJlc3VsdCkgLT5cbiAgICAgICAgJChlbCkuc3VtbWVybm90ZSgnZWRpdG9yLmluc2VydEltYWdlJywgcmVzdWx0LmRhdGEudXJsKVxuICAgICAgICBOb3RpY2UuaSAnRmlsZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcblxuICBUYWdzOiAoZWwsIG5hbWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5zZWxlY3RpemVcbiAgICAgIHBsdWdpbnM6IFsncmVzdG9yZV9vbl9iYWNrc3BhY2UnLCdyZW1vdmVfYnV0dG9uJ11cbiAgICAgIGRlbGltaXRlcjogJywnXG4gICAgICBwZXJzaXN0OiBmYWxzZVxuICAgICAgY3JlYXRlOiAoaW5wdXQpIC0+XG4gICAgICAgIHZhbHVlOiBpbnB1dFxuICAgICAgICB0ZXh0OiBpbnB1dFxuXG4gIERhdGU6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSdcblxuICBEYXRlVGltZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLmZsYXRwaWNrclxuICAgICAgZGF0ZUZvcm1hdDogJ20vZC9ZIGg6aSBLJ1xuICAgICAgZW5hYmxlVGltZTogdHJ1ZVxuXG4gIERhdGVSYW5nZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLmZsYXRwaWNrclxuICAgICAgZGF0ZUZvcm1hdDogJ20vZC9ZJ1xuICAgICAgbW9kZTogJ3JhbmdlJ1xuXG4gIERhdGVUaW1lUmFuZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSBoOmkgSydcbiAgICAgIGVuYWJsZVRpbWU6IHRydWVcbiAgICAgIG1vZGU6ICdyYW5nZSdcblxuICBJbWFnZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cblxuICAgIEBpbWFnZUhhbmRsZXJzIGVsXG5cbiAgICAjIHByZWxvYWQgZXhpc3RpbmcgaW1hZ2VzXG4gICAgaWYgdmFsdWUgaXNudCB1bmRlZmluZWRcbiAgICAgIEVudGl0aWVzLmNyb3BwZXIodmFsdWUsIGVsKVxuICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gdmFsdWVcblxuXG4gIGltYWdlSGFuZGxlcnM6IChlbCwgbmFtZSkgLT5cblxuICAgIGVsLm9uICdkcmFnb3ZlcicsIEBpbWFnZUhhbmRsZXIuZHJhZ292ZXJcbiAgICBlbC5vbiAnZHJhZ2xlYXZlJywgQGltYWdlSGFuZGxlci5kcmFnbGVhdmVcbiAgICBlbC5vbiAnZHJhZ2VudGVyIGRyYWdvdmVyJywgQGltYWdlSGFuZGxlci5jYW5jZWxcbiAgICBlbC5vbiAnZHJvcCBkcmFnZHJvcCcsIEBpbWFnZUhhbmRsZXIuZHJvcFxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEuc2VsZWN0Jykub24gJ2NsaWNrJywgQGltYWdlSGFuZGxlci5jaG9vc2VGaWxlXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YS5zYXZlJykub24gJ2NsaWNrJywgQGltYWdlSGFuZGxlci5zYXZlXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gaW5wdXQ6ZmlsZScpLm9uICdjaGFuZ2UnLCBAaW1hZ2VIYW5kbGVyLmNoYW5nZVxuXG4gIGltYWdlSGFuZGxlcjpcblxuICAgIGRyYWdvdmVyOiAtPlxuICAgICAgXy5vbiAkKHRoaXMpLmZpbmQoJy5pbnB1dC1pbWFnZScpXG4gICAgZHJhZ2xlYXZlOiAtPlxuICAgICAgXy5vZmYgJCh0aGlzKS5maW5kKCcuaW5wdXQtaW1hZ2UnKVxuICAgIGNhbmNlbDogLT5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIGRyb3A6IChlKSAtPlxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgXy5vZmYgJCh0aGlzKS5maW5kICcuaW5wdXQtaW1hZ2UnXG5cbiAgICAgIGlmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgYW5kIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoXG4gICAgICAgIGZpbGVzID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgICBFbnRpdGllcy5sb2FkQ3JvcHBlciBmaWxlc1swXSwgJCh0aGlzKVxuXG4gICAgY2hvb3NlRmlsZTogLT5cbiAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXQnKS50cmlnZ2VyICdjbGljaydcblxuICAgIGNoYW5nZTogLT5cbiAgICAgIGlmICQodGhpcylbMF0uZmlsZXNcbiAgICAgICAgZmlsZXMgPSAkKHRoaXMpWzBdLmZpbGVzXG5cbiAgICAgICAgRW50aXRpZXMubG9hZENyb3BwZXIgZmlsZXNbMF0sICQodGhpcykucGFyZW50KCkucGFyZW50KClcblxuICAgIHNhdmU6IC0+XG5cbiAgICAgIG5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEgJ25hbWUnXG4gICAgICBpbmRleCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZGF0YSAnaW5kZXgnXG5cbiAgICAgIFNwaW5uZXIuaSgkKFwiLmVudGl0eV9pbmRleF8je2luZGV4fVwiKSlcblxuICAgICAgRW50aXRpZXMuY3JvcHNbbmFtZV0uZ2V0Q3JvcHBlZENhbnZhcygpLnRvQmxvYiAoYmxvYikgLT5cbiAgICAgICAgQ2xpZW50LmltYWdlVXBsb2FkIGJsb2IsIChyZXN1bHQpIC0+XG4gICAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgICBFbnRpdGllcy5pbWFnZXNbbmFtZV0gPSByZXN1bHQuZGF0YS51cmxcbiAgICAgICwgJ2ltYWdlL2pwZWcnXG5cbiAgbG9hZENyb3BwZXI6IChmaWxlLCBlbCkgLT5cblxuICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcblxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAtPlxuICAgICAgRW50aXRpZXMuY3JvcHBlciByZWFkZXIucmVzdWx0LCBlbFxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMIGZpbGVcblxuICBjcm9wcGVyOiAodXJsLCBlbCkgLT5cblxuICAgIG5hbWUgPSBlbC5kYXRhICduYW1lJ1xuICAgIGluZGV4ID0gZWwuZGF0YSAnaW5kZXgnXG5cbiAgICBjb25zb2xlLmxvZyBuYW1lLCBpbmRleFxuXG4gICAgaWYgRW50aXRpZXMuY3JvcHNbbmFtZV0gaXNudCB1bmRlZmluZWRcbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmRlc3Ryb3koKVxuICAgICAgRW50aXRpZXMuY3JvcHNbbmFtZV0gPSBmYWxzZVxuXG4gICAgZWwuZmluZCgnLmNyb3BwZXInKS5hdHRyICdzcmMnLCB1cmxcblxuICAgIEVudGl0aWVzLmNyb3BzW25hbWVdID0gbmV3IENyb3BwZXIgZWwuZmluZCgnLmNyb3BwZXInKVswXSxcbiAgICAgIG1pbkNvbnRhaW5lckhlaWdodDogMzAwXG4gICAgICBtaW5DYW52YXNIZWlnaHQ6IDMwMFxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZVxuICAgICAgcHJldmlldzogXCJkaXYuZW50aXR5X2luZGV4XyN7aW5kZXh9ID4gZGl2LmlucHV0LWltYWdlID4gZGl2LnBpY3R1cmVcIlxuICAgICAgYXV0b0Nyb3BBcmVhOiAxXG4gICAgICBzdHJpY3Q6IGZhbHNlXG4gICAgICBoaWdobGlnaHQ6IHRydWVcblxuICAgIF8ub24gZWwuZmluZCgnLnNhdmUnKVxuXG5cbiIsIkVudHJpZXMgPVxuXG4gIGk6IC0+XG5cbiAgICAjIGxpbWl0IGZpbHRlciB0eXBlcyBiYXNlZCBvbiB1c2VyIHR5cGVcbiAgICBpZiBVc2VyPy5jbGllbnQgaXNudCB1bmRlZmluZWRcbiAgICAgIExpc3RpbmcuaSAnZW50cmllcycsIGZhbHNlLCBbJ3N0cnVjdHVyZSddXG4gICAgZWxzZVxuICAgICAgTGlzdGluZy5pICdlbnRyaWVzJywgZmFsc2UsIFsnY2xpZW50JywgJ3N0cnVjdHVyZSddXG4iLCJFbnRyeSA9XG5cbiAgc2VsZWN0U3RydWN0dXJlOiB7fVxuXG4gIF9pZDogZmFsc2VcbiAgc3RydWN0dXJlOiBmYWxzZVxuICBzZWxlY3RlZFN0cnVjdHVyZTogZmFsc2VcbiAgZW50cnk6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24uaGFzaC5tYXRjaCAvI3N0cnVjdHVyZT0oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEVudHJ5LnNlbGVjdGVkU3RydWN0dXJlID0gbWF0Y2hbMV1cblxuICAgIEBzZWxlY3RpemUoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9lbnRyaWVzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcbiAgICBlbHNlXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmZvY3VzKClcblxuICBzdHJ1Y3R1cmVTcGVjaWZpZWQ6IC0+XG4gICAgaWYgRW50cnkuc2VsZWN0ZWRTdHJ1Y3R1cmUgaXNudCBmYWxzZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBFbnRyeS5zZWxlY3RlZFN0cnVjdHVyZVxuXG4gIHNlbGVjdGl6ZTogLT5cblxuICAgIEBzZWxlY3RTdHJ1Y3R1cmUgPSBTZWxlY3RpemUuc3RydWN0dXJlcyAkKCcubW9kaWZ5ID4gLnN0cnVjdHVyZSA+IHNlbGVjdCcpLFxuICAgICAgRW50cnkuc3RydWN0dXJlU2VsZWN0SGFuZGxlclxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5jbGljayBAc3VibWl0XG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmFub3RoZXInKS5jbGljayBAYW5vdGhlclxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5jYW5jZWwnKS5jbGljayBAY2FuY2VsXG5cbiAgICAkKCcuZm9jdXNtZScpLmZvY3VzIC0+XG4gICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuXG4gIGxvYWQ6IChfaWQpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZW50cnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL2VudHJpZXMvJyxcbiAgICAgIF9pZDogX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBlbnRyeSA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgIEVudHJ5LmVudHJ5ID0gZW50cnlcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuYWRkT3B0aW9uXG4gICAgICAgIGlkOiBlbnRyeS5zdHJ1Y3R1cmUuaWQsIG5hbWU6IGVudHJ5LnN0cnVjdHVyZS5uYW1lLCBjbGllbnRQcm9maWxlOiBlbnRyeS5jbGllbnQucHJvZmlsZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBlbnRyeS5zdHJ1Y3R1cmUuaWRcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuZGlzYWJsZSgpXG5cbiAgc3VibWl0OiAtPlxuXG4gICAgbmFtZSA9ICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgIGVudGl0aWVzID0ge31cblxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5ID4gLmVudGl0eScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgZW50aXR5X25hbWUgPSAkKGVsKS5maW5kKCcubGFiZWwnKS5odG1sKClcbiAgICAgIHR5cGUgPSAkKGVsKS5kYXRhICd0eXBlJ1xuXG4gICAgICBzd2l0Y2ggdHlwZVxuICAgICAgICB3aGVuICdUZXh0JywnTGluaycsJ0RhdGUnLCdUaW1lJywnRGF0ZVRpbWUnLCdEYXRlUmFuZ2UnLCdEYXRlVGltZVJhbmdlJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKVxuICAgICAgICB3aGVuICdUYWdzJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKS5zcGxpdCAnLCdcbiAgICAgICAgd2hlbiAnQmxvZydcbiAgICAgICAgICBibG9nID0gRW50aXRpZXMuYmxvZ0dldENvZGUgZW50aXR5X25hbWVcbiAgICAgICAgICB2YWx1ZSA9IGJsb2dcbiAgICAgICAgd2hlbiAnSW1hZ2UnXG4gICAgICAgICAgdmFsdWUgPSBFbnRpdGllcy5pbWFnZXNbZW50aXR5X25hbWVdXG5cbiAgICAgIGVudGl0aWVzW2VudGl0eV9uYW1lXSA9IG5hbWU6IGVudGl0eV9uYW1lLCB0eXBlOiB0eXBlLCB2YWx1ZTogdmFsdWVcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuXG4gICAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5JykpXG5cbiAgICAgIGNhbGwgPSAnL2FwaS9lbnRyaWVzL2FkZCdcbiAgICAgIGlmIEVudHJ5Ll9pZCBpc250IGZhbHNlXG4gICAgICAgIGNhbGwgPSBcIi9hcGkvZW50cmllcy91cGRhdGUvI3tFbnRyeS5faWR9XCJcblxuICAgICAgXy5nZXQgY2FsbCxcbiAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICBzdHJ1Y3R1cmU6IEVudHJ5LnN0cnVjdHVyZVxuICAgICAgICBlbnRpdGllczogZW50aXRpZXNcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBpZiBFbnRyeS5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9lbnRyaWVzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgRW50cnkuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiAgICAgICAgXy5vbiAnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmFub3RoZXInXG5cbiAgYW5vdGhlcjogLT5cbiAgICBsb2NhdGlvbi5ocmVmID0gXCIvZW50cmllcy9uZXcjc3RydWN0dXJlPSN7RW50cnkuc3RydWN0dXJlfVwiXG4gIGNhbmNlbDogLT5cbiAgICBpZiBkb2N1bWVudC5yZWZlcnJlci5pbmRleE9mKHdpbmRvdy5sb2NhdGlvbi5ob3N0KSBpcyAtMVxuICAgICAgbG9jYXRpb24uaHJlZiA9IFwiL2VudHJpZXNcIlxuICAgIGVsc2VcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKVxuICBzdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyOiAoZSkgLT5cbiAgICBzdHJ1Y3R1cmVfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICByZXR1cm4gZmFsc2UgaWYgc3RydWN0dXJlX2lkLmxlbmd0aCBpc250IDI0XG4gICAgI2lmIEVudHJ5LmVudHJ5IGlzbnQgZmFsc2VcbiAgICAjICBFbnRyeS5sb2FkRW50aXRpZXMgRW50cnkuZW50cnkuZW50aXRpZXMsIEVudHJ5LmVudHJ5Lm5hbWVcbiAgICAjZWxzZVxuICAgIEVudHJ5LmxvYWRTdHJ1Y3R1cmUgc3RydWN0dXJlX2lkXG5cbiAgbG9hZFN0cnVjdHVyZTogKF9pZCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLFxuICAgICAgX2lkOiBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgPT5cbiAgICAgIEVudHJ5LnN0cnVjdHVyZSA9IF9pZFxuICAgICAgQGxvYWRFbnRpdGllcyByZXNwb25zZS5kYXRhWzBdLmVudGl0aWVzXG5cbiAgbG9hZEVudGl0aWVzOiAoZW50aXRpZXMsIG5hbWU9ZmFsc2UpIC0+XG5cbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSdcbiAgICBpZiBFbnRyeS5lbnRyeS5uYW1lIGlzbnQgZmFsc2VcbiAgICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoRW50cnkuZW50cnkubmFtZSlcblxuICAgIGJvZHkgPSAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keScpXG4gICAgYm9keS5odG1sICcnXG5cbiAgICB0YWJpbmRleCA9IDNcbiAgICBpbmRleCA9IDBcblxuICAgIGZvciBpLCBlbnRpdHkgb2YgZW50aXRpZXNcblxuICAgICAgaHRtbCA9ICQoXCIucGFnZS5lbnRyeSA+ICN0ZW1wbGF0ZSA+IC5lbnRpdHlfI3tlbnRpdHkudHlwZX1cIikuY2xvbmUoKVxuICAgICAgaHRtbC5hZGRDbGFzcyBcImVudGl0eV9pbmRleF8jeysraW5kZXh9XCJcbiAgICAgIGh0bWwuZGF0YSBcImluZGV4XCIsIGluZGV4XG4gICAgICBodG1sLmRhdGEgXCJuYW1lXCIsIGVudGl0eS5uYW1lXG5cbiAgICAgIGlmIEVudHJ5LmVudHJ5LmVudGl0aWVzP1tpXT8udmFsdWVcblxuICAgICAgICB2YWx1ZSA9IEVudHJ5LmVudHJ5LmVudGl0aWVzW2ldLnZhbHVlXG5cbiAgICAgICAgc3dpdGNoIGVudGl0eS50eXBlXG4gICAgICAgICAgd2hlbiAnVGFncycsICdUZXh0JywnTGluaycsJ0RhdGUnLCdUaW1lJywnRGF0ZVRpbWUnLCdEYXRlUmFuZ2UnLCdEYXRlVGltZVJhbmdlJyB0aGVuIGh0bWwuZmluZCgnaW5wdXQnKS52YWwgdmFsdWVcblxuICAgICAgaHRtbC5maW5kKCdpbnB1dCxzZWxlY3QsdGV4dGFyZWEnKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4KytcbiAgICAgIGJvZHkuYXBwZW5kIGh0bWxcblxuICAgICAgZW50aXR5RWwgPSAkKFwiLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmJvZHkgLmVudGl0eV9pbmRleF8je2luZGV4fVwiKVxuICAgICAgZW50aXR5RWwuZmluZCgnLmxhYmVsJykuaHRtbCBlbnRpdHkubmFtZVxuXG4gICAgICBpZiBFbnRpdGllc1tlbnRpdHkudHlwZV0gaXNudCB1bmRlZmluZWRcbiAgICAgICAgRW50aXRpZXNbZW50aXR5LnR5cGVdKGVudGl0eUVsLCBlbnRpdHkubmFtZSwgdmFsdWUpXG5cbiAgICAkKCdbdGFiaW5kZXg9Ml0nKS5mb2N1cygpXG4gICAgXy5vbiAnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLnN1Ym1pdCdcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0JykuYXR0ciAndGFiaW5kZXgnLCB0YWJpbmRleCsrXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmFub3RoZXInKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4XG4iLCJGaWx0ZXIgPVxuICBmaWx0ZXI6IGZhbHNlXG4gIGVuZHBvaW50OiBmYWxzZVxuICBmaWx0ZXJzOiBbXVxuXG4gIGk6IChmaWx0ZXJzKSAtPlxuXG4gICAgQGZpbHRlcnMgPSBmaWx0ZXJzXG5cbiAgICBfLm9uIFwiLmZpbHRlcl8je2ZpbHRlcn1cIiBmb3IgZmlsdGVyIGluIEBmaWx0ZXJzXG5cbiAgICBmb3IgZmlsdGVyIGluIEBmaWx0ZXJzXG4gICAgICBpZiBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIEZpbHRlci5zZWxlY3RlZCBmaWx0ZXJcblxuICAgICQoXCIubGlzdGluZ1wiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLmZpbHRlcnMgPiAuZmlsdGVyJywgQGhhbmRsZXJzLmZpbHRlckhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmdcIikub24gJ2NsaWNrJywgJy5saXN0LWhlYWRlciA+IC5maWx0ZXJzID4gLmZpbHRlciA+IC5vcHRpb25fc2VsZWN0ZWQgPiAuaWNvbi5jYW5jZWwnLCBAaGFuZGxlcnMuZmlsdGVyQ2xlYXJIYW5kbGVyXG5cbiAgZDogLT5cbiAgICBfLm9mZiBcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn1cIlxuICAgICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXQnKS52YWwgJydcbiAgICBGaWx0ZXIuaGFuZGxlcnMuZCgpXG4gICAgTGlzdGluZy51bnNlbGVjdEFsbCgpXG4gICAgI1NwaW5uZXIuZCgpXG5cbiAgZ2V0OiAoc2VhcmNoPW51bGwpIC0+XG4gICAgU3Bpbm5lci5pKCQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9ID4gLmlubmVyID4gLnZhbHVlc1wiKSlcblxuICAgIG9wdGlvbnMgPVxuICAgICAgdmlldzogJ2ZpbHRlcnMnXG5cbiAgICBvcHRpb25zLmRlbGV0ZWQgPSB0cnVlIGlmIExpc3RpbmcuZGVsZXRlZCBpcyB0cnVlXG5cbiAgICBmb3IgaW5kZXgsIGZpbHRlciBvZiBGaWx0ZXIuZmlsdGVyc1xuICAgICAgaWYgZmlsdGVyIGlzbnQgRmlsdGVyLmZpbHRlciBhbmQgUXVlcnkucGFyYW0oZmlsdGVyKSBpc250IHVuZGVmaW5lZFxuICAgICAgICBvcHRpb25zW2ZpbHRlciArICcubmFtZSddID0gUXVlcnkucGFyYW0gZmlsdGVyXG5cbiAgICBvcHRpb25zLm5hbWUgPSBzZWFyY2ggaWYgc2VhcmNoIGlzbnQgbnVsbFxuXG4gICAgXy5nZXQgXCIvYXBpLyN7QGVuZHBvaW50fVwiLCBvcHRpb25zXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMnKS5odG1sIHJlc3BvbnNlLnZpZXdcbiAgICAgIFNwaW5uZXIuZCgpXG5cbiAgc2VsZWN0OiAob3B0aW9uKSAtPlxuICAgIFF1ZXJ5LnBhcmFtICdwYWdlJywgZmFsc2VcbiAgICBRdWVyeS5wYXJhbSBGaWx0ZXIuZmlsdGVyLCBvcHRpb25cbiAgICBGaWx0ZXIuc2VsZWN0ZWQgRmlsdGVyLmZpbHRlclxuICAgIEZpbHRlci5kKClcbiAgICBMaXN0aW5nLmxvYWQoKVxuXG4gIHNlbGVjdGVkOiAoZmlsdGVyKSAtPlxuICAgIGlmIFF1ZXJ5LnBhcmFtKGZpbHRlcikgaXMgdW5kZWZpbmVkXG4gICAgICAkKFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkID4gLmNvcHlcIikuaHRtbCAnJ1xuICAgICAgXy5vbiBcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9kZWZhdWx0XCJcbiAgICAgIF8ub2ZmIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkXCJcbiAgICAgIHJldHVybiB0cnVlXG4gICAgJChcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9zZWxlY3RlZCA+IC5jb3B5XCIpLmh0bWwgUXVlcnkucGFyYW0gZmlsdGVyXG4gICAgXy5vZmYgXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fZGVmYXVsdFwiXG4gICAgXy5vbiBcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9zZWxlY3RlZFwiXG5cbiAgaGFuZGxlcnM6XG5cbiAgICBpOiAtPlxuXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2NsaWNrJywgJy5pbm5lciA+IC5sYWJlbCA+IC5pY29uLmNhbmNlbCcsIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2tleXVwJywnIC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dCcsIEBrZXlIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2NsaWNrJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAc2VsZWN0SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdtb3VzZW92ZXInLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBob3ZlckhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnYmx1cicsICBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdjbGljaycsIEBpbnNpZGVDaGVja1xuXG4gICAgICAkKGRvY3VtZW50KS5vbiAnY2xpY2snLCBAb3V0c2lkZUNoZWNrXG5cbiAgICBkOiAtPlxuXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdjbGljaycsICcuaW5uZXIgPiAubGFiZWwgPiAuaWNvbi5jYW5jZWwnLCBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAna2V5dXAnLCcgLmlubmVyID4gLnNlYXJjaCA+IGlucHV0JywgQGtleUhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAc2VsZWN0SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnbW91c2VvdmVyJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAaG92ZXJIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdibHVyJywgIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdjbGljaycsIEBpbnNpZGVDaGVja1xuXG4gICAgICAkKGRvY3VtZW50KS5vZmYgJ2NsaWNrJywgQG91dHNpZGVDaGVja1xuXG5cbiAgICBmaWx0ZXJDbGVhckhhbmRsZXI6IC0+XG4gICAgICBjb25zb2xlLmxvZyAnYWJvdXQgdG8gY2xlYXInXG4gICAgICBGaWx0ZXIuZmlsdGVyID0gJCh0aGlzKS5kYXRhICdmaWx0ZXInXG4gICAgICBGaWx0ZXIuc2VsZWN0IGZhbHNlXG4gICAgICBGaWx0ZXIuZCgpXG5cbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgZmlsdGVySGFuZGxlcjogLT5cbiAgICAgIEZpbHRlci5kKClcblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIEZpbHRlci5maWx0ZXIgPSAkKHRoaXMpLmRhdGEgJ2ZpbHRlcidcbiAgICAgIEZpbHRlci5lbmRwb2ludCA9ICQodGhpcykuZGF0YSAnZW5kcG9pbnQnXG5cblxuICAgICAgaWYgJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn1cIikuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBGaWx0ZXIuZCgpXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICBGaWx0ZXIuaGFuZGxlcnMuaSgpXG5cbiAgICAgICQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9ID4gLmlubmVyID4gLnZhbHVlc1wiKS5odG1sICcnXG4gICAgICBfLm9uIFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiXG4gICAgICAkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfSA+IC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dFwiKS5mb2N1cygpXG5cbiAgICAgIEZpbHRlci5nZXQoKVxuXG4gICAgaW5zaWRlQ2hlY2s6IC0+XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIG91dHNpZGVDaGVjazogLT5cbiAgICAgIEZpbHRlci5kKClcblxuICAgIGhvdmVySGFuZGxlcjogLT5cblxuICAgICAgXy5vZmYgJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlLm9uJ1xuICAgICAgXy5vbiAkKHRoaXMpXG5cbiAgICBzZWxlY3RIYW5kbGVyOiAtPlxuICAgICAgRmlsdGVyLnNlbGVjdCAkKHRoaXMpLmZpbmQoJy5uYW1lJykuaHRtbCgpXG5cbiAgICBrZXlIYW5kbGVyOiAtPlxuXG4gICAgICBrZXkgPSBldmVudC5rZXlDb2RlXG5cbiAgICAgIHN3aXRjaCBrZXlcbiAgICAgICAgd2hlbiAyNyB0aGVuIEZpbHRlci5kKClcbiAgICAgICAgd2hlbiA0MCwgMzkgdGhlbiBGaWx0ZXIubmF2ICdkb3duJ1xuICAgICAgICB3aGVuIDM3LDM4IHRoZW4gRmlsdGVyLm5hdiAndXAnXG4gICAgICAgIHdoZW4gMTMgdGhlbiBGaWx0ZXIuc2VsZWN0ICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlLm9uID4gLm5hbWUnKS5odG1sKClcbiAgICAgICAgZWxzZSBGaWx0ZXIuZ2V0ICQodGhpcykudmFsKClcblxuICAgICAgcmV0dXJuIHRydWVcblxuICBuYXY6IChkaXIpIC0+XG5cbiAgICBjdXIgPSAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZS5vbicpXG4gICAgbmV4dCA9IGN1ci5uZXh0KCkgaWYgZGlyIGlzICdkb3duJ1xuICAgIG5leHQgPSBjdXIucHJldigpIGlmIGRpciBpcyAndXAnXG4gICAgXy5vZmYgY3VyXG5cbiAgICBpZiBuZXh0Lmxlbmd0aCBpc250IDBcbiAgICAgIF8ub24gbmV4dFxuICAgICAgcmV0dXJuXG5cbiAgICBfLm9uICcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZTpmaXJzdC1jaGlsZCcgaWYgZGlyIGlzICdkb3duJ1xuICAgIF8ub24gJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlOmxhc3QtY2hpbGQnIGlmIGRpciBpcyAndXAnXG5cbiIsIkdsb2JhbCA9XG5cbiAgIyBrZXZpbiBvbHNvbiAoa2V2aW5AMjU2LmlvKSDwn4yA8J+Ot1xuXG4gIHdpbmRvdzogZmFsc2VcbiAgd2luZG93VGltZXI6IGZhbHNlXG4gIGluaXQ6IGZhbHNlXG4gIHByb3RlY3RlZDogWydlbnRyaWVzJywnc3RydWN0dXJlcycsJ2NsaWVudHMnLCd1c2VycyddXG5cbiAgaTogLT5cbiAgICBHbG9iYWwuaGFuZGxlcnMoKVxuICAgIEdsb2JhbC5sb2dpbkNoZWNrKClcblxuICAgICQoXCIubWVudSA+IC5vcHRpb25fI3tQYWdlfVwiKS5hZGRDbGFzcygnYWN0aXZlJykgaWYgUGFnZT9cblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5wcm9maWxlJykuY2xpY2sgR2xvYmFsLnVzZXJQcm9maWxlSGFuZGxlclxuICAgICQoJy5vYXV0aHMgPiAub2F1dGgnKS5jbGljayBHbG9iYWwudXNlck9hdXRoSGFuZGxlclxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5waWN0dXJlID4gLmxvZ291dCcpLmNsaWNrIEdsb2JhbC5sb2dvdXRIYW5kbGVyXG4gICAgJCgnLm1lbnUgPiAub3B0aW9uJykuY2xpY2sgR2xvYmFsLm1lbnVIYW5kbGVyXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgJCgnLm1lbnUgPiAub3B0aW9uJykucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAkKHRoaXMpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgU3Bpbm5lci5pKCQoJ2hlYWRlcicpKVxuXG4gIGxvZ291dEhhbmRsZXI6IC0+XG5cbiAgICBQcm9tcHQuaSAnTG9nb3V0JywgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0PycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgcmV0dXJuIGZhbHNlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcblxuICAgICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICAgIE1lLmxvZ291dCAtPlxuICAgICAgICBfLnN3YXAgJy5tZSA+IC5wcm9maWxlJ1xuICAgICAgICBfLnN3YXAgJy5tZSA+IC5waWN0dXJlJ1xuICAgICAgICBOb3RpY2UuaSAnTG9nb3V0IHN1Y2Nlc3NmdWwnLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcbiAgICAgICAgLCAxMjAwXG5cbiAgdXNlclByb2ZpbGVIYW5kbGVyOiAtPlxuXG4gICAgb2EgPSAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAub2F1dGhzJylcbiAgICB0bCA9IG5ldyBUaW1lbGluZU1heCByZXBlYXQ6IDBcblxuICAgIGlmIG9hLmhhc0NsYXNzICdvZmYnXG4gICAgICBfLm9uIG9hXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNjYW5jZWxTVkcnLCBlYXNlOlBvd2VyNC5lYXNlSW5PdXR9XG4gICAgZWxzZVxuICAgICAgdGwudG8gJyNwcm9maWxlU1ZHJywgMC44LCB7bW9ycGhTVkc6ICcjcHJvZmlsZVNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICAgIF8ub2ZmIG9hLCBvZmZpbmc6IDAuNVxuXG4gIHVzZXJPYXV0aEhhbmRsZXI6IC0+XG5cbiAgICB0eXBlID0gJCh0aGlzKS5kYXRhICd0eXBlJ1xuXG4gICAgcmV0dXJuIHRydWUgaWYgdHlwZSBpcyAnY2FuY2VsJ1xuXG4gICAgR2xvYmFsLm9hdXRoV2luZG93ICcvbG9hZGluZydcblxuICAgIFNwaW5uZXIuaSAkKCdoZWFkZXInKVxuXG4gICAgcGFyYW1zID0ge31cbiAgICBwYXJhbXMuaW52aXRlID0gSW52aXRlLmhhc2ggaWYgSW52aXRlLmhhc2hcblxuICAgIE1lLm9hdXRoIHR5cGUsIHBhcmFtcywgKHVyaSkgLT5cbiAgICAgIEdsb2JhbC53aW5kb3cubG9jYXRpb24uaHJlZiA9IHVyaVxuXG4gIG9hdXRoV2luZG93OiAodXJsKSAtPlxuICAgIHcgPSA2NDBcbiAgICBoID0gNTUwXG4gICAgbGVmdCA9IChzY3JlZW4ud2lkdGgvMikgLSAody8yKVxuICAgIHRvcCA9IChzY3JlZW4uaGVpZ2h0LzIpIC0gKGgvMilcblxuXG4gICAgR2xvYmFsLndpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgJ0xvZ2luIC8gUmVnaXN0ZXInLCBcInRvb2xiYXI9bm8sIGxvY2F0aW9uPW5vLCBkaXJlY3Rvcmllcz1ubywgc3RhdHVzPW5vLCBtZW51YmFyPW5vLCBzY3JvbGxiYXJzPW5vLCByZXNpemFibGU9bm8sIGNvcHloaXN0b3J5PW5vLCB3aWR0aD0je3d9LGhlaWdodD0je2h9LHRvcD0je3RvcH0sbGVmdD0je2xlZnR9XCIpXG4gICAgR2xvYmFsLndpbmRvdy5mb2N1cyBpZiB3aW5kb3cuZm9jdXNcbiAgICBHbG9iYWwud2luZG93VGltZXIgPSBzZXRJbnRlcnZhbCAtPlxuICAgICAgaWYgR2xvYmFsLndpbmRvdy5jbG9zZWRcbiAgICAgICAgY2xlYXJJbnRlcnZhbCBHbG9iYWwud2luZG93VGltZXJcbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgY29uc29sZS5sb2cgJ2Nsb3Npbmcgb3VyIHNoaXRlJ1xuICAgICwgNTBcblxuICAgIHJldHVyblxuXG4gIG9hdXRoQ29tcGxldGU6ICh1c2VyKSAtPlxuICAgIFNwaW5uZXIuZCgpXG4gICAgR2xvYmFsLmxvZ2luIHVzZXJcbiAgICBOb3RpY2UuaSAnTG9naW4gc3VjY2Vzc2Z1bCcsIHR5cGU6ICdzdWNjZXNzJ1xuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2VudHJpZXMnXG4gICAgICAyMDAwXG4gICAgZWxzZVxuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG4gICAgICAyMDAwXG5cbiAgbG9naW46ICh1c2VyKSAtPlxuXG4gICAgd2luZG93LlVzZXIgPSB1c2VyXG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5pbWFnZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5waWN0dXJlfSlcIlxuICAgIF8ub2ZmICcubWUgPiAucHJvZmlsZSdcbiAgICBfLm9mZiAnLm1lID4gLm9hdXRocydcbiAgICBfLm9uICcubWUgPiAucGljdHVyZSdcblxuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50ID4gLm5hbWUnKS5odG1sIFVzZXIuY2xpZW50Lm5hbWVcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5jbGllbnQgPiAucGljdHVyZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5jbGllbnQucHJvZmlsZX0pXCJcbiAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5jbGllbnQnXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLmxvZ28nXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLm5hbWUnXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3B0aW9uX2NsaWVudHMnXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3B0aW9uX3N0cnVjdHVyZXMnXG4gICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSdcblxuICBsb2dpbkNoZWNrOiAtPlxuXG4gICAgTWUuYXV0aGVkIChyZXN1bHQpIC0+XG5cbiAgICAgIEdsb2JhbC5sb2dpbihyZXN1bHQpIGlmIHJlc3VsdCBpc250IGZhbHNlXG5cbiAgICAgICMgaWYgdGhlIHBhZ2Ugd2VyZSBvbiBcbiAgICAgIGlmIEdsb2JhbC5wcm90ZWN0ZWQuaW5kZXhPZihsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC8vZywgJycpKSBpc250IC0xIGFuZCByZXN1bHQgaXMgZmFsc2VcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuXG4gICAgICBpZiBHbG9iYWwuaW5pdCBpc250IGZhbHNlIGFuZCAoIHJlc3VsdCBpc250IGZhbHNlIG9yIEdsb2JhbC5pbml0IGlzICdJbnZpdGUnIClcbiAgICAgICAgd2luZG93W0dsb2JhbC5pbml0XS5pKClcblxuICAgICAgIyB0dXJuIG9uIGFsbCBsb2dpbiAvIHJlZ2lzdHJhdGlvbiBkaXZzXG4gICAgICBpZiB3aW5kb3cuVXNlciBpcyB1bmRlZmluZWRcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8ub24gJy5wYWdlLmhvbWUnXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5sb2dvJ1xuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcblxuICAgICAgIyBjbGllbnQgYmFzZWQgdXNlciwgZ28gdG8gZW50cmllc1xuICAgICAgaWYgVXNlcj8uY2xpZW50IGlzbnQgdW5kZWZpbmVkIGFuZCBQYWdlIGlzbnQgJ2VudHJpZXMnXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2VudHJpZXMnXG5cbiAgICAgIGlmIHdpbmRvdy5Vc2VyIGlzbnQgdW5kZWZpbmVkIGFuZCBVc2VyLmNsaWVudCBpcyB1bmRlZmluZWRcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLmxvZ28nXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5uYW1lJ1xuICAgICAgICBfLm9uICcubWVudSdcbiIsIl8uY29uc3RydWN0b3IoKVxuXG5jbGFzcyBJbmRleFxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy50b3AgLmJ1cmdlcicpLmNsaWNrIEBtb2JpbGVcblxuICBtb2JpbGU6IC0+XG4gICAgXy5zd2FwICcudG9wID4gLmJ1cmdlcidcbiAgICBfLnN3YXAgJy50b3AgPiAubWVudSdcbiIsIkludml0ZSA9XG4gIGhhc2g6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5pbnZpdGUnKSlcblxuICAgIGlmIFVzZXI/IGlzbnQgZmFsc2VcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgICBQcm9tcHQuaSAnSW52aXRlIEVyb3JyJywgJ1lvdSBhcmUgY3VycmVudGx5IGxvZ2dlZCBpbicsIFsnT0snXSwge30sIC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcblxuICAgIGVsc2VcbiAgICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL2ludml0ZVxcLyhbMC05YS1mQS1GXXs4fSkvXG4gICAgICAgIEBoYXNoID0gbWF0Y2hbMV1cbiAgICAgICAgQGxvYWQgQGhhc2hcbiAgICAgIGVsc2VcblxuICBsb2FkOiAoaGFzaCkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2ludml0ZS9nZXQnLFxuICAgICAgaGFzaDogaGFzaFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3VsdCkgLT5cbiAgICAgIGludml0ZSA9IHJlc3VsdC5kYXRhLmludml0ZVxuXG4gICAgICAkKCcucGFnZS5pbnZpdGUgPiAucHJvZmlsZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsXCJ1cmwoI3tpbnZpdGUuY2xpZW50LnByb2ZpbGV9KVwiXG4gICAgICAkKCcucGFnZS5pbnZpdGUgPiAudGl0bGUnKS5odG1sIGludml0ZS5jbGllbnQubmFtZVxuIiwiTGlzdGluZyA9XG4gIGNvbnRlbnQ6IGZhbHNlXG4gIHNlbGVjdGVkOiBbXVxuICBmaWx0ZXJzOiBbXVxuICBzZWxlY3RlZEN1cnNvcjogMFxuICBkZWxldGVkOiBmYWxzZVxuXG4gIG90aGVyQWN0aW9uczogZmFsc2VcblxuICBpOiAoY29udGVudCwgb3RoZXJBY3Rpb25zPWZhbHNlLCBmaWx0ZXJzPVtdKSAtPlxuXG4gICAgQGZpbHRlcnMgPSBmaWx0ZXJzXG4gICAgQGNvbnRlbnQgPSBjb250ZW50XG4gICAgQG90aGVyQWN0aW9ucyA9IG90aGVyQWN0aW9uc1xuXG4gICAgaWYgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignZGVsZXRlZCcpIGlzbnQgLTFcbiAgICAgIF8ub24gXCIucGFnZS4je0Bjb250ZW50fSA+IC5hY3RpdmUuZGVsZXRlZFwiXG4gICAgICBAZGVsZXRlZCA9IHRydWVcbiAgICAgIF8ub2ZmICcuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbi5kZWxldGUnXG4gICAgICBfLm9uICcuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbi5yZXN0b3JlJ1xuICAgICAgXy5vbiAnLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb24uZm9yY2UnXG4gICAgICBfLm9mZiBcIi5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uXyN7TGlzdGluZy5jb250ZW50fVwiXG4gICAgZWxzZVxuICAgICAgXy5vbiAkKFwiLnBhZ2UuI3tAY29udGVudH0gPiAuZGVsZXRlZFwiKS5ub3QgJy5hY3RpdmUnXG4gICAgICBfLm9uIFwiLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb25fI3tMaXN0aW5nLmNvbnRlbnR9XCJcblxuICAgIFNlYXJjaC5pKClcbiAgICBAbG9hZCgpXG4gICAgQGhhbmRsZXJzKClcblxuICAgIEZpbHRlci5pIEBmaWx0ZXJzIGlmIEBmaWx0ZXJzLmxlbmd0aCA+IDBcblxuICBoYW5kbGVyczogLT5cbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5jaGVja2JveCcsIEBjaGVja2JveEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5zd2l0Y2gnLCBAc3dpdGNoSGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2hhbmdlJywgJy5saXN0LWhlYWRlciA+IC5jaGVja2JveCA+IGlucHV0JywgQHNlbGVjdEFsbEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NoYW5nZScsICcuY2hlY2tib3ggPiBpbnB1dCcsIEBzdGF0ZUhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uJywgQGFjdGlvbkhhbmRsZXJcblxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnPiAuaW5uZXIgPiAucGFnaW5hdGUgPiAuaW5uZXIgPiAubnVtJywgQHBhZ2VIYW5kbGVyXG5cbiAgY2hlY2tib3hIYW5kbGVyOiAtPlxuICAgIGNiID0gJCh0aGlzKS5maW5kICdpbnB1dCdcbiAgICBpZiBldmVudC50YXJnZXQudHlwZSBpc250ICdjaGVja2JveCdcbiAgICAgIGNiWzBdLmNoZWNrZWQgPSAhY2JbMF0uY2hlY2tlZFxuICAgICAgY2IuY2hhbmdlKClcblxuICBzd2l0Y2hIYW5kbGVyOiAtPlxuXG4gICAgZWwgPSAkKHRoaXMpXG5cbiAgICBfaWQgPSBlbC5kYXRhICdfaWQnXG4gICAgbmFtZSA9IGVsLmRhdGEgJ25hbWUnXG4gICAgdmFsdWUgPSAhZWwuaGFzQ2xhc3MgJ29uJ1xuXG4gICAgTGlzdGluZy50b2dnbGUgW19pZF0sIG5hbWUsIHZhbHVlLCAtPlxuICAgICAgXy5zd2FwIGVsXG5cbiAgdG9nZ2xlOiAoaWRzLCBuYW1lLCB2YWx1ZSwgY29tcGxldGUpIC0+XG5cbiAgICBpZHMuZm9yRWFjaCAoX2lkLCBpbmRleCkgLT5cblxuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgICBvcHRpb25zW25hbWVdID0gdmFsdWVcblxuICAgICAgXy5nZXQgXCIvYXBpLyN7TGlzdGluZy5jb250ZW50fS91cGRhdGUvI3tfaWR9XCIsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgIC5kb25lIChyZXNwb3NuZSkgLT5cbiAgICAgICAgaWYgaW5kZXggaXMgaWRzLmxlbmd0aC0xXG4gICAgICAgICAgTm90aWNlLmkgXCJVcGRhdGVkIHN1Y2Nlc3NmdWxseVwiLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgICBjb21wbGV0ZT8oKVxuXG4gIHNlbGVjdEFsbEhhbmRsZXI6IC0+XG4gICAgaWYgdGhpcy5jaGVja2VkXG4gICAgICAkKCcubGlzdGluZyA+IC5pbm5lciA+IC5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXQnKS5wcm9wICdjaGVja2VkJywgdHJ1ZVxuICAgIGVsc2VcbiAgICAgICQoJy5saXN0aW5nID4gLmlubmVyID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuXG4gIHVuc2VsZWN0QWxsOiAtPlxuICAgICAgJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fSA+IC5pbm5lciA+IC5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXRcIikucHJvcCAnY2hlY2tlZCcsIGZhbHNlXG4gICAgICAkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9ID4gLmxpc3QtaGVhZGVyID4gLmNoZWNrYm94ID4gaW5wdXRcIikucHJvcCAnY2hlY2tlZCcsIGZhbHNlXG4gICAgICBMaXN0aW5nLnN0YXRlSGFuZGxlcigpXG5cbiAgc3RhdGVIYW5kbGVyOiAtPlxuICAgIGlkcyA9IFtdXG5cbiAgICAkKCcuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBpZiBlbC5jaGVja2VkXG4gICAgICAgIGlkcy5wdXNoICQoZWwpLmRhdGEgJ19pZCdcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuICAgICAgaWYgaWRzLmxlbmd0aCA+IDBcbiAgICAgICAgJCgnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucyA+IC5jb3B5ID4gLnZhbHVlJykudGV4dCBpZHMubGVuZ3RoXG4gICAgICAgIF8ub2ZmICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cydcbiAgICAgICAgXy5vZmYgJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnNlYXJjaCdcbiAgICAgICAgXy5vbiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucydcbiAgICAgIGVsc2VcbiAgICAgICAgXy5vbiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMnXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnNlYXJjaCdcbiAgICAgICAgXy5vZmYgJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMnXG4gICAgICBMaXN0aW5nLnNlbGVjdGVkID0gaWRzXG5cbiAgcGFnZUxpbmtzOiAtPlxuICAgIHBhcmFtcyA9IFF1ZXJ5LnBhcmFtcygpXG4gICAgJCgnLnBhZ2luYXRlID4gLmlubmVyID4gLm51bScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgcGFnZSA9ICQoZWwpLmRhdGEgJ3BhZ2UnXG4gICAgICByZXR1cm4gaWYgcGFnZSBpcyB1bmRlZmluZWRcbiAgICAgIHBhcmFtcy5wYWdlID0gcGFnZVxuICAgICAgcXVlcnkgPSBRdWVyeS5zdHJpbmdpZnkgcGFyYW1zXG4gICAgICAkKGVsKS5hdHRyICdocmVmJywgXCI/I3tRdWVyeS5zdHJpbmdpZnkocGFyYW1zKX1cIlxuXG4gIHBhZ2VIYW5kbGVyOiAtPlxuICAgIHBhZ2UgPSAkKHRoaXMpLmRhdGEgJ3BhZ2UnXG4gICAgcmV0dXJuIHRydWUgaWYgcGFnZSBpcyB1bmRlZmluZWRcbiAgICBMaXN0aW5nLnVuc2VsZWN0QWxsKClcbiAgICBRdWVyeS5wYXJhbSAncGFnZScsIHBhZ2VcbiAgICBMaXN0aW5nLmxvYWQoKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGFjdGlvbkhhbmRsZXI6IC0+XG4gICAgdHlwZSA9ICQodGhpcykuZGF0YSAndHlwZSdcblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdkZWxldGUnXG4gICAgICAgIFByb21wdC5pIFwiRGVsZXRpbmcgI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gaXRlbShzKVwiLFxuICAgICAgICAgICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZXNlPycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmV0dXJuIHRydWUgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuICAgICAgICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCgpXG4gICAgICB3aGVuICdyZXN0b3JlJ1xuICAgICAgICBQcm9tcHQuaSBcIlJlc3RvcmluZyAje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBpdGVtKHMpXCIsXG4gICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZXN0b3JlIHRoZXNlPycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmV0dXJuIHRydWUgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuICAgICAgICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCAwLCAncmVzdG9yZSdcbiAgICAgIHdoZW4gJ2ZvcmNlJ1xuICAgICAgICBQcm9tcHQuaSBcIkRlbGV0aW5nICN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IGl0ZW0ocylcIixcbiAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIFBFUk1BTkVOVExZIGRlbGV0ZSB0aGVzZT8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJldHVybiB0cnVlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcbiAgICAgICAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQgMCwgJ2ZvcmNlJ1xuXG4gICAgICB3aGVuICdwdWJsaXNoJywgJ2hpZGUnXG5cbiAgICAgICAgdmFsdWUgPSAodHlwZSBpcyAncHVibGlzaCcpXG4gICAgICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuICAgICAgICBMaXN0aW5nLnRvZ2dsZSBMaXN0aW5nLnNlbGVjdGVkLCAnYWN0aXZlJywgdmFsdWUsIC0+XG5cbiAgICAgICAgICAkKCcuc3dpdGNoLmFjdGl2ZScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgICAgICAgZm9yIF9pZCBpbiBMaXN0aW5nLnNlbGVjdGVkXG4gICAgICAgICAgICAgIF8ub24gJChlbCkgaWYgX2lkIGlzICQoZWwpLmRhdGEoJ19pZCcpIGFuZCB2YWx1ZSBpcyB0cnVlXG4gICAgICAgICAgICAgIF8ub2ZmICQoZWwpIGlmIF9pZCBpcyAkKGVsKS5kYXRhKCdfaWQnKSBhbmQgdmFsdWUgaXMgZmFsc2VcblxuICAgICAgICAgIGlmIHZhbHVlXG4gICAgICAgICAgICBOb3RpY2UuaSBcIiN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IEVudHJpZXMgcHVibGlzaGVkXCIsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIE5vdGljZS5pIFwiI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gRW50cmllcyBoaWRkZW5cIiwgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgU3Bpbm5lci5kKClcblxuXG4gICAgICBlbHNlXG4gICAgICAgIExpc3Rpbmcub3RoZXJBY3Rpb25zKHR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgZGVsZXRlOiAoaWQsdHlwZT0nZGVsZXRlJyxjYWxsYmFjaykgLT5cblxuICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuICAgIF8uZ2V0IFwiL2FwaS8je0xpc3RpbmcuY29udGVudH0vI3t0eXBlfS8je2lkfVwiXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBjYWxsYmFjayB0cnVlXG4gICAgLmZhaWwgLT5cbiAgICAgIGNhbGxiYWNrIGZhbHNlXG5cbiAgZGVsZXRlU2VsZWN0ZWQ6IChjdXJzb3I9MCx0eXBlPSdkZWxldGUnKSAtPlxuXG4gICAgaWYgTGlzdGluZy5zZWxlY3RlZC5sZW5ndGggaXMgY3Vyc29yXG4gICAgICBpZiB0eXBlIGlzICdkZWxldGUnXG4gICAgICAgIE5vdGljZS5pICdEZWxldGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgaWYgdHlwZSBpcyAncmVzdG9yZSdcbiAgICAgICAgTm90aWNlLmkgJ1Jlc3RvcmVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgaWYgdHlwZSBpcyAnZm9yY2UnXG4gICAgICAgIE5vdGljZS5pICdQZXJtYW5lbnRseSBkZWxldGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgTGlzdGluZy51bnNlbGVjdEFsbCgpXG4gICAgICBAbG9hZCgpXG5cbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBMaXN0aW5nLmRlbGV0ZSBMaXN0aW5nLnNlbGVjdGVkW2N1cnNvcl0sdHlwZSwgKHJlc3VsdCkgLT5cbiAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQoKytjdXJzb3IsIHR5cGUpIGlmIHJlc3VsdCBpcyB0cnVlXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuXG4gICAgb3B0aW9ucyA9IHZpZXc6IHRydWVcblxuICAgIG9wdGlvbnMuZGVsZXRlZCA9IHRydWUgaWYgTGlzdGluZy5kZWxldGVkIGlzIHRydWVcblxuICAgIGZvciBmaWx0ZXIgaW4gQGZpbHRlcnNcbiAgICAgIGlmIFF1ZXJ5LnBhcmFtKGZpbHRlcikgaXNudCB1bmRlZmluZWRcbiAgICAgICAgb3B0aW9uc1tmaWx0ZXIgKyAnLm5hbWUnXSA9IFF1ZXJ5LnBhcmFtIGZpbHRlclxuICAgIGlmIFF1ZXJ5LnBhcmFtKCdwYWdlJykgaXNudCB1bmRlZmluZWRcbiAgICAgIG9wdGlvbnMucGFnZSA9IFF1ZXJ5LnBhcmFtICdwYWdlJ1xuICAgIGlmIFF1ZXJ5LnBhcmFtKCdzZWFyY2gnKSBpc250IHVuZGVmaW5lZFxuICAgICAgb3B0aW9ucy5zZWFyY2ggPSBRdWVyeS5wYXJhbSAnc2VhcmNoJ1xuXG4gICAgXy5nZXQgXCIvYXBpLyN7QGNvbnRlbnR9XCIsIG9wdGlvbnNcbiAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICBUaW1lLmkoKVxuICAgICAgU3Bpbm5lci5kKClcbiAgICAgICQoJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzID4gLmNvcHkgPiAudmFsdWUnKS50ZXh0IHJlc3BvbnNlLnBhZ2luYXRlLnRvdGFsXG4gICAgICAkKFwiLiN7QGNvbnRlbnR9ID4gLmNvbnRlbnQgPiAubGlzdGluZyA+IC5pbm5lclwiKS5odG1sIHJlc3BvbnNlLnZpZXdcbiAgICAgIExpc3RpbmcucGFnZUxpbmtzKClcblxuXG4iLCIiLCJNZSA9XG5cbiAgbG9nb3V0OiAoY29tcGxldGUpIC0+XG5cbiAgICBfLmdldCAnL2FwaS9hdXRoL2xvZ291dCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgY29tcGxldGUoKVxuXG4gIG9hdXRoOiAodHlwZSwgcGFyYW1zPXt9LCBjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0IFwiL2FwaS9hdXRoLyN7dHlwZX1cIiwgcGFyYW1zXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIGNvbXBsZXRlKHJlc3BvbnNlLmRhdGEudXJpKVxuXG4gIGF1dGhlZDogKHJlc3VsdCkgLT5cbiAgICBfLmdldCAnL2FwaS9hdXRoJ1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICByZXN1bHQgcmVzcG9uc2UuZGF0YS51c2VyXG5cbiAgZ2V0OlxuICAgIGNsaWVudElkOiAtPlxuICAgICAgcmV0dXJuIFVzZXIuY2xpZW50LmlkXG4iLCJOb3Rmb3VuZCA9XG4gIGk6IC0+XG4gICAgJCgnI2xpbmVlcnJvcicpLm5vdmFjYW5jeVxuICAgICAgJ3JlYmxpbmtQcm9iYWJpbGl0eSc6IDAuMVxuICAgICAgJ2JsaW5rTWluJzogMC4yXG4gICAgICAnYmxpbmtNYXgnOiAwLjZcbiAgICAgICdsb29wTWluJzogOFxuICAgICAgJ2xvb3BNYXgnOiAxMFxuICAgICAgJ2NvbG9yJzogJyNmZmZmZmYnXG4gICAgICAnZ2xvdyc6IFsnMCAwIDgwcHggI2ZmZmZmZicsICcwIDAgMzBweCAjMDA4MDAwJywgJzAgMCA2cHggIzAwMDBmZiddXG5cbiAgICAkKCcjbGluZWNvZGUnKS5ub3ZhY2FuY3lcbiAgICAgICdibGluayc6IDFcbiAgICAgICdvZmYnOiAxXG4gICAgICAnY29sb3InOiAnUmVkJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4IFJlZCcsICcwIDAgMzBweCBGaXJlQnJpY2snLCAnMCAwIDZweCBEYXJrUmVkJ11cbiIsIk5vdGljZSA9XG5cbiAgdHlwZXM6IFsnaW5mbycsJ3N1Y2Nlc3MnLCd3YXJuaW5nJ11cblxuICBlbDogZmFsc2VcblxuICBvbjogZmFsc2VcbiAgcHJvZ3Jlc3M6IGZhbHNlXG4gIHRpbWVvdXQ6IGZhbHNlXG4gIGNsb3NlOiB0cnVlXG5cbiAgZGVmYXVsdDpcbiAgICB0eXBlOiAnaW5mbydcbiAgICBwcm9ncmVzczogZmFsc2VcbiAgICB0aW1lb3V0OiA1MDAwXG5cbiAgaTogKGNvcHksb3B0aW9ucz17fSkgLT5cblxuICAgIEBvcHRpb25zID0gT2JqZWN0LmFzc2lnbiB7fSwgQGRlZmF1bHRcblxuICAgIGZvciBrZXksIHBhcmFtIG9mIG9wdGlvbnNcbiAgICAgIEBvcHRpb25zW2tleV0gPSBwYXJhbVxuXG4gICAgQGVsID0gJCgnLm5vdGljZScpIGlmIEBlbCBpcyBmYWxzZVxuXG4gICAgZm9yIGR0eXBlIGluIEB0eXBlc1xuICAgICAgQGVsLnJlbW92ZUNsYXNzIGR0eXBlXG4gICAgQGVsLmFkZENsYXNzIEBvcHRpb25zLnR5cGVcbiAgICBAZWwuZmluZCgnLmNvcHkgPiAubWVzc2FnZScpLmh0bWwgY29weVxuXG4gICAgaWYgQG9wdGlvbnMucHJvZ3Jlc3MgaXNudCBmYWxzZVxuICAgICAgaWYgQHByb2dyZXNzIGlzIGZhbHNlXG4gICAgICAgIF8ub24gQGVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgICAgICBAcHJvZ3Jlc3MgPSB0cnVlXG4gICAgICBpZiBAY2xvc2UgaXMgdHJ1ZVxuICAgICAgICBfLm9mZiBAZWwuZmluZCgnLmNsb3NlJylcbiAgICAgICAgQGNsb3NlID0gZmFsc2VcbiAgICAgIGlmIEBvbiBpcyBmYWxzZVxuICAgICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgICAgQGVsLmZpbmQoJy5mdWxsJykuY3NzKCd3aWR0aCcsIEBvcHRpb25zLnByb2dyZXNzKjEwMCArICclJylcbiAgICAgICAgLCAxMDBcbiAgICAgIGVsc2VcbiAgICAgICAgQGVsLmZpbmQoJy5mdWxsJykuY3NzKCd3aWR0aCcsIEBvcHRpb25zLnByb2dyZXNzKjEwMCArICclJylcblxuICAgIGlmIEBvcHRpb25zLnByb2dyZXNzIGlzIGZhbHNlIGFuZCBAcHJvZ3Jlc3MgaXMgdHJ1ZVxuICAgICAgQGVsLmZpbmQoJy5mdWxsJykuY3NzKCd3aWR0aCcsICcwJScpXG4gICAgICBfLm9mZiBAZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgICBAcHJvZ3Jlc3MgPSBmYWxzZVxuICAgICAgXy5vbiBAZWwuZmluZCgnLmNsb3NlJylcbiAgICAgIEBjbG9zZSA9IHRydWVcblxuICAgIGlmIEBvbiBpcyBmYWxzZVxuICAgICAgXy5vbiBAZWxcbiAgICAgIEBoYW5kbGVycy5vbigpXG4gICAgICBAb24gPSB0cnVlXG5cbiAgICBpZiBAb3B0aW9ucy50aW1lb3V0IGlzbnQgZmFsc2UgYW5kIEBvcHRpb25zLnByb2dyZXNzIGlzIGZhbHNlXG4gICAgICBAdGltZW91dCA9IHNldFRpbWVvdXQgPT5cbiAgICAgICAgQGQoKVxuICAgICAgLCBAb3B0aW9ucy50aW1lb3V0XG5cbiAgaGFuZGxlcnM6XG4gICAgb246IC0+XG4gICAgICAkKCcubm90aWNlJykub24gJ2NsaWNrJywgJy5pbm5lciA+IC5jbG9zZSA+IC5pbm5lcicsIE5vdGljZS5kXG4gICAgb2ZmOiAtPlxuICAgICAgJCgnLm5vdGljZScpLm9mZiAnY2xpY2snLCAnLmlubmVyID4gLmNsb3NlID4gLmlubmVyJywgTm90aWNlLmRcblxuICBkOiAtPlxuICAgIGNsZWFyVGltZW91dCBOb3RpY2UudGltZW91dCBpZiBOb3RpY2UudGltZW91dCBpc250IGZhbHNlXG4gICAgTm90aWNlLnRpbWVvdXQgPSBmYWxzZVxuICAgIE5vdGljZS5oYW5kbGVycy5vZmYoKVxuICAgIF8ub24gTm90aWNlLmVsLmZpbmQoJy5jbG9zZScpXG4gICAgTm90aWNlLmNsb3NlID0gdHJ1ZVxuICAgIF8ub2ZmIE5vdGljZS5lbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICBOb3RpY2UucHJvZ3Jlc3MgPSBmYWxzZVxuICAgIF8ub2ZmIE5vdGljZS5lbCwgb2ZmaW5nOiB0cnVlLCBvZmZ0aW1lOiAwLjJcbiAgICBOb3RpY2Uub24gPSBmYWxzZVxuIiwiUHJvbXB0ID1cbiAgZWw6IHt9XG4gIG9wdGlvbnM6IHt9XG4gIGNhbGxiYWNrOiBmYWxzZVxuICBwYXJhbXM6IHt9XG5cbiAgaTogKHRpdGxlLCBjb3B5LCBvcHRpb25zPVsnT0snXSwgcGFyYW1zLCBjYWxsYmFjaykgLT5cblxuICAgIFByb21wdC5jYWxsYmFjayA9IGZhbHNlXG4gICAgUHJvbXB0LnBhcmFtcyA9IGZhbHNlXG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBwYXJhbXMgaWYgdHlwZW9mIHBhcmFtcyBpcyAnZnVuY3Rpb24nXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gY2FsbGJhY2sgaWYgdHlwZW9mIGNhbGxiYWNrIGlzICdmdW5jdGlvbidcblxuICAgIFByb21wdC5wYXJhbXMgPSBwYXJhbXMgaWYgdHlwZW9mIHBhcmFtcyBpcyAnb2JqZWN0J1xuXG4gICAgUHJvbXB0LmVsID0gJCAnLnByb21wdCdcblxuICAgIFByb21wdC5lbC5maW5kICcudGl0bGUnXG4gICAgICAuaHRtbCB0aXRsZVxuICAgICAgLmF0dHIgJ3RpdGxlJywgdGl0bGVcbiAgICBQcm9tcHQuZWwuZmluZCAnLmNvcHknXG4gICAgICAuaHRtbCBjb3B5XG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAndGV4dGFyZWEnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLnRleHRhcmVhIGlzIHRydWVcbiAgICAgIF8ub24gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICAgIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCBwYXJhbXMudmFsdWVcblxuICAgIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCcgYW5kICdjbGlwYm9hcmQnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLmNsaXBib2FyZCBpcyB0cnVlXG4gICAgICBpbnB1dCA9IFByb21wdC5lbC5maW5kICcuaW5wdXQnXG4gICAgICBfLm9uIGlucHV0XG4gICAgICBpbnB1dC5maW5kKCdpbnB1dCcpLnZhbCBwYXJhbXMudmFsdWVcblxuXG4gICAgUHJvbXB0Lm9wdGlvbnMgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbnMgPiAub3B0aW9uJ1xuICAgIF8ub2ZmIFByb21wdC5vcHRpb25zXG4gICAgUHJvbXB0Lm9wdGlvbnMucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmFkZENsYXNzICdhY3RpdmUnXG5cbiAgICBmb3IgbyxpIGluIG9wdGlvbnNcbiAgICAgIG9wdGlvbiA9IFByb21wdC5lbC5maW5kIFwiLm9wdGlvbnMgID4gLm9wdGlvbl8je2krMX1cIlxuICAgICAgXy5vbiBvcHRpb25cbiAgICAgIG9wdGlvbi5odG1sIG9cbiAgICAgICAgLmRhdGEgJ3ZhbHVlJywgb1xuXG4gICAgXy5vbiBQcm9tcHQuZWwsXG4gICAgXy5vbiAnLmJmYWRlJ1xuXG4gICAgUHJvbXB0LmhhbmRsZXJzKClcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmZvY3VzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKGRvY3VtZW50KS5rZXlkb3duIFByb21wdC5rZXlkb3duXG4gICAgUHJvbXB0Lm9wdGlvbnMub24gJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbm5lciA+IC5jYW5jZWwnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2FuY2VsXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5jbGlwYm9hcmQnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2xpcGJvYXJkXG5cblxuICBjbGlwYm9hcmQ6IC0+XG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbnB1dCA+IGlucHV0Jykuc2VsZWN0KClcbiAgICBpZiBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG4gICAgICBOb3RpY2UuaSAnQ29waWVkIHRvIGNsaXBib2FyZCcsIHR5cGU6ICdzdWNjZXNzJ1xuICAgIGVsc2VcbiAgICAgIE5vdGljZS5pICdVbmFibGUgdG8gY2xpcGJvYXJkJywgdHlwZTogJ3dhcm5pbmcnXG5cbiAga2V5ZG93bjogLT5cbiAgICBrID0gZXZlbnQud2hpY2hcbiAgICBrZXlzID0gWzM5LCA5LCAzNywgMTMsIDI3XVxuICAgIHJldHVybiB0cnVlIGlmIGsgbm90IGluIGtleXNcblxuICAgIGN1cnJlbnQgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbi5vbi5hY3RpdmUnXG4gICAgc2hpZnQgPSB3aW5kb3cuZXZlbnQuc2hpZnRLZXlcblxuICAgIGlmIGsgaXMgMzkgb3IgKGsgaXMgOSBhbmQgIXNoaWZ0KVxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgaWYgY3VycmVudC5uZXh0KCkuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBjdXJyZW50Lm5leHQoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgZWxzZVxuICAgICAgICBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbl8xJykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAzNyBvciAoayBpcyA5IGFuZCBzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQucHJldigpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5wcmV2KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24ub24nKS5sYXN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAxM1xuICAgICAgUHJvbXB0LnRyaWdnZXIgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24uYWN0aXZlJykuZGF0YSAndmFsdWUnXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZiBrIGlzIDI3XG4gICAgICBQcm9tcHQudHJpZ2dlcihmYWxzZSlcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gIGNhbmNlbDogLT5cbiAgICBQcm9tcHQudHJpZ2dlciBmYWxzZVxuXG4gIGNsaWNrOiAtPlxuICAgIFByb21wdC50cmlnZ2VyICQodGhpcykuZGF0YSAndmFsdWUnXG5cbiAgdHJpZ2dlcjogKHZhbHVlKSAtPlxuICAgIF8ub2ZmIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgXy5vZmYgUHJvbXB0LmVsLCBvZmZpbmc6IGZhbHNlLCBvZmZ0aW1lOiAwLjJcbiAgICAjXy5vZmYgJy5iZmFkZScsIG9mZmluZzogZmFsc2UsIG9mZml0bWU6IDAuMlxuICAgIF8ub2ZmICcuYmZhZGUnXG4gICAgUHJvbXB0Lm9wdGlvbnMudW5iaW5kICdjbGljaycsIFByb21wdC5jbGlja1xuICAgICQoZG9jdW1lbnQpLnVuYmluZCAna2V5ZG93bicsIFByb21wdC5rZXlkb3duXG4gICAgaWYgUHJvbXB0LnBhcmFtcy50ZXh0YXJlYVxuICAgICAgdmFsID0gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsKClcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gcmVzcG9uc2U6IHZhbHVlLCB2YWw6IHZhbFxuICAgIGVsc2VcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gdmFsdWVcbiIsIlF1ZXJ5ID1cblxuICBnZXRRdWVyeTogLT5cbiAgICByZXR1cm4gbG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpXG5cbiAgc2V0UXVlcnk6IChwYXJhbXMpIC0+XG4gICAgcXVlcnkgPSBxcy5zdHJpbmdpZnkgcGFyYW1zXG4gICAgaWYgcXVlcnkgaXMgdW5kZWZpbmVkIG9yIHF1ZXJ5IGlzICcnXG4gICAgICBoaXN0b3J5LnB1c2hTdGF0ZSBudWxsLCBudWxsLCBsb2NhdGlvbi5wYXRobmFtZVxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGhpc3RvcnkucHVzaFN0YXRlIG51bGwsIG51bGwsIGxvY2F0aW9uLnBhdGhuYW1lICsgJz8nICsgcXVlcnlcbiAgICBcbiAgcGFyYW06IChrZXksIHZhbHVlKSAtPlxuXG4gICAgcXVlcnkgPSBAZ2V0UXVlcnkoKVxuXG4gICAgcGFyYW1zID0gcXMucGFyc2UgcXVlcnlcblxuICAgIHJldHVybiBwYXJhbXNba2V5XSBpZiB2YWx1ZSBpcyB1bmRlZmluZWRcblxuICAgIGlmIHZhbHVlIGlzIGZhbHNlXG4gICAgICBkZWxldGUgcGFyYW1zW2tleV1cbiAgICBlbHNlXG4gICAgICBwYXJhbXNba2V5XSA9IHZhbHVlXG4gICAgQHNldFF1ZXJ5IHBhcmFtc1xuXG4gIHBhcmFtczogLT5cbiAgICByZXR1cm4gcXMucGFyc2UgQGdldFF1ZXJ5KClcblxuICBzdHJpbmdpZnk6IChwYXJhbXMpIC0+XG4gICAgcmV0dXJuIHFzLnN0cmluZ2lmeSBwYXJhbXNcblxuIiwiU2VhcmNoID1cblxuICBpOiAtPlxuXG4gICAgaWYgUXVlcnkucGFyYW0oJ3NlYXJjaCcpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAkKCcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gaW5wdXQnKS52YWwgUXVlcnkucGFyYW0gJ3NlYXJjaCdcbiAgICAgICQoJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiBpbnB1dCcpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBfLm9uICcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gLmNhbmNlbCdcblxuICAgIEBoYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLmxpc3RpbmcnKS5vbiAnY2xpY2snLCAnLmNhbmNlbCcsIEBjYW5jZWxIYW5kbGVyXG4gICAgJCgnLmxpc3RpbmcnKS5vbiAna2V5dXAnLCAnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IGlucHV0JywgQHNlYXJjaEhhbmRsZXJcblxuICBjYW5jZWxIYW5kbGVyOiAtPlxuICAgICQoJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiBpbnB1dCcpLnZhbCAnJ1xuICAgIF8ub2ZmICcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gLmNhbmNlbCdcbiAgICAkKCcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gaW5wdXQnKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIGlmIFF1ZXJ5LnBhcmFtKCdzZWFyY2gnKSBpc250IHVuZGVmaW5lZFxuICAgICAgUXVlcnkucGFyYW0gJ3NlYXJjaCcsIGZhbHNlXG4gICAgICBMaXN0aW5nLmxvYWQoKVxuXG4gIHNlYXJjaEhhbmRsZXI6IC0+XG5cbiAgICBrZXkgPSBldmVudC5rZXlDb2RlXG5cbiAgICB2YWwgPSAkKHRoaXMpLnZhbCgpXG5cbiAgICBpZiB2YWwgaXNudCAnJ1xuICAgICAgJCgnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IGlucHV0JykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIF8ub24gJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiAuY2FuY2VsJ1xuICAgIGVsc2VcbiAgICAgICQoJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiBpbnB1dCcpLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBfLm9mZiAnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IC5jYW5jZWwnXG5cbiAgICBpZiBrZXkgaXMgMTNcbiAgICAgIFF1ZXJ5LnBhcmFtKCdzZWFyY2gnLCB2YWwpXG4gICAgICBMaXN0aW5nLmxvYWQoKVxuXG5cbiIsIlNlbGVjdGl6ZSA9XG5cbiAgY2xpZW50czogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0Q2xpZW50ID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIENsaWVudCBcIlxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PiN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS9jbGllbnRzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RDbGllbnQuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0Q2xpZW50XG5cbiAgc3RydWN0dXJlczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG5cbiAgICBzZWxlY3RTdHJ1Y3R1cmUgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIGEgU3RydWN0dXJlICAgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgb3Blbk9uRm9jdXM6IHRydWVcbiAgICAgIG9uTG9hZDogRW50cnkuc3RydWN0dXJlU3BlY2lmaWVkXG4gICAgICByZW5kZXI6XG4gICAgICAgIGl0ZW06IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj48aW1nIGNsYXNzPVxcXCJwcm9maWxlXFxcIiBzcmM9XFxcIiN7aXRlbS5jbGllbnRQcm9maWxlfVxcXCIvPiAje2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj48aW1nIGNsYXNzPVxcXCJwcm9maWxlXFxcIiBzcmM9XFxcIiN7aXRlbS5jbGllbnRQcm9maWxlfVxcXCIvPiAje2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lLCBjbGllbnROYW1lOiBpdGVtLmNsaWVudC5uYW1lLCBjbGllbnRQcm9maWxlOiBpdGVtLmNsaWVudC5wcm9maWxlXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0U3RydWN0dXJlLmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdFN0cnVjdHVyZVxuXG4gIHVzZXJzOiAoZWxlbWVudCwgaGFuZGxlciwgb3B0aW9ucykgLT5cbiAgICBzZWxlY3RVc2VyID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsdWdpbnM6IFsncmVtb3ZlX2J1dHRvbiddXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXYgc3R5bGU9J2xpbmUtaGVpZ2h0OiAzMHB4Oyc+I3tpdGVtLm5hbWV9ICgje2l0ZW0uZW1haWx9KSA8aW1nIHNyYz0nI3tpdGVtLnBpY3R1cmV9JyBzdHlsZT0nZmxvYXQ6IGxlZnQ7IHdpZHRoOiAzMHB4OyBoZWlnaHQ6IDMwcHg7IG1hcmdpbi1yaWdodDogMTBweDsnIC8+PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL3VzZXJzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWUsIGVtYWlsOiBpdGVtLmVtYWlsLCBwaWN0dXJlOiBpdGVtLnBpY3R1cmVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RVc2VyLmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdFVzZXJcblxuXG4iLCJcblNwaW5uZXIgPVxuXG4gIHN0YXRlOiBmYWxzZVxuXG4gIGVsOiB7fVxuXG4gIGk6IChlbCwgb3ZlcnJpZGUpIC0+XG5cbiAgICBAZWwgPSAkKCcuc3Bpbm5lcicpXG5cbiAgICByZWN0ID0gZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGNvb3JkcyA9XG4gICAgICB0b3A6IFwiI3tyZWN0LnRvcCArICQod2luZG93KS5zY3JvbGxUb3AoKX1weFwiXG4gICAgICBsZWZ0OiBcIiN7cmVjdC5sZWZ0fXB4XCJcbiAgICAgIHdpZHRoOiBcIiN7cmVjdC53aWR0aH1weFwiXG4gICAgICBoZWlnaHQ6IFwiI3tyZWN0LmhlaWdodH1weFwiXG5cbiAgICBpZiBvdmVycmlkZSBpc250IHVuZGVmaW5lZFxuICAgICAgZm9yIGtleSwgY29vcmQgb2Ygb3ZlcnJpZGVcbiAgICAgICAgY29vcmRzW2tleV0gPSBjb29yZFxuXG4gICAgQGVsLmNzcyBjb29yZHNcblxuICAgIF8ub24gQGVsXG4gICAgQHN0YXRlID0gdHJ1ZVxuXG4gIGQ6IC0+XG4gICAgXy5vZmYgQGVsXG4gICAgQHN0YXRlID0gZmFsc2VcbiIsIlN0cnVjdHVyZSA9XG5cbiAgdGVtcGxhdGU6IGZhbHNlXG4gIF9pZDogZmFsc2VcblxuICBjbGllbnRTZWxlY3Q6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEB0ZW1wbGF0ZSA9ICQoJy5tb2RpZnkgPiAjdGVtcGxhdGUnKS5odG1sKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgQGNsaWVudFNlbGVjdCA9IFNlbGVjdGl6ZS5jbGllbnRzICQoJy5wYWdlLnN0cnVjdHVyZSA+IC5tb2RpZnkgPiAuZGV0YWlsLmNsaWVudCA+IC5pbnB1dCA+IHNlbGVjdCcpLFxuICAgICAgQGNsaWVudFNlbGVjdGhhbmRsZXJcblxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL3N0cnVjdHVyZXNcXC8oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEBfaWQgPSBtYXRjaFsxXVxuICAgICAgQGxvYWQgQF9pZFxuICAgICAgXy5vbiAnLm1vZGlmeSA+IC5zdWJtaXQgPiAuY3RhJ1xuICAgIGVsc2VcbiAgICAgIEBlbnRpdHlBZGQoKVxuICAgICAgXy5vZmYgJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCdcblxuICAgIEBjbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLmZvY3VzKCkgaWYgQF9pZCBpcyBmYWxzZVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5tb3JlJykuY2xpY2sgQGVudGl0eUFkZEhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzJykub24gJ2NsaWNrJywnLmVudGl0eSA+IC5yZW1vdmUnLCBAZW50aXR5UmVtb3ZlSGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YXAnKS5jbGljayBAc3VibWl0SGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YScpLmNsaWNrIEBuZXdFbnRyeUhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLmNsaWVudEFjY2VzcyA+IC5zd2l0Y2gnKS5vbiAnY2xpY2snLCBAY2hlY2tib3hIYW5kbGVyXG5cbiAgY2hlY2tib3hIYW5kbGVyOiAtPlxuICAgIF8uc3dhcCB0aGlzXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5zdHJ1Y3R1cmUnKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMvJyxcbiAgICAgIF9pZDogQF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvc3RydWN0dXJlcy9uZXcnIGlmIHJlc3BvbnNlLmRhdGEubGVuZ3RoIDwgMVxuICAgICAgc3RydWN0dXJlID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwgc3RydWN0dXJlLm5hbWVcblxuICAgICAgaWYgc3RydWN0dXJlLmNsaWVudEFjY2VzcyBpcyB0cnVlXG4gICAgICAgIF8ub24gJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCdcbiAgICAgIGVsc2VcbiAgICAgICAgXy5vZmYgJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCdcblxuICAgICAgZm9yIGksIGVudGl0eSBvZiBzdHJ1Y3R1cmUuZW50aXRpZXNcbiAgICAgICAgU3RydWN0dXJlLmVudGl0eUFkZCBmYWxzZSwgZW50aXR5XG5cbiAgICAgIFN0cnVjdHVyZS5jbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLmFkZE9wdGlvblxuICAgICAgICBpZDogc3RydWN0dXJlLmNsaWVudC5pZCwgbmFtZTogc3RydWN0dXJlLmNsaWVudC5uYW1lXG4gICAgICBTdHJ1Y3R1cmUuY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBzdHJ1Y3R1cmUuY2xpZW50LmlkXG5cblxuXG4gIGVudGl0eUFkZEhhbmRsZXI6IC0+XG4gICAgU3RydWN0dXJlLmVudGl0eUFkZCh0cnVlKVxuXG4gIGVudGl0eVJlbW92ZUhhbmRsZXI6IC0+XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKVxuXG4gIGVudGl0eUFkZDogKGZvY3VzPWZhbHNlLCBlbnRpdHk9ZmFsc2UpIC0+XG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHknKS5hcHBlbmQgQHRlbXBsYXRlXG5cbiAgICBpZiBlbnRpdHkgaXNudCBmYWxzZVxuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gaW5wdXQnKS52YWwoZW50aXR5Lm5hbWUpXG4gICAgICBAc2VsZWN0aXplICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpLCBlbnRpdHkudHlwZVxuICAgIGVsc2VcbiAgICAgIEBzZWxlY3RpemUgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gc2VsZWN0JylcblxuICAgIGlmICBmb2N1c1xuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eSA+IC5pbnB1dC5zZWxlY3RpemUtaW5wdXQgaW5wdXQnKS5sYXN0KCkuZm9jdXMoKVxuXG4gIHNlbGVjdGl6ZTogKGVsLCB2YWx1ZT1mYWxzZSkgLT5cbiAgICBpemVkID0gZWwuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJUeXBlXCJcblxuICAgIGl6ZWRbMF0uc2VsZWN0aXplLnNldFZhbHVlIHZhbHVlXG5cbiAgc3VibWl0SGFuZGxlcjogLT5cblxuICAgIHN0cnVjdHVyZSA9IHt9XG4gICAgc3RydWN0dXJlLmVudGl0aWVzID0ge31cbiAgICBzdHJ1Y3R1cmUuY2xpZW50ID0gJCgnLm1vZGlmeSA+IC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5uYW1lID0gJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5jbGllbnRBY2Nlc3MgPSAkKCcubW9kaWZ5ID4gLmNsaWVudEFjY2VzcyA+IC5zd2l0Y2gnKS5oYXNDbGFzcyAnb24nXG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5JykuZWFjaCAoaSwgZWwpIC0+XG5cbiAgICAgIG5hbWUgPSAkKGVsKS5maW5kKCcuaW5wdXQgPiBpbnB1dCcpLnZhbCgpXG4gICAgICB0eXBlID0gJChlbCkuZmluZCgnLmlucHV0ID4gc2VsZWN0JykudmFsKClcblxuICAgICAgc3RydWN0dXJlLmVudGl0aWVzW25hbWVdID1cbiAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB0eXBlOiB0eXBlXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgY29uc29sZS5sb2cgc3RydWN0dXJlLmVudGl0aWVzXG4gICAgICBTdHJ1Y3R1cmUubW9kaWZ5IHN0cnVjdHVyZVxuXG4gIG5ld0VudHJ5SGFuZGxlcjogLT5cbiAgICBsb2NhdGlvbi5ocmVmID0gXCIvZW50cmllcy9uZXcjc3RydWN0dXJlPSN7U3RydWN0dXJlLl9pZH1cIlxuXG4gIG1vZGlmeTogKHN0cnVjdHVyZSkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5zdHJ1Y3R1cmUnKSlcblxuICAgIGNhbGwgPSAnL2FwaS9zdHJ1Y3R1cmVzL2FkZCdcbiAgICBpZiBTdHJ1Y3R1cmUuX2lkIGlzbnQgZmFsc2VcbiAgICAgIGNhbGwgPSBcIi9hcGkvc3RydWN0dXJlcy91cGRhdGUvI3tTdHJ1Y3R1cmUuX2lkfVwiXG5cbiAgICBfLmdldCBjYWxsLCBzdHJ1Y3R1cmVcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBfLm9uICcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnXG4gICAgICAgIGlmIFN0cnVjdHVyZS5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9zdHJ1Y3R1cmVzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgU3RydWN0dXJlLl9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4iLCJTdHJ1Y3R1cmVzID1cbiAgaTogLT5cbiAgICBMaXN0aW5nLmkgJ3N0cnVjdHVyZXMnLCBmYWxzZSwgWydjbGllbnQnXVxuXG4iLCJVc2VycyA9XG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICd1c2VycydcbiJdfQ==
