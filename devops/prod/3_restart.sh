git pull
docker ps
docker stop enterprise
# docker rm -f enterprise
# docker rmi -f wd.enterprise.ui
docker image prune -f
docker-compose up --build -d
docker logs -f enterprise
