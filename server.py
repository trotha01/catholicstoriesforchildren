import http.server
import socketserver
import os


# Immitating github going to 404 page, and the 404 page redirects to the main page
class CustomRequestHandler(http.server.SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code == 404:
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            if os.path.exists("docs/404.html"):
                with open("docs/404.html", "rb") as f:
                    self.wfile.write(f.read())
            else:
                self.wfile.write(b"404 Not Found")
        else:
            super().send_error(code, message, explain)

with socketserver.TCPServer(("", 9000), CustomRequestHandler) as httpd:
    print(f"Serving on port {9000}")
    httpd.serve_forever()

# Immitating netlify redirecting 404s to the main page

# PORT = 8000

# class SPARequestHandler(http.server.SimpleHTTPRequestHandler):
#     def send_error(self, code, message=None, explain=None):
#         # If file not found (404), serve index.html instead
#         if code == 404:
#             self.path = '/index.html'
#             return self.do_GET()
#         else:
#             return super().send_error(code, message, explain)

# with socketserver.TCPServer(("", PORT), SPARequestHandler) as httpd:
#     print(f"Serving at port {PORT}")
#     httpd.serve_forever()

