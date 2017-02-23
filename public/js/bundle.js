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
    ascii = "\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: " + config.meta.repo;
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
  "view": {
    "paths": ["/Users/k/basal/resources/views"],
    "compiled": "/Users/k/basal/storage/framework/views"
  },
  "color": {
    "white1": "#ffffff",
    "white2": "#f8f8f8",
    "white3": "#F4F4F4",
    "grey1": "#e5e5e5",
    "grey2": "#f5f5f5",
    "grey3": "#d0d0d0",
    "black1": "#000000",
    "black2": "#282828",
    "black3": "#333333",
    "black4": "#23292E",
    "black5": "#3E4347",
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
    "url": "http://basal.dev/",
    "description": "minimal content management",
    "keywords": "cms",
    "repo": "https://github.com/acidjazz/basal"
  },
  "settings": {
    "perpage": 10
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
  "app": {
    "editor": "macvim"
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
        "retry_after": 60
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
  i: function() {
    return this.load();
  },
  load: function(complete) {
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
  i: function() {
    Global.handlers();
    Global.loginCheck();
    if (typeof Page !== "undefined" && Page !== null) {
      return _.on(".menu > .options > .option_" + Page);
    }
  },
  handlers: function() {
    $('header > .inner > .me > .profile').click(Global.userProfileHandler);
    $('.oauths > .oauth').click(Global.userOauthHandler);
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
        return location.href = '/dashboard';
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
      _.off('header > .inner > .logo');
      return _.off('header > .inner > .name');
    }
  },
  loginCheck: function() {
    console.log('loginCheck');
    return Me.authed(function(result) {
      console.log('authed');
      if (result !== false) {
        Global.login(result);
      }
      if (Global.init !== false) {
        window[Global.init].i();
      } else {

      }
      if (window.User === void 0) {
        _.on('header > .inner > .me > .profile');
        _.on('.home > .oauths');
        _.on('header > .inner >.logo');
        _.on('header > .inner > .name');
      }
      if ((typeof User !== "undefined" && User !== null ? User.client : void 0) !== void 0 && Page !== 'entries') {
        location.href = '/entries';
      }
      if (window.User !== void 0 && User.client === void 0) {
        _.on('header > .inner >.logo');
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
    return $('.modify > .clientAccess > .checkbox').on('click', this.checkboxHandler);
  },
  checkboxHandler: function() {
    var cb;
    cb = $(this).find('input');
    if (event.target.type !== 'checkbox') {
      cb[0].checked = !cb[0].checked;
      return cb.change();
    }
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
        $('.modify > .clientAccess > .checkbox > input')[0].checked = true;
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
    structure.clientAccess = $('.modify > .clientAccess > .checkbox > input')[0].checked;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJmaWx0ZXIuY29mZmVlIiwiZ2xvYmFsLmNvZmZlZSIsImluZGV4LmNvZmZlZSIsImludml0ZS5jb2ZmZWUiLCJsaXN0aW5nLmNvZmZlZSIsIm1haW4uanMiLCJtZS5jb2ZmZWUiLCJub3Rmb3VuZC5jb2ZmZWUiLCJub3RpY2UuY29mZmVlIiwicHJvbXB0LmNvZmZlZSIsInF1ZXJ5LmNvZmZlZSIsInNlbGVjdGl6ZS5jb2ZmZWUiLCJzcGlubmVyLmNvZmZlZSIsInN0cnVjdHVyZS5jb2ZmZWUiLCJzdHJ1Y3R1cmVzLmNvZmZlZSIsInVzZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUE7RUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtN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LEVBQUcsU0FBQTtXQUNELE9BQU8sQ0FBQyxDQUFSLENBQVUsWUFBVixFQUF3QixLQUF4QixFQUErQixDQUFDLFFBQUQsQ0FBL0I7RUFEQyxDQUFIOzs7QUNERixJQUFBOztBQUFBLEtBQUEsR0FDRTtFQUFBLENBQUEsRUFBRyxTQUFBO1dBQ0QsT0FBTyxDQUFDLENBQVIsQ0FBVSxPQUFWO0VBREMsQ0FBSCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICByYW5nZTogKHN0YXJ0LCBlbmQpIC0+XG4gICAgcmVzdWx0ID0gW11cbiAgICBmb3IgbnVtIGluIFtzdGFydC4uZW5kXVxuICAgICAgcmVzdWx0LnB1c2ggbnVtXG4gICAgcmVzdWx0XG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpnZXQuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgcG9zdDogKGFyZ3MuLi4pIC0+XG5cbiAgICBqcG9zdCA9ICQucG9zdCBhcmdzLi4uXG5cbiAgICBqcG9zdC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAganBvc3QuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcG9zdFxuXG4gIGZhaWw6IChyZXNwb25zZSkgLT5cblxuICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OPy5lcnJvcnM/WzBdXG4gICAgaWYgZXJyb3IgaXMgdW5kZWZpbmVkXG4gICAgICByZXR1cm4gUHJvbXB0LmkgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0XG5cbiAgICBwdWcgPSBlcnJvci5tZXNzYWdlLm1hdGNoIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspL1xuICAgIGlmIHB1ZyBpc250IG51bGxcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlLnJlcGxhY2UgL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvLCAnJ1xuICAgICAgZXJyb3IuZmlsZSA9IHB1Z1sxXVxuICAgICAgZXJyb3IubGluZSA9IHB1Z1syXVxuXG4gICAgZmlsZSA9IEBlbmNvZGUgXCIje2Vycm9yLmZpbGV9XCJcblxuICAgIHN3aXRjaCBjb25maWcuYXBwLmVkaXRvclxuICAgICAgd2hlbiAnbWFjdmltJyB0aGVuIGVkaXRvciA9ICdtdmltOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3N1YmxpbWUnIHRoZW4gZWRpdG9yID0gJ3N1Ymw6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnZW1hY3MnIHRoZW4gZWRpdG9yID0gJ2VtYWNzOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3RleHRtYXRlJyB0aGVuIGVkaXRvciA9ICd0ZXh0bWF0ZTovL29wZW4vP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAncGhwc3Rvcm0nIHRoZW4gZWRpdG9yID0gJ3BocHN0b3JtOi8vb3Blbj9maWxlPSdcblxuICAgIGlmIGVycm9yLmZpbGUgaXNudCBudWxsXG4gICAgICBib2R5ID0gXCJcIlwiXG4gICAgICAgIDxwcmU+I3tlcnJvci5tZXNzYWdlfTwvcHJlPlxuICAgICAgICA8YSBocmVmPVwiI3tlZGl0b3J9I3tmaWxlfSZsaW5lPSN7ZXJyb3IubGluZX1cIj48Yj4je2Vycm9yLmZpbGV9OiN7ZXJyb3IubGluZX08L2I+PC9hPlxuICAgICAgXCJcIlwiXG4gICAgZWxzZVxuICAgICAgYm9keSA9IGVycm9yLm1lc3NhZ2VcblxuICAgIFByb21wdC5pIGVycm9yLnR5cGUsIGJvZHksIFsnT0snXVxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbiAgbWV0aG9kczogKG9iaikgLT5cbiAgICByZXMgPSBbXVxuICAgIGZvciBpLG0gb2Ygb2JqXG4gICAgICBpZiB0eXBlb2YgbSBpcyAnZnVuY3Rpb24nXG4gICAgICAgIHJlcy5wdXNoIG1cbiAgICByZXR1cm4gcmVzXG5cbl8uaSgpXG4iLCJUaW1lID1cbiAgaW50ZXJ2YWw6IGZhbHNlXG4gIGdhcDogMTAwMFxuXG4gIGk6IC0+XG4gICAgQGludGVydmFsID0gc2V0SW50ZXJ2YWwoQHNjcmFwZSwgQGdhYSkgaWYgQGludGVydmFsIGlzIGZhbHNlXG4gICAgQHNjcmFwZSgpXG5cbiAgc2NyYXBlOiAtPlxuICAgICQoJ3RpbWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGplbCA9ICQgZWxcbiAgICAgIGplbC5odG1sIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuZnJvbU5vdygpXG4gICAgICBqZWwuYXR0ciAnYXJpYS1sYWJlbCcsIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuY2FsZW5kYXIoKVxuIiwiQ2xpZW50ID1cblxuICBzZWxlY3RVc2VyOiBmYWxzZVxuICBfaWQ6IGZhbHNlXG4gIGNyb3A6IGZhbHNlXG4gIHByb2ZpbGU6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEBoYW5kbGVycygpXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvY2xpZW50c1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG5cbiAgICBAc2VsZWN0VXNlciA9IFNlbGVjdGl6ZS51c2VycyAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtdXNlcnMgPiBpbnB1dCcpLCBAc2VsZWN0VXNlckhhbmRsZXIsIG1lOiBmYWxzZVxuXG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0ID4gaW5wdXQnKS5mb2N1cygpXG4gXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmNsaWVudCA+IC5zdWJtaXQnKS5jbGljayBAbW9kaWZ5SGFuZGxlclxuXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdvdmVyJywgQGRyYWdvdmVyXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdsZWF2ZScsIEBkcmFnbGVhdmVcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2VudGVyIGRyYWdvdmVyJywgQGNhbmNlbFxuXG4gICAgJChkb2N1bWVudCkub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAZHJvcFxuXG4gICAgJCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YScpLm9uICdjbGljaycsIEBjaG9vc2VGaWxlXG4gICAgJCgnLmlucHV0LWltYWdlID4gaW5wdXQ6ZmlsZScpLmNoYW5nZSBAY2hhbmdlXG5cbiAgY2FuY2VsOiAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICBkcmFnb3ZlcjogLT5cbiAgICBfLm9uICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJhZ2xlYXZlOiAtPlxuICAgIF8ub2ZmICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJvcDogKGUpIC0+XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgXy5vZmYgJy5pbnB1dC1pbWFnZSdcblxuICAgIGlmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgYW5kIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoXG4gICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hhbmdlOiAtPlxuICAgIGlmICQodGhpcylbMF0uZmlsZXNcbiAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hvb3NlRmlsZTogLT5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG4gIGNyb3BwaWU6IChmaWxlKSAtPlxuICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIub25sb2FkZW5kID0gLT5cblxuICAgICAgaWYgQ2xpZW50LmNyb3AgaXNudCBmYWxzZVxuICAgICAgICBDbGllbnQuY3JvcC5jcm9wcGllICdkZXN0cm95J1xuICAgICAgICBDbGllbnQuY3JvcCA9IGZhbHNlXG5cbiAgICAgIENsaWVudC5jcm9wID0gJCgnLmlucHV0LWltYWdlID4gLmNyb3BwaWUnKS5jcm9wcGllXG4gICAgICAgIHVybDogcmVhZGVyLnJlc3VsdFxuICAgICAgICBlbmZvcmNlQm91bmRhcnk6IGZhbHNlXG4gICAgICAgIHZpZXdwb3J0OlxuICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICBoZWlnaHQ6IDIwMFxuICAgICAgICBib3VuZGFyeTpcbiAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgaGVpZ2h0OiAzMDBcblxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMIGZpbGVcblxuICBzZWxlY3RVc2VySGFuZGxlcjogLT5cblxuICBtb2RpZnlIYW5kbGVyOiAtPlxuXG4gICAgaWYgQ2xpZW50LmNyb3AgaXNudCBmYWxzZVxuICAgICAgQ2xpZW50LmNyb3AuY3JvcHBpZSAncmVzdWx0JyxcbiAgICAgICAgdHlwZTogJ2NhbnZhcydcbiAgICAgICAgZm9ybWF0OiAnanBlZydcbiAgICAgIC50aGVuIChyZXNwb25zZSkgLT5cbiAgICAgICAgQ2xpZW50LmltYWdlVXBsb2FkIENsaWVudC5kYXRhVVJJdG9CbG9iKHJlc3BvbnNlKSwgLT5cbiAgICAgICAgICBDbGllbnQubW9kaWZ5KClcbiAgICBlbHNlXG4gICAgICBDbGllbnQubW9kaWZ5KClcblxuICBtb2RpZnk6IC0+XG5cbiAgICBuYW1lID0gJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LW5hbWUgPiBpbnB1dCcpLnZhbCgpXG4gICAgdXNlcnMgPSAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtdXNlcnMgPiBpbnB1dCcpLnZhbCgpLnNwbGl0ICcsJ1xuXG4gICAgY2FsbCA9ICcvYXBpL2NsaWVudHMvYWRkJ1xuICAgIGlmIENsaWVudC5faWQgaXNudCBmYWxzZVxuICAgICAgY2FsbCA9IFwiL2FwaS9jbGllbnRzL3VwZGF0ZS8je0NsaWVudC5faWR9XCJcblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnQnKSlcblxuICAgIF8uZ2V0IGNhbGwsIG5hbWU6IG5hbWUsIHVzZXJzOiB1c2VycywgcHJvZmlsZTogQ2xpZW50LnByb2ZpbGVcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsICdzdWNjZXNzJ1xuICAgICAgICBpZiBDbGllbnQuX2lkIGlzIGZhbHNlXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIHt9LCAnJywgXCIvY2xpZW50cy8je3Jlc3BvbnNlLmRhdGEuX2lkfVwiXG4gICAgICAgIENsaWVudC5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuICAgICAgICBpZiBDbGllbnQucHJvZmlsZVxuICAgICAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1pbWFnZSA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoJyN7Q2xpZW50LnByb2ZpbGV9JylcIlxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuY2xpZW50JykpXG5cbiAgICBfLmdldCAnL2FwaS9jbGllbnRzLycsXG4gICAgICBfaWQ6IEBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2NsaWVudHMvbmV3JyBpZiByZXNwb25zZS5kYXRhLmxlbmd0aCA8IDFcbiAgICAgIGNsaWVudCA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1uYW1lID4gaW5wdXQnKS52YWwgY2xpZW50Lm5hbWVcbiAgICAgIGlmIGNsaWVudC5wcm9maWxlXG4gICAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1pbWFnZSA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoJyN7Y2xpZW50LnByb2ZpbGV9JylcIlxuICAgICAgICBDbGllbnQucHJvZmlsZSA9IGNsaWVudC5wcm9maWxlXG4gICAgICBmb3IgaW5kZXgsIHVzZXIgb2YgY2xpZW50LnVzZXJzXG4gICAgICAgIGlmIHVzZXIuaWQgaXNudCBVc2VyLl9pZFxuICAgICAgICAgIENsaWVudC5zZWxlY3RVc2VyWzBdLnNlbGVjdGl6ZS5hZGRPcHRpb24gaWQ6IHVzZXIuaWQsIG5hbWU6IFwiI3t1c2VyLm5hbWV9ICgje3VzZXIuZW1haWx9KVwiXG4gICAgICAgICAgQ2xpZW50LnNlbGVjdFVzZXJbMF0uc2VsZWN0aXplLmFkZEl0ZW0gdXNlci5pZFxuXG5cbiAgZGF0YVVSSXRvQmxvYjogKGRhdGFVUkkpIC0+XG4gICAgYnl0ZVN0cmluZyA9IHVuZGVmaW5lZFxuICAgIGlmIGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwXG4gICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pXG4gICAgZWxzZVxuICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSlcbiAgICAjIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXVxuICAgICMgd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpXG4gICAgaSA9IDBcbiAgICB3aGlsZSBpIDwgYnl0ZVN0cmluZy5sZW5ndGhcbiAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpXG4gICAgICBpKytcbiAgICBuZXcgQmxvYihbIGlhIF0sIHR5cGU6IG1pbWVTdHJpbmcpXG4gICAgICAgIFxuICBpbWFnZVVwbG9hZDogKGJsb2IsIGNhbGxiYWNrKSAtPlxuXG4gICAgZmQgPSBuZXcgRm9ybURhdGEoKVxuICAgIGZkLmFwcGVuZCAnZmlsZScsIGJsb2JcblxuICAgIF8ucG9zdFxuICAgICAgeGhyOiAtPlxuICAgICAgICB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyICdwcm9ncmVzcycsIChlKSAtPlxuICAgICAgICAgIGNvbXBsZXRlID0gZS5sb2FkZWQgLyBlLnRvdGFsXG4gICAgICAgICAgaWYgY29tcGxldGUgPCAxIHRoZW4gTm90aWNlLmkgJ1VwbG9hZGluZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICAgaWYgY29tcGxldGUgaXMgMSB0aGVuIE5vdGljZS5pICdQcm9jZXNzaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgLCBmYWxzZVxuICAgICAgICByZXR1cm4geGhyXG5cbiAgICAgIHVybDogJy9hcGkvdXBsb2FkJ1xuICAgICAgZGF0YTogZmRcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgY29udGVudFR5cGU6IGZhbHNlXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICAgIGVycm9yOiAtPlxuICAgICAgICBOb3RpY2UuZCgpXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSAtPlxuICAgICAgICBOb3RpY2UuaSAnRmlsZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgQ2xpZW50LnByb2ZpbGUgPSByZXN1bHQuZGF0YS51cmxcbiAgICAgICAgY2FsbGJhY2socmVzdWx0KVxuXG5cbiIsIkNsaWVudHMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnY2xpZW50cycsIENsaWVudHMuYWN0aW9uXG5cbiAgYWN0aW9uOiAodHlwZSkgLT5cblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdDbGllbnQgSW52aXRlJ1xuICAgICAgICBpZiBMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aCA+IDFcbiAgICAgICAgICBOb3RpY2UuaSAnUGxlYXNlIGNob29zZSBhIHNpbmdsZSBjbGllbnQgZm9yIGFuIGludml0ZSBsaW5rJywgdHlwZTogJ3dhcm5pbmcnXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIENsaWVudHMuZ2V0SW52aXRlKExpc3Rpbmcuc2VsZWN0ZWRbMF0pXG5cbiAgZ2V0SW52aXRlOiAoY2xpZW50KSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudHMnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2ludml0ZS9hZGQnLCBjbGllbnQ6IGNsaWVudFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgY29uc29sZS5sb2cgcmVzcG9uc2VcbiAgICAgIFByb21wdC5pKFxuICAgICAgICAnQ2xpZW50IEludml0ZScsXG4gICAgICAgICdTaGFyZSB0aGlzIFVSTCB3aXRoIHlvdXIgY2xpZW50IHRvIGFsbG93IHRoZW0gdG8gbW9kaWZ5IHRoZWlyIG93biBlbnRyaWVzJyxcbiAgICAgICAgWydPSyddLFxuICAgICAgICAgIGNsaXBib2FyZDogdHJ1ZVxuICAgICAgICAgIHZhbHVlOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9pbnZpdGUvJyArIHJlc3BvbnNlLmRhdGEuaW52aXRlLmhhc2gsXG4gICAgICApXG5cblxuXG4iLCJjb25maWcgPSB7XCJ2aWV3XCI6e1wicGF0aHNcIjpbXCIvVXNlcnMvay9iYXNhbC9yZXNvdXJjZXMvdmlld3NcIl0sXCJjb21waWxlZFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvdmlld3NcIn0sXCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwid2hpdGUyXCI6XCIjZjhmOGY4XCIsXCJ3aGl0ZTNcIjpcIiNGNEY0RjRcIixcImdyZXkxXCI6XCIjZTVlNWU1XCIsXCJncmV5MlwiOlwiI2Y1ZjVmNVwiLFwiZ3JleTNcIjpcIiNkMGQwZDBcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiYmxhY2syXCI6XCIjMjgyODI4XCIsXCJibGFjazNcIjpcIiMzMzMzMzNcIixcImJsYWNrNFwiOlwiIzIzMjkyRVwiLFwiYmxhY2s1XCI6XCIjM0U0MzQ3XCIsXCJyZWQxXCI6XCIjQzgyMTJCXCIsXCJ5ZWxsb3cxXCI6XCIjRjZCQjQ1XCIsXCJjeWFuMVwiOlwiIzVGQTc5M1wiLFwib3JhbmdlMVwiOlwiI0Y2OEY2MlwiLFwic2tpbjFcIjpcIiNGM0REQTNcIixcImdyZWVuMVwiOlwiIzViYTU0MVwiLFwiZ3JlZW4yXCI6XCIjODhkOTZkXCIsXCJncmVlbjNcIjpcIiM3N2QzNThcIixcImJsdWUxXCI6XCIjMWRhN2VlXCIsXCJibHVlMlwiOlwiIzAwNzNiYlwiLFwiYmx1ZTNcIjpcIiM0RjVEOTVcIixcImdvb2dsZV9ibHVlXCI6XCIjNDI4NWY0XCIsXCJnb29nbGVfZ3JlZW5cIjpcIiMzNGE4NTNcIixcImdvb2dsZV95ZWxsb3dcIjpcIiNmYmJjMDVcIixcImdvb2dsZV9yZWRcIjpcIiNlYTQzMzVcIixcImdpdGh1Yl9ibHVlXCI6XCIjMEQyNjM2XCIsXCJmYWNlYm9va19ibHVlXCI6XCIjNDg2N0FBXCIsXCJpbnN0YWdyYW1fb3JcIjpcIiNGRjc4MDRcIixcInR3aXR0ZXJfYmx1ZVwiOlwiIzAwQUNFRFwifSxcImZvbnRcIjp7XCI0MDRcIjp7XCJmb250LWZhbWlseVwiOlwiTW9ub3RvblwiLFwiZm9udC1zaXplXCI6XCI3NXB4XCJ9LFwiaDFcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjM0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJoMWJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjM0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImgyYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImgzXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyMHB4XCJ9LFwiaDNiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyMHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiYzFcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJjMWJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE2cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI1MDBcIn0sXCJjMXRiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNDAwXCJ9LFwiYzFzXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMC41cHhcIn0sXCJjMXNiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJmb250LXdlaWdodFwiOlwiNjAwXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMC41cHhcIn0sXCJjMlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMyYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifX0sXCJtZXRhXCI6e1widGl0bGVcIjpcImJhc2FsXCIsXCJ1cmxcIjpcImh0dHA6Ly9iYXNhbC5kZXYvXCIsXCJkZXNjcmlwdGlvblwiOlwibWluaW1hbCBjb250ZW50IG1hbmFnZW1lbnRcIixcImtleXdvcmRzXCI6XCJjbXNcIixcInJlcG9cIjpcImh0dHBzOi8vZ2l0aHViLmNvbS9hY2lkamF6ei9iYXNhbFwifSxcInNldHRpbmdzXCI6e1wicGVycGFnZVwiOjEwfSxcImRlYnVnYmFyXCI6e1wiZW5hYmxlZFwiOm51bGwsXCJzdG9yYWdlXCI6e1wiZW5hYmxlZFwiOnRydWUsXCJkcml2ZXJcIjpcImZpbGVcIixcInBhdGhcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZGVidWdiYXJcIixcImNvbm5lY3Rpb25cIjpudWxsLFwicHJvdmlkZXJcIjpcIlwifSxcImluY2x1ZGVfdmVuZG9yc1wiOnRydWUsXCJjYXB0dXJlX2FqYXhcIjp0cnVlLFwiY2xvY2t3b3JrXCI6ZmFsc2UsXCJjb2xsZWN0b3JzXCI6e1wicGhwaW5mb1wiOnRydWUsXCJtZXNzYWdlc1wiOnRydWUsXCJ0aW1lXCI6dHJ1ZSxcIm1lbW9yeVwiOnRydWUsXCJleGNlcHRpb25zXCI6dHJ1ZSxcImxvZ1wiOnRydWUsXCJkYlwiOnRydWUsXCJ2aWV3c1wiOnRydWUsXCJyb3V0ZVwiOnRydWUsXCJsYXJhdmVsXCI6ZmFsc2UsXCJldmVudHNcIjpmYWxzZSxcImRlZmF1bHRfcmVxdWVzdFwiOmZhbHNlLFwic3ltZm9ueV9yZXF1ZXN0XCI6dHJ1ZSxcIm1haWxcIjp0cnVlLFwibG9nc1wiOmZhbHNlLFwiZmlsZXNcIjpmYWxzZSxcImNvbmZpZ1wiOmZhbHNlLFwiYXV0aFwiOmZhbHNlLFwiZ2F0ZVwiOmZhbHNlLFwic2Vzc2lvblwiOnRydWV9LFwib3B0aW9uc1wiOntcImF1dGhcIjp7XCJzaG93X25hbWVcIjpmYWxzZX0sXCJkYlwiOntcIndpdGhfcGFyYW1zXCI6dHJ1ZSxcInRpbWVsaW5lXCI6ZmFsc2UsXCJiYWNrdHJhY2VcIjpmYWxzZSxcImV4cGxhaW5cIjp7XCJlbmFibGVkXCI6ZmFsc2UsXCJ0eXBlc1wiOltcIlNFTEVDVFwiXX0sXCJoaW50c1wiOnRydWV9LFwibWFpbFwiOntcImZ1bGxfbG9nXCI6ZmFsc2V9LFwidmlld3NcIjp7XCJkYXRhXCI6ZmFsc2V9LFwicm91dGVcIjp7XCJsYWJlbFwiOnRydWV9LFwibG9nc1wiOntcImZpbGVcIjpudWxsfX0sXCJpbmplY3RcIjp0cnVlLFwicm91dGVfcHJlZml4XCI6XCJfZGVidWdiYXJcIn0sXCJhcHBcIjp7XCJlZGl0b3JcIjpcIm1hY3ZpbVwifSxcImNhY2hlXCI6e1wiZGVmYXVsdFwiOlwiYXJyYXlcIixcInN0b3Jlc1wiOntcImFwY1wiOntcImRyaXZlclwiOlwiYXBjXCJ9LFwiYXJyYXlcIjp7XCJkcml2ZXJcIjpcImFycmF5XCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiY2FjaGVcIixcImNvbm5lY3Rpb25cIjpudWxsfSxcImZpbGVcIjp7XCJkcml2ZXJcIjpcImZpbGVcIixcInBhdGhcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL2NhY2hlXCJ9LFwibWVtY2FjaGVkXCI6e1wiZHJpdmVyXCI6XCJtZW1jYWNoZWRcIixcInNlcnZlcnNcIjpbe1wiaG9zdFwiOlwiMTI3LjAuMC4xXCIsXCJwb3J0XCI6MTEyMTEsXCJ3ZWlnaHRcIjoxMDB9XX0sXCJyZWRpc1wiOntcImRyaXZlclwiOlwicmVkaXNcIixcImNvbm5lY3Rpb25cIjpcImRlZmF1bHRcIn19LFwicHJlZml4XCI6XCJsYXJhdmVsXCJ9LFwicXVldWVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwiY29ubmVjdGlvbnNcIjp7XCJzeW5jXCI6e1wiZHJpdmVyXCI6XCJzeW5jXCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiam9ic1wiLFwicXVldWVcIjpcImRlZmF1bHRcIixcImV4cGlyZVwiOjYwfSxcImJlYW5zdGFsa2RcIjp7XCJkcml2ZXJcIjpcImJlYW5zdGFsa2RcIixcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInR0clwiOjYwfSxcInNxc1wiOntcImRyaXZlclwiOlwic3FzXCIsXCJrZXlcIjpcInlvdXItcHVibGljLWtleVwiLFwic2VjcmV0XCI6XCJ5b3VyLXNlY3JldC1rZXlcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLXVybFwiLFwicmVnaW9uXCI6XCJ1cy1lYXN0LTFcIn0sXCJpcm9uXCI6e1wiZHJpdmVyXCI6XCJpcm9uXCIsXCJob3N0XCI6XCJtcS1hd3MtdXMtZWFzdC0xLmlyb24uaW9cIixcInRva2VuXCI6XCJ5b3VyLXRva2VuXCIsXCJwcm9qZWN0XCI6XCJ5b3VyLXByb2plY3QtaWRcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLW5hbWVcIixcImVuY3J5cHRcIjp0cnVlfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInJldHJ5X2FmdGVyXCI6NjB9fSxcImZhaWxlZFwiOntcImRhdGFiYXNlXCI6XCJtb25nb2RiXCIsXCJ0YWJsZVwiOlwiZmFpbGVkX2pvYnNcIn19fTsiLCJEYXNoYm9hcmQgPVxuXG4gIGk6IC0+XG4gICAgQGxvYWQoKVxuXG4gIGxvYWQ6IChjb21wbGV0ZSkgLT5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZGFzaGJvYXJkID4gLmNvbGxlY3Rpb25zJykpXG5cbiAgICBfLmdldCAnL2FwaS9jbGllbnRzJyxcbiAgICAgIHZpZXc6ICdkYXNoYm9hcmQnXG4gICAgLmFsd2F5cyAtPlxuICAgICAgY29uc29sZS5sb2cgJ2Fsd2F5cydcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgVGltZS5pKClcbiAgICAgICQoJy5jb2xsZWN0aW9ucycpLmh0bWwgcmVzcG9uc2Uudmlld1xuXG4iLCJFbnRpdGllcyA9XG5cbiAgYmxvZ3M6IFtdXG4gIGNyb3BzOiB7fVxuICBpbWFnZXM6IHt9XG5cbiAgcGxhY2Vob2xkZXJzOiBbXG4gICAgXCJUaGF0J3Mgd2hhdCBJJ20gYmxvZ2dpbmcgYWJvdXRcIlxuICAgIFwiSGF2ZSB5b3UgZ3V5cyBiZWVuIGJsb2dnaW5nP1wiXG4gICAgXCJIb2xkIGFsbCBteSBjYWxscywgSSdtIGJsb2dnaW5nXCJcbiAgICBcIlRlbGwgRG9ubmllIEknbSBibG9nZ2luZyBhbmQgSSdsbCBjYWxsIGhpbSBiYWNrXCJcbiAgICBcIkkgZ290dGEgcnVuLCB5b3Ugc2hvdWxkIGJlIGJsb2dnaW5nXCJcbiAgICBcIkkgd2FudCB5b3Ugb24gdGhlIHBob25lLCBidXQgSSBhbHNvIHdhbnQgeW91IGJsb2dnaW5nXCJcbiAgXVxuXG4gIEJsb2c6IChlbCwgbmFtZSwgdmFsdWU9ZmFsc2UpIC0+XG5cbiAgICBlZGl0b3IgPSBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGVcbiAgICAgIHBsYWNlaG9sZGVyOiBAcGxhY2Vob2xkZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEBwbGFjZWhvbGRlcnMubGVuZ3RoKV1cbiAgICAgIGNhbGxiYWNrczpcbiAgICAgICAgb25JbWFnZVVwbG9hZDogKGZpbGVzKSAtPlxuICAgICAgICAgIEVudGl0aWVzLmltYWdlVXBsb2FkIGZpbGVzLCB0aGlzXG5cbiAgICBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGUoJ2NvZGUnLCB2YWx1ZSkgaWYgdmFsdWUgaXNudCBmYWxzZVxuXG4gICAgQGJsb2dzLnB1c2ggbmFtZTogbmFtZSwgZWRpdG9yOiBlZGl0b3IsIGVsOiBlbC5maW5kKCcuYmxvZycpXG5cbiAgYmxvZ0dldENvZGU6IChuYW1lKSAtPlxuICAgIGZvciBibG9nIGluIEBibG9nc1xuICAgICAgcmV0dXJuIGJsb2cuZWwuc3VtbWVybm90ZSgnY29kZScpIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gXG4gIGJsb2dGb2N1czogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICBpZiBibG9nLm5hbWUgaXMgbmFtZVxuICAgICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuICBpbWFnZVVwbG9hZDogKGZpbGVzLCBlbCkgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBmaWxlc1swXVxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgICQoZWwpLnN1bW1lcm5vdGUoJ2VkaXRvci5pbnNlcnRJbWFnZScsIHJlc3VsdC5kYXRhLnVybClcbiAgICAgICAgTm90aWNlLmkgJ0ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG5cbiAgVGFnczogKGVsLCBuYW1lKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0Jykuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3Jlc3RvcmVfb25fYmFja3NwYWNlJywncmVtb3ZlX2J1dHRvbiddXG4gICAgICBkZWxpbWl0ZXI6ICcsJ1xuICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICAgIGNyZWF0ZTogKGlucHV0KSAtPlxuICAgICAgICB2YWx1ZTogaW5wdXRcbiAgICAgICAgdGV4dDogaW5wdXRcblxuICBEYXRlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1knXG5cbiAgRGF0ZVRpbWU6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSBoOmkgSydcbiAgICAgIGVuYWJsZVRpbWU6IHRydWVcblxuICBEYXRlUmFuZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSdcbiAgICAgIG1vZGU6ICdyYW5nZSdcblxuICBEYXRlVGltZVJhbmdlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1kgaDppIEsnXG4gICAgICBlbmFibGVUaW1lOiB0cnVlXG4gICAgICBtb2RlOiAncmFuZ2UnXG5cbiAgSW1hZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG5cbiAgICBAaW1hZ2VIYW5kbGVycyBlbFxuXG4gICAgIyBwcmVsb2FkIGV4aXN0aW5nIGltYWdlc1xuICAgIGlmIHZhbHVlIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wcGVyKHZhbHVlLCBlbClcbiAgICAgIEVudGl0aWVzLmltYWdlc1tuYW1lXSA9IHZhbHVlXG5cblxuICBpbWFnZUhhbmRsZXJzOiAoZWwsIG5hbWUpIC0+XG5cbiAgICBlbC5vbiAnZHJhZ292ZXInLCBAaW1hZ2VIYW5kbGVyLmRyYWdvdmVyXG4gICAgZWwub24gJ2RyYWdsZWF2ZScsIEBpbWFnZUhhbmRsZXIuZHJhZ2xlYXZlXG4gICAgZWwub24gJ2RyYWdlbnRlciBkcmFnb3ZlcicsIEBpbWFnZUhhbmRsZXIuY2FuY2VsXG4gICAgZWwub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAaW1hZ2VIYW5kbGVyLmRyb3BcbiAgICBlbC5maW5kKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhLnNlbGVjdCcpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuY2hvb3NlRmlsZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEuc2F2ZScpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuc2F2ZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGlucHV0OmZpbGUnKS5vbiAnY2hhbmdlJywgQGltYWdlSGFuZGxlci5jaGFuZ2VcblxuICBpbWFnZUhhbmRsZXI6XG5cbiAgICBkcmFnb3ZlcjogLT5cbiAgICAgIF8ub24gJCh0aGlzKS5maW5kKCcuaW5wdXQtaW1hZ2UnKVxuICAgIGRyYWdsZWF2ZTogLT5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCgnLmlucHV0LWltYWdlJylcbiAgICBjYW5jZWw6IC0+XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBkcm9wOiAoZSkgLT5cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCAnLmlucHV0LWltYWdlJ1xuXG4gICAgICBpZiBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyIGFuZCBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aFxuICAgICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgICAgRW50aXRpZXMubG9hZENyb3BwZXIgZmlsZXNbMF0sICQodGhpcylcblxuICAgIGNob29zZUZpbGU6IC0+XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgICBjaGFuZ2U6IC0+XG4gICAgICBpZiAkKHRoaXMpWzBdLmZpbGVzXG4gICAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuXG4gICAgICAgIEVudGl0aWVzLmxvYWRDcm9wcGVyIGZpbGVzWzBdLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpXG5cbiAgICBzYXZlOiAtPlxuXG4gICAgICBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5kYXRhICduYW1lJ1xuICAgICAgaW5kZXggPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEgJ2luZGV4J1xuXG4gICAgICBTcGlubmVyLmkoJChcIi5lbnRpdHlfaW5kZXhfI3tpbmRleH1cIikpXG5cbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmdldENyb3BwZWRDYW52YXMoKS50b0Jsb2IgKGJsb2IpIC0+XG4gICAgICAgIENsaWVudC5pbWFnZVVwbG9hZCBibG9iLCAocmVzdWx0KSAtPlxuICAgICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAsICdpbWFnZS9qcGVnJ1xuXG4gIGxvYWRDcm9wcGVyOiAoZmlsZSwgZWwpIC0+XG5cbiAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cbiAgICByZWFkZXIub25sb2FkZW5kID0gLT5cbiAgICAgIEVudGl0aWVzLmNyb3BwZXIgcmVhZGVyLnJlc3VsdCwgZWxcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTCBmaWxlXG5cbiAgY3JvcHBlcjogKHVybCwgZWwpIC0+XG5cbiAgICBuYW1lID0gZWwuZGF0YSAnbmFtZSdcbiAgICBpbmRleCA9IGVsLmRhdGEgJ2luZGV4J1xuXG4gICAgY29uc29sZS5sb2cgbmFtZSwgaW5kZXhcblxuICAgIGlmIEVudGl0aWVzLmNyb3BzW25hbWVdIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wc1tuYW1lXS5kZXN0cm95KClcbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdID0gZmFsc2VcblxuICAgIGVsLmZpbmQoJy5jcm9wcGVyJykuYXR0ciAnc3JjJywgdXJsXG5cbiAgICBFbnRpdGllcy5jcm9wc1tuYW1lXSA9IG5ldyBDcm9wcGVyIGVsLmZpbmQoJy5jcm9wcGVyJylbMF0sXG4gICAgICBtaW5Db250YWluZXJIZWlnaHQ6IDMwMFxuICAgICAgbWluQ2FudmFzSGVpZ2h0OiAzMDBcbiAgICAgIHJlc3BvbnNpdmU6IHRydWVcbiAgICAgIHByZXZpZXc6IFwiZGl2LmVudGl0eV9pbmRleF8je2luZGV4fSA+IGRpdi5pbnB1dC1pbWFnZSA+IGRpdi5waWN0dXJlXCJcbiAgICAgIGF1dG9Dcm9wQXJlYTogMVxuICAgICAgc3RyaWN0OiBmYWxzZVxuICAgICAgaGlnaGxpZ2h0OiB0cnVlXG5cbiAgICBfLm9uIGVsLmZpbmQoJy5zYXZlJylcblxuXG4iLCJFbnRyaWVzID1cblxuICBpOiAtPlxuXG5cbiAgICAjIGxpbWl0IGZpbHRlciB0eXBlcyBiYXNlZCBvbiB1c2VyIHR5cGVcbiAgICBpZiBVc2VyPy5jbGllbnQgaXNudCB1bmRlZmluZWRcbiAgICAgIExpc3RpbmcuaSAnZW50cmllcycsIGZhbHNlLCBbJ3N0cnVjdHVyZSddXG4gICAgZWxzZVxuICAgICAgTGlzdGluZy5pICdlbnRyaWVzJywgZmFsc2UsIFsnY2xpZW50JywgJ3N0cnVjdHVyZSddXG4iLCJFbnRyeSA9XG5cbiAgc2VsZWN0U3RydWN0dXJlOiB7fVxuXG4gIF9pZDogZmFsc2VcbiAgc3RydWN0dXJlOiBmYWxzZVxuICBzZWxlY3RlZFN0cnVjdHVyZTogZmFsc2VcbiAgZW50cnk6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24uaGFzaC5tYXRjaCAvI3N0cnVjdHVyZT0oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEVudHJ5LnNlbGVjdGVkU3RydWN0dXJlID0gbWF0Y2hbMV1cblxuICAgIEBzZWxlY3RpemUoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9lbnRyaWVzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcbiAgICBlbHNlXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmZvY3VzKClcblxuICBzdHJ1Y3R1cmVTcGVjaWZpZWQ6IC0+XG4gICAgaWYgRW50cnkuc2VsZWN0ZWRTdHJ1Y3R1cmUgaXNudCBmYWxzZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBFbnRyeS5zZWxlY3RlZFN0cnVjdHVyZVxuXG4gIHNlbGVjdGl6ZTogLT5cblxuICAgIEBzZWxlY3RTdHJ1Y3R1cmUgPSBTZWxlY3RpemUuc3RydWN0dXJlcyAkKCcubW9kaWZ5ID4gLnN0cnVjdHVyZSA+IHNlbGVjdCcpLFxuICAgICAgRW50cnkuc3RydWN0dXJlU2VsZWN0SGFuZGxlclxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5jbGljayBAc3VibWl0XG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmFub3RoZXInKS5jbGljayBAYW5vdGhlclxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5jYW5jZWwnKS5jbGljayBAY2FuY2VsXG5cbiAgICAkKCcuZm9jdXNtZScpLmZvY3VzIC0+XG4gICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuXG4gIGxvYWQ6IChfaWQpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZW50cnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL2VudHJpZXMvJyxcbiAgICAgIF9pZDogX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBlbnRyeSA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgIEVudHJ5LmVudHJ5ID0gZW50cnlcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuYWRkT3B0aW9uXG4gICAgICAgIGlkOiBlbnRyeS5zdHJ1Y3R1cmUuaWQsIG5hbWU6IGVudHJ5LnN0cnVjdHVyZS5uYW1lLCBjbGllbnRQcm9maWxlOiBlbnRyeS5jbGllbnQucHJvZmlsZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBlbnRyeS5zdHJ1Y3R1cmUuaWRcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuZGlzYWJsZSgpXG5cbiAgc3VibWl0OiAtPlxuXG4gICAgbmFtZSA9ICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgIGVudGl0aWVzID0ge31cblxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5ID4gLmVudGl0eScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgZW50aXR5X25hbWUgPSAkKGVsKS5maW5kKCcubGFiZWwnKS5odG1sKClcbiAgICAgIHR5cGUgPSAkKGVsKS5kYXRhICd0eXBlJ1xuXG4gICAgICBzd2l0Y2ggdHlwZVxuICAgICAgICB3aGVuICdUZXh0JywnTGluaycsJ0RhdGUnLCdUaW1lJywnRGF0ZVRpbWUnLCdEYXRlUmFuZ2UnLCdEYXRlVGltZVJhbmdlJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKVxuICAgICAgICB3aGVuICdUYWdzJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKS5zcGxpdCAnLCdcbiAgICAgICAgd2hlbiAnQmxvZydcbiAgICAgICAgICBibG9nID0gRW50aXRpZXMuYmxvZ0dldENvZGUgZW50aXR5X25hbWVcbiAgICAgICAgICB2YWx1ZSA9IGJsb2dcbiAgICAgICAgd2hlbiAnSW1hZ2UnXG4gICAgICAgICAgdmFsdWUgPSBFbnRpdGllcy5pbWFnZXNbZW50aXR5X25hbWVdXG5cbiAgICAgIGVudGl0aWVzW2VudGl0eV9uYW1lXSA9IG5hbWU6IGVudGl0eV9uYW1lLCB0eXBlOiB0eXBlLCB2YWx1ZTogdmFsdWVcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuXG4gICAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5JykpXG5cbiAgICAgIGNhbGwgPSAnL2FwaS9lbnRyaWVzL2FkZCdcbiAgICAgIGlmIEVudHJ5Ll9pZCBpc250IGZhbHNlXG4gICAgICAgIGNhbGwgPSBcIi9hcGkvZW50cmllcy91cGRhdGUvI3tFbnRyeS5faWR9XCJcblxuICAgICAgXy5nZXQgY2FsbCxcbiAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICBzdHJ1Y3R1cmU6IEVudHJ5LnN0cnVjdHVyZVxuICAgICAgICBlbnRpdGllczogZW50aXRpZXNcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBpZiBFbnRyeS5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9lbnRyaWVzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgRW50cnkuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiAgICAgICAgXy5vbiAnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmFub3RoZXInXG5cbiAgYW5vdGhlcjogLT5cbiAgICBsb2NhdGlvbi5ocmVmID0gXCIvZW50cmllcy9uZXcjc3RydWN0dXJlPSN7RW50cnkuc3RydWN0dXJlfVwiXG4gIGNhbmNlbDogLT5cbiAgICBpZiBkb2N1bWVudC5yZWZlcnJlci5pbmRleE9mKHdpbmRvdy5sb2NhdGlvbi5ob3N0KSBpcyAtMVxuICAgICAgbG9jYXRpb24uaHJlZiA9IFwiL2VudHJpZXNcIlxuICAgIGVsc2VcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKVxuICBzdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyOiAoZSkgLT5cbiAgICBzdHJ1Y3R1cmVfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICByZXR1cm4gZmFsc2UgaWYgc3RydWN0dXJlX2lkLmxlbmd0aCBpc250IDI0XG4gICAgI2lmIEVudHJ5LmVudHJ5IGlzbnQgZmFsc2VcbiAgICAjICBFbnRyeS5sb2FkRW50aXRpZXMgRW50cnkuZW50cnkuZW50aXRpZXMsIEVudHJ5LmVudHJ5Lm5hbWVcbiAgICAjZWxzZVxuICAgIEVudHJ5LmxvYWRTdHJ1Y3R1cmUgc3RydWN0dXJlX2lkXG5cbiAgbG9hZFN0cnVjdHVyZTogKF9pZCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLFxuICAgICAgX2lkOiBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgPT5cbiAgICAgIEVudHJ5LnN0cnVjdHVyZSA9IF9pZFxuICAgICAgQGxvYWRFbnRpdGllcyByZXNwb25zZS5kYXRhWzBdLmVudGl0aWVzXG5cbiAgbG9hZEVudGl0aWVzOiAoZW50aXRpZXMsIG5hbWU9ZmFsc2UpIC0+XG5cbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSdcbiAgICBpZiBFbnRyeS5lbnRyeS5uYW1lIGlzbnQgZmFsc2VcbiAgICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoRW50cnkuZW50cnkubmFtZSlcblxuICAgIGJvZHkgPSAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keScpXG4gICAgYm9keS5odG1sICcnXG5cbiAgICB0YWJpbmRleCA9IDNcbiAgICBpbmRleCA9IDBcblxuICAgIGZvciBpLCBlbnRpdHkgb2YgZW50aXRpZXNcblxuICAgICAgaHRtbCA9ICQoXCIucGFnZS5lbnRyeSA+ICN0ZW1wbGF0ZSA+IC5lbnRpdHlfI3tlbnRpdHkudHlwZX1cIikuY2xvbmUoKVxuICAgICAgaHRtbC5hZGRDbGFzcyBcImVudGl0eV9pbmRleF8jeysraW5kZXh9XCJcbiAgICAgIGh0bWwuZGF0YSBcImluZGV4XCIsIGluZGV4XG4gICAgICBodG1sLmRhdGEgXCJuYW1lXCIsIGVudGl0eS5uYW1lXG5cbiAgICAgIGlmIEVudHJ5LmVudHJ5LmVudGl0aWVzP1tpXT8udmFsdWVcblxuICAgICAgICB2YWx1ZSA9IEVudHJ5LmVudHJ5LmVudGl0aWVzW2ldLnZhbHVlXG5cbiAgICAgICAgc3dpdGNoIGVudGl0eS50eXBlXG4gICAgICAgICAgd2hlbiAnVGFncycsICdUZXh0JywnTGluaycsJ0RhdGUnLCdUaW1lJywnRGF0ZVRpbWUnLCdEYXRlUmFuZ2UnLCdEYXRlVGltZVJhbmdlJyB0aGVuIGh0bWwuZmluZCgnaW5wdXQnKS52YWwgdmFsdWVcblxuICAgICAgaHRtbC5maW5kKCdpbnB1dCxzZWxlY3QsdGV4dGFyZWEnKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4KytcbiAgICAgIGJvZHkuYXBwZW5kIGh0bWxcblxuICAgICAgZW50aXR5RWwgPSAkKFwiLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmJvZHkgLmVudGl0eV9pbmRleF8je2luZGV4fVwiKVxuICAgICAgZW50aXR5RWwuZmluZCgnLmxhYmVsJykuaHRtbCBlbnRpdHkubmFtZVxuXG4gICAgICBpZiBFbnRpdGllc1tlbnRpdHkudHlwZV0gaXNudCB1bmRlZmluZWRcbiAgICAgICAgRW50aXRpZXNbZW50aXR5LnR5cGVdKGVudGl0eUVsLCBlbnRpdHkubmFtZSwgdmFsdWUpXG5cbiAgICAkKCdbdGFiaW5kZXg9Ml0nKS5mb2N1cygpXG4gICAgXy5vbiAnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLnN1Ym1pdCdcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0JykuYXR0ciAndGFiaW5kZXgnLCB0YWJpbmRleCsrXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmFub3RoZXInKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4XG4iLCJGaWx0ZXIgPVxuICBmaWx0ZXI6IGZhbHNlXG4gIGVuZHBvaW50OiBmYWxzZVxuICBmaWx0ZXJzOiBbXVxuXG4gIGk6IChmaWx0ZXJzKSAtPlxuXG4gICAgQGZpbHRlcnMgPSBmaWx0ZXJzXG5cbiAgICBfLm9uIFwiLmZpbHRlcl8je2ZpbHRlcn1cIiBmb3IgZmlsdGVyIGluIEBmaWx0ZXJzXG5cbiAgICBmb3IgZmlsdGVyIGluIEBmaWx0ZXJzXG4gICAgICBpZiBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIEZpbHRlci5zZWxlY3RlZCBmaWx0ZXJcblxuICAgICQoXCIubGlzdGluZ1wiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLmZpbHRlcnMgPiAuZmlsdGVyJywgQGhhbmRsZXJzLmZpbHRlckhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmdcIikub24gJ2NsaWNrJywgJy5saXN0LWhlYWRlciA+IC5maWx0ZXJzID4gLmZpbHRlciA+IC5vcHRpb25fc2VsZWN0ZWQgPiAuaWNvbi5jYW5jZWwnLCBAaGFuZGxlcnMuZmlsdGVyQ2xlYXJIYW5kbGVyXG5cbiAgZDogLT5cbiAgICBfLm9mZiBcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn1cIlxuICAgICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXQnKS52YWwgJydcbiAgICBGaWx0ZXIuaGFuZGxlcnMuZCgpXG4gICAgTGlzdGluZy51bnNlbGVjdEFsbCgpXG4gICAgI1NwaW5uZXIuZCgpXG5cbiAgZ2V0OiAoc2VhcmNoPW51bGwpIC0+XG4gICAgU3Bpbm5lci5pKCQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9ID4gLmlubmVyID4gLnZhbHVlc1wiKSlcblxuICAgIG9wdGlvbnMgPVxuICAgICAgdmlldzogJ2ZpbHRlcnMnXG5cbiAgICBmb3IgaW5kZXgsIGZpbHRlciBvZiBGaWx0ZXIuZmlsdGVyc1xuICAgICAgaWYgZmlsdGVyIGlzbnQgRmlsdGVyLmZpbHRlciBhbmQgUXVlcnkucGFyYW0oZmlsdGVyKSBpc250IHVuZGVmaW5lZFxuICAgICAgICBvcHRpb25zW2ZpbHRlciArICcubmFtZSddID0gUXVlcnkucGFyYW0gZmlsdGVyXG5cbiAgICBvcHRpb25zLm5hbWUgPSBzZWFyY2ggaWYgc2VhcmNoIGlzbnQgbnVsbFxuXG4gICAgXy5nZXQgXCIvYXBpLyN7QGVuZHBvaW50fVwiLCBvcHRpb25zXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMnKS5odG1sIHJlc3BvbnNlLnZpZXdcbiAgICAgIFNwaW5uZXIuZCgpXG5cbiAgc2VsZWN0OiAob3B0aW9uKSAtPlxuICAgIFF1ZXJ5LnBhcmFtICdwYWdlJywgZmFsc2VcbiAgICBRdWVyeS5wYXJhbSBGaWx0ZXIuZmlsdGVyLCBvcHRpb25cbiAgICBGaWx0ZXIuc2VsZWN0ZWQgRmlsdGVyLmZpbHRlclxuICAgIEZpbHRlci5kKClcbiAgICBMaXN0aW5nLmxvYWQoKVxuXG4gIHNlbGVjdGVkOiAoZmlsdGVyKSAtPlxuICAgIGlmIFF1ZXJ5LnBhcmFtKGZpbHRlcikgaXMgdW5kZWZpbmVkXG4gICAgICAkKFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkID4gLmNvcHlcIikuaHRtbCAnJ1xuICAgICAgXy5vbiBcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9kZWZhdWx0XCJcbiAgICAgIF8ub2ZmIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX3NlbGVjdGVkXCJcbiAgICAgIHJldHVybiB0cnVlXG4gICAgJChcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9zZWxlY3RlZCA+IC5jb3B5XCIpLmh0bWwgUXVlcnkucGFyYW0gZmlsdGVyXG4gICAgXy5vZmYgXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fZGVmYXVsdFwiXG4gICAgXy5vbiBcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9zZWxlY3RlZFwiXG5cbiAgaGFuZGxlcnM6XG5cbiAgICBpOiAtPlxuXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2NsaWNrJywgJy5pbm5lciA+IC5sYWJlbCA+IC5pY29uLmNhbmNlbCcsIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2tleXVwJywnIC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dCcsIEBrZXlIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2NsaWNrJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAc2VsZWN0SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdtb3VzZW92ZXInLCAnLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZScsIEBob3ZlckhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnYmx1cicsICBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdjbGljaycsIEBpbnNpZGVDaGVja1xuXG4gICAgICAkKGRvY3VtZW50KS5vbiAnY2xpY2snLCBAb3V0c2lkZUNoZWNrXG5cbiAgICBkOiAtPlxuXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdjbGljaycsICcuaW5uZXIgPiAubGFiZWwgPiAuaWNvbi5jYW5jZWwnLCBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAna2V5dXAnLCcgLmlubmVyID4gLnNlYXJjaCA+IGlucHV0JywgQGtleUhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAc2VsZWN0SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnbW91c2VvdmVyJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAaG92ZXJIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdibHVyJywgIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdjbGljaycsIEBpbnNpZGVDaGVja1xuXG4gICAgICAkKGRvY3VtZW50KS5vZmYgJ2NsaWNrJywgQG91dHNpZGVDaGVja1xuXG5cbiAgICBmaWx0ZXJDbGVhckhhbmRsZXI6IC0+XG4gICAgICBjb25zb2xlLmxvZyAnYWJvdXQgdG8gY2xlYXInXG4gICAgICBGaWx0ZXIuZmlsdGVyID0gJCh0aGlzKS5kYXRhICdmaWx0ZXInXG4gICAgICBGaWx0ZXIuc2VsZWN0IGZhbHNlXG4gICAgICBGaWx0ZXIuZCgpXG5cbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgZmlsdGVySGFuZGxlcjogLT5cbiAgICAgIEZpbHRlci5kKClcblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIEZpbHRlci5maWx0ZXIgPSAkKHRoaXMpLmRhdGEgJ2ZpbHRlcidcbiAgICAgIEZpbHRlci5lbmRwb2ludCA9ICQodGhpcykuZGF0YSAnZW5kcG9pbnQnXG5cblxuICAgICAgaWYgJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn1cIikuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBGaWx0ZXIuZCgpXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICBGaWx0ZXIuaGFuZGxlcnMuaSgpXG5cbiAgICAgICQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9ID4gLmlubmVyID4gLnZhbHVlc1wiKS5odG1sICcnXG4gICAgICBfLm9uIFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiXG4gICAgICAkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfSA+IC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dFwiKS5mb2N1cygpXG5cbiAgICAgIEZpbHRlci5nZXQoKVxuXG4gICAgaW5zaWRlQ2hlY2s6IC0+XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIG91dHNpZGVDaGVjazogLT5cbiAgICAgIEZpbHRlci5kKClcblxuICAgIGhvdmVySGFuZGxlcjogLT5cblxuICAgICAgXy5vZmYgJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlLm9uJ1xuICAgICAgXy5vbiAkKHRoaXMpXG5cbiAgICBzZWxlY3RIYW5kbGVyOiAtPlxuICAgICAgRmlsdGVyLnNlbGVjdCAkKHRoaXMpLmZpbmQoJy5uYW1lJykuaHRtbCgpXG5cbiAgICBrZXlIYW5kbGVyOiAtPlxuXG4gICAgICBrZXkgPSBldmVudC5rZXlDb2RlXG5cbiAgICAgIHN3aXRjaCBrZXlcbiAgICAgICAgd2hlbiAyNyB0aGVuIEZpbHRlci5kKClcbiAgICAgICAgd2hlbiA0MCwgMzkgdGhlbiBGaWx0ZXIubmF2ICdkb3duJ1xuICAgICAgICB3aGVuIDM3LDM4IHRoZW4gRmlsdGVyLm5hdiAndXAnXG4gICAgICAgIHdoZW4gMTMgdGhlbiBGaWx0ZXIuc2VsZWN0ICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlLm9uID4gLm5hbWUnKS5odG1sKClcbiAgICAgICAgZWxzZSBGaWx0ZXIuZ2V0ICQodGhpcykudmFsKClcblxuICAgICAgcmV0dXJuIHRydWVcblxuICBuYXY6IChkaXIpIC0+XG5cbiAgICBjdXIgPSAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZS5vbicpXG4gICAgbmV4dCA9IGN1ci5uZXh0KCkgaWYgZGlyIGlzICdkb3duJ1xuICAgIG5leHQgPSBjdXIucHJldigpIGlmIGRpciBpcyAndXAnXG4gICAgXy5vZmYgY3VyXG5cbiAgICBpZiBuZXh0Lmxlbmd0aCBpc250IDBcbiAgICAgIF8ub24gbmV4dFxuICAgICAgcmV0dXJuXG5cbiAgICBfLm9uICcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZTpmaXJzdC1jaGlsZCcgaWYgZGlyIGlzICdkb3duJ1xuICAgIF8ub24gJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlOmxhc3QtY2hpbGQnIGlmIGRpciBpcyAndXAnXG5cbiIsIkdsb2JhbCA9XG5cbiAgIyBrZXZpbiBvbHNvbiAoa2V2aW5AMjU2LmlvKSDwn4yA8J+Ot1xuXG4gIHdpbmRvdzogZmFsc2VcbiAgd2luZG93VGltZXI6IGZhbHNlXG4gIGluaXQ6IGZhbHNlXG5cbiAgaTogLT5cbiAgICBHbG9iYWwuaGFuZGxlcnMoKVxuICAgIEdsb2JhbC5sb2dpbkNoZWNrKClcblxuICAgIF8ub24gXCIubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbl8je1BhZ2V9XCIgaWYgUGFnZT9cblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5wcm9maWxlJykuY2xpY2sgR2xvYmFsLnVzZXJQcm9maWxlSGFuZGxlclxuICAgICQoJy5vYXV0aHMgPiAub2F1dGgnKS5jbGljayBHbG9iYWwudXNlck9hdXRoSGFuZGxlclxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5waWN0dXJlID4gLmxvZ291dCcpLmNsaWNrIEdsb2JhbC5sb2dvdXRIYW5kbGVyXG4gICAgJCgnLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb24nKS5jbGljayBHbG9iYWwubWVudUhhbmRsZXJcblxuICBtZW51SGFuZGxlcjogLT5cbiAgICBfLm9mZiAkKCcubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbicpXG4gICAgc2VsZWN0ZWQgPSAkKHRoaXMpLmZpbmQoJy5sYWJlbCcpLmh0bWwoKVxuICAgIF8ub24gJChcIi5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uLm9wdGlvbl8je3NlbGVjdGVkfVwiKVxuXG4gIGxvZ291dEhhbmRsZXI6IC0+XG5cbiAgICBQcm9tcHQuaSAnTG9nb3V0JywgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0PycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgcmV0dXJuIGZhbHNlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcblxuICAgICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICAgIE1lLmxvZ291dCAtPlxuICAgICAgICBfLnN3YXAgJy5tZSA+IC5wcm9maWxlJ1xuICAgICAgICBfLnN3YXAgJy5tZSA+IC5waWN0dXJlJ1xuICAgICAgICBOb3RpY2UuaSAnTG9nb3V0IFN1Y2Nlc3NmdWwnLCAnc3VjY2VzcydcbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcbiAgICAgICAgLCAxMjAwXG5cbiAgdXNlclByb2ZpbGVIYW5kbGVyOiAtPlxuXG4gICAgb2EgPSAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAub2F1dGhzJylcbiAgICB0bCA9IG5ldyBUaW1lbGluZU1heCByZXBlYXQ6IDBcblxuICAgIGlmIG9hLmhhc0NsYXNzICdvZmYnXG4gICAgICBfLm9uIG9hXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNjYW5jZWxTVkcnLCBlYXNlOlBvd2VyNC5lYXNlSW5PdXR9XG4gICAgZWxzZVxuICAgICAgdGwudG8gJyNwcm9maWxlU1ZHJywgMC44LCB7bW9ycGhTVkc6ICcjcHJvZmlsZVNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICAgIF8ub2ZmIG9hLCBvZmZpbmc6IDAuNVxuXG4gIHVzZXJPYXV0aEhhbmRsZXI6IC0+XG5cbiAgICB0eXBlID0gJCh0aGlzKS5kYXRhICd0eXBlJ1xuXG4gICAgcmV0dXJuIHRydWUgaWYgdHlwZSBpcyAnY2FuY2VsJ1xuXG4gICAgR2xvYmFsLm9hdXRoV2luZG93ICcvbG9hZGluZydcblxuICAgIFNwaW5uZXIuaSAkKCdoZWFkZXInKVxuXG4gICAgcGFyYW1zID0ge31cbiAgICBwYXJhbXMuaW52aXRlID0gSW52aXRlLmhhc2ggaWYgSW52aXRlLmhhc2hcblxuICAgIE1lLm9hdXRoIHR5cGUsIHBhcmFtcywgKHVyaSkgLT5cbiAgICAgIEdsb2JhbC53aW5kb3cubG9jYXRpb24uaHJlZiA9IHVyaVxuXG4gIG9hdXRoV2luZG93OiAodXJsKSAtPlxuICAgIHcgPSA2NDBcbiAgICBoID0gNTUwXG4gICAgbGVmdCA9IChzY3JlZW4ud2lkdGgvMikgLSAody8yKVxuICAgIHRvcCA9IChzY3JlZW4uaGVpZ2h0LzIpIC0gKGgvMilcblxuXG4gICAgR2xvYmFsLndpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgJ0xvZ2luIC8gUmVnaXN0ZXInLCBcInRvb2xiYXI9bm8sIGxvY2F0aW9uPW5vLCBkaXJlY3Rvcmllcz1ubywgc3RhdHVzPW5vLCBtZW51YmFyPW5vLCBzY3JvbGxiYXJzPW5vLCByZXNpemFibGU9bm8sIGNvcHloaXN0b3J5PW5vLCB3aWR0aD0je3d9LGhlaWdodD0je2h9LHRvcD0je3RvcH0sbGVmdD0je2xlZnR9XCIpXG4gICAgR2xvYmFsLndpbmRvdy5mb2N1cyBpZiB3aW5kb3cuZm9jdXNcbiAgICBHbG9iYWwud2luZG93VGltZXIgPSBzZXRJbnRlcnZhbCAtPlxuICAgICAgaWYgR2xvYmFsLndpbmRvdy5jbG9zZWRcbiAgICAgICAgY2xlYXJJbnRlcnZhbCBHbG9iYWwud2luZG93VGltZXJcbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgY29uc29sZS5sb2cgJ2Nsb3Npbmcgb3VyIHNoaXRlJ1xuICAgICwgNTBcblxuICAgIHJldHVyblxuXG4gIG9hdXRoQ29tcGxldGU6ICh1c2VyKSAtPlxuICAgIFNwaW5uZXIuZCgpXG4gICAgR2xvYmFsLmxvZ2luIHVzZXJcbiAgICBOb3RpY2UuaSAnTG9naW4gU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2VudHJpZXMnXG4gICAgICAyMDAwXG4gICAgZWxzZVxuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQnXG4gICAgICAyMDAwXG5cbiAgbG9naW46ICh1c2VyKSAtPlxuXG4gICAgd2luZG93LlVzZXIgPSB1c2VyXG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5pbWFnZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5waWN0dXJlfSlcIlxuICAgIF8ub2ZmICcubWUgPiAucHJvZmlsZSdcbiAgICBfLm9mZiAnLm1lID4gLm9hdXRocydcbiAgICBfLm9uICcubWUgPiAucGljdHVyZSdcblxuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50ID4gLm5hbWUnKS5odG1sIFVzZXIuY2xpZW50Lm5hbWVcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5jbGllbnQgPiAucGljdHVyZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5jbGllbnQucHJvZmlsZX0pXCJcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubG9nbydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcblxuICBsb2dpbkNoZWNrOiAtPlxuXG4gICAgI1NwaW5uZXIuaSgkKCdoZWFkZXInKSlcbiAgICBjb25zb2xlLmxvZyAnbG9naW5DaGVjaydcblxuICAgIE1lLmF1dGhlZCAocmVzdWx0KSAtPlxuICAgICAgY29uc29sZS5sb2cgJ2F1dGhlZCdcbiAgICAgIEdsb2JhbC5sb2dpbihyZXN1bHQpIGlmIHJlc3VsdCBpc250IGZhbHNlXG4gICAgICBpZiBHbG9iYWwuaW5pdCBpc250IGZhbHNlXG4gICAgICAgICNTcGlubmVyLmQoKVxuICAgICAgICB3aW5kb3dbR2xvYmFsLmluaXRdLmkoKVxuICAgICAgZWxzZVxuICAgICAgICAjU3Bpbm5lci5kKClcblxuICAgICAgIyB0dXJuIG9uIGFsbCBsb2dpbiAvIHJlZ2lzdHJhdGlvbiBkaXZzXG4gICAgICBpZiB3aW5kb3cuVXNlciBpcyB1bmRlZmluZWRcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8ub24gJy5ob21lID4gLm9hdXRocydcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4ubG9nbydcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm5hbWUnXG5cbiAgICAgICMgY2xpZW50IGJhc2VkIHVzZXIsIGdvIHRvIGVudHJpZXNcbiAgICAgIGlmIFVzZXI/LmNsaWVudCBpc250IHVuZGVmaW5lZCBhbmQgUGFnZSBpc250ICdlbnRyaWVzJ1xuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9lbnRyaWVzJ1xuXG4gICAgICBpZiB3aW5kb3cuVXNlciBpc250IHVuZGVmaW5lZCBhbmQgVXNlci5jbGllbnQgaXMgdW5kZWZpbmVkXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+LmxvZ28nXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5uYW1lJ1xuICAgICAgICBfLm9uICcubWVudSdcbiIsIl8uY29uc3RydWN0b3IoKVxuXG5jbGFzcyBJbmRleFxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy50b3AgLmJ1cmdlcicpLmNsaWNrIEBtb2JpbGVcblxuICBtb2JpbGU6IC0+XG4gICAgXy5zd2FwICcudG9wID4gLmJ1cmdlcidcbiAgICBfLnN3YXAgJy50b3AgPiAubWVudSdcbiIsIkludml0ZSA9XG4gIGhhc2g6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5pbnZpdGUnKSlcblxuICAgIGlmIFVzZXI/IGlzbnQgZmFsc2VcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgICBQcm9tcHQuaSAnSW52aXRlIEVyb3JyJywgJ1lvdSBhcmUgY3VycmVudGx5IGxvZ2dlZCBpbicsIFsnT0snXSwge30sIC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcblxuICAgIGVsc2VcbiAgICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL2ludml0ZVxcLyhbMC05YS1mQS1GXXs4fSkvXG4gICAgICAgIEBoYXNoID0gbWF0Y2hbMV1cbiAgICAgICAgQGxvYWQgQGhhc2hcbiAgICAgIGVsc2VcblxuICBsb2FkOiAoaGFzaCkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2ludml0ZS9nZXQnLFxuICAgICAgaGFzaDogaGFzaFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3VsdCkgLT5cbiAgICAgIGludml0ZSA9IHJlc3VsdC5kYXRhLmludml0ZVxuXG4gICAgICAkKCcucGFnZS5pbnZpdGUgPiAucHJvZmlsZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsXCJ1cmwoI3tpbnZpdGUuY2xpZW50LnByb2ZpbGV9KVwiXG4gICAgICAkKCcucGFnZS5pbnZpdGUgPiAudGl0bGUnKS5odG1sIGludml0ZS5jbGllbnQubmFtZVxuIiwiTGlzdGluZyA9XG4gIGNvbnRlbnQ6IGZhbHNlXG4gIHNlbGVjdGVkOiBbXVxuICBmaWx0ZXJzOiBbXVxuICBzZWxlY3RlZEN1cnNvcjogMFxuXG4gIG90aGVyQWN0aW9uczogZmFsc2VcblxuICBpOiAoY29udGVudCwgb3RoZXJBY3Rpb25zPWZhbHNlLCBmaWx0ZXJzPVtdKSAtPlxuXG4gICAgQGZpbHRlcnMgPSBmaWx0ZXJzXG4gICAgQGNvbnRlbnQgPSBjb250ZW50XG4gICAgQG90aGVyQWN0aW9ucyA9IG90aGVyQWN0aW9uc1xuICAgIEBsb2FkKClcbiAgICBAaGFuZGxlcnMoKVxuXG5cbiAgICBGaWx0ZXIuaSBAZmlsdGVycyBpZiBAZmlsdGVycy5sZW5ndGggPiAwXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICcuY2hlY2tib3gnLCBAY2hlY2tib3hIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICcuc3dpdGNoJywgQHN3aXRjaEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NoYW5nZScsICcubGlzdC1oZWFkZXIgPiAuY2hlY2tib3ggPiBpbnB1dCcsIEBzZWxlY3RBbGxIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjaGFuZ2UnLCAnLmNoZWNrYm94ID4gaW5wdXQnLCBAc3RhdGVIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjbGljaycsICcubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucyA+IC5hY3Rpb25zID4gLmFjdGlvbicsIEBhY3Rpb25IYW5kbGVyXG5cbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJz4gLmlubmVyID4gLnBhZ2luYXRlID4gLmlubmVyID4gLm51bScsIEBwYWdlSGFuZGxlclxuXG4gIGNoZWNrYm94SGFuZGxlcjogLT5cbiAgICBjYiA9ICQodGhpcykuZmluZCAnaW5wdXQnXG4gICAgaWYgZXZlbnQudGFyZ2V0LnR5cGUgaXNudCAnY2hlY2tib3gnXG4gICAgICBjYlswXS5jaGVja2VkID0gIWNiWzBdLmNoZWNrZWRcbiAgICAgIGNiLmNoYW5nZSgpXG5cbiAgc3dpdGNoSGFuZGxlcjogLT5cblxuICAgIGVsID0gJCh0aGlzKVxuXG4gICAgX2lkID0gZWwuZGF0YSAnX2lkJ1xuICAgIG5hbWUgPSBlbC5kYXRhICduYW1lJ1xuICAgIHZhbHVlID0gIWVsLmhhc0NsYXNzICdvbidcblxuICAgIExpc3RpbmcudG9nZ2xlIFtfaWRdLCBuYW1lLCB2YWx1ZSwgLT5cbiAgICAgIF8uc3dhcCBlbFxuXG4gIHRvZ2dsZTogKGlkcywgbmFtZSwgdmFsdWUsIGNvbXBsZXRlKSAtPlxuXG4gICAgaWRzLmZvckVhY2ggKF9pZCwgaW5kZXgpIC0+XG5cbiAgICAgIG9wdGlvbnMgPSB7fVxuICAgICAgb3B0aW9uc1tuYW1lXSA9IHZhbHVlXG5cbiAgICAgIF8uZ2V0IFwiL2FwaS8je0xpc3RpbmcuY29udGVudH0vdXBkYXRlLyN7X2lkfVwiLFxuICAgICAgICBvcHRpb25zXG4gICAgICAuZG9uZSAocmVzcG9zbmUpIC0+XG4gICAgICAgIGlmIGluZGV4IGlzIGlkcy5sZW5ndGgtMVxuICAgICAgICAgIE5vdGljZS5pIFwiVXBkYXRlZCBzdWNjZXNzZnVsbHlcIiwgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgY29tcGxldGU/KClcblxuICBzZWxlY3RBbGxIYW5kbGVyOiAtPlxuICAgIGlmIHRoaXMuY2hlY2tlZFxuICAgICAgJCgnLmxpc3RpbmcgPiAuaW5uZXIgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykucHJvcCAnY2hlY2tlZCcsIHRydWVcbiAgICBlbHNlXG4gICAgICAkKCcubGlzdGluZyA+IC5pbm5lciA+IC5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXQnKS5wcm9wICdjaGVja2VkJywgZmFsc2VcblxuICB1bnNlbGVjdEFsbDogLT5cbiAgICAgICQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH0gPiAuaW5uZXIgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0XCIpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuICAgICAgJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fSA+IC5saXN0LWhlYWRlciA+IC5jaGVja2JveCA+IGlucHV0XCIpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuICAgICAgTGlzdGluZy5zdGF0ZUhhbmRsZXIoKVxuXG4gIHN0YXRlSGFuZGxlcjogLT5cbiAgICBpZHMgPSBbXVxuXG4gICAgJCgnLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgaWYgZWwuY2hlY2tlZFxuICAgICAgICBpZHMucHVzaCAkKGVsKS5kYXRhICdfaWQnXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cbiAgICAgIGlmIGlkcy5sZW5ndGggPiAwXG4gICAgICAgICQoJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuY29weSA+IC52YWx1ZScpLnRleHQgaWRzLmxlbmd0aFxuICAgICAgICBfLm9mZiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMnXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMnXG4gICAgICAgIF8ub24gXCIubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uXyN7TGlzdGluZy5jb250ZW50fVwiXG4gICAgICBlbHNlXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzJ1xuICAgICAgICBfLm9mZiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucydcbiAgICAgICAgXy5vZmYgXCIubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uXyN7TGlzdGluZy5jb250ZW50fVwiXG4gICAgICBMaXN0aW5nLnNlbGVjdGVkID0gaWRzXG5cbiAgcGFnZUxpbmtzOiAtPlxuICAgIHBhcmFtcyA9IFF1ZXJ5LnBhcmFtcygpXG4gICAgJCgnLnBhZ2luYXRlID4gLmlubmVyID4gLm51bScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgcGFnZSA9ICQoZWwpLmRhdGEgJ3BhZ2UnXG4gICAgICByZXR1cm4gaWYgcGFnZSBpcyB1bmRlZmluZWRcbiAgICAgIHBhcmFtcy5wYWdlID0gcGFnZVxuICAgICAgcXVlcnkgPSBRdWVyeS5zdHJpbmdpZnkgcGFyYW1zXG4gICAgICAkKGVsKS5hdHRyICdocmVmJywgXCI/I3tRdWVyeS5zdHJpbmdpZnkocGFyYW1zKX1cIlxuXG4gIHBhZ2VIYW5kbGVyOiAtPlxuICAgIHBhZ2UgPSAkKHRoaXMpLmRhdGEgJ3BhZ2UnXG4gICAgcmV0dXJuIHRydWUgaWYgcGFnZSBpcyB1bmRlZmluZWRcbiAgICBMaXN0aW5nLnVuc2VsZWN0QWxsKClcbiAgICBRdWVyeS5wYXJhbSAncGFnZScsIHBhZ2VcbiAgICBMaXN0aW5nLmxvYWQoKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGFjdGlvbkhhbmRsZXI6IC0+XG4gICAgdHlwZSA9ICQodGhpcykuZGF0YSAndHlwZSdcblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdkZWxldGUnXG4gICAgICAgIFByb21wdC5pIFwiRGVsZXRpbmcgI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gaXRlbXMocylcIixcbiAgICAgICAgICAnVGhpcyBmZWF0dXJlIGlzIGN1cnJlbnRseSBpbiBkZXZlbG9wbWVudCcsIFsnT0snXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgICAjIyNcbiAgICAgICAgUHJvbXB0LmkgXCJEZWxldGluZyAje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBpdGVtcyhzKVwiLFxuICAgICAgICAgICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZXNlPycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmV0dXJuIHRydWUgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuICAgICAgICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCgpXG4gICAgICAgICMjI1xuXG4gICAgICB3aGVuICdwdWJsaXNoJywgJ2hpZGUnXG5cbiAgICAgICAgdmFsdWUgPSAodHlwZSBpcyAncHVibGlzaCcpXG4gICAgICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuICAgICAgICBMaXN0aW5nLnRvZ2dsZSBMaXN0aW5nLnNlbGVjdGVkLCAnYWN0aXZlJywgdmFsdWUsIC0+XG5cbiAgICAgICAgICAkKCcuc3dpdGNoLmFjdGl2ZScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgICAgICAgZm9yIF9pZCBpbiBMaXN0aW5nLnNlbGVjdGVkXG4gICAgICAgICAgICAgIF8ub24gJChlbCkgaWYgX2lkIGlzICQoZWwpLmRhdGEoJ19pZCcpIGFuZCB2YWx1ZSBpcyB0cnVlXG4gICAgICAgICAgICAgIF8ub2ZmICQoZWwpIGlmIF9pZCBpcyAkKGVsKS5kYXRhKCdfaWQnKSBhbmQgdmFsdWUgaXMgZmFsc2VcblxuICAgICAgICAgIGlmIHZhbHVlXG4gICAgICAgICAgICBOb3RpY2UuaSBcIiN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IEVudHJpZXMgcHVibGlzaGVkXCIsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIE5vdGljZS5pIFwiI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gRW50cmllcyBoaWRkZW5cIiwgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgU3Bpbm5lci5kKClcblxuXG4gICAgICBlbHNlXG4gICAgICAgIExpc3Rpbmcub3RoZXJBY3Rpb25zKHR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgZGVsZXRlOiAoaWQsIGNhbGxiYWNrKSAtPlxuXG4gICAgIyMjXG4gICAgU3Bpbm5lci5pKCQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH1cIikpXG4gICAgXy5nZXQgXCIvYXBpLyN7TGlzdGluZy5jb250ZW50fS9kZWxldGUvI3tpZH1cIlxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgY2FsbGJhY2sgdHJ1ZVxuICAgIC5mYWlsIC0+XG4gICAgICBjYWxsYmFjayBmYWxzZVxuICAgICMjI1xuXG4gIGRlbGV0ZVNlbGVjdGVkOiAoY3Vyc29yPTApIC0+XG5cbiAgICBpZiBMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aCBpcyBjdXJzb3JcbiAgICAgIE5vdGljZS5pICdTdHJ1Y3R1cmUocykgZGVsZXRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgIEBsb2FkKClcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBMaXN0aW5nLmRlbGV0ZSBMaXN0aW5nLnNlbGVjdGVkW2N1cnNvcl0sIChyZXN1bHQpIC0+XG4gICAgICBMaXN0aW5nLmRlbGV0ZVNlbGVjdGVkICsrY3Vyc29yIGlmIHJlc3VsdCBpcyB0cnVlXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuXG4gICAgb3B0aW9ucyA9IHZpZXc6IHRydWVcblxuICAgIGZvciBmaWx0ZXIgaW4gQGZpbHRlcnNcbiAgICAgIGlmIFF1ZXJ5LnBhcmFtKGZpbHRlcikgaXNudCB1bmRlZmluZWRcbiAgICAgICAgb3B0aW9uc1tmaWx0ZXIgKyAnLm5hbWUnXSA9IFF1ZXJ5LnBhcmFtIGZpbHRlclxuICAgIGlmIFF1ZXJ5LnBhcmFtKCdwYWdlJykgaXNudCB1bmRlZmluZWRcbiAgICAgIG9wdGlvbnMucGFnZSA9IFF1ZXJ5LnBhcmFtICdwYWdlJ1xuXG4gICAgXy5nZXQgXCIvYXBpLyN7QGNvbnRlbnR9XCIsIG9wdGlvbnNcbiAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICBUaW1lLmkoKVxuICAgICAgU3Bpbm5lci5kKClcbiAgICAgICQoJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzID4gLmNvcHkgPiAudmFsdWUnKS50ZXh0IHJlc3BvbnNlLnBhZ2luYXRlLnRvdGFsXG4gICAgICAkKFwiLiN7QGNvbnRlbnR9ID4gLmNvbnRlbnQgPiAubGlzdGluZyA+IC5pbm5lclwiKS5odG1sIHJlc3BvbnNlLnZpZXdcbiAgICAgIExpc3RpbmcucGFnZUxpbmtzKClcblxuXG4iLG51bGwsIk1lID1cblxuICBsb2dvdXQ6IChjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2F1dGgvbG9nb3V0J1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZSgpXG5cbiAgb2F1dGg6ICh0eXBlLCBwYXJhbXM9e30sIGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgXCIvYXBpL2F1dGgvI3t0eXBlfVwiLCBwYXJhbXNcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgY29tcGxldGUocmVzcG9uc2UuZGF0YS51cmkpXG5cbiAgYXV0aGVkOiAocmVzdWx0KSAtPlxuICAgIF8uZ2V0ICcvYXBpL2F1dGgnXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIHJlc3VsdCByZXNwb25zZS5kYXRhLnVzZXJcblxuICBnZXQ6XG4gICAgY2xpZW50SWQ6IC0+XG4gICAgICByZXR1cm4gVXNlci5jbGllbnQuaWRcbiIsIk5vdGZvdW5kID1cbiAgaTogLT5cbiAgICAkKCcjbGluZWVycm9yJykubm92YWNhbmN5XG4gICAgICAncmVibGlua1Byb2JhYmlsaXR5JzogMC4xXG4gICAgICAnYmxpbmtNaW4nOiAwLjJcbiAgICAgICdibGlua01heCc6IDAuNlxuICAgICAgJ2xvb3BNaW4nOiA4XG4gICAgICAnbG9vcE1heCc6IDEwXG4gICAgICAnY29sb3InOiAnI2ZmZmZmZidcbiAgICAgICdnbG93JzogWycwIDAgODBweCAjZmZmZmZmJywgJzAgMCAzMHB4ICMwMDgwMDAnLCAnMCAwIDZweCAjMDAwMGZmJ11cblxuICAgICQoJyNsaW5lY29kZScpLm5vdmFjYW5jeVxuICAgICAgJ2JsaW5rJzogMVxuICAgICAgJ29mZic6IDFcbiAgICAgICdjb2xvcic6ICdSZWQnXG4gICAgICAnZ2xvdyc6IFsnMCAwIDgwcHggUmVkJywgJzAgMCAzMHB4IEZpcmVCcmljaycsICcwIDAgNnB4IERhcmtSZWQnXVxuIiwiTm90aWNlID1cblxuICB0eXBlczogWydpbmZvJywnc3VjY2VzcycsJ3dhcm5pbmcnXVxuXG4gIGVsOiBmYWxzZVxuXG4gIG9uOiBmYWxzZVxuICBwcm9ncmVzczogZmFsc2VcbiAgdGltZW91dDogZmFsc2VcbiAgY2xvc2U6IHRydWVcblxuICBkZWZhdWx0OlxuICAgIHR5cGU6ICdpbmZvJ1xuICAgIHByb2dyZXNzOiBmYWxzZVxuICAgIHRpbWVvdXQ6IDUwMDBcblxuICBpOiAoY29weSxvcHRpb25zPXt9KSAtPlxuXG4gICAgQG9wdGlvbnMgPSBPYmplY3QuYXNzaWduIHt9LCBAZGVmYXVsdFxuXG4gICAgZm9yIGtleSwgcGFyYW0gb2Ygb3B0aW9uc1xuICAgICAgQG9wdGlvbnNba2V5XSA9IHBhcmFtXG5cbiAgICBAZWwgPSAkKCcubm90aWNlJykgaWYgQGVsIGlzIGZhbHNlXG5cbiAgICBmb3IgZHR5cGUgaW4gQHR5cGVzXG4gICAgICBAZWwucmVtb3ZlQ2xhc3MgZHR5cGVcbiAgICBAZWwuYWRkQ2xhc3MgQG9wdGlvbnMudHlwZVxuICAgIEBlbC5maW5kKCcuY29weSA+IC5tZXNzYWdlJykuaHRtbCBjb3B5XG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpc250IGZhbHNlXG4gICAgICBpZiBAcHJvZ3Jlc3MgaXMgZmFsc2VcbiAgICAgICAgXy5vbiBAZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgICAgIEBwcm9ncmVzcyA9IHRydWVcbiAgICAgIGlmIEBjbG9zZSBpcyB0cnVlXG4gICAgICAgIF8ub2ZmIEBlbC5maW5kKCcuY2xvc2UnKVxuICAgICAgICBAY2xvc2UgPSBmYWxzZVxuICAgICAgaWYgQG9uIGlzIGZhbHNlXG4gICAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgQG9wdGlvbnMucHJvZ3Jlc3MqMTAwICsgJyUnKVxuICAgICAgICAsIDEwMFxuICAgICAgZWxzZVxuICAgICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgQG9wdGlvbnMucHJvZ3Jlc3MqMTAwICsgJyUnKVxuXG4gICAgaWYgQG9wdGlvbnMucHJvZ3Jlc3MgaXMgZmFsc2UgYW5kIEBwcm9ncmVzcyBpcyB0cnVlXG4gICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgJzAlJylcbiAgICAgIF8ub2ZmIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgIEBwcm9ncmVzcyA9IGZhbHNlXG4gICAgICBfLm9uIEBlbC5maW5kKCcuY2xvc2UnKVxuICAgICAgQGNsb3NlID0gdHJ1ZVxuXG4gICAgaWYgQG9uIGlzIGZhbHNlXG4gICAgICBfLm9uIEBlbFxuICAgICAgQGhhbmRsZXJzLm9uKClcbiAgICAgIEBvbiA9IHRydWVcblxuICAgIGlmIEBvcHRpb25zLnRpbWVvdXQgaXNudCBmYWxzZSBhbmQgQG9wdGlvbnMucHJvZ3Jlc3MgaXMgZmFsc2VcbiAgICAgIEB0aW1lb3V0ID0gc2V0VGltZW91dCA9PlxuICAgICAgICBAZCgpXG4gICAgICAsIEBvcHRpb25zLnRpbWVvdXRcblxuICBoYW5kbGVyczpcbiAgICBvbjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLmNsb3NlID4gLmlubmVyJywgTm90aWNlLmRcbiAgICBvZmY6IC0+XG4gICAgICAkKCcubm90aWNlJykub2ZmICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuXG4gIGQ6IC0+XG4gICAgY2xlYXJUaW1lb3V0IE5vdGljZS50aW1lb3V0IGlmIE5vdGljZS50aW1lb3V0IGlzbnQgZmFsc2VcbiAgICBOb3RpY2UudGltZW91dCA9IGZhbHNlXG4gICAgTm90aWNlLmhhbmRsZXJzLm9mZigpXG4gICAgXy5vbiBOb3RpY2UuZWwuZmluZCgnLmNsb3NlJylcbiAgICBOb3RpY2UuY2xvc2UgPSB0cnVlXG4gICAgXy5vZmYgTm90aWNlLmVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgIE5vdGljZS5wcm9ncmVzcyA9IGZhbHNlXG4gICAgXy5vZmYgTm90aWNlLmVsLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuMlxuICAgIE5vdGljZS5vbiA9IGZhbHNlXG4iLCJQcm9tcHQgPVxuICBlbDoge31cbiAgb3B0aW9uczoge31cbiAgY2FsbGJhY2s6IGZhbHNlXG4gIHBhcmFtczoge31cblxuICBpOiAodGl0bGUsIGNvcHksIG9wdGlvbnM9WydPSyddLCBwYXJhbXMsIGNhbGxiYWNrKSAtPlxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gZmFsc2VcbiAgICBQcm9tcHQucGFyYW1zID0gZmFsc2VcblxuICAgIFByb21wdC5jYWxsYmFjayA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdmdW5jdGlvbidcbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBjYWxsYmFjayBpZiB0eXBlb2YgY2FsbGJhY2sgaXMgJ2Z1bmN0aW9uJ1xuXG4gICAgUHJvbXB0LnBhcmFtcyA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnXG5cbiAgICBQcm9tcHQuZWwgPSAkICcucHJvbXB0J1xuXG4gICAgUHJvbXB0LmVsLmZpbmQgJy50aXRsZSdcbiAgICAgIC5odG1sIHRpdGxlXG4gICAgUHJvbXB0LmVsLmZpbmQgJy5jb3B5J1xuICAgICAgLmh0bWwgY29weVxuXG4gICAgaWYgdHlwZW9mIHBhcmFtcyBpcyAnb2JqZWN0JyBhbmQgJ3RleHRhcmVhJyBvZiBwYXJhbXMgYW5kIHBhcmFtcy50ZXh0YXJlYSBpcyB0cnVlXG4gICAgICBfLm9uIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgICBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhID4gdGV4dGFyZWEnXG4gICAgICAgIC52YWwgcGFyYW1zLnZhbHVlXG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAnY2xpcGJvYXJkJyBvZiBwYXJhbXMgYW5kIHBhcmFtcy5jbGlwYm9hcmQgaXMgdHJ1ZVxuICAgICAgaW5wdXQgPSBQcm9tcHQuZWwuZmluZCAnLmlucHV0J1xuICAgICAgXy5vbiBpbnB1dFxuICAgICAgaW5wdXQuZmluZCgnaW5wdXQnKS52YWwgcGFyYW1zLnZhbHVlXG5cblxuICAgIFByb21wdC5vcHRpb25zID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb25zID4gLm9wdGlvbidcbiAgICBfLm9mZiBQcm9tcHQub3B0aW9uc1xuICAgIFByb21wdC5vcHRpb25zLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gICAgZm9yIG8saSBpbiBvcHRpb25zXG4gICAgICBvcHRpb24gPSBQcm9tcHQuZWwuZmluZCBcIi5vcHRpb25zICA+IC5vcHRpb25fI3tpKzF9XCJcbiAgICAgIF8ub24gb3B0aW9uXG4gICAgICBvcHRpb24uaHRtbCBvXG4gICAgICAgIC5kYXRhICd2YWx1ZScsIG9cblxuICAgIF8ub24gUHJvbXB0LmVsLFxuICAgIF8ub24gJy5iZmFkZSdcblxuICAgIFByb21wdC5oYW5kbGVycygpXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5mb2N1cygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChkb2N1bWVudCkua2V5ZG93biBQcm9tcHQua2V5ZG93blxuICAgIFByb21wdC5vcHRpb25zLm9uICdjbGljaycsIFByb21wdC5jbGlja1xuICAgIFByb21wdC5lbC5maW5kKCcuaW5uZXIgPiAuY2FuY2VsJykub24gJ2NsaWNrJywgUHJvbXB0LmNhbmNlbFxuICAgIFByb21wdC5lbC5maW5kKCcuY2xpcGJvYXJkJykub24gJ2NsaWNrJywgUHJvbXB0LmNsaXBib2FyZFxuXG5cbiAgY2xpcGJvYXJkOiAtPlxuICAgIFByb21wdC5lbC5maW5kKCcuaW5wdXQgPiBpbnB1dCcpLnNlbGVjdCgpXG4gICAgaWYgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuICAgICAgTm90aWNlLmkgJ0NvcGllZCB0byBjbGlwYm9hcmQnLCB0eXBlOiAnc3VjY2VzcydcbiAgICBlbHNlXG4gICAgICBOb3RpY2UuaSAnVW5hYmxlIHRvIGNsaXBib2FyZCcsIHR5cGU6ICd3YXJuaW5nJ1xuXG4gIGtleWRvd246IC0+XG4gICAgayA9IGV2ZW50LndoaWNoXG4gICAga2V5cyA9IFszOSwgOSwgMzcsIDEzLCAyN11cbiAgICByZXR1cm4gdHJ1ZSBpZiBrIG5vdCBpbiBrZXlzXG5cbiAgICBjdXJyZW50ID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb24ub24uYWN0aXZlJ1xuICAgIHNoaWZ0ID0gd2luZG93LmV2ZW50LnNoaWZ0S2V5XG5cbiAgICBpZiBrIGlzIDM5IG9yIChrIGlzIDkgYW5kICFzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQubmV4dCgpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5uZXh0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb25fMScpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMzcgb3IgKGsgaXMgOSBhbmQgc2hpZnQpXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBpZiBjdXJyZW50LnByZXYoKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIGN1cnJlbnQucHJldigpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBlbHNlXG4gICAgICAgIFByb21wdC5lbC5maW5kKCcub3B0aW9uLm9uJykubGFzdCgpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMTNcbiAgICAgIFByb21wdC50cmlnZ2VyIFByb21wdC5lbC5maW5kKCcub3B0aW9uLmFjdGl2ZScpLmRhdGEgJ3ZhbHVlJ1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgaWYgayBpcyAyN1xuICAgICAgUHJvbXB0LnRyaWdnZXIoZmFsc2UpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICBjYW5jZWw6IC0+XG4gICAgUHJvbXB0LnRyaWdnZXIgZmFsc2VcblxuICBjbGljazogLT5cbiAgICBQcm9tcHQudHJpZ2dlciAkKHRoaXMpLmRhdGEgJ3ZhbHVlJ1xuXG4gIHRyaWdnZXI6ICh2YWx1ZSkgLT5cbiAgICBfLm9mZiBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhJ1xuICAgIF8ub2ZmIFByb21wdC5lbCwgb2ZmaW5nOiBmYWxzZSwgb2ZmdGltZTogMC4yXG4gICAgI18ub2ZmICcuYmZhZGUnLCBvZmZpbmc6IGZhbHNlLCBvZmZpdG1lOiAwLjJcbiAgICBfLm9mZiAnLmJmYWRlJ1xuICAgIFByb21wdC5vcHRpb25zLnVuYmluZCAnY2xpY2snLCBQcm9tcHQuY2xpY2tcbiAgICAkKGRvY3VtZW50KS51bmJpbmQgJ2tleWRvd24nLCBQcm9tcHQua2V5ZG93blxuICAgIGlmIFByb21wdC5wYXJhbXMudGV4dGFyZWFcbiAgICAgIHZhbCA9IFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCgpXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHJlc3BvbnNlOiB2YWx1ZSwgdmFsOiB2YWxcbiAgICBlbHNlXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHZhbHVlXG4iLCJRdWVyeSA9XG5cbiAgZ2V0UXVlcnk6IC0+XG4gICAgcmV0dXJuIGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKVxuXG4gIHNldFF1ZXJ5OiAocGFyYW1zKSAtPlxuICAgIHF1ZXJ5ID0gcXMuc3RyaW5naWZ5IHBhcmFtc1xuICAgIGlmIHF1ZXJ5IGlzIHVuZGVmaW5lZCBvciBxdWVyeSBpcyAnJ1xuICAgICAgaGlzdG9yeS5wdXNoU3RhdGUgbnVsbCwgbnVsbCwgbG9jYXRpb24ucGF0aG5hbWVcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSBudWxsLCBudWxsLCBsb2NhdGlvbi5wYXRobmFtZSArICc/JyArIHF1ZXJ5XG4gICAgXG4gIHBhcmFtOiAoa2V5LCB2YWx1ZSkgLT5cblxuICAgIHF1ZXJ5ID0gQGdldFF1ZXJ5KClcblxuICAgIHBhcmFtcyA9IHFzLnBhcnNlIHF1ZXJ5XG5cbiAgICByZXR1cm4gcGFyYW1zW2tleV0gaWYgdmFsdWUgaXMgdW5kZWZpbmVkXG5cbiAgICBpZiB2YWx1ZSBpcyBmYWxzZVxuICAgICAgZGVsZXRlIHBhcmFtc1trZXldXG4gICAgZWxzZVxuICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZVxuICAgIEBzZXRRdWVyeSBwYXJhbXNcblxuICBwYXJhbXM6IC0+XG4gICAgcmV0dXJuIHFzLnBhcnNlIEBnZXRRdWVyeSgpXG5cbiAgc3RyaW5naWZ5OiAocGFyYW1zKSAtPlxuICAgIHJldHVybiBxcy5zdHJpbmdpZnkgcGFyYW1zXG5cbiIsIlNlbGVjdGl6ZSA9XG5cbiAgY2xpZW50czogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0Q2xpZW50ID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIENsaWVudCBcIlxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PiN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS9jbGllbnRzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RDbGllbnQuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0Q2xpZW50XG5cbiAgc3RydWN0dXJlczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG5cbiAgICBzZWxlY3RTdHJ1Y3R1cmUgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIGEgU3RydWN0dXJlICAgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgb3Blbk9uRm9jdXM6IHRydWVcbiAgICAgIG9uTG9hZDogRW50cnkuc3RydWN0dXJlU3BlY2lmaWVkXG4gICAgICByZW5kZXI6XG4gICAgICAgIGl0ZW06IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj48aW1nIGNsYXNzPVxcXCJwcm9maWxlXFxcIiBzcmM9XFxcIiN7aXRlbS5jbGllbnRQcm9maWxlfVxcXCIvPiAje2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj48aW1nIGNsYXNzPVxcXCJwcm9maWxlXFxcIiBzcmM9XFxcIiN7aXRlbS5jbGllbnRQcm9maWxlfVxcXCIvPiAje2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lLCBjbGllbnROYW1lOiBpdGVtLmNsaWVudC5uYW1lLCBjbGllbnRQcm9maWxlOiBpdGVtLmNsaWVudC5wcm9maWxlXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0U3RydWN0dXJlLmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdFN0cnVjdHVyZVxuXG4gIHVzZXJzOiAoZWxlbWVudCwgaGFuZGxlciwgb3B0aW9ucykgLT5cbiAgICBzZWxlY3RVc2VyID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsdWdpbnM6IFsncmVtb3ZlX2J1dHRvbiddXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXYgc3R5bGU9J2xpbmUtaGVpZ2h0OiAzMHB4Oyc+I3tpdGVtLm5hbWV9ICgje2l0ZW0uZW1haWx9KSA8aW1nIHNyYz0nI3tpdGVtLnBpY3R1cmV9JyBzdHlsZT0nZmxvYXQ6IGxlZnQ7IHdpZHRoOiAzMHB4OyBoZWlnaHQ6IDMwcHg7IG1hcmdpbi1yaWdodDogMTBweDsnIC8+PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL3VzZXJzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWUsIGVtYWlsOiBpdGVtLmVtYWlsLCBwaWN0dXJlOiBpdGVtLnBpY3R1cmVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RVc2VyLmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdFVzZXJcblxuXG4iLCJcblNwaW5uZXIgPVxuXG4gIHN0YXRlOiBmYWxzZVxuXG4gIGVsOiB7fVxuXG4gIGk6IChlbCwgb3ZlcnJpZGUpIC0+XG5cbiAgICBAZWwgPSAkKCcuc3Bpbm5lcicpXG5cbiAgICByZWN0ID0gZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGNvb3JkcyA9XG4gICAgICB0b3A6IFwiI3tyZWN0LnRvcCArICQod2luZG93KS5zY3JvbGxUb3AoKX1weFwiXG4gICAgICBsZWZ0OiBcIiN7cmVjdC5sZWZ0fXB4XCJcbiAgICAgIHdpZHRoOiBcIiN7cmVjdC53aWR0aH1weFwiXG4gICAgICBoZWlnaHQ6IFwiI3tyZWN0LmhlaWdodH1weFwiXG5cbiAgICBpZiBvdmVycmlkZSBpc250IHVuZGVmaW5lZFxuICAgICAgZm9yIGtleSwgY29vcmQgb2Ygb3ZlcnJpZGVcbiAgICAgICAgY29vcmRzW2tleV0gPSBjb29yZFxuXG4gICAgQGVsLmNzcyBjb29yZHNcblxuICAgIF8ub24gQGVsXG4gICAgQHN0YXRlID0gdHJ1ZVxuXG4gIGQ6IC0+XG4gICAgXy5vZmYgQGVsXG4gICAgQHN0YXRlID0gZmFsc2VcbiIsIlN0cnVjdHVyZSA9XG5cbiAgdGVtcGxhdGU6IGZhbHNlXG4gIF9pZDogZmFsc2VcblxuICBjbGllbnRTZWxlY3Q6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEB0ZW1wbGF0ZSA9ICQoJy5tb2RpZnkgPiAjdGVtcGxhdGUnKS5odG1sKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgQGNsaWVudFNlbGVjdCA9IFNlbGVjdGl6ZS5jbGllbnRzICQoJy5wYWdlLnN0cnVjdHVyZSA+IC5tb2RpZnkgPiAuZGV0YWlsLmNsaWVudCA+IC5pbnB1dCA+IHNlbGVjdCcpLFxuICAgICAgQGNsaWVudFNlbGVjdGhhbmRsZXJcblxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL3N0cnVjdHVyZXNcXC8oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEBfaWQgPSBtYXRjaFsxXVxuICAgICAgQGxvYWQgQF9pZFxuICAgICAgXy5vbiAnLm1vZGlmeSA+IC5zdWJtaXQgPiAuY3RhJ1xuICAgIGVsc2VcbiAgICAgIEBlbnRpdHlBZGQoKVxuXG4gICAgQGNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuZm9jdXMoKSBpZiBAX2lkIGlzIGZhbHNlXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLm1vcmUnKS5jbGljayBAZW50aXR5QWRkSGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMnKS5vbiAnY2xpY2snLCcuZW50aXR5ID4gLnJlbW92ZScsIEBlbnRpdHlSZW1vdmVIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5zdWJtaXQgPiAuY3RhcCcpLmNsaWNrIEBzdWJtaXRIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5zdWJtaXQgPiAuY3RhJykuY2xpY2sgQG5ld0VudHJ5SGFuZGxlclxuICAgICQoJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLmNoZWNrYm94Jykub24gJ2NsaWNrJywgQGNoZWNrYm94SGFuZGxlclxuXG4gIGNoZWNrYm94SGFuZGxlcjogLT5cbiAgICBjYiA9ICQodGhpcykuZmluZCAnaW5wdXQnXG4gICAgaWYgZXZlbnQudGFyZ2V0LnR5cGUgaXNudCAnY2hlY2tib3gnXG4gICAgICBjYlswXS5jaGVja2VkID0gIWNiWzBdLmNoZWNrZWRcbiAgICAgIGNiLmNoYW5nZSgpXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5zdHJ1Y3R1cmUnKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMvJyxcbiAgICAgIF9pZDogQF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvc3RydWN0dXJlcy9uZXcnIGlmIHJlc3BvbnNlLmRhdGEubGVuZ3RoIDwgMVxuICAgICAgc3RydWN0dXJlID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwgc3RydWN0dXJlLm5hbWVcblxuICAgICAgaWYgc3RydWN0dXJlLmNsaWVudEFjY2VzcyBpcyB0cnVlXG4gICAgICAgICQoJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLmNoZWNrYm94ID4gaW5wdXQnKVswXS5jaGVja2VkID0gdHJ1ZVxuXG4gICAgICBmb3IgaSwgZW50aXR5IG9mIHN0cnVjdHVyZS5lbnRpdGllc1xuICAgICAgICBTdHJ1Y3R1cmUuZW50aXR5QWRkIGZhbHNlLCBlbnRpdHlcblxuICAgICAgU3RydWN0dXJlLmNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuYWRkT3B0aW9uXG4gICAgICAgIGlkOiBzdHJ1Y3R1cmUuY2xpZW50LmlkLCBuYW1lOiBzdHJ1Y3R1cmUuY2xpZW50Lm5hbWVcbiAgICAgIFN0cnVjdHVyZS5jbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLnNldFZhbHVlIHN0cnVjdHVyZS5jbGllbnQuaWRcblxuXG5cbiAgZW50aXR5QWRkSGFuZGxlcjogLT5cbiAgICBTdHJ1Y3R1cmUuZW50aXR5QWRkKHRydWUpXG5cbiAgZW50aXR5UmVtb3ZlSGFuZGxlcjogLT5cbiAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZSgpXG5cbiAgZW50aXR5QWRkOiAoZm9jdXM9ZmFsc2UsIGVudGl0eT1mYWxzZSkgLT5cblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keScpLmFwcGVuZCBAdGVtcGxhdGVcblxuICAgIGlmIGVudGl0eSBpc250IGZhbHNlXG4gICAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5Omxhc3QtY2hpbGQnKS5maW5kKCcuaW5wdXQgPiBpbnB1dCcpLnZhbChlbnRpdHkubmFtZSlcbiAgICAgIEBzZWxlY3RpemUgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gc2VsZWN0JyksIGVudGl0eS50eXBlXG4gICAgZWxzZVxuICAgICAgQHNlbGVjdGl6ZSAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5Omxhc3QtY2hpbGQnKS5maW5kKCcuaW5wdXQgPiBzZWxlY3QnKVxuXG4gICAgaWYgIGZvY3VzXG4gICAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5ID4gLmlucHV0LnNlbGVjdGl6ZS1pbnB1dCBpbnB1dCcpLmxhc3QoKS5mb2N1cygpXG5cbiAgc2VsZWN0aXplOiAoZWwsIHZhbHVlPWZhbHNlKSAtPlxuICAgIGl6ZWQgPSBlbC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIlR5cGVcIlxuXG4gICAgaXplZFswXS5zZWxlY3RpemUuc2V0VmFsdWUgdmFsdWVcblxuICBzdWJtaXRIYW5kbGVyOiAtPlxuXG4gICAgc3RydWN0dXJlID0ge31cbiAgICBzdHJ1Y3R1cmUuZW50aXRpZXMgPSB7fVxuICAgIHN0cnVjdHVyZS5jbGllbnQgPSAkKCcubW9kaWZ5ID4gLmNsaWVudCA+IC5pbnB1dCA+IHNlbGVjdCcpLnZhbCgpXG4gICAgc3RydWN0dXJlLm5hbWUgPSAkKCcubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCgpXG4gICAgc3RydWN0dXJlLmNsaWVudEFjY2VzcyA9ICQoJy5tb2RpZnkgPiAuY2xpZW50QWNjZXNzID4gLmNoZWNrYm94ID4gaW5wdXQnKVswXS5jaGVja2VkXG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5JykuZWFjaCAoaSwgZWwpIC0+XG5cbiAgICAgIG5hbWUgPSAkKGVsKS5maW5kKCcuaW5wdXQgPiBpbnB1dCcpLnZhbCgpXG4gICAgICB0eXBlID0gJChlbCkuZmluZCgnLmlucHV0ID4gc2VsZWN0JykudmFsKClcblxuICAgICAgc3RydWN0dXJlLmVudGl0aWVzW25hbWVdID1cbiAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB0eXBlOiB0eXBlXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgY29uc29sZS5sb2cgc3RydWN0dXJlLmVudGl0aWVzXG4gICAgICBTdHJ1Y3R1cmUubW9kaWZ5IHN0cnVjdHVyZVxuXG4gIG5ld0VudHJ5SGFuZGxlcjogLT5cbiAgICBsb2NhdGlvbi5ocmVmID0gXCIvZW50cmllcy9uZXcjc3RydWN0dXJlPSN7U3RydWN0dXJlLl9pZH1cIlxuXG4gIG1vZGlmeTogKHN0cnVjdHVyZSkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5zdHJ1Y3R1cmUnKSlcblxuICAgIGNhbGwgPSAnL2FwaS9zdHJ1Y3R1cmVzL2FkZCdcbiAgICBpZiBTdHJ1Y3R1cmUuX2lkIGlzbnQgZmFsc2VcbiAgICAgIGNhbGwgPSBcIi9hcGkvc3RydWN0dXJlcy91cGRhdGUvI3tTdHJ1Y3R1cmUuX2lkfVwiXG5cbiAgICBfLmdldCBjYWxsLCBzdHJ1Y3R1cmVcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsICdzdWNjZXNzJ1xuICAgICAgICBfLm9uICcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnXG4gICAgICAgIGlmIFN0cnVjdHVyZS5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9zdHJ1Y3R1cmVzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgU3RydWN0dXJlLl9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4iLCJTdHJ1Y3R1cmVzID1cbiAgaTogLT5cbiAgICBMaXN0aW5nLmkgJ3N0cnVjdHVyZXMnLCBmYWxzZSwgWydjbGllbnQnXVxuXG4iLCJVc2VycyA9XG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICd1c2VycydcbiJdfQ==
