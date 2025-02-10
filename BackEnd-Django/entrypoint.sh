#!/bin/sh

echo "Iniciando contenedor..."

if [ ! -f "/app/db/db.sqlite3" ]; then
    echo "Base de datos SQLite no encontrada. Creando..."
    python manage.py migrate
fi

exec "$@"
