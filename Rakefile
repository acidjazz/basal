require 'sbuild'

task :prepare do
    # determine if we're running locally or from circle, grab branch name and
    # commit hash using appropriate methods
    if ENV["CIRCLE_BRANCH"].nil?
        _, $branch = system_safe("git branch | grep \\* |awk '{print $2}'")
    else
        $branch = ENV["CIRCLE_BRANCH"]
    end

    if ENV["CIRCLE_SHA1"].nil?
        _, $commit = system_safe("git rev-parse HEAD")
    else
        $commit = ENV["CIRCLE_SHA1"]
    end

    # a commit to master results in a new core/persistent deployment
    if $branch == "master"
        $deploy_type = "core"
        $environment = "production"
    else
        $deploy_type = "test"
        $environment = "production" # this is just for now
    end

    # secrets that should come from vault
    $deploy_access_key = get_secret("secret/aws/admin_access_key", $environment)
    $deploy_secret_key = get_secret("secret/aws/admin_secret_key", $environment)

    # the deployment id
    $deploy_id = Time.now.to_i

end

namespace :image do
	task :build do
		cmd = "docker build -f docker/Dockerfile -t basal ."
		system_safe(cmd)
	end

    task :tag do
        cmd = "docker tag basal:latest 751311555268.dkr.ecr.us-east-1.amazonaws.com/basal:#{$commit}"
        system_safe(cmd)
    end

    task :login do
        # this command will generate a login command for ECR
        cmd = "AWS_ACCESS_KEY_ID=#{$deploy_access_key} AWS_SECRET_ACCESS_KEY=#{$deploy_secret_key} aws ecr get-login --region us-east-1"
        _, login_cmd = system_safe(cmd)

        # this takes the output from the last command and executes it
        system_safe(login_cmd)
    end

    task :push do
        cmd = "docker push 751311555268.dkr.ecr.us-east-1.amazonaws.com/basal:${$commit}"
        system_safe(cmd)
    end

    task :all => ["image:build",
                  "image:tag",
                  "image:login",
                  "image:push"]
end

namespace :deploy do
    task :create do
        cmd = "cd terraform/deployment && terraform apply -var 'aws_access_key_deployment=#{$deploy_access_key}' -var 'aws_secret_key_deployment=#{$deploy_secret_key}' -var 'region=us-east-1' -var 'ecs_cluster_name=basal' -var 'docker_username=751311555268.dkr.ecr.us-east-1.amazonaws.com' -var 'version=#{$commit}' -var 'deploy_id=#{$deploy_id}' -var 'deploy_type=#{$deploy_type}'"
        system_safe(cmd)
    end
end

namespace :run do
    task :app do
        cmd = "docker run -p 8080:80 acidjazz/basal"
        system_safe(cmd)
    end
end


task "default" => ["prepare",
                   "image:all",
                   "deploy:create"]