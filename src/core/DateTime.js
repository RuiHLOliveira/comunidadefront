const DateTime = {

    listWeekDay () {
        return [
            'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'
        ];
    },
    listWeekDayFirstLetter () {
        return [
            'D', 'S', 'T', 'Q', 'Q', 'S', 'S'
        ];
    },

    newDatetimeTz(dateString){
        let date = new Date(dateString);
        const minutos = date.getTimezoneOffset() * -1;
        const miliseconds = minutos * 60 * 1000;
        date.setTime(date.getTime() + miliseconds)
        return date;
    },

    add(text, number) {
        return parseInt(number) + parseInt(text)
    },

    leadingZeroes (number){
        return ('0000'+ number).slice(-2);
    },

    getWeekDayNumber(dateObject){
        return dateObject.getDay()
    },
    getWeekDay(dateObject){
        return this.listWeekDay()[dateObject.getDay()]
    },
    getWeekDayFirstLetter(dateObject){
        return this.listWeekDayFirstLetter()[dateObject.getDay()]
    },
    getYear(dateObject){
        return dateObject.getFullYear()
    },
    getMonth(dateObject){
        return dateObject.getMonth()+1
    },
    getDate(dateObject){
        return dateObject.getDate()
    },

    formatDevDate (dateObject){
        let dateString = '';
        let ano = dateObject.getFullYear();
        let mes = this.leadingZeroes(this.add(dateObject.getMonth(), 1));
        let dia = this.leadingZeroes(dateObject.getDate());
        dateString = `${ano}-${mes}-${dia}`;
        return dateString
    },

    formatDevDateTime (dateObject){
        let dateString = this.formatDevDate(dateObject);
        let hora = this.leadingZeroes(dateObject.getHours());
        let minuto = this.leadingZeroes(dateObject.getMinutes());
        let segundo = this.leadingZeroes(dateObject.getSeconds());
        dateString = `${dateString} ${hora}:${minuto}:${segundo}`;
        return dateString
    },
    
    formatBrDateTime (dateObject){
        let dateString = this.formatBrDate(dateObject);
        let hora = this.leadingZeroes(dateObject.getHours());
        let minuto = this.leadingZeroes(dateObject.getMinutes());
        let segundo = this.leadingZeroes(dateObject.getSeconds());
        dateString = `${dateString} ${hora}:${minuto}:${segundo}`;
        return dateString
    },

    formatBrDate (dateObject){
        let dateString = '';
        let ano = dateObject.getFullYear();
        let mes = this.leadingZeroes(this.add(dateObject.getMonth(), 1));
        let dia = this.leadingZeroes(dateObject.getDate());
        dateString = `${dia}/${mes}/${ano}`;
        return dateString
    },

    isSameYMD(date1, date2)
    {
        if(
            this.getYear(date1) == this.getYear(date2) &&
            this.getMonth(date1) == this.getMonth(date2) &&
            this.getDate(date1) == this.getDate(date2)
        ) {
            return true;
        }
        return false;
    }

}

export default DateTime;