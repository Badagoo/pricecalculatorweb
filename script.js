let num = 1;
let specialtotal = {};
let rrptotal = {};
function calculate() {
    let height = document.getElementById("h").value;
    let width = document.getElementById("w").value;
    const type = document.getElementById("t").value;
    let total = 0;
    let totalrrp = 0;

    // additional height and width for the frame
    if (type==1) {height = +height + 205; width = +width + 120} // Domestic
    else if (type==2) {height = +height + 250; width = +width + 140} // 55mm
    else if (type==3) {height = +height + 300; width = +width + 220} // 77mm
    else if (type==4) {height = +height + 250; width = +width + 140} // EasyView
    else if (type==5) {height = +height + 250; width = +width + 140} // 36mm

    // math.ceiling those numbers!!
    if (height % 100 != 0) {height = +height + (100 - (height % 100))}
    if (width % 100 != 0) {width = +width + (100 - (width % 100))}

    // calculate the price
    if (type==1) {
        fetch("https://raw.githubusercontent.com/Badagoo/pricecalculatorweb/main/prices/Domestic.json")
            .then(response => response.json())
            .then(data => {
                try{
                    let price = data[height][0][width]
                    let special = price * 1.2 + 427.5; special = Math.round(special * 100) / 100;
                    rrp = special * 1.25; rrp = Math.round(rrp * 100) / 100;
                    let p = document.createElement("p"); p.id = "shutter" + num;
                    p.innerHTML = num + ": $" + special + " (Special) | $" + rrp + " (RRP)";
                    document.getElementById("prices").appendChild(p);
                    specialtotal[num] = special; rrptotal[num] = rrp;
                    for (let i = 1; i < num; i++) {total += specialtotal[i]; totalrrp += rrptotal[i];}
                    total += special; totalrrp += rrp;
                    num++;
                    total = Math.round(total * 100) / 100;
                    totalrrp = Math.round(totalrrp * 100) / 100;
                    document.getElementById("total").innerHTML = "Total: $" + total + " (Special) | $" + totalrrp + " (RRP)";
                }
                catch(err) {alert("Invalid height and width!"); return;}
            });
    }
    else if (type==2) {
        fetch("https://raw.githubusercontent.com/Badagoo/pricecalculatorweb/main/prices/55mm.json")
            .then(response => response.json())
            .then(data => {
                try {
                let price = data[height][0][width];
                let special = (price * 1.1 * 1.3 + 571) * 1.1; special = Math.round(special * 100) / 100;
                rrp = special * 1.25; rrp = Math.round(rrp * 100) / 100;
                let p = document.createElement("p");
                p.id = "shutter" + num;
                p.innerHTML = num + ": $" + special + " (Special) | $" + rrp + " (RRP)";
                document.getElementById("prices").appendChild(p);
                specialtotal[num] = special; rrptotal[num] = rrp;
                for (let i = 1; i < num; i++) {total += specialtotal[i]; totalrrp += rrptotal[i];}
                total += special; totalrrp += rrp;
                num++;
                total = Math.round(total * 100) / 100;
                totalrrp = Math.round(totalrrp * 100) / 100;
                document.getElementById("total").innerHTML = "Total: $" + total + " (Special) | $" + totalrrp + " (RRP)";
                }
                catch(err) {alert("Invalid height and width!"); return;}
            });
    }
    else if (type==3) {
        fetch("https://raw.githubusercontent.com/Badagoo/pricecalculatorweb/main/prices/77mm.json")
            .then(response => response.json())
            .then(data => {
                try {
                let price = data[height][0][width];
                let special = (price * 1.1 * 1.3 + 571) * 1.1; special = Math.round(special * 100) / 100;
                rrp = special * 1.25; rrp = Math.round(rrp * 100) / 100;
                let p = document.createElement("p");
                p.id = "shutter" + num;
                p.innerHTML = num + ": $" + special + " (Special) | $" + rrp + " (RRP)";
                document.getElementById("prices").appendChild(p);
                specialtotal[num] = special; rrptotal[num] = rrp;
                for (let i = 1; i < num; i++) {total += specialtotal[i]; totalrrp += rrptotal[i];}
                total += special; totalrrp += rrp;
                num++;
                total = Math.round(total * 100) / 100;
                totalrrp = Math.round(totalrrp * 100) / 100;
                document.getElementById("total").innerHTML = "Total: $" + total + " (Special) | $" + totalrrp + " (RRP)";
                }
                catch(err) {alert("Invalid height and width!"); return;}
            });
    }
    else if (type==4) {
        fetch("https://raw.githubusercontent.com/Badagoo/pricecalculatorweb/main/prices/EasyView.json")
            .then(response => response.json())
            .then(data => {
                try {
                let price = data[height][0][width];
                let special = (price * 1.1 * 1.3 + 571) * 1.1; special = Math.round(special * 100) / 100;
                rrp = special * 1.25; rrp = Math.round(rrp * 100) / 100;
                let p = document.createElement("p");
                p.id = "shutter" + num;
                p.innerHTML = num + ": $" + special + " (Special) | $" + rrp + " (RRP)";
                document.getElementById("prices").appendChild(p);
                specialtotal[num] = special; rrptotal[num] = rrp;
                for (let i = 1; i < num; i++) {total += specialtotal[i]; totalrrp += rrptotal[i];}
                total += special; totalrrp += rrp;
                num++;
                total = Math.round(total * 100) / 100;
                totalrrp = Math.round(totalrrp * 100) / 100;
                document.getElementById("total").innerHTML = "Total: $" + total + " (Special) | $" + totalrrp + " (RRP)";
                }
                catch(err) {alert("Invalid height and width!"); return;}
            });
    }
    else if (type==5) {
        fetch("https://raw.githubusercontent.com/Badagoo/pricecalculatorweb/main/prices/36mm.json")
            .then(response => response.json())
            .then(data => {
                try {
                let price = data[height][0][width];
                let special = (price * 1.1 * 1.3 + 571) * 1.1; special = Math.round(special * 100) / 100;
                rrp = special * 1.25; rrp = Math.round(rrp * 100) / 100;
                let p = document.createElement("p");
                p.id = "shutter" + num;
                p.innerHTML = num + ": $" + special + " (Special) | $" + rrp + " (RRP)";
                document.getElementById("prices").appendChild(p);
                specialtotal[num] = special; rrptotal[num] = rrp;
                for (let i = 1; i < num; i++) {total += specialtotal[i]; totalrrp += rrptotal[i];}
                total += special; totalrrp += rrp;
                num++;
                total = Math.round(total * 100) / 100;
                totalrrp = Math.round(totalrrp * 100) / 100;
                document.getElementById("total").innerHTML = "Total: $" + total + " (Special) | $" + totalrrp + " (RRP)";
                }
                catch(err) {alert("Invalid height and width!"); return;}
            });
    }
    if (num==1) {
        if (document.getElementById("clear") == null) {
            let clear = document.createElement("button");
            clear.id = "clear";
            clear.innerHTML = "Clear";
            clear.onclick = function() {clearPrices()};
            document.getElementById("prices").appendChild(clear);
        }
    }
    document.getElementById("h").value = "";
    document.getElementById("w").value = "";

}
function clearPrices() {
    if (confirm("Are you sure you want to clear the prices?")) {
        document.getElementById("prices").innerHTML = "";
        num = 1;
        document.getElementById("total").innerHTML = "";
    }
}