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
                component.set("v.lastExpandedId", null);
                component.set("v.availableFlights", response.getReturnValue());
            }
            else {
                alert("Error: failed to fetch available flights")
            }
        })

        $A.enqueueAction(action);
        
    },

    sectionExpand : function(component, event) {
        //console.log("inside expand");
        
        var lastExpandedId = component.get("v.lastExpandedId");
        //console.log("lastExpandedId: ",lastExpandedId);

        var currentExpandedId = event.target.id;
        //console.log("currentExpandedId: ",currentExpandedId);


        if (lastExpandedId) {
            //console.log("lastExpandedId is present")
            var lastExpandedButton = document.getElementById(lastExpandedId);
            var lastExpandedSection = document.getElementById('section' + lastExpandedId);
            var lastExpandedContent = document.getElementById('content' + lastExpandedId);

            if (lastExpandedId == currentExpandedId) {
                //console.log("lastExpandedId == currentExpandedId");

                if (lastExpandedSection.classList.contains("slds-is-open")) {
                    //console.log("lastExpandedId == currentExpandedId, already expanded");

                    lastExpandedSection.classList.remove("slds-is-open");
                    lastExpandedButton.setAttribute("aria-expanded", "false");
                    lastExpandedContent.setAttribute("aria-hidden", "true");

                    //console.log("lastExpandedId == currentExpandedId, shrinked it");
                    return;
                }
                else {
                    //console.log("lastExpandedId == currentExpandedId, already shrinked");

                    lastExpandedSection.classList.add("slds-is-open");
                    lastExpandedButton.setAttribute("aria-expanded", "true");
                    lastExpandedContent.setAttribute("aria-hidden", "false");

                    //console.log("lastExpandedId == currentExpandedId, expanded it");
                    return;
                    
                }
            }

            //console.log("lastExpandedId != currentExpandedId, shrinking it");

            lastExpandedSection.classList.remove("slds-is-open");
            lastExpandedButton.setAttribute("aria-expanded", "false");
            lastExpandedContent.setAttribute("aria-hidden", "true");

            //console.log("lastExpandedId != currentExpandedId, shrinked it");
        }

        //console.log("referencing currentExpanded elements")

        var currentExpandedButton = document.getElementById(currentExpandedId);
        var currentExpandedSection = document.getElementById('section' + currentExpandedId);
        var currentExpandedContent = document.getElementById('content' + currentExpandedId);

        //console.log("done referencing currentExpanded elements")


        //console.log("expanding new section");

        currentExpandedSection.classList.add("slds-is-open");
        currentExpandedButton.setAttribute("aria-expanded", "true");
        currentExpandedContent.setAttribute("aria-hidden", "false");

        //console.log("expanded new section");


        //console.log("setting lastExpandedId = currentExpandedId");
        component.set("v.lastExpandedId", currentExpandedId);
        //console.log("done setting lastExpandedId = currentExpandedId");
    }




    

})
