# MyShowMoList
Projektin kokosi ryhmä, jossa työskentelivät: projektipäällikkö Pasi "Yuudachi" Puhakka, Joonas "JoonasSal" Salmela, Nico "Hertsi" Hertolin, Isabel "isabelkai" Kaikkonen ja Julianna "cheezyx" Seppä. 

## Esittely
MyShowMoList on Oulun ammattikorkeakoulun 2. vuoden opiskelijoiden toteuttama sovellusprojekti, jossa tehtiin viiden hengen ryhmätyönä nettisivu elokuvien ja sarjojen selaamista, jakamista ja arvostelujen tekemistä varten. 
Jokainen projektiryhmän jäsen toimi projektissa Full Stack -kehittäjänä ja työsti sekä käyttöliittymää että taustajärjestelmää. 

MyShowMoList -sivulla voi:

* tehdä uuden käyttäjätilin ja kirjautua sisään
* hakea elokuvia ja sarjoja
* tallentaa ja selata arvosteluja
* tallentaa elokuvia ja sarjoja omalle listalle
* luoda, liittyä ja poistaa ryhmiä
* tallentaa sarjoja ja elokuvia ryhmän sivuille
* nähdä Finnkinon tulevat näytökset ja tallentaa niitä ryhmän sivulle

## Tekniset tiedot

### Käytetyt teknologiat ja riippuvuudet
Sovellus on luotu käyttäen Postgre-, Nodejs- ja React komponentteja ja käyttää ohjelmointikieliä SQL, JavaScript ja CSS. Tietokanta pyörii Render ympäristössä. Sovellus myös käyttää The Movie Database (TMDB)- ja Finnkino-rajapintoja.
Sovelluksen toimivuutta on rakennettu käyttäen Postmania, dokumentin lopussa linkki REST-dokumentaatioon.    
Sovelluksessa on käytetty Mocha-testausta.

Ohjelman käynnistäminen vaatii seuraavat kirjastot ja riippuvuudet:

* Bcrypt
* cors
* dotenv
* express
* pg
* axios
* react
* react-router-dom
* react-scripts
* web-vitals
* nodemon
* multer
* mocha

## Käyttöliittymä

Käyttöliittymän luuranko on suunniteltu käyttäen Wireframe suunnittelusivua. 

Käyttöliittymän etusivun (kuva 1) yläpalkista löytyy valikot, josta käyttäjä pääsee navigoimaan eri sivuille ja kirjautumaan sisään. Jokainen valikon valinta aukaisee asianmukaisen sivun, jolla käyttäjä pääsee käyttämään sivun toiminnallisuuksia. 

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/72a4223a-0d84-4bf9-a7f1-6b71434f75d5)


KUVA 1: Etusivu

Esimerkiksi sarjojen ja elokuvien haku (kuva 2) tapahtuu siihen kuuluvalla sivulla. Haku hyödyntää TMBD-rajapintaa ja näyttää haun tulokset samalla sivulla käyttäen hakuun annettuja parametrejä.

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/d58ff33e-6764-47e8-8636-f3dce953debd)

KUVA 2: Elokuvien suodatettu haku

Kuvassa 3 viitataan ryhmän sivuille, jossa on näkyvillä ryhmän jäsenet, tallennetut elokuvat, sarjat ja näytösajat. 

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/a349da04-f7db-4fb6-b3a9-c68f0e4c84d2)


KUVA 3: Ryhmäsivu


## Käyttöönotto

Ohjelman saa käyttöön käynnistämällä käyttöliittymän ja taustajärjestelmän erillisistä terminaaleista. Käyttöönotto vaatii aiemmin listatut riippuvuudet ja kirjastot asennettuna, kts Käytetyt teknologiat ja riippuvuudet (sivu 2). Asentaminen toimii antamalla komennon npm install terminaaliin hakemistoissa ./backend/ ja ./client/ . Ohjeet olettavat, että terminaali on avattu asianmukaisissa hakemistoissa. Onnistuneen käynnistämisen jälkeen nettisivu on näkyvissä osoitteessa http://localhost:3000. 

### Taustajärjestelmän käynnistäminen

Avaa terminaali ja siirry oikeaan hakemistoon komennolla cd ./backend/ tai vaihtoehtoisesti avaa terminaali suoraan ./backend/ hakemistoon. Taustajärjestelmä käynnistyy antamalla samaan terminaaliin komennon npm start. 

### Käyttöliittymän käynnistäminen

Avaa uusi terminaali ja siirry oikeaan hakemistoon cd ./client/ tai vaihtoehtoisesti avaa terminaali suoraan ./client/ hakemistoon. Käyttöliittymä käynnistyy antamalla samaan terminaaliin komennon npm start. 

### REST dokumentaatio

[Linkki Postman-dokumentaatioon](https://documenter.getpostman.com/view/30843162/2sA3JDfjTT)

### Projektinhallinta (Front UI Design & DB ER-Diagram)

[Linkki projektin käyttöliittymän ja tietokannan suunnitelmiin](https://oamk-my.sharepoint.com/:f:/g/personal/o7sajo00_students_oamk_fi/EkftUUBz0rdAqTW4QF-TI2oBJWmyq7o_KsI1M3q83haJmw?e=tNRHpn)

