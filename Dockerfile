# Use an official Java 17 runtime as a parent image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the application JAR file to the container
ARG JAR_FILE=build/libs/belengineers-tx-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

# Expose the application's port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
