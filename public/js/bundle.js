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
    "c1sb": {
      "font-family": "Roboto",
      "font-size": "14px",
      "font-weight": "600",
      "letter-spacing": "1px"
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
    Spinner.i($('.page.dashboard'));
    return $(gets).each((function(_this) {
      return function(index, get) {
        return _.get("/api/" + get).done(function(response) {
          _this.data[get] = response;
          if (Object.keys(_this.data).length === gets.length) {
            Spinner.d();
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
    return Listing.i('entries');
  }
};

var Entry;

Entry = {
  selectStructure: {},
  _id: false,
  structure: false,
  entry: false,
  i: function() {
    var match;
    this.selectize();
    this.handlers();
    if (match = location.pathname.match(/\/entries\/([0-9a-fA-F]{24})/)) {
      this._id = match[1];
      return this.load(this._id);
    } else {
      return Entry.selectStructure[0].selectize.focus();
    }
  },
  selectize: function() {
    return this.selectStructure = Selectize.structures($('.modify > .structure > select'), Entry.structureSelectHandler);
  },
  handlers: function() {
    $('.page.entry > .modify > .submit').click(this.submit);
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
      Entry.selectStructure[0].selectize.addOption(entry.structure);
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
      console.log(entities);
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
        return Entry._id = response.data._id;
      });
    });
  },
  structureSelectHandler: function(e) {
    var structure_id;
    structure_id = $(e.currentTarget).val();
    if (structure_id.length !== 24) {
      return false;
    }
    if (Entry.entry !== false) {
      return Entry.loadEntities(Entry.entry.entities, Entry.entry.name);
    } else {
      return Entry.loadStructure(structure_id);
    }
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
    var body, entity, entityEl, html, i, index, tabindex;
    if (name == null) {
      name = false;
    }
    _.on('.page.entry > .modify > .name');
    if (name !== false) {
      $('.page.entry > .modify > .name > .input > input').val(name);
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
      if (entity.value) {
        switch (entity.type) {
          case 'Text':
          case 'Date':
          case 'Time':
          case 'DateTime':
          case 'DateRange':
          case 'DateTimeRange':
            html.find('input').val(entity.value);
        }
      }
      html.find('input,select,textarea').attr('tabindex', tabindex++);
      body.append(html);
      entityEl = $(".page.entry > .modify > .body .entity_index_" + index);
      entityEl.find('.label').html(entity.name);
      if (Entities[entity.type] !== void 0) {
        Entities[entity.type](entityEl, entity.name, entity.value);
      }
    }
    $('[tabindex=2]').focus();
    _.on('.page.entry > .modify > .submit');
    return $('.page.entry > .modify > .submit').attr('tabindex', tabindex);
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
    Spinner.i($('header'));
    return Me.authed(function(result) {
      if (result !== false) {
        Global.login(result);
      }
      if (Global.init !== false) {
        Spinner.d();
        window[Global.init].i();
      } else {
        Spinner.d();
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
  selectedCursor: 0,
  otherActions: false,
  i: function(content, otherActions) {
    if (otherActions == null) {
      otherActions = false;
    }
    this.content = content;
    this.otherActions = otherActions;
    this.load();
    return this.handlers();
  },
  handlers: function() {
    $(".listing." + this.content).on('click', '.checkbox', this.checkboxHandler);
    $(".listing." + this.content).on('change', '.list-header > .checkbox > input', this.selectAllHandler);
    $(".listing." + this.content).on('change', '.checkbox > input', this.stateHandler);
    return $(".listing." + this.content).on('click', '.list-header > .state_actions > .actions > .action', this.actionHandler);
  },
  checkboxHandler: function() {
    var cb;
    cb = $(this).find('input');
    if (event.target.type !== 'checkbox') {
      cb[0].checked = !cb[0].checked;
      return cb.change();
    }
  },
  selectAllHandler: function() {
    if (this.checked) {
      return $('.listing > .items > .item > .checkbox > input').prop('checked', true);
    } else {
      return $('.listing > .items > .item > .checkbox > input').prop('checked', false);
    }
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
  actionHandler: function() {
    var type;
    type = $(this).data('type');
    switch (type) {
      case 'delete':
        return Prompt.i("Deleting " + Listing.selected.length + " items(s)", 'Are you sure you want to delete these?', ['Yes', 'No'], function(response) {
          if (response !== 'Yes') {
            return true;
          }
          return Listing.deleteSelected();
        });
      default:
        return Listing.otherActions(type);
    }
  },
  "delete": function(id, callback) {
    Spinner.i($(".listing." + Listing.content));
    return _.get("/api/" + Listing.content + "/delete/" + id).always(function() {
      return Spinner.d();
    }).done(function(response) {
      return callback(true);
    }).fail(function() {
      return callback(false);
    });
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
    Spinner.i($(".page." + Listing.content));
    return _.get("/api/" + this.content, {
      view: true
    }).done((function(_this) {
      return function(response) {
        Time.i();
        Spinner.d();
        $('.listing > .list-header > .state_stats > .copy > .value').text(response.data.length);
        return $("." + _this.content + " > .content > .listing > .items").html(response.view);
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
    return $('.modify > .submit > .ctap').click(this.submitHandler);
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
    return Listing.i('structures');
  }
};

var Users;

Users = {
  i: function() {
    return Listing.i('users');
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJnbG9iYWwuY29mZmVlIiwiaW5kZXguY29mZmVlIiwiaW52aXRlLmNvZmZlZSIsImxpc3RpbmcuY29mZmVlIiwibWFpbi5qcyIsIm1lLmNvZmZlZSIsIm5vdGZvdW5kLmNvZmZlZSIsIm5vdGljZS5jb2ZmZWUiLCJwcm9tcHQuY29mZmVlIiwic2VsZWN0aXplLmNvZmZlZSIsInNwaW5uZXIuY29mZmVlIiwic3RydWN0dXJlLmNvZmZlZSIsInN0cnVjdHVyZXMuY29mZmVlIiwidXNlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOztBQUFBLENBQUEsR0FFRTtFQUFBLENBQUEsRUFBRyxTQUFBO1dBQ0QsSUFBQyxDQUFBLE9BQUQsR0FBVyxXQUFBLENBQVksSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUFaLEVBQTZCLEdBQTdCO0VBRFYsQ0FBSDtFQUdBLENBQUEsRUFDRTtJQUFBLE1BQUEsRUFBUSxLQUFSO0lBQ0EsT0FBQSxFQUFTLENBRFQ7R0FKRjtFQU9BLElBQUEsRUFBTSxTQUFDLEVBQUQsRUFBSyxNQUFMLEVBQW1CLEdBQW5COztNQUFLLFNBQU87OztNQUFPLE1BQUk7O0lBRTNCLElBQUcsQ0FBQSxDQUFBLEVBQUEsWUFBa0IsTUFBbEIsQ0FBSDtNQUNFLEVBQUEsR0FBSyxDQUFBLENBQUUsRUFBRixFQURQOztJQUdBLElBQUcsTUFBQSxLQUFZLEtBQWY7TUFDRSxFQUFFLENBQUMsV0FBSCxDQUFlLE1BQWYsRUFERjs7SUFHQSxJQUFHLEdBQUEsS0FBUyxLQUFaO01BQ0UsRUFBRSxDQUFDLFFBQUgsQ0FBWSxHQUFaLEVB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QUFBO1dBQ0QsT0FBTyxDQUFDLENBQVIsQ0FBVSxZQUFWO0VBREMsQ0FBSDs7O0FDREYsSUFBQTs7QUFBQSxLQUFBLEdBQ0U7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELE9BQU8sQ0FBQyxDQUFSLENBQVUsT0FBVjtFQURDLENBQUgiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpnZXQuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgcG9zdDogKGFyZ3MuLi4pIC0+XG5cbiAgICBqcG9zdCA9ICQucG9zdCBhcmdzLi4uXG5cbiAgICBqcG9zdC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAganBvc3QuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcG9zdFxuXG4gIGZhaWw6IChyZXNwb25zZSkgLT5cblxuICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OPy5lcnJvcnM/WzBdXG4gICAgaWYgZXJyb3IgaXMgdW5kZWZpbmVkXG4gICAgICByZXR1cm4gUHJvbXB0LmkgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0XG5cbiAgICBwdWcgPSBlcnJvci5tZXNzYWdlLm1hdGNoIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspL1xuICAgIGlmIHB1ZyBpc250IG51bGxcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlLnJlcGxhY2UgL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvLCAnJ1xuICAgICAgZXJyb3IuZmlsZSA9IHB1Z1sxXVxuICAgICAgZXJyb3IubGluZSA9IHB1Z1syXVxuXG4gICAgZmlsZSA9IEBlbmNvZGUgXCIje2Vycm9yLmZpbGV9XCJcblxuICAgIHN3aXRjaCBjb25maWcuYXBwLmVkaXRvclxuICAgICAgd2hlbiAnbWFjdmltJyB0aGVuIGVkaXRvciA9ICdtdmltOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3N1YmxpbWUnIHRoZW4gZWRpdG9yID0gJ3N1Ymw6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnZW1hY3MnIHRoZW4gZWRpdG9yID0gJ2VtYWNzOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3RleHRtYXRlJyB0aGVuIGVkaXRvciA9ICd0ZXh0bWF0ZTovL29wZW4vP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAncGhwc3Rvcm0nIHRoZW4gZWRpdG9yID0gJ3BocHN0b3JtOi8vb3Blbj9maWxlPSdcblxuICAgIGlmIGVycm9yLmZpbGUgaXNudCBudWxsXG4gICAgICBib2R5ID0gXCJcIlwiXG4gICAgICAgIDxwcmU+I3tlcnJvci5tZXNzYWdlfTwvcHJlPlxuICAgICAgICA8YSBocmVmPVwiI3tlZGl0b3J9I3tmaWxlfSZsaW5lPSN7ZXJyb3IubGluZX1cIj48Yj4je2Vycm9yLmZpbGV9OiN7ZXJyb3IubGluZX08L2I+PC9hPlxuICAgICAgXCJcIlwiXG4gICAgZWxzZVxuICAgICAgYm9keSA9IGVycm9yLm1lc3NhZ2VcblxuICAgIFByb21wdC5pIGVycm9yLnR5cGUsIGJvZHksIFsnT0snXVxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbiAgbWV0aG9kczogKG9iaikgLT5cbiAgICByZXMgPSBbXVxuICAgIGZvciBpLG0gb2Ygb2JqXG4gICAgICBpZiB0eXBlb2YgbSBpcyAnZnVuY3Rpb24nXG4gICAgICAgIHJlcy5wdXNoIG1cbiAgICByZXR1cm4gcmVzXG5cbl8uaSgpXG4iLCJUaW1lID1cbiAgaW50ZXJ2YWw6IGZhbHNlXG4gIGdhcDogMTAwMFxuXG4gIGk6IC0+XG4gICAgQGludGVydmFsID0gc2V0SW50ZXJ2YWwoQHNjcmFwZSwgQGdhYSkgaWYgQGludGVydmFsIGlzIGZhbHNlXG4gICAgQHNjcmFwZSgpXG5cbiAgc2NyYXBlOiAtPlxuICAgICQoJ3RpbWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGplbCA9ICQgZWxcbiAgICAgIGplbC5odG1sIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuZnJvbU5vdygpXG4gICAgICBqZWwuYXR0ciAnYXJpYS1sYWJlbCcsIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuY2FsZW5kYXIoKVxuIiwiQ2xpZW50ID1cblxuICBzZWxlY3RVc2VyOiBmYWxzZVxuICBfaWQ6IGZhbHNlXG4gIGNyb3A6IGZhbHNlXG4gIHByb2ZpbGU6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEBoYW5kbGVycygpXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvY2xpZW50c1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG5cbiAgICBAc2VsZWN0VXNlciA9IFNlbGVjdGl6ZS51c2VycyAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtdXNlcnMgPiBpbnB1dCcpLCBAc2VsZWN0VXNlckhhbmRsZXIsIG1lOiBmYWxzZVxuXG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0ID4gaW5wdXQnKS5mb2N1cygpXG4gXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmNsaWVudCA+IC5zdWJtaXQnKS5jbGljayBAbW9kaWZ5SGFuZGxlclxuXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdvdmVyJywgQGRyYWdvdmVyXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdsZWF2ZScsIEBkcmFnbGVhdmVcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2VudGVyIGRyYWdvdmVyJywgQGNhbmNlbFxuXG4gICAgJChkb2N1bWVudCkub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAZHJvcFxuXG4gICAgJCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YScpLm9uICdjbGljaycsIEBjaG9vc2VGaWxlXG4gICAgJCgnLmlucHV0LWltYWdlID4gaW5wdXQ6ZmlsZScpLmNoYW5nZSBAY2hhbmdlXG5cbiAgY2FuY2VsOiAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICBkcmFnb3ZlcjogLT5cbiAgICBfLm9uICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJhZ2xlYXZlOiAtPlxuICAgIF8ub2ZmICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJvcDogKGUpIC0+XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgXy5vZmYgJy5pbnB1dC1pbWFnZSdcblxuICAgIGlmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgYW5kIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoXG4gICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hhbmdlOiAtPlxuICAgIGlmICQodGhpcylbMF0uZmlsZXNcbiAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hvb3NlRmlsZTogLT5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG4gIGNyb3BwaWU6IChmaWxlKSAtPlxuICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIub25sb2FkZW5kID0gLT5cblxuICAgICAgaWYgQ2xpZW50LmNyb3AgaXNudCBmYWxzZVxuICAgICAgICBDbGllbnQuY3JvcC5jcm9wcGllICdkZXN0cm95J1xuICAgICAgICBDbGllbnQuY3JvcCA9IGZhbHNlXG5cbiAgICAgIENsaWVudC5jcm9wID0gJCgnLmlucHV0LWltYWdlID4gLmNyb3BwaWUnKS5jcm9wcGllXG4gICAgICAgIHVybDogcmVhZGVyLnJlc3VsdFxuICAgICAgICBlbmZvcmNlQm91bmRhcnk6IGZhbHNlXG4gICAgICAgIHZpZXdwb3J0OlxuICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICBoZWlnaHQ6IDIwMFxuICAgICAgICBib3VuZGFyeTpcbiAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgaGVpZ2h0OiAzMDBcblxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMIGZpbGVcblxuICBzZWxlY3RVc2VySGFuZGxlcjogLT5cblxuICBtb2RpZnlIYW5kbGVyOiAtPlxuXG4gICAgaWYgQ2xpZW50LmNyb3AgaXNudCBmYWxzZVxuICAgICAgQ2xpZW50LmNyb3AuY3JvcHBpZSAncmVzdWx0JyxcbiAgICAgICAgdHlwZTogJ2NhbnZhcydcbiAgICAgICAgZm9ybWF0OiAnanBlZydcbiAgICAgIC50aGVuIChyZXNwb25zZSkgLT5cbiAgICAgICAgQ2xpZW50LmltYWdlVXBsb2FkIENsaWVudC5kYXRhVVJJdG9CbG9iKHJlc3BvbnNlKSwgLT5cbiAgICAgICAgICBDbGllbnQubW9kaWZ5KClcbiAgICBlbHNlXG4gICAgICBDbGllbnQubW9kaWZ5KClcblxuICBtb2RpZnk6IC0+XG5cbiAgICBuYW1lID0gJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LW5hbWUgPiBpbnB1dCcpLnZhbCgpXG4gICAgdXNlcnMgPSAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtdXNlcnMgPiBpbnB1dCcpLnZhbCgpLnNwbGl0ICcsJ1xuXG4gICAgY2FsbCA9ICcvYXBpL2NsaWVudHMvYWRkJ1xuICAgIGlmIENsaWVudC5faWQgaXNudCBmYWxzZVxuICAgICAgY2FsbCA9IFwiL2FwaS9jbGllbnRzL3VwZGF0ZS8je0NsaWVudC5faWR9XCJcblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnQnKSlcblxuICAgIF8uZ2V0IGNhbGwsIG5hbWU6IG5hbWUsIHVzZXJzOiB1c2VycywgcHJvZmlsZTogQ2xpZW50LnByb2ZpbGVcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsICdzdWNjZXNzJ1xuICAgICAgICBpZiBDbGllbnQuX2lkIGlzIGZhbHNlXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIHt9LCAnJywgXCIvY2xpZW50cy8je3Jlc3BvbnNlLmRhdGEuX2lkfVwiXG4gICAgICAgIENsaWVudC5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuICAgICAgICBpZiBDbGllbnQucHJvZmlsZVxuICAgICAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1pbWFnZSA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoJyN7Q2xpZW50LnByb2ZpbGV9JylcIlxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuY2xpZW50JykpXG5cbiAgICBfLmdldCAnL2FwaS9jbGllbnRzLycsXG4gICAgICBfaWQ6IEBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2NsaWVudHMvbmV3JyBpZiByZXNwb25zZS5kYXRhLmxlbmd0aCA8IDFcbiAgICAgIGNsaWVudCA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1uYW1lID4gaW5wdXQnKS52YWwgY2xpZW50Lm5hbWVcbiAgICAgIGlmIGNsaWVudC5wcm9maWxlXG4gICAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1pbWFnZSA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoJyN7Y2xpZW50LnByb2ZpbGV9JylcIlxuICAgICAgICBDbGllbnQucHJvZmlsZSA9IGNsaWVudC5wcm9maWxlXG4gICAgICBmb3IgaW5kZXgsIHVzZXIgb2YgY2xpZW50LnVzZXJzXG4gICAgICAgIGlmIHVzZXIuaWQgaXNudCBVc2VyLl9pZFxuICAgICAgICAgIENsaWVudC5zZWxlY3RVc2VyWzBdLnNlbGVjdGl6ZS5hZGRPcHRpb24gaWQ6IHVzZXIuaWQsIG5hbWU6IFwiI3t1c2VyLm5hbWV9ICgje3VzZXIuZW1haWx9KVwiXG4gICAgICAgICAgQ2xpZW50LnNlbGVjdFVzZXJbMF0uc2VsZWN0aXplLmFkZEl0ZW0gdXNlci5pZFxuXG5cbiAgZGF0YVVSSXRvQmxvYjogKGRhdGFVUkkpIC0+XG4gICAgYnl0ZVN0cmluZyA9IHVuZGVmaW5lZFxuICAgIGlmIGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwXG4gICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pXG4gICAgZWxzZVxuICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSlcbiAgICAjIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXVxuICAgICMgd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpXG4gICAgaSA9IDBcbiAgICB3aGlsZSBpIDwgYnl0ZVN0cmluZy5sZW5ndGhcbiAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpXG4gICAgICBpKytcbiAgICBuZXcgQmxvYihbIGlhIF0sIHR5cGU6IG1pbWVTdHJpbmcpXG4gICAgICAgIFxuICBpbWFnZVVwbG9hZDogKGJsb2IsIGNhbGxiYWNrKSAtPlxuXG4gICAgZmQgPSBuZXcgRm9ybURhdGEoKVxuICAgIGZkLmFwcGVuZCAnZmlsZScsIGJsb2JcblxuICAgIF8ucG9zdFxuICAgICAgeGhyOiAtPlxuICAgICAgICB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyICdwcm9ncmVzcycsIChlKSAtPlxuICAgICAgICAgIGNvbXBsZXRlID0gZS5sb2FkZWQgLyBlLnRvdGFsXG4gICAgICAgICAgaWYgY29tcGxldGUgPCAxIHRoZW4gTm90aWNlLmkgJ1VwbG9hZGluZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICAgaWYgY29tcGxldGUgaXMgMSB0aGVuIE5vdGljZS5pICdQcm9jZXNzaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgLCBmYWxzZVxuICAgICAgICByZXR1cm4geGhyXG5cbiAgICAgIHVybDogJy9hcGkvdXBsb2FkJ1xuICAgICAgZGF0YTogZmRcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgY29udGVudFR5cGU6IGZhbHNlXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICAgIGVycm9yOiAtPlxuICAgICAgICBOb3RpY2UuZCgpXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSAtPlxuICAgICAgICBOb3RpY2UuaSAnRmlsZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgQ2xpZW50LnByb2ZpbGUgPSByZXN1bHQuZGF0YS51cmxcbiAgICAgICAgY2FsbGJhY2socmVzdWx0KVxuXG5cbiIsIkNsaWVudHMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnY2xpZW50cycsIENsaWVudHMuYWN0aW9uXG5cbiAgYWN0aW9uOiAodHlwZSkgLT5cblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdDbGllbnQgSW52aXRlJ1xuICAgICAgICBpZiBMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aCA+IDFcbiAgICAgICAgICBOb3RpY2UuaSAnUGxlYXNlIGNob29zZSBhIHNpbmdsZSBjbGllbnQgZm9yIGFuIGludml0ZSBsaW5rJywgdHlwZTogJ3dhcm5pbmcnXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIENsaWVudHMuZ2V0SW52aXRlKExpc3Rpbmcuc2VsZWN0ZWRbMF0pXG5cbiAgZ2V0SW52aXRlOiAoY2xpZW50KSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudHMnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2ludml0ZS9hZGQnLCBjbGllbnQ6IGNsaWVudFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgY29uc29sZS5sb2cgcmVzcG9uc2VcbiAgICAgIFByb21wdC5pKFxuICAgICAgICAnQ2xpZW50IEludml0ZScsXG4gICAgICAgICdTaGFyZSB0aGlzIFVSTCB3aXRoIHlvdXIgY2xpZW50IHRvIGFsbG93IHRoZW0gdG8gbW9kaWZ5IHRoZWlyIG93biBlbnRyaWVzJyxcbiAgICAgICAgWydPSyddLFxuICAgICAgICAgIGNsaXBib2FyZDogdHJ1ZVxuICAgICAgICAgIHZhbHVlOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9pbnZpdGUvJyArIHJlc3BvbnNlLmRhdGEuaW52aXRlLmhhc2gsXG4gICAgICApXG5cblxuXG4iLCJjb25maWcgPSB7XCJ2aWV3XCI6e1wicGF0aHNcIjpbXCIvVXNlcnMvay9iYXNhbC9yZXNvdXJjZXMvdmlld3NcIl0sXCJjb21waWxlZFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvdmlld3NcIn0sXCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwid2hpdGUyXCI6XCIjZjhmOGY4XCIsXCJ3aGl0ZTNcIjpcIiNGNEY0RjRcIixcImdyZXkxXCI6XCIjZTVlNWU1XCIsXCJncmV5MlwiOlwiI2Y1ZjVmNVwiLFwiZ3JleTNcIjpcIiNkMGQwZDBcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiYmxhY2syXCI6XCIjMjgyODI4XCIsXCJibGFjazNcIjpcIiMzMzMzMzNcIixcInJlZDFcIjpcIiNDODIxMkJcIixcImN5YW4xXCI6XCIjNUZBNzkzXCIsXCJ5ZWxsb3cxXCI6XCIjRjZCQjQ1XCIsXCJvcmFuZ2UxXCI6XCIjRjY4RjYyXCIsXCJza2luMVwiOlwiI0YzRERBM1wiLFwiZ3JlZW4xXCI6XCIjNWJhNTQxXCIsXCJncmVlbjJcIjpcIiM4OGQ5NmRcIixcImdyZWVuM1wiOlwiIzc3ZDM1OFwiLFwiYmx1ZTFcIjpcIiMxZGE3ZWVcIixcImJsdWUyXCI6XCIjMDA3M2JiXCIsXCJnb29nbGVfYmx1ZVwiOlwiIzQyODVmNFwiLFwiZ29vZ2xlX2dyZWVuXCI6XCIjMzRhODUzXCIsXCJnb29nbGVfeWVsbG93XCI6XCIjZmJiYzA1XCIsXCJnb29nbGVfcmVkXCI6XCIjZWE0MzM1XCIsXCJnaXRodWJfYmx1ZVwiOlwiIzBEMjYzNlwiLFwiZmFjZWJvb2tfYmx1ZVwiOlwiIzQ4NjdBQVwiLFwiaW5zdGFncmFtX29yXCI6XCIjRkY3ODA0XCIsXCJ0d2l0dGVyX2JsdWVcIjpcIiMwMEFDRURcIn0sXCJmb250XCI6e1wiNDA0XCI6e1wiZm9udC1mYW1pbHlcIjpcIk1vbm90b25cIixcImZvbnQtc2l6ZVwiOlwiNzVweFwifSxcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJoMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwifSxcImgzYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImMxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNnB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9LFwiYzF0YlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjQwMFwifSxcImMxc2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI2MDBcIixcImxldHRlci1zcGFjaW5nXCI6XCIxcHhcIn0sXCJjMlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMyYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifX0sXCJtZXRhXCI6e1widGl0bGVcIjpcImJhc2FsXCIsXCJ1cmxcIjpcImh0dHA6Ly9iYXNhbC5kZXYvXCIsXCJkZXNjcmlwdGlvblwiOlwibWluaW1hbCBjb250ZW50IG1hbmFnZW1lbnRcIixcImtleXdvcmRzXCI6XCJjbXNcIixcInJlcG9cIjpcImh0dHBzOi8vZ2l0aHViLmNvbS9hY2lkamF6ei9iYXNhbFwifSxcImRlYnVnYmFyXCI6e1wiZW5hYmxlZFwiOm51bGwsXCJzdG9yYWdlXCI6e1wiZW5hYmxlZFwiOnRydWUsXCJkcml2ZXJcIjpcImZpbGVcIixcInBhdGhcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZGVidWdiYXJcIixcImNvbm5lY3Rpb25cIjpudWxsLFwicHJvdmlkZXJcIjpcIlwifSxcImluY2x1ZGVfdmVuZG9yc1wiOnRydWUsXCJjYXB0dXJlX2FqYXhcIjp0cnVlLFwiY2xvY2t3b3JrXCI6ZmFsc2UsXCJjb2xsZWN0b3JzXCI6e1wicGhwaW5mb1wiOnRydWUsXCJtZXNzYWdlc1wiOnRydWUsXCJ0aW1lXCI6dHJ1ZSxcIm1lbW9yeVwiOnRydWUsXCJleGNlcHRpb25zXCI6dHJ1ZSxcImxvZ1wiOnRydWUsXCJkYlwiOnRydWUsXCJ2aWV3c1wiOnRydWUsXCJyb3V0ZVwiOnRydWUsXCJsYXJhdmVsXCI6ZmFsc2UsXCJldmVudHNcIjpmYWxzZSxcImRlZmF1bHRfcmVxdWVzdFwiOmZhbHNlLFwic3ltZm9ueV9yZXF1ZXN0XCI6dHJ1ZSxcIm1haWxcIjp0cnVlLFwibG9nc1wiOmZhbHNlLFwiZmlsZXNcIjpmYWxzZSxcImNvbmZpZ1wiOmZhbHNlLFwiYXV0aFwiOmZhbHNlLFwiZ2F0ZVwiOmZhbHNlLFwic2Vzc2lvblwiOnRydWV9LFwib3B0aW9uc1wiOntcImF1dGhcIjp7XCJzaG93X25hbWVcIjpmYWxzZX0sXCJkYlwiOntcIndpdGhfcGFyYW1zXCI6dHJ1ZSxcInRpbWVsaW5lXCI6ZmFsc2UsXCJiYWNrdHJhY2VcIjpmYWxzZSxcImV4cGxhaW5cIjp7XCJlbmFibGVkXCI6ZmFsc2UsXCJ0eXBlc1wiOltcIlNFTEVDVFwiXX0sXCJoaW50c1wiOnRydWV9LFwibWFpbFwiOntcImZ1bGxfbG9nXCI6ZmFsc2V9LFwidmlld3NcIjp7XCJkYXRhXCI6ZmFsc2V9LFwicm91dGVcIjp7XCJsYWJlbFwiOnRydWV9LFwibG9nc1wiOntcImZpbGVcIjpudWxsfX0sXCJpbmplY3RcIjp0cnVlLFwicm91dGVfcHJlZml4XCI6XCJfZGVidWdiYXJcIn0sXCJhcHBcIjp7XCJlZGl0b3JcIjpcIm1hY3ZpbVwifSxcImNhY2hlXCI6e1wiZGVmYXVsdFwiOlwiYXJyYXlcIixcInN0b3Jlc1wiOntcImFwY1wiOntcImRyaXZlclwiOlwiYXBjXCJ9LFwiYXJyYXlcIjp7XCJkcml2ZXJcIjpcImFycmF5XCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiY2FjaGVcIixcImNvbm5lY3Rpb25cIjpudWxsfSxcImZpbGVcIjp7XCJkcml2ZXJcIjpcImZpbGVcIixcInBhdGhcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL2NhY2hlXCJ9LFwibWVtY2FjaGVkXCI6e1wiZHJpdmVyXCI6XCJtZW1jYWNoZWRcIixcInNlcnZlcnNcIjpbe1wiaG9zdFwiOlwiMTI3LjAuMC4xXCIsXCJwb3J0XCI6MTEyMTEsXCJ3ZWlnaHRcIjoxMDB9XX0sXCJyZWRpc1wiOntcImRyaXZlclwiOlwicmVkaXNcIixcImNvbm5lY3Rpb25cIjpcImRlZmF1bHRcIn19LFwicHJlZml4XCI6XCJsYXJhdmVsXCJ9LFwicXVldWVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwiY29ubmVjdGlvbnNcIjp7XCJzeW5jXCI6e1wiZHJpdmVyXCI6XCJzeW5jXCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiam9ic1wiLFwicXVldWVcIjpcImRlZmF1bHRcIixcImV4cGlyZVwiOjYwfSxcImJlYW5zdGFsa2RcIjp7XCJkcml2ZXJcIjpcImJlYW5zdGFsa2RcIixcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInR0clwiOjYwfSxcInNxc1wiOntcImRyaXZlclwiOlwic3FzXCIsXCJrZXlcIjpcInlvdXItcHVibGljLWtleVwiLFwic2VjcmV0XCI6XCJ5b3VyLXNlY3JldC1rZXlcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLXVybFwiLFwicmVnaW9uXCI6XCJ1cy1lYXN0LTFcIn0sXCJpcm9uXCI6e1wiZHJpdmVyXCI6XCJpcm9uXCIsXCJob3N0XCI6XCJtcS1hd3MtdXMtZWFzdC0xLmlyb24uaW9cIixcInRva2VuXCI6XCJ5b3VyLXRva2VuXCIsXCJwcm9qZWN0XCI6XCJ5b3VyLXByb2plY3QtaWRcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLW5hbWVcIixcImVuY3J5cHRcIjp0cnVlfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcImV4cGlyZVwiOjYwfX0sXCJmYWlsZWRcIjp7XCJkYXRhYmFzZVwiOlwibW9uZ29kYlwiLFwidGFibGVcIjpcImZhaWxlZF9qb2JzXCJ9fX07IiwiRGFzaGJvYXJkID1cblxuICBkYXRhOnt9XG5cbiAgaTogLT5cbiAgICBAZ2V0ZGF0YSA9PlxuICAgICAgQHBvcHVsYXRlKClcblxuICBwb3B1bGF0ZTogLT5cbiAgICAkKCcuZGFzaGJvYXJkIC52YWx1ZScpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgJChlbCkuaHRtbCBAZG90c3RvdmFsdWUgJChlbCkuZGF0YSAndmFsdWUnXG5cbiAgZ2V0ZGF0YTogKGNvbXBsZXRlKSAtPlxuXG4gICAgZ2V0cyA9IFsndXNlcnMnLCdjbGllbnRzJywgJ3N0cnVjdHVyZXMnLCAnZW50cmllcyddXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmRhc2hib2FyZCcpKVxuXG4gICAgJChnZXRzKS5lYWNoIChpbmRleCwgZ2V0KSA9PlxuICAgICAgXy5nZXQgXCIvYXBpLyN7Z2V0fVwiXG4gICAgICAgIC5kb25lIChyZXNwb25zZSkgPT5cbiAgICAgICAgICBAZGF0YVtnZXRdID0gcmVzcG9uc2VcbiAgICAgICAgICBpZiBPYmplY3Qua2V5cyhAZGF0YSkubGVuZ3RoID09IGdldHMubGVuZ3RoXG4gICAgICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICAgICAgY29tcGxldGUoKVxuXG4gIGRvdHN0b3ZhbHVlOiAoZG90cykgLT5cbiAgICByZXN1bHQgPSBAZGF0YVxuICAgIGZvciBkaW0gaW4gZG90cy5zcGxpdCAnLidcbiAgICAgIHJlc3VsdCA9IHJlc3VsdFtkaW1dXG5cbiAgICByZXR1cm4gcmVzdWx0XG5cbiIsIkVudGl0aWVzID1cblxuICBibG9nczogW11cbiAgY3JvcHM6IHt9XG4gIGltYWdlczoge31cblxuICBwbGFjZWhvbGRlcnM6IFtcbiAgICBcIlRoYXQncyB3aGF0IEknbSBibG9nZ2luZyBhYm91dFwiXG4gICAgXCJIYXZlIHlvdSBndXlzIGJlZW4gYmxvZ2dpbmc/XCJcbiAgICBcIkhvbGQgYWxsIG15IGNhbGxzLCBJJ20gYmxvZ2dpbmdcIlxuICAgIFwiVGVsbCBEb25uaWUgSSdtIGJsb2dnaW5nIGFuZCBJJ2xsIGNhbGwgaGltIGJhY2tcIlxuICAgIFwiSSBnb3R0YSBydW4sIHlvdSBzaG91bGQgYmUgYmxvZ2dpbmdcIlxuICAgIFwiSSB3YW50IHlvdSBvbiB0aGUgcGhvbmUsIGJ1dCBJIGFsc28gd2FudCB5b3UgYmxvZ2dpbmdcIlxuICBdXG5cbiAgQmxvZzogKGVsLCBuYW1lLCB2YWx1ZT1mYWxzZSkgLT5cblxuICAgIGVkaXRvciA9IGVsLmZpbmQoJy5ibG9nJykuc3VtbWVybm90ZVxuICAgICAgcGxhY2Vob2xkZXI6IEBwbGFjZWhvbGRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQHBsYWNlaG9sZGVycy5sZW5ndGgpXVxuICAgICAgY2FsbGJhY2tzOlxuICAgICAgICBvbkltYWdlVXBsb2FkOiAoZmlsZXMpIC0+XG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VVcGxvYWQgZmlsZXMsIHRoaXNcblxuICAgIGVsLmZpbmQoJy5ibG9nJykuc3VtbWVybm90ZSgnY29kZScsIHZhbHVlKSBpZiB2YWx1ZSBpc250IGZhbHNlXG5cbiAgICBAYmxvZ3MucHVzaCBuYW1lOiBuYW1lLCBlZGl0b3I6IGVkaXRvciwgZWw6IGVsLmZpbmQoJy5ibG9nJylcblxuICBibG9nR2V0Q29kZTogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICByZXR1cm4gYmxvZy5lbC5zdW1tZXJub3RlKCdjb2RlJykgaWYgYmxvZy5uYW1lIGlzIG5hbWVcbiBcbiAgYmxvZ0ZvY3VzOiAobmFtZSkgLT5cbiAgICBmb3IgYmxvZyBpbiBAYmxvZ3NcbiAgICAgIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gICAgICAgICQoJy5ub3RlLWVkaXRhYmxlJykuZm9jdXMoKVxuXG4gIGltYWdlVXBsb2FkOiAoZmlsZXMsIGVsKSAtPlxuXG4gICAgZmQgPSBuZXcgRm9ybURhdGEoKVxuICAgIGZkLmFwcGVuZCAnZmlsZScsIGZpbGVzWzBdXG5cbiAgICBfLnBvc3RcbiAgICAgIHhocjogLT5cbiAgICAgICAgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lciAncHJvZ3Jlc3MnLCAoZSkgLT5cbiAgICAgICAgICBjb21wbGV0ZSA9IGUubG9hZGVkIC8gZS50b3RhbFxuICAgICAgICAgIGlmIGNvbXBsZXRlIDwgMSB0aGVuIE5vdGljZS5pICdVcGxvYWRpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAgIGlmIGNvbXBsZXRlIGlzIDEgdGhlbiBOb3RpY2UuaSAnUHJvY2Vzc2luZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICwgZmFsc2VcbiAgICAgICAgcmV0dXJuIHhoclxuXG4gICAgICB1cmw6ICcvYXBpL3VwbG9hZCdcbiAgICAgIGRhdGE6IGZkXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZVxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgICBlcnJvcjogLT5cbiAgICAgICAgTm90aWNlLmQoKVxuICAgICAgc3VjY2VzczogKHJlc3VsdCkgLT5cbiAgICAgICAgJChlbCkuc3VtbWVybm90ZSgnZWRpdG9yLmluc2VydEltYWdlJywgcmVzdWx0LmRhdGEudXJsKVxuICAgICAgICBOb3RpY2UuaSAnRmlsZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcblxuICBUYWdzOiAoZWwsIG5hbWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5zZWxlY3RpemVcbiAgICAgIHBsdWdpbnM6IFsncmVzdG9yZV9vbl9iYWNrc3BhY2UnLCdyZW1vdmVfYnV0dG9uJ11cbiAgICAgIGRlbGltaXRlcjogJywnXG4gICAgICBwZXJzaXN0OiBmYWxzZVxuICAgICAgY3JlYXRlOiAoaW5wdXQpIC0+XG4gICAgICAgIHZhbHVlOiBpbnB1dFxuICAgICAgICB0ZXh0OiBpbnB1dFxuXG4gIERhdGU6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSdcblxuICBEYXRlVGltZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLmZsYXRwaWNrclxuICAgICAgZGF0ZUZvcm1hdDogJ20vZC9ZIGg6aSBLJ1xuICAgICAgZW5hYmxlVGltZTogdHJ1ZVxuXG4gIERhdGVSYW5nZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cbiAgICBlbC5maW5kKCdpbnB1dCcpLmZsYXRwaWNrclxuICAgICAgZGF0ZUZvcm1hdDogJ20vZC9ZJ1xuICAgICAgbW9kZTogJ3JhbmdlJ1xuXG4gIERhdGVUaW1lUmFuZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSBoOmkgSydcbiAgICAgIGVuYWJsZVRpbWU6IHRydWVcbiAgICAgIG1vZGU6ICdyYW5nZSdcblxuICBJbWFnZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cblxuICAgIEBpbWFnZUhhbmRsZXJzIGVsXG5cbiAgICAjIHByZWxvYWQgZXhpc3RpbmcgaW1hZ2VzXG4gICAgaWYgdmFsdWUgaXNudCB1bmRlZmluZWRcbiAgICAgIEVudGl0aWVzLmNyb3BwZXIodmFsdWUsIGVsKVxuICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gdmFsdWVcblxuXG4gIGltYWdlSGFuZGxlcnM6IChlbCwgbmFtZSkgLT5cblxuICAgIGVsLm9uICdkcmFnb3ZlcicsIEBpbWFnZUhhbmRsZXIuZHJhZ292ZXJcbiAgICBlbC5vbiAnZHJhZ2xlYXZlJywgQGltYWdlSGFuZGxlci5kcmFnbGVhdmVcbiAgICBlbC5vbiAnZHJhZ2VudGVyIGRyYWdvdmVyJywgQGltYWdlSGFuZGxlci5jYW5jZWxcbiAgICBlbC5vbiAnZHJvcCBkcmFnZHJvcCcsIEBpbWFnZUhhbmRsZXIuZHJvcFxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEuc2VsZWN0Jykub24gJ2NsaWNrJywgQGltYWdlSGFuZGxlci5jaG9vc2VGaWxlXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YS5zYXZlJykub24gJ2NsaWNrJywgQGltYWdlSGFuZGxlci5zYXZlXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gaW5wdXQ6ZmlsZScpLm9uICdjaGFuZ2UnLCBAaW1hZ2VIYW5kbGVyLmNoYW5nZVxuXG4gIGltYWdlSGFuZGxlcjpcblxuICAgIGRyYWdvdmVyOiAtPlxuICAgICAgXy5vbiAkKHRoaXMpLmZpbmQoJy5pbnB1dC1pbWFnZScpXG4gICAgZHJhZ2xlYXZlOiAtPlxuICAgICAgXy5vZmYgJCh0aGlzKS5maW5kKCcuaW5wdXQtaW1hZ2UnKVxuICAgIGNhbmNlbDogLT5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIGRyb3A6IChlKSAtPlxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgXy5vZmYgJCh0aGlzKS5maW5kICcuaW5wdXQtaW1hZ2UnXG5cbiAgICAgIGlmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgYW5kIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoXG4gICAgICAgIGZpbGVzID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgICBFbnRpdGllcy5sb2FkQ3JvcHBlciBmaWxlc1swXSwgJCh0aGlzKVxuXG4gICAgY2hvb3NlRmlsZTogLT5cbiAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXQnKS50cmlnZ2VyICdjbGljaydcblxuICAgIGNoYW5nZTogLT5cbiAgICAgIGlmICQodGhpcylbMF0uZmlsZXNcbiAgICAgICAgZmlsZXMgPSAkKHRoaXMpWzBdLmZpbGVzXG5cbiAgICAgICAgRW50aXRpZXMubG9hZENyb3BwZXIgZmlsZXNbMF0sICQodGhpcykucGFyZW50KCkucGFyZW50KClcblxuICAgIHNhdmU6IC0+XG5cbiAgICAgIG5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEgJ25hbWUnXG4gICAgICBpbmRleCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZGF0YSAnaW5kZXgnXG5cbiAgICAgIFNwaW5uZXIuaSgkKFwiLmVudGl0eV9pbmRleF8je2luZGV4fVwiKSlcblxuICAgICAgRW50aXRpZXMuY3JvcHNbbmFtZV0uZ2V0Q3JvcHBlZENhbnZhcygpLnRvQmxvYiAoYmxvYikgLT5cbiAgICAgICAgQ2xpZW50LmltYWdlVXBsb2FkIGJsb2IsIChyZXN1bHQpIC0+XG4gICAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgICBFbnRpdGllcy5pbWFnZXNbbmFtZV0gPSByZXN1bHQuZGF0YS51cmxcbiAgICAgICwgJ2ltYWdlL2pwZWcnXG5cbiAgbG9hZENyb3BwZXI6IChmaWxlLCBlbCkgLT5cblxuICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcblxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAtPlxuICAgICAgRW50aXRpZXMuY3JvcHBlciByZWFkZXIucmVzdWx0LCBlbFxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMIGZpbGVcblxuICBjcm9wcGVyOiAodXJsLCBlbCkgLT5cblxuICAgIG5hbWUgPSBlbC5kYXRhICduYW1lJ1xuICAgIGluZGV4ID0gZWwuZGF0YSAnaW5kZXgnXG5cbiAgICBjb25zb2xlLmxvZyBuYW1lLCBpbmRleFxuXG4gICAgaWYgRW50aXRpZXMuY3JvcHNbbmFtZV0gaXNudCB1bmRlZmluZWRcbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmRlc3Ryb3koKVxuICAgICAgRW50aXRpZXMuY3JvcHNbbmFtZV0gPSBmYWxzZVxuXG4gICAgZWwuZmluZCgnLmNyb3BwZXInKS5hdHRyICdzcmMnLCB1cmxcblxuICAgIEVudGl0aWVzLmNyb3BzW25hbWVdID0gbmV3IENyb3BwZXIgZWwuZmluZCgnLmNyb3BwZXInKVswXSxcbiAgICAgIG1pbkNvbnRhaW5lckhlaWdodDogMzAwXG4gICAgICBtaW5DYW52YXNIZWlnaHQ6IDMwMFxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZVxuICAgICAgcHJldmlldzogXCJkaXYuZW50aXR5X2luZGV4XyN7aW5kZXh9ID4gZGl2LmlucHV0LWltYWdlID4gZGl2LnBpY3R1cmVcIlxuICAgICAgYXV0b0Nyb3BBcmVhOiAxXG4gICAgICBzdHJpY3Q6IGZhbHNlXG4gICAgICBoaWdobGlnaHQ6IHRydWVcblxuICAgIF8ub24gZWwuZmluZCgnLnNhdmUnKVxuXG5cbiIsIkVudHJpZXMgPVxuXG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICdlbnRyaWVzJ1xuIiwiRW50cnkgPVxuXG4gIHNlbGVjdFN0cnVjdHVyZToge31cblxuICBfaWQ6IGZhbHNlXG4gIHN0cnVjdHVyZTogZmFsc2VcbiAgZW50cnk6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEBzZWxlY3RpemUoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9lbnRyaWVzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcbiAgICBlbHNlXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmZvY3VzKClcbiBcbiAgc2VsZWN0aXplOiAtPlxuXG4gICAgQHNlbGVjdFN0cnVjdHVyZSA9IFNlbGVjdGl6ZS5zdHJ1Y3R1cmVzICQoJy5tb2RpZnkgPiAuc3RydWN0dXJlID4gc2VsZWN0JyksXG4gICAgICBFbnRyeS5zdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLnN1Ym1pdCcpLmNsaWNrIEBzdWJtaXRcblxuICAgICQoJy5mb2N1c21lJykuZm9jdXMgLT5cbiAgICAgICQoJy5ub3RlLWVkaXRhYmxlJykuZm9jdXMoKVxuXG5cbiAgbG9hZDogKF9pZCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeScpKVxuXG4gICAgXy5nZXQgJy9hcGkvZW50cmllcy8nLFxuICAgICAgX2lkOiBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGVudHJ5ID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgRW50cnkuZW50cnkgPSBlbnRyeVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5hZGRPcHRpb24gZW50cnkuc3RydWN0dXJlXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLnNldFZhbHVlIGVudHJ5LnN0cnVjdHVyZS5pZFxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5kaXNhYmxlKClcblxuICBzdWJtaXQ6IC0+XG5cbiAgICBuYW1lID0gJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCgpXG4gICAgZW50aXRpZXMgPSB7fVxuXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmJvZHkgPiAuZW50aXR5JykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBlbnRpdHlfbmFtZSA9ICQoZWwpLmZpbmQoJy5sYWJlbCcpLmh0bWwoKVxuICAgICAgdHlwZSA9ICQoZWwpLmRhdGEgJ3R5cGUnXG5cbiAgICAgIHN3aXRjaCB0eXBlXG4gICAgICAgIHdoZW4gJ1RleHQnLCdEYXRlJywnVGltZScsJ0RhdGVUaW1lJywnRGF0ZVJhbmdlJywnRGF0ZVRpbWVSYW5nZScgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKClcbiAgICAgICAgd2hlbiAnVGFncycgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKCkuc3BsaXQgJywnXG4gICAgICAgIHdoZW4gJ0Jsb2cnXG4gICAgICAgICAgYmxvZyA9IEVudGl0aWVzLmJsb2dHZXRDb2RlIGVudGl0eV9uYW1lXG4gICAgICAgICAgdmFsdWUgPSBibG9nXG4gICAgICAgIHdoZW4gJ0ltYWdlJ1xuICAgICAgICAgIHZhbHVlID0gRW50aXRpZXMuaW1hZ2VzW2VudGl0eV9uYW1lXVxuXG4gICAgICBlbnRpdGllc1tlbnRpdHlfbmFtZV0gPSBuYW1lOiBlbnRpdHlfbmFtZSwgdHlwZTogdHlwZSwgdmFsdWU6IHZhbHVlXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgY29uc29sZS5sb2cgZW50aXRpZXNcblxuICAgICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeScpKVxuXG4gICAgICBjYWxsID0gJy9hcGkvZW50cmllcy9hZGQnXG4gICAgICBpZiBFbnRyeS5faWQgaXNudCBmYWxzZVxuICAgICAgICBjYWxsID0gXCIvYXBpL2VudHJpZXMvdXBkYXRlLyN7RW50cnkuX2lkfVwiXG5cbiAgICAgIF8uZ2V0IGNhbGwsXG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgc3RydWN0dXJlOiBFbnRyeS5zdHJ1Y3R1cmVcbiAgICAgICAgZW50aXRpZXM6IGVudGl0aWVzXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pIHJlc3BvbnNlLmRhdGEuc3RhdHVzLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgaWYgRW50cnkuX2lkIGlzIGZhbHNlXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIHt9LCAnJywgXCIvZW50cmllcy8je3Jlc3BvbnNlLmRhdGEuX2lkfVwiXG4gICAgICAgIEVudHJ5Ll9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG5cbiAgc3RydWN0dXJlU2VsZWN0SGFuZGxlcjogKGUpIC0+XG4gICAgc3RydWN0dXJlX2lkID0gJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpXG4gICAgcmV0dXJuIGZhbHNlIGlmIHN0cnVjdHVyZV9pZC5sZW5ndGggaXNudCAyNFxuICAgIGlmIEVudHJ5LmVudHJ5IGlzbnQgZmFsc2VcbiAgICAgIEVudHJ5LmxvYWRFbnRpdGllcyBFbnRyeS5lbnRyeS5lbnRpdGllcywgRW50cnkuZW50cnkubmFtZVxuICAgIGVsc2VcbiAgICAgIEVudHJ5LmxvYWRTdHJ1Y3R1cmUgc3RydWN0dXJlX2lkXG5cbiAgbG9hZFN0cnVjdHVyZTogKF9pZCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLFxuICAgICAgX2lkOiBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgPT5cbiAgICAgIEVudHJ5LnN0cnVjdHVyZSA9IF9pZFxuICAgICAgQGxvYWRFbnRpdGllcyByZXNwb25zZS5kYXRhWzBdLmVudGl0aWVzXG5cbiAgbG9hZEVudGl0aWVzOiAoZW50aXRpZXMsIG5hbWU9ZmFsc2UpIC0+XG5cbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSdcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsKG5hbWUpIGlmIG5hbWUgaXNudCBmYWxzZVxuXG4gICAgYm9keSA9ICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5JylcbiAgICBib2R5Lmh0bWwgJydcblxuICAgIHRhYmluZGV4ID0gM1xuICAgIGluZGV4ID0gMFxuXG4gICAgZm9yIGksIGVudGl0eSBvZiBlbnRpdGllc1xuXG4gICAgICBodG1sID0gJChcIi5wYWdlLmVudHJ5ID4gI3RlbXBsYXRlID4gLmVudGl0eV8je2VudGl0eS50eXBlfVwiKS5jbG9uZSgpXG4gICAgICBodG1sLmFkZENsYXNzIFwiZW50aXR5X2luZGV4XyN7KytpbmRleH1cIlxuICAgICAgaHRtbC5kYXRhIFwiaW5kZXhcIiwgaW5kZXhcbiAgICAgIGh0bWwuZGF0YSBcIm5hbWVcIiwgZW50aXR5Lm5hbWVcblxuICAgICAgaWYgZW50aXR5LnZhbHVlXG4gICAgICAgIHN3aXRjaCBlbnRpdHkudHlwZVxuICAgICAgICAgIHdoZW4gJ1RleHQnLCdEYXRlJywnVGltZScsJ0RhdGVUaW1lJywnRGF0ZVJhbmdlJywnRGF0ZVRpbWVSYW5nZScgdGhlbiBodG1sLmZpbmQoJ2lucHV0JykudmFsIGVudGl0eS52YWx1ZVxuXG4gICAgICBodG1sLmZpbmQoJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYScpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXgrK1xuICAgICAgYm9keS5hcHBlbmQgaHRtbFxuXG4gICAgICBlbnRpdHlFbCA9ICQoXCIucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keSAuZW50aXR5X2luZGV4XyN7aW5kZXh9XCIpXG4gICAgICBlbnRpdHlFbC5maW5kKCcubGFiZWwnKS5odG1sIGVudGl0eS5uYW1lXG5cbiAgICAgIGlmIEVudGl0aWVzW2VudGl0eS50eXBlXSBpc250IHVuZGVmaW5lZFxuICAgICAgICBFbnRpdGllc1tlbnRpdHkudHlwZV0oZW50aXR5RWwsIGVudGl0eS5uYW1lLCBlbnRpdHkudmFsdWUpXG5cbiAgICAkKCdbdGFiaW5kZXg9Ml0nKS5mb2N1cygpXG4gICAgXy5vbiAnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLnN1Ym1pdCdcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0JykuYXR0ciAndGFiaW5kZXgnLCB0YWJpbmRleFxuIiwiR2xvYmFsID1cblxuICAjIGtldmluIG9sc29uIChrZXZpbkAyNTYuaW8pIPCfjIDwn463XG5cbiAgd2luZG93OiBmYWxzZVxuICB3aW5kb3dUaW1lcjogZmFsc2VcbiAgaW5pdDogZmFsc2VcblxuICBpOiAtPlxuICAgIEdsb2JhbC5oYW5kbGVycygpXG4gICAgR2xvYmFsLmxvZ2luQ2hlY2soKVxuXG4gICAgXy5vbiBcIi5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uXyN7UGFnZX1cIiBpZiBQYWdlP1xuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnKS5jbGljayBHbG9iYWwudXNlclByb2ZpbGVIYW5kbGVyXG4gICAgJCgnLm9hdXRocyA+IC5vYXV0aCcpLmNsaWNrIEdsb2JhbC51c2VyT2F1dGhIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiAubG9nb3V0JykuY2xpY2sgR2xvYmFsLmxvZ291dEhhbmRsZXJcbiAgICAkKCcubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbicpLmNsaWNrIEdsb2JhbC5tZW51SGFuZGxlclxuXG4gIG1lbnVIYW5kbGVyOiAtPlxuICAgIF8ub2ZmICQoJy5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uJylcbiAgICBzZWxlY3RlZCA9ICQodGhpcykuZmluZCgnLmxhYmVsJykuaHRtbCgpXG4gICAgXy5vbiAkKFwiLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb24ub3B0aW9uXyN7c2VsZWN0ZWR9XCIpXG5cbiAgbG9nb3V0SGFuZGxlcjogLT5cblxuICAgIFByb21wdC5pICdMb2dvdXQnLCAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICByZXR1cm4gZmFsc2UgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuXG4gICAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgICAgTWUubG9nb3V0IC0+XG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnBpY3R1cmUnXG4gICAgICAgIE5vdGljZS5pICdMb2dvdXQgU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuICAgICAgICAsIDEyMDBcblxuICB1c2VyUHJvZmlsZUhhbmRsZXI6IC0+XG5cbiAgICBvYSA9ICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5vYXV0aHMnKVxuICAgIHRsID0gbmV3IFRpbWVsaW5lTWF4IHJlcGVhdDogMFxuXG4gICAgaWYgb2EuaGFzQ2xhc3MgJ29mZidcbiAgICAgIF8ub24gb2FcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI2NhbmNlbFNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICBlbHNlXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNwcm9maWxlU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgICAgXy5vZmYgb2EsIG9mZmluZzogMC41XG5cbiAgdXNlck9hdXRoSGFuZGxlcjogLT5cblxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICByZXR1cm4gdHJ1ZSBpZiB0eXBlIGlzICdjYW5jZWwnXG5cbiAgICBHbG9iYWwub2F1dGhXaW5kb3cgJy9sb2FkaW5nJ1xuXG4gICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICBwYXJhbXMgPSB7fVxuICAgIHBhcmFtcy5pbnZpdGUgPSBJbnZpdGUuaGFzaCBpZiBJbnZpdGUuaGFzaFxuXG4gICAgTWUub2F1dGggdHlwZSwgcGFyYW1zLCAodXJpKSAtPlxuICAgICAgR2xvYmFsLndpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJpXG5cbiAgb2F1dGhXaW5kb3c6ICh1cmwpIC0+XG4gICAgdyA9IDY0MFxuICAgIGggPSA1NTBcbiAgICBsZWZ0ID0gKHNjcmVlbi53aWR0aC8yKSAtICh3LzIpXG4gICAgdG9wID0gKHNjcmVlbi5oZWlnaHQvMikgLSAoaC8yKVxuXG5cbiAgICBHbG9iYWwud2luZG93ID0gd2luZG93Lm9wZW4odXJsLCAnTG9naW4gLyBSZWdpc3RlcicsIFwidG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPSN7d30saGVpZ2h0PSN7aH0sdG9wPSN7dG9wfSxsZWZ0PSN7bGVmdH1cIilcbiAgICBHbG9iYWwud2luZG93LmZvY3VzIGlmIHdpbmRvdy5mb2N1c1xuICAgIEdsb2JhbC53aW5kb3dUaW1lciA9IHNldEludGVydmFsIC0+XG4gICAgICBpZiBHbG9iYWwud2luZG93LmNsb3NlZFxuICAgICAgICBjbGVhckludGVydmFsIEdsb2JhbC53aW5kb3dUaW1lclxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBjb25zb2xlLmxvZyAnY2xvc2luZyBvdXIgc2hpdGUnXG4gICAgLCA1MFxuXG4gICAgcmV0dXJuXG5cbiAgb2F1dGhDb21wbGV0ZTogKHVzZXIpIC0+XG4gICAgU3Bpbm5lci5kKClcbiAgICBHbG9iYWwubG9naW4gdXNlclxuICAgIE5vdGljZS5pICdMb2dpbiBTdWNjZXNzZnVsJywgJ3N1Y2Nlc3MnXG4gICAgaWYgVXNlci5jbGllbnQgaXNudCB1bmRlZmluZWRcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZW50cmllcydcbiAgICAgIDIwMDBcbiAgICBlbHNlXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Rhc2hib2FyZCdcbiAgICAgIDIwMDBcblxuICBsb2dpbjogKHVzZXIpIC0+XG5cbiAgICB3aW5kb3cuVXNlciA9IHVzZXJcblxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5waWN0dXJlID4gLmltYWdlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tVc2VyLnBpY3R1cmV9KVwiXG4gICAgXy5vZmYgJy5tZSA+IC5wcm9maWxlJ1xuICAgIF8ub2ZmICcubWUgPiAub2F1dGhzJ1xuICAgIF8ub24gJy5tZSA+IC5waWN0dXJlJ1xuXG4gICAgaWYgVXNlci5jbGllbnQgaXNudCB1bmRlZmluZWRcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5jbGllbnQgPiAubmFtZScpLmh0bWwgVXNlci5jbGllbnQubmFtZVxuICAgICAgJCgnaGVhZGVyID4gLmlubmVyID4gLmNsaWVudCA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tVc2VyLmNsaWVudC5wcm9maWxlfSlcIlxuICAgICAgXy5vZmYgJ2hlYWRlciA+IC5pbm5lciA+IC5sb2dvJ1xuICAgICAgXy5vZmYgJ2hlYWRlciA+IC5pbm5lciA+IC5uYW1lJ1xuXG4gIGxvZ2luQ2hlY2s6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnaGVhZGVyJykpXG5cbiAgICBNZS5hdXRoZWQgKHJlc3VsdCkgLT5cbiAgICAgIEdsb2JhbC5sb2dpbihyZXN1bHQpIGlmIHJlc3VsdCBpc250IGZhbHNlXG4gICAgICBpZiBHbG9iYWwuaW5pdCBpc250IGZhbHNlXG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgIHdpbmRvd1tHbG9iYWwuaW5pdF0uaSgpXG4gICAgICBlbHNlXG4gICAgICAgIFNwaW5uZXIuZCgpXG5cbiAgICAgICMgdHVybiBvbiBhbGwgbG9naW4gLyByZWdpc3RyYXRpb24gZGl2c1xuICAgICAgaWYgd2luZG93LlVzZXIgaXMgdW5kZWZpbmVkXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5wcm9maWxlJ1xuICAgICAgICBfLm9uICcuaG9tZSA+IC5vYXV0aHMnXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+LmxvZ28nXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5uYW1lJ1xuXG4gICAgICAjIGNsaWVudCBiYXNlZCB1c2VyLCBnbyB0byBlbnRyaWVzXG4gICAgICBpZiBVc2VyPy5jbGllbnQgaXNudCB1bmRlZmluZWQgYW5kIFBhZ2UgaXNudCAnZW50cmllcydcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZW50cmllcydcblxuICAgICAgaWYgd2luZG93LlVzZXIgaXNudCB1bmRlZmluZWQgYW5kIFVzZXIuY2xpZW50IGlzIHVuZGVmaW5lZFxuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPi5sb2dvJ1xuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcbiAgICAgICAgXy5vbiAnLm1lbnUnXG4iLCJfLmNvbnN0cnVjdG9yKClcblxuY2xhc3MgSW5kZXhcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAbW9iaWxlXG5cbiAgbW9iaWxlOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG4iLCJJbnZpdGUgPVxuICBoYXNoOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuaW52aXRlJykpXG5cbiAgICBpZiBVc2VyPyBpc250IGZhbHNlXG4gICAgICBTcGlubmVyLmQoKVxuICAgICAgUHJvbXB0LmkgJ0ludml0ZSBFcm9ycicsICdZb3UgYXJlIGN1cnJlbnRseSBsb2dnZWQgaW4nLCBbJ09LJ10sIHt9LCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG5cbiAgICBlbHNlXG4gICAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9pbnZpdGVcXC8oWzAtOWEtZkEtRl17OH0pL1xuICAgICAgICBAaGFzaCA9IG1hdGNoWzFdXG4gICAgICAgIEBsb2FkIEBoYXNoXG4gICAgICBlbHNlXG5cbiAgbG9hZDogKGhhc2gpIC0+XG5cbiAgICBfLmdldCAnL2FwaS9pbnZpdGUvZ2V0JyxcbiAgICAgIGhhc2g6IGhhc2hcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXN1bHQpIC0+XG4gICAgICBpbnZpdGUgPSByZXN1bHQuZGF0YS5pbnZpdGVcblxuICAgICAgJCgnLnBhZ2UuaW52aXRlID4gLnByb2ZpbGUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLFwidXJsKCN7aW52aXRlLmNsaWVudC5wcm9maWxlfSlcIlxuICAgICAgJCgnLnBhZ2UuaW52aXRlID4gLnRpdGxlJykuaHRtbCBpbnZpdGUuY2xpZW50Lm5hbWVcbiIsIkxpc3RpbmcgPVxuICBjb250ZW50OiBmYWxzZVxuICBzZWxlY3RlZDogW11cbiAgc2VsZWN0ZWRDdXJzb3I6IDBcblxuICBvdGhlckFjdGlvbnM6IGZhbHNlXG5cblxuICBpOiAoY29udGVudCwgb3RoZXJBY3Rpb25zPWZhbHNlKSAtPlxuICAgIEBjb250ZW50ID0gY29udGVudFxuICAgIEBvdGhlckFjdGlvbnMgPSBvdGhlckFjdGlvbnNcbiAgICBAbG9hZCgpXG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5jaGVja2JveCcsIEBjaGVja2JveEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NoYW5nZScsICcubGlzdC1oZWFkZXIgPiAuY2hlY2tib3ggPiBpbnB1dCcsIEBzZWxlY3RBbGxIYW5kbGVyXG4gICAgJChcIi5saXN0aW5nLiN7QGNvbnRlbnR9XCIpLm9uICdjaGFuZ2UnLCAnLmNoZWNrYm94ID4gaW5wdXQnLCBAc3RhdGVIYW5kbGVyXG5cbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uJywgQGFjdGlvbkhhbmRsZXJcblxuICBjaGVja2JveEhhbmRsZXI6IC0+XG4gICAgY2IgPSAkKHRoaXMpLmZpbmQgJ2lucHV0J1xuICAgIGlmIGV2ZW50LnRhcmdldC50eXBlIGlzbnQgJ2NoZWNrYm94J1xuICAgICAgY2JbMF0uY2hlY2tlZCA9ICFjYlswXS5jaGVja2VkXG4gICAgICBjYi5jaGFuZ2UoKVxuXG4gIHNlbGVjdEFsbEhhbmRsZXI6IC0+XG4gICAgaWYgdGhpcy5jaGVja2VkXG4gICAgICAkKCcubGlzdGluZyA+IC5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXQnKS5wcm9wICdjaGVja2VkJywgdHJ1ZVxuICAgIGVsc2VcbiAgICAgICQoJy5saXN0aW5nID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuXG4gIHN0YXRlSGFuZGxlcjogLT5cbiAgICBpZHMgPSBbXVxuXG4gICAgJCgnLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgaWYgZWwuY2hlY2tlZFxuICAgICAgICBpZHMucHVzaCAkKGVsKS5kYXRhICdfaWQnXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cbiAgICAgIGlmIGlkcy5sZW5ndGggPiAwXG4gICAgICAgICQoJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuY29weSA+IC52YWx1ZScpLnRleHQgaWRzLmxlbmd0aFxuICAgICAgICBfLm9mZiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMnXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMnXG4gICAgICBlbHNlXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzJ1xuICAgICAgICBfLm9mZiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucydcbiAgICAgIExpc3Rpbmcuc2VsZWN0ZWQgPSBpZHNcblxuICBhY3Rpb25IYW5kbGVyOiAtPlxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICBzd2l0Y2ggdHlwZVxuICAgICAgd2hlbiAnZGVsZXRlJ1xuICAgICAgICBQcm9tcHQuaSBcIkRlbGV0aW5nICN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IGl0ZW1zKHMpXCIsXG4gICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlc2U/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiByZXNwb25zZSBpc250ICdZZXMnXG4gICAgICAgICAgICBMaXN0aW5nLmRlbGV0ZVNlbGVjdGVkKClcbiAgICAgIGVsc2VcbiAgICAgICAgTGlzdGluZy5vdGhlckFjdGlvbnModHlwZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gIGRlbGV0ZTogKGlkLCBjYWxsYmFjaykgLT5cblxuICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuICAgIF8uZ2V0IFwiL2FwaS8je0xpc3RpbmcuY29udGVudH0vZGVsZXRlLyN7aWR9XCJcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGNhbGxiYWNrIHRydWVcbiAgICAuZmFpbCAtPlxuICAgICAgY2FsbGJhY2sgZmFsc2VcblxuICBkZWxldGVTZWxlY3RlZDogKGN1cnNvcj0wKSAtPlxuXG4gICAgaWYgTGlzdGluZy5zZWxlY3RlZC5sZW5ndGggaXMgY3Vyc29yXG4gICAgICBOb3RpY2UuaSAnU3RydWN0dXJlKHMpIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICBAbG9hZCgpXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgTGlzdGluZy5kZWxldGUgTGlzdGluZy5zZWxlY3RlZFtjdXJzb3JdLCAocmVzdWx0KSAtPlxuICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCArK2N1cnNvciBpZiByZXN1bHQgaXMgdHJ1ZVxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJChcIi5wYWdlLiN7TGlzdGluZy5jb250ZW50fVwiKSlcblxuICAgIF8uZ2V0IFwiL2FwaS8je0Bjb250ZW50fVwiLCB2aWV3OiB0cnVlXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgVGltZS5pKClcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAkKCcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cyA+IC5jb3B5ID4gLnZhbHVlJykudGV4dCByZXNwb25zZS5kYXRhLmxlbmd0aFxuICAgICAgJChcIi4je0Bjb250ZW50fSA+IC5jb250ZW50ID4gLmxpc3RpbmcgPiAuaXRlbXNcIikuaHRtbCByZXNwb25zZS52aWV3XG4iLG51bGwsIk1lID1cblxuICBsb2dvdXQ6IChjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2F1dGgvbG9nb3V0J1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZSgpXG5cbiAgb2F1dGg6ICh0eXBlLCBwYXJhbXM9e30sIGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgXCIvYXBpL2F1dGgvI3t0eXBlfVwiLCBwYXJhbXNcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgY29tcGxldGUocmVzcG9uc2UuZGF0YS51cmkpXG5cbiAgYXV0aGVkOiAocmVzdWx0KSAtPlxuICAgIF8uZ2V0ICcvYXBpL2F1dGgnXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIHJlc3VsdCByZXNwb25zZS5kYXRhLnVzZXJcblxuICBnZXQ6XG4gICAgY2xpZW50SWQ6IC0+XG4gICAgICByZXR1cm4gVXNlci5jbGllbnQuaWRcbiIsIk5vdGZvdW5kID1cbiAgaTogLT5cbiAgICAkKCcjbGluZWVycm9yJykubm92YWNhbmN5XG4gICAgICAncmVibGlua1Byb2JhYmlsaXR5JzogMC4xXG4gICAgICAnYmxpbmtNaW4nOiAwLjJcbiAgICAgICdibGlua01heCc6IDAuNlxuICAgICAgJ2xvb3BNaW4nOiA4XG4gICAgICAnbG9vcE1heCc6IDEwXG4gICAgICAnY29sb3InOiAnI2ZmZmZmZidcbiAgICAgICdnbG93JzogWycwIDAgODBweCAjZmZmZmZmJywgJzAgMCAzMHB4ICMwMDgwMDAnLCAnMCAwIDZweCAjMDAwMGZmJ11cblxuICAgICQoJyNsaW5lY29kZScpLm5vdmFjYW5jeVxuICAgICAgJ2JsaW5rJzogMVxuICAgICAgJ29mZic6IDFcbiAgICAgICdjb2xvcic6ICdSZWQnXG4gICAgICAnZ2xvdyc6IFsnMCAwIDgwcHggUmVkJywgJzAgMCAzMHB4IEZpcmVCcmljaycsICcwIDAgNnB4IERhcmtSZWQnXVxuIiwiTm90aWNlID1cblxuICB0eXBlczogWydpbmZvJywnc3VjY2VzcycsJ3dhcm5pbmcnXVxuXG4gIGVsOiBmYWxzZVxuXG4gIG9uOiBmYWxzZVxuICBwcm9ncmVzczogZmFsc2VcbiAgdGltZW91dDogZmFsc2VcbiAgY2xvc2U6IHRydWVcblxuICBkZWZhdWx0OlxuICAgIHR5cGU6ICdpbmZvJ1xuICAgIHByb2dyZXNzOiBmYWxzZVxuICAgIHRpbWVvdXQ6IDUwMDBcblxuICBpOiAoY29weSxvcHRpb25zPXt9KSAtPlxuXG4gICAgQG9wdGlvbnMgPSBPYmplY3QuYXNzaWduIHt9LCBAZGVmYXVsdFxuXG4gICAgZm9yIGtleSwgcGFyYW0gb2Ygb3B0aW9uc1xuICAgICAgQG9wdGlvbnNba2V5XSA9IHBhcmFtXG5cbiAgICBAZWwgPSAkKCcubm90aWNlJykgaWYgQGVsIGlzIGZhbHNlXG5cbiAgICBmb3IgZHR5cGUgaW4gQHR5cGVzXG4gICAgICBAZWwucmVtb3ZlQ2xhc3MgZHR5cGVcbiAgICBAZWwuYWRkQ2xhc3MgQG9wdGlvbnMudHlwZVxuICAgIEBlbC5maW5kKCcuY29weSA+IC5tZXNzYWdlJykuaHRtbCBjb3B5XG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpc250IGZhbHNlXG4gICAgICBpZiBAcHJvZ3Jlc3MgaXMgZmFsc2VcbiAgICAgICAgXy5vbiBAZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgICAgIEBwcm9ncmVzcyA9IHRydWVcbiAgICAgIGlmIEBjbG9zZSBpcyB0cnVlXG4gICAgICAgIF8ub2ZmIEBlbC5maW5kKCcuY2xvc2UnKVxuICAgICAgICBAY2xvc2UgPSBmYWxzZVxuICAgICAgaWYgQG9uIGlzIGZhbHNlXG4gICAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgQG9wdGlvbnMucHJvZ3Jlc3MqMTAwICsgJyUnKVxuICAgICAgICAsIDEwMFxuICAgICAgZWxzZVxuICAgICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgQG9wdGlvbnMucHJvZ3Jlc3MqMTAwICsgJyUnKVxuXG4gICAgaWYgQG9wdGlvbnMucHJvZ3Jlc3MgaXMgZmFsc2UgYW5kIEBwcm9ncmVzcyBpcyB0cnVlXG4gICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgJzAlJylcbiAgICAgIF8ub2ZmIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgIEBwcm9ncmVzcyA9IGZhbHNlXG4gICAgICBfLm9uIEBlbC5maW5kKCcuY2xvc2UnKVxuICAgICAgQGNsb3NlID0gdHJ1ZVxuXG4gICAgaWYgQG9uIGlzIGZhbHNlXG4gICAgICBfLm9uIEBlbFxuICAgICAgQGhhbmRsZXJzLm9uKClcbiAgICAgIEBvbiA9IHRydWVcblxuICAgIGlmIEBvcHRpb25zLnRpbWVvdXQgaXNudCBmYWxzZSBhbmQgQG9wdGlvbnMucHJvZ3Jlc3MgaXMgZmFsc2VcbiAgICAgIEB0aW1lb3V0ID0gc2V0VGltZW91dCA9PlxuICAgICAgICBAZCgpXG4gICAgICAsIEBvcHRpb25zLnRpbWVvdXRcblxuICBoYW5kbGVyczpcbiAgICBvbjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLmNsb3NlID4gLmlubmVyJywgTm90aWNlLmRcbiAgICBvZmY6IC0+XG4gICAgICAkKCcubm90aWNlJykub2ZmICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuXG4gIGQ6IC0+XG4gICAgY2xlYXJUaW1lb3V0IE5vdGljZS50aW1lb3V0IGlmIE5vdGljZS50aW1lb3V0IGlzbnQgZmFsc2VcbiAgICBOb3RpY2UudGltZW91dCA9IGZhbHNlXG4gICAgTm90aWNlLmhhbmRsZXJzLm9mZigpXG4gICAgXy5vbiBOb3RpY2UuZWwuZmluZCgnLmNsb3NlJylcbiAgICBOb3RpY2UuY2xvc2UgPSB0cnVlXG4gICAgXy5vZmYgTm90aWNlLmVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgIE5vdGljZS5wcm9ncmVzcyA9IGZhbHNlXG4gICAgXy5vZmYgTm90aWNlLmVsLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuMlxuICAgIE5vdGljZS5vbiA9IGZhbHNlXG4iLCJQcm9tcHQgPVxuICBlbDoge31cbiAgb3B0aW9uczoge31cbiAgY2FsbGJhY2s6IGZhbHNlXG4gIHBhcmFtczoge31cblxuICBpOiAodGl0bGUsIGNvcHksIG9wdGlvbnM9WydPSyddLCBwYXJhbXMsIGNhbGxiYWNrKSAtPlxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gZmFsc2VcbiAgICBQcm9tcHQucGFyYW1zID0gZmFsc2VcblxuICAgIFByb21wdC5jYWxsYmFjayA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdmdW5jdGlvbidcbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBjYWxsYmFjayBpZiB0eXBlb2YgY2FsbGJhY2sgaXMgJ2Z1bmN0aW9uJ1xuXG4gICAgUHJvbXB0LnBhcmFtcyA9IHBhcmFtcyBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnXG5cbiAgICBQcm9tcHQuZWwgPSAkICcucHJvbXB0J1xuXG4gICAgUHJvbXB0LmVsLmZpbmQgJy50aXRsZSdcbiAgICAgIC5odG1sIHRpdGxlXG4gICAgUHJvbXB0LmVsLmZpbmQgJy5jb3B5J1xuICAgICAgLmh0bWwgY29weVxuXG4gICAgaWYgdHlwZW9mIHBhcmFtcyBpcyAnb2JqZWN0JyBhbmQgJ3RleHRhcmVhJyBvZiBwYXJhbXMgYW5kIHBhcmFtcy50ZXh0YXJlYSBpcyB0cnVlXG4gICAgICBfLm9uIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgICBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhID4gdGV4dGFyZWEnXG4gICAgICAgIC52YWwgcGFyYW1zLnZhbHVlXG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAnY2xpcGJvYXJkJyBvZiBwYXJhbXMgYW5kIHBhcmFtcy5jbGlwYm9hcmQgaXMgdHJ1ZVxuICAgICAgaW5wdXQgPSBQcm9tcHQuZWwuZmluZCAnLmlucHV0J1xuICAgICAgXy5vbiBpbnB1dFxuICAgICAgaW5wdXQuZmluZCgnaW5wdXQnKS52YWwgcGFyYW1zLnZhbHVlXG5cblxuICAgIFByb21wdC5vcHRpb25zID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb25zID4gLm9wdGlvbidcbiAgICBfLm9mZiBQcm9tcHQub3B0aW9uc1xuICAgIFByb21wdC5vcHRpb25zLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gICAgZm9yIG8saSBpbiBvcHRpb25zXG4gICAgICBvcHRpb24gPSBQcm9tcHQuZWwuZmluZCBcIi5vcHRpb25zICA+IC5vcHRpb25fI3tpKzF9XCJcbiAgICAgIF8ub24gb3B0aW9uXG4gICAgICBvcHRpb24uaHRtbCBvXG4gICAgICAgIC5kYXRhICd2YWx1ZScsIG9cblxuICAgIF8ub24gUHJvbXB0LmVsLFxuICAgIF8ub24gJy5iZmFkZSdcblxuICAgIFByb21wdC5oYW5kbGVycygpXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5mb2N1cygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChkb2N1bWVudCkua2V5ZG93biBQcm9tcHQua2V5ZG93blxuICAgIFByb21wdC5vcHRpb25zLm9uICdjbGljaycsIFByb21wdC5jbGlja1xuICAgIFByb21wdC5lbC5maW5kKCcuaW5uZXIgPiAuY2FuY2VsJykub24gJ2NsaWNrJywgUHJvbXB0LmNhbmNlbFxuICAgIFByb21wdC5lbC5maW5kKCcuY2xpcGJvYXJkJykub24gJ2NsaWNrJywgUHJvbXB0LmNsaXBib2FyZFxuXG5cbiAgY2xpcGJvYXJkOiAtPlxuICAgIFByb21wdC5lbC5maW5kKCcuaW5wdXQgPiBpbnB1dCcpLnNlbGVjdCgpXG4gICAgaWYgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuICAgICAgTm90aWNlLmkgJ0NvcGllZCB0byBjbGlwYm9hcmQnLCB0eXBlOiAnc3VjY2VzcydcbiAgICBlbHNlXG4gICAgICBOb3RpY2UuaSAnVW5hYmxlIHRvIGNsaXBib2FyZCcsIHR5cGU6ICd3YXJuaW5nJ1xuXG4gIGtleWRvd246IC0+XG4gICAgayA9IGV2ZW50LndoaWNoXG4gICAga2V5cyA9IFszOSwgOSwgMzcsIDEzLCAyN11cbiAgICByZXR1cm4gdHJ1ZSBpZiBrIG5vdCBpbiBrZXlzXG5cbiAgICBjdXJyZW50ID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb24ub24uYWN0aXZlJ1xuICAgIHNoaWZ0ID0gd2luZG93LmV2ZW50LnNoaWZ0S2V5XG5cbiAgICBpZiBrIGlzIDM5IG9yIChrIGlzIDkgYW5kICFzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQubmV4dCgpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5uZXh0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb25fMScpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMzcgb3IgKGsgaXMgOSBhbmQgc2hpZnQpXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBpZiBjdXJyZW50LnByZXYoKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIGN1cnJlbnQucHJldigpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBlbHNlXG4gICAgICAgIFByb21wdC5lbC5maW5kKCcub3B0aW9uLm9uJykubGFzdCgpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMTNcbiAgICAgIFByb21wdC50cmlnZ2VyIFByb21wdC5lbC5maW5kKCcub3B0aW9uLmFjdGl2ZScpLmRhdGEgJ3ZhbHVlJ1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgaWYgayBpcyAyN1xuICAgICAgUHJvbXB0LnRyaWdnZXIoZmFsc2UpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICBjYW5jZWw6IC0+XG4gICAgUHJvbXB0LnRyaWdnZXIgZmFsc2VcblxuICBjbGljazogLT5cbiAgICBQcm9tcHQudHJpZ2dlciAkKHRoaXMpLmRhdGEgJ3ZhbHVlJ1xuXG4gIHRyaWdnZXI6ICh2YWx1ZSkgLT5cbiAgICBfLm9mZiBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhJ1xuICAgIF8ub2ZmIFByb21wdC5lbCwgb2ZmaW5nOiBmYWxzZSwgb2ZmdGltZTogMC4yXG4gICAgI18ub2ZmICcuYmZhZGUnLCBvZmZpbmc6IGZhbHNlLCBvZmZpdG1lOiAwLjJcbiAgICBfLm9mZiAnLmJmYWRlJ1xuICAgIFByb21wdC5vcHRpb25zLnVuYmluZCAnY2xpY2snLCBQcm9tcHQuY2xpY2tcbiAgICAkKGRvY3VtZW50KS51bmJpbmQgJ2tleWRvd24nLCBQcm9tcHQua2V5ZG93blxuICAgIGlmIFByb21wdC5wYXJhbXMudGV4dGFyZWFcbiAgICAgIHZhbCA9IFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCgpXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHJlc3BvbnNlOiB2YWx1ZSwgdmFsOiB2YWxcbiAgICBlbHNlXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHZhbHVlXG4iLCJTZWxlY3RpemUgPVxuXG4gIGNsaWVudHM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuICAgIHNlbGVjdENsaWVudCA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgYSBDbGllbnQgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgcmVuZGVyOlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj4je2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvY2xpZW50cycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0Q2xpZW50LmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdENsaWVudFxuXG4gIHN0cnVjdHVyZXM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuXG4gICAgc2VsZWN0U3RydWN0dXJlID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIFN0cnVjdHVyZSAgIFwiXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXY+I3tpdGVtLm5hbWV9PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdFN0cnVjdHVyZS5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RTdHJ1Y3R1cmVcblxuICB1c2VyczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0VXNlciA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3JlbW92ZV9idXR0b24nXVxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2IHN0eWxlPSdsaW5lLWhlaWdodDogMzBweDsnPiN7aXRlbS5uYW1lfSAoI3tpdGVtLmVtYWlsfSkgPGltZyBzcmM9JyN7aXRlbS5waWN0dXJlfScgc3R5bGU9J2Zsb2F0OiBsZWZ0OyB3aWR0aDogMzBweDsgaGVpZ2h0OiAzMHB4OyBtYXJnaW4tcmlnaHQ6IDEwcHg7JyAvPjwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS91c2VycycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lLCBlbWFpbDogaXRlbS5lbWFpbCwgcGljdHVyZTogaXRlbS5waWN0dXJlXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0VXNlci5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RVc2VyXG5cblxuIiwiXG5TcGlubmVyID1cblxuICBzdGF0ZTogZmFsc2VcblxuICBlbDoge31cblxuICBpOiAoZWwsIG92ZXJyaWRlKSAtPlxuXG4gICAgQGVsID0gJCgnLnNwaW5uZXInKVxuXG4gICAgcmVjdCA9IGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBjb29yZHMgPVxuICAgICAgdG9wOiBcIiN7cmVjdC50b3AgKyAkKHdpbmRvdykuc2Nyb2xsVG9wKCl9cHhcIlxuICAgICAgbGVmdDogXCIje3JlY3QubGVmdH1weFwiXG4gICAgICB3aWR0aDogXCIje3JlY3Qud2lkdGh9cHhcIlxuICAgICAgaGVpZ2h0OiBcIiN7cmVjdC5oZWlnaHR9cHhcIlxuXG4gICAgaWYgb3ZlcnJpZGUgaXNudCB1bmRlZmluZWRcbiAgICAgIGZvciBrZXksIGNvb3JkIG9mIG92ZXJyaWRlXG4gICAgICAgIGNvb3Jkc1trZXldID0gY29vcmRcblxuICAgIEBlbC5jc3MgY29vcmRzXG5cbiAgICBfLm9uIEBlbFxuICAgIEBzdGF0ZSA9IHRydWVcblxuICBkOiAtPlxuICAgIF8ub2ZmIEBlbFxuICAgIEBzdGF0ZSA9IGZhbHNlXG4iLCJTdHJ1Y3R1cmUgPVxuXG4gIHRlbXBsYXRlOiBmYWxzZVxuICBfaWQ6IGZhbHNlXG5cbiAgY2xpZW50U2VsZWN0OiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBAdGVtcGxhdGUgPSAkKCcubW9kaWZ5ID4gI3RlbXBsYXRlJykuaHRtbCgpXG4gICAgQGhhbmRsZXJzKClcblxuICAgIEBjbGllbnRTZWxlY3QgPSBTZWxlY3RpemUuY2xpZW50cyAkKCcucGFnZS5zdHJ1Y3R1cmUgPiAubW9kaWZ5ID4gLmRldGFpbC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKSxcbiAgICAgIEBjbGllbnRTZWxlY3RoYW5kbGVyXG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9zdHJ1Y3R1cmVzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcbiAgICBlbHNlXG4gICAgICBAZW50aXR5QWRkKClcblxuXG4gICAgQGNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuZm9jdXMoKSBpZiBAX2lkIGlzIGZhbHNlXG5cblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAubW9yZScpLmNsaWNrIEBlbnRpdHlBZGRIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcycpLm9uICdjbGljaycsJy5lbnRpdHkgPiAucmVtb3ZlJywgQGVudGl0eVJlbW92ZUhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGFwJykuY2xpY2sgQHN1Ym1pdEhhbmRsZXJcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLnN0cnVjdHVyZScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcy8nLFxuICAgICAgX2lkOiBAX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy9zdHJ1Y3R1cmVzL25ldycgaWYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPCAxXG4gICAgICBzdHJ1Y3R1cmUgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICAkKCcubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCBzdHJ1Y3R1cmUubmFtZVxuICAgICAgZm9yIGksIGVudGl0eSBvZiBzdHJ1Y3R1cmUuZW50aXRpZXNcbiAgICAgICAgU3RydWN0dXJlLmVudGl0eUFkZCBmYWxzZSwgZW50aXR5XG5cbiAgICAgIFN0cnVjdHVyZS5jbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLmFkZE9wdGlvblxuICAgICAgICBpZDogc3RydWN0dXJlLmNsaWVudC5pZCwgbmFtZTogc3RydWN0dXJlLmNsaWVudC5uYW1lXG4gICAgICBTdHJ1Y3R1cmUuY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBzdHJ1Y3R1cmUuY2xpZW50LmlkXG5cblxuXG4gIGVudGl0eUFkZEhhbmRsZXI6IC0+XG4gICAgU3RydWN0dXJlLmVudGl0eUFkZCh0cnVlKVxuXG4gIGVudGl0eVJlbW92ZUhhbmRsZXI6IC0+XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKVxuXG4gIGVudGl0eUFkZDogKGZvY3VzPWZhbHNlLCBlbnRpdHk9ZmFsc2UpIC0+XG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHknKS5hcHBlbmQgQHRlbXBsYXRlXG5cbiAgICBpZiBlbnRpdHkgaXNudCBmYWxzZVxuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gaW5wdXQnKS52YWwoZW50aXR5Lm5hbWUpXG4gICAgICBAc2VsZWN0aXplICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpLCBlbnRpdHkudHlwZVxuICAgIGVsc2VcbiAgICAgIEBzZWxlY3RpemUgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gc2VsZWN0JylcblxuICAgIGlmICBmb2N1c1xuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eSA+IC5pbnB1dC5zZWxlY3RpemUtaW5wdXQgaW5wdXQnKS5sYXN0KCkuZm9jdXMoKVxuXG4gIHNlbGVjdGl6ZTogKGVsLCB2YWx1ZT1mYWxzZSkgLT5cbiAgICBpemVkID0gZWwuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJUeXBlXCJcblxuICAgIGl6ZWRbMF0uc2VsZWN0aXplLnNldFZhbHVlIHZhbHVlXG5cbiAgc3VibWl0SGFuZGxlcjogLT5cblxuICAgIHN0cnVjdHVyZSA9IHt9XG4gICAgc3RydWN0dXJlLmVudGl0aWVzID0ge31cbiAgICBzdHJ1Y3R1cmUuY2xpZW50ID0gJCgnLm1vZGlmeSA+IC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5uYW1lID0gJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eScpLmVhY2ggKGksIGVsKSAtPlxuXG4gICAgICBuYW1lID0gJChlbCkuZmluZCgnLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgICAgdHlwZSA9ICQoZWwpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpLnZhbCgpXG5cbiAgICAgIHN0cnVjdHVyZS5lbnRpdGllc1tuYW1lXSA9XG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgdHlwZTogdHlwZVxuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG5cbiAgICAgIGNvbnNvbGUubG9nIHN0cnVjdHVyZS5lbnRpdGllc1xuICAgICAgU3RydWN0dXJlLm1vZGlmeSBzdHJ1Y3R1cmVcblxuICBtb2RpZnk6IChzdHJ1Y3R1cmUpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2Uuc3RydWN0dXJlJykpXG5cbiAgICBjYWxsID0gJy9hcGkvc3RydWN0dXJlcy9hZGQnXG4gICAgaWYgU3RydWN0dXJlLl9pZCBpc250IGZhbHNlXG4gICAgICBjYWxsID0gXCIvYXBpL3N0cnVjdHVyZXMvdXBkYXRlLyN7U3RydWN0dXJlLl9pZH1cIlxuXG4gICAgXy5nZXQgY2FsbCwgc3RydWN0dXJlXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pIHJlc3BvbnNlLmRhdGEuc3RhdHVzLCAnc3VjY2VzcydcbiAgICAgICAgaWYgU3RydWN0dXJlLl9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL3N0cnVjdHVyZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBTdHJ1Y3R1cmUuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiIsIlN0cnVjdHVyZXMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnc3RydWN0dXJlcydcblxuIiwiVXNlcnMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAndXNlcnMnXG4iXX0=
