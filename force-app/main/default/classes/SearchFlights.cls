public with sharing class SearchFlights {
    @AuraEnabled
    public static List<Airport__c>  getFromAirports(){
        return [SELECT Name FROM Airport__c];
    }

    @AuraEnabled
    public static List<Airport__c>  getToAirports(String fromAirportId){
        return [SELECT Name FROM Airport__c WHERE Id != :fromAirportId];
    }
}
