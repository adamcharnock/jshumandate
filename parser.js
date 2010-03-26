var HumanDate = function(spec, my) {
	spec = spec || {};
	my = my || {};
	
	my.days = [
		["monday", "mon", "mo"], 
		["tuesday", "tue", "tues", "tu"], 
		["wednesday", "wed", "we"], 
		["thursday", "thu", "thur", "th"], 
		["friday", "fri", "fr"], 
		["saturday", "sat", "sa"], 
		["sunday", "sun", "su"]
	];
	
	my.months = [
		["january", "jan"],
		["february", "feb"],
		["march", "mar"],
		["april", "apr"],
		["may"],
		["june", "jun"],
		["july", "jul"],
		["august", "aug"],
		["september", "sep"],
		["october", "oct"],
		["november", "nov"],
		["december", "dec"]
	];
	
	my.relative = ["tomorrow", "yesterday"];
	
	my.nextWords = ["next"];
	
	my.aDay = 86400000;
	my.aDay = 86400 * 1000;
	
	my.init = function() {
		my.date = spec.date || my.date || false;
		my.now = spec.now || my.now || false;
		
		my.date = my.date.toLowerCase();
		my.isNext = my.stripNext();
		
		if(my.isNext) {
			my.date = my.isNext;
			my.isNext = !! my.isNext;
		}
		
		if(!my.date) {
			throw "No 'date' param in spec";
		}
	}
	
	my.stripNext = function() {
		var words = my.date.split(" ");
		if(HumanDate.utils.inArray(words[0], my.nextWords)) {
			words.shift();
			return words.join(" ");
		} else {
			return false;
		}
		
	}
	
	var that = {};
	
	that.getDate = function() {
		var now = my.now ? my.now : Date.parse(new Date());
		var type = that.getDateType();
		var fn = that["parseDate" + type];
		return fn(now);
	};
	
	that.getDateType = function() {
		var date = my.date;
		
		if(HumanDate.utils.inArrays(my.date, my.days)) {
			return "Day";
		}
		if(HumanDate.utils.inArrays(my.date, my.months)) {
			return "Month";
		}
		if(HumanDate.utils.inArrays(my.date, my.relative)) {
			return "Relative";
		}
		
	}
	
	that.isNext = function() {
		return my.isNext;
	}
	
	that.parseDateDay = function(now) {
		var date = new Date(now);
		
		var dayIndex = HumanDate.utils.arraysIndex(my.date, my.days);
		var nowDayIndex = HumanDate.utils.normaliseDay(date.getDay());
		
		if(dayIndex === false) {
			throw "Could parse date as type 'day': " + my.date;
		}
		
		var diffDays;
		if(dayIndex > nowDayIndex) {
			//Eg. Tue today, and the date is 'Fri'
			diffDays = dayIndex - nowDayIndex;
		} else {
			//Eg. Thur today, and the date is 'Mon' (so wrap around)
			diffDays = 7 - (nowDayIndex - dayIndex);
		}
		
		if(my.isNext && dayIndex != nowDayIndex) {
			diffDays += 7;
		}
		
		return new Date(now + (my.aDay * diffDays));
	}
	
	that.parseDateMonth = function(now) {
		var date = new Date(now);
		var outDate = new Date(now);
		
		var monthIndex = HumanDate.utils.arraysIndex(my.date, my.months);
		var nowMonthIndex = date.getMonth();
		
		if(monthIndex === false) {
			throw "Could parse date as type 'month': " + my.date;
		}
		
		var newMonth;
		if(monthIndex > nowMonthIndex) {
			newMonth = monthIndex;
			outDate.setMonth(newMonth);
		} else {
			var diff = 12 - (nowMonthIndex - monthIndex);
			newMonth = (outDate.getMonth() + diff) % 12;
			outDate.setMonth(newMonth);
			outDate.setFullYear(outDate.getFullYear() + 1);
		}
		
		if(my.isNext && monthIndex != nowMonthIndex) {
			outDate.setFullYear(outDate.getFullYear() + 1);
		}
		
		//Have we moved into the next month (because the next month had too few days)
		// (e.g. moving from Jan 31 info Feb)
		if(newMonth < outDate.getMonth()) {
			var daysInMonth = HumanDate.utils.daysInMonth(newMonth, outDate.getFullYear());
			outDate.setDate(daysInMonth);
			outDate.setMonth(newMonth);
		}
		
		return outDate;
	}
	
	that.parseDateRelative = function(now) {
		switch(my.date) {
			case "tomorrow":
				return new Date(now + my.aDay);
			case "yesterday":
				return new Date(now - my.aDay);
			default:
				throw "Did not recognise date: " + my.date;
		}
	}
	
	my.init();
	
	return that;
};

HumanDate.utils = {};

HumanDate.utils.inArray = function(needle, haystack) {
	return HumanDate.utils.arrayIndex(needle, haystack) !== false;
}

HumanDate.utils.inArrays = function(needle, haystacks) {
	return HumanDate.utils.arraysIndex(needle, haystacks) !== false;
}

HumanDate.utils.arrayIndex = function(needle, haystack) {
	for (key in haystack) {
		if (haystack[key] == needle) {
			return key;
		}
	}
	return false;
};

HumanDate.utils.arraysIndex = function(needle, haystacks) {
	for (k in haystacks) {
		for (key in haystacks[k]) {
			if (haystacks[k][key] == needle) {
				return k;
			}
		}
	}
	return false;
}

HumanDate.utils.normaliseDay = function(day) {
	//Weeks start on monday, not sunday
	return (day + 6) % 7;
}

HumanDate.utils.daysInMonth = function(month, year) {
	return 32 - new Date(year, month, 32).getDate();
}