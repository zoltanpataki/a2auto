FROM openjdk:8-jdk-alpine
RUN mkdir /usr/app
COPY target/a2-0.0.1-SNAPSHOT.jar /usr/app
WORKDIR /usr/app
EXPOSE 60000
ENTRYPOINT ["java", "-jar", "a2-0.0.1-SNAPSHOT.jar"]
