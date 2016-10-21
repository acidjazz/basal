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
        return jel.html(moment(jel.attr('title')).fromNow());
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
        size: 'viewport'
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJnbG9iYWwuY29mZmVlIiwiaW5kZXguY29mZmVlIiwibGlzdGluZy5jb2ZmZWUiLCJtYWluLmpzIiwibWUuY29mZmVlIiwibm90Zm91bmQuY29mZmVlIiwibm90aWNlLmNvZmZlZSIsInByb21wdC5jb2ZmZWUiLCJzZWxlY3RpemUuY29mZmVlIiwic3Bpbm5lci5jb2ZmZWUiLCJzdHJ1Y3R1cmUuY29mZmVlIiwic3RydWN0dXJlcy5jb2ZmZWUiLCJ1c2Vycy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFBO0VBQUE7O0FBQUEsQ0FBQSxHQUVFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxJQUFDLENBQUEsT0FBRCxHQUFXLFdBQUEsQ0FBWSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxJQUFiLENBQVosRUFBNkIsR0FBN0I7RUFEVixDQUFIO0VBR0EsQ0FBQSxFQUNFO0lBQUEsTUFBQSxFQUFRLEtBQVI7SUFDQSxPQUFBLEVBQVMsQ0FEVDtHQUpGO0VBT0EsSUFBQSxFQUFNLFNBQUMsRUFBRCxFQUFLLE1BQUwsRUFBbUIsR0FBbkI7O01BQUssU0FBTzs7O01BQU8sTUFBSTs7SUFFM0IsSUFBRyxDQUFBLENBQUEsRUFBQSxZQUFrQixNQUFsQixDQUFIO01BQ0UsRUFBQSxHQUFLLENBQUEsQ0FBRSxFQUFGLEVBRFA7O0lBR0EsSUFBRyxNQUFBLEtBQVksS0FBZjtNQUNFLEVBQUUsQ0FBQyxXQUFILENBQWUsTUFBZixFQURGOztJQUdBLElBQUcsR0FBQSxLQUFTLEtBQVo7TUFDRSxFQUFFLENBQUMsUUFBSCxDQUFZLEdBQVosRUFERjs7QUFHQSxXQUFPO0VB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QUFtQixLQUF0QjtNQUNFLElBQUEsR0FBTyx5QkFBQSxHQUEwQixTQUFTLENBQUMsSUFEN0M7O1dBR0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxJQUFOLEVBQVksU0FBWixDQUNFLENBQUMsTUFESCxDQUNVLFNBQUE7YUFDTixPQUFPLENBQUMsQ0FBUixDQUFBO0lBRE0sQ0FEVixDQUdFLENBQUMsSUFISCxDQUdRLFNBQUMsUUFBRDtNQUNKLE1BQU0sQ0FBQyxDQUFQLENBQVMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUF2QixFQUErQixTQUEvQjtNQUNBLElBQUcsU0FBUyxDQUFDLEdBQVYsS0FBaUIsS0FBcEI7UUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQWYsQ0FBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsY0FBQSxHQUFlLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBOUQsRUFERjs7YUFFQSxTQUFTLENBQUMsR0FBVixHQUFnQixRQUFRLENBQUMsSUFBSSxDQUFDO0lBSjFCLENBSFI7RUFSTSxDQS9GUjs7O0FDRkYsSUFBQTs7QUFBQSxVQUFBLEdBQ0U7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELE9BQU8sQ0FBQyxDQUFSLENBQVUsWUFBVjtFQURDLENBQUg7OztBQ0RGLElBQUE7O0FBQUEsS0FBQSxHQUNFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxPQUFPLENBQUMsQ0FBUixDQUFVLE9BQVY7RUFEQyxDQUFIIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIGZpdDogKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIC0+XG4gICAgcmF0aW8gPSBNYXRoLm1pbihtYXhXaWR0aCAvIHNyY1dpZHRoLCBtYXhIZWlnaHQgLyBzcmNIZWlnaHQpXG4gICAgd2lkdGg6IHNyY1dpZHRoKnJhdGlvLCBoZWlnaHQ6IHNyY0hlaWdodCpyYXRpb1xuXG4gIGppbml0OiAtPlxuICAgICQuYWpheFNldHVwXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCJcblxuICBwYXRjaDogKHVybCwgZGF0YSkgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqcGF0Y2ggPSAkLmFqYXhcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgICB0eXBlOiAnUEFUQ0gnXG5cbiAgICBqcGF0Y2guZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpnZXQgPSAkLmdldCBhcmdzLi4uXG5cbiAgICBqZ2V0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqZ2V0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4gamdldFxuXG4gIHBvc3Q6IChhcmdzLi4uKSAtPlxuXG4gICAganBvc3QgPSAkLnBvc3QgYXJncy4uLlxuXG4gICAganBvc3QuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpwb3N0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBvc3RcblxuICBmYWlsOiAocmVzcG9uc2UpIC0+XG5cbiAgICBlcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTj8uZXJyb3JzP1swXVxuICAgIGlmIGVycm9yIGlzIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIFByb21wdC5pIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dFxuXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG4gIG1ldGhvZHM6IChvYmopIC0+XG4gICAgcmVzID0gW11cbiAgICBmb3IgaSxtIG9mIG9ialxuICAgICAgaWYgdHlwZW9mIG0gaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICByZXMucHVzaCBtXG4gICAgcmV0dXJuIHJlc1xuXG5fLmkoKVxuIiwiVGltZSA9XG4gIGludGVydmFsOiBmYWxzZVxuICBnYXA6IDEwMDBcblxuICBpOiAtPlxuICAgIEBpbnRlcnZhbCA9IHNldEludGVydmFsKEBzY3JhcGUsIEBnYWEpIGlmIEBpbnRlcnZhbCBpcyBmYWxzZVxuICAgIEBzY3JhcGUoKVxuXG4gIHNjcmFwZTogLT5cbiAgICAkKCd0aW1lJykuZWFjaCAoaSwgZWwpID0+XG4gICAgICBqZWwgPSAkIGVsXG4gICAgICBqZWwuaHRtbCBtb21lbnQoamVsLmF0dHIoJ3RpdGxlJykpLmZyb21Ob3coKVxuIiwiQ2xpZW50ID1cblxuICBzZWxlY3RVc2VyOiBmYWxzZVxuICBfaWQ6IGZhbHNlXG4gIGNyb3A6IGZhbHNlXG4gIHByb2ZpbGU6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIEBoYW5kbGVycygpXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvY2xpZW50c1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG5cbiAgICBAc2VsZWN0VXNlciA9IFNlbGVjdGl6ZS51c2VycyAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtdXNlcnMgPiBpbnB1dCcpLCBAc2VsZWN0VXNlckhhbmRsZXIsIG1lOiBmYWxzZVxuXG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0ID4gaW5wdXQnKS5mb2N1cygpXG4gXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmNsaWVudCA+IC5zdWJtaXQnKS5jbGljayBAbW9kaWZ5SGFuZGxlclxuXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdvdmVyJywgQGRyYWdvdmVyXG4gICAgJChkb2N1bWVudCkub24gJ2RyYWdsZWF2ZScsIEBkcmFnbGVhdmVcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2VudGVyIGRyYWdvdmVyJywgQGNhbmNlbFxuXG4gICAgJChkb2N1bWVudCkub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAZHJvcFxuXG4gICAgJCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YScpLm9uICdjbGljaycsIEBjaG9vc2VGaWxlXG4gICAgJCgnLmlucHV0LWltYWdlID4gaW5wdXQ6ZmlsZScpLmNoYW5nZSBAY2hhbmdlXG5cbiAgY2FuY2VsOiAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICBkcmFnb3ZlcjogLT5cbiAgICBfLm9uICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJhZ2xlYXZlOiAtPlxuICAgIF8ub2ZmICcuaW5wdXQtaW1hZ2UnXG5cbiAgZHJvcDogKGUpIC0+XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgXy5vZmYgJy5pbnB1dC1pbWFnZSdcblxuICAgIGlmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgYW5kIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoXG4gICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hhbmdlOiAtPlxuICAgIGlmICQodGhpcylbMF0uZmlsZXNcbiAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuICAgIENsaWVudC5jcm9wcGllIGZpbGVzWzBdXG5cbiAgY2hvb3NlRmlsZTogLT5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG5cbiAgY3JvcHBpZTogKGZpbGUpIC0+XG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAtPlxuXG4gICAgICBpZiBDbGllbnQuY3JvcCBpc250IGZhbHNlXG4gICAgICAgIENsaWVudC5jcm9wLmNyb3BwaWUgJ2Rlc3Ryb3knXG4gICAgICAgIENsaWVudC5jcm9wID0gZmFsc2VcblxuICAgICAgQ2xpZW50LmNyb3AgPSAkKCcuaW5wdXQtaW1hZ2UgPiAuY3JvcHBpZScpLmNyb3BwaWVcbiAgICAgICAgdXJsOiByZWFkZXIucmVzdWx0XG4gICAgICAgIHZpZXdwb3J0OlxuICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICBoZWlnaHQ6IDIwMFxuICAgICAgICBib3VuZGFyeTpcbiAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgaGVpZ2h0OiAzMDBcblxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMIGZpbGVcblxuICBzZWxlY3RVc2VySGFuZGxlcjogLT5cblxuICBtb2RpZnlIYW5kbGVyOiAtPlxuXG4gICAgaWYgQ2xpZW50LmNyb3AgaXNudCBmYWxzZVxuICAgICAgQ2xpZW50LmNyb3AuY3JvcHBpZSAncmVzdWx0JyxcbiAgICAgICAgdHlwZTogJ2NhbnZhcydcbiAgICAgICAgc2l6ZTogJ3ZpZXdwb3J0J1xuICAgICAgLnRoZW4gKHJlc3BvbnNlKSAtPlxuICAgICAgICBDbGllbnQuaW1hZ2VVcGxvYWQgQ2xpZW50LmRhdGFVUkl0b0Jsb2IocmVzcG9uc2UpLCAtPlxuICAgICAgICAgIENsaWVudC5tb2RpZnkoKVxuICAgIGVsc2VcbiAgICAgIENsaWVudC5tb2RpZnkoKVxuXG4gIG1vZGlmeTogLT5cblxuICAgIG5hbWUgPSAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtbmFtZSA+IGlucHV0JykudmFsKClcbiAgICB1c2VycyA9ICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JykudmFsKCkuc3BsaXQgJywnXG5cbiAgICBjYWxsID0gJy9hcGkvY2xpZW50cy9hZGQnXG4gICAgaWYgQ2xpZW50Ll9pZCBpc250IGZhbHNlXG4gICAgICBjYWxsID0gXCIvYXBpL2NsaWVudHMvdXBkYXRlLyN7Q2xpZW50Ll9pZH1cIlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudCcpKVxuXG4gICAgXy5nZXQgY2FsbCwgbmFtZTogbmFtZSwgdXNlcnM6IHVzZXJzLCBwcm9maWxlOiBDbGllbnQucHJvZmlsZVxuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIENsaWVudC5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9jbGllbnRzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgQ2xpZW50Ll9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4gICAgICAgIGlmIENsaWVudC5wcm9maWxlXG4gICAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tDbGllbnQucHJvZmlsZX0nKVwiXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnQnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2NsaWVudHMvJyxcbiAgICAgIF9pZDogQF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvY2xpZW50cy9uZXcnIGlmIHJlc3BvbnNlLmRhdGEubGVuZ3RoIDwgMVxuICAgICAgY2xpZW50ID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LW5hbWUgPiBpbnB1dCcpLnZhbCBjbGllbnQubmFtZVxuICAgICAgaWYgY2xpZW50LnByb2ZpbGVcbiAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tjbGllbnQucHJvZmlsZX0nKVwiXG4gICAgICAgIENsaWVudC5wcm9maWxlID0gY2xpZW50LnByb2ZpbGVcbiAgICAgIGZvciBpbmRleCwgdXNlciBvZiBjbGllbnQudXNlcnNcbiAgICAgICAgaWYgdXNlci5pZCBpc250IFVzZXIuX2lkXG4gICAgICAgICAgQ2xpZW50LnNlbGVjdFVzZXJbMF0uc2VsZWN0aXplLmFkZE9wdGlvbiBpZDogdXNlci5pZCwgbmFtZTogXCIje3VzZXIubmFtZX0gKCN7dXNlci5lbWFpbH0pXCJcbiAgICAgICAgICBDbGllbnQuc2VsZWN0VXNlclswXS5zZWxlY3RpemUuYWRkSXRlbSB1c2VyLmlkXG5cblxuICBkYXRhVVJJdG9CbG9iOiAoZGF0YVVSSSkgLT5cbiAgICBieXRlU3RyaW5nID0gdW5kZWZpbmVkXG4gICAgaWYgZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDBcbiAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSlcbiAgICBlbHNlXG4gICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKVxuICAgICMgc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdXG4gICAgIyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aClcbiAgICBpID0gMFxuICAgIHdoaWxlIGkgPCBieXRlU3RyaW5nLmxlbmd0aFxuICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSlcbiAgICAgIGkrK1xuICAgIG5ldyBCbG9iKFsgaWEgXSwgdHlwZTogbWltZVN0cmluZylcbiAgICAgICAgXG4gIGltYWdlVXBsb2FkOiAoYmxvYiwgY2FsbGJhY2spIC0+XG5cbiAgICBmZCA9IG5ldyBGb3JtRGF0YSgpXG4gICAgZmQuYXBwZW5kICdmaWxlJywgYmxvYlxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgIE5vdGljZS5pICdGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBDbGllbnQucHJvZmlsZSA9IHJlc3VsdC5kYXRhLnVybFxuICAgICAgICBjYWxsYmFjayhyZXN1bHQpXG5cblxuIiwiQ2xpZW50cyA9XG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICdjbGllbnRzJ1xuIiwiY29uZmlnID0ge1widmlld1wiOntcInBhdGhzXCI6W1wiL1VzZXJzL2svYmFzYWwvcmVzb3VyY2VzL3ZpZXdzXCJdLFwiY29tcGlsZWRcIjpcIi9Vc2Vycy9rL2Jhc2FsL3N0b3JhZ2UvZnJhbWV3b3JrL3ZpZXdzXCJ9LFwiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcIndoaXRlMlwiOlwiI2Y4ZjhmOFwiLFwid2hpdGUzXCI6XCIjRjRGNEY0XCIsXCJncmV5MVwiOlwiI2U1ZTVlNVwiLFwiZ3JleTJcIjpcIiNmNWY1ZjVcIixcImdyZXkzXCI6XCIjZDBkMGQwXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImJsYWNrMlwiOlwiIzI4MjgyOFwiLFwiYmxhY2szXCI6XCIjMzMzMzMzXCIsXCJyZWQxXCI6XCIjQzgyMTJCXCIsXCJjeWFuMVwiOlwiIzVGQTc5M1wiLFwieWVsbG93MVwiOlwiI0Y2QkI0NVwiLFwib3JhbmdlMVwiOlwiI0Y2OEY2MlwiLFwic2tpbjFcIjpcIiNGM0REQTNcIixcImdyZWVuMVwiOlwiIzViYTU0MVwiLFwiZ3JlZW4yXCI6XCIjODhkOTZkXCIsXCJncmVlbjNcIjpcIiM3N2QzNThcIixcImJsdWUxXCI6XCIjMWRhN2VlXCIsXCJibHVlMlwiOlwiIzAwNzNiYlwiLFwiZ29vZ2xlX2JsdWVcIjpcIiM0Mjg1ZjRcIixcImdvb2dsZV9ncmVlblwiOlwiIzM0YTg1M1wiLFwiZ29vZ2xlX3llbGxvd1wiOlwiI2ZiYmMwNVwiLFwiZ29vZ2xlX3JlZFwiOlwiI2VhNDMzNVwiLFwiZ2l0aHViX2JsdWVcIjpcIiMwRDI2MzZcIixcImZhY2Vib29rX2JsdWVcIjpcIiM0ODY3QUFcIixcImluc3RhZ3JhbV9vclwiOlwiI0ZGNzgwNFwiLFwidHdpdHRlcl9ibHVlXCI6XCIjMDBBQ0VEXCJ9LFwiZm9udFwiOntcIjQwNFwiOntcImZvbnQtZmFtaWx5XCI6XCJNb25vdG9uXCIsXCJmb250LXNpemVcIjpcIjc1cHhcIn0sXCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImgxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIn0sXCJoM2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjIwcHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJjMVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjMwMFwifSxcImMxYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTZweFwiLFwiZm9udC13ZWlnaHRcIjpcIjUwMFwifSxcImMxdGJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI0MDBcIn0sXCJjMXNiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNjAwXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMXB4XCJ9LFwiYzJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJjMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI1MDBcIn19LFwibWV0YVwiOntcInRpdGxlXCI6XCJiYXNhbFwiLFwidXJsXCI6XCJodHRwOi8vYmFzYWwuZGV2L1wiLFwiZGVzY3JpcHRpb25cIjpcIm1pbmltYWwgY29udGVudCBtYW5hZ2VtZW50XCIsXCJrZXl3b3Jkc1wiOlwiY21zXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovYmFzYWxcIn0sXCJkZWJ1Z2JhclwiOntcImVuYWJsZWRcIjpudWxsLFwic3RvcmFnZVwiOntcImVuYWJsZWRcIjp0cnVlLFwiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2RlYnVnYmFyXCIsXCJjb25uZWN0aW9uXCI6bnVsbCxcInByb3ZpZGVyXCI6XCJcIn0sXCJpbmNsdWRlX3ZlbmRvcnNcIjp0cnVlLFwiY2FwdHVyZV9hamF4XCI6dHJ1ZSxcImNsb2Nrd29ya1wiOmZhbHNlLFwiY29sbGVjdG9yc1wiOntcInBocGluZm9cIjp0cnVlLFwibWVzc2FnZXNcIjp0cnVlLFwidGltZVwiOnRydWUsXCJtZW1vcnlcIjp0cnVlLFwiZXhjZXB0aW9uc1wiOnRydWUsXCJsb2dcIjp0cnVlLFwiZGJcIjp0cnVlLFwidmlld3NcIjp0cnVlLFwicm91dGVcIjp0cnVlLFwibGFyYXZlbFwiOmZhbHNlLFwiZXZlbnRzXCI6ZmFsc2UsXCJkZWZhdWx0X3JlcXVlc3RcIjpmYWxzZSxcInN5bWZvbnlfcmVxdWVzdFwiOnRydWUsXCJtYWlsXCI6dHJ1ZSxcImxvZ3NcIjpmYWxzZSxcImZpbGVzXCI6ZmFsc2UsXCJjb25maWdcIjpmYWxzZSxcImF1dGhcIjpmYWxzZSxcImdhdGVcIjpmYWxzZSxcInNlc3Npb25cIjp0cnVlfSxcIm9wdGlvbnNcIjp7XCJhdXRoXCI6e1wic2hvd19uYW1lXCI6ZmFsc2V9LFwiZGJcIjp7XCJ3aXRoX3BhcmFtc1wiOnRydWUsXCJ0aW1lbGluZVwiOmZhbHNlLFwiYmFja3RyYWNlXCI6ZmFsc2UsXCJleHBsYWluXCI6e1wiZW5hYmxlZFwiOmZhbHNlLFwidHlwZXNcIjpbXCJTRUxFQ1RcIl19LFwiaGludHNcIjp0cnVlfSxcIm1haWxcIjp7XCJmdWxsX2xvZ1wiOmZhbHNlfSxcInZpZXdzXCI6e1wiZGF0YVwiOmZhbHNlfSxcInJvdXRlXCI6e1wibGFiZWxcIjp0cnVlfSxcImxvZ3NcIjp7XCJmaWxlXCI6bnVsbH19LFwiaW5qZWN0XCI6dHJ1ZSxcInJvdXRlX3ByZWZpeFwiOlwiX2RlYnVnYmFyXCJ9LFwiYXBwXCI6e1wiZWRpdG9yXCI6XCJtYWN2aW1cIn0sXCJjYWNoZVwiOntcImRlZmF1bHRcIjpcImFycmF5XCIsXCJzdG9yZXNcIjp7XCJhcGNcIjp7XCJkcml2ZXJcIjpcImFwY1wifSxcImFycmF5XCI6e1wiZHJpdmVyXCI6XCJhcnJheVwifSxcImRhdGFiYXNlXCI6e1wiZHJpdmVyXCI6XCJkYXRhYmFzZVwiLFwidGFibGVcIjpcImNhY2hlXCIsXCJjb25uZWN0aW9uXCI6bnVsbH0sXCJmaWxlXCI6e1wiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay9jYWNoZVwifSxcIm1lbWNhY2hlZFwiOntcImRyaXZlclwiOlwibWVtY2FjaGVkXCIsXCJzZXJ2ZXJzXCI6W3tcImhvc3RcIjpcIjEyNy4wLjAuMVwiLFwicG9ydFwiOjExMjExLFwid2VpZ2h0XCI6MTAwfV19LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCJ9fSxcInByZWZpeFwiOlwibGFyYXZlbFwifSxcInF1ZXVlXCI6e1wiZGVmYXVsdFwiOlwiYXJyYXlcIixcImNvbm5lY3Rpb25zXCI6e1wic3luY1wiOntcImRyaXZlclwiOlwic3luY1wifSxcImRhdGFiYXNlXCI6e1wiZHJpdmVyXCI6XCJkYXRhYmFzZVwiLFwidGFibGVcIjpcImpvYnNcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJleHBpcmVcIjo2MH0sXCJiZWFuc3RhbGtkXCI6e1wiZHJpdmVyXCI6XCJiZWFuc3RhbGtkXCIsXCJob3N0XCI6XCJsb2NhbGhvc3RcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJ0dHJcIjo2MH0sXCJzcXNcIjp7XCJkcml2ZXJcIjpcInNxc1wiLFwia2V5XCI6XCJ5b3VyLXB1YmxpYy1rZXlcIixcInNlY3JldFwiOlwieW91ci1zZWNyZXQta2V5XCIsXCJxdWV1ZVwiOlwieW91ci1xdWV1ZS11cmxcIixcInJlZ2lvblwiOlwidXMtZWFzdC0xXCJ9LFwiaXJvblwiOntcImRyaXZlclwiOlwiaXJvblwiLFwiaG9zdFwiOlwibXEtYXdzLXVzLWVhc3QtMS5pcm9uLmlvXCIsXCJ0b2tlblwiOlwieW91ci10b2tlblwiLFwicHJvamVjdFwiOlwieW91ci1wcm9qZWN0LWlkXCIsXCJxdWV1ZVwiOlwieW91ci1xdWV1ZS1uYW1lXCIsXCJlbmNyeXB0XCI6dHJ1ZX0sXCJyZWRpc1wiOntcImRyaXZlclwiOlwicmVkaXNcIixcImNvbm5lY3Rpb25cIjpcImRlZmF1bHRcIixcInF1ZXVlXCI6XCJkZWZhdWx0XCIsXCJleHBpcmVcIjo2MH19LFwiZmFpbGVkXCI6e1wiZGF0YWJhc2VcIjpcIm1vbmdvZGJcIixcInRhYmxlXCI6XCJmYWlsZWRfam9ic1wifX19OyIsIkRhc2hib2FyZCA9XG5cbiAgZGF0YTp7fVxuXG4gIGk6IC0+XG4gICAgQGdldGRhdGEgPT5cbiAgICAgIEBwb3B1bGF0ZSgpXG5cbiAgcG9wdWxhdGU6IC0+XG4gICAgJCgnLmRhc2hib2FyZCAudmFsdWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgICQoZWwpLmh0bWwgQGRvdHN0b3ZhbHVlICQoZWwpLmRhdGEgJ3ZhbHVlJ1xuXG4gIGdldGRhdGE6IChjb21wbGV0ZSkgLT5cblxuICAgIGdldHMgPSBbJ3VzZXJzJywnY2xpZW50cycsICdzdHJ1Y3R1cmVzJywgJ2VudHJpZXMnXVxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5kYXNoYm9hcmQnKSlcblxuICAgICQoZ2V0cykuZWFjaCAoaW5kZXgsIGdldCkgPT5cbiAgICAgIF8uZ2V0IFwiL2FwaS8je2dldH1cIlxuICAgICAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICAgICAgQGRhdGFbZ2V0XSA9IHJlc3BvbnNlXG4gICAgICAgICAgaWYgT2JqZWN0LmtleXMoQGRhdGEpLmxlbmd0aCA9PSBnZXRzLmxlbmd0aFxuICAgICAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgICAgIGNvbXBsZXRlKClcblxuICBkb3RzdG92YWx1ZTogKGRvdHMpIC0+XG4gICAgcmVzdWx0ID0gQGRhdGFcbiAgICBmb3IgZGltIGluIGRvdHMuc3BsaXQgJy4nXG4gICAgICByZXN1bHQgPSByZXN1bHRbZGltXVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuXG4iLCJFbnRpdGllcyA9XG5cbiAgYmxvZ3M6IFtdXG4gIGNyb3BzOiB7fVxuICBpbWFnZXM6IHt9XG5cbiAgcGxhY2Vob2xkZXJzOiBbXG4gICAgXCJUaGF0J3Mgd2hhdCBJJ20gYmxvZ2dpbmcgYWJvdXRcIlxuICAgIFwiSGF2ZSB5b3UgZ3V5cyBiZWVuIGJsb2dnaW5nP1wiXG4gICAgXCJIb2xkIGFsbCBteSBjYWxscywgSSdtIGJsb2dnaW5nXCJcbiAgICBcIlRlbGwgRG9ubmllIEknbSBibG9nZ2luZyBhbmQgSSdsbCBjYWxsIGhpbSBiYWNrXCJcbiAgICBcIkkgZ290dGEgcnVuLCB5b3Ugc2hvdWxkIGJlIGJsb2dnaW5nXCJcbiAgICBcIkkgd2FudCB5b3Ugb24gdGhlIHBob25lLCBidXQgSSBhbHNvIHdhbnQgeW91IGJsb2dnaW5nXCJcbiAgXVxuXG4gIEJsb2c6IChlbCwgbmFtZSwgdmFsdWU9ZmFsc2UpIC0+XG5cbiAgICBlZGl0b3IgPSBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGVcbiAgICAgIHBsYWNlaG9sZGVyOiBAcGxhY2Vob2xkZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEBwbGFjZWhvbGRlcnMubGVuZ3RoKV1cbiAgICAgIGNhbGxiYWNrczpcbiAgICAgICAgb25JbWFnZVVwbG9hZDogKGZpbGVzKSAtPlxuICAgICAgICAgIEVudGl0aWVzLmltYWdlVXBsb2FkIGZpbGVzLCB0aGlzXG5cbiAgICBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGUoJ2NvZGUnLCB2YWx1ZSkgaWYgdmFsdWUgaXNudCBmYWxzZVxuXG4gICAgQGJsb2dzLnB1c2ggbmFtZTogbmFtZSwgZWRpdG9yOiBlZGl0b3IsIGVsOiBlbC5maW5kKCcuYmxvZycpXG5cbiAgYmxvZ0dldENvZGU6IChuYW1lKSAtPlxuICAgIGZvciBibG9nIGluIEBibG9nc1xuICAgICAgcmV0dXJuIGJsb2cuZWwuc3VtbWVybm90ZSgnY29kZScpIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gXG4gIGJsb2dGb2N1czogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICBpZiBibG9nLm5hbWUgaXMgbmFtZVxuICAgICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuICBpbWFnZVVwbG9hZDogKGZpbGVzLCBlbCkgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBmaWxlc1swXVxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgICQoZWwpLnN1bW1lcm5vdGUoJ2VkaXRvci5pbnNlcnRJbWFnZScsIHJlc3VsdC5kYXRhLnVybClcbiAgICAgICAgTm90aWNlLmkgJ0ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG5cbiAgVGFnczogKGVsLCBuYW1lKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0Jykuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3Jlc3RvcmVfb25fYmFja3NwYWNlJywncmVtb3ZlX2J1dHRvbiddXG4gICAgICBkZWxpbWl0ZXI6ICcsJ1xuICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICAgIGNyZWF0ZTogKGlucHV0KSAtPlxuICAgICAgICB2YWx1ZTogaW5wdXRcbiAgICAgICAgdGV4dDogaW5wdXRcblxuICBEYXRlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1knXG5cblxuICBJbWFnZTogKGVsLCBuYW1lLCB2YWx1ZSkgLT5cblxuICAgIEBpbWFnZUhhbmRsZXJzIGVsXG5cbiAgICAjIHByZWxvYWQgZXhpc3RpbmcgaW1hZ2VzXG4gICAgaWYgdmFsdWUgaXNudCB1bmRlZmluZWRcbiAgICAgIEVudGl0aWVzLmNyb3BwZXIodmFsdWUsIGVsKVxuICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gdmFsdWVcblxuXG4gIGltYWdlSGFuZGxlcnM6IChlbCwgbmFtZSkgLT5cblxuICAgIGVsLm9uICdkcmFnb3ZlcicsIEBpbWFnZUhhbmRsZXIuZHJhZ292ZXJcbiAgICBlbC5vbiAnZHJhZ2xlYXZlJywgQGltYWdlSGFuZGxlci5kcmFnbGVhdmVcbiAgICBlbC5vbiAnZHJhZ2VudGVyIGRyYWdvdmVyJywgQGltYWdlSGFuZGxlci5jYW5jZWxcbiAgICBlbC5vbiAnZHJvcCBkcmFnZHJvcCcsIEBpbWFnZUhhbmRsZXIuZHJvcFxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEuc2VsZWN0Jykub24gJ2NsaWNrJywgQGltYWdlSGFuZGxlci5jaG9vc2VGaWxlXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gYnV0dG9uLmN0YS5zYXZlJykub24gJ2NsaWNrJywgQGltYWdlSGFuZGxlci5zYXZlXG4gICAgZWwuZmluZCgnLmlucHV0LWltYWdlID4gaW5wdXQ6ZmlsZScpLm9uICdjaGFuZ2UnLCBAaW1hZ2VIYW5kbGVyLmNoYW5nZVxuXG4gIGltYWdlSGFuZGxlcjpcblxuICAgIGRyYWdvdmVyOiAtPlxuICAgICAgXy5vbiAkKHRoaXMpLmZpbmQoJy5pbnB1dC1pbWFnZScpXG4gICAgZHJhZ2xlYXZlOiAtPlxuICAgICAgXy5vZmYgJCh0aGlzKS5maW5kKCcuaW5wdXQtaW1hZ2UnKVxuICAgIGNhbmNlbDogLT5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIGRyb3A6IChlKSAtPlxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgXy5vZmYgJCh0aGlzKS5maW5kICcuaW5wdXQtaW1hZ2UnXG5cbiAgICAgIGlmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgYW5kIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoXG4gICAgICAgIGZpbGVzID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgICBFbnRpdGllcy5sb2FkQ3JvcHBlciBmaWxlc1swXSwgJCh0aGlzKVxuXG4gICAgY2hvb3NlRmlsZTogLT5cbiAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXQnKS50cmlnZ2VyICdjbGljaydcblxuICAgIGNoYW5nZTogLT5cbiAgICAgIGlmICQodGhpcylbMF0uZmlsZXNcbiAgICAgICAgZmlsZXMgPSAkKHRoaXMpWzBdLmZpbGVzXG5cbiAgICAgICAgRW50aXRpZXMubG9hZENyb3BwZXIgZmlsZXNbMF0sICQodGhpcykucGFyZW50KCkucGFyZW50KClcblxuICAgIHNhdmU6IC0+XG5cbiAgICAgIG5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEgJ25hbWUnXG5cbiAgICAgIFNwaW5uZXIuaSgkKFwiLmVudGl0eV9uYW1lXyN7bmFtZX1cIikpXG5cbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmdldENyb3BwZWRDYW52YXMoKS50b0Jsb2IgKGJsb2IpIC0+XG4gICAgICAgIENsaWVudC5pbWFnZVVwbG9hZCBibG9iLCAocmVzdWx0KSAtPlxuICAgICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAsICdpbWFnZS9qcGVnJ1xuXG4gIGxvYWRDcm9wcGVyOiAoZmlsZSwgZWwpIC0+XG5cbiAgICBuYW1lID0gZWwuZGF0YSAnbmFtZSdcblxuICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcblxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAtPlxuICAgICAgRW50aXRpZXMuY3JvcHBlciByZWFkZXIucmVzdWx0LCBlbFxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMIGZpbGVcblxuICBjcm9wcGVyOiAodXJsLCBlbCkgLT5cblxuICAgIG5hbWUgPSBlbC5kYXRhICduYW1lJ1xuXG4gICAgaWYgRW50aXRpZXMuY3JvcHNbbmFtZV0gaXNudCB1bmRlZmluZWRcbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmRlc3Ryb3koKVxuICAgICAgRW50aXRpZXMuY3JvcHNbbmFtZV0gPSBmYWxzZVxuXG4gICAgZWwuZmluZCgnLmNyb3BwZXInKS5hdHRyICdzcmMnLCB1cmxcblxuICAgIEVudGl0aWVzLmNyb3BzW25hbWVdID0gbmV3IENyb3BwZXIgZWwuZmluZCgnLmNyb3BwZXInKVswXSxcbiAgICAgIG1pbkNvbnRhaW5lckhlaWdodDogMzAwXG4gICAgICBtaW5DYW52YXNIZWlnaHQ6IDMwMFxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZVxuICAgICAgcHJldmlldzogXCJkaXYuZW50aXR5X25hbWVfI3tuYW1lfSA+IGRpdi5pbnB1dC1pbWFnZSA+IGRpdi5waWN0dXJlXCJcbiAgICAgIGF1dG9Dcm9wQXJlYTogMVxuICAgICAgc3RyaWN0OiBmYWxzZVxuICAgICAgaGlnaGxpZ2h0OiB0cnVlXG5cbiAgICBfLm9uIGVsLmZpbmQoJy5zYXZlJylcblxuXG4iLCJFbnRyaWVzID1cblxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnZW50cmllcydcbiIsIkVudHJ5ID1cblxuICBzZWxlY3RTdHJ1Y3R1cmU6IHt9XG5cbiAgX2lkOiBmYWxzZVxuICBzdHJ1Y3R1cmU6IGZhbHNlXG4gIGVudHJ5OiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBAc2VsZWN0aXplKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvZW50cmllc1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG4gICAgZWxzZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5mb2N1cygpXG4gXG4gIHNlbGVjdGl6ZTogLT5cblxuICAgIEBzZWxlY3RTdHJ1Y3R1cmUgPSBTZWxlY3RpemUuc3RydWN0dXJlcyAkKCcubW9kaWZ5ID4gLnN0cnVjdHVyZSA+IHNlbGVjdCcpLFxuICAgICAgRW50cnkuc3RydWN0dXJlU2VsZWN0SGFuZGxlclxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5jbGljayBAc3VibWl0XG5cbiAgICAkKCcuZm9jdXNtZScpLmZvY3VzIC0+XG4gICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuXG4gIGxvYWQ6IChfaWQpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuZW50cnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL2VudHJpZXMvJyxcbiAgICAgIF9pZDogX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBlbnRyeSA9IHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgIEVudHJ5LmVudHJ5ID0gZW50cnlcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuYWRkT3B0aW9uIGVudHJ5LnN0cnVjdHVyZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBlbnRyeS5zdHJ1Y3R1cmUuaWRcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuZGlzYWJsZSgpXG5cbiAgc3VibWl0OiAtPlxuXG4gICAgbmFtZSA9ICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuICAgIGVudGl0aWVzID0gW11cblxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5ib2R5ID4gLmVudGl0eScpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgZW50aXR5X25hbWUgPSAkKGVsKS5maW5kKCcubGFiZWwnKS5odG1sKClcbiAgICAgIHR5cGUgPSAkKGVsKS5kYXRhICd0eXBlJ1xuXG4gICAgICBzd2l0Y2ggdHlwZVxuICAgICAgICB3aGVuICdUZXh0JyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKVxuICAgICAgICB3aGVuICdEYXRlJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKVxuICAgICAgICB3aGVuICdUYWdzJyB0aGVuIHZhbHVlID0gJChlbCkuZmluZCgnaW5wdXQnKS52YWwoKS5zcGxpdCAnLCdcbiAgICAgICAgd2hlbiAnQmxvZydcbiAgICAgICAgICBibG9nID0gRW50aXRpZXMuYmxvZ0dldENvZGUgZW50aXR5X25hbWVcbiAgICAgICAgICB2YWx1ZSA9IGJsb2dcbiAgICAgICAgd2hlbiAnSW1hZ2UnXG4gICAgICAgICAgdmFsdWUgPSBFbnRpdGllcy5pbWFnZXNbZW50aXR5X25hbWVdXG5cbiAgICAgIGVudGl0aWVzLnB1c2ggbmFtZTogZW50aXR5X25hbWUsIHR5cGU6IHR5cGUsIHZhbHVlOiB2YWx1ZVxuXG4gICAgLnByb21pc2UoKS5kb25lIC0+XG5cbiAgICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnknKSlcblxuICAgICAgY2FsbCA9ICcvYXBpL2VudHJpZXMvYWRkJ1xuICAgICAgaWYgRW50cnkuX2lkIGlzbnQgZmFsc2VcbiAgICAgICAgY2FsbCA9IFwiL2FwaS9lbnRyaWVzL3VwZGF0ZS8je0VudHJ5Ll9pZH1cIlxuXG4gICAgICBfLmdldCBjYWxsLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIHN0cnVjdHVyZTogRW50cnkuc3RydWN0dXJlXG4gICAgICAgIGVudGl0aWVzOiBlbnRpdGllc1xuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIEVudHJ5Ll9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL3N0cnVjdHVyZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBFbnRyeS5faWQgPSByZXNwb25zZS5kYXRhLl9pZFxuXG4gICMjI1xuICBjbGllbnRTZWxlY3RIYW5kbGVyOiAoZSkgLT5cbiAgICBjbGllbnRfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICByZXR1cm4gZmFsc2UgaWYgY2xpZW50X2lkLmxlbmd0aCBpc250IDI0XG4gICAgRW50cnkuYWRkU2VsZWN0Q2xpZW50SWQgPSBjbGllbnRfaWRcbiAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmVuYWJsZSgpXG4gICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5jbGVhck9wdGlvbnMoKVxuICAjIyNcblxuICBzdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyOiAoZSkgLT5cbiAgICBzdHJ1Y3R1cmVfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICByZXR1cm4gZmFsc2UgaWYgc3RydWN0dXJlX2lkLmxlbmd0aCBpc250IDI0XG4gICAgaWYgRW50cnkuZW50cnkgaXNudCBmYWxzZVxuICAgICAgRW50cnkubG9hZEVudGl0aWVzIEVudHJ5LmVudHJ5LmVudGl0aWVzLCBFbnRyeS5lbnRyeS5uYW1lXG4gICAgZWxzZVxuICAgICAgRW50cnkubG9hZFN0cnVjdHVyZSBzdHJ1Y3R1cmVfaWRcblxuICBsb2FkU3RydWN0dXJlOiAoX2lkKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcycsXG4gICAgICBfaWQ6IF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgRW50cnkuc3RydWN0dXJlID0gX2lkXG4gICAgICBAbG9hZEVudGl0aWVzIHJlc3BvbnNlLmRhdGFbMF0uZW50aXRpZXNcblxuICBsb2FkRW50aXRpZXM6IChlbnRpdGllcywgbmFtZT1mYWxzZSkgLT5cblxuICAgIF8ub24gJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lJ1xuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwobmFtZSkgaWYgbmFtZSBpc250IGZhbHNlXG5cbiAgICBib2R5ID0gJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmJvZHknKVxuICAgIGJvZHkuaHRtbCAnJ1xuXG4gICAgdGFiaW5kZXggPSAzXG5cbiAgICBmb3IgZW50aXR5LCBpIGluIGVudGl0aWVzXG5cbiAgICAgIGh0bWwgPSAkKFwiLnBhZ2UuZW50cnkgPiAjdGVtcGxhdGUgPiAuZW50aXR5XyN7ZW50aXR5LnR5cGV9XCIpLmNsb25lKClcbiAgICAgIGh0bWwuZGF0YSAnbmFtZScsIGVudGl0eS5uYW1lXG4gICAgICBodG1sLmFkZENsYXNzIFwiZW50aXR5X25hbWVfI3tlbnRpdHkubmFtZX1cIlxuXG4gICAgICBpZiBlbnRpdHkudmFsdWVcbiAgICAgICAgc3dpdGNoIGVudGl0eS50eXBlXG4gICAgICAgICAgd2hlbiAnVGV4dCcsJ1RhZ3MnLCAnRGF0ZScgdGhlbiBodG1sLmZpbmQoJ2lucHV0JykudmFsIGVudGl0eS52YWx1ZVxuXG4gICAgICBodG1sLmZpbmQoJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYScpLmF0dHIgJ3RhYmluZGV4JywgdGFiaW5kZXgrK1xuICAgICAgYm9keS5hcHBlbmQgaHRtbFxuXG4gICAgICBlbnRpdHlFbCA9ICQoXCIucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keSA+IC5lbnRpdHlfbmFtZV8je2VudGl0eS5uYW1lfVwiKVxuICAgICAgZW50aXR5RWwuZmluZCgnLmxhYmVsJykuaHRtbCBlbnRpdHkubmFtZVxuXG4gICAgICBpZiBFbnRpdGllc1tlbnRpdHkudHlwZV0gaXNudCB1bmRlZmluZWRcbiAgICAgICAgRW50aXRpZXNbZW50aXR5LnR5cGVdKGVudGl0eUVsLCBlbnRpdHkubmFtZSwgZW50aXR5LnZhbHVlKVxuICAgICQoJ1t0YWJpbmRleD0yXScpLmZvY3VzKClcbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0J1xuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4XG4iLCJHbG9iYWwgPVxuXG4gICMga2V2aW4gb2xzb24gKGtldmluQDI1Ni5pbykg8J+MgPCfjrdcblxuICB3aW5kb3c6IGZhbHNlXG4gIHdpbmRvd1RpbWVyOiBmYWxzZVxuICBpbml0OiBmYWxzZVxuXG4gIGk6IC0+XG4gICAgR2xvYmFsLmhhbmRsZXJzKClcbiAgICBHbG9iYWwubG9naW5DaGVjaygpXG5cbiAgICBfLm9uIFwiLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb25fI3tQYWdlfSwgLm1lbnVcIiBpZiBQYWdlP1xuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnByb2ZpbGUnKS5jbGljayBHbG9iYWwudXNlclByb2ZpbGVIYW5kbGVyXG4gICAgJCgnLm9hdXRocyA+IC5vYXV0aCcpLmNsaWNrIEdsb2JhbC51c2VyT2F1dGhIYW5kbGVyXG4gICAgJCgnaGVhZGVyID4gLmlubmVyID4gLm1lID4gLnBpY3R1cmUgPiAubG9nb3V0JykuY2xpY2sgR2xvYmFsLmxvZ291dEhhbmRsZXJcbiAgICAkKCcubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbicpLmNsaWNrIEdsb2JhbC5tZW51SGFuZGxlclxuXG4gIG1lbnVIYW5kbGVyOiAtPlxuICAgIF8ub2ZmICQoJy5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uJylcbiAgICBzZWxlY3RlZCA9ICQodGhpcykuZmluZCgnLmxhYmVsJykuaHRtbCgpXG4gICAgXy5vbiAkKFwiLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb24ub3B0aW9uXyN7c2VsZWN0ZWR9XCIpXG5cbiAgbG9nb3V0SGFuZGxlcjogLT5cblxuICAgIFByb21wdC5pICdMb2dvdXQnLCAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICByZXR1cm4gZmFsc2UgaWYgcmVzcG9uc2UgaXNudCAnWWVzJ1xuXG4gICAgICBTcGlubmVyLmkgJCgnaGVhZGVyJylcblxuICAgICAgTWUubG9nb3V0IC0+XG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnByb2ZpbGUnXG4gICAgICAgIF8uc3dhcCAnLm1lID4gLnBpY3R1cmUnXG4gICAgICAgIE5vdGljZS5pICdMb2dvdXQgU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuICAgICAgICAsIDEyMDBcblxuICB1c2VyUHJvZmlsZUhhbmRsZXI6IC0+XG5cbiAgICBvYSA9ICQoJy5vYXV0aHMnKVxuICAgIHRsID0gbmV3IFRpbWVsaW5lTWF4IHJlcGVhdDogMFxuXG4gICAgaWYgb2EuaGFzQ2xhc3MgJ29mZidcbiAgICAgIF8ub24gb2FcbiAgICAgIHRsLnRvICcjcHJvZmlsZVNWRycsIDAuOCwge21vcnBoU1ZHOiAnI2NhbmNlbFNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICBlbHNlXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNwcm9maWxlU1ZHJywgZWFzZTpQb3dlcjQuZWFzZUluT3V0fVxuICAgICAgXy5vZmYgb2EsIG9mZmluZzogMC41XG5cbiAgdXNlck9hdXRoSGFuZGxlcjogLT5cblxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG5cbiAgICByZXR1cm4gdHJ1ZSBpZiB0eXBlIGlzICdjYW5jZWwnXG5cbiAgICBHbG9iYWwub2F1dGhXaW5kb3cgJy9sb2FkaW5nJ1xuXG4gICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICBNZS5vYXV0aCB0eXBlLCAodXJpKSAtPlxuICAgICAgR2xvYmFsLndpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJpXG5cbiAgb2F1dGhXaW5kb3c6ICh1cmwpIC0+XG4gICAgdyA9IDY0MFxuICAgIGggPSA1NTBcbiAgICBsZWZ0ID0gKHNjcmVlbi53aWR0aC8yKSAtICh3LzIpXG4gICAgdG9wID0gKHNjcmVlbi5oZWlnaHQvMikgLSAoaC8yKVxuXG5cbiAgICBHbG9iYWwud2luZG93ID0gd2luZG93Lm9wZW4odXJsLCAnTG9naW4gLyBSZWdpc3RlcicsIFwidG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPSN7d30saGVpZ2h0PSN7aH0sdG9wPSN7dG9wfSxsZWZ0PSN7bGVmdH1cIilcbiAgICBHbG9iYWwud2luZG93LmZvY3VzIGlmIHdpbmRvdy5mb2N1c1xuICAgIEdsb2JhbC53aW5kb3dUaW1lciA9IHNldEludGVydmFsIC0+XG4gICAgICBpZiBHbG9iYWwud2luZG93LmNsb3NlZFxuICAgICAgICBjbGVhckludGVydmFsIEdsb2JhbC53aW5kb3dUaW1lclxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgICBjb25zb2xlLmxvZyAnY2xvc2luZyBvdXIgc2hpdGUnXG4gICAgLCA1MFxuXG5cblxuICAgIHJldHVyblxuXG4gIG9hdXRoQ29tcGxldGU6ICh1c2VyKSAtPlxuICAgIFNwaW5uZXIuZCgpXG4gICAgR2xvYmFsLmxvZ2luIHVzZXJcbiAgICBOb3RpY2UuaSAnTG9naW4gU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuICAgICNzZXRUaW1lb3V0IC0+IGxvY2F0aW9uLmhyZWYgPSAnL2Rhc2hib2FyZCcgLCAyMDAwXG5cbiAgbG9naW46ICh1c2VyKSAtPlxuXG4gICAgd2luZG93LlVzZXIgPSB1c2VyXG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5pbWFnZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5waWN0dXJlfSlcIlxuICAgIF8ub2ZmICcubWUgPiAucHJvZmlsZSdcbiAgICBfLm9mZiAnLm1lID4gLm9hdXRocydcbiAgICBfLm9uICcubWUgPiAucGljdHVyZSdcblxuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50ID4gLm5hbWUnKS5odG1sIFVzZXIuY2xpZW50Lm5hbWVcblxuICBsb2dpbkNoZWNrOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJ2hlYWRlcicpKVxuXG4gICAgTWUuYXV0aGVkIChyZXN1bHQpIC0+XG4gICAgICBHbG9iYWwubG9naW4ocmVzdWx0KSBpZiByZXN1bHQgaXNudCBmYWxzZVxuICAgICAgaWYgR2xvYmFsLmluaXQgaXNudCBmYWxzZSBhbmQgcmVzdWx0IGlzbnQgZmFsc2VcbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgd2luZG93W0dsb2JhbC5pbml0XS5pKClcbiAgICAgIGVsc2VcbiAgICAgICAgU3Bpbm5lci5kKClcblxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZGFzaGJvYXJkJyBpZiBsb2NhdGlvbi5wYXRobmFtZSBpcyAnLycgYW5kIHJlc3VsdCBpc250IGZhbHNlXG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy8nIGlmIHJlc3VsdCBpcyBmYWxzZSBhbmQgbG9jYXRpb24ucGF0aG5hbWUgaXNudCAnLydcbiIsIl8uY29uc3RydWN0b3IoKVxuXG5jbGFzcyBJbmRleFxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy50b3AgLmJ1cmdlcicpLmNsaWNrIEBtb2JpbGVcblxuICBtb2JpbGU6IC0+XG4gICAgXy5zd2FwICcudG9wID4gLmJ1cmdlcidcbiAgICBfLnN3YXAgJy50b3AgPiAubWVudSdcbiIsIkxpc3RpbmcgPVxuICBjb250ZW50OiBmYWxzZVxuICBzZWxlY3RlZDogW11cbiAgc2VsZWN0ZWRDdXJzb3I6IDBcblxuXG4gIGk6IChjb250ZW50KSAtPlxuICAgIEBjb250ZW50ID0gY29udGVudFxuICAgIEBsb2FkKClcbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLmNoZWNrYm94JywgQGNoZWNrYm94SGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2hhbmdlJywgJy5saXN0LWhlYWRlciA+IC5jaGVja2JveCA+IGlucHV0JywgQHNlbGVjdEFsbEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NoYW5nZScsICcuY2hlY2tib3ggPiBpbnB1dCcsIEBzdGF0ZUhhbmRsZXJcblxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb24nLCBAYWN0aW9uSGFuZGxlclxuXG4gIGNoZWNrYm94SGFuZGxlcjogLT5cbiAgICBjYiA9ICQodGhpcykuZmluZCAnaW5wdXQnXG4gICAgaWYgZXZlbnQudGFyZ2V0LnR5cGUgaXNudCAnY2hlY2tib3gnXG4gICAgICBjYlswXS5jaGVja2VkID0gIWNiWzBdLmNoZWNrZWRcbiAgICAgIGNiLmNoYW5nZSgpXG5cbiAgc2VsZWN0QWxsSGFuZGxlcjogLT5cbiAgICBpZiB0aGlzLmNoZWNrZWRcbiAgICAgICQoJy5saXN0aW5nID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLnByb3AgJ2NoZWNrZWQnLCB0cnVlXG4gICAgZWxzZVxuICAgICAgJCgnLmxpc3RpbmcgPiAuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykucHJvcCAnY2hlY2tlZCcsIGZhbHNlXG5cbiAgc3RhdGVIYW5kbGVyOiAtPlxuICAgIGlkcyA9IFtdXG5cbiAgICAkKCcuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBpZiBlbC5jaGVja2VkXG4gICAgICAgIGlkcy5wdXNoICQoZWwpLmRhdGEgJ19pZCdcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuICAgICAgaWYgaWRzLmxlbmd0aCA+IDBcbiAgICAgICAgJCgnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucyA+IC5jb3B5ID4gLnZhbHVlJykudGV4dCBpZHMubGVuZ3RoXG4gICAgICAgIF8ub2ZmICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cydcbiAgICAgICAgXy5vbiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucydcbiAgICAgIGVsc2VcbiAgICAgICAgXy5vbiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMnXG4gICAgICAgIF8ub2ZmICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zJ1xuICAgICAgTGlzdGluZy5zZWxlY3RlZCA9IGlkc1xuXG4gIGFjdGlvbkhhbmRsZXI6IC0+XG4gICAgdHlwZSA9ICQodGhpcykuZGF0YSAndHlwZSdcblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdkZWxldGUnXG4gICAgICAgIFByb21wdC5pIFwiRGVsZXRpbmcgI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gaXRlbXMocylcIixcbiAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGVzZT8nLCBbJ1llcycsJ05vJ10sIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJldHVybiB0cnVlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcbiAgICAgICAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gIGRlbGV0ZTogKGlkLCBjYWxsYmFjaykgLT5cblxuICAgIFNwaW5uZXIuaSgkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9XCIpKVxuICAgIF8uZ2V0IFwiL2FwaS8je0xpc3RpbmcuY29udGVudH0vZGVsZXRlLyN7aWR9XCJcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgIGNhbGxiYWNrIHRydWVcbiAgICAuZmFpbCAtPlxuICAgICAgY2FsbGJhY2sgZmFsc2VcblxuICBkZWxldGVTZWxlY3RlZDogKGN1cnNvcj0wKSAtPlxuXG4gICAgaWYgTGlzdGluZy5zZWxlY3RlZC5sZW5ndGggaXMgY3Vyc29yXG4gICAgICBOb3RpY2UuaSAnU3RydWN0dXJlKHMpIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICBAbG9hZCgpXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgTGlzdGluZy5kZWxldGUgTGlzdGluZy5zZWxlY3RlZFtjdXJzb3JdLCAocmVzdWx0KSAtPlxuICAgICAgTGlzdGluZy5kZWxldGVTZWxlY3RlZCArK2N1cnNvciBpZiByZXN1bHQgaXMgdHJ1ZVxuXG4gIGxvYWQ6IC0+XG5cbiAgICBTcGlubmVyLmkoJChcIi5wYWdlLiN7TGlzdGluZy5jb250ZW50fVwiKSlcblxuICAgIF8uZ2V0IFwiL2FwaS8je0Bjb250ZW50fVwiLCB2aWV3OiB0cnVlXG4gICAgLmRvbmUgKHJlc3BvbnNlKSA9PlxuICAgICAgVGltZS5pKClcbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAkKCcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cyA+IC5jb3B5ID4gLnZhbHVlJykudGV4dCByZXNwb25zZS5kYXRhLmxlbmd0aFxuICAgICAgJChcIi4je0Bjb250ZW50fSA+IC5jb250ZW50ID4gLmxpc3RpbmcgPiAuaXRlbXNcIikuaHRtbCByZXNwb25zZS52aWV3XG4iLG51bGwsIk1lID1cblxuICBsb2dvdXQ6IChjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0ICcvYXBpL2F1dGgvbG9nb3V0J1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZSgpXG5cbiAgb2F1dGg6ICh0eXBlLCBjb21wbGV0ZSkgLT5cblxuICAgIF8uZ2V0IFwiL2FwaS9hdXRoLyN7dHlwZX1cIlxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZShyZXNwb25zZS5kYXRhLnVyaSlcblxuICBhdXRoZWQ6IChyZXN1bHQpIC0+XG4gICAgXy5nZXQgJy9hcGkvYXV0aCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgcmVzdWx0IHJlc3BvbnNlLmRhdGEudXNlclxuXG4gIGdldDpcbiAgICBjbGllbnRJZDogLT5cbiAgICAgIHJldHVybiBVc2VyLmNsaWVudC5pZFxuIiwiTm90Zm91bmQgPVxuICBpOiAtPlxuICAgICQoJyNsaW5lZXJyb3InKS5ub3ZhY2FuY3lcbiAgICAgICdyZWJsaW5rUHJvYmFiaWxpdHknOiAwLjFcbiAgICAgICdibGlua01pbic6IDAuMlxuICAgICAgJ2JsaW5rTWF4JzogMC42XG4gICAgICAnbG9vcE1pbic6IDhcbiAgICAgICdsb29wTWF4JzogMTBcbiAgICAgICdjb2xvcic6ICcjZmZmZmZmJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4ICNmZmZmZmYnLCAnMCAwIDMwcHggIzAwODAwMCcsICcwIDAgNnB4ICMwMDAwZmYnXVxuXG4gICAgJCgnI2xpbmVjb2RlJykubm92YWNhbmN5XG4gICAgICAnYmxpbmsnOiAxXG4gICAgICAnb2ZmJzogMVxuICAgICAgJ2NvbG9yJzogJ1JlZCdcbiAgICAgICdnbG93JzogWycwIDAgODBweCBSZWQnLCAnMCAwIDMwcHggRmlyZUJyaWNrJywgJzAgMCA2cHggRGFya1JlZCddXG4iLCJOb3RpY2UgPVxuXG4gIHR5cGVzOiBbJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZyddXG5cbiAgZWw6IGZhbHNlXG5cbiAgb246IGZhbHNlXG4gIHByb2dyZXNzOiBmYWxzZVxuICB0aW1lb3V0OiBmYWxzZVxuICBjbG9zZTogdHJ1ZVxuXG4gIGRlZmF1bHQ6XG4gICAgdHlwZTogJ2luZm8nXG4gICAgcHJvZ3Jlc3M6IGZhbHNlXG4gICAgdGltZW91dDogNTAwMFxuXG4gIGk6IChjb3B5LG9wdGlvbnM9e30pIC0+XG5cbiAgICBAb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ge30sIEBkZWZhdWx0XG5cbiAgICBmb3Iga2V5LCBwYXJhbSBvZiBvcHRpb25zXG4gICAgICBAb3B0aW9uc1trZXldID0gcGFyYW1cblxuICAgIEBlbCA9ICQoJy5ub3RpY2UnKSBpZiBAZWwgaXMgZmFsc2VcblxuICAgIGZvciBkdHlwZSBpbiBAdHlwZXNcbiAgICAgIEBlbC5yZW1vdmVDbGFzcyBkdHlwZVxuICAgIEBlbC5hZGRDbGFzcyBAb3B0aW9ucy50eXBlXG4gICAgQGVsLmZpbmQoJy5jb3B5ID4gLm1lc3NhZ2UnKS5odG1sIGNvcHlcblxuICAgIGlmIEBvcHRpb25zLnByb2dyZXNzIGlzbnQgZmFsc2VcbiAgICAgIGlmIEBwcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgICBfLm9uIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgICAgQHByb2dyZXNzID0gdHJ1ZVxuICAgICAgaWYgQGNsb3NlIGlzIHRydWVcbiAgICAgICAgXy5vZmYgQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICAgIEBjbG9zZSA9IGZhbHNlXG4gICAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG4gICAgICAgICwgMTAwXG4gICAgICBlbHNlXG4gICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZSBhbmQgQHByb2dyZXNzIGlzIHRydWVcbiAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCAnMCUnKVxuICAgICAgXy5vZmYgQGVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgICAgQHByb2dyZXNzID0gZmFsc2VcbiAgICAgIF8ub24gQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICBAY2xvc2UgPSB0cnVlXG5cbiAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgIF8ub24gQGVsXG4gICAgICBAaGFuZGxlcnMub24oKVxuICAgICAgQG9uID0gdHJ1ZVxuXG4gICAgaWYgQG9wdGlvbnMudGltZW91dCBpc250IGZhbHNlIGFuZCBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgQHRpbWVvdXQgPSBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEBkKClcbiAgICAgICwgQG9wdGlvbnMudGltZW91dFxuXG4gIGhhbmRsZXJzOlxuICAgIG9uOiAtPlxuICAgICAgJCgnLm5vdGljZScpLm9uICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuICAgIG9mZjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC5jbG9zZSA+IC5pbm5lcicsIE5vdGljZS5kXG5cbiAgZDogLT5cbiAgICBjbGVhclRpbWVvdXQgTm90aWNlLnRpbWVvdXQgaWYgTm90aWNlLnRpbWVvdXQgaXNudCBmYWxzZVxuICAgIE5vdGljZS50aW1lb3V0ID0gZmFsc2VcbiAgICBOb3RpY2UuaGFuZGxlcnMub2ZmKClcbiAgICBfLm9uIE5vdGljZS5lbC5maW5kKCcuY2xvc2UnKVxuICAgIE5vdGljZS5jbG9zZSA9IHRydWVcbiAgICBfLm9mZiBOb3RpY2UuZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgTm90aWNlLnByb2dyZXNzID0gZmFsc2VcbiAgICBfLm9mZiBOb3RpY2UuZWwsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC4yXG4gICAgTm90aWNlLm9uID0gZmFsc2VcbiIsIlByb21wdCA9XG4gIGVsOiB7fVxuICBvcHRpb25zOiB7fVxuICBjYWxsYmFjazogZmFsc2VcbiAgcGFyYW1zOiB7fVxuXG4gIGk6ICh0aXRsZSwgY29weSwgb3B0aW9ucz1bJ09LJ10sIHBhcmFtcywgY2FsbGJhY2spIC0+XG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBmYWxzZVxuICAgIFByb21wdC5wYXJhbXMgPSBmYWxzZVxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ2Z1bmN0aW9uJ1xuICAgIFByb21wdC5jYWxsYmFjayA9IGNhbGxiYWNrIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG5cbiAgICBQcm9tcHQucGFyYW1zID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCdcblxuICAgIFByb21wdC5lbCA9ICQgJy5wcm9tcHQnXG5cbiAgICBQcm9tcHQuZWwuZmluZCAnLnRpdGxlJ1xuICAgICAgLmh0bWwgdGl0bGVcbiAgICBQcm9tcHQuZWwuZmluZCAnLmNvcHknXG4gICAgICAuaHRtbCBjb3B5XG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAndGV4dGFyZWEnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLnRleHRhcmVhIGlzIHRydWVcbiAgICAgIF8ub24gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICAgIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCBwYXJhbXMudmFsdWVcblxuICAgIFByb21wdC5vcHRpb25zID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb25zID4gLm9wdGlvbidcbiAgICBfLm9mZiBQcm9tcHQub3B0aW9uc1xuICAgIFByb21wdC5vcHRpb25zLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gICAgZm9yIG8saSBpbiBvcHRpb25zXG4gICAgICBvcHRpb24gPSBQcm9tcHQuZWwuZmluZCBcIi5vcHRpb25zICA+IC5vcHRpb25fI3tpKzF9XCJcbiAgICAgIF8ub24gb3B0aW9uXG4gICAgICBvcHRpb24uaHRtbCBvXG4gICAgICAgIC5kYXRhICd2YWx1ZScsIG9cblxuICAgIF8ub24gUHJvbXB0LmVsLFxuICAgIF8ub24gJy5iZmFkZSdcblxuICAgIFByb21wdC5oYW5kbGVycygpXG4gICAgUHJvbXB0Lm9wdGlvbnMuZmlyc3QoKS5mb2N1cygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJChkb2N1bWVudCkua2V5ZG93biBQcm9tcHQua2V5ZG93blxuICAgIFByb21wdC5vcHRpb25zLm9uICdjbGljaycsIFByb21wdC5jbGlja1xuICAgIFByb21wdC5lbC5maW5kKCcuaW5uZXIgPiAuY2FuY2VsJykub24gJ2NsaWNrJywgUHJvbXB0LmNhbmNlbFxuXG4gIGtleWRvd246IC0+XG4gICAgayA9IGV2ZW50LndoaWNoXG4gICAga2V5cyA9IFszOSwgOSwgMzcsIDEzLCAyN11cbiAgICByZXR1cm4gdHJ1ZSBpZiBrIG5vdCBpbiBrZXlzXG5cbiAgICBjdXJyZW50ID0gUHJvbXB0LmVsLmZpbmQgJy5vcHRpb24ub24uYWN0aXZlJ1xuICAgIHNoaWZ0ID0gd2luZG93LmV2ZW50LnNoaWZ0S2V5XG5cbiAgICBpZiBrIGlzIDM5IG9yIChrIGlzIDkgYW5kICFzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQubmV4dCgpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5uZXh0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb25fMScpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMzcgb3IgKGsgaXMgOSBhbmQgc2hpZnQpXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgICBpZiBjdXJyZW50LnByZXYoKS5oYXNDbGFzcyAnb24nXG4gICAgICAgIGN1cnJlbnQucHJldigpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICBlbHNlXG4gICAgICAgIFByb21wdC5lbC5maW5kKCcub3B0aW9uLm9uJykubGFzdCgpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIGsgaXMgMTNcbiAgICAgIFByb21wdC50cmlnZ2VyIFByb21wdC5lbC5maW5kKCcub3B0aW9uLmFjdGl2ZScpLmRhdGEgJ3ZhbHVlJ1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgaWYgayBpcyAyN1xuICAgICAgUHJvbXB0LnRyaWdnZXIoZmFsc2UpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICBjYW5jZWw6IC0+XG4gICAgUHJvbXB0LnRyaWdnZXIgZmFsc2VcblxuICBjbGljazogLT5cbiAgICBQcm9tcHQudHJpZ2dlciAkKHRoaXMpLmRhdGEgJ3ZhbHVlJ1xuXG4gIHRyaWdnZXI6ICh2YWx1ZSkgLT5cbiAgICBfLm9mZiBQcm9tcHQuZWwuZmluZCAnLnRleHRhcmVhJ1xuICAgIF8ub2ZmIFByb21wdC5lbCwgb2ZmaW5nOiBmYWxzZSwgb2ZmdGltZTogMC4yXG4gICAgI18ub2ZmICcuYmZhZGUnLCBvZmZpbmc6IGZhbHNlLCBvZmZpdG1lOiAwLjJcbiAgICBfLm9mZiAnLmJmYWRlJ1xuICAgIFByb21wdC5vcHRpb25zLnVuYmluZCAnY2xpY2snLCBQcm9tcHQuY2xpY2tcbiAgICAkKGRvY3VtZW50KS51bmJpbmQgJ2tleWRvd24nLCBQcm9tcHQua2V5ZG93blxuICAgIGlmIFByb21wdC5wYXJhbXMudGV4dGFyZWFcbiAgICAgIHZhbCA9IFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCgpXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHJlc3BvbnNlOiB2YWx1ZSwgdmFsOiB2YWxcbiAgICBlbHNlXG4gICAgICBQcm9tcHQuY2FsbGJhY2s/IHZhbHVlXG4iLCJTZWxlY3RpemUgPVxuXG4gIGNsaWVudHM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuICAgIHNlbGVjdENsaWVudCA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgYSBDbGllbnQgXCJcbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgcmVuZGVyOlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdj4je2l0ZW0ubmFtZX08L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvY2xpZW50cycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0Q2xpZW50LmNoYW5nZSBoYW5kbGVyXG4gICAgcmV0dXJuIHNlbGVjdENsaWVudFxuXG4gIHN0cnVjdHVyZXM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuXG4gICAgc2VsZWN0U3RydWN0dXJlID0gZWxlbWVudC5zZWxlY3RpemVcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBhIFN0cnVjdHVyZSAgIFwiXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXY+I3tpdGVtLm5hbWV9PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdFN0cnVjdHVyZS5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RTdHJ1Y3R1cmVcblxuICB1c2VyczogKGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpIC0+XG4gICAgc2VsZWN0VXNlciA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3JlbW92ZV9idXR0b24nXVxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICByZW5kZXI6XG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2IHN0eWxlPSdsaW5lLWhlaWdodDogMzBweDsnPiN7aXRlbS5uYW1lfSAoI3tpdGVtLmVtYWlsfSkgPGltZyBzcmM9JyN7aXRlbS5waWN0dXJlfScgc3R5bGU9J2Zsb2F0OiBsZWZ0OyB3aWR0aDogMzBweDsgaGVpZ2h0OiAzMHB4OyBtYXJnaW4tcmlnaHQ6IDEwcHg7JyAvPjwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS91c2VycycsIG9wdGlvbnNcbiAgICAgICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgIGZvciBpdGVtIGluIHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGlkOiBpdGVtLl9pZCwgbmFtZTogaXRlbS5uYW1lLCBlbWFpbDogaXRlbS5lbWFpbCwgcGljdHVyZTogaXRlbS5waWN0dXJlXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzKVxuXG4gICAgc2VsZWN0VXNlci5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RVc2VyXG5cblxuIiwiXG5TcGlubmVyID1cblxuICBzdGF0ZTogZmFsc2VcblxuICBlbDoge31cblxuICBpOiAoZWwsIG92ZXJyaWRlKSAtPlxuXG4gICAgQGVsID0gJCgnLnNwaW5uZXInKVxuXG4gICAgcmVjdCA9IGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBjb29yZHMgPVxuICAgICAgdG9wOiBcIiN7cmVjdC50b3AgKyAkKHdpbmRvdykuc2Nyb2xsVG9wKCl9cHhcIlxuICAgICAgbGVmdDogXCIje3JlY3QubGVmdH1weFwiXG4gICAgICB3aWR0aDogXCIje3JlY3Qud2lkdGh9cHhcIlxuICAgICAgaGVpZ2h0OiBcIiN7cmVjdC5oZWlnaHR9cHhcIlxuXG4gICAgaWYgb3ZlcnJpZGUgaXNudCB1bmRlZmluZWRcbiAgICAgIGZvciBrZXksIGNvb3JkIG9mIG92ZXJyaWRlXG4gICAgICAgIGNvb3Jkc1trZXldID0gY29vcmRcblxuICAgIEBlbC5jc3MgY29vcmRzXG5cbiAgICBfLm9uIEBlbFxuICAgIEBzdGF0ZSA9IHRydWVcblxuICBkOiAtPlxuICAgIF8ub2ZmIEBlbFxuICAgIEBzdGF0ZSA9IGZhbHNlXG4iLCJTdHJ1Y3R1cmUgPVxuXG4gIHRlbXBsYXRlOiBmYWxzZVxuICBfaWQ6IGZhbHNlXG5cbiAgY2xpZW50U2VsZWN0OiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBAdGVtcGxhdGUgPSAkKCcubW9kaWZ5ID4gI3RlbXBsYXRlJykuaHRtbCgpXG4gICAgQGhhbmRsZXJzKClcblxuICAgIEBjbGllbnRTZWxlY3QgPSBTZWxlY3RpemUuY2xpZW50cyAkKCcucGFnZS5zdHJ1Y3R1cmUgPiAubW9kaWZ5ID4gLmRldGFpbC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKSxcbiAgICAgIEBjbGllbnRTZWxlY3RoYW5kbGVyXG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9zdHJ1Y3R1cmVzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcbiAgICBlbHNlXG4gICAgICBAZW50aXR5QWRkKClcblxuXG4gICAgQGNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuZm9jdXMoKSBpZiBAX2lkIGlzIGZhbHNlXG5cblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAubW9yZScpLmNsaWNrIEBlbnRpdHlBZGRIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcycpLm9uICdjbGljaycsJy5lbnRpdHkgPiAucmVtb3ZlJywgQGVudGl0eVJlbW92ZUhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGFwJykuY2xpY2sgQHN1Ym1pdEhhbmRsZXJcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLnN0cnVjdHVyZScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcy8nLFxuICAgICAgX2lkOiBAX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy9zdHJ1Y3R1cmVzL25ldycgaWYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPCAxXG4gICAgICBzdHJ1Y3R1cmUgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICAkKCcubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCBzdHJ1Y3R1cmUubmFtZVxuICAgICAgZm9yIGksIGVudGl0eSBvZiBzdHJ1Y3R1cmUuZW50aXRpZXNcbiAgICAgICAgU3RydWN0dXJlLmVudGl0eUFkZCBmYWxzZSwgZW50aXR5XG5cbiAgICAgIFN0cnVjdHVyZS5jbGllbnRTZWxlY3RbMF0uc2VsZWN0aXplLmFkZE9wdGlvblxuICAgICAgICBpZDogc3RydWN0dXJlLmNsaWVudC5pZCwgbmFtZTogc3RydWN0dXJlLmNsaWVudC5uYW1lXG4gICAgICBTdHJ1Y3R1cmUuY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBzdHJ1Y3R1cmUuY2xpZW50LmlkXG5cblxuXG4gIGVudGl0eUFkZEhhbmRsZXI6IC0+XG4gICAgU3RydWN0dXJlLmVudGl0eUFkZCh0cnVlKVxuXG4gIGVudGl0eVJlbW92ZUhhbmRsZXI6IC0+XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKVxuXG4gIGVudGl0eUFkZDogKGZvY3VzPWZhbHNlLCBlbnRpdHk9ZmFsc2UpIC0+XG5cbiAgICAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHknKS5hcHBlbmQgQHRlbXBsYXRlXG5cbiAgICBpZiBlbnRpdHkgaXNudCBmYWxzZVxuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gaW5wdXQnKS52YWwoZW50aXR5Lm5hbWUpXG4gICAgICBAc2VsZWN0aXplICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpLCBlbnRpdHkudHlwZVxuICAgIGVsc2VcbiAgICAgIEBzZWxlY3RpemUgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eTpsYXN0LWNoaWxkJykuZmluZCgnLmlucHV0ID4gc2VsZWN0JylcblxuICAgIGlmICBmb2N1c1xuICAgICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eSA+IC5pbnB1dC5zZWxlY3RpemUtaW5wdXQgaW5wdXQnKS5sYXN0KCkuZm9jdXMoKVxuXG4gIHNlbGVjdGl6ZTogKGVsLCB2YWx1ZT1mYWxzZSkgLT5cbiAgICBpemVkID0gZWwuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJUeXBlXCJcblxuICAgIGl6ZWRbMF0uc2VsZWN0aXplLnNldFZhbHVlIHZhbHVlXG5cbiAgc3VibWl0SGFuZGxlcjogLT5cblxuICAgIHN0cnVjdHVyZSA9IHt9XG4gICAgc3RydWN0dXJlLmVudGl0aWVzID0gW11cbiAgICBzdHJ1Y3R1cmUuY2xpZW50ID0gJCgnLm1vZGlmeSA+IC5jbGllbnQgPiAuaW5wdXQgPiBzZWxlY3QnKS52YWwoKVxuICAgIHN0cnVjdHVyZS5uYW1lID0gJCgnLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoKVxuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5ID4gLmVudGl0eScpLmVhY2ggKGksIGVsKSAtPlxuXG4gICAgICBqaW5wdXQgPSAkKGVsKS5maW5kICcuaW5wdXQgPiBpbnB1dCdcbiAgICAgIGpzZWxlY3QgPSAkKGVsKS5maW5kICcuaW5wdXQgPiBzZWxlY3QnXG5cbiAgICAgIHN0cnVjdHVyZS5lbnRpdGllcy5wdXNoXG4gICAgICAgIG5hbWU6IGppbnB1dC52YWwoKVxuICAgICAgICB0eXBlOiBqc2VsZWN0LnZhbCgpXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgU3RydWN0dXJlLm1vZGlmeSBzdHJ1Y3R1cmVcblxuICBtb2RpZnk6IChzdHJ1Y3R1cmUpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2Uuc3RydWN0dXJlJykpXG5cbiAgICBjYWxsID0gJy9hcGkvc3RydWN0dXJlcy9hZGQnXG4gICAgaWYgU3RydWN0dXJlLl9pZCBpc250IGZhbHNlXG4gICAgICBjYWxsID0gXCIvYXBpL3N0cnVjdHVyZXMvdXBkYXRlLyN7U3RydWN0dXJlLl9pZH1cIlxuXG4gICAgXy5nZXQgY2FsbCwgc3RydWN0dXJlXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pIHJlc3BvbnNlLmRhdGEuc3RhdHVzLCAnc3VjY2VzcydcbiAgICAgICAgaWYgU3RydWN0dXJlLl9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL3N0cnVjdHVyZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBTdHJ1Y3R1cmUuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiIsIlN0cnVjdHVyZXMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnc3RydWN0dXJlcydcblxuIiwiVXNlcnMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAndXNlcnMnXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
