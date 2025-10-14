install:
	@echo "Installing ..."
	cd backend && ./mvnw clean install

clean:
	@echo "Cleaning ..."
	cd backend && ./mvnw clean

run: install
	@echo "Running ..."
	cd backend && ./mvnw spring-boot:run
