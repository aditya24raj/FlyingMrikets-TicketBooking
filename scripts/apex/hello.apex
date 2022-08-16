// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

String passengerName = 'aditya';
String passengerEmail = 'aditya2400raj@gmail.com';
String onboardingFrom = 'a005i000008Mv7iAAC';
String arrivingTo = 'a005i000008BcDmAAK';
String flightId = 'a015i00000VbyJoAAJ';
String passengerType = 'Adult';
String fareType = 'a045i000007LvnwAAC';
String paymentMode = 'Google Pay';

insert new Booking__c(
            Passenger_Name__c = passengerName,
            Passenger_Email__c = passengerEmail,
            Onboarding_From__c = onboardingFrom,
            Arriving_To__c = arrivingTo,
            Flight_Name__c = flightId,
            Passenger_Type__c = passengerType,
            Fare_Type__c = fareType,
            Payment_Mode__c = paymentMode
        );