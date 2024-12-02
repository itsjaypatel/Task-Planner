export default {
    getTimeInMillis: function(date,time){
            /*
            *  date - YYYY-MM-dd
            *  time - HH:mm 24-hour
            *  */   
            const dateSplit = date.split("-");
            const timeSplit = time.split(":");
            return Date.UTC(dateSplit[0],dateSplit[1] - 1,dateSplit[2],timeSplit[0],timeSplit[1],timeSplit[2] || 0,0);
       },

   getTimeInString: function(milliseconds){
        const dateTime = new Date(milliseconds);

        // Check if the timestamp is valid
        if (isNaN(dateTime.getTime())) {
            throw new Error("Invalid timestamp");
        }

        // Format the date to YYYY-MM-dd
        const date = dateTime.toISOString().split("T")[0];

        // Format the time to HH:mm
        const time = dateTime.toISOString().split("T")[1].slice(0, 5);

        // Return the date and time as an object
        return { date, time };
   },
   
    convertTimeIn12Hour : function(time24){
          // input time : HH:mm:ss
          // Split the input time string into hours, minutes, and seconds
        const [hours24, minutes, seconds] = time24.split(":").map(Number);

        // Calculate hours for 12-hour format
        const hours12 = hours24 % 12 || 12; // Convert 0 to 12 for midnight

        // Determine AM or PM
        const period = hours24 >= 12 ? "PM" : "AM";

        // Format the hours, minutes, and seconds to always have two digits
        const formattedHours = String(hours12).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");

        // Combine into a 12-hour format time string
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
   },

   currentIndianTimeInMillis: function(){
        return Date.now() + (5 * 3600 + 1800)*1000;
   }
}