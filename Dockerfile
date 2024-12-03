# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy Gradle build files and source code to the container
COPY build.gradle settings.gradle /app/
COPY src /app/src

# Run Gradle build to build the JAR file (assuming the build generates a JAR in build/libs)
RUN ./gradlew build

# Copy the built JAR file to the working directory
COPY . .

# Expose the application port
EXPOSE 8080

# Set the default command to run the application
CMD ["java", "-jar", "belengineers-tx-0.0.1-SNAPSHOT.jar"]