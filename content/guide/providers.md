---
layout: 'guide'
title: 'Providers'
---

### Providers

Passport supports authentication with an extensive list of third-party providers.
Many thanks belong to the fine community of developers who have contributed
implementations.

<table class="table table-condensed table-striped">
  <thead>
    <tr>
      <th>Provider</th>
      <th>Protocol</th>
      <th>Developer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[23andMe](https://github.com/mowens/passport-23andme)</td>
      <td>OAuth 2.0</td>
      <td>[Michael Owens](https://github.com/mowens)</td>
    </tr>
    <tr>
      <td>[37signals](https://github.com/jaredhanson/passport-37signals)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[500px](https://github.com/jeremybenaim/passport-500px)</td>
      <td>OAuth</td>
      <td>[Jeremy Benaim](https://github.com/jeremybenaim)</td>
    </tr>
    <tr>
      <td>[AllPlayers.com](https://github.com/AllPlayers/passport-allplayers)</td>
      <td>OAuth</td>
      <td>[Chris Christensen](https://github.com/christianchristensen)</td>
    </tr>
    <tr>
      <td>[AngelList](https://github.com/jaredhanson/passport-angellist)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[AOL](https://github.com/jaredhanson/passport-aol)</td>
      <td>OpenID</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[App.net](https://github.com/mowens/passport-appdotnet)</td>
      <td>OAuth 2.0</td>
      <td>[Michael Owens](https://github.com/mowens)</td>
    </tr>
    <tr>
      <td>[AT&T Foundry](https://github.com/att-innovate/passport-att-alpha) Alpha API Program</td>
      <td>OAuth 2.0</td>
      <td>[Geoff Hollingworth](https://github.com/eusholli)</td>
    </tr>
    <tr>
      <td>[Auth0](https://github.com/auth0/passport-auth0)</td>
      <td>OAuth 2.0</td>
      <td>[Auth0](https://github.com/auth0)</td>
    </tr>
    <tr>
      <td>[Authic](https://github.com/authic/passport-authic)</td>
      <td>OAuth 2.0</td>
      <td>[Authic](https://github.com/authic)</td>
    </tr>
    <tr>
      <td>[Bitbucket](https://github.com/jaredhanson/passport-bitbucket)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[bitly](https://github.com/dreadjr/passport-bitly)</td>
      <td>OAuth 2.0</td>
      <td>[dreadjr](https://github.com/dreadjr)</td>
    </tr>
    <tr>
      <td>[Box](https://github.com/bluedge/passport-box)</td>
      <td>OAuth 2.0</td>
      <td>[Nicolas Alessandra](https://github.com/bluedge)</td>
    </tr>
    <tr>
      <td>[Buffer](https://github.com/despekiroule/passport-bufferapp)</td>
      <td>OAuth 2.0</td>
      <td>[Sébastien De Bollivier](https://github.com/despekiroule)</td>
    </tr>
    <tr>
      <td>[Cloud Foundry](https://github.com/rajaraodv/passport-cloudfoundry)</td>
      <td>OAuth 2.0</td>
      <td>[Raja Rao DV](https://github.com/rajaraodv)</td>
    </tr>
    <tr>
      <td>[Cloud Foundry](https://github.com/rajaraodv/passport-cloudfoundry-openidconnect)</td>
      <td>OpenID Connect</td>
      <td>[Raja Rao DV](https://github.com/rajaraodv)</td>
    </tr>
    <tr>
      <td>[DailyCred](https://github.com/hstove/passport-dailycred)</td>
      <td>OAuth 2.0</td>
      <td>[Hank Stoever](https://github.com/hstove)</td>
    </tr>
    <tr>
      <td>[Desk.com](https://github.com/Mistat/passport-deskcom)</td>
      <td>OAuth</td>
      <td>[Misato Takahashi](https://github.com/Mistat)</td>
    </tr>
    <tr>
      <td>[Digg](https://github.com/jaredhanson/passport-digg)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[doctape](https://github.com/doctape/passport-doctape)</td>
      <td>OAuth 2.0</td>
      <td>[doctape](https://github.com/doctape)</td>
    </tr>
    <tr>
      <td>[douban](https://github.com/ktmud/passport-douban)</td>
      <td>OAuth 2.0</td>
      <td>[Jesse Yang](https://github.com/ktmud)</td>
    </tr>
    <tr>
      <td>[Dropbox](https://github.com/jaredhanson/passport-dropbox)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Dwolla](https://github.com/jaredhanson/passport-dwolla)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Evernote](https://github.com/jaredhanson/passport-evernote)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Everyplay](https://github.com/Everyplay/passport-everyplay)</td>
      <td>OAuth 2.0</td>
      <td>[Matti Savolainen](https://github.com/Everyplay)</td>
    </tr>
    <tr>
      <td>[EyeEm](https://github.com/elmariachi111/passport-eyeem)</td>
      <td>OAuth 2.0</td>
      <td>[Stefan Adolf](https://github.com/elmariachi111)</td>
    </tr>
    <tr>
      <td>[Facebook](https://github.com/jaredhanson/passport-facebook)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[FamilySearch](https://github.com/jaredhanson/passport-familysearch)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Fitbit](https://github.com/jaredhanson/passport-fitbit)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Flattr](https://github.com/freenerd/passport-flattr)</td>
      <td>OAuth 2.0</td>
      <td>[Johan Uhle](https://github.com/freenerd)</td>
    </tr>
    <tr>
      <td>[Flickr](https://github.com/johnnyhalife/passport-flickr)</td>
      <td>OAuth</td>
      <td>[Johnny Halife](https://github.com/johnnyhalife)</td>
    </tr>
    <tr>
      <td>[Force.com](https://github.com/joshbirk/passport-forcedotcom) (Salesforce, Database.com)</td>
      <td>OAuth 2.0</td>
      <td>[Joshua Birk](https://github.com/joshbirk)</td>
    </tr>
    <tr>
      <td>[Foursquare](https://github.com/jaredhanson/passport-foursquare)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[FreeAgent](https://github.com/JoeStanton/Node-FreeAgent2)</td>
      <td>OAuth 2.0</td>
      <td>[Joe Stanton](https://github.com/JoeStanton)</td>
    </tr>
    <tr>
      <td>[FreedomWorks](https://github.com/carlos8f/passport-freedomworks)</td>
      <td>OAuth</td>
      <td>[Carlos Rodriguez](https://github.com/carlos8f)</td>
    </tr>
    <tr>
      <td>[Geeklist](https://github.com/despekiroule/passport-geeklist)</td>
      <td>OAuth</td>
      <td>[Sébastien De Bollivier](https://github.com/despekiroule)</td>
    </tr>
    <tr>
      <td>[Geoloqi](https://github.com/jaredhanson/passport-geoloqi)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[GitHub](https://github.com/jaredhanson/passport-github)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Goodreads](https://github.com/jaredhanson/passport-goodreads)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Google](https://github.com/jaredhanson/passport-google)</td>
      <td>OpenID</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Google](https://github.com/jaredhanson/passport-google-oauth)</td>
      <td>OAuth / OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Gowalla](https://github.com/jaredhanson/passport-gowalla)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[HackID](https://github.com/HackBerkeley/passport-hackid) (Hackers @ Berkeley)</td>
      <td>OAuth 2.0</td>
      <td>[Hackers @ Berkeley](https://github.com/HackBerkeley)</td>
    </tr>
    <tr>
      <td>[Instagram](https://github.com/jaredhanson/passport-instagram)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Intuit](https://github.com/jaredhanson/passport-intuit)</td>
      <td>OpenID</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Intuit](https://github.com/jaredhanson/passport-intuit-oauth)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Justin.tv](https://github.com/jaredhanson/passport-justintv)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Kreativität trifft Technik](https://github.com/ktt-ol/passport-ktt)</td>
      <td>OpenID</td>
      <td>[Martin Hilscher](https://github.com/ktt-ol)</td>
    </tr>
    <tr>
      <td>[LinkedIn](https://github.com/jaredhanson/passport-linkedin)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Mail.Ru](https://github.com/tiberule/passport-mailru)</td>
      <td>OAuth 2.0</td>
      <td>[Tiberule](https://github.com/tiberule)</td>
    </tr>
    <tr>
      <td>[me2day](https://github.com/outsideris/passport-me2day)</td>
      <td></td>
      <td>[JeongHoon Byun](https://github.com/outsideris)</td>
    </tr>
    <tr>
      <td>[Meetup](https://github.com/jaredhanson/passport-meetup)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[mixi](https://bitbucket.org/fumito_ito/passport-mixi)</td>
      <td>OAuth 2.0</td>
      <td>[Fumito Ito](https://bitbucket.org/fumito_ito)</td>
    </tr>
    <tr>
      <td>[Nate](https://github.com/pukapukan/passport-nate)</td>
      <td>OAuth</td>
      <td>[Jason Park](https://github.com/pukapukan)</td>
    </tr>
    <tr>
      <td>[Netflix](https://github.com/jaredhanson/passport-netflix)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Odnoklassniki](https://github.com/ozon1234/passport-odnoklassniki)</td>
      <td>OAuth</td>
      <td>[Alexey Kozlov](https://github.com/ozon1234)</td>
    </tr>
    <tr>
      <td>[Ohloh](https://github.com/jaredhanson/passport-ohloh)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[OpenStreetMap](https://github.com/jaredhanson/passport-openstreetmap)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Paypal](https://github.com/jaredhanson/passport-paypal)</td>
      <td>OpenID</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Paypal](https://github.com/jaredhanson/passport-paypal-oauth)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[picplz](https://github.com/jaredhanson/passport-picplz)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Pocket](https://github.com/Siedrix/passport-pocket)</td>
      <td>OAuth 2.0</td>
      <td>[Siedrix](https://github.com/Siedrix)</td>
    </tr>
    <tr>
      <td>[Podio](https://github.com/appsattic/passport-podio)</td>
      <td>OAuth 2.0</td>
      <td>[Andrew Chilton](https://github.com/appsattic)</td>
    </tr>
    <tr>
      <td>[QQ](https://github.com/AndyShang/passport-qq)</td>
      <td>OAuth 2.0</td>
      <td>[Andy Shang](https://github.com/AndyShang)</td>
    </tr>
    <tr>
      <td>[Rakuten](https://github.com/gologo13/passport-rakuten)</td>
      <td>OAuth 2.0</td>
      <td>[Yohei Yamaguchi](https://github.com/gologo13)</td>
    </tr>
    <tr>
      <td>[Rdio](https://github.com/jaredhanson/passport-rdio)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Readability](https://github.com/jaredhanson/passport-readability)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[reddit](https://github.com/Slotos/passport-reddit)</td>
      <td>OAuth 2.0</td>
      <td>[Dmytro Soltys](https://github.com/Slotos)</td>
    </tr>
    <tr>
      <td>[RunKeeper](https://github.com/jaredhanson/passport-runkeeper)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Sina Weibo](https://github.com/kfll/passport-sina)</td>
      <td>OAuth 2.0</td>
      <td>[Qichao Yang](https://github.com/kfll)</td>
    </tr>
    <tr>
      <td>[Singly](https://github.com/Singly/passport-singly)</td>
      <td>OAuth 2.0</td>
      <td>[Beau Gunderson](https://github.com/beaugunderson)</td>
    </tr>
    <tr>
      <td>[SmugMug](https://github.com/jaredhanson/passport-smugmug)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[SoundCloud](https://github.com/jaredhanson/passport-soundcloud)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Stack Exchange](https://github.com/geNAZt/passport-stackexchange)</td>
      <td>OAuth 2.0</td>
      <td>[Fabian Faßbender](https://github.com/geNAZt)</td>
    </tr>
    <tr>
      <td>[StatusNet](https://github.com/zoowar/passport-statusnet)</td>
      <td>OAuth</td>
      <td>[zoowar](https://github.com/zoowar)</td>
    </tr>
    <tr>
      <td>[Steam](https://github.com/liamcurry/passport-steam)</td>
      <td>OpenID</td>
      <td>[Liam Curry](https://github.com/liamcurry)</td>
    </tr>
    <tr>
      <td>[Stripe](https://github.com/huffpostlabs/passport-stripe)</td>
      <td>OAuth 2.0</td>
      <td>[Matthew Conlen](https://github.com/huffpostlabs/passport-stripe)</td>
    </tr>
    <tr>
      <td>[SUPINFO](https://github.com/godezinc/passport-supinfo)</td>
      <td>OpenID</td>
      <td>[Vincent PEYROUSE](https://github.com/GodezInc)</td>
    </tr>
    <tr>
      <td>[Teambox](https://github.com/teambox/passport-teambox)</td>
      <td>OAuth 2.0</td>
      <td>[Patrick Heneise](https://github.com/PatrickHeneise)</td>
    </tr>
    <tr>
      <td>[Texas School Safety Center](https://github.com/TxSSC/passport-txssc)</td>
      <td>OAuth 2.0</td>
      <td>[Cody Stoltman](https://github.com/particlebanana)</td>
    </tr>
    <tr>
      <td>[Trade Me](https://github.com/Tumunu/passport-trademe)</td>
      <td>OAuth</td>
      <td>[Cleave Pokotea](https://github.com/Tumunu)</td>
    </tr>
    <tr>
      <td>[Trello](https://github.com/fuwaneko/passport-trello)</td>
      <td>OAuth</td>
      <td>[Dmitry Gorbunov](https://github.com/fuwaneko)</td>
    </tr>
    <tr>
      <td>[TripIt](https://github.com/jaredhanson/passport-tripit)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Tumblr](https://github.com/jaredhanson/passport-tumblr)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Twitter](https://github.com/jaredhanson/passport-twitter)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[University of Cambridge](https://github.com/ForbesLindesay/passport-raven) (Raven)</td>
      <td>[WAA-&gt;WLS](http://raven.cam.ac.uk/project/waa2wls-protocol.txt)</td>
      <td>[Forbes Lindesay](https://github.com/ForbesLindesay)</td>
    </tr>
    <tr>
      <td>[University of Warwick](https://github.com/UniversityofWarwick/passport-warwick-sso-oauth)</td>
      <td>OAuth</td>
      <td>[Mat Mannion](https://github.com/UniversityofWarwick)</td>
    </tr>
    <tr>
      <td>[Urlship](https://github.com/urlship/passport-urlship)</td>
      <td>OAuth 2.0</td>
      <td>[Cleave Pokotea](https://github.com/urlship)</td>
    </tr>
    <tr>
      <td>[Vimeo](https://github.com/jaredhanson/passport-vimeo)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[VKontakte](https://github.com/stevebest/passport-vkontakte)</td>
      <td>OAuth 2.0</td>
      <td>[Stepan Stolyarov](https://github.com/stevebest)</td>
    </tr>
    <tr>
      <td>[Weibo](https://github.com/AndyShang/passport-weibo)</td>
      <td>OAuth 2.0</td>
      <td>[Andy Shang](https://github.com/AndyShang)</td>
    </tr>
    <tr>
      <td>[Windows Live](https://github.com/jaredhanson/passport-windowslive)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Withings](https://github.com/mowens/passport-withings)</td>
      <td>OAuth</td>
      <td>[Michael Owens](https://github.com/mowens)</td>
    </tr>
    <tr>
      <td>[XING](https://github.com/pascal-bach/passport-xing)</td>
      <td>OAuth</td>
      <td>[Pascal Bach](https://github.com/pascal-bach)</td>
    </tr>
    <tr>
      <td>[Yahoo!](https://github.com/jaredhanson/passport-yahoo)</td>
      <td>OpenID</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Yahoo!](https://github.com/jaredhanson/passport-yahoo-oauth)</td>
      <td>OAuth</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Yahoo! JAPAN](https://github.com/Lewuathe/passport-yj)</td>
      <td>OAuth 2.0</td>
      <td>[Kai Sasaki](https://github.com/Lewuathe)</td>
    </tr>
    <tr>
      <td>[Yammer](https://github.com/jaredhanson/passport-yammer)</td>
      <td>OAuth 2.0</td>
      <td>[Jared Hanson](https://github.com/jaredhanson)</td>
    </tr>
    <tr>
      <td>[Yandex](https://github.com/gurugray/passport-yandex)</td>
      <td>OAuth 2.0</td>
      <td>[Sergey Sergeev](https://github.com/gurugray)</td>
    </tr>
    <tr>
      <td>[YouTube](https://github.com/jozzhart/passport-youtube)</td>
      <td>OAuth 2.0</td>
      <td>[Jozz Hart](https://github.com/jozzhart)</td>
    </tr>
  </tbody>
</table>

**Attention Developers:** If you implement support another provider, send me a
message and I will add it to the list.