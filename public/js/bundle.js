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
    return Listing.i('entries', false, ['structure']);
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
    return Me.authed(function(result) {
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
    return Listing.i('structures');
  }
};

var Users;

Users = {
  i: function() {
    return Listing.i('users');
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJUaW1lLmNvZmZlZSIsImNsaWVudC5jb2ZmZWUiLCJjbGllbnRzLmNvZmZlZSIsImNvbmZpZy5jb2ZmZWUiLCJkYXNoYm9hcmQuY29mZmVlIiwiZW50aXRpZXMuY29mZmVlIiwiZW50cmllcy5jb2ZmZWUiLCJlbnRyeS5jb2ZmZWUiLCJmaWx0ZXIuY29mZmVlIiwiZ2xvYmFsLmNvZmZlZSIsImluZGV4LmNvZmZlZSIsImludml0ZS5jb2ZmZWUiLCJsaXN0aW5nLmNvZmZlZSIsIm1haW4uanMiLCJtZS5jb2ZmZWUiLCJub3Rmb3VuZC5jb2ZmZWUiLCJub3RpY2UuY29mZmVlIiwicHJvbXB0LmNvZmZlZSIsInF1ZXJ5LmNvZmZlZSIsInNlbGVjdGl6ZS5jb2ZmZWUiLCJzcGlubmVyLmNvZmZlZSIsInN0cnVjdHVyZS5jb2ZmZWUiLCJzdHJ1Y3R1cmVzLmNvZmZlZSIsInVzZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUE7RUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtN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QUFIIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIHJhbmdlOiAoc3RhcnQsIGVuZCkgLT5cbiAgICByZXN1bHQgPSBbXVxuICAgIGZvciBudW0gaW4gW3N0YXJ0Li5lbmRdXG4gICAgICByZXN1bHQucHVzaCBudW1cbiAgICByZXN1bHRcblxuICBmaXQ6IChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSAtPlxuICAgIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyBzcmNXaWR0aCwgbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0KVxuICAgIHdpZHRoOiBzcmNXaWR0aCpyYXRpbywgaGVpZ2h0OiBzcmNIZWlnaHQqcmF0aW9cblxuICBqaW5pdDogLT5cbiAgICAkLmFqYXhTZXR1cFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiXG5cbiAgcGF0Y2g6ICh1cmwsIGRhdGEpIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAganBhdGNoID0gJC5hamF4XG4gICAgICB1cmw6IHVybFxuICAgICAgZGF0YTogZGF0YVxuICAgICAgdHlwZTogJ1BBVENIJ1xuXG4gICAganBhdGNoLmZhaWwgKHJlc3BvbnNlKSAtPlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBhdGNoXG5cbiAgZ2V0OiAoYXJncy4uLikgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqZ2V0ID0gJC5nZXQgYXJncy4uLlxuXG4gICAgamdldC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAgamdldC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpnZXRcblxuICBwb3N0OiAoYXJncy4uLikgLT5cblxuICAgIGpwb3N0ID0gJC5wb3N0IGFyZ3MuLi5cblxuICAgIGpwb3N0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqcG9zdC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwb3N0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuXG4gICAgZXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04/LmVycm9ycz9bMF1cbiAgICBpZiBlcnJvciBpcyB1bmRlZmluZWRcbiAgICAgIHJldHVybiBQcm9tcHQuaSByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHRcblxuICAgIHB1ZyA9IGVycm9yLm1lc3NhZ2UubWF0Y2ggL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvXG4gICAgaWYgcHVnIGlzbnQgbnVsbFxuICAgICAgZXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UucmVwbGFjZSAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS8sICcnXG4gICAgICBlcnJvci5maWxlID0gcHVnWzFdXG4gICAgICBlcnJvci5saW5lID0gcHVnWzJdXG5cbiAgICBmaWxlID0gQGVuY29kZSBcIiN7ZXJyb3IuZmlsZX1cIlxuXG4gICAgc3dpdGNoIGNvbmZpZy5hcHAuZWRpdG9yXG4gICAgICB3aGVuICdtYWN2aW0nIHRoZW4gZWRpdG9yID0gJ212aW06Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnc3VibGltZScgdGhlbiBlZGl0b3IgPSAnc3VibDovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdlbWFjcycgdGhlbiBlZGl0b3IgPSAnZW1hY3M6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAndGV4dG1hdGUnIHRoZW4gZWRpdG9yID0gJ3RleHRtYXRlOi8vb3Blbi8/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdwaHBzdG9ybScgdGhlbiBlZGl0b3IgPSAncGhwc3Rvcm06Ly9vcGVuP2ZpbGU9J1xuXG4gICAgaWYgZXJyb3IuZmlsZSBpc250IG51bGxcbiAgICAgIGJvZHkgPSBcIlwiXCJcbiAgICAgICAgPHByZT4je2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICAgIDxhIGhyZWY9XCIje2VkaXRvcn0je2ZpbGV9JmxpbmU9I3tlcnJvci5saW5lfVwiPjxiPiN7ZXJyb3IuZmlsZX06I3tlcnJvci5saW5lfTwvYj48L2E+XG4gICAgICBcIlwiXCJcbiAgICBlbHNlXG4gICAgICBib2R5ID0gZXJyb3IubWVzc2FnZVxuXG4gICAgUHJvbXB0LmkgZXJyb3IudHlwZSwgYm9keSwgWydPSyddXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cDovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuICBtZXRob2RzOiAob2JqKSAtPlxuICAgIHJlcyA9IFtdXG4gICAgZm9yIGksbSBvZiBvYmpcbiAgICAgIGlmIHR5cGVvZiBtIGlzICdmdW5jdGlvbidcbiAgICAgICAgcmVzLnB1c2ggbVxuICAgIHJldHVybiByZXNcblxuXy5pKClcbiIsIlRpbWUgPVxuICBpbnRlcnZhbDogZmFsc2VcbiAgZ2FwOiAxMDAwXG5cbiAgaTogLT5cbiAgICBAaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChAc2NyYXBlLCBAZ2FhKSBpZiBAaW50ZXJ2YWwgaXMgZmFsc2VcbiAgICBAc2NyYXBlKClcblxuICBzY3JhcGU6IC0+XG4gICAgJCgndGltZScpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgamVsID0gJCBlbFxuICAgICAgamVsLmh0bWwgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5mcm9tTm93KClcbiAgICAgIGplbC5hdHRyICdhcmlhLWxhYmVsJywgbW9tZW50KGplbC5hdHRyKCd0aXRsZScpKS5jYWxlbmRhcigpXG4iLCJDbGllbnQgPVxuXG4gIHNlbGVjdFVzZXI6IGZhbHNlXG4gIF9pZDogZmFsc2VcbiAgY3JvcDogZmFsc2VcbiAgcHJvZmlsZTogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQGhhbmRsZXJzKClcbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9jbGllbnRzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcblxuICAgIEBzZWxlY3RVc2VyID0gU2VsZWN0aXplLnVzZXJzICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JyksIEBzZWxlY3RVc2VySGFuZGxlciwgbWU6IGZhbHNlXG5cbiAgICAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQgPiBpbnB1dCcpLmZvY3VzKClcbiBcbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnBhZ2UuY2xpZW50ID4gLnN1Ym1pdCcpLmNsaWNrIEBtb2RpZnlIYW5kbGVyXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ292ZXInLCBAZHJhZ292ZXJcbiAgICAkKGRvY3VtZW50KS5vbiAnZHJhZ2xlYXZlJywgQGRyYWdsZWF2ZVxuICAgICQoZG9jdW1lbnQpLm9uICdkcmFnZW50ZXIgZHJhZ292ZXInLCBAY2FuY2VsXG5cbiAgICAkKGRvY3VtZW50KS5vbiAnZHJvcCBkcmFnZHJvcCcsIEBkcm9wXG5cbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhJykub24gJ2NsaWNrJywgQGNob29zZUZpbGVcbiAgICAkKCcuaW5wdXQtaW1hZ2UgPiBpbnB1dDpmaWxlJykuY2hhbmdlIEBjaGFuZ2VcblxuICBjYW5jZWw6IC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gIGRyYWdvdmVyOiAtPlxuICAgIF8ub24gJy5pbnB1dC1pbWFnZSdcblxuICBkcmFnbGVhdmU6IC0+XG4gICAgXy5vZmYgJy5pbnB1dC1pbWFnZSdcblxuICBkcm9wOiAoZSkgLT5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBfLm9mZiAnLmlucHV0LWltYWdlJ1xuXG4gICAgaWYgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlciBhbmQgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGhcbiAgICAgIGZpbGVzID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgQ2xpZW50LmNyb3BwaWUgZmlsZXNbMF1cblxuICBjaGFuZ2U6IC0+XG4gICAgaWYgJCh0aGlzKVswXS5maWxlc1xuICAgICAgZmlsZXMgPSAkKHRoaXMpWzBdLmZpbGVzXG4gICAgQ2xpZW50LmNyb3BwaWUgZmlsZXNbMF1cblxuICBjaG9vc2VGaWxlOiAtPlxuICAgICQoJy5pbnB1dC1pbWFnZSA+IGlucHV0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgY3JvcHBpZTogKGZpbGUpIC0+XG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAtPlxuXG4gICAgICBpZiBDbGllbnQuY3JvcCBpc250IGZhbHNlXG4gICAgICAgIENsaWVudC5jcm9wLmNyb3BwaWUgJ2Rlc3Ryb3knXG4gICAgICAgIENsaWVudC5jcm9wID0gZmFsc2VcblxuICAgICAgQ2xpZW50LmNyb3AgPSAkKCcuaW5wdXQtaW1hZ2UgPiAuY3JvcHBpZScpLmNyb3BwaWVcbiAgICAgICAgdXJsOiByZWFkZXIucmVzdWx0XG4gICAgICAgIGVuZm9yY2VCb3VuZGFyeTogZmFsc2VcbiAgICAgICAgdmlld3BvcnQ6XG4gICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgIGhlaWdodDogMjAwXG4gICAgICAgIGJvdW5kYXJ5OlxuICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICBoZWlnaHQ6IDMwMFxuXG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwgZmlsZVxuXG4gIHNlbGVjdFVzZXJIYW5kbGVyOiAtPlxuXG4gIG1vZGlmeUhhbmRsZXI6IC0+XG5cbiAgICBpZiBDbGllbnQuY3JvcCBpc250IGZhbHNlXG4gICAgICBDbGllbnQuY3JvcC5jcm9wcGllICdyZXN1bHQnLFxuICAgICAgICB0eXBlOiAnY2FudmFzJ1xuICAgICAgICBmb3JtYXQ6ICdqcGVnJ1xuICAgICAgLnRoZW4gKHJlc3BvbnNlKSAtPlxuICAgICAgICBDbGllbnQuaW1hZ2VVcGxvYWQgQ2xpZW50LmRhdGFVUkl0b0Jsb2IocmVzcG9uc2UpLCAtPlxuICAgICAgICAgIENsaWVudC5tb2RpZnkoKVxuICAgIGVsc2VcbiAgICAgIENsaWVudC5tb2RpZnkoKVxuXG4gIG1vZGlmeTogLT5cblxuICAgIG5hbWUgPSAkKCcucGFnZS5jbGllbnQgPiAuaW5wdXQtbmFtZSA+IGlucHV0JykudmFsKClcbiAgICB1c2VycyA9ICQoJy5wYWdlLmNsaWVudCA+IC5pbnB1dC11c2VycyA+IGlucHV0JykudmFsKCkuc3BsaXQgJywnXG5cbiAgICBjYWxsID0gJy9hcGkvY2xpZW50cy9hZGQnXG4gICAgaWYgQ2xpZW50Ll9pZCBpc250IGZhbHNlXG4gICAgICBjYWxsID0gXCIvYXBpL2NsaWVudHMvdXBkYXRlLyN7Q2xpZW50Ll9pZH1cIlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmNsaWVudCcpKVxuXG4gICAgXy5nZXQgY2FsbCwgbmFtZTogbmFtZSwgdXNlcnM6IHVzZXJzLCBwcm9maWxlOiBDbGllbnQucHJvZmlsZVxuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgJ3N1Y2Nlc3MnXG4gICAgICAgIGlmIENsaWVudC5faWQgaXMgZmFsc2VcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge30sICcnLCBcIi9jbGllbnRzLyN7cmVzcG9uc2UuZGF0YS5faWR9XCJcbiAgICAgICAgQ2xpZW50Ll9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4gICAgICAgIGlmIENsaWVudC5wcm9maWxlXG4gICAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tDbGllbnQucHJvZmlsZX0nKVwiXG5cbiAgbG9hZDogLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5jbGllbnQnKSlcblxuICAgIF8uZ2V0ICcvYXBpL2NsaWVudHMvJyxcbiAgICAgIF9pZDogQF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9ICcvY2xpZW50cy9uZXcnIGlmIHJlc3BvbnNlLmRhdGEubGVuZ3RoIDwgMVxuICAgICAgY2xpZW50ID0gcmVzcG9uc2UuZGF0YVswXVxuICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LW5hbWUgPiBpbnB1dCcpLnZhbCBjbGllbnQubmFtZVxuICAgICAgaWYgY2xpZW50LnByb2ZpbGVcbiAgICAgICAgJCgnLnBhZ2UuY2xpZW50ID4gLmlucHV0LWltYWdlID4gLnBpY3R1cmUnKS5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgnI3tjbGllbnQucHJvZmlsZX0nKVwiXG4gICAgICAgIENsaWVudC5wcm9maWxlID0gY2xpZW50LnByb2ZpbGVcbiAgICAgIGZvciBpbmRleCwgdXNlciBvZiBjbGllbnQudXNlcnNcbiAgICAgICAgaWYgdXNlci5pZCBpc250IFVzZXIuX2lkXG4gICAgICAgICAgQ2xpZW50LnNlbGVjdFVzZXJbMF0uc2VsZWN0aXplLmFkZE9wdGlvbiBpZDogdXNlci5pZCwgbmFtZTogXCIje3VzZXIubmFtZX0gKCN7dXNlci5lbWFpbH0pXCJcbiAgICAgICAgICBDbGllbnQuc2VsZWN0VXNlclswXS5zZWxlY3RpemUuYWRkSXRlbSB1c2VyLmlkXG5cblxuICBkYXRhVVJJdG9CbG9iOiAoZGF0YVVSSSkgLT5cbiAgICBieXRlU3RyaW5nID0gdW5kZWZpbmVkXG4gICAgaWYgZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDBcbiAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSlcbiAgICBlbHNlXG4gICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKVxuICAgICMgc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdXG4gICAgIyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aClcbiAgICBpID0gMFxuICAgIHdoaWxlIGkgPCBieXRlU3RyaW5nLmxlbmd0aFxuICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSlcbiAgICAgIGkrK1xuICAgIG5ldyBCbG9iKFsgaWEgXSwgdHlwZTogbWltZVN0cmluZylcbiAgICAgICAgXG4gIGltYWdlVXBsb2FkOiAoYmxvYiwgY2FsbGJhY2spIC0+XG5cbiAgICBmZCA9IG5ldyBGb3JtRGF0YSgpXG4gICAgZmQuYXBwZW5kICdmaWxlJywgYmxvYlxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgIE5vdGljZS5pICdGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICBDbGllbnQucHJvZmlsZSA9IHJlc3VsdC5kYXRhLnVybFxuICAgICAgICBjYWxsYmFjayhyZXN1bHQpXG5cblxuIiwiQ2xpZW50cyA9XG4gIGk6IC0+XG4gICAgTGlzdGluZy5pICdjbGllbnRzJywgQ2xpZW50cy5hY3Rpb25cblxuICBhY3Rpb246ICh0eXBlKSAtPlxuXG4gICAgc3dpdGNoIHR5cGVcbiAgICAgIHdoZW4gJ0NsaWVudCBJbnZpdGUnXG4gICAgICAgIGlmIExpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RoID4gMVxuICAgICAgICAgIE5vdGljZS5pICdQbGVhc2UgY2hvb3NlIGEgc2luZ2xlIGNsaWVudCBmb3IgYW4gaW52aXRlIGxpbmsnLCB0eXBlOiAnd2FybmluZydcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgQ2xpZW50cy5nZXRJbnZpdGUoTGlzdGluZy5zZWxlY3RlZFswXSlcblxuICBnZXRJbnZpdGU6IChjbGllbnQpIC0+XG5cbiAgICBTcGlubmVyLmkoJCgnLnBhZ2UuY2xpZW50cycpKVxuXG4gICAgXy5nZXQgJy9hcGkvaW52aXRlL2FkZCcsIGNsaWVudDogY2xpZW50XG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBjb25zb2xlLmxvZyByZXNwb25zZVxuICAgICAgUHJvbXB0LmkoXG4gICAgICAgICdDbGllbnQgSW52aXRlJyxcbiAgICAgICAgJ1NoYXJlIHRoaXMgVVJMIHdpdGggeW91ciBjbGllbnQgdG8gYWxsb3cgdGhlbSB0byBtb2RpZnkgdGhlaXIgb3duIGVudHJpZXMnLFxuICAgICAgICBbJ09LJ10sXG4gICAgICAgICAgY2xpcGJvYXJkOiB0cnVlXG4gICAgICAgICAgdmFsdWU6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2ludml0ZS8nICsgcmVzcG9uc2UuZGF0YS5pbnZpdGUuaGFzaCxcbiAgICAgIClcblxuXG5cbiIsImNvbmZpZyA9IHtcInZpZXdcIjp7XCJwYXRoc1wiOltcIi9Vc2Vycy9rL2Jhc2FsL3Jlc291cmNlcy92aWV3c1wiXSxcImNvbXBpbGVkXCI6XCIvVXNlcnMvay9iYXNhbC9zdG9yYWdlL2ZyYW1ld29yay92aWV3c1wifSxcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJ3aGl0ZTJcIjpcIiNmOGY4ZjhcIixcIndoaXRlM1wiOlwiI0Y0RjRGNFwiLFwiZ3JleTFcIjpcIiNlNWU1ZTVcIixcImdyZXkyXCI6XCIjZjVmNWY1XCIsXCJncmV5M1wiOlwiI2QwZDBkMFwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJibGFjazJcIjpcIiMyODI4MjhcIixcImJsYWNrM1wiOlwiIzMzMzMzM1wiLFwiYmxhY2s0XCI6XCIjMjMyOTJFXCIsXCJibGFjazVcIjpcIiMzRTQzNDdcIixcInJlZDFcIjpcIiNDODIxMkJcIixcInllbGxvdzFcIjpcIiNGNkJCNDVcIixcImN5YW4xXCI6XCIjNUZBNzkzXCIsXCJvcmFuZ2UxXCI6XCIjRjY4RjYyXCIsXCJza2luMVwiOlwiI0YzRERBM1wiLFwiZ3JlZW4xXCI6XCIjNWJhNTQxXCIsXCJncmVlbjJcIjpcIiM4OGQ5NmRcIixcImdyZWVuM1wiOlwiIzc3ZDM1OFwiLFwiYmx1ZTFcIjpcIiMxZGE3ZWVcIixcImJsdWUyXCI6XCIjMDA3M2JiXCIsXCJnb29nbGVfYmx1ZVwiOlwiIzQyODVmNFwiLFwiZ29vZ2xlX2dyZWVuXCI6XCIjMzRhODUzXCIsXCJnb29nbGVfeWVsbG93XCI6XCIjZmJiYzA1XCIsXCJnb29nbGVfcmVkXCI6XCIjZWE0MzM1XCIsXCJnaXRodWJfYmx1ZVwiOlwiIzBEMjYzNlwiLFwiZmFjZWJvb2tfYmx1ZVwiOlwiIzQ4NjdBQVwiLFwiaW5zdGFncmFtX29yXCI6XCIjRkY3ODA0XCIsXCJ0d2l0dGVyX2JsdWVcIjpcIiMwMEFDRURcIn0sXCJmb250XCI6e1wiNDA0XCI6e1wiZm9udC1mYW1pbHlcIjpcIk1vbm90b25cIixcImZvbnQtc2l6ZVwiOlwiNzVweFwifSxcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiaDFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCIzMDBcIn0sXCJoMmJcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwifSxcImgzYlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMjBweFwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwifSxcImMxXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzFiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxNnB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9LFwiYzF0YlwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG9cIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwiZm9udC13ZWlnaHRcIjpcIjQwMFwifSxcImMxc2JcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvXCIsXCJmb250LXNpemVcIjpcIjEycHhcIixcImZvbnQtd2VpZ2h0XCI6XCI2MDBcIixcImxldHRlci1zcGFjaW5nXCI6XCIwLjVweFwifSxcImMyXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiMzAwXCJ9LFwiYzJiXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90b1wiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiNTAwXCJ9fSxcIm1ldGFcIjp7XCJ0aXRsZVwiOlwiYmFzYWxcIixcInVybFwiOlwiaHR0cDovL2Jhc2FsLmRldi9cIixcImRlc2NyaXB0aW9uXCI6XCJtaW5pbWFsIGNvbnRlbnQgbWFuYWdlbWVudFwiLFwia2V5d29yZHNcIjpcImNtc1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2FjaWRqYXp6L2Jhc2FsXCJ9LFwic2V0dGluZ3NcIjp7XCJwZXJwYWdlXCI6MTB9LFwiZGVidWdiYXJcIjp7XCJlbmFibGVkXCI6bnVsbCxcInN0b3JhZ2VcIjp7XCJlbmFibGVkXCI6dHJ1ZSxcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9kZWJ1Z2JhclwiLFwiY29ubmVjdGlvblwiOm51bGwsXCJwcm92aWRlclwiOlwiXCJ9LFwiaW5jbHVkZV92ZW5kb3JzXCI6dHJ1ZSxcImNhcHR1cmVfYWpheFwiOnRydWUsXCJjbG9ja3dvcmtcIjpmYWxzZSxcImNvbGxlY3RvcnNcIjp7XCJwaHBpbmZvXCI6dHJ1ZSxcIm1lc3NhZ2VzXCI6dHJ1ZSxcInRpbWVcIjp0cnVlLFwibWVtb3J5XCI6dHJ1ZSxcImV4Y2VwdGlvbnNcIjp0cnVlLFwibG9nXCI6dHJ1ZSxcImRiXCI6dHJ1ZSxcInZpZXdzXCI6dHJ1ZSxcInJvdXRlXCI6dHJ1ZSxcImxhcmF2ZWxcIjpmYWxzZSxcImV2ZW50c1wiOmZhbHNlLFwiZGVmYXVsdF9yZXF1ZXN0XCI6ZmFsc2UsXCJzeW1mb255X3JlcXVlc3RcIjp0cnVlLFwibWFpbFwiOnRydWUsXCJsb2dzXCI6ZmFsc2UsXCJmaWxlc1wiOmZhbHNlLFwiY29uZmlnXCI6ZmFsc2UsXCJhdXRoXCI6ZmFsc2UsXCJnYXRlXCI6ZmFsc2UsXCJzZXNzaW9uXCI6dHJ1ZX0sXCJvcHRpb25zXCI6e1wiYXV0aFwiOntcInNob3dfbmFtZVwiOmZhbHNlfSxcImRiXCI6e1wid2l0aF9wYXJhbXNcIjp0cnVlLFwidGltZWxpbmVcIjpmYWxzZSxcImJhY2t0cmFjZVwiOmZhbHNlLFwiZXhwbGFpblwiOntcImVuYWJsZWRcIjpmYWxzZSxcInR5cGVzXCI6W1wiU0VMRUNUXCJdfSxcImhpbnRzXCI6dHJ1ZX0sXCJtYWlsXCI6e1wiZnVsbF9sb2dcIjpmYWxzZX0sXCJ2aWV3c1wiOntcImRhdGFcIjpmYWxzZX0sXCJyb3V0ZVwiOntcImxhYmVsXCI6dHJ1ZX0sXCJsb2dzXCI6e1wiZmlsZVwiOm51bGx9fSxcImluamVjdFwiOnRydWUsXCJyb3V0ZV9wcmVmaXhcIjpcIl9kZWJ1Z2JhclwifSxcImFwcFwiOntcImVkaXRvclwiOlwibWFjdmltXCJ9LFwiY2FjaGVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwic3RvcmVzXCI6e1wiYXBjXCI6e1wiZHJpdmVyXCI6XCJhcGNcIn0sXCJhcnJheVwiOntcImRyaXZlclwiOlwiYXJyYXlcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJjYWNoZVwiLFwiY29ubmVjdGlvblwiOm51bGx9LFwiZmlsZVwiOntcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svYmFzYWwvc3RvcmFnZS9mcmFtZXdvcmsvY2FjaGVcIn0sXCJtZW1jYWNoZWRcIjp7XCJkcml2ZXJcIjpcIm1lbWNhY2hlZFwiLFwic2VydmVyc1wiOlt7XCJob3N0XCI6XCIxMjcuMC4wLjFcIixcInBvcnRcIjoxMTIxMSxcIndlaWdodFwiOjEwMH1dfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwifX0sXCJwcmVmaXhcIjpcImxhcmF2ZWxcIn0sXCJxdWV1ZVwiOntcImRlZmF1bHRcIjpcImFycmF5XCIsXCJjb25uZWN0aW9uc1wiOntcInN5bmNcIjp7XCJkcml2ZXJcIjpcInN5bmNcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJqb2JzXCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwiZXhwaXJlXCI6NjB9LFwiYmVhbnN0YWxrZFwiOntcImRyaXZlclwiOlwiYmVhbnN0YWxrZFwiLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwidHRyXCI6NjB9LFwic3FzXCI6e1wiZHJpdmVyXCI6XCJzcXNcIixcImtleVwiOlwieW91ci1wdWJsaWMta2V5XCIsXCJzZWNyZXRcIjpcInlvdXItc2VjcmV0LWtleVwiLFwicXVldWVcIjpcInlvdXItcXVldWUtdXJsXCIsXCJyZWdpb25cIjpcInVzLWVhc3QtMVwifSxcImlyb25cIjp7XCJkcml2ZXJcIjpcImlyb25cIixcImhvc3RcIjpcIm1xLWF3cy11cy1lYXN0LTEuaXJvbi5pb1wiLFwidG9rZW5cIjpcInlvdXItdG9rZW5cIixcInByb2plY3RcIjpcInlvdXItcHJvamVjdC1pZFwiLFwicXVldWVcIjpcInlvdXItcXVldWUtbmFtZVwiLFwiZW5jcnlwdFwiOnRydWV9LFwicmVkaXNcIjp7XCJkcml2ZXJcIjpcInJlZGlzXCIsXCJjb25uZWN0aW9uXCI6XCJkZWZhdWx0XCIsXCJxdWV1ZVwiOlwiZGVmYXVsdFwiLFwicmV0cnlfYWZ0ZXJcIjo2MH19LFwiZmFpbGVkXCI6e1wiZGF0YWJhc2VcIjpcIm1vbmdvZGJcIixcInRhYmxlXCI6XCJmYWlsZWRfam9ic1wifX19OyIsIkRhc2hib2FyZCA9XG5cbiAgZGF0YTp7fVxuXG4gIGk6IC0+XG4gICAgQGdldGRhdGEgPT5cbiAgICAgIEBwb3B1bGF0ZSgpXG5cbiAgcG9wdWxhdGU6IC0+XG4gICAgJCgnLmRhc2hib2FyZCAudmFsdWUnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgICQoZWwpLmh0bWwgQGRvdHN0b3ZhbHVlICQoZWwpLmRhdGEgJ3ZhbHVlJ1xuXG4gIGdldGRhdGE6IChjb21wbGV0ZSkgLT5cblxuICAgIGdldHMgPSBbJ3VzZXJzJywnY2xpZW50cycsICdzdHJ1Y3R1cmVzJywgJ2VudHJpZXMnXVxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5kYXNoYm9hcmQnKSlcblxuICAgICQoZ2V0cykuZWFjaCAoaW5kZXgsIGdldCkgPT5cbiAgICAgIF8uZ2V0IFwiL2FwaS8je2dldH1cIlxuICAgICAgICAuZG9uZSAocmVzcG9uc2UpID0+XG4gICAgICAgICAgQGRhdGFbZ2V0XSA9IHJlc3BvbnNlXG4gICAgICAgICAgaWYgT2JqZWN0LmtleXMoQGRhdGEpLmxlbmd0aCA9PSBnZXRzLmxlbmd0aFxuICAgICAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgICAgIGNvbXBsZXRlKClcblxuICBkb3RzdG92YWx1ZTogKGRvdHMpIC0+XG4gICAgcmVzdWx0ID0gQGRhdGFcbiAgICBmb3IgZGltIGluIGRvdHMuc3BsaXQgJy4nXG4gICAgICByZXN1bHQgPSByZXN1bHRbZGltXVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuXG4iLCJFbnRpdGllcyA9XG5cbiAgYmxvZ3M6IFtdXG4gIGNyb3BzOiB7fVxuICBpbWFnZXM6IHt9XG5cbiAgcGxhY2Vob2xkZXJzOiBbXG4gICAgXCJUaGF0J3Mgd2hhdCBJJ20gYmxvZ2dpbmcgYWJvdXRcIlxuICAgIFwiSGF2ZSB5b3UgZ3V5cyBiZWVuIGJsb2dnaW5nP1wiXG4gICAgXCJIb2xkIGFsbCBteSBjYWxscywgSSdtIGJsb2dnaW5nXCJcbiAgICBcIlRlbGwgRG9ubmllIEknbSBibG9nZ2luZyBhbmQgSSdsbCBjYWxsIGhpbSBiYWNrXCJcbiAgICBcIkkgZ290dGEgcnVuLCB5b3Ugc2hvdWxkIGJlIGJsb2dnaW5nXCJcbiAgICBcIkkgd2FudCB5b3Ugb24gdGhlIHBob25lLCBidXQgSSBhbHNvIHdhbnQgeW91IGJsb2dnaW5nXCJcbiAgXVxuXG4gIEJsb2c6IChlbCwgbmFtZSwgdmFsdWU9ZmFsc2UpIC0+XG5cbiAgICBlZGl0b3IgPSBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGVcbiAgICAgIHBsYWNlaG9sZGVyOiBAcGxhY2Vob2xkZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEBwbGFjZWhvbGRlcnMubGVuZ3RoKV1cbiAgICAgIGNhbGxiYWNrczpcbiAgICAgICAgb25JbWFnZVVwbG9hZDogKGZpbGVzKSAtPlxuICAgICAgICAgIEVudGl0aWVzLmltYWdlVXBsb2FkIGZpbGVzLCB0aGlzXG5cbiAgICBlbC5maW5kKCcuYmxvZycpLnN1bW1lcm5vdGUoJ2NvZGUnLCB2YWx1ZSkgaWYgdmFsdWUgaXNudCBmYWxzZVxuXG4gICAgQGJsb2dzLnB1c2ggbmFtZTogbmFtZSwgZWRpdG9yOiBlZGl0b3IsIGVsOiBlbC5maW5kKCcuYmxvZycpXG5cbiAgYmxvZ0dldENvZGU6IChuYW1lKSAtPlxuICAgIGZvciBibG9nIGluIEBibG9nc1xuICAgICAgcmV0dXJuIGJsb2cuZWwuc3VtbWVybm90ZSgnY29kZScpIGlmIGJsb2cubmFtZSBpcyBuYW1lXG4gXG4gIGJsb2dGb2N1czogKG5hbWUpIC0+XG4gICAgZm9yIGJsb2cgaW4gQGJsb2dzXG4gICAgICBpZiBibG9nLm5hbWUgaXMgbmFtZVxuICAgICAgICAkKCcubm90ZS1lZGl0YWJsZScpLmZvY3VzKClcblxuICBpbWFnZVVwbG9hZDogKGZpbGVzLCBlbCkgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBmaWxlc1swXVxuXG4gICAgXy5wb3N0XG4gICAgICB4aHI6IC0+XG4gICAgICAgIHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgICAgY29tcGxldGUgPSBlLmxvYWRlZCAvIGUudG90YWxcbiAgICAgICAgICBpZiBjb21wbGV0ZSA8IDEgdGhlbiBOb3RpY2UuaSAnVXBsb2FkaW5nIGltYWdlLi4nLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgJ1Byb2Nlc3NpbmcgaW1hZ2UuLicsIHByb2dyZXNzOiBjb21wbGV0ZVxuICAgICAgICAsIGZhbHNlXG4gICAgICAgIHJldHVybiB4aHJcblxuICAgICAgdXJsOiAnL2FwaS91cGxvYWQnXG4gICAgICBkYXRhOiBmZFxuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgICAgZXJyb3I6IC0+XG4gICAgICAgIE5vdGljZS5kKClcbiAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpIC0+XG4gICAgICAgICQoZWwpLnN1bW1lcm5vdGUoJ2VkaXRvci5pbnNlcnRJbWFnZScsIHJlc3VsdC5kYXRhLnVybClcbiAgICAgICAgTm90aWNlLmkgJ0ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnXG5cbiAgVGFnczogKGVsLCBuYW1lKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0Jykuc2VsZWN0aXplXG4gICAgICBwbHVnaW5zOiBbJ3Jlc3RvcmVfb25fYmFja3NwYWNlJywncmVtb3ZlX2J1dHRvbiddXG4gICAgICBkZWxpbWl0ZXI6ICcsJ1xuICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICAgIGNyZWF0ZTogKGlucHV0KSAtPlxuICAgICAgICB2YWx1ZTogaW5wdXRcbiAgICAgICAgdGV4dDogaW5wdXRcblxuICBEYXRlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1knXG5cbiAgRGF0ZVRpbWU6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSBoOmkgSydcbiAgICAgIGVuYWJsZVRpbWU6IHRydWVcblxuICBEYXRlUmFuZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG4gICAgZWwuZmluZCgnaW5wdXQnKS5mbGF0cGlja3JcbiAgICAgIGRhdGVGb3JtYXQ6ICdtL2QvWSdcbiAgICAgIG1vZGU6ICdyYW5nZSdcblxuICBEYXRlVGltZVJhbmdlOiAoZWwsIG5hbWUsIHZhbHVlKSAtPlxuICAgIGVsLmZpbmQoJ2lucHV0JykuZmxhdHBpY2tyXG4gICAgICBkYXRlRm9ybWF0OiAnbS9kL1kgaDppIEsnXG4gICAgICBlbmFibGVUaW1lOiB0cnVlXG4gICAgICBtb2RlOiAncmFuZ2UnXG5cbiAgSW1hZ2U6IChlbCwgbmFtZSwgdmFsdWUpIC0+XG5cbiAgICBAaW1hZ2VIYW5kbGVycyBlbFxuXG4gICAgIyBwcmVsb2FkIGV4aXN0aW5nIGltYWdlc1xuICAgIGlmIHZhbHVlIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wcGVyKHZhbHVlLCBlbClcbiAgICAgIEVudGl0aWVzLmltYWdlc1tuYW1lXSA9IHZhbHVlXG5cblxuICBpbWFnZUhhbmRsZXJzOiAoZWwsIG5hbWUpIC0+XG5cbiAgICBlbC5vbiAnZHJhZ292ZXInLCBAaW1hZ2VIYW5kbGVyLmRyYWdvdmVyXG4gICAgZWwub24gJ2RyYWdsZWF2ZScsIEBpbWFnZUhhbmRsZXIuZHJhZ2xlYXZlXG4gICAgZWwub24gJ2RyYWdlbnRlciBkcmFnb3ZlcicsIEBpbWFnZUhhbmRsZXIuY2FuY2VsXG4gICAgZWwub24gJ2Ryb3AgZHJhZ2Ryb3AnLCBAaW1hZ2VIYW5kbGVyLmRyb3BcbiAgICBlbC5maW5kKCcuaW5wdXQtaW1hZ2UgPiBidXR0b24uY3RhLnNlbGVjdCcpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuY2hvb3NlRmlsZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGJ1dHRvbi5jdGEuc2F2ZScpLm9uICdjbGljaycsIEBpbWFnZUhhbmRsZXIuc2F2ZVxuICAgIGVsLmZpbmQoJy5pbnB1dC1pbWFnZSA+IGlucHV0OmZpbGUnKS5vbiAnY2hhbmdlJywgQGltYWdlSGFuZGxlci5jaGFuZ2VcblxuICBpbWFnZUhhbmRsZXI6XG5cbiAgICBkcmFnb3ZlcjogLT5cbiAgICAgIF8ub24gJCh0aGlzKS5maW5kKCcuaW5wdXQtaW1hZ2UnKVxuICAgIGRyYWdsZWF2ZTogLT5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCgnLmlucHV0LWltYWdlJylcbiAgICBjYW5jZWw6IC0+XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBkcm9wOiAoZSkgLT5cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIF8ub2ZmICQodGhpcykuZmluZCAnLmlucHV0LWltYWdlJ1xuXG4gICAgICBpZiBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyIGFuZCBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aFxuICAgICAgICBmaWxlcyA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgICAgRW50aXRpZXMubG9hZENyb3BwZXIgZmlsZXNbMF0sICQodGhpcylcblxuICAgIGNob29zZUZpbGU6IC0+XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgICBjaGFuZ2U6IC0+XG4gICAgICBpZiAkKHRoaXMpWzBdLmZpbGVzXG4gICAgICAgIGZpbGVzID0gJCh0aGlzKVswXS5maWxlc1xuXG4gICAgICAgIEVudGl0aWVzLmxvYWRDcm9wcGVyIGZpbGVzWzBdLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpXG5cbiAgICBzYXZlOiAtPlxuXG4gICAgICBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5kYXRhICduYW1lJ1xuICAgICAgaW5kZXggPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEgJ2luZGV4J1xuXG4gICAgICBTcGlubmVyLmkoJChcIi5lbnRpdHlfaW5kZXhfI3tpbmRleH1cIikpXG5cbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdLmdldENyb3BwZWRDYW52YXMoKS50b0Jsb2IgKGJsb2IpIC0+XG4gICAgICAgIENsaWVudC5pbWFnZVVwbG9hZCBibG9iLCAocmVzdWx0KSAtPlxuICAgICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAgICAgRW50aXRpZXMuaW1hZ2VzW25hbWVdID0gcmVzdWx0LmRhdGEudXJsXG4gICAgICAsICdpbWFnZS9qcGVnJ1xuXG4gIGxvYWRDcm9wcGVyOiAoZmlsZSwgZWwpIC0+XG5cbiAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cbiAgICByZWFkZXIub25sb2FkZW5kID0gLT5cbiAgICAgIEVudGl0aWVzLmNyb3BwZXIgcmVhZGVyLnJlc3VsdCwgZWxcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTCBmaWxlXG5cbiAgY3JvcHBlcjogKHVybCwgZWwpIC0+XG5cbiAgICBuYW1lID0gZWwuZGF0YSAnbmFtZSdcbiAgICBpbmRleCA9IGVsLmRhdGEgJ2luZGV4J1xuXG4gICAgY29uc29sZS5sb2cgbmFtZSwgaW5kZXhcblxuICAgIGlmIEVudGl0aWVzLmNyb3BzW25hbWVdIGlzbnQgdW5kZWZpbmVkXG4gICAgICBFbnRpdGllcy5jcm9wc1tuYW1lXS5kZXN0cm95KClcbiAgICAgIEVudGl0aWVzLmNyb3BzW25hbWVdID0gZmFsc2VcblxuICAgIGVsLmZpbmQoJy5jcm9wcGVyJykuYXR0ciAnc3JjJywgdXJsXG5cbiAgICBFbnRpdGllcy5jcm9wc1tuYW1lXSA9IG5ldyBDcm9wcGVyIGVsLmZpbmQoJy5jcm9wcGVyJylbMF0sXG4gICAgICBtaW5Db250YWluZXJIZWlnaHQ6IDMwMFxuICAgICAgbWluQ2FudmFzSGVpZ2h0OiAzMDBcbiAgICAgIHJlc3BvbnNpdmU6IHRydWVcbiAgICAgIHByZXZpZXc6IFwiZGl2LmVudGl0eV9pbmRleF8je2luZGV4fSA+IGRpdi5pbnB1dC1pbWFnZSA+IGRpdi5waWN0dXJlXCJcbiAgICAgIGF1dG9Dcm9wQXJlYTogMVxuICAgICAgc3RyaWN0OiBmYWxzZVxuICAgICAgaGlnaGxpZ2h0OiB0cnVlXG5cbiAgICBfLm9uIGVsLmZpbmQoJy5zYXZlJylcblxuXG4iLCJFbnRyaWVzID1cblxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnZW50cmllcycsIGZhbHNlLCBbJ3N0cnVjdHVyZSddXG4iLCJFbnRyeSA9XG5cbiAgc2VsZWN0U3RydWN0dXJlOiB7fVxuXG4gIF9pZDogZmFsc2VcbiAgc3RydWN0dXJlOiBmYWxzZVxuICBzZWxlY3RlZFN0cnVjdHVyZTogZmFsc2VcbiAgZW50cnk6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIGlmIG1hdGNoID0gbG9jYXRpb24uaGFzaC5tYXRjaCAvI3N0cnVjdHVyZT0oWzAtOWEtZkEtRl17MjR9KS9cbiAgICAgIEVudHJ5LnNlbGVjdGVkU3RydWN0dXJlID0gbWF0Y2hbMV1cblxuICAgIEBzZWxlY3RpemUoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgICBpZiBtYXRjaCA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoIC9cXC9lbnRyaWVzXFwvKFswLTlhLWZBLUZdezI0fSkvXG4gICAgICBAX2lkID0gbWF0Y2hbMV1cbiAgICAgIEBsb2FkIEBfaWRcbiAgICBlbHNlXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmZvY3VzKClcblxuICBzdHJ1Y3R1cmVTcGVjaWZpZWQ6IC0+XG4gICAgaWYgRW50cnkuc2VsZWN0ZWRTdHJ1Y3R1cmUgaXNudCBmYWxzZVxuICAgICAgRW50cnkuc2VsZWN0U3RydWN0dXJlWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSBFbnRyeS5zZWxlY3RlZFN0cnVjdHVyZVxuXG4gIHNlbGVjdGl6ZTogLT5cblxuICAgIEBzZWxlY3RTdHJ1Y3R1cmUgPSBTZWxlY3RpemUuc3RydWN0dXJlcyAkKCcubW9kaWZ5ID4gLnN0cnVjdHVyZSA+IHNlbGVjdCcpLFxuICAgICAgRW50cnkuc3RydWN0dXJlU2VsZWN0SGFuZGxlclxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5zdWJtaXQnKS5jbGljayBAc3VibWl0XG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmFub3RoZXInKS5jbGljayBAYW5vdGhlclxuXG4gICAgJCgnLmZvY3VzbWUnKS5mb2N1cyAtPlxuICAgICAgJCgnLm5vdGUtZWRpdGFibGUnKS5mb2N1cygpXG5cblxuICBsb2FkOiAoX2lkKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5JykpXG5cbiAgICBfLmdldCAnL2FwaS9lbnRyaWVzLycsXG4gICAgICBfaWQ6IF9pZFxuICAgIC5hbHdheXMgLT5cbiAgICAgIFNwaW5uZXIuZCgpXG4gICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgZW50cnkgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICBFbnRyeS5lbnRyeSA9IGVudHJ5XG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmFkZE9wdGlvblxuICAgICAgICBpZDogZW50cnkuc3RydWN0dXJlLmlkLCBuYW1lOiBlbnRyeS5zdHJ1Y3R1cmUubmFtZSwgY2xpZW50UHJvZmlsZTogZW50cnkuY2xpZW50LnByb2ZpbGVcbiAgICAgIEVudHJ5LnNlbGVjdFN0cnVjdHVyZVswXS5zZWxlY3RpemUuc2V0VmFsdWUgZW50cnkuc3RydWN0dXJlLmlkXG4gICAgICBFbnRyeS5zZWxlY3RTdHJ1Y3R1cmVbMF0uc2VsZWN0aXplLmRpc2FibGUoKVxuXG4gIHN1Ym1pdDogLT5cblxuICAgIG5hbWUgPSAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICBlbnRpdGllcyA9IHt9XG5cbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keSA+IC5lbnRpdHknKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIGVudGl0eV9uYW1lID0gJChlbCkuZmluZCgnLmxhYmVsJykuaHRtbCgpXG4gICAgICB0eXBlID0gJChlbCkuZGF0YSAndHlwZSdcblxuICAgICAgc3dpdGNoIHR5cGVcbiAgICAgICAgd2hlbiAnVGV4dCcsJ0xpbmsnLCdEYXRlJywnVGltZScsJ0RhdGVUaW1lJywnRGF0ZVJhbmdlJywnRGF0ZVRpbWVSYW5nZScgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKClcbiAgICAgICAgd2hlbiAnVGFncycgdGhlbiB2YWx1ZSA9ICQoZWwpLmZpbmQoJ2lucHV0JykudmFsKCkuc3BsaXQgJywnXG4gICAgICAgIHdoZW4gJ0Jsb2cnXG4gICAgICAgICAgYmxvZyA9IEVudGl0aWVzLmJsb2dHZXRDb2RlIGVudGl0eV9uYW1lXG4gICAgICAgICAgdmFsdWUgPSBibG9nXG4gICAgICAgIHdoZW4gJ0ltYWdlJ1xuICAgICAgICAgIHZhbHVlID0gRW50aXRpZXMuaW1hZ2VzW2VudGl0eV9uYW1lXVxuXG4gICAgICBlbnRpdGllc1tlbnRpdHlfbmFtZV0gPSBuYW1lOiBlbnRpdHlfbmFtZSwgdHlwZTogdHlwZSwgdmFsdWU6IHZhbHVlXG5cbiAgICAucHJvbWlzZSgpLmRvbmUgLT5cblxuICAgICAgU3Bpbm5lci5pKCQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeScpKVxuXG4gICAgICBjYWxsID0gJy9hcGkvZW50cmllcy9hZGQnXG4gICAgICBpZiBFbnRyeS5faWQgaXNudCBmYWxzZVxuICAgICAgICBjYWxsID0gXCIvYXBpL2VudHJpZXMvdXBkYXRlLyN7RW50cnkuX2lkfVwiXG5cbiAgICAgIF8uZ2V0IGNhbGwsXG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgc3RydWN0dXJlOiBFbnRyeS5zdHJ1Y3R1cmVcbiAgICAgICAgZW50aXRpZXM6IGVudGl0aWVzXG4gICAgICAuYWx3YXlzIC0+XG4gICAgICAgIFNwaW5uZXIuZCgpXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIE5vdGljZS5pIHJlc3BvbnNlLmRhdGEuc3RhdHVzLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgaWYgRW50cnkuX2lkIGlzIGZhbHNlXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIHt9LCAnJywgXCIvZW50cmllcy8je3Jlc3BvbnNlLmRhdGEuX2lkfVwiXG4gICAgICAgIEVudHJ5Ll9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkXG4gICAgICAgIF8ub24gJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5hbm90aGVyJ1xuXG4gIGFub3RoZXI6IC0+XG4gICAgbG9jYXRpb24uaHJlZiA9IFwiL2VudHJpZXMvbmV3I3N0cnVjdHVyZT0je0VudHJ5LnN0cnVjdHVyZX1cIlxuICBzdHJ1Y3R1cmVTZWxlY3RIYW5kbGVyOiAoZSkgLT5cbiAgICBzdHJ1Y3R1cmVfaWQgPSAkKGUuY3VycmVudFRhcmdldCkudmFsKClcbiAgICByZXR1cm4gZmFsc2UgaWYgc3RydWN0dXJlX2lkLmxlbmd0aCBpc250IDI0XG4gICAgI2lmIEVudHJ5LmVudHJ5IGlzbnQgZmFsc2VcbiAgICAjICBFbnRyeS5sb2FkRW50aXRpZXMgRW50cnkuZW50cnkuZW50aXRpZXMsIEVudHJ5LmVudHJ5Lm5hbWVcbiAgICAjZWxzZVxuICAgIEVudHJ5LmxvYWRTdHJ1Y3R1cmUgc3RydWN0dXJlX2lkXG5cbiAgbG9hZFN0cnVjdHVyZTogKF9pZCkgLT5cblxuICAgIFNwaW5uZXIuaSgkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnknKSlcblxuICAgIF8uZ2V0ICcvYXBpL3N0cnVjdHVyZXMnLFxuICAgICAgX2lkOiBfaWRcbiAgICAuYWx3YXlzIC0+XG4gICAgICBTcGlubmVyLmQoKVxuICAgIC5kb25lIChyZXNwb25zZSkgPT5cbiAgICAgIEVudHJ5LnN0cnVjdHVyZSA9IF9pZFxuICAgICAgQGxvYWRFbnRpdGllcyByZXNwb25zZS5kYXRhWzBdLmVudGl0aWVzXG5cbiAgbG9hZEVudGl0aWVzOiAoZW50aXRpZXMsIG5hbWU9ZmFsc2UpIC0+XG5cbiAgICBfLm9uICcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAubmFtZSdcbiAgICBpZiBFbnRyeS5lbnRyeS5uYW1lIGlzbnQgZmFsc2VcbiAgICAgICQoJy5wYWdlLmVudHJ5ID4gLm1vZGlmeSA+IC5uYW1lID4gLmlucHV0ID4gaW5wdXQnKS52YWwoRW50cnkuZW50cnkubmFtZSlcblxuICAgIGJvZHkgPSAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuYm9keScpXG4gICAgYm9keS5odG1sICcnXG5cbiAgICB0YWJpbmRleCA9IDNcbiAgICBpbmRleCA9IDBcblxuICAgIGZvciBpLCBlbnRpdHkgb2YgZW50aXRpZXNcblxuICAgICAgaHRtbCA9ICQoXCIucGFnZS5lbnRyeSA+ICN0ZW1wbGF0ZSA+IC5lbnRpdHlfI3tlbnRpdHkudHlwZX1cIikuY2xvbmUoKVxuICAgICAgaHRtbC5hZGRDbGFzcyBcImVudGl0eV9pbmRleF8jeysraW5kZXh9XCJcbiAgICAgIGh0bWwuZGF0YSBcImluZGV4XCIsIGluZGV4XG4gICAgICBodG1sLmRhdGEgXCJuYW1lXCIsIGVudGl0eS5uYW1lXG5cbiAgICAgIGlmIEVudHJ5LmVudHJ5LmVudGl0aWVzP1tpXT8udmFsdWVcblxuICAgICAgICB2YWx1ZSA9IEVudHJ5LmVudHJ5LmVudGl0aWVzW2ldLnZhbHVlXG5cbiAgICAgICAgc3dpdGNoIGVudGl0eS50eXBlXG4gICAgICAgICAgd2hlbiAnVGFncycsICdUZXh0JywnTGluaycsJ0RhdGUnLCdUaW1lJywnRGF0ZVRpbWUnLCdEYXRlUmFuZ2UnLCdEYXRlVGltZVJhbmdlJyB0aGVuIGh0bWwuZmluZCgnaW5wdXQnKS52YWwgdmFsdWVcblxuICAgICAgaHRtbC5maW5kKCdpbnB1dCxzZWxlY3QsdGV4dGFyZWEnKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4KytcbiAgICAgIGJvZHkuYXBwZW5kIGh0bWxcblxuICAgICAgZW50aXR5RWwgPSAkKFwiLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmJvZHkgLmVudGl0eV9pbmRleF8je2luZGV4fVwiKVxuICAgICAgZW50aXR5RWwuZmluZCgnLmxhYmVsJykuaHRtbCBlbnRpdHkubmFtZVxuXG4gICAgICBpZiBFbnRpdGllc1tlbnRpdHkudHlwZV0gaXNudCB1bmRlZmluZWRcbiAgICAgICAgRW50aXRpZXNbZW50aXR5LnR5cGVdKGVudGl0eUVsLCBlbnRpdHkubmFtZSwgdmFsdWUpXG5cbiAgICAkKCdbdGFiaW5kZXg9Ml0nKS5mb2N1cygpXG4gICAgXy5vbiAnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLnN1Ym1pdCdcbiAgICAkKCcucGFnZS5lbnRyeSA+IC5tb2RpZnkgPiAuc3VibWl0JykuYXR0ciAndGFiaW5kZXgnLCB0YWJpbmRleCsrXG4gICAgJCgnLnBhZ2UuZW50cnkgPiAubW9kaWZ5ID4gLmFub3RoZXInKS5hdHRyICd0YWJpbmRleCcsIHRhYmluZGV4XG4iLCJGaWx0ZXIgPVxuICBmaWx0ZXI6IGZhbHNlXG4gIGVuZHBvaW50OiBmYWxzZVxuICBmaWx0ZXJzOiBbXVxuXG4gIGk6IChmaWx0ZXJzKSAtPlxuXG4gICAgQGZpbHRlcnMgPSBmaWx0ZXJzXG5cbiAgICBfLm9uIFwiLmZpbHRlcl8je2ZpbHRlcn1cIiBmb3IgZmlsdGVyIGluIEBmaWx0ZXJzXG5cbiAgICBmb3IgZmlsdGVyIGluIEBmaWx0ZXJzXG4gICAgICBpZiBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIEZpbHRlci5zZWxlY3RlZCBmaWx0ZXJcblxuICAgICQoXCIubGlzdGluZ1wiKS5vbiAnY2xpY2snLCAnLmxpc3QtaGVhZGVyID4gLmZpbHRlcnMgPiAuZmlsdGVyJywgQGhhbmRsZXJzLmZpbHRlckhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmdcIikub24gJ2NsaWNrJywgJy5saXN0LWhlYWRlciA+IC5maWx0ZXJzID4gLmZpbHRlciA+IC5vcHRpb25fc2VsZWN0ZWQgPiAuaWNvbi5jYW5jZWwnLCBAaGFuZGxlcnMuZmlsdGVyQ2xlYXJIYW5kbGVyXG5cbiAgZDogLT5cbiAgICBfLm9mZiBcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn1cIlxuICAgICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXQnKS52YWwgJydcbiAgICBGaWx0ZXIuaGFuZGxlcnMuZCgpXG4gICAgTGlzdGluZy51bnNlbGVjdEFsbCgpXG4gICAgI1NwaW5uZXIuZCgpXG5cbiAgZ2V0OiAoc2VhcmNoPW51bGwpIC0+XG4gICAgU3Bpbm5lci5pKCQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9ID4gLmlubmVyID4gLnZhbHVlc1wiKSlcbiAgICBvcHRpb25zID1cbiAgICAgIHZpZXc6ICdmaWx0ZXJzJ1xuXG4gICAgb3B0aW9ucy5uYW1lID0gc2VhcmNoIGlmIHNlYXJjaCBpc250IG51bGxcblxuICAgIF8uZ2V0IFwiL2FwaS8je0BlbmRwb2ludH1cIiwgb3B0aW9uc1xuICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzJykuaHRtbCByZXNwb25zZS52aWV3XG4gICAgICBTcGlubmVyLmQoKVxuXG4gIHNlbGVjdDogKG9wdGlvbikgLT5cbiAgICBRdWVyeS5wYXJhbSAncGFnZScsIGZhbHNlXG4gICAgUXVlcnkucGFyYW0gRmlsdGVyLmZpbHRlciwgb3B0aW9uXG4gICAgRmlsdGVyLnNlbGVjdGVkIEZpbHRlci5maWx0ZXJcbiAgICBGaWx0ZXIuZCgpXG4gICAgTGlzdGluZy5sb2FkKClcblxuICBzZWxlY3RlZDogKGZpbHRlcikgLT5cbiAgICBpZiBRdWVyeS5wYXJhbShmaWx0ZXIpIGlzIHVuZGVmaW5lZFxuICAgICAgJChcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9zZWxlY3RlZCA+IC5jb3B5XCIpLmh0bWwgJydcbiAgICAgIF8ub24gXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fZGVmYXVsdFwiXG4gICAgICBfLm9mZiBcIi5maWx0ZXJfI3tmaWx0ZXJ9ID4gLm9wdGlvbl9zZWxlY3RlZFwiXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgICQoXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWQgPiAuY29weVwiKS5odG1sIFF1ZXJ5LnBhcmFtIGZpbHRlclxuICAgIF8ub2ZmIFwiLmZpbHRlcl8je2ZpbHRlcn0gPiAub3B0aW9uX2RlZmF1bHRcIlxuICAgIF8ub24gXCIuZmlsdGVyXyN7ZmlsdGVyfSA+IC5vcHRpb25fc2VsZWN0ZWRcIlxuXG4gIGhhbmRsZXJzOlxuXG4gICAgaTogLT5cblxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdjbGljaycsICcuaW5uZXIgPiAubGFiZWwgPiAuaWNvbi5jYW5jZWwnLCBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdrZXl1cCcsJyAuaW5uZXIgPiAuc2VhcmNoID4gaW5wdXQnLCBAa2V5SGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9uICdjbGljaycsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQHNlbGVjdEhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnbW91c2VvdmVyJywgJy5pbm5lciA+IC52YWx1ZXMgPiAudmFsdWUnLCBAaG92ZXJIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub24gJ2JsdXInLCAgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vbiAnY2xpY2snLCBAaW5zaWRlQ2hlY2tcblxuICAgICAgJChkb2N1bWVudCkub24gJ2NsaWNrJywgQG91dHNpZGVDaGVja1xuXG4gICAgZDogLT5cblxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnY2xpY2snLCAnLmlubmVyID4gLmxhYmVsID4gLmljb24uY2FuY2VsJywgRmlsdGVyLmRcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ2tleXVwJywnIC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dCcsIEBrZXlIYW5kbGVyXG4gICAgICAkKCcuc2VsZWN0aW9uJykub2ZmICdjbGljaycsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQHNlbGVjdEhhbmRsZXJcbiAgICAgICQoJy5zZWxlY3Rpb24nKS5vZmYgJ21vdXNlb3ZlcicsICcuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlJywgQGhvdmVySGFuZGxlclxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnYmx1cicsICBGaWx0ZXIuZFxuICAgICAgJCgnLnNlbGVjdGlvbicpLm9mZiAnY2xpY2snLCBAaW5zaWRlQ2hlY2tcblxuICAgICAgJChkb2N1bWVudCkub2ZmICdjbGljaycsIEBvdXRzaWRlQ2hlY2tcblxuXG4gICAgZmlsdGVyQ2xlYXJIYW5kbGVyOiAtPlxuICAgICAgY29uc29sZS5sb2cgJ2Fib3V0IHRvIGNsZWFyJ1xuICAgICAgRmlsdGVyLmZpbHRlciA9ICQodGhpcykuZGF0YSAnZmlsdGVyJ1xuICAgICAgRmlsdGVyLnNlbGVjdCBmYWxzZVxuICAgICAgRmlsdGVyLmQoKVxuXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGZpbHRlckhhbmRsZXI6IC0+XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgRmlsdGVyLmZpbHRlciA9ICQodGhpcykuZGF0YSAnZmlsdGVyJ1xuICAgICAgRmlsdGVyLmVuZHBvaW50ID0gJCh0aGlzKS5kYXRhICdlbmRwb2ludCdcblxuICAgICAgaWYgJChcIi5zZWxlY3Rpb24uc2VsZWN0aW9uXyN7RmlsdGVyLmZpbHRlcn1cIikuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBGaWx0ZXIuZCgpXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICBGaWx0ZXIuaGFuZGxlcnMuaSgpXG5cbiAgICAgICQoXCIuc2VsZWN0aW9uLnNlbGVjdGlvbl8je0ZpbHRlci5maWx0ZXJ9ID4gLmlubmVyID4gLnZhbHVlc1wiKS5odG1sICcnXG4gICAgICBfLm9uIFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfVwiXG4gICAgICAkKFwiLnNlbGVjdGlvbi5zZWxlY3Rpb25fI3tGaWx0ZXIuZmlsdGVyfSA+IC5pbm5lciA+IC5zZWFyY2ggPiBpbnB1dFwiKS5mb2N1cygpXG5cbiAgICAgIEZpbHRlci5nZXQoKVxuXG4gICAgaW5zaWRlQ2hlY2s6IC0+XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIG91dHNpZGVDaGVjazogLT5cbiAgICAgIEZpbHRlci5kKClcblxuICAgIGhvdmVySGFuZGxlcjogLT5cblxuICAgICAgXy5vZmYgJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlLm9uJ1xuICAgICAgXy5vbiAkKHRoaXMpXG5cbiAgICBzZWxlY3RIYW5kbGVyOiAtPlxuICAgICAgRmlsdGVyLnNlbGVjdCAkKHRoaXMpLmZpbmQoJy5uYW1lJykuaHRtbCgpXG5cbiAgICBrZXlIYW5kbGVyOiAtPlxuXG4gICAgICBrZXkgPSBldmVudC5rZXlDb2RlXG5cbiAgICAgIHN3aXRjaCBrZXlcbiAgICAgICAgd2hlbiAyNyB0aGVuIEZpbHRlci5kKClcbiAgICAgICAgd2hlbiA0MCwgMzkgdGhlbiBGaWx0ZXIubmF2ICdkb3duJ1xuICAgICAgICB3aGVuIDM3LDM4IHRoZW4gRmlsdGVyLm5hdiAndXAnXG4gICAgICAgIHdoZW4gMTMgdGhlbiBGaWx0ZXIuc2VsZWN0ICQoJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlLm9uID4gLm5hbWUnKS5odG1sKClcbiAgICAgICAgZWxzZSBGaWx0ZXIuZ2V0ICQodGhpcykudmFsKClcblxuICAgICAgcmV0dXJuIHRydWVcblxuICBuYXY6IChkaXIpIC0+XG5cbiAgICBjdXIgPSAkKCcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZS5vbicpXG4gICAgbmV4dCA9IGN1ci5uZXh0KCkgaWYgZGlyIGlzICdkb3duJ1xuICAgIG5leHQgPSBjdXIucHJldigpIGlmIGRpciBpcyAndXAnXG4gICAgXy5vZmYgY3VyXG5cbiAgICBpZiBuZXh0Lmxlbmd0aCBpc250IDBcbiAgICAgIF8ub24gbmV4dFxuICAgICAgcmV0dXJuXG5cbiAgICBfLm9uICcuc2VsZWN0aW9uID4gLmlubmVyID4gLnZhbHVlcyA+IC52YWx1ZTpmaXJzdC1jaGlsZCcgaWYgZGlyIGlzICdkb3duJ1xuICAgIF8ub24gJy5zZWxlY3Rpb24gPiAuaW5uZXIgPiAudmFsdWVzID4gLnZhbHVlOmxhc3QtY2hpbGQnIGlmIGRpciBpcyAndXAnXG5cbiIsIkdsb2JhbCA9XG5cbiAgIyBrZXZpbiBvbHNvbiAoa2V2aW5AMjU2LmlvKSDwn4yA8J+Ot1xuXG4gIHdpbmRvdzogZmFsc2VcbiAgd2luZG93VGltZXI6IGZhbHNlXG4gIGluaXQ6IGZhbHNlXG5cbiAgaTogLT5cbiAgICBHbG9iYWwuaGFuZGxlcnMoKVxuICAgIEdsb2JhbC5sb2dpbkNoZWNrKClcblxuICAgIF8ub24gXCIubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbl8je1BhZ2V9XCIgaWYgUGFnZT9cblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5wcm9maWxlJykuY2xpY2sgR2xvYmFsLnVzZXJQcm9maWxlSGFuZGxlclxuICAgICQoJy5vYXV0aHMgPiAub2F1dGgnKS5jbGljayBHbG9iYWwudXNlck9hdXRoSGFuZGxlclxuICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5tZSA+IC5waWN0dXJlID4gLmxvZ291dCcpLmNsaWNrIEdsb2JhbC5sb2dvdXRIYW5kbGVyXG4gICAgJCgnLm1lbnUgPiAub3B0aW9ucyA+IC5vcHRpb24nKS5jbGljayBHbG9iYWwubWVudUhhbmRsZXJcblxuICBtZW51SGFuZGxlcjogLT5cbiAgICBfLm9mZiAkKCcubWVudSA+IC5vcHRpb25zID4gLm9wdGlvbicpXG4gICAgc2VsZWN0ZWQgPSAkKHRoaXMpLmZpbmQoJy5sYWJlbCcpLmh0bWwoKVxuICAgIF8ub24gJChcIi5tZW51ID4gLm9wdGlvbnMgPiAub3B0aW9uLm9wdGlvbl8je3NlbGVjdGVkfVwiKVxuXG4gIGxvZ291dEhhbmRsZXI6IC0+XG5cbiAgICBQcm9tcHQuaSAnTG9nb3V0JywgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0PycsIFsnWWVzJywnTm8nXSwgKHJlc3BvbnNlKSAtPlxuICAgICAgcmV0dXJuIGZhbHNlIGlmIHJlc3BvbnNlIGlzbnQgJ1llcydcblxuICAgICAgU3Bpbm5lci5pICQoJ2hlYWRlcicpXG5cbiAgICAgIE1lLmxvZ291dCAtPlxuICAgICAgICBfLnN3YXAgJy5tZSA+IC5wcm9maWxlJ1xuICAgICAgICBfLnN3YXAgJy5tZSA+IC5waWN0dXJlJ1xuICAgICAgICBOb3RpY2UuaSAnTG9nb3V0IFN1Y2Nlc3NmdWwnLCAnc3VjY2VzcydcbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcbiAgICAgICAgLCAxMjAwXG5cbiAgdXNlclByb2ZpbGVIYW5kbGVyOiAtPlxuXG4gICAgb2EgPSAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAub2F1dGhzJylcbiAgICB0bCA9IG5ldyBUaW1lbGluZU1heCByZXBlYXQ6IDBcblxuICAgIGlmIG9hLmhhc0NsYXNzICdvZmYnXG4gICAgICBfLm9uIG9hXG4gICAgICB0bC50byAnI3Byb2ZpbGVTVkcnLCAwLjgsIHttb3JwaFNWRzogJyNjYW5jZWxTVkcnLCBlYXNlOlBvd2VyNC5lYXNlSW5PdXR9XG4gICAgZWxzZVxuICAgICAgdGwudG8gJyNwcm9maWxlU1ZHJywgMC44LCB7bW9ycGhTVkc6ICcjcHJvZmlsZVNWRycsIGVhc2U6UG93ZXI0LmVhc2VJbk91dH1cbiAgICAgIF8ub2ZmIG9hLCBvZmZpbmc6IDAuNVxuXG4gIHVzZXJPYXV0aEhhbmRsZXI6IC0+XG5cbiAgICB0eXBlID0gJCh0aGlzKS5kYXRhICd0eXBlJ1xuXG4gICAgcmV0dXJuIHRydWUgaWYgdHlwZSBpcyAnY2FuY2VsJ1xuXG4gICAgR2xvYmFsLm9hdXRoV2luZG93ICcvbG9hZGluZydcblxuICAgIFNwaW5uZXIuaSAkKCdoZWFkZXInKVxuXG4gICAgcGFyYW1zID0ge31cbiAgICBwYXJhbXMuaW52aXRlID0gSW52aXRlLmhhc2ggaWYgSW52aXRlLmhhc2hcblxuICAgIE1lLm9hdXRoIHR5cGUsIHBhcmFtcywgKHVyaSkgLT5cbiAgICAgIEdsb2JhbC53aW5kb3cubG9jYXRpb24uaHJlZiA9IHVyaVxuXG4gIG9hdXRoV2luZG93OiAodXJsKSAtPlxuICAgIHcgPSA2NDBcbiAgICBoID0gNTUwXG4gICAgbGVmdCA9IChzY3JlZW4ud2lkdGgvMikgLSAody8yKVxuICAgIHRvcCA9IChzY3JlZW4uaGVpZ2h0LzIpIC0gKGgvMilcblxuXG4gICAgR2xvYmFsLndpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgJ0xvZ2luIC8gUmVnaXN0ZXInLCBcInRvb2xiYXI9bm8sIGxvY2F0aW9uPW5vLCBkaXJlY3Rvcmllcz1ubywgc3RhdHVzPW5vLCBtZW51YmFyPW5vLCBzY3JvbGxiYXJzPW5vLCByZXNpemFibGU9bm8sIGNvcHloaXN0b3J5PW5vLCB3aWR0aD0je3d9LGhlaWdodD0je2h9LHRvcD0je3RvcH0sbGVmdD0je2xlZnR9XCIpXG4gICAgR2xvYmFsLndpbmRvdy5mb2N1cyBpZiB3aW5kb3cuZm9jdXNcbiAgICBHbG9iYWwud2luZG93VGltZXIgPSBzZXRJbnRlcnZhbCAtPlxuICAgICAgaWYgR2xvYmFsLndpbmRvdy5jbG9zZWRcbiAgICAgICAgY2xlYXJJbnRlcnZhbCBHbG9iYWwud2luZG93VGltZXJcbiAgICAgICAgU3Bpbm5lci5kKClcbiAgICAgICAgY29uc29sZS5sb2cgJ2Nsb3Npbmcgb3VyIHNoaXRlJ1xuICAgICwgNTBcblxuICAgIHJldHVyblxuXG4gIG9hdXRoQ29tcGxldGU6ICh1c2VyKSAtPlxuICAgIFNwaW5uZXIuZCgpXG4gICAgR2xvYmFsLmxvZ2luIHVzZXJcbiAgICBOb3RpY2UuaSAnTG9naW4gU3VjY2Vzc2Z1bCcsICdzdWNjZXNzJ1xuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2VudHJpZXMnXG4gICAgICAyMDAwXG4gICAgZWxzZVxuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQnXG4gICAgICAyMDAwXG5cbiAgbG9naW46ICh1c2VyKSAtPlxuXG4gICAgd2luZG93LlVzZXIgPSB1c2VyXG5cbiAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucGljdHVyZSA+IC5pbWFnZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5waWN0dXJlfSlcIlxuICAgIF8ub2ZmICcubWUgPiAucHJvZmlsZSdcbiAgICBfLm9mZiAnLm1lID4gLm9hdXRocydcbiAgICBfLm9uICcubWUgPiAucGljdHVyZSdcblxuICAgIGlmIFVzZXIuY2xpZW50IGlzbnQgdW5kZWZpbmVkXG4gICAgICAkKCdoZWFkZXIgPiAuaW5uZXIgPiAuY2xpZW50ID4gLm5hbWUnKS5odG1sIFVzZXIuY2xpZW50Lm5hbWVcbiAgICAgICQoJ2hlYWRlciA+IC5pbm5lciA+IC5jbGllbnQgPiAucGljdHVyZScpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7VXNlci5jbGllbnQucHJvZmlsZX0pXCJcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubG9nbydcbiAgICAgIF8ub2ZmICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcblxuICBsb2dpbkNoZWNrOiAtPlxuXG4gICAgI1NwaW5uZXIuaSgkKCdoZWFkZXInKSlcblxuICAgIE1lLmF1dGhlZCAocmVzdWx0KSAtPlxuICAgICAgR2xvYmFsLmxvZ2luKHJlc3VsdCkgaWYgcmVzdWx0IGlzbnQgZmFsc2VcbiAgICAgIGlmIEdsb2JhbC5pbml0IGlzbnQgZmFsc2VcbiAgICAgICAgI1NwaW5uZXIuZCgpXG4gICAgICAgIHdpbmRvd1tHbG9iYWwuaW5pdF0uaSgpXG4gICAgICBlbHNlXG4gICAgICAgICNTcGlubmVyLmQoKVxuXG4gICAgICAjIHR1cm4gb24gYWxsIGxvZ2luIC8gcmVnaXN0cmF0aW9uIGRpdnNcbiAgICAgIGlmIHdpbmRvdy5Vc2VyIGlzIHVuZGVmaW5lZFxuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubWUgPiAucHJvZmlsZSdcbiAgICAgICAgXy5vbiAnLmhvbWUgPiAub2F1dGhzJ1xuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPi5sb2dvJ1xuICAgICAgICBfLm9uICdoZWFkZXIgPiAuaW5uZXIgPiAubmFtZSdcblxuICAgICAgIyBjbGllbnQgYmFzZWQgdXNlciwgZ28gdG8gZW50cmllc1xuICAgICAgaWYgVXNlcj8uY2xpZW50IGlzbnQgdW5kZWZpbmVkIGFuZCBQYWdlIGlzbnQgJ2VudHJpZXMnXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2VudHJpZXMnXG5cbiAgICAgIGlmIHdpbmRvdy5Vc2VyIGlzbnQgdW5kZWZpbmVkIGFuZCBVc2VyLmNsaWVudCBpcyB1bmRlZmluZWRcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4ubG9nbydcbiAgICAgICAgXy5vbiAnaGVhZGVyID4gLmlubmVyID4gLm5hbWUnXG4gICAgICAgIF8ub24gJy5tZW51J1xuIiwiXy5jb25zdHJ1Y3RvcigpXG5cbmNsYXNzIEluZGV4XG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBoYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnRvcCAuYnVyZ2VyJykuY2xpY2sgQG1vYmlsZVxuXG4gIG1vYmlsZTogLT5cbiAgICBfLnN3YXAgJy50b3AgPiAuYnVyZ2VyJ1xuICAgIF8uc3dhcCAnLnRvcCA+IC5tZW51J1xuIiwiSW52aXRlID1cbiAgaGFzaDogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLmludml0ZScpKVxuXG4gICAgaWYgVXNlcj8gaXNudCBmYWxzZVxuICAgICAgU3Bpbm5lci5kKClcbiAgICAgIFByb21wdC5pICdJbnZpdGUgRXJvcnInLCAnWW91IGFyZSBjdXJyZW50bHkgbG9nZ2VkIGluJywgWydPSyddLCB7fSwgLT5cbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xuXG4gICAgZWxzZVxuICAgICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvaW52aXRlXFwvKFswLTlhLWZBLUZdezh9KS9cbiAgICAgICAgQGhhc2ggPSBtYXRjaFsxXVxuICAgICAgICBAbG9hZCBAaGFzaFxuICAgICAgZWxzZVxuXG4gIGxvYWQ6IChoYXNoKSAtPlxuXG4gICAgXy5nZXQgJy9hcGkvaW52aXRlL2dldCcsXG4gICAgICBoYXNoOiBoYXNoXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzdWx0KSAtPlxuICAgICAgaW52aXRlID0gcmVzdWx0LmRhdGEuaW52aXRlXG5cbiAgICAgICQoJy5wYWdlLmludml0ZSA+IC5wcm9maWxlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJyxcInVybCgje2ludml0ZS5jbGllbnQucHJvZmlsZX0pXCJcbiAgICAgICQoJy5wYWdlLmludml0ZSA+IC50aXRsZScpLmh0bWwgaW52aXRlLmNsaWVudC5uYW1lXG4iLCJMaXN0aW5nID1cbiAgY29udGVudDogZmFsc2VcbiAgc2VsZWN0ZWQ6IFtdXG4gIGZpbHRlcnM6IFtdXG4gIHNlbGVjdGVkQ3Vyc29yOiAwXG5cbiAgb3RoZXJBY3Rpb25zOiBmYWxzZVxuXG4gIGk6IChjb250ZW50LCBvdGhlckFjdGlvbnM9ZmFsc2UsIGZpbHRlcnM9W10pIC0+XG5cbiAgICBAZmlsdGVycyA9IGZpbHRlcnNcbiAgICBAY29udGVudCA9IGNvbnRlbnRcbiAgICBAb3RoZXJBY3Rpb25zID0gb3RoZXJBY3Rpb25zXG4gICAgQGxvYWQoKVxuICAgIEBoYW5kbGVycygpXG5cblxuICAgIEZpbHRlci5pIEBmaWx0ZXJzIGlmIEBmaWx0ZXJzLmxlbmd0aCA+IDBcblxuICBoYW5kbGVyczogLT5cbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5jaGVja2JveCcsIEBjaGVja2JveEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5zd2l0Y2gnLCBAc3dpdGNoSGFuZGxlclxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2hhbmdlJywgJy5saXN0LWhlYWRlciA+IC5jaGVja2JveCA+IGlucHV0JywgQHNlbGVjdEFsbEhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NoYW5nZScsICcuY2hlY2tib3ggPiBpbnB1dCcsIEBzdGF0ZUhhbmRsZXJcbiAgICAkKFwiLmxpc3RpbmcuI3tAY29udGVudH1cIikub24gJ2NsaWNrJywgJy5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zID4gLmFjdGlvbnMgPiAuYWN0aW9uJywgQGFjdGlvbkhhbmRsZXJcblxuICAgICQoXCIubGlzdGluZy4je0Bjb250ZW50fVwiKS5vbiAnY2xpY2snLCAnPiAuaW5uZXIgPiAucGFnaW5hdGUgPiAuaW5uZXIgPiAubnVtJywgQHBhZ2VIYW5kbGVyXG5cbiAgY2hlY2tib3hIYW5kbGVyOiAtPlxuICAgIGNiID0gJCh0aGlzKS5maW5kICdpbnB1dCdcbiAgICBpZiBldmVudC50YXJnZXQudHlwZSBpc250ICdjaGVja2JveCdcbiAgICAgIGNiWzBdLmNoZWNrZWQgPSAhY2JbMF0uY2hlY2tlZFxuICAgICAgY2IuY2hhbmdlKClcblxuICBzd2l0Y2hIYW5kbGVyOiAtPlxuXG4gICAgZWwgPSAkKHRoaXMpXG5cbiAgICBfaWQgPSBlbC5kYXRhICdfaWQnXG4gICAgbmFtZSA9IGVsLmRhdGEgJ25hbWUnXG4gICAgdmFsdWUgPSAhZWwuaGFzQ2xhc3MgJ29uJ1xuXG4gICAgTGlzdGluZy50b2dnbGUgW19pZF0sIG5hbWUsIHZhbHVlLCAtPlxuICAgICAgXy5zd2FwIGVsXG5cbiAgdG9nZ2xlOiAoaWRzLCBuYW1lLCB2YWx1ZSwgY29tcGxldGUpIC0+XG5cbiAgICBpZHMuZm9yRWFjaCAoX2lkLCBpbmRleCkgLT5cblxuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgICBvcHRpb25zW25hbWVdID0gdmFsdWVcblxuICAgICAgXy5nZXQgXCIvYXBpLyN7TGlzdGluZy5jb250ZW50fS91cGRhdGUvI3tfaWR9XCIsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgIC5kb25lIChyZXNwb3NuZSkgLT5cbiAgICAgICAgaWYgaW5kZXggaXMgaWRzLmxlbmd0aC0xXG4gICAgICAgICAgTm90aWNlLmkgXCJVcGRhdGVkIHN1Y2Nlc3NmdWxseVwiLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgICBjb21wbGV0ZT8oKVxuXG4gIHNlbGVjdEFsbEhhbmRsZXI6IC0+XG4gICAgaWYgdGhpcy5jaGVja2VkXG4gICAgICAkKCcubGlzdGluZyA+IC5pbm5lciA+IC5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXQnKS5wcm9wICdjaGVja2VkJywgdHJ1ZVxuICAgIGVsc2VcbiAgICAgICQoJy5saXN0aW5nID4gLmlubmVyID4gLml0ZW1zID4gLml0ZW0gPiAuY2hlY2tib3ggPiBpbnB1dCcpLnByb3AgJ2NoZWNrZWQnLCBmYWxzZVxuXG4gIHVuc2VsZWN0QWxsOiAtPlxuICAgICAgJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fSA+IC5pbm5lciA+IC5pdGVtcyA+IC5pdGVtID4gLmNoZWNrYm94ID4gaW5wdXRcIikucHJvcCAnY2hlY2tlZCcsIGZhbHNlXG4gICAgICAkKFwiLmxpc3RpbmcuI3tMaXN0aW5nLmNvbnRlbnR9ID4gLmxpc3QtaGVhZGVyID4gLmNoZWNrYm94ID4gaW5wdXRcIikucHJvcCAnY2hlY2tlZCcsIGZhbHNlXG4gICAgICBMaXN0aW5nLnN0YXRlSGFuZGxlcigpXG5cbiAgc3RhdGVIYW5kbGVyOiAtPlxuICAgIGlkcyA9IFtdXG5cbiAgICAkKCcuaXRlbXMgPiAuaXRlbSA+IC5jaGVja2JveCA+IGlucHV0JykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBpZiBlbC5jaGVja2VkXG4gICAgICAgIGlkcy5wdXNoICQoZWwpLmRhdGEgJ19pZCdcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuICAgICAgaWYgaWRzLmxlbmd0aCA+IDBcbiAgICAgICAgJCgnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucyA+IC5jb3B5ID4gLnZhbHVlJykudGV4dCBpZHMubGVuZ3RoXG4gICAgICAgIF8ub2ZmICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9zdGF0cydcbiAgICAgICAgXy5vbiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfYWN0aW9ucydcbiAgICAgICAgXy5vbiBcIi5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb25fI3tMaXN0aW5nLmNvbnRlbnR9XCJcbiAgICAgIGVsc2VcbiAgICAgICAgXy5vbiAnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMnXG4gICAgICAgIF8ub2ZmICcubGlzdGluZyA+IC5saXN0LWhlYWRlciA+IC5zdGF0ZV9hY3Rpb25zJ1xuICAgICAgICBfLm9mZiBcIi5saXN0aW5nID4gLmxpc3QtaGVhZGVyID4gLnN0YXRlX2FjdGlvbnMgPiAuYWN0aW9ucyA+IC5hY3Rpb25fI3tMaXN0aW5nLmNvbnRlbnR9XCJcbiAgICAgIExpc3Rpbmcuc2VsZWN0ZWQgPSBpZHNcblxuICBwYWdlTGlua3M6IC0+XG4gICAgcGFyYW1zID0gUXVlcnkucGFyYW1zKClcbiAgICAkKCcucGFnaW5hdGUgPiAuaW5uZXIgPiAubnVtJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBwYWdlID0gJChlbCkuZGF0YSAncGFnZSdcbiAgICAgIHJldHVybiBpZiBwYWdlIGlzIHVuZGVmaW5lZFxuICAgICAgcGFyYW1zLnBhZ2UgPSBwYWdlXG4gICAgICBxdWVyeSA9IFF1ZXJ5LnN0cmluZ2lmeSBwYXJhbXNcbiAgICAgICQoZWwpLmF0dHIgJ2hyZWYnLCBcIj8je1F1ZXJ5LnN0cmluZ2lmeShwYXJhbXMpfVwiXG5cbiAgcGFnZUhhbmRsZXI6IC0+XG4gICAgcGFnZSA9ICQodGhpcykuZGF0YSAncGFnZSdcbiAgICByZXR1cm4gdHJ1ZSBpZiBwYWdlIGlzIHVuZGVmaW5lZFxuICAgIExpc3RpbmcudW5zZWxlY3RBbGwoKVxuICAgIFF1ZXJ5LnBhcmFtICdwYWdlJywgcGFnZVxuICAgIExpc3RpbmcubG9hZCgpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgYWN0aW9uSGFuZGxlcjogLT5cbiAgICB0eXBlID0gJCh0aGlzKS5kYXRhICd0eXBlJ1xuXG4gICAgc3dpdGNoIHR5cGVcbiAgICAgIHdoZW4gJ2RlbGV0ZSdcbiAgICAgICAgUHJvbXB0LmkgXCJEZWxldGluZyAje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBpdGVtcyhzKVwiLFxuICAgICAgICAgICdUaGlzIGZlYXR1cmUgaXMgY3VycmVudGx5IGluIGRldmVsb3BtZW50JywgWydPSyddLCAocmVzcG9uc2UpIC0+XG4gICAgICAgICMjI1xuICAgICAgICBQcm9tcHQuaSBcIkRlbGV0aW5nICN7TGlzdGluZy5zZWxlY3RlZC5sZW5ndGh9IGl0ZW1zKHMpXCIsXG4gICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlc2U/JywgWydZZXMnLCdObyddLCAocmVzcG9uc2UpIC0+XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiByZXNwb25zZSBpc250ICdZZXMnXG4gICAgICAgICAgICBMaXN0aW5nLmRlbGV0ZVNlbGVjdGVkKClcbiAgICAgICAgIyMjXG5cbiAgICAgIHdoZW4gJ3B1Ymxpc2gnLCAnaGlkZSdcblxuICAgICAgICB2YWx1ZSA9ICh0eXBlIGlzICdwdWJsaXNoJylcbiAgICAgICAgU3Bpbm5lci5pKCQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH1cIikpXG4gICAgICAgIExpc3RpbmcudG9nZ2xlIExpc3Rpbmcuc2VsZWN0ZWQsICdhY3RpdmUnLCB2YWx1ZSwgLT5cblxuICAgICAgICAgICQoJy5zd2l0Y2guYWN0aXZlJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICAgICAgICBmb3IgX2lkIGluIExpc3Rpbmcuc2VsZWN0ZWRcbiAgICAgICAgICAgICAgXy5vbiAkKGVsKSBpZiBfaWQgaXMgJChlbCkuZGF0YSgnX2lkJykgYW5kIHZhbHVlIGlzIHRydWVcbiAgICAgICAgICAgICAgXy5vZmYgJChlbCkgaWYgX2lkIGlzICQoZWwpLmRhdGEoJ19pZCcpIGFuZCB2YWx1ZSBpcyBmYWxzZVxuXG4gICAgICAgICAgaWYgdmFsdWVcbiAgICAgICAgICAgIE5vdGljZS5pIFwiI3tMaXN0aW5nLnNlbGVjdGVkLmxlbmd0aH0gRW50cmllcyBwdWJsaXNoZWRcIiwgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgTm90aWNlLmkgXCIje0xpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RofSBFbnRyaWVzIGhpZGRlblwiLCB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgICBTcGlubmVyLmQoKVxuXG5cbiAgICAgIGVsc2VcbiAgICAgICAgTGlzdGluZy5vdGhlckFjdGlvbnModHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICBkZWxldGU6IChpZCwgY2FsbGJhY2spIC0+XG5cbiAgICAjIyNcbiAgICBTcGlubmVyLmkoJChcIi5saXN0aW5nLiN7TGlzdGluZy5jb250ZW50fVwiKSlcbiAgICBfLmdldCBcIi9hcGkvI3tMaXN0aW5nLmNvbnRlbnR9L2RlbGV0ZS8je2lkfVwiXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBjYWxsYmFjayB0cnVlXG4gICAgLmZhaWwgLT5cbiAgICAgIGNhbGxiYWNrIGZhbHNlXG4gICAgIyMjXG5cbiAgZGVsZXRlU2VsZWN0ZWQ6IChjdXJzb3I9MCkgLT5cblxuICAgIGlmIExpc3Rpbmcuc2VsZWN0ZWQubGVuZ3RoIGlzIGN1cnNvclxuICAgICAgTm90aWNlLmkgJ1N0cnVjdHVyZShzKSBkZWxldGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgQGxvYWQoKVxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIExpc3RpbmcuZGVsZXRlIExpc3Rpbmcuc2VsZWN0ZWRbY3Vyc29yXSwgKHJlc3VsdCkgLT5cbiAgICAgIExpc3RpbmcuZGVsZXRlU2VsZWN0ZWQgKytjdXJzb3IgaWYgcmVzdWx0IGlzIHRydWVcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoXCIubGlzdGluZy4je0xpc3RpbmcuY29udGVudH1cIikpXG5cbiAgICBvcHRpb25zID0gdmlldzogdHJ1ZVxuXG4gICAgZm9yIGZpbHRlciBpbiBAZmlsdGVyc1xuICAgICAgaWYgUXVlcnkucGFyYW0oZmlsdGVyKSBpc250IHVuZGVmaW5lZFxuICAgICAgICBvcHRpb25zW2ZpbHRlciArICcubmFtZSddID0gUXVlcnkucGFyYW0gZmlsdGVyXG4gICAgaWYgUXVlcnkucGFyYW0oJ3BhZ2UnKSBpc250IHVuZGVmaW5lZFxuICAgICAgb3B0aW9ucy5wYWdlID0gUXVlcnkucGFyYW0gJ3BhZ2UnXG5cbiAgICBfLmdldCBcIi9hcGkvI3tAY29udGVudH1cIiwgb3B0aW9uc1xuICAgIC5kb25lIChyZXNwb25zZSkgPT5cbiAgICAgIFRpbWUuaSgpXG4gICAgICBTcGlubmVyLmQoKVxuICAgICAgJCgnLmxpc3RpbmcgPiAubGlzdC1oZWFkZXIgPiAuc3RhdGVfc3RhdHMgPiAuY29weSA+IC52YWx1ZScpLnRleHQgcmVzcG9uc2UucGFnaW5hdGUudG90YWxcbiAgICAgICQoXCIuI3tAY29udGVudH0gPiAuY29udGVudCA+IC5saXN0aW5nID4gLmlubmVyXCIpLmh0bWwgcmVzcG9uc2Uudmlld1xuICAgICAgTGlzdGluZy5wYWdlTGlua3MoKVxuXG5cbiIsbnVsbCwiTWUgPVxuXG4gIGxvZ291dDogKGNvbXBsZXRlKSAtPlxuXG4gICAgXy5nZXQgJy9hcGkvYXV0aC9sb2dvdXQnXG4gICAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICAgIGNvbXBsZXRlKClcblxuICBvYXV0aDogKHR5cGUsIHBhcmFtcz17fSwgY29tcGxldGUpIC0+XG5cbiAgICBfLmdldCBcIi9hcGkvYXV0aC8je3R5cGV9XCIsIHBhcmFtc1xuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBjb21wbGV0ZShyZXNwb25zZS5kYXRhLnVyaSlcblxuICBhdXRoZWQ6IChyZXN1bHQpIC0+XG4gICAgXy5nZXQgJy9hcGkvYXV0aCdcbiAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgcmVzdWx0IHJlc3BvbnNlLmRhdGEudXNlclxuXG4gIGdldDpcbiAgICBjbGllbnRJZDogLT5cbiAgICAgIHJldHVybiBVc2VyLmNsaWVudC5pZFxuIiwiTm90Zm91bmQgPVxuICBpOiAtPlxuICAgICQoJyNsaW5lZXJyb3InKS5ub3ZhY2FuY3lcbiAgICAgICdyZWJsaW5rUHJvYmFiaWxpdHknOiAwLjFcbiAgICAgICdibGlua01pbic6IDAuMlxuICAgICAgJ2JsaW5rTWF4JzogMC42XG4gICAgICAnbG9vcE1pbic6IDhcbiAgICAgICdsb29wTWF4JzogMTBcbiAgICAgICdjb2xvcic6ICcjZmZmZmZmJ1xuICAgICAgJ2dsb3cnOiBbJzAgMCA4MHB4ICNmZmZmZmYnLCAnMCAwIDMwcHggIzAwODAwMCcsICcwIDAgNnB4ICMwMDAwZmYnXVxuXG4gICAgJCgnI2xpbmVjb2RlJykubm92YWNhbmN5XG4gICAgICAnYmxpbmsnOiAxXG4gICAgICAnb2ZmJzogMVxuICAgICAgJ2NvbG9yJzogJ1JlZCdcbiAgICAgICdnbG93JzogWycwIDAgODBweCBSZWQnLCAnMCAwIDMwcHggRmlyZUJyaWNrJywgJzAgMCA2cHggRGFya1JlZCddXG4iLCJOb3RpY2UgPVxuXG4gIHR5cGVzOiBbJ2luZm8nLCdzdWNjZXNzJywnd2FybmluZyddXG5cbiAgZWw6IGZhbHNlXG5cbiAgb246IGZhbHNlXG4gIHByb2dyZXNzOiBmYWxzZVxuICB0aW1lb3V0OiBmYWxzZVxuICBjbG9zZTogdHJ1ZVxuXG4gIGRlZmF1bHQ6XG4gICAgdHlwZTogJ2luZm8nXG4gICAgcHJvZ3Jlc3M6IGZhbHNlXG4gICAgdGltZW91dDogNTAwMFxuXG4gIGk6IChjb3B5LG9wdGlvbnM9e30pIC0+XG5cbiAgICBAb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ge30sIEBkZWZhdWx0XG5cbiAgICBmb3Iga2V5LCBwYXJhbSBvZiBvcHRpb25zXG4gICAgICBAb3B0aW9uc1trZXldID0gcGFyYW1cblxuICAgIEBlbCA9ICQoJy5ub3RpY2UnKSBpZiBAZWwgaXMgZmFsc2VcblxuICAgIGZvciBkdHlwZSBpbiBAdHlwZXNcbiAgICAgIEBlbC5yZW1vdmVDbGFzcyBkdHlwZVxuICAgIEBlbC5hZGRDbGFzcyBAb3B0aW9ucy50eXBlXG4gICAgQGVsLmZpbmQoJy5jb3B5ID4gLm1lc3NhZ2UnKS5odG1sIGNvcHlcblxuICAgIGlmIEBvcHRpb25zLnByb2dyZXNzIGlzbnQgZmFsc2VcbiAgICAgIGlmIEBwcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgICBfLm9uIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgICAgQHByb2dyZXNzID0gdHJ1ZVxuICAgICAgaWYgQGNsb3NlIGlzIHRydWVcbiAgICAgICAgXy5vZmYgQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICAgIEBjbG9zZSA9IGZhbHNlXG4gICAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG4gICAgICAgICwgMTAwXG4gICAgICBlbHNlXG4gICAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCBAb3B0aW9ucy5wcm9ncmVzcyoxMDAgKyAnJScpXG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZSBhbmQgQHByb2dyZXNzIGlzIHRydWVcbiAgICAgIEBlbC5maW5kKCcuZnVsbCcpLmNzcygnd2lkdGgnLCAnMCUnKVxuICAgICAgXy5vZmYgQGVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgICAgQHByb2dyZXNzID0gZmFsc2VcbiAgICAgIF8ub24gQGVsLmZpbmQoJy5jbG9zZScpXG4gICAgICBAY2xvc2UgPSB0cnVlXG5cbiAgICBpZiBAb24gaXMgZmFsc2VcbiAgICAgIF8ub24gQGVsXG4gICAgICBAaGFuZGxlcnMub24oKVxuICAgICAgQG9uID0gdHJ1ZVxuXG4gICAgaWYgQG9wdGlvbnMudGltZW91dCBpc250IGZhbHNlIGFuZCBAb3B0aW9ucy5wcm9ncmVzcyBpcyBmYWxzZVxuICAgICAgQHRpbWVvdXQgPSBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEBkKClcbiAgICAgICwgQG9wdGlvbnMudGltZW91dFxuXG4gIGhhbmRsZXJzOlxuICAgIG9uOiAtPlxuICAgICAgJCgnLm5vdGljZScpLm9uICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuICAgIG9mZjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vZmYgJ2NsaWNrJywgJy5pbm5lciA+IC5jbG9zZSA+IC5pbm5lcicsIE5vdGljZS5kXG5cbiAgZDogLT5cbiAgICBjbGVhclRpbWVvdXQgTm90aWNlLnRpbWVvdXQgaWYgTm90aWNlLnRpbWVvdXQgaXNudCBmYWxzZVxuICAgIE5vdGljZS50aW1lb3V0ID0gZmFsc2VcbiAgICBOb3RpY2UuaGFuZGxlcnMub2ZmKClcbiAgICBfLm9uIE5vdGljZS5lbC5maW5kKCcuY2xvc2UnKVxuICAgIE5vdGljZS5jbG9zZSA9IHRydWVcbiAgICBfLm9mZiBOb3RpY2UuZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgTm90aWNlLnByb2dyZXNzID0gZmFsc2VcbiAgICBfLm9mZiBOb3RpY2UuZWwsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC4yXG4gICAgTm90aWNlLm9uID0gZmFsc2VcbiIsIlByb21wdCA9XG4gIGVsOiB7fVxuICBvcHRpb25zOiB7fVxuICBjYWxsYmFjazogZmFsc2VcbiAgcGFyYW1zOiB7fVxuXG4gIGk6ICh0aXRsZSwgY29weSwgb3B0aW9ucz1bJ09LJ10sIHBhcmFtcywgY2FsbGJhY2spIC0+XG5cbiAgICBQcm9tcHQuY2FsbGJhY2sgPSBmYWxzZVxuICAgIFByb21wdC5wYXJhbXMgPSBmYWxzZVxuXG4gICAgUHJvbXB0LmNhbGxiYWNrID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ2Z1bmN0aW9uJ1xuICAgIFByb21wdC5jYWxsYmFjayA9IGNhbGxiYWNrIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG5cbiAgICBQcm9tcHQucGFyYW1zID0gcGFyYW1zIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCdcblxuICAgIFByb21wdC5lbCA9ICQgJy5wcm9tcHQnXG5cbiAgICBQcm9tcHQuZWwuZmluZCAnLnRpdGxlJ1xuICAgICAgLmh0bWwgdGl0bGVcbiAgICBQcm9tcHQuZWwuZmluZCAnLmNvcHknXG4gICAgICAuaHRtbCBjb3B5XG5cbiAgICBpZiB0eXBlb2YgcGFyYW1zIGlzICdvYmplY3QnIGFuZCAndGV4dGFyZWEnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLnRleHRhcmVhIGlzIHRydWVcbiAgICAgIF8ub24gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSdcbiAgICAgIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEgPiB0ZXh0YXJlYSdcbiAgICAgICAgLnZhbCBwYXJhbXMudmFsdWVcblxuICAgIGlmIHR5cGVvZiBwYXJhbXMgaXMgJ29iamVjdCcgYW5kICdjbGlwYm9hcmQnIG9mIHBhcmFtcyBhbmQgcGFyYW1zLmNsaXBib2FyZCBpcyB0cnVlXG4gICAgICBpbnB1dCA9IFByb21wdC5lbC5maW5kICcuaW5wdXQnXG4gICAgICBfLm9uIGlucHV0XG4gICAgICBpbnB1dC5maW5kKCdpbnB1dCcpLnZhbCBwYXJhbXMudmFsdWVcblxuXG4gICAgUHJvbXB0Lm9wdGlvbnMgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbnMgPiAub3B0aW9uJ1xuICAgIF8ub2ZmIFByb21wdC5vcHRpb25zXG4gICAgUHJvbXB0Lm9wdGlvbnMucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmFkZENsYXNzICdhY3RpdmUnXG5cbiAgICBmb3IgbyxpIGluIG9wdGlvbnNcbiAgICAgIG9wdGlvbiA9IFByb21wdC5lbC5maW5kIFwiLm9wdGlvbnMgID4gLm9wdGlvbl8je2krMX1cIlxuICAgICAgXy5vbiBvcHRpb25cbiAgICAgIG9wdGlvbi5odG1sIG9cbiAgICAgICAgLmRhdGEgJ3ZhbHVlJywgb1xuXG4gICAgXy5vbiBQcm9tcHQuZWwsXG4gICAgXy5vbiAnLmJmYWRlJ1xuXG4gICAgUHJvbXB0LmhhbmRsZXJzKClcbiAgICBQcm9tcHQub3B0aW9ucy5maXJzdCgpLmZvY3VzKClcblxuICBoYW5kbGVyczogLT5cbiAgICAkKGRvY3VtZW50KS5rZXlkb3duIFByb21wdC5rZXlkb3duXG4gICAgUHJvbXB0Lm9wdGlvbnMub24gJ2NsaWNrJywgUHJvbXB0LmNsaWNrXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbm5lciA+IC5jYW5jZWwnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2FuY2VsXG4gICAgUHJvbXB0LmVsLmZpbmQoJy5jbGlwYm9hcmQnKS5vbiAnY2xpY2snLCBQcm9tcHQuY2xpcGJvYXJkXG5cblxuICBjbGlwYm9hcmQ6IC0+XG4gICAgUHJvbXB0LmVsLmZpbmQoJy5pbnB1dCA+IGlucHV0Jykuc2VsZWN0KClcbiAgICBpZiBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG4gICAgICBOb3RpY2UuaSAnQ29waWVkIHRvIGNsaXBib2FyZCcsIHR5cGU6ICdzdWNjZXNzJ1xuICAgIGVsc2VcbiAgICAgIE5vdGljZS5pICdVbmFibGUgdG8gY2xpcGJvYXJkJywgdHlwZTogJ3dhcm5pbmcnXG5cbiAga2V5ZG93bjogLT5cbiAgICBrID0gZXZlbnQud2hpY2hcbiAgICBrZXlzID0gWzM5LCA5LCAzNywgMTMsIDI3XVxuICAgIHJldHVybiB0cnVlIGlmIGsgbm90IGluIGtleXNcblxuICAgIGN1cnJlbnQgPSBQcm9tcHQuZWwuZmluZCAnLm9wdGlvbi5vbi5hY3RpdmUnXG4gICAgc2hpZnQgPSB3aW5kb3cuZXZlbnQuc2hpZnRLZXlcblxuICAgIGlmIGsgaXMgMzkgb3IgKGsgaXMgOSBhbmQgIXNoaWZ0KVxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgaWYgY3VycmVudC5uZXh0KCkuaGFzQ2xhc3MgJ29uJ1xuICAgICAgICBjdXJyZW50Lm5leHQoKS5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgZWxzZVxuICAgICAgICBQcm9tcHQuZWwuZmluZCgnLm9wdGlvbl8xJykuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAzNyBvciAoayBpcyA5IGFuZCBzaGlmdClcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGlmIGN1cnJlbnQucHJldigpLmhhc0NsYXNzICdvbidcbiAgICAgICAgY3VycmVudC5wcmV2KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24ub24nKS5sYXN0KCkuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgayBpcyAxM1xuICAgICAgUHJvbXB0LnRyaWdnZXIgUHJvbXB0LmVsLmZpbmQoJy5vcHRpb24uYWN0aXZlJykuZGF0YSAndmFsdWUnXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZiBrIGlzIDI3XG4gICAgICBQcm9tcHQudHJpZ2dlcihmYWxzZSlcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gIGNhbmNlbDogLT5cbiAgICBQcm9tcHQudHJpZ2dlciBmYWxzZVxuXG4gIGNsaWNrOiAtPlxuICAgIFByb21wdC50cmlnZ2VyICQodGhpcykuZGF0YSAndmFsdWUnXG5cbiAgdHJpZ2dlcjogKHZhbHVlKSAtPlxuICAgIF8ub2ZmIFByb21wdC5lbC5maW5kICcudGV4dGFyZWEnXG4gICAgXy5vZmYgUHJvbXB0LmVsLCBvZmZpbmc6IGZhbHNlLCBvZmZ0aW1lOiAwLjJcbiAgICAjXy5vZmYgJy5iZmFkZScsIG9mZmluZzogZmFsc2UsIG9mZml0bWU6IDAuMlxuICAgIF8ub2ZmICcuYmZhZGUnXG4gICAgUHJvbXB0Lm9wdGlvbnMudW5iaW5kICdjbGljaycsIFByb21wdC5jbGlja1xuICAgICQoZG9jdW1lbnQpLnVuYmluZCAna2V5ZG93bicsIFByb21wdC5rZXlkb3duXG4gICAgaWYgUHJvbXB0LnBhcmFtcy50ZXh0YXJlYVxuICAgICAgdmFsID0gUHJvbXB0LmVsLmZpbmQgJy50ZXh0YXJlYSA+IHRleHRhcmVhJ1xuICAgICAgICAudmFsKClcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gcmVzcG9uc2U6IHZhbHVlLCB2YWw6IHZhbFxuICAgIGVsc2VcbiAgICAgIFByb21wdC5jYWxsYmFjaz8gdmFsdWVcbiIsIlF1ZXJ5ID1cblxuICBnZXRRdWVyeTogLT5cbiAgICByZXR1cm4gbG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpXG5cbiAgc2V0UXVlcnk6IChwYXJhbXMpIC0+XG4gICAgcXVlcnkgPSBxcy5zdHJpbmdpZnkgcGFyYW1zXG4gICAgaWYgcXVlcnkgaXMgdW5kZWZpbmVkIG9yIHF1ZXJ5IGlzICcnXG4gICAgICBoaXN0b3J5LnB1c2hTdGF0ZSBudWxsLCBudWxsLCBsb2NhdGlvbi5wYXRobmFtZVxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGhpc3RvcnkucHVzaFN0YXRlIG51bGwsIG51bGwsIGxvY2F0aW9uLnBhdGhuYW1lICsgJz8nICsgcXVlcnlcbiAgICBcbiAgcGFyYW06IChrZXksIHZhbHVlKSAtPlxuXG4gICAgcXVlcnkgPSBAZ2V0UXVlcnkoKVxuXG4gICAgcGFyYW1zID0gcXMucGFyc2UgcXVlcnlcblxuICAgIHJldHVybiBwYXJhbXNba2V5XSBpZiB2YWx1ZSBpcyB1bmRlZmluZWRcblxuICAgIGlmIHZhbHVlIGlzIGZhbHNlXG4gICAgICBkZWxldGUgcGFyYW1zW2tleV1cbiAgICBlbHNlXG4gICAgICBwYXJhbXNba2V5XSA9IHZhbHVlXG4gICAgQHNldFF1ZXJ5IHBhcmFtc1xuXG4gIHBhcmFtczogLT5cbiAgICByZXR1cm4gcXMucGFyc2UgQGdldFF1ZXJ5KClcblxuICBzdHJpbmdpZnk6IChwYXJhbXMpIC0+XG4gICAgcmV0dXJuIHFzLnN0cmluZ2lmeSBwYXJhbXNcblxuIiwiU2VsZWN0aXplID1cblxuICBjbGllbnRzOiAoZWxlbWVudCwgaGFuZGxlciwgb3B0aW9ucykgLT5cbiAgICBzZWxlY3RDbGllbnQgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIGEgQ2xpZW50IFwiXG4gICAgICB2YWx1ZUZpZWxkOiAnaWQnXG4gICAgICBsYWJlbEZpZWxkOiAnbmFtZSdcbiAgICAgIHNlYXJjaEZpZWxkOiAnbmFtZSdcbiAgICAgIGNyZWF0ZTogZmFsc2VcbiAgICAgIHByZWxvYWQ6ICdmb2N1cydcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgb3B0aW9uOiAoaXRlbSwgZXNjYXBlKSAtPlxuICAgICAgICAgIHJldHVybiBcIjxkaXY+I3tpdGVtLm5hbWV9PC9kaXY+XCJcbiAgICAgIGxvYWQ6IChxdWVyeSwgY2FsbGJhY2spIC0+XG4gICAgICAgIF8uZ2V0ICcvYXBpL2NsaWVudHMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdENsaWVudC5jaGFuZ2UgaGFuZGxlclxuICAgIHJldHVybiBzZWxlY3RDbGllbnRcblxuICBzdHJ1Y3R1cmVzOiAoZWxlbWVudCwgaGFuZGxlciwgb3B0aW9ucykgLT5cblxuICAgIHNlbGVjdFN0cnVjdHVyZSA9IGVsZW1lbnQuc2VsZWN0aXplXG4gICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgYSBTdHJ1Y3R1cmUgICBcIlxuICAgICAgdmFsdWVGaWVsZDogJ2lkJ1xuICAgICAgbGFiZWxGaWVsZDogJ25hbWUnXG4gICAgICBzZWFyY2hGaWVsZDogJ25hbWUnXG4gICAgICBjcmVhdGU6IGZhbHNlXG4gICAgICBwcmVsb2FkOiAnZm9jdXMnXG4gICAgICBvcGVuT25Gb2N1czogdHJ1ZVxuICAgICAgb25Mb2FkOiBFbnRyeS5zdHJ1Y3R1cmVTcGVjaWZpZWRcbiAgICAgIHJlbmRlcjpcbiAgICAgICAgaXRlbTogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PjxpbWcgY2xhc3M9XFxcInByb2ZpbGVcXFwiIHNyYz1cXFwiI3tpdGVtLmNsaWVudFByb2ZpbGV9XFxcIi8+ICN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICAgIG9wdGlvbjogKGl0ZW0sIGVzY2FwZSkgLT5cbiAgICAgICAgICByZXR1cm4gXCI8ZGl2PjxpbWcgY2xhc3M9XFxcInByb2ZpbGVcXFwiIHNyYz1cXFwiI3tpdGVtLmNsaWVudFByb2ZpbGV9XFxcIi8+ICN7aXRlbS5uYW1lfTwvZGl2PlwiXG4gICAgICBsb2FkOiAocXVlcnksIGNhbGxiYWNrKSAtPlxuICAgICAgICBfLmdldCAnL2FwaS9zdHJ1Y3R1cmVzJywgb3B0aW9uc1xuICAgICAgICAgIC5kb25lIChyZXNwb25zZSkgLT5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgZm9yIGl0ZW0gaW4gcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggaWQ6IGl0ZW0uX2lkLCBuYW1lOiBpdGVtLm5hbWUsIGNsaWVudE5hbWU6IGl0ZW0uY2xpZW50Lm5hbWUsIGNsaWVudFByb2ZpbGU6IGl0ZW0uY2xpZW50LnByb2ZpbGVcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpXG5cbiAgICBzZWxlY3RTdHJ1Y3R1cmUuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0U3RydWN0dXJlXG5cbiAgdXNlcnM6IChlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKSAtPlxuICAgIHNlbGVjdFVzZXIgPSBlbGVtZW50LnNlbGVjdGl6ZVxuICAgICAgcGx1Z2luczogWydyZW1vdmVfYnV0dG9uJ11cbiAgICAgIHZhbHVlRmllbGQ6ICdpZCdcbiAgICAgIGxhYmVsRmllbGQ6ICduYW1lJ1xuICAgICAgc2VhcmNoRmllbGQ6ICduYW1lJ1xuICAgICAgY3JlYXRlOiBmYWxzZVxuICAgICAgcHJlbG9hZDogJ2ZvY3VzJ1xuICAgICAgcmVuZGVyOlxuICAgICAgICBvcHRpb246IChpdGVtLCBlc2NhcGUpIC0+XG4gICAgICAgICAgcmV0dXJuIFwiPGRpdiBzdHlsZT0nbGluZS1oZWlnaHQ6IDMwcHg7Jz4je2l0ZW0ubmFtZX0gKCN7aXRlbS5lbWFpbH0pIDxpbWcgc3JjPScje2l0ZW0ucGljdHVyZX0nIHN0eWxlPSdmbG9hdDogbGVmdDsgd2lkdGg6IDMwcHg7IGhlaWdodDogMzBweDsgbWFyZ2luLXJpZ2h0OiAxMHB4OycgLz48L2Rpdj5cIlxuICAgICAgbG9hZDogKHF1ZXJ5LCBjYWxsYmFjaykgLT5cbiAgICAgICAgXy5nZXQgJy9hcGkvdXNlcnMnLCBvcHRpb25zXG4gICAgICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgICAgICBmb3IgaXRlbSBpbiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCBpZDogaXRlbS5faWQsIG5hbWU6IGl0ZW0ubmFtZSwgZW1haWw6IGl0ZW0uZW1haWwsIHBpY3R1cmU6IGl0ZW0ucGljdHVyZVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0cylcblxuICAgIHNlbGVjdFVzZXIuY2hhbmdlIGhhbmRsZXJcbiAgICByZXR1cm4gc2VsZWN0VXNlclxuXG5cbiIsIlxuU3Bpbm5lciA9XG5cbiAgc3RhdGU6IGZhbHNlXG5cbiAgZWw6IHt9XG5cbiAgaTogKGVsLCBvdmVycmlkZSkgLT5cblxuICAgIEBlbCA9ICQoJy5zcGlubmVyJylcblxuICAgIHJlY3QgPSBlbFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgY29vcmRzID1cbiAgICAgIHRvcDogXCIje3JlY3QudG9wICsgJCh3aW5kb3cpLnNjcm9sbFRvcCgpfXB4XCJcbiAgICAgIGxlZnQ6IFwiI3tyZWN0LmxlZnR9cHhcIlxuICAgICAgd2lkdGg6IFwiI3tyZWN0LndpZHRofXB4XCJcbiAgICAgIGhlaWdodDogXCIje3JlY3QuaGVpZ2h0fXB4XCJcblxuICAgIGlmIG92ZXJyaWRlIGlzbnQgdW5kZWZpbmVkXG4gICAgICBmb3Iga2V5LCBjb29yZCBvZiBvdmVycmlkZVxuICAgICAgICBjb29yZHNba2V5XSA9IGNvb3JkXG5cbiAgICBAZWwuY3NzIGNvb3Jkc1xuXG4gICAgXy5vbiBAZWxcbiAgICBAc3RhdGUgPSB0cnVlXG5cbiAgZDogLT5cbiAgICBfLm9mZiBAZWxcbiAgICBAc3RhdGUgPSBmYWxzZVxuIiwiU3RydWN0dXJlID1cblxuICB0ZW1wbGF0ZTogZmFsc2VcbiAgX2lkOiBmYWxzZVxuXG4gIGNsaWVudFNlbGVjdDogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgQHRlbXBsYXRlID0gJCgnLm1vZGlmeSA+ICN0ZW1wbGF0ZScpLmh0bWwoKVxuICAgIEBoYW5kbGVycygpXG5cbiAgICBAY2xpZW50U2VsZWN0ID0gU2VsZWN0aXplLmNsaWVudHMgJCgnLnBhZ2Uuc3RydWN0dXJlID4gLm1vZGlmeSA+IC5kZXRhaWwuY2xpZW50ID4gLmlucHV0ID4gc2VsZWN0JyksXG4gICAgICBAY2xpZW50U2VsZWN0aGFuZGxlclxuXG4gICAgaWYgbWF0Y2ggPSBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaCAvXFwvc3RydWN0dXJlc1xcLyhbMC05YS1mQS1GXXsyNH0pL1xuICAgICAgQF9pZCA9IG1hdGNoWzFdXG4gICAgICBAbG9hZCBAX2lkXG4gICAgICBfLm9uICcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnXG4gICAgZWxzZVxuICAgICAgQGVudGl0eUFkZCgpXG5cbiAgICBAY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5mb2N1cygpIGlmIEBfaWQgaXMgZmFsc2VcblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAubW9yZScpLmNsaWNrIEBlbnRpdHlBZGRIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcycpLm9uICdjbGljaycsJy5lbnRpdHkgPiAucmVtb3ZlJywgQGVudGl0eVJlbW92ZUhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGFwJykuY2xpY2sgQHN1Ym1pdEhhbmRsZXJcbiAgICAkKCcubW9kaWZ5ID4gLnN1Ym1pdCA+IC5jdGEnKS5jbGljayBAbmV3RW50cnlIYW5kbGVyXG4gICAgJCgnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuY2hlY2tib3gnKS5vbiAnY2xpY2snLCBAY2hlY2tib3hIYW5kbGVyXG5cbiAgY2hlY2tib3hIYW5kbGVyOiAtPlxuICAgIGNiID0gJCh0aGlzKS5maW5kICdpbnB1dCdcbiAgICBpZiBldmVudC50YXJnZXQudHlwZSBpc250ICdjaGVja2JveCdcbiAgICAgIGNiWzBdLmNoZWNrZWQgPSAhY2JbMF0uY2hlY2tlZFxuICAgICAgY2IuY2hhbmdlKClcblxuICBsb2FkOiAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLnN0cnVjdHVyZScpKVxuXG4gICAgXy5nZXQgJy9hcGkvc3RydWN0dXJlcy8nLFxuICAgICAgX2lkOiBAX2lkXG4gICAgLmFsd2F5cyAtPlxuICAgICAgU3Bpbm5lci5kKClcbiAgICAuZG9uZSAocmVzcG9uc2UpIC0+XG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy9zdHJ1Y3R1cmVzL25ldycgaWYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPCAxXG4gICAgICBzdHJ1Y3R1cmUgPSByZXNwb25zZS5kYXRhWzBdXG4gICAgICAkKCcubW9kaWZ5ID4gLm5hbWUgPiAuaW5wdXQgPiBpbnB1dCcpLnZhbCBzdHJ1Y3R1cmUubmFtZVxuXG4gICAgICBpZiBzdHJ1Y3R1cmUuY2xpZW50QWNjZXNzIGlzIHRydWVcbiAgICAgICAgJCgnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuY2hlY2tib3ggPiBpbnB1dCcpWzBdLmNoZWNrZWQgPSB0cnVlXG5cbiAgICAgIGZvciBpLCBlbnRpdHkgb2Ygc3RydWN0dXJlLmVudGl0aWVzXG4gICAgICAgIFN0cnVjdHVyZS5lbnRpdHlBZGQgZmFsc2UsIGVudGl0eVxuXG4gICAgICBTdHJ1Y3R1cmUuY2xpZW50U2VsZWN0WzBdLnNlbGVjdGl6ZS5hZGRPcHRpb25cbiAgICAgICAgaWQ6IHN0cnVjdHVyZS5jbGllbnQuaWQsIG5hbWU6IHN0cnVjdHVyZS5jbGllbnQubmFtZVxuICAgICAgU3RydWN0dXJlLmNsaWVudFNlbGVjdFswXS5zZWxlY3RpemUuc2V0VmFsdWUgc3RydWN0dXJlLmNsaWVudC5pZFxuXG5cblxuICBlbnRpdHlBZGRIYW5kbGVyOiAtPlxuICAgIFN0cnVjdHVyZS5lbnRpdHlBZGQodHJ1ZSlcblxuICBlbnRpdHlSZW1vdmVIYW5kbGVyOiAtPlxuICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlKClcblxuICBlbnRpdHlBZGQ6IChmb2N1cz1mYWxzZSwgZW50aXR5PWZhbHNlKSAtPlxuXG4gICAgJCgnLm1vZGlmeSA+IC5lbnRpdGllcyA+IC5ib2R5JykuYXBwZW5kIEB0ZW1wbGF0ZVxuXG4gICAgaWYgZW50aXR5IGlzbnQgZmFsc2VcbiAgICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IGlucHV0JykudmFsKGVudGl0eS5uYW1lKVxuICAgICAgQHNlbGVjdGl6ZSAkKCcubW9kaWZ5ID4gLmVudGl0aWVzID4gLmJvZHkgPiAuZW50aXR5Omxhc3QtY2hpbGQnKS5maW5kKCcuaW5wdXQgPiBzZWxlY3QnKSwgZW50aXR5LnR5cGVcbiAgICBlbHNlXG4gICAgICBAc2VsZWN0aXplICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHk6bGFzdC1jaGlsZCcpLmZpbmQoJy5pbnB1dCA+IHNlbGVjdCcpXG5cbiAgICBpZiAgZm9jdXNcbiAgICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHkgPiAuaW5wdXQuc2VsZWN0aXplLWlucHV0IGlucHV0JykubGFzdCgpLmZvY3VzKClcblxuICBzZWxlY3RpemU6IChlbCwgdmFsdWU9ZmFsc2UpIC0+XG4gICAgaXplZCA9IGVsLnNlbGVjdGl6ZVxuICAgICAgcGxhY2Vob2xkZXI6IFwiVHlwZVwiXG5cbiAgICBpemVkWzBdLnNlbGVjdGl6ZS5zZXRWYWx1ZSB2YWx1ZVxuXG4gIHN1Ym1pdEhhbmRsZXI6IC0+XG5cbiAgICBzdHJ1Y3R1cmUgPSB7fVxuICAgIHN0cnVjdHVyZS5lbnRpdGllcyA9IHt9XG4gICAgc3RydWN0dXJlLmNsaWVudCA9ICQoJy5tb2RpZnkgPiAuY2xpZW50ID4gLmlucHV0ID4gc2VsZWN0JykudmFsKClcbiAgICBzdHJ1Y3R1cmUubmFtZSA9ICQoJy5tb2RpZnkgPiAubmFtZSA+IC5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICBzdHJ1Y3R1cmUuY2xpZW50QWNjZXNzID0gJCgnLm1vZGlmeSA+IC5jbGllbnRBY2Nlc3MgPiAuY2hlY2tib3ggPiBpbnB1dCcpWzBdLmNoZWNrZWRcblxuICAgICQoJy5tb2RpZnkgPiAuZW50aXRpZXMgPiAuYm9keSA+IC5lbnRpdHknKS5lYWNoIChpLCBlbCkgLT5cblxuICAgICAgbmFtZSA9ICQoZWwpLmZpbmQoJy5pbnB1dCA+IGlucHV0JykudmFsKClcbiAgICAgIHR5cGUgPSAkKGVsKS5maW5kKCcuaW5wdXQgPiBzZWxlY3QnKS52YWwoKVxuXG4gICAgICBzdHJ1Y3R1cmUuZW50aXRpZXNbbmFtZV0gPVxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIHR5cGU6IHR5cGVcblxuICAgIC5wcm9taXNlKCkuZG9uZSAtPlxuXG4gICAgICBjb25zb2xlLmxvZyBzdHJ1Y3R1cmUuZW50aXRpZXNcbiAgICAgIFN0cnVjdHVyZS5tb2RpZnkgc3RydWN0dXJlXG5cbiAgbmV3RW50cnlIYW5kbGVyOiAtPlxuICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9lbnRyaWVzL25ldyNzdHJ1Y3R1cmU9I3tTdHJ1Y3R1cmUuX2lkfVwiXG5cbiAgbW9kaWZ5OiAoc3RydWN0dXJlKSAtPlxuXG4gICAgU3Bpbm5lci5pKCQoJy5wYWdlLnN0cnVjdHVyZScpKVxuXG4gICAgY2FsbCA9ICcvYXBpL3N0cnVjdHVyZXMvYWRkJ1xuICAgIGlmIFN0cnVjdHVyZS5faWQgaXNudCBmYWxzZVxuICAgICAgY2FsbCA9IFwiL2FwaS9zdHJ1Y3R1cmVzL3VwZGF0ZS8je1N0cnVjdHVyZS5faWR9XCJcblxuICAgIF8uZ2V0IGNhbGwsIHN0cnVjdHVyZVxuICAgICAgLmFsd2F5cyAtPlxuICAgICAgICBTcGlubmVyLmQoKVxuICAgICAgLmRvbmUgKHJlc3BvbnNlKSAtPlxuICAgICAgICBOb3RpY2UuaSByZXNwb25zZS5kYXRhLnN0YXR1cywgJ3N1Y2Nlc3MnXG4gICAgICAgIF8ub24gJy5tb2RpZnkgPiAuc3VibWl0ID4gLmN0YSdcbiAgICAgICAgaWYgU3RydWN0dXJlLl9pZCBpcyBmYWxzZVxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7fSwgJycsIFwiL3N0cnVjdHVyZXMvI3tyZXNwb25zZS5kYXRhLl9pZH1cIlxuICAgICAgICBTdHJ1Y3R1cmUuX2lkID0gcmVzcG9uc2UuZGF0YS5faWRcbiIsIlN0cnVjdHVyZXMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAnc3RydWN0dXJlcydcblxuIiwiVXNlcnMgPVxuICBpOiAtPlxuICAgIExpc3RpbmcuaSAndXNlcnMnXG4iXX0=
