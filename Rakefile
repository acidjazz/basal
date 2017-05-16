task :prepare do
    $branch = ENV['CIRCLE_BRANCH']
    $commit = ENV['CIRCLE_SHA1']
    $docker_token = ENV['DOCKER_TOKEN']

    # secrets that should come from vault
    $deploy_access_key = ENV['DEPLOY_AWS_ACCESS_KEY_ID']
    $deploy_secret_key = ENV['DEPLOY_AWS_SECRET_ACCESS_KEY']

    $deploy_id = Time.now.to_i

    # a commit to master results in a new core/persistent deployment
    if $branch == 'master'
        $deploy_type = 'core'
    else
        $deploy_type = 'test'
    end
end

namespace :image do
	task :build do
		cmd = "docker build -f docker/Dockerfile -t basal ."
		system(cmd)
	end

    task :tag do
        cmd = "docker tag basal:latest 751311555268.dkr.ecr.us-east-1.amazonaws.com/basal:#{$commit}"
        system(cmd)
    end

    task :login do
        cmd = "docker login -u AWS -p #{$docker_token} -e none https://751311555268.dkr.ecr.us-east-1.amazonaws.com"
        system(cmd)
    end

    task :push do
        cmd = "docker push 751311555268.dkr.ecr.us-east-1.amazonaws.com/basal:latest"
        system(cmd)
    end

    task :all => ["image:build",
                  "image:tag",
                  "image:login",
                  "image:push"]
end

namespace :deploy do
    task :create do
        cmd = "terraform plan -var 'aws_access_key_deployment=#{$deploy_access_key}' -var 'aws_secret_key_deployment=#{$deploy_secret_key}' -var 'region=us-east-1' -var 'ecs_cluster_name=basal' -var 'docker_username=751311555268.dkr.ecr.us-east-1.amazonaws.com' -var 'version=#{$commit}' -var 'deploy_id=#{$deploy_id}' -var 'deploy_type=#{$deploy_type}'"
        system(cmd)
    end
end

namespace :run do
    task :app do
        cmd = "docker run -p 8080:80 acidjazz/basal"
        system(cmd)
    end
end


task "default" => ["prepare",
                   "image:all",
                   "deploy:create"]