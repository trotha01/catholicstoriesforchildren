.PHONY: all check_dependencies watch_server tailwind http_server stop check_running
.ONESHELL:

SHELL := /bin/bash

# Reusable command blocks
define RUN_WATCH
( fswatch -or src build.js | xargs -n1 npm run build ) &
endef

define RUN_TAILWIND
( ./tailwindcss -i input.css -o public/tailwind.css --watch ) &
endef

define FREE_PORT_8000
if command -v lsof >/dev/null; then \
	pids=$$(lsof -tiTCP:8000 -sTCP:LISTEN); \
	if [ -n "$$pids" ]; then \
		echo "Port 8000 is in use by $$pids. Killing..."; \
		kill $$pids 2>/dev/null || true; \
		sleep 0.2; \
		kill -KILL $$pids 2>/dev/null || true; \
	fi; \
	# wait up to ~5s for the port to be released \
	i=0; \
	while lsof -tiTCP:8000 -sTCP:LISTEN >/dev/null 2>&1; do \
		if [ $$i -ge 50 ]; then break; fi; \
		sleep 0.1; i=$$((i+1)); \
	done; \
fi
endef

define RUN_HTTP
( cd public && python3 ../server.py ) &
endef

all: check_running check_dependencies
	@NEG_PIDS=""; trap 'kill $NEG_PIDS 2>/dev/null || true; sleep 0.3; kill -KILL $NEG_PIDS 2>/dev/null || true; exit 0' INT TERM EXIT
	echo "Starting file watcher..."
	$(RUN_WATCH)
	NEG_PIDS="-$$! $$NEG_PIDS"
	echo "Starting TailwindCSS watcher..."
	$(RUN_TAILWIND)
	NEG_PIDS="-$$! $$NEG_PIDS"
	echo "Starting HTTP server"
	$(FREE_PORT_8000)
	$(RUN_HTTP)
	NEG_PIDS="-$$! $$NEG_PIDS"
	echo "http://localhost:8000/ is now serving the application"
	echo "Processes started. Press Ctrl+C to stop."
	wait

check_running:
	@true


check_dependencies:
	@command -v fswatch >/dev/null || (echo "fswatch is not installed" && exit 1)
	@test -x ./tailwindcss || (echo "tailwindcss is not executable at ./tailwindcss" && exit 1)
	@command -v python3 >/dev/null || (echo "Python3 is not installed" && exit 1)

watch_server:
	@$(RUN_WATCH)

tailwind:
	@$(RUN_TAILWIND)

http_server:
	@echo "Starting HTTP server"; \
	$(FREE_PORT_8000); \
	$(RUN_HTTP); \
	echo "http://localhost:8000/ is now serving the application"

stop:
	@echo "Stopping processes..."; \
	if command -v lsof >/dev/null; then \
		pids=$$(lsof -tiTCP:8000 -sTCP:LISTEN); \
		if [ -n "$$pids" ]; then \
			kill $$pids 2>/dev/null || true; \
			sleep 1; \
			kill -KILL $$pids 2>/dev/null || true; \
		fi; \
	fi; \
	pkill -f "fswatch -or src build.js" 2>/dev/null || true; \
	pkill -f "tailwindcss -i input.css -o public/tailwind.css --watch" 2>/dev/null || true; \
	pkill -f "python3 ../server.py" 2>/dev/null || true; \
	echo "Done."