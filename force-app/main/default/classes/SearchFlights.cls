public with sharing class SearchFlights {
    @AuraEnabled
    public static List<Airport__c>  getFromAirports(){
        return [SELECT Name FROM Airport__c];
    }

    @AuraEnabled
    public static List<Airport__c>  getToAirports(String fromAirportId){
        return [SELECT Name FROM Airport__c WHERE Id != :fromAirportId];
    }

    @AuraEnabled
    public static string getRouteDescripter(String airportFromId, String airportToId){
        Airport__c airportFrom =  [SELECT Name FROM Airport__c WHERE Id = :airportFromId];
        Airport__c airportTo =  [SELECT Name FROM Airport__c WHERE Id = :airportToId];

        return airportFrom.Name + ' to ' + airportTo.Name;
        
    }

    @AuraEnabled
    public static List<Flight__c> getFlights(String airportFromId, String airportToId){
        return [
            SELECT Name, Depart_Time__c, Arrival_Time__c, Duration__c
              FROM Flight__c
             WHERE Onboarding_From__r.Id = :airportFromId AND Arriving_To__r.Id = :airportToId
        ];
    }
}
