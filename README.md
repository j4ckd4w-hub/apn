# ApnExercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Uruchamianie aplikacji:
Uruchom polecenie `npm install`, aby zainstalować zależności.
Uruchom polecenie `npm start`, aby uruchomić aplikację na porcie 7373.

## Budowanie aplikacji za pomocą Dockera:
Jeśli wystąpił problem ze zgodnością bibliotek aplikacji z zainstalowanymi na urządzeniu testującym, aplikację możemy uruchomić w kontenerze za pomocą Dockera:

W terminalu przejdź do katalogu głównego aplikacji, a następnie uruchom polecenie: `docker-compose up --build`
Po utworzeniu obrazu oraz zainstalowaniu zależności aplikacja będzie dostępna pod urlem: `http://localhost`

## Opis aplikacji:
Aplikacja zawiera takie funkcjonalności jak:
1. Tabela z kursami walut:
	- Dane zaciągane z https://api.nbp.pl/api/exchangerates/tables/C?format=json
	- Możliwość wyświetlenia historycznych kursów po wyborze daty w inpucie znajdującym się nad tabelą
	- Jeśli dane w wybranej dacie nie istnieją zostanie wyświetlony błąd
2. Kalkulator z możliwością wyboru dwóch walut oraz funkcją zamiany walut miejscami.

Użyte biblioteki:
1. Tailwind - stylowanie
2. Ngrx - zarządzanie stanem aplikacji
3. Lodash - util

