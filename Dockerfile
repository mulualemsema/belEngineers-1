# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /src

# Copy the Gradle build files and source code to the container
COPY build.gradle settings.gradle /app/
COPY src /app/src

# Copy the built JAR file to the working directory
COPY build/libs/*.jar app.jar


# Expose the application port
EXPOSE 8080

# Set the default command to run the application
CMD ["java", "-jar", "app.jar"]
