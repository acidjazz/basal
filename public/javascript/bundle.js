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
    "url": "http://basal.dev:8000",
    "timezone": "UTC",
    "locale": "en",
    "fallback_locale": "en",
    "key": "base64:fg0PjFLZ+L/X4qvR8ZxFXQLIaAF+m9TO+lWlgGuY7aw=",
    "cipher": "AES-256-CBC",
    "log": "single",
    "log_level": "debug",
    "providers": ["Illuminate\\Auth\\AuthServiceProvider", "Illuminate\\Broadcasting\\BroadcastServiceProvider", "Illuminate\\Bus\\BusServiceProvider", "Illuminate\\Cache\\CacheServiceProvider", "Illuminate\\Foundation\\Providers\\ConsoleSupportServiceProvider", "Illuminate\\Cookie\\CookieServiceProvider", "Illuminate\\Database\\DatabaseServiceProvider", "Illuminate\\Encryption\\EncryptionServiceProvider", "Illuminate\\Filesystem\\FilesystemServiceProvider", "Illuminate\\Foundation\\Providers\\FoundationServiceProvider", "Illuminate\\Hashing\\HashServiceProvider", "Illuminate\\Mail\\MailServiceProvider", "Illuminate\\Notifications\\NotificationServiceProvider", "Illuminate\\Pagination\\PaginationServiceProvider", "Illuminate\\Pipeline\\PipelineServiceProvider", "Illuminate\\Queue\\QueueServiceProvider", "Illuminate\\Redis\\RedisServiceProvider", "Illuminate\\Auth\\Passwords\\PasswordResetServiceProvider", "Illuminate\\Session\\SessionServiceProvider", "Illuminate\\Translation\\TranslationServiceProvider", "Illuminate\\Validation\\ValidationServiceProvider", "Illuminate\\View\\ViewServiceProvider", "Laravel\\Tinker\\TinkerServiceProvider", "Jenssegers\\Mongodb\\MongodbServiceProvider", "Larjectus\\ServiceProvider", "Larpug\\ServiceProvider", "Barryvdh\\Debugbar\\ServiceProvider", "Barryvdh\\Cors\\ServiceProvider", "App\\Providers\\AppServiceProvider", "App\\Providers\\AuthServiceProvider", "App\\Providers\\EventServiceProvider", "App\\Providers\\RouteServiceProvider"],
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
  "cors": {
    "supportsCredentials": false,
    "allowedOrigins": ["*"],
    "allowedHeaders": ["*"],
    "allowedMethods": ["*"],
    "exposedHeaders": [],
    "maxAge": 0
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
    "default": "array",
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
    "driver": "array",
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
      always: function() {
        return Spinner.d();
      },
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
  Time: function(el, name, value) {
    return el.find('input').flatpickr({
      enableTime: true,
      noCalendar: true,
      dateFormat: 'h:i K'
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
        case 'Number':
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
      return _.post(call, {
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
          case 'Number':
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
        return location.href = '/home';
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

var hexagons;

hexagons = function() {
  var Hex, c, cos, ctx, difX, difY, h, hexs, i, looop, opts, rad, sin, sum, tick, w, x, y;
  c = document.getElementById('canvas');
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  sum = w + h;
  ctx = c.getContext('2d');
  opts = {
    side: 35,
    picksParTick: 2,
    baseTime: 400,
    addedTime: 100,
    colors: ['rgba(0,0,0,alp)', 'rgba(180,30,30,alp)', 'rgba(255,255,255,alp)'],
    addedAlpha: 20,
    strokeColor: 'rgb(255,255,255)',
    hueSpeed: .4,
    repaintAlpha: 1
  };
  difX = Math.sqrt(3) * opts.side / 2;
  difY = opts.side * 3 / 2;
  rad = Math.PI / 6;
  cos = Math.cos(rad) * opts.side;
  sin = Math.sin(rad) * opts.side;
  hexs = [];
  tick = 0;
  looop = function() {
    var i;
    window.requestAnimationFrame(looop);
    tick += opts.hueSpeed;
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(100,100,100,alp)'.replace('alp', opts.repaintAlpha);
    ctx.fillRect(0, 0, w, h);
    i = 0;
    while (i < opts.picksParTick) {
      hexs[Math.random() * hexs.length | 0].pick();
      ++i;
    }
    hexs.map(function(hex) {
      hex.step();
    });
  };
  Hex = function(x, y) {
    this.x = x;
    this.y = y;
    this.sum = this.x + this.y;
    this.picked = false;
    this.time = 0;
    this.targetTime = 0;
    this.xs = [this.x + cos, this.x, this.x - cos, this.x - cos, this.x, this.x + cos];
    this.ys = [this.y - sin, this.y - opts.side, this.y - sin, this.y + sin, this.y + opts.side, this.y + sin];
  };
  Hex.prototype.pick = function() {
    this.color = opts.colors[Math.random() * opts.colors.length | 0];
    this.picked = true;
    this.time = this.time || 0;
    this.targetTime = this.targetTime || opts.baseTime + opts.addedTime * Math.random() | 0;
  };
  Hex.prototype.step = function() {
    var i, prop;
    prop = this.time / this.targetTime;
    ctx.beginPath();
    ctx.moveTo(this.xs[0], this.ys[0]);
    i = 1;
    while (i < this.xs.length) {
      ctx.lineTo(this.xs[i], this.ys[i]);
      ++i;
    }
    ctx.lineTo(this.xs[0], this.ys[0]);
    if (this.picked) {
      ++this.time;
      if (this.time >= this.targetTime) {
        this.time = 0;
        this.targetTime = 0;
        this.picked = false;
      }
      ctx.fillStyle = ctx.shadowColor = this.color.replace('alp', Math.sin(prop * Math.PI));
      ctx.fill();
    } else {
      ctx.strokeStyle = ctx.shadowColor = opts.strokeColor;
      ctx.stroke();
    }
  };
  x = 0;
  while (x < w) {
    i = 0;
    y = 0;
    while (y < h) {
      ++i;
      hexs.push(new Hex(x + difX * i % 2, y));
      y += difY;
    }
    x += difX * 2;
  }
  looop();
  return window.addEventListener('resize', function() {
    var x;
    var i;
    var y;
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    sum = w + h;
    hexs.length = 0;
    x = 0;
    while (x < w) {
      i = 0;
      y = 0;
      while (y < h) {
        ++i;
        hexs.push(new Hex(x + difX * i % 2, y));
        y += difY;
      }
      x += difX * 2;
    }
  });
};

var hexagonDraw;

hexagonDraw = function() {
  var Line, baseRad, c, ctx, dieX, dieY, h, lines, looop, opts, tick, w;
  c = document.getElementById('canvas');
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  ctx = c.getContext('2d');
  opts = {
    len: 30,
    count: 50,
    baseTime: 20,
    addedTime: 20,
    dieChance: .05,
    spawnChance: 1,
    sparkChance: .1,
    sparkDist: 10,
    sparkSize: 2,
    color: 'hsl(hue,100%,light%)',
    baseLight: 50,
    addedLight: 10,
    shadowToTimePropMult: 6,
    baseLightInputMultiplier: .01,
    addedLightInputMultiplier: .02,
    cx: w / 2,
    cy: h / 2,
    repaintAlpha: .04,
    hueChange: .1
  };
  tick = 0;
  lines = [];
  dieX = w / 2 / opts.len;
  dieY = h / 2 / opts.len;
  baseRad = Math.PI * 2 / 6;
  ctx.fillStyle = config.color.black4;
  ctx.fillRect(0, 0, w, h);
  looop = function() {
    window.requestAnimationFrame(looop);
    ++tick;
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(35,41,46,alp)'.replace('alp', opts.repaintAlpha);
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    if (lines.length < opts.count && Math.random() < opts.spawnChance) {
      lines.push(new Line);
    }
    lines.map(function(line) {
      line.step();
    });
  };
  Line = function() {
    this.reset();
  };
  Line.prototype.reset = function() {
    this.x = 0;
    this.y = 0;
    this.addedX = 0;
    this.addedY = 0;
    this.rad = 0;
    this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
    this.color = opts.color.replace('hue', tick * opts.hueChange);
    this.cumulativeTime = 0;
    this.beginPhase();
  };
  Line.prototype.beginPhase = function() {
    this.x += this.addedX;
    this.y += this.addedY;
    this.time = 0;
    this.targetTime = opts.baseTime + opts.addedTime * Math.random() | 0;
    this.rad += baseRad * (Math.random() < .5 ? 1 : -1);
    this.addedX = Math.cos(this.rad);
    this.addedY = Math.sin(this.rad);
    if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY) {
      this.reset();
    }
  };
  Line.prototype.step = function() {
    var prop, wave, x, y;
    ++this.time;
    ++this.cumulativeTime;
    if (this.time >= this.targetTime) {
      this.beginPhase();
    }
    prop = this.time / this.targetTime;
    wave = Math.sin(prop * Math.PI / 2);
    x = this.addedX * wave;
    y = this.addedY * wave;
    ctx.shadowBlur = prop * opts.shadowToTimePropMult;
    ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier));
    ctx.fillRect(opts.cx + (this.x + x) * opts.len, opts.cy + (this.y + y) * opts.len, 2, 2);
    if (Math.random() < opts.sparkChance) {
      ctx.fillRect(opts.cx + (this.x + x) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - (opts.sparkSize / 2), opts.cy + (this.y + y) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - (opts.sparkSize / 2), opts.sparkSize, opts.sparkSize);
    }
  };
  window.addEventListener('resize', function() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    ctx.fillStyle = config.color.black4;
    ctx.fillRect(0, 0, w, h);
    opts.cx = w / 2;
    opts.cy = h / 2;
    dieX = w / 2 / opts.len;
    dieY = h / 2 / opts.len;
  });
  return looop();
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



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJmaWx0ZXIuY29mZmVlIiwiZ2xvYmFsLmNvZmZlZSIsImhleGFnb24uY29mZmVlIiwiaGV4YWdvbkRyYXcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwiaW52aXRlLmNvZmZlZSIsImxpc3RpbmcuY29mZmVlIiwibWFpbi5jb2ZmZWUiLCJtZS5jb2ZmZWUiLCJub3Rmb3VuZC5jb2ZmZWUiLCJub3RpY2UuY29mZmVlIiwicHJvbXB0LmNvZmZlZSIsInF1ZXJ5LmNvZmZlZSIsInNlYXJjaC5jb2ZmZWUiLCJzZWxlY3RpemUuY29mZmVlIiwic3Bpbm5lci5jb2ZmZWUiLCJzdHJ1Y3R1cmUuY29mZmVlIiwic3RydWN0dXJlcy5jb2ZmZWUiLCJ1c2Vycy5jb2ZmZWUiLCJ2dWUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOztBQUFBLENBQUEsR0FFRTtFQUFBLENBQUEsRUFBRyxTQUFBO1dBQ0QsSUFBQyxDQUFBLE9BQUQsR0FBVyxXQUFBLENBQVksSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUFaLEVBQTZCLEdBQTdCO0VBRFYsQ0FBSDtFQUdBLENBQUEsRUFDRTtJQUFBLE1BQUEsRUFBUSxLQUFSO0lBQ0EsT0FBQSxFQUFTLENBRFQ7R0FKRjtFQU9BLElBQUEsRUFBTSxTQUFDLEVBQUQsRUFBSyxNQUFMLEVBQW1CLEdBQW5COztNQUFLLFNBQU87OztNQUFPLE1BQUk7O0lBRTNCLElBQUcsQ0FBQSxDQUFBLEVBQUEsWUFBa0IsTUFBbEIsQ0FBSDtNQUNFLEVBQUEsR0FBSyxDQUFBLENBQUUsRUFBRixFQURQOztJQUdBLElBQUcsTUFBQSxL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ZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgcmFuZ2U6IChzdGFydCwgZW5kKSAtPlxuICAgIHJlc3VsdCA9IFtdXG4gICAgZm9yIG51bSBpbiBbc3RhcnQuLmVuZF1cbiAgICAgIHJlc3VsdC5wdXNoIG51bVxuICAgIHJlc3VsdFxuXG4gIGZpdDogKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIC0+XG4gICAgcmF0aW8gPSBNYXRoLm1pbihtYXhXaWR0aCAvIHNyY1dpZHRoLCBtYXhIZWlnaHQgLyBzcmNIZWlnaHQpXG4gICAgd2lkdGg6IHNyY1dpZHRoKnJhdGlvLCBoZWlnaHQ6IHNyY0hlaWdodCpyYXRpb1xuXG4gIGppbml0OiAtPlxuICAgICQuYWpheFNldHVwXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCJcblxuICBwYXRjaDogKHVybCwgZGF0YSkgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqcGF0Y2ggPSAkLmFqYXhcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgICB0eXBlOiAnUEFUQ0gnXG5cbiAgICBqcGF0Y2guZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpnZXQgPSAkLmdldCBhcmdzLi4uXG5cbiAgICBqZ2V0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqZ2V0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4gamdldFxuXG4gIHBvc3Q6IChhcmdzLi4uKSAtPlxuXG4gICAganBvc3QgPSAkLnBvc3QgYXJncy4uLlxuXG4gICAganBvc3QuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpwb3N0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBvc3RcblxuICBmYWlsOiAocmVzcG9uc2UpIC0+XG5cbiAgICBlcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTj8uZXJyb3JzP1swXVxuICAgIGlmIGVycm9yIGlzIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIFByb21wdC5pIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dFxuXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwczovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuICBtZXRob2RzOiAob2JqKSAtPlxuICAgIHJlcyA9IFtdXG4gICAgZm9yIGksbSBvZiBvYmpcbiAgICAgIGlmIHR5cGVvZiBtIGlzICdmdW5jdGlvbidcbiAgICAgICAgcmVzLnB1c2ggbVxuICAgIHJldHVybiByZXNcblxuXy5pKClcbiIsIlRpbWUgPVxuICBpbnRlcnZhbDogZmFsc2VcbiAgZ2FwOiAxMDAwXG5cbiAgaTogLT5cbiAgICBAaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChAc2NyYXBlLCBAZ2FhKSBpZiBAaW50ZXJ2YWwgaXMgZmFsc2VcbiAgICBAc2NyYXBlKClcblxuICBzY3JhcGU6IC0+XG4gICAgJCgndGltZScpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgamVsID0gJCBlbFxuICAgICAgamVsLmh0bWwgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5mcm9tTm93KClcbiAgICAgIGplbC5hdHRyICdhcmlhLWxhYmVsJywgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5jYWxlbmRhcigpXG4iLCJDbGllbnQgPVxuXG4gIHNlbGVjdFVzZXI6IGZhbHNlXG4gIF9pZDogZmFsc2VcbiAgY3JvcDogZmFsc2VcbiAgcHJvZmlsZTogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQGhhbmRsZXJzKClcbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9jbGllbnRzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcblxuICAgIEBzZWxlY3RVc2VyID0gU2VsZWN0aXplLnVzZXJzICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JyksIEBzZWxlY3RVc2VySGFuZGxlciwgbWU6IGZhbHNlXG5cbiAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQgPiBpbnB1dCcpLmZvY3VzKClcbiBcbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLnN1Ym1pdCcpLmNsaWNrIEBtb2RpZnlIYW5kbGVyXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ292ZXInLCBAZHJhZ292ZXJcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2xlYXZlJywgQGRyYWdsZWF2ZVxuICAgICQoZG9jdW1lbnQpLm9uICdkcmFnZW50ZXIgZHJhZ292ZXInLCBAY2FuY2VsXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJvcCBkcmFnZHJvcCcsIEBkcm9wXG5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhJykub24gJ2NsaWNrJywgQGNob29zZUZpbGVcbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dDpmaWxlJykuY2hhbmdlIEBjaGFuZ2VcblxuICBjYW5jZWw6IC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gIGRyYWdvdmVyOiAtPlxuICAgIF8ub24gJy5pbnB1dC1pbWFnZSdcblxuICBkcmFnbGVhdmU6IC0+XG4gICAgXy5vZmYgJy5pbnB1dC1pbWFnZSdcblxuICBkcm9wOiAoZSkgLT5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBfLm9mZiAnLmlucHV0LWltYWdlJ1xuXG4gICAgaWYgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlciBhbmQgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGhcbiAgICAgIGZpbGVzID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgQ2xpZW50LmNyb3BwaWUgZmlsZXNbMF1cblxuICBjaGFuZ2U6IC0+XG4gICAgaWYgJCh0aGlzKVswXS5maWxlc1xuICAgICAgZmlsZXMgPSAkKHRoaXMpWzBdLmZpbGVzXG4gICAgQ2xpZW50LmNyb3BwaWUgZmlsZXNbMF1cblxuICBjaG9vc2VGaWxlOiAtPlxuICAgICQoJy5pbnB1dC1pbWFnZSA+IGlucHV0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgY3JvcHBpZTogKGZpbGUpIC0+XG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAtPlxuXG4gICAgICBpZiBDbGllbnQuY3JvcCBpc250IGZhbHNlXG4gICAgICAgIENsaWVudC5jcm9wLmNyb3BwaWUgJ2Rlc3Ryb3knXG4gICAgICAgIENsaWVudC5jcm9wID0gZmFsc2VcblxuICAgICAgQ2xpZW50LmNyb3AgPSAkKCcuaW5wdXQtaW1hZ2UgPiAuY3JvcHBpZScpLmNyb3BwaWVcbiAgICAgICAgdXJsOiByZWFkZXIucmVzdWx0XG4gICAgICAgIGVuZm9yY2VCb3VuZGFyeTogZmFsc2VcbiAgICAgICAgdmlld3BvcnQ6XG4gICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgIGhlaWdodDogMjAwXG4gICAgICAgIGJvdW5kYXJ5OlxuICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICBoZWlnaHQ6IDMwMFxuXG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwgZmlsZVxuXG4gIHNlbGVjdFVzZXJIYW5kbGVyOiAtPlxuXG4gIG1vZGlmeUhhbmRsZXI6IC0+XG5cbiAgICBpZiBDbGllbnQuY3JvcCBpc250IGZhbHNlXG4gICAgICBDbGllbnQuY3JvcC5jcm9wcGllICdyZXN1bHQnLFxuICAgICAgICB0eXBlOiAnY2FudmFzJ1xuICAgICAgICBmb3JtYXQ6ICdqcGVnJ1xuICAgICAgLnRoZW4gKHJlc3BvbnNlKSAtPlxuICAgICAgICBDbGllbnQuaW1hZ2VVcGxvYWQgQ2xpZW50LmRhdGFVUkl0b0Jsb2IocmVzcG9uc2UpLCAtPlxuICAgICAgICAgIENsaWVudC5tb2RpZnkoKVxuICAgIGVsc2VcbiAgICAgIENsaWVudC5tb2RpZnkoKVxuXG4gIG1vZGlmeTogLT5cblxuICAgIG5hbWUgPSAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtbmFtZSA+IGlucHV0JykudmFsKClcbiAgICB1c2VycyA9ICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JykudmFsKCkuc3BsaXQgJywnXG5cbiAgICBjYWxsID0gJy9hcGkvY2xpZW50cy9hZGQnXG4gICAgaWYgQ2xpZW50Ll9pZCBpc250IGZhbHNlXG4gICAgICBjYWxsID0gXCIvYXBpL2NsaWVudHMvdXBkYXRlLyN7Q2xpZW50Ll9pZH1cIlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudCcpKVxuXG4gICAgXy5nZXQgY2FsbCwgbmFtZTogbmFtZSwgdXNlcnM6IHVzZXJzLCBwcm9maWxlOiBDbGllbnQucHJvZmlsZVxuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIENsaWVudC5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9jbGllbnRzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgQ2xpZW50Ll9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4gICAgICAgIGlmIENsaWVudC5wcm9maWxlXG4gICAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tDbGllbnQucHJvZmlsZX0nKVwiXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnQnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2NsaWVudHMvJyxcbiAgICAgIF9pZDogQF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvY2xpZW50cy9uZXcnIGlmIHJlc3BvbnNlLmRhdGEubGVuZ3RoIDwgMVxuICAgICAgY2xpZW50ID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LW5hbWUgPiBpbnB1dCcpLnZhbCBjbGllbnQubmFtZVxuICAgICAgaWYgY2xpZW50LnByb2ZpbGVcbiAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tjbGllbnQucHJvZmlsZX0nKVwiXG4gICAgICAgIENsaWVudC5wcm9maWxlID0gY2xpZW50LnByb2ZpbGVcbiAgICAgIGZvciBpbmRleCwgdXNlciBvZiBjbGllbnQudXNlcnNcbiAgICAgICAgaWYgdXNlci5pZCBpc250IFVzZXIuX2lkXG4gICAgICAgICAgQ2xpZW50LnNlbGVjdFVzZXJbMF0uc2VsZWN0aXplLmFkZE9wdGlvbiBpZDogdXNlci5pZCwgbmFtZTogXCIje3VzZXIubmFtZX0gKCN7dXNlci5lbWFpbH0pXCJcbiAgICAgICAgICBDbGllbnQuc2VsZWN0VXNlclswXS5zZWxlY3RpemUuYWRkSXRlbSB1c2VyLmlkXG5cblxuICBkYXRhVVJJdG9CbG9iOiAoZGF0YVVSSSkgLT5cbiAgICBieXRlU3RyaW5nID0gdW5kZWZpbmVkXG4gICAgaWYgZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDBcbiAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSlcbiAgICBlbHNlXG4gICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKVxuICAgICMgc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdXG4gICAgIyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aClcbiAgICBpID0gMFxuICAgIHdoaWxlIGkgPCBieXRlU3RyaW5nLmxlbmd0aFxuICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSlcbiAgICAgIGkrK1xuICAgIG5ldyBCbG9iKFsgaWEgXSwgdHlwZTogbWltZVN0cmluZylcbiAgICAgICAgXG4gIGltYWdlVXBsb2FkOiAoYmxvYiwgY2FsbGJhY2spIC0+XG5cbiAgICBmZCA9IG5ldyBGb3JtRGF0YSgpXG4gICAgZmQuYXBwZW5kICdmaWxlJywgYmxvYlxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgIE5vdGljZS5pICdGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJywgdGltZW91dDogNjAwXG4gICAgICAgIENsaWVudC5wcm9maWxlID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgICBjYWxsYmFjayhyZXN1bHQpXG4gICAgICAgICwgMTIwMFxuXG5cbiIsIkNsaWVudHMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnY2xpZW50cycsIENsaWVudHMuYWN0aW9uXG5cbiAgYWN0aW9uOiAodHlwZSkgLT5cblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdDbGllbnQgSW52aXRlJ1xuICAgICAgICBpZiBMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aCA+IDFcbiAgICAgICAgICBOb3RpY2UuaSAnUGxlYXNlIGNob29zZSBhIHNpbmdsZSBjbGllbnQgZm9yIGFuIGludml0ZSBsaW5rJywgdHlwZTogJ3dhcm5pbmcnXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIENsaWVudHMuZ2V0SW52aXRlKExpc3Rpbmcuc2VsZWN0ZWRbMF0pXG5cbiAgZ2V0SW52aXRlOiAoY2xpZW50KSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudHMnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2ludml0ZS9hZGQnLCBjbGllbnQ6IGNsaWVudFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgY29uc29sZS5sb2cgcmVzcG9uc2VcbiAgICAgIFByb21wdC5pKFxuICAgICAgICAnQ2xpZW50IEludml0ZScsXG4gICAgICAgICdTaGFyZSB0aGlzIFVSTCB3aXRoIHlvdXIgY2xpZW50IHRvIGFsbG93IHRoZW0gdG8gbW9kaWZ5IHRoZWlyIG93biBlbnRyaWVzJyxcbiAgICAgICAgWydPSyddLFxuICAgICAgICAgIGNsaXBib2FyZDogdHJ1ZVxuICAgICAgICAgIHZhbHVlOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9pbnZpdGUvJyArIHJlc3BvbnNlLmRhdGEuaW52aXRlLmhhc2gsXG4gICAgICApXG5cblxuXG4iLCJjb25maWcgPSB7XCJhcHBcIjp7XCJuYW1lXCI6XCJMYXJhdmVsXCIsXCJlbnZcIjpcImxvY2FsXCIsXCJkZWJ1Z1wiOnRydWUsXCJ1cmxcIjpcImh0dHA6Ly9iYXNhbC5kZXY6ODAwMFwiLFwidGltZXpvbmVcIjpcIlVUQ1wiLFwibG9jYWxlXCI6XCJlblwiLFwiZmFsbGJhY2tfbG9jYWxlXCI6XCJlblwiLFwia2V5XCI6XCJiYXNlNjQ6ZmcwUGpGTForTC9YNHF2UjhaeEZYUUxJYUFGK205VE8rbFdsZ0d1WTdhdz1cIixcImNpcGhlclwiOlwiQUVTLTI1Ni1DQkNcIixcImxvZ1wiOlwic2luZ2xlXCIsXCJsb2dfbGV2ZWxcIjpcImRlYnVnXCIsXCJwcm92aWRlcnNcIjpbXCJJbGx1bWluYXRlXFxcXEF1dGhcXFxcQXV0aFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxCcm9hZGNhc3RpbmdcXFxcQnJvYWRjYXN0U2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEJ1c1xcXFxCdXNTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcQ2FjaGVcXFxcQ2FjaGVTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcRm91bmRhdGlvblxcXFxQcm92aWRlcnNcXFxcQ29uc29sZVN1cHBvcnRTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcQ29va2llXFxcXENvb2tpZVNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxEYXRhYmFzZVxcXFxEYXRhYmFzZVNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxFbmNyeXB0aW9uXFxcXEVuY3J5cHRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcRmlsZXN5c3RlbVxcXFxGaWxlc3lzdGVtU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEZvdW5kYXRpb25cXFxcUHJvdmlkZXJzXFxcXEZvdW5kYXRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcSGFzaGluZ1xcXFxIYXNoU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXE1haWxcXFxcTWFpbFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxOb3RpZmljYXRpb25zXFxcXE5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxQYWdpbmF0aW9uXFxcXFBhZ2luYXRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcUGlwZWxpbmVcXFxcUGlwZWxpbmVTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcUXVldWVcXFxcUXVldWVTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcUmVkaXNcXFxcUmVkaXNTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcQXV0aFxcXFxQYXNzd29yZHNcXFxcUGFzc3dvcmRSZXNldFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxTZXNzaW9uXFxcXFNlc3Npb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcVHJhbnNsYXRpb25cXFxcVHJhbnNsYXRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcVmFsaWRhdGlvblxcXFxWYWxpZGF0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFZpZXdcXFxcVmlld1NlcnZpY2VQcm92aWRlclwiLFwiTGFyYXZlbFxcXFxUaW5rZXJcXFxcVGlua2VyU2VydmljZVByb3ZpZGVyXCIsXCJKZW5zc2VnZXJzXFxcXE1vbmdvZGJcXFxcTW9uZ29kYlNlcnZpY2VQcm92aWRlclwiLFwiTGFyamVjdHVzXFxcXFNlcnZpY2VQcm92aWRlclwiLFwiTGFycHVnXFxcXFNlcnZpY2VQcm92aWRlclwiLFwiQmFycnl2ZGhcXFxcRGVidWdiYXJcXFxcU2VydmljZVByb3ZpZGVyXCIsXCJCYXJyeXZkaFxcXFxDb3JzXFxcXFNlcnZpY2VQcm92aWRlclwiLFwiQXBwXFxcXFByb3ZpZGVyc1xcXFxBcHBTZXJ2aWNlUHJvdmlkZXJcIixcIkFwcFxcXFxQcm92aWRlcnNcXFxcQXV0aFNlcnZpY2VQcm92aWRlclwiLFwiQXBwXFxcXFByb3ZpZGVyc1xcXFxFdmVudFNlcnZpY2VQcm92aWRlclwiLFwiQXBwXFxcXFByb3ZpZGVyc1xcXFxSb3V0ZVNlcnZpY2VQcm92aWRlclwiXSxcImFsaWFzZXNcIjp7XCJBcHBcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEFwcFwiLFwiQXJ0aXNhblwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQXJ0aXNhblwiLFwiQXV0aFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQXV0aFwiLFwiQmxhZGVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEJsYWRlXCIsXCJCcm9hZGNhc3RcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEJyb2FkY2FzdFwiLFwiQnVzXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxCdXNcIixcIkNhY2hlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxDYWNoZVwiLFwiQ29uZmlnXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxDb25maWdcIixcIkNvb2tpZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQ29va2llXCIsXCJDcnlwdFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQ3J5cHRcIixcIkRCXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxEQlwiLFwiRGVidWdiYXJcIjpcIkJhcnJ5dmRoXFxcXERlYnVnYmFyXFxcXEZhY2FkZVwiLFwiRWxvcXVlbnRcIjpcIklsbHVtaW5hdGVcXFxcRGF0YWJhc2VcXFxcRWxvcXVlbnRcXFxcTW9kZWxcIixcIk1vbG9xdWVudFwiOlwiSmVuc3NlZ2Vyc1xcXFxNb25nb2RiXFxcXEVsb3F1ZW50XFxcXE1vZGVsXCIsXCJFdmVudFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcRXZlbnRcIixcIkZpbGVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEZpbGVcIixcIkdhdGVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEdhdGVcIixcIkhhc2hcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEhhc2hcIixcIkxhbmdcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXExhbmdcIixcIkxvZ1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcTG9nXCIsXCJNYWlsXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxNYWlsXCIsXCJOb3RpZmljYXRpb25cIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXE5vdGlmaWNhdGlvblwiLFwiUGFzc3dvcmRcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFBhc3N3b3JkXCIsXCJRdWV1ZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUXVldWVcIixcIlJlZGlyZWN0XCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxSZWRpcmVjdFwiLFwiUmVkaXNcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFJlZGlzXCIsXCJSZXF1ZXN0XCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxSZXF1ZXN0XCIsXCJSZXNwb25zZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUmVzcG9uc2VcIixcIlJvdXRlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxSb3V0ZVwiLFwiU2NoZW1hXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxTY2hlbWFcIixcIlNlc3Npb25cIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFNlc3Npb25cIixcIlN0b3JhZ2VcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFN0b3JhZ2VcIixcIlVSTFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcVVJMXCIsXCJWYWxpZGF0b3JcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFZhbGlkYXRvclwiLFwiVmlld1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcVmlld1wifX0sXCJjYWNoZVwiOntcImRlZmF1bHRcIjpcImFycmF5XCIsXCJzdG9yZXNcIjp7XCJhcGNcIjp7XCJkcml2ZXJcIjpcImFwY1wifSxcImFycmF5XCI6e1wiZHJpdmVyXCI6XCJhcnJheVwifSxcImRhdGFiYXNlXCI6e1wiZHJpdmVyXCI6XCJkYXRhYmFzZVwiLFwidGFibGVcIjpcImNhY2hlXCIsXCJjb25uZWN0aW9uXCI6bnVsbH0sXCJmaWxlXCI6e1wiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay9jYWNoZS9kYXRhXCJ9LFwibWVtY2FjaGVkXCI6e1wiZHJpdmVyXCI6XCJtZW1jYWNoZWRcIixcInBlcnNpc3RlbnRfaWRcIjpudWxsLFwic2FzbFwiOltudWxsLG51bGxdLFwib3B0aW9uc1wiOltdLFwic2VydmVyc1wiOlt7XCJob3N0XCI6XCIxMjcuMC4wLjFcIixcInBvcnRcIjoxMTIxMSxcIndlaWdodFwiOjEwMH1dfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwifX0sXCJwcmVmaXhcIjpcImxhcmF2ZWxcIn0sXCJjb3JzXCI6e1wic3VwcG9ydHNDcmVkZW50aWFsc1wiOmZhbHNlLFwiYWxsb3dlZE9yaWdpbnNcIjpbXCIqXCJdLFwiYWxsb3dlZEhlYWRlcnNcIjpbXCIqXCJdLFwiYWxsb3dlZE1ldGhvZHNcIjpbXCIqXCJdLFwiZXhwb3NlZEhlYWRlcnNcIjpbXSxcIm1heEFnZVwiOjB9LFwiZGVidWdiYXJcIjp7XCJlbmFibGVkXCI6ZmFsc2UsXCJzdG9yYWdlXCI6e1wiZW5hYmxlZFwiOnRydWUsXCJkcml2ZXJcIjpcImZpbGVcIixcInBhdGhcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZGVidWdiYXJcIixcImNvbm5lY3Rpb25cIjpudWxsLFwicHJvdmlkZXJcIjpcIlwifSxcImluY2x1ZGVfdmVuZG9yc1wiOnRydWUsXCJjYXB0dXJlX2FqYXhcIjp0cnVlLFwiY2xvY2t3b3JrXCI6ZmFsc2UsXCJjb2xsZWN0b3JzXCI6e1wicGhwaW5mb1wiOnRydWUsXCJtZXNzYWdlc1wiOnRydWUsXCJ0aW1lXCI6dHJ1ZSxcIm1lbW9yeVwiOnRydWUsXCJleGNlcHRpb25zXCI6dHJ1ZSxcImxvZ1wiOnRydWUsXCJkYlwiOnRydWUsXCJ2aWV3c1wiOnRydWUsXCJyb3V0ZVwiOnRydWUsXCJsYXJhdmVsXCI6ZmFsc2UsXCJldmVudHNcIjpmYWxzZSxcImRlZmF1bHRfcmVxdWVzdFwiOmZhbHNlLFwic3ltZm9ueV9yZXF1ZXN0XCI6dHJ1ZSxcIm1haWxcIjp0cnVlLFwibG9nc1wiOmZhbHNlLFwiZmlsZXNcIjpmYWxzZSxcImNvbmZpZ1wiOmZhbHNlLFwiYXV0aFwiOmZhbHNlLFwiZ2F0ZVwiOmZhbHNlLFwic2Vzc2lvblwiOnRydWV9LFwib3B0aW9uc1wiOntcImF1dGhcIjp7XCJzaG93X25hbWVcIjpmYWxzZX0sXCJkYlwiOntcIndpdGhfcGFyYW1zXCI6dHJ1ZSxcInRpbWVsaW5lXCI6ZmFsc2UsXCJiYWNrdHJhY2VcIjpmYWxzZSxcImV4cGxhaW5cIjp7XCJlbmFibGVkXCI6ZmFsc2UsXCJ0eXBlc1wiOltcIlNFTEVDVFwiXX0sXCJoaW50c1wiOnRydWV9LFwibWFpbFwiOntcImZ1bGxfbG9nXCI6ZmFsc2V9LFwidmlld3NcIjp7XCJkYXRhXCI6ZmFsc2V9LFwicm91dGVcIjp7XCJsYWJlbFwiOnRydWV9LFwibG9nc1wiOntcImZpbGVcIjpudWxsfX0sXCJpbmplY3RcIjp0cnVlLFwicm91dGVfcHJlZml4XCI6XCJfZGVidWdiYXJcIn0sXCJtYWlsXCI6e1wiZHJpdmVyXCI6XCJzbXRwXCIsXCJob3N0XCI6XCJzbXRwLm1haWxndW4ub3JnXCIsXCJwb3J0XCI6NTg3LFwiZnJvbVwiOntcImFkZHJlc3NcIjpcImhlbGxvQGV4YW1wbGUuY29tXCIsXCJuYW1lXCI6XCJFeGFtcGxlXCJ9LFwiZW5jcnlwdGlvblwiOlwidGxzXCIsXCJ1c2VybmFtZVwiOm51bGwsXCJwYXNzd29yZFwiOm51bGwsXCJzZW5kbWFpbFwiOlwiL3Vzci9zYmluL3NlbmRtYWlsIC1ic1wiLFwibWFya2Rvd25cIjp7XCJ0aGVtZVwiOlwiZGVmYXVsdFwiLFwicGF0aHNcIjpbXCIvVXNlcnMvay9iYXNhbC9yZXNvdXJjZXMvdmlld3MvdmVuZG9yL21haWxcIl19fSxcInF1ZXVlXCI6e1wiZGVmYXVsdFwiOlwiYXJyYXlcIixcImNvbm5lY3Rpb25zXCI6e1wic3luY1wiOntcImRyaXZlclwiOlwic3luY1wifSxcImRhdGFiYXNlXCI6e1wiZHJpdmVyXCI6XCJkYXRhYmFzZVwiLFwidGFibGVcIjpcImpvYnNcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJyZXRyeV9hZnRlclwiOjkwfSxcImJlYW5zdGFsa2RcIjp7XCJkcml2ZXJcIjpcImJlYW5zdGFsa2RcIixcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInJldHJ5X2FmdGVyXCI6OTB9LFwic3FzXCI6e1wiZHJpdmVyXCI6XCJzcXNcIixcImtleVwiOlwieW91ci1wdWJsaWMta2V5XCIsXCJzZWNyZXRcIjpcInlvdXItc2VjcmV0LWtleVwiLFwicHJlZml4XCI6XCJodHRwczovL3Nxcy51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS95b3VyLWFjY291bnQtaWRcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLW5hbWVcIixcInJlZ2lvblwiOlwidXMtZWFzdC0xXCJ9LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwicmV0cnlfYWZ0ZXJcIjo5MH19LFwiZmFpbGVkXCI6e1wiZGF0YWJhc2VcIjpcIm1vbmdvZGJcIixcInRhYmxlXCI6XCJmYWlsZWRfam9ic1wifX0sXCJzZXJ2aWNlc1wiOntcIm1haWxndW5cIjp7XCJkb21haW5cIjpudWxsLFwic2VjcmV0XCI6bnVsbH0sXCJzZXNcIjp7XCJrZXlcIjpudWxsLFwic2VjcmV0XCI6bnVsbCxcInJlZ2lvblwiOlwidXMtZWFzdC0xXCJ9LFwic3Bhcmtwb3N0XCI6e1wic2VjcmV0XCI6bnVsbH0sXCJzdHJpcGVcIjp7XCJtb2RlbFwiOlwiQXBwXFxcXFVzZXJcIixcImtleVwiOm51bGwsXCJzZWNyZXRcIjpudWxsfX0sXCJzZXNzaW9uXCI6e1wiZHJpdmVyXCI6XCJhcnJheVwiLFwibGlmZXRpbWVcIjoxMjAsXCJleHBpcmVfb25fY2xvc2VcIjpmYWxzZSxcImVuY3J5cHRcIjpmYWxzZSxcImZpbGVzXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay9zZXNzaW9uc1wiLFwiY29ubmVjdGlvblwiOm51bGwsXCJ0YWJsZVwiOlwic2Vzc2lvbnNcIixcInN0b3JlXCI6bnVsbCxcImxvdHRlcnlcIjpbMiwxMDBdLFwiY29va2llXCI6XCJsYXJhdmVsX3Nlc3Npb25cIixcInBhdGhcIjpcIi9cIixcImRvbWFpblwiOm51bGwsXCJzZWN1cmVcIjpmYWxzZSxcImh0dHBfb25seVwiOnRydWV9LFwidmlld1wiOntcInBhdGhzXCI6W1wiL1VzZXJzL2svYmFzYWwvcmVzb3VyY2VzL3ZpZXdzXCJdLFwiY29tcGlsZWRcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL3ZpZXdzXCJ9LFwiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcIndoaXRlMlwiOlwiI2Y4ZjhmOFwiLFwid2hpdGUzXCI6XCIjRjRGNEY0XCIsXCJ3aGl0ZTRcIjpcIiNGQUZBRkFcIixcImdyZXkxXCI6XCIjZTVlNWU1XCIsXCJncmV5MlwiOlwiI2Y1ZjVmNVwiLFwiZ3JleTNcIjpcIiNkMGQwZDBcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiYmxhY2syXCI6XCIjMjgyODI4XCIsXCJibGFjazNcIjpcIiMzMzMzMzNcIixcImJsYWNrNFwiOlwiIzIzMjkyRVwiLFwiYmxhY2s1XCI6XCIjM0U0MzQ3XCIsXCJibGFjazZcIjpcIiM0OTRFNTJcIixcInJlZDFcIjpcIiNDODIxMkJcIixcInllbGxvdzFcIjpcIiNGNkJCNDVcIixcImN5YW4xXCI6XCIjNUZBNzkzXCIsXCJvcmFuZ2UxXCI6XCIjRjY4RjYyXCIsXCJza2luMVwiOlwiI0YzRERBM1wiLFwiZ3JlZW4xXCI6XCIjNWJhNTQxXCIsXCJncmVlbjJcIjpcIiM4OGQ5NmRcIixcImdyZWVuM1wiOlwiIzc3ZDM1OFwiLFwiYmx1ZTFcIjpcIiMxZGE3ZWVcIixcImJsdWUyXCI6XCIjMDA3M2JiXCIsXCJibHVlM1wiOlwiIzRGNUQ5NVwiLFwiZ29vZ2xlX2JsdWVcIjpcIiM0Mjg1ZjRcIixcImdvb2dsZV9ncmVlblwiOlwiIzM0YTg1M1wiLFwiZ29vZ2xlX3llbGxvd1wiOlwiI2ZiYmMwNVwiLFwiZ29vZ2xlX3JlZFwiOlwiI2VhNDMzNVwiLFwiZ2l0aHViX2JsdWVcIjpcIiMwRDI2MzZcIixcImZhY2Vib29rX2JsdWVcIjpcIiM0ODY3QUFcIixcImluc3RhZ3JhbV9vclwiOlwiI0ZGNzgwNFwiLFwidHdpdHRlcl9ibHVlXCI6XCIjMDBBQ0VEXCJ9LFwiZm9udFwiOntcIjQwNFwiOntcImZvbnQtZmFtaWx5XCI6XCJNb25vdG9uXCIsXCJmb250LXNpemVcIjpcIjc1cHhcIn0sXCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImgxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIn0sXCJoM2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJjMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTZweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifSxcImMxdGJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI0MDBcIn0sXCJjMXNcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjEycHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIixcImxldHRlci1zcGFjaW5nXCI6XCIwLjVweFwifSxcImMxc2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjEycHhcIixcImZvbnQtd2VpZ2h0XCI6XCI2MDBcIixcImxldHRlci1zcGFjaW5nXCI6XCIwLjVweFwifSxcImMyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9fSxcIm1ldGFcIjp7XCJ0aXRsZVwiOlwiYmFzYWxcIixcInVybFwiOlwiaHR0cHM6Ly9iYXNhbC50ZWNoL1wiLFwiZGVzY3JpcHRpb25cIjpcIm1pbmltYWwgY29udGVudCBtYW5hZ2VtZW50XCIsXCJrZXl3b3Jkc1wiOlwiY21zXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovYmFzYWxcIn0sXCJzZXR0aW5nc1wiOntcInBlcnBhZ2VcIjoxMH19OyIsIkRhc2hib2FyZCA9XG5cbiAgaTogLT5cbiAgICBAbG9hZCgpIGlmIHdpbmRvdy5Vc2VyIGlzbnQgdW5kZWZpbmVkXG5cbiAgbG9hZDogKGNvbXBsZXRlKSAtPlxuICAgIF8ub2ZmICcucGFnZS5ob21lJ1xuICAgIF8ub24gJy5wYWdlLmRhc2hib2FyZCdcbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZGFzaGJvYXJkID4gLmNvbGxlY3Rpb25zJykpXG5cbiAgICBfLmdldCAnL2FwaS9jbGllbnRzJyxcbiAgICAgIHZpZXc6ICdkYXNoYm9hcmQnXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBUaW1lLmkoKVxuICAgICAgJCgnLmNvbGxlY3Rpb25zJykuaHRtbCByZXNwb25zZS52aWV3XG5cbiIsIkVudGl0aWVzID1cblxuICBibG9nczogW11cbiAgY3JvcHM6IHt9XG4gIGltYWdlczoge31cblxuICBwbGFjZWhvbGRlcnM6IFtcbiAgICBcIlRoYXQncyB3aGF0IEknbSBibG9nZ2luZyBhYm91dFwiXG4gICAgXCJIYXZlIHlvdSBndXlzIGJlZW4gYmxvZ2dpbmc/XCJcbiAgICBcIkhvbGQgYWxsIG15IGNhbGxzLCBJJ20gYmxvZ2dpbmdcIlxuICAgIFwiVGVsbCBEb25uaWUgSSdtIGJsb2dnaW5nIGFuZCBJJ2xsIGNhbGwgaGltIGJhY2tcIlxuICAgIFwiSSBnb3R0YSBydW4sIHlvdSBzaG91bGQgYmUgYmxvZ2dpbmdcIlxuICAgIFwiSSB3YW50IHlvdSBvbiB0aGUgcGhvbmUsIGJ1dCBJIGFsc28gd2FudCB5b3UgYmxvZ2dpbmdcIlxuICBdXG5cbiAgQmxvZzogKGVsLCBuYW1lLCB2YWx1ZT1mYWxzZSkgLT5cblxuICAgIGVkaXRvciA9IGVsLmZpbmQoJy5ibG9nJykuc3VtbWVybm90ZVxuICAgICAgcGxhY2Vob2xkZXI6IEBwbGFjZWhvbGRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQHBsYWNlaG9sZGVycy5sZW5ndGgpXVxuICAgICAgY2FsbGJhY2tzOlxuICAgICAgICBvbkltYWdlVXBsb2FkOiAoZmlsZXMpIC0+XG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VVcGxvYWQgZmlsZXMsIHRoaXNcblxuICAgIGVsLmZpbmQoJy5ibG9nJykuc3VtbWVybm90ZSgnY29kZScsIHZhbHVlKSBpZiB2YWx1ZSBpc250IGZhbHNlXG5cbiAgICBAYmxvZ3MucHVzaCBuYW1lOiBuYW1lLCBlZGl0b3I6IGVkaXRvciwgZWw6IGVsLmZpbmQoJy5ibG9nJylcblxuICBibG9nR2V0Q29kZTogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICByZXR1cm4gYmxvZy5lbC5zdW1tZXJub3RlKCdjb2RlJykgaWYgYmxvZy5uYW1lIGlzIG5hbWVcbiBcbiAgYmxvZ0ZvY3VzOiAobmFtZSkgLT5cbiAgICBmb3IgYmxvZyBpbiBAYmxvZ3NcbiAgICAgIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gICAgICAgICQoJy5ub3RlLWVkaXRhYmxlJykuZm9jdXMoKVxuXG4gIGltYWdlVXBsb2FkOiAoZmlsZXMsIGVsKSAtPlxuXG4gICAgZmQgPSBuZXcgRm9ybURhdGEoKVxuICAgIGZkLmFwcGVuZCAnZmlsZScsIGZpbGVzWzBdXG5cbiAgICBfLnBvc3RcbiAgICAgIHhocjogLT5cbiAgICAgICAgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lciAncHJvZ3Jlc3MnLCAoZSkgLT5cbiAgICAgICAgICBjb21wbGV0ZSA9IGUubG9hZGVkIC8gZS50b3RhbFxuICAgICAgICAgIGlmIGNvbXBsZXRlIDwgMSB0aGVuIE5vdGljZS5pICdVcGxvYWRpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAgIGlmIGNvbXBsZXRlIGlzIDEgdGhlbiBOb3RpY2UuaSAnUHJvY2Vzc2luZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICwgZmFsc2VcbiAgICAgICAgcmV0dXJuIHhoclxuXG4gICAgICB1cmw6ICcvYXBpL3VwbG9hZCdcbiAgICAgIGRhdGE6IGZkXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZVxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgICBhbHdheXM6IC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICBlcnJvcjogLT5cbiAgICAgICAgTm90aWNlLmQoKVxuICAgICAgc3VjY2VzczogKHJlc3VsdCkgLT5cbiAgICAgICAgJChlbCkuc3VtbWVybm90ZSgnZWRpdG9yLmluc2VydEltYWdlJywgcmVzdWx0LmRhdGEudXJsKVxuICAgICAgICBOb3RpY2UuaSAnRmlsZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcblxuICBUYWdzOiAoZWwsIG5hbWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5zZWxlY3RpemVcbiAgICAgIHBsdWdpbnM6IFsncmVzdG9yZV9vbl9iYWNrc3BhY2UnLCdyZW1vdmVfYnV0dG9uJ11cbiAgICAgIGRlbGltaXRlcjogJywnXG4gICAgICBwZXJzaXN0OiBmYWxzZVxuICAgICAgY3JlYXRlOiAoaW5wdXQpIC0+XG4gICAgICAgIHZhbHVlOiBpbnB1dFxuICAgICAgICB0ZXh0OiBpbnB1dFxuXG4gIFRpbWU6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGVuYWJsZVRpbWU6IHRydWVcbiAgICAgIG5vQ2FsZW5kYXI6IHRydWVcbiAgICAgIGRhdGVGb3JtYXQ6ICdoOmkgSydcblxuICBEYXRlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1knXG5cbiAgRGF0ZVRpbWU6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSBoOmkgSydcbiAgICAgIGVuYWJsZVRpbWU6IHRydWVcblxuICBEYXRlUmFuZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSdcbiAgICAgIG1vZGU6ICdyYW5nZSdcblxuICBEYXRlVGltZVJhbmdlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1kgaDppIEsnXG4gICAgICBlbmFibGVUaW1lOiB0cnVlXG4gICAgICBtb2RlOiAncmFuZ2UnXG5cbiAgSW1hZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG5cbiAgICBAaW1hZ2VIYW5kbGVycyBlbFxuXG4gICAgIyBwcmVsb2FkIGV4aXN0aW5nIGltYWdlc1xuICAgIGlmIHZhbHVlIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wcGVyKHZhbHVlLCBlbClcbiAgICAgIEVudGl0aWVzLmltYWdlc1tuYW1lXSA9IHZhbHVlXG5cblxuICBpbWFnZUhhbmRsZXJzOiAoZWwsIG5hbWUpIC0+XG5cbiAgICBlbC5vbiAnZHJhZ292ZXInLCBAaW1hZ2VIYW5kbGVyLmRyYWdvdmVyXG4gICAgZWwub24gJ2RyYWdsZWF2ZScsIEBpbWFnZUhhbmRsZXIuZHJhZ2xlYXZlXG4gICAgZWwub24gJ2RyYWdlbnRlciBkcmFnb3ZlcicsIEBpbWFnZUhhbmRsZXIuY2FuY2VsXG4gICAgZWwub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAaW1hZ2VIYW5kbGVyLmRyb3BcbiAgICBlbC5maW5kKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhLnNlbGVjdCcpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuY2hvb3NlRmlsZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEuc2F2ZScpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuc2F2ZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGlucHV0OmZpbGUnKS5vbiAnY2hhbmdlJywgQGltYWdlSGFuZGxlci5jaGFuZ2VcblxuICBpbWFnZUhhbmRsZXI6XG5cbiAgICBkcmFnb3ZlcjogLT5cbiAgICAgIF8ub24gJCh0aGlzKS5maW5kKCcuaW5wdXQtaW1hZ2UnKVxuICAgIGRyYWdsZWF2ZTogLT5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCgnLmlucHV0LWltYWdlJylcbiAgICBjYW5jZWw6IC0+XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBkcm9wOiAoZSkgLT5cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCAnLmlucHV0LWltYWdlJ1xuXG4gICAgICBpZiBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyIGFuZCBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aFxuICAgICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgICAgRW50aXRpZXMubG9hZENyb3BwZXIgZmlsZXNbMF0sICQodGhpcylcblxuICAgIGNob29zZUZpbGU6IC0+XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgICBjaGFuZ2U6IC0+XG4gICAgICBpZiAkKHRoaXMpWzBdLmZpbGVzXG4gICAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuXG4gICAgICAgIEVudGl0aWVzLmxvYWRDcm9wcGVyIGZpbGVzWzBdLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpXG5cbiAgICBzYXZlOiAtPlxuXG4gICAgICBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5kYXRhICduYW1lJ1xuICAgICAgaW5kZXggPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEgJ2luZGV4J1xuXG4gICAgICBTcGlubmVyLmkoJChcIi5lbnRpdHlfaW5kZXhfI3tpbmRleH1cIikpXG5cbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmdldENyb3BwZWRDYW52YXMoKS50b0Jsb2IgKGJsb2IpIC0+XG4gICAgICAgIENsaWVudC5pbWFnZVVwbG9hZCBibG9iLCAocmVzdWx0KSAtPlxuICAgICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAsICdpbWFnZS9qcGVnJ1xuXG4gIGxvYWRDcm9wcGVyOiAoZmlsZSwgZWwpIC0+XG5cbiAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cbiAgICByZWFkZXIub25sb2FkZW5kID0gLT5cbiAgICAgIEVudGl0aWVzLmNyb3BwZXIgcmVhZGVyLnJlc3VsdCwgZWxcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTCBmaWxlXG5cbiAgY3JvcHBlcjogKHVybCwgZWwpIC0+XG5cbiAgICBuYW1lID0gZWwuZGF0YSAnbmFtZSdcbiAgICBpbmRleCA9IGVsLmRhdGEgJ2luZGV4J1xuXG4gICAgY29uc29sZS5sb2cgbmFtZSwgaW5kZXhcblxuICAgIGlmIEVudGl0aWVzLmNyb3BzW25hbWVdIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wc1tuYW1lXS5kZXN0cm95KClcbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdID0gZmFsc2VcblxuICAgIGVsLmZpbmQoJy5jcm9wcGVyJykuYXR0ciAnc3JjJywgdXJsXG5cbiAgICBFbnRpdGllcy5jcm9wc1tuYW1lXSA9IG5ldyBDcm9wcGVyIGVsLmZpbmQoJy5jcm9wcGVyJylbMF0sXG4gICAgICBtaW5Db250YWluZXJIZWlnaHQ6IDMwMFxuICAgICAgbWluQ2FudmFzSGVpZ2h0OiAzMDBcbiAgICAgIHJlc3BvbnNpdmU6IHRydWVcbiAgICAgIHByZXZpZXc6IFwiZGl2LmVudGl0eV9pbmRleF8je2luZGV4fSA+IGRpdi5pbnB1dC1pbWFnZSA+IGRpdi5waWN0dXJlXCJcbiAgICAgIGF1dG9Dcm9wQXJlYTogMVxuICAgICAgc3RyaWN0OiBmYWxzZVxuICAgICAgaGlnaGxpZ2h0OiB0cnVlXG5cbiAgICBfLm9uIGVsLmZpbmQoJy5zYXZlJylcblxuXG4iLCJFbnRyaWVzID1cblxuICBpOiAtPlxuXG4gICAgIyBsaW1pdCBmaWx0ZXIgdHlwZXMgYmFzZWQgb24gdXNlciB0eXBlXG4gICAgaWYgVXNlcj8uY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICBMaXN0aW5nLmkgJ2VudHJpZXMnLCBmYWxzZSwgWydzdHJ1Y3R1cmUnXVxuICAgIGVsc2VcbiAgICAgIExpc3RpbmcuaSAnZW50cmllcycsIGZhbHNlLCBbJ2NsaWVudCcsICdzdHJ1Y3R1cmUnXVxuIiwiRW50cnkgPVxuXG4gIHNlbGVjdFN0cnVjdHVyZToge31cblxuICBfaWQ6IGZhbHNlXG4gIHN0cnVjdHVyZTogZmFsc2VcbiAgc2VsZWN0ZWRTdHJ1Y3R1cmU6IGZhbHNlXG4gIGVudHJ5OiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLmhhc2gubWF0Y2ggLyNzdHJ1Y3R1cmU9KFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBFbnRyeS5zZWxlY3RlZFN0cnVjdHVyZSA9IG1hdGNoWzFdXG5cbiAgICBAc2VsZWN0aXplKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvZW50cmllc1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG4gICAgZWxzZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5mb2N1cygpXG5cbiAgc3RydWN0dXJlU3BlY2lmaWVkOiAtPlxuICAgIGlmIEVudHJ5LnNlbGVjdGVkU3RydWN0dXJlIGlzbnQgZmFsc2VcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuc2V0VmFsdWUgRW50cnkuc2VsZWN0ZWRTdHJ1Y3R1cmVcblxuICBzZWxlY3RpemU6IC0+XG5cbiAgICBAc2VsZWN0U3RydWN0dXJlID0gU2VsZWN0aXplLnN0cnVjdHVyZXMgJCgnLm1vZGlmeSA+IC5zdHJ1Y3R1cmUgPiBzZWxlY3QnKSxcbiAgICAgIEVudHJ5LnN0cnVjdHVyZVNlbGVjdEhhbmRsZXJcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0JykuY2xpY2sgQHN1Ym1pdFxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5hbm90aGVyJykuY2xpY2sgQGFub3RoZXJcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuY2FuY2VsJykuY2xpY2sgQGNhbmNlbFxuXG4gICAgJCgnLmZvY3VzbWUnKS5mb2N1cyAtPlxuICAgICAgJCgnLm5vdGUtZWRpdGFibGUnKS5mb2N1cygpXG5cblxuICBsb2FkOiAoX2lkKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5JykpXG5cbiAgICBfLmdldCAnL2FwaS9lbnRyaWVzLycsXG4gICAgICBfaWQ6IF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgZW50cnkgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICBFbnRyeS5lbnRyeSA9IGVudHJ5XG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmFkZE9wdGlvblxuICAgICAgICBpZDogZW50cnkuc3RydWN0dXJlLmlkLCBuYW1lOiBlbnRyeS5zdHJ1Y3R1cmUubmFtZSwgY2xpZW50UHJvZmlsZTogZW50cnkuY2xpZW50LnByb2ZpbGVcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuc2V0VmFsdWUgZW50cnkuc3RydWN0dXJlLmlkXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmRpc2FibGUoKVxuXG4gIHN1Ym1pdDogLT5cblxuICAgIG5hbWUgPSAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICBlbnRpdGllcyA9IHt9XG5cbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keSA+IC5lbnRpdHknKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIGVudGl0eV9uYW1lID0gJChlbCkuZmluZCgnLmxhYmVsJykuaHRtbCgpXG4gICAgICB0eXBlID0gJChlbCkuZGF0YSAndHlwZSdcblxuICAgICAgc3dpdGNoIHR5cGVcbiAgICAgICAgd2hlbiAnVGV4dCcsJ051bWJlcicsJ0xpbmsnLCdEYXRlJywnVGltZScsJ0RhdGVUaW1lJywnRGF0ZVJhbmdlJywnRGF0ZVRpbWVSYW5nZScgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKClcbiAgICAgICAgd2hlbiAnVGFncycgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKCkuc3BsaXQgJywnXG4gICAgICAgIHdoZW4gJ0Jsb2cnXG4gICAgICAgICAgYmxvZyA9IEVudGl0aWVzLmJsb2dHZXRDb2RlIGVudGl0eV9uYW1lXG4gICAgICAgICAgdmFsdWUgPSBibG9nXG4gICAgICAgIHdoZW4gJ0ltYWdlJ1xuICAgICAgICAgIHZhbHVlID0gRW50aXRpZXMuaW1hZ2VzW2VudGl0eV9uYW1lXVxuXG4gICAgICBlbnRpdGllc1tlbnRpdHlfbmFtZV0gPSBuYW1lOiBlbnRpdHlfbmFtZSwgdHlwZTogdHlwZSwgdmFsdWU6IHZhbHVlXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeScpKVxuXG4gICAgICBjYWxsID0gJy9hcGkvZW50cmllcy9hZGQnXG4gICAgICBpZiBFbnRyeS5faWQgaXNudCBmYWxzZVxuICAgICAgICBjYWxsID0gXCIvYXBpL2VudHJpZXMvdXBkYXRlLyN7RW50cnkuX2lkfVwiXG5cbiAgICAgIF8ucG9zdCBjYWxsLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIHN0cnVjdHVyZTogRW50cnkuc3RydWN0dXJlXG4gICAgICAgIGVudGl0aWVzOiBlbnRpdGllc1xuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIEVudHJ5Ll9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL2VudHJpZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBFbnRyeS5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuICAgICAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYW5vdGhlcidcblxuICBhbm90aGVyOiAtPlxuICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9lbnRyaWVzL25ldyNzdHJ1Y3R1cmU9I3tFbnRyeS5zdHJ1Y3R1cmV9XCJcbiAgY2FuY2VsOiAtPlxuICAgIGlmIGRvY3VtZW50LnJlZmVycmVyLmluZGV4T2Yod2luZG93LmxvY2F0aW9uLmhvc3QpIGlzIC0xXG4gICAgICBsb2NhdGlvbi5ocmVmID0gXCIvZW50cmllc1wiXG4gICAgZWxzZVxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpXG4gIHN0cnVjdHVyZVNlbGVjdEhhbmRsZXI6IChlKSAtPlxuICAgIHN0cnVjdHVyZV9pZCA9ICQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKVxuICAgIHJldHVybiBmYWxzZSBpZiBzdHJ1Y3R1cmVfaWQubGVuZ3RoIGlzbnQgMjRcbiAgICAjaWYgRW50cnkuZW50cnkgaXNudCBmYWxzZVxuICAgICMgIEVudHJ5LmxvYWRFbnRpdGllcyBFbnRyeS5lbnRyeS5lbnRpdGllcywgRW50cnkuZW50cnkubmFtZVxuICAgICNlbHNlXG4gICAgRW50cnkubG9hZFN0cnVjdHVyZSBzdHJ1Y3R1cmVfaWRcblxuICBsb2FkU3RydWN0dXJlOiAoX2lkKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsXG4gICAgICBfaWQ6IF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgRW50cnkuc3RydWN0dXJlID0gX2lkXG4gICAgICBAbG9hZEVudGl0aWVzIHJlc3BvbnNlLmRhdGFbMF0uZW50aXRpZXNcblxuICBsb2FkRW50aXRpZXM6IChlbnRpdGllcywgbmFtZT1mYWxzZSkgLT5cblxuICAgIF8ub24gJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lJ1xuICAgIGlmIEVudHJ5LmVudHJ5Lm5hbWUgaXNudCBmYWxzZVxuICAgICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbChFbnRyeS5lbnRyeS5uYW1lKVxuXG4gICAgYm9keSA9ICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5JylcbiAgICBib2R5Lmh0bWwgJydcblxuICAgIHRhYmluZGV4ID0gM1xuICAgIGluZGV4ID0gMFxuXG4gICAgZm9yIGksIGVudGl0eSBvZiBlbnRpdGllc1xuXG4gICAgICBodG1sID0gJChcIi5wYWdlLmVudHJ5ID4gI3RlbXBsYXRlID4gLmVudGl0eV8je2VudGl0eS50eXBlfVwiKS5jbG9uZSgpXG4gICAgICBodG1sLmFkZENsYXNzIFwiZW50aXR5X2luZGV4XyN7KytpbmRleH1cIlxuICAgICAgaHRtbC5kYXRhIFwiaW5kZXhcIiwgaW5kZXhcbiAgICAgIGh0bWwuZGF0YSBcIm5hbWVcIiwgZW50aXR5Lm5hbWVcblxuICAgICAgaWYgRW50cnkuZW50cnkuZW50aXRpZXM/W2ldPy52YWx1ZVxuXG4gICAgICAgIHZhbHVlID0gRW50cnkuZW50cnkuZW50aXRpZXNbaV0udmFsdWVcblxuICAgICAgICBzd2l0Y2ggZW50aXR5LnR5cGVcbiAgICAgICAgICB3aGVuICdUYWdzJywgJ1RleHQnLCdOdW1iZXInLCdMaW5rJywnRGF0ZScsJ1RpbWUnLCdEYXRlVGltZScsJ0RhdGVSYW5nZScsJ0RhdGVUaW1lUmFuZ2UnIHRoZW4gaHRtbC5maW5kKCdpbnB1dCcpLnZhbCB2YWx1ZVxuXG4gICAgICBodG1sLmZpbmQoJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYScpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXgrK1xuICAgICAgYm9keS5hcHBlbmQgaHRtbFxuXG4gICAgICBlbnRpdHlFbCA9ICQoXCIucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keSAuZW50aXR5X2luZGV4XyN7aW5kZXh9XCIpXG4gICAgICBlbnRpdHlFbC5maW5kKCcubGFiZWwnKS5odG1sIGVudGl0eS5uYW1lXG5cbiAgICAgIGlmIEVudGl0aWVzW2VudGl0eS50eXBlXSBpc250IHVuZGVmaW5lZFxuICAgICAgICBFbnRpdGllc1tlbnRpdHkudHlwZV0oZW50aXR5RWwsIGVudGl0eS5uYW1lLCB2YWx1ZSlcblxuICAgICQoJ1t0YWJpbmRleD0yXScpLmZvY3VzKClcbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0J1xuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4KytcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYW5vdGhlcicpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXhcbiIsIkZpbHRlciA9XG4gIGZpbHRlcjogZmFsc2VcbiAgZW5kcG9pbnQ6IGZhbHNlXG4gIGZpbHRlcnM6IFtdXG5cbiAgaTogKGZpbHRlcnMpIC0+XG5cbiAgICBAZmlsdGVycyA9IGZpbHRlcnNcblxuICAgIF8ub24gXCIuZmlsdGVyXyN7ZmlsdGVyfVwiIGZvciBmaWx0ZXIgaW4gQGZpbHRlcnNcblxuICAgIGZvciBmaWx0ZXIgaW4gQGZpbHRlcnNcbiAgICAgIGlmIFF1ZXJ5LnBhcmFtKGZpbHRlcikgaXNudCB1bmRlZmluZWRcbiAgICAgICAgRmlsdGVyLnNlbGVjdGVkIGZpbHRlclxuXG4gICAgJChcIi5saXN0aW5nXCIpLm9uICdjbGljaycsICcubGlzdC1oZWFkZXIgPiAuZmlsdGVycyA+IC5maWx0ZXInLCBAaGFuZGxlcnMuZmlsdGVySGFuZGxlclxuICAgICQoXCIubGlzdGluZ1wiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLmZpbHRlcnMgPiAuZmlsdGVyID4gLm9wdGlvbl9zZWxlY3RlZCA+IC5pY29uLmNhbmNlbCcsIEBoYW5kbGVycy5maWx0ZXJDbGVhckhhbmRsZXJcblxuICBkOiAtPlxuICAgIF8ub2ZmIFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiXG4gICAgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dCcpLnZhbCAnJ1xuICAgIEZpbHRlci5oYW5kbGVycy5kKClcbiAgICBMaXN0aW5nLnVuc2VsZWN0QWxsKClcbiAgICAjU3Bpbm5lci5kKClcblxuICBnZXQ6IChzZWFyY2g9bnVsbCkgLT5cbiAgICBTcGlubmVyLmkoJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn0gPiAuaW5uZXIgPiAudmFsdWVzXCIpKVxuXG4gICAgb3B0aW9ucyA9XG4gICAgICB2aWV3OiAnZmlsdGVycydcblxuICAgIG9wdGlvbnMuZGVsZXRlZCA9IHRydWUgaWYgTGlzdGluZy5kZWxldGVkIGlzIHRydWVcblxuICAgIGZvciBpbmRleCwgZmlsdGVyIG9mIEZpbHRlci5maWx0ZXJzXG4gICAgICBpZiBmaWx0ZXIgaXNudCBGaWx0ZXIuZmlsdGVyIGFuZCBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIG9wdGlvbnNbZmlsdGVyICsgJy5uYW1lJ10gPSBRdWVyeS5wYXJhbSBmaWx0ZXJcblxuICAgIG9wdGlvbnMubmFtZSA9IHNlYXJjaCBpZiBzZWFyY2ggaXNudCBudWxsXG5cbiAgICBfLmdldCBcIi9hcGkvI3tAZW5kcG9pbnR9XCIsIG9wdGlvbnNcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcycpLmh0bWwgcmVzcG9uc2Uudmlld1xuICAgICAgU3Bpbm5lci5kKClcblxuICBzZWxlY3Q6IChvcHRpb24pIC0+XG4gICAgUXVlcnkucGFyYW0gJ3BhZ2UnLCBmYWxzZVxuICAgIFF1ZXJ5LnBhcmFtIEZpbHRlci5maWx0ZXIsIG9wdGlvblxuICAgIEZpbHRlci5zZWxlY3RlZCBGaWx0ZXIuZmlsdGVyXG4gICAgRmlsdGVyLmQoKVxuICAgIExpc3RpbmcubG9hZCgpXG5cbiAgc2VsZWN0ZWQ6IChmaWx0ZXIpIC0+XG4gICAgaWYgUXVlcnkucGFyYW0oZmlsdGVyKSBpcyB1bmRlZmluZWRcbiAgICAgICQoXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWQgPiAuY29weVwiKS5odG1sICcnXG4gICAgICBfLm9uIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX2RlZmF1bHRcIlxuICAgICAgXy5vZmYgXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWRcIlxuICAgICAgcmV0dXJuIHRydWVcbiAgICAkKFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkID4gLmNvcHlcIikuaHRtbCBRdWVyeS5wYXJhbSBmaWx0ZXJcbiAgICBfLm9mZiBcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9kZWZhdWx0XCJcbiAgICBfLm9uIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkXCJcblxuICBoYW5kbGVyczpcblxuICAgIGk6IC0+XG5cbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLmxhYmVsID4gLmljb24uY2FuY2VsJywgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAna2V5dXAnLCcgLmlubmVyID4gLnNlYXJjaCA+IGlucHV0JywgQGtleUhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBzZWxlY3RIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ21vdXNlb3ZlcicsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQGhvdmVySGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdibHVyJywgIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2NsaWNrJywgQGluc2lkZUNoZWNrXG5cbiAgICAgICQoZG9jdW1lbnQpLm9uICdjbGljaycsIEBvdXRzaWRlQ2hlY2tcblxuICAgIGQ6IC0+XG5cbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC5sYWJlbCA+IC5pY29uLmNhbmNlbCcsIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdrZXl1cCcsJyAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXQnLCBAa2V5SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnY2xpY2snLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBzZWxlY3RIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdtb3VzZW92ZXInLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBob3ZlckhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2JsdXInLCAgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2NsaWNrJywgQGluc2lkZUNoZWNrXG5cbiAgICAgICQoZG9jdW1lbnQpLm9mZiAnY2xpY2snLCBAb3V0c2lkZUNoZWNrXG5cblxuICAgIGZpbHRlckNsZWFySGFuZGxlcjogLT5cbiAgICAgIGNvbnNvbGUubG9nICdhYm91dCB0byBjbGVhcidcbiAgICAgIEZpbHRlci5maWx0ZXIgPSAkKHRoaXMpLmRhdGEgJ2ZpbHRlcidcbiAgICAgIEZpbHRlci5zZWxlY3QgZmFsc2VcbiAgICAgIEZpbHRlci5kKClcblxuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICBmaWx0ZXJIYW5kbGVyOiAtPlxuICAgICAgRmlsdGVyLmQoKVxuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgRmlsdGVyLmZpbHRlciA9ICQodGhpcykuZGF0YSAnZmlsdGVyJ1xuICAgICAgRmlsdGVyLmVuZHBvaW50ID0gJCh0aGlzKS5kYXRhICdlbmRwb2ludCdcblxuXG4gICAgICBpZiAkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIEZpbHRlci5kKClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgIEZpbHRlci5oYW5kbGVycy5pKClcblxuICAgICAgJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn0gPiAuaW5uZXIgPiAudmFsdWVzXCIpLmh0bWwgJydcbiAgICAgIF8ub24gXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9XCJcbiAgICAgICQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9ID4gLmlubmVyID4gLnNlYXJjaCA+IGlucHV0XCIpLmZvY3VzKClcblxuICAgICAgRmlsdGVyLmdldCgpXG5cbiAgICBpbnNpZGVDaGVjazogLT5cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgb3V0c2lkZUNoZWNrOiAtPlxuICAgICAgRmlsdGVyLmQoKVxuXG4gICAgaG92ZXJIYW5kbGVyOiAtPlxuXG4gICAgICBfLm9mZiAnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUub24nXG4gICAgICBfLm9uICQodGhpcylcblxuICAgIHNlbGVjdEhhbmRsZXI6IC0+XG4gICAgICBGaWx0ZXIuc2VsZWN0ICQodGhpcykuZmluZCgnLm5hbWUnKS5odG1sKClcblxuICAgIGtleUhhbmRsZXI6IC0+XG5cbiAgICAgIGtleSA9IGV2ZW50LmtleUNvZGVcblxuICAgICAgc3dpdGNoIGtleVxuICAgICAgICB3aGVuIDI3IHRoZW4gRmlsdGVyLmQoKVxuICAgICAgICB3aGVuIDQwLCAzOSB0aGVuIEZpbHRlci5uYXYgJ2Rvd24nXG4gICAgICAgIHdoZW4gMzcsMzggdGhlbiBGaWx0ZXIubmF2ICd1cCdcbiAgICAgICAgd2hlbiAxMyB0aGVuIEZpbHRlci5zZWxlY3QgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUub24gPiAubmFtZScpLmh0bWwoKVxuICAgICAgICBlbHNlIEZpbHRlci5nZXQgJCh0aGlzKS52YWwoKVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gIG5hdjogKGRpcikgLT5cblxuICAgIGN1ciA9ICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlLm9uJylcbiAgICBuZXh0ID0gY3VyLm5leHQoKSBpZiBkaXIgaXMgJ2Rvd24nXG4gICAgbmV4dCA9IGN1ci5wcmV2KCkgaWYgZGlyIGlzICd1cCdcbiAgICBfLm9mZiBjdXJcblxuICAgIGlmIG5leHQubGVuZ3RoIGlzbnQgMFxuICAgICAgXy5vbiBuZXh0XG4gICAgICByZXR1cm5cblxuICAgIF8ub24gJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlOmZpcnN0LWNoaWxkJyBpZiBkaXIgaXMgJ2Rvd24nXG4gICAgXy5vbiAnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWU6bGFzdC1jaGlsZCcgaWYgZGlyIGlzICd1cCdcblxuIiwiR2xvYmFsID1cblxuICAjIGtldmluIG9sc29uIChrZXZpbkAyNTYuaW8pIPCfjIDwn463XG5cbiAgd2luZG93OiBmYWxzZVxuICB3aW5kb3dUaW1lcjogZmFsc2VcbiAgaW5pdDogZmFsc2VcbiAgcHJvdGVjdGVkOiBbJ2VudHJpZXMnLCdzdHJ1Y3R1cmVzJywnY2xpZW50cycsJ3VzZXJzJ11cblxuICBpOiAtPlxuICAgIEdsb2JhbC5oYW5kbGVycygpXG4gICAgR2xvYmFsLmxvZ2luQ2hlY2soKVxuXG4gICAgJChcIi5tZW51ID4gLm9wdGlvbl8je1BhZ2V9XCIpLmFkZENsYXNzKCdhY3RpdmUnKSBpZiBQYWdlP1xuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnKS5jbGljayBHbG9iYWwudXNlclByb2ZpbGVIYW5kbGVyXG4gICAgJCgnLm9hdXRocyA+IC5vYXV0aCcpLmNsaWNrIEdsb2JhbC51c2VyT2F1dGhIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiAubG9nb3V0JykuY2xpY2sgR2xvYmFsLmxvZ291dEhhbmRsZXJcbiAgICAkKCcubWVudSA+IC5vcHRpb24nKS5jbGljayBHbG9iYWwubWVudUhhbmRsZXJcblxuICBtZW51SGFuZGxlcjogLT5cbiAgICAkKCcubWVudSA+IC5vcHRpb24nKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICQodGhpcykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICBTcGlubmVyLmkoJCgnaGVhZGVyJykpXG5cbiAgbG9nb3V0SGFuZGxlcjogLT5cblxuICAgIFByb21wdC5pICdMb2dvdXQnLCAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICByZXR1cm4gZmFsc2UgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuXG4gICAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgICAgTWUubG9nb3V0IC0+XG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnBpY3R1cmUnXG4gICAgICAgIE5vdGljZS5pICdMb2dvdXQgc3VjY2Vzc2Z1bCcsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuICAgICAgICAsIDEyMDBcblxuICB1c2VyUHJvZmlsZUhhbmRsZXI6IC0+XG5cbiAgICBvYSA9ICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5vYXV0aHMnKVxuICAgIHRsID0gbmV3IFRpbWVsaW5lTWF4IHJlcGVhdDogMFxuXG4gICAgaWYgb2EuaGFzQ2xhc3MgJ29mZidcbiAgICAgIF8ub24gb2FcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI2NhbmNlbFNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICBlbHNlXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNwcm9maWxlU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgICAgXy5vZmYgb2EsIG9mZmluZzogMC41XG5cbiAgdXNlck9hdXRoSGFuZGxlcjogLT5cblxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICByZXR1cm4gdHJ1ZSBpZiB0eXBlIGlzICdjYW5jZWwnXG5cbiAgICBHbG9iYWwub2F1dGhXaW5kb3cgJy9sb2FkaW5nJ1xuXG4gICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICBwYXJhbXMgPSB7fVxuICAgIHBhcmFtcy5pbnZpdGUgPSBJbnZpdGUuaGFzaCBpZiBJbnZpdGUuaGFzaFxuXG4gICAgTWUub2F1dGggdHlwZSwgcGFyYW1zLCAodXJpKSAtPlxuICAgICAgR2xvYmFsLndpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJpXG5cbiAgb2F1dGhXaW5kb3c6ICh1cmwpIC0+XG4gICAgdyA9IDY0MFxuICAgIGggPSA1NTBcbiAgICBsZWZ0ID0gKHNjcmVlbi53aWR0aC8yKSAtICh3LzIpXG4gICAgdG9wID0gKHNjcmVlbi5oZWlnaHQvMikgLSAoaC8yKVxuXG5cbiAgICBHbG9iYWwud2luZG93ID0gd2luZG93Lm9wZW4odXJsLCAnTG9naW4gLyBSZWdpc3RlcicsIFwidG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPSN7d30saGVpZ2h0PSN7aH0sdG9wPSN7dG9wfSxsZWZ0PSN7bGVmdH1cIilcbiAgICBHbG9iYWwud2luZG93LmZvY3VzIGlmIHdpbmRvdy5mb2N1c1xuICAgIEdsb2JhbC53aW5kb3dUaW1lciA9IHNldEludGVydmFsIC0+XG4gICAgICBpZiBHbG9iYWwud2luZG93LmNsb3NlZFxuICAgICAgICBjbGVhckludGVydmFsIEdsb2JhbC53aW5kb3dUaW1lclxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBjb25zb2xlLmxvZyAnY2xvc2luZyBvdXIgc2hpdGUnXG4gICAgLCA1MFxuXG4gICAgcmV0dXJuXG5cbiAgb2F1dGhDb21wbGV0ZTogKHVzZXIpIC0+XG4gICAgU3Bpbm5lci5kKClcbiAgICBHbG9iYWwubG9naW4gdXNlclxuICAgIE5vdGljZS5pICdMb2dpbiBzdWNjZXNzZnVsJywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgaWYgVXNlci5jbGllbnQgaXNudCB1bmRlZmluZWRcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZW50cmllcydcbiAgICAgIDIwMDBcbiAgICBlbHNlXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2hvbWUnXG4gICAgICAyMDAwXG5cbiAgbG9naW46ICh1c2VyKSAtPlxuXG4gICAgd2luZG93LlVzZXIgPSB1c2VyXG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5pbWFnZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5waWN0dXJlfSlcIlxuICAgIF8ub2ZmICcubWUgPiAucHJvZmlsZSdcbiAgICBfLm9mZiAnLm1lID4gLm9hdXRocydcbiAgICBfLm9uICcubWUgPiAucGljdHVyZSdcblxuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50ID4gLm5hbWUnKS5odG1sIFVzZXIuY2xpZW50Lm5hbWVcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5jbGllbnQgPiAucGljdHVyZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5jbGllbnQucHJvZmlsZX0pXCJcbiAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5jbGllbnQnXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLmxvZ28nXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLm5hbWUnXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3B0aW9uX2NsaWVudHMnXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUgPiAub3B0aW9uX3N0cnVjdHVyZXMnXG4gICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSdcblxuICBsb2dpbkNoZWNrOiAtPlxuXG4gICAgTWUuYXV0aGVkIChyZXN1bHQpIC0+XG5cbiAgICAgIEdsb2JhbC5sb2dpbihyZXN1bHQpIGlmIHJlc3VsdCBpc250IGZhbHNlXG5cbiAgICAgICMgaWYgdGhlIHBhZ2Ugd2VyZSBvbiBcbiAgICAgIGlmIEdsb2JhbC5wcm90ZWN0ZWQuaW5kZXhPZihsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC8vZywgJycpKSBpc250IC0xIGFuZCByZXN1bHQgaXMgZmFsc2VcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuXG4gICAgICBpZiBHbG9iYWwuaW5pdCBpc250IGZhbHNlIGFuZCAoIHJlc3VsdCBpc250IGZhbHNlIG9yIEdsb2JhbC5pbml0IGlzICdJbnZpdGUnIClcbiAgICAgICAgd2luZG93W0dsb2JhbC5pbml0XS5pKClcblxuICAgICAgIyB0dXJuIG9uIGFsbCBsb2dpbiAvIHJlZ2lzdHJhdGlvbiBkaXZzXG4gICAgICBpZiB3aW5kb3cuVXNlciBpcyB1bmRlZmluZWRcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8ub24gJy5wYWdlLmhvbWUnXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5sb2dvJ1xuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcblxuICAgICAgIyBjbGllbnQgYmFzZWQgdXNlciwgZ28gdG8gZW50cmllc1xuICAgICAgaWYgVXNlcj8uY2xpZW50IGlzbnQgdW5kZWZpbmVkIGFuZCBQYWdlIGlzbnQgJ2VudHJpZXMnXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2VudHJpZXMnXG5cbiAgICAgIGlmIHdpbmRvdy5Vc2VyIGlzbnQgdW5kZWZpbmVkIGFuZCBVc2VyLmNsaWVudCBpcyB1bmRlZmluZWRcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLmxvZ28nXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5uYW1lJ1xuICAgICAgICBfLm9uICcubWVudSdcbiIsImhleGFnb25zID0gLT5cbiAgYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdjYW52YXMnXG4gIHcgPSBjLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgaCA9IGMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIHN1bSA9IHcgKyBoXG4gIGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuICBvcHRzID1cbiAgICBzaWRlOiAzNVxuICAgIHBpY2tzUGFyVGljazogMlxuICAgIGJhc2VUaW1lOiA0MDBcbiAgICBhZGRlZFRpbWU6IDEwMFxuICAgIGNvbG9yczogW1xuICAgICAgJ3JnYmEoMCwwLDAsYWxwKSdcbiAgICAgICdyZ2JhKDE4MCwzMCwzMCxhbHApJ1xuICAgICAgJ3JnYmEoMjU1LDI1NSwyNTUsYWxwKSdcbiAgICBdXG4gICAgYWRkZWRBbHBoYTogMjBcbiAgICBzdHJva2VDb2xvcjogJ3JnYigyNTUsMjU1LDI1NSknXG4gICAgaHVlU3BlZWQ6IC40XG4gICAgcmVwYWludEFscGhhOiAxXG4gIGRpZlggPSBNYXRoLnNxcnQoMykgKiBvcHRzLnNpZGUgLyAyXG4gIGRpZlkgPSBvcHRzLnNpZGUgKiAzIC8gMlxuICByYWQgPSBNYXRoLlBJIC8gNlxuICBjb3MgPSBNYXRoLmNvcyhyYWQpICogb3B0cy5zaWRlXG4gIHNpbiA9IE1hdGguc2luKHJhZCkgKiBvcHRzLnNpZGVcbiAgaGV4cyA9IFtdXG4gIHRpY2sgPSAwXG5cbiAgbG9vb3AgPSAtPlxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgbG9vb3BcbiAgICB0aWNrICs9IG9wdHMuaHVlU3BlZWRcbiAgICBjdHguc2hhZG93Qmx1ciA9IDBcbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMTAwLDEwMCwxMDAsYWxwKScucmVwbGFjZSgnYWxwJywgb3B0cy5yZXBhaW50QWxwaGEpXG4gICAgY3R4LmZpbGxSZWN0IDAsIDAsIHcsIGhcbiAgICBpID0gMFxuICAgIHdoaWxlIGkgPCBvcHRzLnBpY2tzUGFyVGlja1xuICAgICAgaGV4c1tNYXRoLnJhbmRvbSgpICogaGV4cy5sZW5ndGggfCAwXS5waWNrKClcbiAgICAgICsraVxuICAgIGhleHMubWFwIChoZXgpIC0+XG4gICAgICBoZXguc3RlcCgpXG4gICAgICByZXR1cm5cbiAgICByZXR1cm5cblxuICBIZXggPSAoeCwgeSkgLT5cbiAgICBAeCA9IHhcbiAgICBAeSA9IHlcbiAgICBAc3VtID0gQHggKyBAeVxuICAgIEBwaWNrZWQgPSBmYWxzZVxuICAgIEB0aW1lID0gMFxuICAgIEB0YXJnZXRUaW1lID0gMFxuICAgIEB4cyA9IFtcbiAgICAgIEB4ICsgY29zXG4gICAgICBAeFxuICAgICAgQHggLSBjb3NcbiAgICAgIEB4IC0gY29zXG4gICAgICBAeFxuICAgICAgQHggKyBjb3NcbiAgICBdXG4gICAgQHlzID0gW1xuICAgICAgQHkgLSBzaW5cbiAgICAgIEB5IC0gKG9wdHMuc2lkZSlcbiAgICAgIEB5IC0gc2luXG4gICAgICBAeSArIHNpblxuICAgICAgQHkgKyBvcHRzLnNpZGVcbiAgICAgIEB5ICsgc2luXG4gICAgXVxuICAgIHJldHVyblxuXG4gIEhleDo6cGljayA9IC0+XG4gICAgQGNvbG9yID0gb3B0cy5jb2xvcnNbTWF0aC5yYW5kb20oKSAqIG9wdHMuY29sb3JzLmxlbmd0aCB8IDBdXG4gICAgQHBpY2tlZCA9IHRydWVcbiAgICBAdGltZSA9IEB0aW1lIG9yIDBcbiAgICBAdGFyZ2V0VGltZSA9IEB0YXJnZXRUaW1lIG9yIG9wdHMuYmFzZVRpbWUgKyBvcHRzLmFkZGVkVGltZSAqIE1hdGgucmFuZG9tKCkgfCAwXG4gICAgcmV0dXJuXG5cbiAgSGV4OjpzdGVwID0gLT5cbiAgICBwcm9wID0gQHRpbWUgLyBAdGFyZ2V0VGltZVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5tb3ZlVG8gQHhzWzBdLCBAeXNbMF1cbiAgICBpID0gMVxuICAgIHdoaWxlIGkgPCBAeHMubGVuZ3RoXG4gICAgICBjdHgubGluZVRvIEB4c1tpXSwgQHlzW2ldXG4gICAgICArK2lcbiAgICBjdHgubGluZVRvIEB4c1swXSwgQHlzWzBdXG4gICAgaWYgQHBpY2tlZFxuICAgICAgKytAdGltZVxuICAgICAgaWYgQHRpbWUgPj0gQHRhcmdldFRpbWVcbiAgICAgICAgQHRpbWUgPSAwXG4gICAgICAgIEB0YXJnZXRUaW1lID0gMFxuICAgICAgICBAcGlja2VkID0gZmFsc2VcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjdHguc2hhZG93Q29sb3IgPSBAY29sb3IucmVwbGFjZSgnYWxwJywgTWF0aC5zaW4ocHJvcCAqIE1hdGguUEkpKVxuICAgICAgY3R4LmZpbGwoKVxuICAgIGVsc2VcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGN0eC5zaGFkb3dDb2xvciA9IG9wdHMuc3Ryb2tlQ29sb3JcbiAgICAgIGN0eC5zdHJva2UoKVxuICAgIHJldHVyblxuXG4gIHggPSAwXG4gIHdoaWxlIHggPCB3XG4gICAgaSA9IDBcbiAgICB5ID0gMFxuICAgIHdoaWxlIHkgPCBoXG4gICAgICArK2lcbiAgICAgIGhleHMucHVzaCBuZXcgSGV4KHggKyBkaWZYICogaSAlIDIsIHkpXG4gICAgICB5ICs9IGRpZllcbiAgICB4ICs9IGRpZlggKiAyXG4gIGxvb29wKClcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIC0+XG4gICAgYHZhciB4YFxuICAgIGB2YXIgaWBcbiAgICBgdmFyIHlgXG4gICAgdyA9IGMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGggPSBjLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIHN1bSA9IHcgKyBoXG4gICAgaGV4cy5sZW5ndGggPSAwXG4gICAgeCA9IDBcbiAgICB3aGlsZSB4IDwgd1xuICAgICAgaSA9IDBcbiAgICAgIHkgPSAwXG4gICAgICB3aGlsZSB5IDwgaFxuICAgICAgICArK2lcbiAgICAgICAgaGV4cy5wdXNoIG5ldyBIZXgoeCArIGRpZlggKiBpICUgMiwgeSlcbiAgICAgICAgeSArPSBkaWZZXG4gICAgICB4ICs9IGRpZlggKiAyXG4gICAgcmV0dXJuXG5cbiAgIyAtLS1cbiAgIyBnZW5lcmF0ZWQgYnkganMyY29mZmVlIDIuMi4wXG4iLCJoZXhhZ29uRHJhdyA9IC0+XG5cbiAgYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdjYW52YXMnXG4gIHcgPSBjLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgaCA9IGMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gIG9wdHMgPVxuICAgIGxlbjogMzBcbiAgICBjb3VudDogNTBcbiAgICBiYXNlVGltZTogMjBcbiAgICBhZGRlZFRpbWU6IDIwXG4gICAgZGllQ2hhbmNlOiAuMDVcbiAgICBzcGF3bkNoYW5jZTogMVxuICAgIHNwYXJrQ2hhbmNlOiAuMVxuICAgIHNwYXJrRGlzdDogMTBcbiAgICBzcGFya1NpemU6IDJcbiAgICBjb2xvcjogJ2hzbChodWUsMTAwJSxsaWdodCUpJ1xuICAgIGJhc2VMaWdodDogNTBcbiAgICBhZGRlZExpZ2h0OiAxMFxuICAgIHNoYWRvd1RvVGltZVByb3BNdWx0OiA2XG4gICAgYmFzZUxpZ2h0SW5wdXRNdWx0aXBsaWVyOiAuMDFcbiAgICBhZGRlZExpZ2h0SW5wdXRNdWx0aXBsaWVyOiAuMDJcbiAgICBjeDogdyAvIDJcbiAgICBjeTogaCAvIDJcbiAgICByZXBhaW50QWxwaGE6IC4wNFxuICAgIGh1ZUNoYW5nZTogLjFcblxuICB0aWNrID0gMFxuICBsaW5lcyA9IFtdXG4gIGRpZVggPSB3IC8gMiAvIG9wdHMubGVuXG4gIGRpZVkgPSBoIC8gMiAvIG9wdHMubGVuXG4gIGJhc2VSYWQgPSBNYXRoLlBJICogMiAvIDZcblxuICBjdHguZmlsbFN0eWxlID0gY29uZmlnLmNvbG9yLmJsYWNrNFxuICBjdHguZmlsbFJlY3QgMCwgMCwgdywgaFxuXG4gIGxvb29wID0gLT5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIGxvb29wXG4gICAgKyt0aWNrXG4gICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3ZlcidcbiAgICBjdHguc2hhZG93Qmx1ciA9IDBcbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMzUsNDEsNDYsYWxwKScucmVwbGFjZSgnYWxwJywgb3B0cy5yZXBhaW50QWxwaGEpXG4gICAgY3R4LmZpbGxSZWN0IDAsIDAsIHcsIGhcbiAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2xpZ2h0ZXInXG4gICAgaWYgbGluZXMubGVuZ3RoIDwgb3B0cy5jb3VudCBhbmQgTWF0aC5yYW5kb20oKSA8IG9wdHMuc3Bhd25DaGFuY2VcbiAgICAgIGxpbmVzLnB1c2ggbmV3IExpbmVcbiAgICBsaW5lcy5tYXAgKGxpbmUpIC0+XG4gICAgICBsaW5lLnN0ZXAoKVxuICAgICAgcmV0dXJuXG4gICAgcmV0dXJuXG5cbiAgTGluZSA9IC0+XG4gICAgQHJlc2V0KClcbiAgICByZXR1cm5cblxuICBMaW5lOjpyZXNldCA9IC0+XG4gICAgQHggPSAwXG4gICAgQHkgPSAwXG4gICAgQGFkZGVkWCA9IDBcbiAgICBAYWRkZWRZID0gMFxuICAgIEByYWQgPSAwXG4gICAgQGxpZ2h0SW5wdXRNdWx0aXBsaWVyID0gb3B0cy5iYXNlTGlnaHRJbnB1dE11bHRpcGxpZXIgKyBvcHRzLmFkZGVkTGlnaHRJbnB1dE11bHRpcGxpZXIgKiBNYXRoLnJhbmRvbSgpXG4gICAgQGNvbG9yID0gb3B0cy5jb2xvci5yZXBsYWNlKCdodWUnLCB0aWNrICogb3B0cy5odWVDaGFuZ2UpXG4gICAgQGN1bXVsYXRpdmVUaW1lID0gMFxuICAgIEBiZWdpblBoYXNlKClcbiAgICByZXR1cm5cblxuICBMaW5lOjpiZWdpblBoYXNlID0gLT5cbiAgICBAeCArPSBAYWRkZWRYXG4gICAgQHkgKz0gQGFkZGVkWVxuICAgIEB0aW1lID0gMFxuICAgIEB0YXJnZXRUaW1lID0gb3B0cy5iYXNlVGltZSArIG9wdHMuYWRkZWRUaW1lICogTWF0aC5yYW5kb20oKSB8IDBcbiAgICBAcmFkICs9IGJhc2VSYWQgKiAoaWYgTWF0aC5yYW5kb20oKSA8IC41IHRoZW4gMSBlbHNlIC0xKVxuICAgIEBhZGRlZFggPSBNYXRoLmNvcyhAcmFkKVxuICAgIEBhZGRlZFkgPSBNYXRoLnNpbihAcmFkKVxuICAgIGlmIE1hdGgucmFuZG9tKCkgPCBvcHRzLmRpZUNoYW5jZSBvciBAeCA+IGRpZVggb3IgQHggPCAtZGllWCBvciBAeSA+IGRpZVkgb3IgQHkgPCAtZGllWVxuICAgICAgQHJlc2V0KClcbiAgICByZXR1cm5cblxuICBMaW5lOjpzdGVwID0gLT5cbiAgICArK0B0aW1lXG4gICAgKytAY3VtdWxhdGl2ZVRpbWVcbiAgICBpZiBAdGltZSA+PSBAdGFyZ2V0VGltZVxuICAgICAgQGJlZ2luUGhhc2UoKVxuICAgIHByb3AgPSBAdGltZSAvIEB0YXJnZXRUaW1lXG4gICAgd2F2ZSA9IE1hdGguc2luKHByb3AgKiBNYXRoLlBJIC8gMilcbiAgICB4ID0gQGFkZGVkWCAqIHdhdmVcbiAgICB5ID0gQGFkZGVkWSAqIHdhdmVcbiAgICBjdHguc2hhZG93Qmx1ciA9IHByb3AgKiBvcHRzLnNoYWRvd1RvVGltZVByb3BNdWx0XG4gICAgY3R4LmZpbGxTdHlsZSA9IGN0eC5zaGFkb3dDb2xvciA9IEBjb2xvci5yZXBsYWNlKCdsaWdodCcsIG9wdHMuYmFzZUxpZ2h0ICsgb3B0cy5hZGRlZExpZ2h0ICogTWF0aC5zaW4oQGN1bXVsYXRpdmVUaW1lICogQGxpZ2h0SW5wdXRNdWx0aXBsaWVyKSlcbiAgICBjdHguZmlsbFJlY3Qgb3B0cy5jeCArIChAeCArIHgpICogb3B0cy5sZW4sIG9wdHMuY3kgKyAoQHkgKyB5KSAqIG9wdHMubGVuLCAyLCAyXG4gICAgaWYgTWF0aC5yYW5kb20oKSA8IG9wdHMuc3BhcmtDaGFuY2VcbiAgICAgIGN0eC5maWxsUmVjdCBvcHRzLmN4ICsgKEB4ICsgeCkgKiBvcHRzLmxlbiArIE1hdGgucmFuZG9tKCkgKiBvcHRzLnNwYXJrRGlzdCAqIChpZiBNYXRoLnJhbmRvbSgpIDwgLjUgdGhlbiAxIGVsc2UgLTEpIC0gKG9wdHMuc3BhcmtTaXplIC8gMiksIG9wdHMuY3kgKyAoQHkgKyB5KSAqIG9wdHMubGVuICsgTWF0aC5yYW5kb20oKSAqIG9wdHMuc3BhcmtEaXN0ICogKGlmIE1hdGgucmFuZG9tKCkgPCAuNSB0aGVuIDEgZWxzZSAtMSkgLSAob3B0cy5zcGFya1NpemUgLyAyKSwgb3B0cy5zcGFya1NpemUsIG9wdHMuc3BhcmtTaXplXG4gICAgcmV0dXJuXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIC0+XG4gICAgdyA9IGMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGggPSBjLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIGN0eC5maWxsU3R5bGUgPSBjb25maWcuY29sb3IuYmxhY2s0XG4gICAgY3R4LmZpbGxSZWN0IDAsIDAsIHcsIGhcbiAgICBvcHRzLmN4ID0gdyAvIDJcbiAgICBvcHRzLmN5ID0gaCAvIDJcbiAgICBkaWVYID0gdyAvIDIgLyBvcHRzLmxlblxuICAgIGRpZVkgPSBoIC8gMiAvIG9wdHMubGVuXG4gICAgcmV0dXJuXG5cbiAgbG9vb3AoKVxuXG4iLCJfLmNvbnN0cnVjdG9yKClcblxuY2xhc3MgSW5kZXhcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAbW9iaWxlXG5cbiAgbW9iaWxlOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG4iLCJJbnZpdGUgPVxuICBoYXNoOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuaW52aXRlJykpXG5cbiAgICBpZiBVc2VyPyBpc250IGZhbHNlXG4gICAgICBTcGlubmVyLmQoKVxuICAgICAgUHJvbXB0LmkgJ0ludml0ZSBFcm9ycicsICdZb3UgYXJlIGN1cnJlbnRseSBsb2dnZWQgaW4nLCBbJ09LJ10sIHt9LCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG5cbiAgICBlbHNlXG4gICAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9pbnZpdGVcXC8oWzAtOWEtZkEtRl17OH0pL1xuICAgICAgICBAaGFzaCA9IG1hdGNoWzFdXG4gICAgICAgIEBsb2FkIEBoYXNoXG4gICAgICBlbHNlXG5cbiAgbG9hZDogKGhhc2gpIC0+XG5cbiAgICBfLmdldCAnL2FwaS9pbnZpdGUvZ2V0JyxcbiAgICAgIGhhc2g6IGhhc2hcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXN1bHQpIC0+XG4gICAgICBpbnZpdGUgPSByZXN1bHQuZGF0YS5pbnZpdGVcblxuICAgICAgJCgnLnBhZ2UuaW52aXRlID4gLnByb2ZpbGUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLFwidXJsKCN7aW52aXRlLmNsaWVudC5wcm9maWxlfSlcIlxuICAgICAgJCgnLnBhZ2UuaW52aXRlID4gLnRpdGxlJykuaHRtbCBpbnZpdGUuY2xpZW50Lm5hbWVcbiIsIkxpc3RpbmcgPVxuICBjb250ZW50OiBmYWxzZVxuICBzZWxlY3RlZDogW11cbiAgZmlsdGVyczogW11cbiAgc2VsZWN0ZWRDdXJzb3I6IDBcbiAgZGVsZXRlZDogZmFsc2VcblxuICBvdGhlckFjdGlvbnM6IGZhbHNlXG5cbiAgaTogKGNvbnRlbnQsIG90aGVyQWN0aW9ucz1mYWxzZSwgZmlsdGVycz1bXSkgLT5cblxuICAgIEBmaWx0ZXJzID0gZmlsdGVyc1xuICAgIEBjb250ZW50ID0gY29udGVudFxuICAgIEBvdGhlckFjdGlvbnMgPSBvdGhlckFjdGlvbnNcblxuICAgIGlmIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2RlbGV0ZWQnKSBpc250IC0xXG4gICAgICBfLm9uIFwiLnBhZ2UuI3tAY29udGVudH0gPiAuYWN0aXZlLmRlbGV0ZWRcIlxuICAgICAgQGRlbGV0ZWQgPSB0cnVlXG4gICAgICBfLm9mZiAnLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb24uZGVsZXRlJ1xuICAgICAgXy5vbiAnLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb24ucmVzdG9yZSdcbiAgICAgIF8ub24gJy5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uLmZvcmNlJ1xuICAgICAgXy5vZmYgXCIuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbl8je0xpc3RpbmcuY29udGVudH1cIlxuICAgIGVsc2VcbiAgICAgIF8ub24gJChcIi5wYWdlLiN7QGNvbnRlbnR9ID4gLmRlbGV0ZWRcIikubm90ICcuYWN0aXZlJ1xuICAgICAgXy5vbiBcIi5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uXyN7TGlzdGluZy5jb250ZW50fVwiXG5cbiAgICBTZWFyY2guaSgpXG4gICAgQGxvYWQoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgICBGaWx0ZXIuaSBAZmlsdGVycyBpZiBAZmlsdGVycy5sZW5ndGggPiAwXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICcuY2hlY2tib3gnLCBAY2hlY2tib3hIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICcuc3dpdGNoJywgQHN3aXRjaEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NoYW5nZScsICcubGlzdC1oZWFkZXIgPiAuY2hlY2tib3ggPiBpbnB1dCcsIEBzZWxlY3RBbGxIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjaGFuZ2UnLCAnLmNoZWNrYm94ID4gaW5wdXQnLCBAc3RhdGVIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICcubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbicsIEBhY3Rpb25IYW5kbGVyXG5cbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJz4gLmlubmVyID4gLnBhZ2luYXRlID4gLmlubmVyID4gLm51bScsIEBwYWdlSGFuZGxlclxuXG4gIGNoZWNrYm94SGFuZGxlcjogLT5cbiAgICBjYiA9ICQodGhpcykuZmluZCAnaW5wdXQnXG4gICAgaWYgZXZlbnQudGFyZ2V0LnR5cGUgaXNudCAnY2hlY2tib3gnXG4gICAgICBjYlswXS5jaGVja2VkID0gIWNiWzBdLmNoZWNrZWRcbiAgICAgIGNiLmNoYW5nZSgpXG5cbiAgc3dpdGNoSGFuZGxlcjogLT5cblxuICAgIGVsID0gJCh0aGlzKVxuXG4gICAgX2lkID0gZWwuZGF0YSAnX2lkJ1xuICAgIG5hbWUgPSBlbC5kYXRhICduYW1lJ1xuICAgIHZhbHVlID0gIWVsLmhhc0NsYXNzICdvbidcblxuICAgIExpc3RpbmcudG9nZ2xlIFtfaWRdLCBuYW1lLCB2YWx1ZSwgLT5cbiAgICAgIF8uc3dhcCBlbFxuXG4gIHRvZ2dsZTogKGlkcywgbmFtZSwgdmFsdWUsIGNvbXBsZXRlKSAtPlxuXG4gICAgaWRzLmZvckVhY2ggKF9pZCwgaW5kZXgpIC0+XG5cbiAgICAgIG9wdGlvbnMgPSB7fVxuICAgICAgb3B0aW9uc1tuYW1lXSA9IHZhbHVlXG5cbiAgICAgIF8uZ2V0IFwiL2FwaS8je0xpc3RpbmcuY29udGVudH0vdXBkYXRlLyN7X2lkfVwiLFxuICAgICAgICBvcHRpb25zXG4gICAgICAuZG9uZSAocmVzcG9zbmUpIC0+XG4gICAgICAgIGlmIGluZGV4IGlzIGlkcy5sZW5ndGgtMVxuICAgICAgICAgIE5vdGljZS5pIFwiVXBkYXRlZCBzdWNjZXNzZnVsbHlcIiwgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgY29tcGxldGU/KClcblxuICBzZWxlY3RBbGxIYW5kbGVyOiAtPlxuICAgIGlmIHRoaXMuY2hlY2tlZFxuICAgICAgJCgnLmxpc3RpbmcgPiAuaW5uZXIgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykucHJvcCAnY2hlY2tlZCcsIHRydWVcbiAgICBlbHNlXG4gICAgICAkKCcubGlzdGluZyA+IC5pbm5lciA+IC5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXQnKS5wcm9wICdjaGVja2VkJywgZmFsc2VcblxuICB1bnNlbGVjdEFsbDogLT5cbiAgICAgICQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH0gPiAuaW5uZXIgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0XCIpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuICAgICAgJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fSA+IC5saXN0LWhlYWRlciA+IC5jaGVja2JveCA+IGlucHV0XCIpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuICAgICAgTGlzdGluZy5zdGF0ZUhhbmRsZXIoKVxuXG4gIHN0YXRlSGFuZGxlcjogLT5cbiAgICBpZHMgPSBbXVxuXG4gICAgJCgnLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgaWYgZWwuY2hlY2tlZFxuICAgICAgICBpZHMucHVzaCAkKGVsKS5kYXRhICdfaWQnXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cbiAgICAgIGlmIGlkcy5sZW5ndGggPiAwXG4gICAgICAgICQoJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuY29weSA+IC52YWx1ZScpLnRleHQgaWRzLmxlbmd0aFxuICAgICAgICBfLm9mZiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMnXG4gICAgICAgIF8ub2ZmICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zZWFyY2gnXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMnXG4gICAgICBlbHNlXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzJ1xuICAgICAgICBfLm9uICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zZWFyY2gnXG4gICAgICAgIF8ub2ZmICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zJ1xuICAgICAgTGlzdGluZy5zZWxlY3RlZCA9IGlkc1xuXG4gIHBhZ2VMaW5rczogLT5cbiAgICBwYXJhbXMgPSBRdWVyeS5wYXJhbXMoKVxuICAgICQoJy5wYWdpbmF0ZSA+IC5pbm5lciA+IC5udW0nKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIHBhZ2UgPSAkKGVsKS5kYXRhICdwYWdlJ1xuICAgICAgcmV0dXJuIGlmIHBhZ2UgaXMgdW5kZWZpbmVkXG4gICAgICBwYXJhbXMucGFnZSA9IHBhZ2VcbiAgICAgIHF1ZXJ5ID0gUXVlcnkuc3RyaW5naWZ5IHBhcmFtc1xuICAgICAgJChlbCkuYXR0ciAnaHJlZicsIFwiPyN7UXVlcnkuc3RyaW5naWZ5KHBhcmFtcyl9XCJcblxuICBwYWdlSGFuZGxlcjogLT5cbiAgICBwYWdlID0gJCh0aGlzKS5kYXRhICdwYWdlJ1xuICAgIHJldHVybiB0cnVlIGlmIHBhZ2UgaXMgdW5kZWZpbmVkXG4gICAgTGlzdGluZy51bnNlbGVjdEFsbCgpXG4gICAgUXVlcnkucGFyYW0gJ3BhZ2UnLCBwYWdlXG4gICAgTGlzdGluZy5sb2FkKClcbiAgICByZXR1cm4gZmFsc2VcblxuICBhY3Rpb25IYW5kbGVyOiAtPlxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICBzd2l0Y2ggdHlwZVxuICAgICAgd2hlbiAnZGVsZXRlJ1xuICAgICAgICBQcm9tcHQuaSBcIkRlbGV0aW5nICN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IGl0ZW0ocylcIixcbiAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGVzZT8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJldHVybiB0cnVlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcbiAgICAgICAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQoKVxuICAgICAgd2hlbiAncmVzdG9yZSdcbiAgICAgICAgUHJvbXB0LmkgXCJSZXN0b3JpbmcgI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gaXRlbShzKVwiLFxuICAgICAgICAgICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVzdG9yZSB0aGVzZT8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJldHVybiB0cnVlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcbiAgICAgICAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQgMCwgJ3Jlc3RvcmUnXG4gICAgICB3aGVuICdmb3JjZSdcbiAgICAgICAgUHJvbXB0LmkgXCJEZWxldGluZyAje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBpdGVtKHMpXCIsXG4gICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBQRVJNQU5FTlRMWSBkZWxldGUgdGhlc2U/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiByZXNwb25zZSBpc250ICdZZXMnXG4gICAgICAgICAgICBMaXN0aW5nLmRlbGV0ZVNlbGVjdGVkIDAsICdmb3JjZSdcblxuICAgICAgd2hlbiAncHVibGlzaCcsICdoaWRlJ1xuXG4gICAgICAgIHZhbHVlID0gKHR5cGUgaXMgJ3B1Ymxpc2gnKVxuICAgICAgICBTcGlubmVyLmkoJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fVwiKSlcbiAgICAgICAgTGlzdGluZy50b2dnbGUgTGlzdGluZy5zZWxlY3RlZCwgJ2FjdGl2ZScsIHZhbHVlLCAtPlxuXG4gICAgICAgICAgJCgnLnN3aXRjaC5hY3RpdmUnKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgICAgICAgIGZvciBfaWQgaW4gTGlzdGluZy5zZWxlY3RlZFxuICAgICAgICAgICAgICBfLm9uICQoZWwpIGlmIF9pZCBpcyAkKGVsKS5kYXRhKCdfaWQnKSBhbmQgdmFsdWUgaXMgdHJ1ZVxuICAgICAgICAgICAgICBfLm9mZiAkKGVsKSBpZiBfaWQgaXMgJChlbCkuZGF0YSgnX2lkJykgYW5kIHZhbHVlIGlzIGZhbHNlXG5cbiAgICAgICAgICBpZiB2YWx1ZVxuICAgICAgICAgICAgTm90aWNlLmkgXCIje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBFbnRyaWVzIHB1Ymxpc2hlZFwiLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBOb3RpY2UuaSBcIiN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IEVudHJpZXMgaGlkZGVuXCIsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICAgIFNwaW5uZXIuZCgpXG5cblxuICAgICAgZWxzZVxuICAgICAgICBMaXN0aW5nLm90aGVyQWN0aW9ucyh0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gIGRlbGV0ZTogKGlkLHR5cGU9J2RlbGV0ZScsY2FsbGJhY2spIC0+XG5cbiAgICBTcGlubmVyLmkoJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fVwiKSlcbiAgICBfLmdldCBcIi9hcGkvI3tMaXN0aW5nLmNvbnRlbnR9LyN7dHlwZX0vI3tpZH1cIlxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgY2FsbGJhY2sgdHJ1ZVxuICAgIC5mYWlsIC0+XG4gICAgICBjYWxsYmFjayBmYWxzZVxuXG4gIGRlbGV0ZVNlbGVjdGVkOiAoY3Vyc29yPTAsdHlwZT0nZGVsZXRlJykgLT5cblxuICAgIGlmIExpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RoIGlzIGN1cnNvclxuICAgICAgaWYgdHlwZSBpcyAnZGVsZXRlJ1xuICAgICAgICBOb3RpY2UuaSAnRGVsZXRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgIGlmIHR5cGUgaXMgJ3Jlc3RvcmUnXG4gICAgICAgIE5vdGljZS5pICdSZXN0b3JlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgIGlmIHR5cGUgaXMgJ2ZvcmNlJ1xuICAgICAgICBOb3RpY2UuaSAnUGVybWFuZW50bHkgZGVsZXRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgIExpc3RpbmcudW5zZWxlY3RBbGwoKVxuICAgICAgQGxvYWQoKVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgTGlzdGluZy5kZWxldGUgTGlzdGluZy5zZWxlY3RlZFtjdXJzb3JdLHR5cGUsIChyZXN1bHQpIC0+XG4gICAgICBMaXN0aW5nLmRlbGV0ZVNlbGVjdGVkKCsrY3Vyc29yLCB0eXBlKSBpZiByZXN1bHQgaXMgdHJ1ZVxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fVwiKSlcblxuICAgIG9wdGlvbnMgPSB2aWV3OiB0cnVlXG5cbiAgICBvcHRpb25zLmRlbGV0ZWQgPSB0cnVlIGlmIExpc3RpbmcuZGVsZXRlZCBpcyB0cnVlXG5cbiAgICBmb3IgZmlsdGVyIGluIEBmaWx0ZXJzXG4gICAgICBpZiBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIG9wdGlvbnNbZmlsdGVyICsgJy5uYW1lJ10gPSBRdWVyeS5wYXJhbSBmaWx0ZXJcbiAgICBpZiBRdWVyeS5wYXJhbSgncGFnZScpIGlzbnQgdW5kZWZpbmVkXG4gICAgICBvcHRpb25zLnBhZ2UgPSBRdWVyeS5wYXJhbSAncGFnZSdcbiAgICBpZiBRdWVyeS5wYXJhbSgnc2VhcmNoJykgaXNudCB1bmRlZmluZWRcbiAgICAgIG9wdGlvbnMuc2VhcmNoID0gUXVlcnkucGFyYW0gJ3NlYXJjaCdcblxuICAgIF8uZ2V0IFwiL2FwaS8je0Bjb250ZW50fVwiLCBvcHRpb25zXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgVGltZS5pKClcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAkKCcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cyA+IC5jb3B5ID4gLnZhbHVlJykudGV4dCByZXNwb25zZS5wYWdpbmF0ZS50b3RhbFxuICAgICAgJChcIi4je0Bjb250ZW50fSA+IC5jb250ZW50ID4gLmxpc3RpbmcgPiAuaW5uZXJcIikuaHRtbCByZXNwb25zZS52aWV3XG4gICAgICBMaXN0aW5nLnBhZ2VMaW5rcygpXG5cblxuIiwiIiwiTWUgPVxuXG4gIGxvZ291dDogKGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgJy9hcGkvYXV0aC9sb2dvdXQnXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIGNvbXBsZXRlKClcblxuICBvYXV0aDogKHR5cGUsIHBhcmFtcz17fSwgY29tcGxldGUpIC0+XG5cbiAgICBfLmdldCBcIi9hcGkvYXV0aC8je3R5cGV9XCIsIHBhcmFtc1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZShyZXNwb25zZS5kYXRhLnVyaSlcblxuICBhdXRoZWQ6IChyZXN1bHQpIC0+XG4gICAgXy5nZXQgJy9hcGkvYXV0aCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgcmVzdWx0IHJlc3BvbnNlLmRhdGEudXNlclxuXG4gIGdldDpcbiAgICBjbGllbnRJZDogLT5cbiAgICAgIHJldHVybiBVc2VyLmNsaWVudC5pZFxuIiwiTm90Zm91bmQgPVxuICBpOiAtPlxuICAgICQoJyNsaW5lZXJyb3InKS5ub3ZhY2FuY3lcbiAgICAgICdyZWJsaW5rUHJvYmFiaWxpdHknOiAwLjFcbiAgICAgICdibGlua01pbic6IDAuMlxuICAgICAgJ2JsaW5rTWF4JzogMC42XG4gICAgICAnbG9vcE1pbic6IDhcbiAgICAgICdsb29wTWF4JzogMTBcbiAgICAgICdjb2xvcic6ICcjZmZmZmZmJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4ICNmZmZmZmYnLCAnMCAwIDMwcHggIzAwODAwMCcsICcwIDAgNnB4ICMwMDAwZmYnXVxuXG4gICAgJCgnI2xpbmVjb2RlJykubm92YWNhbmN5XG4gICAgICAnYmxpbmsnOiAxXG4gICAgICAnb2ZmJzogMVxuICAgICAgJ2NvbG9yJzogJ1JlZCdcbiAgICAgICdnbG93JzogWycwIDAgODBweCBSZWQnLCAnMCAwIDMwcHggRmlyZUJyaWNrJywgJzAgMCA2cHggRGFya1JlZCddXG4iLCJOb3RpY2UgPVxuXG4gIHR5cGVzOiBbJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZyddXG5cbiAgZWw6IGZhbHNlXG5cbiAgb246IGZhbHNlXG4gIHByb2dyZXNzOiBmYWxzZVxuICB0aW1lb3V0OiBmYWxzZVxuICBjbG9zZTogdHJ1ZVxuXG4gIGRlZmF1bHQ6XG4gICAgdHlwZTogJ2luZm8nXG4gICAgcHJvZ3Jlc3M6IGZhbHNlXG4gICAgdGltZW91dDogNTAwMFxuXG4gIGk6IChjb3B5LG9wdGlvbnM9e30pIC0+XG5cbiAgICBAb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ge30sIEBkZWZhdWx0XG5cbiAgICBmb3Iga2V5LCBwYXJhbSBvZiBvcHRpb25zXG4gICAgICBAb3B0aW9uc1trZXldID0gcGFyYW1cblxuICAgIEBlbCA9ICQoJy5ub3RpY2UnKSBpZiBAZWwgaXMgZmFsc2VcblxuICAgIGZvciBkdHlwZSBpbiBAdHlwZXNcbiAgICAgIEBlbC5yZW1vdmVDbGFzcyBkdHlwZVxuICAgIEBlbC5hZGRDbGFzcyBAb3B0aW9ucy50eXBlXG4gICAgQGVsLmZpbmQoJy5jb3B5ID4gLm1lc3NhZ2UnKS5odG1sIGNvcHlcblxuICAgIGlmIEBvcHRpb25zLnByb2dyZXNzIGlzbnQgZmFsc2VcbiAgICAgIGlmIEBwcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgICBfLm9uIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgICAgQHByb2dyZXNzID0gdHJ1ZVxuICAgICAgaWYgQGNsb3NlIGlzIHRydWVcbiAgICAgICAgXy5vZmYgQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICAgIEBjbG9zZSA9IGZhbHNlXG4gICAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG4gICAgICAgICwgMTAwXG4gICAgICBlbHNlXG4gICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZSBhbmQgQHByb2dyZXNzIGlzIHRydWVcbiAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCAnMCUnKVxuICAgICAgXy5vZmYgQGVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgICAgQHByb2dyZXNzID0gZmFsc2VcbiAgICAgIF8ub24gQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICBAY2xvc2UgPSB0cnVlXG5cbiAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgIF8ub24gQGVsXG4gICAgICBAaGFuZGxlcnMub24oKVxuICAgICAgQG9uID0gdHJ1ZVxuXG4gICAgaWYgQG9wdGlvbnMudGltZW91dCBpc250IGZhbHNlIGFuZCBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgQHRpbWVvdXQgPSBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEBkKClcbiAgICAgICwgQG9wdGlvbnMudGltZW91dFxuXG4gIGhhbmRsZXJzOlxuICAgIG9uOiAtPlxuICAgICAgJCgnLm5vdGljZScpLm9uICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuICAgIG9mZjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC5jbG9zZSA+IC5pbm5lcicsIE5vdGljZS5kXG5cbiAgZDogLT5cbiAgICBjbGVhclRpbWVvdXQgTm90aWNlLnRpbWVvdXQgaWYgTm90aWNlLnRpbWVvdXQgaXNudCBmYWxzZVxuICAgIE5vdGljZS50aW1lb3V0ID0gZmFsc2VcbiAgICBOb3RpY2UuaGFuZGxlcnMub2ZmKClcbiAgICBfLm9uIE5vdGljZS5lbC5maW5kKCcuY2xvc2UnKVxuICAgIE5vdGljZS5jbG9zZSA9IHRydWVcbiAgICBfLm9mZiBOb3RpY2UuZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgTm90aWNlLnByb2dyZXNzID0gZmFsc2VcbiAgICBfLm9mZiBOb3RpY2UuZWwsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC4yXG4gICAgTm90aWNlLm9uID0gZmFsc2VcbiIsIlByb21wdCA9XG4gIGVsOiB7fVxuICBvcHRpb25zOiB7fVxuICBjYWxsYmFjazogZmFsc2VcbiAgcGFyYW1zOiB7fVxuXG4gIGk6ICh0aXRsZSwgY29weSwgb3B0aW9ucz1bJ09LJ10sIHBhcmFtcywgY2FsbGJhY2spIC0+XG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBmYWxzZVxuICAgIFByb21wdC5wYXJhbXMgPSBmYWxzZVxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ2Z1bmN0aW9uJ1xuICAgIFByb21wdC5jYWxsYmFjayA9IGNhbGxiYWNrIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG5cbiAgICBQcm9tcHQucGFyYW1zID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCdcblxuICAgIFByb21wdC5lbCA9ICQgJy5wcm9tcHQnXG5cbiAgICBQcm9tcHQuZWwuZmluZCAnLnRpdGxlJ1xuICAgICAgLmh0bWwgdGl0bGVcbiAgICAgIC5hdHRyICd0aXRsZScsIHRpdGxlXG4gICAgUHJvbXB0LmVsLmZpbmQgJy5jb3B5J1xuICAgICAgLmh0bWwgY29weVxuXG4gICAgaWYgdHlwZW9mIHBhcmFtcyBpcyAnb2JqZWN0JyBhbmQgJ3RleHRhcmVhJyBvZiBwYXJhbXMgYW5kIHBhcmFtcy50ZXh0YXJlYSBpcyB0cnVlXG4gICAgICBfLm9uIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgICBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhID4gdGV4dGFyZWEnXG4gICAgICAgIC52YWwgcGFyYW1zLnZhbHVlXG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAnY2xpcGJvYXJkJyBvZiBwYXJhbXMgYW5kIHBhcmFtcy5jbGlwYm9hcmQgaXMgdHJ1ZVxuICAgICAgaW5wdXQgPSBQcm9tcHQuZWwuZmluZCAnLmlucHV0J1xuICAgICAgXy5vbiBpbnB1dFxuICAgICAgaW5wdXQuZmluZCgnaW5wdXQnKS52YWwgcGFyYW1zLnZhbHVlXG5cblxuICAgIFByb21wdC5vcHRpb25zID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb25zID4gLm9wdGlvbidcbiAgICBfLm9mZiBQcm9tcHQub3B0aW9uc1xuICAgIFByb21wdC5vcHRpb25zLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gICAgZm9yIG8saSBpbiBvcHRpb25zXG4gICAgICBvcHRpb24gPSBQcm9tcHQuZWwuZmluZCBcIi5vcHRpb25zICA+IC5vcHRpb25fI3tpKzF9XCJcbiAgICAgIF8ub24gb3B0aW9uXG4gICAgICBvcHRpb24uaHRtbCBvXG4gICAgICAgIC5kYXRhICd2YWx1ZScsIG9cblxuICAgIF8ub24gUHJvbXB0LmVsLFxuICAgIF8ub24gJy5iZmFkZSdcblxuICAgIFByb21wdC5oYW5kbGVycygpXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5mb2N1cygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChkb2N1bWVudCkua2V5ZG93biBQcm9tcHQua2V5ZG93blxuICAgIFByb21wdC5vcHRpb25zLm9uICdjbGljaycsIFByb21wdC5jbGlja1xuICAgIFByb21wdC5lbC5maW5kKCcuaW5uZXIgPiAuY2FuY2VsJykub24gJ2NsaWNrJywgUHJvbXB0LmNhbmNlbFxuICAgIFByb21wdC5lbC5maW5kKCcuY2xpcGJvYXJkJykub24gJ2NsaWNrJywgUHJvbXB0LmNsaXBib2FyZFxuXG5cbiAgY2xpcGJvYXJkOiAtPlxuICAgIFByb21wdC5lbC5maW5kKCcuaW5wdXQgPiBpbnB1dCcpLnNlbGVjdCgpXG4gICAgaWYgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuICAgICAgTm90aWNlLmkgJ0NvcGllZCB0byBjbGlwYm9hcmQnLCB0eXBlOiAnc3VjY2VzcydcbiAgICBlbHNlXG4gICAgICBOb3RpY2UuaSAnVW5hYmxlIHRvIGNsaXBib2FyZCcsIHR5cGU6ICd3YXJuaW5nJ1xuXG4gIGtleWRvd246IC0+XG4gICAgayA9IGV2ZW50LndoaWNoXG4gICAga2V5cyA9IFszOSwgOSwgMzcsIDEzLCAyN11cbiAgICByZXR1cm4gdHJ1ZSBpZiBrIG5vdCBpbiBrZXlzXG5cbiAgICBjdXJyZW50ID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb24ub24uYWN0aXZlJ1xuICAgIHNoaWZ0ID0gd2luZG93LmV2ZW50LnNoaWZ0S2V5XG5cbiAgICBpZiBrIGlzIDM5IG9yIChrIGlzIDkgYW5kICFzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQubmV4dCgpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5uZXh0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb25fMScpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMzcgb3IgKGsgaXMgOSBhbmQgc2hpZnQpXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBpZiBjdXJyZW50LnByZXYoKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIGN1cnJlbnQucHJldigpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBlbHNlXG4gICAgICAgIFByb21wdC5lbC5maW5kKCcub3B0aW9uLm9uJykubGFzdCgpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMTNcbiAgICAgIFByb21wdC50cmlnZ2VyIFByb21wdC5lbC5maW5kKCcub3B0aW9uLmFjdGl2ZScpLmRhdGEgJ3ZhbHVlJ1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgaWYgayBpcyAyN1xuICAgICAgUHJvbXB0LnRyaWdnZXIoZmFsc2UpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICBjYW5jZWw6IC0+XG4gICAgUHJvbXB0LnRyaWdnZXIgZmFsc2VcblxuICBjbGljazogLT5cbiAgICBQcm9tcHQudHJpZ2dlciAkKHRoaXMpLmRhdGEgJ3ZhbHVlJ1xuXG4gIHRyaWdnZXI6ICh2YWx1ZSkgLT5cbiAgICBfLm9mZiBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhJ1xuICAgIF8ub2ZmIFByb21wdC5lbCwgb2ZmaW5nOiBmYWxzZSwgb2ZmdGltZTogMC4yXG4gICAgI18ub2ZmICcuYmZhZGUnLCBvZmZpbmc6IGZhbHNlLCBvZmZpdG1lOiAwLjJcbiAgICBfLm9mZiAnLmJmYWRlJ1xuICAgIFByb21wdC5vcHRpb25zLnVuYmluZCAnY2xpY2snLCBQcm9tcHQuY2xpY2tcbiAgICAkKGRvY3VtZW50KS51bmJpbmQgJ2tleWRvd24nLCBQcm9tcHQua2V5ZG93blxuICAgIGlmIFByb21wdC5wYXJhbXMudGV4dGFyZWFcbiAgICAgIHZhbCA9IFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCgpXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHJlc3BvbnNlOiB2YWx1ZSwgdmFsOiB2YWxcbiAgICBlbHNlXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHZhbHVlXG4iLCJRdWVyeSA9XG5cbiAgZ2V0UXVlcnk6IC0+XG4gICAgcmV0dXJuIGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKVxuXG4gIHNldFF1ZXJ5OiAocGFyYW1zKSAtPlxuICAgIHF1ZXJ5ID0gcXMuc3RyaW5naWZ5IHBhcmFtc1xuICAgIGlmIHF1ZXJ5IGlzIHVuZGVmaW5lZCBvciBxdWVyeSBpcyAnJ1xuICAgICAgaGlzdG9yeS5wdXNoU3RhdGUgbnVsbCwgbnVsbCwgbG9jYXRpb24ucGF0aG5hbWVcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSBudWxsLCBudWxsLCBsb2NhdGlvbi5wYXRobmFtZSArICc/JyArIHF1ZXJ5XG4gICAgXG4gIHBhcmFtOiAoa2V5LCB2YWx1ZSkgLT5cblxuICAgIHF1ZXJ5ID0gQGdldFF1ZXJ5KClcblxuICAgIHBhcmFtcyA9IHFzLnBhcnNlIHF1ZXJ5XG5cbiAgICByZXR1cm4gcGFyYW1zW2tleV0gaWYgdmFsdWUgaXMgdW5kZWZpbmVkXG5cbiAgICBpZiB2YWx1ZSBpcyBmYWxzZVxuICAgICAgZGVsZXRlIHBhcmFtc1trZXldXG4gICAgZWxzZVxuICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZVxuICAgIEBzZXRRdWVyeSBwYXJhbXNcblxuICBwYXJhbXM6IC0+XG4gICAgcmV0dXJuIHFzLnBhcnNlIEBnZXRRdWVyeSgpXG5cbiAgc3RyaW5naWZ5OiAocGFyYW1zKSAtPlxuICAgIHJldHVybiBxcy5zdHJpbmdpZnkgcGFyYW1zXG5cbiIsIlNlYXJjaCA9XG5cbiAgaTogLT5cblxuICAgIGlmIFF1ZXJ5LnBhcmFtKCdzZWFyY2gnKSBpc250IHVuZGVmaW5lZFxuICAgICAgJCgnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IGlucHV0JykudmFsIFF1ZXJ5LnBhcmFtICdzZWFyY2gnXG4gICAgICAkKCcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gaW5wdXQnKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgXy5vbiAnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IC5jYW5jZWwnXG5cbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5saXN0aW5nJykub24gJ2NsaWNrJywgJy5jYW5jZWwnLCBAY2FuY2VsSGFuZGxlclxuICAgICQoJy5saXN0aW5nJykub24gJ2tleXVwJywgJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiBpbnB1dCcsIEBzZWFyY2hIYW5kbGVyXG5cbiAgY2FuY2VsSGFuZGxlcjogLT5cbiAgICAkKCcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gaW5wdXQnKS52YWwgJydcbiAgICBfLm9mZiAnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IC5jYW5jZWwnXG4gICAgJCgnLmxpc3QtaGVhZGVyID4gLnNlYXJjaCA+IGlucHV0JykucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBpZiBRdWVyeS5wYXJhbSgnc2VhcmNoJykgaXNudCB1bmRlZmluZWRcbiAgICAgIFF1ZXJ5LnBhcmFtICdzZWFyY2gnLCBmYWxzZVxuICAgICAgTGlzdGluZy5sb2FkKClcblxuICBzZWFyY2hIYW5kbGVyOiAtPlxuXG4gICAga2V5ID0gZXZlbnQua2V5Q29kZVxuXG4gICAgdmFsID0gJCh0aGlzKS52YWwoKVxuXG4gICAgaWYgdmFsIGlzbnQgJydcbiAgICAgICQoJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiBpbnB1dCcpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBfLm9uICcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gLmNhbmNlbCdcbiAgICBlbHNlXG4gICAgICAkKCcubGlzdC1oZWFkZXIgPiAuc2VhcmNoID4gaW5wdXQnKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgXy5vZmYgJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiAuY2FuY2VsJ1xuXG4gICAgaWYga2V5IGlzIDEzXG4gICAgICBRdWVyeS5wYXJhbSgnc2VhcmNoJywgdmFsKVxuICAgICAgTGlzdGluZy5sb2FkKClcblxuXG4iLCJTZWxlY3RpemUgPVxuXG4gIGNsaWVudHM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuICAgIHNlbGVjdENsaWVudCA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgYSBDbGllbnQgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgcmVuZGVyOlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj4je2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvY2xpZW50cycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0Q2xpZW50LmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdENsaWVudFxuXG4gIHN0cnVjdHVyZXM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuXG4gICAgc2VsZWN0U3RydWN0dXJlID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIFN0cnVjdHVyZSAgIFwiXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIG9wZW5PbkZvY3VzOiB0cnVlXG4gICAgICBvbkxvYWQ6IEVudHJ5LnN0cnVjdHVyZVNwZWNpZmllZFxuICAgICAgcmVuZGVyOlxuICAgICAgICBpdGVtOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXY+PGltZyBjbGFzcz1cXFwicHJvZmlsZVxcXCIgc3JjPVxcXCIje2l0ZW0uY2xpZW50UHJvZmlsZX1cXFwiLz4gI3tpdGVtLm5hbWV9PC9kaXY+XCJcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXY+PGltZyBjbGFzcz1cXFwicHJvZmlsZVxcXCIgc3JjPVxcXCIje2l0ZW0uY2xpZW50UHJvZmlsZX1cXFwiLz4gI3tpdGVtLm5hbWV9PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZSwgY2xpZW50TmFtZTogaXRlbS5jbGllbnQubmFtZSwgY2xpZW50UHJvZmlsZTogaXRlbS5jbGllbnQucHJvZmlsZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdFN0cnVjdHVyZS5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RTdHJ1Y3R1cmVcblxuICB1c2VyczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0VXNlciA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3JlbW92ZV9idXR0b24nXVxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2IHN0eWxlPSdsaW5lLWhlaWdodDogMzBweDsnPiN7aXRlbS5uYW1lfSAoI3tpdGVtLmVtYWlsfSkgPGltZyBzcmM9JyN7aXRlbS5waWN0dXJlfScgc3R5bGU9J2Zsb2F0OiBsZWZ0OyB3aWR0aDogMzBweDsgaGVpZ2h0OiAzMHB4OyBtYXJnaW4tcmlnaHQ6IDEwcHg7JyAvPjwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS91c2VycycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lLCBlbWFpbDogaXRlbS5lbWFpbCwgcGljdHVyZTogaXRlbS5waWN0dXJlXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0VXNlci5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RVc2VyXG5cblxuIiwiXG5TcGlubmVyID1cblxuICBzdGF0ZTogZmFsc2VcblxuICBlbDoge31cblxuICBpOiAoZWwsIG92ZXJyaWRlKSAtPlxuXG4gICAgQGVsID0gJCgnLnNwaW5uZXInKVxuXG4gICAgcmVjdCA9IGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBjb29yZHMgPVxuICAgICAgdG9wOiBcIiN7cmVjdC50b3AgKyAkKHdpbmRvdykuc2Nyb2xsVG9wKCl9cHhcIlxuICAgICAgbGVmdDogXCIje3JlY3QubGVmdH1weFwiXG4gICAgICB3aWR0aDogXCIje3JlY3Qud2lkdGh9cHhcIlxuICAgICAgaGVpZ2h0OiBcIiN7cmVjdC5oZWlnaHR9cHhcIlxuXG4gICAgaWYgb3ZlcnJpZGUgaXNudCB1bmRlZmluZWRcbiAgICAgIGZvciBrZXksIGNvb3JkIG9mIG92ZXJyaWRlXG4gICAgICAgIGNvb3Jkc1trZXldID0gY29vcmRcblxuICAgIEBlbC5jc3MgY29vcmRzXG5cbiAgICBfLm9uIEBlbFxuICAgIEBzdGF0ZSA9IHRydWVcblxuICBkOiAtPlxuICAgIF8ub2ZmIEBlbFxuICAgIEBzdGF0ZSA9IGZhbHNlXG4iLCJTdHJ1Y3R1cmUgPVxuXG4gIHRlbXBsYXRlOiBmYWxzZVxuICBfaWQ6IGZhbHNlXG5cbiAgY2xpZW50U2VsZWN0OiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBAdGVtcGxhdGUgPSAkKCcubW9kaWZ5ID4gI3RlbXBsYXRlJykuaHRtbCgpXG4gICAgQGhhbmRsZXJzKClcblxuICAgIEBjbGllbnRTZWxlY3QgPSBTZWxlY3RpemUuY2xpZW50cyAkKCcucGFnZS5zdHJ1Y3R1cmUgPiAubW9kaWZ5ID4gLmRldGFpbC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKSxcbiAgICAgIEBjbGllbnRTZWxlY3RoYW5kbGVyXG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9zdHJ1Y3R1cmVzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcbiAgICAgIF8ub24gJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YSdcbiAgICBlbHNlXG4gICAgICBAZW50aXR5QWRkKClcbiAgICAgIF8ub2ZmICcubW9kaWZ5ID4gLmNsaWVudEFjY2VzcyA+IC5zd2l0Y2gnXG5cbiAgICBAY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5mb2N1cygpIGlmIEBfaWQgaXMgZmFsc2VcblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAubW9yZScpLmNsaWNrIEBlbnRpdHlBZGRIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcycpLm9uICdjbGljaycsJy5lbnRpdHkgPiAucmVtb3ZlJywgQGVudGl0eVJlbW92ZUhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGFwJykuY2xpY2sgQHN1Ym1pdEhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnKS5jbGljayBAbmV3RW50cnlIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuc3dpdGNoJykub24gJ2NsaWNrJywgQGNoZWNrYm94SGFuZGxlclxuXG4gIGNoZWNrYm94SGFuZGxlcjogLT5cbiAgICBfLnN3YXAgdGhpc1xuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2Uuc3RydWN0dXJlJykpXG5cbiAgICBfLmdldCAnL2FwaS9zdHJ1Y3R1cmVzLycsXG4gICAgICBfaWQ6IEBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL3N0cnVjdHVyZXMvbmV3JyBpZiByZXNwb25zZS5kYXRhLmxlbmd0aCA8IDFcbiAgICAgIHN0cnVjdHVyZSA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgICQoJy5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsIHN0cnVjdHVyZS5uYW1lXG5cbiAgICAgIGlmIHN0cnVjdHVyZS5jbGllbnRBY2Nlc3MgaXMgdHJ1ZVxuICAgICAgICBfLm9uICcubW9kaWZ5ID4gLmNsaWVudEFjY2VzcyA+IC5zd2l0Y2gnXG4gICAgICBlbHNlXG4gICAgICAgIF8ub2ZmICcubW9kaWZ5ID4gLmNsaWVudEFjY2VzcyA+IC5zd2l0Y2gnXG5cbiAgICAgIGZvciBpLCBlbnRpdHkgb2Ygc3RydWN0dXJlLmVudGl0aWVzXG4gICAgICAgIFN0cnVjdHVyZS5lbnRpdHlBZGQgZmFsc2UsIGVudGl0eVxuXG4gICAgICBTdHJ1Y3R1cmUuY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5hZGRPcHRpb25cbiAgICAgICAgaWQ6IHN0cnVjdHVyZS5jbGllbnQuaWQsIG5hbWU6IHN0cnVjdHVyZS5jbGllbnQubmFtZVxuICAgICAgU3RydWN0dXJlLmNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuc2V0VmFsdWUgc3RydWN0dXJlLmNsaWVudC5pZFxuXG5cblxuICBlbnRpdHlBZGRIYW5kbGVyOiAtPlxuICAgIFN0cnVjdHVyZS5lbnRpdHlBZGQodHJ1ZSlcblxuICBlbnRpdHlSZW1vdmVIYW5kbGVyOiAtPlxuICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlKClcblxuICBlbnRpdHlBZGQ6IChmb2N1cz1mYWxzZSwgZW50aXR5PWZhbHNlKSAtPlxuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5JykuYXBwZW5kIEB0ZW1wbGF0ZVxuXG4gICAgaWYgZW50aXR5IGlzbnQgZmFsc2VcbiAgICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IGlucHV0JykudmFsKGVudGl0eS5uYW1lKVxuICAgICAgQHNlbGVjdGl6ZSAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5Omxhc3QtY2hpbGQnKS5maW5kKCcuaW5wdXQgPiBzZWxlY3QnKSwgZW50aXR5LnR5cGVcbiAgICBlbHNlXG4gICAgICBAc2VsZWN0aXplICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpXG5cbiAgICBpZiAgZm9jdXNcbiAgICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHkgPiAuaW5wdXQuc2VsZWN0aXplLWlucHV0IGlucHV0JykubGFzdCgpLmZvY3VzKClcblxuICBzZWxlY3RpemU6IChlbCwgdmFsdWU9ZmFsc2UpIC0+XG4gICAgaXplZCA9IGVsLnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiVHlwZVwiXG5cbiAgICBpemVkWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSB2YWx1ZVxuXG4gIHN1Ym1pdEhhbmRsZXI6IC0+XG5cbiAgICBzdHJ1Y3R1cmUgPSB7fVxuICAgIHN0cnVjdHVyZS5lbnRpdGllcyA9IHt9XG4gICAgc3RydWN0dXJlLmNsaWVudCA9ICQoJy5tb2RpZnkgPiAuY2xpZW50ID4gLmlucHV0ID4gc2VsZWN0JykudmFsKClcbiAgICBzdHJ1Y3R1cmUubmFtZSA9ICQoJy5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICBzdHJ1Y3R1cmUuY2xpZW50QWNjZXNzID0gJCgnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuc3dpdGNoJykuaGFzQ2xhc3MgJ29uJ1xuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eScpLmVhY2ggKGksIGVsKSAtPlxuXG4gICAgICBuYW1lID0gJChlbCkuZmluZCgnLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgICAgdHlwZSA9ICQoZWwpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpLnZhbCgpXG5cbiAgICAgIHN0cnVjdHVyZS5lbnRpdGllc1tuYW1lXSA9XG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgdHlwZTogdHlwZVxuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG5cbiAgICAgIGNvbnNvbGUubG9nIHN0cnVjdHVyZS5lbnRpdGllc1xuICAgICAgU3RydWN0dXJlLm1vZGlmeSBzdHJ1Y3R1cmVcblxuICBuZXdFbnRyeUhhbmRsZXI6IC0+XG4gICAgbG9jYXRpb24uaHJlZiA9IFwiL2VudHJpZXMvbmV3I3N0cnVjdHVyZT0je1N0cnVjdHVyZS5faWR9XCJcblxuICBtb2RpZnk6IChzdHJ1Y3R1cmUpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2Uuc3RydWN0dXJlJykpXG5cbiAgICBjYWxsID0gJy9hcGkvc3RydWN0dXJlcy9hZGQnXG4gICAgaWYgU3RydWN0dXJlLl9pZCBpc250IGZhbHNlXG4gICAgICBjYWxsID0gXCIvYXBpL3N0cnVjdHVyZXMvdXBkYXRlLyN7U3RydWN0dXJlLl9pZH1cIlxuXG4gICAgXy5nZXQgY2FsbCwgc3RydWN0dXJlXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pIHJlc3BvbnNlLmRhdGEuc3RhdHVzLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgXy5vbiAnLm1vZGlmeSA+IC5zdWJtaXQgPiAuY3RhJ1xuICAgICAgICBpZiBTdHJ1Y3R1cmUuX2lkIGlzIGZhbHNlXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIHt9LCAnJywgXCIvc3RydWN0dXJlcy8je3Jlc3BvbnNlLmRhdGEuX2lkfVwiXG4gICAgICAgIFN0cnVjdHVyZS5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuIiwiU3RydWN0dXJlcyA9XG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICdzdHJ1Y3R1cmVzJywgZmFsc2UsIFsnY2xpZW50J11cblxuIiwiVXNlcnMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAndXNlcnMnXG4iLCJcbiJdfQ==
