({
    fetchFromAirports : function(component) {
        var action = component.get("c.getFromAirports");
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                component.set("v.fromAirports", response.getReturnValue());
                component.find("selectFrom").set("v.value", response.getReturnValue()[0].Id);
                $A.enqueueAction(component.get("c.fetchToAirports"));
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
                component.find("selectTo").set("v.value", response.getReturnValue()[0].Id);
                $A.enqueueAction(component.get("c.fetchFlights"));
            }
            else {
                alert("Error: Failed to fetch airports for To field");
            }
        });

        $A.enqueueAction(action);
    },

    setRouteDescription : function(component) {
        var action = component.get("c.getRouteDescripter");
        action.setParams({
            "airportFromId": component.find("selectFrom").get("v.value"),
            "airportToId": component.find("selectTo").get("v.value")
        });

        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                document.getElementById("routeDescription").innerHTML = response.getReturnValue();
            }
            else {
                alert("Error: failed to fetch route description")
            }
        })

        $A.enqueueAction(action);
    },

    fetchFlights : function(component) {
        // set route description
        var routeDescriptor = component.get("c.setRouteDescription");
        routeDescriptor.setParams({"component":component});
        $A.enqueueAction(routeDescriptor);

        // show flights
        var action = component.get("c.getFlights");
        action.setParams({
            "airportFromId": component.find("selectFrom").get("v.value"),
            "airportToId": component.find("selectTo").get("v.value")
        });

        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                console.log(response.getReturnValue());
                component.set("v.lastExpandedSectionId", null);
                component.set("v.availableFlights", response.getReturnValue());
            }
            else {
                alert("Error: failed to fetch available flights")
            }
        })

        $A.enqueueAction(action);
        
    },

    sectionExpand : function(component, event) {
        var lastExpandedSectionId = component.get("v.lastExpandedSectionId");

        var currentExpandedSectionId = 'section' + event.target.id;
        var currentExpandedSection = document.getElementById(currentExpandedSectionId);

        if (lastExpandedSectionId) {
            console.log("last expanded element found")
            var lastExpandedSection = document.getElementById(lastExpandedSectionId);
            
            if (lastExpandedSectionId == currentExpandedSectionId) {
                if (currentExpandedSection.classList.contains("slds-is-open")) {
                    currentExpandedSection.classList.remove("slds-is-open");
                    return;
                }
                else {
                    currentExpandedSection.classList.add("slds-is-open");
                    return;
                }
            }

            lastExpandedSection.classList.remove("slds-is-open");
        }

        currentExpandedSection.classList.add("slds-is-open");
        component.set("v.lastExpandedSectionId", currentExpandedSectionId);
    }




    

})
