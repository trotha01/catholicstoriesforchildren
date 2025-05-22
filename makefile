.PHONY: all clean_pids check_dependencies watch_server tailwind http_server stop check_running

PID_FILE := /tmp/.makefile_pids
SHELL := /bin/bash

all: check_running check_dependencies clean_pids watch_server tailwind http_server
	@trap '$(MAKE) stop' INT; \
	echo "Processes started. Press Ctrl+C to stop."; \
	wait

check_running:
	@if [ -f $(PID_FILE) ]; then \
	    echo "Processes are already running. Run 'make stop' before starting again."; \
	    exit 1; \
	fi

clean_pids:
	@rm -f $(PID_FILE)

check_dependencies:
	@command -v fswatch >/dev/null || (echo "fswatch is not installed" && exit 1)
	@command -v ./tailwindcss >/dev/null || (echo "tailwindcss is not found" && exit 1)
	@command -v python3 >/dev/null || (echo "Python3 is not installed" && exit 1)

watch_server:
	@echo "Starting file watcher..."
	@fswatch -o src/* build.js | xargs -n1 -I{} ./make.sh & echo $$! >> $(PID_FILE)

tailwind:
	@echo "Starting TailwindCSS watcher..."
	@./tailwindcss -i input.css -o docs/tailwind.css --watch & echo $$! >> $(PID_FILE)

http_server:
	@cd docs
	@echo "Starting HTTP server"
	@command -v lsof >/dev/null && lsof -i:8000 && (echo "Port 8000 is in use, aborting!" && exit 1) || true
	python3 ../server.py & echo $$! >> $(PID_FILE)

stop:
	@echo "Stopping all processes..."
	@if [ -f $(PID_FILE) ]; then \
		while read pid; do \
			echo "Killing process $$pid"; \
			kill $$pid || true; \
		done < $(PID_FILE); \
		rm -f $(PID_FILE); \
	else \
		echo "No running processes found."; \
	fi