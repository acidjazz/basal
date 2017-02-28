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
    console.log(event);
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
      Notice.i(response.data.status, 'success');
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
          type: 'success'
        });
        Client.profile = result.data.url;
        return callback(result);
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
    "url": "http://basal.dev:3000",
    "timezone": "UTC",
    "locale": "en",
    "fallback_locale": "en",
    "key": "base64:QYpzRq+ob5uLcUbtemS+jaTN6gbQPS6WX/pZN97bT9g=",
    "cipher": "AES-256-CBC",
    "log": "single",
    "log_level": "debug",
    "providers": ["Illuminate\\Auth\\AuthServiceProvider", "Illuminate\\Broadcasting\\BroadcastServiceProvider", "Illuminate\\Bus\\BusServiceProvider", "Illuminate\\Cache\\CacheServiceProvider", "Illuminate\\Foundation\\Providers\\ConsoleSupportServiceProvider", "Illuminate\\Cookie\\CookieServiceProvider", "Illuminate\\Database\\DatabaseServiceProvider", "Illuminate\\Encryption\\EncryptionServiceProvider", "Illuminate\\Filesystem\\FilesystemServiceProvider", "Illuminate\\Foundation\\Providers\\FoundationServiceProvider", "Illuminate\\Hashing\\HashServiceProvider", "Illuminate\\Mail\\MailServiceProvider", "Illuminate\\Notifications\\NotificationServiceProvider", "Illuminate\\Pagination\\PaginationServiceProvider", "Illuminate\\Pipeline\\PipelineServiceProvider", "Illuminate\\Queue\\QueueServiceProvider", "Illuminate\\Redis\\RedisServiceProvider", "Illuminate\\Auth\\Passwords\\PasswordResetServiceProvider", "Illuminate\\Session\\SessionServiceProvider", "Illuminate\\Translation\\TranslationServiceProvider", "Illuminate\\Validation\\ValidationServiceProvider", "Illuminate\\View\\ViewServiceProvider", "Laravel\\Tinker\\TinkerServiceProvider", "Jenssegers\\Mongodb\\MongodbServiceProvider", "Larjectus\\ServiceProvider", "Larpug\\ServiceProvider", "App\\Providers\\AppServiceProvider", "App\\Providers\\AuthServiceProvider", "App\\Providers\\EventServiceProvider", "App\\Providers\\RouteServiceProvider"],
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
  "auth": {
    "defaults": {
      "guard": "web",
      "passwords": "users"
    },
    "guards": {
      "web": {
        "driver": "session",
        "provider": "users"
      },
      "api": {
        "driver": "token",
        "provider": "users"
      }
    },
    "providers": {
      "users": {
        "driver": "eloquent",
        "model": "App\\User"
      }
    },
    "passwords": {
      "users": {
        "provider": "users",
        "table": "password_resets",
        "expire": 60
      }
    }
  },
  "broadcasting": {
    "default": "log",
    "connections": {
      "pusher": {
        "driver": "pusher",
        "key": null,
        "secret": null,
        "app_id": null,
        "options": []
      },
      "redis": {
        "driver": "redis",
        "connection": "default"
      },
      "log": {
        "driver": "log"
      },
      "null": {
        "driver": "null"
      }
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
      console.log('always');
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
        Notice.i('Logout Successful', 'success');
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
    Notice.i('Login Successful', 'success');
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
      if (Global.init !== false && result !== false) {
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
        _.on(".listing > .list-header > .state_actions > .actions > .action_" + Listing.content);
      } else {
        _.on('.listing > .list-header > .state_stats');
        _.off('.listing > .list-header > .state_actions');
        _.off(".listing > .list-header > .state_actions > .actions > .action_" + Listing.content);
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
        return Prompt.i("Deleting " + Listing.selected.length + " items(s)", 'This feature is currently in development', ['OK'], function(response) {});

        /*
        Prompt.i "Deleting #{Listing.selected.length} items(s)",
          'Are you sure you want to delete these?', ['Yes','No'], (response) ->
            return true if response isnt 'Yes'
            Listing.deleteSelected()
         */
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
  "delete": function(id, callback) {

    /*
    Spinner.i($(".listing.#{Listing.content}"))
    _.get "/api/#{Listing.content}/delete/#{id}"
    .always ->
      Spinner.d()
    .done (response) ->
      callback true
    .fail ->
      callback false
     */
  },
  deleteSelected: function(cursor) {
    if (cursor == null) {
      cursor = 0;
    }
    if (Listing.selected.length === cursor) {
      Notice.i('Structure(s) deleted successfully', {
        type: 'success'
      });
      this.load();
      return true;
    }
    return Listing["delete"](Listing.selected[cursor], function(result) {
      if (result === true) {
        return Listing.deleteSelected(++cursor);
      }
    });
  },
  load: function() {
    var filter, j, len, options, ref;
    Spinner.i($(".listing." + Listing.content));
    options = {
      view: true
    };
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
    Prompt.el.find('.title').html(title);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJmaWx0ZXIuY29mZmVlIiwiZ2xvYmFsLmNvZmZlZSIsImluZGV4LmNvZmZlZSIsImludml0ZS5jb2ZmZWUiLCJsaXN0aW5nLmNvZmZlZSIsIm1haW4uY29mZmVlIiwibWUuY29mZmVlIiwibm90Zm91bmQuY29mZmVlIiwibm90aWNlLmNvZmZlZSIsInByb21wdC5jb2ZmZWUiLCJxdWVyeS5jb2ZmZWUiLCJzZWxlY3RpemUuY29mZmVlIiwic3Bpbm5lci5jb2ZmZWUiLCJzdHJ1Y3R1cmUuY29mZmVlIiwic3RydWN0dXJlcy5jb2ZmZWUiLCJ1c2Vycy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFBO0VBQUE7O0FBQUEsQ0FBQSxHQUVFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxJQUFDLENBQUEsT0FBRCxHQUFXLFdBQUEsQ0FBWSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxJQUFiLENBQVosRUFBNkIsR0FBN0I7RUFEVixDQUFIO0VBR0EsQ0FBQSxFQUNFO0lBQUEsTUFBQSxFQUFRLEtBQVI7SUFDQSxPQUFBLEVBQVMsQ0FEVDtHQUpGO0VBT0EsSUFBQSxFQUFNLFNBQUMsRUFBRCxFQUFLLE1BQUwsRUFBbUIsR0FBbkI7O01BQUssU0FBTzs7O01BQU8sTUFBSTs7SUFFM0IsSUFBRyxDQUFBLENBQUEsRUFBQSxZQUFrQixNQUFsQixDQUFIO01BQ0UsRUFBQSxHQUFLLENBQUEsQ0FBRSxFQUFGLEVBRFA7O0lBR0EsSUFBRyxNQUFBLEtBQVksS0FBZjtNQUNFLEVBQUUsQ0FBQyxXQUFILENBQWUsTUFBZixFQURGOztJQUdBLElBQUcsR0FBQSxLQUFTLEtB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Q0FBUixDQUFVLENBQUEsQ0FBRSxpQkFBRixDQUFWO0lBRUEsSUFBQSxHQUFPO0lBQ1AsSUFBRyxTQUFTLENBQUMsR0FBVixLQUFtQixLQUF0QjtNQUNFLElBQUEsR0FBTyx5QkFBQSxHQUEwQixTQUFTLENBQUMsSUFEN0M7O1dBR0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxJQUFOLEVBQVksU0FBWixDQUNFLENBQUMsTUFESCxDQUNVLFNBQUE7YUFDTixPQUFPLENBQUMsQ0FBUixDQUFBO0lBRE0sQ0FEVixDQUdFLENBQUMsSUFISCxDQUdRLFNBQUMsUUFBRDtNQUNKLE1BQU0sQ0FBQyxDQUFQLENBQVMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUF2QixFQUErQixTQUEvQjtNQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssMEJBQUw7TUFDQSxJQUFHLFNBQVMsQ0FBQyxHQUFWLEtBQWlCLEtBQXBCO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFmLENBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLEVBQWlDLGNBQUEsR0FBZSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQTlELEVBREY7O2FBRUEsU0FBUyxDQUFDLEdBQVYsR0FBZ0IsUUFBUSxDQUFDLElBQUksQ0FBQztJQUwxQixDQUhSO0VBUk0sQ0EvR1I7OztBQ0ZGLElBQUE7O0FBQUEsVUFBQSxHQUNFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxPQUFPLENBQUMsQ0FBUixDQUFVLFlBQVYsRUFBd0IsS0FBeEIsRUFBK0IsQ0FBQyxRQUFELENBQS9CO0VBREMsQ0FBSDs7O0FDREYsSUFBQTs7QUFBQSxLQUFBLEdBQ0U7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELE9BQU8sQ0FBQyxDQUFSLENBQVUsT0FBVjtFQURDLENBQUgiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgcmFuZ2U6IChzdGFydCwgZW5kKSAtPlxuICAgIHJlc3VsdCA9IFtdXG4gICAgZm9yIG51bSBpbiBbc3RhcnQuLmVuZF1cbiAgICAgIHJlc3VsdC5wdXNoIG51bVxuICAgIHJlc3VsdFxuXG4gIGZpdDogKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIC0+XG4gICAgcmF0aW8gPSBNYXRoLm1pbihtYXhXaWR0aCAvIHNyY1dpZHRoLCBtYXhIZWlnaHQgLyBzcmNIZWlnaHQpXG4gICAgd2lkdGg6IHNyY1dpZHRoKnJhdGlvLCBoZWlnaHQ6IHNyY0hlaWdodCpyYXRpb1xuXG4gIGppbml0OiAtPlxuICAgICQuYWpheFNldHVwXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCJcblxuICBwYXRjaDogKHVybCwgZGF0YSkgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqcGF0Y2ggPSAkLmFqYXhcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgICB0eXBlOiAnUEFUQ0gnXG5cbiAgICBqcGF0Y2guZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpnZXQgPSAkLmdldCBhcmdzLi4uXG5cbiAgICBqZ2V0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqZ2V0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4gamdldFxuXG4gIHBvc3Q6IChhcmdzLi4uKSAtPlxuXG4gICAganBvc3QgPSAkLnBvc3QgYXJncy4uLlxuXG4gICAganBvc3QuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpwb3N0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBvc3RcblxuICBmYWlsOiAocmVzcG9uc2UpIC0+XG5cbiAgICBlcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTj8uZXJyb3JzP1swXVxuICAgIGlmIGVycm9yIGlzIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIFByb21wdC5pIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dFxuXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwczovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuICBtZXRob2RzOiAob2JqKSAtPlxuICAgIHJlcyA9IFtdXG4gICAgZm9yIGksbSBvZiBvYmpcbiAgICAgIGlmIHR5cGVvZiBtIGlzICdmdW5jdGlvbidcbiAgICAgICAgcmVzLnB1c2ggbVxuICAgIHJldHVybiByZXNcblxuXy5pKClcbiIsIlRpbWUgPVxuICBpbnRlcnZhbDogZmFsc2VcbiAgZ2FwOiAxMDAwXG5cbiAgaTogLT5cbiAgICBAaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChAc2NyYXBlLCBAZ2FhKSBpZiBAaW50ZXJ2YWwgaXMgZmFsc2VcbiAgICBAc2NyYXBlKClcblxuICBzY3JhcGU6IC0+XG4gICAgJCgndGltZScpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgamVsID0gJCBlbFxuICAgICAgamVsLmh0bWwgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5mcm9tTm93KClcbiAgICAgIGplbC5hdHRyICdhcmlhLWxhYmVsJywgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5jYWxlbmRhcigpXG4iLCJDbGllbnQgPVxuXG4gIHNlbGVjdFVzZXI6IGZhbHNlXG4gIF9pZDogZmFsc2VcbiAgY3JvcDogZmFsc2VcbiAgcHJvZmlsZTogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQGhhbmRsZXJzKClcbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9jbGllbnRzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcblxuICAgIEBzZWxlY3RVc2VyID0gU2VsZWN0aXplLnVzZXJzICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JyksIEBzZWxlY3RVc2VySGFuZGxlciwgbWU6IGZhbHNlXG5cbiAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQgPiBpbnB1dCcpLmZvY3VzKClcbiBcbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLnN1Ym1pdCcpLmNsaWNrIEBtb2RpZnlIYW5kbGVyXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ292ZXInLCBAZHJhZ292ZXJcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2xlYXZlJywgQGRyYWdsZWF2ZVxuICAgICQoZG9jdW1lbnQpLm9uICdkcmFnZW50ZXIgZHJhZ292ZXInLCBAY2FuY2VsXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJvcCBkcmFnZHJvcCcsIEBkcm9wXG5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhJykub24gJ2NsaWNrJywgQGNob29zZUZpbGVcbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dDpmaWxlJykuY2hhbmdlIEBjaGFuZ2VcblxuICBjYW5jZWw6IC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gIGRyYWdvdmVyOiAtPlxuICAgIGNvbnNvbGUubG9nIGV2ZW50XG4gICAgXy5vbiAnLmlucHV0LWltYWdlJ1xuXG4gIGRyYWdsZWF2ZTogLT5cbiAgICBfLm9mZiAnLmlucHV0LWltYWdlJ1xuXG4gIGRyb3A6IChlKSAtPlxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIF8ub2ZmICcuaW5wdXQtaW1hZ2UnXG5cbiAgICBpZiBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyIGFuZCBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aFxuICAgICAgZmlsZXMgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzXG5cbiAgICBDbGllbnQuY3JvcHBpZSBmaWxlc1swXVxuXG4gIGNoYW5nZTogLT5cbiAgICBpZiAkKHRoaXMpWzBdLmZpbGVzXG4gICAgICBmaWxlcyA9ICQodGhpcylbMF0uZmlsZXNcbiAgICBDbGllbnQuY3JvcHBpZSBmaWxlc1swXVxuXG4gIGNob29zZUZpbGU6IC0+XG4gICAgJCgnLmlucHV0LWltYWdlID4gaW5wdXQnKS50cmlnZ2VyICdjbGljaydcblxuICBjcm9wcGllOiAoZmlsZSkgLT5cbiAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLm9ubG9hZGVuZCA9IC0+XG5cbiAgICAgIGlmIENsaWVudC5jcm9wIGlzbnQgZmFsc2VcbiAgICAgICAgQ2xpZW50LmNyb3AuY3JvcHBpZSAnZGVzdHJveSdcbiAgICAgICAgQ2xpZW50LmNyb3AgPSBmYWxzZVxuXG4gICAgICBDbGllbnQuY3JvcCA9ICQoJy5pbnB1dC1pbWFnZSA+IC5jcm9wcGllJykuY3JvcHBpZVxuICAgICAgICB1cmw6IHJlYWRlci5yZXN1bHRcbiAgICAgICAgZW5mb3JjZUJvdW5kYXJ5OiBmYWxzZVxuICAgICAgICB2aWV3cG9ydDpcbiAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgaGVpZ2h0OiAyMDBcbiAgICAgICAgYm91bmRhcnk6XG4gICAgICAgICAgd2lkdGg6IDMwMFxuICAgICAgICAgIGhlaWdodDogMzAwXG5cbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTCBmaWxlXG5cbiAgc2VsZWN0VXNlckhhbmRsZXI6IC0+XG5cbiAgbW9kaWZ5SGFuZGxlcjogLT5cblxuICAgIGlmIENsaWVudC5jcm9wIGlzbnQgZmFsc2VcbiAgICAgIENsaWVudC5jcm9wLmNyb3BwaWUgJ3Jlc3VsdCcsXG4gICAgICAgIHR5cGU6ICdjYW52YXMnXG4gICAgICAgIGZvcm1hdDogJ2pwZWcnXG4gICAgICAudGhlbiAocmVzcG9uc2UpIC0+XG4gICAgICAgIENsaWVudC5pbWFnZVVwbG9hZCBDbGllbnQuZGF0YVVSSXRvQmxvYihyZXNwb25zZSksIC0+XG4gICAgICAgICAgQ2xpZW50Lm1vZGlmeSgpXG4gICAgZWxzZVxuICAgICAgQ2xpZW50Lm1vZGlmeSgpXG5cbiAgbW9kaWZ5OiAtPlxuXG4gICAgbmFtZSA9ICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1uYW1lID4gaW5wdXQnKS52YWwoKVxuICAgIHVzZXJzID0gJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LXVzZXJzID4gaW5wdXQnKS52YWwoKS5zcGxpdCAnLCdcblxuICAgIGNhbGwgPSAnL2FwaS9jbGllbnRzL2FkZCdcbiAgICBpZiBDbGllbnQuX2lkIGlzbnQgZmFsc2VcbiAgICAgIGNhbGwgPSBcIi9hcGkvY2xpZW50cy91cGRhdGUvI3tDbGllbnQuX2lkfVwiXG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuY2xpZW50JykpXG5cbiAgICBfLmdldCBjYWxsLCBuYW1lOiBuYW1lLCB1c2VyczogdXNlcnMsIHByb2ZpbGU6IENsaWVudC5wcm9maWxlXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pIHJlc3BvbnNlLmRhdGEuc3RhdHVzLCAnc3VjY2VzcydcbiAgICAgICAgaWYgQ2xpZW50Ll9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL2NsaWVudHMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBDbGllbnQuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiAgICAgICAgaWYgQ2xpZW50LnByb2ZpbGVcbiAgICAgICAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtaW1hZ2UgPiAucGljdHVyZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCcje0NsaWVudC5wcm9maWxlfScpXCJcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudCcpKVxuXG4gICAgXy5nZXQgJy9hcGkvY2xpZW50cy8nLFxuICAgICAgX2lkOiBAX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy9jbGllbnRzL25ldycgaWYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPCAxXG4gICAgICBjbGllbnQgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtbmFtZSA+IGlucHV0JykudmFsIGNsaWVudC5uYW1lXG4gICAgICBpZiBjbGllbnQucHJvZmlsZVxuICAgICAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtaW1hZ2UgPiAucGljdHVyZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCcje2NsaWVudC5wcm9maWxlfScpXCJcbiAgICAgICAgQ2xpZW50LnByb2ZpbGUgPSBjbGllbnQucHJvZmlsZVxuICAgICAgZm9yIGluZGV4LCB1c2VyIG9mIGNsaWVudC51c2Vyc1xuICAgICAgICBpZiB1c2VyLmlkIGlzbnQgVXNlci5faWRcbiAgICAgICAgICBDbGllbnQuc2VsZWN0VXNlclswXS5zZWxlY3RpemUuYWRkT3B0aW9uIGlkOiB1c2VyLmlkLCBuYW1lOiBcIiN7dXNlci5uYW1lfSAoI3t1c2VyLmVtYWlsfSlcIlxuICAgICAgICAgIENsaWVudC5zZWxlY3RVc2VyWzBdLnNlbGVjdGl6ZS5hZGRJdGVtIHVzZXIuaWRcblxuXG4gIGRhdGFVUkl0b0Jsb2I6IChkYXRhVVJJKSAtPlxuICAgIGJ5dGVTdHJpbmcgPSB1bmRlZmluZWRcbiAgICBpZiBkYXRhVVJJLnNwbGl0KCcsJylbMF0uaW5kZXhPZignYmFzZTY0JykgPj0gMFxuICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKVxuICAgIGVsc2VcbiAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZShkYXRhVVJJLnNwbGl0KCcsJylbMV0pXG4gICAgIyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF1cbiAgICAjIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKVxuICAgIGkgPSAwXG4gICAgd2hpbGUgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoXG4gICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKVxuICAgICAgaSsrXG4gICAgbmV3IEJsb2IoWyBpYSBdLCB0eXBlOiBtaW1lU3RyaW5nKVxuICAgICAgICBcbiAgaW1hZ2VVcGxvYWQ6IChibG9iLCBjYWxsYmFjaykgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBibG9iXG5cbiAgICBfLnBvc3RcbiAgICAgIHhocjogLT5cbiAgICAgICAgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lciAncHJvZ3Jlc3MnLCAoZSkgLT5cbiAgICAgICAgICBjb21wbGV0ZSA9IGUubG9hZGVkIC8gZS50b3RhbFxuICAgICAgICAgIGlmIGNvbXBsZXRlIDwgMSB0aGVuIE5vdGljZS5pICdVcGxvYWRpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAgIGlmIGNvbXBsZXRlIGlzIDEgdGhlbiBOb3RpY2UuaSAnUHJvY2Vzc2luZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICwgZmFsc2VcbiAgICAgICAgcmV0dXJuIHhoclxuXG4gICAgICB1cmw6ICcvYXBpL3VwbG9hZCdcbiAgICAgIGRhdGE6IGZkXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZVxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgICBlcnJvcjogLT5cbiAgICAgICAgTm90aWNlLmQoKVxuICAgICAgc3VjY2VzczogKHJlc3VsdCkgLT5cbiAgICAgICAgTm90aWNlLmkgJ0ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIENsaWVudC5wcm9maWxlID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdClcblxuXG4iLCJDbGllbnRzID1cbiAgaTogLT5cbiAgICBMaXN0aW5nLmkgJ2NsaWVudHMnLCBDbGllbnRzLmFjdGlvblxuXG4gIGFjdGlvbjogKHR5cGUpIC0+XG5cbiAgICBzd2l0Y2ggdHlwZVxuICAgICAgd2hlbiAnQ2xpZW50IEludml0ZSdcbiAgICAgICAgaWYgTGlzdGluZy5zZWxlY3RlZC5sZW5ndGggPiAxXG4gICAgICAgICAgTm90aWNlLmkgJ1BsZWFzZSBjaG9vc2UgYSBzaW5nbGUgY2xpZW50IGZvciBhbiBpbnZpdGUgbGluaycsIHR5cGU6ICd3YXJuaW5nJ1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBDbGllbnRzLmdldEludml0ZShMaXN0aW5nLnNlbGVjdGVkWzBdKVxuXG4gIGdldEludml0ZTogKGNsaWVudCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnRzJykpXG5cbiAgICBfLmdldCAnL2FwaS9pbnZpdGUvYWRkJywgY2xpZW50OiBjbGllbnRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGNvbnNvbGUubG9nIHJlc3BvbnNlXG4gICAgICBQcm9tcHQuaShcbiAgICAgICAgJ0NsaWVudCBJbnZpdGUnLFxuICAgICAgICAnU2hhcmUgdGhpcyBVUkwgd2l0aCB5b3VyIGNsaWVudCB0byBhbGxvdyB0aGVtIHRvIG1vZGlmeSB0aGVpciBvd24gZW50cmllcycsXG4gICAgICAgIFsnT0snXSxcbiAgICAgICAgICBjbGlwYm9hcmQ6IHRydWVcbiAgICAgICAgICB2YWx1ZTogd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvaW52aXRlLycgKyByZXNwb25zZS5kYXRhLmludml0ZS5oYXNoLFxuICAgICAgKVxuXG5cblxuIiwiY29uZmlnID0ge1wiYXBwXCI6e1wibmFtZVwiOlwiTGFyYXZlbFwiLFwiZW52XCI6XCJsb2NhbFwiLFwiZGVidWdcIjp0cnVlLFwidXJsXCI6XCJodHRwOi8vYmFzYWwuZGV2OjMwMDBcIixcInRpbWV6b25lXCI6XCJVVENcIixcImxvY2FsZVwiOlwiZW5cIixcImZhbGxiYWNrX2xvY2FsZVwiOlwiZW5cIixcImtleVwiOlwiYmFzZTY0OlFZcHpScStvYjV1TGNVYnRlbVMramFUTjZnYlFQUzZXWC9wWk45N2JUOWc9XCIsXCJjaXBoZXJcIjpcIkFFUy0yNTYtQ0JDXCIsXCJsb2dcIjpcInNpbmdsZVwiLFwibG9nX2xldmVsXCI6XCJkZWJ1Z1wiLFwicHJvdmlkZXJzXCI6W1wiSWxsdW1pbmF0ZVxcXFxBdXRoXFxcXEF1dGhTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcQnJvYWRjYXN0aW5nXFxcXEJyb2FkY2FzdFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxCdXNcXFxcQnVzU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXENhY2hlXFxcXENhY2hlU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEZvdW5kYXRpb25cXFxcUHJvdmlkZXJzXFxcXENvbnNvbGVTdXBwb3J0U2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXENvb2tpZVxcXFxDb29raWVTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcRGF0YWJhc2VcXFxcRGF0YWJhc2VTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcRW5jcnlwdGlvblxcXFxFbmNyeXB0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEZpbGVzeXN0ZW1cXFxcRmlsZXN5c3RlbVNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxGb3VuZGF0aW9uXFxcXFByb3ZpZGVyc1xcXFxGb3VuZGF0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEhhc2hpbmdcXFxcSGFzaFNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxNYWlsXFxcXE1haWxTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcTm90aWZpY2F0aW9uc1xcXFxOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcUGFnaW5hdGlvblxcXFxQYWdpbmF0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFBpcGVsaW5lXFxcXFBpcGVsaW5lU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFF1ZXVlXFxcXFF1ZXVlU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFJlZGlzXFxcXFJlZGlzU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXEF1dGhcXFxcUGFzc3dvcmRzXFxcXFBhc3N3b3JkUmVzZXRTZXJ2aWNlUHJvdmlkZXJcIixcIklsbHVtaW5hdGVcXFxcU2Vzc2lvblxcXFxTZXNzaW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFRyYW5zbGF0aW9uXFxcXFRyYW5zbGF0aW9uU2VydmljZVByb3ZpZGVyXCIsXCJJbGx1bWluYXRlXFxcXFZhbGlkYXRpb25cXFxcVmFsaWRhdGlvblNlcnZpY2VQcm92aWRlclwiLFwiSWxsdW1pbmF0ZVxcXFxWaWV3XFxcXFZpZXdTZXJ2aWNlUHJvdmlkZXJcIixcIkxhcmF2ZWxcXFxcVGlua2VyXFxcXFRpbmtlclNlcnZpY2VQcm92aWRlclwiLFwiSmVuc3NlZ2Vyc1xcXFxNb25nb2RiXFxcXE1vbmdvZGJTZXJ2aWNlUHJvdmlkZXJcIixcIkxhcmplY3R1c1xcXFxTZXJ2aWNlUHJvdmlkZXJcIixcIkxhcnB1Z1xcXFxTZXJ2aWNlUHJvdmlkZXJcIixcIkFwcFxcXFxQcm92aWRlcnNcXFxcQXBwU2VydmljZVByb3ZpZGVyXCIsXCJBcHBcXFxcUHJvdmlkZXJzXFxcXEF1dGhTZXJ2aWNlUHJvdmlkZXJcIixcIkFwcFxcXFxQcm92aWRlcnNcXFxcRXZlbnRTZXJ2aWNlUHJvdmlkZXJcIixcIkFwcFxcXFxQcm92aWRlcnNcXFxcUm91dGVTZXJ2aWNlUHJvdmlkZXJcIl0sXCJhbGlhc2VzXCI6e1wiQXBwXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxBcHBcIixcIkFydGlzYW5cIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEFydGlzYW5cIixcIkF1dGhcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEF1dGhcIixcIkJsYWRlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxCbGFkZVwiLFwiQnJvYWRjYXN0XCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxCcm9hZGNhc3RcIixcIkJ1c1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQnVzXCIsXCJDYWNoZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQ2FjaGVcIixcIkNvbmZpZ1wiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcQ29uZmlnXCIsXCJDb29raWVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXENvb2tpZVwiLFwiQ3J5cHRcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXENyeXB0XCIsXCJEQlwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcREJcIixcIkVsb3F1ZW50XCI6XCJJbGx1bWluYXRlXFxcXERhdGFiYXNlXFxcXEVsb3F1ZW50XFxcXE1vZGVsXCIsXCJNb2xvcXVlbnRcIjpcIkplbnNzZWdlcnNcXFxcTW9uZ29kYlxcXFxFbG9xdWVudFxcXFxNb2RlbFwiLFwiRXZlbnRcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXEV2ZW50XCIsXCJGaWxlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxGaWxlXCIsXCJHYXRlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxHYXRlXCIsXCJIYXNoXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxIYXNoXCIsXCJMYW5nXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxMYW5nXCIsXCJMb2dcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXExvZ1wiLFwiTWFpbFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcTWFpbFwiLFwiTm90aWZpY2F0aW9uXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxOb3RpZmljYXRpb25cIixcIlBhc3N3b3JkXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxQYXNzd29yZFwiLFwiUXVldWVcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFF1ZXVlXCIsXCJSZWRpcmVjdFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUmVkaXJlY3RcIixcIlJlZGlzXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxSZWRpc1wiLFwiUmVxdWVzdFwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUmVxdWVzdFwiLFwiUmVzcG9uc2VcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFJlc3BvbnNlXCIsXCJSb3V0ZVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcUm91dGVcIixcIlNjaGVtYVwiOlwiSWxsdW1pbmF0ZVxcXFxTdXBwb3J0XFxcXEZhY2FkZXNcXFxcU2NoZW1hXCIsXCJTZXNzaW9uXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxTZXNzaW9uXCIsXCJTdG9yYWdlXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxTdG9yYWdlXCIsXCJVUkxcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFVSTFwiLFwiVmFsaWRhdG9yXCI6XCJJbGx1bWluYXRlXFxcXFN1cHBvcnRcXFxcRmFjYWRlc1xcXFxWYWxpZGF0b3JcIixcIlZpZXdcIjpcIklsbHVtaW5hdGVcXFxcU3VwcG9ydFxcXFxGYWNhZGVzXFxcXFZpZXdcIn19LFwiYXV0aFwiOntcImRlZmF1bHRzXCI6e1wiZ3VhcmRcIjpcIndlYlwiLFwicGFzc3dvcmRzXCI6XCJ1c2Vyc1wifSxcImd1YXJkc1wiOntcIndlYlwiOntcImRyaXZlclwiOlwic2Vzc2lvblwiLFwicHJvdmlkZXJcIjpcInVzZXJzXCJ9LFwiYXBpXCI6e1wiZHJpdmVyXCI6XCJ0b2tlblwiLFwicHJvdmlkZXJcIjpcInVzZXJzXCJ9fSxcInByb3ZpZGVyc1wiOntcInVzZXJzXCI6e1wiZHJpdmVyXCI6XCJlbG9xdWVudFwiLFwibW9kZWxcIjpcIkFwcFxcXFxVc2VyXCJ9fSxcInBhc3N3b3Jkc1wiOntcInVzZXJzXCI6e1wicHJvdmlkZXJcIjpcInVzZXJzXCIsXCJ0YWJsZVwiOlwicGFzc3dvcmRfcmVzZXRzXCIsXCJleHBpcmVcIjo2MH19fSxcImJyb2FkY2FzdGluZ1wiOntcImRlZmF1bHRcIjpcImxvZ1wiLFwiY29ubmVjdGlvbnNcIjp7XCJwdXNoZXJcIjp7XCJkcml2ZXJcIjpcInB1c2hlclwiLFwia2V5XCI6bnVsbCxcInNlY3JldFwiOm51bGwsXCJhcHBfaWRcIjpudWxsLFwib3B0aW9uc1wiOltdfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwifSxcImxvZ1wiOntcImRyaXZlclwiOlwibG9nXCJ9LFwibnVsbFwiOntcImRyaXZlclwiOlwibnVsbFwifX19LFwiY2FjaGVcIjp7XCJkZWZhdWx0XCI6XCJmaWxlXCIsXCJzdG9yZXNcIjp7XCJhcGNcIjp7XCJkcml2ZXJcIjpcImFwY1wifSxcImFycmF5XCI6e1wiZHJpdmVyXCI6XCJhcnJheVwifSxcImRhdGFiYXNlXCI6e1wiZHJpdmVyXCI6XCJkYXRhYmFzZVwiLFwidGFibGVcIjpcImNhY2hlXCIsXCJjb25uZWN0aW9uXCI6bnVsbH0sXCJmaWxlXCI6e1wiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay9jYWNoZS9kYXRhXCJ9LFwibWVtY2FjaGVkXCI6e1wiZHJpdmVyXCI6XCJtZW1jYWNoZWRcIixcInBlcnNpc3RlbnRfaWRcIjpudWxsLFwic2FzbFwiOltudWxsLG51bGxdLFwib3B0aW9uc1wiOltdLFwic2VydmVyc1wiOlt7XCJob3N0XCI6XCIxMjcuMC4wLjFcIixcInBvcnRcIjoxMTIxMSxcIndlaWdodFwiOjEwMH1dfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwifX0sXCJwcmVmaXhcIjpcImxhcmF2ZWxcIn0sXCJtYWlsXCI6e1wiZHJpdmVyXCI6XCJzbXRwXCIsXCJob3N0XCI6XCJzbXRwLm1haWxndW4ub3JnXCIsXCJwb3J0XCI6NTg3LFwiZnJvbVwiOntcImFkZHJlc3NcIjpcImhlbGxvQGV4YW1wbGUuY29tXCIsXCJuYW1lXCI6XCJFeGFtcGxlXCJ9LFwiZW5jcnlwdGlvblwiOlwidGxzXCIsXCJ1c2VybmFtZVwiOm51bGwsXCJwYXNzd29yZFwiOm51bGwsXCJzZW5kbWFpbFwiOlwiL3Vzci9zYmluL3NlbmRtYWlsIC1ic1wiLFwibWFya2Rvd25cIjp7XCJ0aGVtZVwiOlwiZGVmYXVsdFwiLFwicGF0aHNcIjpbXCIvVXNlcnMvay9iYXNhbC9yZXNvdXJjZXMvdmlld3MvdmVuZG9yL21haWxcIl19fSxcInF1ZXVlXCI6e1wiZGVmYXVsdFwiOlwic3luY1wiLFwiY29ubmVjdGlvbnNcIjp7XCJzeW5jXCI6e1wiZHJpdmVyXCI6XCJzeW5jXCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiam9ic1wiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInJldHJ5X2FmdGVyXCI6OTB9LFwiYmVhbnN0YWxrZFwiOntcImRyaXZlclwiOlwiYmVhbnN0YWxrZFwiLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwicmV0cnlfYWZ0ZXJcIjo5MH0sXCJzcXNcIjp7XCJkcml2ZXJcIjpcInNxc1wiLFwia2V5XCI6XCJ5b3VyLXB1YmxpYy1rZXlcIixcInNlY3JldFwiOlwieW91ci1zZWNyZXQta2V5XCIsXCJwcmVmaXhcIjpcImh0dHBzOi8vc3FzLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL3lvdXItYWNjb3VudC1pZFwiLFwicXVldWVcIjpcInlvdXItcXVldWUtbmFtZVwiLFwicmVnaW9uXCI6XCJ1cy1lYXN0LTFcIn0sXCJyZWRpc1wiOntcImRyaXZlclwiOlwicmVkaXNcIixcImNvbm5lY3Rpb25cIjpcImRlZmF1bHRcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJyZXRyeV9hZnRlclwiOjkwfX0sXCJmYWlsZWRcIjp7XCJkYXRhYmFzZVwiOlwibW9uZ29kYlwiLFwidGFibGVcIjpcImZhaWxlZF9qb2JzXCJ9fSxcInNlcnZpY2VzXCI6e1wibWFpbGd1blwiOntcImRvbWFpblwiOm51bGwsXCJzZWNyZXRcIjpudWxsfSxcInNlc1wiOntcImtleVwiOm51bGwsXCJzZWNyZXRcIjpudWxsLFwicmVnaW9uXCI6XCJ1cy1lYXN0LTFcIn0sXCJzcGFya3Bvc3RcIjp7XCJzZWNyZXRcIjpudWxsfSxcInN0cmlwZVwiOntcIm1vZGVsXCI6XCJBcHBcXFxcVXNlclwiLFwia2V5XCI6bnVsbCxcInNlY3JldFwiOm51bGx9fSxcInNlc3Npb25cIjp7XCJkcml2ZXJcIjpcImZpbGVcIixcImxpZmV0aW1lXCI6MTIwLFwiZXhwaXJlX29uX2Nsb3NlXCI6ZmFsc2UsXCJlbmNyeXB0XCI6ZmFsc2UsXCJmaWxlc1wiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvc2Vzc2lvbnNcIixcImNvbm5lY3Rpb25cIjpudWxsLFwidGFibGVcIjpcInNlc3Npb25zXCIsXCJzdG9yZVwiOm51bGwsXCJsb3R0ZXJ5XCI6WzIsMTAwXSxcImNvb2tpZVwiOlwibGFyYXZlbF9zZXNzaW9uXCIsXCJwYXRoXCI6XCIvXCIsXCJkb21haW5cIjpudWxsLFwic2VjdXJlXCI6ZmFsc2UsXCJodHRwX29ubHlcIjp0cnVlfSxcInZpZXdcIjp7XCJwYXRoc1wiOltcIi9Vc2Vycy9rL2Jhc2FsL3Jlc291cmNlcy92aWV3c1wiXSxcImNvbXBpbGVkXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay92aWV3c1wifSxcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJ3aGl0ZTJcIjpcIiNmOGY4ZjhcIixcIndoaXRlM1wiOlwiI0Y0RjRGNFwiLFwid2hpdGU0XCI6XCIjRkFGQUZBXCIsXCJncmV5MVwiOlwiI2U1ZTVlNVwiLFwiZ3JleTJcIjpcIiNmNWY1ZjVcIixcImdyZXkzXCI6XCIjZDBkMGQwXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImJsYWNrMlwiOlwiIzI4MjgyOFwiLFwiYmxhY2szXCI6XCIjMzMzMzMzXCIsXCJibGFjazRcIjpcIiMyMzI5MkVcIixcImJsYWNrNVwiOlwiIzNFNDM0N1wiLFwiYmxhY2s2XCI6XCIjNDk0RTUyXCIsXCJyZWQxXCI6XCIjQzgyMTJCXCIsXCJ5ZWxsb3cxXCI6XCIjRjZCQjQ1XCIsXCJjeWFuMVwiOlwiIzVGQTc5M1wiLFwib3JhbmdlMVwiOlwiI0Y2OEY2MlwiLFwic2tpbjFcIjpcIiNGM0REQTNcIixcImdyZWVuMVwiOlwiIzViYTU0MVwiLFwiZ3JlZW4yXCI6XCIjODhkOTZkXCIsXCJncmVlbjNcIjpcIiM3N2QzNThcIixcImJsdWUxXCI6XCIjMWRhN2VlXCIsXCJibHVlMlwiOlwiIzAwNzNiYlwiLFwiYmx1ZTNcIjpcIiM0RjVEOTVcIixcImdvb2dsZV9ibHVlXCI6XCIjNDI4NWY0XCIsXCJnb29nbGVfZ3JlZW5cIjpcIiMzNGE4NTNcIixcImdvb2dsZV95ZWxsb3dcIjpcIiNmYmJjMDVcIixcImdvb2dsZV9yZWRcIjpcIiNlYTQzMzVcIixcImdpdGh1Yl9ibHVlXCI6XCIjMEQyNjM2XCIsXCJmYWNlYm9va19ibHVlXCI6XCIjNDg2N0FBXCIsXCJpbnN0YWdyYW1fb3JcIjpcIiNGRjc4MDRcIixcInR3aXR0ZXJfYmx1ZVwiOlwiIzAwQUNFRFwifSxcImZvbnRcIjp7XCI0MDRcIjp7XCJmb250LWZhbWlseVwiOlwiTW9ub3RvblwiLFwiZm9udC1zaXplXCI6XCI3NXB4XCJ9LFwiaDFcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjM0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJoMWJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjM0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImgyYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImgzXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyMHB4XCJ9LFwiaDNiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyMHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiYzFcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJjMWJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE2cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI1MDBcIn0sXCJjMXRiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNDAwXCJ9LFwiYzFzXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMC41cHhcIn0sXCJjMXNiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJmb250LXdlaWdodFwiOlwiNjAwXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMC41cHhcIn0sXCJjMlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMyYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifX0sXCJtZXRhXCI6e1widGl0bGVcIjpcImJhc2FsXCIsXCJ1cmxcIjpcImh0dHBzOi8vYmFzYWwudGVjaC9cIixcImRlc2NyaXB0aW9uXCI6XCJtaW5pbWFsIGNvbnRlbnQgbWFuYWdlbWVudFwiLFwia2V5d29yZHNcIjpcImNtc1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2FjaWRqYXp6L2Jhc2FsXCJ9LFwic2V0dGluZ3NcIjp7XCJwZXJwYWdlXCI6MTB9fTsiLCJEYXNoYm9hcmQgPVxuXG4gIGk6IC0+XG4gICAgQGxvYWQoKSBpZiB3aW5kb3cuVXNlciBpc250IHVuZGVmaW5lZFxuXG4gIGxvYWQ6IChjb21wbGV0ZSkgLT5cbiAgICBfLm9mZiAnLnBhZ2UuaG9tZSdcbiAgICBfLm9uICcucGFnZS5kYXNoYm9hcmQnXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmRhc2hib2FyZCA+IC5jb2xsZWN0aW9ucycpKVxuXG4gICAgXy5nZXQgJy9hcGkvY2xpZW50cycsXG4gICAgICB2aWV3OiAnZGFzaGJvYXJkJ1xuICAgIC5hbHdheXMgLT5cbiAgICAgIGNvbnNvbGUubG9nICdhbHdheXMnXG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIFRpbWUuaSgpXG4gICAgICAkKCcuY29sbGVjdGlvbnMnKS5odG1sIHJlc3BvbnNlLnZpZXdcblxuIiwiRW50aXRpZXMgPVxuXG4gIGJsb2dzOiBbXVxuICBjcm9wczoge31cbiAgaW1hZ2VzOiB7fVxuXG4gIHBsYWNlaG9sZGVyczogW1xuICAgIFwiVGhhdCdzIHdoYXQgSSdtIGJsb2dnaW5nIGFib3V0XCJcbiAgICBcIkhhdmUgeW91IGd1eXMgYmVlbiBibG9nZ2luZz9cIlxuICAgIFwiSG9sZCBhbGwgbXkgY2FsbHMsIEknbSBibG9nZ2luZ1wiXG4gICAgXCJUZWxsIERvbm5pZSBJJ20gYmxvZ2dpbmcgYW5kIEknbGwgY2FsbCBoaW0gYmFja1wiXG4gICAgXCJJIGdvdHRhIHJ1biwgeW91IHNob3VsZCBiZSBibG9nZ2luZ1wiXG4gICAgXCJJIHdhbnQgeW91IG9uIHRoZSBwaG9uZSwgYnV0IEkgYWxzbyB3YW50IHlvdSBibG9nZ2luZ1wiXG4gIF1cblxuICBCbG9nOiAoZWwsIG5hbWUsIHZhbHVlPWZhbHNlKSAtPlxuXG4gICAgZWRpdG9yID0gZWwuZmluZCgnLmJsb2cnKS5zdW1tZXJub3RlXG4gICAgICBwbGFjZWhvbGRlcjogQHBsYWNlaG9sZGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBAcGxhY2Vob2xkZXJzLmxlbmd0aCldXG4gICAgICBjYWxsYmFja3M6XG4gICAgICAgIG9uSW1hZ2VVcGxvYWQ6IChmaWxlcykgLT5cbiAgICAgICAgICBFbnRpdGllcy5pbWFnZVVwbG9hZCBmaWxlcywgdGhpc1xuXG4gICAgZWwuZmluZCgnLmJsb2cnKS5zdW1tZXJub3RlKCdjb2RlJywgdmFsdWUpIGlmIHZhbHVlIGlzbnQgZmFsc2VcblxuICAgIEBibG9ncy5wdXNoIG5hbWU6IG5hbWUsIGVkaXRvcjogZWRpdG9yLCBlbDogZWwuZmluZCgnLmJsb2cnKVxuXG4gIGJsb2dHZXRDb2RlOiAobmFtZSkgLT5cbiAgICBmb3IgYmxvZyBpbiBAYmxvZ3NcbiAgICAgIHJldHVybiBibG9nLmVsLnN1bW1lcm5vdGUoJ2NvZGUnKSBpZiBibG9nLm5hbWUgaXMgbmFtZVxuIFxuICBibG9nRm9jdXM6IChuYW1lKSAtPlxuICAgIGZvciBibG9nIGluIEBibG9nc1xuICAgICAgaWYgYmxvZy5uYW1lIGlzIG5hbWVcbiAgICAgICAgJCgnLm5vdGUtZWRpdGFibGUnKS5mb2N1cygpXG5cbiAgaW1hZ2VVcGxvYWQ6IChmaWxlcywgZWwpIC0+XG5cbiAgICBmZCA9IG5ldyBGb3JtRGF0YSgpXG4gICAgZmQuYXBwZW5kICdmaWxlJywgZmlsZXNbMF1cblxuICAgIF8ucG9zdFxuICAgICAgeGhyOiAtPlxuICAgICAgICB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyICdwcm9ncmVzcycsIChlKSAtPlxuICAgICAgICAgIGNvbXBsZXRlID0gZS5sb2FkZWQgLyBlLnRvdGFsXG4gICAgICAgICAgaWYgY29tcGxldGUgPCAxIHRoZW4gTm90aWNlLmkgJ1VwbG9hZGluZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICAgaWYgY29tcGxldGUgaXMgMSB0aGVuIE5vdGljZS5pICdQcm9jZXNzaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgLCBmYWxzZVxuICAgICAgICByZXR1cm4geGhyXG5cbiAgICAgIHVybDogJy9hcGkvdXBsb2FkJ1xuICAgICAgZGF0YTogZmRcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgY29udGVudFR5cGU6IGZhbHNlXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICAgIGVycm9yOiAtPlxuICAgICAgICBOb3RpY2UuZCgpXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSAtPlxuICAgICAgICAkKGVsKS5zdW1tZXJub3RlKCdlZGl0b3IuaW5zZXJ0SW1hZ2UnLCByZXN1bHQuZGF0YS51cmwpXG4gICAgICAgIE5vdGljZS5pICdGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuXG4gIFRhZ3M6IChlbCwgbmFtZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLnNlbGVjdGl6ZVxuICAgICAgcGx1Z2luczogWydyZXN0b3JlX29uX2JhY2tzcGFjZScsJ3JlbW92ZV9idXR0b24nXVxuICAgICAgZGVsaW1pdGVyOiAnLCdcbiAgICAgIHBlcnNpc3Q6IGZhbHNlXG4gICAgICBjcmVhdGU6IChpbnB1dCkgLT5cbiAgICAgICAgdmFsdWU6IGlucHV0XG4gICAgICAgIHRleHQ6IGlucHV0XG5cbiAgRGF0ZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLmZsYXRwaWNrclxuICAgICAgZGF0ZUZvcm1hdDogJ20vZC9ZJ1xuXG4gIERhdGVUaW1lOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1kgaDppIEsnXG4gICAgICBlbmFibGVUaW1lOiB0cnVlXG5cbiAgRGF0ZVJhbmdlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1knXG4gICAgICBtb2RlOiAncmFuZ2UnXG5cbiAgRGF0ZVRpbWVSYW5nZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLmZsYXRwaWNrclxuICAgICAgZGF0ZUZvcm1hdDogJ20vZC9ZIGg6aSBLJ1xuICAgICAgZW5hYmxlVGltZTogdHJ1ZVxuICAgICAgbW9kZTogJ3JhbmdlJ1xuXG4gIEltYWdlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuXG4gICAgQGltYWdlSGFuZGxlcnMgZWxcblxuICAgICMgcHJlbG9hZCBleGlzdGluZyBpbWFnZXNcbiAgICBpZiB2YWx1ZSBpc250IHVuZGVmaW5lZFxuICAgICAgRW50aXRpZXMuY3JvcHBlcih2YWx1ZSwgZWwpXG4gICAgICBFbnRpdGllcy5pbWFnZXNbbmFtZV0gPSB2YWx1ZVxuXG5cbiAgaW1hZ2VIYW5kbGVyczogKGVsLCBuYW1lKSAtPlxuXG4gICAgZWwub24gJ2RyYWdvdmVyJywgQGltYWdlSGFuZGxlci5kcmFnb3ZlclxuICAgIGVsLm9uICdkcmFnbGVhdmUnLCBAaW1hZ2VIYW5kbGVyLmRyYWdsZWF2ZVxuICAgIGVsLm9uICdkcmFnZW50ZXIgZHJhZ292ZXInLCBAaW1hZ2VIYW5kbGVyLmNhbmNlbFxuICAgIGVsLm9uICdkcm9wIGRyYWdkcm9wJywgQGltYWdlSGFuZGxlci5kcm9wXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YS5zZWxlY3QnKS5vbiAnY2xpY2snLCBAaW1hZ2VIYW5kbGVyLmNob29zZUZpbGVcbiAgICBlbC5maW5kKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhLnNhdmUnKS5vbiAnY2xpY2snLCBAaW1hZ2VIYW5kbGVyLnNhdmVcbiAgICBlbC5maW5kKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dDpmaWxlJykub24gJ2NoYW5nZScsIEBpbWFnZUhhbmRsZXIuY2hhbmdlXG5cbiAgaW1hZ2VIYW5kbGVyOlxuXG4gICAgZHJhZ292ZXI6IC0+XG4gICAgICBfLm9uICQodGhpcykuZmluZCgnLmlucHV0LWltYWdlJylcbiAgICBkcmFnbGVhdmU6IC0+XG4gICAgICBfLm9mZiAkKHRoaXMpLmZpbmQoJy5pbnB1dC1pbWFnZScpXG4gICAgY2FuY2VsOiAtPlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgZHJvcDogKGUpIC0+XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBfLm9mZiAkKHRoaXMpLmZpbmQgJy5pbnB1dC1pbWFnZSdcblxuICAgICAgaWYgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlciBhbmQgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGhcbiAgICAgICAgZmlsZXMgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzXG5cbiAgICAgIEVudGl0aWVzLmxvYWRDcm9wcGVyIGZpbGVzWzBdLCAkKHRoaXMpXG5cbiAgICBjaG9vc2VGaWxlOiAtPlxuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG4gICAgY2hhbmdlOiAtPlxuICAgICAgaWYgJCh0aGlzKVswXS5maWxlc1xuICAgICAgICBmaWxlcyA9ICQodGhpcylbMF0uZmlsZXNcblxuICAgICAgICBFbnRpdGllcy5sb2FkQ3JvcHBlciBmaWxlc1swXSwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKVxuXG4gICAgc2F2ZTogLT5cblxuICAgICAgbmFtZSA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZGF0YSAnbmFtZSdcbiAgICAgIGluZGV4ID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5kYXRhICdpbmRleCdcblxuICAgICAgU3Bpbm5lci5pKCQoXCIuZW50aXR5X2luZGV4XyN7aW5kZXh9XCIpKVxuXG4gICAgICBFbnRpdGllcy5jcm9wc1tuYW1lXS5nZXRDcm9wcGVkQ2FudmFzKCkudG9CbG9iIChibG9iKSAtPlxuICAgICAgICBDbGllbnQuaW1hZ2VVcGxvYWQgYmxvYiwgKHJlc3VsdCkgLT5cbiAgICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICAgIEVudGl0aWVzLmltYWdlc1tuYW1lXSA9IHJlc3VsdC5kYXRhLnVybFxuICAgICAgLCAnaW1hZ2UvanBlZydcblxuICBsb2FkQ3JvcHBlcjogKGZpbGUsIGVsKSAtPlxuXG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuXG4gICAgcmVhZGVyLm9ubG9hZGVuZCA9IC0+XG4gICAgICBFbnRpdGllcy5jcm9wcGVyIHJlYWRlci5yZXN1bHQsIGVsXG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwgZmlsZVxuXG4gIGNyb3BwZXI6ICh1cmwsIGVsKSAtPlxuXG4gICAgbmFtZSA9IGVsLmRhdGEgJ25hbWUnXG4gICAgaW5kZXggPSBlbC5kYXRhICdpbmRleCdcblxuICAgIGNvbnNvbGUubG9nIG5hbWUsIGluZGV4XG5cbiAgICBpZiBFbnRpdGllcy5jcm9wc1tuYW1lXSBpc250IHVuZGVmaW5lZFxuICAgICAgRW50aXRpZXMuY3JvcHNbbmFtZV0uZGVzdHJveSgpXG4gICAgICBFbnRpdGllcy5jcm9wc1tuYW1lXSA9IGZhbHNlXG5cbiAgICBlbC5maW5kKCcuY3JvcHBlcicpLmF0dHIgJ3NyYycsIHVybFxuXG4gICAgRW50aXRpZXMuY3JvcHNbbmFtZV0gPSBuZXcgQ3JvcHBlciBlbC5maW5kKCcuY3JvcHBlcicpWzBdLFxuICAgICAgbWluQ29udGFpbmVySGVpZ2h0OiAzMDBcbiAgICAgIG1pbkNhbnZhc0hlaWdodDogMzAwXG4gICAgICByZXNwb25zaXZlOiB0cnVlXG4gICAgICBwcmV2aWV3OiBcImRpdi5lbnRpdHlfaW5kZXhfI3tpbmRleH0gPiBkaXYuaW5wdXQtaW1hZ2UgPiBkaXYucGljdHVyZVwiXG4gICAgICBhdXRvQ3JvcEFyZWE6IDFcbiAgICAgIHN0cmljdDogZmFsc2VcbiAgICAgIGhpZ2hsaWdodDogdHJ1ZVxuXG4gICAgXy5vbiBlbC5maW5kKCcuc2F2ZScpXG5cblxuIiwiRW50cmllcyA9XG5cbiAgaTogLT5cblxuICAgICMgbGltaXQgZmlsdGVyIHR5cGVzIGJhc2VkIG9uIHVzZXIgdHlwZVxuICAgIGlmIFVzZXI/LmNsaWVudCBpc250IHVuZGVmaW5lZFxuICAgICAgTGlzdGluZy5pICdlbnRyaWVzJywgZmFsc2UsIFsnc3RydWN0dXJlJ11cbiAgICBlbHNlXG4gICAgICBMaXN0aW5nLmkgJ2VudHJpZXMnLCBmYWxzZSwgWydjbGllbnQnLCAnc3RydWN0dXJlJ11cbiIsIkVudHJ5ID1cblxuICBzZWxlY3RTdHJ1Y3R1cmU6IHt9XG5cbiAgX2lkOiBmYWxzZVxuICBzdHJ1Y3R1cmU6IGZhbHNlXG4gIHNlbGVjdGVkU3RydWN0dXJlOiBmYWxzZVxuICBlbnRyeTogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5oYXNoLm1hdGNoIC8jc3RydWN0dXJlPShbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgRW50cnkuc2VsZWN0ZWRTdHJ1Y3R1cmUgPSBtYXRjaFsxXVxuXG4gICAgQHNlbGVjdGl6ZSgpXG4gICAgQGhhbmRsZXJzKClcblxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL2VudHJpZXNcXC8oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEBfaWQgPSBtYXRjaFsxXVxuICAgICAgQGxvYWQgQF9pZFxuICAgIGVsc2VcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuZm9jdXMoKVxuXG4gIHN0cnVjdHVyZVNwZWNpZmllZDogLT5cbiAgICBpZiBFbnRyeS5zZWxlY3RlZFN0cnVjdHVyZSBpc250IGZhbHNlXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLnNldFZhbHVlIEVudHJ5LnNlbGVjdGVkU3RydWN0dXJlXG5cbiAgc2VsZWN0aXplOiAtPlxuXG4gICAgQHNlbGVjdFN0cnVjdHVyZSA9IFNlbGVjdGl6ZS5zdHJ1Y3R1cmVzICQoJy5tb2RpZnkgPiAuc3RydWN0dXJlID4gc2VsZWN0JyksXG4gICAgICBFbnRyeS5zdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLnN1Ym1pdCcpLmNsaWNrIEBzdWJtaXRcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYW5vdGhlcicpLmNsaWNrIEBhbm90aGVyXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmNhbmNlbCcpLmNsaWNrIEBjYW5jZWxcblxuICAgICQoJy5mb2N1c21lJykuZm9jdXMgLT5cbiAgICAgICQoJy5ub3RlLWVkaXRhYmxlJykuZm9jdXMoKVxuXG5cbiAgbG9hZDogKF9pZCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeScpKVxuXG4gICAgXy5nZXQgJy9hcGkvZW50cmllcy8nLFxuICAgICAgX2lkOiBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGVudHJ5ID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgRW50cnkuZW50cnkgPSBlbnRyeVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5hZGRPcHRpb25cbiAgICAgICAgaWQ6IGVudHJ5LnN0cnVjdHVyZS5pZCwgbmFtZTogZW50cnkuc3RydWN0dXJlLm5hbWUsIGNsaWVudFByb2ZpbGU6IGVudHJ5LmNsaWVudC5wcm9maWxlXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLnNldFZhbHVlIGVudHJ5LnN0cnVjdHVyZS5pZFxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5kaXNhYmxlKClcblxuICBzdWJtaXQ6IC0+XG5cbiAgICBuYW1lID0gJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCgpXG4gICAgZW50aXRpZXMgPSB7fVxuXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmJvZHkgPiAuZW50aXR5JykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBlbnRpdHlfbmFtZSA9ICQoZWwpLmZpbmQoJy5sYWJlbCcpLmh0bWwoKVxuICAgICAgdHlwZSA9ICQoZWwpLmRhdGEgJ3R5cGUnXG5cbiAgICAgIHN3aXRjaCB0eXBlXG4gICAgICAgIHdoZW4gJ1RleHQnLCdMaW5rJywnRGF0ZScsJ1RpbWUnLCdEYXRlVGltZScsJ0RhdGVSYW5nZScsJ0RhdGVUaW1lUmFuZ2UnIHRoZW4gdmFsdWUgPSAkKGVsKS5maW5kKCdpbnB1dCcpLnZhbCgpXG4gICAgICAgIHdoZW4gJ1RhZ3MnIHRoZW4gdmFsdWUgPSAkKGVsKS5maW5kKCdpbnB1dCcpLnZhbCgpLnNwbGl0ICcsJ1xuICAgICAgICB3aGVuICdCbG9nJ1xuICAgICAgICAgIGJsb2cgPSBFbnRpdGllcy5ibG9nR2V0Q29kZSBlbnRpdHlfbmFtZVxuICAgICAgICAgIHZhbHVlID0gYmxvZ1xuICAgICAgICB3aGVuICdJbWFnZSdcbiAgICAgICAgICB2YWx1ZSA9IEVudGl0aWVzLmltYWdlc1tlbnRpdHlfbmFtZV1cblxuICAgICAgZW50aXRpZXNbZW50aXR5X25hbWVdID0gbmFtZTogZW50aXR5X25hbWUsIHR5cGU6IHR5cGUsIHZhbHVlOiB2YWx1ZVxuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG5cbiAgICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnknKSlcblxuICAgICAgY2FsbCA9ICcvYXBpL2VudHJpZXMvYWRkJ1xuICAgICAgaWYgRW50cnkuX2lkIGlzbnQgZmFsc2VcbiAgICAgICAgY2FsbCA9IFwiL2FwaS9lbnRyaWVzL3VwZGF0ZS8je0VudHJ5Ll9pZH1cIlxuXG4gICAgICBfLmdldCBjYWxsLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIHN0cnVjdHVyZTogRW50cnkuc3RydWN0dXJlXG4gICAgICAgIGVudGl0aWVzOiBlbnRpdGllc1xuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIEVudHJ5Ll9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL2VudHJpZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBFbnRyeS5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuICAgICAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYW5vdGhlcidcblxuICBhbm90aGVyOiAtPlxuICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9lbnRyaWVzL25ldyNzdHJ1Y3R1cmU9I3tFbnRyeS5zdHJ1Y3R1cmV9XCJcbiAgY2FuY2VsOiAtPlxuICAgIGlmIGRvY3VtZW50LnJlZmVycmVyLmluZGV4T2Yod2luZG93LmxvY2F0aW9uLmhvc3QpIGlzIC0xXG4gICAgICBsb2NhdGlvbi5ocmVmID0gXCIvZW50cmllc1wiXG4gICAgZWxzZVxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpXG4gIHN0cnVjdHVyZVNlbGVjdEhhbmRsZXI6IChlKSAtPlxuICAgIHN0cnVjdHVyZV9pZCA9ICQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKVxuICAgIHJldHVybiBmYWxzZSBpZiBzdHJ1Y3R1cmVfaWQubGVuZ3RoIGlzbnQgMjRcbiAgICAjaWYgRW50cnkuZW50cnkgaXNudCBmYWxzZVxuICAgICMgIEVudHJ5LmxvYWRFbnRpdGllcyBFbnRyeS5lbnRyeS5lbnRpdGllcywgRW50cnkuZW50cnkubmFtZVxuICAgICNlbHNlXG4gICAgRW50cnkubG9hZFN0cnVjdHVyZSBzdHJ1Y3R1cmVfaWRcblxuICBsb2FkU3RydWN0dXJlOiAoX2lkKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsXG4gICAgICBfaWQ6IF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgRW50cnkuc3RydWN0dXJlID0gX2lkXG4gICAgICBAbG9hZEVudGl0aWVzIHJlc3BvbnNlLmRhdGFbMF0uZW50aXRpZXNcblxuICBsb2FkRW50aXRpZXM6IChlbnRpdGllcywgbmFtZT1mYWxzZSkgLT5cblxuICAgIF8ub24gJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lJ1xuICAgIGlmIEVudHJ5LmVudHJ5Lm5hbWUgaXNudCBmYWxzZVxuICAgICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbChFbnRyeS5lbnRyeS5uYW1lKVxuXG4gICAgYm9keSA9ICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5JylcbiAgICBib2R5Lmh0bWwgJydcblxuICAgIHRhYmluZGV4ID0gM1xuICAgIGluZGV4ID0gMFxuXG4gICAgZm9yIGksIGVudGl0eSBvZiBlbnRpdGllc1xuXG4gICAgICBodG1sID0gJChcIi5wYWdlLmVudHJ5ID4gI3RlbXBsYXRlID4gLmVudGl0eV8je2VudGl0eS50eXBlfVwiKS5jbG9uZSgpXG4gICAgICBodG1sLmFkZENsYXNzIFwiZW50aXR5X2luZGV4XyN7KytpbmRleH1cIlxuICAgICAgaHRtbC5kYXRhIFwiaW5kZXhcIiwgaW5kZXhcbiAgICAgIGh0bWwuZGF0YSBcIm5hbWVcIiwgZW50aXR5Lm5hbWVcblxuICAgICAgaWYgRW50cnkuZW50cnkuZW50aXRpZXM/W2ldPy52YWx1ZVxuXG4gICAgICAgIHZhbHVlID0gRW50cnkuZW50cnkuZW50aXRpZXNbaV0udmFsdWVcblxuICAgICAgICBzd2l0Y2ggZW50aXR5LnR5cGVcbiAgICAgICAgICB3aGVuICdUYWdzJywgJ1RleHQnLCdMaW5rJywnRGF0ZScsJ1RpbWUnLCdEYXRlVGltZScsJ0RhdGVSYW5nZScsJ0RhdGVUaW1lUmFuZ2UnIHRoZW4gaHRtbC5maW5kKCdpbnB1dCcpLnZhbCB2YWx1ZVxuXG4gICAgICBodG1sLmZpbmQoJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYScpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXgrK1xuICAgICAgYm9keS5hcHBlbmQgaHRtbFxuXG4gICAgICBlbnRpdHlFbCA9ICQoXCIucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keSAuZW50aXR5X2luZGV4XyN7aW5kZXh9XCIpXG4gICAgICBlbnRpdHlFbC5maW5kKCcubGFiZWwnKS5odG1sIGVudGl0eS5uYW1lXG5cbiAgICAgIGlmIEVudGl0aWVzW2VudGl0eS50eXBlXSBpc250IHVuZGVmaW5lZFxuICAgICAgICBFbnRpdGllc1tlbnRpdHkudHlwZV0oZW50aXR5RWwsIGVudGl0eS5uYW1lLCB2YWx1ZSlcblxuICAgICQoJ1t0YWJpbmRleD0yXScpLmZvY3VzKClcbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0J1xuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4KytcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYW5vdGhlcicpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXhcbiIsIkZpbHRlciA9XG4gIGZpbHRlcjogZmFsc2VcbiAgZW5kcG9pbnQ6IGZhbHNlXG4gIGZpbHRlcnM6IFtdXG5cbiAgaTogKGZpbHRlcnMpIC0+XG5cbiAgICBAZmlsdGVycyA9IGZpbHRlcnNcblxuICAgIF8ub24gXCIuZmlsdGVyXyN7ZmlsdGVyfVwiIGZvciBmaWx0ZXIgaW4gQGZpbHRlcnNcblxuICAgIGZvciBmaWx0ZXIgaW4gQGZpbHRlcnNcbiAgICAgIGlmIFF1ZXJ5LnBhcmFtKGZpbHRlcikgaXNudCB1bmRlZmluZWRcbiAgICAgICAgRmlsdGVyLnNlbGVjdGVkIGZpbHRlclxuXG4gICAgJChcIi5saXN0aW5nXCIpLm9uICdjbGljaycsICcubGlzdC1oZWFkZXIgPiAuZmlsdGVycyA+IC5maWx0ZXInLCBAaGFuZGxlcnMuZmlsdGVySGFuZGxlclxuICAgICQoXCIubGlzdGluZ1wiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLmZpbHRlcnMgPiAuZmlsdGVyID4gLm9wdGlvbl9zZWxlY3RlZCA+IC5pY29uLmNhbmNlbCcsIEBoYW5kbGVycy5maWx0ZXJDbGVhckhhbmRsZXJcblxuICBkOiAtPlxuICAgIF8ub2ZmIFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiXG4gICAgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dCcpLnZhbCAnJ1xuICAgIEZpbHRlci5oYW5kbGVycy5kKClcbiAgICBMaXN0aW5nLnVuc2VsZWN0QWxsKClcbiAgICAjU3Bpbm5lci5kKClcblxuICBnZXQ6IChzZWFyY2g9bnVsbCkgLT5cbiAgICBTcGlubmVyLmkoJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn0gPiAuaW5uZXIgPiAudmFsdWVzXCIpKVxuXG4gICAgb3B0aW9ucyA9XG4gICAgICB2aWV3OiAnZmlsdGVycydcblxuICAgIGZvciBpbmRleCwgZmlsdGVyIG9mIEZpbHRlci5maWx0ZXJzXG4gICAgICBpZiBmaWx0ZXIgaXNudCBGaWx0ZXIuZmlsdGVyIGFuZCBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIG9wdGlvbnNbZmlsdGVyICsgJy5uYW1lJ10gPSBRdWVyeS5wYXJhbSBmaWx0ZXJcblxuICAgIG9wdGlvbnMubmFtZSA9IHNlYXJjaCBpZiBzZWFyY2ggaXNudCBudWxsXG5cbiAgICBfLmdldCBcIi9hcGkvI3tAZW5kcG9pbnR9XCIsIG9wdGlvbnNcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcycpLmh0bWwgcmVzcG9uc2Uudmlld1xuICAgICAgU3Bpbm5lci5kKClcblxuICBzZWxlY3Q6IChvcHRpb24pIC0+XG4gICAgUXVlcnkucGFyYW0gJ3BhZ2UnLCBmYWxzZVxuICAgIFF1ZXJ5LnBhcmFtIEZpbHRlci5maWx0ZXIsIG9wdGlvblxuICAgIEZpbHRlci5zZWxlY3RlZCBGaWx0ZXIuZmlsdGVyXG4gICAgRmlsdGVyLmQoKVxuICAgIExpc3RpbmcubG9hZCgpXG5cbiAgc2VsZWN0ZWQ6IChmaWx0ZXIpIC0+XG4gICAgaWYgUXVlcnkucGFyYW0oZmlsdGVyKSBpcyB1bmRlZmluZWRcbiAgICAgICQoXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWQgPiAuY29weVwiKS5odG1sICcnXG4gICAgICBfLm9uIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX2RlZmF1bHRcIlxuICAgICAgXy5vZmYgXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWRcIlxuICAgICAgcmV0dXJuIHRydWVcbiAgICAkKFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkID4gLmNvcHlcIikuaHRtbCBRdWVyeS5wYXJhbSBmaWx0ZXJcbiAgICBfLm9mZiBcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9kZWZhdWx0XCJcbiAgICBfLm9uIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkXCJcblxuICBoYW5kbGVyczpcblxuICAgIGk6IC0+XG5cbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLmxhYmVsID4gLmljb24uY2FuY2VsJywgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAna2V5dXAnLCcgLmlubmVyID4gLnNlYXJjaCA+IGlucHV0JywgQGtleUhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBzZWxlY3RIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ21vdXNlb3ZlcicsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQGhvdmVySGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdibHVyJywgIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2NsaWNrJywgQGluc2lkZUNoZWNrXG5cbiAgICAgICQoZG9jdW1lbnQpLm9uICdjbGljaycsIEBvdXRzaWRlQ2hlY2tcblxuICAgIGQ6IC0+XG5cbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC5sYWJlbCA+IC5pY29uLmNhbmNlbCcsIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdrZXl1cCcsJyAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXQnLCBAa2V5SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnY2xpY2snLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBzZWxlY3RIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdtb3VzZW92ZXInLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBob3ZlckhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2JsdXInLCAgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2NsaWNrJywgQGluc2lkZUNoZWNrXG5cbiAgICAgICQoZG9jdW1lbnQpLm9mZiAnY2xpY2snLCBAb3V0c2lkZUNoZWNrXG5cblxuICAgIGZpbHRlckNsZWFySGFuZGxlcjogLT5cbiAgICAgIGNvbnNvbGUubG9nICdhYm91dCB0byBjbGVhcidcbiAgICAgIEZpbHRlci5maWx0ZXIgPSAkKHRoaXMpLmRhdGEgJ2ZpbHRlcidcbiAgICAgIEZpbHRlci5zZWxlY3QgZmFsc2VcbiAgICAgIEZpbHRlci5kKClcblxuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICBmaWx0ZXJIYW5kbGVyOiAtPlxuICAgICAgRmlsdGVyLmQoKVxuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgRmlsdGVyLmZpbHRlciA9ICQodGhpcykuZGF0YSAnZmlsdGVyJ1xuICAgICAgRmlsdGVyLmVuZHBvaW50ID0gJCh0aGlzKS5kYXRhICdlbmRwb2ludCdcblxuXG4gICAgICBpZiAkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIEZpbHRlci5kKClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgIEZpbHRlci5oYW5kbGVycy5pKClcblxuICAgICAgJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn0gPiAuaW5uZXIgPiAudmFsdWVzXCIpLmh0bWwgJydcbiAgICAgIF8ub24gXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9XCJcbiAgICAgICQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9ID4gLmlubmVyID4gLnNlYXJjaCA+IGlucHV0XCIpLmZvY3VzKClcblxuICAgICAgRmlsdGVyLmdldCgpXG5cbiAgICBpbnNpZGVDaGVjazogLT5cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgb3V0c2lkZUNoZWNrOiAtPlxuICAgICAgRmlsdGVyLmQoKVxuXG4gICAgaG92ZXJIYW5kbGVyOiAtPlxuXG4gICAgICBfLm9mZiAnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUub24nXG4gICAgICBfLm9uICQodGhpcylcblxuICAgIHNlbGVjdEhhbmRsZXI6IC0+XG4gICAgICBGaWx0ZXIuc2VsZWN0ICQodGhpcykuZmluZCgnLm5hbWUnKS5odG1sKClcblxuICAgIGtleUhhbmRsZXI6IC0+XG5cbiAgICAgIGtleSA9IGV2ZW50LmtleUNvZGVcblxuICAgICAgc3dpdGNoIGtleVxuICAgICAgICB3aGVuIDI3IHRoZW4gRmlsdGVyLmQoKVxuICAgICAgICB3aGVuIDQwLCAzOSB0aGVuIEZpbHRlci5uYXYgJ2Rvd24nXG4gICAgICAgIHdoZW4gMzcsMzggdGhlbiBGaWx0ZXIubmF2ICd1cCdcbiAgICAgICAgd2hlbiAxMyB0aGVuIEZpbHRlci5zZWxlY3QgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUub24gPiAubmFtZScpLmh0bWwoKVxuICAgICAgICBlbHNlIEZpbHRlci5nZXQgJCh0aGlzKS52YWwoKVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gIG5hdjogKGRpcikgLT5cblxuICAgIGN1ciA9ICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlLm9uJylcbiAgICBuZXh0ID0gY3VyLm5leHQoKSBpZiBkaXIgaXMgJ2Rvd24nXG4gICAgbmV4dCA9IGN1ci5wcmV2KCkgaWYgZGlyIGlzICd1cCdcbiAgICBfLm9mZiBjdXJcblxuICAgIGlmIG5leHQubGVuZ3RoIGlzbnQgMFxuICAgICAgXy5vbiBuZXh0XG4gICAgICByZXR1cm5cblxuICAgIF8ub24gJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlOmZpcnN0LWNoaWxkJyBpZiBkaXIgaXMgJ2Rvd24nXG4gICAgXy5vbiAnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWU6bGFzdC1jaGlsZCcgaWYgZGlyIGlzICd1cCdcblxuIiwiR2xvYmFsID1cblxuICAjIGtldmluIG9sc29uIChrZXZpbkAyNTYuaW8pIPCfjIDwn463XG5cbiAgd2luZG93OiBmYWxzZVxuICB3aW5kb3dUaW1lcjogZmFsc2VcbiAgaW5pdDogZmFsc2VcbiAgcHJvdGVjdGVkOiBbJ2VudHJpZXMnLCdzdHJ1Y3R1cmVzJywnY2xpZW50cycsJ3VzZXJzJ11cblxuICBpOiAtPlxuICAgIEdsb2JhbC5oYW5kbGVycygpXG4gICAgR2xvYmFsLmxvZ2luQ2hlY2soKVxuXG4gICAgJChcIi5tZW51ID4gLm9wdGlvbl8je1BhZ2V9XCIpLmFkZENsYXNzKCdhY3RpdmUnKSBpZiBQYWdlP1xuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnKS5jbGljayBHbG9iYWwudXNlclByb2ZpbGVIYW5kbGVyXG4gICAgJCgnLm9hdXRocyA+IC5vYXV0aCcpLmNsaWNrIEdsb2JhbC51c2VyT2F1dGhIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiAubG9nb3V0JykuY2xpY2sgR2xvYmFsLmxvZ291dEhhbmRsZXJcbiAgICAkKCcubWVudSA+IC5vcHRpb24nKS5jbGljayBHbG9iYWwubWVudUhhbmRsZXJcblxuICBtZW51SGFuZGxlcjogLT5cbiAgICAkKCcubWVudSA+IC5vcHRpb24nKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICQodGhpcykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICBTcGlubmVyLmkoJCgnaGVhZGVyJykpXG5cbiAgbG9nb3V0SGFuZGxlcjogLT5cblxuICAgIFByb21wdC5pICdMb2dvdXQnLCAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICByZXR1cm4gZmFsc2UgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuXG4gICAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgICAgTWUubG9nb3V0IC0+XG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnBpY3R1cmUnXG4gICAgICAgIE5vdGljZS5pICdMb2dvdXQgU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuICAgICAgICAsIDEyMDBcblxuICB1c2VyUHJvZmlsZUhhbmRsZXI6IC0+XG5cbiAgICBvYSA9ICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5vYXV0aHMnKVxuICAgIHRsID0gbmV3IFRpbWVsaW5lTWF4IHJlcGVhdDogMFxuXG4gICAgaWYgb2EuaGFzQ2xhc3MgJ29mZidcbiAgICAgIF8ub24gb2FcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI2NhbmNlbFNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICBlbHNlXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNwcm9maWxlU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgICAgXy5vZmYgb2EsIG9mZmluZzogMC41XG5cbiAgdXNlck9hdXRoSGFuZGxlcjogLT5cblxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICByZXR1cm4gdHJ1ZSBpZiB0eXBlIGlzICdjYW5jZWwnXG5cbiAgICBHbG9iYWwub2F1dGhXaW5kb3cgJy9sb2FkaW5nJ1xuXG4gICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICBwYXJhbXMgPSB7fVxuICAgIHBhcmFtcy5pbnZpdGUgPSBJbnZpdGUuaGFzaCBpZiBJbnZpdGUuaGFzaFxuXG4gICAgTWUub2F1dGggdHlwZSwgcGFyYW1zLCAodXJpKSAtPlxuICAgICAgR2xvYmFsLndpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJpXG5cbiAgb2F1dGhXaW5kb3c6ICh1cmwpIC0+XG4gICAgdyA9IDY0MFxuICAgIGggPSA1NTBcbiAgICBsZWZ0ID0gKHNjcmVlbi53aWR0aC8yKSAtICh3LzIpXG4gICAgdG9wID0gKHNjcmVlbi5oZWlnaHQvMikgLSAoaC8yKVxuXG5cbiAgICBHbG9iYWwud2luZG93ID0gd2luZG93Lm9wZW4odXJsLCAnTG9naW4gLyBSZWdpc3RlcicsIFwidG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPSN7d30saGVpZ2h0PSN7aH0sdG9wPSN7dG9wfSxsZWZ0PSN7bGVmdH1cIilcbiAgICBHbG9iYWwud2luZG93LmZvY3VzIGlmIHdpbmRvdy5mb2N1c1xuICAgIEdsb2JhbC53aW5kb3dUaW1lciA9IHNldEludGVydmFsIC0+XG4gICAgICBpZiBHbG9iYWwud2luZG93LmNsb3NlZFxuICAgICAgICBjbGVhckludGVydmFsIEdsb2JhbC53aW5kb3dUaW1lclxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBjb25zb2xlLmxvZyAnY2xvc2luZyBvdXIgc2hpdGUnXG4gICAgLCA1MFxuXG4gICAgcmV0dXJuXG5cbiAgb2F1dGhDb21wbGV0ZTogKHVzZXIpIC0+XG4gICAgU3Bpbm5lci5kKClcbiAgICBHbG9iYWwubG9naW4gdXNlclxuICAgIE5vdGljZS5pICdMb2dpbiBTdWNjZXNzZnVsJywgJ3N1Y2Nlc3MnXG4gICAgaWYgVXNlci5jbGllbnQgaXNudCB1bmRlZmluZWRcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZW50cmllcydcbiAgICAgIDIwMDBcbiAgICBlbHNlXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcbiAgICAgIDIwMDBcblxuICBsb2dpbjogKHVzZXIpIC0+XG5cbiAgICB3aW5kb3cuVXNlciA9IHVzZXJcblxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5waWN0dXJlID4gLmltYWdlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tVc2VyLnBpY3R1cmV9KVwiXG4gICAgXy5vZmYgJy5tZSA+IC5wcm9maWxlJ1xuICAgIF8ub2ZmICcubWUgPiAub2F1dGhzJ1xuICAgIF8ub24gJy5tZSA+IC5waWN0dXJlJ1xuXG4gICAgaWYgVXNlci5jbGllbnQgaXNudCB1bmRlZmluZWRcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5jbGllbnQgPiAubmFtZScpLmh0bWwgVXNlci5jbGllbnQubmFtZVxuICAgICAgJCgnaGVhZGVyID4gLmlubmVyID4gLmNsaWVudCA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tVc2VyLmNsaWVudC5wcm9maWxlfSlcIlxuICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLmNsaWVudCdcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubG9nbydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vcHRpb25fY2xpZW50cydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubWVudSA+IC5vcHRpb25fc3RydWN0dXJlcydcbiAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5tZW51J1xuXG4gIGxvZ2luQ2hlY2s6IC0+XG5cbiAgICBNZS5hdXRoZWQgKHJlc3VsdCkgLT5cblxuICAgICAgR2xvYmFsLmxvZ2luKHJlc3VsdCkgaWYgcmVzdWx0IGlzbnQgZmFsc2VcblxuICAgICAgIyBpZiB0aGUgcGFnZSB3ZXJlIG9uIFxuICAgICAgaWYgR2xvYmFsLnByb3RlY3RlZC5pbmRleE9mKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcLy9nLCAnJykpIGlzbnQgLTEgYW5kIHJlc3VsdCBpcyBmYWxzZVxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG5cbiAgICAgIGlmIEdsb2JhbC5pbml0IGlzbnQgZmFsc2UgYW5kIHJlc3VsdCBpc250IGZhbHNlXG4gICAgICAgIHdpbmRvd1tHbG9iYWwuaW5pdF0uaSgpXG5cbiAgICAgICMgdHVybiBvbiBhbGwgbG9naW4gLyByZWdpc3RyYXRpb24gZGl2c1xuICAgICAgaWYgd2luZG93LlVzZXIgaXMgdW5kZWZpbmVkXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5wcm9maWxlJ1xuICAgICAgICBfLm9uICcucGFnZS5ob21lJ1xuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubG9nbydcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm5hbWUnXG5cbiAgICAgICMgY2xpZW50IGJhc2VkIHVzZXIsIGdvIHRvIGVudHJpZXNcbiAgICAgIGlmIFVzZXI/LmNsaWVudCBpc250IHVuZGVmaW5lZCBhbmQgUGFnZSBpc250ICdlbnRyaWVzJ1xuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9lbnRyaWVzJ1xuXG4gICAgICBpZiB3aW5kb3cuVXNlciBpc250IHVuZGVmaW5lZCBhbmQgVXNlci5jbGllbnQgaXMgdW5kZWZpbmVkXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5sb2dvJ1xuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcbiAgICAgICAgXy5vbiAnLm1lbnUnXG4iLCJfLmNvbnN0cnVjdG9yKClcblxuY2xhc3MgSW5kZXhcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAbW9iaWxlXG5cbiAgbW9iaWxlOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG4iLCJJbnZpdGUgPVxuICBoYXNoOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuaW52aXRlJykpXG5cbiAgICBpZiBVc2VyPyBpc250IGZhbHNlXG4gICAgICBTcGlubmVyLmQoKVxuICAgICAgUHJvbXB0LmkgJ0ludml0ZSBFcm9ycicsICdZb3UgYXJlIGN1cnJlbnRseSBsb2dnZWQgaW4nLCBbJ09LJ10sIHt9LCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG5cbiAgICBlbHNlXG4gICAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9pbnZpdGVcXC8oWzAtOWEtZkEtRl17OH0pL1xuICAgICAgICBAaGFzaCA9IG1hdGNoWzFdXG4gICAgICAgIEBsb2FkIEBoYXNoXG4gICAgICBlbHNlXG5cbiAgbG9hZDogKGhhc2gpIC0+XG5cbiAgICBfLmdldCAnL2FwaS9pbnZpdGUvZ2V0JyxcbiAgICAgIGhhc2g6IGhhc2hcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXN1bHQpIC0+XG4gICAgICBpbnZpdGUgPSByZXN1bHQuZGF0YS5pbnZpdGVcblxuICAgICAgJCgnLnBhZ2UuaW52aXRlID4gLnByb2ZpbGUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLFwidXJsKCN7aW52aXRlLmNsaWVudC5wcm9maWxlfSlcIlxuICAgICAgJCgnLnBhZ2UuaW52aXRlID4gLnRpdGxlJykuaHRtbCBpbnZpdGUuY2xpZW50Lm5hbWVcbiIsIkxpc3RpbmcgPVxuICBjb250ZW50OiBmYWxzZVxuICBzZWxlY3RlZDogW11cbiAgZmlsdGVyczogW11cbiAgc2VsZWN0ZWRDdXJzb3I6IDBcblxuICBvdGhlckFjdGlvbnM6IGZhbHNlXG5cbiAgaTogKGNvbnRlbnQsIG90aGVyQWN0aW9ucz1mYWxzZSwgZmlsdGVycz1bXSkgLT5cblxuICAgIEBmaWx0ZXJzID0gZmlsdGVyc1xuICAgIEBjb250ZW50ID0gY29udGVudFxuICAgIEBvdGhlckFjdGlvbnMgPSBvdGhlckFjdGlvbnNcbiAgICBAbG9hZCgpXG4gICAgQGhhbmRsZXJzKClcblxuXG4gICAgRmlsdGVyLmkgQGZpbHRlcnMgaWYgQGZpbHRlcnMubGVuZ3RoID4gMFxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLmNoZWNrYm94JywgQGNoZWNrYm94SGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLnN3aXRjaCcsIEBzd2l0Y2hIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjaGFuZ2UnLCAnLmxpc3QtaGVhZGVyID4gLmNoZWNrYm94ID4gaW5wdXQnLCBAc2VsZWN0QWxsSGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2hhbmdlJywgJy5jaGVja2JveCA+IGlucHV0JywgQHN0YXRlSGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb24nLCBAYWN0aW9uSGFuZGxlclxuXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICc+IC5pbm5lciA+IC5wYWdpbmF0ZSA+IC5pbm5lciA+IC5udW0nLCBAcGFnZUhhbmRsZXJcblxuICBjaGVja2JveEhhbmRsZXI6IC0+XG4gICAgY2IgPSAkKHRoaXMpLmZpbmQgJ2lucHV0J1xuICAgIGlmIGV2ZW50LnRhcmdldC50eXBlIGlzbnQgJ2NoZWNrYm94J1xuICAgICAgY2JbMF0uY2hlY2tlZCA9ICFjYlswXS5jaGVja2VkXG4gICAgICBjYi5jaGFuZ2UoKVxuXG4gIHN3aXRjaEhhbmRsZXI6IC0+XG5cbiAgICBlbCA9ICQodGhpcylcblxuICAgIF9pZCA9IGVsLmRhdGEgJ19pZCdcbiAgICBuYW1lID0gZWwuZGF0YSAnbmFtZSdcbiAgICB2YWx1ZSA9ICFlbC5oYXNDbGFzcyAnb24nXG5cbiAgICBMaXN0aW5nLnRvZ2dsZSBbX2lkXSwgbmFtZSwgdmFsdWUsIC0+XG4gICAgICBfLnN3YXAgZWxcblxuICB0b2dnbGU6IChpZHMsIG5hbWUsIHZhbHVlLCBjb21wbGV0ZSkgLT5cblxuICAgIGlkcy5mb3JFYWNoIChfaWQsIGluZGV4KSAtPlxuXG4gICAgICBvcHRpb25zID0ge31cbiAgICAgIG9wdGlvbnNbbmFtZV0gPSB2YWx1ZVxuXG4gICAgICBfLmdldCBcIi9hcGkvI3tMaXN0aW5nLmNvbnRlbnR9L3VwZGF0ZS8je19pZH1cIixcbiAgICAgICAgb3B0aW9uc1xuICAgICAgLmRvbmUgKHJlc3Bvc25lKSAtPlxuICAgICAgICBpZiBpbmRleCBpcyBpZHMubGVuZ3RoLTFcbiAgICAgICAgICBOb3RpY2UuaSBcIlVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICAgIGNvbXBsZXRlPygpXG5cbiAgc2VsZWN0QWxsSGFuZGxlcjogLT5cbiAgICBpZiB0aGlzLmNoZWNrZWRcbiAgICAgICQoJy5saXN0aW5nID4gLmlubmVyID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLnByb3AgJ2NoZWNrZWQnLCB0cnVlXG4gICAgZWxzZVxuICAgICAgJCgnLmxpc3RpbmcgPiAuaW5uZXIgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykucHJvcCAnY2hlY2tlZCcsIGZhbHNlXG5cbiAgdW5zZWxlY3RBbGw6IC0+XG4gICAgICAkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9ID4gLmlubmVyID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dFwiKS5wcm9wICdjaGVja2VkJywgZmFsc2VcbiAgICAgICQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH0gPiAubGlzdC1oZWFkZXIgPiAuY2hlY2tib3ggPiBpbnB1dFwiKS5wcm9wICdjaGVja2VkJywgZmFsc2VcbiAgICAgIExpc3Rpbmcuc3RhdGVIYW5kbGVyKClcblxuICBzdGF0ZUhhbmRsZXI6IC0+XG4gICAgaWRzID0gW11cblxuICAgICQoJy5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXQnKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIGlmIGVsLmNoZWNrZWRcbiAgICAgICAgaWRzLnB1c2ggJChlbCkuZGF0YSAnX2lkJ1xuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG4gICAgICBpZiBpZHMubGVuZ3RoID4gMFxuICAgICAgICAkKCcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zID4gLmNvcHkgPiAudmFsdWUnKS50ZXh0IGlkcy5sZW5ndGhcbiAgICAgICAgXy5vZmYgJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzJ1xuICAgICAgICBfLm9uICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zJ1xuICAgICAgICBfLm9uIFwiLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbl8je0xpc3RpbmcuY29udGVudH1cIlxuICAgICAgZWxzZVxuICAgICAgICBfLm9uICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cydcbiAgICAgICAgXy5vZmYgJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMnXG4gICAgICAgIF8ub2ZmIFwiLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbl8je0xpc3RpbmcuY29udGVudH1cIlxuICAgICAgTGlzdGluZy5zZWxlY3RlZCA9IGlkc1xuXG4gIHBhZ2VMaW5rczogLT5cbiAgICBwYXJhbXMgPSBRdWVyeS5wYXJhbXMoKVxuICAgICQoJy5wYWdpbmF0ZSA+IC5pbm5lciA+IC5udW0nKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIHBhZ2UgPSAkKGVsKS5kYXRhICdwYWdlJ1xuICAgICAgcmV0dXJuIGlmIHBhZ2UgaXMgdW5kZWZpbmVkXG4gICAgICBwYXJhbXMucGFnZSA9IHBhZ2VcbiAgICAgIHF1ZXJ5ID0gUXVlcnkuc3RyaW5naWZ5IHBhcmFtc1xuICAgICAgJChlbCkuYXR0ciAnaHJlZicsIFwiPyN7UXVlcnkuc3RyaW5naWZ5KHBhcmFtcyl9XCJcblxuICBwYWdlSGFuZGxlcjogLT5cbiAgICBwYWdlID0gJCh0aGlzKS5kYXRhICdwYWdlJ1xuICAgIHJldHVybiB0cnVlIGlmIHBhZ2UgaXMgdW5kZWZpbmVkXG4gICAgTGlzdGluZy51bnNlbGVjdEFsbCgpXG4gICAgUXVlcnkucGFyYW0gJ3BhZ2UnLCBwYWdlXG4gICAgTGlzdGluZy5sb2FkKClcbiAgICByZXR1cm4gZmFsc2VcblxuICBhY3Rpb25IYW5kbGVyOiAtPlxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICBzd2l0Y2ggdHlwZVxuICAgICAgd2hlbiAnZGVsZXRlJ1xuICAgICAgICBQcm9tcHQuaSBcIkRlbGV0aW5nICN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IGl0ZW1zKHMpXCIsXG4gICAgICAgICAgJ1RoaXMgZmVhdHVyZSBpcyBjdXJyZW50bHkgaW4gZGV2ZWxvcG1lbnQnLCBbJ09LJ10sIChyZXNwb25zZSkgLT5cbiAgICAgICAgIyMjXG4gICAgICAgIFByb21wdC5pIFwiRGVsZXRpbmcgI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gaXRlbXMocylcIixcbiAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGVzZT8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJldHVybiB0cnVlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcbiAgICAgICAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQoKVxuICAgICAgICAjIyNcblxuICAgICAgd2hlbiAncHVibGlzaCcsICdoaWRlJ1xuXG4gICAgICAgIHZhbHVlID0gKHR5cGUgaXMgJ3B1Ymxpc2gnKVxuICAgICAgICBTcGlubmVyLmkoJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fVwiKSlcbiAgICAgICAgTGlzdGluZy50b2dnbGUgTGlzdGluZy5zZWxlY3RlZCwgJ2FjdGl2ZScsIHZhbHVlLCAtPlxuXG4gICAgICAgICAgJCgnLnN3aXRjaC5hY3RpdmUnKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgICAgICAgIGZvciBfaWQgaW4gTGlzdGluZy5zZWxlY3RlZFxuICAgICAgICAgICAgICBfLm9uICQoZWwpIGlmIF9pZCBpcyAkKGVsKS5kYXRhKCdfaWQnKSBhbmQgdmFsdWUgaXMgdHJ1ZVxuICAgICAgICAgICAgICBfLm9mZiAkKGVsKSBpZiBfaWQgaXMgJChlbCkuZGF0YSgnX2lkJykgYW5kIHZhbHVlIGlzIGZhbHNlXG5cbiAgICAgICAgICBpZiB2YWx1ZVxuICAgICAgICAgICAgTm90aWNlLmkgXCIje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBFbnRyaWVzIHB1Ymxpc2hlZFwiLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBOb3RpY2UuaSBcIiN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IEVudHJpZXMgaGlkZGVuXCIsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICAgIFNwaW5uZXIuZCgpXG5cblxuICAgICAgZWxzZVxuICAgICAgICBMaXN0aW5nLm90aGVyQWN0aW9ucyh0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gIGRlbGV0ZTogKGlkLCBjYWxsYmFjaykgLT5cblxuICAgICMjI1xuICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuICAgIF8uZ2V0IFwiL2FwaS8je0xpc3RpbmcuY29udGVudH0vZGVsZXRlLyN7aWR9XCJcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGNhbGxiYWNrIHRydWVcbiAgICAuZmFpbCAtPlxuICAgICAgY2FsbGJhY2sgZmFsc2VcbiAgICAjIyNcblxuICBkZWxldGVTZWxlY3RlZDogKGN1cnNvcj0wKSAtPlxuXG4gICAgaWYgTGlzdGluZy5zZWxlY3RlZC5sZW5ndGggaXMgY3Vyc29yXG4gICAgICBOb3RpY2UuaSAnU3RydWN0dXJlKHMpIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICBAbG9hZCgpXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgTGlzdGluZy5kZWxldGUgTGlzdGluZy5zZWxlY3RlZFtjdXJzb3JdLCAocmVzdWx0KSAtPlxuICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCArK2N1cnNvciBpZiByZXN1bHQgaXMgdHJ1ZVxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fVwiKSlcblxuICAgIG9wdGlvbnMgPSB2aWV3OiB0cnVlXG5cbiAgICBmb3IgZmlsdGVyIGluIEBmaWx0ZXJzXG4gICAgICBpZiBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIG9wdGlvbnNbZmlsdGVyICsgJy5uYW1lJ10gPSBRdWVyeS5wYXJhbSBmaWx0ZXJcbiAgICBpZiBRdWVyeS5wYXJhbSgncGFnZScpIGlzbnQgdW5kZWZpbmVkXG4gICAgICBvcHRpb25zLnBhZ2UgPSBRdWVyeS5wYXJhbSAncGFnZSdcblxuICAgIF8uZ2V0IFwiL2FwaS8je0Bjb250ZW50fVwiLCBvcHRpb25zXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgVGltZS5pKClcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAkKCcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cyA+IC5jb3B5ID4gLnZhbHVlJykudGV4dCByZXNwb25zZS5wYWdpbmF0ZS50b3RhbFxuICAgICAgJChcIi4je0Bjb250ZW50fSA+IC5jb250ZW50ID4gLmxpc3RpbmcgPiAuaW5uZXJcIikuaHRtbCByZXNwb25zZS52aWV3XG4gICAgICBMaXN0aW5nLnBhZ2VMaW5rcygpXG5cblxuIiwiIiwiTWUgPVxuXG4gIGxvZ291dDogKGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgJy9hcGkvYXV0aC9sb2dvdXQnXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIGNvbXBsZXRlKClcblxuICBvYXV0aDogKHR5cGUsIHBhcmFtcz17fSwgY29tcGxldGUpIC0+XG5cbiAgICBfLmdldCBcIi9hcGkvYXV0aC8je3R5cGV9XCIsIHBhcmFtc1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZShyZXNwb25zZS5kYXRhLnVyaSlcblxuICBhdXRoZWQ6IChyZXN1bHQpIC0+XG4gICAgXy5nZXQgJy9hcGkvYXV0aCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgcmVzdWx0IHJlc3BvbnNlLmRhdGEudXNlclxuXG4gIGdldDpcbiAgICBjbGllbnRJZDogLT5cbiAgICAgIHJldHVybiBVc2VyLmNsaWVudC5pZFxuIiwiTm90Zm91bmQgPVxuICBpOiAtPlxuICAgICQoJyNsaW5lZXJyb3InKS5ub3ZhY2FuY3lcbiAgICAgICdyZWJsaW5rUHJvYmFiaWxpdHknOiAwLjFcbiAgICAgICdibGlua01pbic6IDAuMlxuICAgICAgJ2JsaW5rTWF4JzogMC42XG4gICAgICAnbG9vcE1pbic6IDhcbiAgICAgICdsb29wTWF4JzogMTBcbiAgICAgICdjb2xvcic6ICcjZmZmZmZmJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4ICNmZmZmZmYnLCAnMCAwIDMwcHggIzAwODAwMCcsICcwIDAgNnB4ICMwMDAwZmYnXVxuXG4gICAgJCgnI2xpbmVjb2RlJykubm92YWNhbmN5XG4gICAgICAnYmxpbmsnOiAxXG4gICAgICAnb2ZmJzogMVxuICAgICAgJ2NvbG9yJzogJ1JlZCdcbiAgICAgICdnbG93JzogWycwIDAgODBweCBSZWQnLCAnMCAwIDMwcHggRmlyZUJyaWNrJywgJzAgMCA2cHggRGFya1JlZCddXG4iLCJOb3RpY2UgPVxuXG4gIHR5cGVzOiBbJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZyddXG5cbiAgZWw6IGZhbHNlXG5cbiAgb246IGZhbHNlXG4gIHByb2dyZXNzOiBmYWxzZVxuICB0aW1lb3V0OiBmYWxzZVxuICBjbG9zZTogdHJ1ZVxuXG4gIGRlZmF1bHQ6XG4gICAgdHlwZTogJ2luZm8nXG4gICAgcHJvZ3Jlc3M6IGZhbHNlXG4gICAgdGltZW91dDogNTAwMFxuXG4gIGk6IChjb3B5LG9wdGlvbnM9e30pIC0+XG5cbiAgICBAb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ge30sIEBkZWZhdWx0XG5cbiAgICBmb3Iga2V5LCBwYXJhbSBvZiBvcHRpb25zXG4gICAgICBAb3B0aW9uc1trZXldID0gcGFyYW1cblxuICAgIEBlbCA9ICQoJy5ub3RpY2UnKSBpZiBAZWwgaXMgZmFsc2VcblxuICAgIGZvciBkdHlwZSBpbiBAdHlwZXNcbiAgICAgIEBlbC5yZW1vdmVDbGFzcyBkdHlwZVxuICAgIEBlbC5hZGRDbGFzcyBAb3B0aW9ucy50eXBlXG4gICAgQGVsLmZpbmQoJy5jb3B5ID4gLm1lc3NhZ2UnKS5odG1sIGNvcHlcblxuICAgIGlmIEBvcHRpb25zLnByb2dyZXNzIGlzbnQgZmFsc2VcbiAgICAgIGlmIEBwcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgICBfLm9uIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgICAgQHByb2dyZXNzID0gdHJ1ZVxuICAgICAgaWYgQGNsb3NlIGlzIHRydWVcbiAgICAgICAgXy5vZmYgQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICAgIEBjbG9zZSA9IGZhbHNlXG4gICAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG4gICAgICAgICwgMTAwXG4gICAgICBlbHNlXG4gICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZSBhbmQgQHByb2dyZXNzIGlzIHRydWVcbiAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCAnMCUnKVxuICAgICAgXy5vZmYgQGVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgICAgQHByb2dyZXNzID0gZmFsc2VcbiAgICAgIF8ub24gQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICBAY2xvc2UgPSB0cnVlXG5cbiAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgIF8ub24gQGVsXG4gICAgICBAaGFuZGxlcnMub24oKVxuICAgICAgQG9uID0gdHJ1ZVxuXG4gICAgaWYgQG9wdGlvbnMudGltZW91dCBpc250IGZhbHNlIGFuZCBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgQHRpbWVvdXQgPSBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEBkKClcbiAgICAgICwgQG9wdGlvbnMudGltZW91dFxuXG4gIGhhbmRsZXJzOlxuICAgIG9uOiAtPlxuICAgICAgJCgnLm5vdGljZScpLm9uICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuICAgIG9mZjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC5jbG9zZSA+IC5pbm5lcicsIE5vdGljZS5kXG5cbiAgZDogLT5cbiAgICBjbGVhclRpbWVvdXQgTm90aWNlLnRpbWVvdXQgaWYgTm90aWNlLnRpbWVvdXQgaXNudCBmYWxzZVxuICAgIE5vdGljZS50aW1lb3V0ID0gZmFsc2VcbiAgICBOb3RpY2UuaGFuZGxlcnMub2ZmKClcbiAgICBfLm9uIE5vdGljZS5lbC5maW5kKCcuY2xvc2UnKVxuICAgIE5vdGljZS5jbG9zZSA9IHRydWVcbiAgICBfLm9mZiBOb3RpY2UuZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgTm90aWNlLnByb2dyZXNzID0gZmFsc2VcbiAgICBfLm9mZiBOb3RpY2UuZWwsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC4yXG4gICAgTm90aWNlLm9uID0gZmFsc2VcbiIsIlByb21wdCA9XG4gIGVsOiB7fVxuICBvcHRpb25zOiB7fVxuICBjYWxsYmFjazogZmFsc2VcbiAgcGFyYW1zOiB7fVxuXG4gIGk6ICh0aXRsZSwgY29weSwgb3B0aW9ucz1bJ09LJ10sIHBhcmFtcywgY2FsbGJhY2spIC0+XG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBmYWxzZVxuICAgIFByb21wdC5wYXJhbXMgPSBmYWxzZVxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ2Z1bmN0aW9uJ1xuICAgIFByb21wdC5jYWxsYmFjayA9IGNhbGxiYWNrIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG5cbiAgICBQcm9tcHQucGFyYW1zID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCdcblxuICAgIFByb21wdC5lbCA9ICQgJy5wcm9tcHQnXG5cbiAgICBQcm9tcHQuZWwuZmluZCAnLnRpdGxlJ1xuICAgICAgLmh0bWwgdGl0bGVcbiAgICBQcm9tcHQuZWwuZmluZCAnLmNvcHknXG4gICAgICAuaHRtbCBjb3B5XG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAndGV4dGFyZWEnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLnRleHRhcmVhIGlzIHRydWVcbiAgICAgIF8ub24gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICAgIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCBwYXJhbXMudmFsdWVcblxuICAgIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCcgYW5kICdjbGlwYm9hcmQnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLmNsaXBib2FyZCBpcyB0cnVlXG4gICAgICBpbnB1dCA9IFByb21wdC5lbC5maW5kICcuaW5wdXQnXG4gICAgICBfLm9uIGlucHV0XG4gICAgICBpbnB1dC5maW5kKCdpbnB1dCcpLnZhbCBwYXJhbXMudmFsdWVcblxuXG4gICAgUHJvbXB0Lm9wdGlvbnMgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbnMgPiAub3B0aW9uJ1xuICAgIF8ub2ZmIFByb21wdC5vcHRpb25zXG4gICAgUHJvbXB0Lm9wdGlvbnMucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmFkZENsYXNzICdhY3RpdmUnXG5cbiAgICBmb3IgbyxpIGluIG9wdGlvbnNcbiAgICAgIG9wdGlvbiA9IFByb21wdC5lbC5maW5kIFwiLm9wdGlvbnMgID4gLm9wdGlvbl8je2krMX1cIlxuICAgICAgXy5vbiBvcHRpb25cbiAgICAgIG9wdGlvbi5odG1sIG9cbiAgICAgICAgLmRhdGEgJ3ZhbHVlJywgb1xuXG4gICAgXy5vbiBQcm9tcHQuZWwsXG4gICAgXy5vbiAnLmJmYWRlJ1xuXG4gICAgUHJvbXB0LmhhbmRsZXJzKClcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmZvY3VzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKGRvY3VtZW50KS5rZXlkb3duIFByb21wdC5rZXlkb3duXG4gICAgUHJvbXB0Lm9wdGlvbnMub24gJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbm5lciA+IC5jYW5jZWwnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2FuY2VsXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5jbGlwYm9hcmQnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2xpcGJvYXJkXG5cblxuICBjbGlwYm9hcmQ6IC0+XG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbnB1dCA+IGlucHV0Jykuc2VsZWN0KClcbiAgICBpZiBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG4gICAgICBOb3RpY2UuaSAnQ29waWVkIHRvIGNsaXBib2FyZCcsIHR5cGU6ICdzdWNjZXNzJ1xuICAgIGVsc2VcbiAgICAgIE5vdGljZS5pICdVbmFibGUgdG8gY2xpcGJvYXJkJywgdHlwZTogJ3dhcm5pbmcnXG5cbiAga2V5ZG93bjogLT5cbiAgICBrID0gZXZlbnQud2hpY2hcbiAgICBrZXlzID0gWzM5LCA5LCAzNywgMTMsIDI3XVxuICAgIHJldHVybiB0cnVlIGlmIGsgbm90IGluIGtleXNcblxuICAgIGN1cnJlbnQgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbi5vbi5hY3RpdmUnXG4gICAgc2hpZnQgPSB3aW5kb3cuZXZlbnQuc2hpZnRLZXlcblxuICAgIGlmIGsgaXMgMzkgb3IgKGsgaXMgOSBhbmQgIXNoaWZ0KVxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgaWYgY3VycmVudC5uZXh0KCkuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBjdXJyZW50Lm5leHQoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgZWxzZVxuICAgICAgICBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbl8xJykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAzNyBvciAoayBpcyA5IGFuZCBzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQucHJldigpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5wcmV2KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24ub24nKS5sYXN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAxM1xuICAgICAgUHJvbXB0LnRyaWdnZXIgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24uYWN0aXZlJykuZGF0YSAndmFsdWUnXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZiBrIGlzIDI3XG4gICAgICBQcm9tcHQudHJpZ2dlcihmYWxzZSlcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gIGNhbmNlbDogLT5cbiAgICBQcm9tcHQudHJpZ2dlciBmYWxzZVxuXG4gIGNsaWNrOiAtPlxuICAgIFByb21wdC50cmlnZ2VyICQodGhpcykuZGF0YSAndmFsdWUnXG5cbiAgdHJpZ2dlcjogKHZhbHVlKSAtPlxuICAgIF8ub2ZmIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgXy5vZmYgUHJvbXB0LmVsLCBvZmZpbmc6IGZhbHNlLCBvZmZ0aW1lOiAwLjJcbiAgICAjXy5vZmYgJy5iZmFkZScsIG9mZmluZzogZmFsc2UsIG9mZml0bWU6IDAuMlxuICAgIF8ub2ZmICcuYmZhZGUnXG4gICAgUHJvbXB0Lm9wdGlvbnMudW5iaW5kICdjbGljaycsIFByb21wdC5jbGlja1xuICAgICQoZG9jdW1lbnQpLnVuYmluZCAna2V5ZG93bicsIFByb21wdC5rZXlkb3duXG4gICAgaWYgUHJvbXB0LnBhcmFtcy50ZXh0YXJlYVxuICAgICAgdmFsID0gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsKClcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gcmVzcG9uc2U6IHZhbHVlLCB2YWw6IHZhbFxuICAgIGVsc2VcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gdmFsdWVcbiIsIlF1ZXJ5ID1cblxuICBnZXRRdWVyeTogLT5cbiAgICByZXR1cm4gbG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpXG5cbiAgc2V0UXVlcnk6IChwYXJhbXMpIC0+XG4gICAgcXVlcnkgPSBxcy5zdHJpbmdpZnkgcGFyYW1zXG4gICAgaWYgcXVlcnkgaXMgdW5kZWZpbmVkIG9yIHF1ZXJ5IGlzICcnXG4gICAgICBoaXN0b3J5LnB1c2hTdGF0ZSBudWxsLCBudWxsLCBsb2NhdGlvbi5wYXRobmFtZVxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGhpc3RvcnkucHVzaFN0YXRlIG51bGwsIG51bGwsIGxvY2F0aW9uLnBhdGhuYW1lICsgJz8nICsgcXVlcnlcbiAgICBcbiAgcGFyYW06IChrZXksIHZhbHVlKSAtPlxuXG4gICAgcXVlcnkgPSBAZ2V0UXVlcnkoKVxuXG4gICAgcGFyYW1zID0gcXMucGFyc2UgcXVlcnlcblxuICAgIHJldHVybiBwYXJhbXNba2V5XSBpZiB2YWx1ZSBpcyB1bmRlZmluZWRcblxuICAgIGlmIHZhbHVlIGlzIGZhbHNlXG4gICAgICBkZWxldGUgcGFyYW1zW2tleV1cbiAgICBlbHNlXG4gICAgICBwYXJhbXNba2V5XSA9IHZhbHVlXG4gICAgQHNldFF1ZXJ5IHBhcmFtc1xuXG4gIHBhcmFtczogLT5cbiAgICByZXR1cm4gcXMucGFyc2UgQGdldFF1ZXJ5KClcblxuICBzdHJpbmdpZnk6IChwYXJhbXMpIC0+XG4gICAgcmV0dXJuIHFzLnN0cmluZ2lmeSBwYXJhbXNcblxuIiwiU2VsZWN0aXplID1cblxuICBjbGllbnRzOiAoZWxlbWVudCwgaGFuZGxlciwgb3B0aW9ucykgLT5cbiAgICBzZWxlY3RDbGllbnQgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIGEgQ2xpZW50IFwiXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXY+I3tpdGVtLm5hbWV9PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL2NsaWVudHMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdENsaWVudC5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RDbGllbnRcblxuICBzdHJ1Y3R1cmVzOiAoZWxlbWVudCwgaGFuZGxlciwgb3B0aW9ucykgLT5cblxuICAgIHNlbGVjdFN0cnVjdHVyZSA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgYSBTdHJ1Y3R1cmUgICBcIlxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICBvcGVuT25Gb2N1czogdHJ1ZVxuICAgICAgb25Mb2FkOiBFbnRyeS5zdHJ1Y3R1cmVTcGVjaWZpZWRcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgaXRlbTogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PjxpbWcgY2xhc3M9XFxcInByb2ZpbGVcXFwiIHNyYz1cXFwiI3tpdGVtLmNsaWVudFByb2ZpbGV9XFxcIi8+ICN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PjxpbWcgY2xhc3M9XFxcInByb2ZpbGVcXFwiIHNyYz1cXFwiI3tpdGVtLmNsaWVudFByb2ZpbGV9XFxcIi8+ICN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS9zdHJ1Y3R1cmVzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWUsIGNsaWVudE5hbWU6IGl0ZW0uY2xpZW50Lm5hbWUsIGNsaWVudFByb2ZpbGU6IGl0ZW0uY2xpZW50LnByb2ZpbGVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RTdHJ1Y3R1cmUuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0U3RydWN0dXJlXG5cbiAgdXNlcnM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuICAgIHNlbGVjdFVzZXIgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGx1Z2luczogWydyZW1vdmVfYnV0dG9uJ11cbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgcmVuZGVyOlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdiBzdHlsZT0nbGluZS1oZWlnaHQ6IDMwcHg7Jz4je2l0ZW0ubmFtZX0gKCN7aXRlbS5lbWFpbH0pIDxpbWcgc3JjPScje2l0ZW0ucGljdHVyZX0nIHN0eWxlPSdmbG9hdDogbGVmdDsgd2lkdGg6IDMwcHg7IGhlaWdodDogMzBweDsgbWFyZ2luLXJpZ2h0OiAxMHB4OycgLz48L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvdXNlcnMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZSwgZW1haWw6IGl0ZW0uZW1haWwsIHBpY3R1cmU6IGl0ZW0ucGljdHVyZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdFVzZXIuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0VXNlclxuXG5cbiIsIlxuU3Bpbm5lciA9XG5cbiAgc3RhdGU6IGZhbHNlXG5cbiAgZWw6IHt9XG5cbiAgaTogKGVsLCBvdmVycmlkZSkgLT5cblxuICAgIEBlbCA9ICQoJy5zcGlubmVyJylcblxuICAgIHJlY3QgPSBlbFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgY29vcmRzID1cbiAgICAgIHRvcDogXCIje3JlY3QudG9wICsgJCh3aW5kb3cpLnNjcm9sbFRvcCgpfXB4XCJcbiAgICAgIGxlZnQ6IFwiI3tyZWN0LmxlZnR9cHhcIlxuICAgICAgd2lkdGg6IFwiI3tyZWN0LndpZHRofXB4XCJcbiAgICAgIGhlaWdodDogXCIje3JlY3QuaGVpZ2h0fXB4XCJcblxuICAgIGlmIG92ZXJyaWRlIGlzbnQgdW5kZWZpbmVkXG4gICAgICBmb3Iga2V5LCBjb29yZCBvZiBvdmVycmlkZVxuICAgICAgICBjb29yZHNba2V5XSA9IGNvb3JkXG5cbiAgICBAZWwuY3NzIGNvb3Jkc1xuXG4gICAgXy5vbiBAZWxcbiAgICBAc3RhdGUgPSB0cnVlXG5cbiAgZDogLT5cbiAgICBfLm9mZiBAZWxcbiAgICBAc3RhdGUgPSBmYWxzZVxuIiwiU3RydWN0dXJlID1cblxuICB0ZW1wbGF0ZTogZmFsc2VcbiAgX2lkOiBmYWxzZVxuXG4gIGNsaWVudFNlbGVjdDogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQHRlbXBsYXRlID0gJCgnLm1vZGlmeSA+ICN0ZW1wbGF0ZScpLmh0bWwoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgICBAY2xpZW50U2VsZWN0ID0gU2VsZWN0aXplLmNsaWVudHMgJCgnLnBhZ2Uuc3RydWN0dXJlID4gLm1vZGlmeSA+IC5kZXRhaWwuY2xpZW50ID4gLmlucHV0ID4gc2VsZWN0JyksXG4gICAgICBAY2xpZW50U2VsZWN0aGFuZGxlclxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvc3RydWN0dXJlc1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG4gICAgICBfLm9uICcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnXG4gICAgZWxzZVxuICAgICAgQGVudGl0eUFkZCgpXG4gICAgICBfLm9mZiAnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuc3dpdGNoJ1xuXG4gICAgQGNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuZm9jdXMoKSBpZiBAX2lkIGlzIGZhbHNlXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLm1vcmUnKS5jbGljayBAZW50aXR5QWRkSGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMnKS5vbiAnY2xpY2snLCcuZW50aXR5ID4gLnJlbW92ZScsIEBlbnRpdHlSZW1vdmVIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5zdWJtaXQgPiAuY3RhcCcpLmNsaWNrIEBzdWJtaXRIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5zdWJtaXQgPiAuY3RhJykuY2xpY2sgQG5ld0VudHJ5SGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCcpLm9uICdjbGljaycsIEBjaGVja2JveEhhbmRsZXJcblxuICBjaGVja2JveEhhbmRsZXI6IC0+XG4gICAgXy5zd2FwIHRoaXNcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLnN0cnVjdHVyZScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcy8nLFxuICAgICAgX2lkOiBAX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy9zdHJ1Y3R1cmVzL25ldycgaWYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPCAxXG4gICAgICBzdHJ1Y3R1cmUgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICAkKCcubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCBzdHJ1Y3R1cmUubmFtZVxuXG4gICAgICBpZiBzdHJ1Y3R1cmUuY2xpZW50QWNjZXNzIGlzIHRydWVcbiAgICAgICAgXy5vbiAnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuc3dpdGNoJ1xuICAgICAgZWxzZVxuICAgICAgICBfLm9mZiAnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuc3dpdGNoJ1xuXG4gICAgICBmb3IgaSwgZW50aXR5IG9mIHN0cnVjdHVyZS5lbnRpdGllc1xuICAgICAgICBTdHJ1Y3R1cmUuZW50aXR5QWRkIGZhbHNlLCBlbnRpdHlcblxuICAgICAgU3RydWN0dXJlLmNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuYWRkT3B0aW9uXG4gICAgICAgIGlkOiBzdHJ1Y3R1cmUuY2xpZW50LmlkLCBuYW1lOiBzdHJ1Y3R1cmUuY2xpZW50Lm5hbWVcbiAgICAgIFN0cnVjdHVyZS5jbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLnNldFZhbHVlIHN0cnVjdHVyZS5jbGllbnQuaWRcblxuXG5cbiAgZW50aXR5QWRkSGFuZGxlcjogLT5cbiAgICBTdHJ1Y3R1cmUuZW50aXR5QWRkKHRydWUpXG5cbiAgZW50aXR5UmVtb3ZlSGFuZGxlcjogLT5cbiAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZSgpXG5cbiAgZW50aXR5QWRkOiAoZm9jdXM9ZmFsc2UsIGVudGl0eT1mYWxzZSkgLT5cblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keScpLmFwcGVuZCBAdGVtcGxhdGVcblxuICAgIGlmIGVudGl0eSBpc250IGZhbHNlXG4gICAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5Omxhc3QtY2hpbGQnKS5maW5kKCcuaW5wdXQgPiBpbnB1dCcpLnZhbChlbnRpdHkubmFtZSlcbiAgICAgIEBzZWxlY3RpemUgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gc2VsZWN0JyksIGVudGl0eS50eXBlXG4gICAgZWxzZVxuICAgICAgQHNlbGVjdGl6ZSAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5Omxhc3QtY2hpbGQnKS5maW5kKCcuaW5wdXQgPiBzZWxlY3QnKVxuXG4gICAgaWYgIGZvY3VzXG4gICAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5ID4gLmlucHV0LnNlbGVjdGl6ZS1pbnB1dCBpbnB1dCcpLmxhc3QoKS5mb2N1cygpXG5cbiAgc2VsZWN0aXplOiAoZWwsIHZhbHVlPWZhbHNlKSAtPlxuICAgIGl6ZWQgPSBlbC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIlR5cGVcIlxuXG4gICAgaXplZFswXS5zZWxlY3RpemUuc2V0VmFsdWUgdmFsdWVcblxuICBzdWJtaXRIYW5kbGVyOiAtPlxuXG4gICAgc3RydWN0dXJlID0ge31cbiAgICBzdHJ1Y3R1cmUuZW50aXRpZXMgPSB7fVxuICAgIHN0cnVjdHVyZS5jbGllbnQgPSAkKCcubW9kaWZ5ID4gLmNsaWVudCA+IC5pbnB1dCA+IHNlbGVjdCcpLnZhbCgpXG4gICAgc3RydWN0dXJlLm5hbWUgPSAkKCcubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCgpXG4gICAgc3RydWN0dXJlLmNsaWVudEFjY2VzcyA9ICQoJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLnN3aXRjaCcpLmhhc0NsYXNzICdvbidcblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHknKS5lYWNoIChpLCBlbCkgLT5cblxuICAgICAgbmFtZSA9ICQoZWwpLmZpbmQoJy5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICAgIHR5cGUgPSAkKGVsKS5maW5kKCcuaW5wdXQgPiBzZWxlY3QnKS52YWwoKVxuXG4gICAgICBzdHJ1Y3R1cmUuZW50aXRpZXNbbmFtZV0gPVxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIHR5cGU6IHR5cGVcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuXG4gICAgICBjb25zb2xlLmxvZyBzdHJ1Y3R1cmUuZW50aXRpZXNcbiAgICAgIFN0cnVjdHVyZS5tb2RpZnkgc3RydWN0dXJlXG5cbiAgbmV3RW50cnlIYW5kbGVyOiAtPlxuICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9lbnRyaWVzL25ldyNzdHJ1Y3R1cmU9I3tTdHJ1Y3R1cmUuX2lkfVwiXG5cbiAgbW9kaWZ5OiAoc3RydWN0dXJlKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLnN0cnVjdHVyZScpKVxuXG4gICAgY2FsbCA9ICcvYXBpL3N0cnVjdHVyZXMvYWRkJ1xuICAgIGlmIFN0cnVjdHVyZS5faWQgaXNudCBmYWxzZVxuICAgICAgY2FsbCA9IFwiL2FwaS9zdHJ1Y3R1cmVzL3VwZGF0ZS8je1N0cnVjdHVyZS5faWR9XCJcblxuICAgIF8uZ2V0IGNhbGwsIHN0cnVjdHVyZVxuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgJ3N1Y2Nlc3MnXG4gICAgICAgIF8ub24gJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YSdcbiAgICAgICAgaWYgU3RydWN0dXJlLl9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL3N0cnVjdHVyZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBTdHJ1Y3R1cmUuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiIsIlN0cnVjdHVyZXMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnc3RydWN0dXJlcycsIGZhbHNlLCBbJ2NsaWVudCddXG5cbiIsIlVzZXJzID1cbiAgaTogLT5cbiAgICBMaXN0aW5nLmkgJ3VzZXJzJ1xuIl19
