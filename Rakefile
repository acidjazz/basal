task :prepare do
    $branch = ENV['CIRCLE_BRANCH']
    $commit = ENV['CIRCLE_SHA1']
    $docker_token = ENV['DOCKER_TOKEN']
end

namespace :image do
	task :build do
		cmd = "docker build -f docker/Dockerfile -t basal ."
		system(cmd)
	end

    task :tag do
        cmd = "docker tag basal:latest 751311555268.dkr.ecr.us-east-1.amazonaws.com/basal:latest"
        system(cmd)
    end

    task :login do
        cmd = "docker login -u AWS -p #{$docker_token} -e none https://751311555268.dkr.ecr.us-east-1.amazonaws.com"

    task :push do
        cmd = "docker push 751311555268.dkr.ecr.us-east-1.amazonaws.com/basal:latest"
        system(cmd)
    end

    task :all => ["image:build",
                  "image:tag",
                  "image:login",
                  "image:push"]
end

namespace :run do
    task :app do
        cmd = "docker run -p 8080:80 acidjazz/basal"
        system(cmd)
    end
end


task "default" => ["prepare",
                   "image:all"]