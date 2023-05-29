FROM maven:3.8.5-openjdk-17 as build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /target/assignment_1-0.0.1-SNAPSHOT.jar assignment_1.jar
EXPOSE 8080
ENTRYPOINT [ "java","-jar","assignment_1.jar"]