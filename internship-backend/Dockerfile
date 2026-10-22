# Multi-stage build to package WAR and run on Tomcat 10
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM tomcat:10.1-jdk17
LABEL maintainer="college-placement-system"
RUN rm -rf /usr/local/tomcat/webapps/*
COPY --from=build /app/target/internship-backend.war /usr/local/tomcat/webapps/internship-backend.war

EXPOSE 8080
CMD ["catalina.sh", "run"]
