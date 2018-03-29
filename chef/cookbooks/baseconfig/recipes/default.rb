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
