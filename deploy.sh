docker compose build

docker compose up -d

docker rmi $(docker images --filter "dangling=true" -q) || true