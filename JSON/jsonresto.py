# Con este programa convertimos el Json actual de restaurantes en un 
# Script de SQL que luego lo agregamos a la BBDD del proyecto en Workbench

import json

# Leer el archivo JSON
with open(r'C:\Users\dell\OneDrive\Downloads\CODO A CODO - FullStack-Python\Proyecto restoradar\JSON\restaurantes.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Abrir un archivo para escribir las sentencias SQL
with open('insert_restaurantes.sql', 'w', encoding='utf-8') as sql_file:
    for restaurante in data['restaurantes']:
        # Crear la sentencia INSERT
        insert = f"""INSERT INTO restaurantes (
            name, logo, website, foto, direccion, barrio, cocina,
            horario, precio, latitud, longitud, capacidad
        ) VALUES (
            '{restaurante['name'].replace("'", "''")}',
            '{restaurante['logo']}',
            '{restaurante['website']}',
            '{restaurante['foto']}',
            '{restaurante['direccion'].replace("'", "''")}',
            '{restaurante['barrio']}',
            '{json.dumps(restaurante['cocina'])}',
            '{restaurante['horario']}',
            '{restaurante['precio']}',
            {restaurante['latitud']},
            {restaurante['longitud']},
            {restaurante['capacidad']}
        );\n"""

        # Escribir la sentencia en el archivo
        sql_file.write(insert)

print("Las sentencias INSERT han sido generadas en 'insert_restaurantes.sql'")
