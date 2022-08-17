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
             WHERE Onboarding_From__r.Id = :airportFromId AND Arriving_To__r.Id = :airportToId  AND Flight_Status__c = 'Approved'
        ];
    }

    @AuraEnabled
    public static Map<String, List<Fare__c>> getFaresBak(String flightIds, String passengerType){
        //flightIds = '["a015i00000VbyJoAAJ"]';
        // deserialize JSON
        try {
            Type idArrType = Type.forName('List<String>');
            List<String> flightIdList = (List<String>) JSON.deserialize(flightIds, idArrType);  
            
            Map<String, List<Fare__c>> flightFares = new Map<String, List<Fare__c>>();
            for (String flightId : flightIdList) {
                List<Fare__c> f = [SELECT Name, Price__c FROM Fare__c WHERE Flight__r.Id = :flightId AND Passenger_Type__c = :passengerType];
                flightFares.put(flightId, f);
            }

            if (flightFares.size() > 0) {
                return flightFares;
            }
            else {
                return null;
            } 

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }

    @AuraEnabled
    public static List<Fare__c> getFares(String flightId, String passengerType){
        return [SELECT Name FROM Fare__c WHERE Flight__r.Id = :flightId AND Passenger_Type__c = :passengerType ORDER BY Price__c];
    }

    @AuraEnabled
    public static void createBookingApex(
        String passengerName,
        String passengerEmail,
        String onboardingFrom,
        String arrivingTo,
        String flightId,
        String passengerType,
        String fareId,
        String paymentMode,
        String foodType
    ){
        insert new Booking__c(
            Passenger_Name__c = passengerName,
            Passenger_Email__c = passengerEmail,
            Onboarding_From__c = onboardingFrom,
            Arriving_To__c = arrivingTo,
            Flight_Name__c = flightId,
            Passenger_Type__c = passengerType,
            Fare_Type__c = fareId,
            Payment_Mode__c = paymentMode,
            Food_Type__c = foodType
        );
        
    }

}
