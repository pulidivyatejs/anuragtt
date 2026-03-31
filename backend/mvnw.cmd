@echo off
set MAVEN_OPTS=-Xmx1024m
set MAVEN_PROJECTBASEDIR=%CD%
java -cp "%~dp0.mvn/wrapper/maven-wrapper.jar" org.apache.maven.wrapper.MavenWrapperMain %*
