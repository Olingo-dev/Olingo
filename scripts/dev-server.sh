ORANGE='\033[38;5;208m'
GREY='\033[38;5;245m'
YELLOW='\033[38;5;226m'
NC='\033[0m'

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

(
    if newgrp docker; then
        echo "${YELLOW}[Olingo.Docker.Integration]: Switched to docker group successfully${NC}"
    else
        echo "${YELLOW}[Olingo.Docker.Integration]: Failed to switch group${NC}"
    fi
    project="Olingo.Backend"
    cd $DIR/$project/src/ || exit
    exec air | sed "s/^/$(printf "$GREY\[$project\]:$NC") /"
) & 
(
    project="Olingo.Frontend"
    cd $DIR/$project || exit
    exec pnpm run dev | sed "s/^/$(printf "$ORANGE\[$project\]:$NC") /"
)

wait