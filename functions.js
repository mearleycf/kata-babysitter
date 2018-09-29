function todayPay() {
    let start_time = parseInt(document.getElementById("startTime").value, 10);
    //parseInt assumes base 16, 8, or 10 depending on first characters of input parameter; specifying base 10 to ensure input is always calculated as base 10
    //I chose parseInt over parseFloat because I want a whole number (no fractional hours)
  
    let hours_worked = parseInt(document.getElementById("hoursWorked").value, 10);
    let earliest_start_time = 17; // 5:00p; defined by exercise
    let latest_end_time = 4; // 4:00a; defined by exercise
    let bed_time = 20; // 8:00pm in this case, defined by developer
    let awake_time = 7; // the time the baby starts its day, and babysitter is paid awake time pay
    
    const end_time = function(start_time, hours_worked) {
      const calc_end = function () {
        // return start_time + hours_worked;
      if(start_time + hours_worked <= 24) {
              return (start_time + hours_worked);
          } else {
              return ((start_time + hours_worked) - 24)
          };
        };
        return calc_end();
      };
    
    const hours_awake = function(start_time) {
      return bed_time - start_time; // 20 - 17 = 3 hours worked while child is awake
    };
    
    const hours_asleep_normal = function() {
        if(end_time <= 24) {
        let asleep_normal = end_time - bed_time;
        } // else if(end_time >= 1 && end_time <= awake_time) {
        //   asleep_normal = 24 - bed_time; // so, 24 is midnight and they will have worked n hours while the baby is asleep, but before it's midnight, based on the predefined baby's bedtime
        // } 
      return this.asleep_normal;
      //stalled out here--it's not working, not sure why, returning undefined; pretty sure it's just a scope issue
    };
    
    //note--as i add functions to the outer function i'm testing them here first
    document.getElementById("pay_amount").innerHTML = hours_asleep_normal();
    
    //testing
    console.log(`start time: ${start_time}, hours worked: ${hours_worked}, earliest start time: ${earliest_start_time}, latest end time: ${latest_end_time}, bed time: ${bed_time}, awake time: ${awake_time}, end time: `);
  };