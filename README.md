# MyShowMoList
MyShowMoList on nettisivu elokuvien ja sarjojen selaamista, jakamista ja arvostelua varten.
Projekti on tehty web ohjelmoinnin -sovellusprojektina.

## Kuvaus
Projektin kokosi ryhmä 13, josa työskentelivät: projektipäällikkö Pasi "Yuudachi" Puhakka, Joonas "JoonasSal" Salmela, Nico "Hertsi" Hertolin, Isabel "isabelkai" Kaikkonen ja Julianna "cheezyx" Seppä.


MyShowMoList -sivulla voi:

* tehdä uuden käyttäjän ja kirjautua sisään
* hakea elokuvia ja sarjoja
* tallentaa ja selata arvosteluja
* tallentaa elokuvia ja sarjoja omalle listalle
* luoda, liittyä ja poistaa ryhmiä
* tallentaa sarjoja ja elokuvia ryhmän sivuille
* nähdä Finnkinon tulevat näytökset ja tallentaa niitä ryhmän sivulle

## Tekniset tiedot

### Käytetyt teknologiat ja riippuvuudet
Ohjelma on luotu käyttäen arkkitehtuuria Postgre/Nodejs/React, joka käyttää ohjelmointikieliä SQL, JavaScript ja CSS. Tietokanta pyörii Render ympäristössä.
Ohjelma myös käyttää The Movie Database (TMDB) ja Finnkino rajapintoja. 
(Kommentti postman dokkarista ja testauksesta myöhemmin) 

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

## Suunnitelma
### Nettisivun suunnitelma

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/f721e6a4-719c-4b73-946e-d593203230cb)

Kuva 1: Etusivu

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/11a98d8d-31f8-4069-b98c-94171588c58c)

Kuva 2: Kirjautuminen ja käyttäjän luonti

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/ae759617-b164-4053-9c08-953a3d7dfffd)

Kuva 3: Elokuvien ja sarjojen hakusivu

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/1e63abe7-ef03-48a2-8c55-c5c7b3e7094e)

Kuva 4: Finnkinon näytöksien etsintäsivu

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/9fdcca01-275a-4e0e-8c91-fcc96d9d6f4d)

Kuva 5: Ryhmäsivu

![image](https://github.com/TVTKMO22-WP-GROUP-13/TVTKMO23-WP-GROUP-13/assets/143520681/0f46522c-ebb8-4c17-bd9a-c6a492903100)

Kuva 6: Käyttäjän arvostelusivu


## Käyttöönotto
Ohjelman saa käyttöön käynnistämällä käyttöliittymän ja taustajärjestelmän erillisistä terminaaleista. Käyttöönotto vaatii aiemmin listatut riippuvuudet ja kirjastot asennettuna, kts Käytetyt teknologiat ja riippuvuudet. Asentaminen toimii antamalla komennon "npm install" sekä ./backend/ että ./client/ hakemistoon terminaaliin. Ohjeet olettavat, että terminaali on avattu asianmukaisissa hakemistoissa. Onnistuneen käynnistämisen jälkeen nettisivu on näkyvissä osoitteessa "http://localhost:3000".

### Taustajärjestelmän käynnistäminen
Avaa terminaali ja siirry oikeaan hakemistoon komennolla "cd ./backend/" tai vaihtoehtoisesti avaa terminaali suoraan ./backend/ hakemistoon. 
Taustajärjestelmä käynnistyy komennolla "npm start".

### Käyttöliittymän käynnistäminen
Avaa uusi terminaali ja siirry oikeaan hakemistoon "cd ./client/" tai vaihtoehtoisesti avaa terminaali suoraan ./client/ hakemistoon. 
Käyttöliittymä käynnistyy komennolla "npm start".

### REST dokumentaatio
https://documenter.getpostman.com/view/30843162/2sA3JDfjTT

