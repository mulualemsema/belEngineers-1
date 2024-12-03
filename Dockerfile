# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle build files and source code to the container
COPY build.gradle settings.gradle /app/
COPY src /app/src

# Copy the built JAR file to the working directory
COPY . .


# Expose the application port
EXPOSE 8080

RUN ./gradlew build

# Set the default command to run the application
CMD ["java", "-jar", "build/libs/belengineers-tx-0.0.1-SNAPSHOT.jar"]
