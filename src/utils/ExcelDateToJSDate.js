export function ExcelDateToJSDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000); 
    var fractional_day = serial - Math.floor(serial) + 0.0000001; 
    var total_seconds = Math.floor(86400 * fractional_day); 
    var seconds = total_seconds % 60; 
    total_seconds -= seconds; 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60; 
    return convertDate(new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds));
 }
 
 
 function convertDate(inputFormat) {
   function pad(s) { return (s < 10) ? '0' + s : s; }
   var d = new Date(inputFormat)
   return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/')
 }