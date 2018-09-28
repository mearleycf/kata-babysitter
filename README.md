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


### An Object
class WorkShift {
    start_time: number = parseInt((<HTMLInputElement>document.getElementById("startTime")).value, 10);
    //parseInt assumes base 16, 8, or 10 depending on first characters of input parameter; specifying base 10 to ensure input is always calculated as base 10
    //I chose parseInt over parseFloat because I want a whole number (no fractional hours)

    start_time: number = parseInt((<HTMLInputElement>document.getElementById("hoursWorked")).value, 10);
    hours_worked: number = 
}

todayHours = new WorkShift 