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
        size: {
          width: 100,
          height: 100
        },
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
    return Listing.i('clients');
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
      var name;
      name = $(this).parent().parent().data('name');
      Spinner.i($(".entity_name_" + name));
      return Entities.crops[name].getCroppedCanvas().toBlob(function(blob) {
        return Client.imageUpload(blob, function(result) {
          Spinner.d();
          return Entities.images[name] = result.data.url;
        });
      }, 'image/jpeg');
    }
  },
  loadCropper: function(file, el) {
    var name, reader;
    name = el.data('name');
    reader = new FileReader();
    reader.onloadend = function() {
      return Entities.cropper(reader.result, el);
    };
    return reader.readAsDataURL(file);
  },
  cropper: function(url, el) {
    var name;
    name = el.data('name');
    if (Entities.crops[name] !== void 0) {
      Entities.crops[name].destroy();
      Entities.crops[name] = false;
    }
    el.find('.cropper').attr('src', url);
    Entities.crops[name] = new Cropper(el.find('.cropper')[0], {
      minContainerHeight: 300,
      minCanvasHeight: 300,
      responsive: true,
      preview: "div.entity_name_" + name + " > div.input-image > div.picture",
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
    entities = [];
    return $('.page.entry > .modify > .body > .entity').each(function(i, el) {
      var blog, entity_name, type, value;
      entity_name = $(el).find('.label').html();
      type = $(el).data('type');
      switch (type) {
        case 'Text':
          value = $(el).find('input').val();
          break;
        case 'Date':
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
      return entities.push({
        name: entity_name,
        type: type,
        value: value
      });
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
          window.history.pushState({}, '', "/structures/" + response.data._id);
        }
        return Entry._id = response.data._id;
      });
    });
  },

  /*
  clientSelectHandler: (e) ->
    client_id = $(e.currentTarget).val()
    return false if client_id.length isnt 24
    Entry.addSelectClientId = client_id
    Entry.selectStructure[0].selectize.enable()
    Entry.selectStructure[0].selectize.clearOptions()
   */
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
    var body, entity, entityEl, html, i, j, len, tabindex;
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
    for (i = j = 0, len = entities.length; j < len; i = ++j) {
      entity = entities[i];
      html = $(".page.entry > #template > .entity_" + entity.type).clone();
      html.data('name', entity.name);
      html.addClass("entity_name_" + entity.name);
      if (entity.value) {
        switch (entity.type) {
          case 'Text':
          case 'Tags':
          case 'Date':
            html.find('input').val(entity.value);
        }
      }
      html.find('input,select,textarea').attr('tabindex', tabindex++);
      body.append(html);
      entityEl = $(".page.entry > .modify > .body > .entity_name_" + entity.name);
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
      return _.on(".menu > .options > .option_" + Page + ", .menu");
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
    return Notice.i('Login Successful', 'success');
  },
  login: function(user) {
    window.User = user;
    $('header > .inner > .me > .picture > .image').css('background-image', "url(" + User.picture + ")");
    _.off('.me > .profile');
    _.off('.me > .oauths');
    _.on('.me > .picture');
    if (User.client !== void 0) {
      return $('header > .inner > .client > .name').html(User.client.name);
    }
  },
  loginCheck: function() {
    Spinner.i($('header'));
    return Me.authed(function(result) {
      if (result !== false) {
        Global.login(result);
      }
      if (Global.init !== false && result !== false) {
        Spinner.d();
        window[Global.init].i();
      } else {
        Spinner.d();
      }
      if (location.pathname === '/' && result !== false) {
        location.href = '/dashboard';
      }
      if (result === false && location.pathname !== '/') {
        return location.href = '/';
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

var Listing;

Listing = {
  content: false,
  selected: [],
  selectedCursor: 0,
  i: function(content) {
    this.content = content;
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
  oauth: function(type, complete) {
    return _.get("/api/auth/" + type).done(function(response) {
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
    structure.entities = [];
    structure.client = $('.modify > .client > .input > select').val();
    structure.name = $('.modify > .name > .input > input').val();
    return $('.modify > .entities > .body > .entity').each(function(i, el) {
      var jinput, jselect;
      jinput = $(el).find('.input > input');
      jselect = $(el).find('.input > select');
      return structure.entities.push({
        name: jinput.val(),
        type: jselect.val()
      });
    }).promise().done(function() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJnbG9iYWwuY29mZmVlIiwiaW5kZXguY29mZmVlIiwibGlzdGluZy5jb2ZmZWUiLCJtYWluLmpzIiwibWUuY29mZmVlIiwibm90Zm91bmQuY29mZmVlIiwibm90aWNlLmNvZmZlZSIsInByb21wdC5jb2ZmZWUiLCJzZWxlY3RpemUuY29mZmVlIiwic3Bpbm5lci5jb2ZmZWUiLCJzdHJ1Y3R1cmUuY29mZmVlIiwic3RydWN0dXJlcy5jb2ZmZWUiLCJ1c2Vycy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFBO0VBQUE7O0FBQUEsQ0FBQSxHQUVFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxJQUFDLENBQUEsT0FBRCxHQUFXLFdBQUEsQ0FBWSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxJQUFiLENBQVosRUFBNkIsR0FBN0I7RUFEVixDQUFIO0VBR0EsQ0FBQSxFQUNFO0lBQUEsTUFBQSxFQUFRLEtBQVI7SUFDQSxPQUFBLEVBQVMsQ0FEVDtHQUpGO0VBT0EsSUFBQSxFQUFNLFNBQUMsRUFBRCxFQUFLLE1BQUwsRUFBbUIsR0FBbkI7O01BQUssU0FBTzs7O01BQU8sTUFBSTs7SUFFM0IsSUFBRyxDQUFBLENBQUEsRUFBQSxZQUFrQixNQUFsQixDQUFIO01BQ0UsRUFBQSxHQUFLLENBQUEsQ0FBRSxFQUFGLEVBRFA7O0lBR0EsSUFBRyxNQUFBLEtBQVksS0FBZjtNQUNFLEVBQUUsQ0FBQyxXQUFILENBQWUsTUFBZixFQURGOztJQUdBLElBQUcsR0FBQSxLQUFTLEtBQVo7TUFDRSxFQUFFLENBQUMsUUFBSCxDQUFZLEdBQVosRUFERjs7QUFHQSxXQUFPO0VB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QVNnQixTQUFBO2FBRWQsU0FBUyxDQUFDLE1BQVYsQ0FBaUIsU0FBakI7SUFGYyxDQVRoQjtFQVBhLENBM0VmO0VBK0ZBLE1BQUEsRUFBUSxTQUFDLFNBQUQ7QUFFTixRQUFBO0lBQUEsT0FBTyxDQUFDLENBQVIsQ0FBVSxDQUFBLENBQUUsaUJBQUYsQ0FBVjtJQUVBLElBQUEsR0FBTztJQUNQLElBQUcsU0FBUyxDQUFDLEdBQVYsS0FBbUIsS0FBdEI7TUFDRSxJQUFBLEdBQU8seUJBQUEsR0FBMEIsU0FBUyxDQUFDLElBRDdDOztXQUdBLENBQUMsQ0FBQyxHQUFGLENBQU0sSUFBTixFQUFZLFNBQVosQ0FDRSxDQUFDLE1BREgsQ0FDVSxTQUFBO2FBQ04sT0FBTyxDQUFDLENBQVIsQ0FBQTtJQURNLENBRFYsQ0FHRSxDQUFDLElBSEgsQ0FHUSxTQUFDLFFBQUQ7TUFDSixNQUFNLENBQUMsQ0FBUCxDQUFTLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBdkIsRUFBK0IsU0FBL0I7TUFDQSxJQUFHLFNBQVMsQ0FBQyxHQUFWLEtBQWlCLEtBQXBCO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFmLENBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLEVBQWlDLGNBQUEsR0FBZSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQTlELEVBREY7O2FBRUEsU0FBUyxDQUFDLEdBQVYsR0FBZ0IsUUFBUSxDQUFDLElBQUksQ0FBQztJQUoxQixDQUhSO0VBUk0sQ0EvRlI7OztBQ0ZGLElBQUE7O0FBQUEsVUFBQSxHQUNFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxPQUFPLENBQUMsQ0FBUixDQUFVLFlBQVY7RUFEQyxDQUFIOzs7QUNERixJQUFBOztBQUFBLEtBQUEsR0FDRTtFQUFBLENBQUEsRUFBRyxTQUFBO1dBQ0QsT0FBTyxDQUFDLENBQVIsQ0FBVSxPQUFWO0VBREMsQ0FBSCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICBmaXQ6IChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSAtPlxuICAgIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyBzcmNXaWR0aCwgbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0KVxuICAgIHdpZHRoOiBzcmNXaWR0aCpyYXRpbywgaGVpZ2h0OiBzcmNIZWlnaHQqcmF0aW9cblxuICBqaW5pdDogLT5cbiAgICAkLmFqYXhTZXR1cFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiXG5cbiAgcGF0Y2g6ICh1cmwsIGRhdGEpIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAganBhdGNoID0gJC5hamF4XG4gICAgICB1cmw6IHVybFxuICAgICAgZGF0YTogZGF0YVxuICAgICAgdHlwZTogJ1BBVENIJ1xuXG4gICAganBhdGNoLmZhaWwgKHJlc3BvbnNlKSAtPlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBhdGNoXG5cbiAgZ2V0OiAoYXJncy4uLikgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqZ2V0ID0gJC5nZXQgYXJncy4uLlxuXG4gICAgamdldC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAgamdldC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpnZXRcblxuICBwb3N0OiAoYXJncy4uLikgLT5cblxuICAgIGpwb3N0ID0gJC5wb3N0IGFyZ3MuLi5cblxuICAgIGpwb3N0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqcG9zdC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwb3N0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuXG4gICAgZXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04/LmVycm9ycz9bMF1cbiAgICBpZiBlcnJvciBpcyB1bmRlZmluZWRcbiAgICAgIHJldHVybiBQcm9tcHQuaSByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHRcblxuICAgIHB1ZyA9IGVycm9yLm1lc3NhZ2UubWF0Y2ggL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvXG4gICAgaWYgcHVnIGlzbnQgbnVsbFxuICAgICAgZXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UucmVwbGFjZSAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS8sICcnXG4gICAgICBlcnJvci5maWxlID0gcHVnWzFdXG4gICAgICBlcnJvci5saW5lID0gcHVnWzJdXG5cbiAgICBmaWxlID0gQGVuY29kZSBcIiN7ZXJyb3IuZmlsZX1cIlxuXG4gICAgc3dpdGNoIGNvbmZpZy5hcHAuZWRpdG9yXG4gICAgICB3aGVuICdtYWN2aW0nIHRoZW4gZWRpdG9yID0gJ212aW06Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnc3VibGltZScgdGhlbiBlZGl0b3IgPSAnc3VibDovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdlbWFjcycgdGhlbiBlZGl0b3IgPSAnZW1hY3M6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAndGV4dG1hdGUnIHRoZW4gZWRpdG9yID0gJ3RleHRtYXRlOi8vb3Blbi8/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdwaHBzdG9ybScgdGhlbiBlZGl0b3IgPSAncGhwc3Rvcm06Ly9vcGVuP2ZpbGU9J1xuXG4gICAgaWYgZXJyb3IuZmlsZSBpc250IG51bGxcbiAgICAgIGJvZHkgPSBcIlwiXCJcbiAgICAgICAgPHByZT4je2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICAgIDxhIGhyZWY9XCIje2VkaXRvcn0je2ZpbGV9JmxpbmU9I3tlcnJvci5saW5lfVwiPjxiPiN7ZXJyb3IuZmlsZX06I3tlcnJvci5saW5lfTwvYj48L2E+XG4gICAgICBcIlwiXCJcbiAgICBlbHNlXG4gICAgICBib2R5ID0gZXJyb3IubWVzc2FnZVxuXG4gICAgUHJvbXB0LmkgZXJyb3IudHlwZSwgYm9keSwgWydPSyddXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cDovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuICBtZXRob2RzOiAob2JqKSAtPlxuICAgIHJlcyA9IFtdXG4gICAgZm9yIGksbSBvZiBvYmpcbiAgICAgIGlmIHR5cGVvZiBtIGlzICdmdW5jdGlvbidcbiAgICAgICAgcmVzLnB1c2ggbVxuICAgIHJldHVybiByZXNcblxuXy5pKClcbiIsIlRpbWUgPVxuICBpbnRlcnZhbDogZmFsc2VcbiAgZ2FwOiAxMDAwXG5cbiAgaTogLT5cbiAgICBAaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChAc2NyYXBlLCBAZ2FhKSBpZiBAaW50ZXJ2YWwgaXMgZmFsc2VcbiAgICBAc2NyYXBlKClcblxuICBzY3JhcGU6IC0+XG4gICAgJCgndGltZScpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgamVsID0gJCBlbFxuICAgICAgamVsLmh0bWwgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5mcm9tTm93KClcbiAgICAgIGplbC5hdHRyICdhcmlhLWxhYmVsJywgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5jYWxlbmRhcigpXG4iLCJDbGllbnQgPVxuXG4gIHNlbGVjdFVzZXI6IGZhbHNlXG4gIF9pZDogZmFsc2VcbiAgY3JvcDogZmFsc2VcbiAgcHJvZmlsZTogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQGhhbmRsZXJzKClcbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9jbGllbnRzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcblxuICAgIEBzZWxlY3RVc2VyID0gU2VsZWN0aXplLnVzZXJzICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JyksIEBzZWxlY3RVc2VySGFuZGxlciwgbWU6IGZhbHNlXG5cbiAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQgPiBpbnB1dCcpLmZvY3VzKClcbiBcbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLnN1Ym1pdCcpLmNsaWNrIEBtb2RpZnlIYW5kbGVyXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ292ZXInLCBAZHJhZ292ZXJcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2xlYXZlJywgQGRyYWdsZWF2ZVxuICAgICQoZG9jdW1lbnQpLm9uICdkcmFnZW50ZXIgZHJhZ292ZXInLCBAY2FuY2VsXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJvcCBkcmFnZHJvcCcsIEBkcm9wXG5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhJykub24gJ2NsaWNrJywgQGNob29zZUZpbGVcbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dDpmaWxlJykuY2hhbmdlIEBjaGFuZ2VcblxuICBjYW5jZWw6IC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gIGRyYWdvdmVyOiAtPlxuICAgIF8ub24gJy5pbnB1dC1pbWFnZSdcblxuICBkcmFnbGVhdmU6IC0+XG4gICAgXy5vZmYgJy5pbnB1dC1pbWFnZSdcblxuICBkcm9wOiAoZSkgLT5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBfLm9mZiAnLmlucHV0LWltYWdlJ1xuXG4gICAgaWYgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlciBhbmQgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGhcbiAgICAgIGZpbGVzID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgQ2xpZW50LmNyb3BwaWUgZmlsZXNbMF1cblxuICBjaGFuZ2U6IC0+XG4gICAgaWYgJCh0aGlzKVswXS5maWxlc1xuICAgICAgZmlsZXMgPSAkKHRoaXMpWzBdLmZpbGVzXG4gICAgQ2xpZW50LmNyb3BwaWUgZmlsZXNbMF1cblxuICBjaG9vc2VGaWxlOiAtPlxuICAgICQoJy5pbnB1dC1pbWFnZSA+IGlucHV0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgY3JvcHBpZTogKGZpbGUpIC0+XG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAtPlxuXG4gICAgICBpZiBDbGllbnQuY3JvcCBpc250IGZhbHNlXG4gICAgICAgIENsaWVudC5jcm9wLmNyb3BwaWUgJ2Rlc3Ryb3knXG4gICAgICAgIENsaWVudC5jcm9wID0gZmFsc2VcblxuICAgICAgQ2xpZW50LmNyb3AgPSAkKCcuaW5wdXQtaW1hZ2UgPiAuY3JvcHBpZScpLmNyb3BwaWVcbiAgICAgICAgdXJsOiByZWFkZXIucmVzdWx0XG4gICAgICAgIGVuZm9yY2VCb3VuZGFyeTogZmFsc2VcbiAgICAgICAgdmlld3BvcnQ6XG4gICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgIGhlaWdodDogMjAwXG4gICAgICAgIGJvdW5kYXJ5OlxuICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICBoZWlnaHQ6IDMwMFxuXG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwgZmlsZVxuXG4gIHNlbGVjdFVzZXJIYW5kbGVyOiAtPlxuXG4gIG1vZGlmeUhhbmRsZXI6IC0+XG5cbiAgICBpZiBDbGllbnQuY3JvcCBpc250IGZhbHNlXG4gICAgICBDbGllbnQuY3JvcC5jcm9wcGllICdyZXN1bHQnLFxuICAgICAgICB0eXBlOiAnY2FudmFzJ1xuICAgICAgICBzaXplOlxuICAgICAgICAgIHdpZHRoOiAxMDBcbiAgICAgICAgICBoZWlnaHQ6IDEwMFxuICAgICAgICBmb3JtYXQ6ICdqcGVnJ1xuICAgICAgLnRoZW4gKHJlc3BvbnNlKSAtPlxuICAgICAgICBDbGllbnQuaW1hZ2VVcGxvYWQgQ2xpZW50LmRhdGFVUkl0b0Jsb2IocmVzcG9uc2UpLCAtPlxuICAgICAgICAgIENsaWVudC5tb2RpZnkoKVxuICAgIGVsc2VcbiAgICAgIENsaWVudC5tb2RpZnkoKVxuXG4gIG1vZGlmeTogLT5cblxuICAgIG5hbWUgPSAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtbmFtZSA+IGlucHV0JykudmFsKClcbiAgICB1c2VycyA9ICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JykudmFsKCkuc3BsaXQgJywnXG5cbiAgICBjYWxsID0gJy9hcGkvY2xpZW50cy9hZGQnXG4gICAgaWYgQ2xpZW50Ll9pZCBpc250IGZhbHNlXG4gICAgICBjYWxsID0gXCIvYXBpL2NsaWVudHMvdXBkYXRlLyN7Q2xpZW50Ll9pZH1cIlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudCcpKVxuXG4gICAgXy5nZXQgY2FsbCwgbmFtZTogbmFtZSwgdXNlcnM6IHVzZXJzLCBwcm9maWxlOiBDbGllbnQucHJvZmlsZVxuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIENsaWVudC5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9jbGllbnRzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgQ2xpZW50Ll9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4gICAgICAgIGlmIENsaWVudC5wcm9maWxlXG4gICAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tDbGllbnQucHJvZmlsZX0nKVwiXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnQnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2NsaWVudHMvJyxcbiAgICAgIF9pZDogQF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvY2xpZW50cy9uZXcnIGlmIHJlc3BvbnNlLmRhdGEubGVuZ3RoIDwgMVxuICAgICAgY2xpZW50ID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LW5hbWUgPiBpbnB1dCcpLnZhbCBjbGllbnQubmFtZVxuICAgICAgaWYgY2xpZW50LnByb2ZpbGVcbiAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tjbGllbnQucHJvZmlsZX0nKVwiXG4gICAgICAgIENsaWVudC5wcm9maWxlID0gY2xpZW50LnByb2ZpbGVcbiAgICAgIGZvciBpbmRleCwgdXNlciBvZiBjbGllbnQudXNlcnNcbiAgICAgICAgaWYgdXNlci5pZCBpc250IFVzZXIuX2lkXG4gICAgICAgICAgQ2xpZW50LnNlbGVjdFVzZXJbMF0uc2VsZWN0aXplLmFkZE9wdGlvbiBpZDogdXNlci5pZCwgbmFtZTogXCIje3VzZXIubmFtZX0gKCN7dXNlci5lbWFpbH0pXCJcbiAgICAgICAgICBDbGllbnQuc2VsZWN0VXNlclswXS5zZWxlY3RpemUuYWRkSXRlbSB1c2VyLmlkXG5cblxuICBkYXRhVVJJdG9CbG9iOiAoZGF0YVVSSSkgLT5cbiAgICBieXRlU3RyaW5nID0gdW5kZWZpbmVkXG4gICAgaWYgZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDBcbiAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSlcbiAgICBlbHNlXG4gICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKVxuICAgICMgc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdXG4gICAgIyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aClcbiAgICBpID0gMFxuICAgIHdoaWxlIGkgPCBieXRlU3RyaW5nLmxlbmd0aFxuICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSlcbiAgICAgIGkrK1xuICAgIG5ldyBCbG9iKFsgaWEgXSwgdHlwZTogbWltZVN0cmluZylcbiAgICAgICAgXG4gIGltYWdlVXBsb2FkOiAoYmxvYiwgY2FsbGJhY2spIC0+XG5cbiAgICBmZCA9IG5ldyBGb3JtRGF0YSgpXG4gICAgZmQuYXBwZW5kICdmaWxlJywgYmxvYlxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgIE5vdGljZS5pICdGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBDbGllbnQucHJvZmlsZSA9IHJlc3VsdC5kYXRhLnVybFxuICAgICAgICBjYWxsYmFjayhyZXN1bHQpXG5cblxuIiwiQ2xpZW50cyA9XG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICdjbGllbnRzJ1xuIiwiY29uZmlnID0ge1widmlld1wiOntcInBhdGhzXCI6W1wiL1VzZXJzL2svYmFzYWwvcmVzb3VyY2VzL3ZpZXdzXCJdLFwiY29tcGlsZWRcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL3ZpZXdzXCJ9LFwiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcIndoaXRlMlwiOlwiI2Y4ZjhmOFwiLFwid2hpdGUzXCI6XCIjRjRGNEY0XCIsXCJncmV5MVwiOlwiI2U1ZTVlNVwiLFwiZ3JleTJcIjpcIiNmNWY1ZjVcIixcImdyZXkzXCI6XCIjZDBkMGQwXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImJsYWNrMlwiOlwiIzI4MjgyOFwiLFwiYmxhY2szXCI6XCIjMzMzMzMzXCIsXCJyZWQxXCI6XCIjQzgyMTJCXCIsXCJjeWFuMVwiOlwiIzVGQTc5M1wiLFwieWVsbG93MVwiOlwiI0Y2QkI0NVwiLFwib3JhbmdlMVwiOlwiI0Y2OEY2MlwiLFwic2tpbjFcIjpcIiNGM0REQTNcIixcImdyZWVuMVwiOlwiIzViYTU0MVwiLFwiZ3JlZW4yXCI6XCIjODhkOTZkXCIsXCJncmVlbjNcIjpcIiM3N2QzNThcIixcImJsdWUxXCI6XCIjMWRhN2VlXCIsXCJibHVlMlwiOlwiIzAwNzNiYlwiLFwiZ29vZ2xlX2JsdWVcIjpcIiM0Mjg1ZjRcIixcImdvb2dsZV9ncmVlblwiOlwiIzM0YTg1M1wiLFwiZ29vZ2xlX3llbGxvd1wiOlwiI2ZiYmMwNVwiLFwiZ29vZ2xlX3JlZFwiOlwiI2VhNDMzNVwiLFwiZ2l0aHViX2JsdWVcIjpcIiMwRDI2MzZcIixcImZhY2Vib29rX2JsdWVcIjpcIiM0ODY3QUFcIixcImluc3RhZ3JhbV9vclwiOlwiI0ZGNzgwNFwiLFwidHdpdHRlcl9ibHVlXCI6XCIjMDBBQ0VEXCJ9LFwiZm9udFwiOntcIjQwNFwiOntcImZvbnQtZmFtaWx5XCI6XCJNb25vdG9uXCIsXCJmb250LXNpemVcIjpcIjc1cHhcIn0sXCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImgxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIn0sXCJoM2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJjMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTZweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifSxcImMxdGJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI0MDBcIn0sXCJjMXNiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNjAwXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMXB4XCJ9LFwiYzJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJjMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI1MDBcIn19LFwibWV0YVwiOntcInRpdGxlXCI6XCJiYXNhbFwiLFwidXJsXCI6XCJodHRwOi8vYmFzYWwuZGV2L1wiLFwiZGVzY3JpcHRpb25cIjpcIm1pbmltYWwgY29udGVudCBtYW5hZ2VtZW50XCIsXCJrZXl3b3Jkc1wiOlwiY21zXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovYmFzYWxcIn0sXCJkZWJ1Z2JhclwiOntcImVuYWJsZWRcIjpudWxsLFwic3RvcmFnZVwiOntcImVuYWJsZWRcIjp0cnVlLFwiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2RlYnVnYmFyXCIsXCJjb25uZWN0aW9uXCI6bnVsbCxcInByb3ZpZGVyXCI6XCJcIn0sXCJpbmNsdWRlX3ZlbmRvcnNcIjp0cnVlLFwiY2FwdHVyZV9hamF4XCI6dHJ1ZSxcImNsb2Nrd29ya1wiOmZhbHNlLFwiY29sbGVjdG9yc1wiOntcInBocGluZm9cIjp0cnVlLFwibWVzc2FnZXNcIjp0cnVlLFwidGltZVwiOnRydWUsXCJtZW1vcnlcIjp0cnVlLFwiZXhjZXB0aW9uc1wiOnRydWUsXCJsb2dcIjp0cnVlLFwiZGJcIjp0cnVlLFwidmlld3NcIjp0cnVlLFwicm91dGVcIjp0cnVlLFwibGFyYXZlbFwiOmZhbHNlLFwiZXZlbnRzXCI6ZmFsc2UsXCJkZWZhdWx0X3JlcXVlc3RcIjpmYWxzZSxcInN5bWZvbnlfcmVxdWVzdFwiOnRydWUsXCJtYWlsXCI6dHJ1ZSxcImxvZ3NcIjpmYWxzZSxcImZpbGVzXCI6ZmFsc2UsXCJjb25maWdcIjpmYWxzZSxcImF1dGhcIjpmYWxzZSxcImdhdGVcIjpmYWxzZSxcInNlc3Npb25cIjp0cnVlfSxcIm9wdGlvbnNcIjp7XCJhdXRoXCI6e1wic2hvd19uYW1lXCI6ZmFsc2V9LFwiZGJcIjp7XCJ3aXRoX3BhcmFtc1wiOnRydWUsXCJ0aW1lbGluZVwiOmZhbHNlLFwiYmFja3RyYWNlXCI6ZmFsc2UsXCJleHBsYWluXCI6e1wiZW5hYmxlZFwiOmZhbHNlLFwidHlwZXNcIjpbXCJTRUxFQ1RcIl19LFwiaGludHNcIjp0cnVlfSxcIm1haWxcIjp7XCJmdWxsX2xvZ1wiOmZhbHNlfSxcInZpZXdzXCI6e1wiZGF0YVwiOmZhbHNlfSxcInJvdXRlXCI6e1wibGFiZWxcIjp0cnVlfSxcImxvZ3NcIjp7XCJmaWxlXCI6bnVsbH19LFwiaW5qZWN0XCI6dHJ1ZSxcInJvdXRlX3ByZWZpeFwiOlwiX2RlYnVnYmFyXCJ9LFwiYXBwXCI6e1wiZWRpdG9yXCI6XCJtYWN2aW1cIn0sXCJjYWNoZVwiOntcImRlZmF1bHRcIjpcImFycmF5XCIsXCJzdG9yZXNcIjp7XCJhcGNcIjp7XCJkcml2ZXJcIjpcImFwY1wifSxcImFycmF5XCI6e1wiZHJpdmVyXCI6XCJhcnJheVwifSxcImRhdGFiYXNlXCI6e1wiZHJpdmVyXCI6XCJkYXRhYmFzZVwiLFwidGFibGVcIjpcImNhY2hlXCIsXCJjb25uZWN0aW9uXCI6bnVsbH0sXCJmaWxlXCI6e1wiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay9jYWNoZVwifSxcIm1lbWNhY2hlZFwiOntcImRyaXZlclwiOlwibWVtY2FjaGVkXCIsXCJzZXJ2ZXJzXCI6W3tcImhvc3RcIjpcIjEyNy4wLjAuMVwiLFwicG9ydFwiOjExMjExLFwid2VpZ2h0XCI6MTAwfV19LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCJ9fSxcInByZWZpeFwiOlwibGFyYXZlbFwifSxcInF1ZXVlXCI6e1wiZGVmYXVsdFwiOlwiYXJyYXlcIixcImNvbm5lY3Rpb25zXCI6e1wic3luY1wiOntcImRyaXZlclwiOlwic3luY1wifSxcImRhdGFiYXNlXCI6e1wiZHJpdmVyXCI6XCJkYXRhYmFzZVwiLFwidGFibGVcIjpcImpvYnNcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJleHBpcmVcIjo2MH0sXCJiZWFuc3RhbGtkXCI6e1wiZHJpdmVyXCI6XCJiZWFuc3RhbGtkXCIsXCJob3N0XCI6XCJsb2NhbGhvc3RcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJ0dHJcIjo2MH0sXCJzcXNcIjp7XCJkcml2ZXJcIjpcInNxc1wiLFwia2V5XCI6XCJ5b3VyLXB1YmxpYy1rZXlcIixcInNlY3JldFwiOlwieW91ci1zZWNyZXQta2V5XCIsXCJxdWV1ZVwiOlwieW91ci1xdWV1ZS11cmxcIixcInJlZ2lvblwiOlwidXMtZWFzdC0xXCJ9LFwiaXJvblwiOntcImRyaXZlclwiOlwiaXJvblwiLFwiaG9zdFwiOlwibXEtYXdzLXVzLWVhc3QtMS5pcm9uLmlvXCIsXCJ0b2tlblwiOlwieW91ci10b2tlblwiLFwicHJvamVjdFwiOlwieW91ci1wcm9qZWN0LWlkXCIsXCJxdWV1ZVwiOlwieW91ci1xdWV1ZS1uYW1lXCIsXCJlbmNyeXB0XCI6dHJ1ZX0sXCJyZWRpc1wiOntcImRyaXZlclwiOlwicmVkaXNcIixcImNvbm5lY3Rpb25cIjpcImRlZmF1bHRcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJleHBpcmVcIjo2MH19LFwiZmFpbGVkXCI6e1wiZGF0YWJhc2VcIjpcIm1vbmdvZGJcIixcInRhYmxlXCI6XCJmYWlsZWRfam9ic1wifX19OyIsIkRhc2hib2FyZCA9XG5cbiAgZGF0YTp7fVxuXG4gIGk6IC0+XG4gICAgQGdldGRhdGEgPT5cbiAgICAgIEBwb3B1bGF0ZSgpXG5cbiAgcG9wdWxhdGU6IC0+XG4gICAgJCgnLmRhc2hib2FyZCAudmFsdWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgICQoZWwpLmh0bWwgQGRvdHN0b3ZhbHVlICQoZWwpLmRhdGEgJ3ZhbHVlJ1xuXG4gIGdldGRhdGE6IChjb21wbGV0ZSkgLT5cblxuICAgIGdldHMgPSBbJ3VzZXJzJywnY2xpZW50cycsICdzdHJ1Y3R1cmVzJywgJ2VudHJpZXMnXVxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5kYXNoYm9hcmQnKSlcblxuICAgICQoZ2V0cykuZWFjaCAoaW5kZXgsIGdldCkgPT5cbiAgICAgIF8uZ2V0IFwiL2FwaS8je2dldH1cIlxuICAgICAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICAgICAgQGRhdGFbZ2V0XSA9IHJlc3BvbnNlXG4gICAgICAgICAgaWYgT2JqZWN0LmtleXMoQGRhdGEpLmxlbmd0aCA9PSBnZXRzLmxlbmd0aFxuICAgICAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgICAgIGNvbXBsZXRlKClcblxuICBkb3RzdG92YWx1ZTogKGRvdHMpIC0+XG4gICAgcmVzdWx0ID0gQGRhdGFcbiAgICBmb3IgZGltIGluIGRvdHMuc3BsaXQgJy4nXG4gICAgICByZXN1bHQgPSByZXN1bHRbZGltXVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuXG4iLCJFbnRpdGllcyA9XG5cbiAgYmxvZ3M6IFtdXG4gIGNyb3BzOiB7fVxuICBpbWFnZXM6IHt9XG5cbiAgcGxhY2Vob2xkZXJzOiBbXG4gICAgXCJUaGF0J3Mgd2hhdCBJJ20gYmxvZ2dpbmcgYWJvdXRcIlxuICAgIFwiSGF2ZSB5b3UgZ3V5cyBiZWVuIGJsb2dnaW5nP1wiXG4gICAgXCJIb2xkIGFsbCBteSBjYWxscywgSSdtIGJsb2dnaW5nXCJcbiAgICBcIlRlbGwgRG9ubmllIEknbSBibG9nZ2luZyBhbmQgSSdsbCBjYWxsIGhpbSBiYWNrXCJcbiAgICBcIkkgZ290dGEgcnVuLCB5b3Ugc2hvdWxkIGJlIGJsb2dnaW5nXCJcbiAgICBcIkkgd2FudCB5b3Ugb24gdGhlIHBob25lLCBidXQgSSBhbHNvIHdhbnQgeW91IGJsb2dnaW5nXCJcbiAgXVxuXG4gIEJsb2c6IChlbCwgbmFtZSwgdmFsdWU9ZmFsc2UpIC0+XG5cbiAgICBlZGl0b3IgPSBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGVcbiAgICAgIHBsYWNlaG9sZGVyOiBAcGxhY2Vob2xkZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEBwbGFjZWhvbGRlcnMubGVuZ3RoKV1cbiAgICAgIGNhbGxiYWNrczpcbiAgICAgICAgb25JbWFnZVVwbG9hZDogKGZpbGVzKSAtPlxuICAgICAgICAgIEVudGl0aWVzLmltYWdlVXBsb2FkIGZpbGVzLCB0aGlzXG5cbiAgICBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGUoJ2NvZGUnLCB2YWx1ZSkgaWYgdmFsdWUgaXNudCBmYWxzZVxuXG4gICAgQGJsb2dzLnB1c2ggbmFtZTogbmFtZSwgZWRpdG9yOiBlZGl0b3IsIGVsOiBlbC5maW5kKCcuYmxvZycpXG5cbiAgYmxvZ0dldENvZGU6IChuYW1lKSAtPlxuICAgIGZvciBibG9nIGluIEBibG9nc1xuICAgICAgcmV0dXJuIGJsb2cuZWwuc3VtbWVybm90ZSgnY29kZScpIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gXG4gIGJsb2dGb2N1czogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICBpZiBibG9nLm5hbWUgaXMgbmFtZVxuICAgICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuICBpbWFnZVVwbG9hZDogKGZpbGVzLCBlbCkgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBmaWxlc1swXVxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgICQoZWwpLnN1bW1lcm5vdGUoJ2VkaXRvci5pbnNlcnRJbWFnZScsIHJlc3VsdC5kYXRhLnVybClcbiAgICAgICAgTm90aWNlLmkgJ0ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG5cbiAgVGFnczogKGVsLCBuYW1lKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0Jykuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3Jlc3RvcmVfb25fYmFja3NwYWNlJywncmVtb3ZlX2J1dHRvbiddXG4gICAgICBkZWxpbWl0ZXI6ICcsJ1xuICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICAgIGNyZWF0ZTogKGlucHV0KSAtPlxuICAgICAgICB2YWx1ZTogaW5wdXRcbiAgICAgICAgdGV4dDogaW5wdXRcblxuICBEYXRlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1knXG5cblxuICBJbWFnZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cblxuICAgIEBpbWFnZUhhbmRsZXJzIGVsXG5cbiAgICAjIHByZWxvYWQgZXhpc3RpbmcgaW1hZ2VzXG4gICAgaWYgdmFsdWUgaXNudCB1bmRlZmluZWRcbiAgICAgIEVudGl0aWVzLmNyb3BwZXIodmFsdWUsIGVsKVxuICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gdmFsdWVcblxuXG4gIGltYWdlSGFuZGxlcnM6IChlbCwgbmFtZSkgLT5cblxuICAgIGVsLm9uICdkcmFnb3ZlcicsIEBpbWFnZUhhbmRsZXIuZHJhZ292ZXJcbiAgICBlbC5vbiAnZHJhZ2xlYXZlJywgQGltYWdlSGFuZGxlci5kcmFnbGVhdmVcbiAgICBlbC5vbiAnZHJhZ2VudGVyIGRyYWdvdmVyJywgQGltYWdlSGFuZGxlci5jYW5jZWxcbiAgICBlbC5vbiAnZHJvcCBkcmFnZHJvcCcsIEBpbWFnZUhhbmRsZXIuZHJvcFxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEuc2VsZWN0Jykub24gJ2NsaWNrJywgQGltYWdlSGFuZGxlci5jaG9vc2VGaWxlXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YS5zYXZlJykub24gJ2NsaWNrJywgQGltYWdlSGFuZGxlci5zYXZlXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gaW5wdXQ6ZmlsZScpLm9uICdjaGFuZ2UnLCBAaW1hZ2VIYW5kbGVyLmNoYW5nZVxuXG4gIGltYWdlSGFuZGxlcjpcblxuICAgIGRyYWdvdmVyOiAtPlxuICAgICAgXy5vbiAkKHRoaXMpLmZpbmQoJy5pbnB1dC1pbWFnZScpXG4gICAgZHJhZ2xlYXZlOiAtPlxuICAgICAgXy5vZmYgJCh0aGlzKS5maW5kKCcuaW5wdXQtaW1hZ2UnKVxuICAgIGNhbmNlbDogLT5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIGRyb3A6IChlKSAtPlxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgXy5vZmYgJCh0aGlzKS5maW5kICcuaW5wdXQtaW1hZ2UnXG5cbiAgICAgIGlmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgYW5kIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoXG4gICAgICAgIGZpbGVzID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgICBFbnRpdGllcy5sb2FkQ3JvcHBlciBmaWxlc1swXSwgJCh0aGlzKVxuXG4gICAgY2hvb3NlRmlsZTogLT5cbiAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXQnKS50cmlnZ2VyICdjbGljaydcblxuICAgIGNoYW5nZTogLT5cbiAgICAgIGlmICQodGhpcylbMF0uZmlsZXNcbiAgICAgICAgZmlsZXMgPSAkKHRoaXMpWzBdLmZpbGVzXG5cbiAgICAgICAgRW50aXRpZXMubG9hZENyb3BwZXIgZmlsZXNbMF0sICQodGhpcykucGFyZW50KCkucGFyZW50KClcblxuICAgIHNhdmU6IC0+XG5cbiAgICAgIG5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEgJ25hbWUnXG5cbiAgICAgIFNwaW5uZXIuaSgkKFwiLmVudGl0eV9uYW1lXyN7bmFtZX1cIikpXG5cbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmdldENyb3BwZWRDYW52YXMoKS50b0Jsb2IgKGJsb2IpIC0+XG4gICAgICAgIENsaWVudC5pbWFnZVVwbG9hZCBibG9iLCAocmVzdWx0KSAtPlxuICAgICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAsICdpbWFnZS9qcGVnJ1xuXG4gIGxvYWRDcm9wcGVyOiAoZmlsZSwgZWwpIC0+XG5cbiAgICBuYW1lID0gZWwuZGF0YSAnbmFtZSdcblxuICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcblxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAtPlxuICAgICAgRW50aXRpZXMuY3JvcHBlciByZWFkZXIucmVzdWx0LCBlbFxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMIGZpbGVcblxuICBjcm9wcGVyOiAodXJsLCBlbCkgLT5cblxuICAgIG5hbWUgPSBlbC5kYXRhICduYW1lJ1xuXG4gICAgaWYgRW50aXRpZXMuY3JvcHNbbmFtZV0gaXNudCB1bmRlZmluZWRcbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmRlc3Ryb3koKVxuICAgICAgRW50aXRpZXMuY3JvcHNbbmFtZV0gPSBmYWxzZVxuXG4gICAgZWwuZmluZCgnLmNyb3BwZXInKS5hdHRyICdzcmMnLCB1cmxcblxuICAgIEVudGl0aWVzLmNyb3BzW25hbWVdID0gbmV3IENyb3BwZXIgZWwuZmluZCgnLmNyb3BwZXInKVswXSxcbiAgICAgIG1pbkNvbnRhaW5lckhlaWdodDogMzAwXG4gICAgICBtaW5DYW52YXNIZWlnaHQ6IDMwMFxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZVxuICAgICAgcHJldmlldzogXCJkaXYuZW50aXR5X25hbWVfI3tuYW1lfSA+IGRpdi5pbnB1dC1pbWFnZSA+IGRpdi5waWN0dXJlXCJcbiAgICAgIGF1dG9Dcm9wQXJlYTogMVxuICAgICAgc3RyaWN0OiBmYWxzZVxuICAgICAgaGlnaGxpZ2h0OiB0cnVlXG5cbiAgICBfLm9uIGVsLmZpbmQoJy5zYXZlJylcblxuXG4iLCJFbnRyaWVzID1cblxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnZW50cmllcydcbiIsIkVudHJ5ID1cblxuICBzZWxlY3RTdHJ1Y3R1cmU6IHt9XG5cbiAgX2lkOiBmYWxzZVxuICBzdHJ1Y3R1cmU6IGZhbHNlXG4gIGVudHJ5OiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBAc2VsZWN0aXplKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvZW50cmllc1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG4gICAgZWxzZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5mb2N1cygpXG4gXG4gIHNlbGVjdGl6ZTogLT5cblxuICAgIEBzZWxlY3RTdHJ1Y3R1cmUgPSBTZWxlY3RpemUuc3RydWN0dXJlcyAkKCcubW9kaWZ5ID4gLnN0cnVjdHVyZSA+IHNlbGVjdCcpLFxuICAgICAgRW50cnkuc3RydWN0dXJlU2VsZWN0SGFuZGxlclxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5jbGljayBAc3VibWl0XG5cbiAgICAkKCcuZm9jdXNtZScpLmZvY3VzIC0+XG4gICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuXG4gIGxvYWQ6IChfaWQpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZW50cnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL2VudHJpZXMvJyxcbiAgICAgIF9pZDogX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBlbnRyeSA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgIEVudHJ5LmVudHJ5ID0gZW50cnlcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuYWRkT3B0aW9uIGVudHJ5LnN0cnVjdHVyZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBlbnRyeS5zdHJ1Y3R1cmUuaWRcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuZGlzYWJsZSgpXG5cbiAgc3VibWl0OiAtPlxuXG4gICAgbmFtZSA9ICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgIGVudGl0aWVzID0gW11cblxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5ID4gLmVudGl0eScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgZW50aXR5X25hbWUgPSAkKGVsKS5maW5kKCcubGFiZWwnKS5odG1sKClcbiAgICAgIHR5cGUgPSAkKGVsKS5kYXRhICd0eXBlJ1xuXG4gICAgICBzd2l0Y2ggdHlwZVxuICAgICAgICB3aGVuICdUZXh0JyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKVxuICAgICAgICB3aGVuICdEYXRlJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKVxuICAgICAgICB3aGVuICdUYWdzJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKS5zcGxpdCAnLCdcbiAgICAgICAgd2hlbiAnQmxvZydcbiAgICAgICAgICBibG9nID0gRW50aXRpZXMuYmxvZ0dldENvZGUgZW50aXR5X25hbWVcbiAgICAgICAgICB2YWx1ZSA9IGJsb2dcbiAgICAgICAgd2hlbiAnSW1hZ2UnXG4gICAgICAgICAgdmFsdWUgPSBFbnRpdGllcy5pbWFnZXNbZW50aXR5X25hbWVdXG5cbiAgICAgIGVudGl0aWVzLnB1c2ggbmFtZTogZW50aXR5X25hbWUsIHR5cGU6IHR5cGUsIHZhbHVlOiB2YWx1ZVxuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG5cbiAgICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnknKSlcblxuICAgICAgY2FsbCA9ICcvYXBpL2VudHJpZXMvYWRkJ1xuICAgICAgaWYgRW50cnkuX2lkIGlzbnQgZmFsc2VcbiAgICAgICAgY2FsbCA9IFwiL2FwaS9lbnRyaWVzL3VwZGF0ZS8je0VudHJ5Ll9pZH1cIlxuXG4gICAgICBfLmdldCBjYWxsLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIHN0cnVjdHVyZTogRW50cnkuc3RydWN0dXJlXG4gICAgICAgIGVudGl0aWVzOiBlbnRpdGllc1xuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIEVudHJ5Ll9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL3N0cnVjdHVyZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBFbnRyeS5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuXG4gICMjI1xuICBjbGllbnRTZWxlY3RIYW5kbGVyOiAoZSkgLT5cbiAgICBjbGllbnRfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICByZXR1cm4gZmFsc2UgaWYgY2xpZW50X2lkLmxlbmd0aCBpc250IDI0XG4gICAgRW50cnkuYWRkU2VsZWN0Q2xpZW50SWQgPSBjbGllbnRfaWRcbiAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmVuYWJsZSgpXG4gICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5jbGVhck9wdGlvbnMoKVxuICAjIyNcblxuICBzdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyOiAoZSkgLT5cbiAgICBzdHJ1Y3R1cmVfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICByZXR1cm4gZmFsc2UgaWYgc3RydWN0dXJlX2lkLmxlbmd0aCBpc250IDI0XG4gICAgaWYgRW50cnkuZW50cnkgaXNudCBmYWxzZVxuICAgICAgRW50cnkubG9hZEVudGl0aWVzIEVudHJ5LmVudHJ5LmVudGl0aWVzLCBFbnRyeS5lbnRyeS5uYW1lXG4gICAgZWxzZVxuICAgICAgRW50cnkubG9hZFN0cnVjdHVyZSBzdHJ1Y3R1cmVfaWRcblxuICBsb2FkU3RydWN0dXJlOiAoX2lkKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsXG4gICAgICBfaWQ6IF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgRW50cnkuc3RydWN0dXJlID0gX2lkXG4gICAgICBAbG9hZEVudGl0aWVzIHJlc3BvbnNlLmRhdGFbMF0uZW50aXRpZXNcblxuICBsb2FkRW50aXRpZXM6IChlbnRpdGllcywgbmFtZT1mYWxzZSkgLT5cblxuICAgIF8ub24gJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lJ1xuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwobmFtZSkgaWYgbmFtZSBpc250IGZhbHNlXG5cbiAgICBib2R5ID0gJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmJvZHknKVxuICAgIGJvZHkuaHRtbCAnJ1xuXG4gICAgdGFiaW5kZXggPSAzXG5cbiAgICBmb3IgZW50aXR5LCBpIGluIGVudGl0aWVzXG5cbiAgICAgIGh0bWwgPSAkKFwiLnBhZ2UuZW50cnkgPiAjdGVtcGxhdGUgPiAuZW50aXR5XyN7ZW50aXR5LnR5cGV9XCIpLmNsb25lKClcbiAgICAgIGh0bWwuZGF0YSAnbmFtZScsIGVudGl0eS5uYW1lXG4gICAgICBodG1sLmFkZENsYXNzIFwiZW50aXR5X25hbWVfI3tlbnRpdHkubmFtZX1cIlxuXG4gICAgICBpZiBlbnRpdHkudmFsdWVcbiAgICAgICAgc3dpdGNoIGVudGl0eS50eXBlXG4gICAgICAgICAgd2hlbiAnVGV4dCcsJ1RhZ3MnLCAnRGF0ZScgdGhlbiBodG1sLmZpbmQoJ2lucHV0JykudmFsIGVudGl0eS52YWx1ZVxuXG4gICAgICBodG1sLmZpbmQoJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYScpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXgrK1xuICAgICAgYm9keS5hcHBlbmQgaHRtbFxuXG4gICAgICBlbnRpdHlFbCA9ICQoXCIucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keSA+IC5lbnRpdHlfbmFtZV8je2VudGl0eS5uYW1lfVwiKVxuICAgICAgZW50aXR5RWwuZmluZCgnLmxhYmVsJykuaHRtbCBlbnRpdHkubmFtZVxuXG4gICAgICBpZiBFbnRpdGllc1tlbnRpdHkudHlwZV0gaXNudCB1bmRlZmluZWRcbiAgICAgICAgRW50aXRpZXNbZW50aXR5LnR5cGVdKGVudGl0eUVsLCBlbnRpdHkubmFtZSwgZW50aXR5LnZhbHVlKVxuICAgICQoJ1t0YWJpbmRleD0yXScpLmZvY3VzKClcbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0J1xuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4XG4iLCJHbG9iYWwgPVxuXG4gICMga2V2aW4gb2xzb24gKGtldmluQDI1Ni5pbykg8J+MgPCfjrdcblxuICB3aW5kb3c6IGZhbHNlXG4gIHdpbmRvd1RpbWVyOiBmYWxzZVxuICBpbml0OiBmYWxzZVxuXG4gIGk6IC0+XG4gICAgR2xvYmFsLmhhbmRsZXJzKClcbiAgICBHbG9iYWwubG9naW5DaGVjaygpXG5cbiAgICBfLm9uIFwiLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb25fI3tQYWdlfSwgLm1lbnVcIiBpZiBQYWdlP1xuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnKS5jbGljayBHbG9iYWwudXNlclByb2ZpbGVIYW5kbGVyXG4gICAgJCgnLm9hdXRocyA+IC5vYXV0aCcpLmNsaWNrIEdsb2JhbC51c2VyT2F1dGhIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiAubG9nb3V0JykuY2xpY2sgR2xvYmFsLmxvZ291dEhhbmRsZXJcbiAgICAkKCcubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbicpLmNsaWNrIEdsb2JhbC5tZW51SGFuZGxlclxuXG4gIG1lbnVIYW5kbGVyOiAtPlxuICAgIF8ub2ZmICQoJy5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uJylcbiAgICBzZWxlY3RlZCA9ICQodGhpcykuZmluZCgnLmxhYmVsJykuaHRtbCgpXG4gICAgXy5vbiAkKFwiLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb24ub3B0aW9uXyN7c2VsZWN0ZWR9XCIpXG5cbiAgbG9nb3V0SGFuZGxlcjogLT5cblxuICAgIFByb21wdC5pICdMb2dvdXQnLCAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICByZXR1cm4gZmFsc2UgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuXG4gICAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgICAgTWUubG9nb3V0IC0+XG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnBpY3R1cmUnXG4gICAgICAgIE5vdGljZS5pICdMb2dvdXQgU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuICAgICAgICAsIDEyMDBcblxuICB1c2VyUHJvZmlsZUhhbmRsZXI6IC0+XG5cbiAgICBvYSA9ICQoJy5vYXV0aHMnKVxuICAgIHRsID0gbmV3IFRpbWVsaW5lTWF4IHJlcGVhdDogMFxuXG4gICAgaWYgb2EuaGFzQ2xhc3MgJ29mZidcbiAgICAgIF8ub24gb2FcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI2NhbmNlbFNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICBlbHNlXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNwcm9maWxlU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgICAgXy5vZmYgb2EsIG9mZmluZzogMC41XG5cbiAgdXNlck9hdXRoSGFuZGxlcjogLT5cblxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICByZXR1cm4gdHJ1ZSBpZiB0eXBlIGlzICdjYW5jZWwnXG5cbiAgICBHbG9iYWwub2F1dGhXaW5kb3cgJy9sb2FkaW5nJ1xuXG4gICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICBNZS5vYXV0aCB0eXBlLCAodXJpKSAtPlxuICAgICAgR2xvYmFsLndpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJpXG5cbiAgb2F1dGhXaW5kb3c6ICh1cmwpIC0+XG4gICAgdyA9IDY0MFxuICAgIGggPSA1NTBcbiAgICBsZWZ0ID0gKHNjcmVlbi53aWR0aC8yKSAtICh3LzIpXG4gICAgdG9wID0gKHNjcmVlbi5oZWlnaHQvMikgLSAoaC8yKVxuXG5cbiAgICBHbG9iYWwud2luZG93ID0gd2luZG93Lm9wZW4odXJsLCAnTG9naW4gLyBSZWdpc3RlcicsIFwidG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPSN7d30saGVpZ2h0PSN7aH0sdG9wPSN7dG9wfSxsZWZ0PSN7bGVmdH1cIilcbiAgICBHbG9iYWwud2luZG93LmZvY3VzIGlmIHdpbmRvdy5mb2N1c1xuICAgIEdsb2JhbC53aW5kb3dUaW1lciA9IHNldEludGVydmFsIC0+XG4gICAgICBpZiBHbG9iYWwud2luZG93LmNsb3NlZFxuICAgICAgICBjbGVhckludGVydmFsIEdsb2JhbC53aW5kb3dUaW1lclxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBjb25zb2xlLmxvZyAnY2xvc2luZyBvdXIgc2hpdGUnXG4gICAgLCA1MFxuXG5cblxuICAgIHJldHVyblxuXG4gIG9hdXRoQ29tcGxldGU6ICh1c2VyKSAtPlxuICAgIFNwaW5uZXIuZCgpXG4gICAgR2xvYmFsLmxvZ2luIHVzZXJcbiAgICBOb3RpY2UuaSAnTG9naW4gU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuICAgICNzZXRUaW1lb3V0IC0+IGxvY2F0aW9uLmhyZWYgPSAnL2Rhc2hib2FyZCcgLCAyMDAwXG5cbiAgbG9naW46ICh1c2VyKSAtPlxuXG4gICAgd2luZG93LlVzZXIgPSB1c2VyXG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5pbWFnZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5waWN0dXJlfSlcIlxuICAgIF8ub2ZmICcubWUgPiAucHJvZmlsZSdcbiAgICBfLm9mZiAnLm1lID4gLm9hdXRocydcbiAgICBfLm9uICcubWUgPiAucGljdHVyZSdcblxuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50ID4gLm5hbWUnKS5odG1sIFVzZXIuY2xpZW50Lm5hbWVcblxuICBsb2dpbkNoZWNrOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJ2hlYWRlcicpKVxuXG4gICAgTWUuYXV0aGVkIChyZXN1bHQpIC0+XG4gICAgICBHbG9iYWwubG9naW4ocmVzdWx0KSBpZiByZXN1bHQgaXNudCBmYWxzZVxuICAgICAgaWYgR2xvYmFsLmluaXQgaXNudCBmYWxzZSBhbmQgcmVzdWx0IGlzbnQgZmFsc2VcbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgd2luZG93W0dsb2JhbC5pbml0XS5pKClcbiAgICAgIGVsc2VcbiAgICAgICAgU3Bpbm5lci5kKClcblxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkJyBpZiBsb2NhdGlvbi5wYXRobmFtZSBpcyAnLycgYW5kIHJlc3VsdCBpc250IGZhbHNlXG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy8nIGlmIHJlc3VsdCBpcyBmYWxzZSBhbmQgbG9jYXRpb24ucGF0aG5hbWUgaXNudCAnLydcbiIsIl8uY29uc3RydWN0b3IoKVxuXG5jbGFzcyBJbmRleFxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy50b3AgLmJ1cmdlcicpLmNsaWNrIEBtb2JpbGVcblxuICBtb2JpbGU6IC0+XG4gICAgXy5zd2FwICcudG9wID4gLmJ1cmdlcidcbiAgICBfLnN3YXAgJy50b3AgPiAubWVudSdcbiIsIkxpc3RpbmcgPVxuICBjb250ZW50OiBmYWxzZVxuICBzZWxlY3RlZDogW11cbiAgc2VsZWN0ZWRDdXJzb3I6IDBcblxuXG4gIGk6IChjb250ZW50KSAtPlxuICAgIEBjb250ZW50ID0gY29udGVudFxuICAgIEBsb2FkKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLmNoZWNrYm94JywgQGNoZWNrYm94SGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2hhbmdlJywgJy5saXN0LWhlYWRlciA+IC5jaGVja2JveCA+IGlucHV0JywgQHNlbGVjdEFsbEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NoYW5nZScsICcuY2hlY2tib3ggPiBpbnB1dCcsIEBzdGF0ZUhhbmRsZXJcblxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb24nLCBAYWN0aW9uSGFuZGxlclxuXG4gIGNoZWNrYm94SGFuZGxlcjogLT5cbiAgICBjYiA9ICQodGhpcykuZmluZCAnaW5wdXQnXG4gICAgaWYgZXZlbnQudGFyZ2V0LnR5cGUgaXNudCAnY2hlY2tib3gnXG4gICAgICBjYlswXS5jaGVja2VkID0gIWNiWzBdLmNoZWNrZWRcbiAgICAgIGNiLmNoYW5nZSgpXG5cbiAgc2VsZWN0QWxsSGFuZGxlcjogLT5cbiAgICBpZiB0aGlzLmNoZWNrZWRcbiAgICAgICQoJy5saXN0aW5nID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLnByb3AgJ2NoZWNrZWQnLCB0cnVlXG4gICAgZWxzZVxuICAgICAgJCgnLmxpc3RpbmcgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykucHJvcCAnY2hlY2tlZCcsIGZhbHNlXG5cbiAgc3RhdGVIYW5kbGVyOiAtPlxuICAgIGlkcyA9IFtdXG5cbiAgICAkKCcuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBpZiBlbC5jaGVja2VkXG4gICAgICAgIGlkcy5wdXNoICQoZWwpLmRhdGEgJ19pZCdcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuICAgICAgaWYgaWRzLmxlbmd0aCA+IDBcbiAgICAgICAgJCgnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucyA+IC5jb3B5ID4gLnZhbHVlJykudGV4dCBpZHMubGVuZ3RoXG4gICAgICAgIF8ub2ZmICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cydcbiAgICAgICAgXy5vbiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucydcbiAgICAgIGVsc2VcbiAgICAgICAgXy5vbiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMnXG4gICAgICAgIF8ub2ZmICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zJ1xuICAgICAgTGlzdGluZy5zZWxlY3RlZCA9IGlkc1xuXG4gIGFjdGlvbkhhbmRsZXI6IC0+XG4gICAgdHlwZSA9ICQodGhpcykuZGF0YSAndHlwZSdcblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdkZWxldGUnXG4gICAgICAgIFByb21wdC5pIFwiRGVsZXRpbmcgI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gaXRlbXMocylcIixcbiAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGVzZT8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJldHVybiB0cnVlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcbiAgICAgICAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gIGRlbGV0ZTogKGlkLCBjYWxsYmFjaykgLT5cblxuICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuICAgIF8uZ2V0IFwiL2FwaS8je0xpc3RpbmcuY29udGVudH0vZGVsZXRlLyN7aWR9XCJcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGNhbGxiYWNrIHRydWVcbiAgICAuZmFpbCAtPlxuICAgICAgY2FsbGJhY2sgZmFsc2VcblxuICBkZWxldGVTZWxlY3RlZDogKGN1cnNvcj0wKSAtPlxuXG4gICAgaWYgTGlzdGluZy5zZWxlY3RlZC5sZW5ndGggaXMgY3Vyc29yXG4gICAgICBOb3RpY2UuaSAnU3RydWN0dXJlKHMpIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICBAbG9hZCgpXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgTGlzdGluZy5kZWxldGUgTGlzdGluZy5zZWxlY3RlZFtjdXJzb3JdLCAocmVzdWx0KSAtPlxuICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCArK2N1cnNvciBpZiByZXN1bHQgaXMgdHJ1ZVxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJChcIi5wYWdlLiN7TGlzdGluZy5jb250ZW50fVwiKSlcblxuICAgIF8uZ2V0IFwiL2FwaS8je0Bjb250ZW50fVwiLCB2aWV3OiB0cnVlXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgVGltZS5pKClcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAkKCcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cyA+IC5jb3B5ID4gLnZhbHVlJykudGV4dCByZXNwb25zZS5kYXRhLmxlbmd0aFxuICAgICAgJChcIi4je0Bjb250ZW50fSA+IC5jb250ZW50ID4gLmxpc3RpbmcgPiAuaXRlbXNcIikuaHRtbCByZXNwb25zZS52aWV3XG4iLG51bGwsIk1lID1cblxuICBsb2dvdXQ6IChjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2F1dGgvbG9nb3V0J1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZSgpXG5cbiAgb2F1dGg6ICh0eXBlLCBjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0IFwiL2FwaS9hdXRoLyN7dHlwZX1cIlxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZShyZXNwb25zZS5kYXRhLnVyaSlcblxuICBhdXRoZWQ6IChyZXN1bHQpIC0+XG4gICAgXy5nZXQgJy9hcGkvYXV0aCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgcmVzdWx0IHJlc3BvbnNlLmRhdGEudXNlclxuXG4gIGdldDpcbiAgICBjbGllbnRJZDogLT5cbiAgICAgIHJldHVybiBVc2VyLmNsaWVudC5pZFxuIiwiTm90Zm91bmQgPVxuICBpOiAtPlxuICAgICQoJyNsaW5lZXJyb3InKS5ub3ZhY2FuY3lcbiAgICAgICdyZWJsaW5rUHJvYmFiaWxpdHknOiAwLjFcbiAgICAgICdibGlua01pbic6IDAuMlxuICAgICAgJ2JsaW5rTWF4JzogMC42XG4gICAgICAnbG9vcE1pbic6IDhcbiAgICAgICdsb29wTWF4JzogMTBcbiAgICAgICdjb2xvcic6ICcjZmZmZmZmJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4ICNmZmZmZmYnLCAnMCAwIDMwcHggIzAwODAwMCcsICcwIDAgNnB4ICMwMDAwZmYnXVxuXG4gICAgJCgnI2xpbmVjb2RlJykubm92YWNhbmN5XG4gICAgICAnYmxpbmsnOiAxXG4gICAgICAnb2ZmJzogMVxuICAgICAgJ2NvbG9yJzogJ1JlZCdcbiAgICAgICdnbG93JzogWycwIDAgODBweCBSZWQnLCAnMCAwIDMwcHggRmlyZUJyaWNrJywgJzAgMCA2cHggRGFya1JlZCddXG4iLCJOb3RpY2UgPVxuXG4gIHR5cGVzOiBbJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZyddXG5cbiAgZWw6IGZhbHNlXG5cbiAgb246IGZhbHNlXG4gIHByb2dyZXNzOiBmYWxzZVxuICB0aW1lb3V0OiBmYWxzZVxuICBjbG9zZTogdHJ1ZVxuXG4gIGRlZmF1bHQ6XG4gICAgdHlwZTogJ2luZm8nXG4gICAgcHJvZ3Jlc3M6IGZhbHNlXG4gICAgdGltZW91dDogNTAwMFxuXG4gIGk6IChjb3B5LG9wdGlvbnM9e30pIC0+XG5cbiAgICBAb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ge30sIEBkZWZhdWx0XG5cbiAgICBmb3Iga2V5LCBwYXJhbSBvZiBvcHRpb25zXG4gICAgICBAb3B0aW9uc1trZXldID0gcGFyYW1cblxuICAgIEBlbCA9ICQoJy5ub3RpY2UnKSBpZiBAZWwgaXMgZmFsc2VcblxuICAgIGZvciBkdHlwZSBpbiBAdHlwZXNcbiAgICAgIEBlbC5yZW1vdmVDbGFzcyBkdHlwZVxuICAgIEBlbC5hZGRDbGFzcyBAb3B0aW9ucy50eXBlXG4gICAgQGVsLmZpbmQoJy5jb3B5ID4gLm1lc3NhZ2UnKS5odG1sIGNvcHlcblxuICAgIGlmIEBvcHRpb25zLnByb2dyZXNzIGlzbnQgZmFsc2VcbiAgICAgIGlmIEBwcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgICBfLm9uIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgICAgQHByb2dyZXNzID0gdHJ1ZVxuICAgICAgaWYgQGNsb3NlIGlzIHRydWVcbiAgICAgICAgXy5vZmYgQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICAgIEBjbG9zZSA9IGZhbHNlXG4gICAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG4gICAgICAgICwgMTAwXG4gICAgICBlbHNlXG4gICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZSBhbmQgQHByb2dyZXNzIGlzIHRydWVcbiAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCAnMCUnKVxuICAgICAgXy5vZmYgQGVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgICAgQHByb2dyZXNzID0gZmFsc2VcbiAgICAgIF8ub24gQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICBAY2xvc2UgPSB0cnVlXG5cbiAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgIF8ub24gQGVsXG4gICAgICBAaGFuZGxlcnMub24oKVxuICAgICAgQG9uID0gdHJ1ZVxuXG4gICAgaWYgQG9wdGlvbnMudGltZW91dCBpc250IGZhbHNlIGFuZCBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgQHRpbWVvdXQgPSBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEBkKClcbiAgICAgICwgQG9wdGlvbnMudGltZW91dFxuXG4gIGhhbmRsZXJzOlxuICAgIG9uOiAtPlxuICAgICAgJCgnLm5vdGljZScpLm9uICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuICAgIG9mZjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC5jbG9zZSA+IC5pbm5lcicsIE5vdGljZS5kXG5cbiAgZDogLT5cbiAgICBjbGVhclRpbWVvdXQgTm90aWNlLnRpbWVvdXQgaWYgTm90aWNlLnRpbWVvdXQgaXNudCBmYWxzZVxuICAgIE5vdGljZS50aW1lb3V0ID0gZmFsc2VcbiAgICBOb3RpY2UuaGFuZGxlcnMub2ZmKClcbiAgICBfLm9uIE5vdGljZS5lbC5maW5kKCcuY2xvc2UnKVxuICAgIE5vdGljZS5jbG9zZSA9IHRydWVcbiAgICBfLm9mZiBOb3RpY2UuZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgTm90aWNlLnByb2dyZXNzID0gZmFsc2VcbiAgICBfLm9mZiBOb3RpY2UuZWwsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC4yXG4gICAgTm90aWNlLm9uID0gZmFsc2VcbiIsIlByb21wdCA9XG4gIGVsOiB7fVxuICBvcHRpb25zOiB7fVxuICBjYWxsYmFjazogZmFsc2VcbiAgcGFyYW1zOiB7fVxuXG4gIGk6ICh0aXRsZSwgY29weSwgb3B0aW9ucz1bJ09LJ10sIHBhcmFtcywgY2FsbGJhY2spIC0+XG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBmYWxzZVxuICAgIFByb21wdC5wYXJhbXMgPSBmYWxzZVxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ2Z1bmN0aW9uJ1xuICAgIFByb21wdC5jYWxsYmFjayA9IGNhbGxiYWNrIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG5cbiAgICBQcm9tcHQucGFyYW1zID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCdcblxuICAgIFByb21wdC5lbCA9ICQgJy5wcm9tcHQnXG5cbiAgICBQcm9tcHQuZWwuZmluZCAnLnRpdGxlJ1xuICAgICAgLmh0bWwgdGl0bGVcbiAgICBQcm9tcHQuZWwuZmluZCAnLmNvcHknXG4gICAgICAuaHRtbCBjb3B5XG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAndGV4dGFyZWEnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLnRleHRhcmVhIGlzIHRydWVcbiAgICAgIF8ub24gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICAgIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCBwYXJhbXMudmFsdWVcblxuICAgIFByb21wdC5vcHRpb25zID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb25zID4gLm9wdGlvbidcbiAgICBfLm9mZiBQcm9tcHQub3B0aW9uc1xuICAgIFByb21wdC5vcHRpb25zLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gICAgZm9yIG8saSBpbiBvcHRpb25zXG4gICAgICBvcHRpb24gPSBQcm9tcHQuZWwuZmluZCBcIi5vcHRpb25zICA+IC5vcHRpb25fI3tpKzF9XCJcbiAgICAgIF8ub24gb3B0aW9uXG4gICAgICBvcHRpb24uaHRtbCBvXG4gICAgICAgIC5kYXRhICd2YWx1ZScsIG9cblxuICAgIF8ub24gUHJvbXB0LmVsLFxuICAgIF8ub24gJy5iZmFkZSdcblxuICAgIFByb21wdC5oYW5kbGVycygpXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5mb2N1cygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChkb2N1bWVudCkua2V5ZG93biBQcm9tcHQua2V5ZG93blxuICAgIFByb21wdC5vcHRpb25zLm9uICdjbGljaycsIFByb21wdC5jbGlja1xuICAgIFByb21wdC5lbC5maW5kKCcuaW5uZXIgPiAuY2FuY2VsJykub24gJ2NsaWNrJywgUHJvbXB0LmNhbmNlbFxuXG4gIGtleWRvd246IC0+XG4gICAgayA9IGV2ZW50LndoaWNoXG4gICAga2V5cyA9IFszOSwgOSwgMzcsIDEzLCAyN11cbiAgICByZXR1cm4gdHJ1ZSBpZiBrIG5vdCBpbiBrZXlzXG5cbiAgICBjdXJyZW50ID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb24ub24uYWN0aXZlJ1xuICAgIHNoaWZ0ID0gd2luZG93LmV2ZW50LnNoaWZ0S2V5XG5cbiAgICBpZiBrIGlzIDM5IG9yIChrIGlzIDkgYW5kICFzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQubmV4dCgpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5uZXh0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb25fMScpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMzcgb3IgKGsgaXMgOSBhbmQgc2hpZnQpXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBpZiBjdXJyZW50LnByZXYoKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIGN1cnJlbnQucHJldigpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBlbHNlXG4gICAgICAgIFByb21wdC5lbC5maW5kKCcub3B0aW9uLm9uJykubGFzdCgpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMTNcbiAgICAgIFByb21wdC50cmlnZ2VyIFByb21wdC5lbC5maW5kKCcub3B0aW9uLmFjdGl2ZScpLmRhdGEgJ3ZhbHVlJ1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgaWYgayBpcyAyN1xuICAgICAgUHJvbXB0LnRyaWdnZXIoZmFsc2UpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICBjYW5jZWw6IC0+XG4gICAgUHJvbXB0LnRyaWdnZXIgZmFsc2VcblxuICBjbGljazogLT5cbiAgICBQcm9tcHQudHJpZ2dlciAkKHRoaXMpLmRhdGEgJ3ZhbHVlJ1xuXG4gIHRyaWdnZXI6ICh2YWx1ZSkgLT5cbiAgICBfLm9mZiBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhJ1xuICAgIF8ub2ZmIFByb21wdC5lbCwgb2ZmaW5nOiBmYWxzZSwgb2ZmdGltZTogMC4yXG4gICAgI18ub2ZmICcuYmZhZGUnLCBvZmZpbmc6IGZhbHNlLCBvZmZpdG1lOiAwLjJcbiAgICBfLm9mZiAnLmJmYWRlJ1xuICAgIFByb21wdC5vcHRpb25zLnVuYmluZCAnY2xpY2snLCBQcm9tcHQuY2xpY2tcbiAgICAkKGRvY3VtZW50KS51bmJpbmQgJ2tleWRvd24nLCBQcm9tcHQua2V5ZG93blxuICAgIGlmIFByb21wdC5wYXJhbXMudGV4dGFyZWFcbiAgICAgIHZhbCA9IFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCgpXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHJlc3BvbnNlOiB2YWx1ZSwgdmFsOiB2YWxcbiAgICBlbHNlXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHZhbHVlXG4iLCJTZWxlY3RpemUgPVxuXG4gIGNsaWVudHM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuICAgIHNlbGVjdENsaWVudCA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgYSBDbGllbnQgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgcmVuZGVyOlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj4je2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvY2xpZW50cycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0Q2xpZW50LmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdENsaWVudFxuXG4gIHN0cnVjdHVyZXM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuXG4gICAgc2VsZWN0U3RydWN0dXJlID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIFN0cnVjdHVyZSAgIFwiXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXY+I3tpdGVtLm5hbWV9PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdFN0cnVjdHVyZS5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RTdHJ1Y3R1cmVcblxuICB1c2VyczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0VXNlciA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3JlbW92ZV9idXR0b24nXVxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2IHN0eWxlPSdsaW5lLWhlaWdodDogMzBweDsnPiN7aXRlbS5uYW1lfSAoI3tpdGVtLmVtYWlsfSkgPGltZyBzcmM9JyN7aXRlbS5waWN0dXJlfScgc3R5bGU9J2Zsb2F0OiBsZWZ0OyB3aWR0aDogMzBweDsgaGVpZ2h0OiAzMHB4OyBtYXJnaW4tcmlnaHQ6IDEwcHg7JyAvPjwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS91c2VycycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lLCBlbWFpbDogaXRlbS5lbWFpbCwgcGljdHVyZTogaXRlbS5waWN0dXJlXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0VXNlci5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RVc2VyXG5cblxuIiwiXG5TcGlubmVyID1cblxuICBzdGF0ZTogZmFsc2VcblxuICBlbDoge31cblxuICBpOiAoZWwsIG92ZXJyaWRlKSAtPlxuXG4gICAgQGVsID0gJCgnLnNwaW5uZXInKVxuXG4gICAgcmVjdCA9IGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBjb29yZHMgPVxuICAgICAgdG9wOiBcIiN7cmVjdC50b3AgKyAkKHdpbmRvdykuc2Nyb2xsVG9wKCl9cHhcIlxuICAgICAgbGVmdDogXCIje3JlY3QubGVmdH1weFwiXG4gICAgICB3aWR0aDogXCIje3JlY3Qud2lkdGh9cHhcIlxuICAgICAgaGVpZ2h0OiBcIiN7cmVjdC5oZWlnaHR9cHhcIlxuXG4gICAgaWYgb3ZlcnJpZGUgaXNudCB1bmRlZmluZWRcbiAgICAgIGZvciBrZXksIGNvb3JkIG9mIG92ZXJyaWRlXG4gICAgICAgIGNvb3Jkc1trZXldID0gY29vcmRcblxuICAgIEBlbC5jc3MgY29vcmRzXG5cbiAgICBfLm9uIEBlbFxuICAgIEBzdGF0ZSA9IHRydWVcblxuICBkOiAtPlxuICAgIF8ub2ZmIEBlbFxuICAgIEBzdGF0ZSA9IGZhbHNlXG4iLCJTdHJ1Y3R1cmUgPVxuXG4gIHRlbXBsYXRlOiBmYWxzZVxuICBfaWQ6IGZhbHNlXG5cbiAgY2xpZW50U2VsZWN0OiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBAdGVtcGxhdGUgPSAkKCcubW9kaWZ5ID4gI3RlbXBsYXRlJykuaHRtbCgpXG4gICAgQGhhbmRsZXJzKClcblxuICAgIEBjbGllbnRTZWxlY3QgPSBTZWxlY3RpemUuY2xpZW50cyAkKCcucGFnZS5zdHJ1Y3R1cmUgPiAubW9kaWZ5ID4gLmRldGFpbC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKSxcbiAgICAgIEBjbGllbnRTZWxlY3RoYW5kbGVyXG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9zdHJ1Y3R1cmVzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcbiAgICBlbHNlXG4gICAgICBAZW50aXR5QWRkKClcblxuXG4gICAgQGNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuZm9jdXMoKSBpZiBAX2lkIGlzIGZhbHNlXG5cblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAubW9yZScpLmNsaWNrIEBlbnRpdHlBZGRIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcycpLm9uICdjbGljaycsJy5lbnRpdHkgPiAucmVtb3ZlJywgQGVudGl0eVJlbW92ZUhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGFwJykuY2xpY2sgQHN1Ym1pdEhhbmRsZXJcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLnN0cnVjdHVyZScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcy8nLFxuICAgICAgX2lkOiBAX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy9zdHJ1Y3R1cmVzL25ldycgaWYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPCAxXG4gICAgICBzdHJ1Y3R1cmUgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICAkKCcubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCBzdHJ1Y3R1cmUubmFtZVxuICAgICAgZm9yIGksIGVudGl0eSBvZiBzdHJ1Y3R1cmUuZW50aXRpZXNcbiAgICAgICAgU3RydWN0dXJlLmVudGl0eUFkZCBmYWxzZSwgZW50aXR5XG5cbiAgICAgIFN0cnVjdHVyZS5jbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLmFkZE9wdGlvblxuICAgICAgICBpZDogc3RydWN0dXJlLmNsaWVudC5pZCwgbmFtZTogc3RydWN0dXJlLmNsaWVudC5uYW1lXG4gICAgICBTdHJ1Y3R1cmUuY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBzdHJ1Y3R1cmUuY2xpZW50LmlkXG5cblxuXG4gIGVudGl0eUFkZEhhbmRsZXI6IC0+XG4gICAgU3RydWN0dXJlLmVudGl0eUFkZCh0cnVlKVxuXG4gIGVudGl0eVJlbW92ZUhhbmRsZXI6IC0+XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKVxuXG4gIGVudGl0eUFkZDogKGZvY3VzPWZhbHNlLCBlbnRpdHk9ZmFsc2UpIC0+XG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHknKS5hcHBlbmQgQHRlbXBsYXRlXG5cbiAgICBpZiBlbnRpdHkgaXNudCBmYWxzZVxuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gaW5wdXQnKS52YWwoZW50aXR5Lm5hbWUpXG4gICAgICBAc2VsZWN0aXplICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpLCBlbnRpdHkudHlwZVxuICAgIGVsc2VcbiAgICAgIEBzZWxlY3RpemUgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gc2VsZWN0JylcblxuICAgIGlmICBmb2N1c1xuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eSA+IC5pbnB1dC5zZWxlY3RpemUtaW5wdXQgaW5wdXQnKS5sYXN0KCkuZm9jdXMoKVxuXG4gIHNlbGVjdGl6ZTogKGVsLCB2YWx1ZT1mYWxzZSkgLT5cbiAgICBpemVkID0gZWwuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJUeXBlXCJcblxuICAgIGl6ZWRbMF0uc2VsZWN0aXplLnNldFZhbHVlIHZhbHVlXG5cbiAgc3VibWl0SGFuZGxlcjogLT5cblxuICAgIHN0cnVjdHVyZSA9IHt9XG4gICAgc3RydWN0dXJlLmVudGl0aWVzID0gW11cbiAgICBzdHJ1Y3R1cmUuY2xpZW50ID0gJCgnLm1vZGlmeSA+IC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5uYW1lID0gJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eScpLmVhY2ggKGksIGVsKSAtPlxuXG4gICAgICBqaW5wdXQgPSAkKGVsKS5maW5kICcuaW5wdXQgPiBpbnB1dCdcbiAgICAgIGpzZWxlY3QgPSAkKGVsKS5maW5kICcuaW5wdXQgPiBzZWxlY3QnXG5cbiAgICAgIHN0cnVjdHVyZS5lbnRpdGllcy5wdXNoXG4gICAgICAgIG5hbWU6IGppbnB1dC52YWwoKVxuICAgICAgICB0eXBlOiBqc2VsZWN0LnZhbCgpXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgU3RydWN0dXJlLm1vZGlmeSBzdHJ1Y3R1cmVcblxuICBtb2RpZnk6IChzdHJ1Y3R1cmUpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2Uuc3RydWN0dXJlJykpXG5cbiAgICBjYWxsID0gJy9hcGkvc3RydWN0dXJlcy9hZGQnXG4gICAgaWYgU3RydWN0dXJlLl9pZCBpc250IGZhbHNlXG4gICAgICBjYWxsID0gXCIvYXBpL3N0cnVjdHVyZXMvdXBkYXRlLyN7U3RydWN0dXJlLl9pZH1cIlxuXG4gICAgXy5nZXQgY2FsbCwgc3RydWN0dXJlXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pIHJlc3BvbnNlLmRhdGEuc3RhdHVzLCAnc3VjY2VzcydcbiAgICAgICAgaWYgU3RydWN0dXJlLl9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL3N0cnVjdHVyZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBTdHJ1Y3R1cmUuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiIsIlN0cnVjdHVyZXMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnc3RydWN0dXJlcydcblxuIiwiVXNlcnMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAndXNlcnMnXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
