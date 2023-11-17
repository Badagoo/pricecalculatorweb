let num = 1;
let specialtotal = {};
let rrptotal = {};

function clearSpec(snum) {
    if (confirm("Are you sure you want to clear this price?")) {
        console.log(snum);
        document.getElementById("shutter" + snum).remove();
        // replace snum with snum+1, snum+2, etc. until num in specialtotal and rrptotal
        for (let i = +snum; i < num; i++) {
            specialtotal[i] = specialtotal[i+1];
            rrptotal[i] = rrptotal[i+1];
        }  
        delete specialtotal[num];
        delete rrptotal[num];
        num--;
        console.log(specialtotal);
        // update total
        let total = 0;
        let totalrrp = 0;
        for (let i = 1; i < num; i++) {total += specialtotal[i]; totalrrp += rrptotal[i];}
        total = Math.round(total * 100) / 100;
        totalrrp = Math.round(totalrrp * 100) / 100;
        document.getElementById("total").innerHTML = "Total: $" + total + " (Special) | $" + totalrrp + " (RRP)";
    }
}

function calculate() {
    let trick = document.getElementById("h").value;
    let etsd = document.getElementById("w").value;
    const type = document.getElementById("t").value;
    const sname = document.getElementById("sname").value;
    let total = 0;
    let totalrrp = 0;

    if (type==1) {trick = +trick + 205; etsd = +etsd + 120} // Domestic
    else if (type==2) {trick = +trick + 250; etsd = +etsd + 140} // 55mm
    else if (type==3) {trick = +trick + 300; etsd = +etsd + 220} // 77mm
    else if (type==4) {trick = +trick + 250; etsd = +etsd + 140} // EasyView
    else if (type==5) {trick = +trick + 250; etsd = +etsd + 140} // 36mm

    // math.ceiling those numbers!!
    if (trick % 100 != 0) {trick = +trick + (100 - (trick % 100))}
    if (etsd % 100 != 0) {etsd = +etsd + (100 - (etsd % 100))}

    // calculate the price
    fetch("https://raw.githubusercontent.com/Badagoo/pricecalculatorweb/main/prices/Domestic.json")
        .then(response => response.json())
        .then(data => {
            try{
                let special = 0;
                let price = data[trick][0][etsd]
                if (type != 1) {special = (price * 1.1 * 1.3 + 571) * 1.1; special = Math.round(special * 100) / 100}
                else if (type == 1) {special = price * 1.2 + 427.5; special = Math.round(special * 100) / 100}
                rrp = special * 1.25; rrp = Math.round(rrp * 100) / 100;

                let divelement = document.createElement("div"); divelement.id = "shutter" + num;
                divelement.style.display = "flex"; divelement.style.alignItems = "center";
                let p = document.createElement("p"); p.innerHTML = sname + ": $" + special + " (Special) | $" + rrp + " (RRP)";

                let clear = document.createElement("button"); clear.innerHTML = "Clear"; clear.id = "clear" + num;
                clear.onclick = function() {clearSpec(this.id.slice(5))};
                clear.style.width = "100px"; clear.style.height = "30px"; clear.style.marginLeft = "10px";
                clear.style.fontSize = "15px"; clear.style.borderRadius = "5px"; clear.style.backgroundColor = "red";
                clear.style.color = "white"; clear.style.border = "none"; clear.style.outline = "none";


                divelement.appendChild(p);
                divelement.appendChild(clear);
                document.getElementById("prices").appendChild(divelement);
                specialtotal[num] = special; rrptotal[num] = rrp;
                for (let i = 1; i < num; i++) {total += specialtotal[i]; totalrrp += rrptotal[i];}
                total += special; totalrrp += rrp; num++;
                total = Math.round(total * 100) / 100;
                totalrrp = Math.round(totalrrp * 100) / 100;
                document.getElementById("total").innerHTML = "Total: $" + total + " (Special) | $" + totalrrp + " (RRP)";
            }
            catch(err) {alert("Invalid height and width!"); return;}
        });
    if (num==1) {
        if (document.getElementById("clear") == null) {
            let clear = document.createElement("button");
            clear.id = "clear";
            clear.innerHTML = "Clear All";
            clear.onclick = function() {clearPrices()};
            document.getElementById("prices").appendChild(clear);
        }
    }
    document.getElementById("h").value = "";
    document.getElementById("w").value = "";
    document.getElementById("sname").value = "";

}
function clearPrices() {
    if (confirm("Are you sure you want to clear the prices?")) {
        document.getElementById("prices").innerHTML = "";
        num = 1;
        document.getElementById("total").innerHTML = "";
    }
}