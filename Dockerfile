FROM maven:3.6.3-jdk-11-slim AS build
RUN mkdir /project
COPY . /project
WORKDIR /project
RUN mvn clean package -DskipTests
 
FROM adoptopenjdk/openjdk11:jre-11.0.11.9_1-alpine
RUN apk add dumb-init
RUN mkdir /app
RUN addgroup --system javauser && adduser -S -s /bin/false -G javauser javauser
COPY --from=build /project/target/tools.lwp-0.0.1-SNAPSHOT.jar /app/java-application.jar
WORKDIR /app
RUN chown -R javauser:javauser /app
USER javauser
CMD "dumb-init" "java" "-jar" "java-application.jar"

# Copy that to a file named Dockerfile, then build and run it.
# $ docker build . -t java-tools-lwp
# $ docker run -p 8080:8080 java-tools-lwp