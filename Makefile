# .PHONY: install clean run run-backend run-frontend

install:
	@echo "Installing..."
	$(MAKE) -C backend install-backend
	$(MAKE) -C frontend/libre install-frontend

clean:
	@echo "Cleaning..."
	$(MAKE) -C backend clean-backend
	$(MAKE) -C frontend/libre clean-frontend

run: install
	@echo "Running..."
	$(MAKE) -C backend run-backend &
	$(MAKE) -C frontend/libre run-frontend
