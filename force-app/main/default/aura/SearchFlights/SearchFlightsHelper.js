({
    fetchFares : function(component, flightId) {
        //console.log("fetching fares: start");
        
        var fareAction = component.get("c.getFares");
        //console.log("got reference to controller getFares");

        fareAction.setParams({
            "flightId" : flightId,
            "passengerType": component.find("selectPassengerType").get("v.value")

        });

        //console.log("fetching fare for: ", flightId);
        //console.log(`fetching for passenger type: ${component.find("selectPassengerType").get("v.value")}`);

        fareAction.setCallback(this, function(fareResponse) {
            //console.log("callback recieved");
            if (fareResponse.getState() == "SUCCESS") {
                console.log("fare: ", fareResponse.getReturnValue())
                component.set("v.flightFare", fareResponse.getReturnValue());
            }
            else {
                //console.log(fareResponse.getError()[0].message);
                alert("Error: failed to fetch fare details")
            }
        });

        //console.log("fareAction enqueued");
        $A.enqueueAction(fareAction);
    }
})
