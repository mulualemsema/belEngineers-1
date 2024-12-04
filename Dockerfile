# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle build files to the container
COPY build.gradle settings.gradle /app/

# Copy the source code into the container
COPY src /app/src

# Build the application inside the container
RUN ./gradlew build --no-daemon

# Copy the built JAR file to the working directory
COPY build/libs/belengineers-tx-0.0.1-SNAPSHOT.jar /app/

# Expose the application port
EXPOSE 8080

# Set the default command to run the application
CMD ["java", "-jar", "belengineers-tx-0.0.1-SNAPSHOT.jar"]