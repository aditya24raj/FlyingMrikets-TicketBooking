// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

String flightIds = '["a015i00000VbyJoAAJ"]';
String passengerType = 'Adult';

// deserialize JSON
Type idArrType = Type.forName('List<string>');
List<string> flightIdList = (List<string>) JSON.deserialize(flightIds, idArrType);

Map<String, List<Fare__c>> flightFares = new Map<String, List<Fare__c>>();
for (String flightId : flightIdList) {
    List<Fare__c> f = [SELECT Name, Price__c FROM Fare__c WHERE Flight__r.Id = :flightId AND Passenger_Type__c = :passengerType];
    flightFares.put(flightId, f);
}

system.debug(flightFares);
system.debug(flightFares.size());