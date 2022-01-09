# Basic knowledge about - a2auto - project

## Docker commands

### Build docker images:
* docker build -t zoltanpataki/a2autofront:rsg77 .
* docker build -t zoltanpataki/a2auto:test .
### Run docker images on A2Auto site
* sudo docker run -d -p 60007:80 zoltanpataki/a2autofront:rsg77
* sudo docker run -d --network host -p 60000:60000 zoltanpataki/a2auto:rsg77
### Push docker images to docker hub
* docker push zoltanpataki/a2auto:rsg77
* docker push zoltanpataki/a2autofront:rsg77
### Pull docker images from docker hub
* docker pull zoltanpataki/a2auto:rsg77
* docker pull zoltanpataki/a2autofront:rsg77

## Quick dependency ordering
* npm install --save-dev --legacy-peer-deps
* more comes here soon.....

### A2Auto PROD settings:
* spring.datasource.url=jdbc:mysql://localhost:3307/a2db?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&characterEncoding=UTF-8
* spring.datasource.username=a2auto
* spring.datasource.password=Mogyika_77
* spring.jpa.hibernate.ddl-auto=none

* in angular http.service.ts: private carServerUrl =  'http://192.168.0.4:60000/';

### DB usage on NAS Synology:
On the Synology NAS the recommended database is MySql because PostgreSql is used for Synology's internal purpose. Therefore, any maintenance on NAS would affect the project's database data.
* mysql library: **usr/local/mariadb10/bin**
## DB commands:
* ./mysql -u a2auto -p -> **for the popup write the password: Mogyika_77**
* use a2db
* exit



