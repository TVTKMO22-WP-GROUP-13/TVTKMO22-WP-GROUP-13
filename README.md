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

## Suunnitelma
### Nettisivun suunnitelma

Käyttöliittymän luuranko on suunniteltu käyttäen Wireframe suunnittelusivua. 

Käyttöliittymän etusivun (kuva 1) yläpalkista löytyy valikot, josta käyttäjä pääsee navigoimaan eri sivuille ja kirjautumaan sisään. Jokainen valikon valinta aukaisee asianmukaisen sivun, jolla käyttäjä pääsee käyttämään sivun toiminnallisuuksia. 

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/f721e6a4-719c-4b73-946e-d593203230cb)
KUVA 1: Etusivu

Esimerkiksi sarjojen ja elokuvien haku (kuva 2) tapahtuu siihen kuuluvalla sivulla. Haku hyödyntää TMBD-rajapintaa ja näyttää haun tulokset samalla sivulla käyttäen hakuun annettuja parametrejä.

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/ae759617-b164-4053-9c08-953a3d7dfffd)
KUVA 2: Kirjautuminen ja käyttäjän luonti

Kuvassa 3 viitataan ryhmän sivuille, jossa on näkyvillä ryhmän jäsenet, tallennetut elokuvat, sarjat ja näytösajat. 

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/9fdcca01-275a-4e0e-8c91-fcc96d9d6f4d)
KUVA 3: Ryhmäsivu


## Käyttöönotto

Ohjelman saa käyttöön käynnistämällä käyttöliittymän ja taustajärjestelmän erillisistä terminaaleista. Käyttöönotto vaatii aiemmin listatut riippuvuudet ja kirjastot asennettuna, kts Käytetyt teknologiat ja riippuvuudet (sivu 2). Asentaminen toimii antamalla komennon npm install terminaaliin hakemistoissa ./backend/ ja ./client/ . Ohjeet olettavat, että terminaali on avattu asianmukaisissa hakemistoissa. Onnistuneen käynnistämisen jälkeen nettisivu on näkyvissä osoitteessa http://localhost:3000. 

### Taustajärjestelmän käynnistäminen

Avaa terminaali ja siirry oikeaan hakemistoon komennolla cd ./backend/, tai vaihtoehtoisesti avaa terminaali suoraan ./backend/ hakemistoon. Taustajärjestelmä käynnistyy antamalla samaan terminaaliin komennon npm start. 

### Käyttöliittymän käynnistäminen

Avaa uusi terminaali ja siirry oikeaan hakemistoon cd ./client/, tai vaihtoehtoisesti avaa terminaali suoraan ./client/ hakemistoon. Käyttöliittymä käynnistyy antamalla samaan terminaaliin komennon npm start. 

### REST dokumentaatio

https://documenter.getpostman.com/view/30843162/2sA3JDfjTT

