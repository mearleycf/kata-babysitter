# Babysitter Kata

## Background
This kata simulates a babysitter working and getting paid for one night.  The rules are pretty straight forward.

The babysitter:
- starts no earlier than 5:00PM
- leaves no later than 4:00AM
- gets paid $12/hour from start-time to bedtime
- gets paid $8/hour from bedtime to midnight
- gets paid $16/hour from midnight to end of job
- gets paid for full hours (no fractional hours)


## Feature
*As a babysitter<br>
In order to get paid for 1 night of work<br>
I want to calculate my nightly charge<br>*

## The Solution (In Progress)
https://codepen.io/mearleycf/pen/pxvgJN?editors=1011

## Breakdown
*As a babysitter, I want to get paid $12 an hour, from 5:00pm - 8:00pm
*As a babysitter, I want to get paid $8 an hour, from 8:00pm - 12:00am
*As a babysitter, I want to get paid $16 an hour, from 12:00am - 4:00am

### Variables
*start_time = user input (drop down, options are in clock time, value passed is integer)
*end_time = user input (drop down, options are in clock time, value passed is integer)
*no_earlier_than = 1700
*no_later_than = 0400
*max_hours = (if no_later_than between 000 and 1100, (2400 + no_later_than) - no_earlier_than; else, )
*hours_awake = count of hours between start time and 8p (8-start_time)
*hours_asleep_normal = count of hours between 8p and 12a (if start_time < 8, 12 - 4 - start_time; else 12 - start_time)
*hours_asleep_overtime (if start_time < 12, 16 - 4 - hours_asleep_normal; else 16 - start_time)

### Nope, that got too complex
*start_time = user input (drop down, options are in clock time, value passed is integer)
*max_working_hours = system defined; currently 11 (5p - 4a = 11 hours); changeable by administrator (e.g. parent)
*earliest_start_time = 5p (administrator defined)
*latest_end_time = 4a (administrator defined)
*hours_worked = user input (drop down, options are 1 to max_working_hours)
- in this example, the options would be for 1 through 11
*hours_awake = hours between start time and 8p (sleep time)
*hours_asleep_normal = hours between 8p and midnight
*hours_asleep_overtime = hours between midnight and 4a


### A Class
note: nah, not going the typescript class route, but here's where I went when I was thinking of doing that...
```
class WorkShift {
    start_time: number = parseInt((<HTMLInputElement>document.getElementById("startTime")).value, 10);

    //parseInt assumes base 16, 8, or 10 depending on first characters of input parameter; specifying base 10 to ensure input is always calculated as base 10
    //I chose parseInt over parseFloat because I want a whole number (no fractional hours)

    hours_worked: number = parseInt((<HTMLInputElement>document.getElementById("hoursWorked")).value, 10);
    earliest_start_time: number = 17; // 5:00p
    latest_end_time: number = 4; // 4:00a
    bed_time: number = 20; // 8:00pm in this case
    awake_time: number = 7; // the time the baby starts its day, and babysitter is paid awake time pay

    constructor(start_time:number, hours_worked:number, bed_time:number, awake_time:number) {
        this.start_time = start_time;
        this.hours_worked = hours_worked;
        this.bed_time = bed_time;
        this.awake_time = awake_time;
    };

    end_time (start_time, hours_worked) {
        calc_end = if(start_time + hours_worked <= 24) {
            return (start_time + hours_worked);
        } else {
            return ((start_time + hours_worked) - 24)
        };
        return calc_end;
    }

    hours_awake (start_time) {
        return this.bed_time - this.start_time; // 20 - 17 = 3 hours worked while child is awake
    };

    hours_asleep_normal (start_time, awake_time, end_time, bed_time) {

        if(this.end_time <= 24) {
            asleep_normal = this.end_time - this.bed_time;
        } else if(this.end_time >= 1 && this.end_time <= this.awake_time) {
            asleep_normal = 24 - this.bed_time; // so, 24 is midnight and they will have worked n hours while the baby is asleep, but before it's midnight, based on the predefined baby's bedtime
        }
    };

    hours_asleep_overtime (start_time, awake_time, end_time, bed_time) {
        asleep_overtime = if(this.end_time >= 1 && this.end_time <= this.awake_time) {
            return this.end_time; 
            // simple here, as overtime hours are between 1a and 7a, so number of overtime hours worked is integer equal to the hour they stopped working
        } else if(this.start_time > this.end_time && this.end_time > 6) {
            return 7; 
            // so if they started at 17 (5p) and ended at 8 (8a) then they worked 7 hours overtime
        } else if(this.end_time <=24) {
            return 0; 
            // they didn't have an end_time after midnight
        }
        //this should return an integer between 0 and 7
    }
}
```
```
todayHours = new WorkShift(start_time, hours_worked);
```