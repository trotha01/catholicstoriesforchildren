import http.server
import socketserver
import os

class CustomRequestHandler(http.server.SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code == 404:
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            if os.path.exists("404.html"):
                with open("404.html", "rb") as f:
                    self.wfile.write(f.read())
            else:
                self.wfile.write(b"404 Not Found")
        else:
            super().send_error(code, message, explain)

PORT = 8000

with socketserver.TCPServer(("", PORT), CustomRequestHandler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()