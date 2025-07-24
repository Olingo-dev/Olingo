echo "Setting up docker group permissions..."
sudo groupadd -g 989 docker || true && sudo usermod -aG docker $USER
