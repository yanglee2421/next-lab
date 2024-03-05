## Network

```shell
docker network ls

docker network create wd_enterprise_net

docker network inspect wd_enterprise_net
# "Subnet": "172.21.0.0/16",
# "Gateway": "172.21.0.1"

docker network rm wd_enterprise_net

docker network create --driver=bridge --subnet=172.18.0.0/16 --gateway=172.18.0.1 wd_enterprise_net

# In order to remove all the unused docker networks, use the following command.
$ docker network prune

# Network for ai platform
docker network create --driver=bridge --subnet=172.18.0.0/24 --gateway=172.18.0.1 wd_ai_net

```

## Volumes

```shell
docker volume ls

docker volume create vol-1

docker volume rm [volume-name]

docker volume prune

```
