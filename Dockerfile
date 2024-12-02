FROM openjdk:17
WORKDIR /app
COPY ./backendBuild/build/libs/*.jar app.jar
CMD ["java", "-jar", "/app.jar"]