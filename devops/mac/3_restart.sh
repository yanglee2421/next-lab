git pull
docker ps
docker stop wd.enterprise.ui
docker rmi -f wd.enterprise.ui
docker-compose up -d
docker logs -f wd.enterprise.ui