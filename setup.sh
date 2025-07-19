echo "Setting up docker group permissions..."
sudo groupadd -g 989 docker || true && sudo usermod -aG docker $USER


echp "IMPORTANT ! Run `newgrp docker` when in the terminal"