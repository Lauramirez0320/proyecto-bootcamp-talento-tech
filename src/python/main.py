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

    def _send_cors_headers(self):
        # Enviar las cabeceras CORS necesarias
        self.send_header('Access-Control-Allow-Origin', '*')  # Permitir acceso desde cualquier origen
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  # Metodos permitidos
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')  # Cabeceras permitidas
        self.send_header('Content-Type', 'application/json')  # Tipo de respuesta JSON

    def do_OPTIONS(self):
        # Responder a las solicitudes OPTIONS con los headers CORS adecuados
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_POST(self):
        # Responder a las solicitudes POST con los headers CORS adecuados
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

        # Verificar la ruta solicitada
        if self.path.startswith('/form_registration'):
            # Leer el cuerpo de la solicitud (data) en formato JSON
            content_length = int(self.headers['Content-Length'])  # Obtener el tamaño del cuerpo
            post_data = self.rfile.read(content_length)  # Leer los datos del cuerpo

            try:
                data = json.loads(post_data)  # Parsear el JSON recibido
            except json.JSONDecodeError:
                self.send_error(400, "Datos JSON inválidos")
                return

            # Guardar datos en un archivo JSON
            self.save_data_to_file(data)

            # Crear el JSON de respuesta
            response_data = {
                "status": "success",
                "message": "Datos recibidos y guardados correctamente.",
                "user": data
            }

            # Enviar el JSON de respuesta
            self.wfile.write(json.dumps(response_data).encode('utf-8'))

        else:
            # Ruta no encontrada
            self.send_response(404)
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Ruta no encontrada"}).encode('utf-8'))

    def save_data_to_file(self, data):
        # Obtener la cédula
        cedula = data.get('cedula')

        # Verificar que la cedula no este vacia
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

        # Verificar si la cédula ya esta en los datos 
        if cedula in existing_data:
            response_data = {
                "status": "error",
                "message": "Los datos recibidos ya fueron enviados previamente"
            }
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            return  

        # Guardar los datos del usuario en el archivo
        existing_data[cedula] = data

        # Guardar los datos actualizados en el archivo JSON
        with open(file_path, 'w') as file:
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