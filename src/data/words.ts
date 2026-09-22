import type { Pos, TopicId, Word } from "./types";

/**
 * Compact lexicon rows from Goethe-Zertifikat A1 Start Deutsch 1.
 * lemma|pos|en|topic|example|exampleEn|article|plural|feminine
 */
const RAW = `
ab|adv|from / starting|zeit|Ab morgen muss ich arbeiten.|From tomorrow I have to work.|||
aber|conj|but|alltag|Ich bin oft im Büro, aber nur für wenige Stunden.|I am often at the office, but only for a few hours.|||
Abfahrt|noun|departure|reisen|Vor der Abfahrt rufe ich an.|I'll call before departure.|die|Abfahrten|
Absender|noun|sender|dienste|Da ist ein Brief für dich ohne Absender.|There is a letter for you with no sender.|der|Absender|
Achtung|noun|attention / caution|alltag|Achtung! Das dürfen Sie nicht tun.|Watch out! You must not do that.|die||
Adresse|noun|address|person|Können Sie mir seine Adresse sagen?|Can you tell me his address?|die|Adressen|
all|det|all / everything|alltag|Sind alle da? Hast du alles?|Is everyone here? Do you have everything?|||
allein|adv|alone|person|Er kommt allein.|He is coming alone.|||
also|adv|so / therefore|alltag|Er hat Zeit, also muss er uns helfen.|He has time, so he has to help us.|||
alt|adj|old|person|Wie alt sind Sie?|How old are you?|||
Alter|noun|age|person|Alter: 26 Jahre.|Age: 26 years.|das||
an|prep|at / on|alltag|Wir treffen uns am Bahnhof.|We'll meet at the station.|||
Angebot|noun|offer / special|einkaufen|Heute sind Sportschuhe im Angebot.|Sports shoes are on special today.|das|Angebote|
ander|det|other|alltag|Nein, ich möchte die andere.|No, I would like the other one.|||
Anfang|noun|beginning|zeit|Wir machen Anfang Juli Urlaub.|We're taking holiday at the beginning of July.|der|Anfänge|
Ankunft|noun|arrival|reisen|Auf diesem Plan steht nur die Ankunft der Züge.|This plan only shows the arrival of the trains.|die|Ankünfte|
Anmeldung|noun|registration|lernen|Eine Anmeldung für diesen Kurs ist nicht mehr möglich.|Registration for this course is no longer possible.|die|Anmeldungen|
Anrede|noun|form of address|dienste|Schreiben Sie auch eine Anrede und einen Gruß.|Also write a greeting and a closing.|die|Anreden|
Anruf|noun|phone call|dienste|Sie bekommt viele Anrufe auf ihrem Handy.|She gets many calls on her mobile.|der|Anrufe|
Anrufbeantworter|noun|answering machine|dienste|Sprechen Sie bitte auf den Anrufbeantworter.|Please leave a message on the answering machine.|der|Anrufbeantworter|
Ansage|noun|announcement|reisen|Hören Sie die Ansagen.|Listen to the announcements.|die|Ansagen|
Anschluss|noun|connection|reisen|In Mannheim haben Sie Anschluss nach Saarbrücken.|In Mannheim you have a connection to Saarbrücken.|der|Anschlüsse|
Antwort|noun|answer|lernen|Er gibt leider keine Antwort.|Unfortunately he gives no answer.|die|Antworten|
Anzeige|noun|advert / notice|dienste|Ich habe Ihre Anzeige in der Zeitung gelesen.|I read your advert in the newspaper.|die|Anzeigen|
Apartment|noun|apartment|wohnen|Wir haben ein Apartment gemietet.|We rented an apartment.|das|Apartments|
Apfel|noun|apple|essen|Ein Pfund Äpfel bitte.|A pound of apples, please.|der|Äpfel|
Appetit|noun|appetite|essen|Guten Appetit!|Enjoy your meal!|der||
Arbeit|noun|work / job|arbeit|Mein Bruder sucht Arbeit.|My brother is looking for work.|die|Arbeiten|
arbeitslos|adj|unemployed|arbeit|Es gibt bei uns viele Leute, die schon lange arbeitslos sind.|There are many people here who have been unemployed for a long time.|||
Arbeitsplatz|noun|workplace|arbeit|An meinem Arbeitsplatz fehlt ein Drucker.|A printer is missing at my workplace.|der|Arbeitsplätze|
Arm|noun|arm|person|Mein Arm tut weh.|My arm hurts.|der|Arme|
Arzt|noun|doctor|person|Morgen habe ich einen Termin bei meiner Ärztin.|Tomorrow I have an appointment with my doctor.|der|Ärzte|Ärztin
auch|adv|also / too|alltag|Ich bin auch Spanier.|I am also Spanish.|||
auf|prep|on / onto|alltag|Die Kinder spielen auf der Straße.|The children are playing in the street.|||
Aufgabe|noun|task / exercise|lernen|Das ist eine schwere Aufgabe.|That is a difficult task.|die|Aufgaben|
Aufzug|noun|lift / elevator|wohnen|In diesem Haus gibt es keinen Aufzug.|There is no lift in this house.|der|Aufzüge|
Auge|noun|eye|person|Er hat blaue Augen.|He has blue eyes.|das|Augen|
aus|prep|from / out of|alltag|Er kommt aus Brasilien.|He comes from Brazil.|||
Ausflug|noun|trip / outing|reisen|Morgen machen wir einen Ausflug nach Heidelberg.|Tomorrow we are going on a trip to Heidelberg.|der|Ausflüge|
Ausgang|noun|exit|reisen|Wo ist der Ausgang?|Where is the exit?|der|Ausgänge|
Auskunft|noun|information|dienste|Können Sie mir eine Auskunft geben?|Can you give me some information?|die|Auskünfte|
Ausland|noun|abroad / foreign country|reisen|Fahren Sie ins Ausland?|Are you going abroad?|das||
Ausländer|noun|foreigner|person|Sind Sie Ausländerin?|Are you a foreigner?|der|Ausländer|Ausländerin
ausländisch|adj|foreign|person|Leider habe ich nur ausländisches Geld.|Unfortunately I only have foreign money.|||
Aussage|noun|statement|lernen|Ist die Aussage richtig oder falsch?|Is the statement true or false?|die|Aussagen|
Ausweis|noun|ID card|dienste|Hier ist mein Ausweis.|Here is my ID.|der|Ausweise|
Auto|noun|car|reisen|Er kommt mit dem Auto.|He is coming by car.|das|Autos|
Autobahn|noun|motorway|reisen|Wo geht's hier bitte zur Autobahn?|How do I get to the motorway from here?|die|Autobahnen|
Automat|noun|machine / ticket machine|reisen|Die Fahrkarten gibt es nur am Automaten.|Tickets are only available from the machine.|der|Automaten|
automatisch|adj|automatic|alltag|Du musst nichts machen. Das geht automatisch.|You don't have to do anything. It works automatically.|||
Baby|noun|baby|person|Mein Kind ist noch ein Baby.|My child is still a baby.|das|Babys|
Bäckerei|noun|bakery|essen|Ich geh mal schnell zur Bäckerei.|I'll quickly go to the bakery.|die|Bäckereien|
Bad|noun|bathroom|wohnen|Wir haben kein großes Bad.|We don't have a large bathroom.|das|Bäder|
Bahn|noun|train / railway|reisen|Wir fahren lieber mit der Bahn.|We prefer to go by train.|die|Bahnen|
Bahnhof|noun|train station|reisen|Komme ich hier zum Bahnhof?|Do I get to the station this way?|der|Bahnhöfe|
Bahnsteig|noun|platform|reisen|Auf welchem Bahnsteig fährt der Zug?|Which platform does the train leave from?|der|Bahnsteige|
bald|adv|soon|zeit|Ich komme bald.|I'll come soon.|||
Balkon|noun|balcony|wohnen|Die Wohnung hat auch einen kleinen Balkon.|The apartment also has a small balcony.|der|Balkone|
Banane|noun|banana|essen|Drei Bananen, bitte!|Three bananas, please!|die|Bananen|
Bank|noun|bank|dienste|Die Bank schließt schon um vier Uhr.|The bank already closes at four.|die|Banken|
Bank|noun|bench|umwelt|Er sitzt im Park auf einer Bank und liest.|He is sitting on a bench in the park and reading.|die|Bänke|
bar|adv|in cash|einkaufen|Muss ich bar zahlen oder geht's auch mit Karte?|Do I have to pay cash or is card also possible?|||
Bauch|noun|stomach / belly|person|Seit gestern tut mir der Bauch weh.|My stomach has hurt since yesterday.|der|Bäuche|
Baum|noun|tree|umwelt|Vorsicht, fahr nicht an den Baum!|Careful, don't drive into the tree!|der|Bäume|
Beamte|noun|official / civil servant|dienste|Fragen Sie die Beamtin an Schalter acht!|Ask the official at counter eight!|der|Beamten|Beamtin
bei|prep|at / with / near|alltag|Ich wohne bei meinen Eltern.|I live with my parents.|||
beide|det|both|alltag|Wir kommen beide.|We're both coming.|||
Bein|noun|leg|person|Mein rechtes Bein tut weh.|My right leg hurts.|das|Beine|
Beispiel|noun|example|lernen|Kannst du mir ein Beispiel sagen?|Can you give me an example?|das|Beispiele|
bekannt|adj|well-known / familiar|person|Picasso ist sehr bekannt.|Picasso is very well known.|||
Bekannte|noun|acquaintance|person|Ein Bekannter von mir heißt Klaus.|An acquaintance of mine is called Klaus.|der|Bekannten|Bekannte
Beruf|noun|profession|arbeit|Was sind Sie von Beruf?|What is your profession?|der|Berufe|
besetzt|adj|busy / occupied|dienste|Die Nummer ist immer besetzt.|The number is always busy.|||
besser|adj|better|alltag|Es geht mir schon besser.|I am already feeling better.|||
best|adj|best|alltag|Am besten treffen wir uns morgen.|It's best if we meet tomorrow.|||
Bett|noun|bed|wohnen|Wir brauchen noch ein Kinderbett.|We still need a child's bed.|das|Betten|
Bier|noun|beer|essen|Noch ein Bier bitte.|Another beer, please.|das|Biere|
Bild|noun|picture|freizeit|Hast du ein Bild von deinem Sohn?|Do you have a picture of your son?|das|Bilder|
billig|adj|cheap|einkaufen|Die Jacke kostet nur 10 Euro! Die ist aber billig!|The jacket only costs 10 euros! That's cheap!|||
Birne|noun|pear|essen|Ein Kilo Birnen, bitte!|A kilo of pears, please!|die|Birnen|
bis|prep|until / as far as|zeit|Ich fahre nur bis Stuttgart.|I'm only going as far as Stuttgart.|||
bisschen|adv|a little|alltag|Ich spreche ein bisschen Deutsch.|I speak a little German.|||
bitte|adv|please|alltag|Eine Tasse Kaffee, bitte!|A cup of coffee, please!|||
Bitte|noun|request|alltag|Ich habe noch eine Bitte.|I have one more request.|die|Bitten|
bitter|adj|bitter|essen|Der Kaffee schmeckt bitter.|The coffee tastes bitter.|||
Bleistift|noun|pencil|lernen|Hast du einen Bleistift?|Do you have a pencil?|der|Bleistifte|
Blick|noun|view|reisen|Von diesem Hotel hat man einen guten Blick auf den Rhein.|From this hotel you have a good view of the Rhine.|der|Blicke|
Blume|noun|flower|umwelt|Gefallen dir die Blumen?|Do you like the flowers?|die|Blumen|
Bogen|noun|sheet / form sheet|lernen|Schreiben Sie Ihre Lösungen bitte auf den Antwortbogen.|Please write your answers on the answer sheet.|der|Bögen|
böse|adj|angry / mad|person|Sie ist böse auf mich.|She is angry with me.|||
breit|adj|wide|wohnen|Wie breit ist der Schrank?|How wide is the wardrobe?|||
Brief|noun|letter|dienste|Haben Sie einen Brief für mich?|Do you have a letter for me?|der|Briefe|
Briefmarke|noun|stamp|dienste|Kaufst du bitte Briefmarken bei der Post.|Please buy stamps at the post office.|die|Briefmarken|
Brot|noun|bread|essen|Haben Sie auch Weißbrot?|Do you also have white bread?|das|Brote|
Brötchen|noun|bread roll|essen|Möchtest du Brötchen zum Frühstück?|Would you like rolls for breakfast?|das|Brötchen|
Bruder|noun|brother|person|Sein Bruder arbeitet auch hier.|His brother also works here.|der|Brüder|
Buch|noun|book|lernen|Gute Bücher sind oft sehr teuer.|Good books are often very expensive.|das|Bücher|
Buchstabe|noun|letter (of the alphabet)|lernen|Diesen Buchstaben gibt es in meiner Sprache nicht.|This letter does not exist in my language.|der|Buchstaben|
Bus|noun|bus|reisen|Wann kommt der nächste Bus?|When is the next bus?|der|Busse|
Butter|noun|butter|essen|Für mich bitte ein Brötchen mit Butter und Käse.|A roll with butter and cheese for me, please.|die||
Café|noun|café|essen|Sollen wir uns im Café treffen?|Shall we meet at the café?|das|Cafés|
CD|noun|CD|freizeit|Bring bitte deine Lieblings-CD mit.|Please bring your favourite CD.|die|CDs|
Chef|noun|boss|arbeit|Wir haben eine neue Chefin.|We have a new boss.|der|Chefs|Chefin
circa|adv|approximately|zahlen|Von Mainz nach Frankfurt sind es circa fünfzig Kilometer.|From Mainz to Frankfurt it is about fifty kilometres.|||
Computer|noun|computer|arbeit|Wann bekommst du deinen neuen Computer?|When do you get your new computer?|der|Computer|
da|adv|there / here|alltag|Da hinten ist er ja.|There he is, at the back.|||
Dame|noun|lady|person|Sehr geehrte Damen und Herren!|Dear ladies and gentlemen!|die|Damen|
daneben|adv|next to it|alltag|Du kennst doch die Post. Daneben ist die Bank.|You know the post office. Next to it is the bank.|||
Dank|noun|thanks|alltag|Vielen Dank!|Many thanks!|der||
danke|phrase|thank you|alltag|Soll ich Ihnen helfen? – Nein, danke!|Shall I help you? – No, thank you!|||
dann|adv|then|zeit|Ich muss noch schnell zur Post, dann komme ich.|I still have to go to the post office quickly, then I'll come.|||
Datum|noun|date|zeit|Bitte schreiben Sie noch das Datum auf das Formular.|Please also write the date on the form.|das|Daten|
dein|det|your (informal)|person|Ist das dein Auto?|Is that your car?|||
denn|conj|because / then (particle)|alltag|Ich kann nicht kommen, denn ich bin krank.|I cannot come because I am ill.|||
dich|pron|you (object, informal)|person|Die Blumen sind für dich.|The flowers are for you.|||
dies|det|this|alltag|Ich nehme lieber diesen Kuchen.|I'd rather take this cake.|||
dir|pron|to you (informal)|person|Gefallen dir die Blumen?|Do you like the flowers?|||
Disco|noun|disco|freizeit|Heute Abend gehen wir in die Disco tanzen.|This evening we are going dancing at the disco.|die|Discos|
Doktor|noun|doctor (title)|person|Meine Tochter ist krank. Wir gehen zum Doktor.|My daughter is ill. We're going to the doctor.|der|Doktoren|
Doppelzimmer|noun|double room|reisen|Wollen Sie ein Doppelzimmer oder ein Einzelzimmer?|Would you like a double room or a single room?|das|Doppelzimmer|
Dorf|noun|village|wohnen|Meine Familie lebt in einem Dorf.|My family lives in a village.|das|Dörfer|
dort|adv|there|alltag|Dort ist unser Haus.|Our house is there.|||
draußen|adv|outside|umwelt|Wollen wir draußen sitzen?|Shall we sit outside?|||
Drucker|noun|printer|arbeit|Mein Drucker ist kaputt.|My printer is broken.|der|Drucker|
durch|prep|through|alltag|Am besten gehen Sie durch die Breite Straße.|It's best if you go through Breite Straße.|||
Durchsage|noun|announcement (PA)|reisen|Ich habe die Durchsage nicht verstanden.|I didn't understand the announcement.|die|Durchsagen|
Durst|noun|thirst|essen|Ich habe großen Durst.|I am very thirsty.|der||
Dusche|noun|shower|wohnen|Unsere Wohnung hat nur eine Dusche.|Our apartment only has a shower.|die|Duschen|
Ecke|noun|corner|reisen|An der nächsten Ecke links.|Left at the next corner.|die|Ecken|
Ehefrau|noun|wife|person|Das ist meine Ehefrau.|This is my wife.|die|Ehefrauen|
Ehemann|noun|husband|person|Das ist mein Ehemann.|This is my husband.|der|Ehemänner|
Ei|noun|egg|essen|Möchtest du ein Ei zum Frühstück?|Would you like an egg for breakfast?|das|Eier|
eilig|adj|in a hurry|zeit|Hast du es eilig?|Are you in a hurry?|||
ein|det|a / one|alltag|Ich nehme ein Bier.|I'll take a beer.|||
einfach|adj|simple / one-way|reisen|Hin und zurück? – Nein, bitte nur einfach.|Return? – No, one-way please.|||
Eingang|noun|entrance|reisen|Der Eingang ist um die Ecke.|The entrance is around the corner.|der|Eingänge|
Einladung|noun|invitation|person|Danke für die Einladung!|Thanks for the invitation!|die|Einladungen|
einmal|adv|once|zeit|Diese Prüfung mache ich nicht noch einmal.|I won't take this exam again.|||
Eintritt|noun|admission|freizeit|Der Preis für den Eintritt ist 5 Euro.|The admission price is 5 euros.|der||
Einzelzimmer|noun|single room|reisen|Haben Sie noch ein Einzelzimmer?|Do you still have a single room?|das|Einzelzimmer|
Eltern|noun|parents|person|Meine Eltern leben in Spanien.|My parents live in Spain.|die||
E-Mail|noun|email|dienste|Ich habe Ihre E-Mail nicht bekommen.|I didn't get your email.|die|E-Mails|
Empfänger|noun|recipient|dienste|Auf dem Brief steht dein Name, also bist du der Empfänger.|Your name is on the letter, so you are the recipient.|der|Empfänger|Empfängerin
Ende|noun|end|zeit|Sie wohnt am Ende der Straße.|She lives at the end of the street.|das|Enden|
Entschuldigung|noun|apology / excuse me|alltag|Entschuldigung! – Bitte.|Sorry! – That's okay.|die|Entschuldigungen|
er|pron|he|person|Er heißt Ali.|His name is Ali.|||
Ergebnis|noun|result|lernen|Das Ergebnis des Tests bekommen Sie in zwei Wochen.|You will get the test result in two weeks.|das|Ergebnisse|
Erwachsene|noun|adult|person|Dieser Film ist nur für Erwachsene.|This film is only for adults.|der|Erwachsenen|
es|pron|it|alltag|Es regnet.|It is raining.|||
Essen|noun|food / meal|essen|Das Essen ist heute sehr gut.|The food is very good today.|das||
euer|det|your (plural informal)|person|Euer Kurs beginnt heute.|Your course starts today.|||
Fahrer|noun|driver|reisen|Bitte nicht mit dem Fahrer sprechen!|Please do not talk to the driver!|der|Fahrer|Fahrerin
Fahrkarte|noun|ticket (travel)|reisen|Hast du schon eine Fahrkarte?|Do you already have a ticket?|die|Fahrkarten|
Fahrrad|noun|bicycle|reisen|Fährst du mit dem Fahrrad oder mit dem Auto?|Are you going by bike or by car?|das|Fahrräder|
falsch|adj|wrong|lernen|Das ist falsch.|That is wrong.|||
Familie|noun|family|person|Meine Familie lebt in Spanien.|My family lives in Spain.|die|Familien|
Familienname|noun|surname|person|Meine Familiennamen sind García González.|My surnames are García González.|der|Familiennamen|
Familienstand|noun|marital status|person|Bei „Familienstand“ musst du „ledig“ ankreuzen.|Under marital status you have to tick “single”.|der||
Farbe|noun|colour|einkaufen|Die Farbe gefällt mir gut.|I like the colour.|die|Farben|
Fax|noun|fax|dienste|Schicken Sie uns einfach ein Fax!|Just send us a fax!|das|Faxe|
Feiertag|noun|public holiday|zeit|Am Montag ist Feiertag.|Monday is a public holiday.|der|Feiertage|
Fehler|noun|mistake|lernen|Diesen Fehler mache ich immer.|I always make this mistake.|der|Fehler|
fertig|adj|ready / finished|alltag|Bist du fertig?|Are you ready?|||
Feuer|noun|fire / a light|alltag|Haben Sie Feuer?|Do you have a light?|das||
Fieber|noun|fever|person|Mein Mann hat noch immer Fieber.|My husband still has a fever.|das||
Film|noun|film|freizeit|Ich möchte gern diesen Film sehen.|I would like to see this film.|der|Filme|
Firma|noun|company|arbeit|Er arbeitet jetzt bei einer anderen Firma.|He now works at another company.|die|Firmen|
Fisch|noun|fish|essen|Ich esse gern Fisch.|I like eating fish.|der|Fische|
Flasche|noun|bottle|essen|Eine Flasche Bier, bitte.|A bottle of beer, please.|die|Flaschen|
Fleisch|noun|meat|essen|Fleisch mag ich nicht.|I don't like meat.|das||
Abflug|noun|departure (flight)|reisen|Der Abflug ist um 11.20 Uhr.|The departure is at 11:20.|der|Abflüge|
Flughafen|noun|airport|reisen|Kannst du mich zum Flughafen bringen?|Can you take me to the airport?|der|Flughäfen|
Flugzeug|noun|aeroplane|reisen|Das Flugzeug aus Berlin kommt heute später an.|The plane from Berlin is arriving later today.|das|Flugzeuge|
Formular|noun|form|dienste|Sie müssen dieses Formular ausfüllen.|You have to fill out this form.|das|Formulare|
Foto|noun|photo|freizeit|Darf ich ein Foto machen?|May I take a photo?|das|Fotos|
Frage|noun|question|lernen|Ich habe eine Frage.|I have a question.|die|Fragen|
Frau|noun|woman / Mrs|person|Guten Tag, Frau Schmitt!|Good day, Mrs Schmitt!|die|Frauen|
frei|adj|free / vacant|reisen|Ist der Platz noch frei?|Is the seat still free?|||
Freizeit|noun|free time|freizeit|In meiner Freizeit spiele ich oft Fußball.|In my free time I often play football.|die||
fremd|adj|foreign / unfamiliar|reisen|Das weiß ich nicht; ich bin fremd hier.|I don't know; I'm a stranger here.|||
Freund|noun|friend|person|Das ist ein Freund von mir.|That is a friend of mine.|der|Freunde|Freundin
früher|adv|in the past / earlier|zeit|Früher waren wir oft zusammen im Kino.|In the past we often went to the cinema together.|||
Frühstück|noun|breakfast|essen|Möchtest du ein Ei zum Frühstück?|Would you like an egg for breakfast?|das||
Führung|noun|guided tour|reisen|Die Führung durch das Haus beginnt in 3 Minuten.|The tour of the house starts in 3 minutes.|die|Führungen|
für|prep|for|alltag|Das ist für Sie.|This is for you.|||
Fuß|noun|foot|person|Der linke Fuß tut mir weh.|My left foot hurts.|der|Füße|
Fußball|noun|football|freizeit|Spielt ihr gerne Fußball?|Do you like playing football?|der||
Garten|noun|garden|wohnen|Wir haben leider keinen Garten.|Unfortunately we don't have a garden.|der|Gärten|
Gast|noun|guest|person|Am Wochenende haben wir mehrere Gäste.|At the weekend we have several guests.|der|Gäste|
geboren|adj|born|person|Ich bin in Zagreb geboren.|I was born in Zagreb.|||
Geburtsjahr|noun|year of birth|person|Das Geburtsjahr Ihres Sohnes, bitte?|Your son's year of birth, please?|das|Geburtsjahre|
Geburtsort|noun|place of birth|person|Bitte schreiben Sie Ihren Geburtsort auf das Formular.|Please write your place of birth on the form.|der|Geburtsorte|
Geburtstag|noun|birthday|person|Herzlichen Glückwunsch zum Geburtstag!|Happy birthday!|der|Geburtstage|
gegen|prep|against|alltag|Fahr nicht gegen den Baum!|Don't drive into the tree!|||
Geld|noun|money|einkaufen|Hast du noch Geld?|Do you still have money?|das||
Gemüse|noun|vegetables|essen|Gemüse brauchen wir auch noch.|We still need vegetables too.|das||
Gepäck|noun|luggage|reisen|Wollen Sie Ihr Gepäck mitnehmen?|Do you want to take your luggage?|das||
gerade|adv|just now / straight|alltag|Da kommt er ja gerade.|There he comes, just now.|||
geradeaus|adv|straight ahead|reisen|Gehen Sie immer geradeaus!|Keep going straight ahead!|||
gern|adv|gladly / like to|alltag|Ich gehe gerne einkaufen.|I like going shopping.|||
Geschäft|noun|shop / business|einkaufen|Die Geschäfte schließen um 18.30 Uhr.|The shops close at 6:30 p.m.|das|Geschäfte|
Geschenk|noun|present|person|Danke für das schöne Geschenk.|Thanks for the lovely present.|das|Geschenke|
Geschwister|noun|siblings|person|Ich habe leider keine Geschwister.|Unfortunately I have no siblings.|die||
Gespräch|noun|conversation|arbeit|Das Gespräch mit Frau Kunz ist um 14 Uhr.|The meeting with Mrs Kunz is at 2 p.m.|das|Gespräche|
gestern|adv|yesterday|zeit|Gestern war ich krank.|Yesterday I was ill.|||
gestorben|adj|died / deceased|person|Meine Frau ist gestern gestorben.|My wife died yesterday.|||
Getränk|noun|drink|essen|Mein Lieblingsgetränk ist Tomatensaft.|My favourite drink is tomato juice.|das|Getränke|
Gewicht|noun|weight|person|Bei „Gewicht“ schreibst du: 62 Kilo.|Under weight you write: 62 kilos.|das||
Glas|noun|glass|essen|Bitte noch ein Glas Wein!|Another glass of wine, please!|das|Gläser|
gleich|adj|same / in a moment|zeit|Ich komme gleich.|I'll come in a moment.|||
Gleis|noun|track / platform|reisen|Der ICE nach Berlin hält heute an Gleis 12.|The ICE to Berlin stops at track 12 today.|das|Gleise|
Glück|noun|luck|alltag|Viel Glück!|Good luck!|das||
glücklich|adj|happy|person|Meine Kinder sind glücklich verheiratet.|My children are happily married.|||
Glückwunsch|noun|congratulations|person|Herzlichen Glückwunsch zum Geburtstag.|Congratulations on your birthday.|der|Glückwünsche|
Grad|noun|degree (temperature)|umwelt|Heute haben wir dreißig Grad.|Today it is thirty degrees.|der||
groß|adj|big / tall|person|Mein Bruder und ich sind gleich groß.|My brother and I are the same height.|||
Größe|noun|size|einkaufen|Haben Sie das auch in Größe 40?|Do you have that in size 40 as well?|die|Größen|
Großeltern|noun|grandparents|person|Meine Großeltern leben in Japan.|My grandparents live in Japan.|die||
Großmutter|noun|grandmother|person|Meine Großmutter heißt Eva.|My grandmother is called Eva.|die|Großmütter|
Großvater|noun|grandfather|person|Mein Großvater ist schon 80.|My grandfather is already 80.|der|Großväter|
Gruppe|noun|group|lernen|Die erste Gruppe beginnt um 16 Uhr.|The first group starts at 4 p.m.|die|Gruppen|
Gruß|noun|greeting|dienste|Viele Grüße an Ihre Frau.|Best regards to your wife.|der|Grüße|
gültig|adj|valid|dienste|Der Pass ist nicht mehr gültig.|The passport is no longer valid.|||
günstig|adj|good value / cheap|einkaufen|Dort gibt es günstige Angebote.|There are good-value offers there.|||
gut|adj|good|alltag|Das finde ich gut.|I think that's good.|||
Haar|noun|hair|person|Sie hat lange Haare.|She has long hair.|das|Haare|
Hähnchen|noun|chicken (food)|essen|Ein Hähnchen mit Pommes bitte!|A chicken with fries, please!|das|Hähnchen|
Halbpension|noun|half board|reisen|Möchten Sie Vollpension oder Halbpension?|Would you like full board or half board?|die||
Halle|noun|hall|reisen|Wir treffen uns in Halle B.|We'll meet in hall B.|die|Hallen|
hallo|phrase|hello|alltag|Hallo Inge! Wie geht's?|Hello Inge! How are you?|||
Haltestelle|noun|stop (bus/tram)|reisen|An der nächsten Haltestelle müssen Sie aussteigen.|You have to get off at the next stop.|die|Haltestellen|
Hand|noun|hand|person|Er gibt mir die Hand.|He shakes my hand.|die|Hände|
Handy|noun|mobile phone|dienste|In der Schule bitte die Handys ausmachen!|Please turn off mobiles at school!|das|Handys|
Haus|noun|house|wohnen|In welchem Haus wohnst du?|Which house do you live in?|das|Häuser|
Hausaufgabe|noun|homework|lernen|Kannst du mir bei den Hausaufgaben helfen?|Can you help me with the homework?|die|Hausaufgaben|
Hausfrau|noun|homemaker (female)|arbeit|Die Hausfrau wäscht, kocht und kauft ein.|The homemaker washes, cooks and shops.|die|Hausfrauen|
Hausmann|noun|homemaker (male)|arbeit|Der Hausmann wäscht, kocht und kauft ein.|The homemaker washes, cooks and shops.|der|Hausmänner|
Heimat|noun|home country / hometown|person|Ich komme aus der Schweiz. Das ist meine Heimat.|I come from Switzerland. That is my home.|die||
hell|adj|bright / light|umwelt|Im Sommer ist es bis 21 Uhr hell.|In summer it is light until 9 p.m.|||
Herd|noun|cooker / stove|wohnen|In der neuen Küche fehlt noch der Herd.|The cooker is still missing in the new kitchen.|der|Herde|
Herr|noun|Mr / gentleman|person|Guten Tag, Herr Sommer!|Good day, Mr Sommer!|der|Herren|
herzlich|adj|heartfelt / warm|alltag|Herzlichen Glückwunsch!|Congratulations!|||
heute|adv|today|zeit|Heute ist ein schöner Tag.|Today is a beautiful day.|||
hier|adv|here|alltag|Hier wohne ich.|I live here.|||
Hilfe|noun|help|alltag|Brauchen Sie meine Hilfe?|Do you need my help?|die||
hinten|adv|at the back|reisen|Die Tür zum Aussteigen ist hinten.|The door for getting off is at the back.|||
Hobby|noun|hobby|freizeit|Meine Hobbys sind Wandern und Schwimmen.|My hobbies are hiking and swimming.|das|Hobbys|
hoch|adj|high / tall|umwelt|Der Mount Everest ist 8.880 Meter hoch.|Mount Everest is 8,880 metres high.|||
Hochzeit|noun|wedding|person|Zu dieser Hochzeit kommen mehr als fünfzig Gäste.|More than fifty guests are coming to this wedding.|die|Hochzeiten|
Hotel|noun|hotel|reisen|Im Urlaub sind wir in einem Hotel am Meer.|On holiday we are in a hotel by the sea.|das|Hotels|
Hund|noun|dog|umwelt|Der Hund ist noch jung.|The dog is still young.|der|Hunde|
Hunger|noun|hunger|essen|Ich habe Hunger!|I am hungry!|der||
ich|pron|I|person|Ich heiße Veronika.|My name is Veronika.|||
immer|adv|always|zeit|Frau Bast kommt immer zu spät.|Mrs Bast always comes too late.|||
in|prep|in / into|alltag|Ich wohne in Wiesbaden.|I live in Wiesbaden.|||
Information|noun|information desk / information|dienste|Wenn Sie Fragen haben, gehen Sie zur Information.|If you have questions, go to the information desk.|die|Informationen|
international|adj|international|lernen|Unser Deutschkurs ist international.|Our German course is international.|||
Internet|noun|internet|freizeit|Das findest du im Internet.|You can find that on the internet.|das||
ja|adv|yes|alltag|Sind Sie Herr Watanabe? – Ja.|Are you Mr Watanabe? – Yes.|||
Jacke|noun|jacket|einkaufen|Zieh dir eine Jacke an. Es ist kalt.|Put on a jacket. It is cold.|die|Jacken|
jed|det|every / each|alltag|Blumen kannst du in jedem Bahnhof kaufen.|You can buy flowers in every station.|||
jetzt|adv|now|zeit|Jetzt machen wir eine Pause.|Now we are taking a break.|||
Job|noun|job|arbeit|Jenny hat einen neuen Job bei der Post.|Jenny has a new job at the post office.|der|Jobs|
Jugendliche|noun|young person / teenager|person|Viele Jugendliche kaufen gern ein.|Many teenagers like shopping.|der|Jugendlichen|
jung|adj|young|person|Claudia ist 21. Noch so jung?|Claudia is 21. Still so young?|||
Junge|noun|boy|person|Ich habe zwei Kinder. Einen Jungen und ein Mädchen.|I have two children. A boy and a girl.|der|Jungen|
Kaffee|noun|coffee|essen|Zum Frühstück trinke ich immer Kaffee.|I always drink coffee for breakfast.|der||
kaputt|adj|broken|wohnen|Das Glas geht sehr leicht kaputt.|The glass breaks very easily.|||
Karte|noun|card / map / menu / ticket|alltag|Kann ich auch mit Karte zahlen?|Can I also pay by card?|die|Karten|
Kartoffel|noun|potato|essen|Für Pommes frites braucht man Kartoffeln.|You need potatoes for fries.|die|Kartoffeln|
Kasse|noun|till / checkout|einkaufen|Zahlen Sie bitte an der Kasse.|Please pay at the till.|die|Kassen|
kein|det|no / not any|alltag|Es gibt keine Eintrittskarten mehr.|There are no more admission tickets.|||
Kind|noun|child|person|Wie viele Kinder haben Sie?|How many children do you have?|das|Kinder|
Kindergarten|noun|kindergarten|lernen|Die kleine Laura geht schon in den Kindergarten.|Little Laura already goes to kindergarten.|der|Kindergärten|
Kino|noun|cinema|freizeit|Wir sehen heute Abend im Kino einen schönen Film.|This evening we are seeing a nice film at the cinema.|das|Kinos|
Kiosk|noun|kiosk|einkaufen|Am Kiosk bekommen Sie Getränke, Zigaretten und Zeitungen.|At the kiosk you can get drinks, cigarettes and newspapers.|der|Kioske|
klar|adj|clear / of course|alltag|Kommst du mit? – Klar!|Are you coming? – Sure!|||
Klasse|noun|class|lernen|In unserer Klasse sind fünfundzwanzig Schüler.|There are twenty-five pupils in our class.|die|Klassen|
Kleidung|noun|clothing|einkaufen|Wo finde ich Kleidung?|Where do I find clothing?|die||
klein|adj|small|alltag|Eltville ist eine kleine Stadt am Rhein.|Eltville is a small town on the Rhine.|||
Koffer|noun|suitcase|reisen|Ist das Ihr Koffer?|Is that your suitcase?|der|Koffer|
Kollege|noun|colleague|arbeit|Wie heißt die neue Kollegin?|What is the new colleague's name?|der|Kollegen|Kollegin
Konto|noun|account (bank)|dienste|Das Geld überweisen wir am ersten März auf Ihr Konto.|We will transfer the money to your account on 1 March.|das|Konten|
Kopf|noun|head|person|Mein Kopf tut weh!|My head hurts!|der|Köpfe|
krank|adj|ill / sick|person|Ich kann heute nicht zur Arbeit kommen, ich bin krank.|I cannot come to work today, I am ill.|||
Küche|noun|kitchen|wohnen|Der neue Herd kommt in die Küche.|The new cooker is going in the kitchen.|die|Küchen|
Kuchen|noun|cake|essen|Ich nehme ein Stück Kuchen.|I'll take a piece of cake.|der||
Kugelschreiber|noun|ballpoint pen|lernen|Hast du einen Kugelschreiber für mich?|Do you have a pen for me?|der|Kugelschreiber|
Kühlschrank|noun|fridge|wohnen|Haben wir noch Milch? – Ja, im Kühlschrank.|Do we still have milk? – Yes, in the fridge.|der|Kühlschränke|
kulturell|adj|cultural|freizeit|Ich bin kulturell interessiert.|I am interested in culture.|||
Kunde|noun|customer|einkaufen|Einen Moment, bitte. Ich habe eine Kundin.|One moment, please. I have a customer.|der|Kunden|Kundin
Kurs|noun|course|lernen|Der Deutschkurs geht bis zum Sommer.|The German course runs until the summer.|der|Kurse|
kurz|adj|short|person|Ricardo hat kurzes Haar.|Ricardo has short hair.|||
Laden|noun|shop|einkaufen|Im Buchladen können Sie Bücher kaufen.|You can buy books in the bookshop.|der|Läden|
Land|noun|country|reisen|Italien ist ein schönes Land.|Italy is a beautiful country.|das|Länder|
lang|adj|long|alltag|Die Jeans ist zu lang.|The jeans are too long.|||
lange|adv|for a long time|zeit|Wie lange fährt der Zug von Hamburg nach Berlin?|How long does the train take from Hamburg to Berlin?|||
langsam|adj|slow|alltag|Könnten Sie bitte etwas langsamer sprechen?|Could you please speak a little more slowly?|||
laut|adj|loud|alltag|Nicht so laut! Das Baby schläft.|Not so loud! The baby is sleeping.|||
Leben|noun|life|person|Das Leben in diesem Land ist teuer.|Life in this country is expensive.|das||
Lebensmittel|noun|groceries / foodstuffs|essen|Lebensmittel bekommen Sie im Supermarkt.|You get groceries at the supermarket.|die||
ledig|adj|single (unmarried)|person|Sind Sie verheiratet? – Nein. Ledig.|Are you married? – No. Single.|||
Lehrer|noun|teacher|lernen|Unsere Deutschlehrerin heißt Frau Müller.|Our German teacher is Mrs Müller.|der|Lehrer|Lehrerin
leicht|adj|easy / light|alltag|Der Koffer ist leicht.|The suitcase is light.|||
leider|adv|unfortunately|alltag|Leider kann ich nicht kommen.|Unfortunately I cannot come.|||
leise|adj|quiet|alltag|Seid leise. Die anderen schlafen schon.|Be quiet. The others are already asleep.|||
letzt|adj|last|zeit|Morgen ist der letzte Kurstag.|Tomorrow is the last day of the course.|||
Leute|noun|people|person|In der Disko sind viele Leute.|There are many people at the disco.|die||
Licht|noun|light|wohnen|Wo macht man hier das Licht an?|Where do you turn on the light here?|das|Lichter|
lieb|adj|dear / kind|person|Liebe Susanne, lieber Hans|Dear Susanne, dear Hans|||
lieber|adv|rather / preferably|alltag|Sie fährt lieber mit der Bahn.|She prefers to go by train.|||
Lied|noun|song|freizeit|Welches ist dein Lieblingslied?|Which is your favourite song?|das|Lieder|
links|adv|left|reisen|Gehen Sie die nächste Straße links.|Take the next street on the left.|||
Lkw|noun|lorry / truck|reisen|Dieser Lastkraftwagen ist sehr groß.|This lorry is very big.|der|Lkws|
Lokal|noun|pub / restaurant|essen|In unserer Straße gibt es ein neues Lokal.|There is a new place on our street.|das|Lokale|
Lösung|noun|solution / answer|lernen|Die Lösung ist ganz einfach.|The solution is quite simple.|die|Lösungen|
lustig|adj|funny|person|Frau Mertens ist lustig. Sie lacht immer.|Mrs Mertens is funny. She always laughs.|||
Mädchen|noun|girl|person|Junge oder Mädchen?|Boy or girl?|das|Mädchen|
man|pron|one / you (generic)|alltag|Hier darf man nicht rauchen.|You must not smoke here.|||
Mann|noun|man / husband|person|Mein Mann arbeitet bei der Polizei.|My husband works for the police.|der|Männer|
männlich|adj|male|person|Kreuzen Sie bitte an: „weiblich“ oder „männlich“.|Please tick: “female” or “male”.|||
Maschine|noun|machine|wohnen|Die Waschmaschine ist günstig.|The washing machine is good value.|die|Maschinen|
Meer|noun|sea|reisen|Wir machen Urlaub am Meer.|We are going on holiday by the sea.|das|Meere|
mehr|adv|more|alltag|Dieses Auto kostet 1.000 Euro mehr als das andere.|This car costs 1,000 euros more than the other.|||
mein|det|my|person|Mein Vater ist Arzt.|My father is a doctor.|||
meist|adj|most|alltag|Die meisten Norddeutschen sind sehr groß.|Most North Germans are very tall.|||
Mensch|noun|human / person|person|Die Menschen sind hier anders als bei uns.|The people here are different from at home.|der|Menschen|
Miete|noun|rent|wohnen|Die Miete für diese Wohnung ist 600 Euro.|The rent for this apartment is 600 euros.|die|Mieten|
Milch|noun|milk|essen|Die Milch steht im Kühlschrank.|The milk is in the fridge.|die||
mit|prep|with|alltag|Trinken Sie den Kaffee mit Milch?|Do you drink the coffee with milk?|||
Mitte|noun|middle / centre|alltag|Der Lehrer steht in der Mitte des Klassenzimmers.|The teacher is standing in the middle of the classroom.|die||
Möbel|noun|furniture|wohnen|Sind die Möbel neu?|Is the furniture new?|die||
möglich|adj|possible|alltag|Mit dieser Fahrkarte ist die Fahrt ab 9 Uhr möglich.|With this ticket travel is possible from 9 o'clock.|||
Moment|noun|moment|zeit|Einen Moment bitte.|One moment please.|der|Momente|
morgen|adv|tomorrow|zeit|Morgen beginnt die Schule um 10 Uhr.|Tomorrow school starts at 10 o'clock.|||
müde|adj|tired|person|Ich bin müde. Ich gehe schlafen.|I am tired. I'm going to sleep.|||
Mund|noun|mouth|person|Öffnen Sie den Mund.|Open your mouth.|der|Münder|
Mutter|noun|mother|person|Frau Berghäuser ist die Mutter von Michaela.|Mrs Berghäuser is Michaela's mother.|die|Mütter|
nach|prep|to / after|reisen|Ich fliege nach München.|I am flying to Munich.|||
nächst|adj|next|zeit|Sehen wir uns nächste Woche?|Shall we see each other next week?|||
Name|noun|name|person|Mein Name ist Thomas Schmidt.|My name is Thomas Schmidt.|der|Namen|
nein|adv|no|alltag|Fährst du auch nach München? – Nein, ich habe keine Zeit.|Are you also going to Munich? – No, I don't have time.|||
neu|adj|new|alltag|Ich bin der neue Kollege.|I am the new colleague.|||
nicht|adv|not|alltag|Das stimmt nicht.|That is not true.|||
nichts|pron|nothing|alltag|Das macht nichts.|Never mind. / That doesn't matter.|||
nie|adv|never|zeit|Er kommt nie pünktlich.|He never arrives on time.|||
noch|adv|still / yet / another|zeit|Wir warten noch fünf Minuten.|We'll wait another five minutes.|||
normal|adj|normal|alltag|75 kg. Sein Gewicht ist normal.|75 kg. His weight is normal.|||
Nummer|noun|number|dienste|Sie haben Zimmer Nummer zwölf.|You have room number twelve.|die|Nummern|
nur|adv|only|alltag|Ich möchte nur ein Glas Wasser.|I only want a glass of water.|||
oben|adv|upstairs / above|wohnen|Ich wohne oben.|I live upstairs.|||
Obst|noun|fruit|essen|Im Sommer ist das Obst billig.|In summer the fruit is cheap.|das||
oder|conj|or|alltag|Wann können Sie kommen – heute oder morgen?|When can you come – today or tomorrow?|||
geöffnet|adj|open|einkaufen|Der Laden ist samstags bis 16.00 Uhr geöffnet.|The shop is open on Saturdays until 4 p.m.|||
oft|adv|often|zeit|Petra treffe ich oft.|I often meet Petra.|||
ohne|prep|without|alltag|Ohne Geld kann er nichts kaufen.|Without money he cannot buy anything.|||
Öl|noun|oil|essen|Den Salat machen wir ohne Öl.|We'll make the salad without oil.|das||
Oma|noun|grandma|person|Meine Oma ist schon tot.|My grandma has already died.|die|Omas|
Opa|noun|grandpa|person|Mein Opa heißt Hans.|My grandpa is called Hans.|der|Opas|
Ordnung|noun|order|alltag|Das ist in Ordnung.|That's all right.|die||
Ort|noun|place / town|reisen|Der Ort liegt am Meer.|The place is by the sea.|der|Orte|
Papier|noun|paper|lernen|Hier sind Papier und Bleistift.|Here are paper and a pencil.|das||
Papiere|noun|papers / documents|dienste|Haben Sie Ihre Papiere dabei?|Do you have your papers with you?|die||
Partner|noun|partner|person|Sie ist meine Partnerin.|She is my partner.|der|Partner|Partnerin
Party|noun|party|freizeit|Heute Abend machen wir eine Party.|This evening we are having a party.|die|Partys|
Pass|noun|passport|reisen|Im Hotel brauchst du deinen Pass.|You need your passport at the hotel.|der|Pässe|
Pause|noun|break|arbeit|Von 12.00 bis 12.30 Uhr haben wir Mittagspause.|From 12:00 to 12:30 we have a lunch break.|die|Pausen|
Plan|noun|map / plan|reisen|Ich kaufe mir einen Stadtplan.|I'll buy myself a city map.|der|Pläne|
Platz|noun|place / seat / square|reisen|Tut mir leid, der Platz ist besetzt.|Sorry, the seat is taken.|der|Plätze|
Polizei|noun|police|dienste|Holen Sie die Polizei!|Get the police!|die||
Pommes frites|noun|chips / fries|essen|Die Kinder essen Hähnchen mit Pommes frites.|The children eat chicken with fries.|die||
Post|noun|post office / mail|dienste|Wo ist die Post, bitte?|Where is the post office, please?|die||
Postleitzahl|noun|postcode|dienste|Wie ist Ihre Postleitzahl?|What is your postcode?|die|Postleitzahlen|
Praktikum|noun|internship|arbeit|Ich mache ein Praktikum bei Siemens.|I am doing an internship at Siemens.|das|Praktika|
Praxis|noun|doctor's practice|dienste|Die Praxis ist ab acht Uhr geöffnet.|The practice opens from eight o'clock.|die|Praxen|
Preis|noun|price|einkaufen|Die Preise sind hoch.|The prices are high.|der|Preise|
Problem|noun|problem|alltag|Mein Problem ist die Sprache.|My problem is the language.|das|Probleme|
Prospekt|noun|brochure|reisen|Bitte schicken Sie mir einen Prospekt von Ihrem Hotel.|Please send me a brochure of your hotel.|der|Prospekte|
Prüfung|noun|exam|lernen|Die Prüfung ist am Montag um 8.00 Uhr.|The exam is on Monday at 8:00.|die|Prüfungen|
pünktlich|adj|on time|zeit|Der Bus fährt pünktlich um acht Uhr.|The bus leaves on time at eight o'clock.|||
Raum|noun|room (space)|lernen|Der Unterricht ist in Raum 332.|The lesson is in room 332.|der|Räume|
Rechnung|noun|bill|essen|Die Rechnung, bitte.|The bill, please.|die|Rechnungen|
rechts|adv|right|reisen|Die Schillerstraße ist hier rechts.|Schillerstraße is on the right here.|||
Regen|noun|rain|umwelt|Bei diesem Regen gehe ich nicht raus.|I'm not going out in this rain.|der||
Reis|noun|rice|essen|Ich esse gern Reis.|I like eating rice.|der||
Reise|noun|trip / journey|reisen|Wir machen eine Reise nach Österreich.|We are taking a trip to Austria.|die|Reisen|
Reisebüro|noun|travel agency|reisen|Mein Mann arbeitet im Reisebüro.|My husband works at the travel agency.|das|Reisebüros|
Reiseführer|noun|guidebook / tour guide|reisen|Ich kaufe mir einen Reiseführer von Berlin.|I'll buy myself a guidebook to Berlin.|der|Reiseführer|
Reparatur|noun|repair|dienste|Die Reparatur ist sehr teuer.|The repair is very expensive.|die|Reparaturen|
Restaurant|noun|restaurant|essen|Wir essen heute in einem Restaurant.|We're eating in a restaurant today.|das|Restaurants|
Rezeption|noun|reception|reisen|Fragen Sie bitte im Hotel an der Rezeption.|Please ask at hotel reception.|die||
richtig|adj|correct / right|lernen|Habe ich das richtig verstanden?|Did I understand that correctly?|||
ruhig|adj|quiet / calm|reisen|Ich möchte ein ruhiges Zimmer.|I would like a quiet room.|||
Saft|noun|juice|essen|Möchtest du einen Apfelsaft?|Would you like an apple juice?|der|Säfte|
Salat|noun|salad|essen|Wie schmeckt dir der Salat?|How does the salad taste to you?|der||
Salz|noun|salt|essen|Herr Ober, kann ich bitte Salz haben?|Waiter, can I have salt please?|das||
Satz|noun|sentence|lernen|Dieser Satz ist sehr einfach.|This sentence is very simple.|der|Sätze|
S-Bahn|noun|urban railway|reisen|Ich nehme lieber die S-Bahn.|I prefer to take the S-Bahn.|die|S-Bahnen|
Schalter|noun|counter / window|dienste|Gehen Sie bitte zum Schalter drei!|Please go to counter three!|der|Schalter|
Schild|noun|sign|reisen|Haben Sie nicht das Schild gesehen?|Didn't you see the sign?|das|Schilder|
Schinken|noun|ham|essen|Ich möchte gern ein Schinkenbrot.|I would like a ham sandwich.|der||
schlecht|adj|bad / unwell|alltag|Mir ist schlecht!|I feel sick!|||
geschlossen|adj|closed|einkaufen|Die Bank hat am Samstag geschlossen.|The bank is closed on Saturday.|||
Schluss|noun|end / finish|alltag|Ich muss jetzt Schluss machen.|I have to hang up now.|der||
Schlüssel|noun|key|wohnen|Ich gebe Ihnen noch den Zimmerschlüssel.|I'll also give you the room key.|der|Schlüssel|
schnell|adj|fast|reisen|Er fährt schnell.|He drives fast.|||
schon|adv|already|zeit|Ist das Essen schon fertig?|Is the food already ready?|||
schön|adj|beautiful / nice|alltag|Schönen Urlaub!|Have a nice holiday!|||
Schrank|noun|wardrobe / cupboard|wohnen|Die Gläser stehen im Schrank.|The glasses are in the cupboard.|der|Schränke|
Schuh|noun|shoe|einkaufen|Zieh die Schuhe aus!|Take off your shoes!|der|Schuhe|
Schule|noun|school|lernen|Meine Tochter geht schon in die Schule.|My daughter already goes to school.|die|Schulen|
Schüler|noun|pupil / student|lernen|In meinem Kurs sind acht Schülerinnen und fünf Schüler.|In my course there are eight female and five male pupils.|der|Schüler|Schülerin
schwer|adj|heavy / difficult|alltag|Ist Ihr Gepäck sehr schwer?|Is your luggage very heavy?|||
Schwester|noun|sister|person|Meine Schwester kommt am Dienstag.|My sister is coming on Tuesday.|die|Schwestern|
Schwimmbad|noun|swimming pool|freizeit|Kommst du mit ins Schwimmbad?|Are you coming to the pool?|das|Schwimmbäder|
See|noun|lake|umwelt|Komm, wir fahren zum Starnberger See.|Come on, let's go to Lake Starnberg.|der|Seen|
Sehenswürdigkeit|noun|sight / attraction|reisen|Welche Sehenswürdigkeiten gibt es in Frankfurt?|What sights are there in Frankfurt?|die|Sehenswürdigkeiten|
sehr|adv|very|alltag|Danke sehr!|Thank you very much!|||
seit|prep|since / for|zeit|Ich wohne seit drei Jahren in Köln.|I have lived in Cologne for three years.|||
selbstständig|adj|self-employed|arbeit|Er ist selbstständig.|He is self-employed.|||
sich|pron|oneself|alltag|Sie müssen sich erst anmelden.|You have to register first.|||
sie|pron|she / they|person|Wie heißt sie?|What is her name?|||
Sie|pron|you (formal)|person|Wie heißen Sie, bitte?|What is your name, please?|||
so|adv|so / like this|alltag|Sie müssen das so machen!|You have to do it like this!|||
Sofa|noun|sofa|wohnen|Das Sofa ist neu.|The sofa is new.|das|Sofas|
sofort|adv|immediately|zeit|Bitte antworten Sie sofort.|Please answer immediately.|||
Sohn|noun|son|person|Das ist Hans, mein Sohn.|This is Hans, my son.|der|Söhne|
Sonne|noun|sun|umwelt|Die Sonne scheint.|The sun is shining.|die||
spät|adj|late|zeit|Es ist schon spät, ich muss gehen.|It is already late, I have to go.|||
später|adv|later|zeit|Das können wir später machen.|We can do that later.|||
Speisekarte|noun|menu|essen|Bringen Sie mir die Speisekarte, bitte.|Please bring me the menu.|die|Speisekarten|
Sport|noun|sport|freizeit|Ich mache viel Sport.|I do a lot of sport.|der||
Sprache|noun|language|lernen|Welche Sprachen sprichst du?|Which languages do you speak?|die|Sprachen|
Stadt|noun|city / town|reisen|Heidelberg ist eine alte Stadt.|Heidelberg is an old city.|die|Städte|
Stelle|noun|job / place|arbeit|Ich habe eine neue Stelle.|I have a new job.|die|Stellen|
Stock|noun|floor / storey|wohnen|Unsere Wohnung liegt im ersten Stock.|Our apartment is on the first floor.|der|Stöcke|
Straße|noun|street|reisen|In welcher Straße wohnen Sie?|Which street do you live in?|die|Straßen|
Straßenbahn|noun|tram|reisen|Wo fährt die Straßenbahn ab?|Where does the tram leave from?|die|Straßenbahnen|
Studium|noun|studies (university)|lernen|Das Studium beginnt im Oktober.|The studies begin in October.|das|Studien|
Student|noun|university student|lernen|Ich bin Studentin.|I am a student.|der|Studenten|Studentin
Stunde|noun|hour / lesson|zeit|Ich bin in einer Stunde zurück.|I'll be back in an hour.|die|Stunden|
Tasche|noun|bag|einkaufen|Ich habe die Schlüssel in der Tasche.|I have the keys in the bag.|die|Taschen|
Taxi|noun|taxi|reisen|Er fährt mit dem Taxi.|He is going by taxi.|das|Taxis|
Tee|noun|tea|essen|Ich trinke morgens immer Tee.|I always drink tea in the morning.|der||
Teil|noun|part|alltag|Lies bitte auch den zweiten Teil.|Please also read the second part.|der|Teile|
Telefon|noun|telephone|dienste|Haben Sie Telefon?|Do you have a telephone?|das|Telefone|
Termin|noun|appointment|dienste|Am besten machen wir sofort einen Termin.|It's best if we make an appointment right away.|der|Termine|
Test|noun|test|lernen|Der Test war einfach.|The test was easy.|der|Tests|
teuer|adj|expensive|einkaufen|Das ist mir zu teuer.|That is too expensive for me.|||
Text|noun|text|lernen|Lesen Sie bitte diesen Text.|Please read this text.|der|Texte|
Thema|noun|topic|lernen|Wir sprechen heute über das Thema „Essen und Trinken“.|Today we are talking about the topic “food and drink”.|das|Themen|
Ticket|noun|ticket|reisen|Wie viel kostet das Ticket?|How much does the ticket cost?|das|Tickets|
Tisch|noun|table|wohnen|Die Fotos liegen auf dem Tisch.|The photos are on the table.|der|Tische|
Tochter|noun|daughter|person|Das ist meine Tochter Katharina.|This is my daughter Katharina.|die|Töchter|
Toilette|noun|toilet|reisen|Wo ist die Toilette, bitte?|Where is the toilet, please?|die|Toiletten|
Tomate|noun|tomato|essen|Die Tomate ist noch grün.|The tomato is still green.|die|Tomaten|
tot|adj|dead|person|Sein Vater ist schon lange tot.|His father has been dead for a long time.|||
Treppe|noun|stairs|wohnen|Die Toilette? Die Treppe hoch und dann links.|The toilet? Up the stairs and then left.|die|Treppen|
tschüss|phrase|bye|alltag|Junge Leute sagen meistens „tschüss!“|Young people usually say “tschüss!”|||
über|prep|over / about / via|alltag|Gehen Sie hier über die Straße.|Cross the street here.|||
Uhr|noun|clock / o'clock|zeit|Es ist vier Uhr.|It is four o'clock.|die|Uhren|
um|prep|at (time) / around|zeit|Er kommt um sieben Uhr.|He is coming at seven o'clock.|||
und|conj|and|alltag|Peter und Helmut sind meine Söhne.|Peter and Helmut are my sons.|||
unser|det|our|person|Das ist unsere Lehrerin.|That is our teacher.|||
unten|adv|downstairs / below|wohnen|Er wohnt ganz unten im Haus.|He lives right at the bottom of the house.|||
unter|prep|under / among|alltag|Unter uns wohnt eine Familie mit drei Kindern.|Below us lives a family with three children.|||
Unterricht|noun|lessons / class|lernen|Wir haben Unterricht von 8.00 bis 12.00 Uhr.|We have lessons from 8:00 to 12:00.|der||
Unterschrift|noun|signature|dienste|Hier fehlt noch Ihre Unterschrift.|Your signature is still missing here.|die|Unterschriften|
Urlaub|noun|holiday / vacation|arbeit|Ich nehme im September Urlaub.|I am taking holiday in September.|der||
Vater|noun|father|person|Mein Vater ist Arbeiter.|My father is a worker.|der|Väter|
verboten|adj|forbidden|alltag|Hier ist Rauchen verboten.|Smoking is forbidden here.|||
Verein|noun|club / association|freizeit|Es gibt einen neuen Sportverein in der Stadt.|There is a new sports club in town.|der|Vereine|
verheiratet|adj|married|person|Ich bin verheiratet und habe drei Kinder.|I am married and have three children.|||
Verkäufer|noun|salesperson|einkaufen|Meine Mutter ist Verkäuferin im Kaufhaus.|My mother is a sales assistant in the department store.|der|Verkäufer|Verkäuferin
Vermieter|noun|landlord|wohnen|Unser Vermieter heißt Huber.|Our landlord is called Huber.|der|Vermieter|Vermieterin
Verwandte|noun|relative|person|Peter besucht seine Verwandten in Polen.|Peter is visiting his relatives in Poland.|der|Verwandten|
viel|adv|a lot / much|alltag|Hier regnet es viel.|It rains a lot here.|||
vielleicht|adv|maybe / perhaps|alltag|Ich komme vielleicht mit dem Bus.|I might come by bus.|||
von|prep|from / of|alltag|Das Auto von Felix ist kaputt.|Felix's car is broken.|||
vor|prep|in front of / before|zeit|Der Termin war vor einer Stunde.|The appointment was an hour ago.|||
Vorname|noun|first name|person|Ich heiße Müller, mein Vorname ist Eva.|My name is Müller, my first name is Eva.|der|Vornamen|
Vorsicht|noun|caution|alltag|Vorsicht! Da kommt ein Auto.|Watch out! A car is coming.|die||
Vorwahl|noun|area code / dialling code|dienste|Wie ist die Vorwahl von München?|What is the dialling code for Munich?|die|Vorwahlen|
wann|adv|when|zeit|Wann bist du fertig?|When will you be ready?|||
warum|adv|why|alltag|Warum kommt er nicht?|Why isn't he coming?|||
was|pron|what|alltag|Was ist das?|What is that?|||
Wasser|noun|water|essen|Ein Glas Wasser, bitte.|A glass of water, please.|das||
weiblich|adj|female|person|Kreuzen Sie bitte an: „weiblich“ oder „männlich“.|Please tick: “female” or “male”.|||
Wein|noun|wine|essen|Nein danke, ich möchte keinen Wein.|No thanks, I don't want any wine.|der|Weine|
weit|adj|far|reisen|Zum Bahnhof ist es nicht weit.|It is not far to the station.|||
weiter|adv|further / on|reisen|Der Bus fährt nicht weiter.|The bus doesn't go any further.|||
welch|det|which|alltag|Welches Buch möchtest du?|Which book would you like?|||
Welt|noun|world|umwelt|Es gibt viele Probleme auf der Welt.|There are many problems in the world.|die||
wenig|adv|little / few|alltag|Ich habe leider nur wenig verstanden.|Unfortunately I only understood a little.|||
wer|pron|who|alltag|Wer ist das?|Who is that?|||
Wetter|noun|weather|umwelt|Wir hatten schlechtes Wetter.|We had bad weather.|das||
wichtig|adj|important|alltag|Dieses Formular ist sehr wichtig.|This form is very important.|||
wie|adv|how / as|alltag|Wie heißt du?|What is your name?|||
Wiederhören|noun|goodbye (on the phone)|dienste|Also auf Wiederhören!|Goodbye (on the phone)!|das||
Wiedersehen|noun|goodbye|alltag|Auf Wiedersehen!|Goodbye!|das||
willkommen|adj|welcome|alltag|Herzlich willkommen!|A warm welcome!|||
Wind|noun|wind|umwelt|Der Wind kommt aus Osten.|The wind is coming from the east.|der||
wir|pron|we|person|Wir lernen Deutsch.|We are learning German.|||
wo|adv|where|alltag|Wo ist die Post?|Where is the post office?|||
woher|adv|from where|reisen|Woher kommen Sie?|Where do you come from?|||
wohin|adv|where to|reisen|Wohin fährt dieser Bus?|Where is this bus going?|||
Wohnung|noun|apartment / flat|wohnen|Seit wann haben Sie diese Wohnung?|How long have you had this apartment?|die|Wohnungen|
Wort|noun|word|lernen|Ich kenne das Wort nicht.|I don't know the word.|das|Wörter|
wunderbar|adj|wonderful|alltag|Das Essen schmeckt wunderbar.|The food tastes wonderful.|||
Zeit|noun|time|zeit|Ich habe heute keine Zeit.|I have no time today.|die|Zeiten|
Zeitung|noun|newspaper|freizeit|Ich lese gern Zeitung.|I like reading the newspaper.|die|Zeitungen|
Zigarette|noun|cigarette|einkaufen|Wie teuer sind die Zigaretten?|How expensive are the cigarettes?|die|Zigaretten|
Zimmer|noun|room|wohnen|Die Wohnung hat drei Zimmer.|The apartment has three rooms.|das|Zimmer|
Zoll|noun|customs|reisen|Wir müssen noch durch den Zoll.|We still have to go through customs.|der||
zu|prep|to / too / closed|alltag|Ich gehe zu Fuß.|I am going on foot.|||
zufrieden|adj|satisfied|alltag|Ich bin mit der Wohnung zufrieden.|I am happy with the apartment.|||
Zug|noun|train|reisen|Ich fahre gern mit dem Zug.|I like going by train.|der|Züge|
zurück|adv|back|reisen|Einmal Frankfurt und zurück.|One to Frankfurt and back.|||
zusammen|adv|together|alltag|Sollen wir zusammen essen gehen?|Shall we go and eat together?|||
zwischen|prep|between|alltag|Heidelberg liegt zwischen Frankfurt und Stuttgart.|Heidelberg is between Frankfurt and Stuttgart.|||
Antwortbogen|noun|answer sheet|lernen|Schreiben Sie Ihre Lösungen bitte auf den Antwortbogen.|Please write your answers on the answer sheet.|der|Antwortbögen|
zurzeit|adv|at the moment|zeit|Zurzeit habe ich sehr viel zu tun.|At the moment I have a lot to do.|||
wie viel|phrase|how much / how many|zahlen|Wie viel Milch nehmen Sie?|How much milk do you take?|||
was für ein|phrase|what kind of|alltag|Was für eine Farbe möchten Sie?|What kind of colour would you like?|||
weh tun|phrase|to hurt|person|Mein Bein tut weh.|My leg hurts.|||
Rad fahren|phrase|to cycle|freizeit|Das Kind kann schon Rad fahren.|The child can already ride a bike.|||
Alles Gute|phrase|all the best|alltag|Alles Gute!|All the best!|||
Guten Appetit|phrase|enjoy your meal|essen|Guten Appetit!|Enjoy your meal!|||
Auf Wiedersehen|phrase|goodbye|alltag|Auf Wiedersehen.|Goodbye.|||
Guten Morgen|phrase|good morning|zeit|Guten Morgen!|Good morning!|||
Guten Tag|phrase|good day / hello|alltag|Guten Tag, Frau Schmitt!|Good day, Mrs Schmitt!|||
Viel Glück|phrase|good luck|alltag|Viel Glück!|Good luck!|||
in Ordnung|phrase|all right / okay|alltag|Das ist in Ordnung.|That's all right.|||
zum Beispiel|phrase|for example|lernen|Viele meiner Verwandten, z. B. meine beiden Brüder, arbeiten auch hier.|Many of my relatives, e.g. my two brothers, also work here.|||
Kreditkarte|noun|credit card|einkaufen|Kann ich auch mit Karte zahlen?|Can I also pay by card?|die|Kreditkarten|
Feierabend|noun|end of the workday|arbeit|Nach dem Feierabend gehe ich nach Hause.|After work I go home.|der||
Vollpension|noun|full board|reisen|Möchten Sie Vollpension oder Halbpension?|Would you like full board or half board?|die||
Stadtplan|noun|city map|reisen|Ich kaufe mir einen Stadtplan.|I'll buy myself a city map.|der|Stadtpläne|
Lieblings|adj|favourite (in compounds)|freizeit|Mein Lieblingsfilm ist „Schwarze Augen“.|My favourite film is “Black Eyes”.|||
Deutschland|noun|Germany|reisen|Ich wohne in Deutschland.|I live in Germany.|das||
Deutsche|noun|German (person)|person|Ein Deutscher, eine Deutsche|a German man, a German woman|der|Deutschen|Deutsche
deutsch|adj|German|lernen|Wie heißt das auf Deutsch?|What is that called in German?|||
Europa|noun|Europe|reisen|Deutschland liegt in Europa.|Germany is in Europe.|das||
Europäer|noun|European|person|Sie ist Europäerin.|She is a European.|der|Europäer|Europäerin
europäisch|adj|European|reisen|Das ist eine europäische Stadt.|That is a European city.|||
Euro|noun|euro|zahlen|Das macht 5 Euro 95.|That comes to 5 euros 95.|der|Euro|
Cent|noun|cent|zahlen|100 Cent sind 1 Euro.|100 cents are 1 euro.|der|Cent|
Norden|noun|north|umwelt|Der Wind kommt aus Norden.|The wind is coming from the north.|der||
Süden|noun|south|umwelt|Im Süden ist es wärmer.|It is warmer in the south.|der||
Westen|noun|west|umwelt|Die Sonne geht im Westen unter.|The sun sets in the west.|der||
Osten|noun|east|umwelt|Der Wind kommt aus Osten.|The wind is coming from the east.|der||
schwarz|adj|black|einkaufen|Das Auto ist schwarz.|The car is black.|||
weiß|adj|white|einkaufen|Haben Sie das auch in Weiß?|Do you have that in white too?|||
grau|adj|grey|einkaufen|Der Himmel ist grau.|The sky is grey.|||
rot|adj|red|einkaufen|Die Tomate ist rot.|The tomato is red.|||
blau|adj|blue|einkaufen|Er hat blaue Augen.|He has blue eyes.|||
gelb|adj|yellow|einkaufen|Die Banane ist gelb.|The banana is yellow.|||
grün|adj|green|einkaufen|Die Tomate ist noch grün.|The tomato is still green.|||
braun|adj|brown|einkaufen|Sie hat braune Haare.|She has brown hair.|||
Frühling|noun|spring|zeit|Im Frühling ist es schön warm.|In spring it is nicely warm.|der||
Sommer|noun|summer|zeit|Im Sommer ist es bis 21 Uhr hell.|In summer it is light until 9 p.m.|der||
Herbst|noun|autumn|zeit|Im Herbst fängt die Schule wieder an.|School starts again in autumn.|der||
Winter|noun|winter|zeit|Im Winter ist es kalt.|It is cold in winter.|der||
Januar|noun|January|zeit|Im Januar ist es kalt.|It is cold in January.|der||
Februar|noun|February|zeit|Mein Geburtstag ist im Februar.|My birthday is in February.|der||
März|noun|March|zeit|Heute ist der erste März.|Today is the first of March.|der||
April|noun|April|zeit|Berlin, 12. April|Berlin, 12 April|der||
Mai|noun|May|zeit|Im Mai ist schönes Wetter.|The weather is nice in May.|der||
Juni|noun|June|zeit|Wir machen Anfang Juni Urlaub.|We take holiday at the beginning of June.|der||
Juli|noun|July|zeit|Wir machen Anfang Juli Urlaub.|We take holiday at the beginning of July.|der||
August|noun|August|zeit|Im August ist es sehr heiß.|It is very hot in August.|der||
September|noun|September|zeit|Ich nehme im September Urlaub.|I take holiday in September.|der||
Oktober|noun|October|zeit|Das Studium beginnt im Oktober.|Studies begin in October.|der||
November|noun|November|zeit|Im November regnet es oft.|It often rains in November.|der||
Dezember|noun|December|zeit|Weihnachten ist im Dezember.|Christmas is in December.|der||
Montag|noun|Monday|zeit|Am nächsten Montag geht es leider nicht.|Next Monday unfortunately doesn't work.|der||
Dienstag|noun|Tuesday|zeit|Meine Schwester kommt am Dienstag.|My sister is coming on Tuesday.|der||
Mittwoch|noun|Wednesday|zeit|Am Mittwoch habe ich Unterricht.|I have class on Wednesday.|der||
Donnerstag|noun|Thursday|zeit|Am Donnerstag gehe ich zum Arzt.|On Thursday I go to the doctor.|der||
Freitag|noun|Friday|zeit|Wir treffen uns immer freitags.|We always meet on Fridays.|der||
Samstag|noun|Saturday|zeit|Die Bank hat am Samstag geschlossen.|The bank is closed on Saturday.|der||
Sonntag|noun|Sunday|zeit|Am Sonntag frühstücke ich gern im Bett.|On Sunday I like to have breakfast in bed.|der||
Wochenende|noun|weekend|zeit|Am Wochenende haben wir mehrere Gäste.|At the weekend we have several guests.|das|Wochenenden|
Wochentag|noun|weekday|zeit|Welcher Wochentag ist heute?|What day of the week is it today?|der|Wochentage|
Morgen|noun|morning|zeit|Guten Morgen!|Good morning!|der||
Vormittag|noun|morning (before noon)|zeit|Am Vormittag habe ich Unterricht.|I have class in the morning.|der|Vormittage|
Mittag|noun|midday / noon|zeit|Um Mittag esse ich.|I eat at midday.|der||
Nachmittag|noun|afternoon|zeit|Am Nachmittag spiele ich Fußball.|In the afternoon I play football.|der|Nachmittage|
Abend|noun|evening|zeit|Was machst du heute Abend?|What are you doing this evening?|der|Abende|
Nacht|noun|night|zeit|Heute Nacht war das Licht an.|Last night the light was on.|die|Nächte|
Tag|noun|day|zeit|Heute ist ein schöner Tag.|Today is a beautiful day.|der|Tage|
Woche|noun|week|zeit|Sehen wir uns nächste Woche?|Shall we see each other next week?|die|Wochen|
Jahr|noun|year|zeit|Ich wohne seit drei Jahren in Köln.|I have lived in Cologne for three years.|das|Jahre|
Minute|noun|minute|zeit|Der Zug kommt in fünf Minuten.|The train arrives in five minutes.|die|Minuten|
Sekunde|noun|second|zeit|Eine Sekunde, bitte.|One second, please.|die|Sekunden|
Meter|noun|metre|zahlen|Der Mount Everest ist 8.880 Meter hoch.|Mount Everest is 8,880 metres high.|der||
Zentimeter|noun|centimetre|zahlen|Ein Zentimeter ist 1 cm.|One centimetre is 1 cm.|der||
Kilometer|noun|kilometre|zahlen|Von Mainz nach Frankfurt sind es circa fünfzig Kilometer.|From Mainz to Frankfurt it is about fifty kilometres.|der||
Quadratmeter|noun|square metre|zahlen|Die Wohnung hat 60 Quadratmeter.|The apartment is 60 square metres.|der||
Liter|noun|litre|zahlen|Ein Liter Milch, bitte.|A litre of milk, please.|der||
Gramm|noun|gram|zahlen|Ein Gramm ist 1 g.|One gram is 1 g.|das||
Pfund|noun|pound (500 g)|zahlen|Ein Pfund Äpfel bitte.|A pound of apples, please.|das||
Kilo|noun|kilo|zahlen|Ein Kilo Birnen, bitte!|A kilo of pears, please!|das||
Prozent|noun|percent|zahlen|Ein Prozent = 1 %.|One percent = 1%.|das||
halb|adj|half|zeit|Es ist halb drei.|It is half past two.|||
Viertel|noun|quarter|zeit|Es ist Viertel nach zwei.|It is a quarter past two.|das||
erste|adj|first|zahlen|Heute ist der erste März.|Today is the first of March.|||
zweite|adj|second|zahlen|Lies bitte auch den zweiten Teil.|Please also read the second part.|||
dritte|adj|third|zahlen|Die dritte Straße links.|The third street on the left.|||
vierte|adj|fourth|zahlen|Berlin, zwölfter Vierter.|Berlin, the twelfth of April.|||
eins|num|one|zahlen|Eins, zwei, drei.|One, two, three.|||
zwei|num|two|zahlen|Ich habe zwei Kinder.|I have two children.|||
drei|num|three|zahlen|Die Wohnung hat drei Zimmer.|The apartment has three rooms.|||
vier|num|four|zahlen|Ich muss immer um vier Uhr aufstehen.|I always have to get up at four.|||
fünf|num|five|zahlen|Der Preis für den Eintritt ist 5 Euro.|The admission price is 5 euros.|||
sechs|num|six|zahlen|Wir haben Unterricht von 8.00 bis 12.00 Uhr, sechs Stunden.|We have class from 8 to 12, six hours.|||
sieben|num|seven|zahlen|Er kommt um sieben Uhr.|He is coming at seven o'clock.|||
acht|num|eight|zahlen|Der Bus fährt pünktlich um acht Uhr.|The bus leaves on time at eight.|||
neun|num|nine|zahlen|Um neun Uhr liegt Judith noch im Bett.|At nine o'clock Judith is still in bed.|||
zehn|num|ten|zahlen|Die Jacke kostet nur 10 Euro.|The jacket only costs 10 euros.|||
elf|num|eleven|zahlen|Der Abflug ist um elf Uhr zwanzig.|The departure is at eleven twenty.|||
zwölf|num|twelve|zahlen|Wir fahren um zwölf Uhr ab.|We leave at twelve o'clock.|||
dreizehn|num|thirteen|zahlen|Es ist dreizehn Uhr.|It is thirteen hundred hours.|||
vierzehn|num|fourteen|zahlen|Das Gespräch ist um vierzehn Uhr.|The meeting is at 2 p.m.|||
fünfzehn|num|fifteen|zahlen|Es darf nicht mehr als 15 Euro kosten.|It must not cost more than 15 euros.|||
sechzehn|num|sixteen|zahlen|Der Laden ist bis sechzehn Uhr geöffnet.|The shop is open until four p.m.|||
siebzehn|num|seventeen|zahlen|Es ist siebzehn Uhr.|It is five p.m.|||
achtzehn|num|eighteen|zahlen|Sind Sie über achtzehn?|Are you over eighteen?|||
neunzehn|num|nineteen|zahlen|neunzehnhundertneunundneunzig|nineteen ninety-nine|||
zwanzig|num|twenty|zahlen|Ich bin dreiundzwanzig.|I am twenty-three.|||
dreißig|num|thirty|zahlen|Heute haben wir dreißig Grad.|Today it is thirty degrees.|||
vierzig|num|forty|zahlen|Haben Sie das auch in Größe 40?|Do you have that in size 40 too?|||
fünfzig|num|fifty|zahlen|Gute Bücher sind oft sehr teuer, mehr als fünfzig Euro.|Good books are often very expensive, more than fifty euros.|||
sechzig|num|sixty|zahlen|Die Miete ist 600 Euro.|The rent is 600 euros.|||
siebzig|num|seventy|zahlen|Mein Großvater ist schon über siebzig.|My grandfather is already over seventy.|||
achtzig|num|eighty|zahlen|Mein Großvater ist schon 80.|My grandfather is already 80.|||
neunzig|num|ninety|zahlen|Es ist Viertel vor zehn, also fast neunzig Minuten nach acht.|It is a quarter to ten.|||
hundert|num|hundred|zahlen|100 Cent sind 1 Euro.|100 cents are 1 euro.|||
tausend|num|thousand|zahlen|Dieses Auto kostet 1.000 Euro mehr.|This car costs 1,000 euros more.|||
Million|noun|million|zahlen|eine Million|one million|die|Millionen|
Milliarde|noun|billion|zahlen|eine Milliarde|one billion|die|Milliarden|
null|num|zero|zahlen|null Uhr drei|zero hours three|||
Sonnabend|noun|Saturday (north/east)|zeit|Der Samstag heißt auch Sonnabend.|Saturday is also called Sonnabend.|der||
Frühjahr|noun|spring|zeit|Im Frühjahr fängt es an zu blühen.|In spring things start to bloom.|das||
Käse|noun|cheese|essen|Ein Brötchen mit Butter und Käse.|A roll with butter and cheese.|der||
Apotheke|noun|pharmacy|dienste|Dieses Medikament bekommen Sie in der Apotheke.|You get this medicine at the pharmacy.|die|Apotheken|
Medikament|noun|medicine|dienste|Dieses Medikament bekommen Sie in der Apotheke.|You get this medicine at the pharmacy.|das|Medikamente|
Supermarkt|noun|supermarket|einkaufen|Lebensmittel bekommen Sie im Supermarkt.|You get groceries at the supermarket.|der|Supermärkte|
Museum|noun|museum|freizeit|Ich gehe oft ins Museum.|I often go to the museum.|das|Museen|
Kaufhaus|noun|department store|einkaufen|Meine Mutter ist Verkäuferin im Kaufhaus.|My mother is a sales assistant in the department store.|das|Kaufhäuser|
Wörterbuch|noun|dictionary|lernen|In diesem Wörterbuch finden Sie mehr als 20.000 Wörter.|In this dictionary you will find more than 20,000 words.|das|Wörterbücher|
Antwortbogen|noun|answer sheet|lernen|Schreiben Sie Ihre Lösungen auf den Antwortbogen.|Write your answers on the answer sheet.|der|Antwortbögen|
`.trim();

function slug(lemma: string, pos: string, en: string) {
  const base = `${lemma}-${pos}-${en.slice(0, 18)}`
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base;
}

export const LEXICON_WORDS: Word[] = RAW.split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .map((line) => {
    const [lemma, pos, en, topic, example, exampleEn, article, plural, feminine] =
      line.split("|");
    const word: Word = {
      id: slug(lemma ?? "", pos ?? "", en ?? ""),
      lemma: lemma ?? "",
      display:
        article && lemma ? `${article} ${lemma}` : (lemma ?? ""),
      pos: (pos ?? "other") as Pos,
      en: en ?? "",
      topic: (topic ?? "alltag") as TopicId,
      example: example ?? "",
      exampleEn: exampleEn ?? "",
    };
    if (article === "der" || article === "die" || article === "das") {
      word.article = article;
    }
    if (plural) word.plural = plural;
    if (feminine) word.feminine = feminine;
    return word;
  })
  .filter((w, i, arr) => arr.findIndex((x) => x.id === w.id) === i);
