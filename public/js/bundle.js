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
    return Listing.i('entries', false, ['structures']);
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
    return $('.page.entry > .modify > .submit').attr('tabindex', tabindex);
  }
};

var Filter;

Filter = {
  filter: false,
  i: function(filter) {
    this.handlers.i();
    this.filter = filter;
    $('.selection > .inner > .values').html('');
    _.on(".selection.selection_" + this.filter);
    $(".selection.selection_" + this.filter + " > .inner > .search > input").focus();
    return this.get();
  },
  d: function() {
    _.off(".selection.selection_" + Filter.filter);
    return Filter.handlers.d();
  },
  get: function(search) {
    var options;
    if (search == null) {
      search = null;
    }
    Spinner.i($(".selection.selection_" + Filter.filter + " > .inner > .values"));
    options = {
      view: 'filters'
    };
    if (search !== null) {
      options.name = search;
    }
    return _.get("/api/" + this.filter, options).done(function(response) {
      $('.selection > .inner > .values').html(response.view);
      return Spinner.d();
    });
  },
  select: function(option) {
    return console.log('selected', option);
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
    insideCheck: function() {
      return event.stopPropagation();
    },
    outsideCheck: function() {
      console.log($(this).className);
      return Filter.d();
    },
    hoverHandler: function() {
      console.log('hover');
      _.off('.selection > .inner > .values > .value.on');
      return _.on($(this));
    },
    selectHandler: function() {
      return Filter.select($(this).find('name').html());
    },
    keyHandler: function() {
      var key;
      key = event.keyCode;
      switch (key) {
        case 40:
          Filter.nav('down');
          break;
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
  filters: [],
  selectedCursor: 0,
  otherActions: false,
  i: function(content, otherActions, filters) {
    var filter, j, len, ref, results;
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
    ref = this.filters;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      filter = ref[j];
      results.push(_.on(".filter_" + filter));
    }
    return results;
  },
  handlers: function() {
    $(".listing." + this.content).on('click', '.checkbox', this.checkboxHandler);
    $(".listing." + this.content).on('change', '.list-header > .checkbox > input', this.selectAllHandler);
    $(".listing." + this.content).on('change', '.checkbox > input', this.stateHandler);
    $(".listing." + this.content).on('click', '.list-header > .state_actions > .actions > .action', this.actionHandler);
    if (this.filters.length > 0) {
      return $(".listing." + this.content).on('click', '.list-header > .filters > .filter', this.filterHandler);
    }
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
  filterHandler: function() {
    event.stopPropagation();
    return Filter.i($(this).data('filter'));
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
      openOnFocus: true,
      onLoad: Entry.structureSpecified,
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
    return Listing.i('structures');
  }
};

var Users;

Users = {
  i: function() {
    return Listing.i('users');
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJmaWx0ZXIuY29mZmVlIiwiZ2xvYmFsLmNvZmZlZSIsImluZGV4LmNvZmZlZSIsImludml0ZS5jb2ZmZWUiLCJsaXN0aW5nLmNvZmZlZSIsIm1haW4uanMiLCJtZS5jb2ZmZWUiLCJub3Rmb3VuZC5jb2ZmZWUiLCJub3RpY2UuY29mZmVlIiwicHJvbXB0LmNvZmZlZSIsInNlbGVjdGl6ZS5jb2ZmZWUiLCJzcGlubmVyLmNvZmZlZSIsInN0cnVjdHVyZS5jb2ZmZWUiLCJzdHJ1Y3R1cmVzLmNvZmZlZSIsInVzZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUE7RUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxR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SixNQUFNLENBQUMsQ0FBUCxDQUFTLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBdkIsRUFBK0IsU0FBL0I7TUFDQSxDQUFDLENBQUMsRUFBRixDQUFLLDBCQUFMO01BQ0EsSUFBRyxTQUFTLENBQUMsR0FBVixLQUFpQixLQUFwQjtRQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBZixDQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxjQUFBLEdBQWUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUE5RCxFQURGOzthQUVBLFNBQVMsQ0FBQyxHQUFWLEdBQWdCLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFMMUIsQ0FIUjtFQVJNLENBL0dSOzs7QUNGRixJQUFBOztBQUFBLFVBQUEsR0FDRTtFQUFBLENBQUEsRUFBRyxTQUFBO1dBQ0QsT0FBTyxDQUFDLENBQVIsQ0FBVSxZQUFWO0VBREMsQ0FBSDs7O0FDREYsSUFBQTs7QUFBQSxLQUFBLEdBQ0U7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELE9BQU8sQ0FBQyxDQUFSLENBQVUsT0FBVjtFQURDLENBQUgiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpnZXQuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgcG9zdDogKGFyZ3MuLi4pIC0+XG5cbiAgICBqcG9zdCA9ICQucG9zdCBhcmdzLi4uXG5cbiAgICBqcG9zdC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAganBvc3QuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcG9zdFxuXG4gIGZhaWw6IChyZXNwb25zZSkgLT5cblxuICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OPy5lcnJvcnM/WzBdXG4gICAgaWYgZXJyb3IgaXMgdW5kZWZpbmVkXG4gICAgICByZXR1cm4gUHJvbXB0LmkgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0XG5cbiAgICBwdWcgPSBlcnJvci5tZXNzYWdlLm1hdGNoIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspL1xuICAgIGlmIHB1ZyBpc250IG51bGxcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlLnJlcGxhY2UgL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvLCAnJ1xuICAgICAgZXJyb3IuZmlsZSA9IHB1Z1sxXVxuICAgICAgZXJyb3IubGluZSA9IHB1Z1syXVxuXG4gICAgZmlsZSA9IEBlbmNvZGUgXCIje2Vycm9yLmZpbGV9XCJcblxuICAgIHN3aXRjaCBjb25maWcuYXBwLmVkaXRvclxuICAgICAgd2hlbiAnbWFjdmltJyB0aGVuIGVkaXRvciA9ICdtdmltOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3N1YmxpbWUnIHRoZW4gZWRpdG9yID0gJ3N1Ymw6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnZW1hY3MnIHRoZW4gZWRpdG9yID0gJ2VtYWNzOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3RleHRtYXRlJyB0aGVuIGVkaXRvciA9ICd0ZXh0bWF0ZTovL29wZW4vP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAncGhwc3Rvcm0nIHRoZW4gZWRpdG9yID0gJ3BocHN0b3JtOi8vb3Blbj9maWxlPSdcblxuICAgIGlmIGVycm9yLmZpbGUgaXNudCBudWxsXG4gICAgICBib2R5ID0gXCJcIlwiXG4gICAgICAgIDxwcmU+I3tlcnJvci5tZXNzYWdlfTwvcHJlPlxuICAgICAgICA8YSBocmVmPVwiI3tlZGl0b3J9I3tmaWxlfSZsaW5lPSN7ZXJyb3IubGluZX1cIj48Yj4je2Vycm9yLmZpbGV9OiN7ZXJyb3IubGluZX08L2I+PC9hPlxuICAgICAgXCJcIlwiXG4gICAgZWxzZVxuICAgICAgYm9keSA9IGVycm9yLm1lc3NhZ2VcblxuICAgIFByb21wdC5pIGVycm9yLnR5cGUsIGJvZHksIFsnT0snXVxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbiAgbWV0aG9kczogKG9iaikgLT5cbiAgICByZXMgPSBbXVxuICAgIGZvciBpLG0gb2Ygb2JqXG4gICAgICBpZiB0eXBlb2YgbSBpcyAnZnVuY3Rpb24nXG4gICAgICAgIHJlcy5wdXNoIG1cbiAgICByZXR1cm4gcmVzXG5cbl8uaSgpXG4iLCJUaW1lID1cbiAgaW50ZXJ2YWw6IGZhbHNlXG4gIGdhcDogMTAwMFxuXG4gIGk6IC0+XG4gICAgQGludGVydmFsID0gc2V0SW50ZXJ2YWwoQHNjcmFwZSwgQGdhYSkgaWYgQGludGVydmFsIGlzIGZhbHNlXG4gICAgQHNjcmFwZSgpXG5cbiAgc2NyYXBlOiAtPlxuICAgICQoJ3RpbWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGplbCA9ICQgZWxcbiAgICAgIGplbC5odG1sIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuZnJvbU5vdygpXG4gICAgICBqZWwuYXR0ciAnYXJpYS1sYWJlbCcsIG1vbWVudChqZWwuYXR0cigndGl0bGUnKSkuY2FsZW5kYXIoKVxuIiwiQ2xpZW50ID1cblxuICBzZWxlY3RVc2VyOiBmYWxzZVxuICBfaWQ6IGZhbHNlXG4gIGNyb3A6IGZhbHNlXG4gIHByb2ZpbGU6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEBoYW5kbGVycygpXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvY2xpZW50c1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG5cbiAgICBAc2VsZWN0VXNlciA9IFNlbGVjdGl6ZS51c2VycyAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtdXNlcnMgPiBpbnB1dCcpLCBAc2VsZWN0VXNlckhhbmRsZXIsIG1lOiBmYWxzZVxuXG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0ID4gaW5wdXQnKS5mb2N1cygpXG4gXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmNsaWVudCA+IC5zdWJtaXQnKS5jbGljayBAbW9kaWZ5SGFuZGxlclxuXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdvdmVyJywgQGRyYWdvdmVyXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdsZWF2ZScsIEBkcmFnbGVhdmVcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2VudGVyIGRyYWdvdmVyJywgQGNhbmNlbFxuXG4gICAgJChkb2N1bWVudCkub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAZHJvcFxuXG4gICAgJCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YScpLm9uICdjbGljaycsIEBjaG9vc2VGaWxlXG4gICAgJCgnLmlucHV0LWltYWdlID4gaW5wdXQ6ZmlsZScpLmNoYW5nZSBAY2hhbmdlXG5cbiAgY2FuY2VsOiAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICBkcmFnb3ZlcjogLT5cbiAgICBfLm9uICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJhZ2xlYXZlOiAtPlxuICAgIF8ub2ZmICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJvcDogKGUpIC0+XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgXy5vZmYgJy5pbnB1dC1pbWFnZSdcblxuICAgIGlmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgYW5kIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoXG4gICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hhbmdlOiAtPlxuICAgIGlmICQodGhpcylbMF0uZmlsZXNcbiAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hvb3NlRmlsZTogLT5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG4gIGNyb3BwaWU6IChmaWxlKSAtPlxuICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIub25sb2FkZW5kID0gLT5cblxuICAgICAgaWYgQ2xpZW50LmNyb3AgaXNudCBmYWxzZVxuICAgICAgICBDbGllbnQuY3JvcC5jcm9wcGllICdkZXN0cm95J1xuICAgICAgICBDbGllbnQuY3JvcCA9IGZhbHNlXG5cbiAgICAgIENsaWVudC5jcm9wID0gJCgnLmlucHV0LWltYWdlID4gLmNyb3BwaWUnKS5jcm9wcGllXG4gICAgICAgIHVybDogcmVhZGVyLnJlc3VsdFxuICAgICAgICBlbmZvcmNlQm91bmRhcnk6IGZhbHNlXG4gICAgICAgIHZpZXdwb3J0OlxuICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICBoZWlnaHQ6IDIwMFxuICAgICAgICBib3VuZGFyeTpcbiAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgaGVpZ2h0OiAzMDBcblxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMIGZpbGVcblxuICBzZWxlY3RVc2VySGFuZGxlcjogLT5cblxuICBtb2RpZnlIYW5kbGVyOiAtPlxuXG4gICAgaWYgQ2xpZW50LmNyb3AgaXNudCBmYWxzZVxuICAgICAgQ2xpZW50LmNyb3AuY3JvcHBpZSAncmVzdWx0JyxcbiAgICAgICAgdHlwZTogJ2NhbnZhcydcbiAgICAgICAgZm9ybWF0OiAnanBlZydcbiAgICAgIC50aGVuIChyZXNwb25zZSkgLT5cbiAgICAgICAgQ2xpZW50LmltYWdlVXBsb2FkIENsaWVudC5kYXRhVVJJdG9CbG9iKHJlc3BvbnNlKSwgLT5cbiAgICAgICAgICBDbGllbnQubW9kaWZ5KClcbiAgICBlbHNlXG4gICAgICBDbGllbnQubW9kaWZ5KClcblxuICBtb2RpZnk6IC0+XG5cbiAgICBuYW1lID0gJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LW5hbWUgPiBpbnB1dCcpLnZhbCgpXG4gICAgdXNlcnMgPSAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtdXNlcnMgPiBpbnB1dCcpLnZhbCgpLnNwbGl0ICcsJ1xuXG4gICAgY2FsbCA9ICcvYXBpL2NsaWVudHMvYWRkJ1xuICAgIGlmIENsaWVudC5faWQgaXNudCBmYWxzZVxuICAgICAgY2FsbCA9IFwiL2FwaS9jbGllbnRzL3VwZGF0ZS8je0NsaWVudC5faWR9XCJcblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnQnKSlcblxuICAgIF8uZ2V0IGNhbGwsIG5hbWU6IG5hbWUsIHVzZXJzOiB1c2VycywgcHJvZmlsZTogQ2xpZW50LnByb2ZpbGVcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsICdzdWNjZXNzJ1xuICAgICAgICBpZiBDbGllbnQuX2lkIGlzIGZhbHNlXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIHt9LCAnJywgXCIvY2xpZW50cy8je3Jlc3BvbnNlLmRhdGEuX2lkfVwiXG4gICAgICAgIENsaWVudC5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuICAgICAgICBpZiBDbGllbnQucHJvZmlsZVxuICAgICAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1pbWFnZSA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoJyN7Q2xpZW50LnByb2ZpbGV9JylcIlxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuY2xpZW50JykpXG5cbiAgICBfLmdldCAnL2FwaS9jbGllbnRzLycsXG4gICAgICBfaWQ6IEBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2NsaWVudHMvbmV3JyBpZiByZXNwb25zZS5kYXRhLmxlbmd0aCA8IDFcbiAgICAgIGNsaWVudCA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1uYW1lID4gaW5wdXQnKS52YWwgY2xpZW50Lm5hbWVcbiAgICAgIGlmIGNsaWVudC5wcm9maWxlXG4gICAgICAgICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC1pbWFnZSA+IC5waWN0dXJlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoJyN7Y2xpZW50LnByb2ZpbGV9JylcIlxuICAgICAgICBDbGllbnQucHJvZmlsZSA9IGNsaWVudC5wcm9maWxlXG4gICAgICBmb3IgaW5kZXgsIHVzZXIgb2YgY2xpZW50LnVzZXJzXG4gICAgICAgIGlmIHVzZXIuaWQgaXNudCBVc2VyLl9pZFxuICAgICAgICAgIENsaWVudC5zZWxlY3RVc2VyWzBdLnNlbGVjdGl6ZS5hZGRPcHRpb24gaWQ6IHVzZXIuaWQsIG5hbWU6IFwiI3t1c2VyLm5hbWV9ICgje3VzZXIuZW1haWx9KVwiXG4gICAgICAgICAgQ2xpZW50LnNlbGVjdFVzZXJbMF0uc2VsZWN0aXplLmFkZEl0ZW0gdXNlci5pZFxuXG5cbiAgZGF0YVVSSXRvQmxvYjogKGRhdGFVUkkpIC0+XG4gICAgYnl0ZVN0cmluZyA9IHVuZGVmaW5lZFxuICAgIGlmIGRhdGFVUkkuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwXG4gICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pXG4gICAgZWxzZVxuICAgICAgYnl0ZVN0cmluZyA9IHVuZXNjYXBlKGRhdGFVUkkuc3BsaXQoJywnKVsxXSlcbiAgICAjIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXVxuICAgICMgd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICAgIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpXG4gICAgaSA9IDBcbiAgICB3aGlsZSBpIDwgYnl0ZVN0cmluZy5sZW5ndGhcbiAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpXG4gICAgICBpKytcbiAgICBuZXcgQmxvYihbIGlhIF0sIHR5cGU6IG1pbWVTdHJpbmcpXG4gICAgICAgIFxuICBpbWFnZVVwbG9hZDogKGJsb2IsIGNhbGxiYWNrKSAtPlxuXG4gICAgZmQgPSBuZXcgRm9ybURhdGEoKVxuICAgIGZkLmFwcGVuZCAnZmlsZScsIGJsb2JcblxuICAgIF8ucG9zdFxuICAgICAgeGhyOiAtPlxuICAgICAgICB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyICdwcm9ncmVzcycsIChlKSAtPlxuICAgICAgICAgIGNvbXBsZXRlID0gZS5sb2FkZWQgLyBlLnRvdGFsXG4gICAgICAgICAgaWYgY29tcGxldGUgPCAxIHRoZW4gTm90aWNlLmkgJ1VwbG9hZGluZyBpbWFnZS4uJywgcHJvZ3Jlc3M6IGNvbXBsZXRlXG4gICAgICAgICAgaWYgY29tcGxldGUgaXMgMSB0aGVuIE5vdGljZS5pICdQcm9jZXNzaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgLCBmYWxzZVxuICAgICAgICByZXR1cm4geGhyXG5cbiAgICAgIHVybDogJy9hcGkvdXBsb2FkJ1xuICAgICAgZGF0YTogZmRcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgY29udGVudFR5cGU6IGZhbHNlXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICAgIGVycm9yOiAtPlxuICAgICAgICBOb3RpY2UuZCgpXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSAtPlxuICAgICAgICBOb3RpY2UuaSAnRmlsZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgQ2xpZW50LnByb2ZpbGUgPSByZXN1bHQuZGF0YS51cmxcbiAgICAgICAgY2FsbGJhY2socmVzdWx0KVxuXG5cbiIsIkNsaWVudHMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnY2xpZW50cycsIENsaWVudHMuYWN0aW9uXG5cbiAgYWN0aW9uOiAodHlwZSkgLT5cblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdDbGllbnQgSW52aXRlJ1xuICAgICAgICBpZiBMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aCA+IDFcbiAgICAgICAgICBOb3RpY2UuaSAnUGxlYXNlIGNob29zZSBhIHNpbmdsZSBjbGllbnQgZm9yIGFuIGludml0ZSBsaW5rJywgdHlwZTogJ3dhcm5pbmcnXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIENsaWVudHMuZ2V0SW52aXRlKExpc3Rpbmcuc2VsZWN0ZWRbMF0pXG5cbiAgZ2V0SW52aXRlOiAoY2xpZW50KSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudHMnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2ludml0ZS9hZGQnLCBjbGllbnQ6IGNsaWVudFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgY29uc29sZS5sb2cgcmVzcG9uc2VcbiAgICAgIFByb21wdC5pKFxuICAgICAgICAnQ2xpZW50IEludml0ZScsXG4gICAgICAgICdTaGFyZSB0aGlzIFVSTCB3aXRoIHlvdXIgY2xpZW50IHRvIGFsbG93IHRoZW0gdG8gbW9kaWZ5IHRoZWlyIG93biBlbnRyaWVzJyxcbiAgICAgICAgWydPSyddLFxuICAgICAgICAgIGNsaXBib2FyZDogdHJ1ZVxuICAgICAgICAgIHZhbHVlOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9pbnZpdGUvJyArIHJlc3BvbnNlLmRhdGEuaW52aXRlLmhhc2gsXG4gICAgICApXG5cblxuXG4iLCJjb25maWcgPSB7XCJ2aWV3XCI6e1wicGF0aHNcIjpbXCIvVXNlcnMvay9iYXNhbC9yZXNvdXJjZXMvdmlld3NcIl0sXCJjb21waWxlZFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvdmlld3NcIn0sXCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwid2hpdGUyXCI6XCIjZjhmOGY4XCIsXCJ3aGl0ZTNcIjpcIiNGNEY0RjRcIixcImdyZXkxXCI6XCIjZTVlNWU1XCIsXCJncmV5MlwiOlwiI2Y1ZjVmNVwiLFwiZ3JleTNcIjpcIiNkMGQwZDBcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiYmxhY2syXCI6XCIjMjgyODI4XCIsXCJibGFjazNcIjpcIiMzMzMzMzNcIixcInJlZDFcIjpcIiNDODIxMkJcIixcImN5YW4xXCI6XCIjNUZBNzkzXCIsXCJ5ZWxsb3cxXCI6XCIjRjZCQjQ1XCIsXCJvcmFuZ2UxXCI6XCIjRjY4RjYyXCIsXCJza2luMVwiOlwiI0YzRERBM1wiLFwiZ3JlZW4xXCI6XCIjNWJhNTQxXCIsXCJncmVlbjJcIjpcIiM4OGQ5NmRcIixcImdyZWVuM1wiOlwiIzc3ZDM1OFwiLFwiYmx1ZTFcIjpcIiMxZGE3ZWVcIixcImJsdWUyXCI6XCIjMDA3M2JiXCIsXCJnb29nbGVfYmx1ZVwiOlwiIzQyODVmNFwiLFwiZ29vZ2xlX2dyZWVuXCI6XCIjMzRhODUzXCIsXCJnb29nbGVfeWVsbG93XCI6XCIjZmJiYzA1XCIsXCJnb29nbGVfcmVkXCI6XCIjZWE0MzM1XCIsXCJnaXRodWJfYmx1ZVwiOlwiIzBEMjYzNlwiLFwiZmFjZWJvb2tfYmx1ZVwiOlwiIzQ4NjdBQVwiLFwiaW5zdGFncmFtX29yXCI6XCIjRkY3ODA0XCIsXCJ0d2l0dGVyX2JsdWVcIjpcIiMwMEFDRURcIn0sXCJmb250XCI6e1wiNDA0XCI6e1wiZm9udC1mYW1pbHlcIjpcIk1vbm90b25cIixcImZvbnQtc2l6ZVwiOlwiNzVweFwifSxcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJoMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwifSxcImgzYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImMxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNnB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9LFwiYzF0YlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjQwMFwifSxcImMxc2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjEycHhcIixcImZvbnQtd2VpZ2h0XCI6XCI2MDBcIixcImxldHRlci1zcGFjaW5nXCI6XCIwLjVweFwifSxcImMyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9fSxcIm1ldGFcIjp7XCJ0aXRsZVwiOlwiYmFzYWxcIixcInVybFwiOlwiaHR0cDovL2Jhc2FsLmRldi9cIixcImRlc2NyaXB0aW9uXCI6XCJtaW5pbWFsIGNvbnRlbnQgbWFuYWdlbWVudFwiLFwia2V5d29yZHNcIjpcImNtc1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2FjaWRqYXp6L2Jhc2FsXCJ9LFwiZGVidWdiYXJcIjp7XCJlbmFibGVkXCI6bnVsbCxcInN0b3JhZ2VcIjp7XCJlbmFibGVkXCI6dHJ1ZSxcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9kZWJ1Z2JhclwiLFwiY29ubmVjdGlvblwiOm51bGwsXCJwcm92aWRlclwiOlwiXCJ9LFwiaW5jbHVkZV92ZW5kb3JzXCI6dHJ1ZSxcImNhcHR1cmVfYWpheFwiOnRydWUsXCJjbG9ja3dvcmtcIjpmYWxzZSxcImNvbGxlY3RvcnNcIjp7XCJwaHBpbmZvXCI6dHJ1ZSxcIm1lc3NhZ2VzXCI6dHJ1ZSxcInRpbWVcIjp0cnVlLFwibWVtb3J5XCI6dHJ1ZSxcImV4Y2VwdGlvbnNcIjp0cnVlLFwibG9nXCI6dHJ1ZSxcImRiXCI6dHJ1ZSxcInZpZXdzXCI6dHJ1ZSxcInJvdXRlXCI6dHJ1ZSxcImxhcmF2ZWxcIjpmYWxzZSxcImV2ZW50c1wiOmZhbHNlLFwiZGVmYXVsdF9yZXF1ZXN0XCI6ZmFsc2UsXCJzeW1mb255X3JlcXVlc3RcIjp0cnVlLFwibWFpbFwiOnRydWUsXCJsb2dzXCI6ZmFsc2UsXCJmaWxlc1wiOmZhbHNlLFwiY29uZmlnXCI6ZmFsc2UsXCJhdXRoXCI6ZmFsc2UsXCJnYXRlXCI6ZmFsc2UsXCJzZXNzaW9uXCI6dHJ1ZX0sXCJvcHRpb25zXCI6e1wiYXV0aFwiOntcInNob3dfbmFtZVwiOmZhbHNlfSxcImRiXCI6e1wid2l0aF9wYXJhbXNcIjp0cnVlLFwidGltZWxpbmVcIjpmYWxzZSxcImJhY2t0cmFjZVwiOmZhbHNlLFwiZXhwbGFpblwiOntcImVuYWJsZWRcIjpmYWxzZSxcInR5cGVzXCI6W1wiU0VMRUNUXCJdfSxcImhpbnRzXCI6dHJ1ZX0sXCJtYWlsXCI6e1wiZnVsbF9sb2dcIjpmYWxzZX0sXCJ2aWV3c1wiOntcImRhdGFcIjpmYWxzZX0sXCJyb3V0ZVwiOntcImxhYmVsXCI6dHJ1ZX0sXCJsb2dzXCI6e1wiZmlsZVwiOm51bGx9fSxcImluamVjdFwiOnRydWUsXCJyb3V0ZV9wcmVmaXhcIjpcIl9kZWJ1Z2JhclwifSxcImFwcFwiOntcImVkaXRvclwiOlwibWFjdmltXCJ9LFwiY2FjaGVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwic3RvcmVzXCI6e1wiYXBjXCI6e1wiZHJpdmVyXCI6XCJhcGNcIn0sXCJhcnJheVwiOntcImRyaXZlclwiOlwiYXJyYXlcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJjYWNoZVwiLFwiY29ubmVjdGlvblwiOm51bGx9LFwiZmlsZVwiOntcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvY2FjaGVcIn0sXCJtZW1jYWNoZWRcIjp7XCJkcml2ZXJcIjpcIm1lbWNhY2hlZFwiLFwic2VydmVyc1wiOlt7XCJob3N0XCI6XCIxMjcuMC4wLjFcIixcInBvcnRcIjoxMTIxMSxcIndlaWdodFwiOjEwMH1dfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwifX0sXCJwcmVmaXhcIjpcImxhcmF2ZWxcIn0sXCJxdWV1ZVwiOntcImRlZmF1bHRcIjpcImFycmF5XCIsXCJjb25uZWN0aW9uc1wiOntcInN5bmNcIjp7XCJkcml2ZXJcIjpcInN5bmNcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJqb2JzXCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwiZXhwaXJlXCI6NjB9LFwiYmVhbnN0YWxrZFwiOntcImRyaXZlclwiOlwiYmVhbnN0YWxrZFwiLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwidHRyXCI6NjB9LFwic3FzXCI6e1wiZHJpdmVyXCI6XCJzcXNcIixcImtleVwiOlwieW91ci1wdWJsaWMta2V5XCIsXCJzZWNyZXRcIjpcInlvdXItc2VjcmV0LWtleVwiLFwicXVldWVcIjpcInlvdXItcXVldWUtdXJsXCIsXCJyZWdpb25cIjpcInVzLWVhc3QtMVwifSxcImlyb25cIjp7XCJkcml2ZXJcIjpcImlyb25cIixcImhvc3RcIjpcIm1xLWF3cy11cy1lYXN0LTEuaXJvbi5pb1wiLFwidG9rZW5cIjpcInlvdXItdG9rZW5cIixcInByb2plY3RcIjpcInlvdXItcHJvamVjdC1pZFwiLFwicXVldWVcIjpcInlvdXItcXVldWUtbmFtZVwiLFwiZW5jcnlwdFwiOnRydWV9LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwicmV0cnlfYWZ0ZXJcIjo2MH19LFwiZmFpbGVkXCI6e1wiZGF0YWJhc2VcIjpcIm1vbmdvZGJcIixcInRhYmxlXCI6XCJmYWlsZWRfam9ic1wifX19OyIsIkRhc2hib2FyZCA9XG5cbiAgZGF0YTp7fVxuXG4gIGk6IC0+XG4gICAgQGdldGRhdGEgPT5cbiAgICAgIEBwb3B1bGF0ZSgpXG5cbiAgcG9wdWxhdGU6IC0+XG4gICAgJCgnLmRhc2hib2FyZCAudmFsdWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgICQoZWwpLmh0bWwgQGRvdHN0b3ZhbHVlICQoZWwpLmRhdGEgJ3ZhbHVlJ1xuXG4gIGdldGRhdGE6IChjb21wbGV0ZSkgLT5cblxuICAgIGdldHMgPSBbJ3VzZXJzJywnY2xpZW50cycsICdzdHJ1Y3R1cmVzJywgJ2VudHJpZXMnXVxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5kYXNoYm9hcmQnKSlcblxuICAgICQoZ2V0cykuZWFjaCAoaW5kZXgsIGdldCkgPT5cbiAgICAgIF8uZ2V0IFwiL2FwaS8je2dldH1cIlxuICAgICAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICAgICAgQGRhdGFbZ2V0XSA9IHJlc3BvbnNlXG4gICAgICAgICAgaWYgT2JqZWN0LmtleXMoQGRhdGEpLmxlbmd0aCA9PSBnZXRzLmxlbmd0aFxuICAgICAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgICAgIGNvbXBsZXRlKClcblxuICBkb3RzdG92YWx1ZTogKGRvdHMpIC0+XG4gICAgcmVzdWx0ID0gQGRhdGFcbiAgICBmb3IgZGltIGluIGRvdHMuc3BsaXQgJy4nXG4gICAgICByZXN1bHQgPSByZXN1bHRbZGltXVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuXG4iLCJFbnRpdGllcyA9XG5cbiAgYmxvZ3M6IFtdXG4gIGNyb3BzOiB7fVxuICBpbWFnZXM6IHt9XG5cbiAgcGxhY2Vob2xkZXJzOiBbXG4gICAgXCJUaGF0J3Mgd2hhdCBJJ20gYmxvZ2dpbmcgYWJvdXRcIlxuICAgIFwiSGF2ZSB5b3UgZ3V5cyBiZWVuIGJsb2dnaW5nP1wiXG4gICAgXCJIb2xkIGFsbCBteSBjYWxscywgSSdtIGJsb2dnaW5nXCJcbiAgICBcIlRlbGwgRG9ubmllIEknbSBibG9nZ2luZyBhbmQgSSdsbCBjYWxsIGhpbSBiYWNrXCJcbiAgICBcIkkgZ290dGEgcnVuLCB5b3Ugc2hvdWxkIGJlIGJsb2dnaW5nXCJcbiAgICBcIkkgd2FudCB5b3Ugb24gdGhlIHBob25lLCBidXQgSSBhbHNvIHdhbnQgeW91IGJsb2dnaW5nXCJcbiAgXVxuXG4gIEJsb2c6IChlbCwgbmFtZSwgdmFsdWU9ZmFsc2UpIC0+XG5cbiAgICBlZGl0b3IgPSBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGVcbiAgICAgIHBsYWNlaG9sZGVyOiBAcGxhY2Vob2xkZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEBwbGFjZWhvbGRlcnMubGVuZ3RoKV1cbiAgICAgIGNhbGxiYWNrczpcbiAgICAgICAgb25JbWFnZVVwbG9hZDogKGZpbGVzKSAtPlxuICAgICAgICAgIEVudGl0aWVzLmltYWdlVXBsb2FkIGZpbGVzLCB0aGlzXG5cbiAgICBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGUoJ2NvZGUnLCB2YWx1ZSkgaWYgdmFsdWUgaXNudCBmYWxzZVxuXG4gICAgQGJsb2dzLnB1c2ggbmFtZTogbmFtZSwgZWRpdG9yOiBlZGl0b3IsIGVsOiBlbC5maW5kKCcuYmxvZycpXG5cbiAgYmxvZ0dldENvZGU6IChuYW1lKSAtPlxuICAgIGZvciBibG9nIGluIEBibG9nc1xuICAgICAgcmV0dXJuIGJsb2cuZWwuc3VtbWVybm90ZSgnY29kZScpIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gXG4gIGJsb2dGb2N1czogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICBpZiBibG9nLm5hbWUgaXMgbmFtZVxuICAgICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuICBpbWFnZVVwbG9hZDogKGZpbGVzLCBlbCkgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBmaWxlc1swXVxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgICQoZWwpLnN1bW1lcm5vdGUoJ2VkaXRvci5pbnNlcnRJbWFnZScsIHJlc3VsdC5kYXRhLnVybClcbiAgICAgICAgTm90aWNlLmkgJ0ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG5cbiAgVGFnczogKGVsLCBuYW1lKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0Jykuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3Jlc3RvcmVfb25fYmFja3NwYWNlJywncmVtb3ZlX2J1dHRvbiddXG4gICAgICBkZWxpbWl0ZXI6ICcsJ1xuICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICAgIGNyZWF0ZTogKGlucHV0KSAtPlxuICAgICAgICB2YWx1ZTogaW5wdXRcbiAgICAgICAgdGV4dDogaW5wdXRcblxuICBEYXRlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1knXG5cbiAgRGF0ZVRpbWU6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSBoOmkgSydcbiAgICAgIGVuYWJsZVRpbWU6IHRydWVcblxuICBEYXRlUmFuZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSdcbiAgICAgIG1vZGU6ICdyYW5nZSdcblxuICBEYXRlVGltZVJhbmdlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1kgaDppIEsnXG4gICAgICBlbmFibGVUaW1lOiB0cnVlXG4gICAgICBtb2RlOiAncmFuZ2UnXG5cbiAgSW1hZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG5cbiAgICBAaW1hZ2VIYW5kbGVycyBlbFxuXG4gICAgIyBwcmVsb2FkIGV4aXN0aW5nIGltYWdlc1xuICAgIGlmIHZhbHVlIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wcGVyKHZhbHVlLCBlbClcbiAgICAgIEVudGl0aWVzLmltYWdlc1tuYW1lXSA9IHZhbHVlXG5cblxuICBpbWFnZUhhbmRsZXJzOiAoZWwsIG5hbWUpIC0+XG5cbiAgICBlbC5vbiAnZHJhZ292ZXInLCBAaW1hZ2VIYW5kbGVyLmRyYWdvdmVyXG4gICAgZWwub24gJ2RyYWdsZWF2ZScsIEBpbWFnZUhhbmRsZXIuZHJhZ2xlYXZlXG4gICAgZWwub24gJ2RyYWdlbnRlciBkcmFnb3ZlcicsIEBpbWFnZUhhbmRsZXIuY2FuY2VsXG4gICAgZWwub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAaW1hZ2VIYW5kbGVyLmRyb3BcbiAgICBlbC5maW5kKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhLnNlbGVjdCcpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuY2hvb3NlRmlsZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEuc2F2ZScpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuc2F2ZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGlucHV0OmZpbGUnKS5vbiAnY2hhbmdlJywgQGltYWdlSGFuZGxlci5jaGFuZ2VcblxuICBpbWFnZUhhbmRsZXI6XG5cbiAgICBkcmFnb3ZlcjogLT5cbiAgICAgIF8ub24gJCh0aGlzKS5maW5kKCcuaW5wdXQtaW1hZ2UnKVxuICAgIGRyYWdsZWF2ZTogLT5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCgnLmlucHV0LWltYWdlJylcbiAgICBjYW5jZWw6IC0+XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBkcm9wOiAoZSkgLT5cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCAnLmlucHV0LWltYWdlJ1xuXG4gICAgICBpZiBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyIGFuZCBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aFxuICAgICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgICAgRW50aXRpZXMubG9hZENyb3BwZXIgZmlsZXNbMF0sICQodGhpcylcblxuICAgIGNob29zZUZpbGU6IC0+XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgICBjaGFuZ2U6IC0+XG4gICAgICBpZiAkKHRoaXMpWzBdLmZpbGVzXG4gICAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuXG4gICAgICAgIEVudGl0aWVzLmxvYWRDcm9wcGVyIGZpbGVzWzBdLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpXG5cbiAgICBzYXZlOiAtPlxuXG4gICAgICBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5kYXRhICduYW1lJ1xuICAgICAgaW5kZXggPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEgJ2luZGV4J1xuXG4gICAgICBTcGlubmVyLmkoJChcIi5lbnRpdHlfaW5kZXhfI3tpbmRleH1cIikpXG5cbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmdldENyb3BwZWRDYW52YXMoKS50b0Jsb2IgKGJsb2IpIC0+XG4gICAgICAgIENsaWVudC5pbWFnZVVwbG9hZCBibG9iLCAocmVzdWx0KSAtPlxuICAgICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAsICdpbWFnZS9qcGVnJ1xuXG4gIGxvYWRDcm9wcGVyOiAoZmlsZSwgZWwpIC0+XG5cbiAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cbiAgICByZWFkZXIub25sb2FkZW5kID0gLT5cbiAgICAgIEVudGl0aWVzLmNyb3BwZXIgcmVhZGVyLnJlc3VsdCwgZWxcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTCBmaWxlXG5cbiAgY3JvcHBlcjogKHVybCwgZWwpIC0+XG5cbiAgICBuYW1lID0gZWwuZGF0YSAnbmFtZSdcbiAgICBpbmRleCA9IGVsLmRhdGEgJ2luZGV4J1xuXG4gICAgY29uc29sZS5sb2cgbmFtZSwgaW5kZXhcblxuICAgIGlmIEVudGl0aWVzLmNyb3BzW25hbWVdIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wc1tuYW1lXS5kZXN0cm95KClcbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdID0gZmFsc2VcblxuICAgIGVsLmZpbmQoJy5jcm9wcGVyJykuYXR0ciAnc3JjJywgdXJsXG5cbiAgICBFbnRpdGllcy5jcm9wc1tuYW1lXSA9IG5ldyBDcm9wcGVyIGVsLmZpbmQoJy5jcm9wcGVyJylbMF0sXG4gICAgICBtaW5Db250YWluZXJIZWlnaHQ6IDMwMFxuICAgICAgbWluQ2FudmFzSGVpZ2h0OiAzMDBcbiAgICAgIHJlc3BvbnNpdmU6IHRydWVcbiAgICAgIHByZXZpZXc6IFwiZGl2LmVudGl0eV9pbmRleF8je2luZGV4fSA+IGRpdi5pbnB1dC1pbWFnZSA+IGRpdi5waWN0dXJlXCJcbiAgICAgIGF1dG9Dcm9wQXJlYTogMVxuICAgICAgc3RyaWN0OiBmYWxzZVxuICAgICAgaGlnaGxpZ2h0OiB0cnVlXG5cbiAgICBfLm9uIGVsLmZpbmQoJy5zYXZlJylcblxuXG4iLCJFbnRyaWVzID1cblxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnZW50cmllcycsIGZhbHNlLCBbJ3N0cnVjdHVyZXMnXVxuIiwiRW50cnkgPVxuXG4gIHNlbGVjdFN0cnVjdHVyZToge31cblxuICBfaWQ6IGZhbHNlXG4gIHN0cnVjdHVyZTogZmFsc2VcbiAgc2VsZWN0ZWRTdHJ1Y3R1cmU6IGZhbHNlXG4gIGVudHJ5OiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLmhhc2gubWF0Y2ggLyNzdHJ1Y3R1cmU9KFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBFbnRyeS5zZWxlY3RlZFN0cnVjdHVyZSA9IG1hdGNoWzFdXG5cbiAgICBAc2VsZWN0aXplKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvZW50cmllc1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG4gICAgZWxzZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5mb2N1cygpXG5cbiAgc3RydWN0dXJlU3BlY2lmaWVkOiAtPlxuICAgIGlmIEVudHJ5LnNlbGVjdGVkU3RydWN0dXJlIGlzbnQgZmFsc2VcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuc2V0VmFsdWUgRW50cnkuc2VsZWN0ZWRTdHJ1Y3R1cmVcblxuIFxuXG4gIHNlbGVjdGl6ZTogLT5cblxuICAgIEBzZWxlY3RTdHJ1Y3R1cmUgPSBTZWxlY3RpemUuc3RydWN0dXJlcyAkKCcubW9kaWZ5ID4gLnN0cnVjdHVyZSA+IHNlbGVjdCcpLFxuICAgICAgRW50cnkuc3RydWN0dXJlU2VsZWN0SGFuZGxlclxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5jbGljayBAc3VibWl0XG5cbiAgICAkKCcuZm9jdXNtZScpLmZvY3VzIC0+XG4gICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuXG4gIGxvYWQ6IChfaWQpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZW50cnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL2VudHJpZXMvJyxcbiAgICAgIF9pZDogX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBlbnRyeSA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgIEVudHJ5LmVudHJ5ID0gZW50cnlcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuYWRkT3B0aW9uIGVudHJ5LnN0cnVjdHVyZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBlbnRyeS5zdHJ1Y3R1cmUuaWRcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuZGlzYWJsZSgpXG5cbiAgc3VibWl0OiAtPlxuXG4gICAgbmFtZSA9ICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgIGVudGl0aWVzID0ge31cblxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5ID4gLmVudGl0eScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgZW50aXR5X25hbWUgPSAkKGVsKS5maW5kKCcubGFiZWwnKS5odG1sKClcbiAgICAgIHR5cGUgPSAkKGVsKS5kYXRhICd0eXBlJ1xuXG4gICAgICBzd2l0Y2ggdHlwZVxuICAgICAgICB3aGVuICdUZXh0JywnTGluaycsJ0RhdGUnLCdUaW1lJywnRGF0ZVRpbWUnLCdEYXRlUmFuZ2UnLCdEYXRlVGltZVJhbmdlJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKVxuICAgICAgICB3aGVuICdUYWdzJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKS5zcGxpdCAnLCdcbiAgICAgICAgd2hlbiAnQmxvZydcbiAgICAgICAgICBibG9nID0gRW50aXRpZXMuYmxvZ0dldENvZGUgZW50aXR5X25hbWVcbiAgICAgICAgICB2YWx1ZSA9IGJsb2dcbiAgICAgICAgd2hlbiAnSW1hZ2UnXG4gICAgICAgICAgdmFsdWUgPSBFbnRpdGllcy5pbWFnZXNbZW50aXR5X25hbWVdXG5cbiAgICAgIGVudGl0aWVzW2VudGl0eV9uYW1lXSA9IG5hbWU6IGVudGl0eV9uYW1lLCB0eXBlOiB0eXBlLCB2YWx1ZTogdmFsdWVcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuXG4gICAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5JykpXG5cbiAgICAgIGNhbGwgPSAnL2FwaS9lbnRyaWVzL2FkZCdcbiAgICAgIGlmIEVudHJ5Ll9pZCBpc250IGZhbHNlXG4gICAgICAgIGNhbGwgPSBcIi9hcGkvZW50cmllcy91cGRhdGUvI3tFbnRyeS5faWR9XCJcblxuICAgICAgXy5nZXQgY2FsbCxcbiAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICBzdHJ1Y3R1cmU6IEVudHJ5LnN0cnVjdHVyZVxuICAgICAgICBlbnRpdGllczogZW50aXRpZXNcbiAgICAgIC5hbHdheXMgLT5cbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgTm90aWNlLmkgcmVzcG9uc2UuZGF0YS5zdGF0dXMsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBpZiBFbnRyeS5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9lbnRyaWVzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgRW50cnkuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcblxuICBzdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyOiAoZSkgLT5cbiAgICBzdHJ1Y3R1cmVfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICByZXR1cm4gZmFsc2UgaWYgc3RydWN0dXJlX2lkLmxlbmd0aCBpc250IDI0XG4gICAgI2lmIEVudHJ5LmVudHJ5IGlzbnQgZmFsc2VcbiAgICAjICBFbnRyeS5sb2FkRW50aXRpZXMgRW50cnkuZW50cnkuZW50aXRpZXMsIEVudHJ5LmVudHJ5Lm5hbWVcbiAgICAjZWxzZVxuICAgIEVudHJ5LmxvYWRTdHJ1Y3R1cmUgc3RydWN0dXJlX2lkXG5cbiAgbG9hZFN0cnVjdHVyZTogKF9pZCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLFxuICAgICAgX2lkOiBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgPT5cbiAgICAgIEVudHJ5LnN0cnVjdHVyZSA9IF9pZFxuICAgICAgQGxvYWRFbnRpdGllcyByZXNwb25zZS5kYXRhWzBdLmVudGl0aWVzXG5cbiAgbG9hZEVudGl0aWVzOiAoZW50aXRpZXMsIG5hbWU9ZmFsc2UpIC0+XG5cbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSdcbiAgICBpZiBFbnRyeS5lbnRyeS5uYW1lIGlzbnQgZmFsc2VcbiAgICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoRW50cnkuZW50cnkubmFtZSlcblxuICAgIGJvZHkgPSAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keScpXG4gICAgYm9keS5odG1sICcnXG5cbiAgICB0YWJpbmRleCA9IDNcbiAgICBpbmRleCA9IDBcblxuICAgIGZvciBpLCBlbnRpdHkgb2YgZW50aXRpZXNcblxuICAgICAgaHRtbCA9ICQoXCIucGFnZS5lbnRyeSA+ICN0ZW1wbGF0ZSA+IC5lbnRpdHlfI3tlbnRpdHkudHlwZX1cIikuY2xvbmUoKVxuICAgICAgaHRtbC5hZGRDbGFzcyBcImVudGl0eV9pbmRleF8jeysraW5kZXh9XCJcbiAgICAgIGh0bWwuZGF0YSBcImluZGV4XCIsIGluZGV4XG4gICAgICBodG1sLmRhdGEgXCJuYW1lXCIsIGVudGl0eS5uYW1lXG5cbiAgICAgIGlmIEVudHJ5LmVudHJ5LmVudGl0aWVzP1tpXT8udmFsdWVcblxuICAgICAgICB2YWx1ZSA9IEVudHJ5LmVudHJ5LmVudGl0aWVzW2ldLnZhbHVlXG5cbiAgICAgICAgc3dpdGNoIGVudGl0eS50eXBlXG4gICAgICAgICAgd2hlbiAnVGV4dCcsJ0xpbmsnLCdEYXRlJywnVGltZScsJ0RhdGVUaW1lJywnRGF0ZVJhbmdlJywnRGF0ZVRpbWVSYW5nZScgdGhlbiBodG1sLmZpbmQoJ2lucHV0JykudmFsIHZhbHVlXG5cbiAgICAgIGh0bWwuZmluZCgnaW5wdXQsc2VsZWN0LHRleHRhcmVhJykuYXR0ciAndGFiaW5kZXgnLCB0YWJpbmRleCsrXG4gICAgICBib2R5LmFwcGVuZCBodG1sXG5cbiAgICAgIGVudGl0eUVsID0gJChcIi5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5IC5lbnRpdHlfaW5kZXhfI3tpbmRleH1cIilcbiAgICAgIGVudGl0eUVsLmZpbmQoJy5sYWJlbCcpLmh0bWwgZW50aXR5Lm5hbWVcblxuICAgICAgaWYgRW50aXRpZXNbZW50aXR5LnR5cGVdIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIEVudGl0aWVzW2VudGl0eS50eXBlXShlbnRpdHlFbCwgZW50aXR5Lm5hbWUsIHZhbHVlKVxuXG4gICAgJCgnW3RhYmluZGV4PTJdJykuZm9jdXMoKVxuICAgIF8ub24gJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLnN1Ym1pdCcpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXhcbiIsIkZpbHRlciA9XG4gIGZpbHRlcjogZmFsc2VcblxuICBpOiAoZmlsdGVyKSAtPlxuXG4gICAgQGhhbmRsZXJzLmkoKVxuXG4gICAgQGZpbHRlciA9IGZpbHRlclxuXG4gICAgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMnKS5odG1sICcnXG5cbiAgICBfLm9uIFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tAZmlsdGVyfVwiXG5cbiAgICAkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tAZmlsdGVyfSA+IC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dFwiKS5mb2N1cygpXG5cbiAgICBAZ2V0KClcblxuICBkOiAtPlxuICAgIF8ub2ZmIFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiXG4gICAgRmlsdGVyLmhhbmRsZXJzLmQoKVxuXG4gIGdldDogKHNlYXJjaD1udWxsKSAtPlxuICAgIFNwaW5uZXIuaSgkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfSA+IC5pbm5lciA+IC52YWx1ZXNcIikpXG4gICAgb3B0aW9ucyA9XG4gICAgICB2aWV3OiAnZmlsdGVycydcblxuICAgIG9wdGlvbnMubmFtZSA9IHNlYXJjaCBpZiBzZWFyY2ggaXNudCBudWxsXG5cbiAgICBfLmdldCBcIi9hcGkvI3tAZmlsdGVyfVwiLCBvcHRpb25zXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgJCgnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMnKS5odG1sIHJlc3BvbnNlLnZpZXdcbiAgICAgIFNwaW5uZXIuZCgpXG5cbiAgc2VsZWN0OiAob3B0aW9uKSAtPlxuICAgIGNvbnNvbGUubG9nICdzZWxlY3RlZCcsIG9wdGlvblxuXG4gIGhhbmRsZXJzOlxuXG4gICAgaTogLT5cblxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdjbGljaycsICcuaW5uZXIgPiAubGFiZWwgPiAuaWNvbi5jYW5jZWwnLCBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdrZXl1cCcsJyAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXQnLCBAa2V5SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdjbGljaycsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQHNlbGVjdEhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnbW91c2VvdmVyJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAaG92ZXJIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2JsdXInLCAgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnY2xpY2snLCBAaW5zaWRlQ2hlY2tcbiAgICAgICQoZG9jdW1lbnQpLm9uICdjbGljaycsIEBvdXRzaWRlQ2hlY2tcblxuICAgIGQ6IC0+XG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdjbGljaycsICcuaW5uZXIgPiAubGFiZWwgPiAuaWNvbi5jYW5jZWwnLCBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAna2V5dXAnLCcgLmlubmVyID4gLnNlYXJjaCA+IGlucHV0JywgQGtleUhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAc2VsZWN0SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnbW91c2VvdmVyJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAaG92ZXJIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdibHVyJywgIEZpbHRlci5kXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdjbGljaycsIEBpbnNpZGVDaGVja1xuICAgICAgJChkb2N1bWVudCkub2ZmICdjbGljaycsIEBvdXRzaWRlQ2hlY2tcblxuICAgIGluc2lkZUNoZWNrOiAtPlxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBvdXRzaWRlQ2hlY2s6IC0+XG4gICAgICBjb25zb2xlLmxvZyAkKHRoaXMpLmNsYXNzTmFtZVxuICAgICAgRmlsdGVyLmQoKVxuXG4gICAgaG92ZXJIYW5kbGVyOiAtPlxuXG4gICAgICBjb25zb2xlLmxvZyAnaG92ZXInXG4gICAgICBfLm9mZiAnLnNlbGVjdGlvbiA+IC5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUub24nXG4gICAgICBfLm9uICQodGhpcylcblxuXG4gICAgc2VsZWN0SGFuZGxlcjogLT5cbiAgICAgIEZpbHRlci5zZWxlY3QgJCh0aGlzKS5maW5kKCduYW1lJykuaHRtbCgpXG5cbiAgICBrZXlIYW5kbGVyOiAtPlxuXG4gICAgICBrZXkgPSBldmVudC5rZXlDb2RlXG5cbiAgICAgIHN3aXRjaCBrZXlcbiAgICAgICAgd2hlbiA0MCB0aGVuIEZpbHRlci5uYXYgJ2Rvd24nXG4gICAgICAgIHdoZW4gMzggdGhlbiBGaWx0ZXIubmF2ICd1cCdcblxuICAgICAgICB3aGVuIDEzIHRoZW4gRmlsdGVyLnNlbGVjdCAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZS5vbiA+IC5uYW1lJykuaHRtbCgpXG5cbiAgICAgICAgZWxzZSBGaWx0ZXIuZ2V0ICQodGhpcykudmFsKClcblxuICAgICAgcmV0dXJuIHRydWVcblxuICBuYXY6IChkaXIpIC0+XG5cbiAgICBjdXIgPSAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZS5vbicpXG4gICAgbmV4dCA9IGN1ci5uZXh0KCkgaWYgZGlyIGlzICdkb3duJ1xuICAgIG5leHQgPSBjdXIucHJldigpIGlmIGRpciBpcyAndXAnXG4gICAgXy5vZmYgY3VyXG5cbiAgICBpZiBuZXh0Lmxlbmd0aCBpc250IDBcbiAgICAgIF8ub24gbmV4dFxuICAgICAgcmV0dXJuXG5cbiAgICBfLm9uICcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZTpmaXJzdC1jaGlsZCcgaWYgZGlyIGlzICdkb3duJ1xuICAgIF8ub24gJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlOmxhc3QtY2hpbGQnIGlmIGRpciBpcyAndXAnIFxuXG4iLCJHbG9iYWwgPVxuXG4gICMga2V2aW4gb2xzb24gKGtldmluQDI1Ni5pbykg8J+MgPCfjrdcblxuICB3aW5kb3c6IGZhbHNlXG4gIHdpbmRvd1RpbWVyOiBmYWxzZVxuICBpbml0OiBmYWxzZVxuXG4gIGk6IC0+XG4gICAgR2xvYmFsLmhhbmRsZXJzKClcbiAgICBHbG9iYWwubG9naW5DaGVjaygpXG5cbiAgICBfLm9uIFwiLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb25fI3tQYWdlfVwiIGlmIFBhZ2U/XG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucHJvZmlsZScpLmNsaWNrIEdsb2JhbC51c2VyUHJvZmlsZUhhbmRsZXJcbiAgICAkKCcub2F1dGhzID4gLm9hdXRoJykuY2xpY2sgR2xvYmFsLnVzZXJPYXV0aEhhbmRsZXJcbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5sb2dvdXQnKS5jbGljayBHbG9iYWwubG9nb3V0SGFuZGxlclxuICAgICQoJy5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uJykuY2xpY2sgR2xvYmFsLm1lbnVIYW5kbGVyXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgXy5vZmYgJCgnLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb24nKVxuICAgIHNlbGVjdGVkID0gJCh0aGlzKS5maW5kKCcubGFiZWwnKS5odG1sKClcbiAgICBfLm9uICQoXCIubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbi5vcHRpb25fI3tzZWxlY3RlZH1cIilcblxuICBsb2dvdXRIYW5kbGVyOiAtPlxuXG4gICAgUHJvbXB0LmkgJ0xvZ291dCcsICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gbG9nIG91dD8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgIHJldHVybiBmYWxzZSBpZiByZXNwb25zZSBpc250ICdZZXMnXG5cbiAgICAgIFNwaW5uZXIuaSAkKCdoZWFkZXInKVxuXG4gICAgICBNZS5sb2dvdXQgLT5cbiAgICAgICAgXy5zd2FwICcubWUgPiAucHJvZmlsZSdcbiAgICAgICAgXy5zd2FwICcubWUgPiAucGljdHVyZSdcbiAgICAgICAgTm90aWNlLmkgJ0xvZ291dCBTdWNjZXNzZnVsJywgJ3N1Y2Nlc3MnXG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG4gICAgICAgICwgMTIwMFxuXG4gIHVzZXJQcm9maWxlSGFuZGxlcjogLT5cblxuICAgIG9hID0gJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLm9hdXRocycpXG4gICAgdGwgPSBuZXcgVGltZWxpbmVNYXggcmVwZWF0OiAwXG5cbiAgICBpZiBvYS5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgXy5vbiBvYVxuICAgICAgdGwudG8gJyNwcm9maWxlU1ZHJywgMC44LCB7bW9ycGhTVkc6ICcjY2FuY2VsU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgIGVsc2VcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI3Byb2ZpbGVTVkcnLCBlYXNlOlBvd2VyNC5lYXNlSW5PdXR9XG4gICAgICBfLm9mZiBvYSwgb2ZmaW5nOiAwLjVcblxuICB1c2VyT2F1dGhIYW5kbGVyOiAtPlxuXG4gICAgdHlwZSA9ICQodGhpcykuZGF0YSAndHlwZSdcblxuICAgIHJldHVybiB0cnVlIGlmIHR5cGUgaXMgJ2NhbmNlbCdcblxuICAgIEdsb2JhbC5vYXV0aFdpbmRvdyAnL2xvYWRpbmcnXG5cbiAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgIHBhcmFtcyA9IHt9XG4gICAgcGFyYW1zLmludml0ZSA9IEludml0ZS5oYXNoIGlmIEludml0ZS5oYXNoXG5cbiAgICBNZS5vYXV0aCB0eXBlLCBwYXJhbXMsICh1cmkpIC0+XG4gICAgICBHbG9iYWwud2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmlcblxuICBvYXV0aFdpbmRvdzogKHVybCkgLT5cbiAgICB3ID0gNjQwXG4gICAgaCA9IDU1MFxuICAgIGxlZnQgPSAoc2NyZWVuLndpZHRoLzIpIC0gKHcvMilcbiAgICB0b3AgPSAoc2NyZWVuLmhlaWdodC8yKSAtIChoLzIpXG5cblxuICAgIEdsb2JhbC53aW5kb3cgPSB3aW5kb3cub3Blbih1cmwsICdMb2dpbiAvIFJlZ2lzdGVyJywgXCJ0b29sYmFyPW5vLCBsb2NhdGlvbj1ubywgZGlyZWN0b3JpZXM9bm8sIHN0YXR1cz1ubywgbWVudWJhcj1ubywgc2Nyb2xsYmFycz1ubywgcmVzaXphYmxlPW5vLCBjb3B5aGlzdG9yeT1ubywgd2lkdGg9I3t3fSxoZWlnaHQ9I3tofSx0b3A9I3t0b3B9LGxlZnQ9I3tsZWZ0fVwiKVxuICAgIEdsb2JhbC53aW5kb3cuZm9jdXMgaWYgd2luZG93LmZvY3VzXG4gICAgR2xvYmFsLndpbmRvd1RpbWVyID0gc2V0SW50ZXJ2YWwgLT5cbiAgICAgIGlmIEdsb2JhbC53aW5kb3cuY2xvc2VkXG4gICAgICAgIGNsZWFySW50ZXJ2YWwgR2xvYmFsLndpbmRvd1RpbWVyXG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgIGNvbnNvbGUubG9nICdjbG9zaW5nIG91ciBzaGl0ZSdcbiAgICAsIDUwXG5cbiAgICByZXR1cm5cblxuICBvYXV0aENvbXBsZXRlOiAodXNlcikgLT5cbiAgICBTcGlubmVyLmQoKVxuICAgIEdsb2JhbC5sb2dpbiB1c2VyXG4gICAgTm90aWNlLmkgJ0xvZ2luIFN1Y2Nlc3NmdWwnLCAnc3VjY2VzcydcbiAgICBpZiBVc2VyLmNsaWVudCBpc250IHVuZGVmaW5lZFxuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9lbnRyaWVzJ1xuICAgICAgMjAwMFxuICAgIGVsc2VcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkJ1xuICAgICAgMjAwMFxuXG4gIGxvZ2luOiAodXNlcikgLT5cblxuICAgIHdpbmRvdy5Vc2VyID0gdXNlclxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiAuaW1hZ2UnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgje1VzZXIucGljdHVyZX0pXCJcbiAgICBfLm9mZiAnLm1lID4gLnByb2ZpbGUnXG4gICAgXy5vZmYgJy5tZSA+IC5vYXV0aHMnXG4gICAgXy5vbiAnLm1lID4gLnBpY3R1cmUnXG5cbiAgICBpZiBVc2VyLmNsaWVudCBpc250IHVuZGVmaW5lZFxuICAgICAgJCgnaGVhZGVyID4gLmlubmVyID4gLmNsaWVudCA+IC5uYW1lJykuaHRtbCBVc2VyLmNsaWVudC5uYW1lXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50ID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgje1VzZXIuY2xpZW50LnByb2ZpbGV9KVwiXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLmxvZ28nXG4gICAgICBfLm9mZiAnaGVhZGVyID4gLmlubmVyID4gLm5hbWUnXG5cbiAgbG9naW5DaGVjazogLT5cblxuICAgIFNwaW5uZXIuaSgkKCdoZWFkZXInKSlcblxuICAgIE1lLmF1dGhlZCAocmVzdWx0KSAtPlxuICAgICAgR2xvYmFsLmxvZ2luKHJlc3VsdCkgaWYgcmVzdWx0IGlzbnQgZmFsc2VcbiAgICAgIGlmIEdsb2JhbC5pbml0IGlzbnQgZmFsc2VcbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgd2luZG93W0dsb2JhbC5pbml0XS5pKClcbiAgICAgIGVsc2VcbiAgICAgICAgU3Bpbm5lci5kKClcblxuICAgICAgIyB0dXJuIG9uIGFsbCBsb2dpbiAvIHJlZ2lzdHJhdGlvbiBkaXZzXG4gICAgICBpZiB3aW5kb3cuVXNlciBpcyB1bmRlZmluZWRcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8ub24gJy5ob21lID4gLm9hdXRocydcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4ubG9nbydcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm5hbWUnXG5cbiAgICAgICMgY2xpZW50IGJhc2VkIHVzZXIsIGdvIHRvIGVudHJpZXNcbiAgICAgIGlmIFVzZXI/LmNsaWVudCBpc250IHVuZGVmaW5lZCBhbmQgUGFnZSBpc250ICdlbnRyaWVzJ1xuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9lbnRyaWVzJ1xuXG4gICAgICBpZiB3aW5kb3cuVXNlciBpc250IHVuZGVmaW5lZCBhbmQgVXNlci5jbGllbnQgaXMgdW5kZWZpbmVkXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+LmxvZ28nXG4gICAgICAgIF8ub24gJ2hlYWRlciA+IC5pbm5lciA+IC5uYW1lJ1xuICAgICAgICBfLm9uICcubWVudSdcbiIsIl8uY29uc3RydWN0b3IoKVxuXG5jbGFzcyBJbmRleFxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy50b3AgLmJ1cmdlcicpLmNsaWNrIEBtb2JpbGVcblxuICBtb2JpbGU6IC0+XG4gICAgXy5zd2FwICcudG9wID4gLmJ1cmdlcidcbiAgICBfLnN3YXAgJy50b3AgPiAubWVudSdcbiIsIkludml0ZSA9XG4gIGhhc2g6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5pbnZpdGUnKSlcblxuICAgIGlmIFVzZXI/IGlzbnQgZmFsc2VcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgICBQcm9tcHQuaSAnSW52aXRlIEVyb3JyJywgJ1lvdSBhcmUgY3VycmVudGx5IGxvZ2dlZCBpbicsIFsnT0snXSwge30sIC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcblxuICAgIGVsc2VcbiAgICAgIGlmIG1hdGNoID0gbG9jYXRpb24ucGF0aG5hbWUubWF0Y2ggL1xcL2ludml0ZVxcLyhbMC05YS1mQS1GXXs4fSkvXG4gICAgICAgIEBoYXNoID0gbWF0Y2hbMV1cbiAgICAgICAgQGxvYWQgQGhhc2hcbiAgICAgIGVsc2VcblxuICBsb2FkOiAoaGFzaCkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2ludml0ZS9nZXQnLFxuICAgICAgaGFzaDogaGFzaFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3VsdCkgLT5cbiAgICAgIGludml0ZSA9IHJlc3VsdC5kYXRhLmludml0ZVxuXG4gICAgICAkKCcucGFnZS5pbnZpdGUgPiAucHJvZmlsZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsXCJ1cmwoI3tpbnZpdGUuY2xpZW50LnByb2ZpbGV9KVwiXG4gICAgICAkKCcucGFnZS5pbnZpdGUgPiAudGl0bGUnKS5odG1sIGludml0ZS5jbGllbnQubmFtZVxuIiwiTGlzdGluZyA9XG4gIGNvbnRlbnQ6IGZhbHNlXG4gIHNlbGVjdGVkOiBbXVxuICBmaWx0ZXJzOiBbXVxuICBzZWxlY3RlZEN1cnNvcjogMFxuXG4gIG90aGVyQWN0aW9uczogZmFsc2VcblxuICBpOiAoY29udGVudCwgb3RoZXJBY3Rpb25zPWZhbHNlLCBmaWx0ZXJzPVtdKSAtPlxuXG4gICAgQGZpbHRlcnMgPSBmaWx0ZXJzXG4gICAgQGNvbnRlbnQgPSBjb250ZW50XG4gICAgQG90aGVyQWN0aW9ucyA9IG90aGVyQWN0aW9uc1xuICAgIEBsb2FkKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgXy5vbiBcIi5maWx0ZXJfI3tmaWx0ZXJ9XCIgZm9yIGZpbHRlciBpbiBAZmlsdGVyc1xuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLmNoZWNrYm94JywgQGNoZWNrYm94SGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2hhbmdlJywgJy5saXN0LWhlYWRlciA+IC5jaGVja2JveCA+IGlucHV0JywgQHNlbGVjdEFsbEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NoYW5nZScsICcuY2hlY2tib3ggPiBpbnB1dCcsIEBzdGF0ZUhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uJywgQGFjdGlvbkhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5saXN0LWhlYWRlciA+IC5maWx0ZXJzID4gLmZpbHRlcicsIEBmaWx0ZXJIYW5kbGVyIGlmIEBmaWx0ZXJzLmxlbmd0aCA+IDBcblxuICBjaGVja2JveEhhbmRsZXI6IC0+XG4gICAgY2IgPSAkKHRoaXMpLmZpbmQgJ2lucHV0J1xuICAgIGlmIGV2ZW50LnRhcmdldC50eXBlIGlzbnQgJ2NoZWNrYm94J1xuICAgICAgY2JbMF0uY2hlY2tlZCA9ICFjYlswXS5jaGVja2VkXG4gICAgICBjYi5jaGFuZ2UoKVxuXG4gIHNlbGVjdEFsbEhhbmRsZXI6IC0+XG4gICAgaWYgdGhpcy5jaGVja2VkXG4gICAgICAkKCcubGlzdGluZyA+IC5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXQnKS5wcm9wICdjaGVja2VkJywgdHJ1ZVxuICAgIGVsc2VcbiAgICAgICQoJy5saXN0aW5nID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuXG4gIHN0YXRlSGFuZGxlcjogLT5cbiAgICBpZHMgPSBbXVxuXG4gICAgJCgnLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgaWYgZWwuY2hlY2tlZFxuICAgICAgICBpZHMucHVzaCAkKGVsKS5kYXRhICdfaWQnXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cbiAgICAgIGlmIGlkcy5sZW5ndGggPiAwXG4gICAgICAgICQoJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuY29weSA+IC52YWx1ZScpLnRleHQgaWRzLmxlbmd0aFxuICAgICAgICBfLm9mZiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMnXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMnXG4gICAgICBlbHNlXG4gICAgICAgIF8ub24gJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzJ1xuICAgICAgICBfLm9mZiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucydcbiAgICAgIExpc3Rpbmcuc2VsZWN0ZWQgPSBpZHNcblxuICBhY3Rpb25IYW5kbGVyOiAtPlxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICBzd2l0Y2ggdHlwZVxuICAgICAgd2hlbiAnZGVsZXRlJ1xuICAgICAgICBQcm9tcHQuaSBcIkRlbGV0aW5nICN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IGl0ZW1zKHMpXCIsXG4gICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlc2U/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiByZXNwb25zZSBpc250ICdZZXMnXG4gICAgICAgICAgICBMaXN0aW5nLmRlbGV0ZVNlbGVjdGVkKClcbiAgICAgIGVsc2VcbiAgICAgICAgTGlzdGluZy5vdGhlckFjdGlvbnModHlwZSlcblxuICBmaWx0ZXJIYW5kbGVyOiAtPlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgRmlsdGVyLmkgJCh0aGlzKS5kYXRhICdmaWx0ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgZGVsZXRlOiAoaWQsIGNhbGxiYWNrKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH1cIikpXG4gICAgXy5nZXQgXCIvYXBpLyN7TGlzdGluZy5jb250ZW50fS9kZWxldGUvI3tpZH1cIlxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgY2FsbGJhY2sgdHJ1ZVxuICAgIC5mYWlsIC0+XG4gICAgICBjYWxsYmFjayBmYWxzZVxuXG4gIGRlbGV0ZVNlbGVjdGVkOiAoY3Vyc29yPTApIC0+XG5cbiAgICBpZiBMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aCBpcyBjdXJzb3JcbiAgICAgIE5vdGljZS5pICdTdHJ1Y3R1cmUocykgZGVsZXRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgIEBsb2FkKClcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBMaXN0aW5nLmRlbGV0ZSBMaXN0aW5nLnNlbGVjdGVkW2N1cnNvcl0sIChyZXN1bHQpIC0+XG4gICAgICBMaXN0aW5nLmRlbGV0ZVNlbGVjdGVkICsrY3Vyc29yIGlmIHJlc3VsdCBpcyB0cnVlXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKFwiLnBhZ2UuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuXG4gICAgXy5nZXQgXCIvYXBpLyN7QGNvbnRlbnR9XCIsIHZpZXc6IHRydWVcbiAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICBUaW1lLmkoKVxuICAgICAgU3Bpbm5lci5kKClcbiAgICAgICQoJy5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX3N0YXRzID4gLmNvcHkgPiAudmFsdWUnKS50ZXh0IHJlc3BvbnNlLmRhdGEubGVuZ3RoXG4gICAgICAkKFwiLiN7QGNvbnRlbnR9ID4gLmNvbnRlbnQgPiAubGlzdGluZyA+IC5pdGVtc1wiKS5odG1sIHJlc3BvbnNlLnZpZXdcbiIsbnVsbCwiTWUgPVxuXG4gIGxvZ291dDogKGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgJy9hcGkvYXV0aC9sb2dvdXQnXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIGNvbXBsZXRlKClcblxuICBvYXV0aDogKHR5cGUsIHBhcmFtcz17fSwgY29tcGxldGUpIC0+XG5cbiAgICBfLmdldCBcIi9hcGkvYXV0aC8je3R5cGV9XCIsIHBhcmFtc1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZShyZXNwb25zZS5kYXRhLnVyaSlcblxuICBhdXRoZWQ6IChyZXN1bHQpIC0+XG4gICAgXy5nZXQgJy9hcGkvYXV0aCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgcmVzdWx0IHJlc3BvbnNlLmRhdGEudXNlclxuXG4gIGdldDpcbiAgICBjbGllbnRJZDogLT5cbiAgICAgIHJldHVybiBVc2VyLmNsaWVudC5pZFxuIiwiTm90Zm91bmQgPVxuICBpOiAtPlxuICAgICQoJyNsaW5lZXJyb3InKS5ub3ZhY2FuY3lcbiAgICAgICdyZWJsaW5rUHJvYmFiaWxpdHknOiAwLjFcbiAgICAgICdibGlua01pbic6IDAuMlxuICAgICAgJ2JsaW5rTWF4JzogMC42XG4gICAgICAnbG9vcE1pbic6IDhcbiAgICAgICdsb29wTWF4JzogMTBcbiAgICAgICdjb2xvcic6ICcjZmZmZmZmJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4ICNmZmZmZmYnLCAnMCAwIDMwcHggIzAwODAwMCcsICcwIDAgNnB4ICMwMDAwZmYnXVxuXG4gICAgJCgnI2xpbmVjb2RlJykubm92YWNhbmN5XG4gICAgICAnYmxpbmsnOiAxXG4gICAgICAnb2ZmJzogMVxuICAgICAgJ2NvbG9yJzogJ1JlZCdcbiAgICAgICdnbG93JzogWycwIDAgODBweCBSZWQnLCAnMCAwIDMwcHggRmlyZUJyaWNrJywgJzAgMCA2cHggRGFya1JlZCddXG4iLCJOb3RpY2UgPVxuXG4gIHR5cGVzOiBbJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZyddXG5cbiAgZWw6IGZhbHNlXG5cbiAgb246IGZhbHNlXG4gIHByb2dyZXNzOiBmYWxzZVxuICB0aW1lb3V0OiBmYWxzZVxuICBjbG9zZTogdHJ1ZVxuXG4gIGRlZmF1bHQ6XG4gICAgdHlwZTogJ2luZm8nXG4gICAgcHJvZ3Jlc3M6IGZhbHNlXG4gICAgdGltZW91dDogNTAwMFxuXG4gIGk6IChjb3B5LG9wdGlvbnM9e30pIC0+XG5cbiAgICBAb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ge30sIEBkZWZhdWx0XG5cbiAgICBmb3Iga2V5LCBwYXJhbSBvZiBvcHRpb25zXG4gICAgICBAb3B0aW9uc1trZXldID0gcGFyYW1cblxuICAgIEBlbCA9ICQoJy5ub3RpY2UnKSBpZiBAZWwgaXMgZmFsc2VcblxuICAgIGZvciBkdHlwZSBpbiBAdHlwZXNcbiAgICAgIEBlbC5yZW1vdmVDbGFzcyBkdHlwZVxuICAgIEBlbC5hZGRDbGFzcyBAb3B0aW9ucy50eXBlXG4gICAgQGVsLmZpbmQoJy5jb3B5ID4gLm1lc3NhZ2UnKS5odG1sIGNvcHlcblxuICAgIGlmIEBvcHRpb25zLnByb2dyZXNzIGlzbnQgZmFsc2VcbiAgICAgIGlmIEBwcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgICBfLm9uIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgICAgQHByb2dyZXNzID0gdHJ1ZVxuICAgICAgaWYgQGNsb3NlIGlzIHRydWVcbiAgICAgICAgXy5vZmYgQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICAgIEBjbG9zZSA9IGZhbHNlXG4gICAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG4gICAgICAgICwgMTAwXG4gICAgICBlbHNlXG4gICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZSBhbmQgQHByb2dyZXNzIGlzIHRydWVcbiAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCAnMCUnKVxuICAgICAgXy5vZmYgQGVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgICAgQHByb2dyZXNzID0gZmFsc2VcbiAgICAgIF8ub24gQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICBAY2xvc2UgPSB0cnVlXG5cbiAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgIF8ub24gQGVsXG4gICAgICBAaGFuZGxlcnMub24oKVxuICAgICAgQG9uID0gdHJ1ZVxuXG4gICAgaWYgQG9wdGlvbnMudGltZW91dCBpc250IGZhbHNlIGFuZCBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgQHRpbWVvdXQgPSBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEBkKClcbiAgICAgICwgQG9wdGlvbnMudGltZW91dFxuXG4gIGhhbmRsZXJzOlxuICAgIG9uOiAtPlxuICAgICAgJCgnLm5vdGljZScpLm9uICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuICAgIG9mZjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC5jbG9zZSA+IC5pbm5lcicsIE5vdGljZS5kXG5cbiAgZDogLT5cbiAgICBjbGVhclRpbWVvdXQgTm90aWNlLnRpbWVvdXQgaWYgTm90aWNlLnRpbWVvdXQgaXNudCBmYWxzZVxuICAgIE5vdGljZS50aW1lb3V0ID0gZmFsc2VcbiAgICBOb3RpY2UuaGFuZGxlcnMub2ZmKClcbiAgICBfLm9uIE5vdGljZS5lbC5maW5kKCcuY2xvc2UnKVxuICAgIE5vdGljZS5jbG9zZSA9IHRydWVcbiAgICBfLm9mZiBOb3RpY2UuZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgTm90aWNlLnByb2dyZXNzID0gZmFsc2VcbiAgICBfLm9mZiBOb3RpY2UuZWwsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC4yXG4gICAgTm90aWNlLm9uID0gZmFsc2VcbiIsIlByb21wdCA9XG4gIGVsOiB7fVxuICBvcHRpb25zOiB7fVxuICBjYWxsYmFjazogZmFsc2VcbiAgcGFyYW1zOiB7fVxuXG4gIGk6ICh0aXRsZSwgY29weSwgb3B0aW9ucz1bJ09LJ10sIHBhcmFtcywgY2FsbGJhY2spIC0+XG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBmYWxzZVxuICAgIFByb21wdC5wYXJhbXMgPSBmYWxzZVxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ2Z1bmN0aW9uJ1xuICAgIFByb21wdC5jYWxsYmFjayA9IGNhbGxiYWNrIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG5cbiAgICBQcm9tcHQucGFyYW1zID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCdcblxuICAgIFByb21wdC5lbCA9ICQgJy5wcm9tcHQnXG5cbiAgICBQcm9tcHQuZWwuZmluZCAnLnRpdGxlJ1xuICAgICAgLmh0bWwgdGl0bGVcbiAgICBQcm9tcHQuZWwuZmluZCAnLmNvcHknXG4gICAgICAuaHRtbCBjb3B5XG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAndGV4dGFyZWEnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLnRleHRhcmVhIGlzIHRydWVcbiAgICAgIF8ub24gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICAgIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCBwYXJhbXMudmFsdWVcblxuICAgIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCcgYW5kICdjbGlwYm9hcmQnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLmNsaXBib2FyZCBpcyB0cnVlXG4gICAgICBpbnB1dCA9IFByb21wdC5lbC5maW5kICcuaW5wdXQnXG4gICAgICBfLm9uIGlucHV0XG4gICAgICBpbnB1dC5maW5kKCdpbnB1dCcpLnZhbCBwYXJhbXMudmFsdWVcblxuXG4gICAgUHJvbXB0Lm9wdGlvbnMgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbnMgPiAub3B0aW9uJ1xuICAgIF8ub2ZmIFByb21wdC5vcHRpb25zXG4gICAgUHJvbXB0Lm9wdGlvbnMucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmFkZENsYXNzICdhY3RpdmUnXG5cbiAgICBmb3IgbyxpIGluIG9wdGlvbnNcbiAgICAgIG9wdGlvbiA9IFByb21wdC5lbC5maW5kIFwiLm9wdGlvbnMgID4gLm9wdGlvbl8je2krMX1cIlxuICAgICAgXy5vbiBvcHRpb25cbiAgICAgIG9wdGlvbi5odG1sIG9cbiAgICAgICAgLmRhdGEgJ3ZhbHVlJywgb1xuXG4gICAgXy5vbiBQcm9tcHQuZWwsXG4gICAgXy5vbiAnLmJmYWRlJ1xuXG4gICAgUHJvbXB0LmhhbmRsZXJzKClcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmZvY3VzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKGRvY3VtZW50KS5rZXlkb3duIFByb21wdC5rZXlkb3duXG4gICAgUHJvbXB0Lm9wdGlvbnMub24gJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbm5lciA+IC5jYW5jZWwnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2FuY2VsXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5jbGlwYm9hcmQnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2xpcGJvYXJkXG5cblxuICBjbGlwYm9hcmQ6IC0+XG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbnB1dCA+IGlucHV0Jykuc2VsZWN0KClcbiAgICBpZiBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG4gICAgICBOb3RpY2UuaSAnQ29waWVkIHRvIGNsaXBib2FyZCcsIHR5cGU6ICdzdWNjZXNzJ1xuICAgIGVsc2VcbiAgICAgIE5vdGljZS5pICdVbmFibGUgdG8gY2xpcGJvYXJkJywgdHlwZTogJ3dhcm5pbmcnXG5cbiAga2V5ZG93bjogLT5cbiAgICBrID0gZXZlbnQud2hpY2hcbiAgICBrZXlzID0gWzM5LCA5LCAzNywgMTMsIDI3XVxuICAgIHJldHVybiB0cnVlIGlmIGsgbm90IGluIGtleXNcblxuICAgIGN1cnJlbnQgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbi5vbi5hY3RpdmUnXG4gICAgc2hpZnQgPSB3aW5kb3cuZXZlbnQuc2hpZnRLZXlcblxuICAgIGlmIGsgaXMgMzkgb3IgKGsgaXMgOSBhbmQgIXNoaWZ0KVxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgaWYgY3VycmVudC5uZXh0KCkuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBjdXJyZW50Lm5leHQoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgZWxzZVxuICAgICAgICBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbl8xJykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAzNyBvciAoayBpcyA5IGFuZCBzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQucHJldigpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5wcmV2KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24ub24nKS5sYXN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAxM1xuICAgICAgUHJvbXB0LnRyaWdnZXIgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24uYWN0aXZlJykuZGF0YSAndmFsdWUnXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZiBrIGlzIDI3XG4gICAgICBQcm9tcHQudHJpZ2dlcihmYWxzZSlcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gIGNhbmNlbDogLT5cbiAgICBQcm9tcHQudHJpZ2dlciBmYWxzZVxuXG4gIGNsaWNrOiAtPlxuICAgIFByb21wdC50cmlnZ2VyICQodGhpcykuZGF0YSAndmFsdWUnXG5cbiAgdHJpZ2dlcjogKHZhbHVlKSAtPlxuICAgIF8ub2ZmIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgXy5vZmYgUHJvbXB0LmVsLCBvZmZpbmc6IGZhbHNlLCBvZmZ0aW1lOiAwLjJcbiAgICAjXy5vZmYgJy5iZmFkZScsIG9mZmluZzogZmFsc2UsIG9mZml0bWU6IDAuMlxuICAgIF8ub2ZmICcuYmZhZGUnXG4gICAgUHJvbXB0Lm9wdGlvbnMudW5iaW5kICdjbGljaycsIFByb21wdC5jbGlja1xuICAgICQoZG9jdW1lbnQpLnVuYmluZCAna2V5ZG93bicsIFByb21wdC5rZXlkb3duXG4gICAgaWYgUHJvbXB0LnBhcmFtcy50ZXh0YXJlYVxuICAgICAgdmFsID0gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsKClcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gcmVzcG9uc2U6IHZhbHVlLCB2YWw6IHZhbFxuICAgIGVsc2VcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gdmFsdWVcbiIsIlNlbGVjdGl6ZSA9XG5cbiAgY2xpZW50czogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0Q2xpZW50ID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIENsaWVudCBcIlxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PiN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS9jbGllbnRzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RDbGllbnQuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0Q2xpZW50XG5cbiAgc3RydWN0dXJlczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG5cbiAgICBzZWxlY3RTdHJ1Y3R1cmUgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIGEgU3RydWN0dXJlICAgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgb3Blbk9uRm9jdXM6IHRydWVcbiAgICAgIG9uTG9hZDogRW50cnkuc3RydWN0dXJlU3BlY2lmaWVkXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PiN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS9zdHJ1Y3R1cmVzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RTdHJ1Y3R1cmUuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0U3RydWN0dXJlXG5cbiAgdXNlcnM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuICAgIHNlbGVjdFVzZXIgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGx1Z2luczogWydyZW1vdmVfYnV0dG9uJ11cbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgcmVuZGVyOlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdiBzdHlsZT0nbGluZS1oZWlnaHQ6IDMwcHg7Jz4je2l0ZW0ubmFtZX0gKCN7aXRlbS5lbWFpbH0pIDxpbWcgc3JjPScje2l0ZW0ucGljdHVyZX0nIHN0eWxlPSdmbG9hdDogbGVmdDsgd2lkdGg6IDMwcHg7IGhlaWdodDogMzBweDsgbWFyZ2luLXJpZ2h0OiAxMHB4OycgLz48L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvdXNlcnMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZSwgZW1haWw6IGl0ZW0uZW1haWwsIHBpY3R1cmU6IGl0ZW0ucGljdHVyZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdFVzZXIuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0VXNlclxuXG5cbiIsIlxuU3Bpbm5lciA9XG5cbiAgc3RhdGU6IGZhbHNlXG5cbiAgZWw6IHt9XG5cbiAgaTogKGVsLCBvdmVycmlkZSkgLT5cblxuICAgIEBlbCA9ICQoJy5zcGlubmVyJylcblxuICAgIHJlY3QgPSBlbFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgY29vcmRzID1cbiAgICAgIHRvcDogXCIje3JlY3QudG9wICsgJCh3aW5kb3cpLnNjcm9sbFRvcCgpfXB4XCJcbiAgICAgIGxlZnQ6IFwiI3tyZWN0LmxlZnR9cHhcIlxuICAgICAgd2lkdGg6IFwiI3tyZWN0LndpZHRofXB4XCJcbiAgICAgIGhlaWdodDogXCIje3JlY3QuaGVpZ2h0fXB4XCJcblxuICAgIGlmIG92ZXJyaWRlIGlzbnQgdW5kZWZpbmVkXG4gICAgICBmb3Iga2V5LCBjb29yZCBvZiBvdmVycmlkZVxuICAgICAgICBjb29yZHNba2V5XSA9IGNvb3JkXG5cbiAgICBAZWwuY3NzIGNvb3Jkc1xuXG4gICAgXy5vbiBAZWxcbiAgICBAc3RhdGUgPSB0cnVlXG5cbiAgZDogLT5cbiAgICBfLm9mZiBAZWxcbiAgICBAc3RhdGUgPSBmYWxzZVxuIiwiU3RydWN0dXJlID1cblxuICB0ZW1wbGF0ZTogZmFsc2VcbiAgX2lkOiBmYWxzZVxuXG4gIGNsaWVudFNlbGVjdDogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQHRlbXBsYXRlID0gJCgnLm1vZGlmeSA+ICN0ZW1wbGF0ZScpLmh0bWwoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgICBAY2xpZW50U2VsZWN0ID0gU2VsZWN0aXplLmNsaWVudHMgJCgnLnBhZ2Uuc3RydWN0dXJlID4gLm1vZGlmeSA+IC5kZXRhaWwuY2xpZW50ID4gLmlucHV0ID4gc2VsZWN0JyksXG4gICAgICBAY2xpZW50U2VsZWN0aGFuZGxlclxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvc3RydWN0dXJlc1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG4gICAgICBfLm9uICcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnXG4gICAgZWxzZVxuICAgICAgQGVudGl0eUFkZCgpXG5cbiAgICBAY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5mb2N1cygpIGlmIEBfaWQgaXMgZmFsc2VcblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAubW9yZScpLmNsaWNrIEBlbnRpdHlBZGRIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcycpLm9uICdjbGljaycsJy5lbnRpdHkgPiAucmVtb3ZlJywgQGVudGl0eVJlbW92ZUhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGFwJykuY2xpY2sgQHN1Ym1pdEhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnKS5jbGljayBAbmV3RW50cnlIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuY2hlY2tib3gnKS5vbiAnY2xpY2snLCBAY2hlY2tib3hIYW5kbGVyXG5cbiAgY2hlY2tib3hIYW5kbGVyOiAtPlxuICAgIGNiID0gJCh0aGlzKS5maW5kICdpbnB1dCdcbiAgICBpZiBldmVudC50YXJnZXQudHlwZSBpc250ICdjaGVja2JveCdcbiAgICAgIGNiWzBdLmNoZWNrZWQgPSAhY2JbMF0uY2hlY2tlZFxuICAgICAgY2IuY2hhbmdlKClcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLnN0cnVjdHVyZScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcy8nLFxuICAgICAgX2lkOiBAX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy9zdHJ1Y3R1cmVzL25ldycgaWYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPCAxXG4gICAgICBzdHJ1Y3R1cmUgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICAkKCcubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCBzdHJ1Y3R1cmUubmFtZVxuXG4gICAgICBpZiBzdHJ1Y3R1cmUuY2xpZW50QWNjZXNzIGlzIHRydWVcbiAgICAgICAgJCgnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuY2hlY2tib3ggPiBpbnB1dCcpWzBdLmNoZWNrZWQgPSB0cnVlXG5cbiAgICAgIGZvciBpLCBlbnRpdHkgb2Ygc3RydWN0dXJlLmVudGl0aWVzXG4gICAgICAgIFN0cnVjdHVyZS5lbnRpdHlBZGQgZmFsc2UsIGVudGl0eVxuXG4gICAgICBTdHJ1Y3R1cmUuY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5hZGRPcHRpb25cbiAgICAgICAgaWQ6IHN0cnVjdHVyZS5jbGllbnQuaWQsIG5hbWU6IHN0cnVjdHVyZS5jbGllbnQubmFtZVxuICAgICAgU3RydWN0dXJlLmNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuc2V0VmFsdWUgc3RydWN0dXJlLmNsaWVudC5pZFxuXG5cblxuICBlbnRpdHlBZGRIYW5kbGVyOiAtPlxuICAgIFN0cnVjdHVyZS5lbnRpdHlBZGQodHJ1ZSlcblxuICBlbnRpdHlSZW1vdmVIYW5kbGVyOiAtPlxuICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlKClcblxuICBlbnRpdHlBZGQ6IChmb2N1cz1mYWxzZSwgZW50aXR5PWZhbHNlKSAtPlxuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5JykuYXBwZW5kIEB0ZW1wbGF0ZVxuXG4gICAgaWYgZW50aXR5IGlzbnQgZmFsc2VcbiAgICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IGlucHV0JykudmFsKGVudGl0eS5uYW1lKVxuICAgICAgQHNlbGVjdGl6ZSAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5Omxhc3QtY2hpbGQnKS5maW5kKCcuaW5wdXQgPiBzZWxlY3QnKSwgZW50aXR5LnR5cGVcbiAgICBlbHNlXG4gICAgICBAc2VsZWN0aXplICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpXG5cbiAgICBpZiAgZm9jdXNcbiAgICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHkgPiAuaW5wdXQuc2VsZWN0aXplLWlucHV0IGlucHV0JykubGFzdCgpLmZvY3VzKClcblxuICBzZWxlY3RpemU6IChlbCwgdmFsdWU9ZmFsc2UpIC0+XG4gICAgaXplZCA9IGVsLnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiVHlwZVwiXG5cbiAgICBpemVkWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSB2YWx1ZVxuXG4gIHN1Ym1pdEhhbmRsZXI6IC0+XG5cbiAgICBzdHJ1Y3R1cmUgPSB7fVxuICAgIHN0cnVjdHVyZS5lbnRpdGllcyA9IHt9XG4gICAgc3RydWN0dXJlLmNsaWVudCA9ICQoJy5tb2RpZnkgPiAuY2xpZW50ID4gLmlucHV0ID4gc2VsZWN0JykudmFsKClcbiAgICBzdHJ1Y3R1cmUubmFtZSA9ICQoJy5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICBzdHJ1Y3R1cmUuY2xpZW50QWNjZXNzID0gJCgnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuY2hlY2tib3ggPiBpbnB1dCcpWzBdLmNoZWNrZWRcblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHknKS5lYWNoIChpLCBlbCkgLT5cblxuICAgICAgbmFtZSA9ICQoZWwpLmZpbmQoJy5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICAgIHR5cGUgPSAkKGVsKS5maW5kKCcuaW5wdXQgPiBzZWxlY3QnKS52YWwoKVxuXG4gICAgICBzdHJ1Y3R1cmUuZW50aXRpZXNbbmFtZV0gPVxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIHR5cGU6IHR5cGVcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuXG4gICAgICBjb25zb2xlLmxvZyBzdHJ1Y3R1cmUuZW50aXRpZXNcbiAgICAgIFN0cnVjdHVyZS5tb2RpZnkgc3RydWN0dXJlXG5cbiAgbmV3RW50cnlIYW5kbGVyOiAtPlxuICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9lbnRyaWVzL25ldyNzdHJ1Y3R1cmU9I3tTdHJ1Y3R1cmUuX2lkfVwiXG5cbiAgbW9kaWZ5OiAoc3RydWN0dXJlKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLnN0cnVjdHVyZScpKVxuXG4gICAgY2FsbCA9ICcvYXBpL3N0cnVjdHVyZXMvYWRkJ1xuICAgIGlmIFN0cnVjdHVyZS5faWQgaXNudCBmYWxzZVxuICAgICAgY2FsbCA9IFwiL2FwaS9zdHJ1Y3R1cmVzL3VwZGF0ZS8je1N0cnVjdHVyZS5faWR9XCJcblxuICAgIF8uZ2V0IGNhbGwsIHN0cnVjdHVyZVxuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgJ3N1Y2Nlc3MnXG4gICAgICAgIF8ub24gJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YSdcbiAgICAgICAgaWYgU3RydWN0dXJlLl9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL3N0cnVjdHVyZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBTdHJ1Y3R1cmUuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiIsIlN0cnVjdHVyZXMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnc3RydWN0dXJlcydcblxuIiwiVXNlcnMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAndXNlcnMnXG4iXX0=
