install:
	@echo "installing ..."
	cd backend && ./mvnw clean install
run: install
	cd backend && ./mvnw spring-boot:run