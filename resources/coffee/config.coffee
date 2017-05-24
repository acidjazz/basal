config = {"app":{"name":"Laravel","env":"local","debug":true,"url":"http://basal.dev:8000","timezone":"UTC","locale":"en","fallback_locale":"en","key":"base64:fg0PjFLZ+L/X4qvR8ZxFXQLIaAF+m9TO+lWlgGuY7aw=","cipher":"AES-256-CBC","log":"single","log_level":"debug","providers":["Illuminate\\Auth\\AuthServiceProvider","Illuminate\\Broadcasting\\BroadcastServiceProvider","Illuminate\\Bus\\BusServiceProvider","Illuminate\\Cache\\CacheServiceProvider","Illuminate\\Foundation\\Providers\\ConsoleSupportServiceProvider","Illuminate\\Cookie\\CookieServiceProvider","Illuminate\\Database\\DatabaseServiceProvider","Illuminate\\Encryption\\EncryptionServiceProvider","Illuminate\\Filesystem\\FilesystemServiceProvider","Illuminate\\Foundation\\Providers\\FoundationServiceProvider","Illuminate\\Hashing\\HashServiceProvider","Illuminate\\Mail\\MailServiceProvider","Illuminate\\Notifications\\NotificationServiceProvider","Illuminate\\Pagination\\PaginationServiceProvider","Illuminate\\Pipeline\\PipelineServiceProvider","Illuminate\\Queue\\QueueServiceProvider","Illuminate\\Redis\\RedisServiceProvider","Illuminate\\Auth\\Passwords\\PasswordResetServiceProvider","Illuminate\\Session\\SessionServiceProvider","Illuminate\\Translation\\TranslationServiceProvider","Illuminate\\Validation\\ValidationServiceProvider","Illuminate\\View\\ViewServiceProvider","Laravel\\Tinker\\TinkerServiceProvider","Jenssegers\\Mongodb\\MongodbServiceProvider","Larjectus\\ServiceProvider","Larpug\\ServiceProvider","Barryvdh\\Debugbar\\ServiceProvider","Barryvdh\\Cors\\ServiceProvider","App\\Providers\\AppServiceProvider","App\\Providers\\AuthServiceProvider","App\\Providers\\EventServiceProvider","App\\Providers\\RouteServiceProvider"],"aliases":{"App":"Illuminate\\Support\\Facades\\App","Artisan":"Illuminate\\Support\\Facades\\Artisan","Auth":"Illuminate\\Support\\Facades\\Auth","Blade":"Illuminate\\Support\\Facades\\Blade","Broadcast":"Illuminate\\Support\\Facades\\Broadcast","Bus":"Illuminate\\Support\\Facades\\Bus","Cache":"Illuminate\\Support\\Facades\\Cache","Config":"Illuminate\\Support\\Facades\\Config","Cookie":"Illuminate\\Support\\Facades\\Cookie","Crypt":"Illuminate\\Support\\Facades\\Crypt","DB":"Illuminate\\Support\\Facades\\DB","Debugbar":"Barryvdh\\Debugbar\\Facade","Eloquent":"Illuminate\\Database\\Eloquent\\Model","Moloquent":"Jenssegers\\Mongodb\\Eloquent\\Model","Event":"Illuminate\\Support\\Facades\\Event","File":"Illuminate\\Support\\Facades\\File","Gate":"Illuminate\\Support\\Facades\\Gate","Hash":"Illuminate\\Support\\Facades\\Hash","Lang":"Illuminate\\Support\\Facades\\Lang","Log":"Illuminate\\Support\\Facades\\Log","Mail":"Illuminate\\Support\\Facades\\Mail","Notification":"Illuminate\\Support\\Facades\\Notification","Password":"Illuminate\\Support\\Facades\\Password","Queue":"Illuminate\\Support\\Facades\\Queue","Redirect":"Illuminate\\Support\\Facades\\Redirect","Redis":"Illuminate\\Support\\Facades\\Redis","Request":"Illuminate\\Support\\Facades\\Request","Response":"Illuminate\\Support\\Facades\\Response","Route":"Illuminate\\Support\\Facades\\Route","Schema":"Illuminate\\Support\\Facades\\Schema","Session":"Illuminate\\Support\\Facades\\Session","Storage":"Illuminate\\Support\\Facades\\Storage","URL":"Illuminate\\Support\\Facades\\URL","Validator":"Illuminate\\Support\\Facades\\Validator","View":"Illuminate\\Support\\Facades\\View"}},"cache":{"default":"array","stores":{"apc":{"driver":"apc"},"array":{"driver":"array"},"database":{"driver":"database","table":"cache","connection":null},"file":{"driver":"file","path":"/Users/k/basal/storage/framework/cache/data"},"memcached":{"driver":"memcached","persistent_id":null,"sasl":[null,null],"options":[],"servers":[{"host":"127.0.0.1","port":11211,"weight":100}]},"redis":{"driver":"redis","connection":"default"}},"prefix":"laravel"},"cors":{"supportsCredentials":false,"allowedOrigins":["*"],"allowedHeaders":["*"],"allowedMethods":["*"],"exposedHeaders":[],"maxAge":0},"debugbar":{"enabled":false,"storage":{"enabled":true,"driver":"file","path":"/Users/k/basal/storage/debugbar","connection":null,"provider":""},"include_vendors":true,"capture_ajax":true,"clockwork":false,"collectors":{"phpinfo":true,"messages":true,"time":true,"memory":true,"exceptions":true,"log":true,"db":true,"views":true,"route":true,"laravel":false,"events":false,"default_request":false,"symfony_request":true,"mail":true,"logs":false,"files":false,"config":false,"auth":false,"gate":false,"session":true},"options":{"auth":{"show_name":false},"db":{"with_params":true,"timeline":false,"backtrace":false,"explain":{"enabled":false,"types":["SELECT"]},"hints":true},"mail":{"full_log":false},"views":{"data":false},"route":{"label":true},"logs":{"file":null}},"inject":true,"route_prefix":"_debugbar"},"mail":{"driver":"smtp","host":"smtp.mailgun.org","port":587,"from":{"address":"hello@example.com","name":"Example"},"encryption":"tls","username":null,"password":null,"sendmail":"/usr/sbin/sendmail -bs","markdown":{"theme":"default","paths":["/Users/k/basal/resources/views/vendor/mail"]}},"queue":{"default":"array","connections":{"sync":{"driver":"sync"},"database":{"driver":"database","table":"jobs","queue":"default","retry_after":90},"beanstalkd":{"driver":"beanstalkd","host":"localhost","queue":"default","retry_after":90},"sqs":{"driver":"sqs","key":"your-public-key","secret":"your-secret-key","prefix":"https://sqs.us-east-1.amazonaws.com/your-account-id","queue":"your-queue-name","region":"us-east-1"},"redis":{"driver":"redis","connection":"default","queue":"default","retry_after":90}},"failed":{"database":"mongodb","table":"failed_jobs"}},"services":{"mailgun":{"domain":null,"secret":null},"ses":{"key":null,"secret":null,"region":"us-east-1"},"sparkpost":{"secret":null},"stripe":{"model":"App\\User","key":null,"secret":null}},"session":{"driver":"array","lifetime":120,"expire_on_close":false,"encrypt":false,"files":"/Users/k/basal/storage/framework/sessions","connection":null,"table":"sessions","store":null,"lottery":[2,100],"cookie":"laravel_session","path":"/","domain":null,"secure":false,"http_only":true},"view":{"paths":["/Users/k/basal/resources/views"],"compiled":"/Users/k/basal/storage/framework/views"},"color":{"white1":"#ffffff","white2":"#f8f8f8","white3":"#F4F4F4","white4":"#FAFAFA","grey1":"#e5e5e5","grey2":"#f5f5f5","grey3":"#d0d0d0","black1":"#000000","black2":"#282828","black3":"#333333","black4":"#23292E","black5":"#3E4347","black6":"#494E52","red1":"#C8212B","yellow1":"#F6BB45","cyan1":"#5FA793","orange1":"#F68F62","skin1":"#F3DDA3","green1":"#5ba541","green2":"#88d96d","green3":"#77d358","blue1":"#1da7ee","blue2":"#0073bb","blue3":"#4F5D95","google_blue":"#4285f4","google_green":"#34a853","google_yellow":"#fbbc05","google_red":"#ea4335","github_blue":"#0D2636","facebook_blue":"#4867AA","instagram_or":"#FF7804","twitter_blue":"#00ACED"},"font":{"404":{"font-family":"Monoton","font-size":"75px"},"h1":{"font-family":"Roboto","font-size":"34px","font-weight":"300"},"h1b":{"font-family":"Roboto","font-size":"34px","font-weight":"700"},"h2":{"font-family":"Roboto","font-size":"24px","font-weight":"300"},"h2b":{"font-family":"Roboto","font-size":"24px","font-weight":"700"},"h3":{"font-family":"Roboto","font-size":"20px"},"h3b":{"font-family":"Roboto","font-size":"20px","font-weight":"700"},"c1":{"font-family":"Roboto","font-size":"14px","font-weight":"300"},"c1b":{"font-family":"Roboto","font-size":"16px","font-weight":"500"},"c1tb":{"font-family":"Roboto","font-size":"14px","font-weight":"400"},"c1s":{"font-family":"Roboto","font-size":"12px","font-weight":"300","letter-spacing":"0.5px"},"c1sb":{"font-family":"Roboto","font-size":"12px","font-weight":"600","letter-spacing":"0.5px"},"c2":{"font-family":"Roboto","font-size":"18px","font-weight":"300"},"c2b":{"font-family":"Roboto","font-size":"18px","font-weight":"500"}},"meta":{"title":"basal","url":"https://basal.tech/","description":"minimal content management","keywords":"cms","repo":"https://github.com/acidjazz/basal"},"settings":{"perpage":10}};