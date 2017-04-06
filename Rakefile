namespace :build do
	task :image do
		cmd = "docker build -f docker/Dockerfile -t acidjazz/basal ."
		system(cmd)
	end

    task :all => ["image"]
end

namespace :run do
    task :app do
        cmd = "docker run -p 8080:80 acidjazz/basal"
        system(cmd)
    end
end


task "default" => ["build:all",
                  "run:app"]