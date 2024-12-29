# codimd-dbtype-converter
## docker-compose
```yaml
services:
    dbtype-converter:
        image: ghcr.io/pasmophobia/codimd-dbtype-converter:latest
        container_name: dbtype-converter
        restart: unless-stopped
        environment:
          - CMD_CONVERT_ORIGINAL_DB_URL=...
          - CMD_CONVERT_TARGET_DB_URL=...
```