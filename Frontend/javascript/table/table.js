var text=document.getElementById('text');
var btn=document.getElementById('button');
        let comment="";
        let twoCities=[];
        let details=[];
        var arr1 = []; 
        // localStorage.clear();
        if(localStorage.getItem("SnumValue")!=0){
            arr1.push(localStorage.getItem("SnumValue"));
        }
        if(localStorage.getItem("MnumValue")!=0){
            arr1.push(localStorage.getItem("MnumValue"));
        }
        if(localStorage.getItem("LnumValue")!=0){
            arr1.push(localStorage.getItem("LnumValue"));
        }
        

        let option1=localStorage.getItem("option1Value")=='yes'?true:false;
        let option2=localStorage.getItem("option2Value")=='yes'?true:false;

        cities=localStorage.getItem("cities").split(',');
        console.log(cities);
        var t='<table><thead><tr><th>Start City</th><th>End City</th><th>Veichel size</th><th>Standard delivery price</th><th>Express delivery overhead</th><th>Village delivery overhead</th><th>Express delivery time</th></tr></thead><tbody>';
        for (var w = 0; w < cities.length; w++) {
            for (var j = 0; j < cities.length; j++) {
                for (var i = 0; i < arr1.length; i++){
                    if(i%3==2) {
                        ss="large";
                        comment=localStorage.getItem("SDValue");
                    }
                    else if(i%3==1) {
                        ss="medium";
                        comment=localStorage.getItem("MDValue");
                    }
                    else {
                        ss="small";
                        comment=localStorage.getItem("LDValue");
                    }
    
                    details.push({
                        "size": ss,
                        "description": comment,
                        "count": +arr1[i]
                    })
                    twoCities.push({
                        "StartCity": cities[j],
                        "EndCity": cities[j+1],
                        "VeichelSize": ss,
                    })
                    t += `<tr>
                        <td>${cities[w]}</td>
                        <td>${cities[j]}</td>
                        <td>${ss+'= '+arr1[i]}</td>
                        <td><input type="number" id="StandardPrice" class="StandardPrice"></td>
                        <td><input type="number" id="ExpressOverhead" class="ExpressOverhead"></td>
                        <td><input type="number" id="VillageOverhead" class="VillageOverhead"></td>
                        <td><input type="number" id="ExpressTime" class="ExpressTime"></td>
                    </tr>`;
            
                }
            }
        }
        
        t+='</tbody></table><br> ';
        text.innerHTML=t;
        var b='<button type="button" id="submit" onclick="myFunction()">submit </button>';
        btn.innerHTML=b;
        
        function myFunction(){
            let StandardPrice=document.getElementsByClassName("StandardPrice");
            let ExpressOverhead=document.getElementsByClassName("ExpressOverhead");
            let VillageOverhead=document.getElementsByClassName("VillageOverhead");
            let ExpressTime=document.getElementsByClassName("ExpressTime");

            for (let i=0; i<twoCities.length;  i++){
                twoCities[i].priceStandard = +StandardPrice[i].value;
                twoCities[i].overheadPriceExpress = +ExpressOverhead[i].value;
                twoCities[i].overheadPriceVilage = +VillageOverhead[i].value;
                twoCities[i].timeDelivarExpress = +ExpressTime[i].value;
            }

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "companyId": 3,
            "workPlace": cities,
            "vilageDeliver": option1,
            "expressDelivery": option2,
            "vehicles": details,
            "offersDescription": twoCities
            });
            console.log(details);
           
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            
            fetch("http://localhost:3000/servayRegistration", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }



