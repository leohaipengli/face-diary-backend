# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end
execute 'apt_update' do
  command 'apt-get update'
end

# Base configuration recipe in Chef.
package "wget"
package "ntp"
package "nginx"
package "tree"
package "ack-grep"
package "postgresql"

execute 'install_node_1' do
  command 'curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -'
end

execute 'install_node_2' do
  command 'apt install -y nodejs build-essential'
end

# install forever
execute 'install_forever' do
  command 'npm install forever -g'
end

# use forever to run project
execute 'run_server' do
  command 'PORT=3001 forever start bin/www'
  cwd '/home/haipengl/project/'
end

cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end
execute 'ntp_restart' do
  command 'service ntp restart'
end

# Create index.html to nginx root
cookbook_file '/var/www/html/index.html' do
  source 'index.html'
  owner 'root'
  group 'root'
  mode '0755'
end

# move facediary server config file
cookbook_file 'facediary' do
  path "/etc/nginx/sites-available"
end
# link to site-enabled
execute 'link_to_site_enabled' do
  command 'ln -s /etc/nginx/sites-available/facebook-login /etc/nginx/sites-enabled'
end

# restart nginx
service "nginx" do
  action :restart
end

