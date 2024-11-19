import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs

# Obtener el directorio base
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Directorio donde se guardara el archivo JSON dentro de 'src/python'
print("Directorio ->> ", BASE_DIR)
DATA_DIR = os.path.join(BASE_DIR)
os.makedirs(DATA_DIR, exist_ok=True)


class MyRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        # Permitir solicitudes de cualquier origen
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # Verificar la ruta solicitada
        if self.path.startswith('/form_registration'):
            # Extraer parametros de la URL (query string)
            query_string = self.path.split('?', 1)[-1] if '?' in self.path else ''
            data = parse_qs(query_string)

            # Guardar datos en un archivo JSON
            self.save_data_to_file(data)

            # Crear el JSON de respuesta
            response_data = {
                "status": "success",
                "message": "Datos recibidos y guardados correctamente.",
                "user": data
            }

            # Enviar el JSON
            self.wfile.write(json.dumps(response_data).encode('utf-8'))

        elif self.path.startswith('/get_users'):
            # Llamar a la función get_user para obtener todos los usuarios
            user_data = self.get_user()

            # Enviar los datos de todos los usuarios como respuesta
            self.wfile.write(json.dumps(user_data).encode('utf-8'))

        else:
            # Ruta no encontrada
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Ruta no encontrada"}).encode('utf-8'))

    def save_data_to_file(self, data):
        # Obtener la cédula
        cedula = data.get('cedula', [''])[0]

        # Verificar que la cédula no esté vacía
        if not cedula:
            self.send_error(400, "La cédula es obligatoria")
            return

        # Ruta del archivo JSON
        file_path = os.path.join(DATA_DIR, 'received_data.json')

        # Leer los datos existentes si el archivo existe
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                existing_data = json.load(file)
        else:
            existing_data = {}

        # Verificar si la cédula ya está en los datos 
        if cedula in existing_data:
            response_data = {
                "status": "error",
                "message": "Los datos recibidos ya fueron enviados previamente"
            }

            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            return  

        # Aquí extraemos los datos sin el formato de lista
        existing_data[cedula] = {
            "nombre": data.get('nombre', [''])[0],
            "cedula": cedula,
            "fecha_nacimiento": data.get('fecha_nacimiento', [''])[0],
            "sexo": data.get('sexo', [''])[0],
            "genero": data.get('genero', [''])[0],
            "direccion": data.get('direccion', [''])[0],
            "contactnumber": data.get('contactnumber', [''])[0],
            "correoelectronico": data.get('correoelectronico', [''])[0],
            "Neducativo": data.get('Neducativo', [''])[0],
            "oficio": data.get('oficio', [''])[0],
            "estrato": data.get('estrato', [''])[0],
            "discapacidad": data.get('discapacidad', [''])[0],
            "gep": data.get('gep', [''])[0],
            "Personascargo": data.get('Personascargo', [''])[0],
            "UCG": data.get('UCG', [''])[0]
        }

        # Guardar los datos actualizados en el archivo JSON
        with open(file_path, 'w') as file:
            # Reescribir el archivo completo con los datos actualizados
            json.dump(existing_data, file, indent=2)

    def get_user(self):
        # Ruta del archivo JSON donde se guardan los datos
        file_path = os.path.join(DATA_DIR, 'received_data.json')

        # Verificar si el archivo JSON existe
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                # Leer los datos del archivo JSON
                existing_data = json.load(file)

            return existing_data
        else:
            return {"error": "No se encontraron datos"}

def run(server_class=HTTPServer, handler_class=MyRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Servidor corriendo en http://localhost:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
