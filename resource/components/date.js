function date() {
    var date = new Date();
    
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const datetext = day + '/' + month + '/' + year;

    document.getElementById('date').textContent = datetext;
}

date();