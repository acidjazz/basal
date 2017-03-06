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
    "key": "base64:fg0PjFLZ+L/X4qvR8ZxFXQLIaAF+m9TO+lWlgGuY7aw=",
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
    this.load();
    this.handlers();
    if (this.filters.length > 0) {
      Filter.i(this.filters);
    }
    return Search.i();
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
    return this.handlers();
  },
  handlers: function() {
    console.log('handlers fired');
    return $('.listing').on('click', '.list-header', Search.cancelHandler);
  },
  cancelHander: function() {
    console.log('cancelHeader handler');
    return $('.list-header > .search > input').val('');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJmaWx0ZXIuY29mZmVlIiwiZ2xvYmFsLmNvZmZlZSIsImluZGV4LmNvZmZlZSIsImludml0ZS5jb2ZmZWUiLCJsaXN0aW5nLmNvZmZlZSIsIm1haW4uY29mZmVlIiwibWUuY29mZmVlIiwibm90Zm91bmQuY29mZmVlIiwibm90aWNlLmNvZmZlZSIsInByb21wdC5jb2ZmZWUiLCJxdWVyeS5jb2ZmZWUiLCJzZWFyY2guY29mZmVlIiwic2VsZWN0aXplLmNvZmZlZSIsInNwaW5uZXIuY29mZmVlIiwic3RydWN0dXJlLmNvZmZlZSIsInN0cnVjdHVyZXMuY29mZmVlIiwidXNlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOztBQUFBLENBQUEsR0FFRTtFQUFBLENBQUEsRUFBRyxTQUFBO1dBQ0QsSUFBQyxDQUFBLE9BQUQsR0FBVyxXQUFBLENBQVksSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUFaLEVBQTZCLEdBQTdCO0VBRFYsQ0FBSDtFQUdBLENBQUEsRUFDRTtJQUFBLE1BQUEsRUFBUSxLQUFSO0lBQ0EsT0FBQSxFQUFTLENBRFQ7R0FKRjtFQU9BLElBQUEsRUFBTSxTQUFDLEVBQUQsRUFBSyxNQUFMLEVBQW1CLEdBQW5COztNQUFLLFNBQU87OztNQUFPLE1BQUk7O0lBRTNCLElBQUcsQ0FBQSxDQUFBLEVBQUEsWUFBa0IsTUFBbEIsQ0FBSDtNQUNFLEVBQUEsR0FBSyxDQUFBLENBQUUsRUFBRixFQURQOztJQUdBLElBQUcsTUFBQSxLQUFZLEtBQWY7TUFDRSxFQUFFLENBQUMsV0FBSCxDQUFlLE1BQWYsRUFERjs7SUFHQSxJ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QUVOLFFBQUE7SUFBQSxPQUFPLENBQUMsQ0FBUixDQUFVLENBQUEsQ0FBRSxpQkFBRixDQUFWO0lBRUEsSUFBQSxHQUFPO0lBQ1AsSUFBRyxTQUFTLENBQUMsR0FBVixLQUFtQixLQUF0QjtNQUNFLElBQUEsR0FBTyx5QkFBQSxHQUEwQixTQUFTLENBQUMsSUFEN0M7O1dBR0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxJQUFOLEVBQVksU0FBWixDQUNFLENBQUMsTUFESCxDQUNVLFNBQUE7YUFDTixPQUFPLENBQUMsQ0FBUixDQUFBO0lBRE0sQ0FEVixDQUdFLENBQUMsSUFISCxDQUdRLFNBQUMsUUFBRDtNQUNKLE1BQU0sQ0FBQyxDQUFQLENBQVMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUF2QixFQUErQixTQUEvQjtNQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssMEJBQUw7TUFDQSxJQUFHLFNBQVMsQ0FBQyxHQUFWLEtBQWlCLEtBQXBCO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFmLENBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLEVBQWlDLGNBQUEsR0FBZSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQTlELEVBREY7O2FBRUEsU0FBUyxDQUFDLEdBQVYsR0FBZ0IsUUFBUSxDQUFDLElBQUksQ0FBQztJQUwxQixDQUhSO0VBUk0sQ0EvR1I7OztBQ0ZGLElBQUE7O0FBQUEsVUFBQSxHQUNFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxPQUFPLENBQUMsQ0FBUixDQUFVLFlBQVYsRUFBd0IsS0FBeEIsRUFBK0IsQ0FBQyxRQUFELENBQS9CO0VBREMsQ0FBSDs7O0FDREYsSUFBQTs7QUFBQSxLQUFBLEdBQ0U7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELE9BQU8sQ0FBQyxDQUFSLENBQVUsT0FBVjtFQURDLENBQUgiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgcmFuZ2U6IChzdGFydCwgZW5kKSAtPlxuICAgIHJlc3VsdCA9IFtdXG4gICAgZm9yIG51bSBpbiBbc3RhcnQuLmVuZF1cbiAgICAgIHJlc3VsdC5wdXNoIG51bVxuICAgIHJlc3VsdFxuXG4gIGZpdDogKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIC0+XG4gICAgcmF0aW8gPSBNYXRoLm1pbihtYXhXaWR0aCAvIHNyY1dpZHRoLCBtYXhIZWlnaHQgLyBzcmNIZWlnaHQpXG4gICAgd2lkdGg6IHNyY1dpZHRoKnJhdGlvLCBoZWlnaHQ6IHNyY0hlaWdodCpyYXRpb1xuXG4gIGppbml0OiAtPlxuICAgICQuYWpheFNldHVwXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCJcblxuICBwYXRjaDogKHVybCwgZGF0YSkgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqcGF0Y2ggPSAkLmFqYXhcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgICB0eXBlOiAnUEFUQ0gnXG5cbiAgICBqcGF0Y2guZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpnZXQgPSAkLmdldCBhcmdzLi4uXG5cbiAgICBqZ2V0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqZ2V0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4gamdldFxuXG4gIHBvc3Q6IChhcmdzLi4uKSAtPlxuXG4gICAganBvc3QgPSAkLnBvc3QgYXJncy4uLlxuXG4gICAganBvc3QuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpwb3N0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBvc3RcblxuICBmYWlsOiAocmVzcG9uc2UpIC0+XG5cbiAgICBlcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTj8uZXJyb3JzP1swXVxuICAgIGlmIGVycm9yIGlzIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIFByb21wdC5pIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dFxuXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwczovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuICBtZXRob2RzOiAob2JqKSAtPlxuICAgIHJlcyA9IFtdXG4gICAgZm9yIGksbSBvZiBvYmpcbiAgICAgIGlmIHR5cGVvZiBtIGlzICdmdW5jdGlvbidcbiAgICAgICAgcmVzLnB1c2ggbVxuICAgIHJldHVybiByZXNcblxuXy5pKClcbiIsIlRpbWUgPVxuICBpbnRlcnZhbDogZmFsc2VcbiAgZ2FwOiAxMDAwXG5cbiAgaTogLT5cbiAgICBAaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChAc2NyYXBlLCBAZ2FhKSBpZiBAaW50ZXJ2YWwgaXMgZmFsc2VcbiAgICBAc2NyYXBlKClcblxuICBzY3JhcGU6IC0+XG4gICAgJCgndGltZScpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgamVsID0gJCBlbFxuICAgICAgamVsLmh0bWwgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5mcm9tTm93KClcbiAgICAgIGplbC5hdHRyICdhcmlhLWxhYmVsJywgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5jYWxlbmRhcigpXG4iLCJDbGllbnQgPVxuXG4gIHNlbGVjdFVzZXI6IGZhbHNlXG4gIF9pZDogZmFsc2VcbiAgY3JvcDogZmFsc2VcbiAgcHJvZmlsZTogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQGhhbmRsZXJzKClcbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9jbGllbnRzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcblxuICAgIEBzZWxlY3RVc2VyID0gU2VsZWN0aXplLnVzZXJzICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JyksIEBzZWxlY3RVc2VySGFuZGxlciwgbWU6IGZhbHNlXG5cbiAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQgPiBpbnB1dCcpLmZvY3VzKClcbiBcbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLnN1Ym1pdCcpLmNsaWNrIEBtb2RpZnlIYW5kbGVyXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ292ZXInLCBAZHJhZ292ZXJcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2xlYXZlJywgQGRyYWdsZWF2ZVxuICAgICQoZG9jdW1lbnQpLm9uICdkcmFnZW50ZXIgZHJhZ292ZXInLCBAY2FuY2VsXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJvcCBkcmFnZHJvcCcsIEBkcm9wXG5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhJykub24gJ2NsaWNrJywgQGNob29zZUZpbGVcbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dDpmaWxlJykuY2hhbmdlIEBjaGFuZ2VcblxuICBjYW5jZWw6IC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gIGRyYWdvdmVyOiAtPlxuICAgIF8ub24gJy5pbnB1dC1pbWFnZSdcblxuICBkcmFnbGVhdmU6IC0+XG4gICAgXy5vZmYgJy5pbnB1dC1pbWFnZSdcblxuICBkcm9wOiAoZSkgLT5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBfLm9mZiAnLmlucHV0LWltYWdlJ1xuXG4gICAgaWYgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlciBhbmQgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGhcbiAgICAgIGZpbGVzID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgQ2xpZW50LmNyb3BwaWUgZmlsZXNbMF1cblxuICBjaGFuZ2U6IC0+XG4gICAgaWYgJCh0aGlzKVswXS5maWxlc1xuICAgICAgZmlsZXMgPSAkKHRoaXMpWzBdLmZpbGVzXG4gICAgQ2xpZW50LmNyb3BwaWUgZmlsZXNbMF1cblxuICBjaG9vc2VGaWxlOiAtPlxuICAgICQoJy5pbnB1dC1pbWFnZSA+IGlucHV0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgY3JvcHBpZTogKGZpbGUpIC0+XG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAtPlxuXG4gICAgICBpZiBDbGllbnQuY3JvcCBpc250IGZhbHNlXG4gICAgICAgIENsaWVudC5jcm9wLmNyb3BwaWUgJ2Rlc3Ryb3knXG4gICAgICAgIENsaWVudC5jcm9wID0gZmFsc2VcblxuICAgICAgQ2xpZW50LmNyb3AgPSAkKCcuaW5wdXQtaW1hZ2UgPiAuY3JvcHBpZScpLmNyb3BwaWVcbiAgICAgICAgdXJsOiByZWFkZXIucmVzdWx0XG4gICAgICAgIGVuZm9yY2VCb3VuZGFyeTogZmFsc2VcbiAgICAgICAgdmlld3BvcnQ6XG4gICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgIGhlaWdodDogMjAwXG4gICAgICAgIGJvdW5kYXJ5OlxuICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICBoZWlnaHQ6IDMwMFxuXG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwgZmlsZVxuXG4gIHNlbGVjdFVzZXJIYW5kbGVyOiAtPlxuXG4gIG1vZGlmeUhhbmRsZXI6IC0+XG5cbiAgICBpZiBDbGllbnQuY3JvcCBpc250IGZhbHNlXG4gICAgICBDbGllbnQuY3JvcC5jcm9wcGllICdyZXN1bHQnLFxuICAgICAgICB0eXBlOiAnY2FudmFzJ1xuICAgICAgICBmb3JtYXQ6ICdqcGVnJ1xuICAgICAgLnRoZW4gKHJlc3BvbnNlKSAtPlxuICAgICAgICBDbGllbnQuaW1hZ2VVcGxvYWQgQ2xpZW50LmRhdGFVUkl0b0Jsb2IocmVzcG9uc2UpLCAtPlxuICAgICAgICAgIENsaWVudC5tb2RpZnkoKVxuICAgIGVsc2VcbiAgICAgIENsaWVudC5tb2RpZnkoKVxuXG4gIG1vZGlmeTogLT5cblxuICAgIG5hbWUgPSAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtbmFtZSA+IGlucHV0JykudmFsKClcbiAgICB1c2VycyA9ICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JykudmFsKCkuc3BsaXQgJywnXG5cbiAgICBjYWxsID0gJy9hcGkvY2xpZW50cy9hZGQnXG4gICAgaWYgQ2xpZW50Ll9pZCBpc250IGZhbHNlXG4gICAgICBjYWxsID0gXCIvYXBpL2NsaWVudHMvdXBkYXRlLyN7Q2xpZW50Ll9pZH1cIlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudCcpKVxuXG4gICAgXy5nZXQgY2FsbCwgbmFtZTogbmFtZSwgdXNlcnM6IHVzZXJzLCBwcm9maWxlOiBDbGllbnQucHJvZmlsZVxuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIENsaWVudC5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9jbGllbnRzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgQ2xpZW50Ll9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4gICAgICAgIGlmIENsaWVudC5wcm9maWxlXG4gICAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tDbGllbnQucHJvZmlsZX0nKVwiXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnQnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2NsaWVudHMvJyxcbiAgICAgIF9pZDogQF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvY2xpZW50cy9uZXcnIGlmIHJlc3BvbnNlLmRhdGEubGVuZ3RoIDwgMVxuICAgICAgY2xpZW50ID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LW5hbWUgPiBpbnB1dCcpLnZhbCBjbGllbnQubmFtZVxuICAgICAgaWYgY2xpZW50LnByb2ZpbGVcbiAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tjbGllbnQucHJvZmlsZX0nKVwiXG4gICAgICAgIENsaWVudC5wcm9maWxlID0gY2xpZW50LnByb2ZpbGVcbiAgICAgIGZvciBpbmRleCwgdXNlciBvZiBjbGllbnQudXNlcnNcbiAgICAgICAgaWYgdXNlci5pZCBpc250IFVzZXIuX2lkXG4gICAgICAgICAgQ2xpZW50LnNlbGVjdFVzZXJbMF0uc2VsZWN0aXplLmFkZE9wdGlvbiBpZDogdXNlci5pZCwgbmFtZTogXCIje3VzZXIubmFtZX0gKCN7dXNlci5lbWFpbH0pXCJcbiAgICAgICAgICBDbGllbnQuc2VsZWN0VXNlclswXS5zZWxlY3RpemUuYWRkSXRlbSB1c2VyLmlkXG5cblxuICBkYXRhVVJJdG9CbG9iOiAoZGF0YVVSSSkgLT5cbiAgICBieXRlU3RyaW5nID0gdW5kZWZpbmVkXG4gICAgaWYgZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDBcbiAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSlcbiAgICBlbHNlXG4gICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKVxuICAgICMgc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdXG4gICAgIyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aClcbiAgICBpID0gMFxuICAgIHdoaWxlIGkgPCBieXRlU3RyaW5nLmxlbmd0aFxuICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSlcbiAgICAgIGkrK1xuICAgIG5ldyBCbG9iKFsgaWEgXSwgdHlwZTogbWltZVN0cmluZylcbiAgICAgICAgXG4gIGltYWdlVXBsb2FkOiAoYmxvYiwgY2FsbGJhY2spIC0+XG5cbiAgICBmZCA9IG5ldyBGb3JtRGF0YSgpXG4gICAgZmQuYXBwZW5kICdmaWxlJywgYmxvYlxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgIE5vdGljZS5pICdGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJywgdGltZW91dDogNjAwXG4gICAgICAgIENsaWVudC5wcm9maWxlID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgICBjYWxsYmFjayhyZXN1bHQpXG4gICAgICAgICwgMTIwMFxuXG5cbiIsIkNsaWVudHMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnY2xpZW50cycsIENsaWVudHMuYWN0aW9uXG5cbiAgYWN0aW9uOiAodHlwZSkgLT5cblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdDbGllbnQgSW52aXRlJ1xuICAgICAgICBpZiBMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aCA+IDFcbiAgICAgICAgICBOb3RpY2UuaSAnUGxlYXNlIGNob29zZSBhIHNpbmdsZSBjbGllbnQgZm9yIGFuIGludml0ZSBsaW5rJywgdHlwZTogJ3dhcm5pbmcnXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIENsaWVudHMuZ2V0SW52aXRlKExpc3Rpbmcuc2VsZWN0ZWRbMF0pXG5cbiAgZ2V0SW52aXRlOiAoY2xpZW50KSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudHMnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2ludml0ZS9hZGQnLCBjbGllbnQ6IGNsaWVudFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgY29uc29sZS5sb2cgcmVzcG9uc2VcbiAgICAgIFByb21wdC5pKFxuICAgICAgICAnQ2xpZW50IEludml0ZScsXG4gICAgICAgICdTaGFyZSB0aGlzIFVSTCB3aXRoIHlvdXIgY2xpZW50IHRvIGFsbG93IHRoZW0gdG8gbW9kaWZ5IHRoZWlyIG93biBlbnRyaWVzJyxcbiAgICAgICAgWydPSyddLFxuICAgICAgICAgIGNsaXBib2FyZDogdHJ1ZVxuICAgICAgICAgIHZhbHVlOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9pbnZpdGUvJyArIHJlc3BvbnNlLmRhdGEuaW52aXRlLmhhc2gsXG4gICAgICApXG5cblxuXG4iLCJjb25maWcgPSB7XCJhcHBcIjp7XCJuYW1lXCI6XCJMYXJhdmVsXCIsXCJlbnZcIjpcImxvY2FsXCIsXCJkZWJ1Z1wiOnRydWUsXCJ1cmxcIjpcImh0dHA6Ly9iYXNhbC5kZXY6ODA4MFwiLFwidGltZXpvbmVcIjpcIlVUQ1wiLFwibG9jYWxlXCI6XCJlblwiLFwiZmFsbGJhY2tfbG9jYWxlXCI6XCJlblwiLFwia2V5XCI6XCJiYXNlNjQ6ZmcwUGpGTForTC9YNHF2UjhaeEZYUUxJYUFGK205VE8rbFdsZ0d1WTdhdz1cIixcImNpcGhlclwiOlwiQUVTLTI1Ni1DQkNcIixcImxvZ1wiOlwic2luZ2xlXCIsXCJsb2dfbGV2ZWxcIjpcImRlYnVnXCIsXCJwcm92aWRlcnNcIjpbXCJJbGx1bWluYXRlXFxcXEF1dGhcXFxcQXV0aFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxCcm9hZGNhc3RpbmdcXFxcQnJvYWRjYXN0U2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEJ1c1xcXFxCdXNTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcQ2FjaGVcXFxcQ2FjaGVTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcRm91bmRhdGlvblxcXFxQcm92aWRlcnNcXFxcQ29uc29sZVN1cHBvcnRTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcQ29va2llXFxcXENvb2tpZVNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxEYXRhYmFzZVxcXFxEYXRhYmFzZVNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxFbmNyeXB0aW9uXFxcXEVuY3J5cHRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcRmlsZXN5c3RlbVxcXFxGaWxlc3lzdGVtU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEZvdW5kYXRpb25cXFxcUHJvdmlkZXJzXFxcXEZvdW5kYXRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcSGFzaGluZ1xcXFxIYXNoU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXE1haWxcXFxcTWFpbFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxOb3RpZmljYXRpb25zXFxcXE5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxQYWdpbmF0aW9uXFxcXFBhZ2luYXRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcUGlwZWxpbmVcXFxcUGlwZWxpbmVTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcUXVldWVcXFxcUXVldWVTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcUmVkaXNcXFxcUmVkaXNTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcQXV0aFxcXFxQYXNzd29yZHNcXFxcUGFzc3dvcmRSZXNldFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxTZXNzaW9uXFxcXFNlc3Npb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcVHJhbnNsYXRpb25cXFxcVHJhbnNsYXRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcVmFsaWRhdGlvblxcXFxWYWxpZGF0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFZpZXdcXFxcVmlld1NlcnZpY2VQcm92aWRlclwiLFwiTGFyYXZlbFxcXFxUaW5rZXJcXFxcVGlua2VyU2VydmljZVByb3ZpZGVyXCIsXCJKZW5zc2VnZXJzXFxcXE1vbmdvZGJcXFxcTW9uZ29kYlNlcnZpY2VQcm92aWRlclwiLFwiTGFyamVjdHVzXFxcXFNlcnZpY2VQcm92aWRlclwiLFwiTGFycHVnXFxcXFNlcnZpY2VQcm92aWRlclwiLFwiQmFycnl2ZGhcXFxcRGVidWdiYXJcXFxcU2VydmljZVByb3ZpZGVyXCIsXCJBcHBcXFxcUHJvdmlkZXJzXFxcXEFwcFNlcnZpY2VQcm92aWRlclwiLFwiQXBwXFxcXFByb3ZpZGVyc1xcXFxBdXRoU2VydmljZVByb3ZpZGVyXCIsXCJBcHBcXFxcUHJvdmlkZXJzXFxcXEV2ZW50U2VydmljZVByb3ZpZGVyXCIsXCJBcHBcXFxcUHJvdmlkZXJzXFxcXFJvdXRlU2VydmljZVByb3ZpZGVyXCJdLFwiYWxpYXNlc1wiOntcIkFwcFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQXBwXCIsXCJBcnRpc2FuXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxBcnRpc2FuXCIsXCJBdXRoXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxBdXRoXCIsXCJCbGFkZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQmxhZGVcIixcIkJyb2FkY2FzdFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQnJvYWRjYXN0XCIsXCJCdXNcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEJ1c1wiLFwiQ2FjaGVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXENhY2hlXCIsXCJDb25maWdcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXENvbmZpZ1wiLFwiQ29va2llXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxDb29raWVcIixcIkNyeXB0XCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxDcnlwdFwiLFwiREJcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXERCXCIsXCJEZWJ1Z2JhclwiOlwiQmFycnl2ZGhcXFxcRGVidWdiYXJcXFxcRmFjYWRlXCIsXCJFbG9xdWVudFwiOlwiSWxsdW1pbmF0ZVxcXFxEYXRhYmFzZVxcXFxFbG9xdWVudFxcXFxNb2RlbFwiLFwiTW9sb3F1ZW50XCI6XCJKZW5zc2VnZXJzXFxcXE1vbmdvZGJcXFxcRWxvcXVlbnRcXFxcTW9kZWxcIixcIkV2ZW50XCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxFdmVudFwiLFwiRmlsZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcRmlsZVwiLFwiR2F0ZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcR2F0ZVwiLFwiSGFzaFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcSGFzaFwiLFwiTGFuZ1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcTGFuZ1wiLFwiTG9nXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxMb2dcIixcIk1haWxcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXE1haWxcIixcIk5vdGlmaWNhdGlvblwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcTm90aWZpY2F0aW9uXCIsXCJQYXNzd29yZFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUGFzc3dvcmRcIixcIlF1ZXVlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxRdWV1ZVwiLFwiUmVkaXJlY3RcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFJlZGlyZWN0XCIsXCJSZWRpc1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUmVkaXNcIixcIlJlcXVlc3RcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFJlcXVlc3RcIixcIlJlc3BvbnNlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxSZXNwb25zZVwiLFwiUm91dGVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFJvdXRlXCIsXCJTY2hlbWFcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFNjaGVtYVwiLFwiU2Vzc2lvblwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcU2Vzc2lvblwiLFwiU3RvcmFnZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcU3RvcmFnZVwiLFwiVVJMXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxVUkxcIixcIlZhbGlkYXRvclwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcVmFsaWRhdG9yXCIsXCJWaWV3XCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxWaWV3XCJ9fSxcImNhY2hlXCI6e1wiZGVmYXVsdFwiOlwiYXJyYXlcIixcInN0b3Jlc1wiOntcImFwY1wiOntcImRyaXZlclwiOlwiYXBjXCJ9LFwiYXJyYXlcIjp7XCJkcml2ZXJcIjpcImFycmF5XCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiY2FjaGVcIixcImNvbm5lY3Rpb25cIjpudWxsfSxcImZpbGVcIjp7XCJkcml2ZXJcIjpcImZpbGVcIixcInBhdGhcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL2NhY2hlL2RhdGFcIn0sXCJtZW1jYWNoZWRcIjp7XCJkcml2ZXJcIjpcIm1lbWNhY2hlZFwiLFwicGVyc2lzdGVudF9pZFwiOm51bGwsXCJzYXNsXCI6W251bGwsbnVsbF0sXCJvcHRpb25zXCI6W10sXCJzZXJ2ZXJzXCI6W3tcImhvc3RcIjpcIjEyNy4wLjAuMVwiLFwicG9ydFwiOjExMjExLFwid2VpZ2h0XCI6MTAwfV19LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCJ9fSxcInByZWZpeFwiOlwibGFyYXZlbFwifSxcImRlYnVnYmFyXCI6e1wiZW5hYmxlZFwiOmZhbHNlLFwic3RvcmFnZVwiOntcImVuYWJsZWRcIjp0cnVlLFwiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2RlYnVnYmFyXCIsXCJjb25uZWN0aW9uXCI6bnVsbCxcInByb3ZpZGVyXCI6XCJcIn0sXCJpbmNsdWRlX3ZlbmRvcnNcIjp0cnVlLFwiY2FwdHVyZV9hamF4XCI6dHJ1ZSxcImNsb2Nrd29ya1wiOmZhbHNlLFwiY29sbGVjdG9yc1wiOntcInBocGluZm9cIjp0cnVlLFwibWVzc2FnZXNcIjp0cnVlLFwidGltZVwiOnRydWUsXCJtZW1vcnlcIjp0cnVlLFwiZXhjZXB0aW9uc1wiOnRydWUsXCJsb2dcIjp0cnVlLFwiZGJcIjp0cnVlLFwidmlld3NcIjp0cnVlLFwicm91dGVcIjp0cnVlLFwibGFyYXZlbFwiOmZhbHNlLFwiZXZlbnRzXCI6ZmFsc2UsXCJkZWZhdWx0X3JlcXVlc3RcIjpmYWxzZSxcInN5bWZvbnlfcmVxdWVzdFwiOnRydWUsXCJtYWlsXCI6dHJ1ZSxcImxvZ3NcIjpmYWxzZSxcImZpbGVzXCI6ZmFsc2UsXCJjb25maWdcIjpmYWxzZSxcImF1dGhcIjpmYWxzZSxcImdhdGVcIjpmYWxzZSxcInNlc3Npb25cIjp0cnVlfSxcIm9wdGlvbnNcIjp7XCJhdXRoXCI6e1wic2hvd19uYW1lXCI6ZmFsc2V9LFwiZGJcIjp7XCJ3aXRoX3BhcmFtc1wiOnRydWUsXCJ0aW1lbGluZVwiOmZhbHNlLFwiYmFja3RyYWNlXCI6ZmFsc2UsXCJleHBsYWluXCI6e1wiZW5hYmxlZFwiOmZhbHNlLFwidHlwZXNcIjpbXCJTRUxFQ1RcIl19LFwiaGludHNcIjp0cnVlfSxcIm1haWxcIjp7XCJmdWxsX2xvZ1wiOmZhbHNlfSxcInZpZXdzXCI6e1wiZGF0YVwiOmZhbHNlfSxcInJvdXRlXCI6e1wibGFiZWxcIjp0cnVlfSxcImxvZ3NcIjp7XCJmaWxlXCI6bnVsbH19LFwiaW5qZWN0XCI6dHJ1ZSxcInJvdXRlX3ByZWZpeFwiOlwiX2RlYnVnYmFyXCJ9LFwibWFpbFwiOntcImRyaXZlclwiOlwic210cFwiLFwiaG9zdFwiOlwic210cC5tYWlsZ3VuLm9yZ1wiLFwicG9ydFwiOjU4NyxcImZyb21cIjp7XCJhZGRyZXNzXCI6XCJoZWxsb0BleGFtcGxlLmNvbVwiLFwibmFtZVwiOlwiRXhhbXBsZVwifSxcImVuY3J5cHRpb25cIjpcInRsc1wiLFwidXNlcm5hbWVcIjpudWxsLFwicGFzc3dvcmRcIjpudWxsLFwic2VuZG1haWxcIjpcIi91c3Ivc2Jpbi9zZW5kbWFpbCAtYnNcIixcIm1hcmtkb3duXCI6e1widGhlbWVcIjpcImRlZmF1bHRcIixcInBhdGhzXCI6W1wiL1VzZXJzL2svYmFzYWwvcmVzb3VyY2VzL3ZpZXdzL3ZlbmRvci9tYWlsXCJdfX0sXCJxdWV1ZVwiOntcImRlZmF1bHRcIjpcImFycmF5XCIsXCJjb25uZWN0aW9uc1wiOntcInN5bmNcIjp7XCJkcml2ZXJcIjpcInN5bmNcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJqb2JzXCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwicmV0cnlfYWZ0ZXJcIjo5MH0sXCJiZWFuc3RhbGtkXCI6e1wiZHJpdmVyXCI6XCJiZWFuc3RhbGtkXCIsXCJob3N0XCI6XCJsb2NhbGhvc3RcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJyZXRyeV9hZnRlclwiOjkwfSxcInNxc1wiOntcImRyaXZlclwiOlwic3FzXCIsXCJrZXlcIjpcInlvdXItcHVibGljLWtleVwiLFwic2VjcmV0XCI6XCJ5b3VyLXNlY3JldC1rZXlcIixcInByZWZpeFwiOlwiaHR0cHM6Ly9zcXMudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20veW91ci1hY2NvdW50LWlkXCIsXCJxdWV1ZVwiOlwieW91ci1xdWV1ZS1uYW1lXCIsXCJyZWdpb25cIjpcInVzLWVhc3QtMVwifSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInJldHJ5X2FmdGVyXCI6OTB9fSxcImZhaWxlZFwiOntcImRhdGFiYXNlXCI6XCJtb25nb2RiXCIsXCJ0YWJsZVwiOlwiZmFpbGVkX2pvYnNcIn19LFwic2VydmljZXNcIjp7XCJtYWlsZ3VuXCI6e1wiZG9tYWluXCI6bnVsbCxcInNlY3JldFwiOm51bGx9LFwic2VzXCI6e1wia2V5XCI6bnVsbCxcInNlY3JldFwiOm51bGwsXCJyZWdpb25cIjpcInVzLWVhc3QtMVwifSxcInNwYXJrcG9zdFwiOntcInNlY3JldFwiOm51bGx9LFwic3RyaXBlXCI6e1wibW9kZWxcIjpcIkFwcFxcXFxVc2VyXCIsXCJrZXlcIjpudWxsLFwic2VjcmV0XCI6bnVsbH19LFwic2Vzc2lvblwiOntcImRyaXZlclwiOlwiYXJyYXlcIixcImxpZmV0aW1lXCI6MTIwLFwiZXhwaXJlX29uX2Nsb3NlXCI6ZmFsc2UsXCJlbmNyeXB0XCI6ZmFsc2UsXCJmaWxlc1wiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvc2Vzc2lvbnNcIixcImNvbm5lY3Rpb25cIjpudWxsLFwidGFibGVcIjpcInNlc3Npb25zXCIsXCJzdG9yZVwiOm51bGwsXCJsb3R0ZXJ5XCI6WzIsMTAwXSxcImNvb2tpZVwiOlwibGFyYXZlbF9zZXNzaW9uXCIsXCJwYXRoXCI6XCIvXCIsXCJkb21haW5cIjpudWxsLFwic2VjdXJlXCI6ZmFsc2UsXCJodHRwX29ubHlcIjp0cnVlfSxcInZpZXdcIjp7XCJwYXRoc1wiOltcIi9Vc2Vycy9rL2Jhc2FsL3Jlc291cmNlcy92aWV3c1wiXSxcImNvbXBpbGVkXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay92aWV3c1wifSxcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJ3aGl0ZTJcIjpcIiNmOGY4ZjhcIixcIndoaXRlM1wiOlwiI0Y0RjRGNFwiLFwid2hpdGU0XCI6XCIjRkFGQUZBXCIsXCJncmV5MVwiOlwiI2U1ZTVlNVwiLFwiZ3JleTJcIjpcIiNmNWY1ZjVcIixcImdyZXkzXCI6XCIjZDBkMGQwXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImJsYWNrMlwiOlwiIzI4MjgyOFwiLFwiYmxhY2szXCI6XCIjMzMzMzMzXCIsXCJibGFjazRcIjpcIiMyMzI5MkVcIixcImJsYWNrNVwiOlwiIzNFNDM0N1wiLFwiYmxhY2s2XCI6XCIjNDk0RTUyXCIsXCJyZWQxXCI6XCIjQzgyMTJCXCIsXCJ5ZWxsb3cxXCI6XCIjRjZCQjQ1XCIsXCJjeWFuMVwiOlwiIzVGQTc5M1wiLFwib3JhbmdlMVwiOlwiI0Y2OEY2MlwiLFwic2tpbjFcIjpcIiNGM0REQTNcIixcImdyZWVuMVwiOlwiIzViYTU0MVwiLFwiZ3JlZW4yXCI6XCIjODhkOTZkXCIsXCJncmVlbjNcIjpcIiM3N2QzNThcIixcImJsdWUxXCI6XCIjMWRhN2VlXCIsXCJibHVlMlwiOlwiIzAwNzNiYlwiLFwiYmx1ZTNcIjpcIiM0RjVEOTVcIixcImdvb2dsZV9ibHVlXCI6XCIjNDI4NWY0XCIsXCJnb29nbGVfZ3JlZW5cIjpcIiMzNGE4NTNcIixcImdvb2dsZV95ZWxsb3dcIjpcIiNmYmJjMDVcIixcImdvb2dsZV9yZWRcIjpcIiNlYTQzMzVcIixcImdpdGh1Yl9ibHVlXCI6XCIjMEQyNjM2XCIsXCJmYWNlYm9va19ibHVlXCI6XCIjNDg2N0FBXCIsXCJpbnN0YWdyYW1fb3JcIjpcIiNGRjc4MDRcIixcInR3aXR0ZXJfYmx1ZVwiOlwiIzAwQUNFRFwifSxcImZvbnRcIjp7XCI0MDRcIjp7XCJmb250LWZhbWlseVwiOlwiTW9ub3RvblwiLFwiZm9udC1zaXplXCI6XCI3NXB4XCJ9LFwiaDFcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjM0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJoMWJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjM0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImgyYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImgzXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyMHB4XCJ9LFwiaDNiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyMHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiYzFcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJjMWJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE2cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI1MDBcIn0sXCJjMXRiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNDAwXCJ9LFwiYzFzXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMC41cHhcIn0sXCJjMXNiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJmb250LXdlaWdodFwiOlwiNjAwXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMC41cHhcIn0sXCJjMlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMyYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifX0sXCJtZXRhXCI6e1widGl0bGVcIjpcImJhc2FsXCIsXCJ1cmxcIjpcImh0dHBzOi8vYmFzYWwudGVjaC9cIixcImRlc2NyaXB0aW9uXCI6XCJtaW5pbWFsIGNvbnRlbnQgbWFuYWdlbWVudFwiLFwia2V5d29yZHNcIjpcImNtc1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2FjaWRqYXp6L2Jhc2FsXCJ9LFwic2V0dGluZ3NcIjp7XCJwZXJwYWdlXCI6MTB9fTsiLCJEYXNoYm9hcmQgPVxuXG4gIGk6IC0+XG4gICAgQGxvYWQoKSBpZiB3aW5kb3cuVXNlciBpc250IHVuZGVmaW5lZFxuXG4gIGxvYWQ6IChjb21wbGV0ZSkgLT5cbiAgICBfLm9mZiAnLnBhZ2UuaG9tZSdcbiAgICBfLm9uICcucGFnZS5kYXNoYm9hcmQnXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmRhc2hib2FyZCA+IC5jb2xsZWN0aW9ucycpKVxuXG4gICAgXy5nZXQgJy9hcGkvY2xpZW50cycsXG4gICAgICB2aWV3OiAnZGFzaGJvYXJkJ1xuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgVGltZS5pKClcbiAgICAgICQoJy5jb2xsZWN0aW9ucycpLmh0bWwgcmVzcG9uc2Uudmlld1xuXG4iLCJFbnRpdGllcyA9XG5cbiAgYmxvZ3M6IFtdXG4gIGNyb3BzOiB7fVxuICBpbWFnZXM6IHt9XG5cbiAgcGxhY2Vob2xkZXJzOiBbXG4gICAgXCJUaGF0J3Mgd2hhdCBJJ20gYmxvZ2dpbmcgYWJvdXRcIlxuICAgIFwiSGF2ZSB5b3UgZ3V5cyBiZWVuIGJsb2dnaW5nP1wiXG4gICAgXCJIb2xkIGFsbCBteSBjYWxscywgSSdtIGJsb2dnaW5nXCJcbiAgICBcIlRlbGwgRG9ubmllIEknbSBibG9nZ2luZyBhbmQgSSdsbCBjYWxsIGhpbSBiYWNrXCJcbiAgICBcIkkgZ290dGEgcnVuLCB5b3Ugc2hvdWxkIGJlIGJsb2dnaW5nXCJcbiAgICBcIkkgd2FudCB5b3Ugb24gdGhlIHBob25lLCBidXQgSSBhbHNvIHdhbnQgeW91IGJsb2dnaW5nXCJcbiAgXVxuXG4gIEJsb2c6IChlbCwgbmFtZSwgdmFsdWU9ZmFsc2UpIC0+XG5cbiAgICBlZGl0b3IgPSBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGVcbiAgICAgIHBsYWNlaG9sZGVyOiBAcGxhY2Vob2xkZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEBwbGFjZWhvbGRlcnMubGVuZ3RoKV1cbiAgICAgIGNhbGxiYWNrczpcbiAgICAgICAgb25JbWFnZVVwbG9hZDogKGZpbGVzKSAtPlxuICAgICAgICAgIEVudGl0aWVzLmltYWdlVXBsb2FkIGZpbGVzLCB0aGlzXG5cbiAgICBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGUoJ2NvZGUnLCB2YWx1ZSkgaWYgdmFsdWUgaXNudCBmYWxzZVxuXG4gICAgQGJsb2dzLnB1c2ggbmFtZTogbmFtZSwgZWRpdG9yOiBlZGl0b3IsIGVsOiBlbC5maW5kKCcuYmxvZycpXG5cbiAgYmxvZ0dldENvZGU6IChuYW1lKSAtPlxuICAgIGZvciBibG9nIGluIEBibG9nc1xuICAgICAgcmV0dXJuIGJsb2cuZWwuc3VtbWVybm90ZSgnY29kZScpIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gXG4gIGJsb2dGb2N1czogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICBpZiBibG9nLm5hbWUgaXMgbmFtZVxuICAgICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuICBpbWFnZVVwbG9hZDogKGZpbGVzLCBlbCkgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBmaWxlc1swXVxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgICQoZWwpLnN1bW1lcm5vdGUoJ2VkaXRvci5pbnNlcnRJbWFnZScsIHJlc3VsdC5kYXRhLnVybClcbiAgICAgICAgTm90aWNlLmkgJ0ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG5cbiAgVGFnczogKGVsLCBuYW1lKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0Jykuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3Jlc3RvcmVfb25fYmFja3NwYWNlJywncmVtb3ZlX2J1dHRvbiddXG4gICAgICBkZWxpbWl0ZXI6ICcsJ1xuICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICAgIGNyZWF0ZTogKGlucHV0KSAtPlxuICAgICAgICB2YWx1ZTogaW5wdXRcbiAgICAgICAgdGV4dDogaW5wdXRcblxuICBEYXRlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1knXG5cbiAgRGF0ZVRpbWU6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSBoOmkgSydcbiAgICAgIGVuYWJsZVRpbWU6IHRydWVcblxuICBEYXRlUmFuZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSdcbiAgICAgIG1vZGU6ICdyYW5nZSdcblxuICBEYXRlVGltZVJhbmdlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1kgaDppIEsnXG4gICAgICBlbmFibGVUaW1lOiB0cnVlXG4gICAgICBtb2RlOiAncmFuZ2UnXG5cbiAgSW1hZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG5cbiAgICBAaW1hZ2VIYW5kbGVycyBlbFxuXG4gICAgIyBwcmVsb2FkIGV4aXN0aW5nIGltYWdlc1xuICAgIGlmIHZhbHVlIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wcGVyKHZhbHVlLCBlbClcbiAgICAgIEVudGl0aWVzLmltYWdlc1tuYW1lXSA9IHZhbHVlXG5cblxuICBpbWFnZUhhbmRsZXJzOiAoZWwsIG5hbWUpIC0+XG5cbiAgICBlbC5vbiAnZHJhZ292ZXInLCBAaW1hZ2VIYW5kbGVyLmRyYWdvdmVyXG4gICAgZWwub24gJ2RyYWdsZWF2ZScsIEBpbWFnZUhhbmRsZXIuZHJhZ2xlYXZlXG4gICAgZWwub24gJ2RyYWdlbnRlciBkcmFnb3ZlcicsIEBpbWFnZUhhbmRsZXIuY2FuY2VsXG4gICAgZWwub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAaW1hZ2VIYW5kbGVyLmRyb3BcbiAgICBlbC5maW5kKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhLnNlbGVjdCcpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuY2hvb3NlRmlsZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEuc2F2ZScpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuc2F2ZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGlucHV0OmZpbGUnKS5vbiAnY2hhbmdlJywgQGltYWdlSGFuZGxlci5jaGFuZ2VcblxuICBpbWFnZUhhbmRsZXI6XG5cbiAgICBkcmFnb3ZlcjogLT5cbiAgICAgIF8ub24gJCh0aGlzKS5maW5kKCcuaW5wdXQtaW1hZ2UnKVxuICAgIGRyYWdsZWF2ZTogLT5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCgnLmlucHV0LWltYWdlJylcbiAgICBjYW5jZWw6IC0+XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBkcm9wOiAoZSkgLT5cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCAnLmlucHV0LWltYWdlJ1xuXG4gICAgICBpZiBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyIGFuZCBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aFxuICAgICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgICAgRW50aXRpZXMubG9hZENyb3BwZXIgZmlsZXNbMF0sICQodGhpcylcblxuICAgIGNob29zZUZpbGU6IC0+XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgICBjaGFuZ2U6IC0+XG4gICAgICBpZiAkKHRoaXMpWzBdLmZpbGVzXG4gICAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuXG4gICAgICAgIEVudGl0aWVzLmxvYWRDcm9wcGVyIGZpbGVzWzBdLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpXG5cbiAgICBzYXZlOiAtPlxuXG4gICAgICBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5kYXRhICduYW1lJ1xuICAgICAgaW5kZXggPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEgJ2luZGV4J1xuXG4gICAgICBTcGlubmVyLmkoJChcIi5lbnRpdHlfaW5kZXhfI3tpbmRleH1cIikpXG5cbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmdldENyb3BwZWRDYW52YXMoKS50b0Jsb2IgKGJsb2IpIC0+XG4gICAgICAgIENsaWVudC5pbWFnZVVwbG9hZCBibG9iLCAocmVzdWx0KSAtPlxuICAgICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAsICdpbWFnZS9qcGVnJ1xuXG4gIGxvYWRDcm9wcGVyOiAoZmlsZSwgZWwpIC0+XG5cbiAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cbiAgICByZWFkZXIub25sb2FkZW5kID0gLT5cbiAgICAgIEVudGl0aWVzLmNyb3BwZXIgcmVhZGVyLnJlc3VsdCwgZWxcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTCBmaWxlXG5cbiAgY3JvcHBlcjogKHVybCwgZWwpIC0+XG5cbiAgICBuYW1lID0gZWwuZGF0YSAnbmFtZSdcbiAgICBpbmRleCA9IGVsLmRhdGEgJ2luZGV4J1xuXG4gICAgY29uc29sZS5sb2cgbmFtZSwgaW5kZXhcblxuICAgIGlmIEVudGl0aWVzLmNyb3BzW25hbWVdIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wc1tuYW1lXS5kZXN0cm95KClcbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdID0gZmFsc2VcblxuICAgIGVsLmZpbmQoJy5jcm9wcGVyJykuYXR0ciAnc3JjJywgdXJsXG5cbiAgICBFbnRpdGllcy5jcm9wc1tuYW1lXSA9IG5ldyBDcm9wcGVyIGVsLmZpbmQoJy5jcm9wcGVyJylbMF0sXG4gICAgICBtaW5Db250YWluZXJIZWlnaHQ6IDMwMFxuICAgICAgbWluQ2FudmFzSGVpZ2h0OiAzMDBcbiAgICAgIHJlc3BvbnNpdmU6IHRydWVcbiAgICAgIHByZXZpZXc6IFwiZGl2LmVudGl0eV9pbmRleF8je2luZGV4fSA+IGRpdi5pbnB1dC1pbWFnZSA+IGRpdi5waWN0dXJlXCJcbiAgICAgIGF1dG9Dcm9wQXJlYTogMVxuICAgICAgc3RyaWN0OiBmYWxzZVxuICAgICAgaGlnaGxpZ2h0OiB0cnVlXG5cbiAgICBfLm9uIGVsLmZpbmQoJy5zYXZlJylcblxuXG4iLCJFbnRyaWVzID1cblxuICBpOiAtPlxuXG4gICAgIyBsaW1pdCBmaWx0ZXIgdHlwZXMgYmFzZWQgb24gdXNlciB0eXBlXG4gICAgaWYgVXNlcj8uY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICBMaXN0aW5nLmkgJ2VudHJpZXMnLCBmYWxzZSwgWydzdHJ1Y3R1cmUnXVxuICAgIGVsc2VcbiAgICAgIExpc3RpbmcuaSAnZW50cmllcycsIGZhbHNlLCBbJ2NsaWVudCcsICdzdHJ1Y3R1cmUnXVxuIiwiRW50cnkgPVxuXG4gIHNlbGVjdFN0cnVjdHVyZToge31cblxuICBfaWQ6IGZhbHNlXG4gIHN0cnVjdHVyZTogZmFsc2VcbiAgc2VsZWN0ZWRTdHJ1Y3R1cmU6IGZhbHNlXG4gIGVudHJ5OiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLmhhc2gubWF0Y2ggLyNzdHJ1Y3R1cmU9KFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBFbnRyeS5zZWxlY3RlZFN0cnVjdHVyZSA9IG1hdGNoWzFdXG5cbiAgICBAc2VsZWN0aXplKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvZW50cmllc1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG4gICAgZWxzZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5mb2N1cygpXG5cbiAgc3RydWN0dXJlU3BlY2lmaWVkOiAtPlxuICAgIGlmIEVudHJ5LnNlbGVjdGVkU3RydWN0dXJlIGlzbnQgZmFsc2VcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuc2V0VmFsdWUgRW50cnkuc2VsZWN0ZWRTdHJ1Y3R1cmVcblxuICBzZWxlY3RpemU6IC0+XG5cbiAgICBAc2VsZWN0U3RydWN0dXJlID0gU2VsZWN0aXplLnN0cnVjdHVyZXMgJCgnLm1vZGlmeSA+IC5zdHJ1Y3R1cmUgPiBzZWxlY3QnKSxcbiAgICAgIEVudHJ5LnN0cnVjdHVyZVNlbGVjdEhhbmRsZXJcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0JykuY2xpY2sgQHN1Ym1pdFxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5hbm90aGVyJykuY2xpY2sgQGFub3RoZXJcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuY2FuY2VsJykuY2xpY2sgQGNhbmNlbFxuXG4gICAgJCgnLmZvY3VzbWUnKS5mb2N1cyAtPlxuICAgICAgJCgnLm5vdGUtZWRpdGFibGUnKS5mb2N1cygpXG5cblxuICBsb2FkOiAoX2lkKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5JykpXG5cbiAgICBfLmdldCAnL2FwaS9lbnRyaWVzLycsXG4gICAgICBfaWQ6IF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgZW50cnkgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICBFbnRyeS5lbnRyeSA9IGVudHJ5XG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmFkZE9wdGlvblxuICAgICAgICBpZDogZW50cnkuc3RydWN0dXJlLmlkLCBuYW1lOiBlbnRyeS5zdHJ1Y3R1cmUubmFtZSwgY2xpZW50UHJvZmlsZTogZW50cnkuY2xpZW50LnByb2ZpbGVcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuc2V0VmFsdWUgZW50cnkuc3RydWN0dXJlLmlkXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmRpc2FibGUoKVxuXG4gIHN1Ym1pdDogLT5cblxuICAgIG5hbWUgPSAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICBlbnRpdGllcyA9IHt9XG5cbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keSA+IC5lbnRpdHknKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIGVudGl0eV9uYW1lID0gJChlbCkuZmluZCgnLmxhYmVsJykuaHRtbCgpXG4gICAgICB0eXBlID0gJChlbCkuZGF0YSAndHlwZSdcblxuICAgICAgc3dpdGNoIHR5cGVcbiAgICAgICAgd2hlbiAnVGV4dCcsJ0xpbmsnLCdEYXRlJywnVGltZScsJ0RhdGVUaW1lJywnRGF0ZVJhbmdlJywnRGF0ZVRpbWVSYW5nZScgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKClcbiAgICAgICAgd2hlbiAnVGFncycgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKCkuc3BsaXQgJywnXG4gICAgICAgIHdoZW4gJ0Jsb2cnXG4gICAgICAgICAgYmxvZyA9IEVudGl0aWVzLmJsb2dHZXRDb2RlIGVudGl0eV9uYW1lXG4gICAgICAgICAgdmFsdWUgPSBibG9nXG4gICAgICAgIHdoZW4gJ0ltYWdlJ1xuICAgICAgICAgIHZhbHVlID0gRW50aXRpZXMuaW1hZ2VzW2VudGl0eV9uYW1lXVxuXG4gICAgICBlbnRpdGllc1tlbnRpdHlfbmFtZV0gPSBuYW1lOiBlbnRpdHlfbmFtZSwgdHlwZTogdHlwZSwgdmFsdWU6IHZhbHVlXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeScpKVxuXG4gICAgICBjYWxsID0gJy9hcGkvZW50cmllcy9hZGQnXG4gICAgICBpZiBFbnRyeS5faWQgaXNudCBmYWxzZVxuICAgICAgICBjYWxsID0gXCIvYXBpL2VudHJpZXMvdXBkYXRlLyN7RW50cnkuX2lkfVwiXG5cbiAgICAgIF8uZ2V0IGNhbGwsXG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgc3RydWN0dXJlOiBFbnRyeS5zdHJ1Y3R1cmVcbiAgICAgICAgZW50aXRpZXM6IGVudGl0aWVzXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pIHJlc3BvbnNlLmRhdGEuc3RhdHVzLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgaWYgRW50cnkuX2lkIGlzIGZhbHNlXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIHt9LCAnJywgXCIvZW50cmllcy8je3Jlc3BvbnNlLmRhdGEuX2lkfVwiXG4gICAgICAgIEVudHJ5Ll9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4gICAgICAgIF8ub24gJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5hbm90aGVyJ1xuXG4gIGFub3RoZXI6IC0+XG4gICAgbG9jYXRpb24uaHJlZiA9IFwiL2VudHJpZXMvbmV3I3N0cnVjdHVyZT0je0VudHJ5LnN0cnVjdHVyZX1cIlxuICBjYW5jZWw6IC0+XG4gICAgaWYgZG9jdW1lbnQucmVmZXJyZXIuaW5kZXhPZih3aW5kb3cubG9jYXRpb24uaG9zdCkgaXMgLTFcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9lbnRyaWVzXCJcbiAgICBlbHNlXG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKClcbiAgc3RydWN0dXJlU2VsZWN0SGFuZGxlcjogKGUpIC0+XG4gICAgc3RydWN0dXJlX2lkID0gJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpXG4gICAgcmV0dXJuIGZhbHNlIGlmIHN0cnVjdHVyZV9pZC5sZW5ndGggaXNudCAyNFxuICAgICNpZiBFbnRyeS5lbnRyeSBpc250IGZhbHNlXG4gICAgIyAgRW50cnkubG9hZEVudGl0aWVzIEVudHJ5LmVudHJ5LmVudGl0aWVzLCBFbnRyeS5lbnRyeS5uYW1lXG4gICAgI2Vsc2VcbiAgICBFbnRyeS5sb2FkU3RydWN0dXJlIHN0cnVjdHVyZV9pZFxuXG4gIGxvYWRTdHJ1Y3R1cmU6IChfaWQpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5JykpXG5cbiAgICBfLmdldCAnL2FwaS9zdHJ1Y3R1cmVzJyxcbiAgICAgIF9pZDogX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICBFbnRyeS5zdHJ1Y3R1cmUgPSBfaWRcbiAgICAgIEBsb2FkRW50aXRpZXMgcmVzcG9uc2UuZGF0YVswXS5lbnRpdGllc1xuXG4gIGxvYWRFbnRpdGllczogKGVudGl0aWVzLCBuYW1lPWZhbHNlKSAtPlxuXG4gICAgXy5vbiAnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLm5hbWUnXG4gICAgaWYgRW50cnkuZW50cnkubmFtZSBpc250IGZhbHNlXG4gICAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsKEVudHJ5LmVudHJ5Lm5hbWUpXG5cbiAgICBib2R5ID0gJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmJvZHknKVxuICAgIGJvZHkuaHRtbCAnJ1xuXG4gICAgdGFiaW5kZXggPSAzXG4gICAgaW5kZXggPSAwXG5cbiAgICBmb3IgaSwgZW50aXR5IG9mIGVudGl0aWVzXG5cbiAgICAgIGh0bWwgPSAkKFwiLnBhZ2UuZW50cnkgPiAjdGVtcGxhdGUgPiAuZW50aXR5XyN7ZW50aXR5LnR5cGV9XCIpLmNsb25lKClcbiAgICAgIGh0bWwuYWRkQ2xhc3MgXCJlbnRpdHlfaW5kZXhfI3srK2luZGV4fVwiXG4gICAgICBodG1sLmRhdGEgXCJpbmRleFwiLCBpbmRleFxuICAgICAgaHRtbC5kYXRhIFwibmFtZVwiLCBlbnRpdHkubmFtZVxuXG4gICAgICBpZiBFbnRyeS5lbnRyeS5lbnRpdGllcz9baV0/LnZhbHVlXG5cbiAgICAgICAgdmFsdWUgPSBFbnRyeS5lbnRyeS5lbnRpdGllc1tpXS52YWx1ZVxuXG4gICAgICAgIHN3aXRjaCBlbnRpdHkudHlwZVxuICAgICAgICAgIHdoZW4gJ1RhZ3MnLCAnVGV4dCcsJ0xpbmsnLCdEYXRlJywnVGltZScsJ0RhdGVUaW1lJywnRGF0ZVJhbmdlJywnRGF0ZVRpbWVSYW5nZScgdGhlbiBodG1sLmZpbmQoJ2lucHV0JykudmFsIHZhbHVlXG5cbiAgICAgIGh0bWwuZmluZCgnaW5wdXQsc2VsZWN0LHRleHRhcmVhJykuYXR0ciAndGFiaW5kZXgnLCB0YWJpbmRleCsrXG4gICAgICBib2R5LmFwcGVuZCBodG1sXG5cbiAgICAgIGVudGl0eUVsID0gJChcIi5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5IC5lbnRpdHlfaW5kZXhfI3tpbmRleH1cIilcbiAgICAgIGVudGl0eUVsLmZpbmQoJy5sYWJlbCcpLmh0bWwgZW50aXR5Lm5hbWVcblxuICAgICAgaWYgRW50aXRpZXNbZW50aXR5LnR5cGVdIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIEVudGl0aWVzW2VudGl0eS50eXBlXShlbnRpdHlFbCwgZW50aXR5Lm5hbWUsIHZhbHVlKVxuXG4gICAgJCgnW3RhYmluZGV4PTJdJykuZm9jdXMoKVxuICAgIF8ub24gJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLnN1Ym1pdCcpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXgrK1xuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5hbm90aGVyJykuYXR0ciAndGFiaW5kZXgnLCB0YWJpbmRleFxuIiwiRmlsdGVyID1cbiAgZmlsdGVyOiBmYWxzZVxuICBlbmRwb2ludDogZmFsc2VcbiAgZmlsdGVyczogW11cblxuICBpOiAoZmlsdGVycykgLT5cblxuICAgIEBmaWx0ZXJzID0gZmlsdGVyc1xuXG4gICAgXy5vbiBcIi5maWx0ZXJfI3tmaWx0ZXJ9XCIgZm9yIGZpbHRlciBpbiBAZmlsdGVyc1xuXG4gICAgZm9yIGZpbHRlciBpbiBAZmlsdGVyc1xuICAgICAgaWYgUXVlcnkucGFyYW0oZmlsdGVyKSBpc250IHVuZGVmaW5lZFxuICAgICAgICBGaWx0ZXIuc2VsZWN0ZWQgZmlsdGVyXG5cbiAgICAkKFwiLmxpc3RpbmdcIikub24gJ2NsaWNrJywgJy5saXN0LWhlYWRlciA+IC5maWx0ZXJzID4gLmZpbHRlcicsIEBoYW5kbGVycy5maWx0ZXJIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nXCIpLm9uICdjbGljaycsICcubGlzdC1oZWFkZXIgPiAuZmlsdGVycyA+IC5maWx0ZXIgPiAub3B0aW9uX3NlbGVjdGVkID4gLmljb24uY2FuY2VsJywgQGhhbmRsZXJzLmZpbHRlckNsZWFySGFuZGxlclxuXG4gIGQ6IC0+XG4gICAgXy5vZmYgXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9XCJcbiAgICAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnNlYXJjaCA+IGlucHV0JykudmFsICcnXG4gICAgRmlsdGVyLmhhbmRsZXJzLmQoKVxuICAgIExpc3RpbmcudW5zZWxlY3RBbGwoKVxuICAgICNTcGlubmVyLmQoKVxuXG4gIGdldDogKHNlYXJjaD1udWxsKSAtPlxuICAgIFNwaW5uZXIuaSgkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfSA+IC5pbm5lciA+IC52YWx1ZXNcIikpXG5cbiAgICBvcHRpb25zID1cbiAgICAgIHZpZXc6ICdmaWx0ZXJzJ1xuXG4gICAgb3B0aW9ucy5kZWxldGVkID0gdHJ1ZSBpZiBMaXN0aW5nLmRlbGV0ZWQgaXMgdHJ1ZVxuXG4gICAgZm9yIGluZGV4LCBmaWx0ZXIgb2YgRmlsdGVyLmZpbHRlcnNcbiAgICAgIGlmIGZpbHRlciBpc250IEZpbHRlci5maWx0ZXIgYW5kIFF1ZXJ5LnBhcmFtKGZpbHRlcikgaXNudCB1bmRlZmluZWRcbiAgICAgICAgb3B0aW9uc1tmaWx0ZXIgKyAnLm5hbWUnXSA9IFF1ZXJ5LnBhcmFtIGZpbHRlclxuXG4gICAgb3B0aW9ucy5uYW1lID0gc2VhcmNoIGlmIHNlYXJjaCBpc250IG51bGxcblxuICAgIF8uZ2V0IFwiL2FwaS8je0BlbmRwb2ludH1cIiwgb3B0aW9uc1xuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzJykuaHRtbCByZXNwb25zZS52aWV3XG4gICAgICBTcGlubmVyLmQoKVxuXG4gIHNlbGVjdDogKG9wdGlvbikgLT5cbiAgICBRdWVyeS5wYXJhbSAncGFnZScsIGZhbHNlXG4gICAgUXVlcnkucGFyYW0gRmlsdGVyLmZpbHRlciwgb3B0aW9uXG4gICAgRmlsdGVyLnNlbGVjdGVkIEZpbHRlci5maWx0ZXJcbiAgICBGaWx0ZXIuZCgpXG4gICAgTGlzdGluZy5sb2FkKClcblxuICBzZWxlY3RlZDogKGZpbHRlcikgLT5cbiAgICBpZiBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzIHVuZGVmaW5lZFxuICAgICAgJChcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9zZWxlY3RlZCA+IC5jb3B5XCIpLmh0bWwgJydcbiAgICAgIF8ub24gXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fZGVmYXVsdFwiXG4gICAgICBfLm9mZiBcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9zZWxlY3RlZFwiXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgICQoXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWQgPiAuY29weVwiKS5odG1sIFF1ZXJ5LnBhcmFtIGZpbHRlclxuICAgIF8ub2ZmIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX2RlZmF1bHRcIlxuICAgIF8ub24gXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWRcIlxuXG4gIGhhbmRsZXJzOlxuXG4gICAgaTogLT5cblxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdjbGljaycsICcuaW5uZXIgPiAubGFiZWwgPiAuaWNvbi5jYW5jZWwnLCBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdrZXl1cCcsJyAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXQnLCBAa2V5SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdjbGljaycsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQHNlbGVjdEhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnbW91c2VvdmVyJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAaG92ZXJIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2JsdXInLCAgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnY2xpY2snLCBAaW5zaWRlQ2hlY2tcblxuICAgICAgJChkb2N1bWVudCkub24gJ2NsaWNrJywgQG91dHNpZGVDaGVja1xuXG4gICAgZDogLT5cblxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnY2xpY2snLCAnLmlubmVyID4gLmxhYmVsID4gLmljb24uY2FuY2VsJywgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2tleXVwJywnIC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dCcsIEBrZXlIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdjbGljaycsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQHNlbGVjdEhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ21vdXNlb3ZlcicsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQGhvdmVySGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnYmx1cicsICBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnY2xpY2snLCBAaW5zaWRlQ2hlY2tcblxuICAgICAgJChkb2N1bWVudCkub2ZmICdjbGljaycsIEBvdXRzaWRlQ2hlY2tcblxuXG4gICAgZmlsdGVyQ2xlYXJIYW5kbGVyOiAtPlxuICAgICAgY29uc29sZS5sb2cgJ2Fib3V0IHRvIGNsZWFyJ1xuICAgICAgRmlsdGVyLmZpbHRlciA9ICQodGhpcykuZGF0YSAnZmlsdGVyJ1xuICAgICAgRmlsdGVyLnNlbGVjdCBmYWxzZVxuICAgICAgRmlsdGVyLmQoKVxuXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGZpbHRlckhhbmRsZXI6IC0+XG4gICAgICBGaWx0ZXIuZCgpXG5cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBGaWx0ZXIuZmlsdGVyID0gJCh0aGlzKS5kYXRhICdmaWx0ZXInXG4gICAgICBGaWx0ZXIuZW5kcG9pbnQgPSAkKHRoaXMpLmRhdGEgJ2VuZHBvaW50J1xuXG5cbiAgICAgIGlmICQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9XCIpLmhhc0NsYXNzICdvbidcbiAgICAgICAgRmlsdGVyLmQoKVxuICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgRmlsdGVyLmhhbmRsZXJzLmkoKVxuXG4gICAgICAkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfSA+IC5pbm5lciA+IC52YWx1ZXNcIikuaHRtbCAnJ1xuICAgICAgXy5vbiBcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn1cIlxuICAgICAgJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn0gPiAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXRcIikuZm9jdXMoKVxuXG4gICAgICBGaWx0ZXIuZ2V0KClcblxuICAgIGluc2lkZUNoZWNrOiAtPlxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBvdXRzaWRlQ2hlY2s6IC0+XG4gICAgICBGaWx0ZXIuZCgpXG5cbiAgICBob3ZlckhhbmRsZXI6IC0+XG5cbiAgICAgIF8ub2ZmICcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZS5vbidcbiAgICAgIF8ub24gJCh0aGlzKVxuXG4gICAgc2VsZWN0SGFuZGxlcjogLT5cbiAgICAgIEZpbHRlci5zZWxlY3QgJCh0aGlzKS5maW5kKCcubmFtZScpLmh0bWwoKVxuXG4gICAga2V5SGFuZGxlcjogLT5cblxuICAgICAga2V5ID0gZXZlbnQua2V5Q29kZVxuXG4gICAgICBzd2l0Y2gga2V5XG4gICAgICAgIHdoZW4gMjcgdGhlbiBGaWx0ZXIuZCgpXG4gICAgICAgIHdoZW4gNDAsIDM5IHRoZW4gRmlsdGVyLm5hdiAnZG93bidcbiAgICAgICAgd2hlbiAzNywzOCB0aGVuIEZpbHRlci5uYXYgJ3VwJ1xuICAgICAgICB3aGVuIDEzIHRoZW4gRmlsdGVyLnNlbGVjdCAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZS5vbiA+IC5uYW1lJykuaHRtbCgpXG4gICAgICAgIGVsc2UgRmlsdGVyLmdldCAkKHRoaXMpLnZhbCgpXG5cbiAgICAgIHJldHVybiB0cnVlXG5cbiAgbmF2OiAoZGlyKSAtPlxuXG4gICAgY3VyID0gJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUub24nKVxuICAgIG5leHQgPSBjdXIubmV4dCgpIGlmIGRpciBpcyAnZG93bidcbiAgICBuZXh0ID0gY3VyLnByZXYoKSBpZiBkaXIgaXMgJ3VwJ1xuICAgIF8ub2ZmIGN1clxuXG4gICAgaWYgbmV4dC5sZW5ndGggaXNudCAwXG4gICAgICBfLm9uIG5leHRcbiAgICAgIHJldHVyblxuXG4gICAgXy5vbiAnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWU6Zmlyc3QtY2hpbGQnIGlmIGRpciBpcyAnZG93bidcbiAgICBfLm9uICcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZTpsYXN0LWNoaWxkJyBpZiBkaXIgaXMgJ3VwJ1xuXG4iLCJHbG9iYWwgPVxuXG4gICMga2V2aW4gb2xzb24gKGtldmluQDI1Ni5pbykg8J+MgPCfjrdcblxuICB3aW5kb3c6IGZhbHNlXG4gIHdpbmRvd1RpbWVyOiBmYWxzZVxuICBpbml0OiBmYWxzZVxuICBwcm90ZWN0ZWQ6IFsnZW50cmllcycsJ3N0cnVjdHVyZXMnLCdjbGllbnRzJywndXNlcnMnXVxuXG4gIGk6IC0+XG4gICAgR2xvYmFsLmhhbmRsZXJzKClcbiAgICBHbG9iYWwubG9naW5DaGVjaygpXG5cbiAgICAkKFwiLm1lbnUgPiAub3B0aW9uXyN7UGFnZX1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpIGlmIFBhZ2U/XG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucHJvZmlsZScpLmNsaWNrIEdsb2JhbC51c2VyUHJvZmlsZUhhbmRsZXJcbiAgICAkKCcub2F1dGhzID4gLm9hdXRoJykuY2xpY2sgR2xvYmFsLnVzZXJPYXV0aEhhbmRsZXJcbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5sb2dvdXQnKS5jbGljayBHbG9iYWwubG9nb3V0SGFuZGxlclxuICAgICQoJy5tZW51ID4gLm9wdGlvbicpLmNsaWNrIEdsb2JhbC5tZW51SGFuZGxlclxuXG4gIG1lbnVIYW5kbGVyOiAtPlxuICAgICQoJy5tZW51ID4gLm9wdGlvbicpLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgJCh0aGlzKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgIFNwaW5uZXIuaSgkKCdoZWFkZXInKSlcblxuICBsb2dvdXRIYW5kbGVyOiAtPlxuXG4gICAgUHJvbXB0LmkgJ0xvZ291dCcsICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gbG9nIG91dD8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgIHJldHVybiBmYWxzZSBpZiByZXNwb25zZSBpc250ICdZZXMnXG5cbiAgICAgIFNwaW5uZXIuaSAkKCdoZWFkZXInKVxuXG4gICAgICBNZS5sb2dvdXQgLT5cbiAgICAgICAgXy5zd2FwICcubWUgPiAucHJvZmlsZSdcbiAgICAgICAgXy5zd2FwICcubWUgPiAucGljdHVyZSdcbiAgICAgICAgTm90aWNlLmkgJ0xvZ291dCBzdWNjZXNzZnVsJywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG4gICAgICAgICwgMTIwMFxuXG4gIHVzZXJQcm9maWxlSGFuZGxlcjogLT5cblxuICAgIG9hID0gJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLm9hdXRocycpXG4gICAgdGwgPSBuZXcgVGltZWxpbmVNYXggcmVwZWF0OiAwXG5cbiAgICBpZiBvYS5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgXy5vbiBvYVxuICAgICAgdGwudG8gJyNwcm9maWxlU1ZHJywgMC44LCB7bW9ycGhTVkc6ICcjY2FuY2VsU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgIGVsc2VcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI3Byb2ZpbGVTVkcnLCBlYXNlOlBvd2VyNC5lYXNlSW5PdXR9XG4gICAgICBfLm9mZiBvYSwgb2ZmaW5nOiAwLjVcblxuICB1c2VyT2F1dGhIYW5kbGVyOiAtPlxuXG4gICAgdHlwZSA9ICQodGhpcykuZGF0YSAndHlwZSdcblxuICAgIHJldHVybiB0cnVlIGlmIHR5cGUgaXMgJ2NhbmNlbCdcblxuICAgIEdsb2JhbC5vYXV0aFdpbmRvdyAnL2xvYWRpbmcnXG5cbiAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgIHBhcmFtcyA9IHt9XG4gICAgcGFyYW1zLmludml0ZSA9IEludml0ZS5oYXNoIGlmIEludml0ZS5oYXNoXG5cbiAgICBNZS5vYXV0aCB0eXBlLCBwYXJhbXMsICh1cmkpIC0+XG4gICAgICBHbG9iYWwud2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmlcblxuICBvYXV0aFdpbmRvdzogKHVybCkgLT5cbiAgICB3ID0gNjQwXG4gICAgaCA9IDU1MFxuICAgIGxlZnQgPSAoc2NyZWVuLndpZHRoLzIpIC0gKHcvMilcbiAgICB0b3AgPSAoc2NyZWVuLmhlaWdodC8yKSAtIChoLzIpXG5cblxuICAgIEdsb2JhbC53aW5kb3cgPSB3aW5kb3cub3Blbih1cmwsICdMb2dpbiAvIFJlZ2lzdGVyJywgXCJ0b29sYmFyPW5vLCBsb2NhdGlvbj1ubywgZGlyZWN0b3JpZXM9bm8sIHN0YXR1cz1ubywgbWVudWJhcj1ubywgc2Nyb2xsYmFycz1ubywgcmVzaXphYmxlPW5vLCBjb3B5aGlzdG9yeT1ubywgd2lkdGg9I3t3fSxoZWlnaHQ9I3tofSx0b3A9I3t0b3B9LGxlZnQ9I3tsZWZ0fVwiKVxuICAgIEdsb2JhbC53aW5kb3cuZm9jdXMgaWYgd2luZG93LmZvY3VzXG4gICAgR2xvYmFsLndpbmRvd1RpbWVyID0gc2V0SW50ZXJ2YWwgLT5cbiAgICAgIGlmIEdsb2JhbC53aW5kb3cuY2xvc2VkXG4gICAgICAgIGNsZWFySW50ZXJ2YWwgR2xvYmFsLndpbmRvd1RpbWVyXG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgIGNvbnNvbGUubG9nICdjbG9zaW5nIG91ciBzaGl0ZSdcbiAgICAsIDUwXG5cbiAgICByZXR1cm5cblxuICBvYXV0aENvbXBsZXRlOiAodXNlcikgLT5cbiAgICBTcGlubmVyLmQoKVxuICAgIEdsb2JhbC5sb2dpbiB1c2VyXG4gICAgTm90aWNlLmkgJ0xvZ2luIHN1Y2Nlc3NmdWwnLCB0eXBlOiAnc3VjY2VzcydcbiAgICBpZiBVc2VyLmNsaWVudCBpc250IHVuZGVmaW5lZFxuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9lbnRyaWVzJ1xuICAgICAgMjAwMFxuICAgIGVsc2VcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuICAgICAgMjAwMFxuXG4gIGxvZ2luOiAodXNlcikgLT5cblxuICAgIHdpbmRvdy5Vc2VyID0gdXNlclxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiAuaW1hZ2UnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgje1VzZXIucGljdHVyZX0pXCJcbiAgICBfLm9mZiAnLm1lID4gLnByb2ZpbGUnXG4gICAgXy5vZmYgJy5tZSA+IC5vYXV0aHMnXG4gICAgXy5vbiAnLm1lID4gLnBpY3R1cmUnXG5cbiAgICBpZiBVc2VyLmNsaWVudCBpc250IHVuZGVmaW5lZFxuICAgICAgJCgnaGVhZGVyID4gLmlubmVyID4gLmNsaWVudCA+IC5uYW1lJykuaHRtbCBVc2VyLmNsaWVudC5uYW1lXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50ID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgje1VzZXIuY2xpZW50LnByb2ZpbGV9KVwiXG4gICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50J1xuICAgICAgXy5vZmYgJ2hlYWRlciA+IC5pbm5lciA+IC5sb2dvJ1xuICAgICAgXy5vZmYgJ2hlYWRlciA+IC5pbm5lciA+IC5uYW1lJ1xuICAgICAgXy5vZmYgJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51ID4gLm9wdGlvbl9jbGllbnRzJ1xuICAgICAgXy5vZmYgJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51ID4gLm9wdGlvbl9zdHJ1Y3R1cmVzJ1xuICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm1lbnUnXG5cbiAgbG9naW5DaGVjazogLT5cblxuICAgIE1lLmF1dGhlZCAocmVzdWx0KSAtPlxuXG4gICAgICBHbG9iYWwubG9naW4ocmVzdWx0KSBpZiByZXN1bHQgaXNudCBmYWxzZVxuXG4gICAgICAjIGlmIHRoZSBwYWdlIHdlcmUgb24gXG4gICAgICBpZiBHbG9iYWwucHJvdGVjdGVkLmluZGV4T2YobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvL2csICcnKSkgaXNudCAtMSBhbmQgcmVzdWx0IGlzIGZhbHNlXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcblxuICAgICAgaWYgR2xvYmFsLmluaXQgaXNudCBmYWxzZSBhbmQgKCByZXN1bHQgaXNudCBmYWxzZSBvciBHbG9iYWwuaW5pdCBpcyAnSW52aXRlJyApXG4gICAgICAgIHdpbmRvd1tHbG9iYWwuaW5pdF0uaSgpXG5cbiAgICAgICMgdHVybiBvbiBhbGwgbG9naW4gLyByZWdpc3RyYXRpb24gZGl2c1xuICAgICAgaWYgd2luZG93LlVzZXIgaXMgdW5kZWZpbmVkXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5wcm9maWxlJ1xuICAgICAgICBfLm9uICcucGFnZS5ob21lJ1xuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubG9nbydcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm5hbWUnXG5cbiAgICAgICMgY2xpZW50IGJhc2VkIHVzZXIsIGdvIHRvIGVudHJpZXNcbiAgICAgIGlmIFVzZXI/LmNsaWVudCBpc250IHVuZGVmaW5lZCBhbmQgUGFnZSBpc250ICdlbnRyaWVzJ1xuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9lbnRyaWVzJ1xuXG4gICAgICBpZiB3aW5kb3cuVXNlciBpc250IHVuZGVmaW5lZCBhbmQgVXNlci5jbGllbnQgaXMgdW5kZWZpbmVkXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5sb2dvJ1xuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcbiAgICAgICAgXy5vbiAnLm1lbnUnXG4iLCJfLmNvbnN0cnVjdG9yKClcblxuY2xhc3MgSW5kZXhcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAbW9iaWxlXG5cbiAgbW9iaWxlOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG4iLCJJbnZpdGUgPVxuICBoYXNoOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuaW52aXRlJykpXG5cbiAgICBpZiBVc2VyPyBpc250IGZhbHNlXG4gICAgICBTcGlubmVyLmQoKVxuICAgICAgUHJvbXB0LmkgJ0ludml0ZSBFcm9ycicsICdZb3UgYXJlIGN1cnJlbnRseSBsb2dnZWQgaW4nLCBbJ09LJ10sIHt9LCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG5cbiAgICBlbHNlXG4gICAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9pbnZpdGVcXC8oWzAtOWEtZkEtRl17OH0pL1xuICAgICAgICBAaGFzaCA9IG1hdGNoWzFdXG4gICAgICAgIEBsb2FkIEBoYXNoXG4gICAgICBlbHNlXG5cbiAgbG9hZDogKGhhc2gpIC0+XG5cbiAgICBfLmdldCAnL2FwaS9pbnZpdGUvZ2V0JyxcbiAgICAgIGhhc2g6IGhhc2hcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXN1bHQpIC0+XG4gICAgICBpbnZpdGUgPSByZXN1bHQuZGF0YS5pbnZpdGVcblxuICAgICAgJCgnLnBhZ2UuaW52aXRlID4gLnByb2ZpbGUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLFwidXJsKCN7aW52aXRlLmNsaWVudC5wcm9maWxlfSlcIlxuICAgICAgJCgnLnBhZ2UuaW52aXRlID4gLnRpdGxlJykuaHRtbCBpbnZpdGUuY2xpZW50Lm5hbWVcbiIsIkxpc3RpbmcgPVxuICBjb250ZW50OiBmYWxzZVxuICBzZWxlY3RlZDogW11cbiAgZmlsdGVyczogW11cbiAgc2VsZWN0ZWRDdXJzb3I6IDBcbiAgZGVsZXRlZDogZmFsc2VcblxuICBvdGhlckFjdGlvbnM6IGZhbHNlXG5cbiAgaTogKGNvbnRlbnQsIG90aGVyQWN0aW9ucz1mYWxzZSwgZmlsdGVycz1bXSkgLT5cblxuICAgIEBmaWx0ZXJzID0gZmlsdGVyc1xuICAgIEBjb250ZW50ID0gY29udGVudFxuICAgIEBvdGhlckFjdGlvbnMgPSBvdGhlckFjdGlvbnNcblxuICAgIGlmIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2RlbGV0ZWQnKSBpc250IC0xXG4gICAgICBfLm9uIFwiLnBhZ2UuI3tAY29udGVudH0gPiAuYWN0aXZlLmRlbGV0ZWRcIlxuICAgICAgQGRlbGV0ZWQgPSB0cnVlXG4gICAgICBfLm9mZiAnLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb24uZGVsZXRlJ1xuICAgICAgXy5vbiAnLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb24ucmVzdG9yZSdcbiAgICAgIF8ub24gJy5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uLmZvcmNlJ1xuICAgICAgXy5vZmYgXCIuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbl8je0xpc3RpbmcuY29udGVudH1cIlxuICAgIGVsc2VcbiAgICAgIF8ub24gJChcIi5wYWdlLiN7QGNvbnRlbnR9ID4gLmRlbGV0ZWRcIikubm90ICcuYWN0aXZlJ1xuICAgICAgXy5vbiBcIi5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uXyN7TGlzdGluZy5jb250ZW50fVwiXG5cbiAgICBAbG9hZCgpXG4gICAgQGhhbmRsZXJzKClcblxuICAgIEZpbHRlci5pIEBmaWx0ZXJzIGlmIEBmaWx0ZXJzLmxlbmd0aCA+IDBcbiAgICBTZWFyY2guaSgpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICcuY2hlY2tib3gnLCBAY2hlY2tib3hIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICcuc3dpdGNoJywgQHN3aXRjaEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NoYW5nZScsICcubGlzdC1oZWFkZXIgPiAuY2hlY2tib3ggPiBpbnB1dCcsIEBzZWxlY3RBbGxIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjaGFuZ2UnLCAnLmNoZWNrYm94ID4gaW5wdXQnLCBAc3RhdGVIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICcubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbicsIEBhY3Rpb25IYW5kbGVyXG5cbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJz4gLmlubmVyID4gLnBhZ2luYXRlID4gLmlubmVyID4gLm51bScsIEBwYWdlSGFuZGxlclxuXG4gIGNoZWNrYm94SGFuZGxlcjogLT5cbiAgICBjYiA9ICQodGhpcykuZmluZCAnaW5wdXQnXG4gICAgaWYgZXZlbnQudGFyZ2V0LnR5cGUgaXNudCAnY2hlY2tib3gnXG4gICAgICBjYlswXS5jaGVja2VkID0gIWNiWzBdLmNoZWNrZWRcbiAgICAgIGNiLmNoYW5nZSgpXG5cbiAgc3dpdGNoSGFuZGxlcjogLT5cblxuICAgIGVsID0gJCh0aGlzKVxuXG4gICAgX2lkID0gZWwuZGF0YSAnX2lkJ1xuICAgIG5hbWUgPSBlbC5kYXRhICduYW1lJ1xuICAgIHZhbHVlID0gIWVsLmhhc0NsYXNzICdvbidcblxuICAgIExpc3RpbmcudG9nZ2xlIFtfaWRdLCBuYW1lLCB2YWx1ZSwgLT5cbiAgICAgIF8uc3dhcCBlbFxuXG4gIHRvZ2dsZTogKGlkcywgbmFtZSwgdmFsdWUsIGNvbXBsZXRlKSAtPlxuXG4gICAgaWRzLmZvckVhY2ggKF9pZCwgaW5kZXgpIC0+XG5cbiAgICAgIG9wdGlvbnMgPSB7fVxuICAgICAgb3B0aW9uc1tuYW1lXSA9IHZhbHVlXG5cbiAgICAgIF8uZ2V0IFwiL2FwaS8je0xpc3RpbmcuY29udGVudH0vdXBkYXRlLyN7X2lkfVwiLFxuICAgICAgICBvcHRpb25zXG4gICAgICAuZG9uZSAocmVzcG9zbmUpIC0+XG4gICAgICAgIGlmIGluZGV4IGlzIGlkcy5sZW5ndGgtMVxuICAgICAgICAgIE5vdGljZS5pIFwiVXBkYXRlZCBzdWNjZXNzZnVsbHlcIiwgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgY29tcGxldGU/KClcblxuICBzZWxlY3RBbGxIYW5kbGVyOiAtPlxuICAgIGlmIHRoaXMuY2hlY2tlZFxuICAgICAgJCgnLmxpc3RpbmcgPiAuaW5uZXIgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykucHJvcCAnY2hlY2tlZCcsIHRydWVcbiAgICBlbHNlXG4gICAgICAkKCcubGlzdGluZyA+IC5pbm5lciA+IC5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXQnKS5wcm9wICdjaGVja2VkJywgZmFsc2VcblxuICB1bnNlbGVjdEFsbDogLT5cbiAgICAgICQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH0gPiAuaW5uZXIgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0XCIpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuICAgICAgJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fSA+IC5saXN0LWhlYWRlciA+IC5jaGVja2JveCA+IGlucHV0XCIpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuICAgICAgTGlzdGluZy5zdGF0ZUhhbmRsZXIoKVxuXG4gIHN0YXRlSGFuZGxlcjogLT5cbiAgICBpZHMgPSBbXVxuXG4gICAgJCgnLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgaWYgZWwuY2hlY2tlZFxuICAgICAgICBpZHMucHVzaCAkKGVsKS5kYXRhICdfaWQnXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cbiAgICAgIGlmIGlkcy5sZW5ndGggPiAwXG4gICAgICAgICQoJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuY29weSA+IC52YWx1ZScpLnRleHQgaWRzLmxlbmd0aFxuICAgICAgICBfLm9mZiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMnXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMnXG4gICAgICBlbHNlXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzJ1xuICAgICAgICBfLm9mZiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucydcbiAgICAgIExpc3Rpbmcuc2VsZWN0ZWQgPSBpZHNcblxuICBwYWdlTGlua3M6IC0+XG4gICAgcGFyYW1zID0gUXVlcnkucGFyYW1zKClcbiAgICAkKCcucGFnaW5hdGUgPiAuaW5uZXIgPiAubnVtJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBwYWdlID0gJChlbCkuZGF0YSAncGFnZSdcbiAgICAgIHJldHVybiBpZiBwYWdlIGlzIHVuZGVmaW5lZFxuICAgICAgcGFyYW1zLnBhZ2UgPSBwYWdlXG4gICAgICBxdWVyeSA9IFF1ZXJ5LnN0cmluZ2lmeSBwYXJhbXNcbiAgICAgICQoZWwpLmF0dHIgJ2hyZWYnLCBcIj8je1F1ZXJ5LnN0cmluZ2lmeShwYXJhbXMpfVwiXG5cbiAgcGFnZUhhbmRsZXI6IC0+XG4gICAgcGFnZSA9ICQodGhpcykuZGF0YSAncGFnZSdcbiAgICByZXR1cm4gdHJ1ZSBpZiBwYWdlIGlzIHVuZGVmaW5lZFxuICAgIExpc3RpbmcudW5zZWxlY3RBbGwoKVxuICAgIFF1ZXJ5LnBhcmFtICdwYWdlJywgcGFnZVxuICAgIExpc3RpbmcubG9hZCgpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgYWN0aW9uSGFuZGxlcjogLT5cbiAgICB0eXBlID0gJCh0aGlzKS5kYXRhICd0eXBlJ1xuXG4gICAgc3dpdGNoIHR5cGVcbiAgICAgIHdoZW4gJ2RlbGV0ZSdcbiAgICAgICAgUHJvbXB0LmkgXCJEZWxldGluZyAje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBpdGVtKHMpXCIsXG4gICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlc2U/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiByZXNwb25zZSBpc250ICdZZXMnXG4gICAgICAgICAgICBMaXN0aW5nLmRlbGV0ZVNlbGVjdGVkKClcbiAgICAgIHdoZW4gJ3Jlc3RvcmUnXG4gICAgICAgIFByb21wdC5pIFwiUmVzdG9yaW5nICN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IGl0ZW0ocylcIixcbiAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlc3RvcmUgdGhlc2U/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiByZXNwb25zZSBpc250ICdZZXMnXG4gICAgICAgICAgICBMaXN0aW5nLmRlbGV0ZVNlbGVjdGVkIDAsICdyZXN0b3JlJ1xuICAgICAgd2hlbiAnZm9yY2UnXG4gICAgICAgIFByb21wdC5pIFwiRGVsZXRpbmcgI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gaXRlbShzKVwiLFxuICAgICAgICAgICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gUEVSTUFORU5UTFkgZGVsZXRlIHRoZXNlPycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmV0dXJuIHRydWUgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuICAgICAgICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCAwLCAnZm9yY2UnXG5cbiAgICAgIHdoZW4gJ3B1Ymxpc2gnLCAnaGlkZSdcblxuICAgICAgICB2YWx1ZSA9ICh0eXBlIGlzICdwdWJsaXNoJylcbiAgICAgICAgU3Bpbm5lci5pKCQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH1cIikpXG4gICAgICAgIExpc3RpbmcudG9nZ2xlIExpc3Rpbmcuc2VsZWN0ZWQsICdhY3RpdmUnLCB2YWx1ZSwgLT5cblxuICAgICAgICAgICQoJy5zd2l0Y2guYWN0aXZlJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICAgICAgICBmb3IgX2lkIGluIExpc3Rpbmcuc2VsZWN0ZWRcbiAgICAgICAgICAgICAgXy5vbiAkKGVsKSBpZiBfaWQgaXMgJChlbCkuZGF0YSgnX2lkJykgYW5kIHZhbHVlIGlzIHRydWVcbiAgICAgICAgICAgICAgXy5vZmYgJChlbCkgaWYgX2lkIGlzICQoZWwpLmRhdGEoJ19pZCcpIGFuZCB2YWx1ZSBpcyBmYWxzZVxuXG4gICAgICAgICAgaWYgdmFsdWVcbiAgICAgICAgICAgIE5vdGljZS5pIFwiI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gRW50cmllcyBwdWJsaXNoZWRcIiwgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgTm90aWNlLmkgXCIje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBFbnRyaWVzIGhpZGRlblwiLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgICBTcGlubmVyLmQoKVxuXG5cbiAgICAgIGVsc2VcbiAgICAgICAgTGlzdGluZy5vdGhlckFjdGlvbnModHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICBkZWxldGU6IChpZCx0eXBlPSdkZWxldGUnLGNhbGxiYWNrKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH1cIikpXG4gICAgXy5nZXQgXCIvYXBpLyN7TGlzdGluZy5jb250ZW50fS8je3R5cGV9LyN7aWR9XCJcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGNhbGxiYWNrIHRydWVcbiAgICAuZmFpbCAtPlxuICAgICAgY2FsbGJhY2sgZmFsc2VcblxuICBkZWxldGVTZWxlY3RlZDogKGN1cnNvcj0wLHR5cGU9J2RlbGV0ZScpIC0+XG5cbiAgICBpZiBMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aCBpcyBjdXJzb3JcbiAgICAgIGlmIHR5cGUgaXMgJ2RlbGV0ZSdcbiAgICAgICAgTm90aWNlLmkgJ0RlbGV0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICBpZiB0eXBlIGlzICdyZXN0b3JlJ1xuICAgICAgICBOb3RpY2UuaSAnUmVzdG9yZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICBpZiB0eXBlIGlzICdmb3JjZSdcbiAgICAgICAgTm90aWNlLmkgJ1Blcm1hbmVudGx5IGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICBMaXN0aW5nLnVuc2VsZWN0QWxsKClcbiAgICAgIEBsb2FkKClcblxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIExpc3RpbmcuZGVsZXRlIExpc3Rpbmcuc2VsZWN0ZWRbY3Vyc29yXSx0eXBlLCAocmVzdWx0KSAtPlxuICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCgrK2N1cnNvciwgdHlwZSkgaWYgcmVzdWx0IGlzIHRydWVcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH1cIikpXG5cbiAgICBvcHRpb25zID0gdmlldzogdHJ1ZVxuXG4gICAgb3B0aW9ucy5kZWxldGVkID0gdHJ1ZSBpZiBMaXN0aW5nLmRlbGV0ZWQgaXMgdHJ1ZVxuXG4gICAgZm9yIGZpbHRlciBpbiBAZmlsdGVyc1xuICAgICAgaWYgUXVlcnkucGFyYW0oZmlsdGVyKSBpc250IHVuZGVmaW5lZFxuICAgICAgICBvcHRpb25zW2ZpbHRlciArICcubmFtZSddID0gUXVlcnkucGFyYW0gZmlsdGVyXG4gICAgaWYgUXVlcnkucGFyYW0oJ3BhZ2UnKSBpc250IHVuZGVmaW5lZFxuICAgICAgb3B0aW9ucy5wYWdlID0gUXVlcnkucGFyYW0gJ3BhZ2UnXG5cbiAgICBfLmdldCBcIi9hcGkvI3tAY29udGVudH1cIiwgb3B0aW9uc1xuICAgIC5kb25lIChyZXNwb25zZSkgPT5cbiAgICAgIFRpbWUuaSgpXG4gICAgICBTcGlubmVyLmQoKVxuICAgICAgJCgnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMgPiAuY29weSA+IC52YWx1ZScpLnRleHQgcmVzcG9uc2UucGFnaW5hdGUudG90YWxcbiAgICAgICQoXCIuI3tAY29udGVudH0gPiAuY29udGVudCA+IC5saXN0aW5nID4gLmlubmVyXCIpLmh0bWwgcmVzcG9uc2Uudmlld1xuICAgICAgTGlzdGluZy5wYWdlTGlua3MoKVxuXG5cbiIsIiIsIk1lID1cblxuICBsb2dvdXQ6IChjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2F1dGgvbG9nb3V0J1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZSgpXG5cbiAgb2F1dGg6ICh0eXBlLCBwYXJhbXM9e30sIGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgXCIvYXBpL2F1dGgvI3t0eXBlfVwiLCBwYXJhbXNcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgY29tcGxldGUocmVzcG9uc2UuZGF0YS51cmkpXG5cbiAgYXV0aGVkOiAocmVzdWx0KSAtPlxuICAgIF8uZ2V0ICcvYXBpL2F1dGgnXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIHJlc3VsdCByZXNwb25zZS5kYXRhLnVzZXJcblxuICBnZXQ6XG4gICAgY2xpZW50SWQ6IC0+XG4gICAgICByZXR1cm4gVXNlci5jbGllbnQuaWRcbiIsIk5vdGZvdW5kID1cbiAgaTogLT5cbiAgICAkKCcjbGluZWVycm9yJykubm92YWNhbmN5XG4gICAgICAncmVibGlua1Byb2JhYmlsaXR5JzogMC4xXG4gICAgICAnYmxpbmtNaW4nOiAwLjJcbiAgICAgICdibGlua01heCc6IDAuNlxuICAgICAgJ2xvb3BNaW4nOiA4XG4gICAgICAnbG9vcE1heCc6IDEwXG4gICAgICAnY29sb3InOiAnI2ZmZmZmZidcbiAgICAgICdnbG93JzogWycwIDAgODBweCAjZmZmZmZmJywgJzAgMCAzMHB4ICMwMDgwMDAnLCAnMCAwIDZweCAjMDAwMGZmJ11cblxuICAgICQoJyNsaW5lY29kZScpLm5vdmFjYW5jeVxuICAgICAgJ2JsaW5rJzogMVxuICAgICAgJ29mZic6IDFcbiAgICAgICdjb2xvcic6ICdSZWQnXG4gICAgICAnZ2xvdyc6IFsnMCAwIDgwcHggUmVkJywgJzAgMCAzMHB4IEZpcmVCcmljaycsICcwIDAgNnB4IERhcmtSZWQnXVxuIiwiTm90aWNlID1cblxuICB0eXBlczogWydpbmZvJywnc3VjY2VzcycsJ3dhcm5pbmcnXVxuXG4gIGVsOiBmYWxzZVxuXG4gIG9uOiBmYWxzZVxuICBwcm9ncmVzczogZmFsc2VcbiAgdGltZW91dDogZmFsc2VcbiAgY2xvc2U6IHRydWVcblxuICBkZWZhdWx0OlxuICAgIHR5cGU6ICdpbmZvJ1xuICAgIHByb2dyZXNzOiBmYWxzZVxuICAgIHRpbWVvdXQ6IDUwMDBcblxuICBpOiAoY29weSxvcHRpb25zPXt9KSAtPlxuXG4gICAgQG9wdGlvbnMgPSBPYmplY3QuYXNzaWduIHt9LCBAZGVmYXVsdFxuXG4gICAgZm9yIGtleSwgcGFyYW0gb2Ygb3B0aW9uc1xuICAgICAgQG9wdGlvbnNba2V5XSA9IHBhcmFtXG5cbiAgICBAZWwgPSAkKCcubm90aWNlJykgaWYgQGVsIGlzIGZhbHNlXG5cbiAgICBmb3IgZHR5cGUgaW4gQHR5cGVzXG4gICAgICBAZWwucmVtb3ZlQ2xhc3MgZHR5cGVcbiAgICBAZWwuYWRkQ2xhc3MgQG9wdGlvbnMudHlwZVxuICAgIEBlbC5maW5kKCcuY29weSA+IC5tZXNzYWdlJykuaHRtbCBjb3B5XG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpc250IGZhbHNlXG4gICAgICBpZiBAcHJvZ3Jlc3MgaXMgZmFsc2VcbiAgICAgICAgXy5vbiBAZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgICAgIEBwcm9ncmVzcyA9IHRydWVcbiAgICAgIGlmIEBjbG9zZSBpcyB0cnVlXG4gICAgICAgIF8ub2ZmIEBlbC5maW5kKCcuY2xvc2UnKVxuICAgICAgICBAY2xvc2UgPSBmYWxzZVxuICAgICAgaWYgQG9uIGlzIGZhbHNlXG4gICAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgQG9wdGlvbnMucHJvZ3Jlc3MqMTAwICsgJyUnKVxuICAgICAgICAsIDEwMFxuICAgICAgZWxzZVxuICAgICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgQG9wdGlvbnMucHJvZ3Jlc3MqMTAwICsgJyUnKVxuXG4gICAgaWYgQG9wdGlvbnMucHJvZ3Jlc3MgaXMgZmFsc2UgYW5kIEBwcm9ncmVzcyBpcyB0cnVlXG4gICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgJzAlJylcbiAgICAgIF8ub2ZmIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgIEBwcm9ncmVzcyA9IGZhbHNlXG4gICAgICBfLm9uIEBlbC5maW5kKCcuY2xvc2UnKVxuICAgICAgQGNsb3NlID0gdHJ1ZVxuXG4gICAgaWYgQG9uIGlzIGZhbHNlXG4gICAgICBfLm9uIEBlbFxuICAgICAgQGhhbmRsZXJzLm9uKClcbiAgICAgIEBvbiA9IHRydWVcblxuICAgIGlmIEBvcHRpb25zLnRpbWVvdXQgaXNudCBmYWxzZSBhbmQgQG9wdGlvbnMucHJvZ3Jlc3MgaXMgZmFsc2VcbiAgICAgIEB0aW1lb3V0ID0gc2V0VGltZW91dCA9PlxuICAgICAgICBAZCgpXG4gICAgICAsIEBvcHRpb25zLnRpbWVvdXRcblxuICBoYW5kbGVyczpcbiAgICBvbjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLmNsb3NlID4gLmlubmVyJywgTm90aWNlLmRcbiAgICBvZmY6IC0+XG4gICAgICAkKCcubm90aWNlJykub2ZmICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuXG4gIGQ6IC0+XG4gICAgY2xlYXJUaW1lb3V0IE5vdGljZS50aW1lb3V0IGlmIE5vdGljZS50aW1lb3V0IGlzbnQgZmFsc2VcbiAgICBOb3RpY2UudGltZW91dCA9IGZhbHNlXG4gICAgTm90aWNlLmhhbmRsZXJzLm9mZigpXG4gICAgXy5vbiBOb3RpY2UuZWwuZmluZCgnLmNsb3NlJylcbiAgICBOb3RpY2UuY2xvc2UgPSB0cnVlXG4gICAgXy5vZmYgTm90aWNlLmVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgIE5vdGljZS5wcm9ncmVzcyA9IGZhbHNlXG4gICAgXy5vZmYgTm90aWNlLmVsLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuMlxuICAgIE5vdGljZS5vbiA9IGZhbHNlXG4iLCJQcm9tcHQgPVxuICBlbDoge31cbiAgb3B0aW9uczoge31cbiAgY2FsbGJhY2s6IGZhbHNlXG4gIHBhcmFtczoge31cblxuICBpOiAodGl0bGUsIGNvcHksIG9wdGlvbnM9WydPSyddLCBwYXJhbXMsIGNhbGxiYWNrKSAtPlxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gZmFsc2VcbiAgICBQcm9tcHQucGFyYW1zID0gZmFsc2VcblxuICAgIFByb21wdC5jYWxsYmFjayA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdmdW5jdGlvbidcbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBjYWxsYmFjayBpZiB0eXBlb2YgY2FsbGJhY2sgaXMgJ2Z1bmN0aW9uJ1xuXG4gICAgUHJvbXB0LnBhcmFtcyA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnXG5cbiAgICBQcm9tcHQuZWwgPSAkICcucHJvbXB0J1xuXG4gICAgUHJvbXB0LmVsLmZpbmQgJy50aXRsZSdcbiAgICAgIC5odG1sIHRpdGxlXG4gICAgICAuYXR0ciAndGl0bGUnLCB0aXRsZVxuICAgIFByb21wdC5lbC5maW5kICcuY29weSdcbiAgICAgIC5odG1sIGNvcHlcblxuICAgIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCcgYW5kICd0ZXh0YXJlYScgb2YgcGFyYW1zIGFuZCBwYXJhbXMudGV4dGFyZWEgaXMgdHJ1ZVxuICAgICAgXy5vbiBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhJ1xuICAgICAgUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsIHBhcmFtcy52YWx1ZVxuXG4gICAgaWYgdHlwZW9mIHBhcmFtcyBpcyAnb2JqZWN0JyBhbmQgJ2NsaXBib2FyZCcgb2YgcGFyYW1zIGFuZCBwYXJhbXMuY2xpcGJvYXJkIGlzIHRydWVcbiAgICAgIGlucHV0ID0gUHJvbXB0LmVsLmZpbmQgJy5pbnB1dCdcbiAgICAgIF8ub24gaW5wdXRcbiAgICAgIGlucHV0LmZpbmQoJ2lucHV0JykudmFsIHBhcmFtcy52YWx1ZVxuXG5cbiAgICBQcm9tcHQub3B0aW9ucyA9IFByb21wdC5lbC5maW5kICcub3B0aW9ucyA+IC5vcHRpb24nXG4gICAgXy5vZmYgUHJvbXB0Lm9wdGlvbnNcbiAgICBQcm9tcHQub3B0aW9ucy5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIFByb21wdC5vcHRpb25zLmZpcnN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcblxuICAgIGZvciBvLGkgaW4gb3B0aW9uc1xuICAgICAgb3B0aW9uID0gUHJvbXB0LmVsLmZpbmQgXCIub3B0aW9ucyAgPiAub3B0aW9uXyN7aSsxfVwiXG4gICAgICBfLm9uIG9wdGlvblxuICAgICAgb3B0aW9uLmh0bWwgb1xuICAgICAgICAuZGF0YSAndmFsdWUnLCBvXG5cbiAgICBfLm9uIFByb21wdC5lbCxcbiAgICBfLm9uICcuYmZhZGUnXG5cbiAgICBQcm9tcHQuaGFuZGxlcnMoKVxuICAgIFByb21wdC5vcHRpb25zLmZpcnN0KCkuZm9jdXMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoZG9jdW1lbnQpLmtleWRvd24gUHJvbXB0LmtleWRvd25cbiAgICBQcm9tcHQub3B0aW9ucy5vbiAnY2xpY2snLCBQcm9tcHQuY2xpY2tcbiAgICBQcm9tcHQuZWwuZmluZCgnLmlubmVyID4gLmNhbmNlbCcpLm9uICdjbGljaycsIFByb21wdC5jYW5jZWxcbiAgICBQcm9tcHQuZWwuZmluZCgnLmNsaXBib2FyZCcpLm9uICdjbGljaycsIFByb21wdC5jbGlwYm9hcmRcblxuXG4gIGNsaXBib2FyZDogLT5cbiAgICBQcm9tcHQuZWwuZmluZCgnLmlucHV0ID4gaW5wdXQnKS5zZWxlY3QoKVxuICAgIGlmIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5JylcbiAgICAgIE5vdGljZS5pICdDb3BpZWQgdG8gY2xpcGJvYXJkJywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgZWxzZVxuICAgICAgTm90aWNlLmkgJ1VuYWJsZSB0byBjbGlwYm9hcmQnLCB0eXBlOiAnd2FybmluZydcblxuICBrZXlkb3duOiAtPlxuICAgIGsgPSBldmVudC53aGljaFxuICAgIGtleXMgPSBbMzksIDksIDM3LCAxMywgMjddXG4gICAgcmV0dXJuIHRydWUgaWYgayBub3QgaW4ga2V5c1xuXG4gICAgY3VycmVudCA9IFByb21wdC5lbC5maW5kICcub3B0aW9uLm9uLmFjdGl2ZSdcbiAgICBzaGlmdCA9IHdpbmRvdy5ldmVudC5zaGlmdEtleVxuXG4gICAgaWYgayBpcyAzOSBvciAoayBpcyA5IGFuZCAhc2hpZnQpXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBpZiBjdXJyZW50Lm5leHQoKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIGN1cnJlbnQubmV4dCgpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBlbHNlXG4gICAgICAgIFByb21wdC5lbC5maW5kKCcub3B0aW9uXzEnKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICBpZiBrIGlzIDM3IG9yIChrIGlzIDkgYW5kIHNoaWZ0KVxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgaWYgY3VycmVudC5wcmV2KCkuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBjdXJyZW50LnByZXYoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgZWxzZVxuICAgICAgICBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbi5vbicpLmxhc3QoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICBpZiBrIGlzIDEzXG4gICAgICBQcm9tcHQudHJpZ2dlciBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbi5hY3RpdmUnKS5kYXRhICd2YWx1ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIGlmIGsgaXMgMjdcbiAgICAgIFByb21wdC50cmlnZ2VyKGZhbHNlKVxuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgY2FuY2VsOiAtPlxuICAgIFByb21wdC50cmlnZ2VyIGZhbHNlXG5cbiAgY2xpY2s6IC0+XG4gICAgUHJvbXB0LnRyaWdnZXIgJCh0aGlzKS5kYXRhICd2YWx1ZSdcblxuICB0cmlnZ2VyOiAodmFsdWUpIC0+XG4gICAgXy5vZmYgUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICBfLm9mZiBQcm9tcHQuZWwsIG9mZmluZzogZmFsc2UsIG9mZnRpbWU6IDAuMlxuICAgICNfLm9mZiAnLmJmYWRlJywgb2ZmaW5nOiBmYWxzZSwgb2ZmaXRtZTogMC4yXG4gICAgXy5vZmYgJy5iZmFkZSdcbiAgICBQcm9tcHQub3B0aW9ucy51bmJpbmQgJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgJChkb2N1bWVudCkudW5iaW5kICdrZXlkb3duJywgUHJvbXB0LmtleWRvd25cbiAgICBpZiBQcm9tcHQucGFyYW1zLnRleHRhcmVhXG4gICAgICB2YWwgPSBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhID4gdGV4dGFyZWEnXG4gICAgICAgIC52YWwoKVxuICAgICAgUHJvbXB0LmNhbGxiYWNrPyByZXNwb25zZTogdmFsdWUsIHZhbDogdmFsXG4gICAgZWxzZVxuICAgICAgUHJvbXB0LmNhbGxiYWNrPyB2YWx1ZVxuIiwiUXVlcnkgPVxuXG4gIGdldFF1ZXJ5OiAtPlxuICAgIHJldHVybiBsb2NhdGlvbi5zZWFyY2guc2xpY2UoMSlcblxuICBzZXRRdWVyeTogKHBhcmFtcykgLT5cbiAgICBxdWVyeSA9IHFzLnN0cmluZ2lmeSBwYXJhbXNcbiAgICBpZiBxdWVyeSBpcyB1bmRlZmluZWQgb3IgcXVlcnkgaXMgJydcbiAgICAgIGhpc3RvcnkucHVzaFN0YXRlIG51bGwsIG51bGwsIGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaGlzdG9yeS5wdXNoU3RhdGUgbnVsbCwgbnVsbCwgbG9jYXRpb24ucGF0aG5hbWUgKyAnPycgKyBxdWVyeVxuICAgIFxuICBwYXJhbTogKGtleSwgdmFsdWUpIC0+XG5cbiAgICBxdWVyeSA9IEBnZXRRdWVyeSgpXG5cbiAgICBwYXJhbXMgPSBxcy5wYXJzZSBxdWVyeVxuXG4gICAgcmV0dXJuIHBhcmFtc1trZXldIGlmIHZhbHVlIGlzIHVuZGVmaW5lZFxuXG4gICAgaWYgdmFsdWUgaXMgZmFsc2VcbiAgICAgIGRlbGV0ZSBwYXJhbXNba2V5XVxuICAgIGVsc2VcbiAgICAgIHBhcmFtc1trZXldID0gdmFsdWVcbiAgICBAc2V0UXVlcnkgcGFyYW1zXG5cbiAgcGFyYW1zOiAtPlxuICAgIHJldHVybiBxcy5wYXJzZSBAZ2V0UXVlcnkoKVxuXG4gIHN0cmluZ2lmeTogKHBhcmFtcykgLT5cbiAgICByZXR1cm4gcXMuc3RyaW5naWZ5IHBhcmFtc1xuXG4iLCJTZWFyY2ggPVxuXG4gIGk6IC0+XG5cbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgY29uc29sZS5sb2cgJ2hhbmRsZXJzIGZpcmVkJ1xuXG4gICAgJCgnLmxpc3RpbmcnKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyJywgU2VhcmNoLmNhbmNlbEhhbmRsZXJcblxuICBjYW5jZWxIYW5kZXI6IC0+XG4gICAgY29uc29sZS5sb2cgJ2NhbmNlbEhlYWRlciBoYW5kbGVyJ1xuICAgICQoJy5saXN0LWhlYWRlciA+IC5zZWFyY2ggPiBpbnB1dCcpLnZhbCAnJ1xuXG5cbiIsIlNlbGVjdGl6ZSA9XG5cbiAgY2xpZW50czogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0Q2xpZW50ID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIENsaWVudCBcIlxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PiN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS9jbGllbnRzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RDbGllbnQuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0Q2xpZW50XG5cbiAgc3RydWN0dXJlczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG5cbiAgICBzZWxlY3RTdHJ1Y3R1cmUgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIGEgU3RydWN0dXJlICAgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgb3Blbk9uRm9jdXM6IHRydWVcbiAgICAgIG9uTG9hZDogRW50cnkuc3RydWN0dXJlU3BlY2lmaWVkXG4gICAgICByZW5kZXI6XG4gICAgICAgIGl0ZW06IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj48aW1nIGNsYXNzPVxcXCJwcm9maWxlXFxcIiBzcmM9XFxcIiN7aXRlbS5jbGllbnRQcm9maWxlfVxcXCIvPiAje2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj48aW1nIGNsYXNzPVxcXCJwcm9maWxlXFxcIiBzcmM9XFxcIiN7aXRlbS5jbGllbnRQcm9maWxlfVxcXCIvPiAje2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lLCBjbGllbnROYW1lOiBpdGVtLmNsaWVudC5uYW1lLCBjbGllbnRQcm9maWxlOiBpdGVtLmNsaWVudC5wcm9maWxlXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0U3RydWN0dXJlLmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdFN0cnVjdHVyZVxuXG4gIHVzZXJzOiAoZWxlbWVudCwgaGFuZGxlciwgb3B0aW9ucykgLT5cbiAgICBzZWxlY3RVc2VyID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsdWdpbnM6IFsncmVtb3ZlX2J1dHRvbiddXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXYgc3R5bGU9J2xpbmUtaGVpZ2h0OiAzMHB4Oyc+I3tpdGVtLm5hbWV9ICgje2l0ZW0uZW1haWx9KSA8aW1nIHNyYz0nI3tpdGVtLnBpY3R1cmV9JyBzdHlsZT0nZmxvYXQ6IGxlZnQ7IHdpZHRoOiAzMHB4OyBoZWlnaHQ6IDMwcHg7IG1hcmdpbi1yaWdodDogMTBweDsnIC8+PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL3VzZXJzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWUsIGVtYWlsOiBpdGVtLmVtYWlsLCBwaWN0dXJlOiBpdGVtLnBpY3R1cmVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RVc2VyLmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdFVzZXJcblxuXG4iLCJcblNwaW5uZXIgPVxuXG4gIHN0YXRlOiBmYWxzZVxuXG4gIGVsOiB7fVxuXG4gIGk6IChlbCwgb3ZlcnJpZGUpIC0+XG5cbiAgICBAZWwgPSAkKCcuc3Bpbm5lcicpXG5cbiAgICByZWN0ID0gZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGNvb3JkcyA9XG4gICAgICB0b3A6IFwiI3tyZWN0LnRvcCArICQod2luZG93KS5zY3JvbGxUb3AoKX1weFwiXG4gICAgICBsZWZ0OiBcIiN7cmVjdC5sZWZ0fXB4XCJcbiAgICAgIHdpZHRoOiBcIiN7cmVjdC53aWR0aH1weFwiXG4gICAgICBoZWlnaHQ6IFwiI3tyZWN0LmhlaWdodH1weFwiXG5cbiAgICBpZiBvdmVycmlkZSBpc250IHVuZGVmaW5lZFxuICAgICAgZm9yIGtleSwgY29vcmQgb2Ygb3ZlcnJpZGVcbiAgICAgICAgY29vcmRzW2tleV0gPSBjb29yZFxuXG4gICAgQGVsLmNzcyBjb29yZHNcblxuICAgIF8ub24gQGVsXG4gICAgQHN0YXRlID0gdHJ1ZVxuXG4gIGQ6IC0+XG4gICAgXy5vZmYgQGVsXG4gICAgQHN0YXRlID0gZmFsc2VcbiIsIlN0cnVjdHVyZSA9XG5cbiAgdGVtcGxhdGU6IGZhbHNlXG4gIF9pZDogZmFsc2VcblxuICBjbGllbnRTZWxlY3Q6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEB0ZW1wbGF0ZSA9ICQoJy5tb2RpZnkgPiAjdGVtcGxhdGUnKS5odG1sKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgQGNsaWVudFNlbGVjdCA9IFNlbGVjdGl6ZS5jbGllbnRzICQoJy5wYWdlLnN0cnVjdHVyZSA+IC5tb2RpZnkgPiAuZGV0YWlsLmNsaWVudCA+IC5pbnB1dCA+IHNlbGVjdCcpLFxuICAgICAgQGNsaWVudFNlbGVjdGhhbmRsZXJcblxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL3N0cnVjdHVyZXNcXC8oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEBfaWQgPSBtYXRjaFsxXVxuICAgICAgQGxvYWQgQF9pZFxuICAgICAgXy5vbiAnLm1vZGlmeSA+IC5zdWJtaXQgPiAuY3RhJ1xuICAgIGVsc2VcbiAgICAgIEBlbnRpdHlBZGQoKVxuICAgICAgXy5vZmYgJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCdcblxuICAgIEBjbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLmZvY3VzKCkgaWYgQF9pZCBpcyBmYWxzZVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5tb3JlJykuY2xpY2sgQGVudGl0eUFkZEhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzJykub24gJ2NsaWNrJywnLmVudGl0eSA+IC5yZW1vdmUnLCBAZW50aXR5UmVtb3ZlSGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YXAnKS5jbGljayBAc3VibWl0SGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YScpLmNsaWNrIEBuZXdFbnRyeUhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLmNsaWVudEFjY2VzcyA+IC5zd2l0Y2gnKS5vbiAnY2xpY2snLCBAY2hlY2tib3hIYW5kbGVyXG5cbiAgY2hlY2tib3hIYW5kbGVyOiAtPlxuICAgIF8uc3dhcCB0aGlzXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5zdHJ1Y3R1cmUnKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMvJyxcbiAgICAgIF9pZDogQF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvc3RydWN0dXJlcy9uZXcnIGlmIHJlc3BvbnNlLmRhdGEubGVuZ3RoIDwgMVxuICAgICAgc3RydWN0dXJlID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwgc3RydWN0dXJlLm5hbWVcblxuICAgICAgaWYgc3RydWN0dXJlLmNsaWVudEFjY2VzcyBpcyB0cnVlXG4gICAgICAgIF8ub24gJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCdcbiAgICAgIGVsc2VcbiAgICAgICAgXy5vZmYgJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCdcblxuICAgICAgZm9yIGksIGVudGl0eSBvZiBzdHJ1Y3R1cmUuZW50aXRpZXNcbiAgICAgICAgU3RydWN0dXJlLmVudGl0eUFkZCBmYWxzZSwgZW50aXR5XG5cbiAgICAgIFN0cnVjdHVyZS5jbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLmFkZE9wdGlvblxuICAgICAgICBpZDogc3RydWN0dXJlLmNsaWVudC5pZCwgbmFtZTogc3RydWN0dXJlLmNsaWVudC5uYW1lXG4gICAgICBTdHJ1Y3R1cmUuY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBzdHJ1Y3R1cmUuY2xpZW50LmlkXG5cblxuXG4gIGVudGl0eUFkZEhhbmRsZXI6IC0+XG4gICAgU3RydWN0dXJlLmVudGl0eUFkZCh0cnVlKVxuXG4gIGVudGl0eVJlbW92ZUhhbmRsZXI6IC0+XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKVxuXG4gIGVudGl0eUFkZDogKGZvY3VzPWZhbHNlLCBlbnRpdHk9ZmFsc2UpIC0+XG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHknKS5hcHBlbmQgQHRlbXBsYXRlXG5cbiAgICBpZiBlbnRpdHkgaXNudCBmYWxzZVxuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gaW5wdXQnKS52YWwoZW50aXR5Lm5hbWUpXG4gICAgICBAc2VsZWN0aXplICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpLCBlbnRpdHkudHlwZVxuICAgIGVsc2VcbiAgICAgIEBzZWxlY3RpemUgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gc2VsZWN0JylcblxuICAgIGlmICBmb2N1c1xuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eSA+IC5pbnB1dC5zZWxlY3RpemUtaW5wdXQgaW5wdXQnKS5sYXN0KCkuZm9jdXMoKVxuXG4gIHNlbGVjdGl6ZTogKGVsLCB2YWx1ZT1mYWxzZSkgLT5cbiAgICBpemVkID0gZWwuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJUeXBlXCJcblxuICAgIGl6ZWRbMF0uc2VsZWN0aXplLnNldFZhbHVlIHZhbHVlXG5cbiAgc3VibWl0SGFuZGxlcjogLT5cblxuICAgIHN0cnVjdHVyZSA9IHt9XG4gICAgc3RydWN0dXJlLmVudGl0aWVzID0ge31cbiAgICBzdHJ1Y3R1cmUuY2xpZW50ID0gJCgnLm1vZGlmeSA+IC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5uYW1lID0gJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5jbGllbnRBY2Nlc3MgPSAkKCcubW9kaWZ5ID4gLmNsaWVudEFjY2VzcyA+IC5zd2l0Y2gnKS5oYXNDbGFzcyAnb24nXG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5JykuZWFjaCAoaSwgZWwpIC0+XG5cbiAgICAgIG5hbWUgPSAkKGVsKS5maW5kKCcuaW5wdXQgPiBpbnB1dCcpLnZhbCgpXG4gICAgICB0eXBlID0gJChlbCkuZmluZCgnLmlucHV0ID4gc2VsZWN0JykudmFsKClcblxuICAgICAgc3RydWN0dXJlLmVudGl0aWVzW25hbWVdID1cbiAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB0eXBlOiB0eXBlXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgY29uc29sZS5sb2cgc3RydWN0dXJlLmVudGl0aWVzXG4gICAgICBTdHJ1Y3R1cmUubW9kaWZ5IHN0cnVjdHVyZVxuXG4gIG5ld0VudHJ5SGFuZGxlcjogLT5cbiAgICBsb2NhdGlvbi5ocmVmID0gXCIvZW50cmllcy9uZXcjc3RydWN0dXJlPSN7U3RydWN0dXJlLl9pZH1cIlxuXG4gIG1vZGlmeTogKHN0cnVjdHVyZSkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5zdHJ1Y3R1cmUnKSlcblxuICAgIGNhbGwgPSAnL2FwaS9zdHJ1Y3R1cmVzL2FkZCdcbiAgICBpZiBTdHJ1Y3R1cmUuX2lkIGlzbnQgZmFsc2VcbiAgICAgIGNhbGwgPSBcIi9hcGkvc3RydWN0dXJlcy91cGRhdGUvI3tTdHJ1Y3R1cmUuX2lkfVwiXG5cbiAgICBfLmdldCBjYWxsLCBzdHJ1Y3R1cmVcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsICdzdWNjZXNzJ1xuICAgICAgICBfLm9uICcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnXG4gICAgICAgIGlmIFN0cnVjdHVyZS5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9zdHJ1Y3R1cmVzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgU3RydWN0dXJlLl9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4iLCJTdHJ1Y3R1cmVzID1cbiAgaTogLT5cbiAgICBMaXN0aW5nLmkgJ3N0cnVjdHVyZXMnLCBmYWxzZSwgWydjbGllbnQnXVxuXG4iLCJVc2VycyA9XG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICd1c2VycydcbiJdfQ==
