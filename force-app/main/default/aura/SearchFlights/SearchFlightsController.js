({
    fetchFromAirports : function(component) {
        var action = component.get("c.getFromAirports");
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set("v.fromAirports", response.getReturnValue());
                component.find("selectFrom").set("v.value", response.getReturnValue()[0].Id);
                component.find("selectFrom").focus();
            }
            else {
                alert("Error: Failed to fetch airports for From field");
            }
        });

        $A.enqueueAction(action);
    },

    fetchToAirports : function(component) {
        var action = component.get("c.getToAirports");
        action.setParams({"fromAirportId": component.find("selectFrom").get("v.value")});

        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set("v.toAirports", response.getReturnValue());
            }
            else {
                alert("Error: Failed to fetch airports for To field");
            }
        });

        $A.enqueueAction(action);
    }

})
