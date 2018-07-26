/*
Author:Khaed Fathi
Email:KhaledFathi@protonmail.com
Created : 26/07/2018
Made for : Practice
programer Level : Beginner
PGP Fingerprint : FC8C B81A 70AE 4998 EB62  6F1A 202C 2C62 E64C 0367
LICENSE : GPL V3.0
Github repositorie: ??
*/
/********************************************/

//all varaible require
	//Array of month days
var month_days =[31,28,31,30,31,30,31,31,30,31,30,31],
	//inputs
	work_date = document.getElementById("work_date"),
	target_date = document.getElementById("target_date"),
	//result button
	res_button = document.getElementById("res_button"),
	//result paragraph
	result= document.getElementById("result");
/********************************************/

//function to detect if year is Leap year or simple year (365 days or 366 days)
function year_type(year){
	if (year%4 !=0){//simple year
		return 365
	}else if (year%4 == 0){//leab year
		return 366
	}
}
/********************************************/

//fragmente the data to simple form (return day , month , year as numbers)
function fragmented_date (full_date){
	var day = full_date.slice(8),
		month = full_date.slice(5,7),
		year = full_date.slice(0,-6);
	return {"day":day,"month":month,"year":year};
}
/********************************************/

//function for get the days between work date and target date (return number of days)
function calc (reference , target){
	//fragmented data for reference and target date 
	var reference_date = fragmented_date(reference),
		calc_date = fragmented_date(target),
		//calculate the deffrance between the two dates (in days , months )
		difference_day = reference_date["day"] - calc_date["day"],
		difference_month = reference_date["month"] - calc_date["month"];
	//check type of the target year and change February days (28 days or 29 dyas) 
	if (year_type(calc_date["year"])==366) {
		month_days[1]=29;
	}else if (year_type(calc_date["year"])==365){
		month_days[1]=28;
	}
	//if deffrance between months is negative value , convert it to positive
	if (difference_month < 0){
		difference_month=Math.abs(difference_month);
	}
	//get months as days depend on deffrance between reference and target month 
	var	res=0;
	for ( i=reference_date["month"]-1; i < calc_date["month"]-1;i++ ){
			res+=month_days[i];
		};
	//add or subtract days depend on deffrance between reference and target days
	if (difference_day < 0){
			res-=difference_day-1;// - 1 because the first day will not count (this will add it )
		}else if (difference_day > 0){// + 1 because the first day will not count (this will add it )
			res+=difference_day+1;
		}
	return res
}
/********************************************/

//function count 2 day as work and 1 day vacation (parameter = how much time to repet it)
function check_vacation(times){ //timer count 2 day vacation and 1 day work , return last one value (vacation or work);
	var count=1,
		check=0,
		res=0;
	while (count<times){
		if (check == 0 || check == 1){
			check+=1;
			res=0
		}else if (check == 2){
			check=0;
			res=1
		}
		count+=1
	}
	if (res == 0){
		return "يوم أجازة ";
	}else if (res == 1){
		return "يوم عمل";
	}
}
/********************************************/
//result button action 
res_button.onclick = function (){
	var run_calc = calc(work_date.value,target_date.value),
		final_result = check_vacation(run_calc);
	result.innerHTML = "النتيجة : " +final_result;
};
/********************************************/
